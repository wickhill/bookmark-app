import React from 'react';
import { Link } from "react-router-dom"

function Bookmark({ bookmark, onDelete }) {
  const { _id, title, url } = bookmark;

  return (
    <div className="bookmark">
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
      {/* Reference for target: https://www.w3schools.com/tags/att_a_target.asp */}
      {/* Reference for noreferrer: https://www.w3schools.com/tags/att_a_rel.asp */}
      {/* Show Info button */}
      <Link to={`/bookmarks/${_id}`}>Show Info</Link>
      {/* Link to update route*/}
      <Link to={`/bookmarks/${_id}/update`}>Update</Link>
       {/* Delete button */}
       <button onClick={() => onDelete(_id)}>Delete</button>
    </div>
  );
}

export default Bookmark;
