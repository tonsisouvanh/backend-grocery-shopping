const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: String,
    salt: String,
    sex: String,
    address: [{ type: Schema.Types.ObjectId, ref: "address", require: true }],
    cart: [
      {
        storeId: { type: String, require: true },
        storeName: { type: String },
        product: [
          {
            _id: { type: String, require: true },
            name: { type: String },
            banner: { type: String },
            price: { type: Number },
            unit: {
              type: Number,
              require: true,
            },
          },
        ],
      },
    ],
    orders: [
      {
        _id: { type: String, require: true },
        amount: { type: Number },
        status: { type: String },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("customer", CustomerSchema);
