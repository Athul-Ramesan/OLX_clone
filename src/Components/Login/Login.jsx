import React, { useState,useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import Logo from '../../olx-logo.png';
import './Login.css';
import { MyAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {user} = useContext(MyAuth)

  console.log(user,'user');
  const navigate = useNavigate()
  const handleLogin = (e)=>{
    e.preventDefault()
    const newPassword = password.trim()
        const newEmail = email.trim()
        if( !newPassword || !newEmail ){
          return toast.error('Input must not be empty')
        }
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredentials)=>{
      console.log(userCredentials);
      navigate('/home')
    })
    .catch((err)=>{
      console.log(err.message)
      toast.error(err.code)
    })
    
    
  }
  const handleSignup = ()=>{
    navigate('/signup')
  }
  return (
    <div>
      <Toaster />
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e)=> setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e)=> setPassword(e.target.value)} 
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={handleSignup}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
