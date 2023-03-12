import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useGlobalContext } from '../context/appContext'
import Logo from '../components/Logo';
import NavLinkComponent from './NavLinkComponent'
const BigSidebar = () => {
  const {showSidebar}=useGlobalContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinkComponent />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
