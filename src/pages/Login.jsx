import React, { useState } from 'react';
import logo from '/image/logo.png';
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";

const Login = () => {
  
  const [error,setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value; 
    const password = e.target[1].value; 

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    }catch(error){
     setError(true);
    }
  };

  return (
    <div className='formContaner'>
    <div className="formWrapper">
      <img src={logo} alt="logo-chat" className='logo' />
      <span className="title"> Enxhi Chat</span>
      <span className="subtitle">Login</span>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Email'/>
        <input type="password" placeholder='Password'/>
        <button>Sign in</button>
        {error && <span>Something went wrong!</span>}
      </form>
      <p>You don't have an account? <Link to="/register"><span>Register</span></Link></p>
    </div>
  </div>
  );
};

export default Login;