const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    poster_path: {
      type: String,
    },
    movieRunTime: {
      type: String,
    },
    type:{
      type:String,
    },
    title:{
      type:String,
    }
  },
  { timestamps: true }
);

const Like = mongoose.model('Like', LikeSchema);

module.exports = { Like };
