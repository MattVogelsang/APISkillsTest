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
import { useFedSkillsApi } from './hooks/useFedSkillsApi';
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
  const { data: patients, loading, error } = useFedSkillsApi();
  const [patient, setPatient] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (patients && patients.length > 0) {
      let jessica = null;
      for (let i = 0; i < patients.length; i++) {
        const p = patients[i];
        const name = (p.name || '').toLowerCase();
        if (name.includes('jessica') && name.includes('taylor')) {
          jessica = p;
          break;
        }
      }

      if (jessica) {
        setPatient(jessica);
      }
    }
  }, [patients]);

  useEffect(() => {
    if (patient) {
      const history = patient.diagnosis_history;
      if (history && history.length > 0) {
        setChartData(processChartData(history));
      } else {
        setChartData(createDefaultChart());
      }
    }
  }, [patient]);

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
