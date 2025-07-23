import React, { useState, useContext } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate, useLocation } from 'react-router'; 
import { AuthContext } from '../Context/AuthContext';



const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollLinks = ['About', 'Our Solutions', 'In Action', 'Technology', 'Benefits', 'Case Use'];
  const isProfilePage = location.pathname.includes('/profile') || location.pathname.includes('/profile');


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-[#0B1120] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img className="w-8 h-8" src="/logo.svg" alt="Logo" />
          <h1 className="text-2xl font-semibold">Clin</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {!isProfilePage && scrollLinks.map((link, idx) => (
            <ScrollLink
              key={idx}
              to={link.toLowerCase().replace(/\s/g, '')}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              activeClass="active"
              className="cursor-pointer relative group transition"
            >
              <span className="group-hover:text-blue-400">{link}</span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-300 ease-in-out group-[.active]:w-full"></span>
            </ScrollLink>
          ))}

    
          {userProfile && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="ml-4 font-semibold bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {userProfile?.username || userProfile?.name || 'User'}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          
        </div>

     
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-[#0B1120] px-6 py-4 space-y-3">
          {!isProfilePage && scrollLinks.map((link, idx) => (
            <ScrollLink
              key={idx}
              to={link.toLowerCase().replace(/\s/g, '')}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={() => setOpen(false)}
              className="block text-white hover:text-blue-400 transition"
            >
              {link}
            </ScrollLink>
          ))}

          {userProfile && ( 
            <div className="mt-4">
              <p className="mb-2">Hello, {userProfile?.username || userProfile?.name || 'User'}</p>
              <Link
                to="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="block text-white hover:text-blue-400"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="mt-2 text-white hover:text-red-400"
              >
                Logout
              </button>
            </div>
          )}
    
        </div>
      )}
    </nav>
  );
};

export default Navbar;