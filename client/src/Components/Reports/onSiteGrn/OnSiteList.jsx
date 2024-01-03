import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, MenuItem, Button, Link, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import { Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Alert from '@mui/material/Alert';
import OnSiteGrn from './OnSiteGrn';
import OnSiteEditGrn from './OnSiteEditGrn';

export const OnSiteListContent = createContext(null);

const OnSiteList = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [onSiteEditOpen, setOnSiteEditOpen] = useState(false)

    const [onSietAddOpen, setOnSiteAddOpen] = useState(false);


    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }


    const initialGrnData = {
        osGrnPartyRefNo: "",
        osGrnPartyRefDate: "",
        osGrnPartyName: "",
        osGrnPartyCode: "",
        osGrnPartyAddress: "",
        osGrnNo: "",
        osGrnDate: "",
        osGrnCommonRemarks: "",
        osGrnPartyItems: []

    }

    const [grnStateId, setGrnStateId] = useState(null)
    const [grnData, setGrnData] = useState({
        osGrnPartyRefNo: "",
        osGrnPartyRefDate: "",
        osGrnPartyName: "",
        osGrnPartyCode: "",
        osGrnPartyAddress: "",
        osGrnNo: "",
        osGrnDate: "",
        osGrnCommonRemarks: "",
        osGrnPartyItems: []




    })


    const [vendorDataList, setVendorDataList] = useState([])
    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data.result);
            // setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);
    //

    const [vendorFullList, setVendorFullList] = useState([])
    const [vendorTypeList, setVendorTypeList] = useState([])

    const FetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
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


    const Columns = [
        { field: 'id', headerName: 'Si. No', width: 100, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'button', headerName: 'Edit', width: 90, renderCell: (params) => <Button onClick={() => { setSelectedRows(params.row); setOnSiteEditOpen(true) }}><Edit color='success' /></Button> },


        {
            field: 'viewButton',
            headerName: 'View',
            width: 100,
            headerAlign: "center", align: "center",

            renderCell: (params) => (


                <RemoveRedEyeIcon color="primary"
                    onClick={() => handleViewClick(params.row)} />

            ),
        },
        { field: 'osGrnNo', headerName: 'Grn No', width: 100, headerAlign: "center", align: "center", },
        { field: 'osGrnDate', headerName: 'Grn Date', width: 200, headerAlign: "center", align: "center", },
        { field: 'osGrnPartyName', headerName: 'Party Name', width: 250, headerAlign: "center", align: "center", },
    ]


    const [grnDataListSelectedRowIds, setgrnDataListSelectedRowIds] = useState([])





    const [selectedRowView, setSelectedRowView] = useState(null);
    const handleViewClick = (params) => {
        setSelectedRowView(params); // Set the selected row data
        setGrnListDataList(params.osGrnPartyId)

    };





    const [deleteModalItem, setDeleteModalItem] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [errorhandler, setErrorHandler] = useState({});
    const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])



    console.log(itemListSelectedRowIds)


    const deleteGrnData = async (id) => {

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/onsiteItemGRN/deleteOnsiteItemGRN`, {
                data: {
                    onsiteItemGRNIds: itemListSelectedRowIds
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

    const oneMonthBefore = dayjs().subtract(dayjs().date() - 1, 'day')
    const [dateData, setDateData] = useState({
        fromDate: oneMonthBefore.format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD')
    })
    const [grnListDataList, setGrnListDataList] = useState([])
    const [grnDataList, setGrnDataList] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const grnListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/onsiteItemGRN/getAllOnsiteItemGRN`
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



    const grnColumns = [

        { field: 'osGrnItemId', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,headerAlign: "center", align: "center", },
        { field: 'osGrnItemIMTENo', headerName: 'Item IMTENo', width: 100,headerAlign: "center", align: "center", },
        { field: 'osGrnItemAddMasterName', headerName: 'Item Description', width: 100,headerAlign: "center", align: "center", },
        { field: 'osGrnItemRangeSize', headerName: 'Range/Size', width: 100,headerAlign: "center", align: "center", },
        { field: 'osGrnPartyRefNo', headerName: 'OsGrn Party Ref No', width: 200,headerAlign: "center", align: "center", },

    ]
    console.log(grnColumns)

   






   


   





    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === "vendorType") {
            if (value === "all") {
                setVendorTypeList(vendorFullList)
            } else {
                const vendorType = vendorDataList.filter((item) => (item[value] === "1"))
                setVendorTypeList(vendorType)
            }
        }
        if (name === "partyName") {
            const partyName = grnDataList.filter((item) => (item.osGrnPartyName === value))
            setFilteredData(partyName)
            console.log(value)
        }
        setDateData((prev) => ({ ...prev, [name]: value }))




    };





    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>



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
                            <h3 className='text-center '> ON GRN List</h3>
                            <div className='col'>
                                <TextField fullWidth label="Vendor Type" className="col" select size="small" id="vendorTypeId" onChange={handleFilterChange} name="vendorType" defaultValue="" >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="oem">OEM</MenuItem>
                                    <MenuItem value="customer">Customer</MenuItem>
                                    <MenuItem value="supplier">Supplier</MenuItem>
                                    <MenuItem value="subContractor">SubContractor</MenuItem>
                                </TextField>

                            </div>
                            <div className='col'>
                                <TextField fullWidth label="Party Name" className="col" select size="small" onChange={handleFilterChange} id="partyNameId" name="partyName" defaultValue="" >

                                    <MenuItem value="all">All</MenuItem>
                                    {vendorTypeList.map((item, index) => (
                                        <MenuItem key={index} value={item.fullName}>{item.fullName}</MenuItem>
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
                            <div className="col">
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


                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1
                        }}
                        elevation={12}
                    >



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

                                slots={{
                                    toolbar: GridToolbar,
                                }}

                                density="compact"
                                //disableColumnMenu={true}

                                checkboxSelection
                                //onRowClick={handleRowClick}
                                onRowClick={handleRowClick}
                                disableRowSelectionOnClick
                                pageSizeOptions={[5]}
                            />

                        </Box>
                    </Paper>



                    <div className='row'>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1
                            }}
                            elevation={12}
                        >
                            <Box sx={{ height: 310, width: '100%', my: 2 }}>
                                <DataGrid

                                    rows={grnListDataList}
                                    columns={grnColumns}
                                    getRowId={(row) => row.osGrnItemId}
                                   
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
                                        setgrnDataListSelectedRowIds(newRowSelectionModel);


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
                        </Paper>

                    </div>
                    <div className='col'>
                        <Paper
                            sx={{
                                p: "35Px",
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1
                            }}
                            elevation={12}
                        >
                            <div className='col d-flex mb-1'>
                                <div className=' me-2'>
                                    <Button component={Link} onClick={() => { setOnSiteAddOpen(true) }} type='button' variant="contained" color="warning">
                                        <AddIcon /> Add Item
                                    </Button>
                                </div>
                                {itemListSelectedRowIds.length !== 0 &&  <div className=' me-2'>
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
                                <div className=' me-2'>
                                    <button type="button" className='btn btn-secondary' >Back</button>
                                </div>
                            </div>
                        </Paper>

                        <OnSiteListContent.Provider
                            value={{ onSietAddOpen, setOnSiteAddOpen, selectedRows, grnListFetchData }}
                        >
                            <OnSiteGrn />
                        </OnSiteListContent.Provider>

                        <OnSiteListContent.Provider
                            value={{ onSiteEditOpen, setOnSiteEditOpen, selectedRows, grnListFetchData }}
                        >
                            <OnSiteEditGrn />
                        </OnSiteListContent.Provider>

                    </div>


















                </form>

            </LocalizationProvider>

        </div>
    )
}

export default OnSiteList