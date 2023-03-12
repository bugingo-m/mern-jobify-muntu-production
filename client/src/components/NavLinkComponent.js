import React from 'react'
import links from '../utils/links';
import { NavLink } from 'react-router-dom';
const NavLinkComponent = ({toggleSideBar}) => {
  return (
    <div className='nav-links'>
              {links.map((link)=>{
                const{id,text,path,icon}=link
                return(
                  <NavLink key={id} to={path} 
                  onClick={toggleSideBar}
                  className={({isActive})=>isActive?'nav-link active':'nav-link'}>
                    <span className='icon'>{icon}</span>
                    {text}</NavLink>
                )
              })}
          </div>
  )
}

export default NavLinkComponent
