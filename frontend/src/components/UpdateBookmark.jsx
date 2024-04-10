import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

const UpdateBookmark = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [url, setURL] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch bookmark data when component mounts
        fetch(`http://localhost:3000/bookmarks/${id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((jsonRes) => {
          setTitle(jsonRes.title);
          setURL(jsonRes.url);
        });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submission behavior
    
        // Perform your submission logic here, e.g., sending data to a server
        fetch(`http://localhost:3000/bookmarks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, url }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json(); // or you can directly navigate without waiting for the response
            } else {
              throw new Error("Failed to update bookmark.");
            }
          })
          .then(() => {
            navigate("/"); // Navigate to home page after successful POST
          })
          .catch((error) => console.error("Error:", error));
      };
  return (
    <div className="text-black">
      <h2>Update Bookmark</h2>
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
      <a href="/">Go back</a>
    </div>
  )
}

export default UpdateBookmark;