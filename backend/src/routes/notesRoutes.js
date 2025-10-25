// backend/src/routes/notesRoutes.js
const express = require('express');
const { createNote, getNotes, getNote, deleteNote } = require('../controllers/notesController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage(); // keeps file in memory
const upload = multer({ storage });

// All routes are protected
router.use(protect);

router.route('/')
  .get(getNotes)
  .post(createNote);

router.post('/upload', protect, upload.single('file'), createNote);

router.route('/:id')
  .get(getNote)
  .delete(deleteNote);

module.exports = router;