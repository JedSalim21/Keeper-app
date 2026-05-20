import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  return (
    <div>
      <Header />
      <Footer />
      <CreateArea />
      <Note key={1} title="Note title" content="Note content" />
    </div>
  );
}

export default App;
