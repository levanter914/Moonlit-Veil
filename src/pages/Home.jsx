import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // Fetch username from Firestore
  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUsername(userSnap.data().username);
        }
      }
    };

    fetchUsername();
  }, [user]);

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('./assets/landing.png')] bg-contain bg-center bg-repeat"></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-screen font-bold text-white">
        <h1 className="text-3xl md:text-4xl font-press-start drop-shadow-[4px_4px_0px_black] mb-6">
          Welcome, {username || "Traveler"}!
        </h1>

        <button
          onClick={() => navigate("/theme-selection")}
          className="nes-btn custom-nes-btn"
        >
          Choose Your Realm
        </button>
      </div>
    </div>
  );
};

export default Home;
