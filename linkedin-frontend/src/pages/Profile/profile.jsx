import React from 'react'
import Advertisement from '../../components/Advertisement/advertisement'
import Card from '../../components/Card/card'
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Post from "../../components/Post/post";
import { HiPlus } from "react-icons/hi2";
import Modal from '../../components/Modal/modal';
import ImageModal from '../../components/ImageModal/imageModal';
import { useState, useEffect } from 'react';
import EditinfoModal from '../../components/EditInfoModal/editinfoModal';
import AboutModel from '../../components/AboutModel/aboutModel';
import ExpModal from '../../components/ExpModal/expModal';
import MessageModal from '../../components/MessageModal/messageModal';
import { HiArrowRight } from 'react-icons/hi2';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineBriefcase, HiOutlineMapPin, HiOutlineUserGroup, HiOutlineBuildingOffice } from "react-icons/hi2";
import { ToastContainer, toast } from 'react-toastify';
const Profile = () => {
    const { id } = useParams();

    const [imageSetModal, setImageModal] = useState(false);
    const [circularImage, setCircularImage] = useState(true);
    const [infoModal, setInfoModal] = useState(false);
    const [aboutModal, setAboutModal] = useState(false)
    const [expModal, setExpModal] = useState(false)
    const [messageModal, setMessageModal] = useState(false)
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState([]);
    const [ownData, setOwnData] = useState(null);

    const [updateExp, setUpdateExp] = useState({ clicked: "", id: "", datas: {} });

    const updateExpEdit = (id, data) => {
        setUpdateExp({
            ...updateExp,
            clicked: true, id: id, data: data
        })
        setExpModal(prev => !prev)
    }

    useEffect(() => {
        fetchDataOnLoad()
    }, [id])

    const fetchDataOnLoad = async () => {
        try {
            const [userDatas, postDatas, ownDatas] = await Promise.all([
                axios.get(`https://nexgo-new.onrender.com/api/auth/user/${id}`),
                axios.get(`https://nexgo-new.onrender.com/api/post/getTop5Post/${id}`),
                axios.get('https://nexgo-new.onrender.com/api/auth/self', { withCredentials: true })
            ]);
            setUserData(userDatas.data.user);
            setPostData(postDatas.data.posts);
            setOwnData(ownDatas.data.user)
            localStorage.setItem('userInfo', JSON.stringify(ownDatas.data.user))
        } catch (err) {
            console.log(err)
            alert("Something Went Wrong")
        }
    }



    const handleMessageModal = () => {
        setMessageModal(prev => !prev)
    }
    const handleExpModal = () => {
        if (expModal) {
            setUpdateExp({ clicked: "", id: "", datas: {} });
        }
        setExpModal(prev => !prev)
    }

    const handleAboutModal = () => {
        setAboutModal(prev => !prev)
    }
    const handleInfoModal = () => {
        setInfoModal(prev => !prev);
    }

    const handleImageModalOpenClose = () => {
        setImageModal(prev => !prev);
    }
    const handleOnEditCover = () => {
        setImageModal(true);
        setCircularImage(false);
    }
    const handleImageModalOpen = () => {
        setImageModal(true);
        setCircularImage(true);
    }
    const handleEditFunc = async (data) => {
        await axios.put(`https://nexgo-new.onrender.com/api/auth/update`, { user: data }, { withCredentials: true }).then(res => {
            window.location.reload();
        }).catch(err => {
            console.log(err)
            alert('Something Went Wrong')
        })
    }
    const amIFriend = () => {
        return userData?.friends?.includes(ownData?._id);
    }

    const isInPendingList = () => {
        return userData?.pending_friends?.includes(ownData?._id);
    }

    const isInSelfPendingList = () => {
        return ownData?.pending_friends?.includes(userData?._id);
    }
    const checkFriendStatus = () => {
        if (amIFriend()) {
            return "Disconnect";
        } else if (isInSelfPendingList()) {
            return "Approve Request";
        }
        else if (isInPendingList()) {
            return "Request Sent"
        }
        else {
            return "Connect"
        }
    }
    const handleSendFriendRequest = async () => {
        if (checkFriendStatus() === "Request Sent") return;
        if (checkFriendStatus() === "Connect") {
            await axios.post('https://nexgo-new.onrender.com/api/auth/sendFriendReq', { reciever: userData?._id }, { withCredentials: true }).then(res => {
                toast.success(res.data.message);
                setTimeout(() => { window.location.reload(); }, 2000);
            }).catch(err => {
                console.log(err);
                toast.error(err?.response?.data?.error)
            })
        }
        else if (checkFriendStatus() === "Approve Request") {
            await axios.post('https://nexgo-new.onrender.com/api/auth/acceptFriendRequest', { friendId: userData?._id }, { withCredentials: true }).then(res => {
                toast.success(res.data.message);
                setTimeout(() => { window.location.reload(); }, 2000);
            }).catch(err => {
                console.log(err);
                toast.error(err?.response?.data?.error)
            })
        } else {
            await axios.delete(`https://nexgo-new.onrender.com/api/auth/removeFromFriendList/${userData?._id}`, { withCredentials: true }).then(res => {
                toast.success(res.data.message);
                setTimeout(() => { window.location.reload(); }, 2000);
            }).catch(err => {
                console.log(err);
                toast.error(err?.response?.data?.error)
            })
        }
    }
    const handleLogout = async () => {
        await axios.post('https://nexgo-new.onrender.com/api/auth/logout', {}, { withCredentials: true }).then(res => {
            localStorage.clear();
            window.location.reload();
        }).catch(err => {
            console.log(err);
            toast.error(err?.response?.data?.error)
        })
    }
    const copyToClickBoard = async () => {
        try {
            let string = `https://nexgo-new.onrender.com/profile/${id}`
            await navigator.clipboard.writeText(string);
            toast.success("Post Link Copied to Clipboard")
        } catch (err) {
            console.error('Failed to Copy!', err);
        }
    };
    return (
        <div className='px-5 xl:px-50 py-5 mt-5 flex flex-col gap-5 w-full pt-12 bg-gray-100'>
            <div className='flex justify-between'>
                {/* Left Side */}
                <div className='w-full md:w-[70%]'>
                    <div>
                        <Card padding={0}>
                            <div className='w-full h-fit'>
                                <div className='relative w-full h-[200px]'>
                                    {
                                        userData?._id === ownData?._id && <div className='absolute cursor-pointer top-3 right-3 z-20  flex justify-center items-center ' onClick={handleOnEditCover}>
                                            {/* Icon */}
                                            <div className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-95">
                                                <HiOutlinePencilSquare
                                                    size={22}
                                                    className="transition-transform duration-200 group-hover:rotate-12 group-hover:text-purple-600"
                                                />
                                            </div>
                                            {/* Icon */}
                                        </div>
                                    }
                                    <img src={userData?.cover_pic} alt="" className='w-full h-[200px] rounded-tr-lg rounded-tl-lg' />
                                    <div onClick={handleImageModalOpen} className='absolute object-cover top-24 left-6 z-10'><img src={userData?.profilePic} className={`rounded-full border-2 border-white cursor-pointer w-35 h-35 ${circularImage ? 'rounded-full' : 'rounded-none'}`} alt="" /></div>
                                </div>
                                <div className='mt-10 relative px-8 py-2'>
                                    {
                                        userData?._id === ownData?._id && <div className='absolute top-0 right-3 z-20 flex justify-center items-center' onClick={handleInfoModal}>
                                            {/* Icon */}
                                            <div className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 cursor-pointer transition-all duration-200 hover:bg-purple-100 hover:text-purple-600 hover:scale-110 active:scale-95">
                                                <HiOutlinePencilSquare size={22} />
                                            </div>
                                            {/* Icon */}
                                        </div>
                                    }
                                    <div className='w-full'>
                                        <div className="flex flex-col items-start gap-1">


                                            <h1 className="text-3xl font-bold text-gray-900 tracking-wide">
                                                {userData?.f_name}
                                            </h1>


                                            <div className="flex items-center gap-2 text-gray-600">
                                                <HiOutlineBriefcase className="text-blue-600" size={18} />
                                                <p className="text-md font-medium hover:text-blue-700 transition-colors duration-200">
                                                    {userData?.headline}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 text-gray-600">
                                                <HiOutlineBuildingOffice className="text-purple-600" size={18} />
                                                <p className="text-sm font-medium hover:text-purple-700 transition-colors duration-200">
                                                    {userData?.curr_company || "No company"}
                                                </p>
                                            </div>


                                            <div className="flex items-center gap-2 text-gray-500">
                                                <HiOutlineMapPin className="text-red-500" size={18} />
                                                <p className="text-sm hover:text-gray-700 transition-colors duration-200">
                                                    {userData?.curr_location}
                                                </p>
                                            </div>


                                            <div className="flex items-center gap-2 mt-1">
                                                <HiOutlineUserGroup className="text-green-600" size={18} />
                                                <p className="text-sm font-semibold text-blue-700 cursor-pointer hover:text-blue-900 hover:underline transition-all duration-200">
                                                    {userData?.friends?.length || 0} Connections
                                                </p>
                                            </div>

                                        </div>
                                        <div className='md:flex w-full justify-between'>
                                            <div className='my-5 flex gap-5'>


                                                <div onClick={copyToClickBoard} className="cursor-pointer px-4 py-2 border rounded-lg bg-blue-800 text-white font-semibold
transition-all duration-300 ease-in-out
hover:bg-blue-900 hover:scale-105 hover:shadow-lg
active:scale-95">
                                                    Share
                                                </div>

                                                {
                                                    userData?._id === ownData?._id && <div onClick={handleLogout} className="cursor-pointer px-4 py-2 border rounded-lg bg-blue-800 text-white font-semibold
transition-all duration-300 ease-in-out
hover:bg-red-700 hover:scale-105 hover:shadow-lg
active:scale-95">
                                                        Logout
                                                    </div>
                                                }
                                            </div>
                                            <div className='my-5 flex gap-5'>
                                                {amIFriend() ?
                                                    <div
                                                        onClick={handleMessageModal}
                                                        className='cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold'
                                                    >
                                                        Message
                                                    </div> : null
                                                }
                                                {userData?._id === ownData?._id ? null : <div onClick={handleSendFriendRequest} className='cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold'>{checkFriendStatus()}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className='mt-5'>
                        <Card padding={1}>
                            <div className='flex justify-between items:center'>
                                <div className='text-lg font-semibold'>About</div>
                                {/* Icon */}
                                {
                                    userData?._id === ownData?._id && <div onClick={handleAboutModal} className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 cursor-pointer transition-all duration-200 hover:bg-purple-100 hover:text-purple-600 hover:scale-110 active:scale-95">
                                        <HiOutlinePencilSquare size={22} />
                                    </div>
                                }
                                {/* Icon */}
                            </div>
                            <div className='text-gray-700 text:md w-[80%]'>{userData?.about}</div>
                        </Card>
                    </div>
                    <div className='mt-5'>
                        <Card padding={1}>
                            <div className='flex justify-between items:center'>
                                <div className='text-lg font-semibold'>Skills</div>
                            </div>
                            <div className='text-gray-700 text-md my-2 w-full flex gap-4 flex-wrap'>
                                {
                                    userData?.skills?.map((item, index) => {
                                        return (
                                            <div key={index} className="py-2 px-3 cursor-pointer bg-blue-800 text-white rounded -lg ">{item}</div>
                                        );
                                    })
                                }
                            </div>
                        </Card>
                    </div>
                    <div className='mt-5'>
                        <Card padding={1} >
                            <div className='flex justify-between items-center'>
                                <div className='text-xl'>Activities</div>
                            </div>
                            <div className='cursor-pointer px-3 py-1 w-fit border rounded-4xl bg-green-800 text-white font-semibold'>Posts</div>
                            {/* Parent Div */}
                            <div className='overfolw-x-auto my-2 flex gap-1 overflow-y-hidden w-full'>
                                {
                                    postData.map((item, index) => {
                                        return (
                                            <Link to={`/profile/${id}/activities/${item?._id}`} className='cursor-pointer shrink-0 w-[350px] h-[560px]'>
                                                <Post profile={1} item={item} personalData={ownData} />
                                            </Link>
                                        );
                                    })
                                }

                            </div>
                            {
                                postData.length >= 5 && <div className='w-full flex justify-center items-center'>
                                    {/* Show all posts */}
                                    <Link to={`/profile/${id}/activities`} className='flex items-center gap-2 p-3 px-5 rounded-xl cursor-pointer bg-white hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border border-gray-200 hover:border-blue-300 font-semibold text-gray-700 group'>
                                        Show All Posts
                                        {/* Icon */}
                                        <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                        {/* Icon */}
                                    </Link>
                                </div>
                            }
                        </Card>
                    </div>
                    <div className='mt-5'>
                        <Card padding={1} >
                            <div className='flex justify-between items-center'>
                                <div className='text-xl'>Experience</div>
                                {
                                    userData?._id === ownData?._id && <div>
                                        {/* Icon */}
                                        <div onClick={handleExpModal} className="group inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white cursor-pointer transition-all duration-200 hover:bg-blue-500 hover:scale-110 active:scale-95">
                                            <HiPlus size={18} />
                                        </div>
                                        {/* Icon */}
                                    </div>
                                }
                            </div>
                            <div className='mt-5'>
                                {
                                    userData?.experience.map((item, index) => {
                                        return (
                                            <div className='p-2 border-t-1 border-gray-300 flex justify-between'>
                                                <div>
                                                    <div className='text-lg'>{item.designation}</div>
                                                    <div className='text-sm'>{item.company_name}</div>
                                                    <div className='text-sm text-gray-500'>{item.duration} </div>
                                                    <div className='text-sm text-gray-500'>{item.location}</div>
                                                </div>
                                                {
                                                    userData?._id === ownData?._id && <div onClick={() => { updateExpEdit(item._id, item) }} className="group inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 cursor-pointer transition-all duration-200 hover:bg-purple-100 hover:text-purple-600 hover:scale-110 active:scale-95">
                                                        <HiOutlinePencilSquare size={15} />
                                                    </div>
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Right Side */}
                <div className='hidden md:flex md:w-[28%]'>
                    <div className='sticky top-19'>
                        <Advertisement />
                    </div>
                </div>
            </div>
            {imageSetModal &&
                <Modal title="Upload Image" closeModal={handleImageModalOpenClose} >
                    <ImageModal handleEditFunc={handleEditFunc} selfData={ownData} isCircular={circularImage} />
                </Modal>
            }
            {
                infoModal &&
                <Modal title="Edit Info" closeModal={handleInfoModal} >
                    <EditinfoModal handleEditFunc={handleEditFunc} selfData={ownData} />
                </Modal>
            }

            {
                aboutModal && <Modal title="Edit About" closeModal={handleAboutModal}>
                    <AboutModel handleEditFunc={handleEditFunc} selfData={ownData} />
                </Modal>
            }
            {expModal && <Modal title="Experience" closeModal={handleExpModal}>
                <ExpModal handleEditFunc={handleEditFunc} selfData={ownData} updateExp={updateExp} setUpdateExp={setUpdateExp} />
            </Modal>
            }
            {
                messageModal && <Modal title="Message " closeModal={handleMessageModal}>
                    <MessageModal selfData={ownData} userData={userData} />
                </Modal>
            }
            <ToastContainer />
        </div>
    )
}

export default Profile
