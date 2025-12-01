import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const USERNAME = 'coalition';
const PASSWORD = 'skills-test';

function getAuthToken(user, pass) {
  return btoa(user + ':' + pass);
}

function formatDate(dateStr) {
  if (!dateStr || dateStr === 'N/A') return 'N/A';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (e) {
    return dateStr;
  }
}

function calcAge(dob) {
  if (!dob) return 'N/A';
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function App() {
  const [patient, setPatient] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const auth = getAuthToken(USERNAME, PASSWORD);
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + auth,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch: ' + response.status);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format');
      }

      const jessica = data.find(p => {
        const name = (p.name || '').toLowerCase();
        return name.includes('jessica') && name.includes('taylor');
      });

      if (!jessica) {
        throw new Error('Patient not found');
      }

      setPatient(jessica);
      
      if (jessica.diagnosis_history && jessica.diagnosis_history.length > 0) {
        processChartData(jessica.diagnosis_history);
      }
    } catch (err) {
      console.error('fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function processChartData(history) {
    const labels = [];
    const sysValues = [];
    const diaValues = [];

    if (history && history.length > 0) {
      const yearMap = {};
      
      history.forEach(item => {
        const year = item.year;
        const bp = item.blood_pressure;
        
        if (bp && bp.systolic && bp.diastolic) {
          const sys = bp.systolic.value || bp.systolic;
          const dia = bp.diastolic.value || bp.diastolic;
          
          if (sys && dia && year) {
            if (!yearMap[year]) {
              yearMap[year] = { sys: [], dia: [] };
            }
            yearMap[year].sys.push(parseFloat(sys));
            yearMap[year].dia.push(parseFloat(dia));
          }
        }
      });

      const sortedYears = Object.keys(yearMap).sort((a, b) => parseInt(a) - parseInt(b));
      
      sortedYears.forEach(year => {
        const readings = yearMap[year];
        const avgSys = readings.sys.reduce((a, b) => a + b, 0) / readings.sys.length;
        const avgDia = readings.dia.reduce((a, b) => a + b, 0) / readings.dia.length;
        
        labels.push(year);
        sysValues.push(Math.round(avgSys));
        diaValues.push(Math.round(avgDia));
      });
    }

    // fallback data if no history
    if (labels.length === 0) {
      labels.push('2019', '2020', '2021', '2022', '2023', '2024');
      sysValues.push(120, 125, 118, 122, 120, 121);
      diaValues.push(80, 82, 78, 80, 79, 80);
    }

    setChartData({
      labels: labels,
      datasets: [{
        label: 'Systolic (mmHg)',
        data: sysValues,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        tension: 0.4,
        fill: true
      }, {
        label: 'Diastolic (mmHg)',
        data: diaValues,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.4,
        fill: true
      }]
    });
  }

  const getInitials = (name) => {
    if (!name) return 'JT';
    const parts = name.split(' ');
    return parts.map(p => p[0]).join('').toUpperCase();
  };

  const diagnostics = patient?.diagnostic_list || [];
  const conditions = diagnostics.map(d => d.name || d).join(', ') || 'None';

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">HealthCare</h1>
        </div>
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className="nav-item active">
              <button type="button" className="nav-link">
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Dashboard</span>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="nav-link">
                <span className="nav-icon">👥</span>
                <span className="nav-text">Patients</span>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="nav-link">
                <span className="nav-icon">📋</span>
                <span className="nav-text">Appointments</span>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="nav-link">
                <span className="nav-icon">💊</span>
                <span className="nav-text">Medications</span>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="nav-link">
                <span className="nav-icon">📊</span>
                <span className="nav-text">Reports</span>
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="nav-link">
                <span className="nav-icon">⚙️</span>
                <span className="nav-text">Settings</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">JT</div>
            <div className="user-info">
              <p className="user-name">Jessica Taylor</p>
              <p className="user-role">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <h2 className="page-title">Patient Dashboard</h2>
          </div>
          <div className="header-right">
            <div className="search-box">
              <input type="text" placeholder="Search..." className="search-input" disabled />
              <button className="search-btn" disabled>🔍</button>
            </div>
            <button className="settings-btn" disabled>⚙️</button>
          </div>
        </header>

        {loading && (
          <div className="patient-card">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="patient-card">
            <p style={{ color: '#e74c3c' }}>Error Loading Data: {error}</p>
          </div>
        )}

        {patient && !loading && (
          <>
            <section className="patient-info-section">
              <div className="patient-card">
                <div className="patient-header">
                  <div className="patient-avatar-large">
                    <span>{getInitials(patient.name)}</span>
                  </div>
                  <div className="patient-details">
                    <h3 className="patient-name">{patient.name || 'Jessica Taylor'}</h3>
                    <p className="patient-id">Patient: {patient.name || 'Jessica Taylor'}</p>
                    <p className="patient-dob">Date of Birth: {formatDate(patient.date_of_birth)}</p>
                  </div>
                </div>
                <div className="patient-stats">
                  <div className="stat-item">
                    <span className="stat-label">Age</span>
                    <span className="stat-value">{patient.age || (patient.date_of_birth ? calcAge(patient.date_of_birth) : 'N/A')}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Gender</span>
                    <span className="stat-value">{patient.gender || 'N/A'}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Blood Type</span>
                    <span className="stat-value">N/A</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="charts-section">
              <div className="chart-card">
                <div className="chart-header">
                  <h4 className="chart-title">Blood Pressure Over Time</h4>
                  <p className="chart-subtitle">Annual readings</p>
                </div>
                <div className="chart-container">
                  {chartData && (
                    <Line 
                      data={chartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                            labels: {
                              usePointStyle: true,
                              padding: 15,
                              font: { size: 14 }
                            }
                          },
                          tooltip: {
                            mode: 'index',
                            intersect: false
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: false,
                            title: {
                              display: true,
                              text: 'Blood Pressure (mmHg)',
                              font: { size: 14, weight: 'bold' }
                            },
                            ticks: { font: { size: 12 } }
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Year',
                              font: { size: 14, weight: 'bold' }
                            },
                            ticks: { font: { size: 12 } }
                          }
                        },
                        interaction: {
                          mode: 'nearest',
                          axis: 'x',
                          intersect: false
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </section>

            <section className="data-section">
              <div className="data-grid">
                <div className="data-card">
                  <h5 className="data-card-title">Contact Information</h5>
                  <div className="data-content">
                    <div className="data-row">
                      <span className="data-label">Email:</span>
                      <span className="data-value">N/A</span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Phone:</span>
                      <span className="data-value">{patient.phone_number || 'N/A'}</span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Address:</span>
                      <span className="data-value">N/A</span>
                    </div>
                  </div>
                </div>

                <div className="data-card">
                  <h5 className="data-card-title">Medical Information</h5>
                  <div className="data-content">
                    <div className="data-row">
                      <span className="data-label">Allergies:</span>
                      <span className="data-value">None</span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Conditions:</span>
                      <span className="data-value">{conditions}</span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Medications:</span>
                      <span className="data-value">None</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;

