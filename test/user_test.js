const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

describe('Create new Account', function () {
  let id = "";
  it('Penambahan dengan data User yang sama', function (done) {
      chai.request(app)
        .post('/api/user')
      .send({
        username : "Admin",
        password : "admin123",
        name : "Antoni Angga",
        email : "antoniangga14@gmail.com"
      })
      .end(function(err,res){
        res.should.have.status(200);
        res.should.have.be.a("Object");
        id = res.body._id;
        res.body.username.should.equal("Admin");
        res.body.name.should.equal("Antoni Angga");
        res.body.email.should.equal("antoniangga14@gmail.com");
        done();
      })
    });
    
  it("Menampikan Data User", function(done) {
    chai.request(app)
    .get('/api/user')
    .end(function(err,res) {
      res.should.have.status(200);
      res.should.have.be.a("Object");
      res.body[0].username.should.equal("Admin");
      res.body[0].name.should.equal("Antoni Angga");
      res.body[0].email.should.equal("antoniangga14@gmail.com");
      done();
    })
  });
  
  it("Update Data User", function(done){
    chai.request(app)
    .put(`/api/user/${id}`)
    .send({username : "Admin", name : "Antoni", email : "antoniangga14@gmail.com"})
    .end((err,res)=>{
      res.should.have.status(200);
      res.should.have.be.a("Object");
      res.body.username.should.equal("Admin");
      res.body.name.should.equal("Antoni");
      res.body.email.should.equal("antoniangga14@gmail.com");
      done();
    })
  });
  
  it("Delete Data User", function(done) {
    chai.request(app)
    .delete(`/api/user/${id}`)
    .end((err,res)=>{
      res.should.have.status(200);
      res.text.should.equal("1 Document User Delete");
      done();
    })
  });
  
});