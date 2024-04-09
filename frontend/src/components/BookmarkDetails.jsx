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
    <div>
      {bookmark ? (
        <div>
          <h2>{bookmark.title}</h2>
          <p>URL: <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.url}</a></p>
        </div>
      ) : (
        <p>Loading bookmark details...</p>
      )}
    </div>
  )
}

export default BookmarkDetails