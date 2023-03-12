import React,{useState,useEffect} from 'react'
import {Logo,FormRow, Alert} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useGlobalContext } from '../context/appContext'
import {useNavigate} from 'react-router-dom'


const initialState={
  name:'',
  email:'',
  password:'',
  isMember:true
}

const Register = () => {
  const[values,setValues]=useState(initialState)
  const {showAlert,registerUser,isLoading,user,loginUser}=useGlobalContext();
  const navigate=useNavigate()

  useEffect(()=>{
    setTimeout(()=>{
      if(user){
        navigate('/')
      }
    },3000)
  },[user, navigate])
  
  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setValues({...values,[name]:value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const{name,email,password,isMember}=values
    // if(!email||!password||(!isMember&&!name)){
    //   displayAlert()
    //   return
    // }
    

    //REGISTER LOGIC
    const createUser={name,email,password}
    if(isMember){
      loginUser(createUser)
    }
    else{
      
      registerUser(createUser)
      
    }
      setValues({...values,name:'',email:'',password:''})
      console.log(name,email,password);
  
  }
  const toggleMember=()=>{
    setValues({...values,isMember:!values.isMember})
  }

  
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <Logo/>
        <h3>{values.isMember?'login':'register'}</h3>
        {showAlert && <Alert/>}
        {!values.isMember && <FormRow type='text' name='name' value={values.name} 
         handleChange={handleChange} />}
        <FormRow type='email' name='email' value={values.email} 
         handleChange={handleChange} />
        <FormRow type='password' name='password' value={values.password} 
         handleChange={handleChange} />
        <button type='submit' className='btn btn-block' disabled={isLoading}>submit</button>
        <p>{!values.isMember?'Already a member?':'Not yet a member?'} <button type='button' onClick={toggleMember} 
        className=' member-btn'>
          {values.isMember? 'register':'login'}</button></p>
      </form>

    </Wrapper>
      
    
  )
}

export default Register
