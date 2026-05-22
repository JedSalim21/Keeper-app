import React from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={() => {
          props.onEdit(props.note);
        }}
      >
        <ModeEditOutlinedIcon />
      </button>
      <button
        onClick={() => {
          props.onDelete(props.id);
        }}
      >
        <DeleteOutlinedIcon />
      </button>
    </div>
  );
}

export default Note;
