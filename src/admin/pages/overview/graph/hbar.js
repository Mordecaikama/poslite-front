import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'

const DISPLAY = true
const BORDER = true
const CHART_AREA = true
const TICKS = true

function HorizontalBar({ data }) {
  // const [options, setOptions] = useState({
  //   // borderWidth: 2,
  //   scales: {
  //     x: {
  //       // border: {
  //       //   display: BORDER,
  //       // },
  //       grid: {
  //         color: 'red',
  //         display: DISPLAY,
  //         // drawOnChartArea: CHART_AREA,
  //         // drawTicks: TICKS,
  //       },
  //     },
  //     // y: {
  //     //   grid: {
  //     //     color: function (context) {
  //     //       if (context.tick.value > 0) {
  //     //         return 'red'
  //     //       } else if (context.tick.value < 0) {
  //     //         return '#ff7782'
  //     //       }

  //     //       return '#000000'
  //     //     },
  //     //   },
  //     // },
  //     x: {
  //       beginAtZero: true,
  //     },
  //   },
  //   // plugins: {
  //   //   legend: {
  //   //     position: 'right',
  //   //   },
  //   //   title: {
  //   //     display: true,
  //   //     text: 'welcome to mordecais graph',
  //   //   },
  //   // },

  //   // indexAxis: 'y',
  //   // elements: {
  //   //   bar: {
  //   //     borderWidth: 2,
  //   //   },
  //   // },
  // })

  const [options, setOptions] = useState({
    responsive: true,
    scales: {
      x: {
        grid: {
          display: !DISPLAY,
          color: 'white',
          drawOnChartArea: CHART_AREA,
        },
      },
      y: {
        grid: {
          display: !DISPLAY,
          color: 'white',
        },
      },
    },
  })

  return <Bar data={data} options={options} />
}

export default HorizontalBar
