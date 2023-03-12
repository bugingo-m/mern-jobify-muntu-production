import{StatusCodes} from 'http-status-codes'

const errorHandlerMiddleware=(err,req,res,next)=>{
    

    let defaultError={
        statusCode:err.statusCode ||StatusCodes.INTERNAL_SERVER_ERROR,
        message:err.message ||'something went wrong,try again'
    }
    if(err.name==='ValidationError'){
        defaultError.statusCode=StatusCodes.BAD_REQUEST
        defaultError.message=`${Object.values(err.errors).map((item)=>item.message).join(', ')}`
    }
    if(err.code && err.code===11000){
        defaultError.statusCode=StatusCodes.BAD_REQUEST
        defaultError.message=`${Object.keys(err.keyValue)} address already exists`  
    }
    // return res.status(500).send({msg:err})
    return res.status(defaultError.statusCode).send({msg:defaultError.message})

}


export default errorHandlerMiddleware