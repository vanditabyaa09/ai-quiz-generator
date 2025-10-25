import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiEye, FiFileText } from 'react-icons/fi';

const NoteCard = ({ note, onClick, onDelete, isSelected }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate summary
  const truncate = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div 
      className={`bg-white border rounded-md p-4 hover:shadow-md transition cursor-pointer ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}`}
      onClick={() => onClick(note)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{formatDate(note.createdAt)}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note._id);
          }}
          className="text-gray-400 hover:text-red-500 transition"
          aria-label="Delete note"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
      
      <div className="mt-3">
        <p className="text-sm text-gray-600">{truncate(note.summary)}</p>
      </div>
      
      <div className="mt-4 flex items-center text-xs text-gray-500">
        <FiFileText className="mr-1" size={14} />
        <span>{note.mcqs?.length || 0} quiz questions</span>
      </div>
    </div>
  );
};

export default NoteCard;