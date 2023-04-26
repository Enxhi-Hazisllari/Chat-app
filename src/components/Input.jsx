import React, { useContext, useState } from 'react';
import Img from '/image/img.png';
import Attach from '/image/attach.png';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { arrayUnion, doc, getDoc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (!data.chatId) {
      console.log("Error: Chat ID does not exist");
      return;
    }
  
    if (img) {
      const storageRef = ref(storage, uuid());
  
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
  
    const userChatsRef = doc(db, "userChats", currentUser.uid);
    const userChatsDoc = await getDoc(userChatsRef);
    if (userChatsDoc.exists()) {
      await updateDoc(userChatsRef, {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }
  
    const otherUserChatsRef = doc(db, "userChats", data.user.uid);
    const otherUserChatsDoc = await getDoc(otherUserChatsRef);
    if (otherUserChatsDoc.exists()) {
      await updateDoc(otherUserChatsRef, {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }
  
    setText("");
    setImg(null);
  };
  
  

  return (
    <div className='input'>
      <input type="text" placeholder='Message' onChange={(e)=>setText(e.target.value)} value={text} />
      <div className="send">
        <img src={Attach} alt="Attach" />
        <input type="file" style={{display:'none'}} id='file' onChange={(e) => setImg(e.target.files[0])}/>
          <label htmlFor="file">
            <img src={Img} alt="add-image" />
          </label>
          <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;