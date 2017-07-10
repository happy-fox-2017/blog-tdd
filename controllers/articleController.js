'use strict'

var Article = require('../models/article');

var createArticle = (req,res)=>{
  Article.create({
    title: req.body.title,
    content: req.body.title
  },(err,result)=>{
    if (err) {
      res.send(err.message)
    }
    console.log(result);
    res.send(result)
  })
}

var getAllArticle = (req,res)=>{
  Article.find({},(err,result)=>{
    if (err) {
      res.send(err.message)
    }
    console.log(result);
    res.send(result);
  })
}

module.exports = {
  createArticle,
  getAllArticle
}