/** @format */

class MovieQuery {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // CREATE FILTER OBJ
    const queryObj = { ...this.queryString };
    //exclude non-filter query
    const excludedFields = ["page", "sort", "limit", "fields", "genres"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // FILTERING
    let querStr = JSON.stringify(queryObj);
    querStr = querStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(querStr));

    return this;
  }

  gerne() {
    // CREATE FILTER ARRAY
    if (this.queryString.genres) {
      const genresList = this.queryString?.genres
        .split(",")
        .map((genre) => new RegExp(`\\b${genre.trim()}\\b`, "i"));

      // FILTERING
      this.query = this.query.find({
        genres: {
          $in: genresList,
        },
      });

      // test
      console.log("⭐⭐⭐⭐😭👉⭐💰");
      console.log("Genres List:", genresList);
      console.log("MongoDB Query:", this.query.getQuery());
    } else {
      console.log("No genres found in query string.");
    }

    return this;
  }

  sort() {
    // SORT IF THERE IS REQUEST
    const sortString = this.queryString?.sort;

    if (sortString) {
      // sort by rating
      if (sortString.includes("rating")) {
        this.query = this.query.sort({ "imdb.rating": 1 });
      }
      if (sortString.includes("-rating")) {
        this.query = this.query.sort({ "imdb.rating": -1 });
      }
      // other
      else {
        const sortBy = sortString.split(",").join(" ");
        this.query = this.query.sort(sortBy);
      }
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

  paginate() {
    const page = this.queryString.page * 1 || 1;
    // LIMIT MUST<=100, DEFAULT LIMIT = 50
    const limit =
      this.queryString.limit * 1 <= 100 ? this.queryString.limit * 1 : 50;

    // EXECUTE QUERY
    this.query = this.query.skip((page - 1) * limit).limit(limit);

    return this;
  }
}

module.exports = MovieQuery;
