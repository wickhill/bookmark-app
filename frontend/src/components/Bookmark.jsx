import React from "react";

const Bookmark = ({ bookmark }) => {
  return (
    <div>
      <h2>{bookmark.title}</h2>
      <p>{bookmark.url}</p>
    </div>
  );
};

export default Bookmark;
