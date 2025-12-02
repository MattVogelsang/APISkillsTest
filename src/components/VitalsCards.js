function VitalsCards() {
  return (
    <div className="vitals-cards">
      <div className="vital-card heart-rate">
        <img src="/images/respiratory rate.svg" alt="Respiratory Rate" className="vital-icon" />
        <div className="vital-info">
          <div className="vital-label">Respiratory Rate</div>
          <div className="vital-value">72 bpm</div>
          <div className="vital-status">Normal</div>
        </div>
      </div>
      <div className="vital-card temperature">
        <img src="/images/temperature.svg" alt="Temperature" className="vital-icon" />
        <div className="vital-info">
          <div className="vital-label">Temperature</div>
          <div className="vital-value">98.6°F</div>
          <div className="vital-status">Normal</div>
        </div>
      </div>
      <div className="vital-card heart-rate-card">
        <img src="/images/HeartBPM.svg" alt="Heart Rate" className="vital-icon" />
        <div className="vital-info">
          <div className="vital-label">Heart Rate</div>
          <div className="vital-value">72</div>
        </div>
      </div>
    </div>
  );
}

export default VitalsCards;

