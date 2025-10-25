const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  originalContent: {
    type: String,
    required: [true, 'Content is required']
  },
  summary: {
    type: String,
    required: [true, 'Summary is required']
  },
  keyPoints: {
    type: [String],
    required: [true, 'Key points are required']
  },
  mcqs: {
    type: [{
      question: String,
      options: [String],
      correctAnswer: String
    }],
    required: [true, 'MCQs are required']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
NoteSchema.index({ title: 'text', summary: 'text' });

module.exports = mongoose.model('Note', NoteSchema);