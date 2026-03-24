import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ImageModal = ({ isCircular, selfData, handleEditFunc }) => {
    const [imageLink, setImageLink] = useState(isCircular ? selfData?.profilePic : selfData?.cover_pic);
    const [loading, setLoading] = useState(false);
    const handleInputImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);

        data.append('upload_preset', 'linkedinClone');
        setLoading(true);
        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dv4riwyy3/image/upload", data)
            const imageUrl = response.data.url;
            setImageLink(imageUrl)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    const handleSubmitBtn = async () => {
        let { data } = { ...selfData };
        if (isCircular) {
            data = { ...data, ['profilePic']: imageLink }
        } else {
            data = { ...data, ['cover_pic']: imageLink }
        }
        handleEditFunc(data)
    }
    return (
        <div className='p-5 relative flex items-center flex-col h-full'>
            {
                isCircular ? (
                    <img className='rounded-full w-[150px] h-[150px]' src={imageLink} alt="Profile" />
                ) : (
                    <img className='rounded-xl  w-full h-[200px] object-cover' src={imageLink} alt="Cover" />
                )
            }
            <label htmlFor="btn-submit" className='cursor-pointer absolute bottom-10 left-0 p-3  bg-blue-600 text-white rounded-2xl'>Choose Image</label>
            <input onChange={handleInputImage} type="file" id='btn-submit' className='hidden' />
            {
                loading ? <div className="w-full flex flex-col justify-center items-center py-10 gap-3">

                    <AiOutlineLoading3Quarters
                        size={45}
                        className="animate-spin text-blue-600"
                    />

                    <p className="text-blue-700 font-semibold animate-pulse">
                        Loading...
                    </p>

                </div> : <div className='cursor-pointer absolute bottom-10 right-0 p-3  bg-blue-600 text-white rounded-2xl' onClick={handleSubmitBtn}>Submit</div>
            }

        </div>
    )
}

export default ImageModal
