var chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    app = require('../app.js'),
    id = "";
    
chai.use(chaiHttp);

describe('userSignUp', ()=>{
  it('should create user data',(done)=>{
    chai.request(app)
    .post('/blog/author')
    .send({
      'name': 'ade anugerah',
      'email': 'ade@yahoo.com',
      'username': 'ade',
      'password': 'ade123'
    })
    .end((err,res)=>{
      console.log(res.body);
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('username');
      expect(res.body).to.have.property('password');
      id = res.body._id
      done()
    })
  })
})

describe('userSignIn',()=>{
  it('should get data user',(done)=>{
    chai.request(app)
    .post('/blog/author/signin/')
    .end((err,res)=>{
      console.log('=======================================');
      console.log(res.body);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('username');
      expect(res.body).to.have.property('password');
      done()
    })
  })
})