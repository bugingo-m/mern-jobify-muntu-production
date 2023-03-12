import Job from '../models/job.js'
import {BadRequestError,UnAuthenticatedError,NotFoundError} from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'
import checkPermissions from '../utils/permissions.js'
import mongoose from 'mongoose'
import moment from 'moment'
const createJob=async(req,res)=>{
    const {userId}=req.user
    const {company,position}=req.body
    if(!company || !position){
        throw new BadRequestError('please provide all values')
    }
    req.body.createdBy=userId
    const job=await Job.create(req.body)

    res.status(StatusCodes.CREATED).json({job})
}
const getAllJobs=async(req,res)=>{
    const{status,jobType,sort,search}=req.query
    const queryObject={
        createdBy:req.user.userId,
    }
    if(status && status!=='all'){
        queryObject.status=status
    }
    if(jobType && jobType!=='all'){
        queryObject.jobType=jobType
    }
    //search
    if(search){
        queryObject.position={$regex:search,$options:'i'}
    }
    let results= Job.find(queryObject)
    if(sort==='latest'){
        results=results.sort('-createdAt')
    }
    if(sort==='oldest'){
        results=results.sort('createdAt')
    }
    if(sort==='a-z'){
        results=results.sort('position')
    }
    if(sort==='z-a'){
        results=results.sort('-position')
    }

    //PAGINATION
    //75---10 10 10 10 10 10 10 5
    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) ||10
    const skip=(page-1)*limit
    results = results.skip(skip).limit(limit)

    const totalJobs= await Job.countDocuments(queryObject)
    const numOfPages=Math.ceil(totalJobs/limit)
    const jobs=await results 
    res.status(StatusCodes.OK).json({jobs,totalJobs,numOfPages})
}
const updateJob=async(req,res)=>{
    const{position,company}=req.body
    const{id:jobId}=req.params

    if(!position || !company){
        throw new BadRequestError('please provide all values')
    }
    const job =await Job.findOne({_id:jobId})
    if(!job){
        throw new NotFoundError(`no job with id ${jobId} found`) 
    }
    //check permissions
    //console.log(typeof req.user.userId);
    //console.log(typeof job.createdBy);
    checkPermissions(req.user,job.createdBy)
    const updatedJob=await Job.findOneAndUpdate({_id:jobId},req.body,{
        new:true,
        runValidators:true
    })
    res.status(StatusCodes.OK).json({updatedJob})
}
const getStats=async(req,res)=>{

    let stats=await Job.aggregate([
        {$match:{createdBy:mongoose.Types.ObjectId(req.user.userId)}},
        {$group:{_id:'$status', count: { $sum: 1 } }}
    ])

    stats=stats.reduce((accr,current)=>{
        const {_id,count}=current
        accr[_id]=count
        return accr
    },{

    })
    const defaultStats={
        interview:stats.interview || 0,
        pending:stats.pending || 0,
        declined:stats.declined || 0
    }
    let monthlyApplications=await Job.aggregate([
        {$match:{createdBy:mongoose.Types.ObjectId(req.user.userId)}},
        {$group:{
            _id:{
                year:{$year:'$createdAt'},
                month:{$month:'$createdAt'}
            },count:{$sum:1}}},
        {$sort:{'_id.year':-1,'_id.month':-1}},
        {$limit:6}
    ])
    monthlyApplications=monthlyApplications.map((item)=>{
        const{_id:{year,month},count}=item
        const date=moment().month(month-1).year(year).format('MMM Y')
        return{date,count}
    }).reverse()
    res.status(StatusCodes.OK).json({defaultStats,monthlyApplications})
}
const deleteJob=async(req,res)=>{
    const {id:jobId}=req.params
    const job =await Job.findOne({_id:jobId})
    if(!job){
        throw new NotFoundError(`no job with id ${jobId} found`) 
    }
    checkPermissions(req.user,job.createdBy)
    await job.remove()
    res.status(StatusCodes.OK).json({msg:'job deleted successfully'})
}

export {createJob,getAllJobs,updateJob,getStats,deleteJob}
