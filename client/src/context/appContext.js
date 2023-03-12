import React, {useReducer,useContext} from "react";
import axios from 'axios'
import reducer from "./reducer";
import { DISPLAY_ALERT,HIDE_ALERT,
  REGISTER_BEGIN,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_BEGIN,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  HANDLE_CHANGE,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_ALL_JOBS_BEGIN,
  GET_ALL_JOBS_SUCCESS,
  CLEAR_VALUES,
  SET_EDIT_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  DELETE_JOB_BEGIN,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE
 } from "./actions";

//global context

const AppContext=React.createContext()

//get items from localstorage and pass them to the initial state
const user=localStorage.getItem('user')
const token = localStorage.getItem('token')
const location =localStorage.getItem('location')

const initialState={
    isLoading:false,
    showAlert:false,
    alertText:'',
    alertType:'',
    location:location || '',
    user:user?JSON.parse(user):null,
    token:token || null,
    showSidebar:false,
    isEditing:false,
    editJobId:'',
    position:'',
    company:'',
    jobLocation:location || '',
    jobType:'full-time',
    jobTypeOptions:['full-time', 'part-time', 'remote', 'internship'],
    status:'pending',
    statusOptions:['interview', 'declined', 'pending'],
    jobs:[],
    totalJobs:2,
    numOfPages:1,
    page:1,
    stats:{},
    monthlyApplications:[],
    search:'',
    searchStatus:'all',
    searchType:'all',
    sort:'latest',
    sortOptions:['latest','oldest','a-z','z-a']
}

const AppProvider=({children})=>{
const [state,dispatch]=useReducer(reducer,initialState)

const authFetch=axios.create({
  baseURL:'api/v1',
})
//request

authFetch.interceptors.request.use((config)=>{
  config.headers['Authorization']=`Bearer ${state.token}`
  return config
  
},(error)=>{
  return Promise.reject(error)
})

//response
authFetch.interceptors.response.use((response)=>{
  return response
},(error)=>{
  console.log(error.response)
  if(error.response.status === 401){
    logoutUser()
  }
  return Promise.reject(error)
})



const displayAlert=()=>{
    dispatch({type:DISPLAY_ALERT})
    hideAlert() 
  }
  const hideAlert=()=>{
    setTimeout(()=>{
      dispatch({type:HIDE_ALERT})
    },3000)
    
  }

  //LOCALSTORAGE FUNCTIONALITY
  //add user
  const addUserToLocalstorage=({user,token,location})=>{
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('token',token)
    localStorage.setItem('location',location)
  }
  //remove item(for logging out)
  const removeLocalStorageItem=()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
  }

  const registerUser=async(createUser)=>{
    dispatch({type:REGISTER_BEGIN})
    try {
      const response=await axios.post('api/v1/auth/register',createUser)
      //console.log(response);
      const{user,token,location}=response.data

      dispatch({type:REGISTER_SUCCESS,
        payload:{
          user,
          token,
          location
        }})

        //persist data in local storage
        addUserToLocalstorage({user,token,location})
        displayAlert()
    } catch (error) {
      dispatch({type:REGISTER_ERROR,
      payload:{
        msg:error.response.data.msg
      }})
      displayAlert()
      
    }

  }

  //login
  const loginUser=async(createUser)=>{
    dispatch({type:LOGIN_BEGIN})
    try {
      const {data}=await axios.post('api/v1/auth/login',createUser)
      
      const{user,token,location}=data
      // console.log(data);
      dispatch({type:LOGIN_SUCCESS,
        payload:{
          user,
          token,
          location
        }})

        //persist data in local storage
        addUserToLocalstorage({user,token,location})
        
    } catch (error) {
      dispatch({type:LOGIN_ERROR,
      payload:{
        msg:error.response.data.msg
      }})
      
      
    }
    hideAlert()

  }
  const toggleSideBar=()=>{
    dispatch({type:TOGGLE_SIDEBAR})
  }
  const logoutUser=()=>{
    dispatch({type:LOGOUT_USER})
    removeLocalStorageItem()
  }

