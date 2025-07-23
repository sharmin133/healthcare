import React from 'react';

const CheckCircleIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" className="fill-green-200" />
    <path
      d="M9 12l2 2 4-4"
      className="stroke-green-700"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const BanIcon = () => (
  <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
    />
  </svg>
);

const MicrophoneIcon = () => (
  <img
    className="rounded-full w-24 h-12"
    src="https://i.ibb.co/7ddW8329/Chat-GPT-Image-Jul-23-2025-01-32-34-PM.png"
    alt="microphone"
  />
);

const ChartBarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 text-purple-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 2h16v20H2z" />
    <path d="M16 2v20" />
    <path d="M8 6h4" />
    <path d="M8 10h4" />
    <path d="M8 14h4" />
    <path d="M20.5 6.5l1 1a1.41 1.41 0 010 2l-8.5 8.5L10 18l.5-3 8.5-8.5a1.41 1.41 0 012 0z" />
  </svg>
);

const Solution = () => {
  return (
  <section id="solutions" className="py-16  bg-gray-900 text-white">
  <div className="container px-4">
    <h2 className="text-4xl font-extrabold text-center mb-4 text-blue-400">
      Our Solutions
    </h2>
    <p className="text-lg text-center text-gray-300 mb-12 mx-auto max-w-3xl">
      Our comprehensive suite of AI-powered solutions transforms every aspect of healthcare documentation:
    </p>

   <div className='mx-32'>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Card 1 - Validify */}
      <div className="bg-blue-950 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 border-t-4 border-green-500">
        <div className="w-20 h-20 mb-4 bg-green-900 rounded-full flex items-center justify-center">
          <CheckCircleIcon />
        </div>
        <h3 className="text-2xl text-blue-400 font-bold mb-2">Validify</h3>
        <p className="text-white">
          Mitigate compliance risk with powerful AI that optimizes chart reviews for accuracy, integrity, coding, and compliance. Validify automatically identifies documentation gaps, ensures coding accuracy, and maintains regulatory compliance.
        </p>
      </div>

      {/* Card 2 - Redactify */}
      <div className="bg-blue-950 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 border-t-4 border-yellow-400">
        <div className="w-20 h-20 mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
          <BanIcon />
        </div>
        <h3 className="text-2xl text-blue-400 font-bold mb-2">Redactify</h3>
        <p className="text-white">
          Effortlessly redact HIPAA identifiers from text, documents, and structured data with Redactify – automating your compliance workflow. Protect sensitive patient information while maintaining clinical context.
        </p>
      </div>

      {/* Card 3 - TranscriptX */}
      <div className="bg-blue-950 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 border-t-4 border-purple-400">
        <div className="w-20 h-20 mb-4 bg-purple-300 rounded-full flex items-center justify-center">
          <MicrophoneIcon />
        </div>
        <h3 className="text-2xl text-blue-400 font-bold mb-2">TranscriptX</h3>
        <p className="text-white">
          Spend less time documenting. TranscriptX dictates highly accurate medical transcriptions of patient encounters into text, understanding complex medical terminology and clinical context for superior accuracy.
        </p>
      </div>

      {/* Card 4 - Chartwright */}
      <div className="bg-blue-950 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 border-t-4 border-pink-400">
        <div className="w-20 h-20 mb-4 bg-blue-900 rounded-full flex items-center justify-center">
          <ChartBarIcon />
        </div>
        <h3 className="text-2xl text-blue-400 font-bold mb-2">Chartwright</h3>
        <p className="text-white">
         Your best friend with charting – turn any normal text into a high-quality chart, delivered exactly how healthcare professionals need it with extensive customization options to match your workflow and documentation standards.
        </p>
      </div>
    </div>
   </div>
  </div>
</section>

  )
};

export default Solution;
