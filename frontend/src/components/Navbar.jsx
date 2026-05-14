import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { logout, authUser } = useContext(AuthContext);
  return (
    <header className='sticky top-0 w-full z-40 backdrop-blur-lg bg-base-300 border-b border-base-300 border-opacity-90'>
      <div className="container w-full px-3 h-16">
        <div className="flex items-center justify-between h-full">
          {/* logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className='flex items-center hover:opacity-75 transition-all'>
              <div className="flex items-center justify-center gap-3 p-2 rounded-lg">
                <MessageSquare className='size-5 text-primary' />
                <h1 className="text-white font-bold text-lg">Chat-App</h1>
              </div>
            </Link>
          </div>
          {/* right section */}

          <div className="flex items-center gap-2">
            <Link to="/settings" className='btn btn-sm gap-2 transition-all'>
            <Settings className='size-5' />
            <span className='sm:inline hidden'>Settings</span>
            </Link>

            {authUser && (
              <>
              <Link to="/profile" className='btn btn-sm gap-2'><User className='size-5'/>
              <span className='sm:inline hidden'>Profile</span>
              </Link>

              <button onClick={logout} className='flex items-center gap-2'><LogOut className='size-5' />
              <span className='sm:inline hidden'>Logout</span></button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar
