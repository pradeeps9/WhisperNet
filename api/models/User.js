// Creating user-schema to store user related details
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username : {
    type : String,
    min : 4,
    required : true,
    unique : true,
  },
  password : {
    type : String,
    required : true,
  }
});

const User = model('User', userSchema);

module.exports = User;

