import { GoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleLoginComp from '../../components/GoogleLogin/googleLoginComp'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

const SignUp = (props) => {
    const navigate = useNavigate();

    const [registerField, setRegisterField] = useState({ email: "", password: "", f_name: "" });
    const handleInputField = (event, key) => {
        setRegisterField({ ...registerField, [key]: event.target.value })
    }
    const handleRegister = async () => {
        if (registerField.email.trim().length === 0 || registerField.password.trim().length === 0 || registerField.f_name.trim().length === 0) {
            return toast.error("Please Fill All Details")
        }
        await axios.post('https://nexgo-new.onrender.com/api/auth/register', registerField).then(res => {
            toast.success("Let Your'e Go");
            setRegisterField({ ...registerField, email: "", password: "", f_name: "" })
            navigate('/login')

        }).catch(err => {
            console.log(err)
            toast.error(err?.response?.data?.error)
        })
    }

    return (
        <div className="w-full flex flex-col items-center justiy-center">
            <div className="text-4xl mb-5"> Land your Go Accurately </div>
            <div className="w-[85%] md:w-[28%] shadow-xl rounded-sm box p-10">
                <div className="flex flex-col gap-4 mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text" value={registerField.email} onChange={(e) => handleInputField(e, 'email')}
                        className="w-full text-xl border-2 rounded-lg px-5 py-1"
                        placeholder="Email"
                    />
                </div>
                <div className="flex flex-col gap-4 mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password" value={registerField.password} onChange={(e) => handleInputField(e, 'password')}
                        className="w-full text-xl border-2 rounded-lg px-5 py-1"
                        placeholder="Password"
                    />
                </div>
                <div className="flex flex-col gap-4 mb-4">
                    <label htmlFor="f_name">Full name</label>
                    <input
                        type="text" value={registerField.f_name} onChange={(e) => handleInputField(e, 'f_name')}
                        className="w-full text-xl border-2 rounded-lg px-5 py-1"
                        placeholder="Full name"
                    />
                </div>
                <div onClick={handleRegister} className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl text-center text-lg font-semibold cursor-pointer my-4 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ease-in-out active:scale-[0.98]">
                    Register
                </div>
                <div className="flex items-center justify-center gap-3 my-6">
                    <div className="w-[45%] border-t border-gray-400" />
                    <span className="text-sm text-gray-500">or</span>
                    <div className="w-[45%] border-t border-gray-400" />
                </div>
                <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
            </div>
            <div className="mt-4 mb-10 ">
                {" "}
                Already on HiresGo?{" "}
                <Link to={"/login"} className="text-blue-800 cursor-pointer">
                    Sign in
                </Link>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUp
