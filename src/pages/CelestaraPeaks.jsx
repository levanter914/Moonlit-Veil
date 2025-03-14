import React from 'react'
import QuizComponent from '../components/QuizComponent'
import { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";

const CelestaraPeaks = () => {
  const { changeTrack } = useContext(MusicContext);

  useEffect(() => {
    changeTrack("celestara");
  }, []);
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-[url('./assets/CelestaraPeaks.png')] bg-contain bg-center bg-repeat"></div>

      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative flex flex-col items-center justify-center h-screen font-bold text-white">
        <QuizComponent
          theme="Celestara Peaks"
          background="/assets/CelestaraPeaks.png"
          titleColor="#001f3f"
          containerColor="#0a1930"
          borderColor="#89CFF0"
        />
      </div>
    </div>
  )
}

export default CelestaraPeaks