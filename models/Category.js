const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  username: String,
  date: String
});
module.exports = mongoose.model('Category', categorySchema);