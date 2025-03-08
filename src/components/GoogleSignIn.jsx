import { signInWithGoogle } from "../firebase.js";

const GoogleSignIn = () => {
  return (
    <button 
      onClick={signInWithGoogle} 
      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
