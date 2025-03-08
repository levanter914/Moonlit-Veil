import React from 'react'

const CelestaraPeaks = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-[url('./assets/CelestaraPeaks.png')] bg-contain bg-center bg-repeat"></div>

      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative flex flex-col items-center justify-center h-screen font-bold text-white">
        <h1>Welcome to Celestara Peaks</h1>
      </div>
    </div>
  )
}

export default CelestaraPeaks