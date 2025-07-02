import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID,
  appId: import.meta.env.VITE_APPID


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

const provider=new GoogleAuthProvider();
export default async function googleAuth(){
    try {
        
        let data=await signInWithPopup(auth,provider)
        return data;
    } catch (error) {
        console.log(error)
        return null
    }
}
