import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import BorderColor from '@mui/icons-material/BorderColor';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Delete, Done } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Add, Remove, HighlightOffRounded } from '@mui/icons-material';



const ItemEdit = () => {

    const { id } = useParams()
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


    const [itemMasterDistNames, setItemMasterDistNames] = useState([])
    const [itemMasterListByName, setItemMasterListByName] = useState([])



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
        itemMasterRef: "",
        itemAddMasterName: "",
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
        itemStatus: "Active",
        itemReceiptDate: dayjs().format("YYYY-MM-DD"),
        itemDepartment: "",
        itemArea: "N/A",
        itemPlaceOfUsage: "N/A",
        itemCalFreInMonths: "",
        itemCalAlertDays: "",
        itemCalibrationSource: "",
        itemCalibrationDoneAt: "",
        itemItemMasterName: "",
        itemItemMasterIMTENo: [],
        itemSupplier: [],
        itemOEM: [],
        itemCalDate: dayjs().format("YYYY-MM-DD"),
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
                acPsMin: "",
                acPsMax: "",
                acPsWearLimit: "",
                acAccuracy: "",
                acObservedSize: ""
            }
        ]
    }


    const [itemAddData, setItemAddData] = useState({
        itemMasterRef: "",
        itemAddMasterName: "",
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
        itemStatus: "Active",
        itemReceiptDate: dayjs().format("YYYY-MM-DD"),
        itemDepartment: "",
        itemArea: "N/A",
        itemPlaceOfUsage: "N/A",
        itemCalFreInMonths: "",
        itemCalAlertDays: "",
        itemCalibrationSource: "",
        itemCalibrationDoneAt: "",
        itemItemMasterName: "",
        itemItemMasterIMTENo: [],
        itemSupplier: [],
        itemOEM: [],
        itemCalDate: dayjs().format("YYYY-MM-DD"),
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
                acPsMin: "",
                acPsMax: "",
                acPsWearLimit: "",
                acAccuracy: "",
                acObservedSize: ""
            }
        ]
    })

    //

    const handleKeyDown = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === 'itemMake'
            ? value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : value;
        setItemAddData((prev) => ({ ...prev, [name]: formattedValue }));

    };

    //


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

    useEffect(() => {
        getItemDataById();
    }, [])
    const getItemDataById = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddById/${id}`
            );
            setItemAddData(response.data.result)
            console.log(response)

        } catch (err) {
            console.log(err);
        }
    };

    const handleItemAddChange = (e) => {

        const { name, value } = e.target;
        if (name === "itemRangeSizeUnit") {
            setItemAddData((prev) => ({ ...prev, [name]: value, acceptanceCriteria: [{ acAccuracyUnit: value, acRangeSizeUnit: value }] }))
        }


        if (name === "itemPartName") {
            setItemAddData((prev) => ({ ...prev, itemPartName: value }));
        }
        if (name === "itemItemMasterIMTENo") {
            setItemAddData((prev) => ({ ...prev, itemItemMasterIMTENo: value }));
        }
        if (name === "itemCalibrationSource") {
            if (value === "InHouse") {
                console.log("InHouse")
                setItemAddData((prev) => ({ ...prev, itemSupplier: [], itemOEM: [] }));
            }
            if (value === "OutSource") {
                console.log("OutSource")
                setItemAddData((prev) => ({ ...prev, itemItemMasterIMTENo: [], itemOEM: [] }));
            }
            if (value === "OEM") {
                console.log("OEM")
                setItemAddData((prev) => ({ ...prev, itemItemMasterIMTENo: [], itemSupplier: [] }));
            }


        }
        if (name === "itemItemMasterName") {
            setItemAddData((prev) => ({ ...prev, itemItemMasterName: value }));
        }
        if (name === "itemSupplier") {
            setItemAddData((prev) => ({ ...prev, itemSupplier: typeof value === 'string' ? value.split(',') : value }));
        }
        if (name === "itemOEM") {
            // Map selected names back to corresponding objects
            setItemAddData((prev) => ({ ...prev, itemOEM: typeof value === 'string' ? value.split(',') : value }));
        }



        setItemAddData((prev) => ({ ...prev, [name]: value }));
    }

    const handleItemDue = (e) => {
        const { name, value } = e.target;
        if (name === "calibrationDate") {
            setItemAddData((prev) => ({ ...prev, itemCalFreInMonths: typeof value === 'string' ? value.split(',') : value }));
        }

    }

    let dueDates = new Date();
    const frequencyMonths = 6;
    let newDueDate = new Date(dueDates);
    newDueDate.setMonth(newDueDate.getMonth() + frequencyMonths);
    newDueDate.setDate(newDueDate.getDate() - 1);
    console.log(dueDates.toDateString());


    ///
    const currentDate = new Date();

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const calibrationFrequencyMonths = 12;
    let dueDate = new Date(currentYear, currentMonth + calibrationFrequencyMonths, currentDay);

    if ((currentDate.getDate() !== dueDate.getDate()) || (currentDate.getMonth() !== dueDate.getMonth())) {

        dueDate = new Date(currentYear, currentMonth + calibrationFrequencyMonths + 1, 0);
    }
    console.log(dueDate)





    const [calibrationPointsData, setCalibrationPointsData] = useState([])
    const itemMasterById = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemMaster/getItemMasterById/${itemAddData.itemMasterRef}`
            );
            console.log(response.data)
            const { _id, itemType, itemDescription, itemPrefix, itemFqInMonths, calAlertInDay, wiNo, uncertainity, standartRef, itemImageName, status, itemMasterImage, workInsName, calibrationPoints } = response.data.result
            setItemAddData((prev) => ({
                ...prev,
                itemType: itemType,
                itemImage: itemMasterImage,
                itemAddMasterName: itemDescription,
                itemCalFreInMonths: itemFqInMonths,
                itemCalAlertDays: calAlertInDay



            }))
            setCalibrationPointsData(calibrationPoints)


        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        itemMasterById();
    }, [itemAddData.itemMasterRef]);

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
    }, []);


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
                acPsMin: "",
                acPsMax: "",
                acPsWearLimit: "",
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

    const navigate = useNavigate();




    const updateItemData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/itemAdd/updateItemAdd/${id}`, itemAddData
            );

            setSnackBarOpen(true)

            console.log("Item Update Successfully")
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            setItemAddData(initialItemAddData)
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
    };

    const [uploadMessage, setUploadMessage] = useState("")

    const handleCertificateUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log("working")
            setItemAddData((prev) => ({ ...prev, itemCertificateName: selectedFile.name }));
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                axios.post(`${process.env.REACT_APP_PORT}/upload/workInstructions`, formData)
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

    const handleRemoveFile = () => {
        setItemAddData((prev) => ({ ...prev, itemCertificateData: "" }));
        setUploadMessage(null)
    }

    const getItemMasterByName = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByName`, { itemItemMasterName: itemAddData.itemItemMasterName }

            );

            console.log(response.data)
            setItemMasterListByName(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (itemAddData.itemItemMasterName) {
            getItemMasterByName();
        }

    }, [itemAddData.itemItemMasterName]);



    useEffect(() => {
        calculateResultDate(itemAddData.itemCalDate, itemAddData.itemCalFreInMonths);
    }, [itemAddData.itemCalDate, itemAddData.itemCalFreInMonths]);



    const calculateResultDate = (itemCalDate, itemCalFreInMonths) => {
        const parsedDate = dayjs(itemCalDate);
        if (parsedDate.isValid() && !isNaN(parseInt(itemCalFreInMonths))) {
            const calculatedDate = parsedDate.add(parseInt(itemCalFreInMonths, 10), 'month').subtract(1, 'day');
            setItemAddData((prev) => ({
                ...prev,
                itemDueDate: calculatedDate.format('YYYY-MM-DD'),
            }));
        }
    };

    return (
        <div style={{ margin: "2rem", backgroundColor: "#f5f5f5" }}>
            <form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Paper className='row' elevation={12} sx={{ p: 1.5, mb: 2, mx: 0 }}>
                        <div className="col-lg-5 row g-2">

                            <div className='col-9'>
                                <TextField size='small' select variant='outlined' label="Item Master" name='itemMasterRef' value={itemAddData.itemMasterRef} fullWidth onChange={handleItemAddChange}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    {itemMasterDataList.map((item) => (
                                        <MenuItem value={item._id}>{item.itemDescription}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-9">
                                <Autocomplete
                                    disablePortal
                                    id="itemIMTENoId"
                                    value={itemAddData.itemIMTENo}
                                    options={imteList.map((item) => ({ label: item.itemIMTENo }))}
                                    size='small'
                                    renderInput={(params) => <TextField name='itemIMTENo' onChange={handleItemAddChange}  {...params} label="IMTE No" />}
                                    getOptionDisabled={option => true}
                                    clearOnBlur={false}
                                //getOptionDisabled={options => true}

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
                                        <TextField size='small' select variant='outlined' onChange={handleItemAddChange} label="Item Type" name='itemType' fullWidth value={itemAddData.itemType || ""}>
                                            <MenuItem><em>Select Type</em></MenuItem>
                                            <MenuItem value="Attribute">Attribute</MenuItem>
                                            <MenuItem value="Variable">Variable</MenuItem>
                                            <MenuItem value="Reference Standard">Reference Standard</MenuItem>

                                        </TextField>
                                    </div>
                                    <div className='col-lg-8 d-flex justify-content-between'>
                                        <TextField size='small' variant='outlined' label="Range/Size" onChange={handleItemAddChange} name='itemRangeSize' value={itemAddData.itemRangeSize} id='itemRangeSizeId' fullWidth />
                                        <TextField label="Unit" size='small' select onChange={(e) => {
                                            handleItemAddChange(e);
                                        }} name='itemRangeSizeUnit' id='itemRangeSizeUnitId' value={itemAddData.itemRangeSizeUnit} style={{ width: "40%" }} >
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


                                        <TextField select size='small' variant='outlined' label="Unit" name='itemLCUnit' onChange={handleItemAddChange} value={itemAddData.itemLCUnit} style={{ width: "40%" }} >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {units.map((unit, index) => (
                                                <MenuItem key={index} value={unit.unitName}>{unit.unitName}</MenuItem>
                                            ))}
                                        </TextField>

                                    </div>
                                    <div className="row g-1">
                                        <div className="col-lg me-1">
                                            <TextField size='small' variant='outlined' label="Make" value={itemAddData.itemMake} onChange={handleItemAddChange} onKeyDown={handleKeyDown} name='itemMake' id='itemMakeId' fullWidth />
                                        </div>
                                        <div className="col-lg">
                                            <TextField size='small' variant='outlined' label="Model No." onChange={handleItemAddChange} value={itemAddData.itemModelNo} name='itemModelNo' id='itemModelNoId' fullWidth />
                                        </div>
                                    </div>
                                    <div className="row g-1">
                                        <div className="col-lg me-1">
                                            <TextField size='small' select variant='outlined' value={itemAddData.itemStatus} onChange={handleItemAddChange} label="Item Status" name='itemStatus' id='itemStatusId' fullWidth >
                                                <MenuItem value="Active">Active</MenuItem>
                                                <MenuItem value="Spara">Spara</MenuItem>
                                                <MenuItem value="Breakdown">Breakdown</MenuItem>
                                                <MenuItem value="Missing">Missing</MenuItem>
                                                <MenuItem value="Rejection">Rejection</MenuItem>
                                            </TextField>
                                        </div>
                                        <div className="col-lg">
                                            <DatePicker
                                                fullWidth
                                                id="itemReceiptDateId"
                                                name="itemReceiptDate"
                                                value={dayjs(itemAddData.itemReceiptDate)}
                                                onChange={(newValue) =>
                                                    setItemAddData((prev) => ({ ...prev, itemReceiptDate: newValue.format("DD-MM-YYYY") }))
                                                }
                                                label="Item Receipt Date"
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
                                    <h6 className='text-center'>Enter Master Details</h6>
                                    <div className="col-md-12">
                                        <TextField size='small' select fullWidth variant='outlined' onChange={handleItemAddChange} label="Select Master" value={itemAddData.itemItemMasterName} name='itemItemMasterName' >
                                            <MenuItem value=""><em>--Select--</em></MenuItem>
                                            {itemMasterDistNames.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))}
                                        </TextField>
                                    </div>




                                    <div className="col-md-12">
                                        <FormControl size='small' component="div" fullWidth>
                                            <InputLabel id="itemItemMasterIMTENoId">Select IMTENo.</InputLabel>
                                            <Select
                                                labelId="itemItemMasterIMTENoId"

                                                multiple
                                                name="itemItemMasterIMTENo"
                                                value={itemAddData.itemItemMasterIMTENo}
                                                onChange={handleItemAddChange}
                                                input={<OutlinedInput fullWidth label="Select IMTE No" />}
                                                renderValue={(selected) => selected.map(item => item.itemIMTENo).join(", ")}
                                                MenuProps={MenuProps}
                                                fullWidth
                                            >
                                                {itemMasterListByName.map((name, index) => (
                                                    <MenuItem key={index} value={name}>
                                                        <Checkbox checked={itemAddData.itemItemMasterIMTENo.indexOf(name) > -1} />
                                                        <ListItemText primary={name.itemIMTENo} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>



                                </div>}
                            {itemAddData.itemCalibrationSource === "OutSource" &&
                                <div className='row g-2'>
                                    <h6 className='text-center'>Enter Supplier Details</h6>
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
                                    </div>


                                    <RadioGroup
                                        className="col-md-5 d-flex justify-content-center"
                                        row
                                        name='itemCalibrationDoneAt'
                                        onChange={handleItemAddChange}
                                        checked={itemAddData.itemCalibrationDoneAt}
                                    >
                                        <FormControlLabel value="Lab" control={<Radio />} label="Lab" />
                                        <FormControlLabel value="Site" control={<Radio />} label="Site" />
                                    </RadioGroup>



                                </div>}

                            {itemAddData.itemCalibrationSource === "OEM" &&
                                <div className='row g-2'>
                                    <h6 className='text-center'>Enter OEM Details</h6>
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
                                    <RadioGroup
                                        className="col-md-5 d-flex justify-content-center"
                                        row
                                        name='itemCalibrationDoneAt'
                                        onChange={handleItemAddChange}

                                    >
                                        <FormControlLabel value="Lab" control={<Radio />} label="Lab" />
                                        <FormControlLabel value="Site" control={<Radio />} label="Site" />
                                    </RadioGroup>



                                </div>}

                            {itemAddData.itemCalibrationSource === "InHouse" && <table className='table table-sm table-bordered text-center mt-2'>
                                <tbody>
                                    <tr>
                                        <th style={{ width: "20%" }}>Si No</th>
                                        <th style={{ width: "50%" }}>Master Name</th>
                                        <th style={{ width: "30%" }}>Due</th>
                                    </tr>
                                    {itemAddData.itemItemMasterIMTENo.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.itemIMTENo}</td>
                                            <td>{item.itemDueDate}</td>
                                        </tr>
                                    ))

                                    }


                                </tbody>
                            </table>}
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

                                            fullWidth
                                            id="itemCalDateId"
                                            name="itemCalDate"
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
                                        <TextField size='small' fullWidth variant='outlined' onChange={handleItemAddChange} label="Calibrated at" value={itemAddData.itemCalibratedAt} select name='itemCalibratedAt'>
                                            <MenuItem value="InHouse">InHouse</MenuItem>
                                            {suppOEM.map((item, index) => (
                                                <MenuItem key={index} value={item.fullName}>{item.aliasName}</MenuItem>
                                            ))}

                                        </TextField>
                                    </div>
                                    <div className="col-lg-12">
                                        <Button component="label" value={itemAddData.itemCertificateName} variant="contained" fullWidth >

                                            Certificate Upload
                                            <VisuallyHiddenInput type="file" onChange={handleCertificateUpload} />
                                            <button type='button' style={{ display: "none" }} value={itemAddData.itemCertificateName}>Select File</button>
                                        </Button>
                                    </div>

                                    {itemAddData.itemCertificateName &&
                                        <div className="col-md-7 d-flex justify-content-between">
                                            <Chip label={itemAddData.itemCertificateName} size='small' component="a" href={`${process.env.REACT_APP_PORT}/workInstructions/${itemAddData.itemCertificateName}`} target="_blank" clickable={true} color="primary" />
                                            <HighlightOffRounded type="button" onClick={() => handleRemoveFile()} />
                                            {uploadMessage &&
                                                <Chip label={uploadMessage} size='small' color="success" icon={<Done />} />}
                                        </div>}



                                </div>

                            </Paper >
                            <Paper className='row-6-lg' elevation={12} sx={{ p: 2, mt: 2, height: "inherit" }} >

                                <h5 className='text-center'>Part</h5>
                                <div className="row">
                                    <div className="col-md-12">
                                        <FormControl size='small' component="div" fullWidth>
                                            <InputLabel id="itemPartNameId">Select Part</InputLabel>
                                            <Select
                                                labelId="itemPartNameId"

                                                multiple
                                                name="itemPartName"
                                                value={itemAddData.itemPartName}
                                                onChange={handleItemAddChange}
                                                input={<OutlinedInput fullWidth label="Select Part" />}
                                                renderValue={(selected) => selected.map(item => item.partName).join(", ")}
                                                MenuProps={MenuProps}
                                                fullWidth
                                            >
                                                {partData.map((name, index) => (
                                                    <MenuItem key={index} value={name}>
                                                        <Checkbox checked={itemAddData.itemPartName} />
                                                        <ListItemText primary={name.partName} />
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

                            <table className='table table-sm table-bordered text-center'>
                                <tbody>
                                    <tr>
                                        <th>Parameter</th>
                                        <th>Range/Size</th>
                                        <th>Unit</th>
                                        {itemAddData.itemType === "Attribute" && <th colspan="3">Permissible Size</th>}
                                        {/*{itemAddData.itemType === "Attribute" && <th>Min</th>}
                                        {itemAddData.itemType === "Attribute" && <th>Max</th>}
                                                {itemAddData.itemType === "Attribute" && <th>WearLimit</th>}*/}
                                        {/*{itemAddData.itemType === "Attribute" && <th>Unit</th>}*/}
                                        {itemAddData.itemType === "Attribute" && <th colspan="2">Observed size</th>}



                                        {itemAddData.itemType === "Variable" && <th>Accuracy(+ & -)</th>}
                                        {itemAddData.itemType === "Variable" && <th>Unit</th>}
                                        {itemAddData.itemType === "Variable" && <th>Observed Error</th>}





                                        {itemAddData.itemType === "Reference Standard" && <th>Accuracy(+ & -)</th>}
                                        {itemAddData.itemType === "Reference Standard" && <th>Unit</th>}

                                        {itemAddData.itemType === "Reference Standard" && <th colspan="2">Observed size</th>}
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
                                            {itemAddData.itemType === "Attribute" && <td><input type="text" className="form-control form-control-sm" id="acPsMinId" name="acPsMin" placeholder='min' value={item.acPsMin} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}

                                            {itemAddData.itemType === "Attribute" && <td><input type="text" className='form-control form-control-sm' id="acPsMaxId" name="acPsMax" placeholder='max' value={item.acPsMax} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}

                                            {itemAddData.itemType === "Attribute" && <td><input type="text" className="form-control form-control-sm" id="acPsWearLimitId" name="acPsWearLimit" placeholder='wearLimit' value={item.acPsWearLimit} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}
                                            {itemAddData.itemType === "Attribute" && <td><input type="text" className="form-control form-control-sm" id="acMinId" name="acMin" placeholder='min' value={item.acMin} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}
                                            {itemAddData.itemType === "Attribute" && <td><input type="text" className='form-control form-control-sm' id="acMaxId" name="acMax" placeholder='max' value={item.acMax} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}
                                            {itemAddData.itemType === "Variable" && <td><input type="text" className="form-control form-control-sm" id="acAccuracyId" name="acAccuracy" value={item.acAccuracy} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}

                                            {itemAddData.itemType === "Variable" && <td> <select className="form-select form-select-sm" id="acAccuracyUnitId" name="acAccuracyUnit" value={item.acAccuracyUnit} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} >
                                                <option value="">-Select-</option>
                                                {units.map((item, index) => (
                                                    <option key={index} value={item.unitName}>{item.unitName}</option>
                                                ))}

                                            </select></td>}
                                            {itemAddData.itemType === "Variable" && <td><input type="text" className="form-control form-control-sm" id="acObservedSizeId" name="acObservedSize" value={item.acObservedSize} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}

                                            {itemAddData.itemType === "Reference Standard" && <td><input type="text" className="form-control form-control-sm" id="acAccuracyId" name="acAccuracy" value={item.acAccuracy} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}
                                            {itemAddData.itemType === "Reference Standard" && <td> <select className="form-select form-select-sm" id="acAccuracyUnitId" name="acAccuracyUnit" value={item.acAccuracyUnit} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} >
                                                <option value="">-Select-</option>
                                                {units.map((item, index) => (
                                                    <option key={index} value={item.unitName}>{item.unitName}</option>
                                                ))}

                                            </select></td>}

                                            {itemAddData.itemType === "Reference Standard" && <td><input type="text" className="form-control form-control-sm" id="acMinId" name="acMin" placeholder='min' value={item.acMin} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}

                                            {itemAddData.itemType === "Reference Standard" && <td><input type="text" className='form-control form-control-sm' id="acMaxId" name="acMax" placeholder='max' value={item.acMax} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}


                                            <td><Button color='error' onClick={deleteAC}><Delete /></Button></td>

                                        </tr>
                                    )) : <tr></tr>}
                                </tbody>
                            </table>
                        </Paper>
                        <div className="d-flex justify-content-end">

                            <Button variant='contained' color='warning' onClick={() => { setOpen(true) }} className='me-3' type="button"  >
                                <BorderColor />  Update
                            </Button>
                            <Button variant='contained' component={RouterLink} to={`/itemList/`} color='error' onClick={() => setItemAddData(initialItemAddData)} type="reset">
                                <ArrowBackIcon /> Back To List
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
                                {"Item Update confirmation"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure to Update an Item
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)}>Cancel</Button>
                                <Button type="button" onClick={(e) => { updateItemData(e); setOpen(false); }} autoFocus>
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>







                </LocalizationProvider >
            </form>
        </div >
    )
}

export default ItemEdit