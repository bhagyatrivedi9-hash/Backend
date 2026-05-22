import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'


const Protected = ({children,role="buyer"}) => {
  
  
  const navigate= useNavigate()
  const user= useSelector(state=> state.auth.user)
  const loading= useSelector(state=>state.auth.loading)

  if(loading){
    return <h1>Loading...</h1>
  }

  if(!user){
    return navigate('/login')
  }
if(user.role!==role){
  return navigate('/')
}
else if(user.role==role){
  return navigate('/seller/dashboard')
}
return children
}
export default Protected