import React from 'react'
import { HiOutlineXMark } from "react-icons/hi2";

const Modal = (props) => {
    return (
        <div className='bg-black/50 fixed top-0 inset-0 left-0 z-20 flex justify-center items-center'>
            <div className='w-[95%] md:w-[50%] h-[500px] bg-white rounded-xl p-10'>
                <div className="flex justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="text-2xl">{props.title}</div>
                    </div>
                    {/* Icon */}
                    <div onClick={() => props.closeModal()} className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 cursor-pointer transition-all duration-300 hover:bg-red-200 hover:rotate-90 hover:scale-110 active:scale-95">
                        <HiOutlineXMark
                            size={22}
                            className="transition-transform duration-300 group-hover:rotate-180"
                        />
                    </div>
                    {/* Icon */}
                </div>
                {props.children}

            </div>
        </div >
    )
}

export default Modal
