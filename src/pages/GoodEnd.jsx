import React from 'react'

const GoodEnd = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center px-6">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('./assets/GoodEnd.png')] bg-contain bg-center bg-repeat"></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
    </div>
  )
}

export default GoodEnd