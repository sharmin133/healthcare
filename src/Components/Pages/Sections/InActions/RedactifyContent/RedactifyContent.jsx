import React, { useState, useEffect, useRef, useCallback } from 'react';

const RedactifyContent = ({ activeExampleTab, onExampleChange }) => {
  const [activeContentTab, setActiveContentTab] = useState('OriginalNote');
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  const containerRef = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const isResizingRef = useRef(false);
  const leftPanelWidthRef = useRef(leftPanelWidth);

  useEffect(() => {
    leftPanelWidthRef.current = leftPanelWidth;
  }, [leftPanelWidth]);

  
  const allDemoContent = {
    'Example 1': {

      RedactifyEnhanced: {
        patient: 'REDACT',
        dob: 'REDACT',
        address: 'REDACT',
        phone: 'REDACT',
        mrn: 'REDACT',
        dateOfVisit: 'REDACT',
        attendingPhysician: 'REDACT',
        clinic: 'REDACT',
        subjective: `Ms. Jane Smith, a 55-year-old female, presents for her annual check-up on May 21, 2024. She reports feeling generally well. She mentions occasional lower back pain, especially after prolonged sitting. No fever, chills, or recent illness. She is currently taking Metformin for Type 2 Diabetes. Her last A1c was 6.8%. She lives at 456 Oak Avenue with her husband. Her contact number is (217) 555-0199. Continue Metformin 500mg BID.
Recommend physical therapy referral for lower back pain evaluation and management.
Encourage regular exercise and stretching.
Schedule follow-up appointment in 6 months at Springfield Community Health Clinic with Dr. Miller.`, 

        
      },
      title: 'Experience Redactify - Effortlessly Redact HIPAA Identifiers & Automate Compliance', 
    },
    'Example 2': {
//      
      RedactifyEnhanced: {
        clientName: 'REDACT',
        
        therapist: 'Client appeared fatigued but was articulate and engaged throughout the session. Affect was predominantly anxious, with some moments of frustration when discussing work dynamics. No suicidal or homicidal ideation reported. REDACT mentioned an upcoming performance review on REDACT',
        
        sessionFocus: 'Management of work-related stress and anxiety.', 
        subjective: `REDACT (Client ID: REDACT) presented for his scheduled session on REDACT, reporting continued high levels of stress stemming from his job at REDACT. He described a recent critical project deadline and interpersonal difficulties with a colleague, specifically naming REDACT.`, 

        plan: 'Continue weekly CBT sessionsReview and reinforce mindfulness techniques for stress reduction, particularly for use during work breaks . Explore assertive communication strategies for dealing'
      },
      title: 'Discover Redactify - Securely Anonymize Therapy Notes in Seconds',
    },
  };

  const currentDemo = allDemoContent[activeExampleTab];

  const handleNextExample = () => {
    const exampleKeys = Object.keys(allDemoContent);
    const currentIndex = exampleKeys.indexOf(activeExampleTab);
    const nextIndex = (currentIndex + 1) % exampleKeys.length;
    onExampleChange(exampleKeys[nextIndex]);
  };

  const handlePreviousExample = () => {
    const exampleKeys = Object.keys(allDemoContent);
    const currentIndex = exampleKeys.indexOf(activeExampleTab);
    const prevIndex = (currentIndex - 1 + exampleKeys.length) % exampleKeys.length;
    onExampleChange(exampleKeys[prevIndex]);
  };

  useEffect(() => {
    setActiveContentTab('OriginalNote'); 
  }, [activeExampleTab]);


  const handleMouseDown = useCallback((e) => {
    setIsResizing(true);
    isResizingRef.current = true;
    startX.current = e.clientX;
    if (containerRef.current) {
      startWidth.current = (leftPanelWidthRef.current / 100) * containerRef.current.offsetWidth;
    }
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isResizingRef.current) return;

    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const dx = e.clientX - startX.current;
      let newWidth = ((startWidth.current + dx) / containerWidth) * 100;

      newWidth = Math.max(20, Math.min(80, newWidth));
      setLeftPanelWidth(newWidth);
      leftPanelWidthRef.current = newWidth;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    isResizingRef.current = false;
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  if (!currentDemo) {
    return <div className="text-center text-red-400">Content not found for this example.</div>;
  }

  
  const getLeftButtonTitle = () => {
    return currentDemo.OriginalNote.type;
  };

  const getRightButtonTitle = () => {
    return 'Redactify Note'; 
  };

  const getLeftPanelHeader = () => {
    return `Original ${currentDemo.OriginalNote.type}`;
  };

  const getRightPanelHeader = () => {
    return `Redactify AI-Enhanced (HIPAA Compliant)`; 
  };

  const getLeftSecondaryLabel = () => {
    return 'Original';
  };

  const getRightSecondaryLabel = () => {
    return 'HIPAA Compliant';
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">{currentDemo.title}</h3>

      <div ref={containerRef} className="flex flex-col md:flex-row h-96">

       
        <div
          className="bg-gray-950 p-4 rounded-l-md overflow-y-auto"
          style={{ flexBasis: `${leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}
        >

          <div className="sticky top-0 z-10 ">
          <div className='flex justify-between text-center mb-3 border-b border-gray-700'>
            <div className={`px-6 py-2 text-blue-600 rounded-md font-medium transition-colors duration-300 ${
              activeContentTab === 'OriginalNote' ? 'bg-gray-700' : ''
            }`}
              onClick={() => setActiveContentTab('OriginalNote')}
            >
              {getLeftButtonTitle(activeExampleTab)}
            </div>
            <div className="text-blue-400 ml-2">
              {getLeftSecondaryLabel(activeExampleTab)}
            </div>
          </div>
          </div>

          <div> <h4 className="py-3 font-semibold border-b border-gray-700 mb-2 text-xl">{getLeftPanelHeader(activeExampleTab)}</h4></div>
          <div><pre className="text-gray-200 whitespace-pre-wrap">{currentDemo.OriginalNote.content}</pre></div>
        </div>

     
        <div
          className="relative w-2 bg-gray-600 cursor-ew-resize flex-shrink-0 group"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-gray-500 group-hover:bg-blue-400 transition-colors duration-200"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center border border-gray-500 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors duration-200">
            <svg className="w-3 h-3 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 4h4v16h-4zM6 7h2v10H6zM16 7h2v10h-2z" />
            </svg>
          </div>
        </div>

       
        <div
          className="bg-gray-950 p-4 rounded-r-md overflow-y-auto"
          style={{ flexBasis: `${100 - leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}>


         <div className="sticky top-0 z-10 ">
          <div className='flex justify-between text-center mb-3 py-2 border-b border-gray-700'>
            <div className={`px-6 text-yellow-600 rounded-md font-medium transition-colors duration-300 ${
              activeContentTab === 'RedactifyEnhanced' ? 'bg-gray-700' : ''
            }`}
              onClick={() => setActiveContentTab('RedactifyEnhanced')}
            >
              {getRightButtonTitle(activeExampleTab)}
            </div>
            <div className="text-yellow-600 text-sm flex items-center ml-2">
              {getRightSecondaryLabel(activeExampleTab)}
            </div>
          </div>
          </div>

          <div><h4 className="font-semibold border-b py-3 text-xl border-gray-700  mb-4">{getRightPanelHeader(activeExampleTab)}</h4></div>
          <div className="text-gray-200">
            {Object.entries(currentDemo.RedactifyEnhanced).map(([key, value]) => (
              <p key={key} className="mt-2">
                <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}: </strong>
                {value}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4 ">
        <button onClick={handlePreviousExample}
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition">
          &larr; Previous Example
        </button>
        <button onClick={handleNextExample}
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition">
          Next Example &rarr;
        </button>
      </div>
    </div>
  );
};

export default RedactifyContent;