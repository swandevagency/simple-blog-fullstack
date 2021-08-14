const mongoose = require('mongoose');
const adminSchema = require('./admin/index');
const userSchema = require('./user/index');
const blogSchema = require('./user/blog');

mongoose.model('Admin', adminSchema);
mongoose.model('User', userSchema);
mongoose.model('Blog', blogSchema);