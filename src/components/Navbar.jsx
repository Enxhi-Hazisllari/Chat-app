import React from 'react';
import logo from '../../public/image/logo.png';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="logo-chat" className='logo' />
      <div className="user">
        <img src="" alt="user-image" className='user_image' />
        <span>Name</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar;