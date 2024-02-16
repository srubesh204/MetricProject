import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DcListContent } from './DcList';
import { Add, Close, Delete, DeleteOutline } from '@mui/icons-material';
import { useEmployee } from '../../../App';
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)


const DcAdd = () => {

    const empRole = useEmployee()
    const { employee, loggedEmp } = empRole

    const dcAddDatas = useContext(DcListContent)
    const { dcOpen, setDcOpen, selectedRows, dcListFetchData, itemPlantList, ItemFetch, lastNo } = dcAddDatas


    useEffect(()=> {
        setDcAddData(prev => ({...prev, dcNo: lastNo}))
    }, [lastNo])

    console.log(lastNo)

    const initialDcData = {
        dcPartyId: "",
        dcPartyType: "",
        dcPartyName: "",
        dcPartyCode: "",
        dcPartyAddress: "",
        dcNo: lastNo,
        dcDate: dayjs().format("YYYY-MM-DD"),
        dcReason: "Calibration",
        dcCommonRemarks: "",
        dcPlant: "",
        dcDepartment: "",
        dcPartyItems: [],


    }

    const [dcAddData, setDcAddData] = useState({
        dcPartyId: "",
        dcPartyType: "",
        dcPartyName: "",
        dcPartyCode: "",
        dcPartyAddress: "",
        dcNo: lastNo,
        dcDate: dayjs().format("YYYY-MM-DD"),
        dcReason: "Calibration",
        dcCommonRemarks: "",
        dcPlant: "",
        dcDepartment: "",
        dcPartyItems: [],


    })
    console.log(dcAddData)




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
        setDcAddData((prev) => ({ ...prev, [name]: value }))
    };




    

    const remarksChange = (event, rowId) => {
        const { name, value } = event.target;
        if (dcAddData.dcPartyItems.length !== 0) {
            setDcAddData((prev) => {
                const updateAC = [...prev.dcPartyItems]
                updateAC[rowId] = {
                    ...updateAC[rowId], [name]: value,
                };
                return {
                    ...prev, dcPartyItems: updateAC,
                };
            })
        }

    };

    console.log(dcAddData.dcPartyItems)
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

        { field: 'itemCalFreInMonths', headerName: 'Frequency', type: "number", width: 100 },
        {
            field: 'dcItemRemarks', headerName: 'ReMarks', width: 200, renderCell: (params) =>
                <select className="form-select form-select-sm col-2" id="dcItemRemarksId" onChange={(event) => remarksChange(event, params.row.id)} name="dcItemRemarks" value={params.row.dcItemRemarks} aria-label="Floating label select example">

                    <option value="Calibration">Calibration</option>
                    <option value="Service">Service</option>
                    <option value="Service&Calibration">Service & Calibration</option>

                </select>
        },
        { field: 'delete', headerName: 'Delete', width: 100, renderCell: (index) => <Delete onClick={() => deleteAC(index)} /> },
    ]






    const [vendorDataList, setVendorDataList] = useState([])

    

    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data.result);

            // Assuming dcAddData is defined somewhere in your code
            const filteredData = response.data.result.filter(dcItem =>
                !dcAddData.dcPartyItems.some(vendor =>
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
        setDcAddData((prev) => ({ ...prev, [name]: value }));
    }

    const setPartyData = async (id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getVendorById/${id}`
            );
            console.log(response)
            setDcAddData((prev) => ({
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
                console.log(response.data.result)
                setImteList(response.data.result)


            } catch (err) {
                console.log(err);
            }
        };

        useEffect(() => {
            getImteList();
        }, []);

        const [errorhandler, setErrorHandler] = useState({})
        console.log(errorhandler)
        const [confirmSubmit, setConfirmSubmit] = useState(false)
        const [snackBarOpen, setSnackBarOpen] = useState(false)
        const [alertMessage, setAlertMessage] = useState({
            message: "",
            type: ""
        })

        //validate function
        const [errors, setErrors] = useState({})

        const validateFunction = () => {
            let tempErrors = {};
            tempErrors.dcPartyType = dcAddData.dcPartyType ? "" : "GRN Party Type is Required"
            tempErrors.dcPartyName = dcAddData.dcPartyName ? "" : "GRN Party Name is Required"
            tempErrors.dcPartyCode = dcAddData.dcPartyCode ? "" : "GRN Party Code is Required"
            tempErrors.dcPartyAddress = dcAddData.dcPartyAddress ? "" : "GRN Party Address is Required"
            tempErrors.dcNo = dcAddData.dcNo ? "" : "GRN Number is Required"
            tempErrors.dcReason = dcAddData.dcReason ? "" : "GRN Reason is Required"
            tempErrors.dcPartyItems = dcAddData.dcPartyItems.length !== 0 ? "" : "GRN Item Required"

            setErrors({ ...tempErrors })

            return Object.values(tempErrors).every(x => x === "")
        }
        console.log(errors)

        ///




        const submitDcForm = async () => {
            try {
                if (validateFunction()) {

                    const response = await axios.post(
                        `${process.env.REACT_APP_PORT}/itemDc/createItemDc`, dcAddData
                    );

                    console.log(response.data.result)
                    setAlertMessage({ message: response.data.message, type: "success" });
                    setSnackBarOpen(true);
                    dcListFetchData();
                    setDcAddData(initialDcData);
                    setErrors({});
                    setItemAddDetails({
                        itemListNames: "",
                        itemImteList: ""
                    })
                    ItemFetch()
                    setTimeout(() => setDcOpen(false), 1000)
                } else {
                    setAlertMessage({ message: "Fill the required fields to submit", type: "error" })
                    setSnackBarOpen(true)
                }
            } catch (err) {
                setSnackBarOpen(true)

                if (err.response && err.response.status === 400) {
                    // Handle validation errors
                    console.log(err);
                    const errorData400 = err.response.data.errors;
                    const errorMessages400 = Object.values(errorData400).join(', ');
                    console.log(errorMessages400)
                    setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
                } else if (err.response && err.response.status === 500) {
                    // Handle other errors
                    console.log(err);
                    const errorData500 = err.response.data.error;
                    const errorMessages500 = Object.values(errorData500).join(', ');
                    console.log(errorMessages500)
                    setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
                } else {
                    console.log(err);
                    console.log(err.response.data.error)
                    setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
                }

                console.log(err);

            }

        };

        const deleteAC = (index) => {
            setDcAddData((prev) => {
                const AC = [...prev.dcPartyItems]
                AC.splice(index, 1);
                return {
                    ...prev, dcPartyItems: AC,
                };
            })
        };
      
        const [itemImtes, setItemImtes] = useState([])
        const [selectedDcItem, setSelectedDcItem] = useState([])

        const [itemAddDetails, setItemAddDetails] = useState({
            itemListNames: "--",
            itemImteList: "--"
        })


        const getItemByName = (value) => {
                console.log(value)
                const plantItem = itemPlantList.filter(item => item.itemAddMasterName === value)
                console.log(plantItem)
                const filteredImtes = plantItem.filter((imtes) => !dcAddData.dcPartyItems.some(dcImte => imtes._id === dcImte._id))
                setItemImtes(filteredImtes)

           
        };


        const [itemNameList, setItemNameList] = useState([])
        const handleDcItemAdd = (e) => {
            const { name, value } = e.target;
            if (name === "dcPlant") {
                // Set the selected itemPlant in state
                setDcAddData ((prev) => ({ ...prev, dcPlant: value }));
               
                const distinctItemNames = [... new Set(itemPlantList.map(item => item.itemAddMasterName))]
                setItemNameList(distinctItemNames)
                console.log(distinctItemNames)
            }

            if (name === "itemListNames") {
                getItemByName(value)
                setItemAddDetails((prev) => ({ ...prev, [name]: value }))
            }
            if (name === "itemImteList") {
                setSelectedDcItem(value)
                setItemAddDetails((prev) => ({ ...prev, [name]: value }))
            }


        }

        console.log(itemNameList)

        const dcItemAdd = () => {
            if (selectedDcItem.length !== 0) {
                setDcAddData((prev) => ({ ...prev, dcPartyItems: [...prev.dcPartyItems, selectedDcItem] }))
            }
        }
        useEffect(() => {
            const departments = [...new Set(dcAddData.dcPartyItems.map(item => item.itemCurrentLocation))]
            setSelectedDcItem([])
            setItemAddDetails({
                itemListNames: "",
                itemImteList: "",
                itemReMarks: ""
            })
            setDcAddData(prev => ({...prev, dcDepartment: departments}))
            
        }, [dcAddData.dcPartyItems])




       



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

                                    <div className='col-3 mb-2'>
                                        <TextField label="Plant Wise"
                                            id="dcPlantId"

                                            select
                                            value={dcAddData.dcPlant}
                                            fullWidth
                                            onChange={handleDcItemAdd}
                                            size="small"
                                            name="dcPlant" >
                                            <MenuItem value="">Select</MenuItem>
                                            {loggedEmp.plantDetails.map((item, index) => (
                                                <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                            ))}
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





                                        <div className='col d-flex mb-2'>
                                            <div className="col me-2">
                                                <TextField label="Vendor Type"
                                                    id="dcPartyTypeId"
                                                    select
                                                    defaultValue=""
                                                    onChange={handleFilterChange}
                                                    size="small"
                                                    sx={{ width: "101%" }}
                                                    {...(errors.dcPartyType !== "" && { helperText: errors.dcPartyType, error: true })}
                                                    name="dcPartyType" >
                                                    <MenuItem value=""><em>--Select--</em></MenuItem>
                                                    <MenuItem value="oem">OEM</MenuItem>
                                                    <MenuItem value="customer">Customer</MenuItem>
                                                    <MenuItem value="supplier">Supplier</MenuItem>
                                                    <MenuItem value="subContractor">SubContractor</MenuItem>

                                                </TextField>
                                            </div>

                                            <div className=" col me-2">
                                                <TextField label="Party Name"
                                                    id="dcPartyNameId"
                                                    select
                                                    // value={dcAddData.dcPartyName}
                                                    onChange={(e) => setPartyData(e.target.value)}
                                                    //  sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth
                                                    disabled={dcAddData.dcPartyType === ""}
                                                    {...(errors.dcPartyName !== "" && { helperText: errors.dcPartyName, error: true })}
                                                    name="dcPartyName">
                                                    {filteredData.map((item, index) => (
                                                        <MenuItem key={index} value={item._id}>{item.fullName}</MenuItem>
                                                    ))}
                                                </TextField>
                                            </div>
                                            <div className="col me-2">
                                                <TextField label="Party code"
                                                    id="dcPartyCodeId"
                                                    defaultValue=""
                                                    disabled={dcAddData.dcPartyType === ""}
                                                    {...(errors.dcPartyCode !== "" && { helperText: errors.dcPartyCode, error: true })}

                                                    value={dcAddData.dcPartyCode}


                                                    // sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth
                                                    name="dcPartyCode" >

                                                </TextField>


                                            </div>
                                            <div className="col">

                                                <TextField label="Party Address"
                                                    id="dcPartyAddressId"
                                                    value={dcAddData.dcPartyAddress}

                                                    defaultValue=""
                                                    disabled={dcAddData.dcPartyType === ""}

                                                    size="small"
                                                    sx={{ width: "100%" }}
                                                    {...(errors.dcPartyAddress !== "" && { helperText: errors.dcPartyAddress, error: true })}
                                                    name="dcPartyAddress" >

                                                </TextField>

                                            </div>


                                        </div>



                                    </div>


                                    <div className='row g-2 mb-2'>
                                        <div className='col d-flex'>
                                            <div className=" col-2 me-2">

                                                <TextField label="Dc No"
                                                    id="dcNoId"
                                                    defaultValue=""
                                                    value={dcAddData.dcNo}
                                                    onChange={handleDcChange}
                                                    {...(errors.dcNo !== "" && { helperText: errors.dcNo, error: true })}
                                                    size="small"
                                                    sx={{ width: "101%" }}
                                                    name="dcNo" />

                                            </div>
                                            <div className="col-2 me-2">
                                                <DatePicker

                                                    fullWidth
                                                    id="dcDateId"
                                                    name="dcDate"
                                                    value={dayjs(dcAddData.dcDate)}
                                                    onChange={(newValue) =>
                                                        setDcAddData((prev) => ({ ...prev, dcDate: newValue.format("YYYY-MM-DD") }))
                                                    }
                                                    label="Dc Date"


                                                    slotProps={{ textField: { size: 'small' } }}
                                                    format="DD-MM-YYYY" />


                                            </div>
                                            <div className="col me-2">
                                                <TextField label="Reason"
                                                    id="dcReasonId"
                                                    select
                                                    value={dcAddData.dcReason}
                                                    fullWidth
                                                    onChange={handleDcChange}
                                                    size="small"
                                                    {...(errors.dcReason !== "" && { helperText: errors.dcReason, error: true })}

                                                    name="dcReason" >
                                                    <MenuItem value="Calibration">Calibration</MenuItem>
                                                    <MenuItem value="Service">Service</MenuItem>
                                                    <MenuItem value="Service Calibration">Service&Calibration</MenuItem>

                                                </TextField>

                                            </div>
                                            <div className='col me-2'>
                                                <TextField label="Common Remarks"
                                                    id="dcCommonRemarksId"
                                                    value={dcAddData.dcCommonRemarks}
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
                                                {/* <TextField size='small' select fullWidth id='itemListNamesId' value={itemAddDetails.itemListNames}  {...(errors.dcPartyItems !== "" && { helperText: errors.dcPartyItems, error: true })} variant='outlined' onChange={handleDcItemAdd} label="Item List" name='itemListNames' >
                                                <MenuItem value="--"><em>--Select--</em></MenuItem>
                                                {itemNameList.map((item, index) => (
                                                    <MenuItem key={index} value={item.itemAddMasterName}>{item.itemAddMasterName}</MenuItem>
                                                ))}
                                            </TextField> */}
                                                <TextField
                                                    size='small'
                                                    select
                                                    fullWidth
                                                    id='itemListNamesId'
                                                    value={itemAddDetails.itemListNames}
                                                    {...(errors.dcPartyItems !== "" && { helperText: errors.dcPartyItems, error: true })}
                                                    variant='outlined'
                                                    onChange={handleDcItemAdd}
                                                    label="Item List"
                                                    name='itemListNames'
                                                    disabled={dcAddData.dcPlant === ""}
                                                >
                                                    <MenuItem value="--"><em>--Select--</em></MenuItem>
                                                    {itemNameList.map((item, index) => (
                                                        <MenuItem key={index} value={item}>
                                                            {item}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>

                                            </div>
                                            <div className='col me-2'>
                                                <TextField disabled={itemAddDetails.itemListNames === ""} size='small' select fullWidth variant='outlined' value={itemAddDetails.itemImteList} id='itemImteListId' onChange={handleDcItemAdd} label="Item IMTENo" name='itemImteList' >
                                                    <MenuItem value="--"><em>--Select--</em></MenuItem>
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
                                       

                                        <table className='table table-bordered table-responsive text-center align-middle'>
                                            <tbody>
                                                <tr>
                                                    <th>Si No</th>
                                                    <th>IMTE No</th>
                                                    <th>Item Name</th>
                                                    <th>Range/Size</th>
                                                    <th>Make</th>
                                                    <th>Frequency</th>
                                                    <th>Remarks</th>
                                                    <th>Remove</th>
                                                </tr>
                                                {dcAddData.dcPartyItems.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.itemIMTENo}</td>
                                                        <td>{item.itemAddMasterName}</td>
                                                        <td>{item.itemRangeSize}</td>
                                                        <td>{item.itemMake}</td>
                                                        <td>{item.itemCalFreInMonths}</td>
                                                        <td> <select className="form-select form-select-sm" id="dcItemRemarksId" name="dcItemRemarks" value={item.dcItemRemarks} onChange={(e) => remarksChange(e, index)} aria-label="Floating label select example">
                                                            <option value="calibration">Calibration</option>
                                                            <option value="service">Service</option>
                                                            <option value="calibration&service">Calibration&Service</option>


                                                        </select></td>
                                                        <td width="5%"><Delete color='error' onClick={() => deleteAC(index)} /></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

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
                                        <Button onClick={() => {
                                            setConfirmSubmit(false);
                                            setAlertMessage();
                                        }}>
                                            Cancel
                                        </Button>
                                        <Button onClick={() => { submitDcForm(); setConfirmSubmit(false) }} autoFocus>
                                            Submit
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                {/* <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={3000}
                                onClose={() => setTimeout(() => {
                                    setSnackBarOpen(false)
                                }, 3000)}>
                                <Alert onClose={() => setSnackBarOpen(false)} variant='filled' severity={alertMessage.type} sx={{ width: '100%' }}>
                                    {alertMessage.message}
                                </Alert>
                            </Snackbar> */}
                                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={() => setSnackBarOpen(false)}>
                                    <Alert onClose={() => setSnackBarOpen(false)} severity={errorhandler.code} variant='filled' sx={{ width: '100%' }}>
                                        {errorhandler.message}
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
                        <Button variant='contained' color='error' className='me-3' onClick={() => { setDcOpen(false); setDcAddData(initialDcData) }}>Cancel</Button>
                        <Button variant='contained' onClick={() => { setConfirmSubmit(true) }}>Submit</Button>
                    </div>
                </DialogActions>


            </Dialog>
        )
    }

export default DcAdd