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

describe('GET Article API features', function () {
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

describe('Create article API', function () {

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

describe('Get one Article API', function () {
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
      done()
    })
  })
})
