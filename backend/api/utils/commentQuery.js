/** @format */

const { default: mongoose } = require("mongoose");

class CommentQuery {
  constructor(model, queryString, user_id) {
    this.model = model;
    this.queryString = queryString;
    this.user_id = user_id;
    this.pipeline = [];
  }

  matchMovie() {
    const { movie_id } = this.queryString;

    if (!mongoose.Types.ObjectId.isValid(movie_id)) return this;

    this.pipeline.push({
      $match: { movie_id: new mongoose.Types.ObjectId(movie_id) },
    });

    return this;
  }

  matchUser() {
    if (!mongoose.Types.ObjectId.isValid(this.user_id)) return this;

    this.pipeline.push({
      $match: { user_id: new mongoose.Types.ObjectId(this.user_id) },
    });

    return this;
  }

  prioritizeUser() {
    const { user_id } = this.queryString;

    if (mongoose.Types.ObjectId.isValid(user_id)) {
      this.pipeline.push({
        $addFields: {
          isPriorityUser: {
            $cond: [
              { $eq: ["$user_id", new mongoose.Types.ObjectId(user_id)] },
              0,
              1,
            ],
          },
        },
      });
    }

    return this;
  }

  sort() {
    const { sort } = this.queryString;

    const sortStage = {
      isPriorityUser: 1, // always sort user’s comments on top
    };

    if (sort) {
      sort.split(",").forEach((field) => {
        const direction = field.startsWith("-") ? -1 : 1;
        const cleanField = field.replace(/^-/, "");
        sortStage[cleanField] = direction;
      });
    } else {
      sortStage.date = -1; // default fallback sort
    }

    this.pipeline.push({ $sort: sortStage });
    return this;
  }

  lookupUser() {
    this.pipeline.push(
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" }
    );
    return this;
  }

  lookupMovie() {
    this.pipeline.push(
      {
        $lookup: {
          from: "movies",
          let: { movieId: { $toObjectId: "$movie_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$movieId"] },
              },
            },
            {
              $project: {
                _id: 0,
                title: 1,
                slug: 1,
                poster: 1,
              },
            },
          ],
          as: "movie",
        },
      },
      {
        $unwind: {
          path: "$movie",
          preserveNullAndEmptyArrays: true,
        },
      }
    );

    return this;
  }

  limitFields() {
    let fields =
      this.queryString.fields ||
      "text,date,user_id,movie_id,user.name,user.avatar,movie";

    const projectStage = {};
    fields.split(",").forEach((field) => {
      projectStage[field] = 1;
    });

    this.pipeline.push({ $project: projectStage });
    return this;
  }

  async paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;

    this.pipeline.push({ $skip: skip }, { $limit: limit });

    // count by
    if (this.user_id) {
      this.totalResult = await this.model.countDocuments({
        user_id: this.user_id,
      });
    } else {
      this.totalResult = await this.model.countDocuments({
        movie_id: this.queryString.movie_id,
      });
    }

    return this;
  }

  async exec() {
    return await this.model.aggregate(this.pipeline);
  }
}

module.exports = CommentQuery;
