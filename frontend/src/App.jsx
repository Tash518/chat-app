import React, { useEffect, useContext } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { AuthContext } from './context/AuthContext'
import { LoaderCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);
  console.log("authUser in App.jsx", authUser);

  if (isCheckingAuth && !authUser){
    return <div className='flex items-center justify-center h-screen'>
      <LoaderCircle className='size-10 animate-spin'/>
    </div>
  }
  
  return (
    <div className=''>
      <Navbar />
      <Routes>
          <Route path="/" element={authUser ?<HomePage />: <Navigate to="/login"/> }/>
          <Route path="/signup" element={!authUser ?<SignupPage />: <Navigate to="/l"/>} />
          <Route path="/login" element={!authUser ?<LoginPage />: <Navigate to="/"/>} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage />: <Navigate to="/login"/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
