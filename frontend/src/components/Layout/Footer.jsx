import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-4 shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {year} Smart Notes Summarizer. All rights reserved.
          </p>
          <div className="mt-2 md:mt-0">
            <p className="text-xs text-gray-400">Powered by Gemini AI</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;