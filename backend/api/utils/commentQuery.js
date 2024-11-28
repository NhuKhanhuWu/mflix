/** @format */
class CommentQuery {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginate() {
    // get limit, page
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;

    // get comment
    this.query = this.query.skip((page - 1) * limit).limit(limit);
    return this;
  }

  limitField() {
    // GET REQUEST FIELD;
    let fields = this.queryString.fields || "name,text,date";
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

module.exports = CommentQuery;
