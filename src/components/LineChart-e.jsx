import { useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ isDashboard }) => {
  useEffect(() => {
    const ctx = document.getElementById('lineChart');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: isDashboard, // Toggle display based on the prop isDashboard
          },
          title: {
            display: true,
            text: 'Line Chart',
          },
        },
      },
    });
  }, [isDashboard]);

  return <canvas id="lineChart" width="400" height="200" />;
};

export default LineChart;
