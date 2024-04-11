import React from 'react';
import Bookmark from './Bookmark';

function BookmarkList({ bookmarks, onDelete, onUpdate }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <div key={bookmark._id} className="col-span-1">
              <Bookmark bookmark={bookmark} onDelete={onDelete} onUpdate={onUpdate} />
              </div>
          ))
        ) : (
          <p className="text-center text-2xl text-orange-500">No bookmarks found</p>
        )}
      </div>
    );
  }
  

export default BookmarkList;
