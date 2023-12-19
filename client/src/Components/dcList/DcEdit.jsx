import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { DcListContent } from './DcList';
import { Add, Close, Delete, DeleteOutline } from '@mui/icons-material';
import { useParams } from 'react-router-dom';


const DcEdit = () => {
    const { id } = useParams()
    console.log(id)

    const dcDatas = useContext(DcListContent)
   const { dcEditOpen, setDcEditOpen, selectedRows,dcListFetchData } =dcDatas
   console.log(selectedRows)
   const [errorhandler, setErrorHandler] = useState({});


    console.log(selectedRows)
    const [selectedExtraMaster, setSelectedExtraMaster] = useState([])
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

    const settingDcData = () => {
        if (selectedRows.length !== 0) { // Check if selectedRows is defined
            setDcData((prev) => ({
                ...prev,
                dcPartyId: selectedRows.dcPartyId,
                dcPartyType: selectedRows.dcPartyType,
                dcPartyName: selectedRows.dcPartyName,
                dcPartyCode: selectedRows.dcPartyCode,
                dcPartyAddress: selectedRows.dcPartyAddress,
                dcNo: selectedRows.dcNo,
                dcDate: selectedRows.dcDate,
                dcReason: selectedRows.dcReason,
                dcCommonRemarks: selectedRows.dcCommonRemarks,
                dcPartyItems: selectedRows.dcPartyItems,
            }));
        }
    };

    console.log(dcData)
    
    

    useEffect(() => {
        settingDcData();
    }, [selectedRows]);

    const navigate = useNavigate();
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
        setDcData((prev)=> ({...prev, [name]: value}))


    };



//
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
            field: 'select', headerName: 'ReMarks', width: 200, renderCell: (params) => <select className="form-select form-select-sm col-2" id="reMarks" name="reMarks" aria-label="Floating label select example">
               
                <option value="Calibration">Calibration</option>
                <option value="service">Service</option>
                <option value="servicecalibration">Service & Calibration</option>
              
            </select>
        },
      
        { field: 'delete', headerName: 'Delete', width: 100, renderCell: (index) => <Delete onClick={() => deleteAC(index)} /> },
    ]




    // const [dcPartyItem, setDcPartyItem] = useState([])

    const [vendorDataList, setVendorDataList] = useState([])

    {/*const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data.result);
            const filteredData = response.data.result.filter((dcItem) => !dcData.dcPartyItems.some(vendor => dcName._id === vendor._id === dcCode._id ===vendor._id === dcAddress._id === vendor.id))
            setFilteredData(filteredData)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);*/}

    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data.result);

            // Assuming dcData is defined somewhere in your code
            const filteredData = response.data.result.filter(dcItem =>
                !dcData.dcPartyItems.some(vendor =>
                    dcItem._id === vendor._id
                    && dcItem.dcCode === vendor._id
                    && dcItem.dcAddress === vendor.id
                )
            );
            setFilteredData(filteredData);
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

    {/*const updateItemData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/itemAdd/updateItemDc/${id}`, dcData
            );

            setSnackBarOpen(true)

            console.log("Item Update Successfully")
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            setDcData(initialDcData)
            setTimeout(() => {
                navigate('/itemList');
            }, 3000);


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
        }
    };*/}




//////
    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const submitCalForm = async () => {
        try {
            const response = await axios.put(
              
                `${process.env.REACT_APP_PORT}/itemDc/updateItemDc/${selectedRows._id}`, dcData
            );
            setAlertMessage(response.data.message)
            setSnackBarOpen(true)
            setDcData(initialDcData)
            dcListFetchData()

            setTimeout(() => setDcEditOpen(false), 3000)
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
        itemImteList: "",
        itemReMarks:"Calibration",
    })


    const getItemByName = async (value) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByName`, { itemItemMasterName: value }
            );
            console.log(response.data)
            setAllItemImtes(response.data.result)
            const filteredImtes = response.data.result.filter((imtes) => !dcData.dcPartyItems.some(dcImte => imtes._id === dcImte._id))
            setItemImtes(filteredImtes)

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
        if (name === "itemReMarks") {
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
            itemImteList: "",
            itemReMarks:"",
        })
    }, [dcData.dcPartyItems])

















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
        <Dialog fullWidth={true} keepMounted maxWidth="xl" open={dcEditOpen} sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setDcEditOpen(false)
                }
            }}>
            <DialogTitle align='center' >DC</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setDcEditOpen(false)}
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
                                <div class="col-3 mb-2">
                                <TextField  label="Vendor Type"
                                        id="dcPartyTypeId" select defaultValue=""onChange={handleFilterChange}  size="small" value={dcData.dcPartyType}  sx={{ width: "101%" }}  name="dcPartyType" >
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
                                                id="partyNameId"
                                                select

                                                value={dcData.dcPartyId}
                                                onChange={(e) => setPartyData(e.target.value)}

                                                //  sx={{ width: "100%" }}
                                                size="small"
                                                fullWidth
                                                disabled={dcData.dcPartyType === ""}
                                                name="partyName" >
                                                {filteredData.map((item, index) => (
                                                    <MenuItem key={index} value={item._id}>{item.fullName}</MenuItem>
                                                ))}
                                            </TextField>
                                               

                                            </div>
                                            <div className="col me-2">

                                                <TextField label="Party code"
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
                                                id="dcReasonId"
                                                select
                                                defaultValue=""
                                                value={dcData.dcReason}
                                                onChange={handleDcChange}
                                                size="small"
                                                sx={{ width: "101%" }}
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
                                                 value={dcData.dcCommonRemarks}
                                                defaultValue=""
                                                onChange={handleDcChange}
                                                size="small"
                                                sx={{ width: "102%" }}
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
                                            <TextField size='small' select fullWidth id='itemListNamesId' value={itemAddDetails.itemListNames} variant='outlined' onChange={handleDcItemAdd} label="Item List" name='itemListNames' >
                                                <MenuItem value=""><em>--Select--</em></MenuItem>
                                                {itemMasterDistNames.map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div className='col me-2'>
                                            <TextField disabled={itemAddDetails.itemListNames === ""} size='small' select fullWidth variant='outlined' value={itemAddDetails.itemImteList} id='itemImteListId' onChange={handleDcItemAdd} label="Item IMTENo" name='itemImteList' >
                                                <MenuItem value=""><em>--Select--</em></MenuItem>
                                                {itemImtes.map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item.itemIMTENo}</MenuItem>
                                                ))}
                                            </TextField>


                                        </div>
                                        <div className="col ">
                                            <TextField label="Reason"
                                                id="itemReMarksId"
                                                select
                                                defaultValue="Calibration"
                                                value={itemAddDetails.itemReMarks}
                                                onChange={handleDcItemAdd}
                                                
                                                size="small"
                                                sx={{ width: "101%" }}
                                                name="itemReMarks" >
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="Service">Service</MenuItem>
                                                <MenuItem value="Service Calibration">Service&Calibration</MenuItem>
                                                <MenuItem value="Calibration">Calibration</MenuItem>

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
                    <Button variant='contained' color='warning' className='me-3'>Print</Button>
                </div>
                <div>
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setDcEditOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { setConfirmSubmit(true) }}>Submit</Button>
                </div>
            </DialogActions>


        </Dialog>
    )
}

export default DcEdit