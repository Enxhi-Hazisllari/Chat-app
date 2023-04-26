import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({message}) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  console.log(message)
  return (
    <div className='message first__user'>
      {/* <div className="messageInfo">
        <img src="" alt="user-image" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>Message send</p>
        <img src="" alt="image-send" />
      </div> */}
    </div>
  )
}

export default Message;