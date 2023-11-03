import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { TextField, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Grid, Paper, Container } from '@mui/material';


const Employee = () => {
    const ref0 = useRef();

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


    const [filteredData, setFilteredData] = useState([])

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
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
        dob: "",
        address: "",
        city: "",
        state: "",
        contactNumber: "",
        designation: "",
        department: "",
        mailId: "",
        doj: "",
        employmentStatus: "",
        reportTo: ""
    }



    const [employeeData, setEmployeeData] = useState({
        employeeCode: "",
        title: "",
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        contactNumber: "",
        designation: "",
        department: "",
        mailId: "",
        doj: "",
        employmentStatus: "",
        reportTo: ""
    });

    const handleSetEmp = (emp) => {
        setEmployeeData(emp)
        setEmpDataId(emp._id)
    }
    console.log(employeeData)
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled"  {...props} />;
    });
    const [open, setOpen] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    //open Modal
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                `${process.env.REACT_APP_PORT}/general/getCityByStateName/${StateName}`
            );
            setCityByState(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        if (employeeData.state) {
            cityFetch();
        }


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
        let capitalizedValue = value.toUpperCase()
        console.log(capitalizedValue)

        if (name === "firstName") {
            // Convert the input value to uppercase and set it

        }
        setEmployeeData((prev) => ({ ...prev, [name]: value }));

    };





    const EmployeeSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/employee/createEmployee`, employeeData
            );

            setSnackBarOpen(true)
            empFetch();
            console.log("Employee Created Successfully")
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
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
            setStateName(formattedValue); // Update the state to show the formatted value
            setEmployeeData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value
        }
    };


    const deleteEmployee = async (id) => {

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/employee/deleteEmployee/${id}`
            );
            console.log(response)
            empFetch();
            setSnackBarOpen(true)
            setErrorHandler({ status: response.data.status, message: `${response.data.result.firstName} ${response.data.result.lastName} ${response.data.message}`, code: "success" })
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
    const currentDate = new Date();
    console.log(currentDate)
    const currentDay = currentDate.getDate().toString();
    const currentMonth = (currentDate.getMonth() + 1).toString();
    const currentYear = currentDate.getFullYear().toString();
    const DateFormat = currentYear + "-" + currentMonth + "-" + currentDay

    console.log(currentDay + "-" + currentMonth + "-" + currentYear)

    // const EmployeeDelete = (id) => {
    //     try{
    //         const response = await axios.delete(
    //             `${process.env.REACT_APP_PORT}/employee/deleteEmployee/${id}`
    //         );
    //         empFetch();

    //     }catch{

    //     }
    // }

    const [value, setValue] = useState(null)

    console.log(value)



    return (
        <div>
            <form >

                <Container maxWidth="lg" sx={{ mb: 2 }}>
                    <Paper sx={{
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        mb: 2
                    }} >


                        <Grid container spacing={1} >
                            {/* <div className="form-floating  col-2">
                                <input onChange={handleChange} value={employeeData.employeeCode} type="text" className="form-control" id="employeeCodeId" name="employeeCode" placeholder="employeeCode" />
                                <label htmlFor="employeeCodeId">Emp.code</label>
                            </div> */}
                            <Grid item xs={1}>

                                <TextField label="Emp Code"
                                    id="employeeCodeId"
                                    defaultValue=""
                                    size="small"
                                    onChange={handleChange}
                                    value={employeeData.employeeCode}
                                    name="employeeCode" />

                            </Grid>


                            <Grid item xs={1}>
                                <TextField label="Title" onChange={handleChange} value={employeeData.title} className="form-select" select size="small" id="titleId" name="title" defaultValue="" >

                                    <MenuItem value="">Title</MenuItem >
                                    <MenuItem value="1">Mr.</MenuItem >
                                    <MenuItem value="2">Ms.</MenuItem >

                                </TextField>

                            </Grid>
                            <Grid item xs={2}>

                                <TextField label="First Name"
                                    id="firstNameId"
                                    defaultValue=""
                                    size="small"
                                    onChange={handleChange}
                                    value={employeeData.firstName}
                                    name="firstName" />

                            </Grid>
                            <Grid item xs={2}>

                                <TextField label="Last Name"
                                    id="lastNameId"
                                    defaultValue=""
                                    size="small"
                                    onChange={handleChange}
                                    value={employeeData.lastName}
                                    name="lastName" />

                            </Grid>
                            <Grid item xs={4}>
                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                   
                                        <DatePicker label="DOB"
                                             id="dobId"
                                            size="small"
                                         name="dob"
                                            value={dayjs(employeeData.dob)}
                                         onChange={(newValue) => {
                                              if (newValue) {
                                                   setEmployeeData((prev) => ({ ...prev, dob: `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}` }))
                                                }
                                     }}
                                         format='DD/MM/YYYY'
                                        ></DatePicker>
                                    
                             </LocalizationProvider> 

                            </Grid>

                            <Grid item xs={12}>
                                <TextField label="Address" fullWidth size="small" onChange={handleChange} value={employeeData.address} onKeyDown={handleKeyDown} name='address' multiline maxRows={2} />
                            </Grid>

                        </Grid>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} className=' g-2 mb-2'>

                            <Grid item xs={3}>
                                <Autocomplete
                                    id="stateId"
                                    onChange={(event, newValue) => {
                                        setStateName(newValue);
                                        setEmployeeData((prev) => ({ ...prev, state: newValue }))
                                    }}
                                    // name="state"
                                    size='small'
                                    options={AllStates}
                                    sx={{ width: 260 }}
                                    value={employeeData.state}
                                    isOptionEqualToValue={(option) => option}
                                    renderInput={(params) => <TextField {...params} label="State" name="State" />} // Set the name attribute to "state"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Autocomplete
                                    id="cityId"
                                    onChange={(event, newValue) => {
                                        setStateName(newValue);
                                        setEmployeeData((prev) => ({ ...prev, city: newValue }))
                                    }}
                                    size='small'
                                    // name="state"
                                    options={cityByState.map((item) => item.name)}
                                    sx={{ width: 260 }}
                                    value={employeeData.city}
                                    isOptionEqualToValue={(option) => option}
                                    renderInput={(params) => <TextField {...params} label="City" name="City" />} // Set the name attribute to "state"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <div className="form-floating ">
                                    <input onChange={handleChange} value={employeeData.contactNumber} type="number" maxLength={10} className={employeeData.contactNumber.length === 10 ? `form-control is-valid` : `form-control is-invalid`} id="contactNumberId" placeholder="contactNumber" name='contactNumber' />
                                    <label htmlFor="contactNumberId">Contact Number</label>
                                    {employeeData.contactNumber.length === 10 ? "" : <div className='invalid-feedback'>Contact must be in 10 digits</div>}
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div className="form-floating">
                                    <input onChange={handleChange} style={{ textTransform: "lowercase" }} value={employeeData.mailId} type="mail" className="form-control" id="mailid" placeholder="name@example.com" name='mailId' />
                                    <label htmlFor="mailId">Mail Id</label>
                                </div>
                            </Grid>

                        </Grid>
                    </Paper>




                    <Grid container spacing={2} >
                        <Grid item xs={6}>
                            <Paper sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 2
                            }} >
                                <div className='row g-2 '>

                                    <Autocomplete
                                        id="stateId"
                                        onChange={(event, newValue) => {
                                            setStateName(newValue);
                                            setEmployeeData((prev) => ({ ...prev, state: newValue }))
                                        }}
                                        // name="state"
                                        options={AllStates}
                                        sx={{ width: 260 }}
                                        value={employeeData.state}
                                        isOptionEqualToValue={(option) => option}
                                        renderInput={(params) => <TextField {...params} label="State" name="State" />} // Set the name attribute to "state"
                                    />

                                    <Autocomplete
                                        id="cityId"
                                        onChange={(event, newValue) => {
                                            setStateName(newValue);
                                            setEmployeeData((prev) => ({ ...prev, city: newValue }))
                                        }}
                                        // name="state"
                                        options={cityByState.map((item) => item.name)}
                                        sx={{ width: 260 }}
                                        value={employeeData.city}
                                        isOptionEqualToValue={(option) => option}
                                        renderInput={(params) => <TextField {...params} label="City" name="City" />} // Set the name attribute to "state"
                                    />
                                    <div className="form-floating col-6">
                                        <select onChange={handleChange} value={employeeData.designation} className="form-select" id="designationId" name="designation" >
                                            <option value="">Designation</option>
                                            {designationList.map((item) => (
                                                <option key={item._id} value={item.designation}>{item.designation}</option>
                                            ))}
                                        </select>
                                        <label htmlFor="designationId">Designation</label>
                                    </div>

                                    <div className="form-floating md-3 col-6">
                                        <select onChange={handleChange} value={employeeData.department} className="form-select" id="departmentId" name="department" >
                                            <option value="">Select department</option>
                                            {departmentList.map((item) => (
                                                <option key={item._id} value={item.department}>{item.department}</option>
                                            ))

                                            }
                                        </select>
                                        <label htmlFor="departmentId">Department</label>
                                    </div>





                                </div>
                            </Paper>
                        </Grid>


                        <Grid item xs={6}>
                            <Paper sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 2
                            }} >
                                <div className='row g-2 mb-2'>
                                    <div className="form-floating col-6">
                                        <input onChange={handleChange} value={employeeData.doj} max={DateFormat} type="date" className="form-control" id="dojId" name="doj" placeholder="doj" />
                                        <label htmlFor="dojId">Date Of joining</label>
                                    </div>
                                    <div className="form-floating col-6">
                                        <select onChange={handleChange} value={employeeData.employmentStatus} className="form-select" id="employmentStatusId" name="employmentStatus" >
                                            <option value="">Select Status</option>
                                            <option value="Active">Active</option>
                                            <option value="InActive">InActive</option>
                                            <option value="Relieved">Relieved</option>
                                        </select>
                                        <label htmlFor="employmentStatusId">Employment Status</label>
                                    </div>
                                    <div className="form-floating mt-0 ">
                                        <select onChange={handleChange} value={employeeData.reportTo} className="form-select" id="reportToId" name="reportTo" >
                                            <option value="">Select</option>
                                            {employeeList.map((item) => (
                                                <option value={item.firstName}>{item.firstName}</option>
                                            ))}

                                        </select>
                                        <label htmlFor="reportToId">Report To</label>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>

                    </Grid>


                    <Grid item xs={6}>
                        <Paper sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 2
                        }} >

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
                                        {"Update Confirmation"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure to Update a Employee
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
                                        {"Create Confirmation"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure to Create the Employee
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
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 2
                        }} >

                            <h3 className='text-center'>Employee List</h3>
                            <div className='row g-2 mb-3'>
                                <div className="form-floating md-3 col">
                                    <select className="form-select" id="employementStatusFilterId" name="employementStatusFilter" onChange={handleFilterChange}>
                                        <option value="all">All</option>
                                        <option value="Active">Active</option>
                                        <option value="InActive">InActive</option>
                                        <option value="Relieved">Relieved</option>
                                    </select>
                                    <label htmlFor="employementStatusFilterId">Employment Status To</label>
                                </div>
                                <div className="form-floating col">
                                    <select className="form-select" id="departmentFilterId" name="departmentFilter" onChange={handleFilterChange}>
                                        <option value="all">All</option>
                                        {departmentList.map((item) => (
                                            <option key={item._id} value={item.department}>{item.department}</option>
                                        ))

                                        }
                                    </select>
                                    <label htmlFor="departmentFilterId">Department</label>
                                </div>
                                <div className="form-floating col">
                                    <select className="form-select" id="reportToFilterId" name="reportToFilter" onChange={handleFilterChange}>
                                        <option value="all">All</option>
                                        {employeeList.map((item) => (
                                            <option>{item.firstName}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="reportToFilterId">Report To</label>
                                </div>
                            </div>
                            <div>
                                <table className='table table-bordered text-center'>
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
                                            <tr key={emp._id} onClick={() => handleSetEmp(emp)}>
                                                <td>{emp.employeeCode}</td>
                                                <td>{emp.firstName + emp.lastName}</td>
                                                <td>{emp.contactNumber}</td>
                                                <td>{emp.mailId}</td>
                                                <td>{emp.designation}</td>
                                                <td>{emp.department}</td>
                                                <td>{emp.reportTo}</td>
                                                <td><button type='button' className='btn btn-danger' onClick={() => deleteEmployee(emp._id)}><i className="bi bi-trash"></i></button></td>
                                            </tr>
                                        ))}


                                    </tbody>


                                </table>
                                {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                            </div>
                        </Paper>
                    </Grid>









                </Container>
            </form>


        </div >
    )
}

export default Employee