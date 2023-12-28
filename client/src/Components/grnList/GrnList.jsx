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
import GrnEdit from './GrnEdit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import GrnAdd from './GrnAdd';
import Alert from '@mui/material/Alert';
export const GrnListContent = createContext(null);

const GrnList = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [grnEditOpen, setGrnEditOpen] = useState(false);
    const [grnOpen, setGrnOpen] = useState(false);


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
        grnPartyItems: []




    })



    //

    const Columns = [
        { field: 'id', headerName: 'Si. No', width: 100, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'button', headerName: 'Edit', width: 90, renderCell: (params) => <Button onClick={() => { setSelectedRows(params.row); setGrnEditOpen(true) }}><Edit color='success' /></Button> },


        {
            field: 'viewButton',
            headerName: 'View',
            width: 100,

            renderCell: (params) => (


                <RemoveRedEyeIcon color="primary"
                    onClick={() => handleViewClick(params.row)} />

            ),
        },
        { field: 'grnNo', headerName: 'Grn No', width: 200 },
        { field: 'grnDate', headerName: 'Grn Date', width: 200 },
        { field: 'grnPartyName', headerName: 'Party Name', width: 300, },
    ]


    const [grnDataListSelectedRowIds, setgrnDataListSelectedRowIds] = useState([])



    const [grnListDataList, setGrnListDataList] = useState([])
    const [grnDataList, setGrnDataList] = useState([])
    const [filteredData, setFilteredData] = useState([])
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

    console.log(filteredData)

    const [selectedRowView, setSelectedRowView] = useState(null);
    const handleViewClick = (params) => {
        setSelectedRowView(params); // Set the selected row data
        setGrnListDataList(params.grnPartyItems)

    };


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

        { field: 'grmItemId', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'grnItemIMTENo', headerName: 'Item IMTENo', width: 150 },
        { field: 'grnItemAddMasterName', headerName: 'Item Description', width: 200 },
        { field: 'grnItemRangeSize', headerName: 'Range/Size', width: 100 },
        { field: 'grnPartyRefNo', headerName: 'Dc Ref', width: 100 },

    ]

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





   
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if(name === "vendorType"){
            if(value === "all"){
                setVendorTypeList(vendorFullList)
            }else{
                const vendorType = vendorDataList.filter((item) => (item[value] === "1"))
                setVendorTypeList(vendorType)
            }
        }
        if (name === "partyName") {
            const partyName = grnDataList.filter((item) => (item.grnPartyName === value))
            setFilteredData(partyName)
            console.log(value)
        }
       


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
                                    <div className="form-floating col">
                                        <DatePicker
                                            fullWidth
                                            id="fromDateId"
                                            name="fromDate"
                                            label="From Date"
                                            sx={{ width: "100%" }}
                                            slotProps={{ textField: { size: 'small' } }}
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



                                <Box sx={{ height: 310, width: '100%', my: 2 }}>
                                    <DataGrid

                                        rows={filteredData}
                                        columns={Columns}
                                        getRowId={(row)=> row._id}
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

                                <Box sx={{ height: 310, width: '100%', my: 2 }}>
                                    <DataGrid

                                        rows={grnListDataList}
                                        columns={grnColumns}
                                        getRowId={(row) => row.grnItemId}
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
                        

                    </div>
                   
                    <div className='row'>
                       
                            <div className='col d-flex mb-1'>
                                <div className=' me-2'>
                                    <Button component={Link} onClick={() => { setGrnOpen(true) }} type='button' variant="contained" color="warning">
                                        <AddIcon /> Add Item
                                    </Button>
                                </div>
                                {itemListSelectedRowIds.length !== 0 &&    <div className=' me-2'>
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
                       
                        <GrnListContent.Provider
                            value={{ grnEditOpen, setGrnEditOpen, selectedRows, grnListFetchData }}
                        >
                            <GrnEdit />
                        </GrnListContent.Provider>
                        <GrnListContent.Provider
                            value={{ grnOpen, setGrnOpen, selectedRows, grnListFetchData }}
                        >
                            <GrnAdd />
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