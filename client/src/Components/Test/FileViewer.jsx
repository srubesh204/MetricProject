import { Box, Link } from '@mui/material';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { PieChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';



const DateAndMonthsInput = () => {
  const [inputData, setInputData] = useState({
    selectedDate: '',
    selectedMonths: '',
    resultDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });

    if (name === 'selectedMonths') {
      calculateResultDate(inputData.selectedDate, value);
    } else if (name === 'selectedDate') {
      calculateResultDate(value, inputData.selectedMonths);
    }
  };

  const calculateResultDate = (inputDate, months) => {
    const parsedDate = dayjs(inputDate);
    if (parsedDate.isValid() && !isNaN(months)) {
      const calculatedDate = parsedDate.add(parseInt(months, 10), 'month').subtract(1, 'day');
      setInputData({
        ...inputData,
        selectedDate: inputDate,
        selectedMonths: months,
        resultDate: calculatedDate.format('YYYY-MM-DD'),
      });
    }
  };

  return (
    <div>
      <label>
        Date Input:
        <input
          type="date"
          name="selectedDate"
          value={inputData.selectedDate}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Months to Add:
        <input
          type="number"
          name="selectedMonths"
          value={inputData.selectedMonths}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Result Date:
        <input type="text" value={inputData.resultDate} readOnly />
      </label>
    </div>
  );
};

export default DateAndMonthsInput;

