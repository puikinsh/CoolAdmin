/**
 * CoolAdmin — Page logic
 * Chart.js initializations + sidebar / dropdown / hamburger behaviors.
 * No jQuery. Helpers (`$`, `$$`, `on`, `addClass`, etc.) come from vanilla-utils.js.
 */

// ---------------------------------------------------------------------------
// Chart.js — shared option helpers
// ---------------------------------------------------------------------------

const POPPINS = 'Poppins';
const MONTHS_SHORT = ['January', 'February', 'March', 'April', 'May', 'June'];
const MONTHS_LONG  = [...MONTHS_SHORT, 'July', 'August', 'September', 'October', 'November', 'December'];

// Inline sparkline used in dashboard widgets — hidden axes, transparent grids.
function sparklineOptions({ tooltip = false } = {}) {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { color: 'transparent' }, ticks: { font: { size: 2 }, color: 'transparent' } },
      y: { display: false, ticks: { display: false } },
    },
    elements: {
      line: { borderWidth: 0 },
      point: { radius: 0, hitRadius: 10, hoverRadius: 4 },
    },
  };
  if (tooltip) {
    options.plugins.tooltip = {
      mode: 'index',
      intersect: false,
      titleFont: { size: 12, family: POPPINS },
      titleColor: '#000',
      bodyColor: '#000',
      bodyFont: { family: POPPINS },
      backgroundColor: '#fff',
      cornerRadius: 3,
    };
  }
  return options;
}

// Tooltip styling shared by the larger dashboard line charts.
const lightTooltip = {
  backgroundColor: '#fff',
  titleColor: '#333',
  bodyColor: '#666',
  borderColor: '#ddd',
  borderWidth: 1,
  titleFont: { family: POPPINS },
  bodyFont: { family: POPPINS },
};

function percentTooltip() {
  return {
    ...lightTooltip,
    callbacks: {
      label: (item) => `${item.chart.data.labels[item.dataIndex]}: ${item.dataset.data[item.dataIndex]}%`,
    },
  };
}

// Simple guard to skip a chart when its canvas is absent on this page.
// Also registers (id, render) into a private registry so the dashboard
// "Refresh" button can re-run all relevant charts after a skeleton state.
const __chartRegistry = [];
function withCanvas(id, render) {
  __chartRegistry.push({ id, render });
  const ctx = document.getElementById(id);
  if (!ctx) return;
  render(ctx);
}
window.__coolReinit = function () {
  __chartRegistry.forEach(({ id, render }) => {
    const ctx = document.getElementById(id);
    if (!ctx) return;
    // Destroy any pre-existing Chart.js instance bound to this canvas
    if (window.Chart && typeof Chart.getChart === 'function') {
      const existing = Chart.getChart(ctx);
      if (existing) existing.destroy();
    }
    render(ctx);
  });
};

// ---------------------------------------------------------------------------
// Dashboard widget charts (index.html)
// ---------------------------------------------------------------------------

withCanvas('widgetChart1', (ctx) => {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [...MONTHS_LONG.slice(0, 7)],
      datasets: [{
        label: 'Dataset',
        data: [78, 81, 80, 45, 34, 12, 40],
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
      }],
    },
    options: {
      ...sparklineOptions(),
      aspectRatio: 2,
      layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
    },
  });
});

withCanvas('widgetChart2', (ctx) => {
  ctx.height = 130;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: MONTHS_SHORT,
      datasets: [{
        label: 'Dataset',
        data: [1, 18, 9, 17, 34, 22],
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
      }],
    },
    options: {
      ...sparklineOptions({ tooltip: true }),
      elements: {
        line: { tension: 0.00001, borderWidth: 1 },
        point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
      },
    },
  });
});

withCanvas('widgetChart3', (ctx) => {
  ctx.height = 130;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: MONTHS_SHORT,
      datasets: [{
        label: 'Dataset',
        data: [65, 59, 84, 84, 51, 55],
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
      }],
    },
    options: {
      ...sparklineOptions({ tooltip: true }),
      elements: {
        line: { borderWidth: 1 },
        point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
      },
    },
  });
});

withCanvas('widgetChart4', (ctx) => {
  ctx.height = 115;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MONTHS_LONG,
      datasets: [{
        label: 'My First dataset',
        data: [78, 81, 80, 65, 58, 75, 60, 75, 65, 60, 60, 75],
        borderColor: 'transparent',
        borderWidth: 0,
        backgroundColor: 'rgba(255,255,255,.3)',
      }],
    },
    options: {
      maintainAspectRatio: true,
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'transparent' }, ticks: { font: { size: 2 }, color: 'transparent' } },
        y: { display: false, ticks: { display: false } },
      },
    },
  });
});

withCanvas('widgetChart5', (ctx) => {
  // Used by index3.html
  ctx.height = 220;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MONTHS_LONG,
      datasets: [{
        label: 'Monthly Sales',
        data: [78, 81, 80, 64, 65, 80, 70, 75, 67, 85, 66, 68],
        borderColor: 'transparent',
        borderWidth: 0,
        backgroundColor: '#3f51b5',
      }],
    },
    options: {
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false, categoryPercentage: 1, barPercentage: 0.65 },
        y: { display: false },
      },
    },
  });
});

// ---------------------------------------------------------------------------
// Recent reports — dashboard variations
// ---------------------------------------------------------------------------

withCanvas('recent-rep-chart', (ctx) => {
  ctx.height = 250;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [...MONTHS_LONG.slice(0, 9), ''],
      datasets: [
        {
          label: 'Products',
          backgroundColor: 'rgba(0, 181, 233, 0.4)',
          borderColor: '#00b5e9',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: [78, 81, 80, 65, 58, 75, 60, 75, 65, 70],
        },
        {
          label: 'Services',
          backgroundColor: 'rgba(250, 66, 81, 0.4)',
          borderColor: '#fa4251',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: [65, 59, 84, 84, 51, 55, 40, 45, 50, 55],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: { usePointStyle: true, padding: 15, font: { size: 12 } },
        },
      },
      scales: {
        x: { grid: { drawOnChartArea: false } },
        y: { ticks: { beginAtZero: true } },
      },
      elements: {
        point: { radius: 0, hitRadius: 10, hoverRadius: 4, hoverBorderWidth: 3 },
      },
    },
  });
});

