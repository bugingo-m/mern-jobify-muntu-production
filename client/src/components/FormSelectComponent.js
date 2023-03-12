import React from 'react'

const FormSelectComponent = ({name,value,handleChange,labelText,list,}) => {
  return (
    <div className="form-row">
            <label htmlFor={name} className="form-label">{labelText||name}</label>
            <select name={name} className="form-select"
            value={value}
            onChange={handleChange}
            >
              {list.map((item,index)=>{
                return(
                  <option key={index} value={item}>{item}</option>
                )
              })}
            </select>
          </div>
  )
}

export default FormSelectComponent
