const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    comment: String,
    imageUrl: [{type: String}],
    point: Number,
    customer: {
      _id: String,
      name: String,
      imageUrl: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rating", RatingSchema);
