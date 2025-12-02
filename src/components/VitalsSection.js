import BloodPressureChart from './BloodPressureChart';
import BloodPressureDisplay from './BloodPressureDisplay';
import VitalsCards from './VitalsCards';

function VitalsSection({ chartData, timeRange, onTimeRangeChange }) {
  return (
    <section className="vitals-section">
      <div className="vitals-header">
        <h3 className="vitals-title">Diagnosis History</h3>
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

      <VitalsCards />
    </section>
  );
}

export default VitalsSection;

