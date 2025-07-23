import React, { useState, useEffect, useRef, useCallback } from 'react';

const TranscriptXContent = ({ activeExampleTab, onExampleChange }) => {
  const [activeContentTab, setActiveContentTab] = useState('DoctorDictation');
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
  const allDemoContent = {
    'Example 1': {
      DoctorDictation: `“Okay, uh, patient is Sarah Chen, DOB 3/22/1978. Seen today, October 26th, 2023. Chief complaint… uh… right knee pain, ongoing for about 3 months, worse with activity, especially stairs. Subjective: Patient describes the pain as a dull ache, located medially. Pain worsens with activity, particularly stair climbing. Pain rated 6/10 currently, increasing to 8/10 post-exercise. Reports approximately 15 minutes of morning stiffness. Denies significant swelling, locking, or episodes of giving way. Partial relief noted with over-the-counter ibuprofen. No history of trauma. Patient is otherwise healthy. Objective: Gait: Non-antalgic. Right Knee Exam: No visible effusion. Mild tenderness to palpation over the medial joint line. McMurray's test is negative. Lachman and drawer tests stable. Range of motion is full, though terminal flexion elicits some discomfort medially. Assessment: Likely medial compartment osteoarthritis of the right knee. Differential includes medial meniscus tear, although less likely given exam findings. Plan: Uh... Obtain bilateral weight-bearing knee X-rays. Recommend continued NSAID use as needed, consider switching to Naproxen. Discussed physical therapy options for strengthening.locking, or episodes of giving way. Partial relief noted with over-the-counter ibuprofen. No history of trauma. Patient is otherwise healthy. Objective: Gait: Non-antalgic. Right Knee Exam: No visible effusion. Mild tenderness to palpation over the medial joint line. McMurray's test is negative. Lachman and drawer tests stable. Range of motion is full, though terminal flexion elicits some discomfort medially.`,
      AIGeneratedNote: {
        patient: 'Sarah Chen',
        dob: '03/22/1978',
        dateOfService: 'October 26, 2023',
        chiefComplaint: 'Right knee pain x 3 months.',
        subjective: `Patient reports right knee pain ongoing for approximately 3 months, described as a dull ache located medially. Pain worsens with activity, particularly stair climbing. Pain rated 6/10 currently, increasing to 8/10 post-exercise. Reports approximately 15 minutes of morning stiffness. Denies significant swelling, locking, or episodes of giving way. Partial relief noted with over-the-counter ibuprofen. No history of trauma. Patient is otherwise healthy.`,
        objective: `Gait: Non-antalgic.
Right Knee Exam: No visible effusion. Mild tenderness to palpation over the medial joint line. McMurray's test is negative. Lachman and drawer tests stable. Range of motion is full, though terminal flexion elicits some discomfort medially.ait: Non-antalgic.
Right Knee Exam: No visible effusion. Mild tenderness to palpation over the medial joint line. McMurray's test is negative. Lachman and drawer tests stable. Range of motion is full, though terminal flexion elicits some discomfort medially.`,
        assessment: `Likely medial compartment osteoarthritis of the right knee. Differential includes medial meniscus tear, although less likely given exam findings.`,
        plan: `Obtain bilateral weight-bearing knee X-rays. Recommend continued NSAID use as needed, consider switching to Naproxen. Discussed physical therapy options for strengthening.`,
      },
      title: 'Experience TranscriptX - Effortless, Accurate Medical Transcription'
    },
    'Example 2': {
      DoctorDictation: `“Alright, handover for Bed 7, uh, Mrs. Gable, 72F, brought in by EMS, syncopal episode at home. Witnessed by husband, slumped in chair, maybe 30 seconds LOCT GCS 15 on arrival. Hx of HTN, Afib on Eliquis. Vitals: BP 105/60, HR 115 irreg, RR 20, SpO2 94%. RA, Temp 37.1. Put her on the monitor, she's in Afib RVR. Got an 18g IV L AC, labs drawn - CBC, CMP, Trop, Coags sent stat. EKG done, showed Afib RVR, no acute ST changes noted. Portable chest X-ray ordered. Gave a 500cc NS bolus, BP now 115/65, HR down to 105. Still awake, alert, denies CP, SOB. Neuro checks grossly normal. Waiting on lab results and X-ray.”`,
      AIGeneratedNote: {
        patient: 'Gable, [First Name Redacted]',
        ageSex: '72-year-old female (72F)',
        location: 'ED Bed 7',
        arrival: 'Via EMS',
        presentingComplaint: 'Syncopal episode at home.',
        history: `Witnessed syncopal episode (approx. 30 seconds loss of consciousness) at home, witnessed by husband.`,
        pastMedicalHistory: 'Hypertension (HTN), Atrial Fibrillation (Afib) on Eliquis.',
        vitals: 'BP 105/60 (now 115/65 post-bolus), HR 115 irregular (now 105 post-bolus), RR 20, SpO2 94% RA, Temp 37.1.',
        physicalExam: `LOCT GCS 15 on arrival. Awake, alert. Denies chest pain (CP) or shortness of breath (SOB). Neurological exam grossly normal.`,
        interventions: `Placed on cardiac monitor (Afib RVR noted). 18g IV placed in left AC. Labs (CBC, CMP, Troponin, Coags) sent. EKG performed (Afib RVR, no acute ST changes). Portable chest X-ray ordered. 500cc Normal Saline (NS) bolus administered.`,
        plan: 'Waiting for lab results and chest X-ray results.',
      },
      title: 'Experience TranscriptX - Accurate Nursing Notes'
    },
    'Example 3': {
      DoctorDictation: `“Okay, uh, patient is a 42-year-old male, uhm, follow-up for… Major Depressive Disorder, recurrent, severe, and GAD. He, uh, reports mood is maybe a ‘3 out of 10’. Still struggling with… significant anhedonia, low energy… hypersomnia noted. Uhm, some passive SI, but denies active intent, plan, or access… denies HI. Appetite is… decreased. Let’s see… Current meds are Escitalopram 20mg daily… added Mirtazapine 15mg at bedtime about, uh, 3 weeks ago for sleep and appetite. Patient feels the Mirtazapine might be helping sleep slightly? But still feels quite… ‘blah’. his words. Affect… constricted, mood appears dysthymic. Thought process logical, uh, reality testing intact. No… uh… hallucinations or delusions. Insight is fair. Judgment is fair. Plan is to continue current medications. Follow up in 4 weeks. Consider increasing Mirtazapine if sleep and appetite do not improve. Encourage continued therapy.”`,
      AIGeneratedNote: {
        patient: '42-year-old male',
        visit: 'Follow-up for Major Depressive Disorder (MDD), recurrent, severe, and Generalized Anxiety Disorder (GAD).',
        subjective: `Patient reports mood as approximately "3 out of 10". Continues to experience significant anhedonia, low energy, and hypersomnia. Reports some passive suicidal ideation (SI) but denies active intent, plan, or access to means. Denies homicidal ideation (HI). Appetite is decreased. Current medications include Escitalopram 20mg daily. Mirtazapine 15mg added approximately 3 weeks ago for sleep and appetite; patient feels it might be slightly helping sleep but still feels "blah".`,
        objective: `Affect: Constricted. Mood: Dysthymic. Thought Process: Logical. Reality Testing: Intact. Hallucinations/Delusions: Denied. Insight: Fair. Judgment: Fair.`,
        assessment: `Patient continues to experience symptoms of MDD and GAD. Current medication regimen may need adjustment.`,
        plan: `Continue current medications. Follow up in 4 weeks. Consider increasing Mirtazapine if sleep and appetite do not improve. Encourage continued therapy.`,
      },
      title: 'Experience TranscriptX - Effortless Accuracy for Your Psych Notes'
    },
    'Example 4': {
      DoctorDictation: `“Okay, this is for… uh… client Jane Doe, DOB 05/12/1960. Met with her today, post-discharge from General Hospital. Diagnosis… um… exacerbation of COPD and, uh, new onset Type 2 Diabetes. She’s pretty overwhelmed. Lives alone, fixed income, SSI. Her apartment has stairs, making it hard with her breathing. Main concerns: medication management – new insulin, she’s scared of needles – and, like, understanding her diet. Also, she mentioned feeling isolated. We talked about, uh, connecting her with a senior center and a diabetes education program. Her neighbor, Tom, sometimes helps with groceries, but it’s not consistent. We need to set up home health for medication reconciliation and education. And, uh, social work consult for resources, maybe a home safety assessment for the stairs. Follow up in 2 weeks.”`,
      AIGeneratedNote: {
        client: 'Jane Doe',
        dob: '05/12/1960',
        dateOfEncounter: '[Current date, e.g., October 26, 2023]',
        clinicalContextAssessment: `Client seen post-discharge from General Hospital following an exacerbation of Chronic Obstructive Pulmonary Disease (COPD) and a new diagnosis of Type 2 Diabetes Mellitus. Client expresses feeling overwhelmed by new diagnoses and management requirements.`,
        livingSituation: 'Resides alone, fixed income (SSI). Apartment has stairs, which are difficult due to breathing issues.',
        mainConcerns: `Medication management (new insulin, needle phobia), understanding diabetes diet, feeling isolated.`,
        socialSupport: 'Neighbor Tom provides inconsistent grocery help.',
        plan: `Set up home health for medication reconciliation and education (especially for new insulin). Social work consult for resources and potential home safety assessment (due to stairs). Encourage connection with a senior center and diabetes education program. Follow up in 2 weeks.`,
        environmentalBarriers: 'Apartment accessibility is a concern due to stairs, impacting mobility secondary to dyspnea from COPD.', // Added from screenshot
      },
      title: 'Empower Your Advocacy with TranscriptX - Effortless Case Notes, Enhanced Client Outcomes'
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

  // যখন activeExampleTab পরিবর্তন হবে, তখন DoctorDictation ট্যাবে ফিরে আসবে
  useEffect(() => {
    setActiveContentTab('DoctorDictation');
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

  // Button titles and panel headers
  const getLeftButtonTitle = (example) => {
    switch (example) {
      case 'Example 2': return 'Nurse\'s Quick Report';
      case 'Example 3': return 'Psychiatry Dictation';
      case 'Example 4': return 'Case Dictation';
      default: return 'Doctor\'s Dictation';
    }
  };

  const getRightButtonTitle = (example) => {
    switch (example) {
      case 'Example 2': return 'TranscriptX Note';
      case 'Example 3': return 'TranscriptX Note';
      case 'Example 4': return 'TranscriptX Case Note';
      default: return 'TranscriptX Note';
    }
  };

  const getLeftPanelHeader = (example) => {
    switch (example) {
      case 'Example 2': return 'Nurse\'s Quick Report (Simulated Verbal Input/Dotted Notes)';
      case 'Example 3': return 'Your Raw Audio Dictation';
      case 'Example 4': return 'Raw Dictation: Client Follow-up';
      default: return 'Doctor\'s Dictation (Audio Input Simulation)';
    }
  };

  const getRightPanelHeader = (example) => {
    switch (example) {
      case 'Example 2': return 'TranscriptX - AI-Structured Nursing Note/Handover';
      case 'Example 3': return 'TranscriptX Accurate Transcription';
      case 'Example 4': return 'TranscriptX Enhanced Case Note';
      default: return 'TranscriptX - AI-Generated Note';
    }
  };

  const getLeftSecondaryLabel = (example) => {
    switch (example) {
      case 'Example 2': return 'Simulated Verbal/Notes';
      case 'Example 3': return 'Your Raw Audio';
      case 'Example 4': return 'Raw Audio';
      default: return 'Audio Input';
    }
  };

  const getRightSecondaryLabel = (example) => {
    switch (example) {
      case 'Example 2': return 'AI-Structured Nursing Note/Handover';
      case 'Example 3': return 'Accurate Transcription';
      case 'Example 4': return 'Enhanced Case Note';
      default: return 'AI-Generated Output';
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-4">{currentDemo.title}</h3>

      {/* Dynamic Tabs/Buttons */}
      <div className="flex justify-center space-x-4 mb-6 flex-wrap">
        <button
          className={`px-6 py-2 rounded-md font-medium transition-colors duration-300 ${
            activeContentTab === 'DoctorDictation'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setActiveContentTab('DoctorDictation')}
        >
          {getLeftButtonTitle(activeExampleTab)}
        </button>
        <span className="text-gray-400 text-sm flex items-center ml-2">
          {getLeftSecondaryLabel(activeExampleTab)}
        </span>
        <button
          className={`px-6 py-2 rounded-md font-medium transition-colors duration-300 ${
            activeContentTab === 'AIGeneratedNote'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setActiveContentTab('AIGeneratedNote')}
        >
          {getRightButtonTitle(activeExampleTab)}
        </button>
        <span className="text-gray-400 text-sm flex items-center ml-2">
          {getRightSecondaryLabel(activeExampleTab)}
        </span>
      </div>

      {/* Content Display Area - Both panels are always rendered side-by-side and resizable */}
      <div ref={containerRef} className="flex flex-col md:flex-row h-96">
        {/* Left Panel */}
        <div
          className="bg-gray-700 p-4 rounded-l-md overflow-y-auto"
          style={{ flexBasis: `${leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}
        >
          <h4 className="font-semibold text-blue-300 mb-2">{getLeftPanelHeader(activeExampleTab)}</h4>
          <p className="text-gray-200 whitespace-pre-wrap">{currentDemo.DoctorDictation}</p>
        </div>

        {/* Resizer */}
        <div
          className="relative w-2 bg-gray-600 cursor-ew-resize flex-shrink-0 group" // Added 'relative' and 'group'
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
          <h4 className="font-semibold text-blue-300 mb-2">{getRightPanelHeader(activeExampleTab)}</h4>
          <div className="text-gray-200">
            {Object.entries(currentDemo.AIGeneratedNote).map(([key, value]) => (
              <p key={key} className="mt-2">
                <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}: </strong>
                {typeof value === 'object' ? JSON.stringify(value) : value} {/* Ensure complex objects are stringified */}
              </p>
            ))}
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

export default TranscriptXContent;