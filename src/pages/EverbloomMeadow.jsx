import React from 'react'
import QuizComponent from '../components/QuizComponent'
import { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";

const EverbloomMeadow = () => {
  const { changeTrack } = useContext(MusicContext);

  useEffect(() => {
    changeTrack("everbloom");
  }, []);
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-[url('./assets/EverbloomMeadow.png')] bg-contain bg-center bg-repeat"></div>

      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative flex flex-col items-center justify-center h-screen font-bold text-white">
        <QuizComponent
          theme="Everbloom Meadow"
          background="./assets/EverbloomMeadow.png"
          titleColor="#3f7300"
          containerColor="#a8e6a3"
          borderColor="#4caf50"
        />
      </div>
    </div>
    
  )
}

export default EverbloomMeadow