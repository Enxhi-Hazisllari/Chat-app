import React, { useContext } from 'react';
import logo from '/image/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <img src={logo} alt="logo-chat" className='logo' />
      <div className="user">
        <img src={currentUser.photoURL} alt="user-image" className='user_image' />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar;