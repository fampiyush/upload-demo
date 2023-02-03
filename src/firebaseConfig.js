import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyBJl0RJwdFtq9oU5KN0JggiCaDTNdvH0fc",
  authDomain: "upload-demo-72b41.firebaseapp.com",
  projectId: "upload-demo-72b41",
  storageBucket: "upload-demo-72b41.appspot.com",
  messagingSenderId: "378937406041",
  appId: "1:378937406041:web:7343a575a9b3b6244ff748"
});

// Initialize Firebase
export const storage = getStorage(app);