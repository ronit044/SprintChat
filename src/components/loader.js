"use client";
import React from 'react';

const Loader = () => {
  const loaderContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay background
    backdropFilter: 'blur(5px)', // Blur effect
    zIndex: 9999, // Ensure it overlays other content
  };

  const spinnerStyle = {
    width: '80px',
    height: '80px',
    border: '8px solid rgba(255, 255, 255, 0.2)',
    borderTop: '8px solid red', // Customize color here
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={loaderContainerStyle}>
      <style>{keyframesStyle}</style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Loader;
