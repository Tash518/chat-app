import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("getUsersForSidebar message controller error ", error.message);
        res.status(500).json({message:"internal server error"})
    }
}
export const getMessages = async(req,res)=>{
    try {
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId:senderId,receiverId:receiverId},
                {senderId:receiverId,receiverId:senderId},
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("getMessages message controller error ", error.message);
        res.status(500).json({message:"internal server error"})
    }

}
export const sendMessage = async (req,res) => {
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        let imageurl;
        if(image){
            const uploadResponse = cloudinary.uploader.upload(image);
            imageurl = (await uploadResponse).secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageurl,
        })
        await newMessage.save();
        //realtime functionality oes here 
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("sendMessage message controller error ", error.message);
        res.status(500).json({message:"internal server error"})
    }
}
