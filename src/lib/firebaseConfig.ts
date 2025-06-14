
// These environment variables will be used for your Firebase project's configuration.
// You need to set these in your Vercel project settings or .env.local file.
// Make sure to prefix them with NEXT_PUBLIC_ so they are available on the client-side.

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

// Define which keys are absolutely essential for basic app + auth functionality
const coreEssentialKeys: (keyof typeof firebaseConfig)[] = [
  'apiKey',
  'authDomain',
  'projectId',
  'appId',
];

// Check if these core essential keys have valid (non-empty) values
export const isConfigurationSufficient = coreEssentialKeys.every(key => {
  const value = firebaseConfig[key];
  return value && typeof value === 'string' && value.trim() !== '';
});

// For more general reporting, list all recommended keys that might be missing
const recommendedVarKeys: (keyof typeof firebaseConfig)[] = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
];
export const missingFirebaseVars = recommendedVarKeys.filter(key => {
  const value = firebaseConfig[key];
  return value === undefined || value === null || value === '';
});

if (!isConfigurationSufficient) {
  const missingCoreKeys = coreEssentialKeys.filter(key => {
    const value = firebaseConfig[key];
    return !value || typeof value !== 'string' || value.trim() === '';
  });
  const message = `Firebase Core Configuration Incomplete: Critical environment variables missing or empty: ${missingCoreKeys.join(', ')}. ` +
                  `Please ensure all NEXT_PUBLIC_FIREBASE_* variables are correctly set (e.g., in .env.local or Vercel project settings).`;

  if (typeof window !== 'undefined') { // Client-side
    console.error(message + " Firebase features may not work.");
  } else { // Server-side
    // During a production build on Vercel, env vars are injected at runtime.
    // A build-time error might be too strict, so a warning is often preferred for builds.
    // However, for local dev server or runtime, this is a critical error.
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL) { // Vercel production build/runtime
        console.warn(`SERVER WARNING: ${message}. Ensure these are set in Vercel environment variables.`);
    } else if (process.env.NODE_ENV === 'development') { // Local development server
        console.error(`SERVER DEV ERROR: ${message}. Firebase will likely fail to initialize.`);
    } else { // Other server environments (e.g. generic production node server)
        console.error(`SERVER ERROR: ${message}. Firebase initialization will be skipped or will fail.`);
    }
  }
}
