import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notesContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updatenote } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  // Format date if available
  const formattedDate = note.date 
    ? new Date(note.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : null;

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 p-2">
      <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col ${isExpanded ? 'scale-[1.02]' : ''}`}>
        <div className={`p-5 flex-1 ${note.tag ? 'border-l-4' : ''}`} style={{ borderColor: note.tag ? getTagColor(note.tag) : 'transparent' }}>
          <div className="flex justify-between items-start mb-3">
            <h5 className="text-xl font-semibold text-gray-800 line-clamp-1 mr-2">{note.title}</h5>
            <div className="flex space-x-2 shrink-0">
              <button 
                className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted Successfully", "success");
                }}
                title="Delete note"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
              <button 
                className="text-blue-500 hover:text-blue-700 transition-colors duration-200 p-1"
                onClick={() => {
                  updatenote(note);
                }}
                title="Edit note"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Show less" : "Show more"}
              >
                <i className={`fa-solid fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
              </button>
            </div>
          </div>
          
          <div className="prose prose-sm max-w-none">
            <p className={`text-gray-600 ${isExpanded ? '' : 'line-clamp-3'} mb-3`}>
              {note.description}
            </p>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-between items-center">
            <div>
              {note.tag && (
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1">
                  {note.tag}
                </span>
              )}
            </div>
            {formattedDate && (
              <span className="text-xs text-gray-500 mb-1 italic">
                {formattedDate}
              </span>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="px-4 py-3 bg-gray-50 rounded-b-lg border-t border-gray-200 flex justify-end space-x-3">
            <button 
              className="text-yellow-500 hover:text-yellow-700 transition-colors duration-200 p-1"
              title="Pin note"
            >
              <i className="fa-solid fa-thumbtack"></i>
            </button>
            <button 
              className="text-purple-500 hover:text-purple-700 transition-colors duration-200 p-1"
              title="Archive note"
            >
              <i className="fa-solid fa-box-archive"></i>
            </button>
            <button 
              className="text-green-500 hover:text-green-700 transition-colors duration-200 p-1"
              onClick={() => {
                props.showAlert("Note copied to clipboard", "success");
                navigator.clipboard.writeText(`${note.title}\n\n${note.description}`);
              }}
              title="Copy to clipboard"
            >
              <i className="fa-solid fa-copy"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to generate consistent colors for tags
const getTagColor = (tag) => {
  // Simple hash function to generate color
  const hash = tag.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // List of pleasant pastel colors
  const colors = [
    '#8bbabb', '#6eaef2', '#ffb6b9', '#fae3d9',
    '#bbded6', '#d4a5a5', '#ffcb77', '#a8d8ea'
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

export default Noteitem;
