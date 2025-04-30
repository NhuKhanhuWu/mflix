/** @format */

class MovieQuery {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.totalResults = 0;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "genres",
      "title",
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    // change filter structur => can filter more condition
    let queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  gerne() {
    const genres = this.queryString.genres;

    // check if request have genres
    if (!genres) return this;

    // CREATE FILTER ARRAY
    const genresList = this.queryString?.genres
      .split(",")
      .map((genre) => new RegExp(`\\b${genre.trim()}\\b`, "i"));

    // FILTERING
    this.query = this.query.find({
      genres: {
        $in: genresList,
      },
    });

    return this;
  }

  sort() {
    const sortString = this.queryString?.sort;

    // check if request have title
    if (!sortString) return this;

    if (sortString === "rating") {
      this.query = this.query.sort("imdb.rating"); // Sort ascending
    } else if (sortString === "-rating") {
      this.query = this.query.sort("-imdb.rating"); // Sort descending
    } else {
      const sortBy = sortString.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }

    return this;
  }

  limitField() {
    // GET REQUEST FIELD;
    let fields =
      this.queryString.fields || "imdb,plot,genres,poster,title,runtime,slug";
    fields = fields.split(",").join(" ");

    // EXECUTE QUERY
    this.query = this.query.select(fields);

    return this;
  }

  async paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 ? this.queryString.limit * 1 : 20;
    const skip = (page - 1) * limit;

    // Get total count before applying pagination
    if (page === 1) {
      //calc only once when it the first page
      this.totalResults = await this.query.model.countDocuments(
        this.query.getQuery()
      );
    }

    // Apply pagination
    this.query = this.query.skip(skip).limit(limit);

    return this; // Return `this` to support method chaining
  }

  search() {
    const searchTitle = this.queryString.title;

    // check if request have title
    if (!searchTitle) return this;

    // search by title
    this.query = this.query.find({
      title: { $regex: searchTitle, $options: "i" },
    });

    return this;
  }
}

module.exports = MovieQuery;
