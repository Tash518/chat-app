import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../context/ChatContext'
import SidebarSkeleton from '../components/skeletons/SidebarSkeleton'
import { Users } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
const Sidebar = () => {
  const { selectedUser, setSelectedUser, users, getUsers, isUsersLoading } = useContext(ChatContext);

  const { onlineUsers } = useContext(AuthContext);
  useEffect(() => {
    getUsers();
  }, [getUsers])

  //debug useeffect
  useEffect(() => {
    console.log("UPDATED selectedUser:", selectedUser);
    console.log("UPDATED onlineUsers:", onlineUsers);
  }, [selectedUser, onlineUsers]);
  if (isUsersLoading) return <SidebarSkeleton />
  return (
    <aside className='w-20 lg:w-72 border-blue-950 border-r-4 flex flex-col h-full transition-all duration-200'>
      {/* header */}
      <div className="border-b border-blue-950 w-full p-4">
        <div className="flex items-center gap-3">
          <Users className='size-6' />
          <span className='font-medium hidden lg:block'>People</span>
        </div>
      </div>
      {/* map users */}

      <div className="overflow-y-auto w-full py-4">
        {users.map((user) => {
          return <>
            <button
              key={user._id}
              onClick={() => {
                console.log("clicked user", user)
                setSelectedUser(user)
              }}
              className={`w-full py-2 bg-indigo-900 bg-opacity-20  flex transition-colors hover:bg-opacity-30
        ${selectedUser?._id === user._id ? "bg-indigo-900 items-center bg-opacity-20 ring-1 " : ""}`}>
              {/* avatar div */}
              <div className="relative mx-auto lg:mx-5">
                <img src={user.profilePic || "/avatar.webp"} alt={user.fullName}
                  className='size-12 rounded-full object-fill' />

                {onlineUsers.includes(user._id) && (
                  <>
                    <span className='absolute bottom-0 right-0 size-3 bg-green-300 rounded-full ring-2 ring-gray-800'></span>
                  </>
                )}
              </div>
              {/* user info section fro big screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className='font-medium text-gray-200'>{user.fullName}</div>
                <div className="text-sm text-gray-400">        {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          </>
        }
        )}

      </div>
    </aside>
  )
}

export default Sidebar
