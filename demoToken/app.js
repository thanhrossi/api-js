'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

var users = [
    {id: 1, username: 'cuong', password: '123', email: 'cuong@gmail.com'}
    , {id: 2, username: 'huy', password: '456', email: 'huy@gmail.com'},
    {id: 3, username: 'thanh', password: '456', email: 'thanh@gmail.com'}
];

function findByUsername(username) {
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        if (user.username === username) {
            return user;
        }
    }
    return null;
}

var secret = 'techmaster';

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.route('/login')
    .get(function (req,res) {
        res.json({
            message: 'Xin dang nhap dich vu'
        })
    })
    .post(function (req,res) {
        var user = findByUsername(req.body.username);

        if(user) {
            if(user.password === req.body.password) {
                var token = jwt.sign({
                    name: user.name,
                    username: user.username
                },secret,{expiresIn: '1440m'});

                res.json({
                    message: 'Dang nhap thanh cong',
                    token: token
                })
            } else {
                res.json({
                    message: 'Sai ten dang nhap hoac mat khau'
                })
            }
        } else {
            res.json({
                message: 'Sai ten dang nhap hoac mat khau'
            })
        }
    })

function checkAuthenticate(req, res, next) {
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.json({
                    message: 'Chua xac thuc'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        res.json({
            message: 'Chua xac thuc'
        })
    }
}


app.get('/', checkAuthenticate , function(req,res){
    res.send(users);
})

app.listen(3000, function () {
    console.log('run');
})