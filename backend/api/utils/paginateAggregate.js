/** @format */

// utils/pagination.js
exports.paginateAggregate = async (model, pipeline, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  // Count total results
  const countPipeline = [...pipeline];
  countPipeline.push({ $count: "total" });
  const countResult = await model.aggregate(countPipeline);
  const totalResults = countResult[0]?.total || 0;

  // Apply skip and limit
  const paginatedPipeline = [...pipeline, { $skip: skip }, { $limit: limit }];
  const data = await model.aggregate(paginatedPipeline);

  return {
    totalResults,
    totalPages: Math.ceil(totalResults / limit),
    currentPage: page,
    limit,
    data,
  };
};