//update user
  const updateUser=async(currentUser)=>{
    dispatch({type:UPDATE_BEGIN})
    try {
      const {data}= await authFetch.patch('/auth/updateUser',currentUser)
      const{user,token,location}=data
      //console.log(data);
      dispatch({type:UPDATE_SUCCESS,payload:{
        user,token,location
      }})
      //
      addUserToLocalstorage({user,token,location})
    } catch (error) {
      //console.log(error.response);
      const msg=error.response.data.msg
      if(error.response.status !==401){
        dispatch({type:UPDATE_ERROR,payload:{msg}})
      }
      
    }
    hideAlert()
  }

  //hangle change
  const handleInputChange=({name,value})=>{
      dispatch({type:HANDLE_CHANGE,payload:{name,value}})
  }

  //create job
  const createJob=async()=>{
    dispatch({type:CREATE_JOB_BEGIN})
    try {
      const {position,company,jobLocation,status,jobType}=state
      await authFetch.post('/jobs',
      {position,company,jobLocation,status,jobType}
      )
      dispatch({type:CREATE_JOB_SUCCESS})
      dispatch({type:CLEAR_VALUES})
    } catch (error) {
      if(error.response.status===401){
        return
      }
      const msg=error.response.data.msg
      dispatch({type:CREATE_JOB_ERROR,payload:{msg}})
      
    }
    hideAlert()
  }

  //get all jobs
  const getAllJobs=async()=>{
    const {search,sort,searchStatus,searchType,page}=state
    let url=`/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    if(search){
      url = url + `&search=${search}`
    }
    dispatch({type:GET_ALL_JOBS_BEGIN})
    try {
      const {data}=await authFetch.get(url)
      const{jobs,totalJobs,numOfPages}=data
      dispatch({type:GET_ALL_JOBS_SUCCESS,payload:{
        jobs,totalJobs,numOfPages
      }})
    } catch (error) {
      //console.log(error.response);
      logoutUser()
    }
    hideAlert()
  }
  const setEditJob=async(id)=>{
    dispatch({type:SET_EDIT_JOB,payload:{id}})
  }
  const editJob=async(id)=>{
    dispatch({type:EDIT_JOB_BEGIN})
    
    try {
      const{position,company,status,jobType,jobLocation}=state
      await authFetch.patch(`/jobs/${id}`,{
        position,company,status,jobLocation,jobType
      })
      dispatch({type:EDIT_JOB_SUCCESS})
      dispatch({type:CLEAR_VALUES})
    } catch (error) {
      if (error.response.status === 401) return;
    dispatch({
      type: EDIT_JOB_ERROR,
      payload: { msg: error.response.data.msg },
    });
    }
    hideAlert()
  }
  const deleteJob=async(id)=>{
    dispatch({type:DELETE_JOB_BEGIN})
    try {
      await authFetch.delete(`/jobs/${id}`)
      getAllJobs()
    } catch (error) {
      logoutUser()
    }
    hideAlert()
  }

  const getStats=async()=>{
    dispatch({type:SHOW_STATS_BEGIN})
    try {
      const {data}=await authFetch('/jobs/stats')
      // console.log(data);
      dispatch({type:SHOW_STATS_SUCCESS,payload:{stats:data.defaultStats,
        monthlyApplications:data.monthlyApplications}})
    } catch (error) {
      // console.log(error.response);
      logoutUser()
    }
    hideAlert()
  }
  const clearFilters=()=>{
    dispatch({type:CLEAR_FILTERS})
  }
  const changePage=(page)=>{
    dispatch({type:CHANGE_PAGE,payload:{page}})
    //console.log(page);
  }
    return(
        <AppContext.Provider value={
        {...state,displayAlert,registerUser,loginUser,
        toggleSideBar,logoutUser,updateUser,createJob,
        handleInputChange,getAllJobs,setEditJob,deleteJob,editJob,
        getStats,clearFilters,changePage
        }}>
            {children}
        </AppContext.Provider>
    )
    
}

const useGlobalContext=()=>{
    return useContext(AppContext)
}
export{AppProvider,initialState,useGlobalContext}