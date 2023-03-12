import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide name'],
        minlength:3,
        maxlength:20,
        trim:true,
    },
    email:{
        type:String,
        required:[true,'please provide email'],
        validate:{
            validator:validator.isEmail,
            message:'please provide a valid email'
        },
        unique:true,
        
    },
    password:{
        type:String,
        required:[true,'please provide password'],
        minlength:6,
        select:false,
        
    },
    lastName:{
        type:String,
        minlength:3,
        maxlength:20,
        default:'lastName',
    },
    location:{
        type:String,
        default:'my city',
    },
})
//hash passwords
UserSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return
    }
    const salt = await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

//create token

UserSchema.methods.createJWT=function(){
    return jwt.sign({userId:this._id},process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_LIFETIME})
}

//compare passwords
UserSchema.methods.comparePassword=async function(password){
    const isMatch = await bcrypt.compare(password,this.password)
    return isMatch
}


export default mongoose.model('User',UserSchema)