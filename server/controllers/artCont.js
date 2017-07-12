'use strict'
const Article = require('../models/article');
var ObjectId = require('mongodb').ObjectID;

let findAllArticle = (req, res) => {
  Article.find({}, (err, data) => {
    if (err) {
      res.send(err)
    }
    res.send(data)
  })
}

let createArticle = (req, res) => {
  Article.create({
    summary: req.body.summary,
    title: req.body.title,
    author: req.body.author,
    release_date: req.body.release_date,
    content: req.body.content
  }, (err, data) => {
    if (err) {
      res.send(err)
    }
    res.send(data)
  })
}

let updateArticle = (req, res) => {
  let body = req.body
  Article.findOne({
    _id: ObjectId(req.params.id)
  }, (err, data) => {
    if (data) {
      Article.update({
        _id: ObjectId(req.params.id)
      }, {
        $set: {
          title : body.title || data.title,
          content : body.content || data.content,
          author : body.author || data.author,
          release_date : body.release_date || data.release_date,
          summary : body.summary || data.summary
        }
      }, (err, data) => {
        if (err) {
          res.send(err)
        }
        res.send('data edited')
      })
    }
    else {
      res.send('no data available to edit')
    }
  })
}

let deleteArticle = (req, res) => {
  Article.remove({
    _id: ObjectId(req.params.id)
  }, (err) => {
    if (err) {
      res.send(err)
    }
    res.send('data deleted')
  })
}

module.exports = {findAllArticle,createArticle,updateArticle,deleteArticle};