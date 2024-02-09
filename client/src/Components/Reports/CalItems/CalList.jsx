import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Container, Paper } from '@mui/material';
import { Add, Remove, HighlightOffRounded } from '@mui/icons-material';
import { ArrowBack, Error, HomeMax, House, Mail, MailLock, } from '@mui/icons-material';
import { Link } from "react-router-dom";


import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Edit, EditRounded, PrintRounded } from '@mui/icons-material';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import CalPrint from './CalPrint'
import CalAddModel from './CalAddModel'
import CalEditModel from './CalEditModel'
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEmployee } from '../../../App';
export const CalData = createContext(null);
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)


const CalList = () => {
    const employeeRole = useEmployee()
    const { loggedEmp, allowedPlants } = employeeRole
    const [itemAddList, setItemAddList] = useState([])
    const [itemMasters, setItemMasters] = useState([])
    const [IMTENos, setIMTENos] = useState([])
    const [printState, setPrintState] = useState(false)


    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }

    const [masters, setMasters] = useState([]);
    const MasterFetch = async () => {
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
        MasterFetch();
    }, []);

    const itemMasterFetchData = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`, { allowedPlants: allowedPlants }
              );
            
            const masterItems = response.data.result.filter((item) => item.isItemMaster === "1")
            setItemAddList(response.data.result);
            setItemMasters(masterItems)
        
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemMasterFetchData();
    }, []);

    console.log(itemAddList)


    const [plantDatas, setPlantDatas] = useState([]);

    const plantFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/compDetails/getAllPlantDetails`
            );
            setPlantDatas(response.data.result);
            setFilterAddress(response.data.result);
            console.log(response.data.result);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        plantFetch();
    }, []);

    const [filterAddress, setFilterAddress] = useState([])



    const handlePlantAddress = (e) => {
        const { name, value } = e.target;
        if (value === "all") {
            setPlantDatas(itemAddList)
        } else {
            if (name === "plantAddress") {
                const plantAddress = itemAddList.filter((item) => item.plantAddress === value)
                setFilterAddress(plantAddress)
            }
            if (name === "plantName") {
                const plantName = itemAddList.filter((item) => item.plantName === value)
                setFilterAddress(plantName)
            }

        }


    }


    const [filterCompany, setFilterCompany] = useState([])

    const [companyName, setCompanyName] = useState([])

    const companyFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/compDetails/getAllCompDetails`
            );
            setCompanyName(response.data.result);
            setFilterCompany(response.data.result);

            console.log(response.data.result);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        companyFetch();
    }, []);

    const handleCompany = (e) => {
        const { name, value } = e.target;
        if (value === "all") {
            setCompanyName(itemAddList)
        } else {
            if (name === "companyName") {
                const companyName = itemAddList.filter((item) => item.companyName === value)
                setFilterAddress(companyName)
            }

        }


    }



    console.log(plantDatas);

    const [activeEmps, setActiveEmps] = useState([])

    const empFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/employee/getAllActiveEmployees`
            );

            const plantemps = response.data.result.filter(emp => emp.plantDetails.find(empPlant => loggedEmp.plantDetails.map(plant => plant.plantName).includes(empPlant.plantName)))

           


            setActiveEmps(plantemps)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        empFetch();
    }, [])
    console.log(activeEmps)
    const [selectedRows, setSelectedRows] = useState([]);
    console.log(selectedRows)

    const [calAddOpen, setCalAddOpen] = useState(false)
    const [calEditOpen, setCalEditOpen] = useState(false)
    const [calPrintOpen, setCalPrintOpen] = useState(false);

    const [calDataList, setCalDataList] = useState([])
    const calFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemCal/getAllDistinctCalNames`
            );
            // You can use a different logic for generating the id

            setCalDataList(response.data.result);


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        calFetchData();
    }, []);

    const [calListSelectedRowIds, setCalListSelectedRowIds] = useState([])
    const [calListDataList, setCalListDataList] = useState([])
    const [filteredCalData, setFilteredCalData] = useState([])
    const oneMonthBefore = dayjs().subtract(dayjs().date() - 1, 'day')
    const [dateData, setDateData] = useState({
        fromDate: oneMonthBefore.format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD')
    })
    const calListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemCal/getAllItemCals`
            );

            setCalListDataList(response.data.result);
            setFilteredCalData(response.data.result)
            const filteredItems = response.data.result.filter((item) => dayjs(item.calItemCalDate).isSameOrAfter(dateData.fromDate) && dayjs(item.calItemCalDate).isSameOrBefore(dateData.toDate))
            setFilteredCalData(filteredItems);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        calListFetchData();

    }, []);

    const [lastNo, setLastNo] = useState("1")

    const [calDataDcList, setCalDataDcList] = useState([])
    const dcListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemCal/getAllItemCals`

            );
            const plantCal = response.data.result.filter(cal => (loggedEmp.plantDetails.map(plant => plant.plantName).includes(cal.calPlant)))
            const calNos = response.data.result.map(cal => cal.calId).filter(Boolean).sort()
            setLastNo((dayjs().year() + "-" + ((calNos[calNos.length - 1]) + 1)))
            console.log(calNos[calNos.length - 1])
            setCalDataDcList(plantCal);
            setFilteredCalData(plantCal);


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        dcListFetchData();
    }, []);














    const [selectedCalRow, setSelectedCalRow] = useState([])
    console.log(filteredCalData)

    const setCalEditData = (params) => {
        setSelectedCalRow(params.row);
        setCalEditOpen(true)
    }
    console.log(selectedCalRow)

    const calListColumns = [
        { field: 'id', headerName: 'Entry. No', width: 100, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },
        ...(employeeRole && employeeRole.employee !== "viewer" ? [{ field: 'editButton', headerAlign: "center", align: "center", headerName: 'Edit', width: 100, renderCell: (params) => <EditRounded color='warning' onClick={() => setCalEditData(params)} /> }] : []),
        { field: 'calItemEntryDate', headerName: 'Entry Date', width: 200, valueGetter: (params) => dayjs(params.row.calItemEntryDate).format('DD-MM-YYYY'), headerAlign: "center", align: "center", },
        { field: 'calIMTENo', headerName: 'Item IMTENo', width: 200, headerAlign: "center", align: "center", },
        { field: 'calItemName', headerName: 'Item Description', width: 200, headerAlign: "center", align: "center", },
        { field: 'calRangeSize', headerName: 'Range/Size', width: 200, headerAlign: "center", align: "center", },
        { field: 'calItemCalDate', headerName: 'Calibration On', width: 200, valueGetter: (params) => dayjs(params.row.calItemCalDate).format('DD-MM-YYYY'), headerAlign: "center", align: "center", },
        { field: 'calItemDueDate', headerName: 'Next Due On', width: 200, valueGetter: (params) => dayjs(params.row.calItemDueDate).format('DD-MM-YYYY'), headerAlign: "center", align: "center", },
        { field: 'calStatus', headerName: 'Cal status', width: 200, headerAlign: "center", align: "center", },
        { field: 'printButton', headerName: 'Print', headerAlign: "center", align: "center", width: 100, renderCell: (params) => <Button component={Link} to={`${process.env.REACT_APP_PORT}/calCertificates/${params.row.calCertificateNo}.pdf`} target='_blank'><PrintRounded color='success' /></Button> }



    ]

    const [filterMaster, setFilterMaster] = useState([])
    const [departments, setDepartments] = useState([])
    const DepartmentFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            const defaultDepartment = response.data.result.filter((dep) => dep.defaultdep === "yes")
            setDepartments(defaultDepartment);

            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        DepartmentFetch()
    }, []);


    const handleMasterFilter = (e) => {
        const { name, value } = e.target;
        if (value === "all") {
            setFilterMaster(itemAddList)
        } else {
            if (name === "itemName") {
                const selectedItem = itemAddList.filter((item) => item.calItemName === value)
            }
            if (name === "itemIMTENo") {
                const selectedItem = itemAddList.filter((item) => item.calIMTENo === value)
                setFilteredCalData(selectedItem)
            }
            setDateData((prev) => ({ ...prev, [name]: value }))
        }
    }

    const handleFilter = (e) => {
        const { name, value } = e.target;
        if (value === "all") {
            setFilteredCalData(calListDataList)
        } else {

            if (name === "itemName") {
                const selectedItem = calListDataList.filter((item) => item.calItemName === value)

                const uniqueNames = [...new Set(selectedItem.map(item => item.calIMTENo))];
                console.log(uniqueNames)
                setIMTENos(uniqueNames)
            }

            if (name === "itemIMTENo") {
                const selectedItem = calListDataList.filter((item) => item.calIMTENo === value)
                setFilteredCalData(selectedItem)
            }
            if (name === "itemPlant") {
                const itemPlant = calListDataList.filter((item) => (item.itemPlant && item.itemPlant.includes(value)));
                setFilteredCalData(itemPlant);
            }
            if (name === "itemDepartment") {
                const itemDepartment = calListDataList.filter((item) => (item.itemDepartment && item.itemDepartment.includes(value)));
                setFilteredCalData(itemDepartment);
            }

            setDateData((prev) => ({ ...prev, [name]: value }))
        }


    }

    const dateFilter = () => {
        const filteredItems = calListDataList.filter((item) => dayjs(item.calItemCalDate).isSameOrAfter(dateData.fromDate) && dayjs(item.calItemCalDate).isSameOrBefore(dateData.toDate))
        setFilteredCalData(filteredItems)
    }
    useEffect(() => {
        dateFilter();
    }, [dateData.fromDate, dateData.toDate])
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [errorhandler, setErrorHandler] = useState({});
    const [deleteModalItem, setDeleteModalItem] = useState(false);
    const deleteCal = async () => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/itemCal/deleteItemCal`, { data: { itemCalIds: calListSelectedRowIds } }
            );
            console.log(response.data.result)
            calListFetchData()
            console.log("Cal Items Deleted Successfully")
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
            console.log(err);
        }
    };
    console.log(calListSelectedRowIds)

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


    return (
        <div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <form>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            m: 2,

                        }}
                        elevation={12}
                    >
                        <div className='row g-2 '>


                            <div className='col d-flex'>
                                <div className='col me-2'>
                                    <TextField label="Item Description"
                                        id="imteNoId" select defaultValue="all" fullWidth size="small" name="itemName" onChange={handleFilter}>
                                        <MenuItem value="all">All</MenuItem>
                                        {calDataList.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className='col me-2 '>
                                    <TextField size='small' fullWidth defaultValue="all" variant='outlined' id="itemListId" select label="Item IMTE No" onChange={handleFilter} name='itemIMTENo'>
                                        <MenuItem value="all">All</MenuItem>
                                        {IMTENos.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className='col me-2'>

                                    <TextField label="Plant Wise"
                                        id="itemPlantId"
                                        select
                                        defaultValue="all"
                                        // value={filterAllNames.plantWise}
                                        fullWidth
                                        onChange={handleFilter}
                                        size="small"
                                        name="itemPlant" >
                                        <MenuItem value="all">All</MenuItem>
                                        {loggedEmp.plantDetails.map((item, index) => (
                                            <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className='col '>
                                    <TextField label="Primary Location "
                                        id="itemDepartmentId"
                                        select
                                        defaultValue="all"
                                        // value={filterAllNames.currentLocation}
                                        fullWidth
                                        onChange={handleFilter}
                                        size="small"
                                        name="itemDepartment" >
                                        <MenuItem value="all">All</MenuItem>
                                        {departments.map((item, index) => (
                                            <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
                                        ))}


                                    </TextField>

                                </div>


                            </div>
                            <div className=' col d-flex justify-content-end'>
                                <div className="col-3 me-2">

                                    <DatePicker
                                        fullWidth
                                        id="fromDateId"
                                        name="fromDate"
                                        size="small"
                                        label="From Date"
                                        sx={{ width: "100%" }}
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY"
                                        value={dayjs(dateData.fromDate)}
                                        onChange={(newValue) =>
                                            setDateData((prev) => ({ ...prev, fromDate: dayjs(newValue).format('YYYY-MM-DD') }))}
                                    />


                                </div>
                                <div className="col-3">

                                    <DatePicker
                                        fullWidth
                                        id="toDateId"
                                        name="toDate"
                                        label="To Date"
                                        sx={{ width: "100%" }}
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY"
                                        value={dayjs(dateData.toDate)}
                                        onChange={(newValue) =>
                                            setDateData((prev) => ({ ...prev, toDate: dayjs(newValue).format('YYYY-MM-DD') }))}

                                    />

                                </div>
                            </div>

                        </div>

                        <div className='row'>
                            <Box sx={{ height: "75vh", width: '100%', my: 2 }}>
                                <DataGrid disableDensitySelector

                                    rows={filteredCalData}
                                    columns={calListColumns}
                                    getRowId={(row) => row._id}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 12 },
                                        },
                                    }}
                                    sx={{
                                        ".MuiTablePagination-displayedRows": {

                                            "marginTop": "1em",
                                            "marginBottom": "1em"
                                        }
                                    }}
                                    onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                        setCalListSelectedRowIds(newRowSelectionModel);


                                    }}

                                    slots={{
                                        toolbar: () => (
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <GridToolbar />
                                                <div className='mt-2'>
                                                    {calListSelectedRowIds.length !== 0 && <Button variant='contained' type='button' size='small' color='error' onClick={() => setDeleteModalItem(true)}> Delete </Button>}



                                                </div>

                                            </div>
                                        ),
                                    }}

                                    density="compact"
                                    //disableColumnMenu={true}

                                    checkboxSelection
                                    //onRowClick={handleRowClick}
                                    disableRowSelectionOnClick
                                    pageSizeOptions={[12]}
                                />
                            </Box>
                        </div>
                        <div className='row'>
                            <div className='col d-flex '>
                               
                                {/* <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' > Label Print</button>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Lable With BarCode Print</button>
                                </div> */}


                            </div>
                            {employeeRole && employeeRole.employee !== "viewer" &&
                                <div className='col d-flex justify-content-end'>

                                    {/* <div className='me-2 '>
                                        <button type="button" className='btn btn-success' onClick={() => setCalAddOpen(true)}>Add</button>
                                    </div> */}
                                    <div className='me-2'>
                                        <Button component={Link} to={`/home`} variant="contained" size='small' color="warning">
                                            <ArrowBackIcon /> Dash board
                                        </Button>
                                    </div>
                                    {/* <div >
                                    <Button component={Link} to="/" size='small' variant='contained' startIcon={<ArrowBack />} endIcon={<House />} color='secondary'>Home</Button>
                                </div> */}



                                </div>}
                        </div>
                    </Paper>

                    <Dialog
                        open={deleteModalItem}
                        onClose={() => setDeleteModalItem(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {" ItemAdd delete confirmation?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure to delete the
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDeleteModalItem(false)}>Cancel</Button>
                            <Button onClick={(e) => { deleteCal(e); setDeleteModalItem(false); }} autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '100%' }}>
                            {errorhandler.message}
                        </Alert>
                    </Snackbar>




                    {employeeRole && employeeRole.employee !== "viewer" &&
                        <CalData.Provider
                            value={{ employeeRole, calAddOpen, setCalAddOpen, itemMasters, activeEmps, itemAddList, setItemAddList, calDataDcList, lastNo , masters}}
                        >
                            <CalAddModel />
                        </CalData.Provider>}

                    {employeeRole && employeeRole.employee !== "viewer" &&
                        <CalData.Provider
                            value={{ employeeRole, calEditOpen, setCalEditOpen, selectedCalRow, itemMasters, activeEmps, itemAddList, setItemAddList , calListFetchData}}
                        >
                            {selectedCalRow.length !== 0 && <CalEditModel />}
                        </CalData.Provider>}
                    <CalData.Provider
                        value={{ calPrintOpen, setCalPrintOpen, selectedRows, printState, setPrintState, filterAddress, filteredCalData, formatNoData, filterCompany }}
                    >
                        {selectedRows && <CalPrint />}
                    </CalData.Provider>







                </form>

            </LocalizationProvider>
        </div>
    )
}

export default CalList




