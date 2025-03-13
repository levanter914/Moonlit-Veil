import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase"; // Ensure correct import
import { collection, addDoc } from 'firebase/firestore';

const AuthLayout = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
  
    if (!trimmedUsername) {
      console.error("Username is empty");
      return;
    }
  
    try {
      console.log("Firestore instance:", db); // Debugging
      console.log("Attempting to add user:", trimmedUsername);
  
      const usersCollection = collection(db, "users");
      console.log("Users collection reference:", usersCollection);
  
      const docRef = await addDoc(usersCollection, {
        username: trimmedUsername,
        score: 0, 
      });
  
      console.log("User added successfully with ID:", docRef.id);
  
      localStorage.setItem('username', trimmedUsername);
      localStorage.setItem('userId', docRef.id);
      navigate('/home');
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 border-amber-950">
      <div className="nes-container is-rounded with-title bg-orange-100 p-6 text-center"> 
        <h2 className="text-amber-950 mb-4">What's your name?</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="nes-input text-amber-800 px-3 py-2"
            placeholder="Your username"
            required
          />
          <div className="flex justify-center mt-4">
            <button type="submit" className="nes-btn is-primary">
              Begin Adventure!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthLayout;
