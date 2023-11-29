// creating a model with mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{
        type:String,
        requied: true,
        unique: true,
    },
    password:String,
    role:{
        type:String,
        default: 'user'
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],

})

const User = mongoose.model("UserData",userSchema);

module.exports = User;


// creating a user with class and constructor;

// function CreateUser(email,password){

//    // this.firstName = firstName;
//    // this.lastName = lastName;
//     this.email = email;
//     this.password = password;

// }

// module.exports = CreateUser;
