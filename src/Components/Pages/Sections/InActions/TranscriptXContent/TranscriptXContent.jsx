import React, { useState, useEffect, useRef, useCallback } from 'react';

const TranscriptXContent = ({ activeExampleTab, onExampleChange }) => {
  const [activeContentTab, setActiveContentTab] = useState('DoctorDictation');
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
      DoctorDictation: `"Okay, uh, patient is Sarah Chen, DOB 3/22/1978. Seen today, October 26th, 2023. Chief complaint... uh... right knee pain, ongoing for about 3 months, worse with activity, especially stairs. Subjective: Patient describes the pain as a dull ache, located medially. Rates it a 6/10 currently, can go up to 8/10 after exercise. Some morning stiffness, lasts maybe 15 minutes. No significant swelling reported, denies locking or giving way. Uh... tried over-the-counter Ibuprofen with some partial relief. No history of trauma. Otherwise healthy. Objective: Gait is non-antalgic. Right knee exam: No effusion visible. Mild tenderness to palpation over the medial joint line. McMurray's test is negative. Lachman and drawer tests stable. Range of motion is full, though terminal flexion elicits some discomfort medially. Assessment: Likely medial compartment osteoarthritis of the right knee. Differential includes medial meniscus tear, although less likely given exam findings. Plan: Uh... Obtain bilateral weight-bearing knee X-rays. Recommend continued NSAID use as needed, consider switching to Naproxen. Discussed physical therapy options for strengthening quadriceps and hamstrings. Also discussed... lifestyle modifications, weight management if applicable... oh, patient's BMI is 24, so that's fine. Follow up in 4 weeks with X-ray results to discuss further management, possibly including corticosteroid injection or referral to orthopedics if symptoms persist. End dictation."`,
      AIGeneratedNote: {
        patient: 'Sarah Chen',
        dob: '03/22/1978',
        dateOfService: 'October 26, 2023',
        chiefComplaint: 'Right knee pain x 3 months.',
        subjective: ` Patient reports right knee pain ongoing for approximately 3 months, described as a dull ache located medially. Pain worsens with activity, particularly stair climbing. Pain rated 6/10 currently, increasing to 8/10 post-exercise. Reports approximately 15 minutes of morning stiffness. Denies significant swelling, locking, or episodes of giving way. Partial relief noted with over-the-counter ibuprofen. No history of trauma. Patient is otherwise healthy.`,
        objective: `Gait: Non-antalgic. Right Knee Exam: No visible effusion. Mild tenderness to palpation over the medial joint line. McMurray's test is negative. Lachman and drawer tests stable. Range of motion is full, though terminal flexion elicits some discomfort medially.ait: Non-antalgic. Right Knee Exam: No visible effusion. Mild tenderness to palpation over the medial joint line. McMurray's test is negative. Lachman and drawer tests stable. Range of motion is full, though terminal flexion elicits some discomfort medially.`,
        assessment: ` Likely medial compartment osteoarthritis of the right knee. Differential includes medial meniscus tear, although less likely given exam findings.`,
        plan: `Order bilateral weight-bearing knee X-rays (AP, lateral, sunrise views).
Recommend continued PRN NSAID use (consider trial of Naproxen 500mg BID PRN).
Discussed referral for Physical Therapy focusing on quadriceps/hamstring strengthening.
Discussed lifestyle modifications.
Follow up in 4 weeks to review X-ray results and clinical progress. Consider intra-articular corticosteroid injection or orthopedic referral if symptoms persist or worsen.`,
      },
      title: 'Experience TranscriptX - Effortless, Accurate Medical Transcription'
    },
    'Example 2': {
      DoctorDictation: `"Alright, handover for Bed 7, uh, Mrs. Gable, 72F, brought in by EMS, syncopal episode at home. Witnessed by husband, slumped in chair, maybe 30 seconds LOC? GCS 15 on arrival. Hx of HTN, Afib on Eliquis. Vitals: BP 105/60, HR 115 irreg, RR 20, SpO2 94% RA, Temp 37.1. Put her on the monitor, she's in Afib RVR. Got an 18g IV L AC, labs drawn - CBC, CMP, Trop, Coags sent stat. EKG done, showed Afib RVR, no acute ST changes noted. Portable chest X-ray ordered. Gave a 500cc NS bolus, BP now 115/65, HR down to 105. Still awake, alert, denies CP, SOB. Neuro checks grossly normal. Waiting on lab results and CXR read. Dr. Evans aware, considering diltiazem drip maybe? Keep a close eye on her pressure and rhythm."`,
      AIGeneratedNote: {
        patient: 'Gable, [First Name Redacted]',
        ageSex: '72-year-old female (72F)',
        location: 'ED Bed 7',
        arrival: 'Via EMS',
        presentingComplaint: 'Syncopal episode at home.',
        history: `Witnessed syncopal episode (approx. 30 seconds loss of consciousness) reported by husband. Past Medical History (PMH) significant for Hypertension (HTN) and Atrial Fibrillation (Afib), prescribed Eliquis.`,
        pastMedicalHistory: 'Hypertension (HTN), Atrial Fibrillation (Afib) on Eliquis.',
        vitals: 'BP 105/60 (now 115/65 post-bolus), HR 115 irregular (now 105 post-bolus), RR 20, SpO2 94% RA, Temp 37.1.',
        physicalExam: `LOCT GCS 15 on arrival. Awake, alert. Denies chest pain (CP) or shortness of breath (SOB). Neurological exam grossly normal.`,
        interventions: `Placed on cardiac monitor: Confirmed Atrial Fibrillation with Rapid ventricular Response (Afib RVR).
Intravenous Access: 18-gauge IV established in Left Antecubital Fossa (L AC).
Labs Drawn: Complete Blood Count (CBC), Comprehensive Metabolic Panel (CMP), Troponin, Coagulation studies sent STAT.
Diagnostics: 12-lead Electrocardiogram (EKG) performed - showed Afib RVR, no acute ST segment changes. Portable Chest X-ray (CXR) ordered.
Fluid Resuscitation: 500cc Normal Saline (NS) bolus administered intravenously.`,
       
        plan: 'Waiting for lab results and chest X-ray results.',
      },
      title: 'Experience TranscriptX - Accurate Nursing Notes'
    },
    'Example 3': {
      DoctorDictation: `"Okay, uh, patient is a 42-year-old male, uhm, follow-up for... Major Depressive Disorder, recurrent, severe, and GAD. He, uh, reports mood is maybe a '3 out of 10'. Still struggling with... significant anhedonia, low energy... hypersomnia noted. Uhm, some passive SI, but denies active intent, plan, or access... denies HI. Appetite is... decreased. Let's see... Current meds are Escitalopram 20mg daily... added Mirtazapine 15mg at bedtime about, uh, 3 weeks ago for sleep and appetite. Patient feels the Mirtazapine might be helping sleep slightly? But still feels quite... 'blah', his words. Affect... constricted, mood appears dysthymic. Thought process logical, uh, reality testing intact. No AVH. We discussed, uhm... maybe augmenting with Bupropion for energy and motivation? Or... increasing the Mirtazapine? Patient prefers to wait... see how current regimen settles. Okay... Plan is... continue Escitalopram 20mg daily, continue Mirtazapine 15mg QHS. Reinforce coping skills, uh, safety plan reviewed. Return to clinic... uh... 4 weeks. Okay, done."`,
      AIGeneratedNote: {
        patient: '42-year-old male',
        visit: 'Follow-up for Major Depressive Disorder (MDD), recurrent, severe, and Generalized Anxiety Disorder (GAD).',
        subjective: `Patient reports mood as approximately "3 out of 10". Continues to experience significant anhedonia, low energy, and hypersomnia. Reports some passive suicidal ideation (SI) but denies active intent, plan, or access to means. Denies homicidal ideation (HI). Appetite is decreased. Current medications include Escitalopram 20mg daily and Mirtazapine 15mg at bedtime (QHS), initiated approximately 3 weeks ago for sleep and appetite. Patient states Mirtazapine may be slightly improving sleep but describes overall feeling as "blah".`,
        assessment: `Affect appears constricted. Mood appears dysthymic. Thought process is logical and reality testing is intact. Denies auditory or visual hallucinations (AVH)..`,
        plan: `Discussed potential augmentation strategies, including adding Bupropion for energy and motivation or increasing the Mirtazapine dose. Patient prefers to continue the current regimen to allow more time for therapeutic effect.

Continue Escitalopram 20mg PO daily.
Continue Mirtazapine 15mg PO QHS.
Reinforced coping skills.
Safety plan reviewed and remains in place.
Return to clinic (RTC) in 4 weeks for reassessment.`,
      },
      title: 'Experience TranscriptX - Effortless Accuracy for Your Psych Notes'
    },
    'Example 4': {
      DoctorDictation: `"Okay, this is for... uh... client file, Jane Doe, DOB 05/12/1960. Met with her today, post-discharge from General Hospital. Diagnosis... um... exacerbation of COPD and, uh, new onset Type 2 Diabetes. She's pretty overwhelmed. Lives alone, fixed income, SSI. Her apartment has stairs, making it hard with her breathing. Main concerns: medication management – new insulin, she's scared of needles – and, like, understanding her diet. Also, she mentioned feeling isolated. We talked about, um, connecting her with a senior center and a diabetes education program. Her neighbor, Tom, sometimes helps with groceries, but it's not consistent. Need to follow up on: 1) Home health referral for med setup and diabetes teaching. 2) Durable Medical Equipment – get that walker approved. 3) Arrange transport for next clinic visit. 4) Explore, uh, food assistance programs, like Meals on Wheels. She also needs... emotional support, definitely. Seems a bit depressed. Will check in again Friday. Oh, and her pharmacy is ValueCare."`,
      AIGeneratedNote: {
        client: 'Jane Doe',
        dob: '05/12/1960',
        dateOfEncounter: '[Current date, e.g., October 26, 2023]',
        clinicalContextAssessment: `Client seen post-discharge from General Hospital following an exacerbation of Chronic Obstructive Pulmonary Disease (COPD) and a new diagnosis of Type 2 Diabetes Mellitus. Client expresses feeling overwhelmed by new diagnoses and management requirements.`,
        livingSituation: 'Resides alone, fixed income (SSI). Apartment has stairs, which are difficult due to breathing issues.',
        mainConcerns: `Medication management (new insulin, needle phobia), understanding diabetes diet, feeling isolated.`,
        socialSupport: 'Neighbor Tom provides inconsistent grocery help.',
        plan: `Home Health Services: Initiate referral for home health nursing for medication reconciliation, insulin administration training, and comprehensive diabetes education.
Durable Medical Equipment (DME): Facilitate request and authorization for a walker.
Transportation: Arrange non-emergency medical transportation for the next clinic visit.
Nutritional Support: Explore eligibility and assist with application for food assistance programs (e.g., Meals on Wheels, SNAP).
Community Integration: Provide referrals and facilitate connection to a local senior center and a diabetes support/education program.
Follow-Up: Schedule follow-up contact with client by Friday to assess progress and provide ongoing support.
Pharmacy Coordination: Note: Client's preferred pharmacy is ValueCare for future medication-related coordination.`,
        environmentalBarriers: 'Apartment accessibility is a concern due to stairs, impacting mobility secondary to dyspnea from COPD.', // Added from screenshot
      },
      title: 'Empower Your Advocacy with TranscriptX - Effortless Case Notes, Enhanced Client Outcomes'
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
    setActiveContentTab('DoctorDictation');
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
      <h3 className="text-xl font-bold text-white mb-4">{currentDemo.title}</h3>



      <div ref={containerRef} className="flex flex-col md:flex-row   h-96">
      
        <div
          className="bg-gray-950 p-4 rounded-l-md overflow-y-auto"
          style={{ flexBasis: `${leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}
        >
<div className="sticky top-0 z-10 ">
  <div className="flex justify-between text-center mb-3 border-b border-gray-700 px-4 py-2">
    <div
      className={`px-6 py-2 text-blue-600 rounded-md font-medium transition-colors duration-300 ${
        activeContentTab === 'DoctorDictation' ? 'bg-blue-100 dark:bg-gray-800' : ''
      }`}
      onClick={() => setActiveContentTab('DoctorDictation')}
    >
      {getLeftButtonTitle(activeExampleTab)}
    </div>
    <div className="text-blue-400 ml-2">
      {getLeftSecondaryLabel(activeExampleTab)}
    </div>
  </div>
</div>
  
         <div> <h4 className=" py-3 font-semibold border-b border-gray-700  text-xl mb-2">{getLeftPanelHeader(activeExampleTab)}</h4></div>
          <div><p className="text-gray-200 whitespace-pre-wrap">{currentDemo.DoctorDictation}</p></div>
        </div>

   
        <div
          className="relative w-2 bg-gray-600 cursor-ew-resize flex-shrink-0 group" 
          onMouseDown={handleMouseDown}
        >

          
  
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-gray-500 group-hover:bg-blue-400 transition-colors duration-200"></div>
       
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center border border-gray-500 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors duration-200">
            <svg className="w-3 h-3 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 4h4v16h-4zM6 7h2v10H6zM16 7h2v10h-2z"/>
            </svg>
          </div>
        </div>



        <div
          className="bg-gray-950 p-4 rounded-r-md overflow-y-auto"
          style={{ flexBasis: `${100 - leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}>
<div className="sticky top-0 z-10 ">
<div className='flex justify-between text-center mb-3 py-2 border-b border-gray-700'> 
  <div className={`px-6  text-yellow-600 rounded-md font-medium transition-colors duration-300 ${
            activeContentTab === 'AIGeneratedNote'
              }`}
          onClick={() => setActiveContentTab('AIGeneratedNote')}
        >
          {getRightButtonTitle(activeExampleTab)}
        </div>
        <div className="text-yellow-600 text-sm flex items-center ml-2">
          {getRightSecondaryLabel(activeExampleTab)}
        </div> </div>
          </div>


       <div><h4 className="font-semibold border-b py-3  border-gray-700 text-xl mb-4">{getRightPanelHeader(activeExampleTab)}</h4></div>
          <div className="text-gray-200">
            {Object.entries(currentDemo.AIGeneratedNote).map(([key, value]) => (
              <p key={key} className="mt-2">
                <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}: </strong>
                {typeof value === 'object' ? JSON.stringify(value) : value} 
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

export default TranscriptXContent;

