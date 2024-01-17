import React, { useEffect } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useContext } from 'react';
import { MyAuth } from '../../store/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate()
  const {user,setUser} = useContext(MyAuth)
  const handleLogout = ()=>{
    signOut(auth).then(()=>{
      setUser(null)
      navigate('/home')
    })
  }
  const handleLogin = ()=>{
    navigate('/login')
  }
  useEffect(()=>{
    console.log(user,'user in home');
  },[])
  console.log(user,'user in home');
  const handleSell=()=>{
    user ? navigate('/add-product') : navigate('/login')
    
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <div className='' style={{display:'flex', gap:'5px'}}>
              <span className='login-btn'>{user.displayName}</span>
              <hr />
              <button className='logout-btn'  onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <button className='login-btn' onClick={handleLogin}>Login</button>
              <hr />
            </>
          )}
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent" onClick={handleSell}>
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
