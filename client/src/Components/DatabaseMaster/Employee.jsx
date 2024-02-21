import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { TextField, MenuItem, InputAdornment, gridClasses, FormControl, InputLabel, Select, Checkbox, OutlinedInput, ListItemText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Grid, Paper, IconButton, ButtonGroup, Container } from '@mui/material';
import dayjs from 'dayjs';
import { Add, ArrowBack, Error, HomeMax, House, Mail, MailLock, } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CheckBox, Delete, Edit, OtherHouses, Visibility, VisibilityOff } from '@mui/icons-material';
import { CloudDownload, CloudUpload, } from '@mui/icons-material';
import styled from "@emotion/styled";
import { useEmployee } from '../../App';


const Employee = () => {

    const employeeRole = useEmployee()
    const { loggedEmp, allowedPlants } = employeeRole

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


    console.log(employeeRole)

    const currentDate = new Date();
    console.log(currentDate)
    const currentDay = currentDate.getDate().toString();
    const currentMonth = (currentDate.getMonth() + 1).toString();
    const currentYear = currentDate.getFullYear().toString();
    const DateFormat = currentYear + "-" + currentMonth + "-" + currentDay

    console.log(currentDay + "-" + currentMonth + "-" + currentYear)





    const [empDataId, setEmpDataId] = useState(null)
    const [employeeList, setEmployeeList] = useState([]);
    const [reportToList, setReportToList] = useState([])
    const [FilterNameList, setFilterNameList] = useState({
        employmentStatus: [],
        department: [],
        reportTo: []

    })

    const [plantsData, setPlantsData] = useState([]);
    const plantFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/compDetails/getAllPlantDetails`
            );
            setPlantsData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        plantFetch();
    }, []);

    const empFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/employee/getAllEmployees`
            );
            console.log(response.data.result)
            const filterNames = ["employmentStatus", "department", "reportTo"]
            let updatedFilterNames = {};

            filterNames.forEach((element, index) => {
                const data = response.data.result.map(item => item[element]);
                filterNames[index] = [...new Set(data)];

                // Update the object with a dynamic key based on the 'element'
                updatedFilterNames[element] = filterNames[index];
                console.log(updatedFilterNames)
            });
            setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));

            if (employeeRole.employee === "superAdmin") {

                setEmployeeList(response.data.result);
                setFilteredData(response.data.result);
                setReportToList(response.data.result)
            }
            if (employeeRole.employee === "admin") {
                const filter = response.data.result.filter(emp => emp.empRole !== "superAdmin" && emp.empRole !== "admin")
                setEmployeeList(filter);
                setFilteredData(filter);
                setReportToList(filter)
            }
            if (employeeRole.employee === "plantAdmin") {
                const filter = response.data.result.filter(emp => emp.empRole !== "superAdmin" && emp.empRole !== "admin" && emp.empRole !== "plantAdmin")
                setEmployeeList(filter);
                setFilteredData(filter);
                setReportToList(filter)
            }


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        empFetch();
    }, []);
    console.log(FilterNameList)



    const [employeeSelectedRowIds, setEmployeeSelectedRowIds] = useState([]);

    const employeeColumns = [
        { field: 'id', headerName: 'Sr. No', width: 50, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center" },

        { field: 'employeeCode', headerName: 'Emp.Code', width: 80, headerAlign: "center", align: "center" },
        {
            field: 'Name',
            headerName: 'Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            headerAlign: "center", align: "center",
            width: 120,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },

        { field: 'dob', headerName: 'DOB', width: 100, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY') },
        { field: 'contactNumber', headerName: 'Contact No', headerAlign: "center", align: "center", type: "number", width: 120, },
        { field: 'designation', headerName: 'Designation', headerAlign: "center", align: "center", width: 150, },
        {
            field: 'department',
            headerName: 'Department',
            headerAlign: 'center',
            align: 'center',
            width: 150,
            renderCell: (params) => {
                const uniqueDepartments = Array.from(
                    new Set(params.row.plantDetails.flatMap((plant) => plant.departments))
                );

                return (
                    <span>
                        {uniqueDepartments.join(', ')}
                    </span>
                );
            },
            // valueOptions: Array.from(uniqueDepartments),
        },
        { field: 'empRole', headerName: 'Role', width: 150, headerAlign: "center", align: "center" },
        // { field: 'reportTo', headerName: 'Report To', width: 100, headerAlign: "center", align: "center", },


    ];








    const [filteredData, setFilteredData] = useState([])
    const [filterAllNames, setFilterAllNames] = useState({

        departmentFilter: "all",
        employementStatusFilter: "all",
        reportToFilter: "all",


    })

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(e)
        if (value === "all") {
            setFilteredData(employeeList)
        } else {
            if (name === "departmentFilter") {
                const departmentFilter = employeeList.filter((emp) => (
                    emp.plantDetails.find(plant => plant.plantName.includes(value))
                ));
                setFilteredData(departmentFilter)
                setFilterAllNames(prev => ({
                    ...prev,
                    departmentFilter: value,
                    employementStatusFilter: "all",
                    reportToFilter: "all"

                }))
            }
            if (name === "employementStatusFilter") {
                const statusFilter = employeeList.filter((item) => (item.employmentStatus === value))
                console.log(statusFilter)
                setFilteredData(statusFilter)
                setFilterAllNames(prev => ({
                    ...prev,
                    departmentFilter: "all",
                    employementStatusFilter: value,
                    reportToFilter: "all"
                }))
                console.log(value)
            }
            if (name === "reportToFilter") {
                const reportFilter = employeeList.filter((item) => (item.reportTo === value))
                setFilteredData(reportFilter)
                setFilterAllNames(prev => ({
                    ...prev,
                    departmentFilter: "all",
                    employementStatusFilter: 'all',
                    reportToFilter: value
                }))
            }
        }


    };


    const initialEmpData = {
        employeeCode: "",
        title: "",
        firstName: "",
        lastName: "",
        dob: DateFormat,
        address: "",
        city: "",
        state: "",
        contactNumber: "",
        designation: "",
        plantDetails: [],
        mailId: "",
        doj: DateFormat,
        employmentStatus: "Active",
        reportTo: "",
        password: "",
    }



    const [employeeData, setEmployeeData] = useState({
        employeeCode: "",
        title: "",
        firstName: "",
        lastName: "",
        dob: DateFormat,
        address: "",
        city: "",
        state: "",
        contactNumber: "",
        designation: "",
        plantDetails: [],
        mailId: "",
        doj: DateFormat,
        employmentStatus: "Active",
        reportTo: "",
        empRole: "",
        password: "",
    });

    const [empPlantId, setEmpPlantId] = useState(null)
    const [plantIndex, setPlantIndex] = useState(null)

    const initialEmpPlantDetails = {
        plantName: "",
        departments: []
    }

    const [empPlantDetails, setEmpPlantDetails] = useState({
        plantName: "",
        departments: []
    })

    const handleSetEmp = (params) => {
        console.log(params)
        setEmployeeData(prev => ({
            ...prev,
            employeeCode: params.row.employeeCode ? params.row.employeeCode : "",
            title: params.row.title ? params.row.title : "",
            firstName: params.row.firstName ? params.row.firstName : "",
            lastName: params.row.lastName ? params.row.lastName : "",
            dob: params.row.dob ? params.row.dob : "",
            address: params.row.address ? params.row.address : "",
            city: params.row.city ? params.row.city : "",
            state: params.row.state ? params.row.state : "",
            contactNumber: params.row.contactNumber ? params.row.contactNumber : "",
            designation: params.row.designation ? params.row.designation : "",
            plantDetails: params.row.plantDetails ? params.row.plantDetails : [],
            mailId: params.row.mailId ? params.row.mailId : "",
            doj: params.row.doj ? params.row.doj : "",
            employmentStatus: params.row.employmentStatus ? params.row.employmentStatus : "",
            reportTo: params.row.reportTo ? params.row.reportTo : "",
            empRole: params.row.empRole ? params.row.empRole : "",
            password: params.row.password ? params.row.password : "",
        }))
        setEmpDataId(params.id)
    }



    const getRowClassName = (params) => {
        return params.id === empDataId ? 'selected-row' : '';
    };

    console.log(employeeData)
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled"  {...props} />;
    });
    const [open, setOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    //open Modal
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteOpen = (id) => {
        setDeleteOpen(true);
        setDeleteId(id)
    };
    console.log(deleteId)

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setDeleteId(null)
        setEmployeeData(initialEmpData)
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }

    //
    //State and City
    const [AllStates, setAllStates] = useState([]);
    const [StateName, setStateName] = useState(null)

    const StateData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/general/getAllStateAndCity`
            );
            setAllStates(response.data);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        StateData();
    }, []);


    const [cityByState, setCityByState] = useState([])
    const cityFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/general/getCityByStateName/${employeeData.state}`
            );
            setCityByState(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {

        cityFetch();



    }, [employeeData.state]);

    //



    //Department and Designation 
    const [departmentList, setDepartmentList] = useState([]);
    const [defaultDepartments, setDefaultDepartments] = useState([])
    const depFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            const defaultdep = response.data.result.filter(dep => dep.defaultdep === "yes")
            setDepartmentList(response.data.result);
            setDefaultDepartments(defaultdep)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        depFetchData();
    }, []);



    const [designationList, setDesignationList] = useState([]);
    const desFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/designation/getAllDesignations`
            );
            setDesignationList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        desFetchData();
    }, []);



    //

    // Employee Datas
    const [errorhandler, setErrorHandler] = useState({})








    const handleChange = (event, newValue) => {
        const { name, value } = event.target;
        setEmployeeData((prev) => ({ ...prev, [name]: value }));

    };

    const handlePlantChange = (e) => {
        const { name, value } = e.target;
        setEmpPlantDetails((prev) => ({ ...prev, [name]: value }));
    };



    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword((show) => !show)
    }
    console.log(showPassword)


    const [errors, setErrors] = useState({})
    const validateFunction = () => {
        let tempErrors = {};
        tempErrors.employeeCode = employeeData.employeeCode ? "" : "EmpCode is Required"
        tempErrors.title = employeeData.title ? "" : "* Title"
        tempErrors.firstName = employeeData.firstName ? "" : "First Name is Required"
        tempErrors.lastName = employeeData.lastName ? "" : "Last Name is Required"
        tempErrors.address = employeeData.address ? "" : "Address is Required"
        tempErrors.empRole = employeeData.empRole ? "" : "Role is Required"
        tempErrors.city = employeeData.city ? "" : "City is Required"
        tempErrors.state = employeeData.state ? "" : "State is Required"
        tempErrors.contactNumber = employeeData.contactNumber ? "" : "Contact Number is Required"
        tempErrors.mailId = employeeData.mailId ? "" : "Mail Id is Required"
        tempErrors.password = employeeData.password ? "" : "Password is Required"
        tempErrors.designation = employeeData.designation ? "" : "Designation is Required"
        tempErrors.doj = employeeData.doj ? "" : "DOJ is Required"
        tempErrors.employmentStatus = employeeData.employmentStatus ? "" : "Employment Status is Required"
        tempErrors.plantStatus = employeeData.plantDetails.length > 0 ? "" : "Plant Details Required"

        setErrors({ ...tempErrors })

        return Object.values(tempErrors).every(x => x === "")
    }

    console.log(errors)

    const reportToChange = () => {
        if (employeeData.empRole === "viewer") {
            const filter = employeeList.filter(emp => emp.empRole === "creator")
            setReportToList(filter)
        }
        if (employeeData.empRole === "creator") {
            const filter = employeeList.filter(emp => emp.empRole === "creator" || emp.empRole === "plantAdmin")
            setReportToList(filter)
        }
        if (employeeData.empRole === "plantAdmin") {
            setReportToList([employeeRole.loggedEmp])
        }
    }
    useEffect(() => {
        reportToChange()
    }, [employeeData.empRole])





    const EmployeeSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateFunction()) {
                const response = await axios.post(
                    `${process.env.REACT_APP_PORT}/employee/createEmployee`, employeeData
                );

                setSnackBarOpen(true)
                empFetch();
                console.log("Employee Created Successfully")
                setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
                setEmployeeData(initialEmpData)
                setEmpDataId(null)
                setErrors({})
            } else {
                console.log("error")
            }

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

    const EmployeeUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/employee/updateEmployee/${empDataId}`, employeeData
            );
            empFetch();
            setSnackBarOpen(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            console.log("Employee Updated Successfully")
            setEmpDataId(null)
            setEmployeeData(initialEmpData)
            setErrors({})

        } catch (err) {
            setSnackBarOpen(true)
            console.log(err)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' / ');

                console.log(errorMessages400);
                console.log(err)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                // const errorData500 = err.response.data.error;
                // const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(err)
                setErrorHandler({ status: 0, message: err.response.data.error, code: "error" });
            } else {
                console.log(err)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }

        }
    };

    const handleKeyDown = (event, newValue) => {
        const { name, value } = event.target
        console.log(event.target.value)

        if (event.key === 'Tab') {
            // Prevent default Tab behavior
            if (name === "mailId") {
                console.log("im here")
                const lowerCase = value.toLowerCase()
                setEmployeeData((prev) => ({ ...prev, [name]: lowerCase }));
            } else {

                const formattedValue = value.toLowerCase().
                    split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                console.log(formattedValue)
                // Format the input newValue (capitalization)
                setStateName(formattedValue); // Update the state to show the formatted newValue
                setEmployeeData((prev) => ({ ...prev, [name]: formattedValue }));
            } // Update the state with the formatted value
        }
    };


    const deleteEmployee = async (id) => {


        try {

            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/employee/deleteEmployee`,
                {
                    data: {
                        employeeIds: employeeSelectedRowIds
                    }
                }

            );
            console.log(response)
            empFetch();

            setSnackBarOpen(true)
            setErrorHandler({ status: response.data.status, message: response.data.result, code: "success" })
            setEmpDataId(null)
            console.log("Employee Deleted Successfully")



        } catch (err) {
            setSnackBarOpen(true)
            console.log(err)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(', ');
                console.log(err)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                // const errorData500 = err.response.data.error;
                // const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(err)
                setErrorHandler({ status: 0, message: err.response.data.error, code: "error" });
            } else {
                console.log(err)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }

        }
    }

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

    const [file, setFile] = useState(null);
    const [empExcelStatus, setEmpExcelStatus] = useState('');

    const handleEmpExcel = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        setFile(selectedFile);
    };

    const handleEmpUpload = async () => {
        try {
            if (!file) {
                setEmpExcelStatus('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${process.env.REACT_APP_PORT}/employee/uploadEmployeeInExcel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            empFetch();
            setEmpExcelStatus(response.data.message || 'Excel file uploaded successfully');
        } catch (error) {
            if (error.response) {
                setEmpExcelStatus(`Error: ${error.response.data.error || 'Something went wrong'}`);
            } else if (error.request) {
                setEmpExcelStatus('Network error. Please try again.');
            } else {
                setEmpExcelStatus('Error uploading the file.');
            }
            console.error('Error uploading Excel file:', error);
        }
    };


    useEffect(() => {
        if (empExcelStatus) {
            const timeoutId = setTimeout(() => {
                setEmpExcelStatus('');
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [empExcelStatus]);


    const empPlantAdd = () => {
        console.log(Object.values(empPlantDetails).every(item => typeof item === "string" ? item !== "" : item.length > 0))

        const allNonArrayValuesAreNonEmptyStrings = Object.values(empPlantDetails)
            .filter(value => !Array.isArray(value))  // Exclude arrays
            .every(item => item !== "");

        // Check if all array values have a length greater than 0
        const allArrayValuesHaveLengthGreaterThanZero = Object.values(empPlantDetails)
            .filter(value => Array.isArray(value))
            .every(arr => arr.length > 0);



        console.log(allNonArrayValuesAreNonEmptyStrings && allArrayValuesHaveLengthGreaterThanZero);

        if (allNonArrayValuesAreNonEmptyStrings && allArrayValuesHaveLengthGreaterThanZero) {
            setEmployeeData((prev) => ({ ...prev, plantDetails: [...prev.plantDetails, empPlantDetails] }))
            setEmpPlantDetails(initialEmpPlantDetails)
            setEmpPlantId(null);
            setPlantIndex(null);
        }

    }

    const handlePlantClick = (data, index) => {
        setEmpPlantId(data.plantName)
        setPlantIndex(index)
        setEmpPlantDetails({
            plantName: data.plantName,
            departments: data.departments
        })
    }

    const empPlantEdit = () => {
        if (employeeData.plantDetails.length > 0) {
            const updatedItems = [...employeeData.plantDetails];
            updatedItems[plantIndex] = empPlantDetails;
            setEmployeeData({ ...employeeData, plantDetails: updatedItems });
            setEmpPlantDetails(initialEmpPlantDetails)
            setEmpPlantId(null);
            setPlantIndex(null); // Clear the edited item after update

        }
    }




    const deletePlant = (index) => {

        setEmployeeData((prev) => {
            const updatedPlant = [...prev.plantDetails]
            updatedPlant.splice(index, 1);
            return {
                ...prev, plantDetails: updatedPlant,
            };
        })
        setEmpPlantDetails(initialEmpPlantDetails)
        setEmpPlantId(null)
        setPlantIndex(null)
    }






    return (
        <div style={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form className='m-3'>



                    <Paper sx={{ p: 1, flexGrow: 1, mb: 1 }} elevation={12} >


                        <Grid container spacing={1} className='mb-2' >
                            <Grid item xs={2}>
                                <TextField label="EmpCode"
                                    {...(errors.employeeCode !== "" && { helperText: errors.employeeCode, error: true })}
                                    id="employeeCodeId"
                                    defaultValue=""
                                    fullWidth
                                    size="small"
                                    onChange={handleChange}
                                    value={employeeData.employeeCode}
                                    name="employeeCode" ></TextField>
                            </Grid>
                            <Grid item xs={1}>
                                <TextField
                                    {...(errors.title !== "" && { helperText: errors.title, error: true })}
                                    fullWidth label="Title" onChange={handleChange} value={employeeData.title} select size="small" id="titleId" name="title" >

                                    <MenuItem value="">Title</MenuItem >
                                    <MenuItem value="Mr.">Mr.</MenuItem >
                                    <MenuItem value="Ms.">Ms.</MenuItem >

                                </TextField>

                            </Grid>
                            <Grid item xs={3}>



                                <Autocomplete label="First Name"
                                    disablePortal
                                    size="small"
                                    getOptionDisabled={option => true}
                                    options={employeeList.map((emp) => ({ label: emp.firstName }))}
                                    fullWidth
                                    clearOnBlur={false}
                                    onKeyDown={handleKeyDown}
                                    value={employeeData.firstName}
                                    renderInput={(params) =>
                                        <TextField {...(errors.firstName !== "" && { helperText: errors.firstName, error: true })} onChange={handleChange} value={employeeData.firstName}
                                            name="firstName" {...params} label="First Name" />} />




                            </Grid>

                            <Grid item xs={4}>
                                <TextField label="Last Name"
                                    {...(errors.lastName !== "" && { helperText: errors.lastName, error: true })}
                                    id="lastNameId"
                                    defaultValue=""
                                    size="small"
                                    fullWidth
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    value={employeeData.lastName}
                                    name="lastName" />
                            </Grid>
                            <Grid item xs={2}>

                                <DatePicker
                                    disableFuture
                                    fullWidth
                                    id="dobId"
                                    name="dob"
                                    value={dayjs(employeeData.dob)}
                                    onChange={(newValue) =>
                                        setEmployeeData((prev) => ({ ...prev, dob: newValue.format("YYYY-MM-DD") }))
                                    }
                                    label="DOB"

                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                    format="DD-MM-YYYY" />

                            </Grid>





                        </Grid>
                        <div className='row g-2 mb-2'>
                            <div className="col-md-6">
                                <TextField label="Address"
                                    {...(errors.address !== "" && { helperText: errors.address, error: true })}
                                    id="addressId"
                                    defaultValue=""
                                    size="small"
                                    fullWidth

                                    value={employeeData.address}
                                    onKeyDown={handleKeyDown}
                                    onChange={handleChange}
                                    name="address" />
                            </div>
                            <div className="col-md">
                                <DatePicker
                                    disableFuture
                                    fullWidth
                                    id="dojId"
                                    name="doj"
                                    value={dayjs(employeeData.doj)}
                                    onChange={(newValue) =>
                                        setEmployeeData((prev) => ({ ...prev, doj: newValue.format("YYYY-MM-DD") }))
                                    }
                                    label="Date of joining"

                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                    format="DD-MM-YYYY" />
                            </div>
                            <div className="col-md">
                                <TextField
                                    {...(errors.designation !== "" && { helperText: errors.designation, error: true })}
                                    fullWidth label="Designation" onChange={handleChange} value={employeeData.designation} select size="small" id="designationId" name="designation" defaultValue="" >

                                    {designationList.map((item, index) => (
                                        <MenuItem key={index} value={item.designation}>{item.designation}</MenuItem>
                                    ))}

                                </TextField>
                            </div>
                            <div className="col-md">
                                <TextField label="Role"
                                    {...(errors.empRole !== "" && { helperText: errors.empRole, error: true })}
                                    size='small' id='empRoleId' onChange={handleChange} fullWidth name='empRole' value={employeeData.empRole} select>

                                    {employeeRole.employee === "superAdmin" && <MenuItem value="admin">Admin</MenuItem>}
                                    {(employeeRole.employee === "superAdmin" || employeeRole.employee === "admin") &&
                                        <MenuItem value="plantAdmin">Plant Admin</MenuItem>}
                                    {(employeeRole.employee === "superAdmin" || employeeRole.employee === "admin" || employeeRole.employee === "plantAdmin") && <MenuItem value="creator">Creator</MenuItem>}
                                    <MenuItem value="viewer">Viewer</MenuItem>
                                </TextField>
                            </div>





                        </div>





                        <Grid container spacing={{ xs: 1 }} className=' g-2 mb-2'>



                            <Grid item xs={3}>
                                <Autocomplete
                                    id="stateId"
                                    onChange={(event, newValue) => {
                                        setStateName(newValue);
                                        setEmployeeData((prev) => ({ ...prev, state: newValue, city: "" }))
                                    }}
                                    size='small'
                                    fullWidth
                                    options={AllStates}
                                    value={employeeData.state}
                                    isOptionEqualToValue={(option) => option}
                                    renderInput={(params) => <TextField
                                        {...(errors.state !== "" && { helperText: errors.state, error: true })}
                                        {...params} label="State" name="State" />} // Set the name attribute to "state"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Autocomplete
                                    id="cityId"
                                    onChange={(event, newValue) => {
                                        setStateName(newValue);
                                        setEmployeeData((prev) => ({ ...prev, city: newValue }))
                                    }}
                                    size='small'
                                    fullWidth
                                    options={cityByState.map((item) => item.name)}
                                    value={employeeData.city}
                                    isOptionEqualToValue={(option) => option}
                                    renderInput={(params) => <TextField
                                        {...(errors.city !== "" && { helperText: errors.city, error: true })}
                                        {...params} label="City" name="City" />} // Set the name attribute to "state"
                                />
                            </Grid>


                            <Grid item xs={2}>

                                <TextField
                                    label="Contact Number"
                                    {...(errors.contactNumber !== "" && { helperText: errors.contactNumber, error: true })}
                                    id="contactNumberId"
                                    color={employeeData.contactNumber.length === 10 ? "success" : "error"}
                                    fullWidth
                                    size="small"
                                    onChange={handleChange}
                                    type='text' // Changed from 'number' to 'text'
                                    value={employeeData.contactNumber}
                                    name="contactNumber"
                                />

                            </Grid>

                            <Grid item xs={3}>
                                <TextField label="MailId "
                                    {...(errors.mailId !== "" && { helperText: errors.mailId, error: true })}
                                    id="mailId"
                                    defaultValue=""
                                    sx={{ width: "100%" }}
                                    size="small"
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    value={employeeData.mailId}
                                    name="mailId" />

                            </Grid>
                            <Grid item xs={2}>
                                <TextField label="Password "
                                    {...(errors.password !== "" && { helperText: errors.password, error: true })}
                                    id="passwordId"
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                // onClick={handleClickShowPassword}
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                onClick={handleShowPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>

                                        </InputAdornment>,
                                    }}
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    size="small"
                                    onChange={handleChange}

                                    value={employeeData.password}
                                    name="password" />
                            </Grid>
                        </Grid>

                    </Paper>




                    <Grid container spacing={1} >



                        <Grid item xs={12}>
                            <Paper sx={{
                                p: 1,
                                mb: 1
                            }}
                                elevation={12}
                            >



                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="row g-2">
                                            <div className="col-md-12">
                                                <TextField
                                                    {...(errors.employmentStatus !== "" && { helperText: errors.employmentStatus, error: true })}
                                                    fullWidth label="Employment Status" onChange={handleChange} value={employeeData.employmentStatus} select size="small" id="employmentStatusId" name="employmentStatus" >
                                                    <MenuItem value="Active">Active</MenuItem >
                                                    <MenuItem value="InActive">InActive</MenuItem >
                                                </TextField>
                                            </div>
                                            <div className="col-md-12">
                                                <TextField
                                                    disabled={empPlantId}
                                                    fullWidth label="Select Plant" onChange={handlePlantChange} value={empPlantDetails.plantName} select size="small" id="plantNameId" name="plantName"  >

                                                    {plantsData.map((plant, index) => {

                                                        const status = employeeData.plantDetails.find(empPlant => empPlant.plantName === plant.plantName)
                                                        console.log(status)
                                                        return (
                                                            <MenuItem key={index} disabled={status} value={plant.plantName}>{plant.plantName}</MenuItem>
                                                        )
                                                    })}
                                                </TextField>
                                            </div>
                                            <div className="col-md-12">
                                                <FormControl size='small' component="div" fullWidth>
                                                    <InputLabel id="departmentsId">Select Departments</InputLabel>
                                                    <Select
                                                        labelId="departmentsId"
                                                        name="departments"
                                                        multiple

                                                        value={empPlantDetails.departments}
                                                        onChange={handlePlantChange}
                                                        input={<OutlinedInput fullWidth label="Select Departments" />}
                                                        renderValue={(selected) => selected.join(", ")}

                                                        MenuProps={MenuProps}
                                                        fullWidth
                                                    >
                                                        {defaultDepartments.map((dep, index) => (
                                                            <MenuItem key={index} value={dep.department}>
                                                                <Checkbox checked={empPlantDetails.departments.indexOf(dep.department) > -1} />
                                                                <ListItemText primary={dep.department} />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>



                                        </div>
                                    </div>

                                    <div className="col-md-9" style={{ maxHeight: "134px", overflow: "auto" }}>
                                        <div className="row mb-2">
                                            <div className='col d-flex justify-content-between'>
                                                {empPlantId ? <div>
                                                    <Button className='me-2' size='small' variant='contained' color='warning' onClick={() => empPlantEdit()}>Role Update</Button>
                                                    <Button size='small' variant='contained' color='error' onClick={() => { setEmpPlantId(null); setPlantIndex(null); setEmpPlantDetails(initialEmpPlantDetails) }}>Cancel</Button>
                                                </div>
                                                    : <Button size='small' variant='contained' color='success' onClick={() => empPlantAdd()}>Add Role</Button>}
                                            </div>
                                            <div className='col-md-8 '> <h6 className=''>Roles and Authentication Details </h6></div>

                                        </div>

                                        <table className='table table-sm table-bordered text-center align-midle'>
                                            <tbody>
                                                <tr className='sticky-top table-light'>
                                                    <th>Si No</th>
                                                    <th>Plant Name</th>
                                                    <th>Departments</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                                {employeeData.plantDetails.map((plant, index) => (
                                                    <tr key={index} >
                                                        <td>{index + 1}</td>
                                                        <td>{plant.plantName}</td>
                                                        <td>{plant.departments.join(", ")}</td>
                                                        <td><IconButton color='warning' size='small' onClick={() => handlePlantClick(plant, index)}><Edit /></IconButton></td>
                                                        <td><IconButton color='error' size='small' onClick={() => deletePlant(index)}><Delete /></IconButton></td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>

                                </div>













                            </Paper>
                        </Grid>




                    </Grid>


                    <Grid item xs={6}>
                        <Paper sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1
                        }}
                            elevation={12}
                        >

                            <div className="row g-2" >
                                <div className="col d-flex ">
                                    <div className="d-flex justify-content-center">
                                        {/* <ButtonGroup className='me-3' size='small'>
                                            <Button size='small' variant="contained" >
                                                Upload
                                                <VisuallyHiddenInput type="file" onChange={handleEmpExcel} />
                                            </Button>
                                            <Button size='small' onClick={handleEmpUpload}><CloudUpload /></Button>
                                        </ButtonGroup>

                                        <ButtonGroup size='small'>
                                            <Button size='small' variant="contained" color='secondary'>
                                                Download
                                                <VisuallyHiddenInput type="file" />
                                            </Button>
                                            <Button size='small' color='secondary'><CloudDownload /></Button>
                                        </ButtonGroup> */}
                                        <ButtonGroup className='me-3' size="small">
                                            <Button component="label" variant="contained" size='small' >
                                                Upload
                                                <VisuallyHiddenInput type="file" onChange={handleEmpExcel} />
                                            </Button>
                                            <Button size="small" onClick={handleEmpUpload}><CloudUpload /></Button>
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

                                {empDataId ? <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Employee update confirmation"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure to update a Employee
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={(e) => { EmployeeUpdate(e); handleClose(); }} autoFocus>
                                            Update
                                        </Button>
                                    </DialogActions>
                                </Dialog> : <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Employee create confirmation"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure to create the Employee
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={(e) => { EmployeeSubmit(e); handleClose(); }} autoFocus>
                                            Submit
                                        </Button>
                                    </DialogActions>
                                </Dialog>}

                                {/* <Stack sx={{ width: '50%' }} spacing={2}>
                        <Alert severity="error">This is an error alert — check it out!</Alert>
                        <Alert severity="warning">This is a warning alert — check it out!</Alert>
                        <Alert severity="info">This is an info alert — check it out!</Alert>
                        <Alert severity="success">This is a success alert — check it out!</Alert>
                    </Stack> */}
                                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                                    <Alert onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '25%' }}>
                                        {errorhandler.message}
                                    </Alert>
                                </Snackbar>

                                <div className='col d-flex justify-content-end'>
                                    {empDataId ? <div className='col d-flex justify-content-end'>
                                        <div className='me-2' >
                                            <Button type="button" variant='contained' color='warning' size="small" onClick={handleClickOpen} className='btn btn-secondary' >Modify</Button>
                                        </div>
                                        <div className='me-2' >
                                            <Button type="button" variant='contained' color='error' size="small" onClick={() => { setEmpDataId(null); setEmployeeData(initialEmpData) }} >Cancel</Button>
                                        </div>
                                    </div> :
                                        <div>
                                            <Button variant='contained' size="small" color='success' onClick={handleClickOpen}>+ Add Employee</Button>
                                        </div>
                                    }
                                </div>
                            </div>
                            {empExcelStatus && <p style={{ color: 'green' }}>{empExcelStatus}</p>}
                        </Paper>
                    </Grid>


                    <Grid item xs={6}>
                        <Paper sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1


                        }}
                            elevation={12}
                        >

                            {/* <h3 className='text-center'>Employee List</h3> */}




                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} className=' g-2 mb-2'>

                                <Grid item xs={3}>
                                    <TextField fullWidth label="Employment Status Filter" value={filterAllNames.employementStatusFilter} onChange={handleFilterChange} select size="small" id="employementStatusFilterId" name="employementStatusFilter" defaultValue="" >
                                        <MenuItem value="all">All</MenuItem >
                                        <MenuItem value="Active">Active</MenuItem >
                                        <MenuItem value="InActive">InActive</MenuItem >

                                    </TextField>

                                </Grid>
                                <Grid item xs={4}>
                                    {/* <TextField fullWidth label="Department Filter" value={filterAllNames.departmentFilter} onChange={handleFilterChange} select size="small" id="departmentFilterId" name="departmentFilter" defaultValue="" >
                                        <MenuItem value="all">All</MenuItem>
                                        {FilterNameList.department.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))

                                        }
                                    </TextField> */}

                                    <TextField label="Plant Wise"
                                        id="departmentFilterId"
                                        select
                                        defaultValue="all"
                                        fullWidth
                                        value={filterAllNames.departmentFilter}
                                        onChange={handleFilterChange}
                                        size="small"
                                        name="departmentFilter" >

                                        <MenuItem value="all">All</MenuItem>
                                        {loggedEmp.plantDetails.map((item, index) => (
                                            <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                        ))}
                                    </TextField>



                                    {/* <TextField
                                        fullWidth
                                        label="Department Filter"
                                        value={filterAllNames.departmentFilter}
                                        onChange={handleFilterChange}
                                        select
                                        size="small"
                                        id="departmentFilterId"
                                        name="departmentFilter"
                                        defaultValue=""
                                    >
                                        <MenuItem value="all">All</MenuItem>
                                        {defaultDepartments.map((item, index) => (
                                            <MenuItem key={index} value={item.department}>
                                                {item.department}
                                            </MenuItem>
                                        ))}

                                    </TextField> */}
                                </Grid>



                                <Grid item xs={2}>



                                </Grid>


                            </Grid>
                            <div>
                                <div style={{ height: 300, width: '100%' }}>
                                    <DataGrid
                                        rows={filteredData}
                                        columns={employeeColumns}
                                        getRowId={(row) => row._id}
                                        disableDensitySelector
                                        disableColumnFilter

                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        sx={{
                                            ".MuiTablePagination-displayedRows": {

                                                "marginTop": "1em",
                                                "marginBottom": "1em"
                                            },

                                        }}
                                        slots={{
                                            toolbar: () => (
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <GridToolbar />
                                                    <div>
                                                        {employeeSelectedRowIds.length !== 0 && <Button variant='contained' size='small' component="button" fullWidth type='button' color='error' onClick={() => handleDeleteOpen(true)}>Delete  Employee</Button>}
                                                    </div>

                                                </div>
                                            ),
                                        }}
                                        onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                            setEmployeeSelectedRowIds(newRowSelectionModel);
                                            console.log(event)

                                        }}
                                        onRowClick={handleSetEmp}
                                        disableRowSelectionOnClick
                                        density="compact"
                                        checkboxSelection

                                        pageSizeOptions={[5]}
                                    >

                                    </DataGrid>




                                </div>


                                <Dialog
                                    open={deleteOpen}
                                    onClose={handleDeleteClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {" Employee delete  confirmation "}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure to delete the Employee
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleDeleteClose}>Cancel</Button>
                                        <Button onClick={(e) => { deleteEmployee(); handleDeleteClose(); }} autoFocus>
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>




                            </div>

                        </Paper>
                    </Grid>

                </form>

            </LocalizationProvider>
        </div >
    )
}

export default Employee