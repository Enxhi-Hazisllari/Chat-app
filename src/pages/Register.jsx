import React, { useState } from 'react';
import logo from '/image/logo.png';
import add from '/image/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const [error,setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value; 
    const email = e.target[1].value; 
    const password = e.target[2].value; 
    const file = e.target[3].files[0]; 

    try{
      const response = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(true)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL
            });
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'userChats', response.user.uid), {});
            navigate("/");
          });
        }
      );
    }catch(error){
     setError(true);
    }
  };

  return (
    <div className='formContaner'>
      <div className="formWrapper">
        <img src={logo} alt="logo-chat" className='logo' />
        <span className="title"> Enxhi Chat</span>
        <span className="subtitle">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Name'/>
          <input type="email" placeholder='Email'/>
          <input type="password" placeholder='Password'/>
          <input style={{display:'none'}} type="file" id='file'/>
          <label htmlFor="file">
           <img src={add} alt="avatar-image" />
           <span>+ Add avatar</span>
          </label>
          <button>Sign up</button>
          {error && <span>Something went wrong!</span>}
        </form>
        <p>You do have an account?<Link to="/login"><span>Login</span></Link></p>
      </div>
    </div>
  )
}

export default Register;