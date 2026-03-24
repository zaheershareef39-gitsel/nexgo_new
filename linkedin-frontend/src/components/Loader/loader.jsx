import React from 'react'
import './loader.css'
const Loader = () => {
    return (
        <div className='fixed top-0 left-0 w-full z-100 h-full bg-gray-200 flex justify-center items-center'>
            <div class="loader">
                <div class="box box-1">
                    <div class="side-left"></div>
                    <div class="side-right"></div>
                    <div class="side-top"></div>
                </div>
                <div class="box box-2">
                    <div class="side-left"></div>
                    <div class="side-right"></div>
                    <div class="side-top"></div>
                </div>
                <div class="box box-3">
                    <div class="side-left"></div>
                    <div class="side-right"></div>
                    <div class="side-top"></div>
                </div>
                <div class="box box-4">
                    <div class="side-left"></div>
                    <div class="side-right"></div>
                    <div class="side-top"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader
