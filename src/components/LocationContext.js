import React, { createContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';

// Create the context
const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // Initialize location as null
  const [isInitialized, setIsInitialized] = useState(false); // Firebase initialization state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyB9f2DX35nW8K96fd5XyE4h2gy0fc81w_o",
      authDomain: "wedding-site-8e9fa.firebaseapp.com",
      projectId: "wedding-site-8e9fa",
      storageBucket: "wedding-site-8e9fa.appspot.com",
      messagingSenderId: "1052908718072",
      appId: "1:1052908718072:web:a0dbae8979176768b6f80d"
    };

    try {
      // Initialize Firebase app
      const app = initializeApp(firebaseConfig);

      // Initialize Remote Config and set minimum fetch interval
      const remoteConfig = getRemoteConfig(app);
      remoteConfig.settings.minimumFetchIntervalMillis = 36000; // 1 hour

      // Fetch remote config and set location
      fetchAndActivate(remoteConfig)
        .then(() => {
          const locationFB = getValue(remoteConfig, 'location')._value;
          setLocation(locationFB); // Set the location from Remote Config
          setIsInitialized(true);  // Mark as initialized when config is fetched
        })
        .catch((err) => {
          console.error("Failed to fetch remote config", err);
          setError("Failed to fetch remote config.");
        });
    } catch (err) {
      console.error("Firebase initialization error", err);
      setError("Firebase initialization error.");
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Display error if initialization or fetch fails
  }

  if (!isInitialized) {
    // Display a loading state while Firebase is initializing and location is being fetched
    return <div class="wrapper">
    <div class="dot"></div>
    <span class="text">
      Loading
    </span>
  </div>
  }

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
