import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";
import GoogleSignIn from "../components/GoogleSignIn.jsx";

const Landing = () => {
  const [user] = useAuthState(auth);

  return (
  
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-[url('./assets/landing.png')] bg-contain bg-center bg-repeat"></div>

      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative flex flex-col items-center justify-center h-screen font-bold text-white">
        <div>Landing</div>
        {user ? <h1>Welcome, {user.displayName}!</h1> : <GoogleSignIn />}
      </div>
    </div>


  );
};

export default Landing;
