import React from 'react'
import { Pie } from 'react-chartjs-2'

function Piechart({ data }) {
  return <Pie data={data} width={200} height={200} />
}

export default Piechart
