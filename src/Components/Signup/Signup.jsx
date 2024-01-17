import React, { useContext, useEffect, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
// import AuthContext from '../../store/AuthContext';
import { MyAuth } from '../../store/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'
import toast ,{Toaster} from 'react-hot-toast';

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const { user, setUser } = useContext(MyAuth)
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const name = username.trim()
        const newPassword = password.trim()
        const newEmail = email.trim()
        const newPhone = email.trim()
        // const tenDigitPhoneNumberRegex = /^[^eE\d]{10}$/;
        if(!name || !newPassword || !newEmail || !newPassword || !newPhone){
          return toast.error('Input must not be empty')
        }
        // console.log(tenDigitPhoneNumberRegex.test(newPhone));
        console.log(newPhone.length);
        if(newPhone.length <10){
          return toast.error('Phone number should be 10 digit')
        }
      const response = await createUserWithEmailAndPassword(auth, email, password)

     await updateProfile(auth.currentUser, {
        displayName: username,
        phoneNumber: phone
      })
      //passing response user object to Context provider for global use.
      const userDetails = await addDoc(collection(db, 'users'), {
        id: response.user.uid,
        username: username,
        phone: phone
      })
      setUser(response.user)
      navigate('/home')
      
      console.log(userDetails, 'userDetails');

    } catch (error) {
      console.log(error.message);
      toast.error(error.code)
    }
  }
  const handleLogin = ()=>{
    navigate('/login')
  }

  useEffect(() => {

  }, [user])
  return (
    <div>
      <Toaster/>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            value={username}
            className="input"
            type="text"

            name="name"
            onChange={(e) => setUsername(e.target.value)} 
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input value={email}
            className="input"
            type="email"

            name="email"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            value={phone}
            className="input"
            type="number"

            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={password}
            className="input"
            type="password"

            name="password"
            onChange={(e) => setPassword(e.target.value)} required
          />
          <br />
          <br />
          <button >Signup</button>
        </form>
        <a onClick={handleLogin}>Login</a>
      </div>
    </div>
  );
}
