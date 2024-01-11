import React, { useEffect, useState, createContext } from 'react'
import { TextField, MenuItem, Button } from '@mui/material';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { Edit, FilterAlt, PrintRounded } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { useEmployee } from '../../App';
import TotalPrint from './TotalPrint';
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
export const TotalListContent = createContext(null);
const TotalList = () => {

  const [selectedRows, setSelectedRows] = useState([]);
  const [totalPrintOpen, setTotalPrintOpen] = useState(false);




  










  const employeeRole = useEmployee()

  console.log(dayjs("2023-11-17").isSameOrBefore("2023-11-21"))
  const [itemList, setItemList] = useState([]);

  const [FilterNameList, setFilterNameList] = useState({
    itemIMTENo: [],
    itemType: [],
    itemDepartment: [],
    itemPlant: [],
    itemCalibrationSource: []
  })




  const [partDataList, setPartDataList] = useState([])
  const [partCutomerNames, setPartCutomerNames] = useState([])
  const partFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/part/getAllParts`
      );

      setPartDataList(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    partFetchData();

  }, [])
  console.log();
  //
  const [filteredItemListData, setFilteredItemListData] = useState([])
  const oneMonthBefore = dayjs().subtract(dayjs().date() - 1, 'day')
  const [dateData, setDateData] = useState({
    fromDate: oneMonthBefore.format('YYYY-MM-DD'),
    toDate: dayjs().format('YYYY-MM-DD')
  })

  const itemFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
      );
      // You can use a different logic for generating the id

      const filterNames = ["itemIMTENo", "itemType", "itemDepartment", "itemPlant", "itemCalibrationSource"]

      let updatedFilterNames = {};

      filterNames.forEach((element, index) => {
        const data = response.data.result.map(item => item[element]);
        filterNames[index] = [...new Set(data)];

        // Update the object with a dynamic key based on the 'element'
        updatedFilterNames[element] = filterNames[index];
        console.log(updatedFilterNames)
      });

      // Update state outside the loop with the updated object
      setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));

      console.log(partDataList)

      setItemList(response.data.result);
      setFilteredItemListData(response.data.result);

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    itemFetch();
  }, []);

  useEffect(() => {
    const filteredItems = itemList.filter((item) => dayjs(item.itemCalDate).isSameOrAfter(dateData.fromDate) && dayjs(item.itemCalDate).isSameOrBefore(dateData.toDate))
    console.log(filteredItems)
    setFilteredItemListData(filteredItems)
  }, [dateData.fromDate, dateData.toDate])


  console.log(FilterNameList)
  const [today, setToday] = useState(dayjs().format('YYYY-MM-DD'))
  console.log(today)

  console.log(partDataList)

  useEffect(() => {
    if (partDataList.length !== 0) {
      
      const partCustomers = partDataList.filter(part => itemList.some(item => item.itemPartName.includes(part._id)))
      console.log(partCustomers)
      setPartCutomerNames(partCustomers)

    }
  }, [partDataList, itemList])


  console.log(partCutomerNames)













  const [openModalStatus, setOpenModalStatus] = useState(false);
  const [itemStatusDataList, setItemStatusDataList] = useState([])
  const itemStatusFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
      );
      setItemStatusDataList(response.data.result);

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    itemStatusFetchData();
  }, []);
  console.log(itemStatusDataList)


  const [showDialog, setShowDialog] = useState(false);


  const [vendorCalDataList, setVendorCalDataList] = useState([])
  const calFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
      );
      setVendorCalDataList(response.data.result);

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    calFetchData();
  }, []);



  const [itemAddList, setItemAddList] = useState([]);

  const itemAddFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByIMTESort`
      );
      // You can use a different logic for generating the id

      setItemAddList(response.data.result);


    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    itemAddFetch();
  }, []);


  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  }



  const columns = [

    { field: 'id', headerName: 'Si. No', width: 60, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center" },
    { field: 'itemIMTENo', headerName: 'IMTE No', width: 100, headerAlign: "center", align: "center" },
    { field: 'itemAddMasterName', headerName: 'Description', width: 120, headerAlign: "center", align: "center" },
    {
      field: 'Range/Size',
      headerName: 'Range/Size',
      headerAlign: "center", align: "center",
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 130,
      valueGetter: (params) =>
        `${params.row.itemRangeSize || ''} ${params.row.itemLCUnit || ''}`,
    },
    { field: 'itemMake', headerName: 'Make', width: 90, headerAlign: "center", align: "center", },
    { field: 'itemCalDate', headerName: 'Cal Date', width: 100, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY') },
    { field: 'itemDueDate', headerName: 'Due Date', width: 110, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemDueDate).format('DD-MM-YYYY') },
    { field: 'itemLC', headerName: 'ItemLC', width: 60, headerAlign: "center", align: "center", valueGetter: (params) => params.row.itemLC || "-" },
    { field: 'itemCalFreInMonths', headerName: 'Frequency', type: "number", width: 100, headerAlign: "center", align: "center" },
    { field: 'itemCalibrationSource', headerName: 'Cal Done At ', width: 100, headerAlign: "center", align: "center" },
    { field: 'itemStatus', headerName: 'Status ', width: 80, headerAlign: "center", align: "center", },
    { field: 'itemCurrentLocation', headerName: 'Current location', width: 120, headerAlign: "center", align: "center", },
    { field: 'itemSupplier', headerName: 'Cal Source', renderCell: (params) => params.row.itemSupplier.toString(), width: 110, headerAlign: "center", align: "center", },
    {
      field: 'itemType',
      headerName: 'Type',
      width: 180,
      headerAlign: "center", align: "center",
      renderCell: (params) => {
        const itemType = params.row.itemType.toString();
        return itemType.charAt(0).toUpperCase() + itemType.slice(1).toLowerCase();
      },
    },
    { field: 'itemPartName', headerName: 'Part Name', width: 120, headerAlign: "center", align: "center", },

  ];


  const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])

  const [filterAllNames, setFilterAllNames] = useState({

    imteNo: "all",
    itemType: "all",
    currentLocation: "all",
    customerWise: "all",
    supplierWise: "all",
    partName: "all",
    status: "all",
    plantWise: "all",

  })

  // Track if all filters are cleared



  const handleFilterChangeItemList = (e) => {
    const { name, value } = e.target;
    console.log(e)
    if (value === "all") {
      setFilteredItemListData(itemList)
    } else {
      if (name === "imteNo") {
        const imteNo = itemList.filter((item) => (item.itemIMTENo === value))
        setFilteredItemListData(imteNo)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: value,
          itemType: "all",
          currentLocation: "all",
          customerWise: "all",
          supplierWise: "all",
          partName: "all",
          status: "all",
          plantWise: "all",
        }))
      }
      if (name === "itemType") {
        const itemType = itemList.filter((item) => (item.itemType === value))
        console.log(itemType)
        setFilteredItemListData(itemType)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          itemType: value,
          currentLocation: "all",
          customerWise: "all",
          supplierWise: "all",
          partName: "all",
          status: "all",
          plantWise: "all",
        }))


      }
      if (name === "currentLocation") {
        const currentLocation = itemList.filter((item) => (item.itemDepartment === value))
        setFilteredItemListData(currentLocation)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          itemType: "all",
          currentLocation: value,
          customerWise: "all",
          supplierWise: "all",
          partName: "all",
          status: "all",
          plantWise: "all",
        }))
      }
      if (name === "customerWise") {
        const customerWise = itemList.filter((item) =>
          item.itemCustomer && Array.isArray(item.itemCustomer) && item.itemCustomer.includes(value)
        );
        setFilteredItemListData(customerWise);
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          itemType: "all",
          currentLocation: "all",
          customerWise: value,
          supplierWise: "all",
          partName: "all",
          status: "all",
          plantWise: "all",
        }))
      }
      if (name === "supplierWise") {
        if (value) {
          const supplierWise = itemList.filter((item) => item.itemCurrentLocation && item.itemLocation !== "itemDepartment" && item.dcStatus === "1");
          console.log(supplierWise);
          setFilteredItemListData(supplierWise);
          setFilterAllNames((prev) => ({
            ...prev,
            imteNo: "all",
            itemType: "all",
            currentLocation: "all",
            customerWise: "all",
            supplierWise: value,
            partName: "all",
            status: "all",
            plantWise: "all",
          }));
        }
      }
      // if (name === "partName") {
      //   const partName = itemList.filter((item) => (item.partName === value);
      //   setFilteredItemListData(partName);
      //   setFilterAllNames((prev) => ({
      //     ...prev,
      //     imteNo: "all",
      //     itemType: "all",
      //     currentLocation: "all",
      //     customerWise: "all",
      //     supplierWise: "all",
      //     partName: value, // Update the partName value in the filterAllNames state
      //     status: "all", // Reset other filters if needed
      //     plantWise: "all",
      //   }));
      // }
      if (name === "partName") {
        const filteredItems = itemList.filter((item) => (item.itemPartName.includes(value)));

        setFilteredItemListData(filteredItems);
        console.log(filteredItems)
        setFilterAllNames((prev) => ({
          ...prev,
          imteNo: "all",
          itemType: "all",
          currentLocation: "all",
          customerWise: "all",
          supplierWise: "all",
          partName: value, // Update the partName value in the filterAllNames state
          status: "all", // Reset other filters if needed
          plantWise: "all",
        }));
      }
    


      if (name === "status") {
        const partName = itemList.filter((item) => (item.itemStatus === value))
        setFilteredItemListData(partName)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          itemType: "all",
          currentLocation: "all",
          customerWise: "all",
          supplierWise: "all",
          partName: "all",
          status: value,
          plantWise: "all",
        }))
      }
      if (name === "plantWise") {
        const plantWise = itemList.filter((item) => (item.itemPlant === value))
        setFilteredItemListData(plantWise)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          itemType: "all",
          currentLocation: "all",
          customerWise: "all",
          supplierWise: "all",
          partName: "all",
          status: "all",
          plantWise: value,
        }))
      }
      if (name === "calibrationSource") {

        const calibrationSource = itemList.filter((item) => (item.itemCalibrationSource === value))
        setFilteredItemListData(calibrationSource)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          itemType: "all",
          currentLocation: "all",
          customerWise: "all",
          supplierWise: "all",
          partName: "all",
          status: "all",
          plantWise: "all",
          calibrationSource: value,
        }))
      }


    }


  };




  console.log(filteredItemListData)
  {/* const dueDatePicker = (newValue, name) => {
      let startDate = "";
      let endDate = "";
      let startDueDate = "";
      let endDueDate = "";

      // console.log(newValue.format("YYYY-MM-DD"));

      if (name === "dueStartDate") {
          startDate = newValue.format("YYYY-MM-DD");
      }
      if (name === "dueEndDate") {
          endDate = newValue.format("YYYY-MM-DD");
      }

     
          const filteredData = itemList.filter((item) => {
              console.log(item.itemDueDate)
              return (
                  item.itemDueDate >= startDate && item.itemDueDate <= endDate)

          }

          );
          console.log(filteredData)
    


  };*/}
  const dueDatePicker = (newValue, name) => {
    let startDate = "";
    let endDate = "";
    let startDueDate = "";
    let endDueDate = "";


    if (name === "dueStartDate") {
      startDate = newValue.format("YYYY-MM-DD");
    }
    if (name === "dueEndDate") {
      endDate = newValue.format("YYYY-MM-DD");
    }

    const filteredData = itemList.filter((item) => {
      console.log(item.itemDueDate);

      // Assuming item.itemDueDate is a valid date
      const itemDueDate = new Date(item.itemDueDate);

      return (
        (startDate === "" || itemDueDate >= new Date(startDate)) &&
        (endDate === "" || itemDueDate <= new Date(endDate))
      );
    });

    console.log(filteredData);
  };

  {/*const updateVendor = async (params) => {
      console.log(params)
      setVendorData(params.row)
      setVendorStateId(params.id)
  }*/}
  const [supplierList, setSupplierList] = useState([])

  const [customerList, setCustomerList] = useState([])

  const vendorFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
      );
      console.log(response.data.result)
      const customersList = response.data.result.filter((item) => item.customer === "1")
      const suppliersList = response.data.result.filter((item) => item.oem === "1")
      setSupplierList(suppliersList);
      setCustomerList(customersList);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    vendorFetch();
  }, []);
  const [vendorDataList, setVendorDataList] = useState([])
  const vendorFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
      );
      setVendorDataList(response.data.result);


    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    vendorFetchData();
  }, []);





  const [departmentList, setDepartmentList] = useState([]);

  const depFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/department/getAllDepartments`
      );
      setDepartmentList(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    depFetchData();
  }, []);







  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [errorhandler, setErrorHandler] = useState({});

  console.log(itemListSelectedRowIds)




  const [dueDate, setDueDate] = useState("")


  const handleDueChange = (e) => {
    const { value } = e.target;
    setDueDate(value)
    const currentDate = dayjs();

    // Example: Filtering data for the last 7 days
    const sevenDaysAgo = currentDate.add(7, 'day');
    const fifteenDaysAgo = currentDate.add(15, 'day');
    const thirtyDaysAgo = currentDate.add(30, 'day');
    // console.log(sevenDaysAgo.format("YYYY-MM-DD"))

    if (value === "all") {
      setFilteredItemListData(itemList)
    } else {


      if (value === "Past") {
        const pastData = itemList.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
        setFilteredItemListData(pastData)
        console.log("past")
      }
      if (value === "Today") {
        const CurrentDue = itemList.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
        console.log(dayjs().isSame(currentDate))
        setFilteredItemListData(CurrentDue)
      }
      if (value === "7") {

        const filteredDataLast7Days = itemList.filter((item) => {
          console.log(item.itemDueDate)
          return (dayjs(item.itemDueDate).isSameOrBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isSameOrAfter(currentDate.format("YYYY-MM-DD")))
        })
        console.log(dayjs("2023-11-11").isBefore(sevenDaysAgo))
        console.log(filteredDataLast7Days)
        setFilteredItemListData(filteredDataLast7Days)
      }
      if (value === "15") {

        const fifteenDaysFilter = itemList.filter((item) => {
          console.log(item.itemDueDate)
          return (dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
        })
        setFilteredItemListData(fifteenDaysFilter)
      }
      if (value === "30") {

        const thirtyDaysFilter = itemList.filter((item) => {
          console.log(item.itemDueDate)
          return (dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
        })
        setFilteredItemListData(thirtyDaysFilter)
      }

      if (value === ">30") {

        const thirtyDaysFilter = itemList.filter((item) => {
          console.log(item.itemDueDate)
          return (dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))
        })
        setFilteredItemListData(thirtyDaysFilter)
      }

      if (value === "Date") {
        setFilteredItemListData(itemList)
      }

    }



  }
  const [itemId, setItemId] = useState("")
  const [statusInfo, setStatusInfo] = useState([])






  const handleConfirmDialogClose = () => {
    setShowDialog(false);
  };
  const handleSelectionModelChange = (newSelection) => {
    setItemListSelectedRowIds(newSelection);
  };







  const handleCloseDialog = () => {
    setOpenModalStatus(false);
  };
  const handleSave = () => {
    if (itemListSelectedRowIds) {

      console.log('Save logic:', itemListSelectedRowIds);
      setOpenModalStatus(false); // Close dialog after saving
    }
  };










  return (
    <div style={{ margin: "2rem" }}>
      <form>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <Paper sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            mb: 1,

          }} elevation={12}
          >
            <div className='row g-2  '>
              <Typography variant="h5" className="text-center mb-2">Total List</Typography>

              <div className="col d-flex mb-2 ">

                <TextField label="Imte No"
                  id="imteNoId"
                  required
                  select
                  value={filterAllNames.imteNo}
                  fullWidth
                  size="small"
                  onChange={handleFilterChangeItemList}
                  name="imteNo" >
                  <MenuItem value="all">All</MenuItem>
                  {FilterNameList.itemIMTENo.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </TextField>

              </div>
              <div className="col d-flex  mb-2">

                <TextField label="Item Type"
                  id="itemTypeId"
                  select
                  value={filterAllNames.itemType}
                  fullWidth
                  onChange={handleFilterChangeItemList}
                  size="small"
                  name="itemType" >
                  <MenuItem value="all">All</MenuItem >
                  <MenuItem value="attribute">Attribute</MenuItem >
                  <MenuItem value="variable">Variable</MenuItem >
                  <MenuItem value="referenceStandard">Reference Standard</MenuItem >
                </TextField>

              </div>
              <div className="col d-flex  mb-2">

                <TextField label="Department Wise"
                  id="currentLocationId"
                  select
                  value={filterAllNames.currentLocation}
                  fullWidth
                  onChange={handleFilterChangeItemList}
                  size="small"
                  name="currentLocation" >
                  <MenuItem value="all">All</MenuItem>
                  {FilterNameList.itemDepartment.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}

                </TextField>

              </div>
              <div className="col d-flex  mb-2">

                <TextField label="Other Location"
                  id="supplierWiseId"
                  select
                  value={filterAllNames.supplierWise}
                  fullWidth
                  size="small"
                  onChange={handleFilterChangeItemList}
                  name="supplierWise" >
                  <MenuItem value="all">All</MenuItem>
                  {vendorDataList.map((item, index) => (
                    <MenuItem key={index} value={item.fullName}>{item.fullName}</MenuItem>
                  ))}
                </TextField>



              </div>
              <div className="col d-flex  mb-2">

                <TextField label="Customer Wise"
                  id="customerWiseId"
                  select
                  value={filterAllNames.customerWise}
                  fullWidth
                  size="small"
                  onChange={handleFilterChangeItemList}
                  name="customerWise" >
                  <MenuItem value="all">All</MenuItem>
                  {partCutomerNames.map((item, index) => (
                    <MenuItem key={index} value={item}>{item.customer}</MenuItem>
                  ))}
                </TextField>

              </div>
              <div className="col d-flex  mb-2">

                <TextField label="Calibration source"
                  id="calibrationSourceId"
                  select
                  defaultValue={"all"}
                  fullWidth
                  size="small"
                  value={filterAllNames.calibrationSource}
                  onChange={handleFilterChangeItemList}
                  name="calibrationSource" >
                  <MenuItem value="all">All</MenuItem>
                  {FilterNameList.itemCalibrationSource.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </TextField>

              </div>
              <div className="col d-flex  mb-2">

                <TextField label=" Part No & Part Name"
                  id="partNameId"
                  select
                  value={filterAllNames.partName}
                  fullWidth
                  size="small"
                  onChange={handleFilterChangeItemList}

                  name="partName" >
                  <MenuItem value="all">All</MenuItem>
                  {partCutomerNames.map((item, index) => (
                    <MenuItem key={index} value={item._id}>{[item.partNo, item.partName].join(', ')}</MenuItem>
                  ))}
                </TextField>

              </div>
              <div className="col d-flex  mr-1 ">

                <TextField label="Plant Wise"
                  id="plantWiseId"
                  select
                  value={filterAllNames.plantWise}
                  fullWidth
                  size="small"
                  onChange={handleFilterChangeItemList}
                  name="plantWise" >
                  <MenuItem value="all">All</MenuItem>
                  {FilterNameList.itemPlant.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}

                </TextField>

              </div>


            </div>
            <div className='row g-2'>


              <div className="col d-flex  g-2 mb-2">

                <div className='col-3'>
                  <TextField label="Status"
                    id="statusId"
                    select
                    value={filterAllNames.status}
                    fullWidth
                    size="small"
                    name="status"
                    onChange={handleFilterChangeItemList}>

                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="InActive">InActive</MenuItem>
                    <MenuItem value="Spare">Spare</MenuItem>
                    <MenuItem value="Breakdown">Breakdown</MenuItem>
                    <MenuItem value="Missing">Missing</MenuItem>
                    <MenuItem value="Rejection">Rejection</MenuItem>

                  </TextField>
                </div>

              </div>


              {dueDate === "Date" && <div className='col d-flex justify-content-end mb-2 g-2'>
                <div className="me-2 ">
                  <DatePicker

                    fullWidth
                    id="startDateId"
                    name="dueStartDate"
                    onChange={(newValue) => dueDatePicker(newValue, "dueStartDate")}
                    label="Start Date"


                    slotProps={{ textField: { size: 'small' } }}
                    format="DD-MM-YYYY" />
                </div>
                <div className="me-2">
                  <DatePicker

                    fullWidth
                    id="endDateId"
                    name="dueEndDate"
                    onChange={(newValue) => dueDatePicker(newValue, "dueEndDate")}
                    label="End Date "


                    slotProps={{ textField: { size: 'small' } }}
                    format="DD-MM-YYYY" />
                </div>
                <div>
                  <Button variant='contained' startIcon={<FilterAlt />} color='warning'>Filter</Button>
                </div>
              </div>}
            </div>
            <div>
              <Box sx={{ height: 490, width: '100%', my: 2 }}>
                <DataGrid

                  rows={filteredItemListData}
                  columns={columns}
                  getRowId={(row) => row._id}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  sx={{
                    ".MuiTablePagination-displayedRows": {

                      "marginTop": "1em",
                      "marginBottom": "1em"
                    }
                  }}
                  onRowSelectionModelChange={(newRowSelectionModel, event) => {
                    setItemListSelectedRowIds(newRowSelectionModel);


                  }}

                  slots={{
                    toolbar: GridToolbar,
                  }}

                  density="compact"
                  //disableColumnMenu={true}

                  checkboxSelection
                  // onRowClick={handleRowClick}
                  disableRowSelectionOnClick
                  pageSizeOptions={[5]}
                />



              </Box>



            </div>
            <div className='row'>

              <div className=' col d-flex justify-content-end'>
                {employeeRole.employee !== "viewer" && <React.Fragment>
                  <div className='me-2'>

                  </div>
                </React.Fragment>
                }
              </div>

            </div>
            <div className='row'>
              <div className='col d-flex '>
                {employeeRole.employee !== "viewer" && <React.Fragment>
                  <div className='me-2' >
                    <label className='itemlistloade'>
                      <input className="form-control itemlistdownload" type="file" id="upload" />Upload</label>
                  </div>
                  <div className='me-2'>
                    <label className='itemlistloade'>
                      <input className="form-control itemlistdownload" type="file" id="download" />Download </label>
                  </div>
                </React.Fragment>}


                <div>
                  <Button onClick={() => { setSelectedRows(); setTotalPrintOpen(true) }}><PrintRounded color='success' /></Button>

                </div>

              </div>
              <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '25%' }}>
                  {errorhandler.message}
                </Alert>
              </Snackbar>




            </div>




          </Paper>

        </LocalizationProvider>
      </form>

      <TotalListContent.Provider
        value={{ totalPrintOpen, setTotalPrintOpen, selectedRows, itemList, filteredItemListData,partDataList }}
      >

        <TotalPrint />
      </TotalListContent.Provider>

    </div>
  )
}

export default TotalList