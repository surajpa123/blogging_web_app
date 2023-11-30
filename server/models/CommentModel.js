const mongoose = require("mongoose");

const commentSchema  = new mongoose.Schema({
     commentedBy:{
           type:mongoose.Schema.Types.ObjectId,
           ref: 'UserData',
           required: true,
     },

     text:{
        type:String,
        required:true
     }
})


module.exports = mongoose.model('Comment', commentSchema);