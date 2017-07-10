'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var articleSchema = new Schema({
  title: String,
  content: String
});

var Article = mongoose.model('article',articleSchema);

module.exports = Article;