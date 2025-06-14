import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
// Import the configuration and the sufficiency check
import { firebaseConfig, isConfigurationSufficient, missingFirebaseVars } from "./firebaseConfig";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (!isConfigurationSufficient) {
  // Construct a detailed error message based on what's actually missing from the core set
  const coreEssentialKeysForMessage = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const actuallyMissingCoreKeys = coreEssentialKeysForMessage.filter(key => {
    const value = (firebaseConfig as any)[key];
    return !value || typeof value !== 'string' || value.trim() === '';
  });

  const detailedMessage = `Firebase initialization prerequisites not met. Missing or empty critical config: ${actuallyMissingCoreKeys.join(', ') || 'apiKey, authDomain, projectId, or appId'}. ` +
                          `Please ensure all NEXT_PUBLIC_FIREBASE_* environment variables are correctly set and non-empty (e.g., in .env.local or Vercel project settings).`;
  
  console.error("Firebase Critical Error:", detailedMessage);

  if (typeof window === 'undefined') { // Server-side (SSR, API routes, etc.)
    // This error will be caught by Next.js and should lead to an error page.
    // It stops the server from trying to use a misconfigured Firebase.
    throw new Error(detailedMessage + " Halting server-side Firebase setup.");
  }
  // On the client-side, `app` and `auth` will remain `null`.
  // Components or hooks using Firebase (like AuthContext) should handle this state gracefully
  // (e.g., show error to user, disable Firebase-dependent features).
} else {
  // Configuration seems sufficient, attempt initialization
  if (getApps().length === 0) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (error: any) {
      const initErrorMessage = `Error during Firebase app.initializeApp: ${error.message}. This usually indicates a problem with the provided Firebase config values, even if they seemed present. Double-check all NEXT_PUBLIC_FIREBASE_* environment variables.`;
      console.error("Firebase Initialization Error:", initErrorMessage, firebaseConfig);
      if (typeof window === 'undefined') {
        throw new Error(initErrorMessage);
      }
      // app remains null if initializeApp throws
    }
  } else {
    app = getApp();
  }

  if (app) { // Only proceed if app was successfully initialized or retrieved
    try {
      auth = getAuth(app);
    } catch (error: any)
      {
      const authErrorMessage = `Error initializing Firebase Auth service (getAuth): ${error.message}. This often follows an issue with the initial app initialization or config (e.g., authDomain problem).`;
      console.error("Firebase Auth Setup Error:", authErrorMessage);
      if (typeof window === 'undefined') {
        throw new Error(authErrorMessage);
      }
      // auth remains null if getAuth throws
    }
  } else if (typeof window === 'undefined' && isConfigurationSufficient) {
    // This case means app is null even after trying to initialize, and we are on the server,
    // and the initial config check passed. This is an unexpected state.
    const appNullMsg = "CRITICAL: Firebase app object is null after attempted initialization on server-side, despite configuration appearing sufficient. This indicates an unexpected issue with initializeApp or getApp().";
    console.error(appNullMsg, firebaseConfig);
    throw new Error(appNullMsg);
  }
}

export { app, auth };