withCanvas('recent-rep2-chart', (ctx) => {
  // index2.html
  ctx.height = 320;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: MONTHS_LONG,
      datasets: [
        {
          label: 'Products',
          backgroundColor: 'rgba(0, 181, 233, 0.2)',
          borderColor: '#00b5e9',
          data: [65, 59, 84, 84, 51, 55, 40, 45, 50, 55, 70, 80],
          pointBackgroundColor: '#00b5e9',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Services',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderColor: '#4caf50',
          data: [28, 48, 40, 19, 86, 27, 90, 70, 65, 85, 60, 75],
          pointBackgroundColor: '#4caf50',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: { legend: { display: false }, tooltip: lightTooltip },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: POPPINS, size: 12 } } },
        y: {
          grid: { borderDash: [3, 3], color: '#e0e0e0', drawOnChartArea: true },
          ticks: { beginAtZero: true, maxTicksLimit: 6, font: { family: POPPINS, size: 12 } },
        },
      },
      interaction: { intersect: false, mode: 'index' },
    },
  });
});

withCanvas('recent-rep3-chart', (ctx) => {
  // index4.html
  ctx.height = 230;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: MONTHS_LONG.slice(0, 8),
      datasets: [
        {
          label: 'Products',
          backgroundColor: 'rgba(33, 150, 243, 0.3)',
          borderColor: '#2196f3',
          pointBackgroundColor: '#2196f3',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: [78, 81, 80, 65, 58, 75, 60, 85],
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Services',
          backgroundColor: 'rgba(76, 175, 80, 0.3)',
          borderColor: '#4caf50',
          pointBackgroundColor: '#4caf50',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: [65, 59, 84, 84, 51, 55, 40, 70],
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { display: true, position: 'top', labels: { usePointStyle: true, padding: 15, font: { size: 12 } } },
        tooltip: lightTooltip,
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: POPPINS, size: 12 } } },
        y: {
          grid: { borderDash: [3, 3], color: '#e0e0e0' },
          ticks: { beginAtZero: true, maxTicksLimit: 6, font: { family: POPPINS, size: 12 } },
        },
      },
    },
  });
});

// ---------------------------------------------------------------------------
// Doughnut "percent" charts
// ---------------------------------------------------------------------------

withCanvas('percent-chart', (ctx) => {
  ctx.height = 280;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Products', 'Services', 'Consulting', 'Support', 'Training'],
      datasets: [{
        label: 'Revenue Distribution',
        data: [35, 25, 20, 12, 8],
        backgroundColor: ['#00b5e9', '#fa4251', '#28a745', '#ff6b35', '#6f42c1'],
        hoverBackgroundColor: ['#0099cc', '#e63946', '#20a745', '#ff5722', '#5e35b1'],
        borderWidth: 2,
        hoverBorderColor: '#ffffff',
      }],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      cutout: '75%',
      animation: { animateScale: true, animateRotate: true },
      plugins: {
        legend: { display: true, position: 'bottom', labels: { usePointStyle: true, padding: 15, font: { size: 12 } } },
        tooltip: percentTooltip(),
      },
    },
  });
});

withCanvas('percent-chart2', (ctx) => {
  // index3.html
  ctx.height = 209;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Products', 'Services'],
      datasets: [{
        label: 'Market Share',
        data: [65, 35],
        backgroundColor: ['#00b5e9', '#fa4251'],
        hoverBackgroundColor: ['#0099cc', '#e63946'],
        borderWidth: 2,
        hoverBorderColor: '#ffffff',
      }],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      cutout: '80%',
      animation: { animateScale: true, animateRotate: true },
      plugins: {
        legend: { display: true, position: 'bottom', labels: { usePointStyle: true, padding: 15, font: { size: 12 } } },
        tooltip: percentTooltip(),
      },
    },
  });
});

// ---------------------------------------------------------------------------
// 2026 dashboard charts (index.html, theme-2026)
// ---------------------------------------------------------------------------

const INTER = '"Inter", system-ui, sans-serif';

// Tooltip styled for light cards on neutral backgrounds.
const modernTooltip = {
  backgroundColor: '#0f172a',
  titleColor: '#f1f5f9',
  bodyColor: '#e2e8f0',
  borderWidth: 0,
  cornerRadius: 6,
  padding: 10,
  titleFont: { family: INTER, size: 12, weight: '600' },
  bodyFont:  { family: INTER, size: 12 },
  displayColors: false,
};

// Sparkline shared by the four KPI tiles. `accent` is the line + fill color.
function kpiSparkline(ctx, { accent, data, fillStops }) {
  // Build a vertical gradient fill so the area fades to transparent.
  const canvasCtx = ctx.getContext('2d');
  const gradient = canvasCtx.createLinearGradient(0, 0, 0, 60);
  gradient.addColorStop(0, fillStops[0]);
  gradient.addColorStop(1, fillStops[1]);

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i + 1),
      datasets: [{
        data,
        borderColor: accent,
        backgroundColor: gradient,
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: accent,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      }],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...modernTooltip,
          callbacks: { title: () => '', label: (item) => item.formattedValue },
        },
      },
      scales: { x: { display: false }, y: { display: false } },
      interaction: { intersect: false, mode: 'index' },
      layout: { padding: 0 },
    },
  });
}

// KPI tile palette — anchored to the original CoolAdmin gradient family.
withCanvas('kpi-revenue', (ctx) => kpiSparkline(ctx, {
  accent: '#4272d7',                                                // c1 — blue
  fillStops: ['rgba(66, 114, 215, 0.22)', 'rgba(66, 114, 215, 0)'],
  data: [32, 36, 31, 40, 44, 41, 48, 46, 52, 49, 56, 60, 58, 64, 62, 68, 70, 65, 72, 75, 71, 78, 76, 82, 80, 86, 84, 90, 88, 95],
}));

