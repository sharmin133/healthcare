import React, { useState, useEffect, useRef, useCallback } from 'react';

const ValidifyContent = ({ activeExampleTab, onExampleChange }) => {
  const [activeContentTab, setActiveContentTab] = useState('ClinicalDocumentation');
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

  // All demo content directly copied from Screenshots 451, 452, 453, 454
  const allDemoContent = {
    'Example 1': { // Screenshot (451).jpg
      ClinicalDocumentation: {
        type: 'Clinical Documentation',
        content: `Patient: John Smith, DOB: 03/15/1968. Encounter Date: 10/26/2023.

Chief Complaint:
Chest pain, shortness of breath.

History of Present Illness:
Patient experiencing intermittent chest pain for the past 3 days, described as a pressure-like sensation radiating to the left arm. Also reports shortness of breath, especially with exertion. No fever, cough, or leg swelling.

Past Medical History:`
      },
      ValidifyAnalysis: {
        initialReview: `Patient: John Smith, DOB: 03/15/1968 Encounter Date: 10/26/2023`,
        potentialICD10CMCodes: `RO7.9 Chest pain, unspecified
R06.02 Shortness of breath
I10 Essential (primary) hypertension
E11.9 Type 2 diabetes mellitus without complications
E78.5 Hyperlipidemia, unspecified`,
       
      },
      title: 'Discover Validify - Optimize Chart Reviews for Compliance & Accuracy (use case)',
    },
    'Example 2': { 
      ClinicalDocumentation: {
        type: 'Clinical Documentation',
        content: `Operative Report
Patient: Jane Doe, DOB: 06/10/1972. Date of Surgery: 11/15/2023
Pre-oprative Diagnosis: Cholecystitis Post-operative
Diagnosis: Same (Cholecystitis)
Procedure: Laparoscopic Cholecystectomy
Surgeon: Dr. Smith Assistant: Dr. Jones
Anesthesia: General

Findings:`
      },
      ValidifyAnalysis: {
        initialReview: `Patient: Jane Doe, DOB: 06/10/1972 Date of Surgery: 11/15/2023`,
        potentialICD10CMCodes: `K81.9 Cholecystitis, unspecified - Query for acute vs.
chronic if not specified elsewhere in the record.`,
        potentialCPTCodes: `47562 Laparoscopy, surgical; cholecystectomy`,
      },
      title: 'Discover Validify - Optimize Chart Reviews for Compliance & Accuracy (surgical use case)',
    },
    'Example 3': { // Screenshot (453).jpg
      ClinicalDocumentation: {
        type: 'Clinical Documentation',
        content: `Patient: Sarah Miller, DOB: 04/22/1988. Date of Service:
11/16/2023

Chief Complaint:
Anxiety and depressed mood.
Session Type: Individual Psychotherapy, 60 minutes
Presenting Problem:
Ms. Miller reports feeling overwhelmed by work and
relationship stressors. She states she has been
experiencing increased anxiety, difficulty sleeping, and a
persistent low mood for the past month. Post-operative Diagnosis: While "same" is indicated, it's best practice to restate the post-operative diagnosis for clarity. Ensure the post-operative diagnosis accurately reflects the findings (e.g., if gangrenous cholecystitis was found, the post-op diagnosis should reflect that).
Specificity of Cholecystitis: The ICD-10-CM code K81.9 is "unspecified." The documentation needs to clarify if the cholecystitis was acute or chronic. Query the surgeon for clarification.
Adhesions: The presence of adhesions is noted. If adhesiolysis (removal of adhesions) added significant time and effort to the procedure, consider if additional CPT code 47561(Laparoscopy, surgical; with cholecystectomy with exploration of common duct) should be reported.
Description of Procedure Detail: The operative description is very brief. It lacks detail regarding the method of gallbladder dissection (e.g., blunt dissection, electrocautery). It does not specify the type of clips used (e.g., titanium, absorbable). It doesn't mention any irrigation of the surgical site. Insufficient to differentiate 47562 vs 47563 (Cholecystectomy with cholangiography)
Specimen to Pathology: The pathology report should be reviewed to confirm the diagnosis and identify any incidental findings.
Closure: "Skin closed with staples" is acceptable but could be more specific (e.g., number of staples, type of closure – single layer, etc.).
EBL: While "minimal" is stated, quantifying the estimated blood loss (e.g., "EBL < 25mL") is preferred.
Assistant Surgeon: Dr. Jones assisted. Determine if assistant surgeon documentation supports billing for an assistant at surgery.
Documentation Deficiencies: Very little is documented, which could cause medical necessity concerns
Potential Missing Information:
Pre-operative lab values or imaging results that led to the decision for surgery.
Details of any intraoperative complications or difficulties encountered.
Drains placed (if any).
Post-operative instructions given to the patient.She reports`
      },
      ValidifyAnalysis: {
        initialReview: `Patient: Sarah Miller, DOB: 04/22/1988 Date of Service:
11/16/2023`,
        potentialICD10CMCodes: `F41.1 Generalized Anxiety Disorder
F32.9 Major Depressive Disorder, Single Episode,
Unspecified - Query if severity can be specified (e.g.,
mild, moderate, severe) based on clinical assessment. Patient states, "I'm having trouble breathing."

Reports pain level of 3/10 in chest with coughing.

Intervention:
Administered Oxygen 2L via nasal cannula as ordered.
Assisted with coughing and deep breathing exercises.
Encouraged increased fluid intake.
Administered scheduled medications: Ceftriaxone 1g IV and Azithromycin 500mg PO.
Documented sputum characteristics.
Plan:
Continue to monitor vital signs and respiratory status.
Administer medications as ordered.
Encourage coughing and deep breathing.
Notify MD if increased respiratory distress or change in condition.`,
        potentialCPTCodes: `Potential CPT Codes (Based on Documentation -
Requires Confirmation):` 
      },
      title: 'Discover Validify - Optimize Chart Reviews for Compliance & Accuracy (Psychologist Use case)',
    },
    'Example 4': { // Screenshot (454).jpg
      ClinicalDocumentation: {
        type: 'Clinical Documentation',
        content: `Patient: Robert Jones, DOB: 07/04/1955. Date: 11/17/2023
Time: 14:00
Shift: Day Shift (07:00-19:00)
Reason for Admission: Pneumonia
Current Complaint: Cough, shortness of breath
Objective:
VS: T 99.8F, HR 102, RR 24, BP 130/80, SpO2 92% on 2L
O2 via nasal cannula.
Lungs: Crackles auscultated bilaterally.`
      },
      ValidifyAnalysis: {
        initialReview: `Patient: Robert Jones, DOB: 07/04/1955 Date/Time:
11/17/2023 14:00`,
        potentialICD10CMCodes: `J18.9 Pneumonia, unspecified organism`,
        potentialCPTCodes: `99218-99220 (Initial Hospital Inpatient Care) - If this is
an initial assessment upon admission, review
documentation to determine appropriate level.Specificity of Pneumonia: J18.9 is an "unspecified" code. Review physician documentation and lab results (e.g., sputum culture) to determine if a more specific organism can be identified for coding (e.g., Streptococcus pneumoniae, Haemophilus influenzae).
Oxygen Saturation: SpO2 of 92% on 2L is below target for many patients. Monitor closely and document response to oxygen therapy. Note any changes in oxygen requirements.
Pain Assessment: A pain level of 3/10 is reported. Document the characteristics of the pain (e.g., sharp, dull, aching) and any interventions provided for pain relief.
Sputum Color: Yellow sputum suggests possible infection. Ensure sputum culture has been ordered and results are documented. Note any changes in sputum color or consistency.
Medication Administration: Ensure accurate documentation of medication administration, including: Route of Administration: Clearly document the route for each medication (IV for Ceftriaxone, PO for Azithromycin). Site of Injection (for IV medications): Document the location of the IV site. Patient Response: Document the patient's response to the medications (e.g., any adverse reactions or improvement in symptoms).
MD Notification Criteria: The plan includes notifying the MD "if increased respiratory distress or change in condition." Be specific about what constitutes "increased respiratory distress" (e.g., SpO2 < 90% on 2L, increased work of breathing).
Nursing Interventions: Encourage ambulation as tolerated (unless contraindicated) to promote lung expansion and prevent complications. Document ambulation status.
Potential Missing Information:
Allergies and reaction (or "No Known Allergies").
Detailed assessment of cough (frequency, timing).
Assessment of patient's ability to perform coughing and deep breathing exercises effectively.
Dietary intake and tolerance.
Bowel and bladder function.
Review plan of care with patient
Disclaimer:
The information provided by Validify is for assistance only. It is based on the provided text and current coding/compliance guidelines. All suggestions and assessments must be reviewed and validated by a qualified medical coding professional and/or clinician. Validify's output should not be considered definitive and does not replace the need for professional human judgment.`,
      },
      title: 'Validify - Nurse Case Use Example',
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
    setActiveContentTab('ClinicalDocumentation'); // Default to ClinicalDocumentation for Validify
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

  
  const getLeftButtonTitle = () => {
    return currentDemo.ClinicalDocumentation.type;
  };

  const getRightButtonTitle = () => {
    return 'Validify Analysis'; // Consistent for all Validify examples
  };

  const getLeftPanelHeader = () => {
    return `Original ${currentDemo.ClinicalDocumentation.type} (Nurse Case use)`; // Modified to match screenshot (454).jpg
  };

  const getRightPanelHeader = () => {
    return `Validify Analysis & Recommendations`; // Consistent for all Validify examples
  };

  const getLeftSecondaryLabel = () => {
    // This part varies based on screenshot, 'Original' for Ex1, 'Original (Nurse case use)' for Ex4
    if (activeExampleTab === 'Example 4') {
        return 'Original (Nurse case use)';
    }
    return 'Original';
  };

  const getRightSecondaryLabel = () => {
    return 'Recommendations';
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">{currentDemo.title}</h3>

      <div ref={containerRef} className="flex flex-col md:flex-row h-96">

        {/* Left Panel - Clinical Documentation */}
        <div
          className="bg-gray-950 p-4 rounded-l-md overflow-y-auto"
          style={{ flexBasis: `${leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}
        >

             <div className="sticky top-0 z-10 ">
          <div className='flex justify-between text-center mb-3 border-b border-gray-700'>
            <div className={`px-6 py-2 text-blue-600 rounded-md font-medium transition-colors duration-300 ${
              activeContentTab === 'ClinicalDocumentation' ? 'bg-gray-700' : ''
            }`}
              onClick={() => setActiveContentTab('ClinicalDocumentation')}
            >
              {getLeftButtonTitle(activeExampleTab)}
            </div>
            <div className="text-blue-400 ml-2">
              {getLeftSecondaryLabel(activeExampleTab)}
            </div>
          </div>
          </div>

          <div> <h4 className="py-3 font-semibold text-xl border-b border-gray-700 mb-2">{getLeftPanelHeader(activeExampleTab)}</h4></div>
          <div><pre className="text-gray-200 whitespace-pre-wrap">{currentDemo.ClinicalDocumentation.content}</pre></div>
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

        {/* Right Panel - Validify Analysis */}
        <div
          className="bg-gray-950 p-4 rounded-r-md overflow-y-auto"
          style={{ flexBasis: `${100 - leftPanelWidth}%`, flexGrow: 0, flexShrink: 0 }}>


          <div className="sticky top-0 z-10 ">
          <div className='flex justify-between text-center mb-3 py-2 border-b border-gray-700'>
            <div className={`px-6 text-yellow-600 rounded-md font-medium transition-colors duration-300 ${
              activeContentTab === 'ValidifyAnalysis' ? 'bg-gray-700' : ''
            }`}
              onClick={() => setActiveContentTab('ValidifyAnalysis')}
            >
              {getRightButtonTitle(activeExampleTab)}
            </div>
            <div className="text-yellow-600 text-sm flex items-center ml-2">
              {getRightSecondaryLabel(activeExampleTab)}
            </div>
          </div>
          </div>

          <div><h4 className="font-semibold border-b py-3 border-gray-700 text-xl mb-4">{getRightPanelHeader(activeExampleTab)}</h4></div>
          <div className="text-gray-200">
            {Object.entries(currentDemo.ValidifyAnalysis).map(([key, value]) => (
              <p key={key} className="mt-2">
                <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}: </strong>
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

export default ValidifyContent;