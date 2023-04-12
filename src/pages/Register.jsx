import React from 'react'
import logo from '../../public/image/logo.png';
import add from '../../public/image/addAvatar.png';

const Register = () => {
  return (
    <div className='formContaner'>
      <div className="formWrapper">
        <img src={logo} alt="logo-chat" className='logo' />
        <span className="title"> Enxhi Chat</span>
        <span className="subtitle">Register</span>
        <form>
          <input type="text" placeholder='Name'/>
          <input type="email" placeholder='Email'/>
          <input type="password" placeholder='Password'/>
          <input style={{display:'none'}} type="file" id='file'/>
          <label htmlFor="file">
           <img src={add} alt="avatar-image" />
           <span>+ Add avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  )
}

export default Register;