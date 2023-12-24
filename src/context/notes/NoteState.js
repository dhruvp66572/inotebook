import { useState } from "react";
import NoteContext from "./notesContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // Get All  Note
  const getNotes = async () => {
    console.log("adding a new Note");
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    //  API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
   setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
    });
    
    const json = await response.json();
    console.log(json+"Delete Note");
    
    console.log("Deleting the  with id" + id);
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response =  await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    
    const json = await response.json();
    console.log(json+"Edit");
    
    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let i = 0; i < notes.length; i++) {
      const element = newNotes[i];

      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
