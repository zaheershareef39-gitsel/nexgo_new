import React, { useState } from 'react'
import { HiOutlinePhoto } from "react-icons/hi2";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const AddModal = (props) => {
    const [imageUrl, setImageUrl] = useState(null)
    const [desc, setDesc] = useState("");
    // cloudname = dv4riwyy3
    // presetname = linkedinClone
    const handlePost = async () => {
        if (desc.trim().length === 0 & !imageUrl) return toast.error('Please enter any field')
        await axios.post('https://nexgo-new.onrender.com/api/post', { desc: desc, imageLink: imageUrl }, { withCredentials: true }).then((res => {
            window.location.reload();
        })).catch(err => {
            console.log(err)
        })
    }
    const handleUploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);

        data.append('upload_preset', 'linkedinClone');
        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dv4riwyy3/image/upload", data)
            const imageUrl = response.data.url;
            setImageUrl(imageUrl)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className=''>
            <div className='flex gap-4 items-center'>
                <div className='relative'>
                    <img src={props.personalData?.profilePic} className='w-15 h-15 rounded-full' alt="" />
                </div>
                <div className='text-2xl'>{props.personalData?.f_name}</div>
            </div>
            <div>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} cols={50} rows={4} placeholder="Share your progress, ideas, or wins." className='my-3 outline-0 text-xl p-2'></textarea>
            </div>
            {
                imageUrl && <div>
                    <img className='w-30 h-30 rounded-xl ' src={imageUrl} alt="" />
                </div>
            }
            <div className='flex justify-between items-center'>
                <div className="my-6">
                    <label htmlFor="inputFile" className='cursor-pointer'>
                        {/* Icon */}
                        <div className="group inline-flex items-center justify-center w-11 h-11 rounded-full bg-pink-100 text-pink-600 cursor-pointer transition-all duration-300 hover:bg-pink-200 hover:scale-110 active:scale-95">
                            <HiOutlinePhoto
                                size={22}
                                className="transition-transform duration-300 group-hover:rotate-12 group-hover:-translate-y-1"
                            />
                        </div>
                        {/* Icon */}
                    </label>
                    <input onChange={handleUploadImage} type="file" id='inputFile' className='hidden' />
                </div>
                <div onClick={handlePost} className="group bg-blue-950 text-white px-4 py-1.5 rounded-full cursor-pointer h-fit transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-900/40 active:scale-95"
                >Post</div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddModal
