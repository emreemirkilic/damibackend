const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
  text:      { type: String, required: true },
  category:  { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  order:     { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Question', QuestionSchema);
