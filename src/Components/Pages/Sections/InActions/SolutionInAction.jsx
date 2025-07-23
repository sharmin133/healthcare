
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
    <section id="in-action" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-400">
          See Our Solutions in Action
        </h2>

       
        <div className="flex justify-center space-x-2 mb-8 flex-wrap">
          {['TranscriptX', 'Chartwright', 'Redactify', 'Validify'].map((title) => (
            <SolutionCard
              key={title}
              title={title}
              isActive={activeSolutionTab === title}
              onClick={() => setActiveSolutionTab(title)}
            />
          ))}
        </div>

        <div className="text-center mb-8">
          <button
            onClick={toggleComparison}
            className="bg-gray-700 text-gray-300 px-6 py-2 rounded-full hover:bg-gray-600 transition-colors duration-300"
          >
            {isComparisonExpanded ? 'Click to collapse comparison' : 'Click to expand comparison'}
          </button>
        </div>


        {isComparisonExpanded && (
          <div>
            {/* Example Tabs */}
          <div className="flex justify-center space-x-4 mb-8 flex-wrap">
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




