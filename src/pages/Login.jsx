import React from 'react'
import logo from '/image/logo.png';

const Login = () => {
  return (
    <div className='formContaner'>
    <div className="formWrapper">
      <img src={logo} alt="logo-chat" className='logo' />
      <span className="title"> Enxhi Chat</span>
      <span className="subtitle">Login</span>
      <form>
        <input type="email" placeholder='Email'/>
        <input type="password" placeholder='Password'/>
        <button>Sign in</button>
      </form>
      <p>You don't have an account? Sign up</p>
    </div>
  </div>
  )
}

export default Login;