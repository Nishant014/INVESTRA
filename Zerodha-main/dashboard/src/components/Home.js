import React, { useEffect, useState } from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Check URL parameters first (from redirect)
      const urlParams = new URLSearchParams(window.location.search);
      const authenticatedFromUrl = urlParams.get("authenticated");
      const userIdFromUrl = urlParams.get("userId");

      console.log("Checking auth - URL params:", { authenticatedFromUrl, userIdFromUrl });

      if (authenticatedFromUrl === "true" && userIdFromUrl) {
        // Set localStorage from URL params
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", userIdFromUrl);
        console.log("User authenticated via URL params. Setting localStorage.");
        setIsLoggedIn(true);
        setLoading(false);
        
        // Clean up URL bar (remove query parameters)
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      // Fallback: Check localStorage
      const loggedInStatus = localStorage.getItem("isLoggedIn");
      const userId = localStorage.getItem("userId");
      
      console.log("Checking localStorage - isLoggedIn:", loggedInStatus, "userId:", userId);

      if (loggedInStatus === "true" && userId) {
        console.log("User is authenticated via localStorage");
        setIsLoggedIn(true);
        setLoading(false);
      } else {
        console.log("User not authenticated, redirecting to login");
        // Redirect to login
        window.location.href = "http://localhost:3000/login";
      }
    } catch (err) {
      console.error("Home component error:", err);
      window.location.href = "http://localhost:3000/login";
    }
  }, []);

  // While loading, show loading message
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // If logged in, show dashboard
  if (isLoggedIn) {
    return (
      <>
        <TopBar />
        <Dashboard />
      </>
    );
  }

  // Fallback (should not reach here due to redirect)
  return null;
};

export default Home;
