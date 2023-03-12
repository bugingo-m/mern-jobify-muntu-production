import jwt from 'jsonwebtoken'
import {UnAuthenticatedError} from '../errors/index.js'

const authMiddleware= async(req,res,next)=>{
    const authHeader=req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnAuthenticatedError('Authentication invalid')
    }
    const token=authHeader.split(' ')[1]
    try {
        const verifiedToken=jwt.verify(token,process.env.JWT_SECRET)
        
        //console.log(verifiedToken);
        const {userId}=verifiedToken;
        req.user={userId}
        next()
    } catch (error) {
        throw new UnAuthenticatedError('Authentication invalid')
    }
    
}
export default authMiddleware
