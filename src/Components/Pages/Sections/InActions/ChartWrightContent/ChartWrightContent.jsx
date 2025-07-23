import React, { useState, useEffect, useRef, useCallback } from 'react';

const ChartwrightContent = ({ activeExampleTab, onExampleChange }) => {
  const [activeContentTab, setActiveContentTab] = useState('MessyOriginal');
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
      MessyOriginal: {
        type: 'Doctor Note', 
        content: `Pateint Name: Sarah Jones DOB: 03/10/1985 Date: 11/03/2023
Reasn 4 Visit: Follow up for hypertensioin and recent URI.

Subjective:
Pt states blood pressre readings at home have been betetr since adjusting lisinopril dose. Had a cold last week, mostly over now but still has a lingering cough, non-productive. Denies fevr, chills, shortness of breath. Symtoms stared bout 10 days ago. Used OTC cough drops. No new c/o regarding BP. Is tryin to eat better, more vegtabls. Excercise is hit or miss this week due to the cold. Sleep ok when not coughing. Non-smoker, social alc.

Objective:
BP 135/88 seated R arm. Pulse 72, RR 16, Temp 36.8C. Genrl appearance: Appears well, mild cough noted during exam. HEENT: Mucous membrans moist, no congestion. Lungs: Clear to auscsulation bilaterally, no wheezes or crackles heard. Heart: RRR, no murmurs. Abdomen: soft, non-tender. Skin: warm and dry. Exam w/n normal limits except for cough.

Assessment:
Hypertenson, improved control.
Resolving Upper Respiratry Infection with residual cough.

Plan:
Continue Lisinopril 10mg daily.
Monitor BP at home, f/u in 3 months or sooner if BP increases.
Reassure pt cough should resolve over next 1-2 weeks. OTC cough suppressants ok if bothersome at night.
Encourage continued healthy diet and exercise once URI symtoms fully resolved.`,
      },
      ChartwrightEnhanced: {
        patient: 'Sarah Jones',
        dob: '03/10/1985',
        visitDate: '2023-11-03',
        reason: 'Follow-up (Hypertension, Resolving URI)',
        subjectiveReport: `Hypertension: Improved home BP readings since lisinopril adjustment.
URI: Symptoms resolving (started ~10 days ago), persistent non-productive cough. Denies fever, chills, SOB. Used OTC cough drops.
Diet & Exercise: Trying to eat better (more vegetables). Exercise inconsistent due to cold.
Sleep: Okay when not coughing.
Social History: Non-smoker, social alcohol use.`,
        objectiveData: `Vitals: BP 135/88 (seated R arm), Pulse 72, RR 16, Temp 36.8C.
General Appearance: Appears well, mild cough noted.
HEENT: Mucous membranes moist, no congestion.
Lungs: Clear to auscultation bilaterally, no wheezes or crackles.
Heart: RRR, no murmurs.
Abdomen: Soft, non-tender.
Skin: Warm and dry.
Overall: Exam within normal limits except for cough.`,
        assessment: `1. Hypertension, improved control.
2. Resolving Upper Respiratory Infection with residual cough.`,
        plan: `1. Continue Lisinopril 10mg daily.
2. Monitor BP at home; follow up in 3 months or sooner if BP increases.
3. Reassure patient cough should resolve over next 1-2 weeks. OTC cough suppressants acceptable if bothersome at night.
4. Encourage continued healthy diet and exercise once URI symptoms fully resolved.`,
      },
      title: 'Experience Chartwright - Clean and Structure Messy Clinical Notes', 
    },
    'Example 2': {
      MessyOriginal: {
        type: 'Therapy Note', 
        content: `Patinent Name: Emily White Date: 11/04/2023 Seshion #: 8
Focs: Social anxiety and assertiveness training.

Subjective:
Pt reported attending a social event over the weekend, wich was a grill r her. Felt very anxius beforehand, almost didn't go. Managed to stay for about an hour and talk to 2 people, wich she considers a smal success. Noted hart pounding and sweating while talking. Feels a bit discouraged that it was still so hard, despight practicing skills. Also mentioned a conflict at work where she felt walked over, didn't assert herself. Homework: practice 3 'I' statements this week.

Objective:
Patient presented on time, well-groomed. Maintained eye contact throughout session. Affect was congruent with reported mood, slightly down. Speech clear, coherent. No SI/HI expressed.

Assessment:
Patient continues to make gradual progress in addressing social anxiety, demonstrated by attending social event. However, still experiencing significant physiological symptoms and emotional distress. Assertiveness remains a challenge, as evidenced by work conflict. Goal: continue to develop coping skills for anxiety and practice assertive communication.

Plan:
1. Review and process social event experience, focusing on thoughts and feelings.
2. Continue CBT techniques for anxiety management (e.g., diaphragmatic breathing, cognitive restructuring).
3. Role-play assertive communication scenarios related to work conflict.
4. Homework: Identify and practice 3 "I" statements in real-life situations.
5. Schedule next session in one week.`,
      },
      ChartwrightEnhanced: {
        patient: 'Emily White',
        visitDate: '2023-11-04',
        session: '# 8',
        primaryFocus: 'Social Anxiety / Assertiveness Training',
        subjectiveReport: `Social Event: Attended weekend event (goal), experienced high anxiety (palpitations, sweating), stayed 1 hour, talked to 2 people (small success). Felt discouraged by difficulty.
Work Conflict: Felt "walked over," did not assert self.`,
        objectiveData: `Vitals: Patient presented on time, well-groomed.
Physical Exam: Maintained eye contact throughout session. Affect was congruent with reported mood, slightly down. Speech clear, coherent. No SI/HI expressed.`, // Corrected to match 447
        assessment: `1. Patient continues to make gradual progress in addressing social anxiety, demonstrated by attending social event.
2. However, still experiencing significant physiological symptoms and emotional distress.
3. Assertiveness remains a challenge, as evidenced by work conflict.
4. Goal: continue to develop coping skills for anxiety and practice assertive communication.`,
        plan: `1. Review and process social event experience, focusing on thoughts and feelings.
2. Continue CBT techniques for anxiety management (e.g., diaphragmatic breathing, cognitive restructuring).
3. Role-play assertive communication scenarios related to work conflict.
4. Homework: Identify and practice 3 "I" statements in real-life situations.
5. Schedule next session in one week.`,
      },
      title: 'Discover Chartwright - Clarify and Organize Therapy Notes',
    },
    'Example 3': {
      MessyOriginal: {
        type: 'Nurse Note', 
        content: `Patinent Name: Robert Davis MRN: 1234567 Date: 11/05/2023 Time: 14:30 Shift: Day
Assessment/Observations:
Pt seen in room 302. Complained of paen 5/10 in his left leg, which is where he had surgery yesterday. Pain is worse w/ movement. Denys chst pain or shrtness of breath. Vital signs done: BP 145/92, P 88, R 18, Temp 37.5 C, SaO2 96% on room air. Lung sonds clear bilaterally. Heart sounds RRR. Abd soft, non-tndr. Surgical site dressing is clean, dry, and intact, no excess drainage noted. Patient ambulated to bathroom with assistance of one. Tolerated short walk, reported increased pain to 7/10 with movement. Administered Hydrocodone 5mg PO at 14:45. Re-assessed pain at 15:30, now 3/10. Call light within reach. Family at bedside. Will continue to monitor.

Plan:
Continue pain management as ordered.
Encourage deep breathing and coughing exercises.
Monitor vital signs q4h and PRN.
Assess surgical site for signs of infection.
Encourage ambulation with assistance as tolerated.
Educate patient on importance of reporting increased pain.`,
      },
      ChartwrightEnhanced: {
        patient: 'Robert Davis',
        mrn: '1234567',
        date: '2023-11-05 / 14:30',
        shift: 'Day',
        subjectiveReport: `Pain: Left leg 5/10 (surgical site), worse with movement.
Other: Denies chest pain, shortness of breath.`,
        objectiveData: `Vitals (14:30): BP 145/92, P 88, R 18, T 37.5C, SaO2 96% RA.
Lungs: Clear bilaterally.
Heart: RRR.
Abdomen: Soft, non-tender.
Surgical Site (left leg): Dressing clean, dry, intact, no excess drainage.
Mobility: Ambulated to bathroom with 1-person assist, tolerated short walk. Pain increased to 7/10 with movement.
Intervention: Hydrocodone 5mg PO administered at 14:45.
Pain Re-assessment (15:30): Pain 3/10.
Safety: Call light within reach.
Social: Family at bedside.`,
        assessment: `1. Post-operative pain (left leg surgery) managed with analgesia.
2. Respiratory and cardiovascular status stable.
3. Surgical site stable.`,
        plan: `1. Continue prescribed pain management.
2. Encourage deep breathing and coughing.
3. Monitor vital signs every 4 hours and as needed.
4. Assess surgical site for signs of infection.
5. Encourage assisted ambulation as tolerated.
6. Educate patient to report increased pain.
7. Continue to monitor.`,
      },
      title: 'Transform Chartwright - Organize Messy Nurse Notes for Efficiency', 
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
    setActiveContentTab('MessyOriginal'); // Default to MessyOriginal for Chartwright
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

  // Helper functions for dynamic titles and labels based on the active example
  const getLeftButtonTitle = () => {
    // Uses the 'type' property from the MessyOriginal data
    return currentDemo.MessyOriginal.type;
  };

  const getRightButtonTitle = () => {
    return 'Chartwright Chart'; // Consistent for all Chartwright examples
  };

  const getLeftPanelHeader = () => {
    return `${currentDemo.MessyOriginal.type} Note`; // Example: "Doctor Note Note" -> "Doctor Note" (adjust if needed)
  };

  const getRightPanelHeader = () => {
    return 'Chartwright-Enhanced Chart'; // Consistent for all Chartwright examples
  };

  const getLeftSecondaryLabel = () => {
    return 'Messy Original';
  };

  const getRightSecondaryLabel = () => {
    return 'AI-Enhanced';
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">{currentDemo.title}</h3>

      <div ref={containerRef} className="flex flex-col md:flex-row h-96">

        {/* Left Panel - Messy Original */}
        <div
          className="bg-gray-950 p-4 rounded-l-md overflow-y-auto"
          style={{ flexBasis: `${leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}
        >
          <div className="sticky top-0 z-10 ">
          <div className='flex justify-between text-center mb-3 border-b border-gray-700'>
            <div className={`px-6 py-2 text-blue-600 rounded-md font-medium transition-colors duration-300 ${
              activeContentTab === 'MessyOriginal' ? 'bg-gray-700' : '' // Highlight active tab
            }`}
              onClick={() => setActiveContentTab('MessyOriginal')}
            >
              {getLeftButtonTitle(activeExampleTab)}
            </div>
            <div className="text-blue-400 ml-2">
              {getLeftSecondaryLabel(activeExampleTab)}
            </div>
          </div>
          </div>

          <div> <h4 className="py-3  text-xl font-semibold border-b border-gray-700 mb-2">{getLeftPanelHeader(activeExampleTab)}</h4></div>
          {/* Using <pre> to maintain original formatting including line breaks */}
          <div><pre className="text-gray-200 whitespace-pre-wrap">{currentDemo.MessyOriginal.content}</pre></div>
        </div>

        {/* Resizer */}
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

        {/* Right Panel - Chartwright Enhanced */}
        <div
          className="bg-gray-950 p-4 rounded-r-md overflow-y-auto"
          style={{ flexBasis: `${100 - leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}>


                <div className="sticky top-0 z-10 ">
          <div className='flex justify-between text-center mb-3 py-2 border-b border-gray-700'>
            <div className={`px-6 text-yellow-600 rounded-md font-medium transition-colors duration-300 ${
              activeContentTab === 'ChartwrightEnhanced' ? 'bg-gray-700' : '' // Highlight active tab
            }`}
              onClick={() => setActiveContentTab('ChartwrightEnhanced')}
            >
              {getRightButtonTitle(activeExampleTab)}
            </div>
            <div className="text-yellow-600 text-sm flex items-center ml-2">
              {getRightSecondaryLabel(activeExampleTab)}
            </div>
          </div>
          </div>

          <div><h4 className="font-semibold border-b text-xl py-3 border-gray-700  mb-4">{getRightPanelHeader(activeExampleTab)}</h4></div>
          <div className="text-gray-200">
            {Object.entries(currentDemo.ChartwrightEnhanced).map(([key, value]) => (
              <p key={key} className="mt-2">
                <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}: </strong>
                {/* Render value as is. If it contains newlines, they will be handled by whitespace-pre-wrap on the parent div or <br/> if explicitly in string. */}
                {value}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
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

export default ChartwrightContent;