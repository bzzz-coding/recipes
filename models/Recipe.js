const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private'],
  },
  // ingredients: {
  //   // list of ingredient objects e.g. ['peas': {'amount': 2, 'unit': 'cup'}, 'bread flour': {'amount': 300, 'unit': 'gram'}]
  //   type: Array,
  //   default: [],
  // },
  // great: {
  //   type: Number,
  //   required: true,
  // },
  // alright: {
  //   type: Number,
  //   required: true,
  // },
  // meh: {
  //   type: Number,
  //   required: true,
  // },
  // // how many people have used the recipe
  // used: {
  //   type: Number,
  //   required: true,
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Recipe', RecipeSchema)
