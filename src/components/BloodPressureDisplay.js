function BloodPressureDisplay() {
  return (
    <div className="blood-pressure-display">
      <div className="bp-systolic">
        <div className="bp-label">
          <span className="bp-dot systolic-dot"></span>
          Systolic
        </div>
        <div className="bp-value">120</div>
        <div className="bp-status">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="bp-status-icon">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
          Higher than Average
        </div>
      </div>
      <div className="bp-diastolic">
        <div className="bp-label">
          <span className="bp-dot diastolic-dot"></span>
          Diastolic
        </div>
        <div className="bp-value">80</div>
        <div className="bp-status">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="bp-status-icon">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          Lower than Average
        </div>
      </div>
    </div>
  );
}

export default BloodPressureDisplay;
