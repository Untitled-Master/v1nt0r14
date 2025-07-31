import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyC1qqO3NJ5XInufJeoWFkN5pgQeVj15YRE",
  authDomain: "scienty-35980.firebaseapp.com",
  projectId: "scienty-35980",
  storageBucket: "scienty-35980.firebasestorage.app",
  messagingSenderId: "617651777131",
  appId: "1:617651777131:web:c2ef33a7b6896ac7920b2e",
  measurementId: "G-MT5ZPKM2ZP",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)
export default app
