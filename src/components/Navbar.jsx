import React from 'react';
import logo from '/image/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="logo-chat" className='logo' />
      <div className="user">
        <img src="" alt="user-image" className='user_image' />
        <span>Name</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar;