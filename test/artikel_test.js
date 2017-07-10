const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

describe('Test Untuk Memastikan artikel yang di simpan berhasil', function () {
  let id = ""
  it('Penambahan dengan data Artikel yang sama', function (done) {
      chai.request(app)
        .post('/api/artikel')
      .send({
        judul : "5 Makanan di Hacktiv8",
        pesan : "1. Sate, 2. Soto, 3. Gudek, 4. Kol goreng, 5. Tempe Goreng",
        autor : "Antoni Angga"
      })
      .end(function(err,res){
        res.should.have.status(200);
        //ini ngecheck data nya mirip gak
        id = res.body._id;
        res.should.have.be.a("Object");
        res.body.judul.should.equal("5 Makanan di Hacktiv8");
        res.body.pesan.should.equal("1. Sate, 2. Soto, 3. Gudek, 4. Kol goreng, 5. Tempe Goreng");
        res.body.autor.should.equal("Antoni Angga");
        done();
      })
    });
  it('Menampilkan Data', function(done){
    chai.request(app)
    .get('/api/artikel')
    .end(function(err,res){
      res.should.have.status(200);
      res.should.have.be.a("Object");
      res.body[0].judul.should.equal("5 Makanan di Hacktiv8");
      res.body[0].pesan.should.equal("1. Sate, 2. Soto, 3. Gudek, 4. Kol goreng, 5. Tempe Goreng");
      res.body[0].autor.should.equal("Antoni Angga");
      done();
    })
  })
  
  it('Update Data', (done)=>{
    chai.request(app)
    .put(`/api/artikel/${id}`)
    .send({"judul":"5 Makanan di Hacktiv8", "pesan" : "1. ayam goreng, 2. Soto, 3. Gudek, 4. Kol goreng, 5. Tempe Goreng", "autor" : "Antoni Angga"})
    .end(function(err,res) {
      res.should.have.status(200);
      res.should.have.be.a("Object")
      res.body.judul.should.equal("5 Makanan di Hacktiv8");
      res.body.pesan.should.equal("1. ayam goreng, 2. Soto, 3. Gudek, 4. Kol goreng, 5. Tempe Goreng");
      res.body.autor.should.equal("Antoni Angga");
      done();
    })
  })
  
  it('Hapus Data', function(done) {
    chai.request(app)
    .delete(`/api/artikel/${id}`)
    .end(function(err,res) {
      res.should.have.status(200);
      res.text.should.equal("1 Document Artikel Deleted");
      done();
    })
  })
})


 