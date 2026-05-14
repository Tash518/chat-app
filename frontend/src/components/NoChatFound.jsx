import { MessageSquare } from 'lucide-react'
import React from 'react'

const NoChatFound = () => {
  return (
    // window
    <div className='w-full bg-slate-800 justify-center items-center flex flex-col p-16 h-full'>
    {/* container for content */}
      <div className='text-center max-w-md space-y-7'>
        {/* icon */}
        <div className='flex justify-center gap-4 mb-5'>
            <div className="size-16 flex justify-center items-center rounded-2xl animate-bounce bg-sky-300/50">
            <MessageSquare  className='size-8 text-cyan-400'/>
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-bold">Welcome to ts chat app</h2>
            <p className='text-blue-400 font-medium'>Select a chat to start conversation</p>
        </div>
        {/* intro text  */}
      </div>
    </div>
  )
}

export default NoChatFound
