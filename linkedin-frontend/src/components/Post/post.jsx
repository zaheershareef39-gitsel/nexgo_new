import React from 'react'
import Card from '../Card/card'
import { useState, useEffect } from 'react'
import { HiOutlineHandThumbUp, HiHandThumbUp } from "react-icons/hi2";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { HiOutlineShare } from "react-icons/hi2";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Post = ({ profile, item, key, personalData }) => {
    const [seeMore, setSeeMore] = useState(false);
    const [comment, setComment] = useState(false);

    const [comments, setComments] = useState([]);

    const [liked, setLiked] = useState(false);
    const [noOfLikes, setNoOfLikes] = useState(item?.likes.length)
    const [commentText, setCommentText] = useState("")

    const handleSendComment = async (e) => {
        e.preventDefault();
        if (commentText.trim().length === 0) return toast.error("Please Enter Comment");
        await axios.post(`https://nexgo-new.onrender.com/api/comment`, { postId: item?._id, comment: commentText }, { withCredentials: true }).then((res => {
            setComments([res.data.comment, ...comments]);
        })).catch(err => {
            console.log(err)
            alert('Something Went Wrong')
        })
    }
    useEffect(() => {
        let selfId = personalData?._id;
        item?.likes?.map((item) => {
            if (item.toString() === selfId.toString()) {
                setLiked(true);
                return
            } else {
                setLiked(false)
            }
        })
    }, [])
    const handLikeFunc = async () => {
        await axios.post('https://nexgo-new.onrender.com/api/post/likeDislike', { postId: item?._id }, { withCredentials: true }).then(res => {
            if (liked) {
                setNoOfLikes((prev) => prev - 1);
                setLiked(false)
            } else {
                setLiked(true)
                setNoOfLikes((prev) => prev + 1);
            }
        }).catch(err => {
            console.log(err)
            alert('Something Went Wrong')
        })
    }
    const handleCommentBoxOC = async () => {
        setComment(true)
        await axios.get(`https://nexgo-new.onrender.com/api/comment/${item?._id}`).then(resp => {
            console.log(resp)
            setComments(resp.data.comments)
        }).catch(err => {
            console.log(err)
            alert('Something Went Wrong')
        })
    }
    const copyToClickBoard = async () => {
        try {
            let string = `https://nexgo-new.onrender.com/profile/${item?.user?._id}/activities/${item?._id}`
            await navigator.clipboard.writeText(string);
            toast.success("Post Link Copied to Clipboard")
        } catch (err) {
            console.error('Failed to Copy!', err);
        }
    };
    const desc = item?.desc;
    return (
        <Card padding={1}>
            <div className="flex gap-3 p-4">
                <Link to={`/profile/${item?.user?._id}`} className="w-12 h-12 rounded-4xl">
                    <img src={item?.user?.profilePic} className='rounded-4xl w-12 h-12 border-2 border-white cursor-pointer' alt="" />
                </Link>
                <div>
                    <div className="text-lg font-semibold">{item?.user?.f_name}</div>
                    <div className="text-xs text-gray-500">{item?.user?.headline}</div>
                </div>
            </div>

            <div className="text-md p-2 my-3 whitespace-pre-line flex-grow: 1">
                {seeMore ? desc : desc?.length > 50 ? `${desc.substring(0, 50) + "..."}` : `${desc}`} {desc?.length < 100 ? null : <span onClick={() => setSeeMore(prev => !prev)} className='cursor-pointer text-gray-500 '>{seeMore ? "See Less" : "See More"}</span>}
            </div>

            {
                item?.imageLink && <div className="w-full h-72 ">
                    <img src={item?.imageLink} className='w-full h-full' alt="" />
                </div>
            }
            <div className="my-2 p-4 justify-between items-center flex flex-row">
                <div className="flex gap-1 items-center">
                    {/* Icon */}<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 cursor-pointer transition-all duration-200 hover:bg-blue-200 hover:scale-110 hover:-translate-y-0.5 active:scale-95">
                        <HiHandThumbUp size={22} />
                    </span>{/* Icon */}<div className='text-sm text-gray-600'>{noOfLikes} Likes</div>
                </div>
                <div className="flex gap-1 items-center">
                    {/* Icon */}<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 cursor-pointer transition-all duration-200 hover:bg-blue-200 hover:scale-110 hover:-translate-y-0.5 active:scale-95">
                        <HiOutlineChatBubbleLeft size={22} />
                    </span>{/* Icon */}<div className='text-sm text-gray-600'> {item?.comments} Comments</div>
                </div>
            </div>

            {
                !profile && <div className='flex p-1'>
                    <div onClick={handLikeFunc} className="w-[35%] justify-center flex gap-2 items-center border-r border-gray-100 p-2 cursor-pointer hover:bg-gray-100">
                        {/* Icon */}<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 cursor-pointer transition-all duration-200 hover:bg-blue-200 hover:scale-110 hover:-translate-y-0.5 active:scale-95">
                            {liked ? <HiHandThumbUp size={22} className="text-blue-600" /> : <HiOutlineHandThumbUp size={22} />}

                        </span>{/* Icon */} <span>{liked ? 'Liked' : 'Like'}</span>
                    </div>
                    <div onClick={handleCommentBoxOC} className="w-[35%] justify-center flex gap-2 items-center border-r border-gray-100 p-2 cursor-pointer hover:bg-gray-100">
                        {/* Icon */}<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 cursor-pointer transition-all duration-200 hover:bg-blue-200 hover:scale-110 hover:-translate-y-0.5 active:scale-95">
                            <HiOutlineChatBubbleLeft size={22} />

                        </span>{/* Icon */} <span>Comment</span>
                    </div>
                    <div onClick={copyToClickBoard} className="w-[35%] justify-center flex gap-2 items-center border-r border-gray-100 p-2 cursor-pointer hover:bg-gray-100">
                        {/* Icon */}
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 cursor-pointer transition-all duration-200 hover:bg-blue-200 hover:scale-110 hover:-translate-y-0.5 active:scale-95">
                            <HiOutlineShare size={22} />
                        </span>
                        {/* Icon */}
                        <span>Share</span>
                    </div>
                </div>
            }
            {/* Comment Section */}
            {
                comment && <div className='p-4 w-full'>
                    <div className='flex gap-2 items-center'>
                        <img className='rounded-full w-12 h-12 border-2 border-white cursor-pointer' src={personalData?.profilePic} alt="" />
                        <form className='w-full flex gap-2' onSubmit={handleSendComment}>
                            <input value={commentText} onChange={(event) => setCommentText(event.target.value)} type="text" placeholder='Add a comment...' className='hover:bg-gray-100 w-full border border-gray-300 rounded-3xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            <button type="submit" className='cursor-pointer bg-blue-800 text-white rounded-3xl py-1 px-3'>Send</button>
                        </form>
                    </div>
                    {/* Others comment Section */}
                    <div className="w-full p-4">
                        {
                            comments.map((item, index) => {
                                return (
                                    <div className='my-4'>
                                        <Link to={`/profile/${item?.user?._id}`} className='flex gap-3'>
                                            <img className='rounded-full w-10 h-10 border-2 border-white cursor-pointer' src={item?.user?.profilePic} alt="" />
                                            <div className="cursor-pointer">
                                                <div className="text-md">{item?.user?.f_name}</div>
                                                <div className="text-sm text-gray-500">{item?.user?.headline}</div>
                                            </div>
                                        </Link>
                                        <div className="px-11 my-2">{item?.comment}</div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            }
            <ToastContainer />
        </Card>

    )
}

export default Post
