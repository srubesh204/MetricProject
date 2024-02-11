import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { AddToPhotos, CloudUpload, CloudDownload, DeleteOutlined, Delete, DomainVerification } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { TextField, MenuItem, FormControl, Fab,Typography, Badge, LinearProgress } from '@mui/material';
import { Box, Grid, ButtonGroup, Paper, Container, Chip } from '@mui/material';
import { Add, Remove, HighlightOffRounded } from '@mui/icons-material';
import { Done } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { ArrowBack, Error, HomeMax, House, Mail, MailLock, } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Autocomplete from '@mui/material/Autocomplete';





const ItemMaster = () => {
    const fileInputRef = useRef(null);

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }

    const [errorhandler, setErrorHandler] = useState({})
    console.log(errorhandler)

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


    const [filteredData, setFilteredData] = useState([])
    const [filterAllName, setFilterAllName] = useState({
        itemTypeSort: "all",
        itemDescriptionSort: "all"


    })

   
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (value === "all") {
            setFilteredData(itemMasterDataList)
        } else {
            if (name === "itemTypeSort") {
                const itemType = itemMasterDataList.filter((item) => (item.itemType === value))
                setFilteredData(itemType)
                setFilterAllName(prev => ({
                    ...prev,
                    itemTypeSort: value,
                    itemDescriptionSort: "all"
                }))
            }
            if (name === "itemDescriptionSort") {
                const itemDescription = itemMasterDataList.filter((item) => (item.itemDescription === value))
                setFilteredData(itemDescription)
                setFilterAllName(prev => ({
                    ...prev,
                    itemTypeSort: "all",
                    itemDescriptionSort: value
                }))
                console.log(value)
            }




        }


    };

    const [openModal, setOpenModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


    const [itemMasterStateId, setItemMasterStateId] = useState("")
    const initialItemMasterData = {
        itemType: "",
        itemDescription: "",
        itemPrefix: "",
        itemFqInMonths: "",
        calAlertInDay: "7",
        SOPNo: "",
        uncertainty: "",
        uncertaintyUnit: "",
        standardRef: "",

        itemMasterImage: "",
        workInsName: "",
        status: "Active",
        calibrationPoints: [],


    }

    const [itemMasterData, setItemMasterData] = useState({
        itemType: "",
        itemDescription: "",
        itemPrefix: "",
        itemFqInMonths: "",
        calAlertInDay: "7",
        SOPNo: "",
        uncertainty: "",
        uncertaintyUnit: "",
        standardRef: "",
        itemMasterImage: "",

        workInsName: "",
        status: "Active",
        calibrationPoints: [],

    })

    console.log(itemMasterData)

    const addCalibrationPointRow = () => {
        setItemMasterData((prevItemMasterData) => ({
            ...prevItemMasterData,
            calibrationPoints: [...prevItemMasterData.calibrationPoints, { calibrationPoint: "" }]
        }))
    }
    const deleteCalibrationPointRow = (index) => {
        setItemMasterData((prevItemMasterData) => {
            const updateCP = [...prevItemMasterData.calibrationPoints]
            updateCP.splice(index, 1);
            return {
                ...prevItemMasterData, calibrationPoints: updateCP,
            };
        })
    };

    const changeCalibrationPointRow = (index, name, value) => {
        const formattedValue = name === 'calibrationPoint'
            ? value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : value;
        setItemMasterData((prevItemMasterData) => {
            const updateCP = [...prevItemMasterData.calibrationPoints]
            updateCP[index] = {
                ...updateCP[index], [name]: formattedValue,
            };
            return {
                ...prevItemMasterData, calibrationPoints: updateCP,
            };
        })
    };





    const [itemMasterDataList, setItemMasterDataList] = useState([])

    const [FilterNameList, setFilterNameList] = useState({
        itemType: [],
        itemDescription: [],

    })


    const itemMasterFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemMaster/getAllItemMasters`
            );


            const filterNames = ["itemType", "itemDescription",]

            let updatedFilterNames = {};

            filterNames.forEach((element, index) => {
                const data = response.data.result.map(item => item[element]);
                filterNames[index] = [...new Set(data)];

                // Update the object with a dynamic key based on the 'element'
                updatedFilterNames[element] = filterNames[index];
                console.log(updatedFilterNames)
            });


            setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));


            console.log(response.data)
            setItemMasterDataList(response.data.result);
            setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemMasterFetchData();
    }, []);

    console.log(FilterNameList)
    const sortedFilterNameList = FilterNameList.itemDescription.sort();

    const [itemMasteSelectedRowIds, setItemMasteSelectedRowIds] = useState([]);
    const itemMasterColumns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },
        { field: 'itemType', headerName: 'Item Type', width: 70, headerAlign: "center", align: "center" },
        { field: 'itemDescription', headerName: 'Item Description', width: 150, headerAlign: "center", align: "center" },
        { field: 'itemPrefix', headerName: 'Item Prefix', width: 150, headerAlign: "center", align: "center" },
        { field: 'itemFqInMonths', headerName: 'Item Fq In Months', width: 90, headerAlign: "center", align: "center" },
        { field: 'calAlertInDay', headerName: 'Cal Alert In Day', width: 90, headerAlign: "center", align: "center" },
        { field: 'SOPNo', headerName: 'SOP No', width: 90, headerAlign: "center", align: "center" },
        { field: 'uncertainty', headerName: 'Uncertainty', width: 90, headerAlign: "center", align: "center" },
        { field: 'standardRef', headerName: 'Standard Ref', type: "number", width: 90, headerAlign: "center", align: "center" },
        { field: 'status', headerName: 'Status', width: 90, headerAlign: "center", align: "center" },

        {/* {
            field: 'delete',
            headerName: 'Delete',
            width: 80,
            sortable: false,
            renderHeader: () => (
                <IconButton color="secondary" aria-label="Delete" onClick={() => setDeleteModal(true)}>
                    <Delete />
                </IconButton>
            ),
        },*/}

    ];

    const [errors, setErrors] = useState({})
    const validateFunction = () => {
        let tempErrors = {};
        tempErrors.itemType = itemMasterData.itemType ? "" : "Item Type is Required"
        tempErrors.itemDescription = itemMasterData.itemType ? "" : "Item Description is Required"
        
        
        tempErrors.itemFqInMonths = itemMasterData.itemFqInMonths ? "" : "Items Fq In Months is Required"
        
        
        tempErrors.calAlertInDay = itemMasterData.calAlertInDay ? "" : "Cal Alert In Days is Required"
        



        setErrors({ ...tempErrors })

        return Object.values(tempErrors).every(x => x === "")
    }

    console.log(errors)





    const itemMasterSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateFunction()) {
                const response = await axios.post(
                    `${process.env.REACT_APP_PORT}/itemMaster/createItemMaster`, itemMasterData
                );
                {/*console.log(response.data.message)*/ }
                console.log(response.data.result)
                itemMasterFetchData();
                setSnackBarOpen(true)
                setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
                setItemMasterData(initialItemMasterData);

            } else {
                console.log("error")
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

    const updateItemMasterData = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/itemMaster/updateItemMaster/${itemMasterStateId}`, itemMasterData
            );
            itemMasterFetchData();
            setItemMasterStateId(null)
            setItemMasterData(initialItemMasterData);
            setSnackBarOpen(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            console.log("ItemMaster Updated Successfully");
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
    const deleteItemMasterData = async () => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/ItemMaster/deleteItemMaster`, {
                data: {
                    itemMasterIds: itemMasteSelectedRowIds
                }
            }


            );
            itemMasterFetchData();
            setItemMasterData(initialItemMasterData);
            setItemMasterStateId(null);
            setSnackBarOpen(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            console.log("ItemMaster delete Successfully");
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
            setItemMasterData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


        }
    };


    const updateItemMaster = async (params) => {
        console.log(params)
        setItemMasterData(prev => ({
            ...prev,
            itemType: params.row.itemType ? params.row.itemType : "",
            itemDescription: params.row.itemDescription ? params.row.itemDescription : "",
            itemPrefix: params.row.itemPrefix ? params.row.itemPrefix : "",
            itemFqInMonths: params.row.itemFqInMonths ? params.row.itemFqInMonths : "",
            calAlertInDay: params.row.calAlertInDay ? params.row.calAlertInDay : "",
            SOPNo: params.row.SOPNo ? params.row.SOPNo : "",
            uncertainty: params.row.uncertainty ? params.row.uncertainty : "",
            uncertaintyUnit: params.row.uncertaintyUnit ? params.row.uncertaintyUnit : "",
            standardRef: params.row.standardRef ? params.row.standardRef : "",
            itemMasterImage: params.row.itemMasterImage ? params.row.itemMasterImage : "",
            workInsName: params.row.workInsName ? params.row.workInsName : "",
            status: params.row.status ? params.row.status : "",
            calibrationPoints: params.row.calibrationPoints ? params.row.calibrationPoints : [],

        }))
        setItemMasterStateId(params.id)
    }


    // const handleSetEmp = (params) => {
    //     console.log(params)
    //     setEmployeeData(prev =>({
    //         ...prev,
    //         employeeCode: params.row.employeeCode ? params.row. employeeCode : "",
    //         title: params.row.title ? params.row. title : "",
    //         firstName: params.row.firstName ? params.row.title:"",
    //         lastName :params.row.lastName ? params.row.lastName:"",
    //         dob:params.row.dob ? params.row.dob:"",
    //         address: params.row.address? params.row.address:"",
    //         city: params.row.city ? params.row.city:"",
    //         state: params.row.state? params.row.state:"",
    //         contactNumber: params.row.contactNumber ? params.row.contactNumber:"",
    //         designation: params.row.designation ? params.row.designation:"",
    //         plantDetails: params.row.plantDetails ? params.row.plantDetails:[],
    //         mailId: params.row.mailId ? params.row.mailId:"",
    //         doj: params.row.doj ? params.row.doj:"",
    //         employmentStatus: params.row.employmentStatus ? params.row.employmentStatus: "",
    //         reportTo: params.row.reportTo? params.row.reportTo:"",
    //         empRole: params.row.empRole? params.row.empRole:"",
    //         password: params.row.password? params.row.password:"",
    //     }))
    //     setEmpDataId(params.id)
    // }




    const handleItemMasterBaseChange = (e) => {
        const { name, value } = e.target;
        setItemMasterData((prev) => ({ ...prev, [name]: value }));

    };

    //image upload 
    const [image, setImage] = useState(null);

    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage); // Append the selected image to the FormData
            try {
                const response = await axios.post(`${process.env.REACT_APP_PORT}/upload/itemMasterImage`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    // Image uploaded successfully
                    setItemMasterData((prev) => ({ ...prev, itemMasterImage: response.data.name }));
                    console.log('Image Uploaded Successfully');

                    // If you want to access the saved file path sent by the server
                    const filePath = response.data.filePath; // Assuming the server sends 'filePath' in the response
                    // Use 'filePath' as needed in your application
                } else {
                    console.log('Error Uploading Image');
                }
            } catch (error) {
                console.error('Error uploading the image:', error);
            }
        }
    };



    const [unitDataList, setUnitDataList] = useState([])

    const unitFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/unit/getAllUnits`
            );

            console.log(response.data.result)
            setUnitDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        unitFetchData();
    }, []);

    const [iframeURL, setIframeURL] = useState({ fileURL: "", fileName: "", file: "" });



    const [uploadMessage, setUploadMessage] = useState("")
    const handleRemoveFile = () => {
        setItemMasterData((prev) => ({ ...prev, workInsName: "" }));
        setUploadMessage(null)
    }

    const handleWorkInstructionUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log("working")

            const fileURL = URL.createObjectURL(selectedFile);
            setIframeURL({ fileURL: fileURL, fileName: selectedFile.name, file: selectedFile });
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                axios.post(`${process.env.REACT_APP_PORT}/upload/workInstructions`, formData)
                    .then(response => {
                        setItemMasterData((prev) => ({ ...prev, workInsName: response.data.name }));
                        setUploadMessage(response.data.message)
                        console.log(response.data);
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
    const [itemMasterExcelStatus, setItemMasterExcelStatus] = useState('');

    const handleItemMasterExcel = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        setFile(selectedFile);
    };

    const handleItemMasterUpload = async () => {
        try {
            if (!file) {
                setItemMasterExcelStatus('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${process.env.REACT_APP_PORT}/itemMaster/uploadItemMasterInExcel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            itemMasterFetchData()

            setItemMasterExcelStatus(response.data.message || 'Excel file uploaded successfully');
        } catch (error) {
            if (error.response) {
                setItemMasterExcelStatus(`Error: ${error.response.data.error || 'Something went wrong'}`);
            } else if (error.request) {
                setItemMasterExcelStatus('Network error. Please try again.');
            } else {
                setItemMasterExcelStatus('Error uploading the file.');
            }
            console.error('Error uploading Excel file:', error);
        }
    };


    useEffect(() => {
        if (itemMasterExcelStatus) {
            const timeoutId = setTimeout(() => {
                setItemMasterExcelStatus('');
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [itemMasterExcelStatus]);







    return (
        <div style={{ marginTop: "4rem" }}>
            <div >
                <form>
                    <Container maxWidth="lg" sx={{ mb: 2 }}>

                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 2

                            }}
                            elevation={12}
                        >
                            <div className='row mb-2 g-2'>

                                <div className='col' >
                                    <TextField fullWidth label="Item Type"  {...(errors.itemType !== "" && { helperText: errors.itemType, error: true })} value={itemMasterData.itemType} onChange={handleItemMasterBaseChange} className="form-select" select size="small" id="itemTypeId" name="itemType" defaultValue="" >

                                        <MenuItem value="all">All</MenuItem >
                                        <MenuItem value="attribute">Attribute</MenuItem >
                                        <MenuItem value="variable">Variable</MenuItem >
                                        <MenuItem value="referenceStandard">Reference Standard</MenuItem>

                                    </TextField>


                                </div>
                                <div className="col">

                                    {/* <TextField label="Item Description "   {...(errors.itemDescription !== "" && { helperText: errors.itemDescription, error: true })}
                                        id="itemDescriptionId"
                                        defaultValue=""
                                        sx={{ width: "100%" }}
                                        size="small"
                                        fullWidth
                                        onKeyDown={handleKeyDown}
                                        value={itemMasterData.itemDescription}
                                        onChange={handleItemMasterBaseChange}
                        name="itemDescription" />*/}

                                    <Autocomplete label="Item Description"
                                        disablePortal
                                        size="small"
                                        getOptionDisabled={option => true}
                                        options={itemMasterDataList.map((item) => ({ label: item.itemDescription }))}
                                        fullWidth
                                        clearOnBlur={false}
                                        onKeyDown={handleKeyDown}
                                        value={itemMasterData.itemDescription}
                                        renderInput={(params) =>
                                            <TextField {...(errors.itemDescription !== "" && { helperText: errors.itemDescription, error: true })} onChange={handleItemMasterBaseChange} value={itemMasterData.itemDescription}
                                                name="itemDescription" {...params} label="Item Description" />} />
                                </div>

                                <div className="form-floating col">
                                    <TextField label="Imte Prefix "   
                                        id="itemPrefix"
                                        defaultValue=""
                                        sx={{ width: "100%" }}
                                        size="small"
                                        fullWidth
                                        value={itemMasterData.itemPrefix}
                                        onChange={handleItemMasterBaseChange}
                                        name="itemPrefix" />
                                </div>


                            </div>
                        </Paper>


                        <div className='row '>

                            <div className='col-md-6'>
                                <Paper
                                    sx={{
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 2

                                    }}
                                    elevation={12}
                                >
                                    <div className='row mb-2 g-2'>
                                        <div className="form-floating col-md-6">

                                            <TextField label="SOP No "  
                                                id="SOPNoId"
                                                defaultValue=""
                                                sx={{ width: "100%" }}
                                                size="small"
                                                fullWidth
                                                value={itemMasterData.SOPNo}
                                                onChange={handleItemMasterBaseChange}
                                                name="SOPNo" />
                                        </div>
                                        <div className="col">
                                            <TextField label="Item Fq In Months "   {...(errors.itemFqInMonths !== "" && { helperText: errors.itemFqInMonths, error: true })}
                                                id="itemFqInMonthsId"
                                                defaultValue=""
                                                sx={{ width: "100%" }}
                                                size="small"
                                                fullWidth
                                                type='number'
                                                value={itemMasterData.itemFqInMonths}
                                                onChange={handleItemMasterBaseChange}
                                                name="itemFqInMonths" />
                                        </div>

                                    </div>
                                    <div className='row mb-2 g-2'>
                                        <div className="input-group col row g-2 m-0 d-flex">

                                            <div className='col'>
                                                <TextField  
                                                    label="Uncertainty "
                                                    id="uncertaintyId"
                                                    defaultValue=""

                                                    size="small"
                                                    fullWidth
                                                    type='number'
                                                    value={itemMasterData.uncertainty}
                                                    onChange={handleItemMasterBaseChange}
                                                    name="uncertainty"
                                                />
                                            </div>
                                            {/* {...(errors.uncertainty !== "" && { error: true })} */}
                                            {/* {...(errors.uncertaintyUnit !== "" && { error: true })}  */}
                                            {/* {...(errors.calAlertInDay !== "" && { helperText: errors.calAlertInDay, error: true })} */}

                                            <div className='col'>
                                                <TextField label="Unit"
                                                    value={itemMasterData.uncertaintyUnit} onChange={handleItemMasterBaseChange} className="form-select" select size="small" id="uncertaintyUnitId" name="uncertaintyUnit" defaultValue="" >
                                                    {unitDataList.map((item, index) => (
                                                        <MenuItem key={index} value={item.unitName}>{item.unitName}</MenuItem>
                                                    ))}


                                                    {/*<MenuItem value="Unit">Unit</MenuItem >
                                                    <MenuItem value="Unit Name">Unit Name</MenuItem>*/}

                                                </TextField>
                                            </div>

                                            {/* {(Object.keys(errors).length !== 0 && (errors.uncertainty !== "" || errors.uncertaintyUnit !== "")) && <div style={{ color: "red", fontSize: "small", marginLeft: "10px" }}>Uncertainity is Required</div>} */}


                                        </div>
                                        <div className="form-floating col">

                                            <TextField label="Cal Alert In Day "   
                                                id="calAlertInDayId"
                                                defaultValue=""
                                                sx={{ width: "100%" }}
                                                size="small"
                                                fullWidth
                                                type='number'
                                                value={itemMasterData.calAlertInDay}
                                                onChange={handleItemMasterBaseChange}
                                                name="calAlertInDay" />

                                        </div>
                                    </div>
                                    <div className='row g-2 mb-2 '>

                                        <div className="form-floating col">
                                            <TextField label="StandardRef "  
                                                id="standardRefId"
                                                defaultValue=""
                                                sx={{ width: "100%" }}
                                                size="small"
                                                fullWidth
                                                value={itemMasterData.standardRef}
                                                onChange={handleItemMasterBaseChange}
                                                name="standardRef" />

                                        </div>
                                        <div className=" col">

                                            <TextField fullWidth label="Status" {...(errors.status !== "" && { helperText: errors.status, error: true })} value={itemMasterData.status} onChange={handleItemMasterBaseChange} className="form-select" select size="small" id="statusId" name="status" defaultValue="" >


                                                <MenuItem value="Active">Active</MenuItem >
                                                <MenuItem value="InActive">InActive</MenuItem >


                                            </TextField>
                                        </div>

                                    </div>
                                    <div className="">
                                        <div className="d-flex">
                                            {!itemMasterData.workInsName ? (
                                                <Button fullWidth color='secondary' component="label" variant="contained" startIcon={<UploadFileIcon />} size="small">
                                                    Work Instruction Upload
                                                    <VisuallyHiddenInput type="file" onChange={handleWorkInstructionUpload} />

                                                </Button>) : <div className=' d-flex justify-content-center mt-2  '>


                                                <Chip className='col-6' label={itemMasterData.workInsName} size='small' component="a" href={`${process.env.REACT_APP_PORT}/workInstructions/${itemMasterData.workInsName}`} target="_blank" clickable={true} color="primary" />

                                                <HighlightOffRounded type="button" onClick={() => handleRemoveFile()} />
                                                {uploadMessage &&
                                                    <Chip className=''
                                                        label={uploadMessage}
                                                        size='small'


                                                        color="success"
                                                        icon={<Done />}
                                                    />}
                                            </div>}

                                        </div>


                                    </div>

                                </Paper>
                            </div>

                            <div className='col-md-2'>
                                {!itemMasterData.itemMasterImage && <div style={{}}>
                                    <label htmlFor="fileInput" style={{ display: 'block', width: '100%', height: '200px', border: '2px dashed black', borderRadius: "10px", position: 'relative', cursor: 'pointer' }} className='text-center align-middle'>

                                        <input
                                            type="file"
                                            id="fileInput"
                                            accept="image/*"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                opacity: 0,
                                                overflow: 'hidden',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                cursor: 'pointer',
                                            }}
                                            onChange={handleImageChange}
                                            ref={fileInputRef}
                                        />
                                        Select here to Upload Image
                                        {/* Your other content or styling for the square box */}
                                    </label>
                                </div>}
                                
                                {itemMasterData.itemMasterImage && <div style={{ margin: 0 }}>
                                    <div className='d-flex justify-content-center' style={{ width: "100%", height: "100%" }}>
                                        <Badge type="button" badgeContent={"X"} onClick={() => setItemMasterData((prev) => ({ ...prev, itemMasterImage: "" }))} style={{ width: "100%", height: "100%" }} color="error"><img src={`${process.env.REACT_APP_PORT}/itemMasterImages/${itemMasterData.itemMasterImage}`} alt={`${itemMasterData.itemMasterImage} Image`} style={{ width: "100%", height: "100%", margin: "auto", display: "block", background: "inherit", backgroundSize: "cover" }}></img></Badge>
                                    </div>

                                </div>}
                            </div>


                            <div className='col-md-4 d-flex justify-content-end mb-2 ps-0 ms-0'>
                                <div className='col-12'>
                                    <Paper
                                        sx={{
                                            p: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            mb: 2

                                        }} elevation={12}
                                    >
                                        <div style={{ maxHeight: "185px", overflow: "auto", height: "90%", minHeight: "185px" }}>
                                            <table className='table table-sm table-bordered text-center align-middle'>
                                                <tbody>
                                                    <tr>
                                                        <th>Si No</th>
                                                        <th>Calibration Points </th>
                                                        <th style={{ width: "2%" }}><Button size='small' color="primary" aria-label="add" onClick={() => addCalibrationPointRow()}>
                                                            <Add />
                                                        </Button></th>
                                                    </tr>
                                                    {itemMasterData.calibrationPoints ? itemMasterData.calibrationPoints.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td><input type='text' className='form-control form-control-sm' name='calibrationPoint' value={item.calibrationPoint} onChange={(e) => changeCalibrationPointRow(index, e.target.name, e.target.value)} onKeyDown={handleKeyDown} /></td>
                                                            <td style={{ width: "2%" }}><Button size='small' color="error" aria-label="add" onClick={() => deleteCalibrationPointRow(index)}>
                                                                <Remove />
                                                            </Button></td>
                                                        </tr>


                                                    )) : <tr></tr>}

                                                </tbody>
                                            </table>
                                        </div>

                                    </Paper>
                                </div>
                            </div>

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
                            <div className='row'>

                                <div className="col-md-7">
                                    <div className="d-flex justify">
                                        <ButtonGroup className='me-3' size="small">
                                            <Button component="label" variant="contained" size="small" >
                                                Upload
                                                <VisuallyHiddenInputs type="file" onChange={handleItemMasterExcel} />
                                            </Button>
                                            <Button size="small" onClick={handleItemMasterUpload}><CloudUpload /></Button>
                                        </ButtonGroup>

                                        {/* <ButtonGroup size="small">
                                            <Button size="small" component="label" variant="contained" color='secondary'>
                                                Download
                                                <VisuallyHiddenInputs type="file" />
                                            </Button>
                                            <Button size="small" color='secondary'><CloudDownload /></Button>
                                        </ButtonGroup> */}
                                    </div>





                                </div>

                                {itemMasterStateId ? <Dialog
                                    open={openModal}
                                    onClose={() => setOpenModal(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"ItemMaster update confirmation?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure to update the ItemMaster
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                                        <Button onClick={() => { updateItemMasterData(); setOpenModal(false); }} autoFocus>
                                            Update
                                        </Button>
                                    </DialogActions>
                                </Dialog> : <Dialog
                                    open={openModal}
                                    onClose={() => setOpenModal(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {" ItemMaster create confirmation?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure to add the ItemMaster
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                                        <Button onClick={(e) => { itemMasterSubmit(e); setOpenModal(false); }} autoFocus>
                                            Add
                                        </Button>
                                    </DialogActions>
                                </Dialog>}






                                <div className="col-md-5">
                                    {itemMasterStateId ?
                                        <div className='col d-flex justify-content-end '>
                                            <div className='me-2' >
                                                <Button variant='contained' size='small' type='button' color='warning' onClick={() => setOpenModal(true)} >Modify</Button>
                                            </div>
                                            <div className='me-2' >
                                                <Button variant='contained' size='small' type='button' color='error' onClick={() => { setItemMasterStateId(null); setItemMasterData(initialItemMasterData) }}>Cancel</Button>
                                            </div>
                                        </div> : <div className='col d-flex justify-content-end '>
                                            <div >
                                                <Button variant='contained' size="small" color='success' onClick={() => setOpenModal(true)}>+ Add Item Master</Button>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div>{itemMasterExcelStatus && <p style={{ color: 'green' }}>{itemMasterExcelStatus}</p>}</div>

                            </div>
                        </Paper>






                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 4

                            }}
                            elevation={12}
                        >
                            <div>
                                {/* <h3 className='text-center'>Item List</h3> */}
                                <div className='row mb-2 g-2'>

                                    {/* <div className="col-3 ">
                                        <TextField fullWidth label="Item Type Sort" onChange={handleFilterChange} value={filterAllName.itemTypeSort} className="form-select" select size="small" id="itemTypeSortId" name="itemTypeSort" defaultValue="" >

                                            <MenuItem value="all">All</MenuItem >
                                            <MenuItem value="attribute">Attribute</MenuItem >
                                            <MenuItem value="variable">Variable</MenuItem >
                                            <MenuItem value="referenceStandard">Reference Standard</MenuItem >

                                        </TextField>

                                    </div> */}
                                    {/* <div className=" col-3">
                                        <TextField fullWidth label="Item Description Sort" onChange={handleFilterChange} value={filterAllName.itemDescriptionSort} className="form-select" select size="small" id="itemDescriptionSortId" name="itemDescriptionSort" defaultValue="" >

                                            <MenuItem value="all">All</MenuItem >
                                            {FilterNameList.itemDescription.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))}

                                        </TextField>
                                    </div> */}
                                </div>
                                <div>
                                    <div style={{ height: 440, width: '100%' }}>
                                        <DataGrid
                                            density='compact' disableDensitySelector
                                            rows={filteredData}
                                            columns={itemMasterColumns}
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

                                            onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                                setItemMasteSelectedRowIds(newRowSelectionModel);
                                                console.log(event)

                                            }}
                                            slots={{
                                                toolbar: () => (
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <GridToolbar />


                                                        <div className="col-4 mt-2">
                                                            <TextField fullWidth label="Item Type Sort" onChange={handleFilterChange} value={filterAllName.itemTypeSort} className="form-select" select size="small" id="itemTypeSortId" name="itemTypeSort" defaultValue="" >

                                                                <MenuItem value="all">All</MenuItem >
                                                                <MenuItem value="attribute">Attribute</MenuItem >
                                                                <MenuItem value="variable">Variable</MenuItem >
                                                                <MenuItem value="referenceStandard">Reference Standard</MenuItem >

                                                            </TextField>

                                                        </div>
                                                        <div className=" col-3 mt-2">
                                                            <TextField fullWidth label="Item Description Sort" onChange={handleFilterChange} value={filterAllName.itemDescriptionSort} className="form-select" select size="small" id="itemDescriptionSortId" name="itemDescriptionSort" defaultValue="" >

                                                                <MenuItem value="all">All</MenuItem >
                                                                {FilterNameList.itemDescription.map((item, index) => (
                                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                                ))}

                                                            </TextField>
                                                        </div>
                                                        <div className='mt-2'>
                                                            {itemMasteSelectedRowIds.length !== 0 && <Button variant='contained' size='small' type='button' color='error' onClick={() => setDeleteModal(true)}>Delete </Button>}
                                                        </div>

                                                    </div>

                                                ),
                                            }}
                                            onRowClick={updateItemMaster}
                                            checkboxSelection
                                            disableRowSelectionOnClick



                                        >

                                        </DataGrid>




                                    </div>





                                    {/* <table className='table table-bordered text-center'>
                                        <tbody>
                                            <tr>
                                                <th>Si No</th>
                                                <th>Item Name</th>
                                                <th>Item Prefix</th>
                                                <th>Cal Fq</th>
                                                <th>Alert Days</th>
                                                <th>Item Type</th>
                                                <th>Status</th>
                                                <th>Delete</th>


                                            </tr>
                                            {filteredData ? filteredData.map((item, index) => (
                                                <tr key={index} onClick={() => updateItemMaster(item)}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.itemDescription}</td>
                                                    <td>{item.itemPrefix}</td>
                                                    <td>{item.itemFqInMonths}</td>
                                                    <td>{item.calAlertInDay}</td>
                                                    <td>{item.itemType}</td>
                                                    <td>{item.status}</td>


                                                    <td><button type='button' className='btn btn-danger' onClick={() => setDeleteModal(true)} ><i className="bi bi-trash-fill"></i></button></td>
                                                </tr>
                                            )) : <tr>
                                                <td colSpan={8}>No Data Available</td></tr>}

                                        </tbody>
                                    </table>*/}
                                </div>
                                <div className='row'>
                                    <div className='col d-flex justify-content-end'>
                                        <div className='me-2'>
                                            <Button component={Link} to={`/home`} variant="contained" size='small' color="warning">
                                                <ArrowBackIcon /> Dash board
                                            </Button>
                                        </div>

                                    </div>


                                </div>

                                <Dialog
                                    open={deleteModal}
                                    onClose={() => setDeleteModal(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {" ItemMaster delete confirmation?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure to delete the ItemMaster
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
                                        <Button onClick={(e) => { deleteItemMasterData(e); setDeleteModal(false); }} autoFocus>
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>



                            </div>
                            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                                <Alert variant="filled" onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '100%' }}>
                                    {errorhandler.message}
                                </Alert>
                            </Snackbar>
                        </Paper>
                    </Container>
                </form>
            </div>
        </div>
    )
}

export default ItemMaster