const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  title: String,
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\//.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  }
})
//Reference: Custom Validators
//https://mongoosejs.com/docs/validation.html

const Bookmark = mongoose.model("Bookmark", BookmarkSchema)

module.exports = Bookmark
