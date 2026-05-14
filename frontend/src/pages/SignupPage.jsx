import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { MessageSquare, User, Mail, Lock, EyeOff, Eye, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", })
  const { isSigningUp, signup } = useContext(AuthContext)
  const validateForm = () => {
    if(!formData.fullName.trim()){
      return toast.error("fullname is required");
    }
    if(!/^\S+@\S+\.\S+/.test(formData.email)){
      return toast.error("valid email is required");
    }
    if(!formData.password.trim()){
      return toast.error("password is required");
    }
    if(formData.password.length < 6){
      return toast.error("password must be at least 6 characters");
    }
 
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm()) signup(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* <left side> */}
      <div className='flex flex-col justify-center items-center  p-6 sm:p-12' >
        <div className='w-full max-w-md space-y-8'>
          {/* logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='w-6 h-6 text-primary' />
              </div>
              <h2 className='text-3xl font-bold mt-2'>Create an account</h2>
              <p className='text-base-content/60'>Join us and start your journey today!</p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* name */}
            <label className='label' htmlFor="fullName">
              <span className='label-text'>Fullname</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-2 left-0 pl-3 flex items-center'><User className='w-5 h-5 z-10 text-base-content/40' /></div>
              <input type="text" id='fullName' name='fullName' className='input input-bordered w-full pl-10' placeholder='Full Name' value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
            </div>
            {/* Email */}
            <label className='label' htmlFor="email">
              <span className='label-text font-medium'>Email</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none '>
                <Mail className='w-5 h-5 text-base-content/40 z-10' />
              </div>

              <input
                type="email"
                id="email"
                name="email"
                className='input input-bordered w-full pl-10'
                placeholder='you@example.com'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
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
            <button type='submit' className=' w-full size-6 btn btn-primary' disabled={isSigningUp} >
              {isSigningUp ? (<> <Loader className='size-5 animate-spin' /> LOADIN...</>) : ("Create Account")}
            </button>
          </form>
          {/* login link */}
          <div className='text-center'>
            <p>Already Have An Account?

              <Link to="/login" className='text-primary/20 hover:text-primary'> Sign In </Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title="Connect and Chat with Friends"
        subtitle="Join our chat app and experience seamless communication with your friends and family"
      />
    </div>
  )
}

export default SignupPage
