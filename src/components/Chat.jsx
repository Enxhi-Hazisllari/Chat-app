import React from 'react';
import Cam from '/image/cam.png'
import Add from '/image/add.png'
import More from '/image/more.png'
import Messages from './Messages';
import Input from './Input';

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Name</span>
        <div className="chatIcons">
          <img src={Cam} alt="camera-img" />
          <img src={Add} alt="add-img" />
          <img src={More} alt="more-img" />
        </div>
      </div>  
      <Messages />
      <Input/>
    </div>
  )
}

export default Chat;