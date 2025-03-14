import React from 'react'
import QuizComponent from '../components/QuizComponent'
import { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";

const DuskridgePeaks = () => {
  const { changeTrack } = useContext(MusicContext);

  useEffect(() => {
    changeTrack("duskridge");
  }, []);
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-[url('./assets/DuskridgePeaks.png')] bg-contain bg-center bg-repeat"></div>

      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative flex flex-col items-center justify-center h-screen font-bold text-white">
        <QuizComponent
          theme="Duskridge Peaks"
          background="./assets/DuskridgePeaks.png"
          titleColor="#4a2c2a"
          containerColor="#6e4b47"
          borderColor="#8b6f68"
        />
      </div>
    </div>
  )
}

export default DuskridgePeaks