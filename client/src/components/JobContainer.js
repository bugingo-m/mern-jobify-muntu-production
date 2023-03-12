import React,{useEffect} from 'react'
import Job from './Job'
import { useGlobalContext } from '../context/appContext';
import {Loading} from '../components'
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';
const JobContainer = () => {

  const{getAllJobs,jobs,isLoading,totalJobs,page,search,sort,searchStatus,
    searchType,numOfPages}=useGlobalContext()

  useEffect(()=>{
    getAllJobs()
    // eslint-disable-next-line
  },[page,search,sort,searchStatus,searchType])
  if(isLoading){
    return <Loading center='center'/>
  }
  if(jobs.length===0){
    return <Wrapper>
      <h2>No jobs to display</h2>
    </Wrapper>
  }
  return (
    <Wrapper>
      <h5>{totalJobs} job{totalJobs>1 && 's'} found</h5>
      <div className="jobs">
        {jobs.map((job)=>{
          return(
          <Job key={job._id} {...job}/>
        )
      })}
      </div>
      {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  )
}

export default JobContainer
