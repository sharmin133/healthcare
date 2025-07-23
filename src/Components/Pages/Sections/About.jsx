// src/sections/HeroSection.jsx
import React from 'react';
import { Link, Links } from 'react-router';
// Optional background image
// import heroBg from '../assets/images/hero-background.jpg';

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-black  justify-center min-h-[calc(100vh-64px)] py-16 bg-cover bg-center text-center text-white" >
     <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
  {/* Video Background */}
  <video
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/src/assets/images/bg-video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Black Overlay with Opacity */}
  <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

  {/* Content (your existing code) */}
  <div className="relative z-20 container mx-auto px-4 max-w-4xl">
    <div className="mb-8">
      <svg
        className="w-24 h-24 mx-auto text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    </div>

    {/* Heading */}
    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
      <span className="text-blue-400">Clin</span> Technologies
    </h1>

    {/* Subheading */}
    <p className="text-xl md:text-2xl mb-8 leading-relaxed px-4">
      Revolutionizing clinical documentation through HIPAA COMPLIANT advanced
      artificial intelligence, giving healthcare providers more time for what
      truly matters — patient care. try it for FREE today
    </p>

    <p className="text-lg md:text-xl mb-10 leading-relaxed px-4">
      Our sophisticated AI platform intelligently processes clinical
      conversations, creating accurate documentation that integrates with your
      existing EMR system.
    </p>

    {/* Call-to-action buttons */}
    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
      <Link to="login">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg text-lg font-semibold">
          Login
        </button>
      </Link>
      <Link to="register">
        <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out shadow-lg text-lg font-semibold">
          Signup
        </button>
      </Link>
    </div>
  </div>
</section>


       <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">About Clin Technologies</h2>
        <p className="text-lg leading-8 mb-4 text-white">
          Headquartered in the Midwest, Clin Technologies is a specialized AI firm that empowers healthcare providers across the Midwest and beyond to conquer their most pressing operational challenges.
        </p>
        <p className="text-lg  mb-4 text-white">
          We deliver this through a powerful and flexible AI platform that powers both a suite of ready-to-deploy solutions for documentation and compliance, and the creation of fully bespoke engines for enterprise-level transformation.
        </p>
        <p className="text-lg mb-4 text-white">
          Our expertise lies in applying cutting-edge Large Language Models (LLMs) and machine learning (ML) to solve real-world challenges in healthcare documentation. We partner closely with individual practitioners, clinics, and healthcare organizations, leveraging meticulously gathered real-world data from professionals to build the exceptionally robust and uniquely effective datasets that power these advanced systems.
        </p>
        <p className="text-lg  text-white">
          Whether you need an immediate solution from our product suite or a strategic partner to build a custom engine for challenges like Utilization Management, we provide the right tool for the job. Our mission is to transform your data into a proprietary asset, enabling data-driven decisions that eliminate administrative friction and allow you to focus on what matters most.
        </p>
      </div>
    </section>
  );
};

export default About;
