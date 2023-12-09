import { useState } from "react";
import NoteContext from "./notesContext";

const NoteState = (props)=>{

    const noteInitial = [
        {
          "_id": "657084d4bb22b3093aea12ea",
          "user": "65708474bb22b3093aea12e5",
          "title": "Dhruv Prajapati",
          "description": "This is DP",
          "tag": "dp",
          "date": "2023-12-06T14:27:32.255Z",
          "__v": 0
        },
        {
          "_id": "657084eebb22b3093aea12ec",
          "user": "65708474bb22b3093aea12e5",
          "title": "Dhruv Prajapati",
          "description": "This is DP",
          "tag": "dp",
          "date": "2023-12-06T14:27:58.059Z",
          "__v": 0
        },
        {
          "_id": "65708511bb22b3093aea12ee",
          "user": "65708474bb22b3093aea12e5",
          "title": "Dhruv Prajapati",
          "description": "This is DP",
          "tag": "dp",
          "date": "2023-12-06T14:28:33.594Z",
          "__v": 0
        },
        {
          "_id": "6570853941b9f64ea9dd6d28",
          "user": "65708474bb22b3093aea12e5",
          "title": "Dhruv Prajapati",
          "description": "This is DP",
          "tag": "dp",
          "date": "2023-12-06T14:29:13.982Z",
          "__v": 0
        },
        {
          "_id": "6570c42bff038c0a69246da0",
          "user": "65708474bb22b3093aea12e5",
          "title": "Dhruv Prajapati Update",
          "description": "This is DP Update",
          "tag": "dp Update",
          "date": "2023-12-06T18:57:47.094Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(noteInitial)
   return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;