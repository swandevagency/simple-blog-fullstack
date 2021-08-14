const mongoose=require('mongoose')

const blogSchema=new mongoose.Schema({
    blogImageOriginalName:{
        type:String,
        required:true
    },
    blogImageName:{
        type:String,
        required:true
    },
    blogImageURL:{
        type:String,
        required:true
    },
    blogTitle:{
        type:String,
        required:true
    },
    blogDescription:{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps:true})
module.exports = blogSchema;
