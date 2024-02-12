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
import { Add, Remove, HighlightOffRounded, Close, CloudUpload } from '@mui/icons-material';
import { useEmployee } from '../../App';




const ItemEdit = () => {

    const { id } = useParams()
    console.log(id)


    const { loggedEmp, allowedPlants } = useEmployee();
    const [addOpenData, setAddOpenData] = useState(false)

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

    const [isItemMasterList, setIsItemMasterList] = useState([])


    const getItemMaster = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`, { allowedPlants: allowedPlants }
            );
            const isItemMaster = response.data.result.filter(item => item.isItemMaster === "1")
            setIsItemMasterList(isItemMaster);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getItemMaster();
    }, []);




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

    const [certMessage, setCertMessage] = useState(null)

    const handleAdditionalCertificate = (event, name) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('rdName', itemAddData.itemIMTENo + "R&R");  // Append rdName to the formData
            try {
                axios.post(`${process.env.REACT_APP_PORT}/upload/additionalCertificates`, formData)
                    .then(response => {
                        setItemAddData((prev) => ({ ...prev, rdName: response.data.name }));
                        setCertMessage("Additional Certificates Uploaded Successfully");
                        console.log("Additional Certificates Uploaded Successfully");
                    })
                    .catch(error => {
                        setCertMessage("Error Uploading Certificate");
                        console.log(error);
                    });
            } catch (error) {
                console.error('Error uploading the file:', error);
            }
        }
    };
    const handleMSACertificate = (event, name) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('msaName', itemAddData.itemIMTENo);  // Append rdName to the formData
            try {
                axios.post(`${process.env.REACT_APP_PORT}/upload/msaCertificates`, formData)
                    .then(response => {
                        setItemAddData((prev) => ({ ...prev, msaName: response.data.name }));
                        setCertMessage("MSA Certificates Uploaded Successfully");
                        console.log(" MSA Certificates Uploaded Successfully");
                    })
                    .catch(error => {
                        setCertMessage("Error Uploading Certificate");
                        console.log(error);
                    });
            } catch (error) {
                console.error('Error uploading the file:', error);
            }
        }
    };

    const handleOtherFilesCertificate = (event, name) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('otherFile', itemAddData.itemIMTENo + "OtherFiles");// Append rdName to the formData
            try {
                axios.post(`${process.env.REACT_APP_PORT}/upload/otherFilesCertificates`, formData)
                    .then(response => {
                        setItemAddData((prev) => ({ ...prev, otherFile: response.data.name }));
                        setCertMessage("OtherFiles Certificates Uploaded Successfully");
                        console.log(" OtherFiles Certificates Uploaded Successfully");
                    })
                    .catch(error => {
                        setCertMessage("Error Uploading Certificate");
                        console.log(error);
                    });
            } catch (error) {
                console.error('Error uploading the file:', error);
            }
        }
    };










    //

    //Vendor
    const [vendorList, setVendorList] = useState([])
    const [customerList, setCustomerList] = useState([]);
    const [oemList, setoemList] = useState([]);
    const [supplierList, setSupplierList] = useState([])
    const [suppOEM, setSuppOEM] = useState([]);


    console.log(oemList)


    const vendorListFetch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/vendor/getVendorByPlants`, { allowedPlants: allowedPlants }
            );
            const vendorList = response.data.result
            const customerList = vendorList.filter((item) => item.customer === "1" || item.supplier === "1");
            const oemList = vendorList.filter((item) => item.oem === "1");
            const SupplierList = vendorList.filter((item) => item.supplier === "1");
            const suppOEM = vendorList.filter((item) => item.supplier === "1" || item.oem === "1");

            console.log(customerList)
            setVendorList(vendorList);
            setCustomerList(customerList);
            setoemList(oemList);
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

        selectedItemMaster: [],
        isItemMaster: "",
        itemAddMasterName: "",
        itemPlant: "",
        itemIMTENo: "",
        itemSAPNo: "",
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

        itemArea: "N/A",
        itemPlaceOfUsage: "",
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
        createdBy: "",
        updatedBy: "",
        calibrationCost: "",
        gaugeUsage: "",
        lifealertDays: "",
        purchaseRefNo: "",
        purchaseDate: "",
        purchaseCost: "",
        specialRemark: "",
        drawingIssueNo: "",
        drawingNo: "",
        rdName: "",
        msaName: "",
        otherFile: "",
    }


    const [itemAddData, setItemAddData] = useState({

        selectedItemMaster: [],
        isItemMaster: "",
        itemAddMasterName: "",
        itemIMTENo: "",
        itemSAPNo: "",
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
        itemPlaceOfUsage: "",
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
        itemCertificateNo: "",
        itemPartName: [],
        itemOBType: "",
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
        itemCreatedBy: loggedEmp._id,
        itemLastModifiedBy: loggedEmp._id,
        itemLastModifiedAt: dayjs().format("YYYY-MM-DD"),
        calibrationCost: "",
        gaugeUsage: "",
        lifealertDays: "",
        purchaseRefNo: "",
        purchaseDate: "",
        purchaseCost: "",
        specialRemark: "",
        drawingIssueNo: "",
        drawingNo: "",
        rdName: "",
        msaName: "",
        otherFile: "",
    })


    const getItemDataById = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddById/${id}`
            );
            const itemData = response.data.result
            console.log(itemData)
            setItemAddData((prev) => ({
                ...prev,

                selectedItemMaster: itemData.selectedItemMaster,
                itemAddMasterName: itemData.itemAddMasterName,
                itemIMTENo: itemData.itemIMTENo,
                itemSAPNo: itemData.itemSAPNo,
                isItemMaster: itemData.isItemMaster,
                itemImage: itemData.itemImage,
                itemPlant: itemData.itemPlant,
                itemType: itemData.itemType,
                itemRangeSize: itemData.itemRangeSize,
                itemRangeSizeUnit: itemData.itemRangeSizeUnit,
                itemMFRNo: itemData.itemMFRNo,
                itemLC: itemData.itemLC,
                itemLCUnit: itemData.itemLCUnit,
                itemMake: itemData.itemMake,
                itemModelNo: itemData.itemModelNo,
                itemStatus: itemData.itemStatus,
                itemReceiptDate: itemData.itemReceiptDate,
                itemDepartment: itemData.itemDepartment,

                itemArea: itemData.itemArea,
                itemPlaceOfUsage: itemData.itemPlaceOfUsage,
                itemCalFreInMonths: itemData.itemCalFreInMonths,
                itemCalAlertDays: itemData.itemCalAlertDays,
                itemCalibrationSource: itemData.itemCalibrationSource,
                itemCalibrationDoneAt: itemData.itemCalibrationDoneAt,
                itemItemMasterName: itemData.itemItemMasterName,
                itemItemMasterIMTENo: itemData.itemItemMasterIMTENo,
                itemSupplier: itemData.itemSupplier,
                itemOEM: itemData.itemOEM,
                itemCalDate: itemData.itemCalDate,
                itemDueDate: itemData.itemDueDate,
                itemCalibratedAt: itemData.itemCalibratedAt,
                itemCertificateName: itemData.itemCertificateName,
                itemPartName: itemData.itemPartName,
                itemOBType: itemData.itemOBType,
                acceptanceCriteria: itemData.acceptanceCriteria,
                itemUncertainity: itemData.itemUncertainity,
                itemPrevCalData: itemData.itemPrevCalData,
                itemUncertainityUnit: itemData.itemUncertainityUnit,
                itemCertificateNo: itemData.itemCertificateNo,
                calibrationCost: itemData.calibrationCost,
                gaugeUsage: itemData.gaugeUsage,
                lifealertDays: itemData.lifealertDays,
                purchaseRefNo: itemData.purchaseRefNo,
                purchaseDate: itemData.purchaseDate,
                purchaseCost: itemData.purchaseCost,
                specialRemark: itemData.specialRemark,
                drawingIssueNo: itemData.drawingIssueNo,
                drawingNo: itemData.drawingNo,
                rdName: itemData.rdName,
                msaName: itemData.msaName,
                otherFile: itemData.otherFile,


                // itemCreatedBy: itemData.itemCreatedBy
            }))
            console.log(response.data.result)

        } catch (err) {
            console.log(err);
        }
    };
    console.log(itemAddData)
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
    const handleItemAddChange = (e) => {

        const { name, value, checked } = e.target;
        if (name === "itemRangeSizeUnit") {
            setItemAddData((prev) => ({ ...prev, [name]: value, acceptanceCriteria: [{ acAccuracyUnit: value, acRangeSizeUnit: value }] }))
        }
        if (name === "itemDepartment") {
            setItemAddData((prev) => ({
                ...prev,
                [name]: value,
                itemCurrentLocation: value, // Ensure 'value' is correct here
            }));
        }
        if (name === "itemItemMasterIMTENo") {
            const updatedSelection = isItemMasterList.filter(item => value.some(selectedItem => selectedItem.itemIMTENo === item.itemIMTENo));
            setItemAddData((prev) => ({ ...prev, itemItemMasterIMTENo: updatedSelection }));
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
            if (value === "oem") {
                console.log("oem")
                setItemAddData((prev) => ({ ...prev, itemItemMasterIMTENo: [], itemSupplier: [] }));
            }

        }
        if (name === "itemCalDate") {
            const parsedDate = dayjs(itemAddData.itemCalDate);
            if (parsedDate.isValid() && !isNaN(parseInt(itemAddData.itemCalFreInMonths))) {
                const calculatedDate = parsedDate.add(parseInt(itemAddData.itemCalFreInMonths, 10), 'month').subtract(1, 'day');
                setItemAddData((prev) => ({
                    ...prev,
                    itemDueDate: calculatedDate.format('YYYY-MM-DD'),
                }));
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
    useEffect(() => {
        setItemAddData((prev) => ({
            ...prev,

            itemCurrentLocation: itemAddData.itemDepartment, // Ensure 'value' is correct here
        }));
    }, [itemAddData.itemDepartment])
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
    console.log(itemAddData)
    const [calibrationPointsData, setCalibrationPointsData] = useState([])
    const itemMasterById = () => {
        const master = itemMasterDataList.filter(mas => mas.itemDescription === itemAddData.itemAddMasterName)
        console.log(master)
        if (master.length > 0) {
            const { _id, itemType, itemDescription, itemPrefix, itemFqInMonths, calAlertInDay, wiNo, uncertainity, standardRef, itemImageName, status, itemMasterImage, workInsName, calibrationPoints } = master[0]
            setItemAddData((prev) => ({
                ...prev,
                itemType: itemType,
                //itemIMTENo: itemPrefix,
                itemImage: itemMasterImage,
                itemCalFreInMonths: itemFqInMonths,
                itemCalAlertDays: calAlertInDay,

            }))
            setCalibrationPointsData(calibrationPoints)
        }
    };
    useEffect(() => {
        if (itemAddData.itemAddMasterName) {
            itemMasterById();
        }
    }, [itemAddData.itemAddMasterName]);
    const [partData, setPartData] = useState([])
    const [plantWisePart, setPlantWisePart] = useState([])

    const getPartList = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/part/getPartsByPlant`, { allowedPlants: allowedPlants }
            );

            console.log(response.data)
            setPartData(response.data.result)
            setPlantWisePart(response.data.result)

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPartList();
    }, []);

    useEffect(()=> {
        const filteredPart = partData.filter(part => part.partPlant === itemAddData.itemPlant)
        setPlantWisePart(filteredPart)
    }, [itemAddData.itemPlant])

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
        console.log('Received:', { index, name, value });

        setItemAddData((prevItemAddData) => {
            console.log('Previous State:', prevItemAddData);

            const updateAC = [...prevItemAddData.acceptanceCriteria];
            updateAC[index] = {
                ...updateAC[index],
                [name]: value,
            };

            console.log('Updated AC:', updateAC);

            const updatedData = {
                ...prevItemAddData,
                acceptanceCriteria: updateAC,
            };

            console.log('New State:', updatedData);

            return updatedData;
        });
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



    //validate function 
    const [errors, setErrors] = useState({})

    const validateFunction = () => {
        let tempErrors = {};
        tempErrors.itemAddMasterName = itemAddData.itemAddMasterName ? "" : "Item Master is Required"

        setErrors({ ...tempErrors })

        return Object.values(tempErrors).every(x => x === "")
    }
    console.log(errors)


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
            }, 500);


        } catch (err) {

            setSnackBarOpen(true)


            console.log(err)

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
        console.log(selectedFile)
        if (selectedFile) {
            console.log("working")

            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                axios.post(`${process.env.REACT_APP_PORT}/upload/itemCertificates`, formData)
                    .then(response => {
                        setUploadMessage(response.data.message)
                        console.log(response.data);
                        setItemAddData((prev) => ({ ...prev, itemCertificateName: response.data.name }));
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

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }
    const [uploadMessage, setUploadMessage] = useState("")
    const handleRemoveFile = () => {
        setItemAddData((prev) => ({ ...prev, itemCertificateName: "" }));
        setUploadMessage(null)
    }
    const calculateResultDate = (newValue) => {
        const itemCalDate = dayjs(newValue).format('YYYY-MM-DD')
        const parsedDate = dayjs(itemCalDate);
        if (parsedDate.isValid() && !isNaN(parseInt(itemAddData.itemCalFreInMonths))) {
            const calculatedDate = parsedDate.add(parseInt(itemAddData.itemCalFreInMonths, 10), 'month').subtract(1, 'day');
            setItemAddData((prev) => ({
                ...prev,
                itemCalData: itemCalDate,
                itemDueDate: calculatedDate.format('YYYY-MM-DD'),
            }));
        }
    };
    const [department, setDepartment] = useState([])
    const DepFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            // const defaultDepartment = response.data.result.filter((dep) => dep.defaultdep === "yes")
            setDepartment(response.data.result);

            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        DepFetch()
    }, []);
    const [plantDepartments, setPlantDepartments] = useState([])
    useEffect(() => {
        const filteredPlants = loggedEmp.plantDetails.filter(plant => plant.plantName === itemAddData.itemPlant);
        console.log(filteredPlants)
        if (filteredPlants.length > 0) {
            setPlantDepartments(filteredPlants[0].departments)
        } else {
            setPlantDepartments([])
        }

    }, [itemAddData.itemPlant])
    return (
        <div style={{ margin: "2rem", backgroundColor: "#f5f5f5" }}>
            <form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Paper className='row' elevation={12} sx={{ p: 1.5, mb: 2, mx: 0 }}>
                        <div className="col-lg-5 row g-2">

                            <div className='col-9'>
                                <TextField
                                    {...(errors.itemAddMasterName !== "" && { helperText: errors.itemAddMasterName, error: true })}
                                    size='small' select variant='outlined' label="Item Name" name='itemAddMasterName' value={itemAddData.itemAddMasterName} fullWidth onChange={handleItemAddChange}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    {itemMasterDataList.map((item, index) => (
                                        <MenuItem key={index} value={item.itemDescription}>{item.itemDescription}</MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            {/* <div className='col-md-4'>
                                <TextField
                                    {...(errors.itemAddMasterName !== "" && { helperText: errors.itemAddMasterName, error: true })}
                                    size='small' disabled variant='outlined' label="Item Master" name='itemAddMasterName' value={itemAddData.itemAddMasterName} fullWidth >
                                </TextField>
                            </div> */}

                            <div className="col-4">
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
                            <div className="col-3">
                                <TextField size='small' variant='outlined' value={itemAddData.itemSAPNo} label="SAP NO" onChange={handleItemAddChange} name='itemSAPNo' id='itemSAPNoId' fullWidth />
                            </div>
                            <div className="col">
                                <FormControlLabel
                                    control={<Checkbox name='isItemMaster' checked={itemAddData.isItemMaster === "1"} onChange={handleItemAddChange} />}
                                    label="Use as Master"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 " >
                            <Typography variant='h3' style={{ height: "50%", margin: "13% 0" }} className='text-center'>Item Edit</Typography>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-end">
                            {itemAddData.itemImage && <Card elevation={12} sx={{ width: "110px", height: "110px" }}>
                                <img src={`${process.env.REACT_APP_PORT}/itemMasterImages/${itemAddData.itemImage}`} style={{ width: "100%", height: "100%" }} />
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
                                            <MenuItem value="attribute">Attribute</MenuItem>
                                            <MenuItem value="variable">Variable</MenuItem>
                                            <MenuItem value="referenceStandard">Reference Standard</MenuItem>
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
                                    <div className="col-lg-12">
                                        <TextField size='small' variant='outlined' label="MFR.Si.No." onChange={handleItemAddChange} name='itemMFRNo' value={itemAddData.itemMFRNo} id='itemMFRNoId' fullWidth />
                                    </div>
                                    <div className='col-md-12 d-flex justify-content-between'>
                                        {itemAddData.itemType === "variable" && <TextField size='small' variant='outlined' name='itemLC' onChange={handleItemAddChange} id="itemLCId" value={itemAddData.itemLC} label="Least Count" fullWidth />}
                                        {itemAddData.itemType === "variable" && <TextField select size='small' variant='outlined' label="Unit" name='itemLCUnit' onChange={handleItemAddChange} value={itemAddData.itemLCUnit} style={{ width: "100%" }} >
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
                                                <TextField size='small' variant='outlined' label="Make" value={itemAddData.itemMake} onChange={handleItemAddChange} onKeyDown={handleKeyDown} name='itemMake' id='itemMakeId' fullWidth />
                                            </div>}
                                        <div className="col-lg">
                                            {itemAddData.itemType === "variable" && <TextField size='small' variant='outlined' label="Model No." onChange={handleItemAddChange} value={itemAddData.itemModelNo} name='itemModelNo' id='itemModelNoId' fullWidth />}
                                        </div>
                                    </div>
                                    <div className="row g-1">
                                        <div className="col-lg me-1">
                                            <TextField size='small' select variant='outlined' value={itemAddData.itemStatus} onChange={handleItemAddChange} label="Item Status" name='itemStatus' id='itemStatusId' fullWidth >
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
                                                    setItemAddData((prev) => ({ ...prev, itemReceiptDate: newValue.format("DD-MM-YYYY") }))
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
                                <div className="row g-2 mt-0 mb-2">
                                    <div className="col-md-4">
                                        <TextField

                                            value={itemAddData.itemPlant} onChange={handleItemAddChange} size='small' select fullWidth variant='outlined' label="Select Plant" name='itemPlant' id='itemPlantId'>
                                            <MenuItem value="">Select Plant</MenuItem>
                                            {loggedEmp.plantDetails.map((plant, index) => (
                                                <MenuItem key={index} value={plant.plantName}>{plant.plantName}</MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div className="col-md-4">
                                        <TextField value={itemAddData.itemDepartment} onChange={handleItemAddChange} size='small' select fullWidth variant='outlined' label="Primary Location" name='itemDepartment' id='itemDepartmentId'>
                                            {plantDepartments && plantDepartments.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div className="col-md-4">
                                        <TextField value={itemAddData.itemPlaceOfUsage} onChange={handleItemAddChange} size='small' select fullWidth variant='outlined' label="Secondary Location" name='itemPlaceOfUsage' id='itemPlaceOfUsageId'>
                                            {department.map((item, index) => (
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
                                    <TextField value={itemAddData.itemCalFreInMonths} onChange={handleItemAddChange} size='small' fullWidth variant='outlined' label="Cal Frequency in months" id='itemCalFreInMonthsId' name='itemCalFreInMonths' type='number'>

                                    </TextField>
                                </div>
                                <div className='col-lg-6'>
                                    <TextField size='small' value={itemAddData.itemCalAlertDays} onChange={handleItemAddChange} fullWidth variant='outlined' label="Cal Alert Days" id='itemCalAlertDaysId' name='itemCalAlertDays' type='number'>

                                    </TextField>
                                </div>
                                <div className='col-md-6'>
                                    <TextField size='small' value={itemAddData.itemCalibrationSource} onChange={handleItemAddChange} fullWidth variant='outlined' select label="Calibration Source" name='itemCalibrationSource'>
                                        <MenuItem value=""><em>--Select--</em></MenuItem>
                                        <MenuItem value="inhouse">InHouse</MenuItem>
                                        <MenuItem value="outsource">OutSource</MenuItem>
                                        <MenuItem value="oem">OEM</MenuItem>
                                    </TextField>
                                </div>
                                <div className='col-md-6'>
                                    <RadioGroup
                                        className="d-flex justify-content-center"
                                        row
                                        name='itemCalibrationDoneAt'
                                        onChange={handleItemAddChange}
                                        checked={itemAddData.itemCalibrationDoneAt}
                                    >
                                        <FormControlLabel value="Lab" checked={itemAddData.itemCalibrationDoneAt === "Lab"} control={<Radio />} label="Lab" />
                                        <FormControlLabel value="Site" checked={itemAddData.itemCalibrationDoneAt === "Site"} control={<Radio />} label="Site" />
                                    </RadioGroup>
                                </div>

                            </div>
                            {itemAddData.itemCalibrationSource === "inhouse" &&
                                <div className='row g-2'>
                                    <h6 className='text-center'>Enter Master Details</h6>





                                    <div className="col-md-12">
                                        <FormControl size='small' component="div" fullWidth>
                                            <InputLabel id="itemItemMasterIMTENoId">Select IMTENo.</InputLabel>
                                            <Select
                                                labelId="itemItemMasterIMTENoId"
                                                multiple
                                                name="itemItemMasterIMTENo"
                                                value={itemAddData.itemItemMasterIMTENo} // Ensure this holds the correct selected value(s)
                                                onChange={handleItemAddChange}
                                                input={<OutlinedInput fullWidth label="Select IMTE No" />}

                                                renderValue={(selected) => selected.join(", ")}
                                                MenuProps={MenuProps}
                                                fullWidth
                                            >
                                                {isItemMasterList.map((name, index) => (
                                                    <MenuItem style={{ padding: 0 }} key={index} value={name.itemIMTENo}>
                                                        <Checkbox checked={itemAddData.itemItemMasterIMTENo.indexOf(name.itemIMTENo) > -1} />
                                                        <ListItemText primary={name.itemAddMasterName + " - " + name.itemIMTENo} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                    </div>

                                </div>}
                            {itemAddData.itemCalibrationSource === "outsource" &&
                                <div className='row g-2'>
                                    <h6 className='text-center'>Enter Supplier Details</h6>
                                    <div className="col-md">

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






                                </div>}



                            {itemAddData.itemCalibrationSource === "oem" &&
                                <div className='row g-2'>
                                    <h6 className='text-center'>Enter oem Details</h6>
                                    <div className="col-md">



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
                                                renderValue={(selected) => selected.map(item => item).join(", ")}
                                                MenuProps={MenuProps}

                                                fullWidth
                                            >
                                                {oemList.map((name, index) => (
                                                    <MenuItem key={index} value={name.aliasName}>
                                                        <Checkbox checked={itemAddData.itemOEM.indexOf(name.aliasName) > -1} />
                                                        <ListItemText primary={name.aliasName} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>



                                    </div>




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
                                            const selectedImte = isItemMasterList.find(sup => sup.itemIMTENo === itemSup);
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{selectedImte ? selectedImte.itemAddMasterName + " - " + selectedImte.itemIMTENo : ''}</td>
                                                    <td>{selectedImte ? dayjs(selectedImte.itemDueDate).format("DD-MM-YYYY") : ''}</td>
                                                </tr>
                                            );
                                        })
                                    }


                                </tbody>
                            </table>}
                            {itemAddData.itemCalibrationSource === "outsource" && <table className='table table-sm table-bordered text-center mt-2'>
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
                            {itemAddData.itemCalibrationSource === "oem" && <table className='table table-sm table-bordered text-center mt-2'>

                                <tbody>
                                    <tr>
                                        <th style={{ width: "20%" }}>Si No</th>
                                        <th style={{ width: "80%" }}>OEM</th>

                                    </tr>

                                    {/* {
                                        itemAddData.itemOEM.map((itemOem, index) => {
                                            const selectedOem = oemList.find(sup => sup._id === itemOem);
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
                                        size='small' select variant='outlined' label="Previous Calibration Data" id='itemPrevCalDataId' onChange={handleItemAddChange} name='itemPrevCalData' value={itemAddData.itemPrevCalData} fullWidth>
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
                                            value={itemAddData.itemCalibratedAt}
                                            name='itemCalibratedAt'
                                            id='itemCalibratedAtId'
                                        >
                                            <MenuItem value="inhouse">InHouse</MenuItem>
                                            {suppOEM.map((item, index) => (
                                                <MenuItem key={index} value={item.fullName}>{item.fullName}</MenuItem>
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
                                                    id='itemUncertainityId'
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
                                        <TextField disabled={itemAddData.itemPrevCalData !== "available"} size='small' fullWidth variant='outlined' onChange={handleItemAddChange} value={itemAddData.itemCertificateNo} label="Certificate No" name='itemCertificateNo'></TextField>

                                        <Button component="label" disabled={itemAddData.itemPrevCalData !== "available"} className='ms-2' value={itemAddData.itemCertificateName} variant="contained" fullWidth >

                                            Certificate Upload
                                            <VisuallyHiddenInput type="file" onChange={handleCertificateUpload} />

                                        </Button>


                                    </div>


                                    {itemAddData.itemCertificateName &&
                                        <div className="col-md-7 d-flex justify-content-between">

                                            <Chip label={itemAddData.itemCertificateName} size='small' component="a" href={`${process.env.REACT_APP_PORT}/itemCertificates/${itemAddData.itemCertificateName}`} target="_blank" clickable={true} color="primary" />
                                            <HighlightOffRounded type="button" onClick={() => handleRemoveFile()} />

                                            {uploadMessage &&
                                                <Chip label={uploadMessage} size='small' color="success" icon={<Done />} />}
                                        </div>}



                                </div>

                            </Paper >
                            {/* <Button component="label" disabled={itemAddData.itemPrevCalData !== "available"} className='ms-2' value={itemAddData.itemCertificateName} variant="contained" fullWidth >

                                Certificate Upload
                                <VisuallyHiddenInput type="file" onChange={handleCertificateUpload} />

                            </Button> */}

                            {/* {itemAddData.itemCertificateName &&
                                        <div className="col-md-4 d-flex justify-content-between">
                                            <Chip label={itemAddData.itemCertificateName} size='small' component="a" href={`${process.env.REACT_APP_PORT}/workInstructions/${itemAddData.itemCertificateName}`} target="_blank" clickable={true} color="primary" />
                                            <HighlightOffRounded type="button" onClick={() => handleRemoveFile()} />
                                            {uploadMessage &&
                                                <Chip label={uploadMessage} size='small' color="success" icon={<Done />} />}
                                        </div>} */}


                            {(itemAddData.isItemMaster !== "1" && itemAddData.itemType !== "referenceStandard") && <Paper className='row-6-lg' elevation={12} sx={{ p: 2, mt: 2, height: "inherit" }} >

                                <h5 className='text-center'>Part</h5>
                                <div className="row">
                                    <div className="col-md-12">
                                        <FormControl fullWidth>
                                            <InputLabel id="itemPartNameId">Select Part</InputLabel>
                                            <Select
                                                labelId="itemPartNameId"
                                                multiple
                                                id="demo-multiple-checkbox"
                                                name="itemPartName"
                                                disabled={!itemAddData.itemPlant}
                                                value={itemAddData.itemPartName}
                                                onChange={handleItemAddChange}
                                                input={<OutlinedInput fullWidth label="Select Part" />}
                                                renderValue={(selected) => selected.join(", ")}
                                                MenuProps={MenuProps}
                                                fullWidth
                                            >
                                                {plantWisePart.length > 0 && plantWisePart.map((name, index) => (
                                                    <MenuItem key={index} value={name.partNo}>
                                                        <Checkbox checked={itemAddData.itemPartName.indexOf(name.partNo) > -1} />
                                                        <ListItemText primary={name.partNo + " - " + name.partName + " - " + name.customer} />
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
                                <Button variant='contained' onClick={() => addACValue()}>Add Row</Button>
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
                                                <td>
                                                    <select className='form-select form-select-sm' id="acParameterId" name="acParameter" value={item.acParameter} onChange={(e) => changeACValue(index, e.target.name, e.target.value)}>
                                                        <option value="">-Select-</option>
                                                        {calibrationPointsData.map((item, idx) => (
                                                            <option key={idx}>{item.calibrationPoint}</option>
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
                                                    {calibrationPointsData.map((item, idx) => (
                                                        <option key={idx}>{item.calibrationPoint}</option>
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
                                                        <option key={index}>{item.calibrationPoint}</option>
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

                                    </tr>

                                </tbody>
                            </table>
                        </Paper>}


                        <Dialog fullWidth={true} keepMounted maxWidth="xl" open={addOpenData} sx={{ color: "#f1f4f4" }}
                            onClose={(e, reason) => {
                                console.log(reason)
                                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                                    setAddOpenData(false)
                                }
                            }}>
                            <DialogTitle align='center' >Additional Information</DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={() => setAddOpenData(false)}
                                sx={{
                                    position: 'absolute',
                                    right: 5,
                                    top: 5,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <Close />
                            </IconButton>

                            <DialogContent >
                                <div className='row g-2 mb-2'>
                                    <div className='col'>
                                        <TextField label="Calibration Cost"
                                            id="calibrationCostId"
                                            defaultValue=""
                                            value={itemAddData.calibrationCost}
                                            onChange={handleItemAddChange}
                                            size="small"
                                            fullWidth
                                            name="calibrationCost" />

                                    </div>
                                    <div className='col'>
                                        <TextField label="Gauge life in days"
                                            id="gaugeUsageId"
                                            defaultValue=""
                                            size="small"
                                            fullWidth
                                            value={itemAddData.gaugeUsage}
                                            onChange={handleItemAddChange}
                                            name="gaugeUsage" />

                                    </div>
                                    <div className='col'>

                                        <TextField label="Gauge life alert in days"
                                            id="lifealertDaysId"
                                            defaultValue=""
                                            size="small"
                                            value={itemAddData.lifealertDays}
                                            onChange={handleItemAddChange}
                                            fullWidth
                                            name="lifealertDays" />
                                    </div>
                                </div>
                                <div className='row g-2 mb-2'>
                                    <div className='col'>
                                        <TextField label="Purchase Ref.No"
                                            id="purchaseRefNoId"
                                            defaultValue=""
                                            value={itemAddData.purchaseRefNo}
                                            onChange={handleItemAddChange}
                                            size="small"
                                            fullWidth
                                            name="purchaseRefNo" />
                                    </div>
                                    <div className='col' style={{ width: "200%" }}>
                                        <TextField label="Purchase Date"
                                            id="purchaseDateId"
                                            defaultValue=""
                                            value={itemAddData.purchaseDate}
                                            onChange={handleItemAddChange}
                                            size="small"
                                            fullWidth
                                            name="purchaseDate" />
                                        {/* <DatePicker
                                                fullWidth
                                                id="purchaseDateId"
                                                name="purchaseDate"
                                                value={dayjs(itemAddData.purchaseDate)}
                                                onChange={(newValue) =>
                                                    setItemAddData((prev) => ({ ...prev, purchaseDate: newValue.format("YYYY-MM-DD") }))
                                                }
                                                label="Purchase Date"
                                                slotProps={{ textField: { size: 'small' } }}
                                                className="h-100"
                                            format="DD-MM-YYYY" />*/}
                                    </div>
                                    <div className='col'>
                                        <TextField label="Purchase Cost"
                                            id="purchaseCostId"
                                            defaultValue=""
                                            size="small"
                                            fullWidth
                                            value={itemAddData.purchaseCost}
                                            onChange={handleItemAddChange}
                                            name="purchaseCost" />
                                    </div>

                                </div>
                                <div className='row g-2 mb-2'>
                                    <div className='col'>
                                        <TextField label="Special Remark"
                                            id="specialRemarkId"
                                            defaultValue=""
                                            size="small"
                                            value={itemAddData.specialRemark}
                                            onChange={handleItemAddChange}
                                            fullWidth
                                            name="specialRemark" />
                                    </div>
                                    <div className='col'>
                                        <TextField label="Drawing Issue No"
                                            id="drawingIssueNoId"
                                            defaultValue=""
                                            size="small"
                                            value={itemAddData.drawingIssueNo}
                                            onChange={handleItemAddChange}
                                            fullWidth
                                            name="drawingIssueNo" />
                                    </div>
                                    <div className='col'>
                                        <TextField label="Drawing No"
                                            id="drawingNoId"
                                            defaultValue=""
                                            size="small"
                                            onChange={handleItemAddChange}
                                            value={itemAddData.drawingNo}
                                            fullWidth
                                            name="drawingNo" />
                                    </div>
                                </div>
                                <div className='row g-2'>
                                    <table className=' table-bordered '>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Button helperText="Hello" className='me-2' size='small' component="label" fullWidth variant="contained" startIcon={<CloudUpload />} >
                                                        R&R Upload
                                                        <VisuallyHiddenInput type="file" onChange={handleAdditionalCertificate} />
                                                    </Button>
                                                </td>
                                                <td>
                                                    <div className='d-flex justify-content-center '>
                                                        {(itemAddData.rdName !== "" && itemAddData.rdName !== undefined) &&
                                                            <Chip
                                                                className='col-12'
                                                                icon={<Done />}
                                                                color="success"
                                                                label={itemAddData.rdName}
                                                                onClick={() => {
                                                                    const fileUrl = `${process.env.REACT_APP_PORT}/additionalCertificates/${itemAddData.rdName}`;
                                                                    window.open(fileUrl, '_blank'); // Opens the file in a new tab/window
                                                                }}
                                                                onDelete={() => setItemAddData((prev) => ({ ...prev, rdName: "" }))}
                                                            />}
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button helperText="Hello" className='me-2' component="label" size='small' fullWidth variant="contained" startIcon={<CloudUpload />} >
                                                        MSA Upload
                                                        <VisuallyHiddenInput type="file" onChange={handleMSACertificate} />
                                                    </Button>
                                                </td>
                                                <td>
                                                    <div className='d-flex justify-content-center '>
                                                        {(itemAddData.msaName !== "" && itemAddData.msaName !== undefined) &&
                                                            <Chip
                                                                className='col-12'
                                                                icon={<Done />}
                                                                color="success"
                                                                label={itemAddData.msaName}
                                                                onClick={() => {
                                                                    const fileUrl = `${process.env.REACT_APP_PORT}/msaCertificates/${itemAddData.msaName}`;
                                                                    window.open(fileUrl, '_blank'); // Opens the file in a new tab/window
                                                                }}
                                                                onDelete={() => setItemAddData((prev) => ({ ...prev, msaName: "" }))}
                                                            />}
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button helperText="Hello" component="label" size='small' fullWidth variant="contained" startIcon={<CloudUpload />} >
                                                        Drawing Upload
                                                        <VisuallyHiddenInput type="file" onChange={handleOtherFilesCertificate} />
                                                    </Button>
                                                </td>
                                                <td>
                                                    <div className='d-flex justify-content-center '>
                                                        {(itemAddData.otherFile !== "" && itemAddData.otherFile !== undefined) &&
                                                            <Chip
                                                                className='col-12'
                                                                icon={<Done />}
                                                                color="success"
                                                                label={itemAddData.otherFile}
                                                                onClick={() => {
                                                                    const fileUrl = `${process.env.REACT_APP_PORT}/otherFilesCertificates/${itemAddData.otherFile}`;
                                                                    window.open(fileUrl, '_blank'); // Opens the file in a new tab/window
                                                                }}
                                                                onDelete={() => setItemAddData((prev) => ({ ...prev, otherFile: "" }))}
                                                            />}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <div className="d-flex justify-content-center">
                            <div className='col'>
                                <Button
                                    color="secondary"
                                    className='me-2'
                                    variant='contained'
                                    onClick={() => setAddOpenData(true)}
                                >
                                    Additional Information
                                </Button>
                            </div>
                            <div className="d-flex justify-content-end">


                                <Button variant='contained' color='warning' onClick={() => { setOpen(true) }} className='me-3' type="button"  >
                                    <BorderColor />  Update
                                </Button>
                                <Button variant='contained' component={RouterLink} to={`/itemList/`} color='error' onClick={() => setItemAddData(initialItemAddData)} type="reset">
                                    <ArrowBackIcon /> Back To List
                                </Button>

                            </div>
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
            </form >
        </div >
    )
}

export default ItemEdit