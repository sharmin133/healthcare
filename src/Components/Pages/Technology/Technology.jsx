
import React from 'react';

const TechnologyCard= ({ icon, title, description, badge }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700
                    transform hover:scale-105 transition-transform duration-300 ease-in-out
                    flex flex-col items-start text-left"> 
      <div className="mb-4 text-blue-400" style={{ width: '60px', height: '60px' }}>
        {icon}
      </div>
      {badge && (
        <span className="bg-green-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
          {badge}
        </span>
      )}
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 text-base">{description}</p>
    </div>
  );
};



const BrainIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M16 12h1m-1.636 6.364l-.707-.707M6 12H5m1.636 1.636l-.707-.707M12 21v-1m-4.673-1.636l-.707.707M12 12a9 9 0 110 0zm0 0V9a2 2 0 00-2-2h-1a2 2 0 00-2 2v2a2 2 0 002 2h1a2 2 0 002-2v-2z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M16 12h1m-1.636 6.364l-.707-.707M6 12H5m1.636 1.636l-.707-.707M12 21v-1m-4.673-1.636l-.707.707M12 12a9 9 0 110 0zm0 0V9a2 2 0 00-2-2h-1a2 2 0 00-2 2v2a2 2 0 002 2h1a2 2 0 002-2v-2z" />
  </svg>
);

const LockClosedIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);


const Technology = () => {
  const technologies = [
    {
      icon: <BrainIcon />,
      title: 'Sophisticated Natural Language Processing',
      description: 'At the core of our platform is an advanced foundation model. This enables our system to grasp the nuances of clinical conversations — understanding context, recognizing intent, and accurately interpreting medical terminology. This deep comprehension allows the AI to generate clear, concise, and contextually relevant medical notes automatically.',
    },
    {
      icon: <LightbulbIcon />,
      title: 'Learning Mode & Personalization',
      description: 'Our AI doesn\'t rely on generic templates. We initiate the process by learning directly from your specific cases and workflows. The system intelligently refines its understanding and output based on your ongoing feedback. With each processed case, its accuracy and alignment with your unique clinical documentation needs become increasingly precise, ensuring a truly personalized solution.',
    },
    {
      icon: <LockClosedIcon />,
      title: 'Robust Data Privacy & Security',
      description: 'Protecting sensitive health information is paramount. Our AI solutions are architected with a security-first approach, incorporating principles like \'zero trust\'. We utilize robust security measures, including comprehensive encryption (both at rest and in transit), role-based access controls, and regular security audits to ensure your data\'s confidentiality and integrity.',
      badge: 'HIPAA COMPLIANT', 
    },
  ];

  return (
    <section id="technology" className="py-16  bg-gray-900 text-white">
     <div className='mx-24'>
       <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-blue-400">
          Our Technology
        </h2>
        <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          At Clin Technologies, we\'ve built our platform on groundbreaking AI technology specifically designed for healthcare. Our solutions use the latest advancements in natural language processing and machine learning to create a system that truly understands the complexities of medical documentation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <TechnologyCard
              key={index}
              icon={tech.icon}
              title={tech.title}
              description={tech.description}
              badge={tech.badge}
            />
          ))}
        </div>
      </div>
     </div>
    </section>
  );
};

export default Technology;