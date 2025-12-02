import {useSelector} from "react-redux"
import {jwtDecode} from "jwt-decode"

const useAuth=()=>{
    const token=useSelector((state)=>state.auth.token)
    if(token){
        const obj=jwtDecode(token);
        // console.log("obj",obj);
        return obj
    }
    else
        return {name:"",role:"user",_id:""}
    
}
export default useAuth;
