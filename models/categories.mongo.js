const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  id: {
    type: Schema.ObjectId,
  },
  name: {
    type: String,
    required: [true, "Name of category is required"],
  },
});

module.exports = mongoose.model("categories", categorySchema);
