import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Delete, Done } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Add, Remove, HighlightOffRounded, UploadFile } from '@mui/icons-material';
import { Link } from '@mui/material';
import { useEmployee } from '../../App';

const ItemAdd = () => {

    // Units Data

    const employeeRole = useEmployee();

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
            const defaultDepartment = response.data.result.filter((dep) => dep.defaultdep === "yes")
            setDepartments(defaultDepartment);

            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        DepartmentFetch()
    }, []);

    const [filteredData, setFilteredData] = useState([])







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
    const [itemMasterDataList, setItemMasterDataList] = useState([]);
    const [distinctNamesArray, setDistinctNamesArray] = useState([]);

    const itemMasterFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemMaster/getAllItemMasters`

            );

            console.log(response.data)
            const masterItems = response.data.result.filter((item) => item.isItemMaster === "1")
            setItemMasterDataList(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const distinctNamesSet = new Set(itemMasterDataList.map(item => item.itemAddMasterName));

        // Convert the Set back to an array
        const distinctNamesArray = [...distinctNamesSet];

        // Sort the array
        distinctNamesArray.sort();

        console.log(distinctNamesArray);

        const names = [...new Set(distinctNamesSet)]
        setDistinctNamesArray(names)
        itemMasterFetchData();
    }, []);








    // const itemMasterFetchData = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${process.env.REACT_APP_PORT}/itemMaster/getAllItemMasters`

    //         );

    //         console.log(response.data)
    //         const masterItems = response.data.result.filter((item) => item.isItemMaster === "1")
    //         setItemMasterDataList(response.data.result);

    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // useEffect(() => {
    //     const distinctNamesSet = new Set(itemMasterDataList.map(item => item.itemAddMasterName));

    //     // Convert the Set back to an array
    //     const distinctNamesArray = [...distinctNamesSet];

    //     // Sort the array
    //     distinctNamesArray.sort();

    //     console.log(distinctNamesArray);
    //     itemMasterFetchData();
    // }, []);






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


    const [isSelectType, setIsSelectType] = useState(true);


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

    const [selectedValues, setSelectedValues] = useState([]);

    const handleSelectChange = (e, index) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);

        setSelectedValues(selectedOptions);
    };



    const [itemAddData, setItemAddData] = useState({
        itemMasterRef: "",
        selectedItemMaster: [],
        isItemMaster: "0",
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
        itemStatus: "active",
        itemReceiptDate: dayjs().format("YYYY-MM-DD"),
        itemDepartment: "",
        itemCurrentLocation: "",
        itemArea: "N/A",
        itemPlaceOfUsage: "N/A",
        itemCalFreInMonths: "",
        itemCalAlertDays: "",
        itemCalibrationSource: "",
        itemCalibrationDoneAt: "",
        itemItemMasterName: "",
        itemItemMasterIMTENo: [],
        itemSupplier: [],
        itemLocation: "department",
        itemOEM: [],
        itemCalDate: dayjs().format("YYYY-MM-DD"),
        itemDueDate: "",
        itemCalibratedAt: "",
        itemCertificateName: "",
        itemCertificateNo: "",
        itemPartName: [],
        itemOBType: "average",
        acceptanceCriteria: [
            {
                acParameter: "",
                acNominalSize: "",
                acNominalSizeUnit: "",
                acMinPS: "",
                acMaxPS: "",
                acWearLimitPS: "",
                acMinOB: "",
                acMaxOB: "",
                acAverageOB: "",
                acOBError: "",
                acMinPSError: "",
                acMaxPSError: "",
            }
        ],
        itemUncertainity: "",
        itemUncertainityUnit: "",
        itemPrevCalData: "",
        itemPlant: "",
        itemCreatedBy: employeeRole && employeeRole.loggedEmp._id,
    })

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



    const handleKeyDown = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === 'itemMake'
            ? value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : value;
        setItemAddData((prev) => ({ ...prev, [name]: formattedValue }));

    };



    const handleItemAddChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "itemRangeSizeUnit") {
            setItemAddData((prev) => ({ ...prev, [name]: value, acceptanceCriteria: [{ acAccuracyUnit: value, acRangeSizeUnit: value }] }))
        }

        if (name === "itemDepartment") {
            setItemAddData((prev) => ({ ...prev, [name]: value, itemCurrentLocation: value }));
        }
        if (name === "itemCalibrationSource") {
            if (value === "inhouse") {
                console.log("inhouse")
                setItemAddData((prev) => ({ ...prev, itemSupplier: [], itemOEM: [] }));
            }
            if (value === "outsource") {
                console.log("outsource")
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


        if (name === "itemPartName") {
            console.log(value)
            setItemAddData((prev) => ({ ...prev, itemPartName: typeof value === 'string' ? value.split(',') : value }));
        }
        if (name === "itemItemMasterIMTENo") {
            console.log(value)
            setItemAddData((prev) => ({ ...prev, itemItemMasterIMTENo: typeof value === 'string' ? value.split(',') : value }));
        }

        if (name === "itemSupplier") {
            setItemAddData((prev) => ({ ...prev, itemSupplier: typeof value === 'string' ? value.split(',') : value }));
        }
        if (name === "itemOEM") {
            // Map selected names back to corresponding objects
            setItemAddData((prev) => ({ ...prev, itemOEM: typeof value === 'string' ? value.split(',') : value }));
        }

        setItemAddData((prev) => ({ ...prev, [name]: value }));

        if (name === "isItemMaster") {
            setItemAddData((prev) => ({
                ...prev,
                [name]: checked ? "1" : "0"
            }));
        }
        if (name == "itemOBType") {
            setItemAddData((prev) => ({
                ...prev,
                [name]: value
            }));
            console.log("working")
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
                itemCalAlertDays: calAlertInDay,
                selectedItemMaster: response.data.result
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
                acNominalSize: "",
                acNominalSizeUnit: "",
                acMinPS: "",
                acMaxPS: "",
                acWearLimitPS: "",
                acMinOB: "",
                acMaxOB: "",
                acAverageOB: "",
                acOBError: "",
                acMinPSError: "",
                acMaxPSError: "",
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


    const [open, setOpen] = useState(false)
    const navigate = useNavigate();




    //validate function 
    const [errors, setErrors] = useState({})

    const validateFunction = () => {
        let tempErrors = {};
        tempErrors.itemMasterRef = itemAddData.itemMasterRef ? "" : "Item Master is Required"
        tempErrors.itemIMTENo = itemAddData.itemIMTENo ? "" : "IMTE No is Required"
        tempErrors.itemType = itemAddData.itemType ? "" : "Item Type is Required"
        tempErrors.itemCalibrationSource = itemAddData.itemCalibrationSource ? "" : "Calibration Source is Required"
        tempErrors.itemCalFreInMonths = itemAddData.itemCalFreInMonths ? "" : "Cal Frequency In Months is Required"
        tempErrors.itemCalAlertDays = itemAddData.itemCalAlertDays ? "" : "Cal Alert Days is Required"
        tempErrors.itemCalDate = itemAddData.itemCalDate ? "" : "Calibration Date is Required"
        tempErrors.itemDueDate = itemAddData.itemDueDate ? "" : "Due Date is Required"
        tempErrors.itemDepartment = itemAddData.itemDepartment ? "" : "Department is Required"

        if (itemAddData.itemCalDate !== "") {
            tempErrors.itemCalDate = ""
        } else {
            tempErrors.itemCalDate = "Calibration Date is Required"
        }

        if (itemAddData.itemDueDate !== "") {
            tempErrors.itemDueDate = ""
        } else {
            tempErrors.itemDueDate = "Due Date is Required"
        }

        setErrors({ ...tempErrors })

        return Object.values(tempErrors).every(x => x === "")
    }
    console.log(errors)


    const handleItemAddSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateFunction()) {
                const response = await axios.post(
                    `${process.env.REACT_APP_PORT}/itemAdd/createItemAdd`, itemAddData
                );

                setSnackBarOpen(true)

                console.log("Item Created Successfully")
                setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })

                setTimeout(() => {
                    navigate('/itemList');
                }, 2000);
            } else {
                setErrorHandler({ status: 0, message: "Fill the required fields", code: "error" })
            }

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
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }
    const [errorhandler, setErrorHandler] = useState({})
    console.log(errorhandler)

    const [uploadMessage, setUploadMessage] = useState("")
    const handleRemoveFile = () => {
        setItemAddData((prev) => ({ ...prev, itemCertificateName: "" }));
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
                                <TextField
                                    {...(errors.itemMasterRef !== "" && { helperText: errors.itemMasterRef, error: true })}
                                    size='small' select variant='outlined' label="Item Master" name='itemMasterRef' value={itemAddData.itemMasterRef} fullWidth onChange={handleItemAddChange}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    {itemMasterDataList.map((item, index) => (
                                        <MenuItem key={index} value={item._id}>{item.itemDescription}</MenuItem>
                                    ))}
                                </TextField>
                                {/* <TextField
                                    {...(errors.itemMasterRef !== "" && { helperText: errors.itemMasterRef, error: true })}
                                    size='small'
                                    select
                                    variant='outlined'
                                    label="Item Master"
                                    name='itemMasterRef'
                                    value={itemAddData.itemMasterRef}
                                    fullWidth
                                    onChange={handleItemAddChange}
                                >
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    {distinctNamesArray.map((itemName, index) => (
                                        <MenuItem key={index} value={itemName}>{itemName}</MenuItem>
                                    ))}
                                </TextField> */}

                            </div>
                            <div className="col-6">
                                <Autocomplete
                                    disablePortal
                                    id="itemIMTENoId"
                                    value={itemAddData.itemIMTENo}
                                    options={imteList.map((item) => ({ label: item.itemIMTENo }))}
                                    size='small'
                                    renderInput={(params) => <TextField
                                        {...(errors.itemIMTENo !== "" && { helperText: errors.itemIMTENo, error: true })}
                                        name='itemIMTENo' onChange={handleItemAddChange}  {...params} label="IMTE No" />}
                                    getOptionDisabled={option => true}
                                    clearOnBlur={false}
                                //getOptionDisabled={options => true}

                                />


                                {/*  <TextField size='small' select variant='outlined' label="Item Prefix" name='itemIMTENo' value={itemAddData.itemIMTENo} fullWidth onChange={handleItemAddChange}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    {itemMasterDataPrefix.map((item) => (
                                        <MenuItem value={item._id}>{item.itemPrefix}</MenuItem>
                                    ))}
                                    </TextField>*/}

                            </div>
                            <div className="col">
                                <FormControlLabel
                                    control={<Checkbox name='isItemMaster' onChange={handleItemAddChange} />}
                                    label="Use as Master"
                                />

                            </div>


                        </div>
                        <div className="col-lg-2 " >
                            <Typography variant='h3' style={{ height: "50%", margin: "13% 0" }} className='text-center'>Item Add</Typography>
                        </div>

                        <div className="col-lg-5 d-flex justify-content-end">
                            {itemAddData.itemImage && <Card elevation={12} sx={{ width: "110px", height: "110px" }}>

                                <img src={`${process.env.REACT_APP_PORT}/itemMasterImages/${itemAddData.itemImage}`} style={{ width: "100%", height: "100%" }} />

                            </Card>}
                        </div>


                    </Paper>

                    {itemAddData.itemMasterRef !== "" && <React.Fragment>
                        <div className="row ">
                            <div className="col">
                                <Paper className='mb-2 row-md-6' elevation={12} sx={{ p: 2 }}>
                                    <Typography variant='h6' className='text-center'>Item General Details</Typography>
                                    <div className="row g-2 mb-2">
                                        <div className="col-lg-4">
                                            <TextField
                                                {...(errors.itemType !== "" && { helperText: errors.itemType, error: true })}
                                                size='small' select variant='outlined' onChange={handleItemAddChange} label="Item Type" name='itemType' fullWidth value={itemAddData.itemType || ""}>
                                                <MenuItem><em>Select Type</em></MenuItem>
                                                <MenuItem value="attribute">Attribute</MenuItem>
                                                <MenuItem value="variable">Variable</MenuItem>
                                                <MenuItem value="referenceStandard">Reference Standard</MenuItem>

                                            </TextField>
                                        </div>
                                        <div className='col-lg-8 d-flex justify-content-between'>
                                            <TextField size='small' variant='outlined' label="Range/Size" onChange={handleItemAddChange} name='itemRangeSize' id='itemRangeSizeId' fullWidth />
                                            <TextField label="Unit" size='small' select onChange={(e) => {
                                                handleItemAddChange(e);
                                            }} name='itemRangeSizeUnit' id='itemRangeSizeUnitId' defaultValue="none" style={{ width: "40%" }} >
                                                <MenuItem value='none'><em>None</em></MenuItem>
                                                {units.map((unit, index) => (
                                                    <MenuItem key={index} value={unit.unitName}>{unit.unitName}</MenuItem>
                                                ))}
                                            </TextField>




                                        </div>
                                    </div>
                                    <div className="row g-2">
                                        <div className={itemAddData.itemType === "variable" ? "col-md-5" : "col-md-12"}>
                                            <TextField size='small' variant='outlined' label="MFR.Si.No." onChange={handleItemAddChange} name='itemMFRNo' id='itemMFRNoId' fullWidth />
                                        </div>
                                        <div className={itemAddData.itemType === "variable" ? "col-md-7 d-flex justify-content-between" : "col-md-3 d-flex justify-content-between"}>
                                            {itemAddData.itemType === "variable" && <TextField size='small' variant='outlined' name='itemLC' onChange={handleItemAddChange} id="itemLCId" label="Least Count" fullWidth />}


                                            {itemAddData.itemType === "variable" && <TextField select size='small' variant='outlined' label="Unit" name='itemLCUnit' onChange={handleItemAddChange} fullWidth >
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                {units.map((unit, index) => (
                                                    <MenuItem key={index} value={unit.unitName}>{unit.unitName}</MenuItem>
                                                ))}
                                            </TextField>}

                                        </div>
                                        <div className="row g-1">
                                            <div className="col-lg-12 me-1">
                                                {itemAddData.itemType === "attribute" && <TextField size='small' variant='outlined' label="Make" onChange={handleItemAddChange} value={itemAddData.itemMake} onKeyDown={handleKeyDown} name='itemMake' id='itemMakeId' fullWidth />}
                                                {itemAddData.itemType === "referenceStandard" && <TextField size='small' variant='outlined' label="Make" onChange={handleItemAddChange} value={itemAddData.itemMake} onKeyDown={handleKeyDown} name='itemMake' id='itemMakeId' fullWidth />}
                                            </div>

                                            {itemAddData.itemType === "variable" &&
                                                <div className="col-lg me-1">
                                                    <TextField size='small' variant='outlined' label="Make" onChange={handleItemAddChange} value={itemAddData.itemMake} onKeyDown={handleKeyDown} name='itemMake' id='itemMakeId' fullWidth />
                                                </div>}
                                            <div className="col-lg">

                                                {itemAddData.itemType === "variable" && <TextField size='small' variant='outlined' label="Model No." onChange={handleItemAddChange} name='itemModelNo' id='itemModelNoId' fullWidth />}
                                            </div>
                                        </div>
                                        <div className="row g-1">
                                            <div className="col-lg me-1">
                                                <TextField
                                                    {...(errors.itemStatus !== "" && { helperText: errors.itemStatus, error: true })}
                                                    size='small' select variant='outlined' value={itemAddData.itemStatus} onChange={handleItemAddChange} label="Item Status" name='itemStatus' id='itemStatusId' fullWidth >
                                                    <MenuItem value="active">Active</MenuItem>
                                                    <MenuItem value="spare">Spare</MenuItem>
                                                    <MenuItem value="breakdown">Breakdown</MenuItem>
                                                    <MenuItem value="missing">Missing</MenuItem>
                                                    <MenuItem value="rejection">Rejection</MenuItem>

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
                                                    label="Item Receipt Date"
                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    format="DD-MM-YYYY" />
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                                <Paper elevation={12} sx={{ p: 2 }} className='row-md-6'>
                                    <Typography variant='h6' className='text-center'>
                                        Select Location
                                    </Typography>
                                    <div className="row g-2 mb-2">
                                        <div className="col-md-6">
                                            <TextField
                                                {...(errors.itemDepartment !== "" && { helperText: errors.itemDepartment, error: true })}
                                                value={employeeRole.loggedEmp.plantDetails.length === 1 ? employeeRole.loggedEmp.plantDetails[0].plantName : itemAddData.itemPlant}
                                                onChange={handleItemAddChange}
                                                size='small'
                                                select
                                                fullWidth
                                                variant='outlined'
                                                label="Select Plant"
                                                name='itemPlant'
                                                id='itemPlantId'
                                                disabled={employeeRole.loggedEmp.plantDetails.length === 1}  // Disable TextField if there's only one option
                                            >
                                                {employeeRole.loggedEmp.plantDetails.map((plant, index) => (
                                                    <MenuItem key={index} value={plant.plantName}>
                                                        {plant.plantName}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div className="col-md-6">

                                            <TextField
                                                {...(errors.itemDepartment !== "" && { helperText: errors.itemDepartment, error: true })}
                                                value={employeeRole.loggedEmp.plantDetails.length === 1 ? employeeRole.loggedEmp.plantDetails[0].plantName : itemAddData.itemDepartment} disabled={itemAddData.itemPlant === ""} onChange={handleItemAddChange} size='small' select fullWidth variant='outlined' label="Department" name='itemDepartment' id='itemDepartmentId'>
                                                {employeeRole.loggedEmp.plantDetails.map((item, index) => (
                                                    <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
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
                                        <TextField
                                            {...(errors.itemCalFreInMonths !== "" && { helperText: errors.itemCalFreInMonths, error: true })}
                                            value={itemAddData.itemCalFreInMonths} onChange={handleItemAddChange} size='small' fullWidth variant='outlined' label="Cal Frequency in months" id='itemCalFreInMonthsId' name='itemCalFreInMonths' type='number'>

                                        </TextField>
                                    </div>
                                    <div className='col-lg-6'>
                                        <TextField
                                            {...(errors.itemCalAlertDays !== "" && { helperText: errors.itemCalAlertDays, error: true })}
                                            size='small' value={itemAddData.itemCalAlertDays} onChange={handleItemAddChange} fullWidth variant='outlined' label="Cal Alert Days" id='itemCalAlertDaysId' name='itemCalAlertDays' type='number'>

                                        </TextField>
                                    </div>
                                    <div className='col-lg-12'>
                                        <TextField
                                            {...(errors.itemCalibrationSource !== "" && { helperText: errors.itemCalibrationSource, error: true })}
                                            size='small' value={itemAddData.itemCalibrationSource} onChange={handleItemAddChange} fullWidth variant='outlined' select label="Calibration Source" name='itemCalibrationSource'>
                                            <MenuItem value=""><em>--Select--</em></MenuItem>
                                            <MenuItem value="inhouse">InHouse</MenuItem>
                                            <MenuItem value="outsource">OutSource</MenuItem>
                                            <MenuItem value="oem">OEM</MenuItem>
                                        </TextField>
                                    </div>
                                </div>
                                {itemAddData.itemCalibrationSource === "inhouse" &&
                                    <div className='row g-2'>
                                        <h6 className='text-center'>Enter Master Details</h6>
                                        <div className="col-md-12">
                                            <TextField size='small' select fullWidth variant='outlined' onChange={handleItemAddChange} label="Select Master" name='itemItemMasterName' >
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
                                                    // renderValue={(selected) => selected.map(item => item.itemIMTENo).join(", ")}
                                                    renderValue={(selected) => selected.map(item => itemMasterListByName.find(sub => sub._id === item).itemIMTENo).join(", ")} MenuProps={MenuProps}


                                                    fullWidth
                                                >
                                                    {itemMasterListByName.map((name, index) => (
                                                        <MenuItem key={index} value={name._id}>
                                                            <Checkbox checked={itemAddData.itemItemMasterIMTENo.indexOf(name._id) > -1} />
                                                            <ListItemText primary={name.itemIMTENo} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {/*<FormControl size='small' component="div" fullWidth>
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
                                                </FormControl>*/}
                                        </div>



                                    </div>}
                                {itemAddData.itemCalibrationSource === "outsource" &&
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
                                                    // renderValue={(selected) => selected.join(', ')}
                                                    renderValue={(selected) => selected.map(item => item).join(", ")}
                                                    MenuProps={MenuProps}

                                                    fullWidth
                                                >

                                                    {supplierList.map((name, index) => (
                                                        <MenuItem key={index} value={name.fullName}>
                                                            <Checkbox checked={itemAddData.itemSupplier.indexOf(name.fullName) > -1} />
                                                            <ListItemText primary={name.fullName} />
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

                                {itemAddData.itemCalibrationSource === "oem" &&
                                    <div className='row g-2'>
                                        <h6 className='text-center'>Enter oem Details</h6>
                                        <div className="col-md-7">
                                            <FormControl size='small' component="div" fullWidth>
                                                <InputLabel id="itemOEMId">Select OEM</InputLabel>
                                                <Select
                                                    labelId="itemOEMId"
                                                    id="demo-multiple-checkbox"
                                                    multiple
                                                    name="itemOEM"
                                                    value={itemAddData.itemOEM}
                                                    onChange={handleItemAddChange}
                                                    input={<OutlinedInput fullWidth label="Select Supplier" />}
                                                    // renderValue={(selected) => selected.join(', ')}
                                                    // renderValue={(selected) => selected.map(item => OEMList.find(oem => oem._id === item).aliasName).join(", ")}
                                                    renderValue={(selected) => selected.map(item => item).join(", ")}
                                                    MenuProps={MenuProps}

                                                    fullWidth
                                                >
                                                    {OEMList.map((name, index) => (
                                                        <MenuItem key={index} value={name.aliasName}>
                                                            <Checkbox checked={itemAddData.itemOEM.indexOf(name.aliasName) > -1} />
                                                            <ListItemText primary={name.aliasName} />
                                                        </MenuItem>
                                                    ))}
                                                    {/* {OEMList.map((name, index) => (
                                                        <MenuItem key={index} value={name._id}>
                                                            <Checkbox checked={itemAddData.itemOEM.indexOf(name._id) > -1} />
                                                            <ListItemText primary={name.aliasName} />
                                                        </MenuItem>
                                                    ))} */}
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

                                {itemAddData.itemCalibrationSource === "inhouse" && <table className='table table-sm table-bordered text-center mt-2'>
                                    <tbody>
                                        <tr>
                                            <th style={{ width: "20%" }}>Si No</th>
                                            <th style={{ width: "50%" }}>Master Name</th>
                                            <th style={{ width: "30%" }}>Due</th>
                                        </tr>


                                        {
                                            itemAddData.itemItemMasterIMTENo.map((itemSup, index) => {
                                                const selectedImte = itemMasterListByName.find(sup => sup._id === itemSup);
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{selectedImte ? selectedImte.itemIMTENo : ''}</td>
                                                        <td>{selectedImte ? selectedImte.itemDueDate : ''}</td>
                                                    </tr>
                                                );
                                            })
                                        }



                                        {/* {itemAddData.itemItemMasterIMTENo.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.itemIMTENo}</td>
                                                <td>{item.itemDueDate}</td>
                                            </tr>
                                        ))

                                        } */}


                                    </tbody>
                                </table>}
                                {itemAddData.itemCalibrationSource === "outsource" && <table className='table table-sm table-bordered text-center mt-2'>
                                    <tbody>
                                        <tr>
                                            <th style={{ width: "20%" }}>Si No</th>
                                            <th style={{ width: "80%" }}>Supplier</th>
                                        </tr>
                                        {/* {
                                            itemAddData.itemSupplier.map((itemSup, index) => {
                                                const selectedSupplier = supplierList.find(sup => sup._id === itemSup);
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{selectedSupplier ? selectedSupplier.aliasName : ''}</td>
                                                    </tr>
                                                );
                                            })
                                        } */}
                                        {itemAddData.itemSupplier.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td >{item}</td>
                                            </tr>
                                        ))}



                                    </tbody>
                                </table>}
                                {itemAddData.itemCalibrationSource === "oem" && <table className='table table-sm table-bordered text-center mt-2'>
                                    <tbody>
                                        <tr>
                                            <th style={{ width: "20%" }}>Si No</th>
                                            <th style={{ width: "80%" }}>OEM</th>

                                        </tr>

                                        {/* {
                                            itemAddData.itemOEM.map((itemOem, index) => {
                                                const selectedOem = OEMList.find(oem => oem._id === itemOem);
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{selectedOem ? selectedOem.aliasName : ''}</td>
                                                    </tr>
                                                );
                                            })
                                        } */}



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
                                    <div className="row g-2 p-2">
                                        <TextField
                                            size='small' select variant='outlined' label="Previous Calibration Data" onChange={handleItemAddChange} name='itemPrevCalData' value={itemAddData.itemPrevCalData} fullWidth>
                                            <MenuItem>Select Type</MenuItem>
                                            <MenuItem value="available">Available</MenuItem>
                                            <MenuItem value="notAvailable">Not Available</MenuItem>

                                        </TextField>
                                        <div className="col-md-6">
                                            <DatePicker
                                                disabled={itemAddData.itemPrevCalData !== "available"}
                                                fullWidth
                                                id="itemCalDateId"
                                                name="itemCalDate"
                                                value={dayjs(itemAddData.itemCalDate)}
                                                onChange={(newValue) =>
                                                    setItemAddData((prev) => ({ ...prev, itemCalDate: newValue.format("YYYY-MM-DD") }))
                                                }
                                                label="Calibration Date"

                                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                format="DD-MM-YYYY" />
                                            {errors.itemCalDate !== "" && (
                                                <div style={{ color: 'red', textAlign: "center" }}>{errors.itemCalDate}</div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <DatePicker
                                                disabled={itemAddData.itemPrevCalData !== "available"}
                                                fullWidth
                                                id="itemDueDateId"
                                                name="itemDueDate"

                                                value={dayjs(itemAddData.itemDueDate)}
                                                onChange={(newValue) =>
                                                    setItemAddData((prev) => ({ ...prev, itemDueDate: newValue.format("YYYY-MM-DD") }))
                                                }
                                                label="Due Date"

                                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                format="DD-MM-YYYY" />
                                            {errors.itemDueDate !== "" && (
                                                <div style={{ color: 'red', textAlign: "center" }}>{errors.itemDueDate}</div>
                                            )}
                                        </div>
                                        <div className="col-lg-12 d-flex justify-content-between">
                                            <TextField disabled={itemAddData.itemPrevCalData !== "available"}
                                                size='small'
                                                fullWidth
                                                variant='outlined'
                                                onChange={handleItemAddChange}
                                                label="Calibrated at"
                                                select
                                                name='itemCalibratedAt'
                                            >
                                                <MenuItem value="inhouse">InHouse</MenuItem>
                                                {suppOEM.map((item, index) => (
                                                    <MenuItem key={index} value={item.fullName}>{item.aliasName}</MenuItem>
                                                ))}
                                            </TextField>
                                            {itemAddData.isItemMaster === "1" &&
                                                <React.Fragment>
                                                    <TextField disabled={itemAddData.itemPrevCalData !== "available"}
                                                        className='ms-2'
                                                        fullWidth
                                                        label="Uncertainity"
                                                        variant='outlined'
                                                        size='small'
                                                        onChange={handleItemAddChange}
                                                        name='itemUncertainity'
                                                        value={itemAddData.itemUncertainity}
                                                    />

                                                    <TextField disabled={itemAddData.itemPrevCalData !== "available"}
                                                        select
                                                        size='small'
                                                        variant='outlined'
                                                        label="Unit"
                                                        name='itemUncertainityUnit'
                                                        onChange={handleItemAddChange}
                                                        style={{ width: "60%" }}
                                                        value={itemAddData.itemUncertainityUnit}
                                                    >
                                                        <MenuItem value=""><em>None</em></MenuItem>
                                                        {units.map((unit, index) => (
                                                            <MenuItem key={index} value={unit.unitName}>{unit.unitName}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                </React.Fragment>}
                                        </div>



                                        <div className="col-md-12 d-flex justify-content-between">
                                            <TextField disabled={itemAddData.itemPrevCalData !== "available"} size='small' fullWidth variant='outlined' onChange={handleItemAddChange} label="Certificate No" name='itemCertificateNo'></TextField>

                                            <Button disabled={itemAddData.itemPrevCalData !== "available"} className='ms-2' startIcon={<UploadFile />} size="small" fullWidth component="label" value={itemAddData.itemCertificateName} variant="contained" >

                                                Certificate Upload
                                                <VisuallyHiddenInput type="file" onChange={handleCertificateUpload} />
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
                                {(itemAddData.isItemMaster === "0" && itemAddData.itemType !== "referenceStandard") && <Paper className='row-6-lg' elevation={12} sx={{ p: 2, mt: 2, height: "inherit" }} >

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
                                                    renderValue={(selected) => selected.map(item => partData.find(part => part._id === item).partName).join(", ")} MenuProps={MenuProps}
                                                    fullWidth
                                                >
                                                    {partData.map((name, index) => (
                                                        <MenuItem key={index} value={name._id}>
                                                            <Checkbox checked={itemAddData.itemPartName.indexOf(name._id) > -1} /> {/* Check if the item is selected */}
                                                            <ListItemText primary={name.partName} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                        </div>





                                    </div>
                                </Paper>}
                            </div>
                            {itemAddData.itemAddMasterName && <Paper sx={{ m: 2, p: 2 }} elevation={12}>
                                <div className="d-flex justify-content-between mb-2">
                                    <h6 className='h5 text-center'>Acceptance Criteria</h6>
                                    <Button variant='contained' onClick={() => addACValue()}>Add</Button>
                                </div>




                                <table className='table table-sm table-bordered text-center '>
                                    {itemAddData.itemType === "attribute" &&

                                        <tbody >
                                            <tr>

                                                <th>Parameter</th>
                                                <th>Nominal Size</th>
                                                <th>Unit</th>
                                                <th colspan="3">Permissible Size</th>
                                                <th width="20%" colspan="2" className='text-center'>Observed size
                                                    <RadioGroup
                                                        className='d-flex justify-content-around'
                                                        row
                                                        name="itemOBType"
                                                        onChange={handleItemAddChange}
                                                        aria-labelledby="demo-row-radio-buttons-group-label"

                                                    >
                                                        <FormControlLabel value="minmax" checked={itemAddData.itemOBType === "minmax"} control={<Radio />} label="Min/Max" />

                                                        <FormControlLabel value="average" checked={itemAddData.itemOBType === "average"} control={<Radio />} label="Average" />
                                                    </RadioGroup></th>
                                                <th > Delete</th>

                                            </tr>
                                            {/* {calibrationData.calcalibrationData.map((item)=> ()} */}
                                            {itemAddData.acceptanceCriteria.map((item, index) => (
                                                <tr key={index}>
                                                    <td><select className='form-select form-select-sm' id="acParameterId" name="acParameter" value={item.acParameter} onChange={(e) => changeACValue(index, e.target.name, e.target.value)}>
                                                        <option value="">-Select-</option>
                                                        {calibrationPointsData.map((item, index) => (
                                                            <option key={index} value={item.calibrationPoint}>{item.calibrationPoint}</option>
                                                        ))}
                                                    </select></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="acNominalSizeId" name="acNominalSize" value={item.acNominalSize} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                    <td> <select className="form-select form-select-sm" id="acNominalSizeUnitId" name="acNominalSizeUnit" value={item.acNominalSizeUnit} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} >
                                                        <option value="">-Select-</option>
                                                        {units.map((item, index) => (
                                                            <option key={index} value={item.unitName}>{item.unitName}</option>
                                                        ))}



                                                    </select></td>
                                                    <td><input type="text" className="form-control form-control-sm" id="acMinPSId" name="acMinPS" placeholder='min' value={item.acMinPS} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="acMaxPSId" name="acMaxPS" placeholder='max' value={item.acMaxPS} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                    <td><input type="text" className="form-control form-control-sm" id="acWearLimitPSId" name="acWearLimitPS" placeholder='wearLimit' value={item.acWearLimitPS} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                    {itemAddData.itemOBType === "average" ?
                                                        <React.Fragment>
                                                            <td colSpan={2} ><input type="text" className="form-control form-control-sm" id="acAverageOBId" name="acAverageOB" placeholder='Average' value={item.acAverageOB} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>

                                                        </React.Fragment> :


                                                        <React.Fragment>
                                                            <td><input type="text" className="form-control form-control-sm" id="acMinOBId" name="acMinOB" placeholder='min' value={item.acMinOB} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                            <td><input type="text" className='form-control form-control-sm' id="acMaxOBId" name="acMaxOB" placeholder='max' value={item.acMaxOB} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                        </React.Fragment>
                                                    }


                                                    <td><Button color='error' onClick={deleteAC}><Delete /></Button></td>



                                                </tr>

                                            ))}

                                        </tbody>}






                                    {itemAddData.itemType === "variable" &&

                                        <tbody >
                                            <tr>

                                                <th>Parameter</th>
                                                <th>Nominal Size</th>
                                                <th>Unit</th>
                                                <th colSpan={2}>Permissible Error </th>
                                                <th>Observed Error</th>

                                                <th > Delete</th>

                                            </tr>
                                            {/* {calibrationData.calcalibrationData.map((item)=> ()} */}
                                            {itemAddData.acceptanceCriteria.map((item, index) => (
                                                <tr key={index}>
                                                    <td><select className='form-select form-select-sm' id="acParameterId" name="acParameter" value={item.acParameter} onChange={(e) => changeACValue(index, e.target.name, e.target.value)}>
                                                        <option value="">-Select-</option>
                                                        {calibrationPointsData.map((item, index) => (
                                                            <option key={index} value={item.calibrationPoint}>{item.calibrationPoint}</option>
                                                        ))}
                                                    </select></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="acNominalSizeId" name="acNominalSize" value={item.acNominalSize} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                    <td> <select className="form-select form-select-sm" id="acNominalSizeUnitId" name="acNominalSizeUnit" value={item.acNominalSizeUnit} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} >
                                                        <option value="">-Select-</option>
                                                        {units.map((item, index) => (
                                                            <option key={index} value={item.unitName}>{item.unitName}</option>
                                                        ))}



                                                    </select></td>
                                                    <td><input type="text" className="form-control form-control-sm" id="acMinPSErrorId" name="acMinPSError" value={item.acMinPSError} placeholder='Min' onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                    <td><input type="text" className="form-control form-control-sm" id="acMaxPSErrorId" name="acMaxPSError" value={item.acMaxPSError} placeholder='Max' onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                    <td><input type="text" className="form-control form-control-sm" id="acOBErrorId" name="acOBError" value={item.acOBError} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>




                                                    <td><Button color='error' onClick={deleteAC}><Delete /></Button></td>



                                                </tr>

                                            ))}

                                        </tbody>}



                                    {itemAddData.itemType === "referenceStandard" &&

                                        <tbody >
                                            <tr>

                                                <th>Parameter</th>
                                                <th>Nominal Size</th>
                                                <th>Unit</th>
                                                <th colspan="2">Permissible Size</th>
                                                <th width="20%" colspan="2" className='text-center'>Observed size
                                                    <RadioGroup
                                                        className='d-flex justify-content-around'
                                                        row
                                                        name="itemOBType"
                                                        onChange={handleItemAddChange}
                                                        aria-labelledby="demo-row-radio-buttons-group-label"

                                                    >
                                                        <FormControlLabel value="minmax" checked={itemAddData.itemOBType === "minmax"} control={<Radio />} label="Min/Max" />

                                                        <FormControlLabel value="average" checked={itemAddData.itemOBType === "average"} control={<Radio />} label="Average" />
                                                    </RadioGroup></th>
                                                <th > Delete</th>

                                            </tr>
                                            {/* {calibrationData.calcalibrationData.map((item)=> ()} */}
                                            {itemAddData.acceptanceCriteria.map((item, index) => (
                                                <tr key={index}>
                                                    <td><select className='form-select form-select-sm' id="acParameterId" name="acParameter" value={item.acParameter} onChange={(e) => changeACValue(index, e.target.name, e.target.value)}>
                                                        <option value="">-Select-</option>
                                                        {calibrationPointsData.map((item, index) => (
                                                            <option key={index} value={item.calibrationPoint}>{item.calibrationPoint}</option>
                                                        ))}
                                                    </select></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="acNominalSizeId" name="acNominalSize" value={item.acNominalSize} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                    <td> <select className="form-select form-select-sm" id="acNominalSizeUnitId" name="acNominalSizeUnit" value={item.acNominalSizeUnit} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} >
                                                        <option value="">-Select-</option>
                                                        {units.map((item, index) => (
                                                            <option key={index} value={item.unitName}>{item.unitName}</option>
                                                        ))}



                                                    </select></td>
                                                    <td><input type="text" className="form-control form-control-sm" id="acMinPSId" name="acMinPS" placeholder='min' value={item.acMinPS} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="acMaxPSId" name="acMaxPS" placeholder='max' value={item.acMaxPS} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                    {itemAddData.itemOBType === "average" ?
                                                        <React.Fragment>
                                                            <td colSpan={2} ><input type="text" className="form-control form-control-sm" id="acAverageOBId" name="acAverageOB" placeholder='Average' value={item.acAverageOB} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>

                                                        </React.Fragment> :


                                                        <React.Fragment>
                                                            <td><input type="text" className="form-control form-control-sm" id="acMinOBId" name="acMinOB" placeholder='min' value={item.acMinOB} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                            <td><input type="text" className='form-control form-control-sm' id="acMaxOBId" name="acMaxOB" placeholder='max' value={item.acMaxOB} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                        </React.Fragment>
                                                    }


                                                    <td><Button color='error' onClick={deleteAC}><Delete /></Button></td>



                                                </tr>

                                            ))}

                                        </tbody>}
















                                    <tbody>
                                        <tr>
                                            {/* <th>Parameter</th>
                                     <th>Nominal Size</th>
                                        <th>Unit</th>
                                        {itemAddData.itemType === "attribute" && <th colspan="3">Permissible Size</th>}
                                        {/*{itemAddData.itemType === "attribute" && <th>Min</th>}
                                        {itemAddData.itemType === "attribute" && <th>Max</th>}
                                                {itemAddData.itemType === "attribute" && <th>WearLimit</th>}*/}
                                            {/*{itemAddData.itemType === "attribute" && <th>Unit</th>}*/}
                                            {/* {itemAddData.itemType === "attribute" && <th width="20%" colspan="2" className='text-center'>Observed size
                                            <RadioGroup
                                                className='d-flex justify-content-around'
                                                row
                                                name="itemOBType"
                                                onChange={handleItemAddChange}
                                                aria-labelledby="demo-row-radio-buttons-group-label"

                                            >
                                                <FormControlLabel value="minmax" checked={itemAddData.itemOBType === "minmax"} control={<Radio />} label="Min/Max" />

                                                <FormControlLabel value="average" checked={itemAddData.itemOBType === "average"} control={<Radio />} label="Average" />
                                            </RadioGroup></th>}*/}


                                            {/*{itemAddData.itemType === "variable" && <th colSpan={2}>Permissible Error </th>}


                                        {itemAddData.itemType === "variable" && <th>Observed Error</th>}*/}




                                            {/* {itemAddData.itemType === "referenceStandard" && <th colspan="2">Permissible Size</th>}



                                        {itemAddData.itemType === "referenceStandard" && <th width="20%" colspan="2" className='text-center'>Observed size
                                            <RadioGroup
                                                className='d-flex justify-content-around'
                                                row
                                                name="itemOBType"
                                                onChange={handleItemAddChange}
                                                aria-labelledby="demo-row-radio-buttons-group-label"

                                            >
                                                <FormControlLabel value="minmax" checked={itemAddData.itemOBType === "minmax"} control={<Radio />} label="Min/Max" />

                                                <FormControlLabel value="average" checked={itemAddData.itemOBType === "average"} control={<Radio />} label="Average" />
                                    </RadioGroup></th>} */}
                                            {/*<th>Delete</th>*/}
                                        </tr>

                                        {itemAddData.acceptanceCriteria ? itemAddData.acceptanceCriteria.map((item, index) => (
                                            <tr key={index}>
                                                {/*<td><select className='form-select form-select-sm' id="acParameterId" name="acParameter" value={item.acParameter} onChange={(e) => changeACValue(index, e.target.name, e.target.value)}>
                                                <option value="">-Select-</option>
                                                {calibrationPointsData.map((item) => (
                                                    <option>{item.calibrationPoint}</option>
                                                ))}
                                            </select></td>
                                            <td><input type="text" className='form-control form-control-sm' id="acNominalSizeId" name="acNominalSize" value={item.acNominalSize} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>


                                            <td> <select className="form-select form-select-sm" id="acNominalSizeUnitId" name="acNominalSizeUnit" value={item.acNominalSizeUnit} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} >
                                                <option value="">-Select-</option>
                                                {units.map((item, index) => (
                                                    <option key={index} value={item.unitName}>{item.unitName}</option>
                                                ))}



                                            </select></td>
                                            {itemAddData.itemType === "attribute" && <td><input type="text" className="form-control form-control-sm" id="acMinPSId" name="acMinPS" placeholder='min' value={item.acMinPS} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}

                                            {itemAddData.itemType === "attribute" && <td><input type="text" className='form-control form-control-sm' id="acMaxPSId" name="acMaxPS" placeholder='max' value={item.acMaxPS} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}


                                            {itemAddData.itemType === "attribute" && <td><input type="text" className="form-control form-control-sm" id="acWearLimitPSId" name="acWearLimitPS" placeholder='wearLimit' value={item.acWearLimitPS} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}

                                            {(itemAddData.itemType === "attribute" && itemAddData.itemOBType === "minmax") &&
                                                <React.Fragment>
                                                    <td><input type="text" className="form-control form-control-sm" id="acMinOBId" name="acMinOB" placeholder='min' value={item.acMinOB} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="acMaxOBId" name="acMaxOB" placeholder='max' value={item.acMaxOB} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                </React.Fragment>
                                            }
                                            {(itemAddData.itemType === "attribute" && itemAddData.itemOBType === "average") &&
                                                <React.Fragment>
                                                    <td colSpan={2}><input type="text" className="form-control form-control-sm" id="acAverageOBId" name="acAverageOB" placeholder='Average' value={item.acAverageOB} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                </React.Fragment>
                                            }*/}


                                                {/*  {itemAddData.itemType === "variable" && <td><input type="text" className="form-control form-control-sm" id="acMinPSErrorId" name="acMinPSError" value={item.acMinPSError} placeholder='Min' onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}
                                            {itemAddData.itemType === "variable" && <td><input type="text" className="form-control form-control-sm" id="acMaxPSErrorId" name="acMaxPSError" value={item.acMaxPSError} placeholder='Max' onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}
                                            {/* {itemAddData.itemType === "variable" && <td><input type="text" className="form-control form-control-sm" id="acMinPSErrorId" name="acMinPSError" value={item.acMinPSError} placeholder='Max' onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}*/}


                                                {/*  {itemAddData.itemType === "variable" && <td><input type="text" className="form-control form-control-sm" id="acOBErrorId" name="acOBError" value={item.acOBError} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}*/}



                                                {/*} {itemAddData.itemType === "referenceStandard" && <td><input type="text" className="form-control form-control-sm" id="acMinPSId" name="acMinPS" placeholder='min' value={item.acMinPS} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}

                                            {itemAddData.itemType === "referenceStandard" && <td><input type="text" className='form-control form-control-sm' id="acMaxPSId" name="acMaxPS" placeholder='max' value={item.acMaxPS} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>}

                                            {(itemAddData.itemType === "referenceStandard" && itemAddData.itemOBType === "minmax") &&
                                                <React.Fragment>
                                                    <td><input type="text" className="form-control form-control-sm" id="acMinOBId" name="acMinOB" placeholder='min' value={item.acMinOB} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="acMaxOBId" name="acMaxOB" placeholder='max' value={item.acMaxOB} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                </React.Fragment>
                                            }
                                            {(itemAddData.itemType === "referenceStandard" && itemAddData.itemOBType === "average") &&
                                                <React.Fragment>
                                                    <td colSpan={2}><input type="text" className="form-control form-control-sm" id="acAverageOBId" name="acAverageOB" placeholder='Average' value={item.acAverageOB} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                </React.Fragment>
                                            }*/}



                                                {/*  <td><Button color='error' onClick={deleteAC}><Delete /></Button></td>*/}

                                            </tr>
                                        )) : <tr></tr>}
                                    </tbody>
                                </table>
                            </Paper>}

                            <div className="d-flex justify-content-end">

                                <Button variant='contained' color='warning' onClick={() => setOpen(true)} className='me-3' type="button">
                                    Item Create
                                </Button>
                                <Button component={RouterLink} to={`/itemList/`} variant="contained" color="error">
                                    <ArrowBackIcon /> Back To List
                                </Button>
                            </div>


                            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                                <Alert variant="filled" onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '25%' }}>
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
                                    {"Item create confirmation"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure to Create an Item
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                                    <Button type="button" onClick={(e) => { handleItemAddSubmit(e); setOpen(false); }} autoFocus>
                                        Create
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </React.Fragment>}






                </LocalizationProvider >
            </form>
        </div >
    )
}

export default ItemAdd

