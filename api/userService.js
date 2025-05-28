import axios from 'axios';


let baseUrl="http://localhost:8080/api/user/";

export const addUser=(user)=>{
   
    return axios.post( baseUrl,user);
}
export const loginUser=(user)=>{
    let url =  `${baseUrl}/login`
    return axios.post(url,user);
}


// import axios from "axios";
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// // הגדרת URL בסיס
// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

// // אתחול Firebase
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

// // אתחול Firebase App
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// // פונקציות הוספת משתמש
// export const addUser = (userData) => {
//   return axios.post(API_URL, userData);
// };

// export const loginUser = (userData) => {
//     let url =  `${baseUrl}/login`
//          return axios.post(url,userData);
//         };

// // פונקציה חדשה להתחברות עם גוגל
// export const loginWithGoogle = async () => {
//   try {
//     // פתיחת חלון התחברות של גוגל
//     const result = await signInWithPopup(auth, googleProvider);
    
//     // קבלת טוקן מהמשתמש שהתחבר
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
    
//     // קבלת פרטי המשתמש מהתוצאה
//     const user = result.user;
    
//     // שליחת פרטי המשתמש לשרת שלנו לקבלת JWT
//     const serverResponse = await axios.post(`${API_URL}/users/google-auth`, {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//       idToken: await user.getIdToken()  // שליחת הטוקן של Firebase לאימות בשרת
//     });
    
//     return serverResponse;
//   } catch (error) {
//     console.error("Google Login Error:", error);
//     throw error;
//   }
// };

// יצירת מופע axios עם טוקן
// export const createAuthenticatedAxios = () => {
//   const instance = axios.create({
//     baseURL: API_URL,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   // הוספת הטוקן לכל בקשה
//   instance.interceptors.request.use(
//     config => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );

//   return instance;
// };

// // יצירת מופע axios מאומת
// export const authenticatedAxios = createAuthenticatedAxios();
