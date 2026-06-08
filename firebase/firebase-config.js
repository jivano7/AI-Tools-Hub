import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhwooW5LUW-xVM_4SzbI6hmiPZz2PbCYU",
    authDomain: "ai-tools-hub-28a98.firebaseapp.com",
      projectId: "ai-tools-hub-28a98",
        storageBucket: "ai-tools-hub-28a98.firebasestorage.app",
          messagingSenderId: "315107834555",
            appId: "1:315107834555:web:b189c27f78d6f16bf2c79e",
              measurementId: "G-X9BFS1PD2C"
              };

              const app = initializeApp(firebaseConfig);
              export const auth = getAuth(app);
              export const db = getFirestore(app);
              export const googleProvider = new GoogleAuthProvider();