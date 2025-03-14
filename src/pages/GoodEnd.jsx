import React from 'react'
import { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";

const GoodEnd = () => {
  const { changeTrack } = useContext(MusicContext);

  useEffect(() => {
    changeTrack("good-ending");
  }, []);
  return (
    <div className="relative h-screen w-full flex items-center justify-center px-6">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('./assets/GoodEnd.png')] bg-contain bg-center bg-repeat"></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
    </div>
  )
}

export default GoodEnd