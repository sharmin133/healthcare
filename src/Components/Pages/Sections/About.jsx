
import React from 'react';
import { Link, Links } from 'react-router';

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-gray-800  justify-center  bg-cover bg-center text-center text-white" >
     <div className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">

  <video
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/src/assets/images/bg-video.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

  <div className="relative z-20 container mx-auto px-20 ">
   <div className="flex items-center justify-center ">
  <div className="mb-8 mt-10">
    <img
      className="w-28 h-28"
      src="https://i.ibb.co/HLSH1hCk/logos.png"
      alt="Logo"
    />
  </div>
</div>


    <h1 className="text-5xl md:text-6xl font-extrabold mb-10 ">
      <span className="text-blue-400">Clin Technologies</span>
    </h1>

 
    <p className="text-xl font-semibold md:text-3xl mb-10  px-8">
      Revolutionizing clinical documentation through <span className="text-yellow-400"  >HIPAA COMPLIANT</span> advanced
      artificial intelligence, giving healthcare providers more time for what
      truly matters — patient care. try it for <span className="text-yellow-400"> FREE</span> today
    </p>

    <p className="text-lg md:text-3xl mb-12  px-8 ">
      Our sophisticated AI platform intelligently processes clinical conversations, creating accurate documentation that integrates with your existing EMR system.
    </p>

    {/* Call-to-action buttons */}
    <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
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
</div>


       <div className="max-w-5xl mx-auto py-8 ">
        <h2 className="text-3xl md:text-4xl font-bold mt-10 mb-10 text-blue-400">About Clin Technologies</h2>
        <p className="text-lg -8 mb-4 text-white ">
       Headquartered in the Midwest, Clin Technologies is a <span className='font-bold'>specialized AI firm</span> that empowers healthcare providers across the Midwest and beyond to conquer their most pressing operational challenges. We deliver this through a powerful and flexible AI platform that powers both <span className='font-bold' >a suite of ready-to-deploy solutions</span> for documentation and compliance, and the creation of fully bespoke engines for enterprise-level transformation.
        </p>
        
        <p className="text-lg mb-4 text-white">
        Our expertise lies in applying cutting-edge <span className='font-bold' > Large Language Models (LLMs) and machine learning (ML)</span> to solve real-world challenges in healthcare documentation. We partner closely with individual practitioners, clinics, and healthcare organizations, leveraging <span className='font-bold' >meticulously gathered real-world</span> data from professionals to build the exceptionally robust and uniquely effective datasets that power these advanced systems.
        </p>
        <p className="text-lg pb-8 text-white  ">
         This same proven AI framework serves as the foundation for our enterprise partnerships. Whether you need an <span className='font-bold'>immediate solution from our product suite or a strategic partner to build a custom engine</span> for challenges like Utilization Management, we provide the right tool for the job. Our mission is to transform your data into a proprietary asset, enabling data-driven decisions that <span className='font-bold' >eliminate administrative friction </span>and allow you to focus on what matters most.
        </p>
      </div>
    </section>
  );
};

export default About;
