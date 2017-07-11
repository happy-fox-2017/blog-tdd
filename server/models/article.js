const mongoose = require('mongoose'),
      Schema   = mongoose.Schema

let articleSchema = new Schema({
  title : String,
  content : String,
  summary: String,
  author : String,
  release_date: Date
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article;