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
  presetOptionId: [
    {
      type: String,
      default: [],
    },
  ],
  validOptionId: [
    {
      type: String,
      default: [],
    },
  ],
  categoryId: {
    type: Schema.ObjectId,
    required: [true, "category is required"],
  },
});

module.exports = mongoose.model("items", itemSchema);
