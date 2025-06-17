/** @format */
const mongoose = require("mongoose");

const toObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError(`Invalid ID: ${id}`, 400);
  }
  return new mongoose.Types.ObjectId(id);
};

module.exports = toObjectId;
