import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Camera, Mail, User } from 'lucide-react'

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useContext(AuthContext)
  const [selectedImage, setSelectedImage] = useState(null)
  const handeImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(e.target.files)
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64image = reader.result;
      setSelectedImage(base64image)
      await updateProfile({ profilePic: base64image });
    }


  }

  return (
    <div className='h-screen pt-20'>
      <div className="max-w-2xl flex-col mx-auto flex items-center justify-center">
        <div className="bg-base-200 min-w-[70vw] border-b rounded-2xl p-5 space-y-5">
          {/* profile header */}
          <div className="text-center">
            <h1 className='font-bold '>Profile</h1>
            <p className='mt-2'>Your Profile</p>
          </div>
          {/* avatar section */}
          <div className="flex flex-col items-center">
            <div className='relative'>
              <img src={ selectedImage ||
                authUser.profilePic || "/avatar.webp"
              } alt="" className="size-32 rounded-full bg-yellow-200 border-4" />
              <label className={`p-2 hover:scale-105 cursor-pointer transition-all duration-200 absolute bg-base-content bottom-0 rounded-full right-0 flex justify-center items-center ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`} htmlFor="avatar-upload">
                <Camera className='size-5 text-base-300' />
                <input type="file"
                  id='avatar-upload'
                  className='hidden'
                  accept='image/*'
                  onChange={handeImageUpload}
                  disabled={isUpdatingProfile} />
              </label>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            {isUpdatingProfile ? "Uploading..." : "click the camera to upload image"}
          </p>
          {/* user info */}
          <div className="container space-y-2">
            {/* user */}
            <div className="text-sm  text-gray-400 flex item-center gap-2">
              <User className='size-4' />Username
            </div>
            <p className='px-4 bg-base-100 rounded-lg border'>{authUser?.fullName}</p>
            {/* email */}
            <div className="text-sm  text-gray-400 flex item-center gap-2">
              <Mail className='size-4' />Email Address
            </div>
            <p className='px-4 bg-base-100 rounded-lg border'>{authUser?.email}</p>
          </div>
          {/* additional info */}
          <div className='mt-2 bg-base-300 p-4 rounded-lg'>
            <h2 className="text-lg font-medium">Account Information</h2>
            <div className="space-y-3 py-2 border-b-2 border-indigo-700 gap-3  flex items-center justify-between">
              <span>Member Since</span>
              <span>{authUser.createdAt.split("T")[0]}</span>
            </div>

            <div className="space-y-3 py-2 border-b-2 border-indigo-700 gap-3  flex items-center justify-between">
              <span>Account Status</span>
              <span className='text-green-300'>Active</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ProfilePage
