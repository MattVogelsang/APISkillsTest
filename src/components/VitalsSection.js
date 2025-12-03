import BloodPressureChart from './BloodPressureChart';
import BloodPressureDisplay from './BloodPressureDisplay';
import VitalsCards from './VitalsCards';

function VitalsSection({ chartData, patient }) {
  return (
    <div className="vitals-section">
      <div className="vitals-header">
        <h3 className="vitals-title">Diagnosis History</h3>
      </div>

      <div className="blood-pressure-container">
        <div className="chart-wrapper">
          <div className="blood-pressure-header">
            <h4 className="blood-pressure-title">Blood Pressure</h4>
            <select className="time-range-select">
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="chart-content-wrapper">
            <div className="chart-container">
              <BloodPressureChart key={patient ? patient.name : 'default'} chartData={chartData} />
            </div>
            <BloodPressureDisplay patient={patient} />
          </div>
        </div>
      </div>

      <VitalsCards patient={patient} />
    </div>
  );
}

export default VitalsSection;
