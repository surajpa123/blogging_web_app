const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserData',
    required: true,
  },
  likes:[{type:mongoose.Schema.Types.ObjectId, ref:"like"}],
  comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}]
  ,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;