withCanvas('kpi-orders', (ctx) => kpiSparkline(ctx, {
  accent: '#11998e',                                                // c2 — teal
  fillStops: ['rgba(17, 153, 142, 0.22)', 'rgba(17, 153, 142, 0)'],
  data: [55, 58, 62, 60, 65, 63, 68, 64, 70, 67, 71, 68, 73, 70, 76, 72, 78, 74, 79, 76, 81, 77, 80, 78, 76, 73, 70, 68, 66, 64],
}));

withCanvas('kpi-users', (ctx) => kpiSparkline(ctx, {
  accent: '#f97316',                                                // c3 — warm orange
  fillStops: ['rgba(249, 115, 22, 0.22)', 'rgba(249, 115, 22, 0)'],
  data: [40, 42, 45, 43, 48, 50, 47, 52, 49, 54, 56, 53, 58, 60, 57, 62, 64, 61, 66, 68, 65, 70, 72, 69, 74, 76, 73, 78, 80, 78],
}));

withCanvas('kpi-conversion', (ctx) => kpiSparkline(ctx, {
  accent: '#ec4899',                                                // c4 — magenta-pink
  fillStops: ['rgba(236, 72, 153, 0.22)', 'rgba(236, 72, 153, 0)'],
  data: [2.6, 2.7, 2.5, 2.8, 2.9, 2.7, 3.0, 2.9, 3.1, 3.0, 3.2, 3.1, 3.3, 3.2, 3.0, 3.1, 3.2, 3.3, 3.4, 3.2, 3.3, 3.5, 3.3, 3.4, 3.5, 3.4, 3.3, 3.2, 3.3, 3.24],
}));

// Primary line chart: revenue vs services for the last 30 days.
withCanvas('primary-chart', (ctx) => {
  const canvasCtx = ctx.getContext('2d');
  const productsFill = canvasCtx.createLinearGradient(0, 0, 0, 280);
  productsFill.addColorStop(0, 'rgba(66, 114, 215, 0.20)');
  productsFill.addColorStop(1, 'rgba(66, 114, 215, 0)');
  const servicesFill = canvasCtx.createLinearGradient(0, 0, 0, 280);
  servicesFill.addColorStop(0, 'rgba(17, 153, 142, 0.18)');
  servicesFill.addColorStop(1, 'rgba(17, 153, 142, 0)');

  // 30-day sequence of revenue (products) vs services
  const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
  const products = [1820, 1940, 1880, 2050, 2210, 2090, 2380, 2240, 2520, 2410, 2680, 2860, 2740, 3010, 2890, 3140, 3320, 3180, 3460, 3580, 3380, 3690, 3580, 3850, 3760, 4040, 3920, 4180, 4080, 4310];
  const services = [820, 880, 950, 910, 1020, 1080, 1010, 1130, 1080, 1200, 1240, 1180, 1310, 1370, 1300, 1430, 1490, 1420, 1560, 1620, 1540, 1680, 1740, 1660, 1810, 1880, 1810, 1960, 2010, 1950];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Products',
          data: products,
          borderColor: '#4272d7',
          backgroundColor: productsFill,
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#4272d7',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        },
        {
          label: 'Services',
          data: services,
          borderColor: '#11998e',
          backgroundColor: servicesFill,
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#11998e',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 6,
            boxHeight: 6,
            padding: 16,
            font: { family: INTER, size: 12 },
            color: '#475569',
          },
        },
        tooltip: {
          ...modernTooltip,
          callbacks: { label: (item) => `${item.dataset.label}: $${item.formattedValue}` },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            font: { family: INTER, size: 11 },
            color: '#94a3b8',
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 8,
          },
        },
        y: {
          grid: { color: '#eef0f3', drawBorder: false },
          border: { display: false },
          ticks: {
            font: { family: INTER, size: 11 },
            color: '#94a3b8',
            maxTicksLimit: 5,
            callback: (v) => '$' + (v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v),
          },
        },
      },
    },
  });
});

// ---------------------------------------------------------------------------
// Mini sparklines for the card.html showcase
// ---------------------------------------------------------------------------

withCanvas('card-spark-1', (ctx) => kpiSparkline(ctx, {
  accent: '#4272d7',
  fillStops: ['rgba(66, 114, 215, 0.22)', 'rgba(66, 114, 215, 0)'],
  data: [22, 28, 24, 32, 35, 30, 38, 42, 38, 46, 50, 48, 52, 56, 54, 60, 58, 62, 66, 70],
}));
withCanvas('card-spark-2', (ctx) => kpiSparkline(ctx, {
  accent: '#11998e',
  fillStops: ['rgba(17, 153, 142, 0.22)', 'rgba(17, 153, 142, 0)'],
  data: [180, 220, 200, 260, 280, 240, 300, 320, 290, 340, 360, 330, 380, 400, 370, 420, 410, 440, 460, 480],
}));
withCanvas('card-spark-3', (ctx) => kpiSparkline(ctx, {
  accent: '#f97316',
  fillStops: ['rgba(249, 115, 22, 0.22)', 'rgba(249, 115, 22, 0)'],
  data: [0.32, 0.30, 0.28, 0.34, 0.31, 0.27, 0.25, 0.28, 0.24, 0.22, 0.21, 0.23, 0.20, 0.19, 0.21, 0.18, 0.20, 0.18, 0.17, 0.18],
}));
withCanvas('card-spark-4', (ctx) => kpiSparkline(ctx, {
  accent: '#ec4899',
  fillStops: ['rgba(236, 72, 153, 0.22)', 'rgba(236, 72, 153, 0)'],
  data: [212, 220, 215, 208, 224, 218, 200, 195, 188, 198, 192, 186, 192, 190, 184, 188, 178, 182, 175, 182],
}));

// ---------------------------------------------------------------------------
// Sales pipeline (index2.html)
// ---------------------------------------------------------------------------

