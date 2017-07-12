const app = require('../server/app.js');
const chai = require('chai'),
      chaiHttp = require('chai-http'),
      should = require('chai').should();
      expect = chai.expect

chai.use(chaiHttp)

// describe('User', )

describe('User Login', function() {
  it('should succesfully create a token', function(done) {
    chai.request(app)
    .post('/users/login')
    // .type('form')
    // .set({'Content-Type': 'application/x-www-form-urlencoded'})
    .send({
      username: 'asdf',
      password: 'asdf'
    })
    .end(function (err,data) {
      // console.log(data);
      data.should.have.status(200)
      console.log(data.body);
      done()
    })
    // .catch((err) => {
    //   console.log('=============ada error');
    //   console.log(err);
    //   done()
    // })
  })
})