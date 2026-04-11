import {setUser,setLoading,setError} from '../store/auth.slice'
import { useDispatch } from 'react-redux'
import {register} from '../services/auth.api'

export const useAuth=()=>{
    const dispatch=useDispatch()

    const handleRegister= async({ email, contact, password, fullname, role })=>{
        dispatch(setLoading(true))
        const data= await register({ email, contact, password, fullname, role })
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
    }
 return {handleRegister}
}