import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section
      id="about"
      className="relative bg-gray-800 text-white scroll-mt-20"
    >
      <div className="relative md:min-h-[90vh] flex items-center justify-center px-4 sm:px-6 md:px-20 py-16 sm:py-24">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/src/assets/images/bg-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Main Content */}
        <div
          className="relative z-20 w-full md:max-w-4xl text-center"
          data-aos="fade-down"
        >
          <div className="flex justify-center my-4" data-aos="fade-down" data-aos-delay="100">
            <img
              className="w-16 h-16 "
              src="https://i.ibb.co/HLSH1hCk/logos.png"
              alt="Logo"
            />
          </div>

          <h1
            className="text-3xl sm:text-5xl font-extrabold mb-4"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            <span className="text-blue-400">Clin Technologies</span>
          </h1>

          <p
            className="text-base sm:text-lg md:text-2xl font-semibold mb-6 px-2 sm:px-10"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            Revolutionizing clinical documentation through{' '}
            <span className="text-yellow-400">HIPAA COMPLIANT</span> advanced artificial intelligence, giving healthcare providers more time for what truly matters — patient care. Try it for{' '}
            <span className="text-yellow-400">FREE</span> today.
          </p>

          <p
            className="text-sm sm:text-base md:text-lg mb-8 px-2 sm:px-10"
            data-aos="fade-down"
            data-aos-delay="400"
          >
            Our sophisticated AI platform intelligently processes clinical conversations, creating accurate documentation that integrates with your existing EMR system.
          </p>

          <div
            className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4"
            data-aos="fade-down"
            data-aos-delay="500"
          >
            <Link to="/login">
              <button className="bg-blue-600 text-white px-6 py-2  rounded-full hover:bg-blue-700 transition duration-300 shadow-lg text-base sm:text-lg font-semibold">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-transparent border-2 border-white text-white px-6 py-2  rounded-full hover:bg-white hover:text-blue-600 transition duration-300 shadow-lg text-base sm:text-lg font-semibold">
                Signup
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* About Description Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-blue-400"
          data-aos="fade-down"
          data-aos-delay="600"
        >
          About Clin Technologies
        </h2>

        <p className="text-base sm:text-lg mb-4 text-white" data-aos="fade-down" data-aos-delay="700">
          Headquartered in the Midwest, Clin Technologies is a <span className="font-bold">specialized AI firm</span> that empowers healthcare providers across the Midwest and beyond to conquer their most pressing operational challenges.
        </p>

        <p className="text-base sm:text-lg mb-4 text-white" data-aos="fade-down" data-aos-delay="800">
          Our expertise lies in applying cutting-edge <span className="font-bold">Large Language Models (LLMs) and machine learning (ML)</span> to solve real-world challenges in healthcare documentation.
        </p>

        <p className="text-base sm:text-lg text-white" data-aos="fade-down" data-aos-delay="900">
          This same proven AI framework serves as the foundation for our enterprise partnerships...
        </p>
      </div>
    </section>
  );
};

export default About;

