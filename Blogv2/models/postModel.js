const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    validate(value) {
      if (value.length < 10) {
        throw new Error("Content must above 10 charaters");
      }
    },
  },
});

module.exports = mongoose.model("Post", postSchema);
