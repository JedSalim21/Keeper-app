import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { supabase } from "./supabase/client";
import SecurityUpdateGoodOutlinedIcon from "@mui/icons-material/SecurityUpdateGoodOutlined";

function App() {
  const [notes, setNotes] = useState([]);

  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

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

  function handleEdit(note) {
    setEditingNote(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  }

  async function deleteNote(id) {
    const { data, error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      console.log(error);
    } else {
      fetchNotes();
    }
  }

  async function handleUpdate(id) {
    const { data, error } = await supabase
      .from("notes")
      .update({
        title: editTitle,
        content: editContent,
      })
      .eq("id", id);

    if (error) {
      console.log(error);
    } else {
      setEditingNote(null);
      fetchNotes();
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        if (editingNote === noteItem.id) {
          return (
            <div key={noteItem.id} className="note edit-box">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />

              <button onClick={() => handleUpdate(noteItem.id)}>
                <SecurityUpdateGoodOutlinedIcon />
              </button>
            </div>
          );
        }

        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={handleEdit}
            note={noteItem}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
