import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notesContext";
import { FiTrash2, FiEdit2, FiChevronDown, FiChevronUp, FiCopy, FiArchive, FiStar } from "react-icons/fi";

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
    <div className="h-full">
      <div 
        className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col 
          ${isExpanded ? 'ring-2 ring-blue-200 scale-[1.01]' : ''}`}
      >
        <div 
          className={`p-6 flex-1 flex flex-col ${note.tag ? 'border-l-4' : ''}`} 
          style={{ borderColor: note.tag ? getTagColor(note.tag) : 'transparent' }}
        >
          {/* Header with title and action buttons */}
          <div className="flex justify-between items-start mb-4">
            <h5 className="text-xl font-bold text-gray-800 truncate mr-2 flex-1">{note.title}</h5>
            <div className="flex items-center gap-2 shrink-0">
              <IconButton 
                icon={<FiTrash2 />} 
                colorClass="text-red-500 hover:text-red-600 hover:bg-red-50" 
                title="Delete note"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted Successfully", "success");
                }}
              />
              <IconButton 
                icon={<FiEdit2 />} 
                colorClass="text-blue-500 hover:text-blue-600 hover:bg-blue-50" 
                title="Edit note"
                onClick={() => updatenote(note)}
              />
              <IconButton 
                icon={isExpanded ? <FiChevronUp /> : <FiChevronDown />} 
                colorClass="text-gray-500 hover:text-gray-700 hover:bg-gray-100" 
                title={isExpanded ? "Show less" : "Show more"}
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </div>
          </div>
          
          {/* Note content */}
          <div className="flex-1">
            <p className={`text-gray-700 ${isExpanded ? '' : 'line-clamp-3'} mb-4 leading-relaxed`}>
              {note.description}
            </p>
          </div>
          
          {/* Footer with tags and date */}
          <div className="mt-auto flex flex-wrap justify-between items-center pt-3">
            <div className="flex flex-wrap">
              {note.tag && (
                <span 
                  className="inline-block rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2 mb-1"
                  style={{ backgroundColor: `${getTagColor(note.tag)}40` }}
                >
                  {note.tag}
                </span>
              )}
            </div>
            {formattedDate && (
              <span className="text-xs text-gray-500 mb-1 italic font-light">
                {formattedDate}
              </span>
            )}
          </div>
        </div>

        {/* Expanded actions panel */}
        {isExpanded && (
          <div className="px-6 py-3 bg-gray-50 rounded-b-xl border-t border-gray-200 flex justify-end gap-3">
            <IconButton 
              icon={<FiStar />} 
              colorClass="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50" 
              title="Pin note"
            />
            <IconButton 
              icon={<FiArchive />} 
              colorClass="text-purple-500 hover:text-purple-600 hover:bg-purple-50" 
              title="Archive note"
            />
            <IconButton 
              icon={<FiCopy />} 
              colorClass="text-green-500 hover:text-green-600 hover:bg-green-50" 
              title="Copy to clipboard"
              onClick={() => {
                props.showAlert("Note copied to clipboard", "success");
                navigator.clipboard.writeText(`${note.title}\n\n${note.description}`);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable icon button component
const IconButton = ({ icon, colorClass, title, onClick }) => (
  <button 
    className={`${colorClass} transition-all duration-200 
      rounded-full p-2 flex items-center justify-center`}
    onClick={onClick}
    title={title}
  >
    {icon}
  </button>
);

// Helper function to generate consistent colors for tags
const getTagColor = (tag) => {
  const hash = tag.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const tagColors = {
    'General': '#64748b',
    'Personal': '#3b82f6',
    'Work': '#ef4444',
    'Study': '#10b981',
    'Important': '#f59e0b'
  };
  
  if (tagColors[tag]) {
    return tagColors[tag];
  }
  
  const colors = [
    '#8bbabb', '#6eaef2', '#ffb6b9', '#fae3d9',
    '#bbded6', '#d4a5a5', '#ffcb77', '#a8d8ea'
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

export default Noteitem;
