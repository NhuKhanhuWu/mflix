/** @format */
const normalizeGenre = (genre) =>
  genre
    .trim()
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const excludedFields = [
  "page",
  "sort",
  "limit",
  "fields",
  "genres",
  "title",
  "match",
];

class MovieQuery {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.totalResults = 0;
    this.isSortByPopular = false;
  }

  filter() {
    const queryObj = { ...this.queryString };
    excludedFields.forEach((el) => delete queryObj[el]);

    // change filter structur => can filter more condition
    let queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  genre() {
    const { genres, match } = this.queryString;

    // check if request has genres
    if (!genres) return this;

    // CREATE FILTER ARRAY
    const genresList = genres.split(",").map(normalizeGenre);

    // FILTERING
    if (match === "all") {
      // match all genres
      this.query = this.query.find({
        genres: { $all: genresList },
      });
    } else {
      // match any of genres (default)
      this.query = this.query.find({
        genres: { $in: genresList },
      });
    }

    return this;
  }

  sort() {
    const sortString = this.queryString?.sort;

    // check if request have title
    if (!sortString) return this;

    if (sortString === "rating") {
      this.query = this.query.sort("imdb.rating"); // Sort by best rated
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

module.exports = { MovieQuery };
