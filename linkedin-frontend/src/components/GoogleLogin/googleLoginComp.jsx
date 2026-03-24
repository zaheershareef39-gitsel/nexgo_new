import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const GoogleLoginComp = (props) => {
    const navigate = useNavigate();
    const handleOnSuccess = async (credResponse) => {
        const token = credResponse.credential;
        const res = await axios.post('http://localhost:4000/api/auth/google', { token }, { withCredentials: true });

        localStorage.setItem('isLogin', 'true');
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        props.changeLoginValue(true)
        navigate('/feeds')
    }
    const handleOnError = () => {
        console.error('Google Login failed');
    }
    return (
        <div className="w-full">
            <GoogleLogin
                onSuccess={handleOnSuccess}
                onError={handleOnError}
                useOneTap
            />
        </div>
    )
}

export default GoogleLoginComp
