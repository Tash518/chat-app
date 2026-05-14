import React, { useContext, useRef, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { Image, Send, X } from 'lucide-react'
import toast from 'react-hot-toast'

const InputMessage = () => {
    const [text, setText] = useState("")
    const [previewImage, setPreviewImage] = useState(null)
    const fileInputRef = useRef(null)
    const { sendMessage } = useContext(ChatContext)
    const [isSending, setIsSending] = useState(false);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith("image/")) {
            toast.error("select valid image")
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result)
        }
        reader.readAsDataURL(file)


    };
    const removeImage = () => {
        setPreviewImage(null);
        if (fileInputRef.current) fileInputRef.current.value = ""
    };
    const handleMessage = async (e) => {
        e.preventDefault();

        console.log("SUBMIT FIRED");
        if (isSending) return;
        if (!text.trim() && !previewImage) return;
        try {
            setIsSending(true);
            await sendMessage({
                text: text.trim(),
                image: previewImage,
            });

            //clear inoputs
            setText("");
            setPreviewImage(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("failt message send", error)
        }
        finally {
            setIsSending(false);
        }
    }




    return (
        <div className=' w-full p-4'>
            {/* image preview */}
            {previewImage && <div className="flex items-center gap-2">
                <div className="relative">
                    <img src={previewImage || "/avatar.webp"} alt="preview" className='rounded-lg size-20 bg-red-300 border border-zinc-500' />
                    <button onClick={() => removeImage()} className='absolute bg-black size-5 rounded-full -top-1 -right-1 flex items-center justify-center'>
                        <X className='size-3' />
                    </button>
                </div>
            </div>}
            {/* imput section */}
            <form onSubmit={handleMessage} className='flex items-center'>
                <div className="flex flex-1 items-center m-0.5 gap-1">
                    <input type="text"
                        placeholder='type here'
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                        }
                        }
                        className='w-full p-2 input input-sm sm:input-md' />
                    <input type="file" accept='image/*' className='hidden' onChange={handleImage} ref={fileInputRef} />
                    <button type='button' onClick={() => {
                        fileInputRef.current?.click()
                    }
                    }
                        className={`btn-circle sm:flex btn`} >
                        <Image className='size-8' />
                    </button>
                    <button type='submit'
                        className='btn btn-sm btn-circle'
                        disabled={!text.trim() && !previewImage}>
                        <Send className='size-8' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default InputMessage
