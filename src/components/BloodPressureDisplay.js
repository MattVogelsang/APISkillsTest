function BloodPressureDisplay({ patient }) {
  let systolic = 120;
  let diastolic = 80;
  let systolicStatus = 'Normal';
  let diastolicStatus = 'Normal';
  let showSystolicUp = false;
  let showSystolicDown = false;
  let showDiastolicUp = false;
  let showDiastolicDown = false;

  if (patient && patient.diagnosis_history && patient.diagnosis_history.length > 0) {
    const latest = patient.diagnosis_history[0];
    if (latest.blood_pressure) {
      const bp = latest.blood_pressure;
      if (bp.systolic) {
        systolic = Math.round(parseFloat(bp.systolic.value || bp.systolic));
      }
      if (bp.diastolic) {
        diastolic = Math.round(parseFloat(bp.diastolic.value || bp.diastolic));
      }
    }

    if (systolic > 120) {
      systolicStatus = 'Higher than Average';
      showSystolicUp = true;
      showSystolicDown = false;
    } else if (systolic < 120) {
      systolicStatus = 'Lower than Average';
      showSystolicUp = false;
      showSystolicDown = true;
    } else {
      systolicStatus = 'Normal';
      showSystolicUp = false;
      showSystolicDown = false;
    }

    if (diastolic > 80) {
      diastolicStatus = 'Higher than Average';
      showDiastolicUp = true;
      showDiastolicDown = false;
    } else if (diastolic < 80) {
      diastolicStatus = 'Lower than Average';
      showDiastolicUp = false;
      showDiastolicDown = true;
    } else {
      diastolicStatus = 'Normal';
      showDiastolicUp = false;
      showDiastolicDown = false;
    }
  }

  return (
    <div className="blood-pressure-display">
      <div className="bp-systolic">
        <div className="bp-label">
          <span className="bp-dot systolic-dot"></span>
          Systolic
        </div>
        <div className="bp-value">{systolic}</div>
        <div className="bp-status">
          {showSystolicUp && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="bp-status-icon">
              <polyline points="18 15 12 9 6 15"/>
            </svg>
          )}
          {showSystolicDown && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="bp-status-icon">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          )}
          {systolicStatus}
        </div>
      </div>
      <div className="bp-diastolic">
        <div className="bp-label">
          <span className="bp-dot diastolic-dot"></span>
          Diastolic
        </div>
        <div className="bp-value">{diastolic}</div>
        <div className="bp-status">
          {showDiastolicUp && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="bp-status-icon">
              <polyline points="18 15 12 9 6 15"/>
            </svg>
          )}
          {showDiastolicDown && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="bp-status-icon">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          )}
          {diastolicStatus}
        </div>
      </div>
    </div>
  );
}

export default BloodPressureDisplay;
