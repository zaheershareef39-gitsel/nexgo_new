import React from 'react'
import { Link } from 'react-router-dom'
import GoogleLoginComp from '../../components/GoogleLogin/googleLoginComp'
const Landingpage = (props) => {
    return (
        <div className="my-4 py-12.5 md:pl-30 px-5 md:flex justify-between">
            <div className="md:w-[40%]">
                <div className="text-4xl mx-auto text-gray-500 ">Welcome! New opportunities are waiting</div>
                <div className="my-3 flex mx-auto mt-5 bg-white gap-2 rounded-3xl w-[70%] text-black cursor-pointer">
                    <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
                </div>
                <Link to={'/login'}
                    className="flex mx-auto mt-5 py-3.5 px-8 bg-blue-600 gap-2 rounded-full items-center w-[70%] justify-center text-white font-semibold text-base hover:bg-blue-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out cursor-pointer active:scale-[0.98]"
                >
                    Sign in with email
                </Link>
                <div className="mx-auto mb-4 text-sm w-[70%] mt-6">
                    {" "}
                    By clicking Continue to join or signin, you agree to{" "}
                    <span className="text-blue-800 cursor-pointer hover:underline">
                        NexGo user Agreement
                    </span>
                    ,{" "}
                    <span className="text-blue-800 cursor-pointer hover:underline">
                        Privacy Policy
                    </span>
                    ,and
                    <span className="text-blue-800 cursor-pointer hover:underline">
                        Cookie Policy
                    </span>
                    .
                </div>
                <Link
                    to="/signUp"
                    className="mx-auto text-center mb-4 text-lg w-[70%] mt-4">
                    {" "}
                    New to NexGo?{" "}
                    <span className="text-blue-800 cursor-pointer hover:underline">
                        Go
                    </span>{" "}
                    Start fisrt Experience
                </Link>
            </div>
            <div className="md:w-[55%]">
                <img
                    src={
                        "https://cdni.iconscout.com/illustration/premium/thumb/job-search-illustration-svg-download-png-3560997.png"
                    }
                    alt="image"
                    className="constrain-lg hero-center"
                />
            </div>
        </div>
    )
}

export default Landingpage
