// src/components/RedirectToPrevious.js
import React, { useEffect } from "react";

const RedirectToPrevious = () => {
  useEffect(() => {
    const lastValidRoute = sessionStorage.getItem('lastValidRoute');
    if (lastValidRoute) {
      window.location.href = lastValidRoute;
    } else {
      window.history.back();
    }
  }, []);

  return null;
};

export default RedirectToPrevious;
