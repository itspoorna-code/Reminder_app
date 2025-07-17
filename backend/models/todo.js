const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: false },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", TodoSchema);
