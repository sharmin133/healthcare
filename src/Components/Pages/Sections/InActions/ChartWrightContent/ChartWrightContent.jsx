import React, { useState, useEffect, useRef, useCallback } from 'react';

const ChartWrightContent = ({ activeExampleTab, onExampleChange }) => {
  const [activeContentTab, setActiveContentTab] = useState('MessyOriginal'); // Default to Messy Original
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // % of total width for left panel
  const [isResizing, setIsResizing] = useState(false);

  const containerRef = useRef(null); // Reference to the main content container
  const startX = useRef(0);
  const startWidth = useRef(0);
  const isResizingRef = useRef(false);
  const leftPanelWidthRef = useRef(leftPanelWidth);

  // Sync ref with state
  useEffect(() => {
    leftPanelWidthRef.current = leftPanelWidth;
  }, [leftPanelWidth]);

  // ডেটা স্ট্রাকচার: প্রতিটি উদাহরণের জন্য কন্টেন্ট (স্ক্রিনশট থেকে প্রাপ্ত)
  const allDemoContent = {
    'Example 1': {
      MessyOriginal: `Patient Name: Sarah Jones DOB: 03/10/1985 Date: 11/03/2023
Reason 4 Visit: Follow up for hypertension and recent URI.
Subjectiv:
Pt states blood pressre readings at home have been betetr since adjusting lisinopril dose. Had a cold last week, mostly over now but still has a lingering cough, non-productive. Denies fevr, chills, shortness of breath. Symtoms stared bout 10 days ago. Used OTC cough drops. No new c/o regarding BP. is tryin to eat better, more veatables. Exercise is hit or miss this week due to`,
      ChartwrightEnhanced: {
        patient: 'Sarah Jones',
        dob: '03/10/1985',
        visitDate: '2023-11-03',
        reason: 'Follow-up (Hypertension, Resolving URI)',
        subjectiveReport: {
          hypertension: 'Improved home BP readings since lisinopril adjustment.',
          uri: 'Symptoms resolving (started ~10 days ago), persistent non-productive cough. Denies fever, chills, SOB. Used OTC cough drops.',
        },
      },
      title: 'Experience Chartwright - Clean and Structure Messy Clinical Notes',
    },
    'Example 2': {
      MessyOriginal: `Patient Name: Emily White Date: 11/04/2023 Seshiion #: 8
Focs: Social anxiety and assertiveness training
Subjectivve:
Pt reported attending a social event over the weekend, which was a goal fr her. Felt very anxius beforehand, almost didn't go. Managed to stay for about an hour and talk to 2 people, wich she considers a smal success. Noted hart pounding and sweating while talking. Feels a bit discouraged that it was still so hard, despight practicing skills. Also mentioned a conflicht at work where she felt unable to speek up for herself. Sleep has been poor past cuple nites due to worry abt work stuff. No self harm ideation.
Objective:`,
      ChartwrightEnhanced: {
        patient: 'Emily White',
        visitDate: '2023-11-04',
        session: '#: 8',
        primaryFocus: 'Social Anxiety / Assertiveness Training',
        subjectiveReport: {
          socialEvent: 'Attended weekend event (goal), experienced high anxiety (palpitations, sweating), stayed 1 hour, talked to 2 people (small success). Felt discouraged by difficulty.',
          workConflict: 'Felt unable to speak up.',
          sleep: 'Poor past couple nights (work worry).',
          safety: 'Denied self-harm ideation.',
        },
      },
      title: 'Discover Chartwright - Clarify and Organize Therapy Notes',
    },
    'Example 3': {
      MessyOriginal: `Patient Name: Robert Davis MRN: 1234567 Date: 11/05/2023 Time: 14:30 Shift: Day
Assessment/Observations:
Pt seen in room 302. Complained of paen 5/10 in his left leg, which is where he had surgery yesterday. Pain is worse w/ movement. Denys chst paIn or shrtness of breath. Vital signs done: BP 145/92, P 88, R 18, Temp 37.5 C, SaO2 96% on room air. Lung sonds clear bilaterally. Heart sounds RRR. Abd soft, non-tndr. Surgical site dressing is clean, dry, and intact, no excess drainage noted. Pedal pulses 2+ bilaterally. Cap refill <3 secs. Skin warm and dry. Pt tolerating full liquid diet. Ambulated to chair with assist of 1, tolerated well, no dizziness reported. Asked for pain med. call light within reach.`,
      ChartwrightEnhanced: {
        patient: 'Robert Davis (MRN: 1234567)',
        date: '2023-11-05 / 14:30',
        shift: 'Day',
        subjectiveReport: {
          pain: 'Left leg 5/10 (surgical site), worse with movement. Denies chest pain, shortness of breath.',
        },
        objectiveData: {
          vitals: 'BP: 145/92, P: 88, R: 18, T: 37.5C, SaO2: 96% RA.',
          assessment: 'Lungs clear, Heart RRR. Abdomen soft/non-tender. Surgical site dressing clean, dry, intact, no excess drainage. Pedal pulses 2+ bilaterally. Cap refill <3 secs. Skin warm and dry. Tolerating full liquid diet. Ambulating to chair with assist of 1, tolerated well, no dizziness. Asked for pain medication. Call light within reach.',
        },
      },
      title: 'Transform Chartwright - Organize Messy Nurse Notes for Efficiency',
    },
  };

  const currentDemo = allDemoContent[activeExampleTab];

  // Example নেভিগেশন হ্যান্ডলার
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

  // যখন activeExampleTab পরিবর্তন হবে, তখন MessyOriginal ট্যাবে ফিরে আসবে
  useEffect(() => {
    setActiveContentTab('MessyOriginal');
  }, [activeExampleTab]);

  // Resizing handlers with refs to avoid re-creating functions
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

  // Add and remove global event listeners for resizing
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

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-4">{currentDemo.title}</h3>

      {/* Dynamic Tabs/Buttons */}
      <div className="flex justify-center space-x-4 mb-6 flex-wrap">
        <button
          className={`px-6 py-2 rounded-md font-medium transition-colors duration-300 ${
            activeContentTab === 'MessyOriginal'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setActiveContentTab('MessyOriginal')}
        >
          Messy Original
        </button>
        <button
          className={`px-6 py-2 rounded-md font-medium transition-colors duration-300 ${
            activeContentTab === 'ChartwrightEnhanced'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setActiveContentTab('ChartwrightEnhanced')}
        >
          Chartwright Chart
        </button>
      </div>

      {/* Content Display Area - Both panels are always rendered side-by-side and resizable */}
      <div ref={containerRef} className="flex flex-col md:flex-row h-96">
        {/* Left Panel */}
        <div
          className="bg-gray-700 p-4 rounded-l-md overflow-y-auto"
          style={{ flexBasis: `${leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}
        >
          <h4 className="font-semibold text-blue-300 mb-2">Messy Original Note</h4>
          <p className="text-gray-200 whitespace-pre-wrap">{currentDemo.MessyOriginal}</p>
        </div>

        {/* Resizer */}
        <div
          className="relative w-2 bg-gray-600 cursor-ew-resize flex-shrink-0 group"
          onMouseDown={handleMouseDown}
        >
          {/* Vertical line */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-gray-500 group-hover:bg-blue-400 transition-colors duration-200"></div>
          {/* Circle with two vertical bars */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center border border-gray-500 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors duration-200">
            <svg className="w-3 h-3 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 4h4v16h-4zM6 7h2v10H6zM16 7h2v10h-2z"/>
            </svg>
          </div>
        </div>

        {/* Right Panel */}
        <div
          className="bg-gray-700 p-4 rounded-r-md overflow-y-auto"
          style={{ flexBasis: `${100 - leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}
        >
          <h4 className="font-semibold text-blue-300 mb-2">Chartwright-Enhanced Chart</h4>
          <div className="text-gray-200">
            {Object.entries(currentDemo.ChartwrightEnhanced).map(([key, value]) => {
              // যদি value একটি অবজেক্ট হয়, তাহলে তার ভেতরের ডেটা লুপ করে দেখান
              if (typeof value === 'object' && value !== null) {
                return (
                  <div key={key} className="mb-2">
                    <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}: </strong>
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <p key={subKey} className="ml-4 text-sm">
                        <strong className="capitalize">{subKey.replace(/([A-Z])/g, ' $1').toLowerCase()}: </strong>
                        {typeof subValue === 'object' ? JSON.stringify(subValue) : subValue}
                      </p>
                    ))}
                  </div>
                );
              }
              // অন্যথায়, সরাসরি ভ্যালু দেখান
              return (
                <p key={key} className="mt-2">
                  <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}: </strong>
                  {value}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousExample}
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          &larr; Previous Example
        </button>
        <button
          onClick={handleNextExample}
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Next Example &rarr;
        </button>
      </div>
    </div>
  );
};

export default ChartWrightContent;