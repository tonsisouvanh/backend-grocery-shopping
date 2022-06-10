const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddressSchema = new Schema(
  {
    number: String,
    street: String,
    phuong: String,
    district: String,
    city: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("address", AddressSchema);
