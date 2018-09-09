const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  description: String,
  status: Boolean,
  dueDate: Date
}, {timestamps: true});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;