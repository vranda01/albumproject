const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String
  },
  password: {
     type: String
  },
  dob: {
    type: Date
  },
  con: {
    type: Number
  }
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);