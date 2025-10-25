import { useState } from 'react';
import { FiDownload, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import html2pdf from 'html2pdf.js';

const NoteDetail = ({ note, onClose }) => {
  const [selectedTab, setSelectedTab] = useState('summary');
  const [expandedSections, setExpandedSections] = useState({
    summary: true,
    keyPoints: true,
    mcqs: true
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Toggle section visibility
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Handle download as PDF

  const handleDownload = () => {
    console.log("1")
    try {
      const element = document.getElementById('note-content');
      console.log("2")
      if (!element) {
        console.error('Element with id "note-content" not found.');
        return;
      }

      console.log("3")
  
      const opt = {
        margin: 1,
        filename: `${note.title?.replace(/\s+/g, '_') || 'summary'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

        console.log("4")
  
      html2pdf().set(opt).from(element).save();

    console.log("5")
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{note.title}</h1>
          <p className="text-sm text-gray-500">Created on {formatDate(note.createdAt)}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleDownload}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center text-sm"
            aria-label="Download as PDF"
          >
            <FiDownload className="mr-2" />
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-md"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'summary'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('summary')}
            >
              Summary
            </button>
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'keyPoints'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('keyPoints')}
            >
              Key Points
            </button>
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'mcqs'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('mcqs')}
            >
              Quiz
            </button>
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'original'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTab('original')}
            >
              Original Text
            </button>
          </nav>
        </div>
      </div>

      <div id="note-content" className="overflow-y-auto max-h-[calc(100vh-300px)]">
        {selectedTab === 'summary' && (
          <div className="mb-8">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('summary')}
            >
              <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
              {expandedSections.summary ? (
                <FiChevronUp className="text-gray-500" />
              ) : (
                <FiChevronDown className="text-gray-500" />
              )}
            </div>
            {expandedSections.summary && (
              <div className="mt-4 prose max-w-none">
                <p className="whitespace-pre-line text-gray-700">{note.summary}</p>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'keyPoints' && (
          <div className="mb-8">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('keyPoints')}
            >
              <h2 className="text-xl font-semibold text-gray-800">Key Points</h2>
              {expandedSections.keyPoints ? (
                <FiChevronUp className="text-gray-500" />
              ) : (
                <FiChevronDown className="text-gray-500" />
              )}
            </div>
            {expandedSections.keyPoints && (
              <div className="mt-4">
                <ul className="list-disc pl-5 space-y-2">
                  {note.keyPoints && note.keyPoints.map((point, index) => (
                    <li key={index} className="text-gray-700">{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'mcqs' && (
          <div className="mb-8">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('mcqs')}
            >
              <h2 className="text-xl font-semibold text-gray-800">Quiz Questions</h2>
              {expandedSections.mcqs ? (
                <FiChevronUp className="text-gray-500" />
              ) : (
                <FiChevronDown className="text-gray-500" />
              )}
            </div>
            {expandedSections.mcqs && (
              <div className="mt-4 space-y-6">
                {note.mcqs && note.mcqs.map((mcq, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-md">
                    <p className="font-medium mb-3 text-gray-800">Q{index + 1}. {mcq.question}</p>
                    <div className="space-y-2 ml-4">
                      {mcq.options.map((option, optIndex) => {
                        const optionLetter = String.fromCharCode(65 + optIndex); // A, B, C, D
                        const isCorrect = optionLetter === mcq.correctAnswer;
                        
                        return (
                          <div 
                            key={optIndex}
                            className={`p-2 rounded-md ${
                              isCorrect ? 'bg-green-50 border-l-4 border-green-500' : ''
                            }`}
                          >
                            <p className="text-gray-700">
                              <span className="font-medium">{optionLetter}.</span> {option}
                              {isCorrect && (
                                <span className="ml-2 text-green-600 text-sm font-medium">
                                  (Correct Answer)
                                </span>
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedTab === 'original' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Original Text</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="whitespace-pre-line text-gray-700">{note.originalContent}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetail;