const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

var should = chai.should();
var user = require('../models/article')
var server = require('../app')
var token = ''


describe('sign up', function() {
  it('it should create a new user ', function(done) {
    //done bersifat asynchronus
    //kalo tidak ada berfifat synchronus
    chai.request(server)
    .post('/api/signup')
    .send({
      name: "erwin",
      username: "erwin",
      password: "erwin"
    })
    .end(function(err, res) {
      res.should.have.status(200)
      res.body.should.be.a("object")
      res.body.should.have.property("name")
      res.body.should.have.property("username")
      res.body.should.have.property("password")
      done()
    })
  })
})


describe('sign in', function() {
  it('it should create a token ', function(done) {
    //done bersifat asynchronus
    //kalo tidak ada berfifat synchronus
    chai.request(server)
    .post('/api/signin')
    .send({
      username: "erwin",
      password: "erwin"
    })
    .end(function(err, res) {
      res.should.have.status(200)
      res.should.not.have.status(404)
      res.body.should.be.a("object")
      console.log(res.text);
      token = res.text
      // token = res
      done()
    })
  })
})
