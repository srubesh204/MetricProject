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

import DcEdit from './DcEdit';
export const DcListContent = createContext(null);
const DcList = () => {


    
    const [selectedRows, setSelectedRows] = useState([]);
    const [dcEditOpen, setDcEditOpen] = useState(false);
    const [dcAddOpen, setDcAddOpen] = useState(false);


    const [dcStateId, setDcStateId] = useState(null)
    const initialDcData = {
        dcPartyId: "",
        dcPartyType:"",
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
        dcPartyType:"",
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
            setVendorDataList(response.data.result);
            // setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);
    const [vendorDataDcList, setVendorDataDcList] = useState([])
    const vendorFetDcchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemDc/getAllItemDc`

            );
            setVendorDataDcList(response.data.result);
            // setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetDcchData();
    }, []);


    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }


    // const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])
    //
    const Columns = [
        { field: 'button', headerName: 'Edit', width: 60, renderCell: (params) => <Button onClick={() => { setSelectedRows(params.row); setDcEditOpen(true) }}><Edit color='success' /></Button> },
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'dcNo', headerName: 'Dc No', width: 90 },
        { field: 'dcDate', headerName: 'Dc Date', width: 90 },
        { field: 'dcPartyName', headerName: 'Dc PartyName', width: 200, },
    ]


    const [dcListSelectedRowIds, setDcListSelectedRowIds] = useState([])
    const [dcListDataList, setDcListDataList] = useState([])
    const dcListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
            );

            setDcListDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        dcListFetchData();
    }, []);


    const [dcDataList, setDcDataList] = useState([])
    const dcFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemDc/getAllItemDc`
            );
            setDcDataList(response.data.result);
            
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        dcFetchData();
    }, []);
   


    const [deleteModalItem, setDeleteModalItem] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [errorhandler, setErrorHandler] = useState({});
    const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])

    const deleteDcData = async (id) => {

        try {
            const response = await axios.delete(
                "http://localhost:3001/itemDc/deleteItemDc",{
                    data: {
                        itemDcIds: itemListSelectedRowIds
                    }
                } 
            );

            setSnackBarOpen(true)


            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            console.log("ItemAdd delete Successfully");
            //setItemAddData(initialItemAddData)
            vendorFetDcchData()
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



    const dcListColumns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'itemIMTENo', headerName: 'Item IMTENo', width: 100 },
        { field: 'itemAddMasterName', headerName: 'Item Description', width: 150 },
        { field: 'reMarks', headerName: 'ReMarks', width: 100 },

    ]
    





    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>
                    <Container maxWidth="lg" sx={{ mb: 2 }}>




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
                                <h1 className='text-center '>DC List</h1>
                                <div className='col d-flex '>
                                    <div className='col me-2'>
                                        <TextField fullWidth label="VendorStatus" className="col" select size="small" id="vendorStatusId" name="vendorStatus" defaultValue="" >

                                            <MenuItem value="all">All</MenuItem>
                                            {vendorDataList.map((item) => (
                                                <MenuItem value={item._id}>{item.vendorStatus}</MenuItem>
                                            ))}


                                        </TextField>

                                    </div>
                                    <div className='col'>
                                        <TextField fullWidth label="Party Name" className="col" select size="small" id="partyNameId" name="partyName" defaultValue="" >

                                            <MenuItem value="all">All</MenuItem>
                                            {dcDataList.map((item) => (
                                                <MenuItem value={item._id}>{item.dcPartyName}</MenuItem>
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
                                            format="DD-MM-YYYY" />

                                    </div>
                                    <div className="col-3">

                                        <DatePicker
                                            fullWidth
                                            id="toDateId"
                                            name="toDate"
                                            label="To Date"
                                            sx={{ width: "100%" }}
                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY" />

                                    </div>

                                </div>

                            </div>



                            <div className='row'>
                                <Box sx={{ height: 310, width: '100%', my: 2 }}>
                                    <DataGrid

                                        rows={vendorDataDcList}
                                        columns={Columns}
                                        getRowId={(row) => row._id}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        sx={{
                                            ".MuiTablePagination-displayedRows": {

                                                "margin-top": "1em",
                                                "margin-bottom": "1em"
                                            }
                                        }}
                                     onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                            setItemListSelectedRowIds(newRowSelectionModel);


                                         }}

                                        slots={{
                                            toolbar: GridToolbar,
                                        }}

                                        density="compact"
                                    disableColumnMenu={true}
                                    clipboardCopyCellDelimiter={true}

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

                                                "margin-top": "1em",
                                                "margin-bottom": "1em"
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
                                        //clipboardCopyCellDelimiter={true}
                                        checkboxSelection
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
                                        <button type="button" className='btn btn-secondary' >Modify</button>
                                    </div>
                                    <Button component={Link} onClick={() => { setDcEditOpen(true) }} type='button' variant="contained" color="warning">
                                        <AddIcon /> Add Item
                                    </Button>
                                    <Button variant='contained' type='button' color='error' onClick={() => setDeleteModalItem(true)}>Delete</Button>


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
                                    value={{ dcEditOpen, setDcEditOpen, selectedRows }}
                                >
                                    <DcEdit />
                                </DcListContent.Provider>
                                <DcListContent.Provider
                                    value={{ dcAddOpen, setDcAddOpen, selectedRows }}
                                >
                                    <DcEdit />
                                </DcListContent.Provider>
                            </div>
                        </Paper>
                        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                                <Alert onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '100%' }}>
                                    {errorhandler.message}
                                </Alert>
                            </Snackbar>

                    </Container>
                </form>

            </LocalizationProvider>

        </div>
    )
}

export default DcList