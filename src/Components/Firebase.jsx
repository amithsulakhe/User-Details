import { initializeApp} from "firebase/app"
import {collection, getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD8WwEqGWv22liFqqpLkm8OE4bAmJiDJd4",
    authDomain: "user-details-f625f.firebaseapp.com",
    projectId: "user-details-f625f",
    storageBucket: "user-details-f625f.appspot.com",
    messagingSenderId: "1023991750417",
    appId: "1:1023991750417:web:b925563ec8176b3e74b6b0"
  };

initializeApp(firebaseConfig)

export const db=getFirestore()
export const collref = collection(db, "User")

