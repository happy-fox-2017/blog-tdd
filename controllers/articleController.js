var Article = require('../models/article')

var create = function (req, res) {
  var article = new Article({
    title: req.body.title,
    description: req.body.description
  })
  article.save((err,createdArticle) => {
    err ? res.status(500).send(err) : res.json(createdArticle)
  })
}

var getAll = function (req, res) {
  Article.find((err, articles) => {
    err ? res.status(500).send(err) : res.json(articles)
  })
}

var getOne = function (req, res) {
  Article.findById(req.params.id, (err, article) => {
    err ? res.status(500).send(err) : res.json(article)
  })
}

var remove = function (req, res) {
  Article.findByIdAndRemove(req.params.id, (err, article) => {
    err ? res.status(500).send(err) : res.json(article)
  })
}



module.exports = {
  create,
  getAll,
  remove,
  getOne
}
