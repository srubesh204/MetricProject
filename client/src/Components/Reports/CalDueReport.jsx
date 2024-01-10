import React, { useEffect, useState, createContext } from 'react'
import { TextField, MenuItem, Button } from '@mui/material';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { Edit, FilterAlt, PrintRounded } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


import { useEmployee } from '../../App';
import TotalPrint from './TotalPrint';




const CalDueReport = () => {


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
        itemCalibrationSource: []
    })


    const calDueFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
            );

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




            setCalDueList(response.data.result);
            setFilteredItemListData(response.data.result)
            console.log(response.data)
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


    ];
    const [itemId, setItemId] = useState("")
    const [showDialog, setShowDialog] = useState(false);
    const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])
    const handleRowClick = async (params) => {
        if (itemListSelectedRowIds.length > 0) {

            setShowDialog(true);
        } else {

            setItemId(params.id);

            setItemListSelectedRowIds([params.id]);
        }
    };





    const [filterAllNames, setFilterAllNames] = useState({
        itemType: "all",
        currentLocation: "all",
        customerWise: "all",
        partName: "all",
        calibrationSource: "all"


    })
    const handleFilterChangeItemList = (e) => {
        const { name, value } = e.target;
        console.log(e)
      
        if (value === "all") {
            setFilteredItemListData(calDueList)
        } else {

            if (name === "itemType") {
                const itemType = calDueList.filter((item) => (item.itemType === value))
                console.log(itemType)
                setFilteredItemListData(itemType)
                setFilterAllNames(prev => ({
                    ...prev,

                    itemType: value,
                    currentLocation: "all",
                    customerWise: "all",
                    partName: "all",
                    calibrationSource: "all"
                }))


            }
            if (name === "currentLocation") {
                const currentLocation = calDueList.filter((item) => (item.itemDepartment === value))
                setFilteredItemListData(currentLocation)
                setFilterAllNames(prev => ({
                    ...prev,
                    itemType: "all",
                    currentLocation: value,
                    customerWise: "all",
                    partName: "all",
                    calibrationSource: "all"
                }))
            }
            if (name === "customerWise") {
                const customerWise = calDueList.filter((item) =>
                    item.itemCustomer && Array.isArray(item.itemCustomer) && item.itemCustomer.includes(value)
                );
                setFilteredItemListData(customerWise);
                setFilterAllNames(prev => ({
                    ...prev,
                    itemType: "all",
                    currentLocation: "all",
                    customerWise: value,
                    partName: "all",
                    calibrationSource: "all"
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
                    calibrationSource: "all"
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
                    calibrationSource: value
                }))
            }

        }


    };



    console.log(filteredItemListData)


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

    useEffect(() => {
        if (partDataList.length !== 0) {

            const partCustomers = partDataList.filter(part => calDueList.some(item => item.itemPartName.includes(part._id)))
            console.log(partCustomers)
            setPartCutomerNames(partCustomers)

        }
    }, [partDataList, calDueList])

    useEffect(() => {
        console.log(calDueList)
        const filteredItems = calDueList.filter((item) => dayjs(item.itemDueDate).isSameOrAfter(dateData.fromDate) && dayjs(item.itemDueDate).isSameOrBefore(dateData.toDate))
        console.log(filteredItems)
        setFilteredItemListData(filteredItems)
    }, [dateData.fromDate, dateData.toDate])



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
                        <div className='row'>
                            <Typography variant="h5" className="text-center mb-2">Calibration Due Report</Typography>
                            <div className="col-3">

                                <TextField label="Due In Days"
                                    id="dueInDaysId"
                                    select

                                    fullWidth
                                    size="small"

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

                                <TextField label="Department Wise"
                                    id="currentLocationId"
                                    onChange={handleFilterChangeItemList}
                                    select
                                    defaultValue={"all"}
                                    fullWidth
                                    value={filterAllNames.currentLocation}
                                    size="small"
                                    name="currentLocation" >
                                    <MenuItem value="all">All</MenuItem>
                                    {FilterNameList.itemDepartment.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col d-flex  mb-2">
                                <TextField label="Customer Wise"
                                    id="customerWiseId"
                                    onChange={handleFilterChangeItemList}
                                    select
                                    defaultValue={"all"}
                                    fullWidth
                                    value={filterAllNames.customer}
                                    size="small"
                                    name="customerWise" >
                                    <MenuItem value="all">All</MenuItem>
                                    {partCutomerNames.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item.customer}</MenuItem>
                                    ))}

                                </TextField>

                            </div>

                            <div className="col d-flex  mb-2">

                                <TextField label="Part Name"
                                    id="partNameId"
                                    onChange={handleFilterChangeItemList}
                                    select
                                    defaultValue={"all"}
                                    fullWidth
                                    size="small"
                                    value={filterAllNames.partName}
                                    name="partName" >
                                    <MenuItem value="all">All</MenuItem>
                                    {partCutomerNames.map((item, index) => (
                                        <MenuItem key={index} value={item._id}>{[item.partNo, item.partName].join(', ')}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
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
                                    onRowClick={handleRowClick}
                                    disableRowSelectionOnClick
                                    pageSizeOptions={[5]}
                                />



                            </Box>



                        </div>
                    </Paper>


                </LocalizationProvider>
            </form>
        </div>
    )
}

export default CalDueReport