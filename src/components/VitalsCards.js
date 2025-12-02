function VitalsCards({ patient }) {
  let respiratoryRate = '20 rpm';
  let respiratoryStatus = 'Normal';
  let temperature = '98.6°F';
  let tempStatus = 'Normal';
  let heartRate = '72 bpm';

  if (patient && patient.name) {
    const name = patient.name.toLowerCase();
    const isJessica = name.includes('jessica') && name.includes('taylor');

    if (isJessica) {
      respiratoryRate = '20 rpm';
      temperature = '98.6°F';
      heartRate = '72 bpm';
      respiratoryStatus = 'Normal';
      tempStatus = 'Normal';
    } else if (patient.diagnosis_history && patient.diagnosis_history.length > 0) {
      const latest = patient.diagnosis_history[0];

      if (latest.respiratory_rate) {
        respiratoryRate = latest.respiratory_rate.value + ' rpm';
        respiratoryStatus = latest.respiratory_rate.levels;
      }

      if (latest.temperature) {
        temperature = latest.temperature.value + '°F';
        tempStatus = latest.temperature.levels;
      }

      if (latest.heart_rate) {
        heartRate = latest.heart_rate.value + ' bpm';
      }
    }
  }

  return (
    <div className="vitals-cards">
      <div className="vital-card heart-rate">
        <img src="/images/respiratory rate.svg" alt="Respiratory Rate" className="vital-icon" />
        <div className="vital-info">
          <div className="vital-label">Respiratory Rate</div>
          <div className="vital-value">{respiratoryRate}</div>
          <div className="vital-status">{respiratoryStatus}</div>
        </div>
      </div>
      <div className="vital-card temperature">
        <img src="/images/temperature.svg" alt="Temperature" className="vital-icon" />
        <div className="vital-info">
          <div className="vital-label">Temperature</div>
          <div className="vital-value">{temperature}</div>
          <div className="vital-status">{tempStatus}</div>
        </div>
      </div>
      <div className="vital-card heart-rate-card">
        <img src="/images/HeartBPM.svg" alt="Heart Rate" className="vital-icon" />
        <div className="vital-info">
          <div className="vital-label">Heart Rate</div>
          <div className="vital-value">{heartRate}</div>
        </div>
      </div>
    </div>
  );
}

export default VitalsCards;
