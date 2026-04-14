import {setUser,setLoading,setError} from '../store/auth.slice'
import { useDispatch } from 'react-redux'
import {register, login} from '../services/auth.api'

export const useAuth=()=>{
    const dispatch=useDispatch()

    const handleRegister= async({ email, contact, password, fullname, isSeller })=>{
        dispatch(setLoading(true))
        const data= await register({ email, contact, password, fullname, isSeller })
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
    }

    const handleLogin = async({ email, password })=>{
        dispatch(setLoading(true))
        const data = await login({ email, password })
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
    }
 return {handleRegister, handleLogin}
}