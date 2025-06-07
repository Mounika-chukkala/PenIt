import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID,
  appId: import.meta.env.VITE_APPID

//  apiKey: "AIzaSyCK3KLhH0GjOLuct-yESprLFOjNt_f4oKU",

//   authDomain: "pen-it-362c5.firebaseapp.com",

//   projectId: "pen-it-362c5",

//   storageBucket: "pen-it-362c5.firebasestorage.app",

//   messagingSenderId: "89292228304",

//   appId: "1:89292228304:web:8d5fb086cd2986bcd580d5"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

const provider=new GoogleAuthProvider();
export default async function googleAuth(){
    try {
        
        let data=await signInWithPopup(auth,provider)
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        return null
    }
}
