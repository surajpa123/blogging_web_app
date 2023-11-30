const mongoose= require("mongoose");

const LikeSchema = new mongoose.Schema({
    likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserData",
        required: true,
    }

})

module.exports = mongoose.model("like",LikeSchema);