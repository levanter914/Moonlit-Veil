import React from "react";
import GoogleSignIn from "../components/GoogleSignIn.jsx";

const Landing = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-[url('./assets/landing.png')] bg-contain bg-center bg-repeat"></div>

      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative flex flex-col items-center justify-center h-screen font-bold text-white px-4">
        <div className="text-4xl font-press-start mb-8 text-center drop-shadow-[4px_4px_0px_black]">
          Welcome to Moonlit Veil
        </div>

        <p className="text-base md:text-md mb-16 max-w-2xl text-center drop-shadow-[3px_3px_0px_black]">
          Step into Moonlit Veil, a mystical journey where your choices shape fate across enchanted realms.
        </p>

        <div className="mt-12">
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
};

export default Landing;
