import { Line } from 'react-chartjs-2';

function BloodPressureChart({ chartData }) {
  if (!chartData) return null;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: { color: '#DAE0E6' },
        ticks: { font: { size: 12 }, color: '#666666' }
      },
      x: {
        grid: { display: false },
        ticks: { 
          font: { size: 12 }, 
          color: '#666666',
          maxRotation: 0,
          minRotation: 0
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return <Line data={chartData} options={options} />;
}

export default BloodPressureChart;
