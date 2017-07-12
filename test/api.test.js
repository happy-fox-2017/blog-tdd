const chai = require('chai'),
      chaiHttp = require('chai-http'),
      should = require('chai').should();
      expect = chai.expect
const app = require('../server/app.js');
let id;

chai.use(chaiHttp)

describe('Api-testing', function() {
  describe('CREATE', function() {
    it('Should not error', function(done) {
      chai.request(app)
      .post('/articles')
      .send({
        title: 'Title test',
        content: 'Content test',
        resource: 'Unknown',
        author: 'Author test'
      })
      .end(function(err, data) {
        data.should.to.not.be.null
        data.body.should.have.property('title')
        data.body.should.have.property('content')
        data.body.should.have.property('resource')
        data.body.should.have.property('author')
        id = data.body._id;
        done()
      })
    })
  })

//READ
  describe('READ', function() {
    it('Should not error', function(done) {
      chai.request(app)
      .get('/articles')
      .end(function(err, data) {
        data.body.should.be.an('array')
        data.body[0].should.have.property('title')
        data.body[0].should.have.property('content')
        data.body[0].should.have.property('resource')
        data.body[0].should.have.property('author')
        done()
      })
    })
  })

//UPDATE
  describe('UPDATE', function() {
    it('Should not error', function(done) {
      chai.request(app)
      .put('/articles/'+id)
      .send({
        title: 'Title test',
        content: 'Content test',
        resource: 'Unknown',
        author: 'Author test'
      })
      .end(function(err, data) {
        data.text.should.equal('data edited')
        done()
      })
    })
  })

  //DELETE
    describe('DELETE', function() {
      it('Should not error', function(done) {
        chai.request(app)
        .delete('/articles/'+id)
        .end(function(err, data) {
          data.text.should.equal('data deleted')
          done()
        })
      })
    })
})

