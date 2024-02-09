import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, CircularProgress } from '@mui/material';
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
import { useEmployee } from '../../../App';
import { useParams } from 'react-router-dom';


const DcEdit = () => {
    const { id } = useParams()
    console.log(id)
    const empRole = useEmployee()
    const { employee, loggedEmp } = empRole

    const dcEditDatas = useContext(DcListContent)
    const { dcEditOpen, setDcEditOpen, selectedRows, dcListFetchData, itemPlantList, allowedPlants } = dcEditDatas
    console.log(selectedRows)
    const [errorhandler, setErrorHandler] = useState({});

    const [itemNameList, setItemNameList] = useState(itemPlantList)
    console.log(selectedRows)
    const [selectedExtraMaster, setSelectedExtraMaster] = useState([])
    const initialDcData = {
        dcPartyId: "",
        dcPartyType: "",
        dcPartyName: "",
        dcPartyCode: "",
        dcPartyAddress: "",
        dcNo: "",
        dcDate: "",
        dcReason: "",
        dcCommonRemarks: "",
        dcPartyItems: [],
        dcPlant: "",
        dcDepartment: ""

    }

    const [dcEditData, setDcEditData] = useState({
        dcPartyId: "",
        dcPartyType: "",
        dcPartyName: "",
        dcPartyCode: "",
        dcPartyAddress: "",
        dcNo: "",
        dcDate: "",
        dcReason: "",
        dcCommonRemarks: "",
        dcPartyItems: [],
        dcPlant: "",
        dcDepartment: ""

    })
    console.log(dcEditData)

    const [selectedPlantItems, setSelectedPlantItems] = useState([])

    const settingDcData = () => {
        if (selectedRows.length !== 0) {

            // Check if selectedRows is defined
            setDcEditData((prev) => ({
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
                dcPlant: selectedRows.dcPlant,
                dcDepartment: selectedRows.dcDepartment

            }));
            const plantItems = itemPlantList.filter(item => item.itemPlant === selectedRows.dcPlant)
            setSelectedPlantItems(plantItems)
            const distinctItemNames = [... new Set(plantItems.map(item => item.itemAddMasterName))]
            setItemNameList(distinctItemNames)
            console.log(distinctItemNames)

        }
    };

    console.log(dcEditData)

    // useEffect(() => {
    //     const plantItems = itemPlantList.filter(item => item.itemPlant === selectedRows.dcPlant);
    //     const distinctItemNames = [...new Set(plantItems.map(item => item.itemAddMasterName))];
    //     setItemNameList(distinctItemNames);
    //     console.log(distinctItemNames);
    // }, [selectedRows.dcPlant, itemPlantList]);

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
        setDcEditData((prev) => ({ ...prev, [name]: value }))


    };



    //
    const addDcValue = () => {
        if (selectedExtraMaster.length !== 0) {
            setDcEditData((prev) => ({
                ...prev,
                dcPartyItems: [...prev.dcPartyItems, selectedExtraMaster]
            }))
            setSelectedExtraMaster([])
        }
    }

    const remarksChange = (event, rowId) => {
        const { name, value } = event.target;
        if (dcEditData.dcPartyItems.length !== 0) {
            setDcEditData((prev) => {
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
            field: 'select', headerName: 'ReMarks', width: 200, renderCell: (params) => <select className="form-select  form-select-sm col-2" id="reMarks" name="reMarks" aria-label="Floating label select example">

                <option value="Calibration">Calibration</option>
                <option value="service">Service</option>
                <option value="servicecalibration">Service & Calibration</option>

            </select>
        },

        { field: 'delete', headerName: 'Delete', width: 100, renderCell: (index) => <Delete onClick={() => deleteAC(index)} /> },
    ]




    // const [dcPartyItem, setDcPartyItem] = useState([])

    const [vendorDataList, setVendorDataList] = useState([])

    const vendorFetchData = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/vendor/getVendorByPlants`, { allowedPlants: allowedPlants }
              );
            setVendorDataList(response.data.result);

            // Assuming dcEditData is defined somewhere in your code
            const filteredData = response.data.result.filter(dcItem =>
                !dcEditData.dcPartyItems.some(vendor =>
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
        setDcEditData((prev) => ({ ...prev, [name]: value }));
    }

    const setPartyData = async (id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getVendorById/${id}`
            );
            console.log(response)
            setDcEditData((prev) => ({
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





    //////
    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState({
        dcMessage: "",
        dcType: "info"
    })

    const [loader, setLoader] = useState(false)


    const submitDcForm = async () => {
        setLoader(true)
        try {
            if (dcEditData.dcPartyItems.length === 0) {
                setAlertMessage({ dcMessage: "Cannot create DC without a Item", dcType: "error" })
                setSnackBarOpen(true)
            } else {
                const response = await axios.put(

                    `${process.env.REACT_APP_PORT}/itemDc/updateItemDc/${selectedRows._id}`, dcEditData
                );
                setAlertMessage({ dcMessage: response.data.message, dcType: "success" })
                setSnackBarOpen(true)
                setDcEditData(initialDcData)
                dcListFetchData()

                setTimeout(() => setDcEditOpen(false), 1000)
            } 
        } catch (err) {
            console.log(err.response.data.error);
            setSnackBarOpen(true) 
            setAlertMessage({ dcMessage: err.response.data.error, dcType: "error" })
        }finally{
            setLoader(false)
        }
    };







    const deleteAC = (index) => {
        setDcEditData((prev) => {
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
        itemReMarks: "Calibration",
    })


    const getItemByName = async (value) => {
        const itemBySelectedName = selectedPlantItems.filter(item => item.itemAddMasterName === value)
        const remainingItems = itemBySelectedName.filter(item =>
            !dcEditData.dcPartyItems.some(dc => dc._id === item._id)
        );
        setItemImtes(remainingItems)
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
            setDcEditData((prev) => ({ ...prev, dcPartyItems: [...prev.dcPartyItems, selectedDcItem] }))
        }
    }
    useEffect(() => {
        setSelectedDcItem([])
        setItemAddDetails({
            itemListNames: "",
            itemImteList: "",

        })
    }, [dcEditData.dcPartyItems])

    console.log(selectedPlantItems)

    const nonSelectedItem = () => {
        if (dcEditData.dcPartyItems.length > 0) {
            const remainingItems = selectedPlantItems.filter(item =>
                !dcEditData.dcPartyItems.some(dc => dc._id === item._id)
            );
            console.log(remainingItems)
            setItemImtes(remainingItems)
        }

    }
    useEffect(() => {
        nonSelectedItem();
    }, [dcEditData.dcPartyItems])













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

                                <div className='col-3 mb-2'>
                                    <TextField label="Plant Wise"
                                        id="dcPlantId"
                                        disabled
                                        select
                                        value={dcEditData.dcPlant}
                                        fullWidth
                                        onChange={handleDcItemAdd}
                                        size="small"
                                        name="dcPlant" >

                                        <MenuItem value="all">All</MenuItem>
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



                                    <div className='col'>

                                        <div className='col d-flex mb-2'>
                                            <div className="col me-2">
                                                <TextField label="Vendor Type"
                                                    id="dcPartyTypeId" select defaultValue="" onChange={handleFilterChange} size="small" value={dcEditData.dcPartyType} sx={{ width: "101%" }} name="dcPartyType" >
                                                    <MenuItem value=""><em>--Select--</em></MenuItem>
                                                    <MenuItem value="oem">OEM</MenuItem>
                                                    <MenuItem value="customer">Customer</MenuItem>
                                                    <MenuItem value="supplier">Supplier</MenuItem>
                                                    <MenuItem value="subContractor">SubContractor</MenuItem>

                                                </TextField>

                                            </div>
                                            <div className=" col me-2">

                                                <TextField label="Party Name"
                                                    id="partyIdId"
                                                    select

                                                    value={dcEditData.dcPartyId}
                                                    onChange={(e) => setPartyData(e.target.value)}


                                                    size="small"
                                                    fullWidth
                                                    disabled={dcEditData.dcPartyType === ""}
                                                    name="partyId" >
                                                    {filteredData.map((item, index) => (
                                                        <MenuItem key={index} value={item._id}>{item.fullName}</MenuItem>
                                                    ))}
                                                </TextField>


                                            </div>
                                            <div className="col me-2">

                                                <TextField label="Party code"
                                                    id="partyCodeId"
                                                    defaultValue=""
                                                    disabled={dcEditData.dcPartyType === ""}

                                                    value={dcEditData.dcPartyCode}


                                                    // sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth
                                                    name="partyCode" >

                                                </TextField>


                                            </div>
                                            <div className="col">

                                                <TextField label="Party Address"
                                                    id="partyAddressId"
                                                    value={dcEditData.dcPartyAddress}

                                                    defaultValue=""
                                                    disabled={dcEditData.dcPartyType === ""}

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
                                                value={dcEditData.dcNo}
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
                                                value={dayjs(dcEditData.dcDate)}
                                                onChange={(newValue) =>
                                                    setDcEditData((prev) => ({ ...prev, dcDate: newValue.format("YYYY-MM-DD") }))
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
                                                value={dcEditData.dcReason}
                                                onChange={handleDcChange}
                                                size="small"
                                                sx={{ width: "101%" }}
                                                name="dcReason" >
                                                <MenuItem value="">Select</MenuItem>
                                                <MenuItem value="Nil">Nil</MenuItem>
                                                <MenuItem value="Service">Service</MenuItem>
                                                <MenuItem value="ServiceCalibration">Service & Calibration</MenuItem>
                                                <MenuItem value="Calibration">Calibration</MenuItem>
                                                <MenuItem value="others">Others</MenuItem>

                                            </TextField>

                                        </div>
                                        <div className='col me-2'>
                                            <TextField label="Common Remarks"
                                                id="dcCommonRemarksId"
                                                value={dcEditData.dcCommonRemarks}
                                                defaultValue=""
                                                onChange={handleDcChange}
                                                size="small"
                                                sx={{ width: "102%" }}
                                                name="dcCommonRemarks" />

                                        </div>


                                    </div>

                                </div>
                            </Paper>



                            {/* <Paper
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
                                                {itemNameList.map((item, index) => (
                                                    <MenuItem key={index} value={item}>
                                                        {item}
                                                    </MenuItem>
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
                                    </div>
                                    <div className=' col d-flex justify-content-end'>
                                        <div className='me-2 '>
                                            
                                            <Button startIcon={<Add />} onClick={() => dcItemAdd()} size='small' sx={{ minWidth: "130px" }} variant='contained'>Add Item</Button>
                                        </div>

                                    </div>

                                </div>
                            </Paper> */}

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
                                    {/* <Box sx={{ height: 350, width: '100%', my: 2 }}>
                                        <DataGrid

                                            rows={dcEditData.dcPartyItems}
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

                                        </Box>*/}


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
                                            {dcEditData.dcPartyItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.itemIMTENo}</td>
                                                    <td>{item.itemAddMasterName}</td>
                                                    <td>{item.itemRangeSize}</td>
                                                    <td>{item.itemMake}</td>
                                                    <td>{item.itemCalFreInMonths}</td>
                                                    <td> <select className="form-select form-select-sm" id="dcItemRemarksId" name="dcItemRemarks" value={item.dcItemRemarks} onChange={(e) => remarksChange(e, index)} aria-label="Floating label select example">
                                                        <option value="">Select</option>
                                                        <option value="Calibration">Calibration</option>
                                                        <option value="Service">Service</option>
                                                        <option value="Service and Calibration">Service and Calibration</option>


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
                                    <Button onClick={() => setConfirmSubmit(false)}>Cancel</Button>
                                    <Button onClick={() => { submitDcForm(); setConfirmSubmit(false) }} autoFocus>
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={3000}
                                onClose={() => setTimeout(() => {
                                    setSnackBarOpen(false)
                                }, 3000)}>
                                <Alert onClose={() => setSnackBarOpen(false)} variant='filled' severity={alertMessage.dcType} sx={{ width: '100%' }}>
                                    {alertMessage.dcMessage}
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
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setDcEditOpen(false); settingDcData() }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { setConfirmSubmit(true) }}>Submit {loader ? <CircularProgress sx={{color: "inherit"}} variant="indeterminate" size={20} /> : ""}</Button>
                </div>
            </DialogActions>


        </Dialog>
    )
}

export default DcEdit