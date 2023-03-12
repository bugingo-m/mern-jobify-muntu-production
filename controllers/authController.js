import User from '../models/user.js'
import { StatusCodes } from 'http-status-codes'
import {BadRequestError,UnAuthenticatedError} from '../errors/index.js'
const register=async(req,res)=>{

    const{name,email,password}=req.body

    if(!name || !email || !password){
        throw new BadRequestError('Provide all the fields')
    }
    const alreadyExists=await User.findOne({email})
    if(alreadyExists){
        throw new BadRequestError('Email already exists')
    }

    const user=await User.create({name,email,password})
    const token=user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.name,
        email:user.email, lastName:user.lastName,location:user.location},
        token,location:user.location})
}

const login=async(req,res)=>{
    const {email,password}=req.body

    if(!email ||!password){
        throw new BadRequestError('please provide all values')
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        throw new UnAuthenticatedError('please provide valid credentials')
    }
    const isPasswordCorrect=await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('please provide valid credentials') 
    }
    const token = user.createJWT()
    user.password=undefined
    res.status(StatusCodes.OK).json({user,token,location:user.location})
}

const updateUser=async(req,res)=>{
    const{name,email,lastName,location}=req.body
    const{userId}=req.user;
    if(!name || !email || !lastName || !location){
        throw new BadRequestError('please provide all values')
    }
    
    const user=await User.findOne({_id:userId})
    user.name=name
    user.email=email
    user.lastName=lastName
    user.location=location
    await user.save()
    //optional
    const token=user.createJWT()

    res.status(StatusCodes.OK).json({user,token,location:user.location})
}

export {register,login,updateUser}