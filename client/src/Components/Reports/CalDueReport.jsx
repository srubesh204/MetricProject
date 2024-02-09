import React, { useEffect, useState, createContext } from 'react'
import { TextField, MenuItem, Button } from '@mui/material';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
import axios from 'axios';
import { Edit, FilterAlt, PrintRounded, Send } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ArrowBack, Error, HomeMax, House, Mail, MailLock, } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import CalDuePrint from './CalDuePrint';
import MailSender from '../mailComponent/MailSender';
import { useEmployee } from '../../App';
//import MailSender from '../mailComponent/MailSender';
export const CalDueReportContent = createContext(null);





const CalDueReport = () => {

    const employeeRole = useEmployee()
    const {allowedPlants} = employeeRole
    const [loaded, setLoaded] = useState(false);

    const [totalPrintOpen, setTotalPrintOpen] = useState(false);

    const [calDueList, setCalDueList] = useState([])
    const [filteredItemListData, setFilteredItemListData] = useState([])

    const oneMonthBefore = dayjs().subtract(dayjs().date() - 1, 'day')
    const [dateData, setDateData] = useState({
        fromDate: oneMonthBefore.format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD')
    })
    const [FilterNameList, setFilterNameList] = useState({
        itemIMTENo: [],
        itemType: [],
        itemDepartment: [],
        itemPlant: [],
        itemCalibrationSource: [],
        itemCurrentLocation: []

    })


    const calDueFetch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`, { allowedPlants: allowedPlants }
              );
            console.log(response.data.result)
           
            const departmentItems = response.data.result.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => plant.departments.includes(item.itemDepartment)))
            console.log(departmentItems)

            const filterNames = ["itemIMTENo", "itemType", "itemDepartment", "itemPlant", "itemCalibrationSource", "itemCurrentLocation"]

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
            setCalDueList(departmentItems);
            setFilteredItemListData(departmentItems);

            setLoaded(true)

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        calDueFetch()
    }, []);




    console.log(dateData)


    const columns = [

        { field: 'id', headerName: 'Si. No', width: 60, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center" },
        { field: 'itemIMTENo', headerName: 'IMTE No', width: 120, headerAlign: "center", align: "left" },
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
        { field: 'itemLC', headerName: 'ItemLC', width: 60, headerAlign: "center", align: "left", valueGetter: (params) => params.row.itemLC || "-" },
        { field: 'itemMake', headerName: 'Make', width: 90, headerAlign: "center", align: "center", },
        { field: 'itemCalDate', headerName: 'Cal Date', width: 100, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY') },
        { field: 'itemDueDate', headerName: 'Due Date', width: 110, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemDueDate).format('DD-MM-YYYY') },

        { field: 'itemCalFreInMonths', headerName: 'Frequency', type: "number", width: 80, headerAlign: "center", align: "center" },
        { field: 'itemCalibrationSource', headerName: 'Cal Source', width: 120, headerAlign: "center", align: "center", },
        { field: 'itemCalibratedAt', headerName: 'Cal Done At ', width: 100, headerAlign: "center", align: "center" },
        { field: 'itemCurrentLocation', headerName: 'Current Location', width: 120, headerAlign: "center", align: "center", },
        { field: 'itemDepartment', headerName: 'Defaul location', width: 100, headerAlign: "center", align: "center", },
        { field: 'itemStatus', headerName: 'Status ', width: 70, headerAlign: "center", align: "center", },
        // { field: 'itemCalibrationSource', headerName: 'Cal Source', renderCell: (params) => params.row.itemSupplier.toString(), width: 110, headerAlign: "center", align: "center", },
        {
            field: 'itemType',
            headerName: 'Type',
            width: 180,
            headerAlign: "center", align: "center",
            renderCell: (params) => {
                const itemType = params.row.itemType.toString();
                return itemType.charAt(0).toUpperCase() + itemType.slice(1).toLowerCase();
            },
        }



    ];

    const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])

    const handleRowSelectionChange = (newSelection) => {
        const selectedRowsData = filteredItemListData.filter((row) => newSelection.includes(row._id));
        setItemListSelectedRowIds(selectedRowsData);



    };

    const [formatNoData, setFormatNoData] = useState([])
    const formatFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/formatNo/getFormatNoById/1`
            );
            const format = response.data.result
            console.log(format)
            setFormatNoData(format)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        formatFetchData();
    }, []);

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







    const [filterAllNames, setFilterAllNames] = useState({
        itemType: "all",
        currentLocation: "all",
        customerWise: "all",
        partName: "all",
        calibrationSource: "all",
        itemCurrentLocation: 'all'


    })

    console.log(itemListSelectedRowIds)
    const [plantDatas, setPlantDatas] = useState([])
    const [departmentDatas, setDepartmentDatas] = useState([])
    const [customerParts, setCustomerParts] = useState([])

    const handleFilterChangeItemList = (e) => {
        const { name, value } = e.target;
        console.log(e)
        if (value === "all") {
            setFilteredItemListData(plantDatas)
        } else {

            if (name === "plantWise") {
                const plantWise = calDueList.filter((item) => (item.itemPlant === value))
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
                    calibrationSource: "all",
                    itemCurrentLocation: "all"
                }))
                setPlantDatas(plantWise)
            }
            // if (name === "currentLocation") {
            //     const currentLocation = calDueList.filter((item) => (item.itemDepartment === value))
            //     setFilteredItemListData(currentLocation)
            //     setFilterAllNames(prev => ({
            //         ...prev,
            //         itemType: "all",
            //         currentLocation: value,
            //         customerWise: "all",
            //         partName: "all",
            //         calibrationSource: "all"
            //     }))
            // }


            if (name === "currentLocation") {
                const currentLocation = plantDatas.filter((item) => (item.itemDepartment === value))
                setFilteredItemListData(currentLocation)
                setFilterAllNames(prev => ({
                    ...prev,
                    itemType: "all",
                    currentLocation: value,
                    customerWise: "all",
                    partName: "all",
                    calibrationSource: "all",
                    itemCurrentLocation: "all"
                }))
                setDepartmentDatas(currentLocation)
                const filterNames = ["itemIMTENo", "itemType", "itemCalibrationSource", "itemCurrentLocation"]

                let updatedFilterNames = {};

                filterNames.forEach((element, index) => {
                    const data = currentLocation.map(item => item[element]);
                    filterNames[index] = [...new Set(data)];
                    // Update the object with a dynamic key based on the 'element'
                    updatedFilterNames[element] = filterNames[index];
                });
                console.log(updatedFilterNames)
                // Update state outside the loop with the updated object
                setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
            }

            if (name === "itemType") {
                const itemType = departmentDatas.filter((item) => (item.itemType === value))

                setFilteredItemListData(itemType)
                setFilterAllNames(prev => ({
                    ...prev,
                    itemType: value,
                    currentLocation: "all",
                    customerWise: "all",
                    partName: "all",
                    calibrationSource: "all",
                    itemCurrentLocation: "all"
                }))


            }
            if (name === "customerWise") {
                const customerData = partDataList.filter(part => part.customer === value)
                const customers = departmentDatas.filter(item => customerData.some(cus => item.itemPartName.includes(cus.partNo)))
                console.log(customers)
                setFilteredItemListData(customers)
                setCustomerParts(customerData)
                setFilterAllNames(prev => ({
                    ...prev,
                    itemType: "all",
                    currentLocation: "all",
                    customerWise: value,
                    partName: "all",
                    calibrationSource: "all",
                    itemCurrentLocation: "all"

                }))
            }

            if (name === "partName") {
                const filteredItems = calDueList.filter((item) => (item.itemPartName.includes(value)));

                setFilteredItemListData(filteredItems);
                console.log(filteredItems)
                setFilterAllNames((prev) => ({
                    ...prev,
                    itemType: "all",
                    currentLocation: "all",
                    customerWise: "all",
                    partName: value,
                    calibrationSource: "all",
                    itemCurrentLocation: "all"
                }));
            }
            if (name === "calibrationSource") {

                const calibrationSource = calDueList.filter((item) => (item.itemCalibrationSource === value))
                setFilteredItemListData(calibrationSource)
                setFilterAllNames(prev => ({
                    ...prev,
                    itemType: "all",
                    currentLocation: "all",
                    customerWise: "all",
                    partName: "all",
                    calibrationSource: value,
                    itemCurrentLocation: "all"
                }))
            }
            // if (name === "plantWise") {
            //     const plantWise = calDueList.filter((item) => (item.itemPlant === value))
            //     setFilteredItemListData(plantWise)
            //     setFilterAllNames(prev => ({
            //         ...prev,
            //         imteNo: "all",
            //         itemType: "all",
            //         currentLocation: "all",
            //         customerWise: "all",
            //         supplierWise: "all",
            //         partName: "all",
            //         status: "all",
            //         plantWise: value,
            //         calibrationSource: "all",
            //         itemCurrentLocation: "all"
            //     }))
            // }
            if (name === "currentLocation") {
                const currentLocation = calDueList.filter((item) => (item.itemDepartment === value))
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
                    calibrationSource: "all",
                    itemCurrentLocation: "all"
                }))
            }
            if (name === "itemCurrentLocation") {
                const itemCurrentLocation = calDueList.filter((item) => (item.itemCurrentLocation === value))
                setFilteredItemListData(itemCurrentLocation)
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
                    calibrationSource: "all",
                    itemCurrentLocation: value
                }))
            }




        }


    };
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


        if (value === "all") {
            setFilteredItemListData(calDueList)
        } else {


            if (value === "Past") {
                const pastData = calDueList.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
                setFilteredItemListData(pastData)

            }
            if (value === "Today") {
                const CurrentDue = calDueList.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))

                setFilteredItemListData(CurrentDue)
            }
            if (value === "7") {

                const filteredDataLast7Days = calDueList.filter((item) => {
                    console.log(item.itemDueDate)
                    return (dayjs(item.itemDueDate).isSameOrBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isSameOrAfter(currentDate.format("YYYY-MM-DD")))
                })

                setFilteredItemListData(filteredDataLast7Days)
            }
            if (value === "15") {

                const fifteenDaysFilter = calDueList.filter((item) => {

                    return (dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
                })
                setFilteredItemListData(fifteenDaysFilter)
            }
            if (value === "30") {

                const thirtyDaysFilter = calDueList.filter((item) => {

                    return (dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
                })
                setFilteredItemListData(thirtyDaysFilter)
            }

            if (value === ">30") {

                const thirtyDaysFilter = calDueList.filter((item) => {

                    return (dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))
                })
                setFilteredItemListData(thirtyDaysFilter)
            }

            if (value === "Date") {
                setFilteredItemListData(calDueList)
            }

        }



    }



    console.log(filteredItemListData)


    const [partDataList, setPartDataList] = useState([])
    const [partCutomerNames, setPartCutomerNames] = useState([])
    const partFetchData = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/part/getPartsByPlant`, {allowedPlants: allowedPlants}
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

    useEffect(() => {
        if (partDataList.length !== 0) {

            const partCustomers = partDataList.filter(part => departmentDatas.some(item => item.itemPartName.includes(part.partNo)))
            console.log(partCustomers)
            setPartCutomerNames(partCustomers)
        }
    }, [departmentDatas])
    useEffect(() => {
        console.log(calDueList)
        const filteredItems = calDueList.filter((item) => dayjs(item.itemDueDate).isSameOrAfter(dateData.fromDate) && dayjs(item.itemDueDate).isSameOrBefore(dateData.toDate))
        console.log(filteredItems)
        setFilteredItemListData(filteredItems)
    }, [dateData.fromDate, dateData.toDate])
    const mailCheck = () => {
        const singlePlant = itemListSelectedRowIds.every((item, index, array) => item.itemPlant === array[0].itemPlant);

        if (singlePlant && itemListSelectedRowIds.length > 0) {
            setMailOpen(true)

        }


    }
    const [mailOpen, setMailOpen] = useState(false)
    const TotalListChildData = {
        mailOpen,
        setMailOpen,
        selectedRows: itemListSelectedRowIds
    }

    return (
        <div className='px-5 pt-3'>
            <form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Paper sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        mb: 1,

                    }} elevation={12}
                    >
                        <div className='row g-2'>
                            <Typography variant="h5" className="text-center mb-2">Calibration Due Report</Typography>

                            <div className="col-2 ">

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
                            <div className="col-2">

                                <TextField label="Default Location "
                                    id="currentLocationId"
                                    select
                                    defaultValue="all"
                                    // value={filterAllNames.currentLocation}
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
                            <div className="col-2">

                                <TextField label="Due In Days"
                                    id="dueInDaysId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    size="small"
                                    onChange={handleDueChange}
                                    name="dueInDays" >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="Past">Past</MenuItem >
                                    <MenuItem value="Today">Today</MenuItem >
                                    <MenuItem value="7">7</MenuItem >
                                    <MenuItem value="15">15</MenuItem >
                                    <MenuItem value="30">30</MenuItem >
                                    <MenuItem value=">30">{'>'}30</MenuItem >
                                    <MenuItem value="Date">Date</MenuItem >

                                </TextField>

                            </div>

                        </div>
                        <div className='row g-2 mt-2 '>


                            <div className="col d-flex mb-1 ">

                                <DatePicker
                                    fullWidth
                                    id="fromDateId"
                                    name="fromDate"
                                    size="small"
                                    label="From Date"
                                    slotProps={{ textField: { size: 'small', } }}
                                    format="DD-MM-YYYY"
                                    value={dayjs(dateData.fromDate)}
                                    onChange={(newValue) =>
                                        setDateData((prev) => ({ ...prev, fromDate: dayjs(newValue).format('YYYY-MM-DD') }))}
                                />
                            </div>
                            <div className="col d-flex  mb-2">

                                <DatePicker
                                    fullWidth
                                    id="toDateId"
                                    name="toDate"
                                    size="small"
                                    label="To Date"
                                    slotProps={{ textField: { size: 'small' } }}
                                    format="DD-MM-YYYY" value={dayjs(dateData.toDate)}
                                    onChange={(newValue) =>
                                        setDateData((prev) => ({ ...prev, toDate: dayjs(newValue).format('YYYY-MM-DD') }))}

                                />

                            </div>
                            <div className="col d-flex  mb-2">
                                <TextField label="Item Type"
                                    id="itemTypeId"
                                    select
                                    fullWidth
                                    defaultValue={"all"}
                                    size="small"
                                    value={filterAllNames.itemType}
                                    onChange={handleFilterChangeItemList}
                                    name="itemType" >
                                    <MenuItem value="all">All</MenuItem >
                                    <MenuItem value="attribute">Attribute</MenuItem >
                                    <MenuItem value="variable">Variable</MenuItem >
                                    <MenuItem value="referenceStandard">Reference Standard</MenuItem >
                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

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
                            {/* <div className="col d-flex  mb-2">
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

                            </div> */}

                            {/* <div className="col d-flex  mb-2">

                                <TextField label=" Part No & Part Name"
                                    id="partNameId"
                                    select
                                    // value={filterAllNames.partName}
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    value={filterAllNames.partName}

                                    name="partName" >
                                    <MenuItem value="all">All</MenuItem>
                                    {customerParts.map((item, index) => (
                                        <MenuItem key={index} value={item.partNo}>{[item.partNo, item.partName].join(', ')}</MenuItem>
                                    ))}
                                </TextField>
                            </div> */}
                            <div className="col d-flex  mr-1 ">
                                <TextField label="Calibration Soure"
                                    onChange={handleFilterChangeItemList}
                                    id="calibrationSourceId"
                                    select
                                    defaultValue={"all"}
                                    fullWidth
                                    size="small"
                                    value={filterAllNames.calibrationSource}
                                    name="calibrationSource" >
                                    <MenuItem value="all">All</MenuItem>
                                    {FilterNameList.itemCalibrationSource.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))}
                                </TextField>

                            </div>


                        </div>

                        <div>
                            {/* <Box sx={{ height: 490, width: '100%', my: 2 }}>
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
                                    slots={{
                                        toolbar: () => (
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <GridToolbar />

                                                <div className='d-flex'>
                                                    <GridToolbarQuickFilter />
                                                    {itemListSelectedRowIds.length > 0 && <Button onClick={() => mailCheck()} size='small' endIcon={<Send />} color="primary">Send Mail</Button>}
                                                </div>

                                            </div>
                                        ),
                                    }}
                                    density="compact"
                                    //disableColumnMenu={true}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                    pageSizeOptions={[5]}
                                />



                            </Box> */}



                        </div>
                        <div className='row'>
                            <div className='col'>
                                <Button variant="contained" size='small' color="success" onClick={() => { setTotalPrintOpen(true) }}>Print</Button>
                            </div>
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
                    </Paper>


                </LocalizationProvider>
                <CalDueReportContent.Provider
                    value={{ totalPrintOpen, setTotalPrintOpen, filteredItemListData, calDueList, partDataList, formatNoData, companyList, plantList }}
                >

                    <CalDuePrint />
                </CalDueReportContent.Provider>
                {itemListSelectedRowIds.length > 0 &&
                    <MailSender {...TotalListChildData} />}


                {/* <MailSender /> */}
            </form>

        </div>
    )
}

export default CalDueReport