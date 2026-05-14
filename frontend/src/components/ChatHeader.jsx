import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { X } from 'lucide-react';

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useContext(ChatContext);
    const {onlineUsers} = useContext(AuthContext);
  return (
    <div className='p-3 border-b border-blue-900 w-full'>
      <div className="flex items-center justify-between">
        {/* avatar and userinfo */}
        <div className='flex gap-3 items-center'>
            {/* avatar */}
            <div className="avatar">
                <div className="rounded-full size-10 border-black border-2">
                    <img src={selectedUser.profilePic || "/avatar.webp"} alt={selectedUser.fullName} />
                </div>
            </div>
            {/* userinfo */}
            <div>
                <h4 className='font-medium'>{selectedUser.fullName}</h4>
                <p>{onlineUsers.includes(selectedUser._id)?"Online":"offline"}</p>
            </div>
        </div>
        {/* exit chat */}
        <button onClick={()=>setSelectedUser(null)}><X /></button>
      </div>
    </div>
  )
}

export default ChatHeader