withCanvas('pipeline-funnel', (ctx) => {
  // Horizontal bar chart showing deal counts at each stage of the funnel.
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed won'],
      datasets: [{
        data: [320, 180, 95, 55, 24],
        backgroundColor: ['#bdcef2', '#a3bbe8', '#7c9dde', '#5b85d8', '#4272d7'],
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      }],
    },
    options: {
      indexAxis: 'y',
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...modernTooltip,
          callbacks: { label: (item) => `${item.formattedValue} deals` },
        },
      },
      scales: {
        x: {
          grid: { color: '#eef0f3', drawBorder: false },
          border: { display: false },
          ticks: { color: '#94a3b8', font: { family: INTER, size: 11 } },
        },
        y: {
          grid: { display: false, drawBorder: false },
          border: { display: false },
          ticks: { color: '#475569', font: { family: INTER, size: 12, weight: '500' } },
        },
      },
    },
  });
});

// ---------------------------------------------------------------------------
// Marketing analytics (index3.html)
// ---------------------------------------------------------------------------

withCanvas('traffic-trend', (ctx) => {
  const c = ctx.getContext('2d');
  const fillA = c.createLinearGradient(0, 0, 0, 280);
  fillA.addColorStop(0, 'rgba(66, 114, 215, 0.20)');
  fillA.addColorStop(1, 'rgba(66, 114, 215, 0)');
  const fillB = c.createLinearGradient(0, 0, 0, 280);
  fillB.addColorStop(0, 'rgba(17, 153, 142, 0.16)');
  fillB.addColorStop(1, 'rgba(17, 153, 142, 0)');

  const labels = Array.from({ length: 28 }, (_, i) => `Day ${i + 1}`);
  const visitors = [2400, 2520, 2380, 2680, 2740, 2580, 2820, 2980, 2860, 3140, 3260, 3120, 3380, 3520, 3380, 3640, 3780, 3620, 3880, 4040, 3860, 4180, 4320, 4180, 4480, 4620, 4480, 4760];
  const sessions = [3800, 3920, 3680, 4180, 4320, 4080, 4480, 4720, 4560, 4940, 5080, 4860, 5240, 5460, 5240, 5620, 5840, 5560, 5980, 6240, 5940, 6420, 6620, 6360, 6840, 7060, 6800, 7240];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Visitors', data: visitors, borderColor: '#4272d7', backgroundColor: fillA, borderWidth: 2, fill: true, tension: 0.35, pointRadius: 0, pointHoverRadius: 5, pointHoverBackgroundColor: '#4272d7', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2 },
        { label: 'Sessions', data: sessions, borderColor: '#11998e', backgroundColor: fillB, borderWidth: 2, fill: true, tension: 0.35, pointRadius: 0, pointHoverRadius: 5, pointHoverBackgroundColor: '#11998e', pointHoverBorderColor: '#fff', pointHoverBorderWidth: 2 },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: true, position: 'top', align: 'end',
          labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 6, boxHeight: 6, padding: 16, font: { family: INTER, size: 12 }, color: '#475569' } },
        tooltip: { ...modernTooltip,
          callbacks: { label: (item) => `${item.dataset.label}: ${Number(item.raw).toLocaleString()}` } },
      },
      scales: {
        x: { grid: { display: false }, border: { display: false },
          ticks: { font: { family: INTER, size: 11 }, color: '#94a3b8', maxRotation: 0, autoSkip: true, maxTicksLimit: 8 } },
        y: { grid: { color: '#eef0f3', drawBorder: false }, border: { display: false },
          ticks: { font: { family: INTER, size: 11 }, color: '#94a3b8', maxTicksLimit: 5,
            callback: (v) => v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v } },
      },
    },
  });
});

withCanvas('traffic-sources', (ctx) => {
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Organic search', 'Direct', 'Social', 'Referral', 'Email'],
      datasets: [{
        data: [42, 26, 14, 10, 8],
        backgroundColor: ['#4272d7', '#11998e', '#f97316', '#ec4899', '#8b5cf6'],
        hoverBackgroundColor: ['#3155b3', '#0d8780', '#e0660a', '#d23a87', '#7c4ce6'],
        borderWidth: 2,
        hoverBorderColor: '#ffffff',
      }],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      cutout: '70%',
      animation: { animateScale: true, animateRotate: true },
      plugins: {
        legend: { display: true, position: 'bottom',
          labels: { usePointStyle: true, pointStyle: 'circle', padding: 12, font: { family: INTER, size: 12 }, color: '#475569' } },
        tooltip: { ...modernTooltip,
          callbacks: { label: (item) => `${item.label}: ${item.formattedValue}%` } },
      },
    },
  });
});

// ---------------------------------------------------------------------------
// UI behaviors — sidebar, dropdowns, hamburger menu, tables
// ---------------------------------------------------------------------------

ready(() => {
  initProgressBars();
  initTopbarDropdowns();
  initRightSidebar();
  initSubListArrows();
  initHamburgerMenu();
  initSidebarToggle();
  initSidebarTooltips();
  initResponsiveTableShadows();
  initToastSystem();
  initCommandPalette();
  initThemeSwitcher();
  initDashboardRefresh();
});

