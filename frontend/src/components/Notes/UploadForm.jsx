import { useState } from 'react';
import { FiUpload, FiFileText, FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';

const UploadForm = ({onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState('text'); // 'text' or 'file'
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      toast.error('Please select a PDF file');
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1")
    if (!title) {
      toast.error('Please provide a title');
      return;
    }
    console.log("2")
    if (uploadType === 'text' && !content) {
      toast.error('Please enter some content');
      return;
    }
    console.log("3")
    if (uploadType === 'file' && !file) {
      toast.error('Please select a PDF file');
      return;
    }
    console.log("4")
    setLoading(true);

    try {
      console.log("4")
      const formData = new FormData();
      formData.append('title', title);
      formData.append('uploadType', uploadType);
      
      if (uploadType === 'text') {
        formData.append('content', content);
      } else {
        formData.append('file', file);
      }
      console.log("5")
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/notes/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log("5")
      console.log("qqq",onNoteAdded);
      let temp = onNoteAdded(response.data);
      console.log("6")
      console.log("temp: ",temp);
      if (response.data) {
        console.log("7")
        toast.success('Note processed successfully!');
        onNoteAdded(response.data);
        setTitle('');
        setContent('');
        setFile(null);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to process document');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-md">
          <button
            type="button"
            className={`flex-1 py-2 px-3 rounded text-sm font-medium flex items-center justify-center ${
              uploadType === 'text' 
                ? 'bg-white shadow-sm text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setUploadType('text')}
          >
            <FiFileText className="mr-2" size={16} />
            Paste Text
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-3 rounded text-sm font-medium flex items-center justify-center ${
              uploadType === 'file' 
                ? 'bg-white shadow-sm text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setUploadType('file')}
          >
            <FiUpload className="mr-2" size={16} />
            Upload PDF
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your notes a title"
          required
        />
      </div>
      
      {uploadType === 'text' ? (
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your text content here for summarization"
            rows={6}
          ></textarea>
        </div>
      ) : (
        <div className="mb-4">
          <label htmlFor="pdf" className="block text-sm font-medium text-gray-700 mb-1">
            PDF File
          </label>
          <input
            type="file"
            id="pdf"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: {file.name}
            </p>
          )}
        </div>
      )}
      
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        disabled={loading}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            Generate AI Summary & Quiz
          </>
        )}
      </button>
    </form>
  );
};

export default UploadForm;