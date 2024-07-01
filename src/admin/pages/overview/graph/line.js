import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'

function LineChart({ data }) {
  const [options, setOptions] = useState({
    borderColor: 'rgb(75, 192, 192)',
    fill: false,
    backgroundColor: ['#c0cad6'],
    tension: 0.4,
    scales: { y: { stacked: true, beginAtZero: true } },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        // display: true,
        // text: 'Chart about something',
      },
    },
  })

  return <Line data={data} options={options} />
}

export default LineChart
