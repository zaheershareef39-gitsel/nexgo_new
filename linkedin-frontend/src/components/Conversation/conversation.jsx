import React, { useEffect, useState } from 'react'

const Conversation = ({ item, key, ownData, handleSelectedConv, activeConvId }) => {


    const [memberData, setMemberData] = useState(null)

    useEffect(() => {
        let ownId = ownData?._id;
        let arr = item?.members?.filter((it) => it._id !== ownId)
        setMemberData(arr[0])
    }, [])
    const handleClickFunc = async () => {
        handleSelectedConv(item._id, memberData)
    }

    return (
        <div onClick={handleClickFunc} key={key} className={`flex items-center w-full cursor-pointer border-b border-gray-300 gap-3 p-4 hover:bg-gray-200 ${activeConvId === item?._id ? "bg-gray-300" : null}`}>
            <div className='shrink-0'>
                <img className="w-12 h-12 rounded-full cursor-pointer" src={memberData?.profilePic} alt="" />
            </div>
            <div>
                <div className='text-md font-medium'>{memberData?.f_name}</div>
                <div className="text-sm text-gray-500" >{memberData?.headline}</div>
            </div>
        </div>
    )
}

export default Conversation