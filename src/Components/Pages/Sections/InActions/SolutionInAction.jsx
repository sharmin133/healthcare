
import React, { useState } from 'react';
import TranscriptXContent from './TranscriptXContent/TranscriptXContent';
import SolutionCard from './SolutionCard';
import ExampleTab from './TranscriptXContent/ExampleTab';
import ChartWrightContent from './ChartWrightContent/ChartWrightContent';
import ValidifyContent from './ValidifyContent/ValidifyContent';
import RedactifyContent from './RedactifyContent/RedactifyContent';


const SolutionInAction = () => {
  const [activeSolutionTab, setActiveSolutionTab] = useState('TranscriptX');
  const [activeExampleTab, setActiveExampleTab] = useState('Example 1');
  const [isComparisonExpanded, setIsComparisonExpanded] = useState(true);

  const toggleComparison = () => {
    setIsComparisonExpanded(!isComparisonExpanded);
  };

  const handleExampleChange = (exampleName) => {
    setActiveExampleTab(exampleName);
  };


  const getExampleTabs = () => {
    if (activeSolutionTab === 'Chartwright') {
      return ['Example 1', 'Example 2', 'Example 3'];
    } else if (activeSolutionTab === 'Redactify') {
      return ['Example 1', 'Example 2'];
    } else if (activeSolutionTab === 'Validify') { 
      return ['Example 1', 'Example 2', 'Example 3', 'Example 4'];
    }
   
    return ['Example 1', 'Example 2', 'Example 3', 'Example 4'];
  };

  const renderContent = () => {
    switch (activeSolutionTab) {
      case 'TranscriptX':
        return (
          <TranscriptXContent
            activeExampleTab={activeExampleTab}
            onExampleChange={handleExampleChange}
          />
        );

        case 'Chartwright': 
        return (
          <ChartWrightContent
            activeExampleTab={activeExampleTab}
            onExampleChange={handleExampleChange}
          />
        );

           case 'Redactify': 
        return (
          <RedactifyContent
            activeExampleTab={activeExampleTab}
            onExampleChange={handleExampleChange}
          />
        );

            case 'Validify': 
        return (
          <ValidifyContent
            activeExampleTab={activeExampleTab}
            onExampleChange={handleExampleChange}
          />
        );
      default:
      
        return (
          <TranscriptXContent
            activeExampleTab={activeExampleTab}
            onExampleChange={handleExampleChange}
          />
        );
    }
  };

  return (
   <section
      id="in-action"
      className="relative bg-gray-800  justify-center  bg-cover bg-center text-center text-white" >
    
       <div className="max-w-5xl mx-auto py-8 ">
        <h2 className="text-3xl md:text-4xl font-bold mt-10 mb-10 text-blue-400"> See Our Solutions in Action</h2>
<div className="flex w-full flex-wrap">
  {['TranscriptX', 'Chartwright', 'Redactify', 'Validify'].map((title, index, arr) => {
    const isFirst = index === 0;
    const isLast = index === arr.length - 1;
    const widthPercent = 100 / arr.length;

    const roundedClass = isFirst
      ? 'rounded-tl-xl'
      : isLast
      ? 'rounded-tr-xl'
      : '';

    return (
      <div key={title} style={{ width: `${widthPercent}%` }}>
        <SolutionCard
          title={title}
          isActive={activeSolutionTab === title}
          onClick={() => setActiveSolutionTab(title)}
          roundedClass={roundedClass}
        />
      </div>
    );
  })}
</div>


    <div className="text-center ">
      <button 
        onClick={toggleComparison}
        className="bg-blue-500 text-gray-300  py-4 px-12 w-full hover:bg-blue-600 transition-colors duration-300"
      >
        {isComparisonExpanded ? 'Click to collapse comparison' : 'Click to expand comparison'}
      </button>
    </div>

   
    {isComparisonExpanded && (
      <div>
      
        <div className="flex justify-center  flex-wrap">
          {getExampleTabs().map((title) => (
            <ExampleTab
              key={title}
              title={title}
              isActive={activeExampleTab === title}
              onClick={() => handleExampleChange(title)}
            />
          ))}
        </div>

     
        {renderContent()}
      </div>
    )}
  </div>
</section>

  );
};

export default SolutionInAction;




