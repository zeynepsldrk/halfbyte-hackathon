const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: {
    type: [String],
    validate: v => Array.isArray(v) && v.length >= 2
  },
  correctAnswer: { type: Number, required: true } // Index of the correct option
});

const quizSchema = new mongoose.Schema({
  workspaceId: {
    type: String, // Changed from ObjectId to String to match Workspace model
    required: true,
    ref: 'Workspace' // Logical reference, not strict ObjectId ref
  },
  noteId: {
    type: mongoose.Schema.Types.ObjectId, // Notes might still be ObjectId if implemented that way, or String. Keeping ObjectId for now or null.
    ref: 'Note',
    default: null
  },
  title: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
  createdBy: {
    type: String, // Changed to Username (String)
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
