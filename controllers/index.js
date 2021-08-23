const express = require('express')
global.router = express.Router()
global.verify = require('../middleware/auth')

global.fileComponent = require('./components/file')
global.blogComponent = require('./components/blog')
global.errorComponent = require('./components/error')
global.messageComponent= require('./components/message')
global.userComponent=require('./components/user/index')
