import React from 'react'

const DuskridgePeaks = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-[url('./assets/DuskridgePeaks.png')] bg-contain bg-center bg-repeat"></div>

      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative flex flex-col items-center justify-center h-screen font-bold text-white">
        <h1>Welcome to Duskridge Peaks</h1>
      </div>
    </div>
  )
}

export default DuskridgePeaks