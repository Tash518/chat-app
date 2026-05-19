import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../context/ChatContext'
import ChatHeader from '../components/ChatHeader';
import InputMessage from '../components/InputMessage';
import { AuthContext } from '../context/AuthContext';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useContext(ChatContext);
  const { authUser } = useContext(AuthContext)
  useEffect(() => {
    getMessages(selectedUser._id);
    
  }, [selectedUser._id, getMessages])
  if (isMessagesLoading) return <div className='flex w-full flex-col overflow-auto'>
    <ChatHeader />
    {/* make skeleton */}
    <div className="w-full p-4 overflow-auto flex">

    </div>
  </div>
  return (
    <div className='flex w-full flex-col overflow-auto'>
      <ChatHeader />
      <div className="w-full p-4">
        {messages.map((message) => {
          return <>
            {/* chat section */}
            <div key={message._id}
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
              {/* chat image */}
              <div className="chat-image avatar">
                <div className="size-10 rounded-full">
                  <img src={
                    message.senderId === authUser._id ?
                      authUser.profilePic || "/avatar.webp" :
                      selectedUser.profilePic || "/avatar.webp"
                  } alt="profilepic" />
                </div>
              </div>
              {/* chat header */}
              <div className="chat-header">
                {message.senderId === authUser._id ?
                  authUser.fullName || "user1" :
                  selectedUser.fullName || "user2"}
                <time className="text-xs opacity-50">{message.createdAt.split("T")[1].split(".")[0]}</time>
              </div>
              {/* chat text */}

              <div className="chat-bubble bg-emerald-900 flex flex-col">{
                message.image &&
                <img src={message.image} alt="attachment" className='sm:max-w-[200px] rounded-md mb-2' />
              }
                {message.text &&
                  <p>{message.text}</p>
                }
              </div>
            </div>
          </>
        }
        )}
      </div>
      <InputMessage />
    </div>
  )
}

export default ChatContainer
