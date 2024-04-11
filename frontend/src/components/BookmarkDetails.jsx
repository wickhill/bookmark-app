import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const BookmarkDetails = ({ URL }) => {
    const [bookmark, setBookmark] = useState(null)
    const { id } = useParams()
  
    useEffect(() => {
      fetch(`${URL}bookmarks/${id}`)
        .then(res => res.json())
        .then(data => setBookmark(data))
        .catch(error => console.error('Error fetching bookmark details:', error));
    }, [id])
  return (
    <div className="flex flex-col items-center justify-center">
     <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 m-4 text-center">
      {bookmark ? (
        <div>
          <p className="text-2xl font-bold text-sky-800 mb-4">{bookmark.title}</p>
          <p className="text-xl mb-4">URL: <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">{bookmark.url}</a></p>
        </div>
      ) : (
        <p>Loading bookmark details...</p>
      )}
      <a href="/" className="text-lg text-blue-600 hover:text-blue-800 inline-block mt-4">Go back</a>
    </div>
    </div> 
  )
}

export default BookmarkDetails