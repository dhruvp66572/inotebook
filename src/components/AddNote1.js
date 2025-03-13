import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notesContext";

const AddNote1 = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [Note, setNote] = useState({ title: "", description: "", tag: "DP" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(Note.title, Note.description, Note.tag);
    setNote({ title: "", description: "", tag: "DP" });
    props.showAlert("Added Successfully", "success");
  };
  
  const handlechange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="container my-4 p-4 bg-light rounded shadow">
      <h2 className="mb-4 text-primary">Add a New Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">
            Title
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            value={Note.title}
            id="title"
            name="title"
            placeholder="Enter title here"
            onChange={handlechange}
            minLength={5}
            required
          />
          {Note.title.length > 0 && Note.title.length < 5 && 
            <small className="text-danger">Title must be at least 5 characters</small>
          }
        </div>
        
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={Note.description}
            name="description"
            rows="3"
            placeholder="Write your note details here"
            onChange={handlechange}
            minLength={5}
            required
          ></textarea>
          {Note.description.length > 0 && Note.description.length < 5 && 
            <small className="text-danger">Description must be at least 5 characters</small>
          }
        </div>
        
        <div className="mb-4">
          <label htmlFor="tag" className="form-label fw-bold">
            Tag
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-tag"></i>
            </span>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={Note.tag}
              name="tag"
              placeholder="Add a tag"
              onChange={handlechange}
              required
            />
          </div>
        </div>

        <button
          disabled={Note.title.length < 5 || Note.description.length < 5}
          type="submit"
          className="btn btn-primary btn-lg px-4"
          onClick={handleClick}
        >
          <i className="fas fa-plus me-2"></i>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote1;
