import React from 'react'

const FormRow = ({type,name,value,handleChange,textLabel}) => {
  return (
    <div className='form-row' >
          <label htmlFor={name} className='form-label'> {textLabel || name}</label>
          <input type={type} className='form-input' name={name} 
          onChange={handleChange} value={value}/>

    </div>
  )
}

export default FormRow