// ---------------------------------------------------------------------------
// Dashboard refresh — demonstrates a real skeleton-loading state
// Triggered by any [data-refresh-dashboard] or #dash-refresh-btn button.
// Targets every .stat-card (kpi strip) and the primary chart card.
// ---------------------------------------------------------------------------
function initDashboardRefresh() {
  const btn = document.getElementById('dash-refresh-btn');
  if (!btn) return;

  const statCards = Array.from(document.querySelectorAll('.stat-card'));
  const primaryChartCard = document.querySelector('.primary-chart-card, [data-skeletonize]');
  if (!statCards.length) return;

  // Snapshot original markup so we can restore it
  const snapshots = statCards.map(c => c.innerHTML);
  const primarySnap = primaryChartCard ? primaryChartCard.innerHTML : null;

  const statSkeleton = `
    <div class="stat-card__skeleton" style="display:flex;flex-direction:column;gap:12px;height:100%;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span class="skeleton-line skeleton-line--sm"></span>
        <span class="skeleton-circle" style="width:36px;height:36px;"></span>
      </div>
      <span class="skeleton-line skeleton-line--lg"></span>
      <span class="skeleton-line skeleton-line--md"></span>
      <span class="skeleton-block" style="height:24px;width:100%;margin-top:auto;"></span>
    </div>`;

  const primarySkeleton = `
    <div style="padding:20px;display:flex;flex-direction:column;gap:14px;height:100%;">
      <span class="skeleton-line skeleton-line--md"></span>
      <span class="skeleton-line skeleton-line--sm"></span>
      <span class="skeleton-block" style="flex:1;min-height:240px;"></span>
    </div>`;

  btn.addEventListener('click', () => {
    if (btn.dataset.busy === '1') return;
    btn.dataset.busy = '1';
    const originalLabel = btn.innerHTML;
    btn.innerHTML = '<span class="btn-spinner" aria-hidden="true"></span> Refreshing…';
    btn.disabled = true;

    // Lock card heights so the skeletons occupy the same vertical space as
    // the real content — prevents jarring layout shifts.
    const lockedHeights = statCards.map(c => c.getBoundingClientRect().height);
    const primaryHeight = primaryChartCard ? primaryChartCard.getBoundingClientRect().height : null;

    statCards.forEach((card, i) => {
      card.style.minHeight = lockedHeights[i] + 'px';
      card.innerHTML = statSkeleton;
    });
    if (primaryChartCard) {
      primaryChartCard.style.minHeight = primaryHeight + 'px';
      primaryChartCard.innerHTML = primarySkeleton;
    }

    setTimeout(() => {
      statCards.forEach((card, i) => {
        card.innerHTML = snapshots[i];
        card.style.minHeight = '';
      });
      if (primaryChartCard && primarySnap !== null) {
        primaryChartCard.innerHTML = primarySnap;
        primaryChartCard.style.minHeight = '';
      }

      // Re-run all withCanvas registrations so charts redraw against the fresh DOM
      if (window.__coolReinit) window.__coolReinit();

      btn.innerHTML = originalLabel;
      btn.disabled = false;
      delete btn.dataset.busy;
      if (window.toast) window.toast.success('Dashboard data refreshed');
    }, 1200);
  });
}

