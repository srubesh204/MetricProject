import { Alert, Autocomplete, Badge, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, List, ListSubheader, MenuItem, Paper, Select, Snackbar, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
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

  const { loggedEmp, allowedPlants } = employeeRole


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
      { value: 0, label: 'Past Due' },
      { value: 0, label: 'Today' },
      { value: 0, label: 'Next 7 Days' },
      { value: 0, label: '>7 to 15 Days' },
      { value: 0, label: '>15 to 30 Days' },
      { value: 0, label: '>30 Days' }
    ])

  const [departmentName, setDepartmentName] = useState("")
  const [allDepartments, setAllDepartments] = useState([])

  const [partDataList, setPartDataList] = useState([])
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
  }, []);


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


  const [dcList, setDcList] = useState([])
  const [lastNo, setLastNo] = useState("")
  const dcListFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemDc/getAllItemDc`

      );
      const plantDc = response.data.result.filter(dc => (employeeRole.loggedEmp.plantDetails.map(plant => plant.plantName).includes(dc.dcPlant)))
      const dcNos = response.data.result.map(dc => dc.dcId).filter(Boolean)
      const sortedDc = dcNos.sort((a, b) => a - b);
      console.log(sortedDc)
      if (dcNos.length === 0) {
        setLastNo("DC-" + (dayjs().year() + "-" + 1))
      } else {
        setLastNo("DC-" + (dayjs().year() + "-" + ((dcNos[dcNos.length - 1]) + 1)))
      }

      console.log(dcNos[dcNos.length - 1])
      setDcList(plantDc);
      setFilteredData(plantDc);


    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    dcListFetchData();
  }, []);

  const [lastGrnNo, setLastGrnNo] = useState("")
  const [grnList, setGrnList] = useState({})
  const grnFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemGRN/getAllItemGRN`
      );
      setGrnList(response.data.result);
      const grnNumbers = response.data.result.map(item => (item.grnId)).filter(Boolean).sort();
      if (grnNumbers.length > 0) {
        const lastNumber = grnNumbers[grnNumbers.length - 1] + 1
        console.log(lastNumber)

        setLastGrnNo("GRN-" + dayjs().year() + "-" + lastNumber)
      } else {
        setLastGrnNo("GRN-" + dayjs().year() + "-" + 1)
      }


    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    grnFetchData();
  }, []);



  const [calLastNo, setCalLastNo] = useState("")
  const calFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/itemCal/getAllItemCals`

      );
      const calNos = response.data.result.map(cal => cal.calId).filter(Boolean).sort()
      console.log(calNos)
      setCalLastNo("Cal " + (dayjs().year() + "-" + (calNos.length > 0 ? (calNos[calNos.length - 1]) + 1 : 1)))



    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    calFetch();
  }, []);




  const [selectedPlantName, setSelectedPlantName] = useState("")

  const [bccMails, setBccMails] = useState([])
  const empFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/employee/getAllActiveEmployees`
      );
      const admins = response.data.result.filter(emp => emp === "admin")
      const plantAdmins = response.data.result.filter(emp => emp === "plantAdmin")
      const creators = response.data.result.filter(emp => emp === "creator")
      const viewers = response.data.result.filter(emp => emp === "viewer")


      const plantemps = response.data.result.filter(emp => emp.plantDetails.find(empPlant => employeeRole.loggedEmp.plantDetails.map(plant => plant.plantName).includes(empPlant.plantName)))
      const adminsList = plantemps.filter(emp => emp.empRole === "admin" || emp.empRole === "plantAdmin")
      const uniqueList = [...new Set(adminsList)]
      console.log(adminsList)
      setBccMails(uniqueList)
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

  const [vendorMails, setVendorMails] = useState([])

  const getVendorsByType = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT}/vendor/getVendorByPlants`, { allowedPlants: allowedPlants }
      );
      console.log(response.data.result)
      const allPlantVendors = response.data.result
      const allPlantCustomers = response.data.result.filter((item) => item.customer === "1")
      const allPlantSubContractors = response.data.result.filter((item) => item.subContractor === "1")
      const allPlantSuppliers = response.data.result.filter((item) => item.supplier === "1")
      const allPlantOems = response.data.result.filter((item) => item.oem === "1")
      console.log(allPlantVendors)
      const contactDetails = [...new Set(response.data.result.flatMap(item => item.vendorContacts.map(contact => contact.mailId)))];

      setVendors(allPlantVendors)
      setVendorMails(contactDetails)
      setCustomers([
        { aliasName: "All" },
        ...allPlantCustomers.map(customer => ({ ...customer }))
      ]);
      setOems(allPlantOems)
      setSubContractors(allPlantSubContractors)
      setSuppliers(allPlantSuppliers)

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getVendorsByType();
  }, [])

  console.log(customers)
  console.log(employeeRole)

  const [activeItems, setActiveItems] = useState([])

  const itemFetch = async () => {
    try {
      console.log(employeeRole)
      const response = await axios.post(
        `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`, { allowedPlants: allowedPlants }
      );
      let allItems = []
      if (employeeRole.employee === "admin") {

        const departmentItems = response.data.result.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => plant.departments.includes(item.itemDepartment)))
        console.log(departmentItems)
        allItems = departmentItems
        console.log(allItems)
      } else if (employeeRole.employee === "plantAdmin") {

        const departmentItems = response.data.result.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => plant.departments.includes(item.itemDepartment)))
        allItems = departmentItems
        console.log(allItems)
      } else if (employeeRole.employee === "creator") {

        const departmentItems = response.data.result.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => plant.departments.includes(item.itemDepartment)))
        allItems = departmentItems
        console.log(allItems)
      } else if (employeeRole.employee === "viewer") {

        const departmentItems = response.data.result.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => plant.departments.includes(item.itemDepartment)))
        allItems = departmentItems
        console.log(allItems)
      } else {
        allItems = response.data.result
      }

      const itemPart = allItems.map(item => item.itemPartName)
      console.log(itemPart)

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
      const activeItems = allItems.filter((item) => item.itemStatus === "active");
      const spareItems = allItems.filter((item) => item.itemStatus === "spare");
      const breakDownItems = allItems.filter((item) => item.itemStatus === "breakdown");
      const missingItems = allItems.filter((item) => item.itemStatus === "missing");
      const rejectionItems = allItems.filter((item) => item.itemStatus === "rejection");

      setActiveItems(activeItems)

      const pastDue = activeItems.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
      const CurrentDue = activeItems.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
      const sevenDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), sevenDaysAgo))
      const fifteenDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(sevenDaysAgo, fifteenDaysAgo))
      const thirtyDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(fifteenDaysAgo, thirtyDaysAgo))
      const AboveThirtyDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))





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

    const activeItems = plantWiseList.filter((item) => item.itemStatus === "active");
    const spareItems = plantWiseList.filter((item) => item.itemStatus === "spare");
    const breakDownItems = plantWiseList.filter((item) => item.itemStatus === "breakdown");
    const missingItems = plantWiseList.filter((item) => item.itemStatus === "missing");
    const rejectionItems = plantWiseList.filter((item) => item.itemStatus === "rejection");

    setActiveItems(activeItems)

    const pastDue = activeItems.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
    const CurrentDue = activeItems.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
    const sevenDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), sevenDaysAgo))
    const fifteenDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(sevenDaysAgo, fifteenDaysAgo))
    const thirtyDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(fifteenDaysAgo, thirtyDaysAgo))
    const AboveThirtyDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))




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


  const [plantDepartments, setPlantDepartments] = useState([])

  useEffect(() => {
    console.log(employeeRole)
    if (employeeRole.loggedEmp.plantDetails.length === 1) {

      const availableDeps = employeeRole.loggedEmp.plantDetails[0].departments.filter(dep => filteredData.map(item => item.itemDepartment === dep))
      console.log(employeeRole.loggedEmp.plantDetails[0].departments)
      console.log(availableDeps)

      setPlantDepartments(availableDeps)
      setPlantDeps(prev => ({ ...prev, itemDepartment: availableDeps.length === 1 ? availableDeps[0] : "All" }))

    } else {
      const filteredPlants = employeeRole.loggedEmp.plantDetails.filter(plant => plant.plantName === selectedPlantName);

      if (filteredPlants.length > 0) {
        console.log(filteredPlants[0].departments)
        const availableDeps = filteredPlants[0].departments.filter(dep => filteredData.find(item => item.itemDepartment === dep))
        console.log(availableDeps)
        console.log(filteredPlants[0].departments)
        setPlantDeps(prev => ({ ...prev, itemDepartment: availableDeps.length === 1 ? availableDeps[0] : "All" }))
        setPlantDepartments(availableDeps)
      } else {
        setPlantDepartments([])
      }

    }


  }, [selectedPlantName])

  const [plantDeps, setPlantDeps] = useState({
    itemPlant: employeeRole.loggedEmp.plantDetails.length === 1 ? employeeRole.loggedEmp.plantDetails[0].plantName : "All",
    itemDepartment: plantDepartments.length === 1 ? plantDepartments[0] : "All"
  })
  console.log(plantDepartments)

  const LocationEmpFilter = (e) => {
    const { name, value } = e.target;
    setPlantDeps(prev => ({ ...prev, [name]: value }))
    if (name === "itemPlant") {
      if (value === "All") {
        console.log(activeEmps.allEmps)
        // Assuming activeEmps.allEmps and employeeRole.loggedEmp are arrays
        setPlantDeps(prev => ({ ...prev, itemDepartment: "All" }))
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

        const activeItems = plantData.filter((item) => item.itemStatus === "active");
        const spareItems = plantData.filter((item) => item.itemStatus === "spare");
        const breakDownItems = plantData.filter((item) => item.itemStatus === "breakdown");
        const missingItems = plantData.filter((item) => item.itemStatus === "missing");
        const rejectionItems = plantData.filter((item) => item.itemStatus === "rejection");

        setActiveItems(activeItems)

        const pastDue = activeItems.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
        const CurrentDue = activeItems.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
        const sevenDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), sevenDaysAgo))
        const fifteenDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(sevenDaysAgo, fifteenDaysAgo))
        const thirtyDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(fifteenDaysAgo, thirtyDaysAgo))
        const AboveThirtyDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))




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
    { field: 'id', headerName: 'Si. No', width: 20, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, align: "center" },
    {
      field: 'itemIMTENo',
      headerName: 'IMTE No.',
      width: 180,
      headerAlign: "start"

      // editable: true,
    },
    {
      field: 'itemAddMasterName',
      headerName: 'Item Description',
      width: 180,
      // editable: true,
      align: "left"
    },
    {
      field: 'itemCalDate',
      headerName: 'Cal Date',
      width: 100, valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY')
      // editable: true,
    },
    {
      field: 'itemDueDate',
      headerName: 'Next Cal Date',
      width: 100, valueGetter: (params) => dayjs(params.row.itemDueDate).format('DD-MM-YYYY')
    },
    {
      field: 'itemPlant',
      headerName: 'Plant',
      width: 80,
      align: "left"
    },
    {
      field: 'itemCurrentLocation',
      headerName: 'Current Location',
      width: 100,
      align: "left"
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
    {
      field: 'itemLastLocation',
      headerName: 'Last Location',
      width: 100,
      align: "left"
    },
    {
      field: 'itemCalibrationDoneAt',
      headerName: 'Cal Done At',
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
  const [calSourceCount, setCalSourceCount] = useState({
    inHouse: "",
    outSource: "",
    oem: ""
  })


  const calStatusColor = ['#FF4545', '#00C49F', '#FFBB28', '#FF8042', "#ACA8C8", "#0088FE"];
  const itemStatusColor = ["#595959", "orange", "#FF8042", "#0088FE", "#FF4545"];
  const itemLocationColor = ["#984EA3", "violet", "orange", "#00C49F", "#0088FE"];

  const [calStatusFitleredData, setCalStatusFitleredData] = useState([])

  const calStatusFunction = (name) => {

    const pastDue = activeItems.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
    const CurrentDue = activeItems.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
    const sevenDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isAfter(currentDate.format("YYYY-MM-DD")))
    const fifteenDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(sevenDaysAgo, fifteenDaysAgo))
    const thirtyDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(fifteenDaysAgo, thirtyDaysAgo))
    const AboveThirtyDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))

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
      case "Breakdown":
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
      console.log(suppliers)
      const supTable = suppliers.map((sup) => {
        const filteredByDcLocation = pieDataFilter.filter((item) => item.itemLocation === "supplier");
        const filteredByOEM = filteredByDcLocation.filter((item) => item.itemCurrentLocation === sup.fullName);

        const quantity = filteredByOEM.length;
        console.log(sup.fullName)

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
    console.log(payload)
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
    const itemWithLabel = itemStatus.find(item => item.label === "Total Items");
    console.log(itemWithLabel)
    return (

      <table className='table table-borderless table-sm' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <tbody>
          <tr height="50px">
            <td style={{ padding: "2px" }} onClick={() => { itemStatusLegend("Total Items") }}><div style={{ width: '25px', height: '25px', backgroundColor: "#00C49F", marginRight: '10px', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}></div></td>
            <td style={{ padding: "2px" }}>{itemWithLabel && itemWithLabel.label}</td>
            <td style={{ padding: "2px", fontWeight: "bolder", color: "#00C49F" }} className='ms-2 ps-3'>{itemWithLabel && itemWithLabel.value}</td>
          </tr>
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
    console.log(payload)
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
    empFetch();
  }, [])



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

    const activeItems = filter.filter((item) => item.itemStatus === "active");
    const spareItems = filter.filter((item) => item.itemStatus === "spare");
    const breakDownItems = filter.filter((item) => item.itemStatus === "breakdown");
    const missingItems = filter.filter((item) => item.itemStatus === "missing");
    const rejectionItems = filter.filter((item) => item.itemStatus === "rejection");

    setActiveItems(activeItems)

    const pastDue = activeItems.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
    const CurrentDue = activeItems.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
    const sevenDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), sevenDaysAgo))
    const fifteenDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(sevenDaysAgo, fifteenDaysAgo))
    const thirtyDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(fifteenDaysAgo, thirtyDaysAgo))
    const AboveThirtyDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))




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

    console.log(name, value)
    const filter = plantWiseList.filter(item => {
      return item.itemPartName.some(partNo => partDataList.some(part => part.partNo === partNo && part.customer === value));
  });

    console.log(filter)
    setFilteredData(filter)
    setPieDataFilter(filter)

    const activeItems = filter.filter((item) => item.itemStatus === "active");
    const spareItems = filter.filter((item) => item.itemStatus === "spare");
    const breakDownItems = filter.filter((item) => item.itemStatus === "breakdown");
    const missingItems = filter.filter((item) => item.itemStatus === "missing");
    const rejectionItems = filter.filter((item) => item.itemStatus === "rejection");

    setActiveItems(activeItems)

    const pastDue = activeItems.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
    const CurrentDue = activeItems.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
    const sevenDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), sevenDaysAgo))
    const fifteenDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(sevenDaysAgo, fifteenDaysAgo))
    const thirtyDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isBetween(fifteenDaysAgo, thirtyDaysAgo))
    const AboveThirtyDaysFilter = activeItems.filter((item) => dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))

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
      { id: 0, value: filter.length, label: 'Total Items' },
      { id: 1, value: activeItems.length, label: 'Active' },
      { id: 2, value: spareItems.length, label: 'Spare' },
      { id: 3, value: breakDownItems.length, label: 'Breakdown' },
      { id: 4, value: missingItems.length, label: 'Missing' },
      { id: 5, value: rejectionItems.length, label: 'Rejection' }
    ])
  }

  const [filterNames, setFilterNames] = useState({
    itemIMTENo: "All",
    itemType: "All",
    itemAddMasterName: "All",
    customer: "All"
  })

  const MainFilter = (newValue, extraName) => {
    setSelectedLoc("")
    console.log(newValue, extraName)
    setFilterNames(prev => ({ ...prev, [extraName]: newValue }))
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
          window.location.reload()
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
        console.log(err)
        setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
      }
    }
  };
  const [mailIds, setMailIds] = useState([])
  const mailIdGather = () => {
    if (selectedRows.length > 0) {
      const plants = selectedRows.map(item => item.itemPlant)
      console.log(plants)

      const empEmails = activeEmps.allEmps.filter(emp => emp.plantDetails.find(plant => plants.find(itemPlant => plant.plantName == itemPlant)))
      const uniqueEmails = [...new Set(empEmails)]
      setMailIds(empEmails)
      console.log(uniqueEmails)
    }
  }
  const [mailList, setMailList] = useState([])
  const getMailList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/mailConfig/getAllMailConfig`
      );
      console.log(response.data.result)
      setMailList(response.data.result)


    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMailList();
  }, []);

  const [dcPartyDetails, setDcPartyDetails] = useState([])

  useEffect(() => {
    setStatusCheckMsg("")
    if (selectedRows.length === 1) {
      if (selectedRows[0].dcStatus === "1") {
        console.log("dcworking")
        const vendorPartyDetail = dcList.filter(dc => dc._id === selectedRows[0].dcId)
        console.log(vendorPartyDetail)
        if (vendorPartyDetail.length > 0) {
          const vendorDetails = vendors.filter(ven => ven._id === vendorPartyDetail[0].dcPartyId)
          console.log(...vendorDetails)
          setDcPartyDetails(...vendorDetails)
        }

      }

    }


    // dcPartyId
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




  const dcCheck = () => {


    const defaultDepartmentCheck = selectedRows.every(item =>
      defaultDep.some(dep => item.itemCurrentLocation === dep.department)
    );
    const activeItemsCheck = selectedRows.every(item => item.itemStatus !== "missing" || item.itemStatus !== "spare")

    const singlePlant = selectedRows.every((item, index, array) => item.itemPlant === array[0].itemPlant);

    console.log(defaultDepartmentCheck);
    if (defaultDepartmentCheck && singlePlant && selectedRows.length > 0 && activeItemsCheck) {
      setStatusCheckMsg("");
      setDcOpen(true);
    } else {
      if (!singlePlant) {
        setStatusCheckMsg("Multiple plants not allowed")
      }

      if (!defaultDepartmentCheck) {
        setStatusCheckMsg("Selected item are not in default location, To create a DC move the item to the default location");
      }

      if (!activeItemsCheck) {
        setStatusCheckMsg("Check item status")
      }

      if (!selectedRows.length > 0) {
        setStatusCheckMsg("Please select any one item")
      }

      setDcOpen(false);
    }
  };


  const grnCheck = () => {
    setIsOnSiteGRN("no")
    const grnBoolean = selectedRows.every(item => item.dcStatus === "1")
    const itemStatus = selectedRows.every(item => item.itemStatus !== "missing" && item.itemStatus !== "spare")

    console.log(grnCheck && selectedRows.length === 1)
    if (grnBoolean && itemStatus && selectedRows.length === 1) {
      setStatusCheckMsg("");
      setGrnOpen(true);
    } else {
      if (selectedRows.length > 1) {
        setStatusCheckMsg("Multiple selection not allowed")
      } else if (selectedRows.length === 0) {
        setStatusCheckMsg("Please select any one item")
      } else {
        setStatusCheckMsg("Please ensure the item is created in the DC before proceeding")
      }



    }
  }

  const [isOnSiteGRN, setIsOnSiteGRN] = useState("no")
  const onSiteCheck = () => {
    setIsOnSiteGRN("yes")
    const onSiteCheck = selectedRows.every(item => (item.itemCalibrationSource === "outsource" || item.itemCalibrationSource === "OEM"))
    const notInSite = selectedRows.every(item => item.itemCalibrationDoneAt === "Site")
    const nonDcItems = selectedRows.every(item => item.dcStatus !== "1")
    console.log(onSiteCheck)
    if (onSiteCheck && notInSite && selectedRows.length === 1 && nonDcItems) {

      console.log("onsite")
      setStatusCheckMsg("");
      setGrnOpen(true);
    } else {
      if (!notInSite) {
        setStatusCheckMsg("Select a item to be calibrated at Site")
      }
      if (!onSiteCheck) {
        setStatusCheckMsg("Only OEM or Supplier are allowed for Onsite GRN")
      }
      if (selectedRows.length !== 1) {
        setStatusCheckMsg("Please select only one item, multiple selections are not allowed")
      }

      if (!nonDcItems) {
        setStatusCheckMsg("Onsite GRN not allowed, Select GRN")
      }

    }
  }

  const calCheck = () => {
    const defaultDepartmentCheck = selectedRows.every(item =>
      defaultDep.some(dep => item.itemCurrentLocation === dep.department)
    );

    if (selectedRows.length === 1 && selectedRows[0].itemCalibrationSource === "inhouse") {

      if (selectedRows[0].itemCalibrationDoneAt === "Lab") {

        if (defaultDepartmentCheck) {
          setCalOpen(true);
          console.log("working")
        } else {
          setStatusCheckMsg("Move the item to the default location then try again!")
          console.log(StatusCheckMsg)
        }
      } else if (selectedRows.length > 0 && selectedRows[0].itemCalibrationDoneAt === "Site") {
        console.log("working")
        setCalOpen(true)
      }


    } else {
      if (selectedRows.length !== 1) {
        setStatusCheckMsg("Multiple selection not allowed for Calibration")
      }
      if (selectedRows.length === 0) {
        setStatusCheckMsg("Please select any one item")
      }
      if (selectedRows.length > 0 && selectedRows[0].itemCalibrationSource !== "inhouse") {
        setStatusCheckMsg("Item must be a Inhouse Calibration")
      }
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

  const mailCheck = () => {
    const singlePlant = selectedRows.every((item, index, array) => item.itemPlant === array[0].itemPlant);

    if (singlePlant && selectedRows.length > 0) {
      setMailOpen(true)

    } else {
      setStatusCheckMsg("Select any one plant to send mails")
    }


  }

  const [partCustomerList, setPartCustomerList] = useState([])
  useEffect(() => {
    console.log(plantWiseList)
    const distinctNames = plantWiseList.map(item => item.itemAddMasterName);
    const distinctImtes = plantWiseList.map(item => item.itemIMTENo);
    const partDetails = [...new Set(plantWiseList.flatMap(item => item.itemPartName))]
    const partDatas = partDataList.filter(part => partDetails.includes(part.partNo))
    const customersData = ["All",...new Set(partDatas.map(part => part.customer))]
    setPartCustomerList(customersData)
    console.log(customersData)
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


  console.log(itemStatus)




  return (
    <div style={{ backgroundColor: "#f1f4f4", margin: 0, padding: 0 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>


        <div className="row gx-3 mx-3 my-2" >
          <div className="col-md-4">
            <Paper sx={{ p: 2 }} elevation={12}>
              <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <TextField select onChange={(e) => LocationEmpFilter(e)} disabled={employeeRole.loggedEmp.plantDetails.length <= 1} value={plantDeps.itemPlant} fullWidth size='small' defaultValue="All" name='itemPlant' id='itemPlantId' label="Plant Location">
                  <MenuItem value="All">All</MenuItem>
                  {employeeRole.loggedEmp.length !== 0 && employeeRole.loggedEmp.plantDetails.map(item => (
                    <MenuItem value={item.plantName}>{item.plantName}</MenuItem>
                  ))}

                </TextField>
                {
                  <TextField select onChange={(e) => LocationEmpFilter(e)} fullWidth size='small' name='itemDepartment' disabled={plantDepartments.length <= 1} value={plantDeps.itemDepartment} defaultValue="All" label="Primary Location">
                    {plantDepartments.length !== 1 && <MenuItem value="All">All</MenuItem>}
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

                <TextField select onChange={(e) => MainFilter(e.target.value, "itemType")} fullWidth size='small' value={filterNames.itemType} name='itemType' label="Item Type">
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="variable">Variable</MenuItem>
                  <MenuItem value="attribute">Attribute</MenuItem>
                  <MenuItem value="referenceStandard">Ref Standard</MenuItem>
                </TextField>

                <TextField select onChange={(e) => MainFilter(e.target.value, "itemAddMasterName")} fullWidth size='small' value={filterNames.itemAddMasterName} name='itemAddMasterName' label="Item Description">
                  <MenuItem value="All">All</MenuItem>
                  {itemDistinctNames.length > 0 && itemDistinctNames.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                </TextField>

                {itemListOptions.length > 0 &&
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={itemDistinctIMTEs}
                    size='small'
                    fullWidth
                    value={filterNames.itemIMTENo}
                    onInputChange={(e, newValue) => MainFilter(newValue, "itemIMTENo")}
                    name="itemIMTENo"
                    defaultValue="All"
                    getOptionLabel={(itemList) => itemList}
                    renderInput={(params) => <TextField {...params} label="IMTE No" />}
                  />}







                <Autocomplete
                  disablePortal

                  id="combo-box-demo"
                  options={partCustomerList}
                  size='small'
                  fullWidth
                  onInputChange={(e, newValue) => MainFilter(newValue, "customer")}
                  name="customer"
                  value={filterNames.customer}
                  getOptionLabel={(cus) => cus}
                  renderInput={(params) => <TextField {...params} label="Customer" name='customer' />}
                  disableClearable
                />






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

                    labelLine={false}
                  >
                    {calStatus.map((entry, index) => {
                      console.log(entry)
                      return (
                        <Cell key={`cell-${index}`} fill={calStatusColor[index % calStatusColor.length]} />
                      )
                    })}

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
                    data={itemStatus.filter(entry => entry.label !== "Total Items")}
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

                    labelLine={false}
                  >
                    {itemStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={itemStatusColor[index % itemStatusColor.length]} />
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
                    {itemLocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={itemLocationColor[index % itemLocationColor.length]} />
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
                  density='compact'
                  disableDensitySelector

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

                        <div className='d-flex'>
                          <GridToolbarQuickFilter />
                          {selectedRows.length > 0 && <Button onClick={() => mailCheck()} size='small' endIcon={<Send />} color="primary">Send Mail</Button>}
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
                    {/* {(selectedRows.length === 1 && selectedRows[0].itemCalibrationSource === "outsource" ) && <Button size='small' onClick={() => onSiteCheck()}>Onsite</Button>} */}

                    <Button size='small' className='me-2' onClick={() => calCheck()}>Cal</Button>
                    <Button size='small' onClick={() => dcCheck()}>Create DC</Button>
                    <Button size='small' onClick={() => grnCheck()} className='me-2'>Grn</Button>
                    <Button size='small' className='me-2' onClick={() => { setIsOnSiteGRN("yes"); onSiteCheck() }}>Onsite GRN</Button>

                    {StatusCheckMsg !== "" && <Chip icon={<Error />} className='ms-3' color='error' label={StatusCheckMsg} />}
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    <Button component={Link} to="/itemmaster" size='small' className='me-1'>Item Master</Button>
                    <Button component={Link} to="/itemList" size='small'>Item List</Button>
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
              {/* style={{ height: "20%", width: "100%", display: "flex", alignItems: "end", justifyContent: 'end' }} */}
              <div className='row' style={{ height: "20%", width: "100%", display: "flex", alignItems: "end", }}>
                <div className='col mb-2' style={{ height: "20%", width: "100%", display: "flex", alignItems: "end", }} >
                  <Button component={Link} to="/" variant='contained' startIcon={<ArrowBack />} endIcon={<House />} color='secondary'>Home</Button>
                </div>
                <div className='col d-flex justify-content-end  height: "10%", width: "50%"' >
                  <p style={{ color: '#3498db', fontSize: '19px', fontWeight: 'bold' }}>
                    Welcome {loggedEmp.firstName}
                  </p>
                </div>
              </div>

            </Paper>
            {employeeRole && employeeRole !== "viewer" &&
              <React.Fragment>

                <HomeContent.Provider
                  value={{ calOpen, setCalOpen, selectedRows, itemMasters, activeEmps: activeEmps.allEmps, masters, itemList, calLastNo }}
                >
                  <CalDialog />
                </HomeContent.Provider>

                <HomeContent.Provider
                  value={{ dcOpen, setDcOpen, selectedRows, itemFetch, defaultDep, lastNo, vendors }}
                >
                  <Dc />
                </HomeContent.Provider>
                <HomeContent.Provider
                  value={{ grnOpen, setGrnOpen, selectedRows, lastGrnNo, dcPartyDetails, vendors, isOnSiteGRN }}
                >
                  <Grn />
                </HomeContent.Provider>

                {/* <HomeContent.Provider
                  value={{ onSiteOpen, setOnSiteOpen, selectedRows }}
                >
                  <OnSiteDialog />
                </HomeContent.Provider> */}

                <HomeContent.Provider
                  value={{ mailOpen, setMailOpen, selectedRows, mailIds, setErrorHandler, setSnackBarOpen, vendors, mailList, bccMails, emp: employeeRole.loggedEmp }}
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