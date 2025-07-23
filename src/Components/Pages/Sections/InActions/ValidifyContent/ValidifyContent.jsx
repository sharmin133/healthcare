import React, { useState, useEffect, useRef, useCallback } from 'react';

const ValidifyContent = ({ activeExampleTab, onExampleChange }) => {
  const [activeContentTab, setActiveContentTab] = useState('OriginalData'); // Default to Original Data
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

  // ডেটা স্ট্রাকচার: প্রতিটি উদাহরণের জন্য কন্টেন্ট
  // ✅ এখানে Validify এর প্রকৃত ডেটা দিয়ে পূরণ করতে হবে
  const allDemoContent = {
    'Example 1': {
      OriginalData: `Original patient data for Validify Example 1:
      Patient Name: John Doe
      DOB: 1990-05-10
      Medications: Lisinopril 10mg, Metformin 500mg BID
      Allergies: Penicillin
      Diagnosis: Hypertension, Type 2 Diabetes
      Lab Results: Glucose 180, HbA1c 8.5%, Creatinine 1.2`,
      ValidatedData: `Validated patient data for Validify Example 1:
      Patient Name: John Doe (Verified)
      DOB: 1990-05-10 (Verified)
      Medications:
        - Lisinopril 10mg (Verified)
        - Metformin 500mg BID (Verified)
      Allergies: Penicillin (Verified)
      Diagnosis:
        - Hypertension (Verified)
        - Type 2 Diabetes (Verified)
      Lab Results:
        - Glucose 180 (Flagged: High)
        - HbA1c 8.5% (Flagged: High)
        - Creatinine 1.2 (Verified)`,
      title: 'Validify - Automated Data Validation for Clinical Records',
    },
    'Example 2': {
      OriginalData: `Original lab order for Validify Example 2:
      Order: CBC, CMP, Lipid Panel, TSH
      Patient: Jane Smith
      DOB: 1975-11-20
      Ordering Physician: Dr. Alex Lee
      Date: 2024-07-22
      Reason: Annual Checkup`,
      ValidatedData: `Validated lab order for Validify Example 2:
      Order:
        - CBC (Verified)
        - CMP (Verified)
        - Lipid Panel (Verified)
        - TSH (Verified)
      Patient: Jane Smith (Verified)
      DOB: 1975-11-20 (Verified)
      Ordering Physician: Dr. Alex Lee (Verified)
      Date: 2024-07-22 (Verified)
      Reason: Annual Checkup (Verified)`,
      title: 'Validify - Ensuring Accuracy in Lab Orders',
    },
    'Example 3': {
      OriginalData: `Original prescription for Validify Example 3:
      Patient: Michael Brown
      Medication: Amoxicillin 500mg
      Dosage: Take 1 tablet by mouth three times daily
      Quantity: 30 tablets
      Refills: 0
      Prescriber: Dr. Sarah White
      Date: 2024-07-20`,
      ValidatedData: `Validated prescription for Validify Example 3:
      Patient: Michael Brown (Verified)
      Medication: Amoxicillin 500mg (Verified)
      Dosage: Take 1 tablet by mouth three times daily (Verified)
      Quantity: 30 tablets (Verified)
      Refills: 0 (Verified)
      Prescriber: Dr. Sarah White (Verified)
      Date: 2024-07-20 (Verified)`,
      title: 'Validify - Verifying Prescription Details for Safety',
    },
    'Example 4': {
      OriginalData: `Original insurance claim for Validify Example 4:
      Patient: Emily Davis
      Policy Number: ABC12345
      Claim Date: 2024-07-18
      Service Code: 99213
      Diagnosis Code: I10
      Amount Billed: $150.00
      Provider NPI: 1234567890`,
      ValidatedData: `Validated insurance claim for Validify Example 4:
      Patient: Emily Davis (Verified)
      Policy Number: ABC12345 (Verified)
      Claim Date: 2024-07-18 (Verified)
      Service Code: 99213 (Verified)
      Diagnosis Code: I10 (Verified)
      Amount Billed: $150.00 (Verified)
      Provider NPI: 1234567890 (Verified)`,
      title: 'Validify - Streamlining Insurance Claim Processing',
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

  // যখন activeExampleTab পরিবর্তন হবে, তখন OriginalData ট্যাবে ফিরে আসবে
  useEffect(() => {
    setActiveContentTab('OriginalData');
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
            activeContentTab === 'OriginalData'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setActiveContentTab('OriginalData')}
        >
          Original Data
        </button>
        <button
          className={`px-6 py-2 rounded-md font-medium transition-colors duration-300 ${
            activeContentTab === 'ValidatedData'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setActiveContentTab('ValidatedData')}
        >
          Validated Data
        </button>
      </div>

      {/* Content Display Area - Both panels are always rendered side-by-side and resizable */}
      <div ref={containerRef} className="flex flex-col md:flex-row h-96">
        {/* Left Panel */}
        <div
          className="bg-gray-700 p-4 rounded-l-md overflow-y-auto"
          style={{ flexBasis: `${leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}
        >
          <h4 className="font-semibold text-blue-300 mb-2">Original Data</h4>
          <p className="text-gray-200 whitespace-pre-wrap">{currentDemo.OriginalData}</p>
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
          <h4 className="font-semibold text-blue-300 mb-2">Validated Data</h4>
          <p className="text-gray-200 whitespace-pre-wrap">{currentDemo.ValidatedData}</p>
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

export default ValidifyContent;