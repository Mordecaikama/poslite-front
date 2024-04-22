import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'

function Line({ data }) {
  const [options, setOptions] = useState({
    scales: { y: { stacked: true, beginAtZero: true } },
  })

  return <Line data={data} options={options} />
}

export default Line
