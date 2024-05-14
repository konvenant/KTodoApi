const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: String,
  category: String,
  username: String,
  checked: Boolean,
  date: String
});

module.exports = mongoose.model('Todo', todoSchema);