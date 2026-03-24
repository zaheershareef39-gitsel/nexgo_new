import React from 'react'
import Card from '../Card/card'
import { Link } from 'react-router-dom';
function ProfileCard(props) {
    return (
        <Card padding={0}>
            <div className="relative h-25">
                <div className="relative w-full h-22 rounded-md">
                    <img
                        src={props.data?.cover_pic}
                        alt=""
                        className="rounded-t-md h-full w-full"
                    />
                </div>
                {/* Profile cgpt */}
                <Link to={`/profile/${props?.data?._id}`} className="absolute top-14 left-6 z-10">
                    <div className="relative group">
                        {/* Profile cgpt */}
                        <div className="p-0.5 rounded-full bg-blue-600 shadow-lg transition-all duration-300 hover:bg-teal-700 hover:shadow-2xl hover:scale-105">
                            <div className="p-0.5 rounded-full bg-white">
                                <img
                                    src={props?.data?.profilePic}
                                    alt=""
                                    className="h-16 w-16 rounded-full border-2 border-white cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-95"
                                />
                            </div>
                        </div>
                        {/* Profile cgpt */}
                        <div className="pointer-events-none absolute inset-0 rounded-full blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-50 bg-teal-500" />
                    </div>
                </Link>
            </div>
            <div className="p-5 pt-10">
                <div className="text-xl font-semibold text-gray-900 tracking-tight leading-tight">
                    {props?.data?.f_name}
                </div>

                <div className="text-sm my-1 text-gray-600">
                    {props?.data?.headline}
                </div>

                <div className="text-sm my-1 text-gray-500 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    {props?.data?.curr_location}
                </div>
                <div className="text-sm my-1 text-gray-600">
                    {props?.data?.curr_company}
                </div>

                <Link to={`/profile/${props?.data?._id}`} className="text-sm my-1 text-teal-600 hover:underline cursor-pointer transition-all duration-200 hover:tracking-wide">
                    Profile
                </Link>
            </div>
        </Card>
    )
}

export default ProfileCard