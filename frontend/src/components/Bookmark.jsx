import React from 'react';
import { Link } from "react-router-dom"

function Bookmark({ bookmark, onDelete }) {
  const { _id, title, url } = bookmark;

  return (
    <div className="bg-slate-300 rounded-lg shadow-lg p-4 flex flex-col items-center">
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-2xl mb-2 text-blue-600 hover:text-blue-800">
        {title}
      </a> 
      {/* Reference for target: https://www.w3schools.com/tags/att_a_target.asp */}
      {/* Reference for noreferrer: https://www.w3schools.com/tags/att_a_rel.asp */}
      <Link to={`/new`} className="mb-2 text-green-600 hover:text-green-800">Add new</Link>
      {/* Show Info button */}
      <Link to={`/bookmarks/${_id}`} className="mb-2 text-purple-600 hover:text-purple-800">Show Info</Link>
      {/* Link to update route*/}
      <Link to={`/bookmarks/${_id}/update`} className="mb-2 text-indigo-600 hover:text-indigo-800">Update</Link>
       {/* Delete button */}
       <button onClick={() => onDelete(_id)} className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:focus:ring-blue-800">Delete</button>
    </div>
  );
}

export default Bookmark;
