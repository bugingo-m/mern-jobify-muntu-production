import { UnAuthenticatedError } from "../errors/index.js";


const checkPermissions=(requestUser,resourceUser)=>{
 if(requestUser.userId===resourceUser.toString())return
 throw new UnAuthenticatedError('not authorized to access this route')
}
export default checkPermissions