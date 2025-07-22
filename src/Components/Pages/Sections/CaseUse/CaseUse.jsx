import React from 'react';

// কাস্টম কার্ড কম্পোনেন্ট
const CaseUseCard = ({ title, description, quote, author }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700
                    transform hover:scale-105 transition-transform duration-300 ease-in-out
                    flex flex-col items-start text-left">
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 text-base mb-4 flex-grow">{description}</p>
      {quote && (
        <blockquote className="text-gray-400 italic border-l-4 border-blue-400 pl-4 mb-3">
          "{quote}"
        </blockquote>
      )}
      {author && (
        <p className="text-sm font-semibold text-blue-300">
          - {author}
        </p>
      )}
    </div>
  );
};

const CaseUse = () => {
  const caseUses = [
    {
      title: 'Primary Care',
      description: 'Dr SJ M.D reduced her documentation time by 52%, allowing her to see 3 more patients daily while finishing her charts before leaving the office.',
      quote: 'This AI tool streamlines a tedious process, reduces \'click fatigue,\' and helps me reclaim some sanity.',
      author: 'Dr. SJ, MD',
    },
    {
      title: 'Emergency Medicine',
      description: 'Our ED department implemented Clin Tech, resulting in more thorough documentation and a 70% decrease in chart completion time during high-volume periods. Our nurses love it.',
      quote: 'Honestly, with the number of patients I manage, documentation felt like a constant, losing battle. But this AI feels like getting an assistant. It takes my detailed notes and instantly creates the clear, customized charts I need. I\'m getting hours back each week - hours I can now spend directly with patients, tackling barriers, not just typing.',
      author: 'Emergency Department (ED) Nurse Manager',
    },
    {
      title: 'Behavioral Health',
      description: '“Chartwright has been transformative for our clinic. Our therapists were drowning in documentation; We\'ve slashed average charting time to under 3 minutes per patient, freeing up hours for direct care. More importantly, we\'ve seen a significant reduction in documentation errors and compliance flags. It\'s not just faster; it\'s smarter documentation.”',
      quote: '', // Quote is part of description in this case
      author: 'Clinical Director, Behavioral Health Practice',
    },
    {
      title: 'Case Management',
      description: '“Honestly, with the number of patients I manage, documentation felt like a constant, losing battle. But this AI feels like getting an assistant. It takes my detailed notes and instantly creates the clear, customized charts I need. I\'m getting hours back each week - hours I can now spend directly with patients, tackling barriers, not just typing.”',
      quote: '', // Quote is part of description in this case
      author: 'Social Worker/Case Manager',
    },
  ];

  return (
    <section id="case-use" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-blue-400">
          Case Use
        </h2>
        <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          See how healthcare providers across specialties are transforming their practice with Clin Technologies:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"> {/* 2 কলামে সাজানো হয়েছে */}
          {caseUses.map((item, index) => (
            <CaseUseCard
              key={index}
              title={item.title}
              description={item.description}
              quote={item.quote}
              author={item.author}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseUse;