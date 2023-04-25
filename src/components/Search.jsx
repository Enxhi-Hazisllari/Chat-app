import React, { useContext, useState } from "react";
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc,} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleKey = (e) =>{
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
      try {
        const response = await getDoc(doc(db, "chats", combinedId));

        if (!response.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
          
          //create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      }catch(error){}

      setUser(null);
      setUserName("")
  };

  return (
    <div className='search'>
      <div className="searchForm">
        <input 
          type="text" 
          placeholder='Search user' 
          onKeyDown={handleKey} 
          onChange={(e)=>setUserName(e.target.value)}
          value={userName}/>
      </div>
      {error && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="user-image" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}

    </div>
  )
}

export default Search;