import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-16 border-t border-gray-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-sm">
      
        <div className="flex space-x-4 mb-2 md:mb-0">
          <a href="/terms-of-use" className="hover:text-blue-400 transition-colors duration-300">
            Terms of Use
          </a>
          <a href="/privacy-policy" className="hover:text-blue-400 transition-colors duration-300">
            Privacy Policy
          </a>
        </div>
     
        <div>
          <p>&copy; {new Date().getFullYear()} Clin Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
