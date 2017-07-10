const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

describe('Login kembalikan Token', function () {  
  it('login benar dan kembalikan token', function () {
    chai.request(app)
    .post('/api/login')
    .send({
      username : "Admin",
      password : "admin112"
    })
    .end(function(err,res){
      res.should.have.status(200);
      res.text.should.be.a('string');
      should.exist(res.text);
    })
  });
});