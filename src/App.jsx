import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { supabase } from "./supabase/client";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function addNote(newNote) {
    const { date, error } = await supabase.from("notes").insert({
      title: newNote.title,
      content: newNote.content,
    });

    if (error) {
      console.log(error);
    } else {
      fetchNotes();
    }
  }

  async function fetchNotes() {
    const { data, error } = await supabase.from("notes").select("*");

    if (error) {
      console.log(error);
    } else {
      setNotes(data);
    }
  }

  async function deleteNote(id) {
    const { data, error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      console.log(error);
    } else {
      fetchNotes();
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
