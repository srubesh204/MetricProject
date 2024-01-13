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
import { Add, Close, Delete, DeleteOutline } from '@mui/icons-material';


const Dc = () => {

    const dcDatas = useContext(HomeContent)
    const { dcOpen, setDcOpen, selectedRows, itemFetch, defaultDep } = dcDatas


    console.log(selectedRows)
    const [selectedExtraMaster, setSelectedExtraMaster] = useState([])
    const initialDcData = {
        dcPartyId: "",
        dcPartyType: "",
        dcPartyName: "",
        dcPartyCode: "",
        dcPartyAddress: "",
        dcNo: "",
        dcDate: dayjs().format("YYYY-MM-DD"),
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
        dcDate: dayjs().format("YYYY-MM-DD"),
        dcReason: "",
        dcCommonRemarks: "",
        dcPartyItems: []

    })
    console.log(dcData)

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

    const [filteredData, setFilteredData] = useState([])

    const handleFilterChange = (e) => {
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




        }
        setDcData((prev) => ({ ...prev, [name]: value }))


    };




    const addDcValue = () => {
        if (selectedExtraMaster.length !== 0) {
            setDcData((prev) => ({
                ...prev,
                dcPartyItems: [...prev.dcPartyItems, selectedExtraMaster]
            }))
            setSelectedExtraMaster([])
        }
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
        {
            field: 'dcCommonRemarks', headerName: 'Remarks', width: 250,
            renderCell: (params) =>
                <select className='form-select form-select-sm' name=""> 
                    <option>Calibration</option>
                    <option>Service</option>
                    <option>Service and Calibration</option>
                </select>
        },
        { field: 'delete', headerName: 'Delete', width: 100, renderCell: (index) => <Delete onClick={() => deleteAC(index)} /> },
    ]




    // const [dcPartyItem, setDcPartyItem] = useState([])

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
                dcPartyCode: response.data.result.vendorCode,
                dcPartyId: response.data.result._id
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
                `${process.env.REACT_APP_PORT}/itemAdd/getAllDistinctItemName`
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



        //validate function 
        const [errors, setErrors] = useState({})
    
        const validateFunction = () => {
            let tempErrors = {};
            tempErrors.dcPartyType = dcData.dcPartyType ? "" : "Vendor Type is Required"
            tempErrors.dcPartyName = dcData.dcPartyName ? "" : "Party Name is Required"
            tempErrors.dcPartyCode = dcData.dcPartyCode ? "" : "Party Code is Required"
            tempErrors.dcPartyAddress = dcData.dcPartyAddress ? "" : "Party Address is Required"
            tempErrors.dcNo = dcData.dcNo ? "" : "Dc No. is Required"
            tempErrors.dcReason = dcData.dcReason ? "" : "Dc Reason is Required"
            setErrors({ ...tempErrors })
    
            return Object.values(tempErrors).every(x => x === "")
        }
        console.log(errors)


    const submitCalForm = async () => {
        try { 
            if (validateFunction()) {
                const response = await axios.post(
                    `${process.env.REACT_APP_PORT}/itemDc/createItemDc`, dcData
                );
                setDcData(initialDcData)
                setAlertMessage(response.data.message)
                setSnackBarOpen(true)
                itemFetch();
                setTimeout(() => setDcOpen(false), 3000)
            } else {
                
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteAC = (index) => {
        setDcData((prev) => {
            const AC = [...prev.dcPartyItems]
            AC.splice(index, 1);
            return {
                ...prev, dcPartyItems: AC,
            };
        })
    };
    const [allItemImtes, setAllItemImtes] = useState([])
    const [itemImtes, setItemImtes] = useState([])
    const [selectedDcItem, setSelectedDcItem] = useState([])

    const [itemAddDetails, setItemAddDetails] = useState({
        itemListNames: "",
        itemImteList: ""
    })


    const getItemByName = async (value) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByName`, { itemItemMasterName: value }
            );
            console.log(response.data)
            setAllItemImtes(response.data.result)
            const filteredImtes = response.data.result.filter((imtes) => !dcData.dcPartyItems.some(dcImte => imtes._id === dcImte._id))
            const dcStatusFilter = filteredImtes.filter((item)=> item.dcStatus !== "1")
            setItemImtes(dcStatusFilter)

        } catch (err) {
            console.log(err);
        }
    };

    const handleDcItemAdd = (e) => {
        const { name, value } = e.target;

        if (name === "itemListNames") {
            getItemByName(value)
            setItemAddDetails((prev) => ({ ...prev, [name]: value }))
        }

        if (name === "itemImteList") {
            setSelectedDcItem(value)
            setItemAddDetails((prev) => ({ ...prev, [name]: value }))
        }
                           
    }

    const dcItemAdd = () => {
        if (selectedDcItem.length !== 0) {
            setDcData((prev) => ({ ...prev, dcPartyItems: [...prev.dcPartyItems, selectedDcItem] }))
        }
    }
    useEffect(() => {
        setSelectedDcItem([])
        setItemAddDetails({
            itemListNames: "",
            itemImteList: ""
        })
    }, [dcData.dcPartyItems])





















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
                            <div className='row'>
                                <div className="col-3 mb-2">

                                    <TextField label="Vendor Type"
                                        {...(errors.dcPartyType !== "" && { helperText: errors.dcPartyType, error: true })}
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
                            </div>

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
                                        {...(errors.dcPartyName !== "" && { helperText: errors.dcPartyName, error: true })}
                                                    id="dcPartyNameId"
                                                    select

                                                    // value={dcData.dcPartyName}
                                                    onChange={(e) => setPartyData(e.target.value)}
                                                   // value={dcData.dcPartyName}
                                                    //  sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth
                                                    disabled={dcData.dcPartyType === ""}
                                                    name="dcartyName" >
                                                    {filteredData.map((item, index) => (
                                                        <MenuItem key={index} value={item._id}>{item.fullName}</MenuItem>
                                                    ))}
                                                </TextField>


                                            </div>
                                            <div className="col me-2">

                                                <TextField label="Party code"
                                        {...(errors.dcPartyCode !== "" && { helperText: errors.dcPartyCode, error: true })}
                                                    id="partyCodeId"
                                                    defaultValue=""
                                                    disabled={dcData.dcPartyType === ""}

                                                    value={dcData.dcPartyCode}


                                                    // sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth
                                                    name="partyCode" >

                                                </TextField>


                                            </div>
                                            <div className="col">

                                                <TextField label="Party Address"
                                        {...(errors.dcPartyAddress !== "" && { helperText: errors.dcPartyAddress, error: true })}
                                                    id="partyAddressId"
                                                    value={dcData.dcPartyAddress}

                                                    defaultValue=""
                                                    disabled={dcData.dcPartyType === ""}

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
                                        {...(errors.dcNo !== "" && { helperText: errors.dcNo, error: true })}
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
                                                {errors.dcDate !== "" && (
                                                    <div style={{ color: 'red', paddingLeft: '15px', fontSize: "75%" }}>{errors.dcDate}</div>
                                                )}    

                                        </div>
                                        <div className="col me-2">
                                            <TextField label="Reason"
                                        {...(errors.dcReason !== "" && { helperText: errors.dcReason, error: true })}
                                                id="dcReasonId"
                                                select
                                                defaultValue=""
                                                //value={dcData.dcReason}
                                                onChange={handleDcChange}
                                                size="small"
                                                sx={{ width: "100%" }}
                                                name="dcReason" >
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="Service">Service</MenuItem>
                                                <MenuItem value="Service Calibration">Service&Calibration</MenuItem>
                                                <MenuItem value="Calibration">Calibration</MenuItem>

                                            </TextField>

                                        </div>
                                        <div className='col me-2'>
                                            <TextField label="Common Remarks"
                                                id="dcCommonRemarksId"
                                                //value={dcData.dcCommonRemarks}
                                                defaultValue=""
                                                onChange={handleDcChange}
                                                size="small"
                                                sx={{ width: "100%" }}
                                                name="dcCommonRemarks" />

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
                                            <TextField 
                                         size='small' select fullWidth id='itemListNamesId' value={itemAddDetails.itemListNames} variant='outlined' onChange={handleDcItemAdd} label="Item List" name='itemListNames' >
                                                <MenuItem value=""><em>--Select--</em></MenuItem>
                                                {itemMasterDistNames.map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div className='col'>
                                            <TextField
                                         disabled={itemAddDetails.itemListNames === ""} size='small' select fullWidth variant='outlined' value={itemAddDetails.itemImteList} id='itemImteListId' onChange={handleDcItemAdd} label="Item IMTENo" name='itemImteList' >
                                                <MenuItem value=""><em>--Select--</em></MenuItem>
                                                {itemImtes.map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item.itemIMTENo}</MenuItem>
                                                ))}
                                            </TextField>


                                        </div>
                                    </div>
                                    <div className=' col d-flex justify-content-end'>
                                        <div className='me-2 '>
                                            {/*<button type="button" className='btn btn-secondary' onClick={addDcValue} >Add Item</button>*/}
                                            <Button startIcon={<Add />} onClick={() => dcItemAdd()} size='small' sx={{ minWidth: "130px" }} variant='contained'>Add Item</Button>
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
      {selectedRows.length === 0 && (
        <div style={{ color: 'red', marginBottom: '1em', textAlign: 'right' }}>
          Please select a row.
        </div>
      )}
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

                                                    "marginTop": "1em",
                                                    "marginBottom": "1em"
                                                }
                                            }}


                                            slots={{
                                                toolbar: GridToolbar,
                                            }}

                                            density="compact"
                                            //disableColumnMenu={true}
                                            
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
                    <Button variant='contained' color='success' onClick={() => { setConfirmSubmit(true) }}>Submit</Button>
                </div>
            </DialogActions>


        </Dialog>
    )
}

export default Dc