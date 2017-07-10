var chai = require('chai')
var chaiHttp = require('chai-http')
var app = require('../app')
var should = require('chai').should()
var url = 'http://localhost:8080'

chai.use(chaiHttp)

describe('get API features', function () {
  it('should return status 200 and json', function (done) {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      res.should.to.have.status(200)
      res.should.to.be.json
      done()
    })
  })
  it('should return article with property title', function (done) {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      res.should.to.have.property('title')
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

describe('Create article API', function (done) {
  it('should create an article with title \'hello world\'', function (done) {
    chai.request(app)
    .post('/')
    .send({
      title: 'hello world',
      description: 'halo dunia'
    })
    .end((err, res) => {
      res.should.to.be.json
    })
  })
})
