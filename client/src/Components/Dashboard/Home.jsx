import { Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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
  const [filteredData, setFilteredData] = useState([])
  const [itemLocationData, setItemLocationData] = useState([])
  const currentDate = dayjs();
  const sevenDaysAgo = currentDate.add(7, 'day');
  const fifteenDaysAgo = currentDate.add(15, 'day');
  const thirtyDaysAgo = currentDate.add(30, 'day');

  console.log(filteredData)



  const [locationTableData, setLocationTableData] = useState([])


  const [itemStatus, setItemStatus] = useState([])
  const [calStatus, setCalStatus] = useState([])

  const [distinctDepartment, setDistinctDepartment] = useState([])
  const [departmentName, setDepartmentName] = useState("")

  const [allDepartments, setAllDepartments] = useState([])

  const getAllDepartments = async () => {
    try {
      const Departments = await axios.get(
        `${process.env.REACT_APP_PORT}/department/getAllDepartments`
      );
      console.log(Departments)
      setAllDepartments(Departments.data.result)

    } catch (err) {
      console.log(err);
    }
  };


  const DepartmentFetch = async () => {
    try {
      const Departments = await axios.get(
        `${process.env.REACT_APP_PORT}/itemAdd/getDistinctItemDepartments`
      );
      setDistinctDepartment(Departments.data.result)
      console.log(Departments)
      setItemLocationData([{ value: Departments.data.result.length, label: "Departments" }, { value: 0, label: "Sub Contractors" }, { value: 0, label: "Customers" }, { value: 0, label: "Suppliers" }])

    } catch (err) {
      console.log(err);
    }
  };

  console.log(itemLocationData)
  const itemFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
      );
      const allItems = response.data.result

      setFilteredData(response.data.result)
      // You can use a different logic for generating the id


      setItemList(response.data.result);




      const pastDue = allItems.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
      const CurrentDue = allItems.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
      const sevenDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isSameOrBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isSameOrAfter(currentDate.format("YYYY-MM-DD")))
      const fifteenDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
      const thirtyDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
      const AboveThirtyDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))


      const activeItems = allItems.filter((item) => item.itemStatus === "Active");
      const spareItems = allItems.filter((item) => item.itemStatus === "Spare");
      const breakDownItems = allItems.filter((item) => item.itemStatus === "BreakDown");
      const missingItems = allItems.filter((item) => item.itemStatus === "Missing");
      const rejectionItems = allItems.filter((item) => item.itemStatus === "Rejection");


      setItemStatus([
        { id: 0, value: allItems.length, label: 'Total Item' },
        { id: 1, value: activeItems.length, label: 'Active' },
        { id: 2, value: spareItems.length, label: 'Spare' },
        { id: 3, value: breakDownItems.length, label: 'BreakDown' },
        { id: 4, value: missingItems.length, label: 'Missing' },
        { id: 5, value: rejectionItems.length, label: 'Rejection' }
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


  const ItemListColumns = [
    { field: 'id', headerName: 'Si. No', width: 20, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
    {
      field: 'itemIMTENo',
      headerName: 'IMTE No.',
      width: 70,
      // editable: true,
    },
    {
      field: 'itemAddMasterName',
      headerName: 'Item Description',
      width: 150,
      // editable: true,
      align: "center"
    },
    {
      field: 'itemCalDate',
      headerName: 'Cal Date',
      type: 'number',
      width: 100,
      // editable: true,
    },
    {
      field: 'itemDueDate',
      headerName: 'Next Cal Date',
      width: 100,
    },
    {
      field: 'itemDepartment',
      headerName: 'Current Location',
      width: 100,
    },
    {
      field: 'itemLastLocation',
      headerName: 'Last Location',
      width: 100,
    },
    {
      field: 'itemCalibrationSource',
      headerName: 'Calibration Source',
      width: 100,
      align: "center"
    },
    {
      field: 'itemSupplier',
      headerName: 'Supplier',
      width: 100,
      align: "center"
    },
  ];




  console.log(itemStatus)





  const data = [
    {
      "name": "Departments",
      "value": 500,

    },
    {
      "name": "SubContractors",
      "value": 400,

    },
    {
      "name": "Customers",
      "value": 300,

    },
    {
      "name": "Supplier",
      "value": 10,

    },
  ]


  const [activeIndex, setActiveIndex] = useState(null);



  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#aca8c8", "#78787a"];



  const itemStatusLegend = (name) => {
    console.log(name)
    const pastDue = itemList.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
    const CurrentDue = itemList.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
    const sevenDaysFilter = itemList.filter((item) => dayjs(item.itemDueDate).isSameOrBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isSameOrAfter(currentDate.format("YYYY-MM-DD")))
    const fifteenDaysFilter = itemList.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
    const thirtyDaysFilter = itemList.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
    const AboveThirtyDaysFilter = itemList.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))

    const activeItems = itemList.filter((item) => item.itemStatus === "Active");
    const spareItems = itemList.filter((item) => item.itemStatus === "Spare");
    const breakDownItems = itemList.filter((item) => item.itemStatus === "BreakDown");
    const missingItems = itemList.filter((item) => item.itemStatus === "Missing");
    const rejectionItems = itemList.filter((item) => item.itemStatus === "Rejection");


    switch (name) {
      case "Past Due":
        setFilteredData(pastDue);
        break;
      case "Today":
        setFilteredData(CurrentDue);
        break;
      case "7 Days":
        setFilteredData(sevenDaysFilter);
        break;
      case "15 Days":
        setFilteredData(fifteenDaysFilter);
        break;
      case "30 Days":
        setFilteredData(thirtyDaysFilter);
        break;
      case ">30 Days":
        setFilteredData(AboveThirtyDaysFilter);
        break;
      case "Total Items":
        setFilteredData(itemList);
        break;
      case "Active":
        setFilteredData(activeItems);
        break;
      case "Spare":
        setFilteredData(spareItems);
        break;
      case "BreakDown":
        setFilteredData(breakDownItems);
        break;
      case "Missing":
        setFilteredData(missingItems);
        break;
      case "Rejection":
        setFilteredData(rejectionItems);
        break;
      default:
        setFilteredData(itemList)
        break;
    }


  }

  const ItemLocationDisplay = (name) => {
    if (name === "Departments") {
      const aggregatedData = distinctDepartment.map((department) => {
        const filteredData = itemList.filter((item) => item.itemDepartment === department);
        return { departmentName: department, quantity: filteredData.length };
      });

      setLocationTableData(aggregatedData);
    }
  };


  console.log(locationTableData)
  const itemLocationLegend = ({ payload }) => {
    return (

      <table className='table table-borderless table-responsive' style={{ marginTop: "35px" }}>
        <tbody>
          {payload.map((entry, index) => (
            <tr>
              <td onClick={() => ItemLocationDisplay(entry.value)}><div style={{ width: '25px', height: '25px', backgroundColor: entry.color, marginRight: '10px', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}></div></td>
              <td>{entry.value}</td>
              <td style={{ fontWeight: "bolder", color: entry.color }} className='ms-2 ps-3'>{entry.payload.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };




  const itemStatusLegendContent = ({ payload }) => {
    return (

      <table className='table table-borderless table-responsive '>
        <tbody>
          {payload.map((entry, index) => (
            <tr>
              <td onClick={() => { itemStatusLegend(entry.value); console.log(entry) }}><div style={{ width: '25px', height: '25px', backgroundColor: entry.color, marginRight: '10px', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}></div></td>
              <td>{entry.value}</td>
              <td style={{ fontWeight: "bolder", color: entry.color }} className='ms-2 ps-3'>{entry.payload.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const calibrationStatusLegendContent = ({ payload }) => {
    return (
      <table className='table table-borderless'>
        <tbody>
          {payload.map((entry, index) => (
            <tr>
              <td onClick={() => { itemStatusLegend(entry.value) }}><div style={{ width: '25px', height: '25px', backgroundColor: entry.color, marginRight: '10px', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}></div></td>
              <td>{entry.value}</td>
              <td style={{ fontWeight: "bolder", color: entry.color }} className='ms-2 ps-3'>{entry.payload.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    DepartmentFetch();
    itemFetch();
    getAllDepartments();
  }, [])


  const DepartmentDataShow = async (name) => {
    try {
      const DepartmentData = await axios.post(
        `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByDepName`, { itemDepartment: name }
      );
      console.log(name)
      setDepartmentName(name)
      console.log(DepartmentData)
      setFilteredData(DepartmentData.data.result)

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div style={{ backgroundColor: "#f1f4f4", margin: 0, padding: 0 }}>


      <div className="row gx-3 m-3" >

        <div className="col">

          <Paper elevation={12} sx={{ p: 2, height: "100%" }}>
            <h4 className='text-center'>Calibration Status</h4>
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
                  animationBegin={0}
                  animationDuration={1500}
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

                  align='left'
                  verticalAlign='top'
                  layout='vertical'
                  iconSize={30}
                  content={calibrationStatusLegendContent}
                  onClick={(e) => console.log(e)}
                />
              </PieChart>

            </ResponsiveContainer>
            <Box className="d-flex justify-content-start">
              <Button variant='outlined' className='me-2' color='warning'>In House</Button>
              <Button variant='outlined' className='me-2' color="inherit">Out Source</Button>
              <Button variant='outlined' color="secondary">OEM</Button>
            </Box>


          </Paper>
        </div>



        <div className="col">
          <Paper elevation={12} sx={{ p: 2, height: "100%" }}>
            <h4 className='text-center'>Item Status</h4>
            <ResponsiveContainer width="100%" height={200}>

              <PieChart>
                <Pie
                  data={itemStatus}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}

                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={1500}
                  innerRadius={40}
                  activeIndex={activeIndex}
                  activeShape={{ fill: '#ffffff', strokeWidth: 2 }}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}

                </Pie>

                <Tooltip />
                <Legend
                  // onMouseEnter={handleLegendMouseEnter}
                  // onMouseLeave={handleLegendMouseLeave}
                  align='left'
                  verticalAlign='top'
                  layout='vertical'
                  iconSize={30}
                  content={itemStatusLegendContent}
                  onClick={(e) => console.log(e)}
                />
              </PieChart>

            </ResponsiveContainer>

          </Paper></div>

        <div className="col">
          <Paper elevation={12} sx={{ p: 2 }}>
            <h4 className='text-center'>Item Location</h4>
            <ResponsiveContainer width="100%" height={200}>

              <PieChart>
                <Pie
                  data={itemLocationData}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}

                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={1500}
                  innerRadius={40}
                  activeIndex={activeIndex}
                  activeShape={{ fill: '#ffffff' }}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}

                </Pie>

                <Tooltip />
                <Legend
                  // onMouseEnter={handleLegendMouseEnter}
                  // onMouseLeave={handleLegendMouseLeave}
                  align='left'
                  verticalAlign='top'
                  layout='vertical'
                  iconSize={30}
                  content={itemLocationLegend}
                  onClick={(e) => console.log(e)}
                />
              </PieChart>

            </ResponsiveContainer>
            <div className='row mx-2'>
              <TextField className='col me-2' size='small' select label="Move to" fullWidth defaultValue={"Standards Room"}>
                {allDepartments.map((item, index) => (
                  <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
                ))}
              </TextField>
              <Button className='col' size='small' fullWidth variant='contained'>Move</Button>

            </div>

          </Paper>
        </div>
      </div>

      <div className="row gx-3 mx-3">
        <div className="col-md-8">
          <Paper sx={{ p: 2, height: 400 }}>
            <DataGrid
              rows={filteredData}
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
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}

            />
          </Paper>
        </div>
        <div className="col-md-4">
          <Paper className='col' elevation={12} sx={{ p: 2 }}>
            <table className='table table-bordered table-sm text-center align-middle table-hover'>
              <tbody>
                <tr>
                  <th>Si. No</th>
                  <th>Name</th>
                  <th>Quantity</th>
                </tr>
                {locationTableData.map((item, index) => (
                  <tr className={`${item.departmentName === departmentName ? "table-active" : ""}`} key={index} onClick={() => DepartmentDataShow(item.departmentName)}>
                    <td>{index + 1}</td>
                    <td>{item.departmentName}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Paper>
        </div>
      </div>










    </div>







  )
}

export default Home