const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: String,
    type: String,
    description: String,
    price: Number,
    stockNo: Number,
    imageUrl: String,
    available: Boolean,
    storeId: String,
    ratingId: [{ type: Schema.Types.ObjectId, ref: "rating"}],

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
