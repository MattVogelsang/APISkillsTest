export function createDefaultChart() {
  return {
    labels: ['Nov, 2023', 'Dec, 2023', 'Jan, 2024', 'Feb, 2024', 'Mar, 2024'],
    datasets: [{
      label: 'Systolic',
      data: [120, 135, 118, 125, 132],
      borderColor: '#E66FD2',
      backgroundColor: 'rgba(230, 111, 210, 0.1)',
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.4,
      fill: false
    }, {
      label: 'Diastolic',
      data: [80, 88, 75, 82, 85],
      borderColor: '#8C6FE6',
      backgroundColor: 'rgba(140, 111, 230, 0.1)',
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.4,
      fill: false
    }]
  };
}

export function processChartData(history) {
  if (!history || history.length === 0) {
    return createDefaultChart();
  }

  const monthMap = {};
  
  history.forEach(item => {
    const bp = item.blood_pressure;
    if (!bp || !bp.systolic || !bp.diastolic) return;

    let dateKey = '';
    if (item.date) {
      dateKey = new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else if (item.year) {
      const date = new Date(parseInt(item.year), (item.month || 1) - 1, 1);
      dateKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else {
      return;
    }
    
    const sys = parseFloat(bp.systolic.value || bp.systolic);
    const dia = parseFloat(bp.diastolic.value || bp.diastolic);
    
    if (isNaN(sys) || isNaN(dia) || !dateKey) return;

    if (!monthMap[dateKey]) {
      monthMap[dateKey] = { sys: [], dia: [] };
    }
    monthMap[dateKey].sys.push(sys);
    monthMap[dateKey].dia.push(dia);
  });

  const sortedMonths = Object.keys(monthMap).sort((a, b) => new Date(a) - new Date(b));
  const labels = [];
  const sysValues = [];
  const diaValues = [];
  
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

  if (labels.length === 0) {
    return createDefaultChart();
  }

  return {
    labels,
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
  };
}

