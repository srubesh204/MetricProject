import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { HomeContent } from '../Home';
import { Add, Close, Delete } from '@mui/icons-material';


const Dc = () => {

    const dcDatas = useContext(HomeContent)
    const { dcOpen, setDcOpen, selectedRows } = dcDatas


    console.log(selectedRows)
    const [selectedExtraMaster, setSelectedExtraMaster] = useState([])
    const initialDcData = {
        dcPartyId: "",
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
        dcPartyName: "",
        dcPartyCode: "",
        dcPartyAddress: "",
        dcNo: "",
        dcDate: "",
        dcReason: "",
        dcCommonRemarks: "",
        dcPartyItems: []

    })

    const settingDcData = () => {
        setDcData((prev) => (
            {
                ...prev,
                dcPartyItems: selectedRows
            }

        ))
    };
    useEffect(() => {
        settingDcData()
    }, [selectedRows])




     const addDcValue = () => {
        if (selectedExtraMaster.length !== 0) {
            setDcData((prev) => ({
                ...prev,
                dcPartyItems: [...prev. dcPartyItems, selectedExtraMaster]
            }))
            setSelectedExtraMaster([])
        }
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }


   



    const Columns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },

        { field: 'itemIMTENo', headerName: 'ItemIMTE No', width: 100 },
        { field: 'itemAddMasterName', headerName: 'Item Name', width: 150 },
        {
            field: 'Range/Size',
            headerName: 'Range/Size',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            valueGetter: (params) =>
                `${params.row.itemRangeSize || ''} ${params.row.itemLCUnit || ''}`,
        },
        { field: 'itemMake', headerName: 'Make', width: 90 },
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'itemCalFreInMonths', headerName: 'Frequency', type: "number", width: 100 },
        { field: 'dcCommonRemarks', headerName: 'Remarks', width: 100 },
    ]


    const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])



    const [vendorDataList, setVendorDataList] = useState([])

    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data.result);
            //setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);










    const handleDcChange = (e) => {
        const { name, value, checked } = e.target;
        setDcData((prev) => ({ ...prev, [name]: value }));
    }

    const setPartyData = async (id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getVendorById/${id}`
            );
            console.log(response)
            setDcData((prev) => ({
                ...prev,
                dcPartyName: response.data.result.fullName,
                dcPartyAddress: response.data.result.address,
                dcPartyCode: response.data.result.vendorCode

            }))

        } catch (err) {
            console.log(err);
        }
    };

    //

    const [itemMasterDistNames, setItemMasterDistNames] = useState([])
    const getDistinctItemName = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getDistinctItemName`
            );
            console.log(response.data)
            setItemMasterDistNames(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getDistinctItemName();
    }, []);

    //
    const [imteList, setImteList] = useState([])
    const getImteList = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByIMTESort`
            );
            console.log(response.data)
            setImteList(response.data.result)


        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getImteList();
    }, []);


    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const submitCalForm = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemDc/createItemDc`, dcData
            );
            setAlertMessage(response.data.message)
            setSnackBarOpen(true)
            setTimeout(() => setDcOpen(false), 3000)
        } catch (err) {
            console.log(err);
        }
    };





















    const [itemMasterDataList, setItemMasterDataList] = useState([])

    const itemMasterFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemMaster/getAllItemMasters`

            );

            console.log(response.data)
            setItemMasterDataList(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemMasterFetchData();
    }, []);

    const [itemAddList, setItemAddList] = useState([]);

    const itemAddFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByIMTESort`
            );
            // You can use a different logic for generating the id

            setItemAddList(response.data.result);


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemAddFetch();
    }, []);



    return (
        <Dialog fullWidth={true} keepMounted maxWidth="xl" open={dcOpen} sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setDcOpen(false)
                }
            }}>
            <DialogTitle align='center' >DC</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setDcOpen(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <Close />
            </IconButton>

            <DialogContent >
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <form>

                            <Paper
                                sx={{
                                    p: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mb: 1,

                                }}
                                elevation={12}
                            >
                                <div className='row'>



                                    <div className='col'>

                                        <div className='col d-flex mb-2'>
                                            <div className=" col me-2">

                                                <TextField label="Party Name"
                                                    id="partyNameId"
                                                    select
                                                    // value={dcData.dcPartyName}
                                                    onChange={(e) => setPartyData(e.target.value)}

                                                    //  sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth
                                                    name="partyName" >
                                                    {vendorDataList.map((item, index) => (
                                                        <MenuItem key={index} value={item._id}>{item.fullName}</MenuItem>
                                                    ))}
                                                </TextField>

                                            </div>
                                            <div className="col me-2">

                                                <TextField label="Party code"
                                                    id="partyCodeId"
                                                    defaultValue=""

                                                    value={dcData.dcPartyCode}


                                                    // sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth
                                                    name="partyCode" >

                                                </TextField>


                                            </div>
                                            <div className="col">

                                                <TextField label="Party Address"
                                                    id="partyAddressId"
                                                    value={dcData.dcPartyAddress}

                                                    defaultValue=""

                                                    size="small"
                                                    sx={{ width: "100%" }}
                                                    name="Party Address" >

                                                </TextField>

                                            </div>


                                        </div>


                                    </div>
                                </div>


                                <div className='row g-2 mb-2'>
                                    <div className='col d-flex'>
                                        <div className=" col-2 me-2">

                                            <TextField label="Dc No"
                                                id="dcNoId"
                                                defaultValue=""
                                                value={dcData.dcNo}
                                                onChange={handleDcChange}
                                                size="small"
                                                sx={{ width: "101%" }}
                                                name="dcNo" />

                                        </div>
                                        <div className="col-2 me-2">
                                            <DatePicker

                                                fullWidth
                                                id="dcDateId"
                                                name="dcDate"
                                                value={dayjs(dcData.dcDate)}
                                                onChange={(newValue) =>
                                                    setDcData((prev) => ({ ...prev, dcDate: newValue.format("YYYY-MM-DD") }))
                                                }
                                                label="Dc Date"


                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD-MM-YYYY" />


                                        </div>
                                        <div className="col me-2">
                                        <TextField label="Reason"
                                                id="reasonId"
                                                select
                                                defaultValue=""
                                                //value={dcData.dcReason}
                                                onChange={handleDcChange}
                                                size="small"
                                                sx={{ width: "101%" }}
                                                name="reason" >
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="Service">Service</MenuItem>
                                                <MenuItem value="Service Calibration">Service&Calibration</MenuItem>
                                                <MenuItem value="Calibration">Calibration</MenuItem>

                                            </TextField>

                                        </div>
                                        <div className='col me-2'>
                                            <TextField label="Common Remarks"
                                                id="commonRemarksId"
                                              //  value={dcData.dcCommonRemarks}
                                                defaultValue=""
                                                onChange={handleDcChange}
                                                size="small"
                                                sx={{ width: "102%" }}
                                                name="commonRemarks" />

                                        </div>


                                    </div>

                                </div>
                            </Paper>



                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mb: 1,

                                }}
                                elevation={12}
                            >
                                <div className='row g-2'>
                                    <div className='col d-flex'>
                                        <div className='col me-2'>
                                            <TextField size='small' select fullWidth variant='outlined' onChange={handleDcChange} label="Select Master" name='itemItemMasterName' >
                                                <MenuItem value=""><em>--Select--</em></MenuItem>
                                                {itemMasterDistNames.map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div className='col'>
                                        <TextField size='small' select fullWidth variant='outlined' onChange={handleDcChange} label="Item IMTENo" name='itemIMTENo' >
                                                <MenuItem value=""><em>--Select--</em></MenuItem>
                                                {imteList.map((item, index) => (
                                                   <MenuItem key={index} value={item.itemIMTENo}>{item.itemIMTENo}</MenuItem>
                                                ))}
                                            </TextField>


                                        </div>
                                    </div>
                                    <div className=' col d-flex justify-content-end'>
                                        <div className='me-2 '>
                                            {/*<button type="button" className='btn btn-secondary' onClick={addDcValue} >Add Item</button>*/}
                                            <Button startIcon={<Add />} onClick={addDcValue} size='small' sx={{ minWidth: "130px" }} variant='contained'>Add Item</Button>
                                        </div>

                                    </div>

                                </div>
                            </Paper>

                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mb: 1,

                                }}
                                elevation={12}
                            >
                                <div className='row'>
                                    <Box sx={{ height: 350, width: '100%', my: 2 }}>
                                        <DataGrid

                                            rows={dcData.dcPartyItems}
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
                                            //disableColumnMenu={true}
                                            //clipboardCopyCellDelimiter={true}
                                            checkboxSelection
                                            //onRowClick={handleRowClick}
                                            disableRowSelectionOnClick
                                            pageSizeOptions={[5]}
                                        />

                                    </Box>

                                </div>
                            </Paper>

                            <Dialog
                        open={confirmSubmit}
                        onClose={(e, reason) => {
                            console.log(reason)
                            if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                                setConfirmSubmit(false)
                            }
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Are you sure to submit ?
                        </DialogTitle>

                        <DialogActions className='d-flex justify-content-center'>
                            <Button onClick={() => setConfirmSubmit(false)}>Cancel</Button>
                            <Button onClick={() => { submitCalForm(); setConfirmSubmit(false) }} autoFocus>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={3000}
                        onClose={() => setTimeout(() => {
                            setSnackBarOpen(false)
                        }, 3000)}>
                        <Alert onClose={() => setSnackBarOpen(false)} variant='filled' severity="success" sx={{ width: '100%' }}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>


                        </form>
                    </LocalizationProvider>
                </div >
            </DialogContent>
            <DialogActions className='d-flex justify-content-between'>
                <div>
                    <Button variant='contained' color='warning' className='me-3'>Upload Report</Button>
                </div>
                <div>
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setDcOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success'  onClick={() => { setConfirmSubmit(true) }}>Submit</Button>
                </div>
            </DialogActions>


        </Dialog>
    )
}

export default Dc