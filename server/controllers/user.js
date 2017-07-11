const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
var model = {};

model.getAllUsers = function(req, res){
    User.find({}, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Tidak dapat memuat semua user, masalah authentikasi',
                error: err
            })
        } else {
            res.status(200)
            .send({
                message: 'Berhasil menampilkan data user',
                data: result
            })
        }
    })
}

model.signinUser = function(req, res){
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({
        username: username
    }, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Tidak dapat masuk, terdapat error pada database',
                error: err
            })
        } else {
            if(!result){
                res.status(200)
                .send({
                    message: 'Username yang anda masukkan salah'
                })
            } else if(!bycrypt.compare(password, result.password)){
                res.status(200)
                .send({
                    message: 'Password yang anda masukkan salah'
                })
            } else {
                let token = jwt.sign({
                    name: result.name,
                    email: result.email
                }, process.env.RAHASIA, { expiresIn: '1d' });
                res.status(200)
                .send({
                    message: 'Berhasil masuk sebagai user',
                    data: {
                        token: token,
                        name: result.name,
                        email: result.email
                    }
                })
            }
        }
    })
}

model.signupUser = function(req, res){
    let name = req.body.name,
        username = req.body.username,
        password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        email = req.body.email;
    User.create({
        name: name,
        username: username,
        password: password,
        email: email
    }, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Tidak dapat membuat user baru, data harus unik',
                error: err
            })
        } else {
            res.status(200)
            .send({
                message: 'Berhasil terdaftar sebagai user baru',
                data: result
            })
        }
    })
}

module.exports = model