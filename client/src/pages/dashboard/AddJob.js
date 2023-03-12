import React from 'react'
import { useGlobalContext } from '../../context/appContext'
import { FormRow, Alert,FormSelectComponent } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  const {
    showAlert,
    displayAlert,
    isLoading,
    isEditing,
    company,
    position,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleInputChange,
    createJob,
    editJob,
    editJobId
  }=useGlobalContext()


  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!company || !position ||!jobLocation){
      displayAlert()
      return
    }
    if(isEditing){
      //for editing
      editJob(editJobId)
      return
    }
    createJob()
  }
  const handleJobInput=(e)=>{
    const name=e.target.name;
    const value=e.target.value
    handleInputChange({name,value})
  }
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'} </h3>
        {showAlert && <Alert />}

        {/* position */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job type */}
          <FormSelectComponent name='jobType' value={jobType} 
          labelText='job type' handleChange={handleJobInput}
          list={jobTypeOptions}/>
          

          {/* job status */}
          <FormSelectComponent name='status' value={status} 
           handleChange={handleJobInput}
          list={statusOptions}/>

          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
