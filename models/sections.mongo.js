const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of section is required"],
  },
});

module.exports = mongoose.model("sections", sectionSchema);
