import React, { useState, useEffect, useRef, createContext } from 'react'
import axios from 'axios'
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab, Link, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Container, Paper } from '@mui/material';
import { Edit, FilterAlt } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import dayjs from 'dayjs';

import DcEdit from './DcEdit';
import DcAdd from './DcAdd';
export const DcListContent = createContext(null);
const DcList = () => {



    const [selectedRows, setSelectedRows] = useState([]);
    const [dcEditOpen, setDcEditOpen] = useState(false);
    const [dcOpen, setDcOpen] = useState(false);


    const [dcStateId, setDcStateId] = useState(null)
    const initialDcData = {
        dcPartyId: "",
        dcPartyType: "",
        dcPartyName: "",
        dcPartyCode: "",
        dcPartyAddress: "",
        dcNo: "",
        dcDate: "",
        dcReason: "",
        dcCommonRemarks: "",
        dcPartyItems: []

    }

    const [dcData, setDcData] = useState({
        dcPartyId: "",
        dcPartyType: "",
        dcPartyName: "",
        dcPartyCode: "",
        dcPartyAddress: "",
        dcNo: "",
        dcDate: "",
        dcReason: "",
        dcCommonRemarks: "",
        dcPartyItems: []

    })
    console.log(dcData)


    const [vendorDataList, setVendorDataList] = useState([])

    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            console.log(response.data)

            setVendorDataList(response.data.result);

            setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);
    const [vendorFullList, setVendorFullList] = useState([])

    const FetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            console.log(response.data)

            setVendorFullList(response.data.result);

            // setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        FetchData();
    }, []);

    const [filteredData, setFilteredData] = useState([])

    const oneMonthBefore = dayjs().subtract(dayjs().date() - 1, 'day')
    const [dateData, setDateData] = useState({
        fromDate: oneMonthBefore.format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD')
    })




    const [dcListDataList, setDcListDataList] = useState([])


    const [dcDataDcList, setDcDataDcList] = useState([])
    const dcListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemDc/getAllItemDc`

            );
            setDcDataDcList(response.data.result);

            setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        dcListFetchData();
    }, []);

    useEffect(() => {
        const filteredItems = dcDataDcList.filter((item) => dayjs(item.dcDate).isSameOrAfter(dateData.fromDate) && dayjs(item.dcDate).isSameOrBefore(dateData.toDate))
        console.log(filteredItems)
        setFilteredData(filteredItems)
    }, [dateData.fromDate, dateData.toDate])


    {/*const [dcListData, setDcListData] = useState([])
    const dcListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemDc/getAllItemDc`
            );

            setDcListData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        dcListFetchData();
    }, []);*/}


    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }
    {/*const [selectedRowView, setSelectedRowView] = useState(null);
    const handleViewClick = (params) => {
        setSelectedRowView(params); // Set the selected row data
        setDcListDataList(params.dcPartyItems)

    };*/}
    const [selectedRowView, setSelectedRowView] = useState(null);
    // const [dcListDataList, setDcListDataList] = useState([]);

    const handleViewClick = (params) => {
        setSelectedRowView(params); // Set the selected row data
    };

    useEffect(() => {
        if (selectedRowView) {
            // Assuming params.dcPartyItems is an array
            setDcListDataList(selectedRowView.dcPartyItems || []);
        }
    }, [selectedRowView]);


    // const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])
    //
    const Columns = [

        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'editButton', headerName: 'Edit', width: 100, renderCell: (params) => <Button onClick={() => { setSelectedRows(params.row); setDcEditOpen(true) }}><Edit color='success' /></Button> },
        // { field: 'viewButton', headerName: 'View', width: '100', renderCell: (params) => <Button><RemoveRedEyeIcon onClick={() => { setSelectedRowView(params.row); setDcEditOpen(true) }} /></Button> },
        {
            field: 'viewButton',
            headerName: 'View',
            width: 100,

            renderCell: (params) => (


                <RemoveRedEyeIcon color="primary"
                    onClick={() => handleViewClick(params.row)} />

            ),
        },
        { field: 'dcNo', headerName: 'Dc No', width: 100 },
        { field: 'dcDate', headerName: 'Dc Date', width: 200 },
        { field: 'dcPartyName', headerName: 'Dc PartyName', width: 300 },
    ]


    const [dcListSelectedRowIds, setDcListSelectedRowIds] = useState([])







    const [deleteModalItem, setDeleteModalItem] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [errorhandler, setErrorHandler] = useState({});
    const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])

    const deleteDcData = async (id) => {

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/itemDc/deleteItemDc`, {
                data: {
                    itemDcIds: itemListSelectedRowIds
                }
            }
            );

            setSnackBarOpen(true)


            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })


            dcListFetchData()
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
        setDcData(params.row)
        setDcStateId(params.id)
    }





   const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (value === "all") {
            setFilteredData(dcDataDcList)
        } else {
            if (name === "dcPartyType") {
                const dcPartyType = dcDataDcList.filter((item) => (item.dcPartyType === value))
                console.log(value)
                setFilteredData(dcPartyType)
            }
            if (name === "partyName") {
                const partyName = dcDataDcList.filter((item) => (item.dcPartyName === value))
                console.log(value)
                setFilteredData(partyName)

            }

            setDateData((prev) => ({ ...prev, [name]: value }))


        }


    }

  {/*  const handleFilterChange = (e) => {
        const { name, value } = e.target;

        if (value === "all") {
            setFilteredData(vendorDataList)
        } else {
            if (value === "oem") {
                const vendorType = vendorDataList.filter((item) => (item.oem === "1"))
                setFilteredData(vendorType)
            }
            if (value === "customer") {
                const vendorType = vendorDataList.filter((item) => (item.customer === "1"))
                setFilteredData(vendorType)
            }
            if (value === "supplier") {
                const vendorType = vendorDataList.filter((item) => (item.supplier === "1"))
                setFilteredData(vendorType)
            }
            if (value === "subContractor") {
                const vendorType = vendorDataList.filter((item) => (item.subContractor === "1"))
                setFilteredData(vendorType)
            }
            if (name === "partyName") {
                const partyName = vendorDataList.filter((item) => (item.dcPartyName === value))
                console.log(value)
                setFilteredData(partyName)

            }
        }
        setDateData((prev) => ({ ...prev, [name]: value }))


    };*/}









    const dcListColumns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'itemIMTENo', headerName: 'Item IMTENo', width: 100 },
        { field: 'itemAddMasterName', headerName: 'Item Description', width: 150 },
        { field: 'itemRangeSize', headerName: 'Range/Size', width: 100 },
        {
            field: 'dcItemRemarks', headerName: 'ReMarks', width: 200
        },


    ]


    console.log(dcDataDcList)



    return (
        <div className='px-5 pt-3'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>





                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1
                        }}
                        elevation={12}
                    >
                        <div className='row '>

                            <div className='col d-flex '>
                                <div className='col me-2'>
                                    <TextField label="Vendor Type"
                                        id="dcPartyTypeId"
                                        select
                                        defaultValue=""
                                        onChange={handleFilterChange}
                                        size="small"
                                        sx={{ width: "101%" }}
                                        
                                        name="dcPartyType" >
                                        <MenuItem value=""><em>--Select--</em></MenuItem>
                                        <MenuItem value="oem">OEM</MenuItem>
                                        <MenuItem value="customer">Customer</MenuItem>
                                        <MenuItem value="supplier">Supplier</MenuItem>
                                        <MenuItem value="subContractor">SubContractor</MenuItem>

                                    </TextField>

                                </div>
                                <div className='col'>
                                    <TextField fullWidth label="Party Name" className="col" select size="small" onChange={handleFilterChange} id="partyNameId" name="partyName" defaultValue="" >

                                        <MenuItem value="all">All</MenuItem>
                                        {vendorFullList.map((item, index) => (
                                            <MenuItem key={index} value={item.fullName}>{item.fullName}</MenuItem>
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
                                        format="DD-MM-YYYY" value={dayjs(dateData.toDate)}
                                        onChange={(newValue) =>
                                            setDateData((prev) => ({ ...prev, toDate: dayjs(newValue).format('YYYY-MM-DD') }))} />

                                </div>

                            </div>

                        </div>



                        <div className='row'>
                            <Box sx={{ height: 310, width: '100%', my: 2 }}>
                                <DataGrid

                                    rows={filteredData}
                                    columns={Columns}
                                    getRowId={(row) => row._id}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
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
                                    disableRowSelectionOnClick
                                    slots={{
                                        toolbar: GridToolbar,
                                    }}

                                    density="compact"
                                    disableColumnMenu={true}

                                    checkboxSelection

                                    onRowClick={handleRowClick}


                                />

                            </Box>

                        </div>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1
                        }}
                        elevation={12}
                    >

                        <div className='row'>
                            <Box sx={{ height: 310, width: '100%', my: 2 }}>
                                <DataGrid
                                    rows={dcListDataList}
                                    columns={dcListColumns}
                                    getRowId={(row) => row._id}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    sx={{
                                        ".MuiTablePagination-displayedRows": {

                                            "marginTop": "1em",
                                            "marginBottom": "1em"
                                        }
                                    }}
                                    onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                        setDcListSelectedRowIds(newRowSelectionModel);


                                    }}

                                    slots={{
                                        toolbar: GridToolbar,
                                    }}

                                    density="compact"
                                    //disableColumnMenu={true}

                                    // checkboxSelection
                                    //onRowClick={handleRowClick}
                                    disableRowSelectionOnClick
                                    pageSizeOptions={[5]}
                                />

                            </Box>

                        </div>
                        <div className='row'>
                            <div className='col d-flex '>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Print</button>
                                </div>

                            </div>
                            <div className='col d-flex justify-content-end'>

                                <div className='me-2 '>
                                    <Button component={Link} onClick={() => { setDcOpen(true) }} type='button' variant="contained" color="warning">
                                        <AddIcon /> Add Item
                                    </Button>
                                </div>
                                {itemListSelectedRowIds.length !== 0 && <div className='me-2 '>
                                    <Button variant='contained' type='button' color='error' onClick={() => setDeleteModalItem(true)}>Delete</Button>
                                </div>}

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
                                            Are you sure to delete the ItemAdd
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setDeleteModalItem(false)}>Cancel</Button>
                                        <Button onClick={() => { deleteDcData(); setDeleteModalItem(false); }} autoFocus>
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Back</button>
                                </div>

                            </div>

                            <DcListContent.Provider
                                value={{ dcEditOpen, setDcEditOpen, selectedRows, dcListFetchData }}
                            >
                                <DcEdit />
                            </DcListContent.Provider>
                            <DcListContent.Provider
                                value={{ dcOpen, setDcOpen, selectedRows, dcListFetchData }}
                            >
                                <DcAdd />
                            </DcListContent.Provider>
                        </div>
                    </Paper>
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity={errorhandler.code} variant='filled' sx={{ width: '100%' }}>
                            {errorhandler.message}
                        </Alert>
                    </Snackbar>


                </form>

            </LocalizationProvider>

        </div>
    )
}

export default DcList