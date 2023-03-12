import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../context/appContext';

import Logo from './Logo';
import NavLinkComponent from './NavLinkComponent';


const SmallSidebar = () => {
  const{showSidebar,toggleSideBar}=useGlobalContext()
  return (
    <Wrapper>
      <div className={showSidebar?'sidebar-container show-sidebar':'sidebar-container'}>
        <div className='content'>
          <button className='close-btn' onClick={toggleSideBar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinkComponent toggleSideBar={toggleSideBar}/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
