const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  savedArticles : [
    {
      type: Schema.Types.ObjectId,
      red: 'Article'
    }
  ]
})

module.exports = User = mongoose.model('users', UserSchema);
