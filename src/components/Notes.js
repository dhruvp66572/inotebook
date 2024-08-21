import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/notesContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote1";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  let navigate =  useNavigate()
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [Note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "DP",
  });

  const handleClick = (e) => {
    editNote(Note.id, Note.etitle, Note.edescription, Note.etag);
    refClose.current.click();
    props.showAlert("Update Successfully", "success");
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
      etag: currentnote.tag,
    });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none "
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
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={Note.etitle}
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
                    id="edescription"
                    name="edescription"
                    value={Note.edescription}
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
                    id="etag"
                    name="etag"
                    value={Note.etag}
                    onChange={handlechange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={
                  Note.etitle.length < 5 || Note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Note</h2>
        <div className="container">
          {notes.length === 0 && "No Notes Available "}
        </div>

        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              note={note}
              showAlert={props.showAlert}
              updatenote={update}
            />
          );
        })}
        {/*         
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updatenote={update} />;
        })} */}
      </div>
    </>
  );
}

export default Notes;
