const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  username: {
    type: String, // Changed from userId (ObjectId) to username (String)
    required: true
  },
  score: { type: Number, required: true },
  total: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('QuizResult', quizResultSchema);
