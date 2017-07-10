var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const article_model = require('../models/article')

var create = function(req, res) {
  article_model.create(req.body, function(err, result) {
    if(!err) res.send(result)
    else res.send(err)
  })
}

var getAll = function(req, res) {
  article_model.find({}, function(err, result) {
    if(!err) res.send(result)
    else res.send(err)
  })
}

var remove = function(req, res) {
  let id = req.params._id
  var myquery = {_id : id}
  article_model.remove(myquery, function(err, result) {
    if(!err) res.send(result)
    else res.send(err)
  })
}

var edit = function(req, res, next) {
  let id = req.params._id
  article_model.findById(id, function(err, resultFind) {
    resultFind.title = req.body.title || resultFind.title
    resultFind.body = req.body.body || resultFind.body
    resultFind.createdby = req.body.createdby || resultFind.createdby

    resultFind.save(function(err, resultFind) {
      err ? res.send(err) : res.status(200).send(resultFind)
    })
  })
}

module.exports = {
  create, getAll, remove, edit
}
