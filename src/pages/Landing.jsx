import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";
import GoogleSignIn from "../components/GoogleSignIn.jsx";

const Landing = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex flex-col items-center justify-center h-screen font-bold">
      <div>Landing</div>
      {user ? <h1>Welcome, {user.displayName}!</h1> : <GoogleSignIn />}
    </div>
  );
};

export default Landing;
