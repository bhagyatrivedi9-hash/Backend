import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {
  const {handleLogin}=useAuth()
  const user=useSelector(state=>state.auth.user)
  const loading=useSelector(state=>state.auth.loading)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

  
        const payload = {
            email,
            password,
        }
        await handleLogin(payload)
        navigate('/')


}
if(!loading && user){
  navigate('/')
}
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4 overflow-hidden'>
      {/* Main container */}
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-2 bg-linear-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent'>
            Login
          </h1>
          <p className='text-slate-400 text-lg'>Welcome back to AI research</p>
        </div>

        {/* Form Card */}
        <div className='bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-md shadow-2xl'>
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Email field */}
            <div>
              <label className='block text-sm font-semibold text-slate-100 mb-2'>
                Email or Username
              </label>
              <input
                name='email'
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-3 rounded-lg bg-slate-700/40 border border-slate-600 placeholder-slate-500 text-white focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition'
              />
            </div>

            {/* Password field */}
            <div>
              <label className='block text-sm font-semibold text-slate-100 mb-2'>
                Password
              </label>
              <div className='relative'>
                <input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full px-4 py-3 rounded-lg bg-slate-700/40 border border-slate-600 placeholder-slate-500 text-white focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 text-lg'
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className='flex items-center justify-between text-sm'>
              <label className='flex items-center text-slate-400 hover:text-slate-200 cursor-pointer'>
                <input type='checkbox' className='mr-2 rounded' />
                Remember me
              </label>
              <a href='#' className='text-slate-400 hover:text-slate-200'>
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type='submit'
              className='w-full hover:cursor-pointer bg-slate-100 text-slate-900 font-semibold py-3 rounded-lg hover:bg-white transition active:scale-95 mt-6'
            >
              Sign In
            </button>

            {/* Status message */}
            {status && (
              <p className={`text-center text-sm ${
                status.includes('Successfully') ? 'text-green-400' : 'text-amber-300'
              }`}>
                {status}
              </p>
            )}
          </form>


        </div>

        {/* Switch to Register */}
        <p className='text-center text-slate-400 mt-6'>
          Don't have an account?{' '}
          <a href='/register' className='text-slate-200 font-semibold hover:text-white'>
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login

