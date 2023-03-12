import React,{useEffect} from 'react'
import { StatsContainer,Loading,ChartsContainer } from '../../components'
import { useGlobalContext } from '../../context/appContext'
const Stats = () => {
  const {isLoading,getStats,monthlyApplications}=useGlobalContext()
  useEffect(() => {
    getStats();
    // eslint-disable-next-line
  }, []);
  if(isLoading){
    return <Loading center/>
  }
  return (
    <>
    <StatsContainer/> 
    {monthlyApplications.length > 0 && <ChartsContainer/>}
    </>
  )
}

export default Stats
