const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
chai.use(chaiHttp);

var should = chai.should();
var server = require('../app');
var User = require('../models/users');

describe('User Model', function(){
    var newUserId = '';
    beforeEach((done)=>{
        var newUser = new User({
            name: 'deri kurniawan',
            username: 'deri',
            password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
            email: 'deri@example.com'
        })

        newUser.save((err, result)=>{
            newUserId = result._id
            done();
        })
    })

    afterEach((done)=>{
        User.remove({}, (err)=>{
            done()
        })
    })

    describe('POST --Membuat data user dengan sign up', function(){
        it('Harus mempunyai status 200', (done)=>{
            chai.request(server)
            .post('/api/user/signup')
            .send({
                name: 'deri irmansyah',
                username: 'deriirmansyah',
                password: '123456',
                email: 'deriir@example.com'
            })
            .end((err, res)=>{
                //console.log(res.body)
                res.should.have.status(200);
                done();
            })
        })
        it('Hasil harus berupa sebuah obect', (done)=>{
            chai.request(server)
            .post('/api/user/signup')
            .send({
                name: 'deri irmansyah',
                username: 'deriirmansyah',
                password: '123456',
                email: 'deriir@example.com'
            })
            .end((err, res)=>{
                res.body.should.be.an('object');
                done();
            })
        })
        it('Harus mempunyai data berupa object', (done)=>{
            chai.request(server)
            .post('/api/user/signup')
            .send({
                name: 'deri irmansyah',
                username: 'deriirmansyah',
                password: '123456',
                email: 'deriir@example.com'
            })
            .end((err, res)=>{
                res.body.should.have.property('data')
                res.body.data.should.be.an('object');
                done();
            })
        })
        it('Harus mempunyai data berupa nama berisi: deri irmansyah', (done)=>{
            chai.request(server)
            .post('/api/user/signup')
            .send({
                name: 'deri irmansyah',
                username: 'deriirmansyah',
                password: '123456',
                email: 'deriir@example.com'
            })
            .end((err, res)=>{
                res.body.should.have.property('data')
                res.body.data.name.should.equal('deri irmansyah');
                done();
            })
        })
    })
})