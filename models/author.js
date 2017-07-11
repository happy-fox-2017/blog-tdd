'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorArticle = new Schema({
  name: String,
  email: String,
  username: String,
  password: String
})

var Author = mongoose.model('author',authorArticle);

module.exports = Author;