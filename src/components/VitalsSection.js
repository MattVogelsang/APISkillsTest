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
        <div className="blood-pressure-header">
          <h4 className="blood-pressure-title">Blood Pressure</h4>
        </div>

        <div className="chart-wrapper">
          <div className="chart-container">
            <BloodPressureChart key={patient && patient.name ? patient.name : 'default'} chartData={chartData} />
          </div>
          <BloodPressureDisplay patient={patient} />
        </div>
      </div>

      <VitalsCards patient={patient} />
    </div>
  );
}

export default VitalsSection;
