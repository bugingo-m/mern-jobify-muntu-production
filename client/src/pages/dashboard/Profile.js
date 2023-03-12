import React,{ useState }  from 'react'
import { FormRow, Alert } from '../../components';
import { useGlobalContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const{user,showAlert,displayAlert,updateUser,isLoading}=useGlobalContext()
  const[values,setValues]=useState(user)

  const handleSubmit=(e)=>{
    e.preventDefault()
    const{name,email,lastName,location}=values
    if(!name || !email || !lastName || !location){
      displayAlert()
      return
    }
    const currentUser={name,email,lastName,location}
    updateUser(currentUser)
  }
  const handleChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
          <FormRow
            labelText='last name'
            type='text'
            name='lastName'
            value={values.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
          />

          <FormRow
            type='text'
            name='location'
            value={values.location}
            handleChange={handleChange}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
)
}

export default Profile
