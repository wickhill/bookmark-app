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
    <div className="flex flex-col items-center justify-center ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 m-4">
      <h2 className="text-2xl font-bold text-center text-amber-600 mb-8">Update Bookmark</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <label htmlFor="title" className="text-sm font-medium text-gray-700 block mb-2">Title:</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          name="title"
          id="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor ="url" className="text-sm font-medium text-gray-700 block mb-2">URL:</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          name="url"
          id="url"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
      </form>
      <a href="/"className="text-blue-600 hover:text-blue-800 inline-block mt-4">Go back</a>
    </div>
    </div>
  )
}

export default UpdateBookmark;