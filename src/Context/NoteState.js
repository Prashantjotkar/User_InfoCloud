import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  const getNotes = async () => {
    //TODO:API CALL --get Note in backend also
    const response = await fetch(`http://localhost:5000/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    //TODO:API CALL --add Note in backend also
    const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json(); // parses JSON response into native JavaScript objects
    console.log(note);

    setNotes(notes.concat(note)); //concat returns a new array
  };
  const deleteNote = async (id) => {
    //TODO:API CALL --delete Note in backend also

    const response = await fetch(
      `http://localhost:5000/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    const newnote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnote);
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(
      `http://localhost:5000/api/notes/updatenote/${id}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    const newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      // Logic to edit in client

      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }} >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
