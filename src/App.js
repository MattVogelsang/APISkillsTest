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
  if (!user || !pass) {
    throw new Error('Username and password are required');
  }
  return btoa(`${user}:${pass}`);
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

function App() {
  const [patient, setPatient] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('Last 6 months');

  const createDefaultChart = useCallback(() => {
    const labels = ['Nov, 2023', 'Dec, 2023', 'Jan, 2024', 'Feb, 2024', 'Mar, 2024'];
    const line1Data = [120, 135, 118, 125, 132];
    const line2Data = [80, 88, 75, 82, 85];

    setChartData({
      labels: labels,
      datasets: [{
        label: 'Systolic',
        data: line1Data,
        borderColor: '#E66FD2',
        backgroundColor: 'rgba(230, 111, 210, 0.1)',
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: false
      }, {
        label: 'Diastolic',
        data: line2Data,
        borderColor: '#8C6FE6',
        backgroundColor: 'rgba(140, 111, 230, 0.1)',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: false
      }]
    });
  }, []);

  const processChartData = useCallback((history) => {
    const labels = [];
    const sysValues = [];
    const diaValues = [];

    if (history && history.length > 0) {
      const monthMap = {};
      
      history.forEach(item => {
        if (item.blood_pressure && item.blood_pressure.systolic && item.blood_pressure.diastolic) {
          let dateKey = '';
          
          if (item.date) {
            const date = new Date(item.date);
            dateKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          } else if (item.year) {
            const year = parseInt(item.year);
            const month = item.month || 1;
            const date = new Date(year, month - 1, 1);
            dateKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          } else {
            return;
          }
          
          const sys = item.blood_pressure.systolic.value || item.blood_pressure.systolic;
          const dia = item.blood_pressure.diastolic.value || item.blood_pressure.diastolic;
          
          if (sys && dia && !isNaN(parseFloat(sys)) && !isNaN(parseFloat(dia)) && dateKey) {
            if (!monthMap[dateKey]) {
              monthMap[dateKey] = { sys: [], dia: [] };
            }
            monthMap[dateKey].sys.push(parseFloat(sys));
            monthMap[dateKey].dia.push(parseFloat(dia));
          }
        }
      });

      const sortedMonths = Object.keys(monthMap).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA - dateB;
      });
      
      sortedMonths.slice(-6).forEach(monthKey => {
        const readings = monthMap[monthKey];
        if (readings.sys.length > 0 && readings.dia.length > 0) {
          const avgSys = readings.sys.reduce((a, b) => a + b, 0) / readings.sys.length;
          const avgDia = readings.dia.reduce((a, b) => a + b, 0) / readings.dia.length;
          
          labels.push(monthKey);
          sysValues.push(Math.round(avgSys));
          diaValues.push(Math.round(avgDia));
        }
      });
    }

    if (labels.length === 0) {
      createDefaultChart();
      return;
    }

    setChartData({
      labels: labels,
      datasets: [{
        label: 'Systolic',
        data: sysValues,
        borderColor: '#E66FD2',
        backgroundColor: 'rgba(230, 111, 210, 0.1)',
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: false
      }, {
        label: 'Diastolic',
        data: diaValues,
        borderColor: '#8C6FE6',
        backgroundColor: 'rgba(140, 111, 230, 0.1)',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: false
      }]
    });
  }, [createDefaultChart]);

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
        throw new Error('Patient Jessica Taylor not found in API response');
      }

      setPatient(jessica);
      
      if (jessica.diagnosis_history && jessica.diagnosis_history.length > 0) {
        processChartData(jessica.diagnosis_history);
      } else {
        createDefaultChart();
      }
    } catch (err) {
      console.error('fetch error:', err);
      setError(err.message);
      createDefaultChart();
    } finally {
      setLoading(false);
    }
  }, [processChartData, createDefaultChart]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="dashboard-container">
      <div className="main-layout">
        <main className="content-area">
          {loading && (
            <div className="loading-state">
              <p>Loading...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>Error Loading Data: {error}</p>
            </div>
          )}

          {patient && !loading && (
            <div className="main-content-grid">
              <div className="left-column">
                <section className="vitals-section">
                  <div className="vitals-header">
                    <h3 className="vitals-title">History</h3>
                    <select 
                      className="time-range-select" 
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                    >
                      <option>Last 6 months</option>
                      <option>Last year</option>
                      <option>Last 2 years</option>
                    </select>
                  </div>

                  <div className="chart-wrapper">
                    <div className="chart-container">
                      {chartData && (
                        <Line 
                          data={chartData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                display: false
                              },
                              tooltip: {
                                mode: 'index',
                                intersect: false
                              }
                            },
                            scales: {
                              y: {
                                beginAtZero: false,
                                grid: {
                                  color: 'rgba(0, 0, 0, 0.05)'
                                },
                                ticks: {
                                  font: { size: 12 },
                                  color: '#666'
                                }
                              },
                              x: {
                                grid: {
                                  display: false
                                },
                                ticks: {
                                  font: { size: 12 },
                                  color: '#666'
                                }
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
                    <div className="blood-pressure-display">
                      <div className="bp-systolic">
                        <div className="bp-label">
                          <span className="bp-dot systolic-dot"></span>
                          Systolic
                        </div>
                        <div className="bp-value">120</div>
                        <div className="bp-status">Higher than average</div>
                      </div>
                      <div className="bp-diastolic">
                        <div className="bp-label">
                          <span className="bp-dot diastolic-dot"></span>
                          Diastolic
                        </div>
                        <div className="bp-value">80</div>
                      </div>
                    </div>
                  </div>

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
                </section>

                <section className="diagnostic-list-section">
                  <h3 className="diagnostic-list-title">Diagnostic List</h3>
                  <div className="diagnostic-list-content">
                    {patient.diagnostic_list && patient.diagnostic_list.length > 0 ? (
                      <ul className="diagnostic-items">
                        {patient.diagnostic_list.map((diagnostic, index) => (
                          <li key={index} className="diagnostic-item">
                            {diagnostic.name || diagnostic}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-diagnostics">No diagnostics available</p>
                    )}
                  </div>
                </section>
              </div>

              <div className="right-column">
                <div className="patient-card">
                  <div className="patient-profile-section">
                    <div className="profile-image">
                      <img 
                        src="/images/JT.png" 
                        srcSet="/images/JT.png 1x, /images/JT2@2x.png 2x"
                        alt={patient.name || 'Jessica Taylor'} 
                        className="profile-photo"
                      />
                    </div>
                    <h2 className="patient-name-main">{patient.name || 'Jessica Taylor'}</h2>
                  </div>

                  <div className="patient-details-list">
                    <div className="detail-item">
                      <img src="/images/calendar_today_FILL0_wght300_GRAD0_opsz24.svg" alt="Calendar" className="detail-icon" />
                      <div className="detail-content">
                        <span className="detail-label">Date Of Birth</span>
                        <span className="detail-value">{formatDate(patient.date_of_birth) || 'August 23, 1996'}</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-content">
                        <span className="detail-label">Gender</span>
                        <span className="detail-value">{patient.gender || 'Female'}</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-content">
                        <span className="detail-label">Contact Info.</span>
                        <span className="detail-value">{patient.phone_number || '(415) 555-1234'}</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-content">
                        <span className="detail-label">Emergency Contacts</span>
                        <span className="detail-value">(415) 555-5678</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-content">
                        <span className="detail-label">Insurance Provider</span>
                        <span className="detail-value">Sunrise Health Assurance</span>
                      </div>
                    </div>
                  </div>

                  <button className="show-all-btn" type="button">
                    Show All Information
                  </button>
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
