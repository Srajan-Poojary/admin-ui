import React from "react";

export default function DeleteButton({ onClick }) {
  return (
    <>
      <button className="delete-btn" onClick={onClick}>
        Delete Selected
      </button>
    </>
  );
}
