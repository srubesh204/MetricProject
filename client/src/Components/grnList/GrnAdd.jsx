import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GrnListContent } from './GrnList';
import { Add, Close, Delete } from '@mui/icons-material';

const GrnAdd = () => {
    const grnDatas = useContext(GrnListContent)
    const { grnOpen, setGrnOpen, selectedRows } = grnDatas



    const initialGrnData = {
        grnPartyRefNo: "",
        grnPartyRefDate: "",
        grnPartyName: "",
        grnPartyCode: "",
        grnPartyAddress: "",
        grnNo: "",
        grnDate: "",
        grncCommonRemarks: "",
        grnPartyItems: []

    }


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



    const [itemAddDetails, setItemAddDetails] = useState({
        grnList: "",
        grnImteNo: ""
    })

    const settingGrnData = () => {
        setGrnData((prev) => (
            {
                ...prev,
                grnPartyItems: selectedRows
            }

        ))
    };
    useEffect(() => {
        settingGrnData()
    }, [selectedRows])


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


    const handleGrnChange = (e) => {
        const { name, value, checked } = e.target;
        setGrnData((prev) => ({ ...prev, [name]: value }));
    }

    const setPartyData = async (id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getVendorById/${id}`
            );
            console.log(response)
            setGrnData((prev) => ({
                ...prev,
                grnPartyName: response.data.result.fullName,
                grnPartyAddress: response.data.result.address,
                grnPartyCode: response.data.result.vendorCode

            }))

        } catch (err) {
            console.log(err);
        }
    };




    const [grnList, setGrnList] = useState({})
    const grnFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemGRN/getAllItemGRN`
            );
            setGrnList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        grnFetchData();
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

    const [allItemImtes, setAllItemImtes] = useState([])
    const [itemImtes, setItemImtes] = useState([])
    const [selectedGrnItem, setSelectedGrnItem] = useState([])
    //
    const getItemByName = async (value) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByName`, { itemItemMasterName: value }
            );
            console.log(response.data)
            setAllItemImtes(response.data.result)
            const filteredImtes = response.data.result.filter((imtes) => !grnData.grnPartyItems.some(grnImte => imtes._id === grnImte._id))
            setItemImtes(filteredImtes)

        } catch (err) {
            console.log(err);
        }
    };

    const handleGrnItemAdd = (e) => {
        const { name, value } = e.target;
        if (name === "grnList") {
            getItemByName(value)
            setItemAddDetails((prev) => ({ ...prev, [name]: value }))
        }
        if (name === "grnImteNo") {
            setSelectedGrnItem(value)
            setItemAddDetails((prev) => ({ ...prev, [name]: value }))
        }


    }


    const grnItemAdd = () => {
        if (setSelectedGrnItem.length !== 0) {
            setGrnData((prev) => ({ ...prev, grnPartyItems: [...prev.grnPartyItems, selectedGrnItem] }))
        }
    }
    useEffect(() => {
        setSelectedGrnItem([])
        setItemAddDetails({
            grnList: "",
            grnImteNo: ""
        })
    }, [grnData.grnPartyItems])


    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [errorhandler, setErrorHandler] = useState({})

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const submitCalForm = async () => {
        try {
            const response = await axios.post(
               
                `${process.env.REACT_APP_PORT}/itemGRN/createItemGRN`, grnData
            );
            setAlertMessage(response.data.message)
            setSnackBarOpen(true)
            setTimeout(() => setGrnOpen(false), 3000)
        } catch (err) {
            console.log(err);
        }
    };















    return (

        <Dialog fullWidth={true} keepMounted maxWidth="xl" open={grnOpen} sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setGrnOpen(false)
                }
            }}>
            <DialogTitle align='center' >GRN</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setGrnOpen(false)}
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
                            <Container maxWidth="lg" sx={{ mb: 2 }}>

                                <div className='row'>

                                    <div className='col'>
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                mb: 1,

                                            }}
                                            elevation={12}
                                        >
                                            <div className='col d-flex mb-2'>
                                                <div className=" col-6 me-2">

                                                    <TextField label="Party Ref No"
                                                        id="grnPartyRefNoId"
                                                        defaultValue=""
                                                        value={grnData.grnPartyRefNo}
                                                        //  sx={{ width: "100%" }}
                                                        size="small"
                                                        fullWidth
                                                        onChange={handleGrnChange}
                                                        name="grnPartyRefNo" />
                                                </div>
                                                <div className="col-6">

                                                    <DatePicker

                                                        fullWidth
                                                        id="grnPartyRefDateId"
                                                        name="grnPartyRefDate"
                                                        value={dayjs(grnData.grnPartyRefDate)}
                                                        onChange={(newValue) =>
                                                            setGrnData((prev) => ({ ...prev, grnPartyRefDate: newValue.format("YYYY-MM-DD") }))
                                                        }
                                                        label="Party Ref Date"
                                                        //onChange={handleGrnChange}


                                                        slotProps={{ textField: { size: 'small' } }}
                                                        format="DD-MM-YYYY" />



                                                </div>


                                            </div>
                                            <div className='row'>
                                                <div className='col d-flex mb-2'>
                                                    <div className=" col-6 me-2">

                                                        <TextField label="Party Name"
                                                            id="grnPartyNameId"
                                                            select
                                                            //  value={grnData.grnPartyName}

                                                            onChange={(e) => setPartyData(e.target.value)}

                                                            //  sx={{ width: "100%" }}
                                                            size="small"
                                                            fullWidth

                                                            name="grnPartyName" >
                                                            {vendorDataList.map((item, index) => (
                                                                <MenuItem key={index} value={item._id}>{item.fullName}</MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </div>
                                                    <div className="col-6">

                                                        <TextField label="Party code"
                                                            id="grnPartyCodeId"
                                                            defaultValue=""
                                                            onChange={handleGrnChange}
                                                            // sx={{ width: "100%" }}
                                                            size="small"
                                                            value={grnData.grnPartyCode}

                                                            fullWidth
                                                            name="grnPartyCode" />

                                                    </div>


                                                </div>

                                            </div>
                                            <div className='row '>
                                                <div className="col-12">

                                                    <TextField label="PartyAddress"
                                                        id="grnPartyAddressId"
                                                        defaultValue=""
                                                        size="small"
                                                        onChange={handleGrnChange}
                                                        value={grnData.grnPartyAddress}
                                                        sx={{ width: "101%" }}
                                                        name="grnPartyAddress" />

                                                </div>
                                            </div>
                                        </Paper>

                                    </div>

                                    <div className='col'>
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                mb: 1,

                                            }}
                                            elevation={12}
                                        >

                                            <div className='col d-flex mb-2'>
                                                <div className=" col-6 me-2">

                                                    <TextField
                                                        label="GRN NO"
                                                        id="grnNoId"
                                                        defaultValue=""
                                                        value={grnData.grnNo}
                                                        size="small"
                                                        onChange={handleGrnChange}
                                                        fullWidth
                                                        name="grnNo"
                                                    />
                                                </div>
                                                <div className="col-6">



                                                    <DatePicker

                                                        fullWidth
                                                        id="grnDateId"
                                                        name="grnDate"
                                                        value={dayjs(grnData.grnPartyRefDate)}
                                                        onChange={(newValue) =>
                                                            setGrnData((prev) => ({ ...prev, grnDate: newValue.format("YYYY-MM-DD") }))
                                                        }
                                                        label="GRN Date"
                                                        //onChange={handleGrnChange}


                                                        slotProps={{ textField: { size: 'small' } }}
                                                        format="DD-MM-YYYY" />



                                                </div>


                                            </div>
                                            <div className='row '>
                                                <div className='mb-5'>
                                                    <TextField label="Common Remarks"
                                                        id="grnCommonRemarksId"

                                                        defaultValue=""
                                                        onChange={handleGrnChange}
                                                        value={grnData.grnCommonRemarks}
                                                        fullWidth
                                                        size="small"
                                                        name="grnCommonRemarks"
                                                    >
                                                    </TextField>
                                                </div>
                                            </div>
                                        </Paper>
                                    </div>
                                </div>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 1,

                                    }}
                                    elevation={12}
                                >
                                    <div className='row g-2 mb-2'>
                                        <div className='col d-flex'>
                                            <div className='col me-2'>
                                                <TextField size='small' fullWidth variant='outlined' defaultValue="all" value={itemAddDetails.grnList} id="grnListId" onChange={handleGrnItemAdd} select label="Item List" name='grnList'>
                                                    <MenuItem value="all">All</MenuItem>
                                                    {itemMasterDistNames.map((item, index) => (
                                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                                    ))}

                                                </TextField>
                                            </div>
                                            <div className='col'>
                                                <TextField label="Imte No"
                                                    id="grnImteNoId"
                                                    select
                                                    defaultValue="all"
                                                    fullWidth
                                                    size="small"
                                                    // disabled={itemAddDetails.itemListNames === ""}
                                                    onChange={handleGrnItemAdd}
                                                    value={itemAddDetails.grnImteNo}
                                                    name="grnImteNo" >
                                                    <MenuItem value="all">All</MenuItem>
                                                    {itemImtes.map((item, index) => (
                                                        <MenuItem key={index} value={item}>{item.itemIMTENo}</MenuItem>
                                                    ))}

                                                </TextField>
                                            </div>
                                        </div>
                                        <div className=' col d-flex justify-content-end'>
                                            <div className='me-2 '>
                                                <Button startIcon={<Add />} onClick={() => grnItemAdd()} size='small' sx={{ minWidth: "130px" }} variant='contained'>Add Item</Button>
                                            </div>

                                        </div>

                                    </div>

                                    <div className='row g-2 '>
                                        <div className='col d-flex'>
                                            <div className="col-2 me-2">

                                                <DatePicker
                                                    fullWidth
                                                    id="calDateId"
                                                    name="calDate"
                                                    label="Cal Date"
                                                    //sx={{ width: "100%" }}
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    format="DD-MM-YYYY" />

                                            </div>
                                            <div className="col-2 me-2">

                                                <DatePicker
                                                    fullWidth
                                                    id="nextCalDateId"
                                                    name="nextCalDate"
                                                    label="Next Cal Date"
                                                    // sx={{ width: "100%" }}
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    format="DD-MM-YYYY" />

                                            </div>
                                            <div className='col me-2'>
                                                <TextField size='small' fullWidth variant='outlined' id="certificateStatusId" select label="Certificate Status" name='certificateStatus'>
                                                    <MenuItem value="received">Received</MenuItem>
                                                    <MenuItem value="notreceived">Not Received</MenuItem>
                                                    
                                                </TextField>
                                            </div>
                                            <div className="col me-2">

                                                <TextField label="CertificateNo"
                                                    id="certificateNoId"
                                                    defaultValue=""
                                                    size="small"
                                                    sx={{ width: "101%" }}
                                                    name="certificateNo" />

                                            </div>
                                            <div className='col me-2'>
                                                <TextField fullWidth label="Uncertainity" variant='outlined' size='small' name='itemUncertainity' />

                                            </div>

                                            <div className='me-2' >
                                                <label className='itemlistloade'>
                                                    <input className="form-control itemlistdownload" type="file" id="upload" />Upload Certificate</label>
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
                                        <h6 className='text-center'>Calibration Data</h6>
                                        <table className='table table-sm table-bordered table-responsive text-center align-middle'>
                                            <tbody>
                                                <tr>
                                                    <th>Parameter</th>
                                                    <th>Range/Size</th>
                                                    <th>Unit</th>
                                                    <th>Min</th>
                                                    <th>Max</th>
                                                    <th>Wear Limit</th>
                                                    <th>Observed Size/Observed Error</th>
                                                    <th>Unit</th>
                                                    <th>Status</th>
                                                </tr>
                                                <tr>
                                                    <td><input type="text" className='form-control form-control-sm' id="parameterId" name="parameter" /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="rangeSizeId" name="rangeSize" /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="unitId" name="unit" /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="minId" name="min" /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="maxId" name="max" /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="wearLimitId" name="wearLimit" /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="observedSizeId" name="observedSize" /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="unitId" name="unit" /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="statusId" name="status" /></td>

                                                </tr>
                                            </tbody>

                                        </table>

                                    </div>

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


                                    <div className='row'>
                                        <div className=' col d-flex '>


                                            <div className='col-4 me-2'>
                                                <TextField size='small' fullWidth variant='outlined' id="calibrationStatus" select label="Calibration Status" name='calibrationStatus'>
                                                    <MenuItem value="Active">Active</MenuItem>
                                                    <MenuItem value="InActive">InActive</MenuItem>

                                                </TextField>
                                            </div>

                                        </div>


                                    </div>
                                </Paper>




                            </Container>
                        </form>
                    </LocalizationProvider>

                </div>
            </DialogContent>
            <DialogActions className='d-flex justify-content-between'>
                <div>
                    <Button variant='contained' color='warning' className='me-3'>Upload Report</Button>
                </div>
                <div>
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setGrnOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { setConfirmSubmit(true) }}>Submit</Button>
                </div>
            </DialogActions>

        </Dialog>
    )
}

export default GrnAdd