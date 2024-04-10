import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import BookmarkList from './components/BookmarkList';
import BookmarkDetails from './components/BookmarkDetails';
import BookmarkForm from './components/BookmarkForm';
import UpdateBookmark from './components/UpdateBookmark';

import './index.css'


function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const URL = "http://localhost:3000/"
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(URL); 
        const bookmarksData = await response.json();
        setBookmarks(bookmarksData);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };
  
    fetchBookmarks();
  }, []); 

    // handle deletion of a bookmark
    const onDelete = (id) => {
      fetch(`${URL}bookmarks/${id}`, {
        method: 'DELETE',
      })
      .then(() => {
        setBookmarks(bookmarks.filter(bookmark => bookmark._id !== id));
      })
      .catch(error => console.error('Error deleting bookmark:', error));
    };
  
    // handle updating of a bookmark
    const onUpdate = (id, updatedInfo) => {
      fetch(`${URL}bookmarks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInfo),
      })
      .then(response => response.json())
      .then(updatedBookmark => {
        setBookmarks(bookmarks.map(bookmark => bookmark._id === id ? updatedBookmark : bookmark));
      })
      .catch(error => console.error('Error updating bookmark:', error));
    };
  

  return (
    <div className="bg-cyan-700 min-h-screen">
      <header className="text-center pt-12 pb-8">
      <h1 className="text-4xl font-bold text-yellow-400">Bookmarks</h1>
      </header>
  <Routes>
 <Route path="/" element={<BookmarkList bookmarks={bookmarks} onDelete={onDelete} onUpdate={onUpdate} />} />
 <Route path="bookmarks/:id" element={<BookmarkDetails URL={URL} />} />
 <Route path="/new" element={<BookmarkForm />} />
 <Route path="bookmarks/:id/update" element={<UpdateBookmark />} />
 </Routes>
    </div>
  );
}

export default App
