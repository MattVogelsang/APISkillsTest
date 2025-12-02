import { useState, useEffect, useCallback } from 'react';
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { API_URL, USERNAME, PASSWORD } from './utils/constants';
import { getAuthToken } from './utils/helpers';
import { createDefaultChart, processChartData } from './utils/chartUtils';
import Header from './components/Header';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import VitalsSection from './components/VitalsSection';
import DiagnosticList from './components/DiagnosticList';
import PatientCard from './components/PatientCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [patient, setPatient] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('Last 6 months');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const auth = getAuthToken(USERNAME, PASSWORD);
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': 'Basic ' + auth
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      const jessica = data.find(p => {
        const name = (p.name || '').toLowerCase();
        return name.includes('jessica') && name.includes('taylor');
      });

      if (!jessica) {
        throw new Error('Patient not found');
      }

      setPatient(jessica);
      const history = jessica.diagnosis_history;
      setChartData(history && history.length > 0 
        ? processChartData(history) 
        : createDefaultChart()
      );
    } catch (err) {
      setError(err.message);
      setChartData(createDefaultChart());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-layout">
        <main className="content-area">
          {loading && <LoadingState />}
          {error && <ErrorState error={error} />}
          {patient && !loading && (
            <div className="main-content-grid">
              <div className="left-column">
                <VitalsSection 
                  chartData={chartData} 
                  timeRange={timeRange}
                  onTimeRangeChange={setTimeRange}
                />
                <DiagnosticList diagnosticList={patient.diagnostic_list} />
              </div>
              <div className="right-column">
                <PatientCard patient={patient} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
