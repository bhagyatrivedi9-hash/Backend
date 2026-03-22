import { useState } from 'react'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!username || !email || !password) {
      setStatus('Please fill in all fields.')
      return
    }
}



  return (
    <div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4 overflow-hidden'>
      {/* Main container */}
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-2 bg-linear-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent'>
            Register
          </h1>
          <p className='text-slate-400 text-lg'>Join the AI research community</p>
        </div>

        {/* Form Card */}
        <div className='bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-md shadow-2xl'>
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Username field */}
            <div>
              <label className='block text-sm font-semibold text-slate-100 mb-2'>
                Username
              </label>
              <input
                name='username'
                type='text'
                placeholder='your_username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full px-4 py-3 rounded-lg bg-slate-700/40 border border-slate-600 placeholder-slate-500 text-white focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition'
              />
            </div>

            {/* Email field */}
            <div>
              <label className='block text-sm font-semibold text-slate-100 mb-2'>
                Email
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
              <p className='text-xs text-slate-400 mt-1'>
                At least 8 characters with uppercase, lowercase, and numbers
              </p>
            </div>

            {/* Submit button */}
            <button
              type='submit'
              className='w-full hover:cursor-pointer bg-slate-100 text-slate-900 font-semibold py-3 rounded-lg hover:bg-white transition active:scale-95 mt-6'
            >
              Create Account
            </button>

            {/* Status message */}
            {status && (
              <p className={`text-center text-sm ${
                status.includes('successfully') ? 'text-green-400' : 'text-amber-300'
              }`}>
                {status}
              </p>
            )}
          </form>


        </div>

        {/* Switch to Login */}
        <p className='text-center text-slate-400 mt-6'>
          Already have an account?{' '}
          <a href='/login' className='text-slate-200 font-semibold hover:text-white'>
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register
