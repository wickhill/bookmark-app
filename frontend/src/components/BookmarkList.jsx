import React from 'react';
import Bookmark from './Bookmark';

function BookmarkList({ bookmarks, onDelete, onUpdate }) {
    return (
      <div>
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <Bookmark key={bookmark._id} bookmark={bookmark} onDelete={onDelete} onUpdate={onUpdate} />
          ))
        ) : (
          <p>No bookmarks found</p>
        )}
      </div>
    );
  }
  

export default BookmarkList;
