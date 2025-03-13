import React from 'react'
import QuizComponent from '../components/QuizComponent'

const MirageHaven = () => {
  return (
    <div className="relative h-screen w-full">
    <div className="absolute inset-0 bg-[url('./assets/MirageHaven.png')] bg-contain bg-center bg-repeat"></div>

    <div className="absolute inset-0 bg-black opacity-20"></div>

    <div className="relative flex flex-col items-center justify-center h-screen font-bold text-white">
      <QuizComponent
        theme="Mirage Haven"
        background="./assets/MirageHaven.png"
        titleColor="#d4a017"
        containerColor="#ffcc80"
        borderColor="#ffb74d"
      />
    </div>
  </div>
  )
}

export default MirageHaven