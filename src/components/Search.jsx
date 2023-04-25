import React, { useContext, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
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

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Search user' onKeyDown={handleKey} onChange={(e)=>setUserName(e.target.value)} />
      </div>
      {error && <span>User not found!</span>}
      {user && (
        <div className="userChat">
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