import {setUser,setLoading,setError} from '../store/auth.slice'
import { useDispatch } from 'react-redux'
import {register, login,getMe} from '../services/auth.api'

export const useAuth=()=>{
    const dispatch=useDispatch()

    const handleRegister= async({ email, contact, password, fullname, isSeller })=>{
        dispatch(setLoading(true))
        const data= await register({ email, contact, password, fullname, isSeller })
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
        return data.user
    }

    const handleLogin = async({ email, password })=>{
        dispatch(setLoading(true))
        const data = await login({ email, password })
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
        return data.user
    }
    const handleGetMe= async()=>{

        try{
            dispatch(setLoading(true))
            const data = await getMe()
          
            dispatch(setUser(data.user))
        }catch(err){
            console.log(err)
        }finally{
            dispatch(setLoading(false))
        }
    }
 return {handleRegister, handleLogin, handleGetMe}
}