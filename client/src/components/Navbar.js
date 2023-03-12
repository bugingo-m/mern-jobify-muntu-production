import React,{useState} from 'react'
import {FaUserCircle,FaAlignLeft,FaCaretDown} from 'react-icons/fa'
import Wrapper from '../assets/wrappers/Navbar'
import { useGlobalContext } from '../context/appContext'
import Logo from './Logo'

const Navbar = () => {
  const[showDropdown,setShowDropdown]=useState(false)
  const{user,toggleSideBar,logoutUser}=useGlobalContext()
  return (
    <Wrapper>
      
      <div className="nav-center">
        <button type='button' className='toggle-btn' onClick={toggleSideBar}>
          <FaAlignLeft/>
        </button>
        <div >
        <Logo/>
        <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={()=>setShowDropdown(!showDropdown)}>
            <FaUserCircle/>
            {user && user.name}
            <FaCaretDown/>
          </button>
          <div className={showDropdown?"dropdown show-dropdown":"dropdown"}>
            <button className='dropdown-btn' onClick={logoutUser}>logout</button>
          </div>
        </div>
        

      </div>
    </Wrapper>
  )
}

export default Navbar
