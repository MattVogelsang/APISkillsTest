import { useState, useEffect } from 'react';
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
import PatientsList from './components/PatientsList';
import VitalsSection from './components/VitalsSection';
import DiagnosticList from './components/DiagnosticList';
import PatientCard from './components/PatientCard';
import LabResults from './components/LabResults';

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
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('Last 6 months');

  useEffect(() => {
    async function fetchData() {
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
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format');
        }

        setPatients(data);
        
        let jessica = null;
        for (let i = 0; i < data.length; i++) {
          const p = data[i];
          const name = (p.name || '').toLowerCase();
          if (name.includes('jessica') && name.includes('taylor')) {
            jessica = p;
            break;
          }
        }

        if (!jessica) {
          throw new Error('Patient not found');
        }

        setPatient(jessica);
        const history = jessica.diagnosis_history;
        if (history && history.length > 0) {
          setChartData(processChartData(history));
        } else {
          setChartData(createDefaultChart());
        }
      } catch (err) {
        setError(err.message);
        setChartData(createDefaultChart());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
                <PatientsList 
                  patients={patients}
                  selectedPatient={patient}
                  onSelectPatient={(selectedPatient) => {
                    setPatient(selectedPatient);
                    const history = selectedPatient.diagnosis_history;
                    if (history && history.length > 0) {
                      setChartData(processChartData(history));
                    } else {
                      setChartData(createDefaultChart());
                    }
                  }}
                />
              </div>
              <div className="right-column">
                <div className="right-column-grid">
                  <div className="grid-top-left">
                    <VitalsSection 
                      chartData={chartData} 
                      timeRange={timeRange}
                      onTimeRangeChange={setTimeRange}
                      patient={patient}
                    />
                  </div>
                  <div className="grid-top-right">
                    <PatientCard patient={patient} />
                  </div>
                  <div className="grid-bottom-left">
                    <DiagnosticList diagnosticList={patient.diagnostic_list} />
                  </div>
                  <div className="grid-bottom-right">
                    <LabResults />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
