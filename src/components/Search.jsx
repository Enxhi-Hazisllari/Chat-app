import React from 'react';

const Search = () => {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Search user' />
      </div>
      <div className="userChat">
        <img src="" alt="user-image" />
        <div className="userChatInfo">
          <span>Name</span>
        </div>
      </div>
    </div>
  )
}

export default Search;