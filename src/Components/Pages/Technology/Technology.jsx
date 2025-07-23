
import React from 'react';
import { FaUnlockAlt } from 'react-icons/fa';
import { GiBrain } from 'react-icons/gi';
import { IoMdRepeat } from 'react-icons/io';
import { LuNotebookPen } from 'react-icons/lu';


const TechnologyCard= ({ icon, title, description, badge }) => {
  return (
    <div className="bg-blue-950 p-6 rounded-3xl shadow-xl  border border-gray-700
                    hover:scale-105 transition-transform duration-300 ease-in-out
                    flex flex-col items-start text-left  hover:-translate-y-2"> 

      <div className="mb-4 text-blue-400" style={{ width: '60px', height: '60px' }}>
        {icon}
      </div>
      {badge && (
        <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
          {badge}
        </span>
      )}
      <h3 className="text-3xl p-4 font-bold mb-3 border-b text-blue-400">{title}</h3>
      <p className="text-gray-300 text-xl">{description}</p>
    </div>
  );
};



const BrainIcon = () => (
<div className="p-4 border-2  rounded-full inline-block">
    <GiBrain size={40} style={{ fill: "pink", stroke: "red", strokeWidth: 2 }} />
    </div>
);

const LightbulbIcon = () => (
  <div className="p-4 border-2  rounded-full inline-block">
    <IoMdRepeat size={40} style={{ fill: "blue", stroke: "", strokeWidth: 2 }}  />
    </div>

 
);

const LockClosedIcon = () => (
<div className=''>
     <div className="px-2 py-1 border-2 bg-blue-950 rounded-full inline-block mb-3">
    <div className='flex gap-1'>
      <div><FaUnlockAlt size={20} style={{ fill: "yellow", stroke: "", strokeWidth: 2 }}  /></div>
      <p className='text-white '>HIPAA </p>
      <p className='text-white '>COMPLIANT </p>
    </div>
    </div>


<div className="px-2 py-1  border-2 bg-blue-950 rounded-full inline-block">
    <div className='flex gap-1'>
      <div><LuNotebookPen size={20} style={{ fill: "", stroke: "yellow", strokeWidth: 2 }}  /></div>
      <p className='text-white '>BUSINESS</p>
      <p className='text-white '>ASSOCIATE</p>
        <p className='text-white '>AGREEMENT </p>
      
    </div>
    </div>
</div>


  
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
      
    },
  ];

  return (
    <section id="technology" className="py-16  bg-gray-900 text-white">
     <div className='md:mx-32 mx-auto'>
       <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-blue-400">
          Our Technology
        </h2>
        <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          At Clin Technologies, we've built our platform on groundbreaking AI technology specifically designed for healthcare. Our solutions use the latest advancements in natural language processing and machine learning to create a system that truly understands the complexities of medical documentation.
        </p>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <TechnologyCard
              key={index}
              icon={tech.icon}
              title={tech.title}
              description={tech.description}
             
              
            />
          ))}
        </div>
      </div>
     </div>
    </section>
  );
};

export default Technology;


