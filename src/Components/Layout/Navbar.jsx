import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const scrollLinks = ['About', 'Our Solutions', 'In Action', 'Technology', 'Benefits', 'Case Use'];

  return (
    <nav className="w-full fixed top-0 z-50 bg-[#0B1120] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img className="w-8 h-8" src="/logo.svg" alt="Logo" />
          <h1 className="text-2xl font-semibold">Clin</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {scrollLinks.map((link, idx) => (
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
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-[#0B1120] px-6 py-4 space-y-3">
          {scrollLinks.map((link, idx) => (
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
