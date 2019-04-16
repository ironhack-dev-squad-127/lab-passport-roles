// Goal of the file: define a model User
// User is going to be the entry point to the "users" collection
// For example: `User.find()` is giving all the users from the collection "users"
// The only fields we can save in a user are: username, password, role, created_at and update_at

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Boss', 'TA', 'Developer'],
    default: 'Developer'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
