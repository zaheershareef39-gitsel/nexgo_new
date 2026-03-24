import React, { } from "react";
import Card from "../../components/Card/card";
// import { useNavigate } from "react-router-dom";
const Advertisement = () => {
    // const [userData, setUserData] = useState(null)
    // useEffect(() => {
    //     let userData = localStorage.getItem('userInfo')
    //     setUserData(userData ? JSON.parse(userData) : null)
    // }, [])
    return (
        <div className="sticky top-18">
            <Card padding={0}>
                <div className="relative h-25">
                    <div className="relative w-full h-22 rounded-md">
                        <img
                            src="https://png.pngtree.com/thumb_back/fw800/background/20231227/pngtree-linkedin-banner-cutting-edge-gradient-textured-technology-image_13879827.png"
                            alt=""
                            className="rounded-t-md h-full w-full"
                        />
                    </div>
                    <div className="absolute top-14 left-2 z-10 inset-0 flex items-center justify-center">
                        <div className="relative group">
                            <div className="p-0.5 rounded-full bg-blue-600 shadow-lg transition-all duration-300 hover:bg-teal-700 hover:shadow-2xl hover:scale-105">
                                <div className="p-0.5 rounded-full bg-white">
                                    <img
                                        src="https://pbs.twimg.com/profile_images/1943246904290086913/rKyyz1Yo_400x400.jpg"
                                        alt=""
                                        className="h-14 w-14 rounded-full border-2 border-white cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-95"
                                    />
                                </div>
                            </div>

                            <div className="pointer-events-none absolute inset-0 rounded-full blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-50 bg-blue-500" />
                        </div>
                    </div>
                </div>
                <div className="px-5 my-5 mx-auto">
                    <div className="text-sm font-semibold text-center">SEM - 1 PW Workshop</div>
                    <div className="texr-sm my-3 text-center">
                        Zoro_Finance-Finserv Management
                    </div>
                    <div
                        className="text-sm my-1 border text-center p-2 rounded-2xl font-bold border-blue-950 text-white bg-teal-800 cursor-pointer"
                        onClick={() => window.open("https://zoro-finance-pro.vercel.app", "_blank")}
                    >
                        Explore
                    </div>
                </div>
            </Card>
        </div>
    );

};

export default Advertisement;
