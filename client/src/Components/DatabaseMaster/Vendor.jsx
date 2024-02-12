import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, OutlinedInput, Select, styled, Button, ButtonGroup, Chip, Fab, MenuItem, FormControl, InputLabel, ListItemText, Checkbox, FormHelperText } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { Container, Paper } from '@mui/material';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Add, Remove, HighlightOffRounded } from '@mui/icons-material';
import { ArrowBack, Error, HomeMax, House, Mail, MailLock, } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Delete, Done } from '@mui/icons-material';
import { CloudDownload, CloudUpload, } from '@mui/icons-material';
import { useEmployee } from '../../App';



const Vendor = () => {

    const emp = useEmployee();
    const { employee, loggedEmp, allowedPlants } = emp;

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }

    const [errorhandler, setErrorHandler] = useState({})
    console.log(errorhandler)

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


    };




    const [vendorStateId, setVendorStateId] = useState(null)
    console.log(vendorStateId)
    const initialVendorData = {

        vendorCode: "",
        aliasName: "",
        fullName: "",
        dor: dayjs().format("YYYY-MM-DD"),
        address: "",
        state: "",
        city: "",
        oem: "0",
        customer: "0",
        supplier: "0",
        subContractor: "0",
        vendorContacts: [{
            name: "",
            contactNumber: "",
            mailId: "",
            vcStatus: "Active"
        }],
        certificate: "",
        certificateValidity: dayjs().format("YYYY-MM-DD"),
        vendorStatus: "Active",
        vendorPlant: []
    }

    const [checkboxSelected, setCheckboxSelected] = useState(false);
    const [vendorData, setVendorData] = useState({
        vendorCode: "",
        aliasName: "",
        fullName: "",
        dor: dayjs().format("YYYY-MM-DD"),
        address: "",
        state: "",
        city: "",
        oem: "0",
        customer: "0",
        supplier: "0",
        subContractor: "0",
        vendorContacts: [{
            name: "",
            contactNumber: "",
            mailId: "",
            vcStatus: "Active"
        }],
        certificate: "",
        certificateValidity: dayjs().format("YYYY-MM-DD"),
        vendorStatus: "Active",
        vendorPlant: []


    })


    const [AllStates, setAllStates] = useState([]);
    const [StateName, setStateName] = useState(null)
    console.log(process.env.REACT_APP_PORT)
    const StateData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/general/getAllStateAndCity`
            );
            console.log(response)
            setAllStates(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        StateData();
    }, []);
    console.log(AllStates)

    const [cityByState, setCityByState] = useState([])
    const cityFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/general/getCityByStateName/${vendorData.state}`
            );
            setCityByState(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        if (vendorData.state) {
            cityFetch();
        }


    }, [vendorData.state]);

  



    const addVendorDataRow = () => {
        setVendorData((prevVendorData) => ({
            ...prevVendorData,
            vendorContacts: [...prevVendorData.vendorContacts, { name: "", contactNumber: "", mailId: "", vcStatus: "" }]
        }))
    }

    const deleteVendorRow = (index) => {
        setVendorData((prevVendorData) => {
            const updateCP = [...prevVendorData.vendorContacts]
            updateCP.splice(index, 1);
            return {
                ...prevVendorData, vendorContacts: updateCP,
            };
        })
    };
    const changeVendorRow = (index, name, value) => {
        const formattedValue = name === 'name'
            ? value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : value;
        setVendorData((prevVendorData) => {
            const updateCP = [...prevVendorData.vendorContacts]
            updateCP[index] = {
                ...updateCP[index], [name]: formattedValue,
            };
            return {
                ...prevVendorData, vendorContacts: updateCP,
            };
        })
    };



    console.log(vendorData)







    const [vendorDataList, setVendorDataList] = useState([])
    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`, 
              );
            setVendorDataList(response.data.result);
            setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);


    console.log(vendorDataList)


    //validate function 
    const [errors, setErrors] = useState({})

    const validateFunction = () => {
        let tempErrors = {};
        tempErrors.vendorCode = vendorData.vendorCode ? "" : "Vendor Code is Required"
        tempErrors.aliasName = vendorData.aliasName ? "" : "Alias Name is Required"
        tempErrors.fullName = vendorData.fullName ? "" : "Full Name is Required"
        tempErrors.address = vendorData.address ? "" : "Address is Required"
        tempErrors.state = vendorData.state ? "" : "State is Required"
        tempErrors.city = vendorData.city ? "" : "City is Required"
        tempErrors.vendorPlant = vendorData.vendorPlant.length > 0 ? "" : "Vendor Plant is Required"

        if (vendorData.oem === "1" || vendorData.customer === "1" || vendorData.supplier === "1" || vendorData.subContractor === "1") {
            tempErrors.vendorType = ""
        } else {
            tempErrors.vendorType = "Type is Required"
        }


        setErrors({ ...tempErrors })

        return Object.values(tempErrors).every(x => x === "")
    }
    console.log(errors)



    const vendorSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateFunction()) {
                const response = await axios.post(
                    `${process.env.REACT_APP_PORT}/vendor/createVendor`, vendorData
                );
                {/*console.log(response.data.message)*/ }
                console.log(response)
                setSnackBarOpen(true)
                vendorFetchData();
                setVendorData(initialVendorData);
                console.log("Vendor Create successfully");
                setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })

            } else {
                setErrorHandler({ status: 0, message: "Fill the required fields", code: "error" })
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
    console.log()

    const updateVendorData = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/vendor/updateVendor/${vendorStateId}`, vendorData
            );
            setSnackBarOpen(true)
            vendorFetchData();

            setVendorStateId(null)
            setVendorData(initialVendorData);
            console.log("Vendor Updated Successfully");
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
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
    };

    const deleteVendorData = async () => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/vendor/deleteVendor`, {
                data: {
                    vendorIds: selectedRowIds
                }
            }
            );

            setVendorStateId(null)
            setVendorData(initialVendorData);
            setSnackBarOpen(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            console.log(response.data);
            vendorFetchData();
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

    const handleKeyDown = (event) => {
        const { name, value } = event.target
        console.log(name)
        if (event.key === 'Tab') {
            // Prevent default Tab behavior

            const formattedValue = value.toLowerCase().
                split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            console.log(formattedValue)

            setVendorData((prev) => ({ ...prev, [name]: formattedValue }));


        }
    };






    const updateVendor = async (params) => {
        console.log(params)
        setVendorData(prev => ({
            ...prev,
            vendorCode: params.row.vendorCode ? params.row.vendorCode : "",
            aliasName: params.row.aliasName ? params.row.aliasName : "",
            fullName: params.row.fullName ? params.row.fullName : "",
            dor: params.row.dor ? params.row.dor : "",
            address: params.row.address ? params.row.address : "",
            state: params.row.state ? params.row.state : "",
            city: params.row.city ? params.row.city : "",
            oem: params.row.oem ? params.row.oem : "",
            customer: params.row.customer ? params.row.customer : "",
            supplier: params.row.supplier ? params.row.supplier : "",
            subContractor: params.row.subContractor ? params.row.subContractor : "",
            vendorContacts: params.row.vendorContacts ? params.row.vendorContacts : "",
            certificate: params.row.certificate ? params.row.certificate : "",
            certificateValidity: params.row.certificateValidity ? params.row.certificateValidity : "",
            vendorStatus: params.row.vendorStatus ? params.row.vendorStatus : "",
            vendorPlant: params.row.vendorPlant.length > 0 ? params.row.vendorPlant : []
        }))
        setVendorStateId(params.id)
    }

    //Dateformat

    const currentDate = new Date();
    console.log(currentDate)
    const currentDay = currentDate.getDate().toString();
    const currentMonth = (currentDate.getMonth() + 1).toString();
    const currentYear = currentDate.getFullYear().toString();
    const DateFormat = currentYear + "-" + currentMonth + "-" + currentDay

    console.log(currentDay + "-" + currentMonth + "-" + currentYear)


    const handleVendorDataBaseChange = (e) => {
        const { name, checked, type } = e.target;
        let value = e.target.value;
        if (type === "checkbox") {
            value = checked ? "1" : "0";
        }

        setVendorData((prev) => ({ ...prev, [name]: value }));

    };







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


    const [openModalVendor, setOpenModalVendor] = useState(false);
    const [deleteModalVendor, setDeleteModalVendor] = useState(false);


    const [iframeURL, setIframeURL] = useState({ fileURL: "", fileName: "", file: "" });
    const fileInputRef = useRef(null);
    const [uploadProgress, setUploadProgress] = useState(0)

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        if (selectedFile) {
            console.log("working")
            setVendorData((prev) => ({ ...prev, certificate: selectedFile.name }));
            const fileURL = URL.createObjectURL(selectedFile);
            setIframeURL({ fileURL: fileURL, fileName: selectedFile.name, file: selectedFile });
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // const encodedFileName = encodeURIComponent('System Design (2).pdf');
    // const fileURL = `${process.env.REACT_APP_PORT}/vendorCertificates/${encodedFileName}`;

    const [uploadMessage, setUploadMessage] = useState("")
    const handleCertificateUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log("working")
            setVendorData((prev) => ({ ...prev, certificate: selectedFile.name }));
            const fileURL = URL.createObjectURL(selectedFile);
          
            setIframeURL({ fileURL: fileURL, fileName: selectedFile.name, file: selectedFile });

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('certificate', vendorData.vendorCode + "Certificate");
            try {
                axios.post(`${process.env.REACT_APP_PORT}/upload/VendorCertificateUpload`, formData)
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

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];

        if (droppedFile) {
            const fileURL = URL.createObjectURL(droppedFile);
            setVendorData((prev) => ({ ...prev, certificate: droppedFile.name }));
            setIframeURL({ fileURL: fileURL, fileName: droppedFile.name, file: droppedFile });
        }
    };
    console.log(iframeURL)
    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', iframeURL.file);

        try {
            axios.post(`${process.env.REACT_APP_PORT}/upload/VendorCertificateUpload`, formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            })
                .then(response => {
                    setSnackBarOpen(true);
                    setErrorHandler({ status: 1, message: response.data.message, code: "success" });
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                    // handle error here
                });
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    };

    const RemoveFile = () => {
        setIframeURL({ fileURL: "", fileName: "", file: "" });
        setVendorData((prev) => ({ ...prev, certificate: "" }));
    }

    const vendorListColumns = [

        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },
        { field: 'vendorCode', headerName: 'VendorCode', width: 130, headerAlign: "center", align: "center", },

        {
            field: 'fullName',
            headerName: 'Full Name',
            width: 200,
            headerAlign: "center", align: "center",
        },
        {
            field: 'city',
            headerName: 'City',
            //   description: 'This column has a value getter and is not sortable.',
            width: 100,
            headerAlign: "center", align: "center",
        },
        {
            field: 'state',
            headerName: 'State',
            // description: 'This column has a value getter and is not sortable.',
            width: 100,
            headerAlign: "center", align: "center",
        },
        {
            field: 'vendorStatus',
            headerName: 'Status',
            // description: 'This column has a value getter and is not sortable.',
            width: 100,
            headerAlign: "center", align: "center",

        },
        {
            field: 'vendorType',
            headerName: 'Vendor Type',
            headerAlign: "center",
            align: "center",

            width: 300,

            renderHeader: (params) => {
                params.colDef.headerAlign = "center"
                return params.colDef.headerName;
            },
            renderCell: (params) => {
                const { row } = params;

                const types = [];
                if (row.oem === "1") types.push('OEM');
                if (row.customer === "1") types.push('Customer');
                if (row.supplier === "1") types.push('Supplier');
                if (row.subContractor === "1") types.push('Sub Contractor');

                return types.join(' | ');
            },
        },
    ];

    const [selectedRowIds, setSelectedRowIds] = useState([]);


    const VisuallyHiddenInputs = styled('input')({
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

    const [file, setFile] = useState(null);
    const [vendorExcelStatus, setVendorExcelStatus] = useState('');

    const handleVendorExcel = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        setFile(selectedFile);
    };

    const handleVendorUpload = async () => {
        try {
            if (!file) {
                setVendorExcelStatus('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${process.env.REACT_APP_PORT}/vendor/uploadVendorInExcel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            vendorFetchData();

            setVendorExcelStatus(response.data.message || 'Excel file uploaded successfully');
        } catch (error) {
            if (error.response) {
                setVendorExcelStatus(`Error: ${error.response.data.error || 'Something went wrong'}`);
            } else if (error.request) {
                setVendorExcelStatus('Network error. Please try again.');
            } else {
                setVendorExcelStatus('Error uploading the file.');
            }
            console.error('Error uploading Excel file:', error);
        }
    };


    useEffect(() => {
        if (vendorExcelStatus) {
            const timeoutId = setTimeout(() => {
                setVendorExcelStatus('');
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [vendorExcelStatus]);









    return (
        <div >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <form>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 2
                            }}
                            elevation={12}
                        >



                            <div className='row g-2'  >

                                <div className='col-md-2'>

                                    <TextField label="Vendor Code"
                                        {...(errors.vendorCode !== "" && { helperText: errors.vendorCode, error: true })}
                                        id="vendorCodeId"
                                        defaultValue=""
                                        size="small"
                                        fullWidth
                                        value={vendorData.vendorCode}
                                        onChange={handleVendorDataBaseChange}
                                        name="vendorCode" />

                                </div>
                                <div className='col-md-3'>


                                    <Autocomplete label="Alias Name"
                                        disablePortal
                                        size="small"
                                        getOptionDisabled={option => true}
                                        options={vendorDataList.map((ven) => ({ label: ven.aliasName }))}
                                        fullWidth
                                        clearOnBlur={false}
                                        onKeyDown={handleKeyDown}
                                        value={vendorData.aliasName}
                                        renderInput={(params) =>
                                            <TextField {...(errors.aliasName !== "" && { helperText: errors.aliasName, error: true })} onChange={handleVendorDataBaseChange} value={vendorData.aliasName}
                                                name="aliasName" {...params} label="AliasName" />} />

                                </div>
                                <div className='col-md-4'>


                                    <Autocomplete label="Full Name"
                                        disablePortal
                                        size="small"
                                        getOptionDisabled={option => true}
                                        options={vendorDataList.map((ven) => ({ label: ven.fullName }))}
                                        fullWidth
                                        clearOnBlur={false}
                                        onKeyDown={handleKeyDown}
                                        value={vendorData.fullName}
                                        renderInput={(params) =>
                                            <TextField {...(errors.fullName !== "" && { helperText: errors.fullName, error: true })} onChange={handleVendorDataBaseChange} value={vendorData.fullName}
                                                name="fullName" {...params} label="Full Name" />} />


                                </div>

                                <div className='col-md-3'>
                                    <div className="col">
                                        <DatePicker
                                            disableFuture
                                            fullWidth
                                            id="dorId"
                                            name="dor"
                                            value={dayjs(vendorData.dor)}
                                            onChange={(newValue) =>
                                                setVendorData((prev) => ({ ...prev, dor: newValue.format("YYYY-MM-DD") }))
                                            }
                                            label="Date of Registration"

                                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                            format="DD-MM-YYYY" />
                                    </div>

                                </div>


                            </div>
                            <div className='row g-2 mt-2' >

                                <div className='col-md-4'>
                                    <TextField label="Address"
                                        {...(errors.address !== "" && { helperText: errors.address, error: true })}
                                        id="addressId"
                                        defaultValue=""
                                        size="small"
                                        fullWidth
                                        value={vendorData.address}
                                        onKeyDown={handleKeyDown}
                                        onChange={handleVendorDataBaseChange}
                                        name="address" />

                                </div>
                                <div className='col-md-2'>
                                    <FormControl size='small' component="div" fullWidth {...(errors.vendorPlant !== "" && { error: true })}>

                                        <InputLabel id="vendorPlantId">Select Plant</InputLabel>
                                        <Select
                                            labelId="vendorPlantId"
                                            multiple
                                            name="vendorPlant"  // Use a different name for the first Select
                                            value={vendorData.vendorPlant}
                                            onChange={handleVendorDataBaseChange}
                                            input={<OutlinedInput fullWidth label="Select Plant" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                            fullWidth
                                        >
                                            {loggedEmp.plantDetails && loggedEmp.plantDetails.map((plant, index) => (
                                                <MenuItem key={index} value={plant.plantName}>
                                                    <Checkbox checked={vendorData.vendorPlant.indexOf(plant.plantName) > -1} />
                                                    <ListItemText primary={plant.plantName} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText id="vendorPlantId">{errors.vendorPlant}</FormHelperText>
                                    </FormControl>

                                </div>


                                <div className='col-md-6'>
                                    <div>
                                        <div className='d-flex justify-content-end '>
                                            <div className="form-check form-check-inline ">
                                                <input className="form-check-input" type="checkbox" checked={vendorData.oem === "1"} onChange={handleVendorDataBaseChange} id="oemId" name="oem" />
                                                <label className="form-check-label" htmlFor="oemId">OEM</label>
                                            </div>
                                            <div className="form-check form-check-inline ">
                                                <input className="form-check-input" type="checkbox" checked={vendorData.customer === "1"} onChange={handleVendorDataBaseChange} id="customerId" name="customer" />
                                                <label className="form-check-label" htmlFor="customerId">Customer</label>
                                            </div>
                                            <div className="form-check form-check-inline ">
                                                <input className="form-check-input" type="checkbox" checked={vendorData.supplier === "1"} onChange={handleVendorDataBaseChange} id="supplierId" name="supplier" />
                                                <label className="form-check-label" htmlFor="supplierId">Supplier</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" checked={vendorData.subContractor === "1"} onChange={handleVendorDataBaseChange} id="subContractorId" name="subContractor" />
                                                <label className="form-check-label" htmlFor="subContractorId">SubContractor</label>
                                            </div>
                                        </div>
                                        {errors.vendorType !== "" && (
                                            <div style={{ color: 'red', textAlign: "center" }}>{errors.vendorType}</div>
                                        )}
                                    </div>
                                </div>
                            </div>







                        </Paper>






                        <div className="row g-0 mb-3">

                            <Paper
                                sx={{
                                    p: 2,
                                    marginRight: 2

                                }}
                                elevation={12}
                                className='col-md-5'
                            >


                                <div className="row g-2 mb-2">
                                    <Autocomplete
                                        id="stateId"
                                        onChange={(event, newValue) => {
                                            setStateName(newValue);
                                            setVendorData((prev) => ({ ...prev, state: newValue }))
                                        }}
                                        // name="state"
                                        options={AllStates}
                                        fullWidth
                                        size='small'
                                        className='col'

                                        value={vendorData.state}
                                        isOptionEqualToValue={(option) => option}
                                        renderInput={(params) => <TextField {...params} label="State" name="State"
                                            {...(errors.state !== "" && { helperText: errors.state, error: true })} />} // Set the name attribute to "state"
                                    />


                                    <Autocomplete
                                        id="cityId"
                                        onChange={(event, newValue) => {
                                            setStateName(newValue);
                                            setVendorData((prev) => ({ ...prev, city: newValue }))
                                        }}
                                        // name="state"
                                        options={cityByState.map((item) => item.name)}

                                        value={vendorData.city}
                                        size='small'
                                        className='col'
                                        fullWidth
                                        isOptionEqualToValue={(option) => option}
                                        renderInput={(params) => <TextField {...params} label="City" name="City"
                                            {...(errors.city !== "" && { helperText: errors.city, error: true })} />} // Set the name attribute to "state"
                                    />
                                </div>

                                <div className=" row g-2 mb-2">



                                    <div className="col-md-6">
                                        <TextField fullWidth label="VendorStatus" onChange={handleVendorDataBaseChange} value={vendorData.vendorStatus} className="col" select size="small" id="vendorStatusId" name="vendorStatus" defaultValue="" >

                                            <MenuItem value="Active">Active</MenuItem >
                                            <MenuItem value="InActive">InActive</MenuItem >


                                        </TextField>
                                    </div>

                                    <div className='col-md'>

                                        <DatePicker
                                            fullWidth
                                            id="certificateValidityId"
                                            name="certificateValidity"
                                            value={dayjs(vendorData.certificateValidity)}
                                            onChange={(newValue) =>
                                                setVendorData((prev) => ({ ...prev, certificateValidity: newValue.format("YYYY-MM-DD") }))
                                            }
                                            label="Certificate Validiy"

                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY" />
                                    </div>






                                </div>
                                <div className="row">

                                    <div>
                                        <div>
                                            <input
                                                type="file"
                                                accept=".pdf" // Specify the accepted file types
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                onChange={handleCertificateUpload}
                                            />
                                            <button type='button' style={{ display: "none" }} onClick={() => fileInputRef.current.click()} value={vendorData.certificate}>Select File</button>
                                        </div>
                                        <div className="d-flex justify-content-spaced align-middle" style={{ width: "100%", height: "50px" }}>
                                            <div
                                                onDragOver={handleDragOver}
                                                onDrop={handleDrop}
                                                onClick={() => fileInputRef.current.click()} // Click the hidden file input
                                                style={{
                                                    width: vendorData.certificate === "" ? '100%' : '75%',
                                                    height: '100%',
                                                    border: '2px dashed #ccc',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    cursor: 'pointer', // Change cursor on hover to indicate clickability
                                                }}
                                            >
                                                <div>
                                                    <p className='m-0'>
                                                        Drag and drop or click here
                                                    </p>
                                                </div>
                                            </div>
                                            {vendorData.certificate &&
                                                <div className='d-flex ' style={{ width: "60%", height: '100%', border: '2px dashed #ccc' }}>

                                                    {/*<Chip label={vendorData.certificate} component="a" href={`${process.env.REACT_APP_PORT}/vendorCertificates/${vendorData.certificate}`} target="_blank" clickable={true} />*/}
                                                    {vendorData.certificate !== "" && (
                                                        <a
                                                            href={`${process.env.REACT_APP_PORT}/vendorCertificates/${vendorData.certificate}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="me-2"
                                                        >
                                                            {vendorData.certificate}
                                                        </a>
                                                    )}
                                                    <HighlightOffRounded type="button" onClick={() => RemoveFile()} />

                                                </div>}

                                        </div>
                                        {vendorData.certificate &&
                                            <Chip
                                                label={uploadMessage}

                                                size='small'

                                                color="success"
                                                icon={<Done />}
                                            />
                                        }

                                    </div>
                                </div>

                            </Paper>



                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',

                                }}
                                elevation={12}
                                className='col'
                            >
                                <div style={{ maxHeight: "200px", overflow: "auto" }}>
                                    <h6 className='text-center'>Vendor Contacts</h6>

                                    <table className='table table-sm table-bordered table-responsive text-center align-middle'>
                                        <tbody>
                                            <tr style={{ fontSize: "14px" }}>
                                                <th width={"5%"}>Si.No</th>
                                                <th>Name</th>
                                                <th width={"25%"}>Contact Number</th>
                                                <th>Mail Id</th>
                                                <th width={"15%"}>Status</th>
                                                <th width={"10%"}> <Fab size='small' color="primary" aria-label="add" onClick={() => addVendorDataRow()}>
                                                    <Add />
                                                </Fab></th>
                                            </tr>
                                            {vendorData.vendorContacts ? vendorData.vendorContacts.map((item, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td><input type="text" className='form-control form-control-sm' id="nameId" name="name" value={item.name} onChange={(e) => changeVendorRow(index, e.target.name, e.target.value)} /></td>
                                                    <td><input type="number" className={`form-control form-control-sm ${item.contactNumber && item.contactNumber.length === 10 ? 'is-valid' : 'is-invalid'}`} id="contactNumber" name="contactNumber" value={item.contactNumber} onChange={(e) => changeVendorRow(index, e.target.name, e.target.value)} /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="mailId" name="mailId" value={item.mailId} onChange={(e) => changeVendorRow(index, e.target.name, e.target.value)} /></td>

                                                    <td> <select className="form-select form-select-sm" id="vcStatusId" name="vcStatus" value={item.vcStatus} onChange={(e) => changeVendorRow(index, e.target.name, e.target.value)} aria-label="Floating label select example">
                                                        {/*<option selected>-select-</option>*/}
                                                        <option value="Active">Active</option>
                                                        <option value="InActive">InActive</option>


                                                    </select></td>
                                                    <td style={{ padding: 0, margin: 0 }}>
                                                        <Fab size='small' sx={{ m: 0, p: 0 }} color="error" aria-label="add" onClick={() => deleteVendorRow(index)}>
                                                            <Remove sx={{ m: 0, p: 0 }} />
                                                        </Fab></td>
                                                </tr>
                                            )) : <tr></tr>}
                                        </tbody>
                                    </table>
                                </div>

                            </Paper>

                        </div>

                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 2
                            }}
                            elevation={12}
                        >
                            <div className='row' >
                                <div className='col  d-flex justify-content-end mb-2'>
                                    <div className='col  d-flex'>

                                        <div className="d-flex justify-content-center">
                                            <ButtonGroup className='me-3' size="small">
                                                <Button component="label" variant="contained" size='small' >
                                                    Upload
                                                    <VisuallyHiddenInput type="file" onChange={handleVendorExcel} />
                                                </Button>
                                                <Button size="small" onClick={handleVendorUpload}><CloudUpload /></Button>
                                            </ButtonGroup>

                                            {/* <ButtonGroup size="small" >
                                                <Button component="label" variant="contained" color='secondary' size="small">
                                                    Download
                                                    <VisuallyHiddenInput type="file" />
                                                </Button>
                                                <Button color='secondary' size="small" ><CloudDownload /></Button>
                                            </ButtonGroup> */}
                                        </div>
                                    </div>



                                    {vendorStateId ?
                                        <div className='d-flex justify-content-end'>
                                            <div className='me-2' >
                                                <Button type="button" variant='contained' color='warning' size="small" onClick={() => setOpenModalVendor(true)}>Modify</Button>
                                            </div>
                                            <div className='me-2' >
                                                <Button type="button" variant='contained' size="small" color='error' onClick={() => { setVendorStateId(null); setVendorData(initialVendorData) }}>Cancel</Button>
                                            </div>
                                        </div> : <div className='col d-flex justify-content-end mb-2'>
                                            <div>
                                                <Button variant='contained' size="small" color='success' onClick={() => setOpenModalVendor(true)}>+ Add Vendor</Button>
                                            </div>
                                        </div>}

                                </div>
                                {vendorStateId ? <Dialog
                                    open={openModalVendor}
                                    onClose={() => setOpenModalVendor(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {" Vendor update confirmation?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure to update the Vendor
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenModalVendor(false)}>Cancel</Button>
                                        <Button onClick={() => { updateVendorData(); setOpenModalVendor(false); }} autoFocus>
                                            Update
                                        </Button>
                                    </DialogActions>
                                </Dialog> :
                                    <Dialog
                                        open={openModalVendor}
                                        onClose={() => setOpenModalVendor(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Vendor create confirmation?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to add the Vendor
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setOpenModalVendor(false)}>Cancel</Button>
                                            <Button onClick={(e) => { vendorSubmit(e); setOpenModalVendor(false); }} autoFocus>
                                                Add
                                            </Button>
                                        </DialogActions>
                                    </Dialog>}
                                <div>{vendorExcelStatus && <p style={{ color: 'green' }}>{vendorExcelStatus}</p>}</div>

                            </div>
                        </Paper>





                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',

                            }}
                            elevation={12}
                        >

                            {/* <h4 className='text-center'>Vendor List</h4> */}
                            <div className="d-flex justify-content-between">

                                <div className="col-3 mb-2">
                                    <select className="form-select form-select-sm" id="vendorTypeId" name="vendorType" aria-label="Floating label select example" onChange={handleFilterChange} >
                                        <option value="all">All</option>
                                        <option value="oem">OEM</option>
                                        <option value="customer">Customer</option>
                                        <option value="supplier">Supplier</option>
                                        <option value="subContractor">SubContractor</option>
                                    </select>

                                </div>

                            </div>

                            <div style={{ height: 400, width: '100%', marginTop: "0.5rem" }}>
                                <DataGrid disableDensitySelector
                                    rows={filteredData}
                                    columns={vendorListColumns}
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
                                        toolbar: () => (
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <GridToolbar />
                                                <div>
                                                    {selectedRowIds.length !== 0 && <Button variant='contained' type='button' size='small' color='error' onClick={() => setDeleteModalVendor(true)}>Delete Vendors</Button>}
                                                </div>

                                            </div>
                                        ),
                                    }}

                                    onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                        setSelectedRowIds(newRowSelectionModel);
                                        console.log(event)

                                    }}

                                    onRowClick={updateVendor}

                                    density="compact"
                                    //disableColumnMenu={true}

                                    checkboxSelection
                                    pageSizeOptions={[10]}


                                />
                            </div>
                            {/* <div className='row'>
                                <div className='col d-flex justify-content-end'>
                                    <div className='me-2'>
                                        <Button component={Link} to={`/home`} variant="contained" size='small' color="warning">
                                            <ArrowBackIcon /> Dash board
                                        </Button>
                                    </div>
                                    <div >
                                        <Button component={Link} to="/" variant='contained' startIcon={<ArrowBack />} endIcon={<House />} color='secondary'>Home</Button>
                                    </div>
                                </div>


                            </div> */}

                            <Dialog
                                open={deleteModalVendor}
                                onClose={() => setDeleteModalVendor(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {" Vendor delete confirmation?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure to delete the Vendor
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setDeleteModalVendor(false)}>Cancel</Button>
                                    <Button onClick={() => { deleteVendorData(); setDeleteModalVendor(false); }} autoFocus>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <Snackbar variant="contained" anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                                <Alert variant="filled" onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '100%' }}>
                                    {errorhandler.message}
                                </Alert>
                            </Snackbar>
                        </Paper>



                    </form>
                </Container>
            </LocalizationProvider>
        </div>
    )

}

export default Vendor