import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab, Link } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { Container, Paper } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Add, Remove, HighlightOffRounded } from '@mui/icons-material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Delete, Done } from '@mui/icons-material';


const Vendor = () => {


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
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
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
            // Format the input value (capitalization)
            // Update the state to show the formatted value
            setVendorData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


        }
    };

    // const handleKeyDownForContacts = (event) => {
    //     const { name, value } = event.target
    //     console.log(name)
    //     if (event.key === 'Tab') {
    //         // Prevent default Tab behavior

    //         const formattedValue = value.toLowerCase().
    //             split(' ')
    //             .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    //             .join(' ');
    //         console.log(formattedValue)
    //         // Format the input value (capitalization)
    //         // Update the state to show the formatted value
    //         setVendorData((prevVendorData) => ({
    //             ...prevVendorData,
    //             vendorContacts: [{ ...prevVendorData.vendorContacts, [name]: formattedValue }]
    //         }))


    //     }
    // };





    const updateVendor = async (params) => {
        console.log(params)
        setVendorData(params.row)
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

    // useEffect(() => {
    //     axios.get('http://localhost:3001/upload/getVendorCertificate/' + vendorData.certificate) // Replace with your API endpoint URL
    //         .then((response) => {
    //             console.log(response)
    //             setFile((prev) => ({ ...prev, file: response.data }));
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching file:', error);
    //         });
    // }, [vendorData.certificate]);
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
            axios.post("http://localhost:3001/upload/VendorCertificateUpload", formData, {
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

        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'vendorCode', headerName: 'VendorCode', width: 130 },

        {
            field: 'fullName',
            headerName: 'Full Name',
            width: 200,
        },
        {
            field: 'city',
            headerName: 'City',
            //   description: 'This column has a value getter and is not sortable.',
            width: 100,
        },
        {
            field: 'state',
            headerName: 'State',
            // description: 'This column has a value getter and is not sortable.',
            width: 100,
        },
        {
            field: 'vendorStatus',
            headerName: 'Status',
            // description: 'This column has a value getter and is not sortable.',
            width: 100,

        },
        {
            field: 'vendorType',
            headerName: 'Vendor Type',
            headerAlign: "center",

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



                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }}  >

                                <Grid item xs={2}>

                                    <TextField label="Vendor Code"
                                        {...(errors.vendorCode !== "" && { helperText: errors.vendorCode, error: true })}
                                        id="vendorCodeId"
                                        defaultValue=""
                                        size="small"
                                        sx={{ width: "100%" }}
                                        value={vendorData.vendorCode}
                                        onChange={handleVendorDataBaseChange}
                                        name="vendorCode" />

                                </Grid>
                                <Grid item xs={3}>

                                    {/*<TextField label="Alias Name"
                                        {...(errors.aliasName !== "" && { helperText: errors.aliasName, error: true })}
                                        id="aliasNameId"
                                        defaultValue=""
                                        size="small"
                                        sx={{ width: "100%" }}
                                        onKeyDown={handleKeyDown}
                                        value={vendorData.aliasName}
                                        onChange={handleVendorDataBaseChange}
                        name="aliasName" />*/}
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

                                </Grid>
                                <Grid item xs={4}>
                                    {/* <TextField label="Full Name"
                                        {...(errors.fullName !== "" && { helperText: errors.fullName, error: true })}
                                        id="fullNameId"
                                        defaultValue=""
                                        size="small"
                                        sx={{ width: "100%" }}
                                        value={vendorData.fullName}
                                        onKeyDown={handleKeyDown}
                                        onChange={handleVendorDataBaseChange}
                                        name="fullName" />*/}

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


                                </Grid>

                                <Grid item xs={3}>
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

                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY" />
                                    </div>

                                </Grid>


                            </Grid>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} className='mt-1' >

                                <Grid item xs={6}>
                                    <TextField label="Address"
                                        {...(errors.address !== "" && { helperText: errors.address, error: true })}
                                        id="addressId"
                                        defaultValue=""
                                        size="small"
                                        sx={{ width: "100%" }}
                                        value={vendorData.address}
                                        onKeyDown={handleKeyDown}
                                        onChange={handleVendorDataBaseChange}
                                        name="address" />

                                </Grid>


                                <Grid item xs={6} >
                                    <div className='col  d-flex justify-content-end '>
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
                                </Grid>
                            </Grid>







                        </Paper>






                        <div className="row g-2 mb-3">

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



                                {/* <select onChange={handleVendorDataBaseChange} value={vendorData.vendorStatus} className="form-select" id="vendorStatusId" name="vendorStatus" >
                                            <option value="">-select-</option>
                                            <option value="Active">Active</option>
                                            <option value="InActive">InActive</option>
                                            <option value="Relieved">Relieved</option>
                                        </select>
                                        <label htmlFor="vendorStatusId">Vendor Status</label>*/}



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
                                            sx={{ width: "100%" }}
                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY" />
                                    </div>



                                    {/*<div className="form-floating me-4 mb-4 col">
                                        <input type="date" className="form-control" id="certificateValidityId" name="certificateValidity" placeholder="certificateValidity" value={vendorData.certificateValidity} onChange={handleVendorDataBaseChange} />
                                        <label htmlFor="certificateValidityId">Certificate Validity</label>
                                    </div>*/}



                                </div>
                                <div className="row">
                                    {/* <ButtonGroup className='col' >

                                        <Button component="label" variant='contained' sx={{ width: "80%" }}>
                                            Certificate
                                            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                                        </Button>

                                        <Button variant='outlined' sx={{ width: "20%" }} startIcon={<CloudUploadIcon />} type='button' className='btn btn-info' onClick={handleFileUpload}>Upload</Button>

                                    </ButtonGroup> */}
                                    {/* <Button component="label" variant="contained" fullWidth >

                                        Certificate Upload
                                        <VisuallyHiddenInput type="file" onChange={handleCertificateUpload} />
                                </Button>*/}

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
                                            {/*} <div className='d-flex ' style={{ width: "20%", height: '60%', border: '2px dashed #ccc' }}>

                                                <Chip label={vendorData.certificate} component="a" href={`${process.env.REACT_APP_PORT}/workInstructions/${vendorData.certificate}`} target="_blank" clickable={true} />
                                                <Chip
                                                    label={uploadMessage}
                                                    size='small'
                                                    onClick={() => RemoveFile()}
                                                    color="success"
                                                    icon={<Done />}
                                                />
                                            </div>*/}
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
                                                    <td><input type="number" className={`form-control form-control-sm ${item.contactNumber.length === 10 ? 'is-valid' : 'is-invalid'}`} id="contactNumber" name="contactNumber" value={item.contactNumber} onChange={(e) => changeVendorRow(index, e.target.name, e.target.value)} /></td>
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
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 2
                            }}
                            elevation={12}
                        >
                            <div className='row' >
                                <div className='col  d-flex justify-content-end mb-2'>
                                    <div className='col  d-flex'>
                                        <div className='me-2' >
                                            <label className='upload'>
                                                <input className="form-control download" type="file" id="upload" />Upload</label>
                                        </div>
                                        <div className='me-2'>
                                            <label className='upload'>
                                                <input className="form-control download" type="file" id="download" />Download </label>
                                        </div>
                                    </div>
                                    {vendorStateId ?
                                        <div className='d-flex justify-content-end'>
                                            <div className='me-2' >
                                                <button type="button" className='btn btn-info' onClick={() => setOpenModalVendor(true)}>Modify</button>
                                            </div>
                                            <div className='me-2' >
                                                <button type="button" className='btn btn-danger' onClick={() => { setVendorStateId(null); setVendorData(initialVendorData) }}>Cancel</button>
                                            </div>
                                        </div> : <div className='col d-flex justify-content-end mb-2'>
                                            <div >
                                                <button type="button" className='btn btn-warning' onClick={() => setOpenModalVendor(true)}>+ Add Vendor</button>
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

                            <h4 className='text-center'>Vendor List</h4>
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
                                {selectedRowIds.length !== 0 && <Button variant='contained' type='button' color='error' onClick={() => setDeleteModalVendor(true)}>Delete Vendors</Button>}
                            </div>

                            <div style={{ height: 400, width: '100%', marginTop: "0.5rem" }}>
                                <DataGrid
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
                                        toolbar: GridToolbar,
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