const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
})

AuthorSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = doc._id
    delete ret._id;
    delete ret.__v;
  }
})

module.exports = mongoose.model('Author', AuthorSchema)