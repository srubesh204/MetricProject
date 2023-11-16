import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import axios from 'axios';
import { CloudUploadIcon, ArrowBack, Edit, Done } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Delete } from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom'

const ItemAdd = () => {
    const Navigate = useNavigate();
    const { id } = useParams();
    console.log(id)

    // Units Data
    const [units, setUnits] = useState([]);
    const UnitFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/unit/getAllUnits`
            );
            setUnits(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        UnitFetch()
    }, []);




    const [departments, setDepartments] = useState([])
    const DepartmentFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            setDepartments(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        DepartmentFetch()
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



    const [areas, setAreas] = useState([])
    const areaFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/area/getAllAreas`
            );
            setAreas(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        areaFetch()
    }, []);

    const [placeOfUsages, setPlaceOfUsages] = useState([])
    const placeOfUsageFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/placeOfUsage/getAllPlaceOfUsages`
            );
            setPlaceOfUsages(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        placeOfUsageFetch()
    }, []);

    console.log({ Department: departments, Area: areas, placeOfUsage: placeOfUsages })

    //item master list
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


    //

    //Vendor
    const [vendorList, setVendorList] = useState([])
    const [customerList, setCustomerList] = useState([]);
    const [OEMList, setOEMList] = useState([]);
    const [supplierList, setSupplierList] = useState([])
    const [suppOEM, setSuppOEM] = useState([]);


    const vendorListFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            const vendorList = response.data.result
            const customerList = vendorList.filter((item) => item.customer === "1" || item.supplier === "1");
            const OEMList = vendorList.filter((item) => item.oem === "1");
            const SupplierList = vendorList.filter((item) => item.supplier === "1");
            const suppOEM = vendorList.filter((item) => item.supplier === "1" || item.OEM === "1");

            console.log(customerList)
            setVendorList(vendorList);
            setCustomerList(customerList);
            setOEMList(OEMList);
            setSupplierList(SupplierList)
            setSuppOEM(suppOEM)
            console.log(SupplierList)

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorListFetch();
    }, []);

    //

    const initialItemAddData = {
        itemMasterName: "",
        itemIMTENo: "",
        itemImage: "",
        itemType: "",
        itemRangeSize: "",
        itemRangeSizeUnit: "",
        itemMFRNo: "",
        itemLC: "",
        itemLCUnit: "",
        itemMake: "",
        itemModelNo: "",
        itemStatus: "",
        itemReceiptDate: "",
        itemDepartment: "",
        itemArea: "",
        itemPlaceOfUsage: "",
        itemCalFreInMonths: "",
        itemCalAlertDays: "",
        itemCalibrationSource: "",
        itemCalibrationDoneAt: "",
        itemItemMasterName: "",
        itemItemMasterIMTENo: [],
        itemSupplier: [],
        itemOEM: [],
        itemCalDate: "",
        itemDueDate: "",
        itemCalibratedAt: "",
        itemCertificateName: "",
        itemPartName: [],
        acceptanceCriteria: [
            {
                acAccuracyUnit: "",
                acRangeSizeUnit: "",
                acParameter: "",
                acRangeSize: "",
                acMin: "",
                acMax: "",
                acWearLimit: "",
                acAccuracy: "",
                acObservedSize: ""
            }
        ]
    }



    const [itemAddData, setItemAddData] = useState({
        itemMasterName: "",
        itemIMTENo: "",
        itemImage: "",
        itemType: "",
        itemRangeSize: "",
        itemRangeSizeUnit: "",
        itemMFRNo: "",
        itemLC: "",
        itemLCUnit: "",
        itemMake: "",
        itemModelNo: "",
        itemStatus: "",
        itemReceiptDate: "",
        itemDepartment: "",
        itemArea: "",
        itemPlaceOfUsage: "",
        itemCalFreInMonths: "",
        itemCalAlertDays: "",
        itemCalibrationSource: "",
        itemCalibrationDoneAt: "",
        itemItemMasterName: "",
        itemItemMasterIMTENo: [],
        itemSupplier: [],
        itemOEM: [],
        itemCalDate: "",
        itemDueDate: "",
        itemCalibratedAt: "",
        itemCertificateName: "",
        itemPartName: [],
        acceptanceCriteria: [
            {
                acAccuracyUnit: "",
                acRangeSizeUnit: "",
                acParameter: "",
                acRangeSize: "",
                acMin: "",
                acMax: "",
                acWearLimit: "",
                acAccuracy: "",
                acObservedSize: ""
            }
        ]
    })

    const getItemById = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddById/${id}`
            );
            console.log(response.data.result)

            setItemAddData(response.data.result)



        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getItemById();
    }, []);


    //upload Button
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleItemAddChange = (e) => {
        const { name, value } = e.target;
        if (name === "itemRangeSizeUnit") {
            setItemAddData((prev) => ({ ...prev, [name]: value, acceptanceCriteria: [{ acAccuracyUnit: value, acRangeSizeUnit: value }] }))
        }


        if (name === "itemPartName") {
            setItemAddData((prev) => ({ ...prev, itemPartName: typeof value === 'string' ? value.split(',') : value }));
        }


        setItemAddData((prev) => ({ ...prev, [name]: value }));
    }

    const [calibrationPointsData, setCalibrationPointsData] = useState([])
    const itemMasterById = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemMaster/getItemMasterById/${itemAddData.itemMasterName}`
            );
            console.log(response.data)
            const { itemType, itemDescription, itemPrefix, itemFqInMonths, calAlertInDay, wiNo, uncertainity, standartRef, itemImageName, status, itemMasterImage, workInsName, calibrationPoints } = response.data.result
            setItemAddData((prev) => ({
                ...prev,
                itemType: itemType,
                itemImage: itemMasterImage

            }))
            setCalibrationPointsData(calibrationPoints)


        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        itemMasterById();
    }, [itemAddData.itemMasterName]);

    const [partData, setPartData] = useState([])
    const getPartList = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/part/getAllParts`
            );
            console.log(response.data)
            setPartData(response.data.result)


        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPartList();
    }, [itemAddData.itemPartName]);

    console.log(itemAddData)
    console.log(calibrationPointsData)
    //

    //Acceptance Criteria
    const addACValue = () => {
        setItemAddData((prev) => ({
            ...prev,
            acceptanceCriteria: [...prev.acceptanceCriteria, {
                acParameter: "",
                acRangeSize: "",
                acRangeSizeUnit: "",
                acMin: "",
                acMax: "",
                acWearLimit: "",
                acAccuracy: "",
                acAccuracyUnit: "",
                acObservedSize: "",
            }]
        }))
    }

    const changeACValue = (index, name, value) => {

        setItemAddData((prevItemAddData) => {
            const updateAC = [...prevItemAddData.acceptanceCriteria]
            updateAC[index] = {
                ...updateAC[index], [name]: value,
            };
            return {
                ...prevItemAddData, acceptanceCriteria: updateAC,
            };
        })
    };

    const deleteAC = (index) => {
        setItemAddData((prevItemAddData) => {
            const AC = [...prevItemAddData.acceptanceCriteria]
            AC.splice(index, 1);
            return {
                ...prevItemAddData, acceptanceCriteria: AC,
            };
        })
    };
    //

    //PartCheckBox

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

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [errorhandler, setErrorHandler] = useState({});
    const [open, setOpen] = useState(false)

    const handleUpdateItemAdd = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/itemAdd/updateItemAdd/${id}`, itemAddData
            );

            setSnackBarOpen(true)

            console.log("Item Updated Successfully")
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            // setItemAddData(initialItemAddData)
            setTimeout(() => Navigate("/itemList"), 2000)
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
    };





    {/* const updateItemEditData = async (id) => {
        try {
            const response = await axios.put(
                "http://localhost:3001/itemAdd/updateItemAdd/" + id, itemAddData
            );
           
            
            setItemAddData(initialItemAddData)
            setSnackBarOpen(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            console.log("Item Update Successfully");
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
                const errorMessages500 = Object.values(errorData500);
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err);
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }

            console.log(err);
        }
    };*/}

    // const handlePartCheckBox = (event) => {
    //     const {target: { value }} = event;
    //     setItemAddData((prev) => ({ ...prev, itemPartName: typeof value === 'string' ? value.split(',') : value })
    //         // On autofill we get a stringified value.

    //     );
    // };
    //

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }

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

    const [uploadMessage, setUploadMessage] = useState("")

    const handleCertificateUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log("working")
            setItemAddData((prev) => ({ ...prev, itemCertificateName: selectedFile.name }));
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                axios.post(`${process.env.REACT_APP_PORT}/upload/itemCertificates`, formData)
                    .then(response => {
                        setUploadMessage(response.data.message)
                        console.log(response);
                    })
                    .catch(error => {
                        setUploadMessage("")
                        console.error(error);
                        // handle error here
                    });
            } catch (error) {
                console.error('Error uploading the file:', error);
            }

        }
    };

    const handleRemoveFile = () => {
        console.log("work")
        setItemAddData((prev) => ({ ...prev, itemCertificateName: "" }));
        setUploadMessage(null)
    }


    return (
        <div style={{ margin: "2rem", backgroundColor: "#f5f5f5" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Paper className='row' elevation={12} sx={{ p: 1.5, mb: 2, mx: 0 }}>
                    <div className="col-lg-5 row g-2">

                        <div className='col-9'>
                            <TextField size='small' select variant='outlined' label="Item Master" name='itemMasterName' value={itemAddData.itemMasterName} fullWidth onChange={(e) => { handleItemAddChange(e) }}>
                                <MenuItem value=""><em>Select</em></MenuItem>
                                {itemMasterDataList.map((item) => (
                                    <MenuItem value={item._id}>{item.itemDescription}</MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="col-9">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={imteList.map((item) => ({ label: item.itemIMTENo }))}
                                size='small'
                                value={itemAddData.itemIMTENo}
                                renderInput={(params) => <TextField name='itemIMTENo' onChange={handleItemAddChange}   {...params} label="IMTE No" />}
                                getOptionDisabled={option => true}
                                clearOnBlur={false}
                            // getOptionDisabled={options => true}

                            />
                        </div>
                    </div>
                    <div className="col-lg-2 " >
                        <Typography variant='h3' style={{ height: "50%", margin: "13% 0" }} className='text-center'>Item Edit</Typography>
                    </div>

                    <div className="col-lg-5 d-flex justify-content-end">
                        {itemAddData.itemImage && <Card elevation={12} sx={{ width: "110px", height: "110px" }}>

                            <img src={itemAddData.itemImage} style={{ width: "100%", height: "100%" }} />

                        </Card>}
                    </div>


                </Paper>
                <div className="row ">
                    <div className="col">
                        <Paper className='mb-2 row-md-6' elevation={12} sx={{ p: 2 }}>
                            <Typography variant='h6' className='text-center'>Item General Details</Typography>
                            <div className="row g-2 mb-2">
                                <div className="col-lg-4">
                                    <TextField size='small' select variant='outlined' onChange={handleItemAddChange} label="Item Type" name='itemType' fullWidth value={itemAddData.itemType}>
                                        <MenuItem><em>Select Type</em></MenuItem>
                                        <MenuItem value="Attribute">Attribute</MenuItem>
                                        <MenuItem value="Variable">Variable</MenuItem>
                                        <MenuItem value="Reference Standard">Reference Standard</MenuItem>

                                    </TextField>
                                </div>
                                <div className='col-lg-8 d-flex justify-content-between'>
                                    <TextField size='small' variant='outlined' label="Range/Size" onChange={handleItemAddChange} value={itemAddData.itemRangeSize} name='itemRangeSize' id='itemRangeSizeId' fullWidth />
                                    <TextField label="Unit" size='small' select value={itemAddData.itemRangeSizeUnit} onChange={(e) => {
                                        handleItemAddChange(e);
                                    }} name='itemRangeSizeUnit' id='itemRangeSizeUnitId' style={{ width: "40%" }} >
                                        <MenuItem value=''><em>None</em></MenuItem>
                                        {units.map((unit, index) => (
                                            <MenuItem key={index} value={unit.unitName}>{unit.unitName}</MenuItem>
                                        ))}
                                    </TextField>




                                </div>
                            </div>
                            <div className="row g-2">
                                <div className="col-lg-4">
                                    <TextField size='small' variant='outlined' label="MFR.Si.No." onChange={handleItemAddChange} name='itemMFRNo' value={itemAddData.itemMFRNo} id='itemMFRNoId' fullWidth />
                                </div>
                                <div className='col-lg-8 d-flex justify-content-between'>
                                    <TextField size='small' variant='outlined' name='itemLC' onChange={handleItemAddChange} id="itemLCId" value={itemAddData.itemLC} label="Least Count" fullWidth />


                                    <TextField select size='small' variant='outlined' label="Unit" name='itemLCUnit' value={itemAddData.itemLCUnit} onChange={handleItemAddChange} style={{ width: "40%" }} >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {units.map((unit, index) => (
                                            <MenuItem key={index} value={unit.unitName}>{unit.unitName}</MenuItem>
                                        ))}
                                    </TextField>

                                </div>
                                <div className="row g-1">
                                    <div className="col-lg me-1">
                                        <TextField size='small' variant='outlined' label="Make" onChange={handleItemAddChange} value={itemAddData.itemMake} name='itemMake' id='itemMakeId' fullWidth />
                                    </div>
                                    <div className="col-lg">
                                        <TextField size='small' variant='outlined' label="Model No." onChange={handleItemAddChange} value={itemAddData.itemModelNo} name='itemModelNo' id='itemModelNoId' fullWidth />
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-lg me-1">
                                        <TextField size='small' select variant='outlined' onChange={handleItemAddChange} value={itemAddData.itemStatus} label="Item Status" name='itemStatus' id='itemStatusId' fullWidth >
                                            <MenuItem value="Active">Active</MenuItem>
                                            <MenuItem value="InActive">InActive</MenuItem>
                                        </TextField>
                                    </div>
                                    <div className="col-lg">
                                        <DatePicker
                                            fullWidth
                                            id="itemReceiptDateId"
                                            name="itemReceiptDate"
                                            value={dayjs(itemAddData.itemReceiptDate)}
                                            onChange={(newValue) =>
                                                setItemAddData((prev) => ({ ...prev, itemReceiptDate: newValue.format("YYYY-MM-DD") }))
                                            }
                                            label="Master Due"
                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY" />
                                    </div>
                                </div>
                            </div>
                        </Paper>
                        <Paper elevation={12} sx={{ p: 2 }} className='row-md-6'>
                            <Typography variant='h6' className='text-center'>
                                Select Location
                            </Typography>
                            <div className="row g-1 mt-0 mb-2">
                                <div className="col me-1">
                                    <TextField value={itemAddData.itemDepartment} onChange={handleItemAddChange} size='small' select fullWidth variant='outlined' label="Department" name='itemDepartment' id='itemDepartmentId'>
                                        {departments.map((item, index) => (
                                            <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col">
                                    <TextField size='small' onChange={handleItemAddChange} value={itemAddData.itemArea} select fullWidth variant='outlined' label="Area" name='itemArea' id='itemAreaId'>
                                        {areas.map((item, index) => (
                                            <MenuItem key={index} value={item.area}>{item.area}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className='mt-2'>
                                    <TextField size='small' onChange={handleItemAddChange} value={itemAddData.itemPlaceOfUsage} select fullWidth variant='outlined' label="Place" name='itemPlaceOfUsage' id='itemPlaceOfUsageId'>
                                        {placeOfUsages.map((item, index) => (
                                            <MenuItem key={index} value={item.placeOfUsage}>{item.placeOfUsage}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                            </div>
                        </Paper>
                    </div>

















                    <Paper className='col-lg ' elevation={12} sx={{ p: 2 }}>
                        <Typography variant='h6' className='text-center'>Calibration</Typography>
                        <div className="row g-2 mb-2">
                            <div className='col-lg-6'>
                                <TextField value={itemAddData.itemCalFreInMonths} onChange={handleItemAddChange} size='small' fullWidth variant='outlined' label="Cal Frequency in months" id='itemCalFreInMonthsId' name='itemCalFreInMonths' type='number'>

                                </TextField>
                            </div>
                            <div className='col-lg-6'>
                                <TextField size='small' value={itemAddData.itemCalAlertDays} onChange={handleItemAddChange} fullWidth variant='outlined' label="Cal Alert Days" id='itemCalAlertDaysId' name='itemCalAlertDays' type='number'>

                                </TextField>
                            </div>
                            <div className='col-lg-12'>
                                <TextField size='small' value={itemAddData.itemCalibrationSource} onChange={handleItemAddChange} fullWidth variant='outlined' select label="Calibration Source" name='itemCalibrationSource'>
                                    <MenuItem value=""><em>--Select--</em></MenuItem>
                                    <MenuItem value="InHouse">InHouse</MenuItem>
                                    <MenuItem value="OutSource">OutSource</MenuItem>
                                    <MenuItem value="OEM">OEM</MenuItem>
                                </TextField>
                            </div>
                        </div>
                        {itemAddData.itemCalibrationSource === "InHouse" &&
                            <div className='row g-2'>
                                <div className="col-md-12">
                                    <TextField size='small' select fullWidth variant='outlined' onChange={handleItemAddChange} value={itemAddData.itemItemMasterName} label="Select Master" name='itemItemMasterName' >
                                        <MenuItem value=""><em>--Select--</em></MenuItem>
                                        <MenuItem value="Master1">Master1</MenuItem>
                                        <MenuItem value="Master2">Master2</MenuItem>
                                        <MenuItem value="Master3">Master3</MenuItem>
                                    </TextField>
                                </div>




                                <div className="col-md-6">
                                    <TextField size='small' fullWidth variant='outlined' select label="Master IMTE No" name='itemItemMasterIMTENo' value={itemAddData.itemItemMasterIMTENo} onChange={handleItemAddChange} >
                                        <MenuItem value=""><em>--Select--</em></MenuItem>
                                        <MenuItem value="MMT-01">MMT-01</MenuItem>
                                        <MenuItem value="MMT-02">MMT-02</MenuItem>
                                        <MenuItem value="MMT-03">MMT-03</MenuItem>
                                    </TextField>
                                </div>
                                {/*<div className="col-md-6">
                                    <DatePicker
                                        fullWidth
                                        id="itemItemMasterDueId"
                                        name="itemItemMasterDue"
                                        value={dayjs(itemAddData.itemItemMasterDue)}
                                        onChange={(newValue) =>
                                            setItemAddData((prev) => ({ ...prev, itemItemMasterDue: newValue.format("YYYY-MM-DD") }))
                                        }
                                        label="Master Due"
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                    </div>*/}



                            </div>}
                        <div className="row">
                            {itemAddData.itemCalibrationSource === "OutSource" &&

                                <div className="col-md-7">
                                    <FormControl size='small' component="div" fullWidth>
                                        <InputLabel id="itemSupplierId">Select Supplier</InputLabel>
                                        <Select
                                            labelId="itemSupplierId"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            name="itemSupplier"
                                            value={itemAddData.itemSupplier}
                                            onChange={handleItemAddChange}
                                            input={<OutlinedInput fullWidth label="Select Supplier" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                            fullWidth
                                        >
                                            {supplierList.map((name, index) => (
                                                <MenuItem key={index} value={name.aliasName}>
                                                    <Checkbox checked={itemAddData.itemSupplier.indexOf(name.aliasName) > -1} />
                                                    <ListItemText primary={name.aliasName} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>}






                            {itemAddData.itemCalibrationSource === "OEM" &&

                                <div className="col-md-7">
                                    <FormControl size='small' component="div" fullWidth>
                                        <InputLabel id="itemOEMId">Select Supplier</InputLabel>
                                        <Select
                                            labelId="itemOEMId"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            name="itemOEM"
                                            value={itemAddData.itemOEM}
                                            onChange={handleItemAddChange}
                                            input={<OutlinedInput fullWidth label="Select Supplier" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                            fullWidth
                                        >
                                            {OEMList.map((name) => (
                                                <MenuItem key={name} value={name.aliasName}>
                                                    <Checkbox checked={itemAddData.itemOEM.indexOf(name.aliasName) > -1} />
                                                    <ListItemText primary={name.aliasName} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>

                            }

                            {(itemAddData.itemCalibrationSource === "OEM" || itemAddData.itemCalibrationSource === "OutSource") &&

                                <RadioGroup
                                    className="col-md-5 d-flex justify-content-center"
                                    row
                                    name='itemCalibrationDoneAt'
                                    onChange={handleItemAddChange}

                                >
                                    <FormControlLabel value="Lab" checked={itemAddData.itemCalibrationDoneAt === "Lab"} control={<Radio />} label="Lab" />
                                    <FormControlLabel value="Site" checked={itemAddData.itemCalibrationDoneAt === "Site"} control={<Radio />} label="Site" />
                                </RadioGroup>
                            }
                        </div>

                        {/* 
                            {itemAddData.itemCalibrationSource === "OEM" || itemAddData.itemCalibrationSource === "OEM" && 
                            } */}

                        {itemAddData.itemCalibrationSource === "InHouse" && Array.isArray(itemAddData.itemItemMasterName) && (
                            <table className='table table-sm table-bordered text-center mt-2'>
                                <tbody>
                                    <tr>
                                        <th style={{ width: "20%" }}>Si No</th>
                                        <th style={{ width: "50%" }}>Master Name</th>
                                        <th style={{ width: "30%" }}>Due</th>
                                    </tr>
                                    
                                        <tr >
                                            <td></td>
                                            <td></td>
                                        </tr>
                                   
                                </tbody>
                            </table>
                        )}
                        {itemAddData.itemCalibrationSource === "OutSource" && <table className='table table-sm table-bordered text-center mt-2'>
                            <tbody>
                                <tr>
                                    <th style={{ width: "20%" }}>Si No</th>
                                    <th style={{ width: "80%" }}>Supplier</th>

                                </tr>
                                {itemAddData.itemSupplier.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td >{item}</td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>}
                        {itemAddData.itemCalibrationSource === "OEM" && <table className='table table-sm table-bordered text-center mt-2'>
                            <tbody>
                                <tr>
                                    <th style={{ width: "20%" }}>Si No</th>
                                    <th style={{ width: "80%" }}>OEM</th>

                                </tr>
                                {itemAddData.itemOEM.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td >{item}</td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>}

                    </Paper>
                    <div className="col">
                        <Paper className='row-md-6' elevation={12} sx={{ p: 2, }}>
                            <Typography variant='h6' className='text-center'>Enter Previous Calibration Data</Typography>
                            <div className="row g-2">
                                <div className="col-lg-6">
                                    <DatePicker
                                        disableFuture
                                        fullWidth
                                        id="dobId"
                                        name=""
                                        value={dayjs(itemAddData.itemCalDate)}
                                        onChange={(newValue) =>
                                            setItemAddData((prev) => ({ ...prev, itemCalDate: newValue.format("YYYY-MM-DD") }))
                                        }
                                        label="Calibration Date"

                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>
                                <div className="col-md-6">
                                    <DatePicker
                                        disableFuture
                                        fullWidth
                                        id="itemDueDateId"
                                        name="itemDueDate"
                                        value={dayjs(itemAddData.itemDueDate)}
                                        onChange={(newValue) =>
                                            setItemAddData((prev) => ({ ...prev, itemDueDate: newValue.format("YYYY-MM-DD") }))
                                        }
                                        label="Due Date"

                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>
                                <div className="col-lg-12">
                                    <TextField size='small' fullWidth variant='outlined' value={itemAddData.itemCalibratedAt} onChange={handleItemAddChange} label="Calibrated at" select name='itemCalibratedAt'>
                                        <MenuItem value="InHouse">InHouse</MenuItem>
                                        {suppOEM.map((item, index) => (
                                            <MenuItem key={index} value={item.fullName}>{item.aliasName}</MenuItem>
                                        ))}

                                    </TextField>
                                </div>
                                <div className="col-lg-6">
                                    <Button component="label" variant="contained" fullWidth >
                                        Certificate Upload
                                        <VisuallyHiddenInput type="file" onChange={handleCertificateUpload} />
                                    </Button>
                                </div>
                                {itemAddData.itemCertificateName !== "" && <div className='d-flex justif-content-end col-md-6 '>
                                            <Chip component={Link} clickable={true} label={itemAddData.itemCertificateName}  color='warning' target='_blank' to={`${process.env.REACT_APP_PORT}/itemCertificates/${itemAddData.itemCertificateName}`}></Chip>
                                            <Button size='small'  onClick={handleRemoveFile}><Delete color='error'/></Button>
                                        </div>}
                               
                                {itemAddData.itemCertificateName !== "" &&
                                    <div className="col-md-12 d-flex justify-content-between">
                                        

                                        {uploadMessage && <Chip label={uploadMessage}  color="success" icon={<Done />} />}
                                       
                                    </div>}

                            </div>

                        </Paper >
                        <Paper className='row-6-lg' elevation={12} sx={{ p: 2, mt: 2, height: "inherit" }} >

                            <h5 className='text-center'>Part</h5>
                            <div className="row">
                                <div className="col-md-12">
                                    <FormControl sx={{ m: 1 }} fullWidth>
                                        <InputLabel id="demo-multiple-chip-label">Select Part</InputLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple

                                            value={itemAddData.itemPartName}
                                            onChange={handleItemAddChange}
                                            input={<OutlinedInput id="select-multiple-chip" label="Select Part" name='itemPartName' />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {partData.map((name, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={name.partName}
                                                // style={getStyles(name, personName, theme)}
                                                >
                                                    {name.partName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>





                            </div>
                        </Paper>
                    </div>
                    <Paper sx={{ m: 2, p: 2 }} elevation={12}>
                        <div className="d-flex justify-content-between mb-2">
                            <h6 className='h5 text-center'>Acceptance Criteria</h6>
                            <Button variant='contained' onClick={() => addACValue()}>Add</Button>
                        </div>

                        <table className='table table-sm table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Range/Size</th>
                                    <th>Unit</th>
                                    <th>Min</th>
                                    <th>Max</th>
                                    <th>WearLimit</th>
                                    <th>Accuracy</th>
                                    <th>Unit</th>
                                    <th>Observed Size</th>
                                    <th>Delete</th>
                                </tr>
                                {itemAddData.acceptanceCriteria ? itemAddData.acceptanceCriteria.map((item, index) => (
                                    <tr>
                                        <td><select className='form-select form-select-sm' id="acParameterId" name="acParameter" value={item.acParameter} onChange={(e) => changeACValue(index, e.target.name, e.target.value)}>
                                            <option value="">-Select-</option>
                                            {calibrationPointsData.map((item) => (
                                                <option>{item.calibrationPoint}</option>
                                            ))}
                                        </select></td>
                                        <td><input type="text" className='form-control form-control-sm' id="acRangeSizeId" name="acRangeSize" value={item.acRangeSize} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>


                                        <td> <select className="form-select form-select-sm" id="acRangeSizeUnitId" name="acRangeSizeUnit" value={item.acRangeSizeUnit} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} >
                                            <option value="">-Select-</option>
                                            {units.map((item, index) => (
                                                <option key={index} value={item.unitName}>{item.unitName}</option>
                                            ))}



                                        </select></td>
                                        <td><input type="text" className="form-control form-control-sm" id="acMinId" name="acMin" value={item.acMin} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>

                                        <td><input type="text" className='form-control form-control-sm' id="acMaxId" name="acMax" value={item.acMax} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>

                                        <td><input type="text" className="form-control form-control-sm" id="acWearLimitId" name="acWearLimit" value={item.acWearLimit} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>

                                        <td><input type="text" className="form-control form-control-sm" id="acAccuracyId" name="acAccuracy" value={item.acAccuracy} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                        <td> <select className="form-select form-select-sm" id="acAccuracyUnitId" name="acAccuracyUnit" value={item.acAccuracyUnit} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} >
                                            <option value="">-Select-</option>
                                            {units.map((item, index) => (
                                                <option key={index} value={item.unitName}>{item.unitName}</option>
                                            ))}

                                        </select></td>
                                        <td><input type="text" className="form-control form-control-sm" id="acObservedSizeId" name="acObservedSize" value={item.acObservedSize} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                        <td><Button color='error' onClick={deleteAC}><Delete /></Button></td>

                                    </tr>
                                )) : <tr></tr>}
                            </tbody>
                        </table>
                    </Paper>
                    <div className="d-flex justify-content-end">
                        <Button component={Link} to="/itemList" variant='contained' className='me-3' startIcon={<ArrowBack />}>
                            Back to List
                        </Button>

                        <Button startIcon={<Edit />} variant='contained' color='warning' onClick={() => setOpen(true)} className='me-3' type='button'>
                            Update
                        </Button>
                        <Button variant='contained' color='error' type="cancel">
                            Cancel
                        </Button>
                    </div>


                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '25%' }}>
                            {errorhandler.message}
                        </Alert>
                    </Snackbar>
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Item update confirmation"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure to Update an Item
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={(e) => { handleUpdateItemAdd(e); setOpen(false); }} autoFocus>
                                Update
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>







            </LocalizationProvider >

        </div >
    )
}

export default ItemAdd