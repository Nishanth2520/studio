import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
// import { getFirestore, type Firestore } from "firebase/firestore"; // Uncomment if you use Firestore
import { firebaseConfig } from "./firebaseConfig";

let app: FirebaseApp;
let auth: Auth;
// let firestore: Firestore; // Uncomment if you use Firestore

if (getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    console.error("Error initializing Firebase app:", error);
    // Fallback or error handling for app initialization
    // For example, you might want to set app to a dummy object or re-throw
    // This depends on how critical Firebase is at the point of initialization
    throw new Error("Firebase initialization failed. Please check your firebaseConfig.ts");
  }
} else {
  app = getApp();
}

try {
  auth = getAuth(app);
  // firestore = getFirestore(app); // Uncomment if you use Firestore
} catch (error) {
    console.error("Error initializing Firebase services (Auth/Firestore):", error);
    // Handle error for service initialization, potentially re-throw or use fallbacks
    throw new Error("Firebase service initialization failed. This usually means the app did not initialize correctly.");
}


export { app, auth /*, firestore*/ }; // Export firestore if used
