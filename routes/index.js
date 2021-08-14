const express = require('express')
const bodyParser = require('body-parser')
const path=require('path')

module.exports = (app) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static(path.join(__dirname, 'uploads')))
    app.use('/admin/signup', require('./admin/signup'));
    app.use('/admin/login', require('./admin/index'));
    app.use('/admin/manage', require('./admin/manage'));
    app.use('/user/signup', require('./user/auth/signup'));
    app.use('/user/login', require('./user/auth/login'));
    app.use('/user/me/enable2fa', require('./user/auth/secondLogin'));
    app.use('/user/me', require('./user/profile'));
    app.use('/user/blog', require('./user/blog'));
}