import { Link } from '@mui/material';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { PieChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';

const FileViewer = () => {



  return (
    <div >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
            innerRadius: 30,
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
};

export default FileViewer;
