import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-secondary border-b-primary border-l-secondary animate-spin" />

        {/* Inner pulsing circle */}
        <div className="absolute inset-3 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
      </div>
    </div>
  );
};

export default Loader;
