const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['tithe', 'others', 'expenses'],
    required: true,
  },
  date:{
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Record', recordSchema);
