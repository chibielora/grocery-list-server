const mongoose = require('mongoose')

const grocerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  marked: Boolean
}, {
  timestamps: true
})

module.exports = grocerySchema
