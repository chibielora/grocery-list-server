const mongoose = require('mongoose')
const grocerySchema = require('./grocery')

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  groceries: [grocerySchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('List', listSchema)
