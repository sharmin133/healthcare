
import React from 'react';

import SolutionTab from './SolutionTab';


// আইকন প্লেসহোল্ডার (আপনি আসল SVG আইকন বা ইমেজ ব্যবহার করতে পারেন)
// এই SVG আইকনগুলো স্ক্রিনশটের আইকনগুলোর সাথে সাদৃশ্যপূর্ণ
const CheckCircleIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BanIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

const MicrophoneIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const ChartBarIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);


const Solution = () => {
  const solutions = [
    {
      icon: <CheckCircleIcon />,
      title: 'Validify',
      description: 'Mitigate compliance risk with powerful AI that optimizes chart reviews for accuracy, integrity, coding, and compliance. Validify automatically identifies documentation gaps, ensures coding accuracy, and maintains regulatory compliance.',
    },
    {
      icon: <BanIcon />,
      title: 'Redactify',
      description: 'Effortlessly redact HIPAA identifiers from text, documents, and structured data with Redactify – automating your compliance workflow. Protect sensitive patient information while maintaining clinical context.',
    },
    {
      icon: <MicrophoneIcon />,
      title: 'TranscriptX',
      description: 'Spend less time documenting. TranscriptX dictates highly accurate medical transcriptions of patient encounters into text, understanding',
    },
    {
      icon: <ChartBarIcon />,
      title: 'Chartwright',
      description: 'Your best friend with charting – turn any normal text into a high-quality chart, delivered exactly how healthcare professionals need it',
    },
  ];

  return (
    <section id="solutions" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-blue-400">
          Our Solutions
        </h2>
        <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Our comprehensive suite of AI-powered solutions transforms every aspect of healthcare documentation:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {solutions.map((solution, index) => (
            <SolutionTab
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;