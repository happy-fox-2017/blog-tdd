const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

//use chai shaould
var should = chai.should();
var server = require('../app');
var Article = require('../models/articles');

//test here..
describe('Article', function(){
    var newArticle_id = "";
    beforeEach(done => {
        var newArticle = new Article({
            title: "Kal Ho Naa Ho",
            content: "Lorem ipsum set dollor amet",
            authorName: "deri kurniawan",
            authorUsername: "derihai",
            authorEmail: "derihai@example.com"
        })

        newArticle.save((err, data)=>{
            newArticle_id = data._id;
            done()
        })
    });

    afterEach( done => {
        Article.remove({}, (err)=>{
            done();
        })
    })

    describe('GET - menampilkan semua article', () => {
        it('Harus menampilkan status 200', (done)=> {
            chai.request(server)
            .get('/api/article/')
            .end((err, response)=>{
                //console.log('result*******', response);
                response.should.have.status(200);
                done();
            })

        })
        it('Harus menampilkan hasil result berupa object', (done)=>{
            chai.request(server)
            .get('/api/article')
            .end((err, response)=>{
                response.body.should.be.an('object');
                done();
            })
        })
        it('Hasil result harus mempunyai property message', (done)=>{
            chai.request(server)
            .get('/api/article')
            .end((err, response)=>{
                response.body.should.have.property('message');
                done();
            })
        })
        it('Hasil result harus mempunyai message --Berhasil mendapatkan data--', (done)=>{
            chai.request(server)
            .get('/api/article')
            .end((err, response)=>{
                response.body.message.should.equal('Berhasil mendapatkan data');
                done();
            })
        })
        it('Hasil result harus mempunyai property data', (done)=>{
            chai.request(server)
            .get('/api/article')
            .end((err, response)=>{
                response.body.should.have.property('data');
                done();
            })
        })
        it('property data harus mempunyai array', (done)=>{
            chai.request(server)
            .get('/api/article')
            .end((err, response)=>{
                response.body.data.should.be.an('array');
                done();
            })
        })
        it('property data harus mempunyai array didalamnya terdapat object', (done)=>{
            chai.request(server)
            .get('/api/article')
            .end((err, response)=>{
                response.body.data.forEach((result)=>{
                    result.should.be.an('object');
                })
                done();
            })
        })
        it('property object pada data harus mempunyai property title, content, dan authorName', (done)=>{
            chai.request(server)
            .get('/api/article')
            .end((err, response)=>{
                response.body.data.forEach((result)=>{
                    result.should.have.property('title');
                    result.should.have.property('content');
                    result.should.have.property('authorName');
                })
                done();
            })
        })
    })

    describe('GET -mendapatkan 1 data article', ()=>{
        it('Harus menampilkan status 200', (done)=> {
            chai.request(server)
            .get('/api/article/' + newArticle_id)
            .end((err, response)=>{
                //console.log('result di get 1 data******************', response);
                response.should.have.status(200);
                done();
            })
        })
         it('Harus menampilkan hasil result berupa object', (done)=>{
            chai.request(server)
            .get('/api/article/' + newArticle_id)
            .end((err, response)=>{
                response.body.should.be.an('object');
                done();
            })
        })
        it('Hasil result harus mempunyai message --Berhasil mendapatkan data--', (done)=>{
            chai.request(server)
            .get('/api/article/'+ newArticle_id)
            .end((err, response)=>{
                response.body.message.should.equal('Berhasil mendapatkan data');
                done();
            })
        })
        it('Hasil result harus mempunyai property data', (done)=>{
            chai.request(server)
            .get('/api/article/' + newArticle_id)
            .end((err, response)=>{
                response.body.should.have.property('data');
                done();
            })
        })
        it('property data harus mempunyai object', (done)=>{
            chai.request(server)
            .get('/api/article/' + newArticle_id)
            .end((err, response)=>{
                response.body.data.should.be.an('object');
                done();
            })
        })
        it('data harus mempunyai property title', (done)=>{
            chai.request(server)
            .get('/api/article/' + newArticle_id)
            .end((err, response)=>{
                response.body.data.should.have.property('title');
                done();
            })
        })
    })

    describe('POST --Memasukkan data article', function(){
        let data = {
                title: 'wonder woman',
                content: 'belom nonton sama sekali brohhh!',
                authorName: 'deri irmansyah',
                authorUsername: 'dericoy',
                authorEmail: 'dericoy@example.com'
            };
            //secondArticle_id = '';
        it('Harus mengembalikan status 200 dan message : --Berhasil memasukkan data-- ', (done)=>{
            chai.request(server)
            .post('/api/article/')
            .send(data)
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.message.should.equal('Berhasil memasukkan data')
                secondArticle_id = response.body.data._id;
                done();
            })
        })
        it('title dalam data harus berisi --wonder woman--', (done)=>{
            chai.request(server)
            .post('/api/article/')
            .send(data)
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.data.title.should.equal('wonder woman');
                done();
            })
        })
        it('authorName dalam data harus berisi --deri irmansyah--', (done)=>{
            chai.request(server)
            .post('/api/article/')
            .send(data)
            .end((err, response)=>{
                response.body.data.authorName.should.equal('deri irmansyah');
                done();
            })
        })
        it('authorUsername dalam data harus berisi --dericoy--', (done)=>{
            chai.request(server)
            .post('/api/article/')
            .send(data)
            .end((err, response)=>{
                response.body.data.authorUsername.should.equal('dericoy');
                done();
            })
        })
        it('authorEmail dalam data harus berisi --dericoy@example.com--', (done)=>{
            chai.request(server)
            .post('/api/article/')
            .send(data)
            .end((err, response)=>{
                response.body.data.authorEmail.should.equal('dericoy@example.com');
                done();
            })
        })
    })

    describe('PUT --Mengupdate data article', function(){
        it('Harus Memberikan status 200', (done)=>{
            chai.request(server)
            .put('/api/article/' + newArticle_id)
            .send({
                authorUsername: 'derihong'
            })
            .end((err, response)=>{
                response.should.have.status(200)
                done();
            })
        })
        it('Harus berupa object dengan property message: Berhasil update data--', (done)=>{
            chai.request(server)
            .put('/api/article/' + newArticle_id)
            .send({
                authorUsername: 'derihong'
            })
            .end((err, response)=>{
                response.body.should.be.an('object');
                response.body.should.have.property('message');
                done();
            })
        })
        it('Harus mengembalikan message --Berhasil update data--', (done)=>{
            chai.request(server)
            .put('/api/article/' + newArticle_id)
            .send({
                authorUsername: 'derihong'
            })
            .end((err, response)=>{
                response.body.message.should.equal('Berhasil update data');
                done();
            })
        })
        it('Harus merubah data authorUsername:  --derihong--', (done)=>{
            chai.request(server)
            .put('/api/article/' + newArticle_id)
            .send({
                authorUsername: 'derihong'
            })
            .end((err, response)=>{
                response.body.data.authorUsername.should.equal('derihong');
                done();
            })
        })
        it('Data harus berupa object', (done)=>{
            chai.request(server)
            .put('/api/article/' + newArticle_id)
            .send({
                authorUsername: 'derihong'
            })
            .end((err, response)=>{
                response.body.data.should.be.an('object');
                done();
            })
        })
        it('Harus tetap medapatkan data title:  --Kal Ho Naa Ho--', (done)=>{
            chai.request(server)
            .put('/api/article/' + newArticle_id)
            .send({
                authorUsername: 'derihong'
            })
            .end((err, response)=>{
                response.body.data.title.should.equal('Kal Ho Naa Ho');
                done();
            })
        })
    })

    describe('DELETE --Menghapus data article', function(){
        it('Harus mendapatkan status 200', (done)=>{
            chai.request(server)
            .delete('/api/article/' + newArticle_id)
            .end((err, response)=>{
                response.should.have.status(200)
                done()
            })
        })
        it('Harus mempunyai message : Berhasil mengahpus article', (done)=>{
            chai.request(server)
            .delete('/api/article/' + newArticle_id)
            .end((err, response)=>{
                response.body.message.should.have.equal('Berhasil menghapus article')
                done()
            })
        })
        it('Response harus berupa object', (done)=>{
            chai.request(server)
            .delete('/api/article/' + newArticle_id)
            .end((err, response)=>{
                response.body.should.be.an('object')
                done();
            })
        })
        it('Data harus berupa object', (done)=>{
            chai.request(server)
            .delete('/api/article/' + newArticle_id)
            .end((err, response)=>{
                response.body.data.should.be.an('object');
                done();
            })
        })
        it('Data yang di hapus beratribut tittle harus berisi: Kal Ho Naa Ho', (done)=>{
            chai.request(server)
            .delete('/api/article/' + newArticle_id)
            .end((err, response)=>{
                response.body.data.title.should.equal('Kal Ho Naa Ho')
                done()
            })
        })
        it('JIka ditampilkan maka akan mereturn array kosong', (done)=>{
            chai.request(server)
            .delete('/api/article/' + newArticle_id)
            .end((err, response)=>{
                response.body.data.should.be.an('object')
            })

            chai.request(server)
            .get('/api/article/')
            .end((err, response)=>{
                response.body.data.should.be.an('array')
                response.body.data.length.should.equal(0)
                done();
            })
        })
    })
})