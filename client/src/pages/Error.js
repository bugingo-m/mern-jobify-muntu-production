import React from 'react'
import img from '../assets/images/not-found.svg'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
const Error = () => {
  return (
    <Wrapper className='full-page'>
        <div>
            <img src={img} alt="not-found" />
            <h5>resource not found</h5>
            <p>please go <Link to='/'>back home</Link> and search again</p>
        </div>
      
      
    </Wrapper>
  )
}

export default Error
