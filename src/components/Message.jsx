import React from 'react';

const Message = () => {
  return (
    <div className='message first__user'>
      <div className="messageInfo">
        <img src="" alt="user-image" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>Message send</p>
        <img src="" alt="image-send" />
      </div>
    </div>
  )
}

export default Message;