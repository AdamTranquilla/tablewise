const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  id: {
    type: Schema.ObjectId,
  },
  name: {
    type: String,
    required: [true, "Name of topping is required"],
  },
  price: {
    type: Number,
    required: [true, "Price of topping is required"],
  },
});

module.exports = mongoose.model("Options", optionSchema);
