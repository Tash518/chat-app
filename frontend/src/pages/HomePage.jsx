import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import Sidebar from '../components/Sidebar';
import NoChatFound from '../components/NoChatFound';
import ChatContainer from './ChatContainer';

const HomePage = () => {
  const { getUSers, getMessages, selectedUser } = useContext(ChatContext);
  return (
    <div className='bg-base-200 '>
      <div className="flex items-center justify-center pt-12 px-4">
        {/* chat inside here */}
        <div className="bg-base-300 shadow-xl rounded-lg w-full max-w-6xl h-[calc(100vh-5rem)]">
          <div className="flex rounded-lg overflow-hidden h-full">
            <Sidebar />
            {!selectedUser ? <NoChatFound /> : <ChatContainer />}
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage
