/** @format */
class CommentQuery {
  constructor(query, queryString, originalFilter) {
    this.query = query;
    this.queryString = queryString;
    this.totalResult = 0;
    this.originalFilter = originalFilter;
  }

  async paginate() {
    // get limit, page
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;

    // Get total count before applying pagination
    this.totalResult = await this.query.model.countDocuments(
      this.originalFilter
    );

    // get comment
    this.query = this.query.skip((page - 1) * limit).limit(limit);
    return this;
  }

  limitField() {
    // GET REQUEST FIELD;
    let fields = this.queryString.fields || "name,text,date,user_id,movie_id";
    fields = fields.split(",").join(" ");

    // EXECUTE QUERY
    this.query = this.query.select(fields);

    return this;
  }

  sort() {
    // SORT IF THERE IS REQUEST
    const sortString = this.queryString.sort;

    if (sortString) {
      const sortBy = sortString.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }

    return this;
  }
}

module.exports = { CommentQuery };
