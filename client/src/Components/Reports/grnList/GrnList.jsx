import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, MenuItem, Button, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import { Edit, PrintRounded } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import GrnEdit from './GrnEdit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import GrnAdd from './GrnAdd';
import {ArrowBack,Error, HomeMax, House, Mail, MailLock,  } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import Alert from '@mui/material/Alert';
import dayjs from 'dayjs';
import { useEmployee } from '../../../App';
import GrnPrint from './GrnPrint';
export const GrnListContent = createContext(null);

const GrnList = () => {

    const employeeRole = useEmployee()
    const { loggedEmp, allowedPlants } = employeeRole
    const [printState, setPrintState] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const [grnEditOpen, setGrnEditOpen] = useState(false);
    const [grnOpen, setGrnOpen] = useState(false);
    const [grnPrintOpen, setGrnPrintOpen] = useState(false);


    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }


    const initialGrnData = {
        grnPartyRefNo: "",
        grnPartyRefDate: "",
        grnPartyName: "",
        grnPartyCode: "",
        grnPartyAddress: "",
        grnNo: "",
        grnDate: "",
        grnCommonRemarks: "",
        grnPlant: "",
        grnDepartment: "",
        grnPartyItems: []

    }

    const [grnStateId, setGrnStateId] = useState(null)
    const [grnData, setGrnData] = useState({
        grnPartyRefNo: "",
        grnPartyRefDate: "",
        grnPartyName: "",
        grnPartyCode: "",
        grnPartyAddress: "",
        grnNo: "",
        grnDate: "",
        grnCommonRemarks: "",
        grnPlant: "",
        grnDepartment: "",
        grnPartyItems: []




    })

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

   
    const [grnDataList, setGrnDataList] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const oneMonthBefore = dayjs().subtract(dayjs().date() - 1, 'day')
    const [dateData, setDateData] = useState({
        fromDate: oneMonthBefore.format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD')
    })
    const grnListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemGRN/getAllItemGRN`
            );
            console.log(response.data)
            setGrnDataList(response.data.result);
            setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        grnListFetchData();
    }, []);
    useEffect(() => {
        const filteredItems = grnDataList.filter((item) => dayjs(item.grnDate).isSameOrAfter(dateData.fromDate) && dayjs(item.grnDate).isSameOrBefore(dateData.toDate))
        console.log(filteredItems)
        setFilteredData(filteredItems)
    }, [dateData.fromDate, dateData.toDate])


    const [lastNo, setLastNo] = useState("1")

    const [grnDataDcList, setGrnDataDcList] = useState([])
    const dcListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemGRN/getAllItemGRN`

            );
            const plantGRN = response.data.result.filter(dc => (loggedEmp.plantDetails.map(plant => plant.plantName).includes(dc.grnPlant)))
            const grnNos = response.data.result.map(dc => dc.grnId).filter(Boolean).sort()
            setLastNo((dayjs().year() + "-" + ((grnNos[grnNos.length - 1]) + 1))) 
            console.log(grnNos[grnNos.length - 1])
            setGrnDataDcList(plantGRN);
            setFilteredData(plantGRN);


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        dcListFetchData();
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
    
    //

    const Columns = [
        { field: 'id', headerName: 'Si. No', width: 100, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },
         ...(employeeRole && employeeRole.employee !== "viewer" ? [{ field: 'button', headerName: 'Edit', headerAlign: "center", align: "center", width: 90, renderCell: (params) => <Button onClick={() => { setSelectedRows(params.row); setGrnEditOpen(true) }}><Edit color='success' /></Button> }] : []),
        { field: 'grnNo', headerName: 'Grn No', width: 200, headerAlign: "center", align: "center", },
        { field: 'grnDate', headerName: 'Grn Date', width: 200, headerAlign: "center", align: "center", renderCell: (params) => dayjs(params.row.grnDate).format("DD-MM-YYYY") },
        { field: 'grnPartyName', headerName: 'Party Name', width: 300, headerAlign: "center", align: "center", },
        { field: 'printButton', headerName: 'Print', headerAlign: "center", align: "center", width: 100, renderCell: (params) => <Button component={Link} to={`${process.env.REACT_APP_PORT}/grnCertificates/${params.row.grnNo}.pdf`} target='_blank'><PrintRounded  color='success' /></Button> }
    ]


    const [grnDataListSelectedRowIds, setgrnDataListSelectedRowIds] = useState([])

    console.log(setGrnPrintOpen)


    const [itemPlantList, setItemPlantList] = useState([])
    const ItemFetch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`, { allowedPlants: allowedPlants }
              );
            console.log(response.data.result)
           
            const DcItems = response.data.result.filter(item => item.dcStatus === "1")
            console.log(DcItems)
            setItemPlantList(DcItems);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        ItemFetch()
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



    const [vendorFullList, setVendorFullList] = useState([])
    const [vendorTypeList, setVendorTypeList] = useState([])

    const FetchData = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/vendor/getVendorByPlants`, { allowedPlants: allowedPlants }
              );
            setVendorFullList(response.data.result);
            setVendorTypeList(response.data.result)
            // setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        FetchData();
    }, []);


    const [deleteModalItem, setDeleteModalItem] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [errorhandler, setErrorHandler] = useState({});
    const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])



    console.log(itemListSelectedRowIds)


    const deleteGrnData = async (id) => {

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/itemGRN/deleteItemGRN`, {
                data: {
                    itemGRNIds: itemListSelectedRowIds
                }
            }
            );
            console.log(response.data)

            setSnackBarOpen(true)


            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })

            // setGrnData(initialGrnData)
            grnListFetchData()
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

    const handleRowClick = async (params) => {
        console.log(params)
        setGrnData(params.row)
        setGrnStateId(params.id)
    }
    console.log(grnStateId)



    const grnColumns = [

        { field: 'grnItemId', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },
        { field: 'grnItemIMTENo', headerName: 'Item IMTENo', width: 150, headerAlign: "center", align: "center" },
        { field: 'grnItemAddMasterName', headerName: 'Item Description', width: 200, headerAlign: "center", align: "center" },
        { field: 'grnItemRangeSize', headerName: 'Range/Size', width: 100, headerAlign: "center", align: "center" },
        { field: 'grnPartyRefNo', headerName: 'Dc Ref', width: 100, headerAlign: "center", align: "center" },

    ]

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === "vendorType") {
            if (value === "all") {
                setVendorTypeList(vendorFullList)
            } else {
                const vendorType = setVendorFullList.filter((item) => (item[value] === "1"))
                setVendorTypeList(vendorType)
            }
        }
        if (name === "partyName") {
            const partyName = grnDataList.filter((item) => (item.grnPartyName === value))
            setFilteredData(partyName)
            console.log(value)
        }
        if (name === "grnPlant") {
            const grnPlant = grnDataList.filter((item) => (item.grnPlant === value))
            setFilteredData(grnPlant);
        }
        if (name === "grnDepartment") {
            const dcDepartment = grnDataList.filter((item) => (item.itemDepartment && item.itemDepartment.includes(value)));


            setFilteredData(dcDepartment);
        }
        setDateData((prev) => ({ ...prev, [name]: value }))




    };





    return (
        <div className='px-5 pt-3'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>
                    <div className='row mb-2'>


                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1
                            }}
                            elevation={12}
                        >
                            <div className='row g-2'>
                                <div className='col'>
                                    <TextField fullWidth label="Vendor Type" select size="small" id="vendorTypeId" onChange={handleFilterChange} name="vendorType" defaultValue="all" >
                                        <MenuItem value="all">All</MenuItem>
                                        <MenuItem value="oem">OEM</MenuItem>
                                        <MenuItem value="customer">Customer</MenuItem>
                                        <MenuItem value="supplier">Supplier</MenuItem>
                                        <MenuItem value="subContractor">SubContractor</MenuItem>
                                    </TextField>

                                </div>
                                <div className='col'>
                                    <TextField fullWidth label="Party Name" select size="small" onChange={handleFilterChange} id="partyNameId" name="partyName" defaultValue="all" >

                                        <MenuItem value="all">All</MenuItem>
                                        {vendorTypeList.map((item, index) => (
                                            <MenuItem key={index} value={item.fullName}>{item.fullName}</MenuItem>
                                        ))}


                                    </TextField>

                                </div>
                                <div className='col'>

                                    <TextField label="Plant Wise"
                                        id="grnPlantId"
                                        select
                                        defaultValue="all"
                                        // value={filterAllNames.plantWise}
                                        fullWidth

                                        onChange={handleFilterChange}
                                        size="small"
                                        name="grnPlant" >

                                        <MenuItem value="all">All</MenuItem>
                                        {loggedEmp.plantDetails.map((item, index) => (
                                            <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                        ))}


                                    </TextField>

                                </div>
                                <div className='col '>

                                    <TextField label="Primary Location "
                                        id="dcDepartmentId"
                                        select
                                        defaultValue="all"
                                        // value={filterAllNames.currentLocation}
                                        fullWidth
                                        onChange={handleFilterChange}
                                        size="small"
                                        name="dcDepartment" >
                                        <MenuItem value="all">All</MenuItem>
                                        {departments.map((item, index) => (
                                            <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
                                        ))}


                                    </TextField>

                                </div>
                                <div className="form-floating col">
                                    <DatePicker
                                        fullWidth
                                        id="fromDateId"
                                        name="fromDate"
                                        label="From Date"
                                        sx={{ width: "100%" }}
                                        slotProps={{ textField: { size: 'small' } }}
                                        value={dayjs(dateData.fromDate)}
                                        onChange={(newValue) =>
                                            setDateData((prev) => ({ ...prev, fromDate: dayjs(newValue).format('YYYY-MM-DD') }))}
                                        format="DD-MM-YYYY" />
                                </div>
                                <div className="col me-2">
                                    <DatePicker
                                        fullWidth
                                        id="toDateId"
                                        name="toDate"
                                        sx={{ width: "100%" }}
                                        label="To Date"
                                        slotProps={{ textField: { size: 'small' } }}
                                        value={dayjs(dateData.toDate)}
                                        onChange={(newValue) =>
                                            setDateData((prev) => ({ ...prev, toDate: dayjs(newValue).format('YYYY-MM-DD') }))}
                                        format="DD-MM-YYYY" />
                                </div>

                            </div>

                        </Paper>


                        <div className='row g-2'>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mb: 1
                                }}
                                elevation={12}
                            >



                                <Box sx={{ height: 500, width: '100%', my: 2 }}>
                                    <DataGrid

                                        rows={filteredData}
                                        columns={Columns}
                                        getRowId={(row) => row._id}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 8 },
                                            },
                                        }}
                                        sx={{
                                            ".MuiTablePagination-displayedRows": {

                                                "marginTop": "1em",
                                                "marginBottom": "1em"
                                            }
                                        }}
                                        onRowSelectionModelChange={(newRowSelectionModel) => {
                                            setItemListSelectedRowIds(newRowSelectionModel);
                                        }}

                                        slots={{
                                            toolbar: () => (
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <GridToolbar />
                                                    <div className='mt-2'>
                                                        {itemListSelectedRowIds.length !== 0 && <Button variant='contained' type='button' size='small' color='error' onClick={() => setDeleteModalItem(true)}> Delete </Button>}





                                                    </div>

                                                </div>
                                            ),
                                        }}

                                        density="compact"
                                        

                                        checkboxSelection
                                        //onRowClick={handleRowClick}
                                        onRowClick={handleRowClick}
                                        disableRowSelectionOnClick
                                        pageSizeOptions={[10]}
                                    />

                                </Box>
                            </Paper>

                        </div>

                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1
                            }}
                            elevation={12}
                        >
                            <div className='row'>

                                

                            </div>

                            <div className='row'>
                                <div className='col d-flex '>
                                    {/* <div className='me-2 '>
                                        <button type="button" className='btn btn-secondary' >Print</button>
                                    </div> */}
                                    <div className='row'>
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

                                </div>

                                <div className='col d-flex justify-content-end'>
                                    {/* <div className=' me-2'>
                                        <Button component={Link} onClick={() => { setGrnOpen(true) }} type='button' variant="contained" color="warning">
                                            <AddIcon /> Add Item
                                        </Button>
                                    </div> */}

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
                                            <Button onClick={(e) => { deleteGrnData(e); setDeleteModalItem(false); }} autoFocus>
                                                Delete
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                                        <Alert onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '100%' }}>
                                            {errorhandler.message}
                                        </Alert>
                                    </Snackbar>

                                </div>

                                <GrnListContent.Provider
                                    value={{ grnEditOpen, setGrnEditOpen, selectedRows, grnListFetchData, itemPlantList ,grnDataDcList, allowedPlants}}
                                >
                                    <GrnEdit />
                                </GrnListContent.Provider>
                                <GrnListContent.Provider
                                    value={{ grnOpen, setGrnOpen, selectedRows, grnListFetchData, itemPlantList,grnDataDcList,lastNo}}
                                >
                                    <GrnAdd />
                                </GrnListContent.Provider>
                                <GrnListContent.Provider
                                    value={{ grnPrintOpen, setGrnPrintOpen, selectedRows, formatNoData, printState, setPrintState,companyList,plantList }}
                                >
                                    {selectedRows.length !== 0 &&
                                        <GrnPrint />}
                                </GrnListContent.Provider>
                            </div>
                        </Paper>









                    </div>









                </form>

            </LocalizationProvider>

        </div >
    )
}

export default GrnList