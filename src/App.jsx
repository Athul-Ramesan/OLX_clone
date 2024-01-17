import React, { useContext, useEffect } from 'react';
import './App.css';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import { MyAuth } from './store/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Create from './Components/Create/Create';
import ViewPost from './Pages/ViewPost';

function App() {
  const {user,setUser} = useContext(MyAuth)
  const navigate = useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        // alert(JSON.stringify(user))
        // console.log(user,'user after signedin');
        setUser(user)
      }else{
        console.log('no user');
      }
    })
  },[])
  return (
    
    <div>
      <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element ={<Login/>} />
        <Route path='/home' element ={<Home/>} />
        { user ? (<Route path='/add-product' element={<Create/>} />) :  (<Route path='/add-product' element={<Navigate to='/login'/>} />) }
        {user ? (<Route path='/view' element={<ViewPost/>} />) : (<Route path='/view' element={< Navigate to="/login"/>} />) }
      </Routes>
    </div>
  );
}

export default App;
