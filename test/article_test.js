process.env.NODE_ENV = 'test';
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

var should = chai.should();
var article = require('../models/article')
var server = require('../app')

describe('article GET', function() {
  beforeEach(function(done) {
    var createArticle = new article({
      title: "test 123",
      body: "test 123",
      createdby: "123"
    })
    createArticle.save(() => {
      done()
    })
  })

  afterEach(function(done) {
    article.remove({}, function(err) {
      done()
    })
  })

  describe('get all articles', function() {
    it('it should get all articles ', function(done) {
      chai.request(server)
      .get('/api/articles')
      .end(function(err, res) {
        res.body.should.be.a("array");
     	  res.body.length.should.equal(1);
        res.should.have.status(200);
        res.should.not.have.status(500);
        res.body[0].should.have.property("title")
        res.body[0].should.have.property("body")
        res.body[0].should.have.property("createdby")
        done()
      })
    })
  })
})

  describe('post some articles', function() {
    it('it should create new an articles ', function(done) {
      //done bersifat asynchronus
      //kalo tidak ada berfifat synchronus
      chai.request(server)
      .post('/api/articles')
      .send({
        title: "post",
        body: "post",
        createdby: "post"
      })
      .end(function(err, res) {
        res.should.have.status(200)
     		res.body.should.be.a("object")
        res.body.should.have.property("title")
        res.body.should.have.property("body")
        res.body.should.have.property("createdby")
        res.body.title.should.equal("post")
        res.body.body.should.equal("post")
        res.body.createdby.should.equal("post")
        done()
      })
    })
  })

  describe('article Update', function() {
    var id = ''
    beforeEach(function(done) {
      var createArticle = new article({
        title: "mocha-testing",
        body: "how to learn mocha",
        createdby: "erwin"
      })
      createArticle.save((err, result) => {
        // console.log('ini result: ', result);
        if(err) {
          console.log(err);
        } else {

          id = result._id
          done()
        }
      })
    })

    afterEach(function(done) {
      article.remove({}, function(err) {
        done()
      })
    })
    describe('put an article', function() {

        it('it should edit a single article', function(done) {
          console.log('id::',id);
        chai.request(server)
        .put(`/api/articles/${id}`)
        .send({title: "Spider",
               body: "Man",
               createdby: "homecoming"})
        .end(function(err, res){
          res.should.have.status(200);
          res.should.not.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("body");
          res.body.should.have.property("createdby");
          res.body.title.should.equal("Spider")
          res.body.body.should.equal("Man")
          res.body.createdby.should.equal("homecoming")
          done();
        })
      })

    })
  })

describe('article remove', function() {
  beforeEach(function(done) {
    var createArticle = new article({
      title: "delete",
      body: "delete body",
      createdby: "delete created"
    })
    createArticle.save(() => {
      done()
    })
  })

  afterEach(function(done) {
    article.remove({}, function(err) {
      done()
    })
  })
  describe('delete one article', function() {
    it('it should delete a single article', function(done) {
      chai.request(server)
      .get('/api/articles')
      .end(function(err, res1) {
        chai.request(server)
        .delete('/api/articles/'+res1.body[0]._id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.not.have.status(404);
          res.body.should.be.a('object');
          done();
        })
      })
    })
  })
})
