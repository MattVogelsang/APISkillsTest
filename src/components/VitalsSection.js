import BloodPressureChart from './BloodPressureChart';
import BloodPressureDisplay from './BloodPressureDisplay';
import VitalsCards from './VitalsCards';

function VitalsSection({ chartData, timeRange, onTimeRangeChange, patient }) {
  return (
    <section className="vitals-section">
      <div className="vitals-header">
        <h3 className="vitals-title">Diagnosis History</h3>
      </div>

      <div className="blood-pressure-container">
        <div className="blood-pressure-header">
          <h4 className="blood-pressure-title">Blood Pressure</h4>
          <select
            className="time-range-select"
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
          >
            <option>Last 6 months</option>
            <option>Last year</option>
            <option>Last 2 years</option>
          </select>
        </div>

        <div className="chart-wrapper">
          <div className="chart-container">
            <BloodPressureChart chartData={chartData} />
          </div>
          <BloodPressureDisplay />
        </div>
      </div>

      <VitalsCards patient={patient} />
    </section>
  );
}

export default VitalsSection;
