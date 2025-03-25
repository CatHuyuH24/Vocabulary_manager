import React from "react";

const Button = ({ onClick, children, color = "blue" }) => {

  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    gray: "bg-gray-500 hover:bg-gray-600",
  };
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-white rounded ${colors[color] || colors.blue}`}
    >
      {children}
    </button>
  );
};


export default Button