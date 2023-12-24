import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notesContext";

const AddNote1 = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  // eslint-disable-next-line

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
    <div className="container my-3">
      <h2>Add Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="Title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            value={Note.title}
            id="title"
            name="title"
            onChange={handlechange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={Note.description}
            name="description"
            onChange={handlechange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={Note.tag}
            name="tag"
            onChange={handlechange}
            minLength={5}
            required
          />
        </div>

        <button
          disabled={Note.title.length < 5 || Note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote1;
