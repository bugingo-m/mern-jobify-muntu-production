import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/LandingPage'
import{Logo} from '../components'
import main from '../assets/images/main.svg'
const Landing = () => {
  return (
    <Wrapper>
        <nav>
           <Logo/>
        </nav>
        <div className="container  page">
            <div className="info">
                <h2>job <span>tracking </span> app</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta modi ullam 
                nemo expedita fuga praesentium debitis voluptatum quibusdam eligendi. Possimus!</p>
                <Link  to='/register' className='btn btn-hero' type='button'>Login/Register</Link>
            </div>
            <img src={main} alt="job-search" className='img main-img' />
        </div>
     
    </Wrapper>
  )
}


export default Landing
