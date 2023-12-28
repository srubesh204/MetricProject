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
import { TextField, MenuItem, InputAdornment } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Grid, Paper, IconButton, Container } from '@mui/material';
import dayjs from 'dayjs';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Delete, Visibility, VisibilityOff } from '@mui/icons-material';



const Employee = () => {
    const ref0 = useRef();
    const currentDate = new Date();
    console.log(currentDate)
    const currentDay = currentDate.getDate().toString();
    const currentMonth = (currentDate.getMonth() + 1).toString();
    const currentYear = currentDate.getFullYear().toString();
    const DateFormat = currentYear + "-" + currentMonth + "-" + currentDay

    console.log(currentDay + "-" + currentMonth + "-" + currentYear)

    const [employeeList, setEmployeeList] = useState([]);
    const [empDataId, setEmpDataId] = useState(null)
    const empFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/employee/getAllEmployees`
            );
            setEmployeeList(response.data.result);
            setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        empFetch();
    }, []);

    const [employeeSelectedRowIds, setEmployeeSelectedRowIds] = useState([]);

    const employeeColumns = [
        { field: 'id', headerName: 'Si. No', width: 50, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, align: "center" },

        { field: 'employeeCode', headerName: 'Emp.Code', width: 80 },
        {
            field: 'Name',
            headerName: 'Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 120,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },

        { field: 'dob', headerName: 'DOB', width: 100, valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY') },
        { field: 'contactNumber', headerName: 'Contact No', type: "number", width: 120, },
        { field: 'designation', headerName: 'Designation', width: 120, },
        { field: 'department', headerName: 'Department', width: 130, },
        { field: 'empRole', headerName: 'Role', width: 150, },
        { field: 'reportTo', headerName: 'Report To', width: 100, },


    ];






    const [filteredData, setFilteredData] = useState([])

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(e)
        if (value === "all") {
            setFilteredData(employeeList)
        } else {
            if (name === "departmentFilter") {
                const departmentFilter = employeeList.filter((item) => (item.department === value))
                setFilteredData(departmentFilter)
            }
            if (name === "employementStatusFilter") {
                const statusFilter = employeeList.filter((item) => (item.employmentStatus === value))
                console.log(statusFilter)
                setFilteredData(statusFilter)
                console.log(value)
            }
            if (name === "reportToFilter") {
                const reportFilter = employeeList.filter((item) => (item.reportTo === value))
                setFilteredData(reportFilter)
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
        department: "",
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
        department: "",
        mailId: "",
        doj: DateFormat,
        employmentStatus: "Active",
        reportTo: "",
        empRole: "",
        password: "",
    });

    const handleSetEmp = async (params) => {
        console.log(params)
        setEmployeeData(params.row)
        setEmpDataId(params.id)
    }




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
    const depFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            setDepartmentList(response.data.result);
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
        tempErrors.department = employeeData.department ? "" : "Department is Required"
        tempErrors.doj = employeeData.doj ? "" : "DOJ is Required"
        tempErrors.employmentStatus = employeeData.employmentStatus ? "" : "Employment Status is Required"

        setErrors({ ...tempErrors })

        return Object.values(tempErrors).every(x => x === "")
    }

    console.log(errors)



    const EmployeeSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateFunction()){
                const response = await axios.post(
                    `${process.env.REACT_APP_PORT}/employee/createEmployee`, employeeData
                );

                setSnackBarOpen(true)
                empFetch();
                console.log("Employee Created Successfully")
                setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
                setEmployeeData(initialEmpData)
                setEmpDataId(null)
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


    const [value, setValue] = useState(null)

    console.log(value)



    return (
        <div>
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
                                    <MenuItem value="1">Mr.</MenuItem >
                                    <MenuItem value="2">Ms.</MenuItem >

                                </TextField>

                            </Grid>
                            <Grid item xs={3}>

                                {/* <TextField label="First Name"
                                    {...(errors.firstName !== "" && { helperText: errors.firstName, error: true })}
                                    id="firstNameId"
                                    defaultValue=""
                                    fullWidth
                                    size="small"
                                    sx={{ width: "100%" }}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    value={employeeData.firstName}
    name="firstName" />*/}

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

                                    slotProps={{ textField: { size: 'small' } }}
                                    format="DD-MM-YYYY" />

                            </Grid>





                        </Grid>
                        <div className='row g-2 mb-2'>
                            <div className="col-md-10">
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
                            <div className="col">
                                <TextField label="Role"
                                        {...(errors.empRole !== "" && { helperText: errors.empRole, error: true })}
                                         size='small' id='empRoleId' onChange={handleChange} fullWidth name='empRole' value={employeeData.empRole} select>
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="plantAdmin">Plant Admin</MenuItem>
                                    <MenuItem value="creator">Creator</MenuItem>
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

                                <TextField label="Contact Number "
                                    {...(errors.contactNumber !== "" && { helperText: errors.contactNumber, error: true })}
                                    id="contactNumberId"
                                    color={employeeData.contactNumber.length !== 10 ? "error" : "success"}
                                    fullWidth

                                    size="small"
                                    onChange={handleChange}
                                    type='number'
                                    value={employeeData.contactNumber}
                                    name="contactNumber" />

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




                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <Paper sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1
                            }}
                                elevation={12}
                            >
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} className=' g-2 mb-2'>

                                    <Grid item xs={6}>
                                        <TextField
                                            {...(errors.designation !== "" && { helperText: errors.designation, error: true })}
                                            fullWidth label="Designation" onChange={handleChange} value={employeeData.designation} select size="small" id="designationId" name="designation" defaultValue="" >

                                            {designationList.map((item, index) => (
                                                <MenuItem key={index} value={item.designation}>{item.designation}</MenuItem>
                                            ))}

                                        </TextField>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            {...(errors.department !== "" && { helperText: errors.department, error: true })}
                                            fullWidth label="Department" onChange={handleChange} value={employeeData.department} select size="small" id="DepartmentId" name="department" defaultValue="" >

                                            {departmentList.map((item, index) => (
                                                <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
                                            ))}
                                        </TextField>

                                    </Grid>
                                </Grid>
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
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} className=' g-2 mb-2'>
                                    <Grid item xs={4}>


                                        <DatePicker
                                            disableFuture
                                            fullWidth
                                            id="dojId"
                                            name="doj"
                                            value={dayjs(employeeData.doj)}
                                            onChange={(newValue) =>
                                                setEmployeeData((prev) => ({ ...prev, doj: newValue.format("YYYY-MM-DD") }))
                                            }
                                            label="DOJ"

                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY" />

                                    </Grid>
                                    {/*<div className="form-floating col-6">
                                            <input onChange={handleChange} value={employeeData.doj} max={DateFormat} type="date" className="form-control" id="dojId" name="doj" placeholder="doj" />
                                            <label htmlFor="dojId">Date Of joining</label>
                                        </div>*/}
                                    <Grid item xs={5}>
                                        <TextField
                                            {...(errors.employmentStatus !== "" && { helperText: errors.employmentStatus, error: true })}
                                            fullWidth label="Employment Status" onChange={handleChange} value={employeeData.employmentStatus} select size="small" id="employmentStatusId" name="employmentStatus" defaultValue="" >
                                            <MenuItem value="Active">Active</MenuItem >
                                            <MenuItem value="InActive">InActive</MenuItem >
                                        </TextField>

                                    </Grid>
                                    {/* <div className="form-floating col-6">
                                            <select onChange={handleChange} value={employeeData.employmentStatus}  id="employmentStatusId" name="employmentStatus" >
                                                <option value="">Select Status</option>
                                                <option value="Active">Active</option>
                                                <option value="InActive">InActive</option>
                                                <option value="Relieved">Relieved</option>
                                            </select>
                                            <label htmlFor="employmentStatusId">Employment Status</label>
                                        </div>*/}
                                    <Grid item xs={3}>
                                        <TextField fullWidth label="Report To" onChange={handleChange} value={employeeData.reportTo} select size="small" id="reportToId" name="reportTo">
                                            <MenuItem value="N/A">N/A</MenuItem>
                                            {employeeList.map((item, index) => (
                                                <MenuItem key={index} value={item.firstName}>{`${item.firstName} ${item.lastName}`}</MenuItem>
                                            ))}
                                        </TextField>

                                    </Grid>
                                </Grid>
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
                                    <div className='me-2' >
                                        <label className='uplable'>
                                            <input className="form-control downlable" type="file" id="uploadExcel" />Upload
                                        </label>
                                    </div>
                                    <div >
                                        <label className='uplable'>
                                            <input className="form-control downlable" type="file" id="downloadExcel" />Download
                                        </label>
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
                                            <button type="button" onClick={handleClickOpen} className='btn btn-secondary' >Modify</button>
                                        </div>
                                        <div className='me-2' >
                                            <button type="button" className='btn btn-danger' onClick={() => { setEmpDataId(null); setEmployeeData(initialEmpData) }} >Cancel</button>
                                        </div>
                                    </div> :
                                        <div>
                                            <button onClick={handleClickOpen} type="button" className='btn btn-warning'>+ Add Employee</button>
                                        </div>
                                    }
                                </div>
                            </div>
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

                            <h3 className='text-center'>Employee List</h3>




                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} className=' g-2 mb-2'>

                                <Grid item xs={3}>
                                    <TextField fullWidth label="Employment Status Filter" onChange={handleFilterChange} select size="small" id="employementStatusFilterId" name="employementStatusFilter" defaultValue="" >
                                        <MenuItem value="all">All</MenuItem >
                                        <MenuItem value="Active">Active</MenuItem >
                                        <MenuItem value="InActive">InActive</MenuItem >

                                    </TextField>

                                </Grid>
                                <Grid item xs={4}>
                                    <TextField fullWidth label="Department Filter" onChange={handleFilterChange} select size="small" id="departmentFilterId" name="departmentFilter" defaultValue="" >
                                        <MenuItem value="all">All</MenuItem>
                                        {departmentList.map((item) => (
                                            <MenuItem key={item._id} value={item.department}>{item.department}</MenuItem>
                                        ))

                                        }
                                    </TextField>
                                </Grid>


                                <Grid item xs={3}>
                                    <TextField fullWidth label="Report To" onChange={handleFilterChange} select size="small" id="reportToFilterId" name="reportToFilter" defaultValue="" >
                                        <MenuItem value="all">All</MenuItem>
                                        <MenuItem value="N/A">N/A</MenuItem>
                                        {employeeList.map((item, index) => (
                                            <MenuItem key={index} value={item.firstName}>{item.firstName}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='col d-flex justify-content-end mb-2'>
                                        {employeeSelectedRowIds.length !== 0 && <Button variant='contained' component="button" fullWidth type='button' color='error' onClick={() => handleDeleteOpen(true)}>Delete  Employee</Button>}

                                    </div>
                                </Grid>

                                {/* <div className="form-floating col">
                                        <select  id="reportToFilterId" name="reportToFilter" onChange={handleFilterChange}>
                                            <option value="all">All</option>
                                            {employeeList.((item) => (
                                                <option>{item.firstName}</option>
                                            ))}
                                        </select>
                                        <label htmlFor="reportToFilterId">Report To</label>
                                    </div>*/}
                            </Grid>
                            <div>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={filteredData}
                                        columns={employeeColumns}
                                        getRowId={(row) => row._id}
                                        disableDensitySelector
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
                                            setEmployeeSelectedRowIds(newRowSelectionModel);
                                            console.log(event)

                                        }}
                                        onRowClick={handleSetEmp}

                                        density="compact"
                                        //disableColumnMenu={true}

                                        checkboxSelection
                                        pageSizeOptions={[5]}


                                    >

                                    </DataGrid>




                                </div>













                                {/* <table className='table table-bordered text-center'>
                                        <tbody>
                                            <tr>
                                                <th>Emp.Code</th>
                                                <th>Emp.Name</th>
                                                <th>Contact Number</th>
                                                <th>Mail Id</th>
                                                <th>Designation</th>
                                                <th>Department</th>
                                                <th>Report To</th>
                                                <th>Delete</th>

                                            </tr>
                                            {filteredData.map((emp, index) => (
                                                <tr key={emp._id} onClick={() => handleSetEmp(emp)} className={empDataId === emp._id ? "table-active" : ""}>
                                                    <td>{emp.employeeCode}</td>
                                                    <td>{emp.firstName + " " + emp.lastName}</td>
                                                    <td>{emp.contactNumber}</td>
                                                    <td>{emp.mailId}</td>
                                                    <td>{emp.designation}</td>
                                                    <td>{emp.department}</td>
                                                    <td>{emp.reportTo}</td>
                                                    <td><button type='button' className='btn btn-danger' onClick={() => handleDeleteOpen(emp._id)}><i className="bi bi-trash"></i></button></td>
                                                </tr>
                                            ))}


                                        </tbody>


                                    </table>*/}
                                {/*Delete Confirmation*/}
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



                                {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                            </div>
                        </Paper>
                    </Grid>











                </form>

            </LocalizationProvider>
        </div >
    )
}

export default Employee