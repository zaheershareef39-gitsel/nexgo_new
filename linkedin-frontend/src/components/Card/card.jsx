import React from 'react'

const Card = (props) => {
    return (
        <div
            className={`w-full h-full flex flex-col border border-gray-300 bg-white rouded-md ${props.padding ? 'p-5' : 'p-0'} shadow-sm hover:shadow-md transition-shadow duration-300 box-border`}>
            {props.children}
        </div>
    )
}

export default Card
