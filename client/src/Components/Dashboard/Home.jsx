import { Alert, Autocomplete, Badge, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, List, ListSubheader, MenuItem, Paper, Select, Snackbar, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Add, ArrowBack, Delete, Error, HomeMax, House, Mail, MailLock, Send } from '@mui/icons-material';
import CalDialog from './DashboardComponents/CalDialog';
import Dc from './DashboardComponents/DcDialog';
import Grn from './DashboardComponents/Grn';
import OnSiteDialog from './DashboardComponents/OnSiteDialog';
import MuiPagination from '@mui/material/Pagination';
import { empRole, useEmployee } from '../../App';
import HomeMail from './DashboardComponents/HomeMail';
export const HomeContent = createContext(null);



dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const Home = () => {

  const employeeRole = useEmployee();

  const loggedInEmpId = sessionStorage.getItem('empId')

  const [itemDistinctNames, setItemDistinctNames] = useState([])
  const [itemDistinctIMTEs, setItemDistinctIMTEs] = useState([])
  const [errorhandler, setErrorHandler] = useState({});
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [itemList, setItemList] = useState([]);
  const [plantWiseList, setPlantWiseList] = useState([])



  const [itemMasters, setItemMasters] = useState([])
  const [itemListOptions, setItemListOptions] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [itemLocationData, setItemLocationData] = useState([])
  const currentDate = dayjs();
  const sevenDaysAgo = currentDate.add(7, 'day');
  const fifteenDaysAgo = currentDate.add(15, 'day');
  const thirtyDaysAgo = currentDate.add(30, 'day');

  console.log(filteredData)


  //Vendor Type state
  const [vendors, setVendors] = useState([])
  const [customers, setCustomers] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [subContractors, setSubContractors] = useState([])
  const [oems, setOems] = useState([])
  //


  const [departmentTable, setDepartmentTable] = useState([])
  const [subConTable, setSubConTable] = useState([])
  const [supplierTable, setSupplierTable] = useState([])
  const [oemTable, setOemTable] = useState([])
  const [customerTable, setCustomerTable] = useState([])

  const [itemStatus, setItemStatus] = useState([])
  const [calStatus, setCalStatus] = useState(
    [
      { value: 0, label: 'Total Items' },
      { value: 0, label: 'active' },
      { value: 0, label: 'spare' },
      { value: 0, label: 'breakdown' },
      { value: 0, label: 'missing' },
      { value: 0, label: 'rejection' }
    ])
  const [distinctDepartment, setDistinctDepartment] = useState([])
  const [departmentName, setDepartmentName] = useState("")
  const [allDepartments, setAllDepartments] = useState([])


  const [masters, setMasters] = useState([]);
  const itemMasterFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemMaster/getAllItemMasters`
      );


      setMasters(response.data.result)

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    itemMasterFetchData();
  }, []);



  //allActiveEmployees
  const [activeEmps, setActiveEmps] = useState({
    allEmps: [],
    admins: [],
    plantAdmins: [],
    creators: [],
    viewers: [],
    plantEmployees: []
  })

 




  const [selectedPlantName, setSelectedPlantName] = useState("")
  const empFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/employee/getAllActiveEmployees`
      );
      const admins = response.data.result.filter(emp => emp === "admin")
      const plantAdmins = response.data.result.filter(emp => emp === "plantAdmin")
      const creators = response.data.result.filter(emp => emp === "creator")
      const viewers = response.data.result.filter(emp => emp === "viewer")


      // if(employeeRole.loggedEmp.empRole === "admin"){
      //   plantEmployees = [...plantEmp.filter(emp => emp.empRole === "creator"), employeeRole.loggedEmp]
      // }
      // if(employeeRole.loggedEmp.empRole === "plantAdmin"){
      //   console.log(plantEmp)
      //   plantEmployees = [...plantEmp.filter(emp => emp.empRole === "creator"), employeeRole.loggedEmp]
      //   console.log(plantEmployees)
      // }
      setActiveEmps((prev) => ({ ...prev, allEmps: response.data.result, admins: admins, plantAdmins: plantAdmins, creators: creators, viewers: viewers }))

    } catch (err) {
      console.log(err);
    }
  };
  console.log(activeEmps)
  //
  const [defaultDep, setDefaultDep] = useState([])



  const getAllDepartments = async () => {
    try {
      const Departments = await axios.get(
        `${process.env.REACT_APP_PORT}/department/getAllDepartments`
      );
      console.log(Departments)
      const defaultDepartment = Departments.data.result.filter((dep) => dep.defaultdep === "yes");
      const otherDepartment = Departments.data.result.filter((dep) => dep.defaultdep !== "yes")


      setAllDepartments([...defaultDepartment, ...otherDepartment])
      setDefaultDep(defaultDepartment)



    } catch (err) {
      console.log(err);
    }
  };

  console.log(allDepartments)

  const getVendorsByType = async () => {
    try {
      const getAllVendorWithTypes = await axios.get(
        `${process.env.REACT_APP_PORT}/vendor/getAllVendorWithTypes`
      );
      console.log(getAllVendorWithTypes)
      setVendors(getAllVendorWithTypes.data.result.allVendors)
      setCustomers([
        { aliasName: "All" },
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
  console.log(employeeRole)

  const itemFetch = async () => {
    try {
      console.log(employeeRole)
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
      );
      let allItems = []
      if (employeeRole.employee === "admin") {
        const plantItems = response.data.result.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => item.itemPlant === plant.plantName))
        const departmentItems = plantItems.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => plant.departments.includes(item.itemDepartment)))
        console.log(departmentItems)
        allItems = departmentItems
        console.log(allItems)
      } else if (employeeRole.employee === "plantAdmin") {
        const plantItems = response.data.result.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => item.itemPlant === plant.plantName))
        const departmentItems = plantItems.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => plant.departments.includes(item.itemDepartment)))
        allItems = departmentItems
        console.log(allItems)
      } else if (employeeRole.employee === "creator") {
        const plantItems = response.data.result.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => item.itemPlant === plant.plantName))
        const departmentItems = plantItems.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => plant.departments.includes(item.itemDepartment)))
        allItems = departmentItems
        console.log(allItems)
      } else if (employeeRole.employee === "viewer") {
        const plantItems = response.data.result.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => item.itemPlant === plant.plantName))
        const departmentItems = plantItems.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => plant.departments.includes(item.itemDepartment)))
        allItems = departmentItems
        console.log(allItems)
      } else {
        allItems = response.data.result
      }



      setItemList(allItems);
      setPieDataFilter(allItems)
      setFilteredData(allItems)

      //
      // Assuming plantWiseList is an array of objects
      const sortedPlantWiseList = allItems.slice().sort((a, b) => a.itemIMTENo.localeCompare(b.itemIMTENo));
      console.log(sortedPlantWiseList)

      // Now, sortedPlantWiseList is a new array with the objects sorted based on the itemIMTENo property

      setPlantWiseList(sortedPlantWiseList)
      //

      const masterItems = allItems.filter((item) => item.isItemMaster === "1")
      setItemMasters(masterItems)
      setItemListOptions([{ itemIMTENo: "All" }, ...allItems])

      console.log(itemList)

      const pastDue = allItems.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
      const CurrentDue = allItems.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
      const sevenDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isSameOrBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isAfter(currentDate.format("YYYY-MM-DD")))
      const fifteenDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isBetween(sevenDaysAgo, fifteenDaysAgo))
      const thirtyDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isBetween(fifteenDaysAgo, thirtyDaysAgo))
      const AboveThirtyDaysFilter = allItems.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))


      const activeItems = allItems.filter((item) => item.itemStatus === "active");
      const spareItems = allItems.filter((item) => item.itemStatus === "spare");
      const breakDownItems = allItems.filter((item) => item.itemStatus === "breakdown");
      const missingItems = allItems.filter((item) => item.itemStatus === "missing");
      const rejectionItems = allItems.filter((item) => item.itemStatus === "rejection");


      const depLength = allItems.filter((item) => item.itemLocation === "department")
      const oemLength = allItems.filter((item) => item.itemLocation === "oem")
      const customersLength = allItems.filter((item) => item.itemLocation === "customer")
      const subContractorLength = allItems.filter((item) => item.itemLocation === "subContractor")
      const supplierLength = allItems.filter((item) => item.itemLocation === "supplier")
      console.log(depLength)

      setItemStatus((prev) => {
        const updatedStatus = [...prev];

        const updateIfExists = (label, value) => {
          const existingIndex = updatedStatus.findIndex((item) => item.label === label);
          if (existingIndex !== -1) {
            updatedStatus[existingIndex].value = value;
          } else {
            updatedStatus.push({ value, label });
          }
        };

        updateIfExists('Total Items', allItems.length);
        updateIfExists('Active', activeItems.length);
        updateIfExists('Spare', spareItems.length);
        updateIfExists('Breakdown', breakDownItems.length);
        updateIfExists('Missing', missingItems.length);
        updateIfExists('Rejection', rejectionItems.length);

        return updatedStatus;
      });

      setCalStatus([
        { value: pastDue.length, label: 'Past Due' },
        { value: CurrentDue.length, label: 'Today' },
        { value: sevenDaysFilter.length, label: 'Next 7 Days' },
        { value: fifteenDaysFilter.length, label: '>7 to 15 Days' },
        { value: thirtyDaysFilter.length, label: '>15 to 30 Days' },
        { value: AboveThirtyDaysFilter.length, label: '>30 Days' }
      ])
      setItemLocationData([
        { value: depLength.length, label: "Departments" },
        { value: subContractorLength.length, label: "Sub Contractors" },
        { value: customersLength.length, label: "Customers" },
        { value: supplierLength.length, label: "Suppliers" },
        { value: oemLength.length, label: "OEM" }
      ]);


    } catch (err) {
      console.log(err);
    }
  };


  const itemLocationFun = () => {



    setFilteredData(plantWiseList)
    setPieDataFilter(plantWiseList)
    const pastDue = plantWiseList.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
    const CurrentDue = plantWiseList.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
    const sevenDaysFilter = plantWiseList.filter((item) => dayjs(item.itemDueDate).isBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isAfter(currentDate.format("YYYY-MM-DD")))
    const fifteenDaysFilter = plantWiseList.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
    const thirtyDaysFilter = plantWiseList.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
    const AboveThirtyDaysFilter = plantWiseList.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))


    const activeItems = plantWiseList.filter((item) => item.itemStatus === "active");
    const spareItems = plantWiseList.filter((item) => item.itemStatus === "spare");
    const breakDownItems = plantWiseList.filter((item) => item.itemStatus === "breakdown");
    const missingItems = plantWiseList.filter((item) => item.itemStatus === "missing");
    const rejectionItems = plantWiseList.filter((item) => item.itemStatus === "rejection");

    const depLength = plantWiseList.filter((item) => item.itemLocation === "department")
    const oemLength = plantWiseList.filter((item) => item.itemLocation === "oem")
    const customersLength = plantWiseList.filter((item) => item.itemLocation === "customer")
    const subContractorLength = plantWiseList.filter((item) => item.itemLocation === "subContractor")
    const supplierLength = plantWiseList.filter((item) => item.itemLocation === "supplier")


    setItemLocationData([
      { value: depLength.length, label: "Departments" },
      { value: subContractorLength.length, label: "Sub Contractors" },
      { value: customersLength.length, label: "Customers" },
      { value: supplierLength.length, label: "Suppliers" },
      { value: oemLength.length, label: "OEM" }
    ]);

    setCalStatus([
      { value: pastDue.length, label: 'Past Due' },
      { value: CurrentDue.length, label: 'Today' },
      { value: sevenDaysFilter.length, label: '7 Days' },
      { value: fifteenDaysFilter.length, label: '15 Days' },
      { value: thirtyDaysFilter.length, label: '30 Days' },
      { value: AboveThirtyDaysFilter.length, label: '>30 Days' }
    ])
    setItemStatus([
      { value: plantWiseList.length, label: 'Total Items' },
      { value: activeItems.length, label: 'Active' },
      { value: spareItems.length, label: 'Spare' },
      { value: breakDownItems.length, label: 'Breakdown' },
      { value: missingItems.length, label: 'Missing' },
      { value: rejectionItems.length, label: 'Rejection' }
    ])
  }


  const LocationEmpFilter = (e) => {
    const { name, value } = e.target;
    if (name === "itemPlant") {
      if (value === "All") {
        console.log(activeEmps.allEmps)
        // Assuming activeEmps.allEmps and employeeRole.loggedEmp are arrays

        itemFetch();
        setSelectedPlantName(value)
      } else {
        setSelectedPlantName(value)
        const filteredEmployees = activeEmps.plantEmployees.filter(emp =>
          emp.plant.some(plant => plant === value)
        );

        console.log(value)

        const plantData = itemList.filter(plant => plant.itemPlant === value)

        setPlantWiseList(plantData)
        setFilteredData(plantData)
        setPieDataFilter(plantData)
        const pastDue = plantData.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
        const CurrentDue = plantData.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
        const sevenDaysFilter = plantData.filter((item) => dayjs(item.itemDueDate).isBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isAfter(currentDate.format("YYYY-MM-DD")))
        const fifteenDaysFilter = plantData.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
        const thirtyDaysFilter = plantData.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
        const AboveThirtyDaysFilter = plantData.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))


        const activeItems = plantData.filter((item) => item.itemStatus === "active");
        const spareItems = plantData.filter((item) => item.itemStatus === "spare");
        const breakDownItems = plantData.filter((item) => item.itemStatus === "breakdown");
        const missingItems = plantData.filter((item) => item.itemStatus === "missing");
        const rejectionItems = plantData.filter((item) => item.itemStatus === "rejection");

        const depLength = plantData.filter((item) => item.itemLocation === "department")
        const oemLength = plantData.filter((item) => item.itemLocation === "oem")
        const customersLength = plantData.filter((item) => item.itemLocation === "customer")
        const subContractorLength = plantData.filter((item) => item.itemLocation === "subContractor")
        const supplierLength = plantData.filter((item) => item.itemLocation === "supplier")


        setItemLocationData([
          { value: depLength.length, label: "Departments" },
          { value: subContractorLength.length, label: "Sub Contractors" },
          { value: customersLength.length, label: "Customers" },
          { value: supplierLength.length, label: "Suppliers" },
          { value: oemLength.length, label: "OEM" }
        ]);

        setCalStatus([
          { value: pastDue.length, label: 'Past Due' },
          { value: CurrentDue.length, label: 'Today' },
          { value: sevenDaysFilter.length, label: '7 Days' },
          { value: fifteenDaysFilter.length, label: '15 Days' },
          { value: thirtyDaysFilter.length, label: '30 Days' },
          { value: AboveThirtyDaysFilter.length, label: '>30 Days' }
        ])
        setItemStatus([
          { value: plantData.length, label: 'Total Items' },
          { value: activeItems.length, label: 'Active' },
          { value: spareItems.length, label: 'Spare' },
          { value: breakDownItems.length, label: 'Breakdown' },
          { value: missingItems.length, label: 'Missing' },
          { value: rejectionItems.length, label: 'Rejection' }
        ])


      }
    }
    if (name === "itemDepartment") {

      if (value === "All") {
        itemLocationFun()
      } else {
        MainFilter(value, name)
      }

    }

  }


  console.log(itemLocationData)


  const ItemListColumns = [
    { field: 'id', headerName: 'Si. No', width: 20, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
    {
      field: 'itemIMTENo',
      headerName: 'IMTE No.',
      width: 150,
      // editable: true,
    },
    {
      field: 'itemAddMasterName',
      headerName: 'Item Description',
      width: 150,
      // editable: true,
      align: "left"
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
      field: 'itemCurrentLocation',
      headerName: 'Current Location',
      width: 100,
      align:"left"
    },
    {
      field: 'itemLastLocation',
      headerName: 'Last Location',
      width: 100,
      align:"left"
    },
    {
      field: 'itemCalibrationSource',
      headerName: 'Calibration Source',
      width: 100,
      align: "left"
    },
    {
      field: 'itemSupplier',
      headerName: 'Supplier',
      width: 100,
      align: "left"
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
  const [calSourceCount, setCalSourceCount] = useState({
    inHouse: "",
    outSource: "",
    oem: ""
  })


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#aca8c8", "#78787a"];
  const [calStatusFitleredData, setCalStatusFitleredData] = useState([])

  const calStatusFunction = (name) => {

    const pastDue = pieDataFilter.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
    const CurrentDue = pieDataFilter.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
    const sevenDaysFilter = pieDataFilter.filter((item) => dayjs(item.itemDueDate).isBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isAfter(currentDate.format("YYYY-MM-DD")))
    const fifteenDaysFilter = pieDataFilter.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
    const thirtyDaysFilter = pieDataFilter.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
    const AboveThirtyDaysFilter = pieDataFilter.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))

    const sourceFilter = (filterName) => {

      setCalStatusFitleredData(filterName)
      const inhouse = filterName.filter((item) => item.itemCalibrationSource === "inhouse");
      const outSource = filterName.filter((item) => item.itemCalibrationSource === "outsource");
      const oem = filterName.filter((item) => item.itemCalibrationSource === "OEM");

      setCalSourceCount((prev) => ({
        ...prev,
        inHouse: inhouse.length,
        outSource: outSource.length,
        oem: oem.length
      }))
    }



    switch (name) {
      case "Past Due":
        setFilteredData(pastDue);
        sourceFilter(pastDue)
        break;
      case "Today":
        setFilteredData(CurrentDue);
        sourceFilter(CurrentDue)
        break;
      case "7 Days":
        setFilteredData(sevenDaysFilter);
        sourceFilter(sevenDaysFilter)
        break;
      case "15 Days":
        setFilteredData(fifteenDaysFilter);
        sourceFilter(fifteenDaysFilter)
        break;
      case "30 Days":
        setFilteredData(thirtyDaysFilter);
        sourceFilter(thirtyDaysFilter)
        break;
      case ">30 Days":
        setFilteredData(AboveThirtyDaysFilter);
        sourceFilter(AboveThirtyDaysFilter)
        break;
      default:
        setFilteredData(itemList)
        sourceFilter(itemList)
        break;
    }




  }





  const itemStatusLegend = (name) => {
    console.log(name)


    const activeItems = pieDataFilter.filter((item) => item.itemStatus === "active");
    const spareItems = pieDataFilter.filter((item) => item.itemStatus === "spare");
    const breakDownItems = pieDataFilter.filter((item) => item.itemStatus === "breakdown");
    const missingItems = pieDataFilter.filter((item) => item.itemStatus === "missing");
    const rejectionItems = pieDataFilter.filter((item) => item.itemStatus === "rejection");

    switch (name) {

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
  console.log(calSourceCount)
  const [selectedLoc, setSelectedLoc] = useState("")

  const ItemLocationDisplay = (name) => {

    setSelectedLoc(name)
    if (name === "Departments") {
      const depTable = allDepartments.map((dep) => {
        const filteredData = pieDataFilter.filter((item) => item.itemCurrentLocation === dep.department);
        console.log(filteredData)

        const quantity = filteredData.length;
        if (quantity !== 0) {
          return { departmentName: dep.department, quantity };
        }
        return null; // Return null for zero quantity
      }).filter(Boolean);
      setDepartmentTable(depTable);
    }

    if (name === "Sub Contractors") {
      const subTable = subContractors.map((sub) => {
        const filteredByDcLocation = pieDataFilter.filter((item) => item.itemLocation === "subContractor");
        console.log(filteredByDcLocation)
        const filteredByOEM = filteredByDcLocation.filter((item) => item.itemCurrentLocation === sub.fullName);

        const quantity = filteredByOEM.length;

        if (quantity !== 0) {
          return { subContractorName: sub.fullName, quantity };
        }
        return null; // Return null for zero quantity
      }).filter(Boolean);
      setSubConTable(subTable)
    }

    if (name === "Customers") {
      const cusTable = customers.map((customer) => {
        const filteredByDcLocation = pieDataFilter.filter((item) => item.itemLocation === "customer");
        const filteredByOEM = filteredByDcLocation.filter((item) => item.itemCurrentLocation === customer.fullName);

        const quantity = filteredByOEM.length;


        if (quantity !== 0) {
          return { customerName: customer.fullName, quantity };
        }
        return null; // Return null for zero quantity
      }).filter(Boolean);
      setCustomerTable(cusTable)
    }

    if (name === "Suppliers") {
      const supTable = suppliers.map((sup) => {
        const filteredByDcLocation = pieDataFilter.filter((item) => item.itemLocation === "supplier");
        const filteredByOEM = filteredByDcLocation.filter((item) => item.itemCurrentLocation === sup.fullName);

        const quantity = filteredByOEM.length;


        if (quantity !== 0) {
          return { supName: sup.fullName, quantity };
        }
        return null; // Return null for zero quantity
      }).filter(Boolean);
      setSupplierTable(supTable)
    }

    if (name === "OEM") {
      const oemTable = oems.map((oem) => {
        const filteredByDcLocation = pieDataFilter.filter((item) => item.itemLocation === "oem");
        const filteredByOEM = filteredByDcLocation.filter((item) => item.itemCurrentLocation === oem.fullName);

        const quantity = filteredByOEM.length;

        if (quantity !== 0) {
          return { oemName: oem.fullName, quantity };
        }
        return null; // Return null for zero quantity
      }).filter(Boolean); // Remove null entries from the array

      setOemTable(oemTable);
    }


  };



  const itemLocationLegend = ({ payload }) => {
    return (

      <table className='table table-borderless' style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 0 }}>
        <tbody>
          {payload.map((entry, index) => (
            <tr key={index} style={{ padding: 0 }}>
              <td style={{ padding: "2px" }} onClick={() => ItemLocationDisplay(entry.value)}><div style={{ width: '25px', height: '25px', backgroundColor: entry.color, marginRight: '10px', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}></div></td>
              <td style={{ padding: "2px" }}>{entry.value}</td>
              <td style={{ fontWeight: "bolder", color: entry.color, padding: "2px" }} className='ms-2 ps-3'>{entry.payload.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };




  const itemStatusLegendContent = ({ payload }) => {
    return (

      <table className='table table-borderless table-sm' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <tbody>
          {payload.map((entry, index) => (
            <tr key={index} height={entry.value === "Total Items" ? "50px" : ""}>
              <td style={{ padding: "2px" }} onClick={() => { itemStatusLegend(entry.value); console.log(entry) }}><div style={{ width: '25px', height: '25px', backgroundColor: entry.color, marginRight: '10px', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}></div></td>
              <td style={{ padding: "2px" }}>{entry.value}</td>
              <td style={{ padding: "2px", fontWeight: "bolder", color: entry.color }} className='ms-2 ps-3'>{entry.payload.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const calibrationStatusLegendContent = ({ payload }) => {
    return (
      <table className='table table-borderless table-sm' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <tbody>
          {payload.map((entry, index) => (
            <tr key={index}>
              <td style={{ padding: "2px" }} onClick={() => { calStatusFunction(entry.value) }}><div style={{ width: '25px', height: '25px', backgroundColor: entry.color, marginRight: '10px', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}></div></td>
              <td style={{ padding: "2px" }}>{entry.value}</td>
              <td style={{ padding: "2px", fontWeight: "bolder", color: entry.color }} className='ms-2 ps-3'>{entry.payload.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  useEffect(() => {

    itemFetch();
    getAllDepartments();
    getVendorsByType();
    empFetch();

  }, [])

  const [plantDepartments, setPlantDepartments] = useState([])

  useEffect(() => {
    console.log(employeeRole)
    if(employeeRole.loggedEmp.plantDetails.length === 1){
          
        const availableDeps = employeeRole.loggedEmp.plantDetails[0].departments.filter(dep => filteredData.find(item => item.itemDepartment === dep))
        console.log(availableDeps)
        
        setPlantDepartments(availableDeps)
      
    }else{
      const filteredPlants = employeeRole.loggedEmp.plantDetails.filter(plant => plant.plantName === selectedPlantName);
    
      if (filteredPlants.length > 0) {
        console.log(filteredPlants[0].departments)
        const availableDeps = filteredPlants[0].departments.filter(dep => filteredData.find(item => item.itemDepartment === dep))
        console.log(availableDeps)
        console.log(filteredPlants[0].departments)
        setPlantDepartments(availableDeps)
      } else { 
        setPlantDepartments([])
      }
  
    }
    
   
  }, [selectedPlantName])


  const DepartmentDataShow = (name, value) => {

    const filter = pieDataFilter.filter((item) => item.itemCurrentLocation === value && item.itemLocation === name);
    setFilteredData(filter)

  };

  const [pieDataFilter, setPieDataFilter] = useState([])
  const [selectedFilterName, setSelectedFilterName] = useState("")
  const [selectedFilterValue, setSelectedFilterValue] = useState("")


  const handlePieData = (name, value) => {
    setSelectedFilterName(name)
    setSelectedFilterValue(value)
    console.log(name, value)
    const filter = plantWiseList.filter((item) => item[name] === value)
    setFilteredData(filter)
    setPieDataFilter(filter)

    const pastDue = filter.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
    const CurrentDue = filter.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
    const sevenDaysFilter = filter.filter((item) => dayjs(item.itemDueDate).isBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isAfter(currentDate.format("YYYY-MM-DD")))
    const fifteenDaysFilter = filter.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
    const thirtyDaysFilter = filter.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
    const AboveThirtyDaysFilter = filter.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))


    const activeItems = filter.filter((item) => item.itemStatus === "active");
    const spareItems = filter.filter((item) => item.itemStatus === "spare");
    const breakDownItems = filter.filter((item) => item.itemStatus === "breakdown");
    const missingItems = filter.filter((item) => item.itemStatus === "missing");
    const rejectionItems = filter.filter((item) => item.itemStatus === "rejection");

    const depLength = filter.filter((item) => item.itemLocation === "department")
    const oemLength = filter.filter((item) => item.itemLocation === "oem")
    const customersLength = filter.filter((item) => item.itemLocation === "customer")
    const subContractorLength = filter.filter((item) => item.itemLocation === "subContractor")
    const supplierLength = filter.filter((item) => item.itemLocation === "supplier")


    setItemLocationData([
      { value: depLength.length, label: "Departments" },
      { value: subContractorLength.length, label: "Sub Contractors" },
      { value: customersLength.length, label: "Customers" },
      { value: supplierLength.length, label: "Suppliers" },
      { value: oemLength.length, label: "OEM" }
    ]);

    setCalStatus([
      { value: pastDue.length, label: 'Past Due' },
      { value: CurrentDue.length, label: 'Today' },
      { value: sevenDaysFilter.length, label: '7 Days' },
      { value: fifteenDaysFilter.length, label: '15 Days' },
      { value: thirtyDaysFilter.length, label: '30 Days' },
      { value: AboveThirtyDaysFilter.length, label: '>30 Days' }
    ])
    setItemStatus([
      { value: filter.length, label: 'Total Items' },
      { value: activeItems.length, label: 'Active' },
      { value: spareItems.length, label: 'Spare' },
      { value: breakDownItems.length, label: 'Breakdown' },
      { value: missingItems.length, label: 'Missing' },
      { value: rejectionItems.length, label: 'Rejection' }
    ])
  }

  const customerFilter = (name, value) => {
    setSelectedFilterName(name)
    setSelectedFilterValue(value)
    console.log(name, value)
    const filter = plantWiseList.filter((item) =>
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


    const activeItems = filter.filter((item) => item.itemStatus === "active");
    const spareItems = filter.filter((item) => item.itemStatus === "spare");
    const breakDownItems = filter.filter((item) => item.itemStatus === "breakdown");
    const missingItems = filter.filter((item) => item.itemStatus === "missing");
    const rejectionItems = filter.filter((item) => item.itemStatus === "rejection");

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
      { id: 3, value: breakDownItems.length, label: 'Breakdown' },
      { id: 4, value: missingItems.length, label: 'Missing' },
      { id: 5, value: rejectionItems.length, label: 'Rejection' }
    ])
  }

  const MainFilter = (newValue, extraName) => {

    console.log(newValue, extraName)
    if (newValue === "All") {

      itemLocationFun()

    } else {

      if (extraName === "itemIMTENo" || extraName === "itemType" || extraName === "itemAddMasterName" || extraName === "itemDepartment") {
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
    const calSrcFilter = calStatusFitleredData.filter((item) => item.itemCalibrationSource === newValue);
    setFilteredData(calSrcFilter)
  }

  console.log(selectedFilterName)
  console.log(selectedFilterValue)

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedGrnRows, setSelectedGrnRows] = useState([])

  const [DepUpdateData, setDepUpdateData] = useState({
    itemIds: [],
    itemCurrentLocation: ""
  })
  const [selectedDepartment, setSelectedDepartment] = useState()

  const DepartmentChange = (e) => {
    const { value } = e.target;
    setSelectedDepartment(value)
    const itemData = selectedRows.map((item) => item._id)
    setDepUpdateData({ itemIds: itemData, itemCurrentLocation: value })
  }
  console.log(DepUpdateData)
  const updateItemData = async (e) => {
    e.preventDefault()
    try {
      if (selectedRows.length !== 0) {
        const itemData = selectedRows.map((item) => ({ _id: item._id, itemIMTENo: item.itemIMTENo }))
        const depData = { itemIds: itemData, itemCurrentLocation: selectedDepartment }
        if (depData) {
          const response = await axios.put(
            `${process.env.REACT_APP_PORT}/itemAdd/changeDepartmentUpdate`, depData
          );
          setSnackBarOpen(true)
          setErrorHandler({ status: response.data.status, message: "Department Changed Successfully", code: "success" })
          setSelectedRows([])
          itemFetch();
        }
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



  useEffect(() => {
    setStatusCheckMsg("");
    const grnBoolean = selectedRows.every(item => item.dcStatus === "1")
    setGrnButtonVisibility(grnBoolean && selectedRows.length > 0)

  }, [selectedRows])

  const handleRowSelectionChange = (newSelection) => {
    const selectedRowsData = filteredData.filter((row) => newSelection.includes(row._id));
    setSelectedRows(selectedRowsData);
    setSelectedGrnRows(selectedRowsData)


  };

  


  const [calOpen, setCalOpen] = useState(false);
  const [dcOpen, setDcOpen] = useState(false);
  const [grnOpen, setGrnOpen] = useState(false);
  const [onSiteOpen, setOnSiteOpen] = useState(false);

  const [mailOpen, setMailOpen] = useState(false)
  const [departmentStatus, setDepartmentStatus] = useState(false)


  console.log(selectedRows)


  const [StatusCheckMsg, setStatusCheckMsg] = useState("")
  const [grnButtonVisibility, setGrnButtonVisibility] = useState(false)



  const dcCheck = () => {
    const defaultDepartmentCheck = selectedRows.every(item =>
      defaultDep.some(dep => item.itemCurrentLocation === dep.department)
    );

    const singlePlant = selectedRows.every((item, index, array) => item.itemPlant === array[0].itemPlant);

    console.log(defaultDepartmentCheck);
    if (defaultDepartmentCheck && singlePlant) {
      setStatusCheckMsg("");
      setDcOpen(true);
    } else {


      if (!defaultDepartmentCheck) {
        setStatusCheckMsg("Selected item are not in default location, To create a DC move the item to the default location");
      }

      if (!singlePlant) {
        setStatusCheckMsg("Mulitple plant not allowed");
      }

      setDcOpen(false);
    }
  };


  const grnCheck = () => {
    const grnCheck = selectedRows.every(item => item.dcStatus === "1")


    console.log(grnCheck)
    if (grnCheck) {
      setStatusCheckMsg("");
      setGrnOpen(true);
    } else {
      setStatusCheckMsg("Selected Item are not DC ed")
    }
  }


  const onSiteCheck = () => {
    const onSiteCheck = selectedRows.every(item => item.dcStatus === "1")


    console.log(onSiteCheck)
    if (onSiteCheck) {
      setStatusCheckMsg("");
      setOnSiteOpen(true);
    } else {
      setStatusCheckMsg("Selected Item are not DC ed")
    }
  }

  const departmentChangeCheck = (e) => {
    const department = selectedRows.every(item => item.itemCurrentLocation !== DepUpdateData.itemCurrentLocation);
    const departmentDced = selectedRows.every(item => item.dcStatus === "0" || item.dcStatus === undefined || item.dcStatus === "");

    if (department && departmentDced) {
      updateItemData(e);
    } else {
      setStatusCheckMsg("Selected Items are already in the same location or already DC created");
    }
  };


  useEffect(() => {
    console.log(plantWiseList)
    const distinctNames = plantWiseList.map(item => item.itemAddMasterName);
    const distinctImtes = plantWiseList.map(item => item.itemIMTENo);
    console.log(distinctNames)
    distinctNames.sort()
    distinctImtes.sort()

    const names = [...new Set(distinctNames)]
    const imtes = ["All", ...new Set(distinctImtes)]
    console.log(names)
    setItemDistinctNames(names)
    setItemDistinctIMTEs(imtes)

  }, [plantWiseList])

  console.log(selectedRows)

  const [itemMasterSort, setItemMasterSort] = useState([])
  const getDistinctItemName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByIMTESort`
      );
      console.log(response.data)
      setItemMasterSort(response.data.result);

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDistinctItemName();
  }, []);







  return (
    <div style={{ backgroundColor: "#f1f4f4", margin: 0, padding: 0 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>


        <div className="row gx-3 m-3" >
          <div className="col-md-4">
            <Paper sx={{ p: 2 }} elevation={12}>
              <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <TextField select onChange={(e) => LocationEmpFilter(e)} disabled={employeeRole.loggedEmp.plantDetails.length === 1}  value={employeeRole.loggedEmp.plantDetails.length === 1 ? employeeRole.loggedEmp.plantDetails[0].plantName : ""} fullWidth size='small' defaultValue="All" name='itemPlant' id='itemPlantId' label="Plant Location">
                  <MenuItem value="All">All</MenuItem>
                  {employeeRole.loggedEmp.length !== 0 && employeeRole.loggedEmp.plantDetails.map(item => (
                    <MenuItem value={item.plantName}>{item.plantName}</MenuItem>
                  ))}

                </TextField>
                {
                  <TextField select onChange={(e) => LocationEmpFilter(e)} fullWidth size='small' name='itemDepartment' defaultValue="All"  label="Default Location">
                    <MenuItem value="All">All</MenuItem>
                    {plantDepartments && plantDepartments.map((department, index) => (<MenuItem key={index} value={department}>{department}</MenuItem>))}
                  </TextField>}
              </Stack>
            </Paper>
          </div>

          <div className="col-8 mb-2">
            <Paper sx={{ p: 2 }} elevation={12}>

              <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>

                {itemListOptions.length > 0 &&
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={itemDistinctIMTEs}
                    size='small'
                    fullWidth
                    onInputChange={(e, newValue) => MainFilter(newValue, "itemIMTENo")}
                    name="itemIMTENo"
                    defaultValue="All"
                    getOptionLabel={(itemList) => itemList}
                    renderInput={(params) => <TextField {...params} label="IMTE No" />}
                  />}

                <TextField select onChange={(e) => MainFilter(e.target.value, "itemAddMasterName")} fullWidth size='small' value={selectedFilterName === 'itemAddMasterName' ? selectedFilterValue : 'All'} name='itemAddMasterName' label="Item Description">
                  <MenuItem value="All">All</MenuItem>
                  {itemDistinctNames.length > 0 && itemDistinctNames.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                </TextField>

                <TextField select onChange={(e) => MainFilter(e.target.value, "itemType")} fullWidth size='small' value={selectedFilterName === 'itemType' ? selectedFilterValue : 'All'} name='itemType' label="Item Type">
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="variable">Variable</MenuItem>
                  <MenuItem value="attribute">Attribute</MenuItem>
                  <MenuItem value="referenceStandard">Ref Standard</MenuItem>
                </TextField>



                <Autocomplete
                  disablePortal
                  defaultValue={"All"}
                  id="combo-box-demo"
                  options={customers}
                  size='small'
                  fullWidth
                  onInputChange={(e, newValue) => MainFilter(newValue, "customer")}
                  name="customer"
                  getOptionLabel={(customers) => customers}
                  // onChange={(e, newValue) => MainFilter(e,newValue, "customer") .aliasName}

                  renderInput={(params) => <TextField {...params} label="Customer" name='customer' />}
                  disableClearable
                />

                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={customers}
                  size='small'
                  fullWidth
                  onInputChange={(e, newValue) => MainFilter(newValue, "customer")}
                  name="customer"
                  getOptionLabel={(customer) => customer.aliasName}
                  defaultValue={customers.find(customer => customer.aliasName === "All") || null}
                  renderInput={(params) => <TextField {...params} label="Customer" name='customer' />}
                  disableClearable
                /> */}




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
                  <ToggleButton value="inhouse">In House&nbsp;{(calSourceCount.inHouse !== "" && calSourceCount.inHouse !== 0) && <Chip label={calSourceCount.inHouse}></Chip>}</ToggleButton>
                  <ToggleButton value="outsource">Out Source&nbsp;{(calSourceCount.outSource !== "" && calSourceCount.outSource !== 0) && <Chip label={calSourceCount.outSource}></Chip>}</ToggleButton>
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
              {employeeRole && employeeRole.employee !== "viewer" &&
                <div className='row mx-2'>
                  <FormControl className='col-md-8 me-2' size='small'>
                    <InputLabel htmlFor="grouped-select">Select Department</InputLabel>
                    <Select id="grouped-select" label="Select Department" onChange={DepartmentChange}>
                      <MenuItem >Select Department</MenuItem>
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
                        .filter(item => item.defaultdep !== "yes")
                        .map((item, index) => (
                          <MenuItem sx={{ marginLeft: "20px" }} key={index} value={item.department}>
                            {item.department}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <Button className='col' size='small' fullWidth variant='contained' onClick={(e) => departmentChangeCheck(e)}>Move</Button>

                </div>}

            </Paper>
          </div>
        </div>

        <div className="row gx-3 mx-3">
          <div className="col-md-8">
            <Paper sx={{ p: 2, }} elevation={12}>
              <Box sx={{ height: 320, mb: 2, fontSize: "8px" }}>
                <DataGrid
                  density='compact' disableDensitySelector
                  getRowHeight={({ id, densityFactor }) => {
                    return 20;
                  }}
                  rows={filteredData}
                  columns={ItemListColumns}
                  getRowId={(row) => row._id}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 9,

                      },
                    },
                  }}

                  onRowSelectionModelChange={handleRowSelectionChange}
                  sx={{
                    ".MuiTablePagination-displayedRows": {

                      "marginTop": "1em",
                      "marginBottom": "1em"
                    }, fontSize: "12px"
                  }}

                  checkboxSelection
                  // onRowClick={handleSelectRow}
                  slots={{
                    toolbar: () => (
                      <div className='d-flex justify-content-between align-items-center'>
                        <GridToolbar />
                        <div>
                        <Button onClick={()=> setMailOpen(true)} size='small' endIcon={<Send />} color="primary">Send Mail</Button>
                        </div>
                        
                      </div>
                    ),
                  }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                    },
                  }}

                />
              </Box>
              {employeeRole.employee && employeeRole.employee !== "viewer" &&
                <div className="row">

                  <div className="col-md-9">
                    <Button size='small' onClick={() => onSiteCheck()}>Onsite</Button>
                    {(selectedRows.length === 1 && selectedRows[0].itemCalibrationSource === "inhouse") && <Button size='small' className='me-2' onClick={() => setCalOpen(true)}>Cal</Button>}
                    {grnButtonVisibility && <Button size='small' onClick={() => grnCheck()} className='me-2'>Grn</Button>}


                    <Button size='small' onClick={() => dcCheck()}>Create DC</Button>
                    {selectedRows.length > 0 && <Button size='small' color='info' variant='contained' endIcon={<Mail />}>Send Mail</Button>}
                    {StatusCheckMsg !== "" && <Chip icon={<Error />} color='error' label={StatusCheckMsg} />}
                  </div>
                  <div className="col-md-3">
                    <Button component={Link} to="/itemmaster" size='small' className='me-2'>Item Master</Button>
                    <Button component={Link} to="/itemList" size='small'>Item Entry</Button>
                  </div>
                </div>}
            </Paper>
          </div>
          <div className="col-md-4">
            <Paper className='col' elevation={12} sx={{ p: 2, height: "100%" }}>
              <div style={{ width: "100%", height: "80%" }}>
                <table className='m-0 table table-bordered table-sm text-center align-middle table-hover'>
                  {selectedLoc === "Departments" &&
                    <tbody>
                      <tr>
                        <th>Si. No</th>
                        <th>Name</th>
                        <th>Quantity</th>
                      </tr>
                      {departmentTable.map((item, index) => (
                        <tr className={`${item.departmentName === departmentName ? "table-active" : ""}`} key={index} onClick={() => DepartmentDataShow("department", item.departmentName)}>
                          <td>{index + 1}</td>
                          <td>{item.departmentName}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>}

                  {selectedLoc === "Sub Contractors" &&
                    <tbody>
                      <tr>
                        <th>Si. No</th>
                        <th>Name</th>
                        <th>Quantity</th>
                      </tr>
                      {subConTable.map((item, index) => (
                        <tr className={`${item.departmentName === departmentName ? "table-active" : ""}`} key={index} onClick={() => DepartmentDataShow("subContractor", item.subContractorName)}>
                          <td>{index + 1}</td>
                          <td>{item.subContractorName}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>}

                  {selectedLoc === "Customers" &&
                    <tbody>
                      <tr>
                        <th>Si. No</th>
                        <th>Name</th>
                        <th>Quantity</th>
                      </tr>
                      {customerTable.map((item, index) => (
                        <tr className={`${item.departmentName === departmentName ? "table-active" : ""}`} key={index} onClick={() => DepartmentDataShow("customer", item.customerName)}>
                          <td>{index + 1}</td>
                          <td>{item.customerName}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>}

                  {selectedLoc === "Suppliers" &&
                    <tbody>
                      <tr>
                        <th>Si. No</th>
                        <th>Name</th>
                        <th>Quantity</th>
                      </tr>
                      {supplierTable.map((item, index) => (
                        <tr className={`${item.departmentName === departmentName ? "table-active" : ""}`} key={index} onClick={() => DepartmentDataShow("supplier", item.supName)}>
                          <td>{index + 1}</td>
                          <td>{item.supName}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>}

                  {selectedLoc === "OEM" &&
                    <tbody>
                      <tr>
                        <th>Si. No</th>
                        <th>Name</th>
                        <th>Quantity</th>
                      </tr>
                      {oemTable.map((item, index) => (
                        <tr className={`${item.departmentName === departmentName ? "table-active" : ""}`} key={index} onClick={() => DepartmentDataShow("oem", item.oemName)}>
                          <td>{index + 1}</td>
                          <td>{item.oemName}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>}

                </table>
              </div>
              <div style={{ height: "20%", width: "100%", display: "flex", alignItems: "end", justifyContent: 'end' }}>
                <Button component={Link} to="/" variant='contained' startIcon={<ArrowBack />} endIcon={<House />} color='secondary'>Home</Button>
              </div>
            </Paper>
            {employeeRole && employeeRole !== "viewer" &&
              <React.Fragment>

                <HomeContent.Provider
                  value={{ calOpen, setCalOpen, selectedRows, itemMasters, activeEmps: activeEmps.allEmps, masters }}
                >
                  <CalDialog />
                </HomeContent.Provider>

                <HomeContent.Provider
                  value={{ dcOpen, setDcOpen, selectedRows, itemFetch, defaultDep }}
                >
                  <Dc />
                </HomeContent.Provider>
                <HomeContent.Provider
                  value={{ grnOpen, setGrnOpen, selectedRows }}
                >
                  <Grn />
                </HomeContent.Provider>

                <HomeContent.Provider
                  value={{ onSiteOpen, setOnSiteOpen, selectedRows }}
                >
                  <OnSiteDialog />
                </HomeContent.Provider>

                <HomeContent.Provider
                  value={{ mailOpen, setMailOpen, selectedRows }}
                >
                  <HomeMail />
                </HomeContent.Provider>
              </React.Fragment>}



          </div>

          <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={3000}
            onClose={() => setTimeout(() => {
              setSnackBarOpen(false)
            }, 3000)}>
            <Alert onClose={() => setSnackBarOpen(false)} variant='filled' severity="success" sx={{ width: '25%' }}>
              {errorhandler.message}
            </Alert>
          </Snackbar>
        </div>








      </LocalizationProvider>

    </div>







  )
}

export default Home