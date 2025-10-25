import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import NoteCard from '../components/Notes/NoteCard';
import UploadForm from '../components/Notes/UploadForm';
import NoteDetail from '../components/Notes/NoteDetail';
import { getNotes, deleteNote } from '../services/noteService';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
  
      // Use `console.log(data)` to check the exact response shape
      console.log("Fetched notes:", data);
      
      // If data.notes is the actual array
      setNotes(data.data); // ✅ Correct if notes are inside `data.notes`
      console.log("777 = ", notes)
    } catch (error) {
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }  
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleNoteDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
      if (selectedNote && selectedNote._id === id) {
        setSelectedNote(null);
      }
      toast.success('Note deleted successfully');
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  const handleAddNote = (note) => {
    const note1 = note.data;
    console.log("vjhhj",note1)
    console.log("www", notes)
    // setNotes([note1, ...notes]);
    setNotes((prevNotes) => {
      const currentNotes = Array.isArray(prevNotes) ? prevNotes : [];
      return currentNotes.concat(note);
    });
    console.log("Hello");
    console.log(notes)
    setSelectedNote(note1);
  };

  const handleCloseDetail = () => {
    setSelectedNote(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Upload your documents or paste text to get AI-generated summaries and quizzes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Upload New Document</h2>
            <UploadForm onNoteAdded={handleAddNote} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Your Notes</h2>
            {loading ? (
              <div className="py-8 text-center">
                <svg className="animate-spin h-8 w-8 mx-auto text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : Array.isArray(notes) && notes.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No notes found. Upload your first document!</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {Array.isArray(notes) && notes.map((note, index) => (
                  <NoteCard
                    key={note._id || index}
                    note={note}
                    onClick={() => handleNoteClick(note)}
                    onDelete={() => handleNoteDelete(note._id)}
                    isSelected={selectedNote && selectedNote._id === note._id}
                  />
                ))}

              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {selectedNote ? (
            <NoteDetail note={selectedNote} onClose={handleCloseDetail} />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center h-full flex flex-col items-center justify-center">
              <img 
                src="/note-placeholder.svg" 
                alt="Select a note" 
                className="w-48 h-48 mb-6 text-gray-300" 
              />
              <h2 className="text-2xl font-semibold mb-2">No Note Selected</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Upload a new document or select an existing note to view its summary, key points, and quiz questions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 