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
import { initialState } from "./appContext";

const reducer=(state,action)=>{

    if(action.type === DISPLAY_ALERT){
        return {
            ...state,
            showAlert:true,
            alertText:'please provide all values',
            alertType:'danger'
            

        }
    }
    if(action.type === HIDE_ALERT){
        return {
            ...state,
            showAlert:false,
            alertText:'',
            alertType:''
        }
    }
    if(action.type===REGISTER_BEGIN){
        return{
            ...state,
            isLoading:true,
        }
    }
    if(action.type===REGISTER_SUCCESS){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertText:'User created, Redirecting.....',
            alertType:'success',
            location:action.payload.location,
            jobLocation:action.payload.location,
            user:action.payload.user,
            token:action.payload.token,

        }
    }
    if(action.type===REGISTER_ERROR){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertText:action.payload.msg,
            alertType:'danger',

        }
    }

    //login
    if(action.type===LOGIN_BEGIN){
        return{
            ...state,
            isLoading:true,
        }
    }
    if(action.type===LOGIN_SUCCESS){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertText:'User loggedin!, Redirecting.....',
            alertType:'success',
            location:action.payload.location,
            jobLocation:action.payload.location,
            user:action.payload.user,
            token:action.payload.token,

        }
    }
    if(action.type===LOGIN_ERROR){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertText:action.payload.msg,
            alertType:'danger',

        }
    }
    //toggle sidebar
    if(action.type===TOGGLE_SIDEBAR){
        return{
            ...state,
            showSidebar:!state.showSidebar
        }
    }
//logout user
    if(action.type===LOGOUT_USER){
        return{
            ...initialState,
            user:null,
            token:null,
            location:'',
            
        }
    }

    //update user
    if(action.type===UPDATE_BEGIN){
        return{
            ...state,
            isLoading:true,
        }
    }
    if(action.type===UPDATE_SUCCESS){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertText:'User updated successfully!.....',
            alertType:'success',
            location:action.payload.location,
            jobLocation:action.payload.location,
            user:action.payload.user,
            token:action.payload.token,

        }
    }
    if(action.type===UPDATE_ERROR){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertText:action.payload.msg,
            alertType:'danger',

        }
    }
///handle global form inputs
    if(action.type===HANDLE_CHANGE){
        return(
            {...state,
                page:1,
                [action.payload.name]:action.payload.value}
        )
    }

    ///CREATE JOB
    if(action.type===CREATE_JOB_BEGIN){
        return({
            ...state,isLoading:true
        })
    }
    if(action.type===CREATE_JOB_SUCCESS){
        return({
            ...state,isLoading:false,
            showAlert:true,
            alertText:'Job successfully created!',
            alertType:'success',
        })
    }
    if(action.type===CREATE_JOB_ERROR){
        return({
            ...state,isLoading:false,
            showAlert:true,
            alertText:action.payload.msg,
            alertType:'danger',
        })
    }
    if(action.type===GET_ALL_JOBS_BEGIN){
        return{
            ...state,isLoading:true,showAlert:false
        }
    }
    if(action.type===GET_ALL_JOBS_SUCCESS){
        return{
            ...state,isLoading:false,showAlert:false,
            jobs:action.payload.jobs,
            totalJobs:action.payload.totalJobs,
            numOfPages:action.payload.numOfPages
        }
    }
    if(action.type===SET_EDIT_JOB){
        const jobToEdit=state.jobs.find((job)=>job._id===action.payload.id)
        const{_id,company,position,jobType,status,jobLocation}=jobToEdit
        return{
            ...state,
            isEditing:true,
            editJobId:_id,
            position,
            company,
            jobLocation,
            jobType,
            status,

        }

    }
    if(action.type===CLEAR_VALUES){
        return{
            ...state,
            isEditing:false,
            editJobId:'',
            position:'',
            company:'',
            jobLocation:state.location || '',
            jobType:'full-type',
            status:'pending',

        }
    }
    if(action.type===EDIT_JOB_BEGIN){
        return{
            ...state,
            isLoading:true
        }
    }
    if(action.type===EDIT_JOB_SUCCESS){
        return{
            ...state,
            showAlert:true,
            alertText:'Job edited successfully',
            alertType:'success'
        }
    }
    if(action.type===EDIT_JOB_ERROR){
        return{
            ...state,
            showAlert:true,
            alertText:action.payload.msg,
            alertType:'danger'
        }
    }
    if(action.type===DELETE_JOB_BEGIN){
        return{
            ...state,
            isLoading:true
        }
    }

    if(action.type===SHOW_STATS_BEGIN){
        return{
            ...state,
            isLoading:true,
            showAlert:false
        }
    }
    if(action.type===SHOW_STATS_SUCCESS){
        return{
            ...state,
            isLoading:false,
            showAlert:false,
            stats:action.payload.stats,
            monthlyApplications:action.payload.monthlyApplications
        }
    }

    if(action.type===CLEAR_FILTERS){
        return {
            ...state,
            search:'',
            searchStatus:'all',
            searchType:'all',
            sort:'latest'
        }
    }
    if(action.type===CHANGE_PAGE){
        return{
            ...state,
            page:action.payload.page
        }

    }

    throw new Error(`the action ${action.type} is unknown`)

}

export default reducer;