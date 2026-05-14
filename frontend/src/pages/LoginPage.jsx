import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import AuthImagePattern from '../components/AuthImagePattern';
import { Eye, EyeOff, Loader, Lock, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingin } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData)
  }

  return (
    <div className='h-screen grid lg:grid-cols-2'>
      {/* left side form */}
      <div className='flex flex-col justify-center items-center'>
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="flex text-center flex-col items-center gap-2 group mb-8">
            <div className="size-12 rounded-xl bg-base-300 bg-opacity-50 flex items-center justify-center group-hover:bg-base-200 transition-colors">
              <MessageSquare className=' size-6 text-primary/60 ' />
            </div>
              <div className="text-2xl font-bold">Welcome Back</div>
              <p className="text-base-content">Sign in to continue</p>
          </div>
        </div>
        {/* form */}
        <form className='space-y-6' onSubmit={handleSubmit}>
          {/* email */}
          <label className='label' htmlFor="email">
            <span className='label-text font-medium' >Email</span>
          </label>
          <div className="relative">
            <div className='absolute inset-y-0 z-10 flex items-center left-0 pl-3'>

            <Mail className='size-5' />
            </div>
            <input type="email"
            id='email'
            placeholder='enter valid email'
            value={formData.email}
            className='input input-bordered w-full pl-10'
            onChange={(e) => {
              setFormData({...formData,email:e.target.value})
              c
            }
            }
             />
          </div>
          {/* password */}
          <label htmlFor="password" className='label'>
              <span className='label-text font-medium'>Password</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className='z-10 size-5' />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className='input input-bordered w-full pl-10'
                placeholder='Password'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <button type='button' className=' absolute inset-y-0 right-0 pr-2 flex items-center' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (<EyeOff className='size-5' />) : (<Eye className='size-5' />)}
              </button>
          </div>
          {/* submit */}
            <button type='submit' className=' w-full size-6 btn btn-primary bg-primary' disabled={isLoggingin} >
              {isLoggingin ? (<> <Loader className='size-5 animate-spin' /> LOADIN...</>) : ("Create Account")}
            </button>
        </form>
        {/* login link */}
          <div className='text-center'>
            <p>Don't Have An Account?

              <Link to="/signup" className='text-primary  hover:text-primary/30 hover:font-semibold'> Sign In </Link>
            </p>
          </div>
      </div>
      {/* right side imae pattern */}
      <AuthImagePattern
        title="Connect and Chat with Friends"
        subtitle="Join our chat app and experience seamless communication with your friends and family"
      />
    </div>
  )
}

export default LoginPage
