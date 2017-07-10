const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

describe('Test Untuk Memastikan artikel yang di simpan berhasil', function () {
  it('Penambahan dengan data yang sama', function (done) {
    chai.request(app)
      .post('/api/artikel')
    .send({
      judul : "5 Makanan di Hacktiv8",
      pesan : "1. Sate, 2. Soto, 3. Gudek, 4. Kol goreng, 5. Tempe Goreng",
      autor : "Antoni Angga"
    })
    .end(function(err,res){
      res.should.have.status(200)
      //ini ngecheck data nya mirip gak ?
      res.body.judul.should.equal("5 Makanan di Hacktiv8");
      res.body.pesan.should.equal("1. Sate, 2. Soto, 3. Gudek, 4. Kol goreng, 5. Tempe Goreng")
      res.body.autor.should.equal("Antoni Angga")
      done()
    })
  });
  it('Check Data Type harus Object', function(done) {
    chai.request(app)
      .post('/api/artikel')
    .send({
      judul : "5 Makanan di Hacktiv8",
      pesan : "1. Sate, 2. Soto, 3. Gudek, 4. Kol goreng, 5. Tempe Goreng",
      autor : "Antoni Angga"
    })
    .end(function(err,res){
      //ini ngecheck Data Types nya 
      res.should.have.status(200);
      res.should.have.be.a("Object");
      done()
    })
  })
})



 