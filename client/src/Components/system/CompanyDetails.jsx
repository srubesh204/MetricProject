import React, { createContext, useEffect, useState, useContext } from 'react'
import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, Fab, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import { Add, Close, CloudUpload, Delete, Done, Edit, Receipt, Remove } from '@mui/icons-material';
import axios from 'axios'
import { styled } from '@mui/material/styles';
import { useEmployee } from '../../App';

const CompanyDetails = () => {

    const empDetails = useEmployee

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

    const [errorHandler, setErrorHandler] = useState({})

    const [mailSnackBar, setMailSnackBar] = useState(false)
    const [openModal, setOpenModal] = useState(false);

    const handleSnackClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }

        setMailSnackBar(false);
    }

    const [employeeData, setEmployeeData] = useState({
        admins: [],
        plantAdmins: [],
        creators: [],
        viewers: []
    })
    const empFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/employee/getAllEmployees`
            );
            const admin = response.data.result.filter((emp) => emp.empRole === "admin")
            const plantAdmin = response.data.result.filter((emp) => emp.empRole === "plantAdmin")
            const creator = response.data.result.filter((emp) => emp.empRole === "creator")
            const viewer = response.data.result.filter((emp) => emp.empRole === "viewer")
            setEmployeeData((prev) => ({
                ...prev,
                admins: admin,
                plantAdmins: plantAdmin,
                creators: creator,
                viewers: viewer
            }));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        empFetch();
    }, []);


    const initialMailData = {
        userType: "",
        companyName: "",
        companyAddress: "",
        companyLogo: "",
        companyImage: ""
    }
    const [isEditable, setIsEditable] = useState(false)
    const [companyData, setCompanyData] = useState({
        userType: "",
        companyName: "",
        companyAddress: "",
        companyLogo: "",
        companyImage: ""

    })

    const [plantDatas, setPlantDatas] = useState([])

    const plantFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/compDetails/getAllPlantDetails`
            );
            setPlantDatas(response.data.result)
            console.log(response.data.result)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        plantFetch();
    }, []);

    const [plantData, setPlantData] = useState({
        plantName: "",
        plantAddress: "",
        admins: [],
        plantAdmins: [],
        creators: [],
        viewers: []
    })
    console.log(companyData, plantData)

    const companysFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/compDetails/getCompDetailsById/658c12ca19f2c8564204a6af`
            );
            const details = response.data.result
            console.log(details)
            setCompanyData((prev) => ({
                ...prev,
                userType: details.userType,
                companyName: details.companyName,
                companyAddress: details.companyAddress,
                companyPlants: details.companyPlants,
                companyLogo: details.companyLogo,
                companyImage: details.companyImage
            }));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        companysFetchData();
    }, []);





    const [companyDataList, setCompanyDataList] = useState([])
    const companyFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/compDetails/getAllCompDetails`
            );
            setCompanyDataList(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        companyFetchData();
    }, []);

    const updateMailData = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/compDetails/updateCompDetails/658c12ca19f2c8564204a6af`, companyData

            );
            console.log(response.data)
            companysFetchData();
            setCompanyData(initialMailData);
            setMailSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            setIsEditable(false)
            console.log(response);
        } catch (err) {
            console.log(err);
            setMailSnackBar(true)
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
    const handleCompany = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        setFile(selectedFile);
    };



    {/* const handleCompanyChanges = (e) => {
        const { name, value } = e.target;
        setCompanyData((prev) => ({ ...prev, [name]: value }));


    }*/}
    const handleCompanyChange = (e) => {
        const { name, checked, value, type } = e.target;
        let updatedValue = value;
        if (type === "checkbox") {
            updatedValue = checked ? "1" : "0";
        }

        setCompanyData((prev) => ({ ...prev, [name]: updatedValue }));
    };


    const addPlantDataRow = () => {
        setCompanyData((prevCompanyData) => ({
            ...prevCompanyData,
            companyPlants: [
                ...prevCompanyData.companyPlants,
                { plantAddress: '', /* other fields */ }
            ]
        }));
    };

    const deletePlantRow = (index) => {
        setCompanyData((prevCompanyData) => {
            const updateCP = [...prevCompanyData.companyPlants]
            updateCP.splice(index, 1);
            return {
                ...prevCompanyData, companyPlants: updateCP,
            };
        })
    };




    const changeCompanyRow = (index, name, value) => {
        const formattedValue = name === 'companyPlants'
            ? value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : value;
        setCompanyData((prevCompanyData) => {
            const updateCP = [...prevCompanyData.companyPlants]
            updateCP[index] = {
                ...updateCP[index], [name]: formattedValue,
            };
            return {
                ...prevCompanyData, companyPlants: updateCP,
            };
        })
    };


    const handleAdminChange = (e) => {
        const { name, value } = e.target;
        setPlantData((prev) => ({ ...prev, [name]: value }));
    };



    return (
        <div>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <form>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,

                        }}
                        elevation={12}
                    >

                        <div className='row mt-3'>
                            <div className='col'>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    disabled={!isEditable}
                                    value={companyData.userType}
                                    name="userType"
                                    onChange={handleCompanyChange}
                                >
                                    <FormControlLabel value="singleUser" checked={companyData.userType === "singleUser"} disabled={!isEditable} control={<Radio />} label="SingleUser" />
                                    <FormControlLabel value="multiUser" checked={companyData.userType === "multiUser"} disabled={!isEditable} control={<Radio />} label="MultiUser" />
                                </RadioGroup>
                            </div>
                            <div className=' col d-flex justify-content-end'>
                                <div className='me-2 '>
                                    <Button onClick={() => setIsEditable(true)}><Edit color='success' /></Button>
                                </div>



                            </div>


                        </div>
                        <div className='row g-2 mb-2'>
                            <div className='col-6'>
                                <TextField label="Company Name"
                                    id="companyNameId"
                                    value={companyData.companyName}
                                    disabled={!isEditable}
                                    onChange={handleCompanyChange}
                                    size="small"
                                    sx={{ width: "100%" }}
                                    name="companyName" />


                            </div>
                            {companyData.userType === "singleUser" && <div className='col-6'>
                                <TextField label="Company Address"
                                    id="companyNameId"
                                    value={companyData.companyAddress}
                                    disabled={!isEditable}
                                    onChange={handleCompanyChange}
                                    size="small"
                                    sx={{ width: "100%" }}
                                    name="companyAddress" />


                            </div>}
                        </div>
                        <div className="row g-2 mb-2">
                            <div className="col-md-6">
                                <TextField label="Party Name"
                                    id="plantNameId"
                                    value={plantData.plantName}
                                    onChange={handleAdminChange}
                                    size="small"
                                    fullWidth
                                    name="plantName" >
                                </TextField>
                            </div>
                            <div className="col-md-6">
                                <TextField label="Party Address"
                                    id="plantAddressId"
                                    value={plantData.plantAddress}
                                    onChange={handleAdminChange}
                                    size="small"
                                    fullWidth
                                    name="plantAddress" >
                                </TextField>
                            </div>
                            <div className="col">
                                <FormControl size='small' component="div" fullWidth>
                                    <InputLabel id="adminsId">Admins</InputLabel>
                                    <Select
                                        labelId="adminsId"
                                        name="admins"
                                        multiple

                                        value={plantData.admins}
                                        // onChange={handleItemAddChange}
                                        input={<OutlinedInput fullWidth label="Admins" />}
                                        renderValue={(selected) =>
                                            selected
                                                .map((emp) =>
                                                    employeeData.admins
                                                        .filter((emps) => emps.employeeCode === emp)
                                                        .map((filteredEmp) => filteredEmp.firstName)

                                                ).join(", ")
                                        }
                                        onChange={handleAdminChange}
                                        MenuProps={MenuProps}
                                        fullWidth
                                    >
                                        {employeeData.admins.map((name, index) => (
                                            <MenuItem key={index} value={name.employeeCode}>
                                                <Checkbox checked={plantData.admins.indexOf(name.employeeCode) > -1} />
                                                <ListItemText primary={name.employeeCode + " - " + name.firstName} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col">
                                <FormControl size='small' component="div" fullWidth>
                                    <InputLabel id="plantAdminsId">Add PlantAdmins</InputLabel>
                                    <Select
                                        labelId="plantAdminsId"
                                        name="plantAdmins"
                                        multiple

                                        value={plantData.plantAdmins}
                                        // onChange={handleItemAddChange}
                                        input={<OutlinedInput fullWidth label="Add PlantAdmins" />}
                                        renderValue={(selected) =>
                                            selected
                                                .map((emp) =>
                                                    employeeData.plantAdmins
                                                        .filter((emps) => emps.employeeCode === emp)
                                                        .map((filteredEmp) => filteredEmp.firstName)

                                                ).join(", ")
                                        }
                                        onChange={handleAdminChange}
                                        MenuProps={MenuProps}
                                        fullWidth
                                    >
                                        {employeeData.plantAdmins.map((name, index) => (
                                            <MenuItem key={index} value={name.employeeCode}>
                                                <Checkbox checked={plantData.plantAdmins.indexOf(name.employeeCode) > -1} />
                                                <ListItemText primary={name.employeeCode + " - " + name.firstName} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col">
                                <FormControl size='small' component="div" fullWidth>
                                    <InputLabel id="creatorsId">Add Creators</InputLabel>
                                    <Select
                                        labelId="creatorsId"
                                        name="creators"
                                        multiple

                                        value={plantData.creators}
                                        // onChange={handleItemAddChange}
                                        input={<OutlinedInput fullWidth label="Add Creators" />}
                                        renderValue={(selected) =>
                                            selected
                                                .map((emp) =>
                                                    employeeData.creators
                                                        .filter((emps) => emps.employeeCode === emp)
                                                        .map((filteredEmp) => filteredEmp.firstName)

                                                ).join(", ")
                                        }
                                        onChange={handleAdminChange}
                                        MenuProps={MenuProps}
                                        fullWidth
                                    >
                                        {employeeData.creators.map((name, index) => (
                                            <MenuItem key={index} value={name.employeeCode}>
                                                <Checkbox checked={plantData.creators.indexOf(name.empl) > -1} />
                                                <ListItemText primary={name.employeeCode + " - " + name.firstName} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col">
                                <FormControl size='small' component="div" fullWidth>
                                    <InputLabel id="viewersId">Add Viewers</InputLabel>
                                    <Select
                                        labelId="viewersId"

                                        multiple
                                        name="viewers"
                                        value={plantData.viewers}
                                        // onChange={handleItemAddChange}
                                        input={<OutlinedInput fullWidth label="Add Viewers" />}
                                        renderValue={(selected) =>
                                            selected
                                                .map((emp) =>
                                                    employeeData.viewers
                                                        .filter((emps) => emps.employeeCode === emp)
                                                        .map((filteredEmp) => filteredEmp.firstName)

                                                ).join(", ")
                                        }
                                        onChange={handleAdminChange}
                                        MenuProps={MenuProps}
                                        fullWidth
                                    >
                                        {employeeData.viewers.map((name, index) => (
                                            <MenuItem key={index} value={name.employeeCode}>
                                                <Checkbox checked={plantData.viewers.indexOf(name.employeeCode) > -1} />
                                                <ListItemText primary={name.employeeCode + " - " + name.firstName} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>



                        <div className='row g-2'>
                            <div className='col-4'>
                                <Button helperText="Hello" component="label" fullWidth variant="contained" disabled={!isEditable} startIcon={<CloudUpload />} >
                                    Upload ComPany Logo
                                    <VisuallyHiddenInput type="file" onChange={handleCompany} />
                                </Button>
                            </div>

                            <div className='col-4'>
                                <Button helperText="Hello" component="label" fullWidth variant="contained" disabled={!isEditable} startIcon={<CloudUpload />} >
                                    Company Image
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </div>
                            {isEditable && <div className=' col d-flex justify-content-end'>
                                <div className='me-2 '>
                                    <Button size='small' sx={{ minWidth: "130px" }} variant='contained' onClick={() => setOpenModal(true)}>Save</Button>
                                </div>
                                <div className='me-2 '>
                                    <Button size='small' color='error' sx={{ minWidth: "130px" }} variant='contained' onClick={() => setIsEditable(false)}>Cancel</Button>
                                </div>


                            </div>}


                        </div>

                        <Dialog
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Mail update confirmation?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure to update the Mail
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                                <Button onClick={() => { updateMailData(); setOpenModal(false); }} autoFocus>
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={mailSnackBar} autoHideDuration={6000} onClose={handleSnackClose}>
                            <Alert variant="filled" onClose={handleSnackClose} severity={errorHandler.code} sx={{ width: '100%' }}>
                                {errorHandler.message}
                            </Alert>
                        </Snackbar>
                    </Paper>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        mb: 1,

                    }}
                        elevation={12}>
                        <table className='table table-bordered text-center align-midle'>
                            <tbody>
                                <tr>
                                    <th>Si No</th>
                                    <th>Plant Name</th>
                                    <th>Plant Address</th>
                                    <th>Add Admins</th>
                                    <th>Add PlantAdmins</th>
                                    <th>Add Creators</th>
                                    <th>Add Viewers</th>
                                </tr>
                                {plantDatas.map((plant, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{plant.plantName}</td>
                                        <td>{plant.plantAddress}</td>
                                        <td>
                                            {plant.admins.map(empId =>
                                                employeeData.admins
                                                    .find(admin => admin.employeeCode === empId)
                                                    ?.firstName // Assuming 'firstName' is the property for first name
                                                ?? 'Unknown' // Display 'Unknown' if no match is found
                                            ).join(", ")}
                                        </td>

                                        <td>{plant.plantAdmins.join(", ")}</td>
                                        <td>{plant.creators.join(", ")}</td>
                                        <td>{plant.viewers.join(", ")}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </Paper>






                </form>
            </Container>

        </div>
    )
}

export default CompanyDetails