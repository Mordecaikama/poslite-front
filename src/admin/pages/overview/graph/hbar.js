import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'

function HorizontalBar({ data }) {
  const [options, setOptions] = useState({
    scales: {
      x: {
        grid: { display: false },
      },
      y: { grid: { display: false } },
    },

    // indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'welcome to mordecais graph',
        },
      },
    },
  })

  return <Bar data={data} options={options} />
}

export default HorizontalBar
