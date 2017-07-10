var chai = require('chai')
var chaiHttp = require('chai-http')
var app = require('../app')
var should = require('chai').should()
var Article = require('../models/article')
// var url = 'http://localhost:3000'

chai.use(chaiHttp)

// describe('Login Feature', function () {
//   it('should')
// })

describe('GET /articles', function () {
  it('should return status 200 and json', function (done) {
    chai.request(app)
    .get('/articles')
    .end((err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.an('array')
      done()
    })
  })
  it('should return article with property title', function (done) {
    chai.request(app)
    .get('/articles')
    .end((err, res) => {
      res.should.not.have.status(500)
      res.should.not.be.html
      res.body.should.not.a('string')
      done()
    })
  })
  it('should not return status 404', function (done) {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      res.should.not.to.have.status(404)
      done()
    })
  })
})

describe('POST /articles', function () {

  afterEach(function () {
    Article.remove({title: 'test create'}, err => {
    })
  })

  it('should create an article and not null and has property title', function (done) {
    chai.request(app)
    .post('/articles')
    .send({
      title: 'test create',
      description: 'halo dunia'
    })
    .end((err, res) => {
      res.should.have.status(200)
      res.should.not.null
      res.body.should.have.property('title')
      res.body.should.have.property('description')
      done()
    })
  })
})

describe('GET /articles/:id', function () {
  var id
  beforeEach(function (done) {
    let article = new Article({
      title: 'judul',
      description: 'deskripsi'
    })
    article.save((err, article) => {
      if (err) {
        console.log(err)
      } else {
        id = article._id
        done()
      }
    })
  })

  afterEach(done => {
    Article.remove({}, err => {
      if (err) {console.log(err);}
      done()
    })
  })

  it(`should get one article with title 'judul'`, function (done) {
    chai.request(app)
    .get(`/articles/${id}`)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('title', 'judul')
      res.body.should.have.property('description', 'deskripsi')
      done()
    })
  })

  it('should recive status 500, with no article', function (done) {
    chai.request(app)
    .get(`/articles/2`)
    .end((err, res) => {
      res.should.have.status(500)
      res.body.should.not.have.property('title')
      res.body.should.not.have.property('description')
      done()
    })
  })

})

describe('DELETE /articles/:id', function () {
  let id
  beforeEach(function (done) {
    let article = new Article({
      title: 'delete judul',
      description: 'delete deskripsi'
    })
    article.save((err, article) => {
      if (err) {
        console.log(err)
      } else {
        id = article._id
        done()
      }
    })
  })

  it(`should delete article with title 'delete judul'`, function (done) {
    chai.request(app)
    .delete(`/articles/${id}`)
    .end((err, res) => {
      res.should.have.status(200)
      // res.should.not.have.property('title')
      done()
    })
  })
})

// describe('PUT /articles/:id', function () {
//   let id
//   beforeEach(function (done) {
//     let article = new Article({
//       title: 'judul asal',
//       description: 'deskripsi asal'
//     })
//     article.save((err, article) => {
//       id = article._id
//     })
//     done()
//   })
//
//   afterEach(function (done) {
//     Article.findByIdAndRemove(id, (err) => {
//       console.log(err);
//     })
//     done()
//   })
//
//   it(`should have title "edited judul"`, function (done) {
//     chai.request(app)
//     .put(`/articles/${id}`)
//     .send({
//       title: 'edited judul'
//     })
//     .end((err, res) => {
//       res.should.have.status(200)
//       res.body.should.have.property('title', 'edited judul')
//       done()
//     })
//   })
//
// })

describe('PUT /api/articles/:id', () => {
    var target;
    beforeEach(done => {
      var newArticle = new Article({
        title: "Test article",
        description: "Lorem ipsum dolop dolop",
      })
      newArticle.save((err, saved) => {
        if(err) {
          console.log(err)
        } else {
          target = saved._id;
          done()
        }
      })
    })
    it('should edit new article', function(done) {
      chai.request(app)
      .put(`/articles/${target}`)
      .send({
        title: "Test article edited",
        description: "Lorem ipsum dolop dolopss"
      })
      .end(function(err, res) {
        res.should.have.status(200)
        // res.body.should.be.a('object')
        // res.body.should.have.property('author', "Budi Sudarsonois")
        // res.body.should.have.property('title', "Test article edited")
        // res.body.should.have.property('article_content', "Lorem ipsum dolop dolopss")
        done()
      })
    })
  })
