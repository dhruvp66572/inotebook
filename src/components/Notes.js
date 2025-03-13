import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/notesContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote1";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiSearch, FiX } from "react-icons/fi";

function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [Note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "General",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  
  const handleClick = () => {
    editNote(Note.id, Note.etitle, Note.edescription, Note.etag);
    refClose.current.click();
    props.showAlert("Note updated successfully", "success");
  };
  
  const handlechange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  
  const update = (currentnote) => {
    ref.current.click();
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag || "General",
    });
  };

  // Get unique tags for filter
  const uniqueTags = [...new Set(notes.map(note => note.tag))];

  // Filter and sort notes
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        note.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === "" || note.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
    if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Notes</h1>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              {viewMode === "grid" ? "List View" : "Grid View"}
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              onClick={() => document.getElementById('addNoteSection').scrollIntoView({ behavior: 'smooth' })}
            >
              <FiPlus /> New Note
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Tags</option>
              {uniqueTags.map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">By Title</option>
            </select>
          </div>
        </div>
      </div>

      <div id="addNoteSection" className="scroll-mt-20">
        <AddNote showAlert={props.showAlert} />
      </div>

      {/* Modal for Edit Note */}
      <button
        ref={ref}
        type="button"
        className="hidden"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-white rounded-lg shadow-lg">
            <div className="modal-header border-b border-gray-200 p-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            <div className="modal-body p-6">
              <form>
                <div className="mb-4">
                  <label htmlFor="Title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="etitle"
                    name="etitle"
                    value={Note.etitle}
                    onChange={handlechange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="Description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="edescription"
                    name="edescription"
                    value={Note.edescription}
                    onChange={handlechange}
                    minLength={5}
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="Tag" className="block text-sm font-medium text-gray-700 mb-1">
                    Tag
                  </label>
                  <select
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="etag"
                    name="etag"
                    value={Note.etag}
                    onChange={handlechange}
                    required
                  >
                    <option value="General">General</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Study">Study</option>
                    <option value="Important">Important</option>
                    {uniqueTags.filter(tag => !["General", "Personal", "Work", "Study", "Important"].includes(tag))
                      .map((tag, index) => (
                        <option key={index} value={tag}>{tag}</option>
                      ))
                    }
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer p-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Cancel
              </button>
              <button
                disabled={Note.etitle.length < 5 || Note.edescription.length < 5}
                type="button"
                className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
                  Note.etitle.length < 5 || Note.edescription.length < 5 
                    ? "opacity-50 cursor-not-allowed" 
                    : "hover:bg-blue-700 transition-colors"
                }`}
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Notes
            {filteredNotes.length > 0 && 
              <span className="ml-2 text-sm font-normal text-gray-500">({filteredNotes.length})</span>
            }
          </h2>
        </div>
        
        {notes.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div className="text-gray-500 mb-2">No Notes Available</div>
            <p className="text-gray-400 text-sm">Create your first note by clicking the "New Note" button</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div className="text-gray-500 mb-2">No matching notes found</div>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? 
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
            "flex flex-col gap-4"}>
            {sortedNotes.map((note) => (
              <Noteitem
                key={note._id}
                note={note}
                showAlert={props.showAlert}
                updatenote={update}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
