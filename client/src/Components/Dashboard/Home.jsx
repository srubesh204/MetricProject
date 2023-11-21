import { Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const Home = () => {

  const [itemList, setItemList] = useState([]);
  const currentDate = dayjs();
  const sevenDaysAgo = currentDate.add(7, 'day');
  const fifteenDaysAgo = currentDate.add(15, 'day');
  const thirtyDaysAgo = currentDate.add(30, 'day');



  const [itemStatus, setItemStatus] = useState([])
  const [calStatus, setCalStatus] = useState([])
  const itemFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
      );
      const allItems = response.data.result
      // You can use a different logic for generating the id
      const TotalItems = response.data.result.length

      setItemList(response.data.result);
      const activeItems = allItems.filter((item) => item.itemStatus === "Active").length;



      const pastDue = allItems.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
      const CurrentDue = allItems.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
      const sevenDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isSameOrBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isSameOrAfter(currentDate.format("YYYY-MM-DD")))
      const fifteenDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
      const thirtyDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
      const AboveThirtyDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))

      setItemStatus([
        { id: 0, value: TotalItems, label: 'Total Item' },
        { id: 1, value: activeItems, label: 'Active' },
        { id: 2, value: TotalItems, label: 'Spare' },
        { id: 3, value: activeItems, label: 'BreakDown' },
        { id: 4, value: TotalItems, label: 'Missing' },
        { id: 5, value: activeItems, label: 'Rejection' }
      ])
      setCalStatus([
        { id: 0, value: pastDue.length, label: 'Past Due' },
        { id: 1, value: CurrentDue.length, label: 'Today' },
        { id: 2, value: sevenDaysFilter.length, label: '7 Days' },
        { id: 3, value: fifteenDaysFilter.length, label: '15 Days' },
        { id: 4, value: thirtyDaysFilter.length, label: '30 Days' },
        { id: 5, value: AboveThirtyDaysFilter.length, label: '>30 Days' }
      ])

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    itemFetch();
  }, []);

  const ItemListColumns = [
    { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1 },
    {
      field: 'itemIMTENo',
      headerName: 'IMTE No.',
      width: 150,
      editable: true,
    },
    {
      field: 'itemAddMasterName',
      headerName: 'Item Description',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  console.log(itemStatus)

  const calibrationStatus = [
    {
      "name": "Past Due",
      "value": 400
    },
    {
      "name": "Today",
      "value": 300
    },
    {
      "name": "7 Days",
      "value": 300
    },
    {
      "name": "15 Days",
      "value": 200
    },
    {
      "name": "30 Days",
      "value": 100
    },
    {
      "name": ">30 Days",
      "value": 0
    }
  ];

  const ItemStatus = [
    {
      "name": "Total Items",
      "value": 1000
    },
    {
      "name": "Active",
      "value": 800
    },
    {
      "name": "Spare",
      "value": 100
    },
    {
      "name": "BreakDown",
      "value": 40
    },
    {
      "name": "Missing",
      "value": 40
    },
    {
      "name": "Rejection",
      "value": 20
    }
  ];

  const data = [
    {
      "name": "Departments",
      "temperature": 20,

    },
    {
      "name": "SubContractors",
      "temperature": 11,

    },
    {
      "name": "Customers",
      "temperature": 14,

    },
    {
      "name": "Supplier",
      "temperature": 5,

    },
  ]
  const handleLegendClick = (entry, index) => {
    console.log(`Clicked on legend: ${entry.name}`);
    // Perform actions on legend click
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const handleLegendMouseEnter = (entry, index) => {
    setActiveIndex(index);
  };

  const handleLegendMouseLeave = () => {
    setActiveIndex(null);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#aca8c8", "#78787a"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomLegendContent = ({ payload }) => {
    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {payload.map((entry, index) => (
          <li key={`legend-item-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }} onClick={() => console.log("clicked" + index)}>
            <div style={{ width: '25px', height: '25px', backgroundColor: entry.color, marginRight: '10px', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ fontSize: "10px", fontWeight: "bolder" }}>{entry.payload.value}</span></div>
            <span >{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  const CustomLegendContent1 = ({ payload }) => {
    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {payload.map((entry, index) => (
          <li key={`legend-item-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }} onClick={() => console.log("clicked" + index)}>

            <div style={{ width: '25px', height: '25px', backgroundColor: entry.color, marginRight: '10px', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}></div>
            <span>{entry.value}</span>

          </li>
        ))}
      </ul>
    );
  };

  function getRandomColorIndex() {
    const randomNumber = Math.floor(Math.random() * COLORS.length);

    return randomNumber
  }
  getRandomColorIndex()

  return (
    <div style={{ backgroundColor: "#f1f4f4", margin: 0, padding: 0 }}>


      <div className="row" style={{ margin: "10px" }}>
        <Typography className='text-center' variant='h4'>DashBoard</Typography>

        <div className="col-md-8 row">
          <div className="col-md-6  ">


            <Paper elevation={12} sx={{ p: 2 }}>
              <h4 className='text-center'>Item Status</h4>
              <ResponsiveContainer width="100%" height={200}>

                <PieChart>
                  <Pie
                    data={calStatus}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#ff4545"
                    isAnimationActive={true}
                    animationBegin={3000}
                    animationDuration={3000}
                    innerRadius={40}
                    activeIndex={activeIndex}
                    activeShape={{ fill: '#8884d8', strokeWidth: 2 }}
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}

                  </Pie>

                  <Tooltip />
                  <Legend
                    onMouseEnter={handleLegendMouseEnter}
                    onMouseLeave={handleLegendMouseLeave}
                    align='left'
                    verticalAlign='top'
                    layout='vertical'
                    iconSize={30}
                    content={CustomLegendContent}
                    onClick={(e) => console.log(e)}
                  />
                </PieChart>

              </ResponsiveContainer>

            </Paper>
          </div>
          <div className="col-md-6 mb-2">

            <Paper elevation={12} sx={{ p: 2 }}>
              <h4 className='text-center'>Item Status</h4>
              <ResponsiveContainer width="100%" height={200}>

                <PieChart>
                  <Pie
                    data={ItemStatus}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#ff4545"
                    isAnimationActive={true}
                    animationBegin={3000}
                    animationDuration={3000}
                    innerRadius={40}
                    activeIndex={activeIndex}
                    activeShape={{ fill: '#8884d8', strokeWidth: 2 }}
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}

                  </Pie>

                  <Tooltip />
                  <Legend
                    onMouseEnter={handleLegendMouseEnter}
                    onMouseLeave={handleLegendMouseLeave}
                    align='left'
                    verticalAlign='top'
                    layout='vertical'
                    iconSize={30}
                    content={CustomLegendContent}
                    onClick={(e) => console.log(e)}
                  />
                </PieChart>

              </ResponsiveContainer>

            </Paper>
          </div>
          <div className="col-md-12">
            <Paper sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={itemList}
                columns={ItemListColumns}
                getRowId={(row) => row._id}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                sx={{
                  ".MuiTablePagination-displayedRows": {

                      "margin-top": "1em",
                      "margin-bottom": "1em"
                  }
              }}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Paper>
          </div>
        </div>
        <div className="col-md-4">
          <Paper elevation={12}>
            <BarChart width={500} height={250} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Total Numbers', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                content={({ label, payload }) => {
                  if (payload && payload.length) {
                    return (
                      <div style={{ backgroundColor: 'white', padding: '5px' }}>
                        <p >{`${label} - ${payload[0].payload[payload[0].dataKey]}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {/* <Legend /> */}

              <Bar dataKey="temperature" fill="#123456" label animationDuration={2000} onClick={(e) => console.log(e)} >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </Paper>
        </div>
      </div>

    </div>







  )
}

export default Home