// ---------------------------------------------------------------------------
// Theme switcher — 6 accent-color presets, persisted in localStorage
// ---------------------------------------------------------------------------
function initThemeSwitcher() {
  const body = document.body;
  if (!body.classList.contains('theme-2026')) return;
  // Skip on auth/error full-screen pages where the switcher would crowd
  if (body.classList.contains('auth-page') || body.classList.contains('error-page')) return;

  const THEMES = [
    { id: 'blue',     label: 'Blue',     color: '#4272d7' },
    { id: 'purple',   label: 'Purple',   color: '#7c3aed' },
    { id: 'teal',     label: 'Teal',     color: '#0d9488' },
    { id: 'rose',     label: 'Rose',     color: '#e11d48' },
    { id: 'amber',    label: 'Amber',    color: '#d97706' },
    { id: 'graphite', label: 'Graphite', color: '#334155' },
  ];
  const STORAGE_KEY = 'cooladmin.theme';

  // Apply persisted choice (or default to blue)
  const saved = (function () {
    try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; }
  })();
  let active = THEMES.find((t) => t.id === saved) || THEMES[0];
  applyTheme(active.id);

  // Build the floating widget
  const wrap = document.createElement('div');
  wrap.className = 'theme-switcher';
  wrap.innerHTML = `
    <div class="theme-switcher__panel" role="dialog" aria-label="Theme picker">
      <p class="theme-switcher__title">Accent color</p>
      <div class="theme-switcher__grid"></div>
    </div>
    <button class="theme-switcher__toggle" type="button" aria-label="Change theme color" aria-expanded="false">
      <i class="fa-solid fa-palette" aria-hidden="true"></i>
    </button>
  `;
  document.body.appendChild(wrap);

  const grid = wrap.querySelector('.theme-switcher__grid');
  THEMES.forEach((t) => {
    const btn = document.createElement('button');
    btn.className = 'theme-switcher__swatch';
    btn.type = 'button';
    btn.dataset.theme = t.id;
    if (t.id === active.id) btn.classList.add('is-active');
    btn.setAttribute('aria-label', `Use ${t.label} theme`);
    btn.innerHTML = `
      <span class="theme-switcher__swatch-color" style="background:${t.color};"></span>
      <span class="theme-switcher__swatch-label">${t.label}</span>
    `;
    btn.addEventListener('click', () => {
      active = t;
      applyTheme(t.id);
      try { localStorage.setItem(STORAGE_KEY, t.id); } catch (_) {}
      grid.querySelectorAll('.theme-switcher__swatch').forEach((b) => b.classList.toggle('is-active', b.dataset.theme === t.id));
      if (window.toast) window.toast.success(`Switched to ${t.label}`);
    });
    grid.appendChild(btn);
  });

  const toggle = wrap.querySelector('.theme-switcher__toggle');
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    wrap.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', wrap.classList.contains('is-open'));
  });
  document.addEventListener('click', (e) => {
    if (wrap.classList.contains('is-open') && !wrap.contains(e.target)) {
      wrap.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wrap.classList.contains('is-open')) {
      wrap.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  function applyTheme(id) {
    body.classList.remove(...THEMES.map((t) => `theme-${t.id}`));
    body.classList.add(`theme-${id}`);
  }
}

// ---------------------------------------------------------------------------
// Toast notification system
// Public API: window.toast.show({title, message, type, duration})
//             window.toast.success(message[, title])
//             window.toast.info(message[, title])
//             window.toast.warning(message[, title])
//             window.toast.error(message[, title])
// ---------------------------------------------------------------------------
function initToastSystem() {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }

  const ICONS = {
    success: 'fa-circle-check',
    info:    'fa-circle-info',
    warning: 'fa-triangle-exclamation',
    error:   'fa-circle-xmark',
  };

  function show({ title = '', message = '', type = 'info', duration = 4000 } = {}) {
    const t = type in ICONS ? type : 'info';
    const el = document.createElement('div');
    el.className = `toast toast--${t}`;
    el.setAttribute('role', t === 'error' ? 'alert' : 'status');
    el.innerHTML = `
      <span class="toast__icon"><i class="fa-solid ${ICONS[t]}" aria-hidden="true"></i></span>
      <div class="toast__body">
        ${title ? `<p class="toast__title"></p>` : ''}
        <p class="toast__message"></p>
      </div>
      <button type="button" class="toast__close" aria-label="Dismiss">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    `;
    if (title) el.querySelector('.toast__title').textContent = title;
    el.querySelector('.toast__message').textContent = message;
    container.appendChild(el);
    requestAnimationFrame(() => el.classList.add('is-visible'));

    const dismiss = () => {
      if (!el.parentNode) return;
      el.classList.remove('is-visible');
      el.classList.add('is-leaving');
      setTimeout(() => el.remove(), 220);
    };
    el.querySelector('.toast__close').addEventListener('click', dismiss);
    if (duration > 0) setTimeout(dismiss, duration);
    return { dismiss };
  }

  window.toast = {
    show,
    success: (message, title) => show({ message, title, type: 'success' }),
    info:    (message, title) => show({ message, title, type: 'info' }),
    warning: (message, title) => show({ message, title, type: 'warning' }),
    error:   (message, title) => show({ message, title, type: 'error' }),
  };
}

// ---------------------------------------------------------------------------
// Command palette (Cmd+K / Ctrl+K)
// Static list of pages + a few example actions; arrow-key navigation; Enter
// activates; Escape or backdrop click dismisses.
// ---------------------------------------------------------------------------
function initCommandPalette() {
  const COMMANDS = [
    { section: 'Pages', title: 'Dashboard',         sub: 'Main overview',           href: 'index.html',     icon: 'fa-tachometer-alt' },
    { section: 'Pages', title: 'Sales pipeline',    sub: 'Index 2',                 href: 'index2.html',    icon: 'fa-handshake' },
    { section: 'Pages', title: 'Marketing analytics', sub: 'Index 3',               href: 'index3.html',    icon: 'fa-chart-line' },
    { section: 'Pages', title: 'Projects',          sub: 'Index 4',                 href: 'index4.html',    icon: 'fa-folder-open' },
    { section: 'Pages', title: 'Charts',            sub: 'Visualisation showcase',  href: 'chart.html',     icon: 'fa-chart-bar' },
    { section: 'Pages', title: 'Tables',            sub: 'Data tables',             href: 'table.html',     icon: 'fa-table' },
    { section: 'Pages', title: 'Forms',             sub: 'Inputs and validation',   href: 'form.html',      icon: 'fa-square-check' },
    { section: 'Pages', title: 'Calendar',          sub: 'FullCalendar demo',       href: 'calendar.html',  icon: 'fa-calendar' },
    { section: 'Pages', title: 'Maps',              sub: 'Leaflet maps',            href: 'map.html',       icon: 'fa-map-location-dot' },
    { section: 'Pages', title: 'Inbox',             sub: 'Email + tasks',           href: 'inbox.html',     icon: 'fa-inbox' },
    { section: 'Pages', title: 'Kanban board',      sub: 'Drag-and-drop tasks',     href: 'kanban.html',    icon: 'fa-columns' },
    { section: 'Pages', title: 'Profile & settings', sub: 'Account preferences',    href: 'profile.html',   icon: 'fa-user-gear' },
    { section: 'Pages', title: 'Pricing',           sub: 'Marketing pricing page',  href: 'pricing.html',   icon: 'fa-tag' },
    { section: 'Pages', title: 'Invoice',           sub: 'Sample invoice',          href: 'invoice.html',   icon: 'fa-file-invoice' },
    { section: 'Pages', title: 'Notifications',     sub: 'Activity log',            href: 'notifications.html', icon: 'fa-bell' },
    { section: 'Pages', title: 'Documentation',     sub: 'Quick-start guide',       href: 'docs.html',      icon: 'fa-book' },
    { section: 'Pages', title: 'Setup wizard',      sub: 'Multi-step form',         href: 'wizard.html',    icon: 'fa-list-ol' },
    { section: 'Pages', title: 'Data table',        sub: 'Sortable, filterable',    href: 'data-table.html', icon: 'fa-table-list' },
    { section: 'Components', title: 'Buttons',      sub: 'Showcase',                href: 'button.html',    icon: 'fa-square' },
    { section: 'Components', title: 'Cards',        sub: 'Card patterns',           href: 'card.html',      icon: 'fa-id-card' },
    { section: 'Components', title: 'Modals',       sub: 'Dialog showcase',         href: 'modal.html',     icon: 'fa-window-restore' },
    { section: 'Components', title: 'Alerts',       sub: 'Inline alert variants',   href: 'alert.html',     icon: 'fa-bell' },
    { section: 'Components', title: 'Badges',       sub: 'Pill labels',             href: 'badge.html',     icon: 'fa-tag' },
    { section: 'Components', title: 'Tabs',         sub: 'Tab navigation',          href: 'tab.html',       icon: 'fa-window-maximize' },
    { section: 'Components', title: 'Switches',     sub: 'Toggles',                 href: 'switch.html',    icon: 'fa-toggle-on' },
    { section: 'Components', title: 'Progress bars', sub: 'Progress indicators',    href: 'progress-bar.html', icon: 'fa-tasks' },
    { section: 'Components', title: 'Typography',   sub: 'Type scale',              href: 'typo.html',      icon: 'fa-font' },
    { section: 'Components', title: 'Font Awesome', sub: 'Icon set',                href: 'fontawesome.html', icon: 'fa-icons' },
    { section: 'Actions', title: 'Show success toast', sub: 'Demo a notification',  action: () => window.toast.success('Saved successfully'), icon: 'fa-circle-check' },
    { section: 'Actions', title: 'Show error toast',   sub: 'Demo an error',        action: () => window.toast.error('Something went wrong'),  icon: 'fa-circle-xmark' },
  ];

  let overlay, input, results, activeIndex = 0, currentList = [];
  function build() {
    overlay = document.createElement('div');
    overlay.className = 'cmdk-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Command palette');
    overlay.innerHTML = `
      <div class="cmdk-panel">
        <div class="cmdk-input-wrap">
          <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <input class="cmdk-input" type="text" placeholder="Search pages, actions…" aria-label="Search">
          <kbd class="cmdk-hint">esc</kbd>
        </div>
        <ul class="cmdk-results" role="listbox"></ul>
        <div class="cmdk-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate · <kbd>↵</kbd> select</span>
          <span><kbd>⌘</kbd><kbd>K</kbd> open</span>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    input = overlay.querySelector('.cmdk-input');
    results = overlay.querySelector('.cmdk-results');
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    input.addEventListener('input', () => render(input.value));
    input.addEventListener('keydown', onKey);
  }

  function render(query) {
    const q = (query || '').trim().toLowerCase();
    const filtered = q
      ? COMMANDS.filter(c => (c.title + ' ' + (c.sub || '')).toLowerCase().includes(q))
      : COMMANDS;
    currentList = filtered;
    activeIndex = 0;
    if (!filtered.length) {
      results.innerHTML = '<li class="cmdk-empty">No results.</li>';
      return;
    }
    const groups = new Map();
    filtered.forEach(c => {
      if (!groups.has(c.section)) groups.set(c.section, []);
      groups.get(c.section).push(c);
    });
    let html = '';
    let idx = 0;
    for (const [section, items] of groups) {
      html += `<li class="cmdk-section">${section}</li>`;
      for (const c of items) {
        html += `
          <li>
            <a class="cmdk-item${idx === activeIndex ? ' is-active' : ''}" data-idx="${idx}" ${c.href ? `href="${c.href}"` : 'href="#"'}>
              <span class="cmdk-item__icon"><i class="fa-solid ${c.icon}" aria-hidden="true"></i></span>
              <div class="cmdk-item__body">
                <div class="cmdk-item__title">${escapeHtml(c.title)}</div>
                ${c.sub ? `<div class="cmdk-item__sub">${escapeHtml(c.sub)}</div>` : ''}
              </div>
              <span class="cmdk-item__meta">${c.section}</span>
            </a>
          </li>
        `;
        idx++;
      }
    }
    results.innerHTML = html;
    results.querySelectorAll('.cmdk-item').forEach((el, i) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        activate(currentList[i]);
      });
      el.addEventListener('mouseenter', () => setActive(i));
    });
  }

  function setActive(i) {
    activeIndex = i;
    results.querySelectorAll('.cmdk-item').forEach((el, idx) => {
      el.classList.toggle('is-active', idx === activeIndex);
    });
    const active = results.querySelector('.cmdk-item.is-active');
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  function activate(cmd) {
    if (!cmd) return;
    close();
    if (cmd.href) window.location.href = cmd.href;
    else if (cmd.action) cmd.action();
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = String(s);
    return div.innerHTML;
  }

  function onKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIndex + 1, currentList.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(activeIndex - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); activate(currentList[activeIndex]); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
  }

  function open() {
    if (!overlay) build();
    overlay.classList.add('is-open');
    input.value = '';
    render('');
    setTimeout(() => input.focus(), 50);
  }
  function close() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
  }

  window.cmdk = { open, close };

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay && overlay.classList.contains('is-open')) close();
      else open();
    }
  });

  // Wire the topbar search field — focusing it opens the palette instead
  const topbarSearch = document.querySelector('.form-header .au-input');
  if (topbarSearch) {
    topbarSearch.addEventListener('focus', (e) => {
      e.target.blur();
      open();
    });
    topbarSearch.addEventListener('mousedown', (e) => {
      e.preventDefault();
      open();
    });
  }
}

// Floating sidebar tooltip — only shown when the sidebar is collapsed on
// desktop. Rendered as a single shared `<div>` appended to <body>, so it
// escapes the sidebar's `overflow-y: auto` scroll clipping.
function initSidebarTooltips() {
  const links = $$('.menu-sidebar .navbar__list > li > a');
  if (!links.length) return;

  // Cache labels from each link's visible text (after the <i> icon).
  links.forEach((link) => {
    if (link.dataset.label) return;
    const label = (link.textContent || '').trim().replace(/\s+/g, ' ');
    if (label) link.dataset.label = label;
  });

  let tip = null;
  function ensureTip() {
    if (tip) return tip;
    tip = document.createElement('div');
    tip.className = 'sidebar-tooltip';
    tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);
    return tip;
  }

  function isCollapsedDesktop() {
    return hasClass(document.body, 'sidebar-collapsed') && window.innerWidth >= 992;
  }

  function show(link) {
    if (!isCollapsedDesktop()) return;
    if (!link.dataset.label) return;
    const t = ensureTip();
    t.textContent = link.dataset.label;
    const r = link.getBoundingClientRect();
    t.style.left = `${r.right + 10}px`;
    t.style.top  = `${r.top + r.height / 2}px`;
    t.classList.add('is-visible');
  }
  function hide() {
    if (tip) tip.classList.remove('is-visible');
  }

  links.forEach((link) => {
    on(link, 'mouseenter', () => show(link));
    on(link, 'mouseleave', hide);
    on(link, 'focus',      () => show(link));
    on(link, 'blur',       hide);
  });

  // Hide whenever we leave the collapsed-desktop state.
  on(window, 'resize', hide);
}

// Unified sidebar toggle: collapses the sidebar to an icon rail on desktop,
// slides it in over a backdrop on mobile. Wires every `.js-sidebar-toggle`
// element (topbar hamburger + the close button inside the sidebar header).
function initSidebarToggle() {
  const toggles = $$('.js-sidebar-toggle');
  if (!toggles.length) return;
  const body = document.body;
  const MOBILE_BP = 992;
  const isMobile = () => window.innerWidth < MOBILE_BP;

  let backdrop = null;
  function ensureBackdrop() {
    if (backdrop) return backdrop;
    backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    body.appendChild(backdrop);
    on(backdrop, 'click', closeMobile);
    return backdrop;
  }

  function syncAria(open) {
    toggles.forEach((t) => {
      if (t.hasAttribute('aria-expanded')) {
        t.setAttribute('aria-expanded', String(open));
      }
    });
  }

  function openMobile() {
    addClass(body, 'sidebar-open');
    ensureBackdrop();
    syncAria(true);
  }
  function closeMobile() {
    removeClass(body, 'sidebar-open');
    syncAria(false);
  }
  function toggleDesktop() {
    toggleClass(body, 'sidebar-collapsed');
    // When collapsing, strip any expanded sub-list state so the next
    // un-collapse doesn't show stale `slideToggle`-applied inline styles
    // or a rotated chevron with no visible labels next to it.
    if (hasClass(body, 'sidebar-collapsed')) {
      $$('.menu-sidebar .js-arrow.open').forEach((a) => removeClass(a, 'open'));
      $$('.menu-sidebar .navbar__sub-list').forEach((sl) => {
        ['display', 'height', 'overflow', 'padding-top', 'padding-bottom',
         'margin-top', 'margin-bottom', 'transition-duration', 'transition-property']
          .forEach((p) => sl.style.removeProperty(p));
      });
    }
  }

  toggles.forEach((btn) => {
    on(btn, 'click', (e) => {
      e.preventDefault();
      if (isMobile()) {
        if (hasClass(body, 'sidebar-open')) closeMobile();
        else openMobile();
      } else {
        toggleDesktop();
      }
    });
  });

  // Close mobile sidebar on Escape.
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && hasClass(body, 'sidebar-open')) closeMobile();
  });

  // Tapping a nav link on mobile should close the drawer.
  $$('.menu-sidebar .navbar__list a, .menu-sidebar .navbar__sub-list a').forEach((link) => {
    on(link, 'click', () => {
      if (isMobile()) closeMobile();
    });
  });

  // Crossing the breakpoint clears the mobile-only state.
  let resizeTimer;
  on(window, 'resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!isMobile() && hasClass(body, 'sidebar-open')) closeMobile();
    }, 120);
  });
}

// Animate `.js-progressbar-simple` widths when scrolled into view.
function initProgressBars() {
  const bars = $$('.js-progressbar-simple');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      observer.unobserve(bar);

      const target = Number(bar.getAttribute('data-transitiongoal') || bar.getAttribute('data-value') || 75);
      const valueEl = find(bar, '.js-value');
      let current = 0;
      const step = target / 50;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        bar.style.width = `${current}%`;
        if (valueEl) valueEl.innerHTML = `${Math.round(current)}%`;
        if (current >= target) clearInterval(timer);
      }, 30);
    });
  }, { threshold: 0.1 });

  bars.forEach((bar) => observer.observe(bar));
}

// Topbar notification + account dropdowns (`.js-item-menu`).
function initTopbarDropdowns() {
  const menu = $$('.js-item-menu');
  if (!menu.length) return;

  let openIndex = -1;

  menu.forEach((item, index) => {
    on(item, 'click', (e) => {
      e.preventDefault();
      const rightSidebar = $('.js-right-sidebar');
      if (rightSidebar) removeClass(rightSidebar, 'show-sidebar');

      if (index === openIndex) {
        toggleClass(item, 'show-dropdown');
        openIndex = -1;
      } else {
        menu.forEach((m) => removeClass(m, 'show-dropdown'));
        toggleClass(item, 'show-dropdown');
        openIndex = index;
      }
    });
  });

  on(document.body, 'click', () => {
    menu.forEach((m) => removeClass(m, 'show-dropdown'));
    openIndex = -1;
  });

  $$('.js-item-menu, .js-dropdown').forEach((el) => {
    on(el, 'click', (e) => e.stopPropagation());
  });
}

// Right-side settings panel toggle.
function initRightSidebar() {
  const rightSidebar = $('.js-right-sidebar');
  const sidebarBtn = $('.js-sidebar-btn');
  if (!sidebarBtn) return;

  on(sidebarBtn, 'click', (e) => {
    e.preventDefault();
    $$('.js-item-menu').forEach((item) => removeClass(item, 'show-dropdown'));
    if (rightSidebar) toggleClass(rightSidebar, 'show-sidebar');
  });

  on(document.body, 'click', () => {
    if (rightSidebar) removeClass(rightSidebar, 'show-sidebar');
  });

  $$('.js-right-sidebar, .js-sidebar-btn').forEach((el) => {
    on(el, 'click', (e) => e.stopPropagation());
  });
}

// Expand/collapse arrows in nav sub-lists.
function initSubListArrows() {
  $$('.js-arrow').forEach((arrow) => {
    on(arrow, 'click', function (e) {
      e.preventDefault();
      const arrowIcon = find(this, '.arrow');
      const subList = find(this.parentNode, '.js-sub-list');
      if (arrowIcon) toggleClass(arrowIcon, 'up');
      toggleClass(this, 'open');
      if (subList) slideToggle(subList, 250);
    });
  });
}

// Mobile hamburger toggle.
function initHamburgerMenu() {
  const hamburger = $('.hamburger');
  const mobileMenu = $('.navbar-mobile');
  if (!hamburger) return;

  on(hamburger, 'click', function () {
    toggleClass(this, 'is-active');
    if (mobileMenu) slideToggle(mobileMenu, 300);
  });
}

// Add visual scroll affordance to overflowing `.table-responsive` containers.
function initResponsiveTableShadows() {
  const containers = $$('.table-responsive');
  if (!containers.length) return;

  containers.forEach((container) => {
    const update = () => {
      const table = find(container, 'table');
      if (table && table.scrollWidth > container.clientWidth) {
        addClass(container, 'has-scroll');
      } else {
        removeClass(container, 'has-scroll');
      }
    };

    on(container, 'scroll', function () {
      if (this.scrollLeft > 0) addClass(this, 'scrolled');
      else removeClass(this, 'scrolled');
    });

    update();
    on(window, 'resize', update);
  });
}
