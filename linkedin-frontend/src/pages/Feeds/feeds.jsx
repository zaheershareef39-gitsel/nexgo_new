import React, { useState, useEffect } from 'react'
import Card from '../../components/Card/card'
import ProfileCard from '../../components/ProfileCard/profileCard'
import { HiOutlinePhoto } from "react-icons/hi2";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { HiOutlineNewspaper } from "react-icons/hi2";
import Advertisement from "../../components/Advertisement/advertisement";
import Post from "../../components/Post/post";
import Modal from "../../components/Modal/modal";
import AddModal from '../../components/AddModal/addModal';
// import Loader from '../../components/Loader/loader';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const feeds = () => {
    const [personalData, setPersonalData] = useState(null);
    const [post, setPost] = useState([])
    const [addPostModal, setAddPostModal] = useState(false);
    // const fetchSelfData = async () => {
    //     await axios.get('http://localhost:4000/api/auth/self', { withCredentials: true }).then(res => {
    //         setPersonalData(res.data.user)
    //     }).catch(err => {
    //         console.error('API error', err);
    //         toast.error(err?.response?.data?.error)
    //     })
    // }
    const fetchData = async () => {
        try {
            const [userData, postData] = await Promise.all([
                await axios.get('http://localhost:4000/api/auth/self', { withCredentials: true }),
                await axios.get('http://localhost:4000/api/post/getAllPost')
            ]);
            setPersonalData(userData.data.user)
            localStorage.setItem('userInfo', JSON.stringify(userData.data.user))
            setPost(postData.data.posts)

        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.error)
        }
    }

    useEffect(() => {
        // fetchSelfData()
        fetchData()
    }, [])
    const handeOpenPostModal = () => {
        setAddPostModal(prev => !prev)
    }
    return (
        <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
            {/* left side */}
            <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
                <div className="h-fit">
                    <ProfileCard data={personalData} />
                </div>
                <div className="w-full my-5">
                    <Card padding={1}>
                        <div className="relative overflow-hidden rounded-md">
                            <div className="absolute inset-0 bg-gray-50" />

                            <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-blue-200 blur-2xl opacity-40 animate-pulse" />
                            <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-purple-200 blur-2xl opacity-30 animate-pulse" />

                            <div className="relative space-y-2">
                                <div className="w-full flex justify-between items-center p-3 rounded-md bg-white/80 border border-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                    <div className="text-teal-700 font-medium transition-all duration-200 hover:tracking-wide">
                                        Profile Viewers
                                    </div>
                                    <div className="text-gray-900 font-semibold transition-transform duration-200 hover:scale-110 active:scale-95">
                                        23
                                    </div>
                                </div>

                                <div className="w-full flex justify-between items-center p-3 rounded-md bg-white/80 border border-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                    <div className="text-gray-700 font-medium transition-all duration-200 hover:tracking-wide">
                                        Post Impression
                                    </div>
                                    <div className="text-blue-900 font-semibold transition-transform duration-200 hover:scale-110 active:scale-95">
                                        90
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            {/* middle side */}
            <div className="w-full py-5 sm:w-[50%]">
                {/* Post Section */}
                <div>
                    <Card padding={1}>
                        <div className="flex gap-2 items-center">
                            <img
                                src={personalData?.profilePic}
                                alt=""
                                className="rounded-4xl w-13 h-13 border-2 border-white  cursor-pointer"
                            />
                            <div onClick={() => setAddPostModal(true)} className="w-full border py-3 px-3 rounded-3xl cursor-pointer hover:bg-gray-100">
                                Start a Post
                            </div>
                        </div>

                        <div className="w-full flex mt-3">
                            <div onClick={() => setAddPostModal(true)} className="flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[35%] hover:bg-gray-100">
                                {/* Icon */}
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 cursor-pointer transition-all duration-200 hover:bg-green-200 hover:scale-110 hover:-translate-y-0.5 active:scale-95">
                                    <HiOutlineVideoCamera size={22} />
                                </span>
                                {/* Icon */}
                                Video
                            </div>
                            <div onClick={() => setAddPostModal(true)} className="flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[35%] hover:bg-gray-100">
                                {/* Icon */}
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-600 cursor-pointer transition-all duration-200 hover:bg-blue-200 hover:scale-110 hover:-translate-y-0.5 active:scale-95">
                                    <HiOutlinePhoto size={22} />
                                </span>
                                {/* Icon */}
                                Photo{" "}
                            </div>
                            <div onClick={() => setAddPostModal(true)} className="flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[35%] hover:bg-gray-100">
                                {/* Icon */}
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-600 cursor-pointer transition-all duration-200 hover:bg-orange-200 hover:scale-110 hover:-translate-y-0.5 active:scale-95">
                                    <HiOutlineNewspaper size={22} />
                                </span>
                                {/* Icon */}
                                Aricle
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="border-b border-gray-400 w-full my-5" />
                <div className="w-full flex flex-col gap-5">
                    {
                        post.map((item, index) => {
                            return <Post item={item} key={index} personalData={personalData} />;
                        })
                    }
                </div>
            </div>
            {/* right side */}
            <div className="w-[26%] py-5 hidden md:block">
                <div>
                    <Card padding={1}>
                        <div className="text-xl">HiresGo News</div>
                        <div className="text-gray-600">Top Stories </div>
                        <div className="my-1">
                            <div className="text-md">Buffet to remain Berkshire chair</div>
                            <div className="text-xs text-gray-400">2h ago</div>
                        </div>
                        <div className="my-1">
                            <div className="text-md">Forest Investment surge again</div>
                            <div className="text-xs text-gray-400">3h ago</div>
                        </div>
                    </Card>
                </div>
                <div className="my-5 sticky top-19">
                    <Advertisement />
                </div>
            </div>
            {addPostModal && (
                <Modal closeModal={handeOpenPostModal} title={""}>
                    <AddModal personalData={personalData} />
                </Modal>
            )}
            {/* <Loader /> */}
            <ToastContainer />
        </div>
    )
}

export default feeds
