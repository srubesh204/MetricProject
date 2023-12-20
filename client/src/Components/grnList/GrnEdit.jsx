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
import { useParams } from 'react-router-dom';


const GrnEdit = () => {
    const grnEditDatas = useContext(GrnListContent)
    const { grnEditOpen, setGrnEditOpen, selectedRows, grnListFetchData } = grnEditDatas

    const { id } = useParams()
    console.log(id)
    const [selectedExtraMaster, setSelectedExtraMaster] = useState([])
    const initialGrnEditData = {
        grnPartyRefNo: "",
        grnPartyId: "",
        grnPartyRefDate: "",
        grnPartyName: "",
        grnPartyCode: "",
        grnPartyAddress: "",
        grnNo: "",
        grnDate: "",
        grnCommonRemarks: "",
        grnCalDate: dayjs().format("YYYY-MM-DD"),
        grnDueDate: "",
        grnCertificateStatus: "",
        grnCertificateNo: "",
        grnUncertainity: "",
        grnPartyItems: []

    }


    const [grnEditData, setGrnEditData] = useState({
        grnPartyRefNo: "",
        grnPartyId: "",
        grnPartyRefDate: "",
        grnPartyName: "",
        grnPartyCode: "",
        grnPartyAddress: "",
        grnNo: "",
        grnDate: "",
        grnCommonRemarks: "",
        grnCalDate: dayjs().format("YYYY-MM-DD"),
        grnDueDate: "",
        grnCertificateStatus: "",
        grnCertificateNo: "",
        grnUncertainity: "",
        grnPartyItems: []
    })


    console.log(selectedRows)
    const settingGrnData = () => {
        if (selectedRows.length !== 0) { // Check if selectedRows is defined
            setGrnEditData((prev) => ({
                ...prev,
                grnPartyId: selectedRows.grnPartyId,
                grnPartyRefNo: selectedRows.grnPartyRefNo,
                grnPartyRefDate: selectedRows.grnPartyRefDate,
                grnPartyName: selectedRows.grnPartyName,
                grnPartyCode: selectedRows.grnPartyCode,
                grnPartyAddress: selectedRows.grnPartyAddress,
                grnNo: selectedRows.grnNo,
                grnDate: selectedRows.grnDate,
                grnCommonRemarks: selectedRows.grnCommonRemarks,
                grnCalDate: selectedRows.grnCalDate,
                grnDueDate: selectedRows.grnDueDate,
                grnCertificateStatus: selectedRows.grnCertificateStatus,
                grnCertificateNo: selectedRows.grnCertificateNo,
                grnUncertainity: selectedRows.grnUncertainity,
                grnPartyItems: selectedRows.grnPartyItems,
            }));
        }
    };

    useEffect(() => {
        settingGrnData();
    }, [selectedRows]);

    const nonSelectedItems = () => {

        // const remainingMasters = selectedRows.filter(item =>
        //     !grnData.grnPartyItems.some(grn => grn.grnItemId === item._id)
        // );
        // setGrnImtes(remainingMasters)


    }


    useEffect(() => {
        nonSelectedItems()
    }, [grnEditData.grnPartyItems])

    const addDcValue = () => {
        if (selectedExtraMaster.length !== 0) {
            setGrnEditData((prev) => ({
                ...prev,
                dcPartyItems: [...prev.dcPartyItems, selectedExtraMaster]
            }))
            setSelectedExtraMaster([])
        }
    }

    const deleteGrnPartyItems = (index) => {
        setGrnEditData((prev) => {
            const AC = [...prev.grnPartyItems]
            AC.splice(index, 1);
            return {
                ...prev, grnPartyItems: AC,
            };
        })
        nonSelectedItems();
    };





    const [itemAddDetails, setItemAddDetails] = useState({
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


    const handleGrnChange = (e) => {
        const { name, value, checked } = e.target;
        setGrnEditData((prev) => ({ ...prev, [name]: value }));
    }

    const setPartyData = async (id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getVendorById/${id}`
            );
            console.log(response)
            setGrnEditData((prev) => ({
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
            // const filteredImtes = response.data.result.filter((imtes) => !grnEditData.grnPartyItems.some(grnImte => imtes._id === grnImte._id))
            const dcStatus = response.data.result.filter((item)=> item.dcStatus === "1" && (item.grnStatus === "0" || item.grnStatus === "" || item.grnStatus === undefined))
            setItemImtes(dcStatus)

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
            setGrnEditData((prev) => ({ ...prev, grnPartyItems: [...prev.grnPartyItems, selectedGrnItem] }))
        }
    }
    useEffect(() => {
        setSelectedGrnItem([])
        setItemAddDetails({
            grnList: "",
            grnImteNo: ""
        })
    }, [grnEditData.grnPartyItems])


    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [errorhandler, setErrorHandler] = useState({})

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")







    const updateGrnData = async () => {
        try {
            const response = await axios.put(

                `${process.env.REACT_APP_PORT}/itemGrn/updateItemGRN/${selectedRows._id}`, grnEditData
            );
            setAlertMessage(response.data.message)
            setSnackBarOpen(true)
            grnListFetchData()
            setGrnEditData(initialGrnEditData)

            setTimeout(() => setGrnEditOpen(false), 3000)
        } catch (err) {
            console.log(err);
        }
    };















    return (

        <Dialog fullWidth={true} keepMounted maxWidth="xl" open={grnEditOpen} onc sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setGrnEditOpen(false)
                }
            }}>
            <DialogTitle align='center' >GRN</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setGrnEditOpen(false)}
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
                                                    id="grnPartyRefNoId"
                                                    defaultValue=""
                                                    value={grnEditData.grnPartyRefNo}
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
                                                    value={dayjs(grnEditData.grnPartyRefDate)}
                                                    onChange={(newValue) =>
                                                        setGrnEditData((prev) => ({ ...prev, grnPartyRefDate: newValue.format("YYYY-MM-DD") }))
                                                    }
                                                    label="Party Ref Date"
                                                    //onChange={handleGrnChange}


                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    format="DD-MM-YYYY" />



                                            </div>





                                            <div className=" col-6 ">

                                                <TextField label="Party Name"
                                                    id="grnPartyNameId"
                                                    select
                                                    //  value={grnEditData.grnPartyName}

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
                                                    value={grnEditData.grnPartyCode}

                                                    fullWidth
                                                    name="grnPartyCode" />

                                            </div>


                                        </div>



                                        <div className="col-12">

                                            <TextField label="PartyAddress"
                                                id="grnPartyAddressId"
                                                defaultValue=""
                                                size="small"
                                                onChange={handleGrnChange}
                                                value={grnEditData.grnPartyAddress}
                                                sx={{ width: "100%" }}
                                                name="grnPartyAddress" />

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
                                                    id="grnNoId"
                                                    defaultValue=""
                                                    value={grnEditData.grnNo}
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
                                                    value={dayjs(grnEditData.grnPartyRefDate)}
                                                    onChange={(newValue) =>
                                                        setGrnEditData((prev) => ({ ...prev, grnDate: newValue.format("YYYY-MM-DD") }))
                                                    }
                                                    label="GRN Date"
                                                    //onChange={handleGrnChange}


                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    format="DD-MM-YYYY" />



                                            </div>
                                            <div className='col-md-12'>
                                                <TextField label="Common Remarks"
                                                    id="grnCommonRemarksId"

                                                    defaultValue=""
                                                    onChange={handleGrnChange}
                                                    value={grnEditData.grnCommonRemarks}
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
                                            <TextField size='small' fullWidth variant='outlined' defaultValue="" value={itemAddDetails.grnList} id="grnListId" onChange={handleGrnItemAdd} select label="Item List" name='grnList'>

                                                {itemMasterDistNames.map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                ))}

                                            </TextField>
                                        </div>
                                        <div className='col'>
                                            <TextField label="Imte No"
                                                id="grnImteNoId"
                                                select
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                disabled={itemAddDetails.grnList === ""}
                                                onChange={handleGrnItemAdd}
                                                value={itemAddDetails.grnImteNo}
                                                name="grnImteNo" >

                                                {itemImtes.map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item.itemIMTENo}</MenuItem>
                                                ))}

                                            </TextField>
                                        </div>
                                    </div>
                                    <div className=' col d-flex justify-content-end'>
                                    </div>

                                </div>

                                <div className='row g-2 '>
                                    <div className='col d-flex'>
                                        <div className="me-2">

                                            <DatePicker
                                                fullWidth
                                                id="grnCalDateId"
                                                name="grnCalDate"
                                                label="Cal Date"

                                                //sx={{ width: "100%" }}
                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD-MM-YYYY"
                                                value={dayjs(grnEditData.grnCalDate)}
                                                onChange={(newValue) =>
                                                    setGrnEditData((prev) => ({ ...prev, grnCalDate: newValue.format("YYYY-MM-DD") }))
                                                } />

                                        </div>
                                        <div className="me-2">

                                            <DatePicker
                                                fullWidth
                                                id="grnDueDateId"
                                                name="grnDueDate"
                                                label="Next Cal Date"
                                                // sx={{ width: "100%" }}

                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD-MM-YYYY"
                                                value={dayjs(grnEditData.grnDueDate)}
                                                onChange={(newValue) =>
                                                    setGrnEditData((prev) => ({ ...prev, grnDueDate: newValue.format("YYYY-MM-DD") }))
                                                }
                                            />

                                        </div>
                                        <div className='col me-2'>
                                            <TextField size='small' fullWidth variant='outlined' id="certificateStatusId" select label="Certificate Status" onChange={handleGrnChange} name='certificateStatus'>
                                                <MenuItem value="received">Received</MenuItem>
                                                <MenuItem value="notreceived">Not Received</MenuItem>

                                            </TextField>
                                        </div>
                                        <div className="col me-2">

                                            <TextField label="CertificateNo"
                                                id="certificateNoId"
                                                defaultValue=""
                                                value={grnEditData.grnCertificateNo}
                                                onChange={handleGrnChange}
                                                size="small"
                                                sx={{ width: "101%" }}
                                                name="certificateNo" />

                                        </div>
                                        <div className='col me-2'>
                                            <TextField fullWidth label="Uncertainity" variant='outlined' onChange={handleGrnChange} value={grnEditData.grnUncertainity} size='small' name='itemUncertainity' />

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
                                    <h4 className='text-center'>Calibration Data</h4>
                                    <div className=' col d-flex justify-content-end mb-2'>
                                        <div className=' col-2 me-2 '>
                                            <TextField size='small' fullWidth variant='outlined' id="certificateStatusId" select label="Certificate Status" onChange={handleGrnChange} name='certificateStatus'>
                                                <MenuItem value="received">Received</MenuItem>
                                                <MenuItem value="notreceived">Not Received</MenuItem>

                                            </TextField>
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
                                        <Button onClick={() => setConfirmSubmit(false)}>Cancel</Button>
                                        <Button onClick={() => { updateGrnData(); setConfirmSubmit(false) }} autoFocus>
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
                                <div className="row mb-2">

                                    <div className='col-md'> <h5 className='text-start'>Master Used</h5></div>
                                    <div className=' col d-flex justify-content-end'>
                                        <div className='me-2 '>
                                            <Button startIcon={<Add />} onClick={() => grnItemAdd()} size='small' sx={{ minWidth: "130px" }} variant='contained'>Add Item</Button>
                                        </div>

                                    </div>

                                </div>

                                <table className='table table-bordered table-responsive text-center align-middle'>
                                        <tbody>
                                            <tr>
                                                <th>Si No</th>
                                                <th>IMTE No</th>
                                                <th>Master Name</th>
                                                <th>Range/Size</th>
                                                <th>Cal Certificate No</th>
                                                <th>Cal Date</th>
                                                <th>Next Due</th>
                                                <th>Calibrated At</th>
                                                <th>Remarks</th>
                                                <th>Remove</th>
                                            </tr>

                                            {grnEditData.grnPartyItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.grnItemIMTENo}</td>
                                                    <td>{item.grnItemAddMasterName}</td>
                                                    <td>{item.grnItemRangeSize}</td>
                                                    <td>{item.grnItemCertificateNo}</td>
                                                    <td>{item.grnItemCalDate}</td>
                                                    <td>{item.grnItemDueDate}</td>
                                                    <td>{item.grnItemCalibratedAt}</td>
                                                    <td>{item.grnItemStatus}</td>
                                                    <td width="5%"><Delete onClick={() => deleteGrnPartyItems(index)} color='error' /></td>
                                                </tr>
                                            ))}
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
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setGrnEditOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { setConfirmSubmit(true) }}>Submit</Button>
                </div>
            </DialogActions>

        </Dialog>
    )
}

export default GrnEdit