import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// import { Chart } from "react-google-charts";



const Home = () => {

    const chartData = {
        series: [44, 55, 13, 33],
        options: {
          chart: {
            type: 'donut',
            width: "300px", // Set the desired width
            height: "300px", // Set the desired height
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        },
          labels: ['Apple', 'Bananas', 'Cherries', 'Dates'],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: '100px',
                  height: '100px',
                },
                legend: {
                  position: 'center',
                },
              },
            },
          ],
        },
      };

    // const handleChartSelect = ({ chartWrapper }) => {
    //     const selection = chartWrapper.getChart();
    //     console.log(selection)
    //     if (selection.length > 0) {
    //         const selectedRow = selection[0].row;
    //         console.log(selectedRow)
    //         // You can access the selected data point using selectedRow
    //         // For example, display an alert with the selected data point's label

    //     }
    // };

    return (
        <div>
            <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
        </div>
    )
}

export default Home