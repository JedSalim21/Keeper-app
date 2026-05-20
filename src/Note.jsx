import React from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function Note(props) {
  return (
    <div className="note">
      <h1>Title</h1>
      <p>Content</p>
      <button>
        <DeleteOutlinedIcon />
      </button>
    </div>
  );
}

export default Note;
