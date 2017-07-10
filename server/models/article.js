const mongoose = require('mongoose'),
      Schema   = mongoose.Schema

let articleSchema = new Schema({
  title : String,
  content : String,
  resource: String,
  author : String
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article;