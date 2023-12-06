import { Autocomplete, Badge, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, List, ListSubheader, MenuItem, Paper, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const Home = () => {

  const [itemDistinctNames, setItemDistinctNames] = useState([])
  const [errorhandler, setErrorHandler] = useState({});
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [itemList, setItemList] = useState([]);
  const [itemListOptions, setItemListOptions] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [itemLocationData, setItemLocationData] = useState([])
  const currentDate = dayjs();
  const sevenDaysAgo = currentDate.add(7, 'day');
  const fifteenDaysAgo = currentDate.add(15, 'day');
  const thirtyDaysAgo = currentDate.add(30, 'day');

  console.log(filteredData)


  //Vendor Type state
  const [customers, setCustomers] = useState([{ aliasName: "all" }])
  const [suppliers, setSuppliers] = useState([])
  const [subContractors, setSubContractors] = useState([])
  const [oems, setOems] = useState([])
  //


  const [locationTableData, setLocationTableData] = useState([])
  const [itemStatus, setItemStatus] = useState([])
  const [calStatus, setCalStatus] = useState([])
  const [distinctDepartment, setDistinctDepartment] = useState([])
  const [departmentName, setDepartmentName] = useState("")
  const [allDepartments, setAllDepartments] = useState([])


  const getAllEmployees = async () => {
    try {
      const Departments = await axios.get(
        `${process.env.REACT_APP_PORT}/employee/getAllEmployees`
      );
      console.log(Departments)
      const defaultDepartment = Departments.data.result.filter((dep) => dep.defaultdep === "yes");
      const otherDepartment = Departments.data.result.filter((dep) => dep.defaultdep === "no")


      setAllDepartments([...defaultDepartment, ...otherDepartment])




    } catch (err) {
      console.log(err);
    }
  };

  const [activeEmps, setActiveEmps] = useState([])

  const empFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/employee/getAllActiveEmployees`
      );
     setActiveEmps(response.data.result)
    } catch (err) {
      console.log(err);
    }
  };
  
  console.log(activeEmps)

  const getAllDepartments = async () => {
    try {
      const Departments = await axios.get(
        `${process.env.REACT_APP_PORT}/department/getAllDepartments`
      );
      console.log(Departments)
      const defaultDepartment = Departments.data.result.filter((dep) => dep.defaultdep === "yes");
      const otherDepartment = Departments.data.result.filter((dep) => dep.defaultdep === "no")


      setAllDepartments([...defaultDepartment, ...otherDepartment])




    } catch (err) {
      console.log(err);
    }
  };

  const getDistinctItemName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemAdd/getDistinctItemName`
      );
      console.log(response.data)
      setItemDistinctNames(response.data.result);

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDistinctItemName();
  }, []);

  const getVendorsByType = async () => {
    try {
      const getAllVendorWithTypes = await axios.get(
        `${process.env.REACT_APP_PORT}/vendor/getAllVendorWithTypes`
      );
      console.log(getAllVendorWithTypes)
      setCustomers([
        { aliasName: "all" },
        ...getAllVendorWithTypes.data.result.customers.map(customer => ({ ...customer }))
      ]);


      setOems(getAllVendorWithTypes.data.result.oems)
      setSubContractors(getAllVendorWithTypes.data.result.subContractors)
      setSuppliers(getAllVendorWithTypes.data.result.suppliers)

    } catch (err) {
      console.log(err);
    }
  };
  console.log(customers)

  const itemFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
      );
      const allItems = response.data.result
      setPieDataFilter(allItems)
      setFilteredData(allItems)
      // You can use a different logic for generating the id


      setItemList(allItems);
      setItemListOptions([{ itemIMTENo: "all" }, ...allItems])

      console.log(itemList)

      const pastDue = allItems.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
      const CurrentDue = allItems.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
      const sevenDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isAfter(currentDate.format("YYYY-MM-DD")))
      const fifteenDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
      const thirtyDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
      const AboveThirtyDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))


      const activeItems = allItems.filter((item) => item.itemStatus === "Active");
      const spareItems = allItems.filter((item) => item.itemStatus === "Spare");
      const breakDownItems = allItems.filter((item) => item.itemStatus === "BreakDown");
      const missingItems = allItems.filter((item) => item.itemStatus === "Missing");
      const rejectionItems = allItems.filter((item) => item.itemStatus === "Rejection");


      setItemStatus([
        { id: 0, value: allItems.length, label: 'Total Items' },
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
      setItemLocationData([{ value: allItems.length, label: "Departments" }])


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
      setItemLocationData(prev => ([
        ...prev,
        { value: 0, label: "Sub Contractors" },
        { value: 0, label: "Customers" },
        { value: 0, label: "Suppliers" }
      ]));

    } catch (err) {
      console.log(err);
    }
  };

  console.log(itemLocationData)


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
      "value": 10000,

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
    const pastDue = pieDataFilter.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
    const CurrentDue = pieDataFilter.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
    const sevenDaysFilter = pieDataFilter.filter((item) => dayjs(item.itemDueDate).isBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isAfter(currentDate.format("YYYY-MM-DD")))
    const fifteenDaysFilter = pieDataFilter.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
    const thirtyDaysFilter = pieDataFilter.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
    const AboveThirtyDaysFilter = pieDataFilter.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))

    const activeItems = pieDataFilter.filter((item) => item.itemStatus === "Active");
    const spareItems = pieDataFilter.filter((item) => item.itemStatus === "Spare");
    const breakDownItems = pieDataFilter.filter((item) => item.itemStatus === "BreakDown");
    const missingItems = pieDataFilter.filter((item) => item.itemStatus === "Missing");
    const rejectionItems = pieDataFilter.filter((item) => item.itemStatus === "Rejection");

    setCalSrcValue("")

    const inhouse = pieDataFilter.filter((item) => item.itemCalibrationSource === "InHouse");
    const outSource = pieDataFilter.filter((item) => item.itemCalibrationSource === "OutSource");
    const oem = pieDataFilter.filter((item) => item.itemCalibrationSource === "OEM");

    setCalSourceCount((prev) => ({
      ...prev,
      inHouse: inhouse.length,
      outSource: outSource.length,
      oem: oem.length
    }))


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
        setFilteredData(pieDataFilter);
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

    itemFetch();
    DepartmentFetch();
    getAllDepartments();
    getVendorsByType();
    empFetch();
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

  const [pieDataFilter, setPieDataFilter] = useState([])
  const [selectedFilterName, setSelectedFilterName] = useState("")
  const [selectedFilterValue, setSelectedFilterValue] = useState("")
  const [calSourceCount, setCalSourceCount] = useState({
    inHouse: "",
    outSource: "",
    oem: ""
  })

  const handlePieData = (name, value) => {
    setSelectedFilterName(name)
    setSelectedFilterValue(value)
    console.log(name, value)
    const filter = itemList.filter((item) => item[name] === value)
    setFilteredData(filter)
    setPieDataFilter(filter)

    const pastDue = filter.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
    const CurrentDue = filter.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
    const sevenDaysFilter = filter.filter((item) => dayjs(item.itemDueDate).isBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isAfter(currentDate.format("YYYY-MM-DD")))
    const fifteenDaysFilter = filter.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
    const thirtyDaysFilter = filter.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
    const AboveThirtyDaysFilter = filter.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))


    const activeItems = filter.filter((item) => item.itemStatus === "Active");
    const spareItems = filter.filter((item) => item.itemStatus === "Spare");
    const breakDownItems = filter.filter((item) => item.itemStatus === "BreakDown");
    const missingItems = filter.filter((item) => item.itemStatus === "Missing");
    const rejectionItems = filter.filter((item) => item.itemStatus === "Rejection");



    setCalStatus([
      { id: 0, value: pastDue.length, label: 'Past Due' },
      { id: 1, value: CurrentDue.length, label: 'Today' },
      { id: 2, value: sevenDaysFilter.length, label: '7 Days' },
      { id: 3, value: fifteenDaysFilter.length, label: '15 Days' },
      { id: 4, value: thirtyDaysFilter.length, label: '30 Days' },
      { id: 5, value: AboveThirtyDaysFilter.length, label: '>30 Days' }
    ])
    setItemStatus([
      { id: 0, value: filter.length, label: 'Total Items' },
      { id: 1, value: activeItems.length, label: 'Active' },
      { id: 2, value: spareItems.length, label: 'Spare' },
      { id: 3, value: breakDownItems.length, label: 'BreakDown' },
      { id: 4, value: missingItems.length, label: 'Missing' },
      { id: 5, value: rejectionItems.length, label: 'Rejection' }
    ])
  }

  const customerFilter = (name, value) => {
    setSelectedFilterName(name)
    setSelectedFilterValue(value)
    console.log(name, value)
    const filter = itemList.filter((item) =>
      item.itemPartName.some((partData) => partData.customer === value)
    );

    console.log(filter)
    setFilteredData(filter)
    setPieDataFilter(filter)

    const pastDue = filter.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
    const CurrentDue = filter.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
    const sevenDaysFilter = filter.filter((item) => dayjs(item.itemDueDate).isBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isAfter(currentDate.format("YYYY-MM-DD")))
    const fifteenDaysFilter = filter.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
    const thirtyDaysFilter = filter.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
    const AboveThirtyDaysFilter = filter.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))


    const activeItems = filter.filter((item) => item.itemStatus === "Active");
    const spareItems = filter.filter((item) => item.itemStatus === "Spare");
    const breakDownItems = filter.filter((item) => item.itemStatus === "BreakDown");
    const missingItems = filter.filter((item) => item.itemStatus === "Missing");
    const rejectionItems = filter.filter((item) => item.itemStatus === "Rejection");

    setCalStatus([
      { id: 0, value: pastDue.length, label: 'Past Due' },
      { id: 1, value: CurrentDue.length, label: 'Today' },
      { id: 2, value: sevenDaysFilter.length, label: '7 Days' },
      { id: 3, value: fifteenDaysFilter.length, label: '15 Days' },
      { id: 4, value: thirtyDaysFilter.length, label: '30 Days' },
      { id: 5, value: AboveThirtyDaysFilter.length, label: '>30 Days' }
    ])
    setItemStatus([
      { id: 0, value: filter.length, label: 'Total Items' },
      { id: 1, value: activeItems.length, label: 'Active' },
      { id: 2, value: spareItems.length, label: 'Spare' },
      { id: 3, value: breakDownItems.length, label: 'BreakDown' },
      { id: 4, value: missingItems.length, label: 'Missing' },
      { id: 5, value: rejectionItems.length, label: 'Rejection' }
    ])
  }

  const MainFilter = (newValue, extraName) => {

    console.log(newValue, extraName)
    if (newValue === "all") {
      itemFetch()
      // console.log("working")
    } else {

      if (extraName === "itemIMTENo") {
        handlePieData(extraName, newValue)
      }
      if (extraName === "itemType") {
        handlePieData(extraName, newValue)
      }
      if (extraName === "itemAddMasterName") {
        handlePieData(extraName, newValue)
      }
      if (extraName === "customer") {
        customerFilter(extraName, newValue)
      }


    }
  }
  const [calSrcValue, setCalSrcValue] = useState("")

  const handleCalSrc = (e, newValue) => {
    setCalSrcValue(newValue)
    const calSrcFilter = pieDataFilter.filter((item) => item.itemCalibrationSource === newValue);
    setFilteredData(calSrcFilter)
  }

  console.log(selectedFilterName)
  console.log(selectedFilterValue)

  const [selectedRows, setSelectedRows] = useState([]);

  const [DepUpdateData, setDepUpdateData] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState()

  const DepartmentChange = (e) => {
    const { value } = e.target;
    setSelectedDepartment(value)
    const itemData = selectedRows.map((item) => item._id)
    setDepUpdateData({ itemIds: itemData, itemDepartment: value })
  }
  console.log(DepUpdateData)
  const updateItemData = async (e) => {
    e.preventDefault();
    try {

      const itemData = selectedRows.map((item) => ({ _id: item._id, itemIMTENo: item.itemIMTENo }))
      const depData = { itemIds: itemData, itemDepartment: selectedDepartment }
      if (depData) {
        const response = await axios.put(
          `${process.env.REACT_APP_PORT}/itemAdd/changeDepartmentUpdate`, depData
        );

        setSnackBarOpen(true)

        console.log("Item Update Successfully")
        setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
        setSelectedRows([])
        itemFetch();
        DepartmentFetch();
      }



    } catch (err) {

      setSnackBarOpen(true)




      if (err.response && err.response.status === 400) {
        // Handle validation errors
        const errorData400 = err.response.data.errors;
        const errorMessages400 = Object.values(errorData400).join(', ');
        console.log(errorMessages400)
        setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
      } else if (err.response && err.response.status === 500) {
        // Handle other errors
        const errorData500 = err.response.data.error;
        const errorMessages500 = Object.values(errorData500).join(', ');
        console.log(errorMessages500)
        setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
      } else {
        console.log(err.response.data.error)
        setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
      }
    }
  };



  // const handleSelectRow = (row) => {
  //   // Check if the row is already selected
  //   const isSelected = selectedRows.some((selectedRow) => selectedRow._id === row._id);

  //   // If not selected, add it to the selectedRows array
  //   if (!isSelected) {
  //     setSelectedRows([...selectedRows, row]);
  //   } else {
  //     // If already selected, remove it from the selectedRows array
  //     const updatedSelection = selectedRows.filter((selectedRow) => selectedRow._id !== row._id);
  //     setSelectedRows(updatedSelection);
  //   }
  // };

  const handleRowSelectionChange = (newSelection) => {
    const selectedRowsData = filteredData.filter((row) => newSelection.includes(row._id));
    setSelectedRows(selectedRowsData);
  };

  const [calOpen, setCalOpen] = useState(false);

  console.log(selectedRows)


  const [calibrationData, setCalibrationData] = useState({
    calIMTENo: "",
    calItemName: "",
    calItemType: "",
    calRangeSize: "",
    calItemMFRNo: "",
    calLC: "",
    calItemMake: "",
    calItemTemperature: "",
    calItemHumidity: "",
    calItemUncertainity: "",
    calItemSOPNo: "",
    calStandardRef: "",
    calCertificateNo: "",
    calItemCalDate: dayjs().format('YYYY-MM-DD'),
    calItemDueDate: "",
    calItemEntryDate: dayjs().format('YYYY-MM-DD'),
    calCalibratedBy: "",
    calApprovedBy: "",
    calcalibrationData: [{
      calParameter: "",
      calNominalSize: "",
      calNominalSizeUnit: "",
      calMinPS: "",
      calMaxPS: "",
      calWearLimitPS: "",
      calMinOB: "",
      calMaxOB: "",
      calAverageOB: "",
      calOBError: "",
      calMinPSError: "",
      calMaxPSError: "",
    }],
    calMasterUsed: [{
      masterIMTENo: "",
      masterName: "",
      masterRangeSize: "",
      masterCalCertificateNo: "",
      masterCalDate: "",
      masterNextDue: "",
      masterCalibratedAt: "",
    }]
  })

  const setCalData = () => {
    if (selectedRows.length === 1) {
      setCalibrationData((prev) => (
        {
          ...prev,
          calItemId: selectedRows[0]._id,
          calIMTENo: selectedRows[0].itemIMTENo,
          calItemName: selectedRows[0].itemAddMasterName,
          calItemType: selectedRows[0].itemType,
          calRangeSize: selectedRows[0].itemRangeSize,
          calItemMFRNo: selectedRows[0].itemMFRNo,
          calLC: selectedRows[0].itemLC,
          calItemMake: selectedRows[0].itemMake,
          calItemFreInMonths: selectedRows[0].itemCalFreInMonths,
          calItemUncertainity: selectedRows[0].selectedItemMaster[0].uncertainty,
          calItemSOPNo: selectedRows[0].selectedItemMaster[0].SOPNo,
          calStandardRef: selectedRows[0].selectedItemMaster[0].standardRef,

          // calCalibratedBy: selectedRows[0],
          // calApprovedBy: selectedRows[0],
          calcalibrationData:

            selectedRows[0].acceptanceCriteria.map((item) => (
              {
                calParameter: item.acParameter,
                calNominalSize: item.acNominalSize,
                calNominalSizeUnit: item.acNominalSizeUnit,
                calMinPS: item.acMinPS,
                calMaxPS: item.acMaxPS,
                calWearLimitPS: item.acWearLimitPS,
                calMinOB: item.acMinOB,
                calMaxOB: item.acMaxOB,
                calAverageOB: item.acAverageOB,
                calOBError: item.acOBError,
                calMinPSError: item.acMinPSError,
                calMaxPSError: item.acMaxPSError,
              }
            )),

          // calMasterUsed: [{
          //   masterIMTENo: selectedRows[0],
          //   masterName: selectedRows[0],
          //   masterRangeSize: selectedRows[0],
          //   masterCalCertificateNo: selectedRows[0],
          //   masterCalDate: selectedRows[0],
          //   masterNextDue: selectedRows[0],
          //   masterCalibratedAt: selectedRows[0],
          // }]
        }
      ))
    }

  };
  console.log(calibrationData)

  const changecalDataValue = (index, name, value) => {

    setCalibrationData((prev) => {
      const updateAC = [...prev.calcalibrationData]
      updateAC[index] = {
        ...updateAC[index], [name]: value,
      };
      return {
        ...prev, calcalibrationData: updateAC,
      };
    })
  };

  useEffect(() => {
    calculateResultDate(calibrationData.calItemCalDate, calibrationData.calItemFreInMonths);
  }, [calibrationData.calItemCalDate, calibrationData.calItemFreInMonths]);



  const calculateResultDate = (itemCalDate, itemCalFreInMonths) => {
    const parsedDate = dayjs(itemCalDate);
    if (parsedDate.isValid() && !isNaN(parseInt(itemCalFreInMonths))) {
      const calculatedDate = parsedDate.add(parseInt(itemCalFreInMonths, 10), 'month').subtract(1, 'day');
      setCalibrationData((prev) => ({
        ...prev,
        calItemDueDate: calculatedDate.format('YYYY-MM-DD'),
      }));
    }
  };

  const [selectedEmp, setSelectedEmp] = useState([])
  const getEmployeeByName = (empId) => {
    const selectedEmp = activeEmps.filter((emp)=> emp._id === empId);
    setSelectedEmp(selectedEmp)
  }
  useEffect(()=>{
    getEmployeeByName(calibrationData.calCalibratedBy)
  }, [calibrationData.calCalibratedBy])

  const handleCalData = (e) => {
    const {name, value} = e.target;
    console.log(name)
    setCalibrationData((prev)=> ({...prev, [name]: value}))
  }

  return (
    <div style={{ backgroundColor: "#f1f4f4", margin: 0, padding: 0 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>


        <div className="row gx-3 m-3" >
          <div className="col-8 mb-2">
            <Paper sx={{ p: 2 }} elevation={12} className=''>

              <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={itemListOptions}
                  size='small'
                  fullWidth
                  onInputChange={(e, newValue) => MainFilter(newValue, "itemIMTENo")}
                  name="itemIMTENo"
                  getOptionLabel={(itemList) => itemList.itemIMTENo}
                  renderInput={(params) => <TextField {...params} label="IMTE No" />}
                  defaultValue={(e) => console.log(e)}
                />
                <TextField select onChange={(e) => MainFilter(e.target.value, "itemType")} fullWidth size='small' value={selectedFilterName === 'itemType' ? selectedFilterValue : 'all'} name='itemType' defaultValue="all" label="Item Type">
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Variable">Variable</MenuItem>
                  <MenuItem value="Attribute">Attribute</MenuItem>
                  <MenuItem value="Ref Standard">Ref Standard</MenuItem>
                </TextField>

                <TextField select onChange={(e) => MainFilter(e.target.value, "itemAddMasterName")} fullWidth size='small' value={selectedFilterName === 'itemAddMasterName' ? selectedFilterValue : 'all'} defaultValue="all" name='itemAddMasterName' label="Item Description">
                  <MenuItem value="all">All</MenuItem>
                  {itemDistinctNames.map((item, index) => (<MenuItem key={index} value={item}>{item}</MenuItem>))}
                </TextField>

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={customers}
                  size='small'
                  fullWidth
                  onInputChange={(e, newValue) => MainFilter(newValue, "customer")}
                  // value={selectedFilterName === 'customer' ? selectedFilterValue : 0}
                  name="customer"
                  getOptionLabel={(customers) => customers.aliasName}
                  // onChange={(e, newValue) => MainFilter(e,newValue, "customer")}
                  renderInput={(params) => <TextField {...params} label="Customer" name='Master' />}
                  disableClearable
                />

                {/* <TextField select fullWidth size='small' defaultValue="All" label="Due in Days">
                <MenuItem value="All">All</MenuItem>
                {itemList.map((item, index) => (<MenuItem key={index} value={item.itemIMTENo}>{item.itemIMTENo}</MenuItem>))}
              </TextField> */}


              </Stack>

            </Paper>

          </div>
          <div className="col-md-4">
            <Paper sx={{ p: 2 }} elevation={12}>
              <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <TextField select onChange={MainFilter} fullWidth size='small' defaultValue="All" name='plantLocationFilter' label="Plant Location">
                  <MenuItem value="all">All</MenuItem>

                </TextField>
                <TextField select onChange={MainFilter} fullWidth size='small' name='employeeFilter' defaultValue="All" label="Employee">
                  <MenuItem value="all">All</MenuItem>
                  {suppliers.map((item, index) => (<MenuItem key={index} value={item.aliasName}>{item.aliasName}</MenuItem>))}
                </TextField>
              </Stack>
            </Paper>
          </div>


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
                    animationDuration={1000}
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

                  />
                </PieChart>

              </ResponsiveContainer>
              <Box className="d-flex justify-content-around">
                <ToggleButtonGroup
                  color="success"
                  value={calSrcValue}
                  exclusive
                  size="small"
                  aria-label="Platform"
                  onChange={handleCalSrc}
                >
                  <ToggleButton value="InHouse">In House&nbsp;{(calSourceCount.inHouse !== "" && calSourceCount.inHouse !== 0) && <Chip label={calSourceCount.inHouse}></Chip>}</ToggleButton>
                  <ToggleButton value="OutSource">Out Source&nbsp;{(calSourceCount.outSource !== "" && calSourceCount.outSource !== 0) && <Chip label={calSourceCount.outSource}></Chip>}</ToggleButton>
                  <ToggleButton value="OEM">OEM&nbsp;{(calSourceCount.oem !== "" && calSourceCount.oem !== 0) && <Chip label={calSourceCount.oem}></Chip>}</ToggleButton>
                </ToggleButtonGroup>

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
                    animationDuration={1000}
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
            <Paper elevation={12} sx={{ p: 2, height: "100%" }}>
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
                    animationDuration={1000}
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
                   
                  />
                </PieChart>

              </ResponsiveContainer>
              <div className='row mx-2'>
                <FormControl className='col-md-8 me-2' size='small'>
                  <InputLabel htmlFor="grouped-select">Select Department</InputLabel>
                  <Select defaultValue="" id="grouped-select" label="Select Department" onChange={DepartmentChange}>
                    <ListSubheader color='primary' sx={{ fontSize: "12px" }}>Default Department</ListSubheader>
                    {allDepartments
                      .filter(item => item.defaultdep === "yes")
                      .map((item, index) => (
                        <MenuItem sx={{ marginLeft: "20px" }} key={index} value={item.department}>
                          {item.department}
                        </MenuItem>
                      ))}

                    <ListSubheader color='primary' sx={{ fontSize: "12px" }}>Other Department</ListSubheader>
                    {allDepartments
                      .filter(item => item.defaultdep === "no")
                      .map((item, index) => (
                        <MenuItem sx={{ marginLeft: "20px" }} key={index} value={item.department}>
                          {item.department}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <Button className='col' size='small' fullWidth variant='contained' onClick={(e) => updateItemData(e)}>Move</Button>

              </div>

            </Paper>
          </div>
        </div>

        <div className="row gx-3 mx-3">
          <div className="col-md-8">
            <Paper sx={{ p: 2, }} elevation={12}>
              <Box sx={{ height: 400, mb: 2 }}>
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

                  onRowSelectionModelChange={handleRowSelectionChange}
                  sx={{
                    ".MuiTablePagination-displayedRows": {

                      "margin-top": "1em",
                      "margin-bottom": "1em"
                    }
                  }}

                  checkboxSelection
                  // onRowClick={handleSelectRow}
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                    },
                  }}

                />
              </Box>
              <div className="row">
                <div className="col-md-9">
                  <Button size='small' className='me-2'>Onsite</Button>
                  {(selectedRows.length === 1 && selectedRows[0].itemCalibrationSource === "InHouse") && <Button size='small' className='me-2' onClick={() => { setCalOpen(true); setCalData() }}>Cal</Button>}
                  <Button size='small' className='me-2'>Grn</Button>
                  <Button size='small'>Create DC</Button>
                </div>
                <div className="col-md-3">
                  <Button component={Link} to="/itemmaster" size='small' className='me-2'>Item Master</Button>
                  <Button component={Link} to="/itemList" size='small'>Item Entry</Button>
                </div>
              </div>
            </Paper>
          </div>
          <div className="col-md-4">
            <Paper className='col' elevation={12} sx={{ p: 2, height: "100%" }}>
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

            <Dialog fullWidth={true} maxWidth="xl" open={calOpen} sx={{ color: "#f1f4f4" }} onClose={() => setCalOpen(false)}>
              <DialogTitle align='center'>Calibration</DialogTitle>

              <DialogContent >

                <div className="row mb-2">
                  <Paper elevation={12} sx={{ p: 2 }} className='col-md-4 '>
                    <div className="row g-2 ">
                      <div className="col-md-6">
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                          value={calibrationData.calIMTENo}
                          id="calIMTENoId"
                          size='small'
                          label="Item IMTE No"
                          name='calIMTENo'
                          fullWidth
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                          name='calItemName'
                          id="calItemNameId"
                          size='small'
                          label="Item Name"
                          value={calibrationData.calItemName}
                          fullWidth
                          variant="outlined"
                        />
                      </div>

                      <div className="col-md-6">
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                          name='calItemType'
                          id="calItemTypeId"
                          size='small'
                          label="Item Type"
                          value={calibrationData.calItemType}
                          fullWidth
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-3">
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                          value={calibrationData.calRangeSize}
                          id="calRangeSizeId"
                          size='small'
                          label="Range/Size"
                          name='calRangeSize'
                          fullWidth
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-3">
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                          value={calibrationData.calLC}
                          id="calLCId"
                          size='small'
                          label="Least Count"
                          name='calLC'
                          fullWidth
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                          value={calibrationData.calItemMFRNo}
                          id="calItemMFRNoId"
                          size='small'
                          label="Item MFR No"
                          name='calItemMFRNo'
                          fullWidth
                          variant="outlined"
                        />
                      </div>

                      <div className="col-md-6">
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                          value={calibrationData.calItemMake}
                          id="calItemMakeId"
                          size='small'
                          label="Make"
                          name='calItemMake'
                          fullWidth
                          variant="outlined"
                         
                        />
                      </div>
                    </div>
                  </Paper>

                  <Paper elevation={12} sx={{ p: 2 }} className='col-4 '>
                    <div className="row g-2 ">

                      <div className="col-md-6">
                        <TextField
                          id="calItemTemperatureId"
                          size='small'
                          label="Temperature"
                          value={calibrationData.calItemTemperature}
                          fullWidth
                          name='calItemTemperature'
                          variant="outlined"
                          onChange={handleCalData}
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          id="calItemHumidityId"
                          size='small'
                          label="Humidity"
                          value={calibrationData.calItemHumidity}
                          name='calItemHumidity'
                          fullWidth
                          variant="outlined"
                          onChange={handleCalData}
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                          id="calItemUncertainityId"
                          size='small'
                          label="Uncertainity"
                          value={calibrationData.calItemUncertainity}
                          name='calItemUncertainity'
                          fullWidth
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                          id="calItemSOPNoId"
                          size='small'
                          label="SOP No."
                          value={calibrationData.calItemSOPNo}
                          name='calItemSOPNo'
                          fullWidth
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                          id="calStandardRefId"
                          size='small'
                          label="Standard Ref"
                          value={calibrationData.calStandardRef}
                          name='calStandardRef'
                          fullWidth
                          variant="outlined"
                        />
                      </div>

                    </div>
                  </Paper>

                  <Paper elevation={12} sx={{ p: 2 }} className='col-4 '>
                    <div className="row g-2 ">
                      <div className="col-md-6">
                        <TextField
                          id="calCertificateNoId"
                          size='small'
                          label="Certificate No."
                          value={calibrationData.calCertificateNo}
                          name='calCertificateNo'
                          fullWidth
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-6">
                        <DatePicker format="DD-MM-YYYY" slotProps={{ textField: { size: 'small' } }} value={dayjs(calibrationData.calItemCalDate)} onChange={(newValue) => setCalibrationData((prev) => ({ ...prev, calItemCalDate: newValue.format('YYYY-MM-DD') }))} />
                      </div>
                      <div className="col-md-6">
                        <DatePicker format="DD-MM-YYYY" slotProps={{ textField: { size: 'small' } }} value={dayjs(calibrationData.calItemDueDate)} onChange={(newValue) => setCalibrationData((prev) => ({ ...prev, calItemDueDate: newValue.format('YYYY-MM-DD') }))} />
                      </div>
                      <div className="col-md-6">
                        <DatePicker format="DD-MM-YYYY" slotProps={{ textField: { size: 'small' } }} value={dayjs(calibrationData.calItemEntryDate)} onChange={(newValue) => setCalibrationData((prev) => ({ ...prev, calItemEntryDate: newValue.format('YYYY-MM-DD') }))} />
                      </div>
                      <div className="col-md-6">
                        <TextField
                          id="calCalibratedById"
                          size='small'
                          label="Calibrated By"
                          value={calibrationData.calCalibratedBy}
                          name='calCalibratedBy'
                          fullWidth
                          select
                          variant="outlined"
                          onChange={handleCalData}
                        >
                          {activeEmps.map((emp, index)=> (
                          <MenuItem key={index} value={emp._id}>{emp.firstName + " "+ emp.lastName}</MenuItem>
                        ))}
                        </TextField>
                        
                        
                      </div>
                      <div className="col-md-6">
                        <TextField
                         InputProps={{
                          disabled: selectedEmp.length === 0,
                        }}
                          id="calApprovedById"
                          size='small'
                          label="Approved By"
                          select
                          value={calibrationData.calApprovedBy}
                          name='calApprovedBy'
                          fullWidth
                          variant="outlined"
                          onChange={handleCalData}
                        >
                           {selectedEmp.map((emp, index)=> (
                          <MenuItem key={index} value={emp._id}>{emp.firstName+" "+ emp.lastName}</MenuItem>
                        ))}
                        </TextField>
                      </div>
                    </div>
                  </Paper>
                </div>
                <Paper elevation={12} sx={{ p: 2 }} className='col-md-12'>
                  <h5 className='text-center'>Calibration Data</h5>

                  <table className='table table-bordered table-responsive text-center align-middle'>
                    {calibrationData.calItemType === "attribute" &&
                      <tbody>
                        <tr>
                          <th>Parameter</th>
                          <th>Range/Size</th>
                          <th>Unit</th>
                          <th>Max</th>
                          <th>Min</th>
                          <th>WearLimit</th>
                          <th>Observed Size/ Observer Error</th>
                          <th>Unit</th>
                          <th>Status</th>
                        </tr>
                        {/* {calibrationData.calcalibrationData.map((item)=> ()} */}
                        <tr>
                        </tr>
                      </tbody>}
                    {calibrationData.calItemType === "variable" &&

                      <tbody>
                        <tr>
                          <th>Parameter</th>
                          <th>Range/Size</th>
                          <th>Unit</th>
                          <th>Permissible Error</th>
                          
                          <th>Observed Size/ Observer Error</th>
                          <th>Unit</th>
                          <th>Status</th>
                        </tr>
                        {calibrationData.calcalibrationData.map((item, index) => (
                          <tr>
                            <td></td>
                            <td></td>


                            <td> </td>
                            <td></td>

                            <td><input type="text" className='form-control form-control-sm' id="acMaxPSId" name="acMaxPS" placeholder='max' value={item.acMaxPS} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>


                            <td><input type="text" className="form-control form-control-sm" id="acWearLimitPSId" name="acWearLimitPS" placeholder='wearLimit' value={item.acWearLimitPS} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>

                            {/* {obCheckedValue === "minmax" &&
                            <React.Fragment>
                              <td><input type="text" className="form-control form-control-sm" id="acMinOBId" name="acMinOB" placeholder='min' value={item.acMinOB} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                              <td><input type="text" className='form-control form-control-sm' id="acMaxOBId" name="acMaxOB" placeholder='max' value={item.acMaxOB} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                            </React.Fragment>
                          }
                          {obCheckedValue === "average" &&
                            <React.Fragment>
                              <td colSpan={2}><input type="text" className="form-control form-control-sm" id="acAverageOBId" name="acAverageOB" placeholder='Average' value={item.acAverageOB} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                            </React.Fragment>
                          } */}
                          </tr>
                        ))}

                      </tbody>
                    }
                    {calibrationData.calItemType === "referencestandard" &&

                      <tbody>
                        <tr>
                          <th>Parameter</th>
                          <th>Range/Size</th>
                          <th>Unit</th>
                          <th>Max</th>
                          <th>Min</th>
                          <th>WearLimit</th>
                          <th>Observed Size/ Observer Error</th>
                          <th>Unit</th>
                          <th>Status</th>
                        </tr>
                        {/* {calibrationData.calcalibrationData.map((item)=> ()} */}
                        <tr>
                        </tr>
                      </tbody>
                    }
                  </table>



                </Paper>
                <Paper elevation={12} sx={{ p: 2 }} className='col-md-12'>
                    <h5 className='text-center'>Master Used</h5>
                    <table>
                      <tbody>
                        <tr>
                          <th>IMTE No</th>
                          <th>Master Name</th>
                          <th>Range/Size</th>
                          <th>Cal Certificate No</th>
                          <th>Cal Date</th>
                          <th>Next Due</th>
                          <th>Calibrated At</th>
                        </tr>
                        
                        <tr></tr>
                      </tbody>
                    </table>
                </Paper>

              </DialogContent>
              <DialogActions>
                <Button onClick={() => setCalOpen(false)}>Cancel</Button>
                <Button onClick={() => setCalOpen(false)}>Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>








      </LocalizationProvider>

    </div>







  )
}

export default Home