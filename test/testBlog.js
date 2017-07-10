var chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../app.js'),
    expect = chai.expect;

chai.use(chaiHttp);

  describe('postData', function() {
    it('should post data', function(done) {
      chai.request(app)
        .post('/article')
        .send({
          'title':'ini title',
          'content': 'isi content'
        })
        .end((err,res)=>{
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('title');
          expect(res.body).to.have.property('content');
          done()
        })
    });
  });
  
  describe('getAllData',function(){
    it('should get all data post', function(done){
      chai.request(app)
      .get('/article')
      .end((err,res)=>{
        expect(res.body).to.be.an('array')
        expect(res.body[0]).to.have.a.property('title');
        expect(res.body[1]).to.have.a.property('content');
        done()
      })
    })
  })

