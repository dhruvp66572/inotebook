import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/notesContext";
import Noteitem from "./Noteitem";
import AddNote from "../components/AddNote1";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiSearch, FiX, FiFilter, FiList } from "react-icons/fi";

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

  const uniqueTags = [...new Set(notes.map((note) => note.tag))];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
            My Notes
          </h1>
          <button
            className="px-5 py-2.5 bg-white text-blue-600 font-medium rounded-full hover:bg-opacity-90 transition-all shadow-md flex items-center gap-2 transform hover:scale-105"
            onClick={() =>
              document
                .getElementById("addNoteSection")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            <FiPlus className="stroke-2" /> New Note
          </button>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-10 pr-12 py-3 bg-white bg-opacity-95 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white bg-opacity-95 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-700 appearance-none"
              >
                <option value="">All Tags</option>
                {uniqueTags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiList className="text-gray-400" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white bg-opacity-95 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-700 appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">By Title</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Add Note Section */}
      <div id="addNoteSection" className="scroll-mt-20 mb-10">
        <AddNote showAlert={props.showAlert} />
      </div>

      {/* Notes Display Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            Your Notes
            {filteredNotes.length > 0 && (
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {filteredNotes.length}
              </span>
            )}
          </h2>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-50 text-blue-500 mb-4">
              <FiPlus className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Notes Available</h3>
            <p className="text-gray-500">
              Create your first note by clicking the "New Note" button
            </p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-50 text-blue-500 mb-4">
              <FiSearch className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No matching notes found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedNotes.map((note) => (
              <div key={note._id} className="w-full transform transition-all hover:-translate-y-1">
                <Noteitem
                  note={note}
                  showAlert={props.showAlert}
                  updatenote={update}
                />
              </div>
            ))}
          </div>
        )}
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-white rounded-2xl shadow-xl border-0">
            <div className="modal-header border-b border-gray-100 p-5">
              <h1
                className="text-xl font-bold text-gray-800"
                id="exampleModalLabel"
              >
                Edit Note
              </h1>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            <div className="modal-body p-6">
              <form>
                <div className="mb-5">
                  <label
                    htmlFor="etitle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="etitle"
                    name="etitle"
                    value={Note.etitle}
                    onChange={handlechange}
                    minLength={5}
                    required
                    placeholder="Enter title"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="edescription"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="edescription"
                    name="edescription"
                    value={Note.edescription}
                    onChange={handlechange}
                    minLength={5}
                    rows="4"
                    required
                    placeholder="Enter description"
                  ></textarea>
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="etag"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tag
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    {uniqueTags
                      .filter(
                        (tag) =>
                          ![
                            "General",
                            "Personal",
                            "Work",
                            "Study",
                            "Important",
                          ].includes(tag)
                      )
                      .map((tag, index) => (
                        <option key={index} value={tag}>
                          {tag}
                        </option>
                      ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer bg-gray-50 p-4 rounded-b-2xl flex justify-end space-x-3">
              <button
                type="button"
                className="px-5 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Cancel
              </button>
              <button
                disabled={
                  Note.etitle.length < 5 || Note.edescription.length < 5
                }
                type="button"
                className={`px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg ${
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
    </div>
  );
}

export default Notes;
