import React from 'react'
import {FormRow,FormSelectComponent} from '.'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useGlobalContext } from '../context/appContext'
const SearchComponent = () => {
  const
  {isLoading,
  search,
  searchStatus,
  searchType,
  sort,
  sortOptions,
  jobTypeOptions,
  statusOptions,
  clearFilters,
  handleInputChange
}=useGlobalContext()
const handleSearch=(e)=>{
  if(isLoading) return
  const name=e.target.name
  const value=e.target.value
  handleInputChange({name,value})

}
const handleSubmit=(e)=>{
  e.preventDefault()
  clearFilters()
}
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        {/* search position */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          {/* rest of the inputs */}
          {/* search by status */}
          <FormSelectComponent
            labelText='job status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormSelectComponent
            labelText='Type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort*/}
          <FormSelectComponent
            labelText='Sort'
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          {/* clear filters */}
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchComponent
