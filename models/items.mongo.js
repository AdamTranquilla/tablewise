const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  id: {
    type: Schema.ObjectId,
  },
  name: {
    type: String,
    required: [true, "Name of item is required"],
  },
  price: {
    type: Number,
    required: [true, "price of item is required"],
  },
  validOptionId: {
    type: [
      {
        type: Schema.ObjectId,
        default: [],
      },
    ],
    required: [true, "Valid option array is required"],
  },
  categoryId: {
    type: Schema.ObjectId,
    required: [true, "category is required"],
  },
});

module.exports = mongoose.model("items", itemSchema);
