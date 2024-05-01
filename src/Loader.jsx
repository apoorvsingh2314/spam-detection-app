// Loader.js
import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
