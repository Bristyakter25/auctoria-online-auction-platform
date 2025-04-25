import React from "react";

export const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      className={`py-2 px-4 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-gradient-to-l focus:outline-none ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
