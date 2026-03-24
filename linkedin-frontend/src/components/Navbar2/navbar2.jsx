import React, { useState, useEffect } from 'react'
import "./navbar2.css";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineBell } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import axios from 'axios';
const navbar2 = () => {
    // const [dropdown, setDropDown] = useState(false);
    const [activeTab, setActiveTab] = useState("home");

    const [userData, setUserData] = useState(null)
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [searchUser, setSearchUser] = useState([])
    const [notificationCount, setNotificationCount] = useState("")

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 1000);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedTerm) {
            searchAPICall()
        }
    }, [debouncedTerm]);

    const searchAPICall = async () => {
        await axios.get(`https://nexgo-new.onrender.com/api/auth/findUser?query=${debouncedTerm}`, { withCredentials: true }).then(res => {
            console.log(res)
            setSearchUser(res.data.users)
        }).catch(err => {
            console.log(err);
            alert(err?.response?.data?.error)
        })
    }
    const fetchNotification = async () => {
        await axios.get('https://nexgo-new.onrender.com/api/notification/activeNotification', { withCredentials: true }).then(res => {
            var count = res.data.count;
            setNotificationCount(count)
        }).catch(err => {
            console.log(err);
            alert(err?.response?.data?.error)
        })
    }

    useEffect(() => {
        let userData = localStorage.getItem('userInfo')
        setUserData(userData ? JSON.parse(userData) : null)
        fetchNotification()
    }, [])

    return (
        <div className="bg-white h-13 flex justify-between py-1 px-5 xl:px-50 fixed top-0 w-full z-1000">
            <div className="flex gap-2 items-center">
                <Link to="/feeds">
                    <img
                        className="w-12 h-12 "
                        src={
                            "https://static.vecteezy.com/system/resources/thumbnails/063/107/886/small/playful-captivating-abstract-symbol-of-time-hourglass-with-clean-lines-flat-color-minimal-design-with-scalable-design-artisan-png.png"
                        }
                        alt="logo"
                    />
                </Link>
                <div className="relative">
                    <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }}
                        className="searchInput w-70 bg-grey-100 rounded-sm h-10 px-4"
                        placeholder="Search"
                    />
                    {searchUser.length > 0 && debouncedTerm.length !== 0 &&
                        <div className="absolute w-88 left-0 bg-gray-200">
                            {
                                searchUser.map((item, index) => {
                                    return (
                                        <Link to={`/profile/${item?._id}`} key={index} className="flex mb-1 border-b gap-2 items-center" onClick={() => setSearchTerm('')} >
                                            <div>
                                                <img
                                                    className="w-10 h-10 rounded-full border-gray-200 cursor-pointer"
                                                    src={item?.profilePic}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="cursor-pointer">{item?.f_name}</div>
                                        </Link >
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
            <div className="hidden gap-10 md:flex">
                <div
                    onClick={() => setActiveTab("home")}
                    className={`flex flex-col items-center cursor-pointer pb-1 border-b-2 transition-all duration-200 ${activeTab === "home" ? "border-black" : "border-transparent"
                        }`}>
                    <Link to="/feeds" className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95">
                        <HiOutlineHomeModern
                            className="transition-transform duration-200"
                            size={22}
                        />
                    </Link>
                    <Link to="/feeds"
                        className={`text-sm transition-all duration-200 ease-out hover:text-blue-600 hover:tracking-wide hover:-translate-y-0.5 active:scale-95 ${activeTab === "home" ? "text-black" : "text-gray-500"
                            }`}>
                        Home
                    </Link>
                </div>

                <div
                    onClick={() => setActiveTab("network")}
                    className={`flex flex-col items-center cursor-pointer pb-1 border-b-2 transition-all duration-200 ${activeTab === "network" ? "border-black" : "border-transparent"
                        }`}>
                    <Link to="/mynetwork" className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95">
                        <HiOutlineUsers
                            className="transition-transform duration-200"
                            size={22}
                        />
                    </Link>
                    <Link to="/mynetwork"
                        className={`text-sm transition-all duration-200 ease-out hover:text-blue-600 hover:tracking-wide hover:-translate-y-0.5 active:scale-95 ${activeTab === "network" ? "text-black" : "text-gray-500"
                            }`}>
                        My Network
                    </Link>
                </div>

                <div
                    onClick={() => setActiveTab("resume")}
                    className={`flex flex-col items-center cursor-pointer pb-1 border-b-2 transition-all duration-200 ${activeTab === "resume" ? "border-black" : "border-transparent"
                        }`}>
                    <Link to="/resume" className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95">
                        <HiOutlineBriefcase
                            className="transition-transform duration-200"
                            size={22}
                        />
                    </Link>
                    <Link to="/resume"
                        className={`text-sm transition-all duration-200 ease-out hover:text-blue-600 hover:tracking-wide hover:-translate-y-0.5 active:scale-95 ${activeTab === "resume" ? "text-black" : "text-gray-500"
                            }`}>
                        Resume
                    </Link>
                </div>

                <div
                    onClick={() => setActiveTab("messages")}
                    className={`flex flex-col items-center cursor-pointer pb-1 border-b-2 transition-all duration-200 ${activeTab === "messages" ? "border-black" : "border-transparent"
                        }`}>
                    <Link to="/messages" className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95">
                        <HiOutlineChatBubbleLeftRight
                            className="transition-transform duration-200"
                            size={22}
                        />
                    </Link>
                    <Link to="/messages"
                        className={`text-sm transition-all duration-200 ease-out hover:text-blue-600 hover:tracking-wide hover:-translate-y-0.5 active:scale-95 ${activeTab === "messages" ? "text-black" : "text-gray-500"
                            }`}>
                        Messages
                    </Link>
                </div>

                <div
                    onClick={() => setActiveTab("notifications")}
                    className={`flex flex-col items-center cursor-pointer pb-1 border-b-2 transition-all duration-200 ${activeTab === "notification"
                        ? "border-black"
                        : "border-transparent"
                        }`}>
                    <Link to={'/notifications'} className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95">
                        <div className="relative inline-flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95">
                            <HiOutlineBell
                                className="transition-transform duration-200"
                                size={22}
                            />
                            {notificationCount > 0 && <span className="absolute -top-1 -right-2 w-4 h-4 px-1 flex items-center justify-center rounded-full bg-red-600 text-white text-[10px] font-semibold leading-none shadow">
                                {notificationCount}
                            </span>}
                        </div>
                    </Link>
                    <Link to={'/notifications'}
                        className={`text-sm transition-all duration-200 ease-out hover:text-blue-600 hover:tracking-wide hover:-translate-y-0.5 active:scale-95 ${activeTab === "notification" ? "text-black" : "text-gray-500"
                            }`}>
                        Notifications
                    </Link>
                </div>

                <Link to={`/profile/${userData?._id}`}
                    onClick={() => setActiveTab("me")}
                    className={`flex flex-col items-center cursor-pointer pb-1 border-b-2 transition-all duration-200 ${activeTab === "me" ? "border-black" : "border-transparent"
                        }`}>
                    <div className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95">
                        <img
                            className="w-7 h-7"
                            src={userData?.profilePic}
                            alt="image"
                        />
                    </div>
                    <div
                        className={`text-sm transition-all duration-200 ease-out hover:text-blue-600 hover:tracking-wide hover:-translate-y-0.5 active:scale-95 ${activeTab === "me" ? "text-black" : "text-gray-500"
                            }`}>
                        Me
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default navbar2