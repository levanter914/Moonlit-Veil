import React from 'react'
import AuthLayout from "../components/AuthLayout";
import { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";

const Login = () => {
  const { changeTrack } = useContext(MusicContext);
    
  useEffect(() => {
    changeTrack("landing");
  }, []);

  return (
    <div className="relative h-screen w-full">
        <div className="absolute inset-0 bg-[url('./assets/landing.png')] bg-contain bg-center bg-repeat"></div>

        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="relative flex flex-col items-center justify-center h-screen font-bold text-white px-4">
            <AuthLayout />
        </div>
    </div>
  )
}

export default Login