import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, Chip, DialogContentText, Radio, RadioGroup, FormControl, Select, DialogTitle, OutlinedInput, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, Slide } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { OnSiteListContent } from './OnSiteList';
import styled from '@emotion/styled';

import { Add, Close, CloudUpload, Delete, Done } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const OnSiteGrn = () => {
    const onSiteDatas = useContext(OnSiteListContent)
    const { onSietAddOpen, setOnSiteAddOpen, selectedRows, grnListFetchData } = onSiteDatas



    const initialOnSiteData = {
        osGrnPartyRefNo: "",
        osGrnPartyId: "",
        osGrnPartyRefDate: "",
        osGrnPartyName: "",
        osGrnPartyCode: "",
        osGrnPartyAddress: "",
        osGrnNo: "",
        osGrnDate: "",
        osGrnCommonRemarks: "",
        osGrnDueDate: "",
        osGrnCalDate: "",
        osGrnCertificateStatus: "",
        osGrnCertificateNo: "",
        osGrnUncertainity: "",
        osGrnPartyItems: []

    }

    const [allItemImtes, setAllItemImtes] = useState(selectedRows)
    const [onSiteGrnData, setOnSiteGrnData] = useState({
        osGrnPartyRefNo: "",
        osGrnPartyId: "",
        osGrnPartyRefDate: "",
        osGrnPartyName: "",
        osGrnPartyCode: "",
        osGrnPartyAddress: "",
        osGrnNo: "",
        osGrnDate: "",
        osGrnCommonRemarks: "",
        osGrnDueDate: "",
        osGrnCalDate: "",
        osGrnCertificateStatus: "",
        osGrnCertificateNo: "",
        osGrnUncertainity: "",
        osGrnPartyItems: []
    })

    const [itemAddOSiteDetails, setItemAddOnsiteDetails] = useState({
        grnList: "",
        grnImteNo: ""
    })




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


    const setPartyData = async (id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getVendorById/${id}`
            );
            console.log(response)
            setOnSiteGrnData((prev) => ({
                ...prev,
                osGrnPartyName: response.data.result.fullName,
                osGrnPartyAddress: response.data.result.address,
                osGrnPartyCode: response.data.result.vendorCode

            }))

        } catch (err) {
            console.log(err);
        }
    };


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





    const getItemByName = async (value) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByName`, { itemItemMasterName: value }
            );
            console.log(response.data)
            setAllItemImtes(response.data.result)

            console.log()

        } catch (err) {
            console.log(err);
        }
    };





    const [onSiteList, setOnSiteList] = useState({})
    const grnFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/onsiteItemGRN/getAllOnsiteItemGRN`
            );
            setOnSiteList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        grnFetchData();
    }, []);

    const handleOnSiteChange = (e) => {
        const { name, value, checked } = e.target;
        setOnSiteGrnData((prev) => ({ ...prev, [name]: value }));





    }


    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [errorhandler, setErrorHandler] = useState({})

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const submitOnSiteForm = async () => {
        try {
            const response = await axios.post(

                `${process.env.REACT_APP_PORT}/onsiteItemGRN/createOnsiteItemGRN`, onSiteGrnData
            );
            console.log(response.data)
            setAlertMessage(response.data.message)
            setSnackBarOpen(true)
            setTimeout(() => setOnSiteAddOpen(false), 3000)
            grnListFetchData()
            setOnSiteGrnData(initialOnSiteData)
        } catch (err) {
            console.log(err);
        }
    };






    return (

        <Dialog fullScreen keepMounted maxWidth="xl" TransitionComponent={Transition} open={onSietAddOpen} sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setOnSiteAddOpen(false)
                }
            }}>
            <DialogTitle align='center' >OnSite GRN</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setOnSiteAddOpen(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <Close />
            </IconButton>





            <DialogContent sx={{ width: "100%" }}>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <form>


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
                                        <div className='row g-2 mb-2'>
                                            <div className=" col-6">

                                                <TextField label="Party Ref No"
                                                    id="osGrnPartyRefNoId"
                                                    defaultValue=""
                                                    size="small"
                                                    value={onSiteGrnData.osGrnPartyRefNo}
                                                    onChange={handleOnSiteChange}
                                                    fullWidth
                                                    name="osGrnPartyRefNo" />
                                            </div>
                                            <div className="col-6">

                                                <DatePicker

                                                    fullWidth
                                                    id="osGrnPartyRefDateId"
                                                    name="osGrnPartyRefDate"
                                                    value={dayjs(onSiteGrnData.osGrnPartyRefDate)}
                                                    onChange={(newValue) =>
                                                        setOnSiteGrnData((prev) => ({ ...prev, osGrnPartyRefDate: newValue.format("YYYY-MM-DD") }))
                                                    }
                                                    label="Party Ref Date"
                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    format="DD-MM-YYYY" />



                                            </div>





                                            <div className=" col-6 ">

                                                <TextField label="Party Name"
                                                    id="osGrnPartyNameId"
                                                    select
                                                    // value={onSiteGrnData.osGrnPartyName}
                                                    // onChange={handleOnSiteChange}
                                                    onChange={(e) => setPartyData(e.target.value)}
                                                    size="small"
                                                    fullWidth
                                                    name="osGrnPartyName" >
                                                    {vendorDataList.map((item, index) => (
                                                        <MenuItem key={index} value={item._id}>{item.fullName}</MenuItem>
                                                    ))}

                                                </TextField>
                                            </div>
                                            <div className="col-6">

                                                <TextField label="Party code"
                                                    id="osGrnPartyCodeId"
                                                    defaultValue=""
                                                    value={onSiteGrnData.osGrnPartyCode}
                                                    //  onChange={handleOnSiteChange}
                                                    // sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth
                                                    name="osGrnPartyCode" />

                                            </div>


                                        </div>



                                        <div className="col-12">

                                            <TextField label="PartyAddress"
                                                id="osGrnPartyAddressId"
                                                defaultValue=""
                                                value={onSiteGrnData.osGrnPartyAddress}
                                                onChange={handleOnSiteChange}
                                                size="small"
                                                sx={{ width: "100%" }}
                                                name="osGrnPartyAddress" />

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

                                        <div className='col row g-2 d-flex mb-2'>
                                            <div className="col-6">

                                                <TextField
                                                    label="GRN NO"
                                                    id="osGrnNoId"
                                                    defaultValue=""
                                                    size="small"
                                                    value={onSiteGrnData.osGrnNo}
                                                    onChange={handleOnSiteChange}
                                                    fullWidth
                                                    name="osGrnNo"
                                                />
                                            </div>
                                            <div className="col-6">



                                                <DatePicker

                                                    fullWidth
                                                    id="osGrnDateId"
                                                    name="osGrnDate"
                                                    label="GRN Date"
                                                    value={dayjs(onSiteGrnData.osGrnDate)}
                                                    onChange={(newValue) =>
                                                        setOnSiteGrnData((prev) => ({ ...prev, osGrnDate: newValue.format("YYYY-MM-DD") }))
                                                    }
                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    format="DD-MM-YYYY" />



                                            </div>
                                            <div className='col-md-12'>
                                                <TextField label="Common Remarks"
                                                    id="osGrnCommonRemarksId"
                                                    defaultValue=""
                                                    value={onSiteGrnData.osGrnCommonRemarks}
                                                    onChange={handleOnSiteChange}
                                                    fullWidth
                                                    size="small"
                                                    name="osGrnCommonRemarks"
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
                                            <TextField size='small' fullWidth variant='outlined' defaultValue="" id="grnListId" select label="Item List" name='grnList'>
                                                {itemMasterDistNames.map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div className='col me-2 '>
                                            <TextField label="Imte No"
                                                id="grnItemIdId"
                                                select
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                name="grnItemId" >
                                                {allItemImtes.map((item, index) => (
                                                    <MenuItem key={index} value={item._id}>{item.itemIMTENo}</MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div className='col me-2 '>
                                            <TextField size='small' fullWidth variant='outlined' defaultValue="" id="grnItemStatusId" select label="Grn Item Status" name='grnItemStatus' >
                                                <MenuItem value="">Select</MenuItem>
                                                <MenuItem value="Calibrated">Calibrated</MenuItem>
                                                <MenuItem value="Serviced">Serviced</MenuItem>
                                                <MenuItem value="Not Servicable">Not Servicable</MenuItem>
                                                <MenuItem value="Not Calibrated">Not Calibrated</MenuItem>
                                            </TextField>
                                        </div>

                                    </div>



                                </div>

                                <div className='row g-2 '>
                                    <div className='col d-flex'>


                                        <div className="col-2 me-2">

                                            <DatePicker
                                                fullWidth
                                                id="grnItemCalDateId"
                                                name="grnItemCalDate"
                                                label="Cal Date"

                                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                format="DD-MM-YYYY"

                                            />

                                        </div>

                                        <div className="col-2 me-2">

                                            <DatePicker
                                                fullWidth
                                                id="grnItemDueDateId"
                                                name="grnItemDueDate"
                                                label="Next Cal Date"
                                                // sx={{ width: "100%" }}
                                                format="DD-MM-YYYY"

                                            />

                                        </div>

                                        <div className='col-md-2'>
                                            <TextField size='small' fullWidth variant='outlined' id="grnItemCertificateStatusId" select label="Certificate Status" name='grnItemCertificateStatus'>
                                                <MenuItem value="received">Received</MenuItem>
                                                <MenuItem value="notReceived">Not Received</MenuItem>

                                            </TextField>
                                        </div>

                                        <div className="col-md-2">

                                            <TextField label="Certificate No"

                                                id="grnItemCertificateNoId"
                                                defaultValue=""
                                                size="small"
                                                fullWidth

                                                name="grnItemCertificateNo" />

                                        </div>
                                        <div className='col-md-2'>
                                            <TextField fullWidth label="Uncertainity" id='grnUncertainityId' variant='outlined' size='small' name='grnUncertainity' />

                                        </div>

                                        <div className='col-md-2' >
                                            <Button helperText="Hello" component="label" fullWidth variant="contained" startIcon={<CloudUpload />} >
                                                Upload Certificate

                                            </Button>

                                        </div>

                                    </div>

                                </div>


                                <div className='row'>
                                    <h4 className='text-center'>Calibration Data</h4>
                                    <table className='table table-sm table-bordered table-responsive text-center align-middle'>


                                        <tbody >
                                            <tr>

                                                <th width="20%" rowSpan={2}>Parameter</th>
                                                <th width="10%" rowSpan={2}>Range/Size</th>
                                                <th width="10%" rowSpan={2}>Unit</th>
                                                <th colSpan={3} width="30%">Permissible Size</th>


                                                <th width="20%" colSpan={2}>Observed Size</th>
                                                <th width="10%" rowSpan={2}>Status</th>
                                            </tr>
                                            <tr>
                                                <th width="6%">Min</th>
                                                <th width="6%">Max</th>
                                                <th width="10%">Wear Limit</th>

                                                <React.Fragment>
                                                    <th>Average</th>
                                                </React.Fragment>
                                                <React.Fragment>
                                                    <th>Min</th>
                                                    <th>Max</th>
                                                </React.Fragment>

                                            </tr>
                                            {/* {selectedGrnItem.grnAcCriteria.map((item)=> ()} */}

                                        </tbody>
                                    </table>
                                    <div className=' col d-flex justify-content-between'>
                                        <div className='col-6 me-2 '>
                                            <TextField size='small' fullWidth variant='outlined' id="grnItemCalStatusId" select label="Calibration Status" name='grnItemCalStatus' >
                                                <MenuItem value="status">Status</MenuItem>
                                                <MenuItem value="accepted">Accepted</MenuItem>
                                                <MenuItem value="rejected">Rejected</MenuItem>
                                            </TextField>
                                        </div>

                                    </div>

                                    <div className=' col d-flex justify-content-end'>
                                        <div className='me-2 '>
                                            <Button startIcon={<Add />} size='small' sx={{ minWidth: "130px" }} variant='contained'>Add Item</Button>
                                        </div>

                                    </div>

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
                                        <Button >Cancel</Button>
                                        <Button autoFocus>
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
                            </Paper>
                            <Paper elevation={12} sx={{ p: 2 }} className='col-md-12'>
                                <table className='table table-bordered table-responsive text-center align-middle'>
                                    <tbody>
                                        <tr>
                                            <th>Si No</th>
                                            <th>IMTE No</th>
                                            <th>Master Name</th>
                                            <th>Range/Size</th>
                                            <th>Cal Certificate No</th>
                                            <th>Cal Due</th>
                                            <th>Next Due</th>
                                            <th>Calibrated At</th>
                                            <th>Remove</th>
                                        </tr>

                                    </tbody>
                                </table>
                            </Paper>
                        </form>
                    </LocalizationProvider>

                </div>
            </DialogContent>
            <DialogActions className='d-flex justify-content-between'>
                <div>
                    <Button variant='contained' color='warning' className='me-3'>Print</Button>
                </div>
                <div>
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setOnSiteAddOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { submitOnSiteForm(true) }} >Submit</Button>
                </div>
            </DialogActions>

        </Dialog>
    )
}

export default OnSiteGrn