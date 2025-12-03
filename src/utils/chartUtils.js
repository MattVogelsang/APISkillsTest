const monthNames = {
  'January': 'Jan',
  'February': 'Feb',
  'March': 'Mar',
  'April': 'Apr',
  'May': 'May',
  'June': 'Jun',
  'July': 'Jul',
  'August': 'Aug',
  'September': 'Sep',
  'October': 'Oct',
  'November': 'Nov',
  'December': 'Dec'
};

function createDefaultChart() {
  return {
    labels: ['Nov, 2023', 'Dec, 2023', 'Jan, 2024', 'Feb, 2024', 'Mar, 2024'],
    datasets: [{
      label: 'Systolic',
      data: [120, 135, 118, 125, 132],
      borderColor: '#E66FD2',
      backgroundColor: 'rgba(230, 111, 210, 0.1)',
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: '#E66FD2',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      tension: 0.4,
      fill: false
    }, {
      label: 'Diastolic',
      data: [80, 88, 75, 82, 85],
      borderColor: '#8C6FE6',
      backgroundColor: 'rgba(140, 111, 230, 0.1)',
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#8C6FE6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      tension: 0.4,
      fill: false
    }]
  };
}

function formatDateKey(item) {
  if (item.date) {
    const date = new Date(item.date);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return month + ', ' + year;
  }

  if (item.year && item.month) {
    let monthShort = monthNames[item.month];
    if (!monthShort) {
      monthShort = item.month.substring(0, 3);
    }
    return monthShort + ', ' + item.year;
  }

  return '';
}

function processChartData(history) {
  if (!history || history.length === 0) {
    return createDefaultChart();
  }

  const dataByMonth = {};

  for (let i = 0; i < history.length; i++) {
    const item = history[i];
    const bp = item.blood_pressure;
    if (!bp || !bp.systolic || !bp.diastolic) continue;

    const dateKey = formatDateKey(item);
    if (!dateKey) continue;

    const sys = parseFloat(bp.systolic.value || bp.systolic);
    const dia = parseFloat(bp.diastolic.value || bp.diastolic);

    if (isNaN(sys) || isNaN(dia)) continue;

    if (!dataByMonth[dateKey]) {
      dataByMonth[dateKey] = { sys: [], dia: [] };
    }
    dataByMonth[dateKey].sys.push(sys);
    dataByMonth[dateKey].dia.push(dia);
  }

  const allMonths = Object.keys(dataByMonth);
  allMonths.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });

  const labels = [];
  const sysValues = [];
  const diaValues = [];

  const lastSixMonths = allMonths.slice(-6);
  for (let i = 0; i < lastSixMonths.length; i++) {
    const monthKey = lastSixMonths[i];
    const readings = dataByMonth[monthKey];

    if (readings.sys.length > 0 && readings.dia.length > 0) {
      let sumSys = 0;
      for (let j = 0; j < readings.sys.length; j++) {
        sumSys = sumSys + readings.sys[j];
      }

      let sumDia = 0;
      for (let j = 0; j < readings.dia.length; j++) {
        sumDia = sumDia + readings.dia[j];
      }

      const avgSys = sumSys / readings.sys.length;
      const avgDia = sumDia / readings.dia.length;

      labels.push(monthKey);
      sysValues.push(Math.round(avgSys));
      diaValues.push(Math.round(avgDia));
    }
  }

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
      pointBackgroundColor: '#E66FD2',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      tension: 0.4,
      fill: false
    }, {
      label: 'Diastolic',
      data: diaValues,
      borderColor: '#8C6FE6',
      backgroundColor: 'rgba(140, 111, 230, 0.1)',
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#8C6FE6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      tension: 0.4,
      fill: false
    }]
  };
}

export { createDefaultChart, processChartData };
