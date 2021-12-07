const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  joinedDate: String,
  firstname: String,
  lastname:String,
  role: String,
}, {collection: 'users'});
module.exports = userSchema;