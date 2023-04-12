import React from 'react'

const Register = () => {
  return (
    <div className='formContaner'>
      <div className="formWrapper">
        <span className="logo">Enxhi Chat</span>
        <span className="title">Register</span>
        <form action="">
          <input type="text" placeholder='Name'/>
          <input type="email" placeholder='Email'/>
          <input type="password" placeholder='Password'/>
          <input type="file" />
          <button>Sign up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  )
}

export default Register;