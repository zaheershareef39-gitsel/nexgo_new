import React, { useState, useEffect, useRef } from 'react'
import Card from '../../components/Card/card'
import { HiChevronDown } from "react-icons/hi2";
import Conversation from '../../components/Conversation/conversation';
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { HiOutlinePhoto } from "react-icons/hi2";
import Advertisement from '../../components/Advertisement/advertisement';
import socket from '../../../socket';
import axios from 'axios';


const Messages = () => {
    const [conversations, setConversations] = useState([]);
    const [ownData, setOwnData] = useState(null)
    const [activeConvId, setActiveConvId] = useState(null)
    const [selectedConvDetails, setSelectedConvDetail] = useState(null)
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [imageLink, setImageLink] = useState(null);
    const [messageText, setMessageText] = useState("")
    const ref = useRef();

    useEffect(() => {
        ref?.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSelectedConv = (id, userData) => {
        setActiveConvId(id)
        socket.emit("joinConverssation", id)
        setSelectedConvDetail(userData)
    }


    useEffect(() => {
        fetchConverstationOnLoad()
        let userData = localStorage.getItem('userInfo')
        setOwnData(userData ? JSON.parse(userData) : null)
    }, [])

    const fetchMessages = async () => {
        await axios.get(`https://nexgo-new.onrender.com/api/message/${activeConvId}`, { withCredentials: true }).then(res => {

            setMessages(res.data.message)
        }).catch(err => {
            console.log(err)
            alert("Something Went Wrong")
        })
    }

    useEffect(() => {
        if (activeConvId) {
            fetchMessages();
        }
    }, [activeConvId])

    useEffect(() => {
        socket.on("recieveMessage", (response) => {
            setMessages([...messages, response])
        })
    }, [messages])

    const fetchConverstationOnLoad = async () => {
        await axios.get('https://nexgo-new.onrender.com/api/conversation/get-conversation', { withCredentials: true }).then(res => {
            setConversations(res.data.conversations)
            setActiveConvId(res.data?.conversations[0]?._id)
            socket.emit("joinConverssation", res.data?.conversations[0]?._id)
            let ownId = ownData?._id;
            let arr = res.data?.conversations[0]?.members?.filter((it) => it._id !== ownId)
            setSelectedConvDetail(arr[0])
        }).catch(err => {
            console.log(err)
            alert("Something Went Wrong")
        })
    }
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
    const handleSendMessage = async () => {
        await axios.post(`https://nexgo-new.onrender.com/api/message`, { conversation: activeConvId, message: messageText, picture: imageLink }, { withCredentials: true }).then(res => {
            socket.emit("sendMessage", activeConvId, res.data)
            setMessageText("")
        }).catch(err => {
            console.log(err)
            alert("Something Went Wrong")
        })
    }

    return (
        <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
            <div className='w-full justify-between flex pt-5'>
                {/* Left side */}
                <div className='w-full md:w-[70%]'>
                    <Card padding={0}>
                        <div className='border-b border-gray-300 px-5 py-2 font-semibold text-lg'>
                            Messages
                        </div>
                        <div className='border-b border-gray-300 px-5 py-2 '>
                            <div className='py-1 px-3 cursor-pointer hover:bg-green-900 bg-green-800 font-semibold flex gap-2 w-fit rounded-2xl text-white'>Focussed <HiChevronDown className="transition-transform duration-200 group-open:rotate-180" size={20} /></div>
                        </div>
                        {/* div for chat */}
                        <div className='w-full md:flex'>
                            <div className='h-[590px] overflow-auto w-full md:w-[40%] border-r border-gray-400'>
                                {/* for each chat */}
                                {
                                    conversations.map((item, index) => {
                                        return (
                                            <Conversation activeConvId={activeConvId} handleSelectedConv={handleSelectedConv} item={item} key={index} ownData={ownData} />
                                        );
                                    })
                                }


                            </div>
                            <div className="w-full md:w-[60%] border-gray-400">
                                <div className='border-gray-300 py-2 px-4 border-b-2 flex justify-between items-center'>
                                    <div>
                                        <p className='text-sm font-semibold'>{selectedConvDetails?.f_name}</p>
                                        <p className='text-sm text-gray-400'>{selectedConvDetails?.headline}</p>
                                    </div>
                                    {/* Icon */} <div>
                                        <div className="group inline-flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:scale-110 active:scale-95">
                                            <HiEllipsisHorizontal
                                                size={22}
                                                className="text-gray-600 transition-colors duration-200 group-hover:text-gray-900"
                                            />
                                        </div> {/* Icon */}
                                    </div>
                                </div>
                                <div className='h-[360px] w-full overflow-auto border-b border-gray-300'>
                                    <div className='w-full border-b border-gray-300 gap-3 p-4'>
                                        <img className="rounded-full w-16 h-15 cursor-pointer" src={selectedConvDetails?.profilePic} alt="" />
                                        <div className='my-2'>
                                            <div className='text-md'>{selectedConvDetails?.f_name}</div>
                                            <div className='text-sm text-gray-500'>{selectedConvDetails?.headline}</div>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        {/* for each messages */}

                                        {
                                            messages.map((item, index) => {
                                                return (
                                                    <div ref={ref} key={index} className='flex w-full cursor-pointer border-gray-300 gap-3 p-4'>
                                                        <div className='shrink-0'>
                                                            <img className="rounded-full w-8 h-8 cursor-pointer" src={item?.sender?.profilePic} alt="" />
                                                        </div>
                                                        <div className="mb-2 w-full">
                                                            <div className='text-md font-semibold'>{item?.sender?.f_name}</div>
                                                            <div className='text-sm mt-6 hover:bg-gray-200'>{item?.message}</div>
                                                            {
                                                                item?.picture && <div className='my-2'><img className="w-[240px] h-[180px] rounded-md" src={item?.picture} alt="" /></div>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                                <div className='p-2 w-f border-b border-gray-200'>
                                    <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} rows={4} className='bg-gray-200 outline-0 rounded-xl text-sm w-full p-3' placeholder='Write A Message'></textarea>
                                </div>
                                <div className='p-3 flex justify-between'>
                                    <div>
                                        <label htmlFor="messageImage" className='cursor-pointer'>
                                            {/* icon */}
                                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-600 cursor-pointer transition-all duration-200 hover:bg-blue-200 hover:scale-110 hover:-translate-y-0.5 active:scale-95">
                                                <HiOutlinePhoto size={22} />
                                            </span>
                                            {/* icon */}
                                        </label>
                                        <input type="file" onChange={handleInputImage} id='messageImage' className='hidden' />
                                    </div>
                                    {
                                        !loading && <div className='px-3 py-1 cursor-pointer rounde-2xl border-1 bg-blue-950 text-white' onClick={handleSendMessage}  >
                                            Send
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                {/* Right side */}
                <div className='hidden md:flex md:w-[25%]'>
                    <div className='sticky top-19'>
                        <Advertisement />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Messages
