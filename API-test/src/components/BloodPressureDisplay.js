function BloodPressureDisplay() {
  return (
    <div className="blood-pressure-display">
      <div className="bp-systolic">
        <div className="bp-label">
          <span className="bp-dot systolic-dot"></span>
          Systolic
        </div>
        <div className="bp-value">120</div>
        <div className="bp-status">Higher than average</div>
      </div>
      <div className="bp-diastolic">
        <div className="bp-label">
          <span className="bp-dot diastolic-dot"></span>
          Diastolic
        </div>
        <div className="bp-value">80</div>
      </div>
    </div>
  );
}

export default BloodPressureDisplay;

