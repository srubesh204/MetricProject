import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Total Items', 'Active', 'Spare', 'Break Down', 'Missing', 'Rejection'] }]}
      series={[{ data: [4, 3, 5, 7, 8, 10] }]}
      width={500}
      height={300}
    />
  );
}