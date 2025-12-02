function LabResults() {
  const labResults = [
    'Blood Tests',
    'CT Scans',
    'Radiology Reports',
    'X-rays',
    'Urine Test'
  ];

  return (
    <section className="lab-results-section">
      <h3 className="lab-results-title">Lab Results</h3>
      <div className="lab-results-content">
        {labResults.map((result, index) => (
          <div key={index} className="lab-result-item">
            <span className="lab-result-name">{result}</span>
            <button className="lab-result-download" aria-label={`Download ${result}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LabResults;
