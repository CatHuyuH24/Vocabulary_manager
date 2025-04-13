import React from 'react';

const Button = ({ onClick, children, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-500 hover:bg-white border border-blue-500 text-white hover:text-blue-500 font-bold',
    green:
      'bg-green-500 hover:bg-white border border-green-500 text-white hover:text-green-500 font-bold',
    gray: 'bg-gray-500 hover:bg-white border border-gray-500 text-white hover:text-gray-500 font-bold',
    red: 'bg-red-500 hover:bg-white border border-red-500 text-white hover:text-red-500 font-bold',
    purple:
      'bg-purple-700 hover:bg-white border border-purple-500 text-white hover:text-purple-500 font-bold',
  };
  return (
    <button
      onClick={onClick}
      className={`text-xs sm:text-sm md:text-base 
              px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 
              rounded ${colors[color] || colors.blue} transition duration-300`}
    >
      {children}
    </button>
  );
};

export default Button;
