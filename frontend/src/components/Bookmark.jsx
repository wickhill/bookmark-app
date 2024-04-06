import React from 'react';

function Bookmark({ bookmark, onDelete, onUpdate }) {
  const { _id, title, url } = bookmark;

  return (
    <div className="bookmark">
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
{/* Reference for target: https://www.w3schools.com/tags/att_a_target.asp */}
{/* Reference for noreferrer: https://www.w3schools.com/tags/att_a_rel.asp */}
      {onDelete && (
        <button onClick={() => onDelete(_id)}>Delete</button>
      )}
      {onUpdate && (
        <button onClick={() => onUpdate(_id)}>Update</button>
      )}
    </div>
  );
}

export default Bookmark;
