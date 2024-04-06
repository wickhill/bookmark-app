import React, { useState } from "react";
import { Link } from "react-router-dom";

const BookmarkForm = () => {
const [title, setTitle] = useState("")
const [url, setURL] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/bookmarks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, url }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to create bookmark.");
        }
      })
      .then(() => {
        <Link to={"/"}></Link>;
      })
      .catch((error) => console.error("Error:", error));
  };

return (
    <div className="text-black">
      <h1>Create New Bookmark</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          className="text-white"
          type="text"
          name="title"
          id="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="url">URL:</label>
        <input
          className="text-white"
          type="text"
          name="url"
          id="url"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      <a href="/bookmarks">Go back</a>
    </div>
  );
};

  export default BookmarkForm;