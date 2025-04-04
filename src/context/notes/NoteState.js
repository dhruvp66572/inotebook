import { useState } from "react";
import NoteContext from "./notesContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_API_URL;
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // Get All  Note
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
    });

    const json1 = await response.json();
   setNotes(json1);
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
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
    });
    
  
    console.log("Deleting the  with id" + id);
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };

  // Edit a Note
const editNote = async (id, title, description, tag) => {
  try {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenode/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    
    let json;
    try {
      json = await response.json();
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      return false;
    }
    
    if (!response.ok) {
      console.error("Error updating note:", json?.error || "Unknown error");
      return false;
    }
    
    // Logic to edit in client
    const newNotes = notes.map(note => {
      if (note._id === id) {
        return { ...note, title, description, tag };
      }
      return note;
    });
    
    setNotes(newNotes);
    return true;
  } catch (error) {
    console.error("Error in editNote:", error);
    return false;
  }
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
