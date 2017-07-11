const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: String,
    content: String,
    authorName: String,
    authorUsername: String,
    authorEmail: String
}, { timestamps: true });

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;