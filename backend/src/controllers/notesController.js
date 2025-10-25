const Note = require('../models/Note');
const geminiService = require('../services/geminiService');
const { extractTextFromPDF } = require('../utils/pdfParser');

// @desc    Process and create a new note
// @route   POST /api/notes/upload
// @access  Private
// exports.createNote = async (req, res) => {
//   try {
//     const { title, content, fileContent, fileType } = req.body;

//     let textContent;

//     if (fileContent && fileType === 'application/pdf') {
//       // Parse PDF content
//       const buffer = Buffer.from(fileContent, 'base64');
//       textContent = await extractTextFromPDF(buffer);
//     } else if (content) {
//       // Use text content directly
//       textContent = content;
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide either text content or a PDF file'
//       });
//     }

//     // Check if content is too short
//     if (textContent.length < 100) {
//       return res.status(400).json({
//         success: false,
//         message: 'Content is too short to summarize. Please provide more text.'
//       });
//     }

//     // Process text with Gemini
//     console.log("aah");
//     const processedData = await geminiService.processText(textContent);
//     console.log(processedData);

//     // Create note
//     const note = await Note.create({
//       title,
//       originalContent: textContent,
//       summary: processedData.summary,
//       keyPoints: processedData.keyPoints,
//       mcqs: processedData.mcqs,
//       user: req.user._id
//     });

//     res.status(201).json({
//       success: true,
//       data: note
//     });
//   } catch (error) {
//     console.error('Error creating note:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Server error'
//     });
//   }
// };

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    let textContent;

    // Check if PDF file is uploaded
    if (req.file && req.file.mimetype === 'application/pdf') {
      const buffer = req.file.buffer;
      textContent = await extractTextFromPDF(buffer);
    } 
    // If no file, check for plain text input
    else if (content && content.trim().length > 0) {
      textContent = content;
    } 
    // Neither file nor text provided
    else {
      return res.status(400).json({
        success: false,
        message: 'Please provide either text content or a PDF file.',
      });
    }

    // Check length of extracted or provided text
    if (textContent.length < 100) {
      return res.status(400).json({
        success: false,
        message: 'Content is too short to summarize. Please provide more text.',
      });
    }

    // Process with Gemini
    const processedData = await geminiService.processText(textContent);

    // Save to DB
    const note = await Note.create({
      title,
      originalContent: textContent,
      summary: processedData.summary,
      keyPoints: processedData.keyPoints,
      mcqs: processedData.mcqs,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};


// @desc    Get all notes for a user
// @route   GET /api/notes
// @access  Private
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id })
      .select('_id title originalContent summary keyPoints mcqs createdAt')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Make sure user owns the note
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this note'
      });
    }

    res.status(200).json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    // Make sure user owns the note
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this note'
      });
    }

    await note.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};