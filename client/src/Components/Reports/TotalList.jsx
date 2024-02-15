import React, { useEffect, useState, createContext } from 'react'
import { TextField, MenuItem, Button } from '@mui/material';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
import axios from 'axios';
import {FilterAlt } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Add, ArrowBack, Delete, Error, HomeMax, House, Mail, MailLock, Send } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { useEmployee } from '../../App';
import TotalPrint from './TotalPrint';
import MailSender from '../mailComponent/MailSender';
import CalDuePrint from './CalDuePrint';
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
export const TotalListContent = createContext(null);
const TotalList = () => {


  const [totalPrintOpen, setTotalPrintOpen] = useState(false);
  const [calDuePrint, setCalDuePrint] = useState(false);
  const [loaded, setLoaded] = useState(false);


  const employeeRole = useEmployee()
  const { allowedPlants } = employeeRole

  console.log(dayjs("2023-11-17").isSameOrBefore("2023-11-21"))
  const [itemList, setItemList] = useState([]);

  const [FilterNameList, setFilterNameList] = useState({
    itemIMTENo: [],
    itemType: [],
    itemDepartment: [],
    itemAddMasterName: [],
    itemPlant: [],
    itemCalibrationSource: [],
    itemCurrentLocation: []
  })

  const sortedFilterNameList = FilterNameList.itemAddMasterName.sort();


  const [partDataList, setPartDataList] = useState([])
  const [partCutomerNames, setPartCutomerNames] = useState([])
  const partFetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT}/part/getPartsByPlant`, { allowedPlants: allowedPlants }
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
    fromDate: "",
    toDate: ""
  })

  const itemFetch = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`, { allowedPlants: allowedPlants }
      );
      console.log(response.data.result)

      const departmentItems = response.data.result.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => plant.departments.includes(item.itemDepartment)))
      console.log(departmentItems)

      const filterNames = ["itemIMTENo", "itemType", " itemAddMasterName", "itemDepartment", "itemPlant", "itemCalibrationSource", "itemCurrentLocation"]

      let updatedFilterNames = {};

      filterNames.forEach((element, index) => {
        const data = departmentItems.map(item => item[element]);
        filterNames[index] = [...new Set(data)];
        // Update the object with a dynamic key based on the 'element'
        updatedFilterNames[element] = filterNames[index];
      });
      console.log(updatedFilterNames)
      // Update state outside the loop with the updated object
      setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
      setItemList(departmentItems);
      setFilteredItemListData(departmentItems);

      setLoaded(true)

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    itemFetch();
  }, []);

  useEffect(() => {
    const partNos = [...new Set(departmentDatas.map(item => item.itemPartName))];
    const customerNames = [...new Set(departmentDatas.map(item => item.itemPartName))];

  })

  const dateFilter = () => {
    if(dateData.fromDate && dateData.toDate){
      const filteredItems = itemList.filter((item) => dayjs(item.itemDueDate).isBetween(dayjs(dateData.fromDate), dayjs(dateData.toDate), 'day', '[]'))
      console.log(filteredItems)
      setFilteredItemListData(filteredItems)
    }
  }

 


  console.log(dateData)
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

  const [companyList, setCompanyList] = useState([])

  const companyFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/compDetails/getAllCompDetails`
      );
      setCompanyList(response.data.result);
      //setFilterCompany(response.data.result);

      console.log(response.data.result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    companyFetch();
  }, []);
  const [plantList, setPlantList] = useState([])

  const Fetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/compDetails/getAllPlantDetails`
      );
      setPlantList(response.data.result);
      //setFilterCompany(response.data.result);

      console.log(response.data.result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Fetch();
  }, []);


  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  }



  const columns = [

    { field: 'id', headerName: 'Si. No', width: 60, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center" },
    { field: 'itemIMTENo', headerName: 'IMTE No', width: 150, headerAlign: "center", align: "left" },
    { field: 'itemAddMasterName', headerName: 'Description', width: 120, headerAlign: "center", align: "left" },
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
    { field: 'itemLC', headerName: 'ItemLC', width: 60, headerAlign: "center", align: "center", valueGetter: (params) => params.row.itemLC || "-" },
    { field: 'itemMake', headerName: 'Make', width: 90, headerAlign: "center", align: "center", },
    { field: 'itemCalDate', headerName: 'Cal Date', width: 100, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY') },
    { field: 'itemDueDate', headerName: 'Due Date', width: 110, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemDueDate).format('DD-MM-YYYY') },
    { field: 'itemCalFreInMonths', headerName: 'Frequency', type: "number", width: 80, headerAlign: "center", align: "center" },
    { field: 'itemCalibrationSource', headerName: 'Cal Source', headerAlign: "center", align: "center", },
    { field: 'itemCalibratedAt', headerName: 'Calibrated At ', width: 110, headerAlign: "center", align: "center", },
    { field: 'itemCurrentLocation', headerName: 'Current location', width: 120, headerAlign: "center", align: "center", },
    { field: 'itemPlant', headerName: 'ItemPlant ', width: 100, headerAlign: "center", align: "center", },
    { field: 'itemDepartment', headerName: 'Primary location', width: 100, headerAlign: "center", align: "center", },
    { field: 'itemStatus', headerName: 'Status ', width: 60, headerAlign: "center", align: "center", },

    {
      field: 'itemType',
      headerName: 'Type',
      width: 100,
      headerAlign: "center", align: "center",
      renderCell: (params) => {
        const itemType = params.row.itemType.toString();
        return itemType.charAt(0).toUpperCase() + itemType.slice(1).toLowerCase();
      }
    },
    { field: 'itemSAPNo', headerName: 'ItemSAPNo ', width: 90, headerAlign: "center", align: "center", valueGetter: (params) => params.row.itemSAPNo || "-" },
    { field: 'itemMFRNo', headerName: 'ItemMFRNo ', width: 90, headerAlign: "center", align: "center", },
    { field: 'itemModelNo', headerName: 'ItemModelNo ', width: 90, headerAlign: "center", align: "center", valueGetter: (params) => params.row.itemModelNo || "-" },
    { field: 'itemMasterRef', headerName: 'ItemMasterRef ', width: 100, headerAlign: "center", align: "center", },
    { field: 'itemReceiptDate', headerName: 'ItemReceiptDate ', width: 100, headerAlign: "center", align: "center", },
    { field: 'itemPlaceOfUsage', headerName: 'Secondary Location ', width: 90, headerAlign: "center", align: "center", },
    { field: 'itemLocation', headerName: 'ItemLocation ', width: 90, headerAlign: "center", align: "center", },
    { field: 'itemCalAlertDays', headerName: 'ItemCalAlertDays ', width: 90, headerAlign: "center", align: "center", },
    { field: 'itemPrevCalData', headerName: 'ItemPrevCalDate ', width: 90, headerAlign: "center", align: "center", },
    { field: 'itemCertificateName', headerName: 'ItemCertificateName ', width: 90, headerAlign: "center", align: "center", },
    { field: 'itemCertificateNo', headerName: 'ItemCertificateNo ', width: 90, headerAlign: "center", align: "center", },
    { field: 'itemUncertainity', headerName: 'ItemUncertainity ', width: 90, headerAlign: "center", align: "center", },
    { field: 'itemPartName', headerName: 'ItemPartName ', width: 90, headerAlign: "center", align: "center", },
    { field: 'itemOBType', headerName: 'ItemOBType ', width: 90, headerAlign: "center", align: "center", },
    { field: 'calibrationCost', headerName: 'CalibrationCost ', width: 90, headerAlign: "center", align: "center", valueGetter: (params) => params.row.calibrationCost || "-" },
    { field: 'gaugeUsage', headerName: 'Gauge life in days ', width: 130, headerAlign: "center", align: "center", valueGetter: (params) => params.row.gaugeUsage || "-" },
    { field: 'lifealertDays', headerName: 'Gauge life alert in days', width: 120, headerAlign: "center", align: "center", valueGetter: (params) => params.row.lifealertDays || "-" },
    { field: 'purchaseRefNo', headerName: 'PurchaseRefNo', width: 90, headerAlign: "center", align: "center", valueGetter: (params) => params.row.purchaseRefNo || "-" },
    { field: 'purchaseDate', headerName: 'PurchaseDate', width: 90, headerAlign: "center", align: "center", valueGetter: (params) => params.row.purchaseDate || "-" },
    { field: 'specialRemark', headerName: 'SpecialRemark', width: 90, headerAlign: "center", align: "center", valueGetter: (params) => params.row.specialRemark || "-" },
    { field: 'drawingIssueNo', headerName: 'DrawingIssueNo', width: 90, headerAlign: "center", align: "center", valueGetter: (params) => params.row.drawingIssueNo || "-" },
    { field: 'drawingNo', headerName: 'DrawingNo', width: 90, headerAlign: "center", align: "center", valueGetter: (params) => params.row.drawingNo || "-" },
    // { field: 'rdName', headerName: 'rdName', width: 90, headerAlign: "center", align: "center", },
    // { field: 'itemItemMasterName', headerName: 'ItemItemMasterName ', width: 90, headerAlign: "center", align: "center", },



  ];


  const [selectedItemList, setSelectedItemList] = useState([])

  const [filterAllNames, setFilterAllNames] = useState({

    plantWise: "all",
    imteNo: "all",
    itemType: "all",
    itemAddMasterName: "all",
    currentLocation: "all",
    itemCurrentLocation: "all",
    customerWise: 'all',
    partName: "all",
    calibrationSource: "all",
    status: "all"


  })

  // Track if all filters are cleared

  const [plantDatas, setPlantDatas] = useState([])
  const [departmentDatas, setDepartmentDatas] = useState([])
  const [itemTypeDatas, setItemTypeDatas] = useState([])
  const [itemMasteDatas, setItemMasterDatas] = useState([])
  const [customerParts, setCustomerParts] = useState([])
  const handleFilterChangeItemList = (e) => {
    const { name, value } = e.target;
    console.log(e)
    // if (name === "plantWise") {
    //   const plantWise = itemList.filter((item) => (item.itemPlant === value))
    //   if (value === "all") {
    //     setFilteredItemListData(itemList)
    //     const filterNames = ["itemIMTENo", "itemType", " itemAddMasterName", "itemDepartment", "itemCalibrationSource", "itemCurrentLocation"]
    //     let updatedFilterNames = {};
    //     filterNames.forEach((element, index) => {
    //       const data = itemList.map(item => item[element]);
    //       filterNames[index] = [...new Set(data)];
    //       // Update the object with a dynamic key based on the 'element'
    //       updatedFilterNames[element] = filterNames[index];
    //     });
    //     console.log(updatedFilterNames)
    //     // Update state outside the loop with the updated object
    //     setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
    //     const partCustomers = partDataList.filter(part => itemList.some(item => item.itemPartName.includes(part.partNo)))
    //     const customerData = partDataList.filter(part => part.customer === value)
    //     setPartCutomerNames(partCustomers)
    //     setCustomerParts(customerData)
    //     setFilterAllNames(prev => ({
    //       ...prev,
    //       imteNo: "all",
    //       plantWise: value,
    //       itemType: "all",
    //       currentLocation: "all",
    //       itemAddMasterName: "all",
    //       customerWise: "all"
    //     }))
    //     setPlantDatas(plantWise)
    //   } else {
    //     setFilteredItemListData(plantWise)
    //     const filterNames = ["itemIMTENo", "itemType", " itemAddMasterName", "itemDepartment", "itemCalibrationSource", "itemCurrentLocation"]

    //     let updatedFilterNames = {};

    //     filterNames.forEach((element, index) => {
    //       const data = plantWise.map(item => item[element]);
    //       filterNames[index] = [...new Set(data)];
    //       // Update the object with a dynamic key based on the 'element'
    //       updatedFilterNames[element] = filterNames[index];
    //     });

    //     console.log(updatedFilterNames)
    //     // Update state outside the loop with the updated object
    //     setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
    //     setFilterAllNames(prev => ({
    //       ...prev,
    //       imteNo: "all",
    //       plantWise: value,
    //       itemType: "all",
    //       currentLocation: "all",
    //       itemAddMasterName: "all",
    //       customerWise: "all"


    //     }))
    //     setPlantDatas(plantWise)

    //     const partCustomers = partDataList.filter(part => plantWise.some(item => item.itemPartName.includes(part.partNo)))
    //     const customerData = partDataList.filter(part => part.customer === value)
    //     setPartCutomerNames(partCustomers)
    //     setCustomerParts(customerData)

    //   }
    // }

    if (name === "plantWise") {
      const plantWise = itemList.filter((item) => (item.itemPlant === value))
      if (value === "all") {
        setFilteredItemListData(itemList)
        const filterNames = ["itemIMTENo", "itemType", "itemAddMasterName", "itemDepartment", "itemCalibrationSource", "itemCurrentLocation"]
        let updatedFilterNames = {};
        filterNames.forEach((element, index) => {
          const data = itemList.map(item => item[element]);
          filterNames[index] = [...new Set(data)];
          // Update the object with a dynamic key based on the 'element'
          updatedFilterNames[element] = filterNames[index];
        });
        console.log(updatedFilterNames)
        // Update state outside the loop with the updated object
        setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
        const partCustomers = partDataList.filter(part => itemList.some(item => item.itemPartName.includes(part.partNo)))
        const customerData = partDataList.filter(part => part.customer === value)
        setPartCutomerNames(partCustomers)
        setCustomerParts(customerData)
      } else {
        setFilteredItemListData(plantWise)
        const filterNames = ["itemIMTENo", "itemType", "itemAddMasterName", "itemDepartment", "itemCalibrationSource", "itemCurrentLocation"]
        let updatedFilterNames = {};

        filterNames.forEach((element, index) => {
          const data = plantWise.map(item => item[element]);
          filterNames[index] = [...new Set(data)];
          // Update the object with a dynamic key based on the 'element'
          updatedFilterNames[element] = filterNames[index];
        });
        console.log(updatedFilterNames)
        // Update state outside the loop with the updated object
        setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          plantWise: value,
          itemType: "all",
          currentLocation: "all",
          itemAddMasterName: "all"
        }))
        setPlantDatas(plantWise)
        const partCustomers = partDataList.filter(part => plantWise.some(item => item.itemPartName.includes(part.partNo)))
        const customerData = partDataList.filter(part => part.customer === value)
        setPartCutomerNames(partCustomers)
        setCustomerParts(customerData)
      }
    }

    if (name === "currentLocation") {
      const currentLocation = plantDatas.filter((item) => (item.itemDepartment === value))
      if (value === "all") {
        setFilteredItemListData(plantDatas)
        const filterNames = ["itemIMTENo", "itemType", "itemAddMasterName", "itemCalibrationSource", "itemCurrentLocation"]
        let updatedFilterNames = {};
        filterNames.forEach((element, index) => {
          const data = plantDatas.map(item => item[element]);
          filterNames[index] = [...new Set(data)];
          // Update the object with a dynamic key based on the 'element'
          updatedFilterNames[element] = filterNames[index];
        });
        console.log(updatedFilterNames)
        // Update state outside the loop with the updated object
        setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
        setFilteredItemListData(plantDatas)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          itemType: "all",
          currentLocation: value,
          itemAddMasterName: "all"
        }))
      } else {
        setFilteredItemListData(currentLocation)
        const filterNames = ["itemIMTENo", "itemType", "itemAddMasterName", "itemCalibrationSource", "itemCurrentLocation"]
        let updatedFilterNames = {};
        filterNames.forEach((element, index) => {
          const data = currentLocation.map(item => item[element]);
          filterNames[index] = [...new Set(data)];
          // Update the object with a dynamic key based on the 'element'
          updatedFilterNames[element] = filterNames[index].sort();
        });
        console.log(updatedFilterNames)
        // Update state outside the loop with the updated object
        setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
        setFilteredItemListData(currentLocation)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          itemType: "all",
          currentLocation: value,
          itemAddMasterName: "all"
        }))
        setDepartmentDatas(currentLocation)
      }
    }
    if (name === "itemType") {
      const itemType = departmentDatas.filter((item) => (item.itemType === value))
      if (value === "all") {
        setFilteredItemListData(departmentDatas)
        const filterNames = ["itemIMTENo", "itemAddMasterName",]
        let updatedFilterNames = {};
        filterNames.forEach((element, index) => {
          const data = departmentDatas.map(item => item[element]);
          filterNames[index] = [...new Set(data)];
          // Update the object with a dynamic key based on the 'element'
          updatedFilterNames[element] = filterNames[index];
        });
        console.log(updatedFilterNames)
        // Update state outside the loop with the updated object
        setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
        setFilteredItemListData(departmentDatas)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          itemType: value,
          itemAddMasterName: "all",
          calibrationSource: "all"
        }))
      } else {
        setFilteredItemListData(itemType)
        const filterNames = ["itemIMTENo", "itemAddMasterName",]
        let updatedFilterNames = {};
        filterNames.forEach((element, index) => {
          const data = itemType.map(item => item[element]);
          filterNames[index] = [...new Set(data)];
          // Update the object with a dynamic key based on the 'element'
          updatedFilterNames[element] = filterNames[index];
        });
        console.log(updatedFilterNames)
        // Update state outside the loop with the updated object
        setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
        setFilteredItemListData(itemType)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          itemType: value,
          itemAddMasterName: "all",
          calibrationSource: "all",
          itemCurrentLocation: "all",
        }))
        setItemTypeDatas(itemType)
      }
    }
    if (name === "itemAddMasterName") {
      const itemAddMasterName = itemTypeDatas.filter((item) => (item.itemAddMasterName === value))
      if (value === "all") {
        setFilteredItemListData(itemTypeDatas)
        const filterNames = ["itemIMTENo"]
        let updatedFilterNames = {};
        filterNames.forEach((element, index) => {
          const data = itemTypeDatas.map(item => item[element]);
          filterNames[index] = [...new Set(data)];
          //
          filterNames.sort()
          // Update the object with a dynamic key based on the 'element'
          updatedFilterNames[element] = filterNames[index];
        });
        console.log(updatedFilterNames)
        // Update state outside the loop with the updated object
        setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
        setFilteredItemListData(itemTypeDatas)
        setFilterAllNames(prev => ({
          ...prev,
          itemAddMasterName: value,
          imteNo: "all",
        }))
      } else {
        setFilteredItemListData(itemAddMasterName)
        const filterNames = ["itemIMTENo"]

        let updatedFilterNames = {};

        filterNames.forEach((element, index) => {
          const data = itemAddMasterName.map(item => item[element]);
          filterNames[index] = [...new Set(data)];
          // Update the object with a dynamic key based on the 'element'
          updatedFilterNames[element] = filterNames[index];
        });
        console.log(updatedFilterNames)
        // Update state outside the loop with the updated object
        setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
        setFilteredItemListData(itemAddMasterName)
        setFilterAllNames(prev => ({
          ...prev,
          itemAddMasterName: value,
          imteNo: "all",
        }))
        setItemMasterDatas(itemAddMasterName)
      }
    }
    if (name === "imteNo") {
      const imteNo = itemMasteDatas.filter((item) => (item.itemIMTENo === value))
      if (value === "all") {
        setFilteredItemListData(itemMasteDatas)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: value,
        }))
      } else {
        setFilteredItemListData(imteNo)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: value,
        }))
      }
    }
    if (name === "customerWise") {
      const customerData = partDataList.filter(part => part.customer === value)
      const customers = plantDatas.filter(item => customerData.some(cus => item.itemPartName.includes(cus.partNo)))
      console.log(customers)
      if (value === " all") {
        setFilteredItemListData(plantDatas)
        setCustomerParts(customerData)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          itemType: "all",
          customerWise: value,
          supplierWise: "all",
          partName: "all",
          status: "all",
          plantWise: "all",
          itemAddMasterName: "all",
          calibrationSource: "all",
          itemCurrentLocation: "all"
        }))

      } else {
        setFilteredItemListData(customers)
        setCustomerParts(customerData)
        setFilterAllNames(prev => ({
          ...prev,
          imteNo: "all",
          itemType: "all",
          customerWise: value,
          supplierWise: "all",
          partName: "all",
          status: "all",
          plantWise: "all",
          itemAddMasterName: "all",
          calibrationSource: "all",
          itemCurrentLocation: "all"
        }))

      }

    }
    if (name === "supplierWise") {
      const supperlierWise = departmentDatas.filter((item) => item.itemSupplier.includes(value))
      setFilteredItemListData(supperlierWise)
      setFilterAllNames(prev => ({
        ...prev,
        imteNo: "all",
        itemType: "all",
        currentLocation: "all",
        customerWise: "all",
        supplierWise: value,
        partName: "all",
        status: "all",
        plantWise: "all",
        calibrationSource: "all",
        itemCurrentLocation: "all",
        itemAddMasterName: "all",
      }))
    }
    if (name === "partName") {
      console.log(name, value)
      const filteredItems = plantDatas.filter((item) => (item.itemPartName.includes(value)));
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
        calibrationSource: "all",
        itemCurrentLocation: "all",
        itemAddMasterName: "all",
      }));
    }
    if (name === "status") {
      const partName = departmentDatas.filter((item) => (item.itemStatus === value))
      if (value === "all") {
        setFilteredItemListData(departmentDatas)
        setFilterAllNames(prev => ({
          ...prev,

          status: value,

        }))

      } else {
        setFilteredItemListData(partName)
        setFilterAllNames(prev => ({
          ...prev,
          status: value,
        }))
      }
    }
    if (name === "calibrationSource") {
      const calibrationSource = departmentDatas.filter((item) => (item.itemCalibrationSource === value))
      if (value === "all") {
        setFilteredItemListData(departmentDatas)
        setFilterAllNames(prev => ({
          ...prev,
          calibrationSource: value,
        }))
      } else {
        setFilteredItemListData(calibrationSource)
        setFilterAllNames(prev => ({
          ...prev,
          calibrationSource: value,
        }))

      }
    }
    if (name === "itemCurrentLocation") {
      const itemCurrentLocation = departmentDatas.filter((item) => (item.itemCurrentLocation === value))
      if (value === "all") {
        setFilteredItemListData(departmentDatas)
        setFilterAllNames(prev => ({
          ...prev,
          itemCurrentLocation: value,
        }))
      } else {
        setFilteredItemListData(itemCurrentLocation)
        setFilterAllNames(prev => ({
          ...prev,
          itemCurrentLocation: value,
        }))
      }
    }
  };
  // if (name === "supplierWise") {
  //   if (value) {
  //     const supplierWise = departmentDatas.filter((item) => item.itemCurrentLocation && item.itemLocation !== "itemDepartment" && item.dcStatus === "1");
  //     console.log(supplierWise);
  //     setFilteredItemListData(supplierWise);
  //     setFilterAllNames((prev) => ({
  //       ...prev,
  //       imteNo: "all",
  //       itemType: "all",
  //       currentLocation: "all",
  //       customerWise: "all",
  //       supplierWise: value,
  //       partName: "all",
  //       status: "all",
  //       plantWise: "all",
  //     }));
  //   }
  // }
  useEffect(() => {
    if (partDataList.length !== 0) {
      const partCustomers = partDataList.filter(part => plantDatas.some(item => item.itemPartName.includes(part.partNo)))
      console.log(partCustomers)
      setPartCutomerNames(partCustomers)
    }
  }, [plantDatas])
  console.log(filteredItemListData)
  const dueDatePicker = (newValue, name) => {
    let startDate = "";
    let endDate = "";
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




  // const [vendorDataList, setVendorDataList] = useState([])
  // const vendorFetchData = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_PORT}/vendor/getVendorByPlants`, { allowedPlants: allowedPlants }
  //     );
  //     setVendorDataList(response.data.result);


  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   vendorFetchData();
  // }, []);

  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [errorhandler, setErrorHandler] = useState({});

  console.log(selectedItemList)

  const handleRowSelectionChange = (newSelection) => {
    const selectedRowsData = filteredItemListData.filter((row) => newSelection.includes(row._id));

    setSelectedItemList(selectedRowsData)


  };




  const [dueDate, setDueDate] = useState("")
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState(itemList);
  const [filterDates, setFilterDates] = useState({
    startDate: "",
    endDate: ""
  })

  const DatefilterFunction = () => {

    const filter = itemList.filter((item) => dayjs(item.itemCalDate).isSameOrAfter(filterDates.startDate) && dayjs(item.itemCalDate).isSameOrBefore(filterDates.endDate))

    console.table(filter)
    setFilteredItemListData(filter)
  }



  const dueDateYear = (newValue, name) => {
    if (name === 'dueStartDate') {
      setStartDate(newValue);
    }
    if (name === 'dueEndDate') {
      setEndDate(newValue);
    }
  };

  const handleDueChanges = () => {
    // Check if both start and end dates are selected
    if (startDate && endDate) {
      const filteredData = itemList.filter((item) => {
        const itemDueDate = new Date(item.itemDueDate);

        return (
          itemDueDate >= new Date(startDate) &&
          itemDueDate <= new Date(endDate)
        );
      });

      // Update the state with the filtered data
      setFilteredData(filteredData);
      console.log()
    } else {
      // Handle case where either start or end date is not selected

    }
  };
  console.log(filteredData);


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

















  const [formatNoData, setFormatNoData] = useState([])
  const formatFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/formatNo/getFormatNoById/1`
      );
      const format = response.data.result
      console.table(format)
      setFormatNoData(format)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    formatFetchData();
  }, []);



  const [mailOpen, setMailOpen] = useState(false)

  const TotalListChildData = {
    mailOpen,
    setMailOpen,
    selectedRows: selectedItemList

  }

  const mailCheck = () => {
    const singlePlant = selectedItemList.every((item, index, array) => item.itemPlant === array[0].itemPlant);

    if (singlePlant && selectedItemList.length > 0) {
      setMailOpen(true)

    }


  }

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
              {/* <Typography variant="h5" className="text-center mb-2">Total List</Typography> */}
              <div className="col d-flex  mr-1 ">
                <TextField label="Plant Wise"
                  id="plantWiseId"
                  select
                  defaultValue="all"
                  // value={filterAllNames.plantWise}
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
              <div className="col d-flex  mb-2">

                <TextField label="Primary Location "
                  id="currentLocationId"
                  select
                  defaultValue="all"
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

                <TextField label="Item Type"
                  id="itemTypeId"
                  select
                  defaultValue="all"
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
              <div className="col ">
                {/* <TextField label="Item Name"
                  id="itemAddMasterNameId"
                  // required
                  select
                  value={filterAllNames.itemAddMasterName}
                  defaultValue="all"
                  fullWidth
                  size="small"


                  onChange={handleFilterChangeItemList}
                  name="itemAddMasterName" >
                  <MenuItem value="all">All</MenuItem>
                  {FilterNameList.itemAddMasterName.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </TextField> */}

                <TextField
                  label="Item Name"
                  id="itemAddMasterNameId"
                  select
                  value={filterAllNames.itemAddMasterName}
                  defaultValue="all"
                  fullWidth
                  size="small"
                  onChange={handleFilterChangeItemList}
                  name="itemAddMasterName"
                >
                  <MenuItem value="all">All</MenuItem>
                  {sortedFilterNameList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>

              </div>

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


            </div>
            <div className='row g-3 mb-2'>
              <div className="col d-flex  mb-2">
                <div className="col d-flex me-2">

                  <TextField label="Customer Wise"
                    id="customerWiseId"
                    select
                    defaultValue="all"
                    fullWidth
                    // value={filterAllNames.customerWise}
                    size="small"
                    onChange={handleFilterChangeItemList}
                    name="customerWise" >
                    <MenuItem value="all">All</MenuItem>
                    {partCutomerNames.map((item, index) => (
                      <MenuItem key={index} value={item.customer}>{item.customer}</MenuItem>
                    ))}
                  </TextField>

                </div>
                {/* <div className="col d-flex me-2">

                  <TextField label=" Part No & Part Name"
                    id="partNameId"
                    select
                    fullWidth
                    size="small"
                    onChange={handleFilterChangeItemList}
                    value={filterAllNames.partName}
                    name="partName" >
                    <MenuItem value="all">All</MenuItem>
                    {partCutomerNames.map((item, index) => (
                      <MenuItem key={index} value={item.partNo}>{[item.partNo, item.partName].join(', ')}</MenuItem>
                    ))}
                  </TextField>
                </div> */}
                {/* <div className="col d-flex  me-2">
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
                </div> */}
                <div className="col me-2">
                  <TextField label="Calibration source"
                    id="calibrationSourceId"
                    select
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
                <div className='col  me-2'>
                  <TextField label="Status"
                    id="statusId"
                    select
                    defaultValue="all"
                    fullWidth
                    size="small"
                    name="status"
                    onChange={handleFilterChangeItemList}>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="spare">Spare</MenuItem>
                    <MenuItem value="breakdown">Breakdown</MenuItem>
                    <MenuItem value="missing">Missing</MenuItem>
                    <MenuItem value="rejection">Rejection</MenuItem>
                  </TextField>
                </div>
                <div className="col me-2 ">
                  <TextField label="Current Location "
                    id="itemCurrentLocationId"
                    select
                    defaultValue="all"
                    value={filterAllNames.itemCurrentLocation}
                    fullWidth
                    onChange={handleFilterChangeItemList}
                    size="small"
                    name="itemCurrentLocation" >
                    <MenuItem value="all">All</MenuItem>
                    {FilterNameList.itemCurrentLocation.map((item, index) => (
                      <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                  </TextField>
                </div>
                
                {dueDate === "Date" && <div className='col d-flex justify-content-end'>
                  <div className="me-2 ">
                    <DatePicker
                      fullWidth
                      id="startDateId"
                      name="dueStartDate"
                      onChange={(newValue) => dueDatePicker(newValue, 'dueStartDate')}
                      label="Start Date"
                      slotProps={{ textField: { size: 'small' } }}
                      format="DD-MM-YYYY"
                    />
                  </div>
                  <div className="me-2">
                    <DatePicker
                      fullWidth
                      id="endDateId"
                      name="dueEndDate"
                      onChange={(newValue) => dueDatePicker(newValue, 'dueEndDate')}
                      label="End Date "
                      slotProps={{ textField: { size: 'small' } }}
                      format="DD-MM-YYYY"
                    />
                  </div>
                  <div>
                    <Button
                      variant='contained'
                      onClick={() => DatefilterFunction()}
                      // startIcon={<FilterAlt />}
                      size='small'
                      color='warning'
                    >
                      Filter
                    </Button>
                  </div>
                </div>}

               
              </div>
              {/* <div className="col-1 offset-7">

              </div> */}

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
                  onRowSelectionModelChange={handleRowSelectionChange}
                  disableDensitySelector
                  disableColumnFilter
                  slots={{
                    toolbar: () => (
                      <div className='d-flex justify-content-between align-items-center'>
                        <GridToolbar />
                        <div className='d-flex'>

                          <div className='d-flex justify-content-end mt-2'>
                            <DatePicker
                              fullWidth
                              className='me-2'
                              id="fromDateId"
                              name="fromDate"
                              size="small"
                              variant="standard"
                              label="From Date"
                              slotProps={{ textField: { size: 'small', fullWidth: true } }}
                              format="DD-MM-YYYY"
                              value={dayjs(dateData.fromDate)}
                              onChange={(newValue) =>
                                setDateData((prev) => ({ ...prev, fromDate: dayjs(newValue).format('YYYY-MM-DD') }))
                              }
                              style={{ width: '150px' }} // Adjust the width according to your preference
                            />

                            <DatePicker
                              fullWidth
                              className='me-2'
                              id="toDateId"
                              name="toDate"
                              size="small"
                              variant="standard"
                              label="To Date"
                              slotProps={{ textField: { size: 'small', fullWidth: true } }}
                              format="DD-MM-YYYY" value={dayjs(dateData.toDate)}
                              onChange={(newValue) =>
                                setDateData((prev) => ({ ...prev, toDate: dayjs(newValue).format('YYYY-MM-DD') }))}
                            />
                            <div className='me-2'><Button onClick={()=> dateFilter()} variant='contained' color='success' endIcon={<FilterAlt />}>Filter</Button></div>
                            
                          </div>

                          <div className='mt-2'><GridToolbarQuickFilter /></div>


                          {selectedItemList.length > 0 && <Button className='mt-2' onClick={() => mailCheck()} size='small' endIcon={<Send />} color="primary">Send Mail</Button>}
                        </div>

                      </div>
                    ),
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

              {/* <div className=' col d-flex justify-content-end'>
                {employeeRole.employee !== "viewer" && <React.Fragment>
                  <div className='me-2'>

                  </div>
                </React.Fragment>
                }
              </div> */}

            </div>
            <div className='row'>
              <div className='col d-flex '>
                {employeeRole.employee !== "viewer" && <React.Fragment>
                  {/* <div className='me-2' >
                    <label className='itemlistloade'>
                      <input className="form-control itemlistdownload" type="file" id="upload" />Upload</label>
                  </div>
                  <div className='me-2'>
                    <label className='itemlistloade'>
                      <input className="form-control itemlistdownload" type="file" id="download" />Download </label>
                  </div> */}
                </React.Fragment>}
                <div>
                  <Button variant="contained" className='me-2' size='small' color="success" onClick={() => { setTotalPrintOpen(true) }}>Total List Print</Button>
                </div>
                {/* <div className='col'>
                  <Button variant="contained" size='small' color="success" onClick={() => { setCalDuePrint(true) }}>CalDueReport Print</Button>
                </div> */}
                <div className='col d-flex justify-content-end'>
                  <div className='me-2'>
                    <Button component={Link} to={`/home`} variant="contained" size='small' color="warning">
                      <ArrowBackIcon /> Dash board
                    </Button>
                  </div>
                  {/* <div >
                      <Button component={Link} to="/" size='small' variant='contained' startIcon={<ArrowBack />} endIcon={<House />} color='secondary'>Home</Button>
                    </div> */}
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
        value={{ totalPrintOpen, setTotalPrintOpen, itemList, filteredItemListData, partDataList, formatNoData, companyList, plantList }}
      >
        <TotalPrint />
      </TotalListContent.Provider>
      {selectedItemList.length > 0 &&
        <MailSender {...TotalListChildData} />}
      <TotalListContent.Provider
        value={{ calDuePrint, setCalDuePrint, filteredItemListData, itemList, partDataList, formatNoData, companyList, plantList }}
      >
        <CalDuePrint />
      </TotalListContent.Provider>


    </div>
  )
}

export default TotalList