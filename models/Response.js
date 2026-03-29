const mongoose = require('mongoose');
const ResponseSchema = new mongoose.Schema({
  answers: [{
    questionId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    questionText:  String,
    categoryName:  String,
    categoryEmoji: String,
    answer:        Boolean,
  }],
  submittedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Response', ResponseSchema);
