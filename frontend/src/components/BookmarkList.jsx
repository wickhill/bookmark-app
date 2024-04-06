import React from "react";
import Bookmark from "./Bookmark";

const BookmarkList = ({ bookmarkList }) => {
  
  return (
    <div>
      <h1>Bookmark List</h1>
      {bookmarkList.map((bookmark, index) => {
        <Bookmark key={index} bookmark={bookmark} />;
      })}
    </div>
  );
};

export default bookmarkList;
