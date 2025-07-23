import React, { useState, useEffect, useRef, useCallback } from 'react';

const RedactifyContent = ({ activeExampleTab, onExampleChange }) => {
  const [activeContentTab, setActiveContentTab] = useState('OriginalDocument'); // Default to Original Document
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
  // ✅ এখানে Redactify এর প্রকৃত ডেটা দিয়ে পূরণ করতে হবে
  const allDemoContent = {
    'Example 1': {
      OriginalDocument: `This is the original document content for Redactify Example 1.
      It contains sensitive information like patient names (John Doe),
      social security numbers (XXX-XX-1234), and addresses (123 Main St, Anytown, USA).
      Our goal is to redact all PII (Personally Identifiable Information).`,
      RedactedDocument: `This is the redacted document content for Redactify Example 1.
      It contains sensitive information like patient names (REDACTED),
      social security numbers (REDACTED), and addresses (REDACTED).
      Our goal is to redact all PII (Personally Identifiable Information).`,
      title: 'Redactify - Effortless PII Redaction for Clinical Notes',
    },
    'Example 2': {
      OriginalDocument: `Here is another example document for Redactify.
      This one might include dates of birth (DOB: 1985-07-15),
      medical record numbers (MRN: 987654), and phone numbers (555-123-4567).
      Redactify ensures compliance with privacy regulations.`,
      RedactedDocument: `Here is another example document for Redactify.
      This one might include dates of birth (REDACTED),
      medical record numbers (REDACTED), and phone numbers (REDACTED).
      Redactify ensures compliance with privacy regulations.`,
      title: 'Redactify - Ensuring Compliance with Automated Redaction',
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

  // যখন activeExampleTab পরিবর্তন হবে, তখন OriginalDocument ট্যাবে ফিরে আসবে
  useEffect(() => {
    setActiveContentTab('OriginalDocument');
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
            activeContentTab === 'OriginalDocument'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setActiveContentTab('OriginalDocument')}
        >
          Original Document
        </button>
        <button
          className={`px-6 py-2 rounded-md font-medium transition-colors duration-300 ${
            activeContentTab === 'RedactedDocument'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setActiveContentTab('RedactedDocument')}
        >
          Redacted Document
        </button>
      </div>

      {/* Content Display Area - Both panels are always rendered side-by-side and resizable */}
      <div ref={containerRef} className="flex flex-col md:flex-row h-96">
        {/* Left Panel */}
        <div
          className="bg-gray-700 p-4 rounded-l-md overflow-y-auto"
          style={{ flexBasis: `${leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}
        >
          <h4 className="font-semibold text-blue-300 mb-2">Original Document</h4>
          <p className="text-gray-200 whitespace-pre-wrap">{currentDemo.OriginalDocument}</p>
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
          <h4 className="font-semibold text-blue-300 mb-2">Redacted Document</h4>
          <p className="text-gray-200 whitespace-pre-wrap">{currentDemo.RedactedDocument}</p>
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

export default RedactifyContent;