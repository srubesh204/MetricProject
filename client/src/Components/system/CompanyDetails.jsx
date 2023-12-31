import React, { createContext, useEffect, useState, useContext, useRef } from 'react'
import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, Fab, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete, Badge } from '@mui/material'
import { Add, Close, CloudUpload, Delete, Done, Edit, Receipt, Remove } from '@mui/icons-material';
import axios from 'axios'
import { styled } from '@mui/material/styles';
import { useEmployee } from '../../App';

const CompanyDetails = () => {

    const empDetails = useEmployee();
    const fileInputRef = useRef(null);

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

    const [errorHandler, setPlantError] = useState({})

    const [mailSnackBar, setPlantSnackBar] = useState(false)
    const [plantModels, setPlantModels] = useState({
        createModel: null,
        updateModel: null,
        deleteModel: null
    });

    const handleSnackClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }

        setPlantSnackBar(false);
    }

    const [employeeData, setEmployeeData] = useState({
        allEmp: [],
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
                allEmp: response.data.result,
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

    const initialPlantData = {
        plantName: "",
        plantAddress: "",
        admins: [],
        plantAdmins: [],
        creators: [],
        viewers: []
    }

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

    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setCompanyData((prev) => ({ ...prev, companyLogo: selectedImage.name }));

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


    const createPlant = async () => {

        try {


            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/compDetails/createPlantDetails`, plantData

            );
            console.log(response.data)


            plantFetch();
            setPlantSnackBar(true)
            setPlantError({ status: response.data.status, message: response.data.message, code: "success" })
            setSelectedPlantId(null)
            setPlantData(initialPlantData)
            console.log(response);
        } catch (err) {
            console.log(err);
            setPlantSnackBar(true)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' / ');

                console.log(errorMessages400);
                console.log(err)
                setPlantError({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                // const errorData500 = err.response.data.error;
                // const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(err)
                setPlantError({ status: 0, message: err.response.data.error, code: "error" });
            } else {
                console.log(err)
                setPlantError({ status: 0, message: "An error occurred", code: "error" });
            }

        }
    };

    const updatePlantData = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/compDetails/updatePlantDetails/${selectedPlantId}`, plantData

            );
            console.log(response.data)


            plantFetch();
            setPlantSnackBar(true)
            setPlantError({ status: response.data.status, message: response.data.message, code: "success" })
            setSelectedPlantId(null)
            setPlantData(initialPlantData)
            console.log(response);
        } catch (err) {
            console.log(err);
            setPlantSnackBar(true)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' / ');

                console.log(errorMessages400);
                console.log(err)
                setPlantError({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                // const errorData500 = err.response.data.error;
                // const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(err)
                setPlantError({ status: 0, message: err.response.data.error, code: "error" });
            } else {
                console.log(err)
                setPlantError({ status: 0, message: "An error occurred", code: "error" });
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




    const handleAdminChange = (e) => {
        const { name, value } = e.target;
        setPlantData((prev) => ({ ...prev, [name]: value }));
    };

    const [selectedPlantId, setSelectedPlantId] = useState(null)

    const handlePlantClick = (value) => {
        setSelectedPlantId(value._id)
        setPlantData((prev) => ({
            ...prev,
            plantName: value.plantName,
            plantAddress: value.plantAddress,
            admins: value.admins,
            plantAdmins: value.plantAdmins,
            creators: value.creators,
            viewers: value.viewers
        }))
    }



    return (
        <div className='m-4'>


            <form>
                <div className="row">

                    <div className="col-md-12">
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1,

                            }}
                            className='col'
                            elevation={12}
                        >

                            <div className='row'>
                                <div className="col-md-10">
                                    <div className="row">
                                        <div className='col-md-12 text-end'>
                                            <Button onClick={() => setIsEditable(true)}><Edit color='success' /></Button>
                                        </div>





                                        <div className='col-md-12'>
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





                                        <div className='col-md-5'>
                                            <TextField label="Company Name"
                                                id="companyNameId"
                                                fullWidth
                                                value={companyData.companyName}
                                                disabled={!isEditable}
                                                onChange={handleCompanyChange}
                                                size="small"
                                                sx={{ width: "100%" }}
                                                name="companyName" />


                                        </div>
                                        {companyData.userType === "singleUser" && <div className='col-md-7'>
                                            <TextField label="Company  Address"
                                                id="companyNameId"
                                                value={companyData.companyAddress}
                                                disabled={!isEditable}
                                                onChange={handleCompanyChange}
                                                size="small"
                                                fullWidth
                                                name="companyAddress" />


                                        </div>}
                                        <div className='col-md-4'>
                                            <Button size='small' component="label" fullWidth variant="contained" disabled={!isEditable} startIcon={<CloudUpload />} >
                                                Upload ComPany Logo
                                                <VisuallyHiddenInput type="file" onChange={handleCompany} />
                                            </Button>
                                        </div>

                                        <div className='col-md-3'>
                                            <Button size='small' component="label" fullWidth variant="contained" disabled={!isEditable} startIcon={<CloudUpload />} >
                                                Company Image
                                                <VisuallyHiddenInput type="file" />
                                            </Button>
                                        </div>
                                    </div>

                                </div>

                                <div className='col-md-2'>
                                    <label htmlFor="fileInput" style={{ display: 'block', width: '100%', height: '150px', border: '2px dashed black', borderRadius: "10px", position: 'relative', cursor: 'pointer' }} className='text-center align-middle'>

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

                                            ref={fileInputRef}
                                        />
                                        Drag or Select
                                        {/* Your other content or styling for the square box */}
                                    </label>
                                    {companyData.companyLogo && <div style={{ margin: 0 }}>
                                        <div className='d-flex justify-content-center' style={{ width: "100%", height: "100%" }}>
                                            <Badge type="button" badgeContent={"X"} onClick={() => setCompanyData((prev) => ({ ...prev, companyLogo: "" }))} style={{ width: "100%", height: "100%" }} color="error"><img src={`${process.env.REACT_APP_PORT}/itemMasterImages/${companyData.companyLogo}`} alt={`${companyData.companyLogo} Image`} style={{ width: "100%", height: "100%", margin: "auto", display: "block", background: "inherit", backgroundSize: "cover" }}></img></Badge>
                                        </div>

                                    </div>}
                                </div>
                            </div>

                        </Paper>

                    </div>

                    <div className="col-md-12">


                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1,

                            }}
                            elevation={12}>
                            <h5 className='text-center'>Plant Details</h5>
                            <div className="row g-2 mb-2">
                                <div className="col-md-5">
                                    <TextField label="Plant Name"
                                        id="plantNameId"
                                        value={plantData.plantName}
                                        onChange={handleAdminChange}
                                        size="small"
                                        fullWidth
                                        name="plantName" >
                                    </TextField>
                                </div>
                                <div className="col-md-7">
                                    <TextField label="Plant Address"
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
                                                            .filter((emps) => emps._id === emp)
                                                            .map((filteredEmp) => filteredEmp.firstName)

                                                    ).join(", ")
                                            }
                                            onChange={handleAdminChange}
                                            MenuProps={MenuProps}
                                            fullWidth
                                        >
                                            {employeeData.admins.map((name, index) => (
                                                <MenuItem key={index} value={name._id}>
                                                    <Checkbox checked={plantData.admins.indexOf(name._id) > -1} />
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
                                                            .filter((emps) => emps._id === emp)
                                                            .map((filteredEmp) => filteredEmp.firstName)

                                                    ).join(", ")
                                            }
                                            onChange={handleAdminChange}
                                            MenuProps={MenuProps}
                                            fullWidth
                                        >
                                            {employeeData.plantAdmins.map((name, index) => (
                                                <MenuItem key={index} value={name._id}>
                                                    <Checkbox checked={plantData.plantAdmins.indexOf(name._id) > -1} />
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
                                                            .filter((emps) => emps._id === emp)
                                                            .map((filteredEmp) => filteredEmp.firstName)

                                                    ).join(", ")
                                            }
                                            onChange={handleAdminChange}
                                            MenuProps={MenuProps}
                                            fullWidth
                                        >
                                            {employeeData.creators.map((name, index) => (
                                                <MenuItem key={index} value={name._id}>
                                                    <Checkbox checked={plantData.creators.indexOf(name._id) > -1} />
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
                                                            .filter((emps) => emps._id === emp)
                                                            .map((filteredEmp) => filteredEmp.firstName)

                                                    ).join(", ")
                                            }
                                            onChange={handleAdminChange}
                                            MenuProps={MenuProps}
                                            fullWidth
                                        >
                                            {employeeData.viewers.map((name, index) => (
                                                <MenuItem key={index} value={name._id}>
                                                    <Checkbox checked={plantData.viewers.indexOf(name._id) > -1} />
                                                    <ListItemText primary={name.employeeCode + " - " + name.firstName} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>



                            <div className='row g-2'>

                                {!selectedPlantId && <div className='d-flex justify-content-end'>
                                    <Button size='small' sx={{ minWidth: "130px" }} variant='contained' onClick={() => setPlantModels((prev) => ({ ...prev, createModel: true }))}>Create Plant</Button>
                                </div>}

                                {selectedPlantId && <div className=' col d-flex justify-content-end'>
                                    <div className='me-2 '>
                                        <Button size='small' sx={{ minWidth: "130px" }} variant='contained' onClick={() => setPlantModels((prev) => ({ ...prev, updateModel: true }))}>Modify Plant</Button>
                                    </div>
                                    <div className='me-2 '>
                                        <Button size='small' color='error' sx={{ minWidth: "130px" }} variant='contained' onClick={() => { setSelectedPlantId(null); setPlantData(initialPlantData) }}>Cancel</Button>
                                    </div>


                                </div>}


                            </div>

                            <Dialog
                                open={plantModels.updateModel}
                                onClose={() => setPlantModels((prev) => ({ ...prev, updateModel: false }))}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Plant update confirmation?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure to update the Plant
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setPlantModels((prev) => ({ ...prev, updateModel: false }))}>Cancel</Button>
                                    <Button onClick={() => { updatePlantData(); setPlantModels((prev) => ({ ...prev, updateModel: false })); }} autoFocus>
                                        Update
                                    </Button>
                                </DialogActions>
                            </Dialog>




                            <Dialog
                                open={plantModels.createModel}
                                onClose={() => setPlantModels((prev) => ({ ...prev, createModel: false }))}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Plant create confirmation?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure to create a Plant
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setPlantModels((prev) => ({ ...prev, createModel: false }))}>Cancel</Button>
                                    <Button onClick={(e) => { createPlant(); setPlantModels((prev) => ({ ...prev, createModel: false })) }} autoFocus>
                                        Add
                                    </Button>
                                </DialogActions>
                            </Dialog>




                            <Dialog
                                open={plantModels.deleteModel}
                                onClose={() => setPlantModels((prev) => ({ ...prev, deleteModel: false }))}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Plant delete confirmation?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure to delete the Mail
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setPlantModels((prev) => ({ ...prev, deleteModel: false }))}>Cancel</Button>
                                    <Button onClick={() => { updatePlantData(); setPlantModels((prev) => ({ ...prev, deleteModel: false })) }} autoFocus>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={mailSnackBar} autoHideDuration={6000} onClose={handleSnackClose}>
                                <Alert variant="filled" onClose={handleSnackClose} severity={errorHandler.code} sx={{ width: '100%' }}>
                                    {errorHandler.message}
                                </Alert>
                            </Snackbar>
                        </Paper>

                    </div>
                </div>


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
                                <tr key={index} onClick={() => handlePlantClick(plant)}>
                                    <td>{index + 1}</td>
                                    <td>{plant.plantName}</td>
                                    <td>{plant.plantAddress}</td>
                                    <td>
                                        {/* {plant.admins.map(empId =>
                                                employeeData.admins
                                                    .find(admin => admin.employeeCode === empId)
                                                    ?.firstName // Assuming 'firstName' is the property for first name
                                                ?? 'Unknown' // Display 'Unknown' if no match is found
                                            ).join(", ")} */}
                                        {plant.admins.map(empId => {
                                            const matchedEmployee = employeeData.admins.find(emp => empId === emp._id);
                                            return matchedEmployee ? `${matchedEmployee.employeeCode} - ${matchedEmployee.firstName}` : '';
                                        }).join(", ")}

                                    </td>

                                    <td>{plant.plantAdmins.map(empId => {
                                        const matchedEmployee = employeeData.plantAdmins.find(emp => empId === emp._id);
                                        return matchedEmployee ? `${matchedEmployee.employeeCode} - ${matchedEmployee.firstName}` : '';
                                    }).join(", ")}</td>
                                    <td>{plant.creators.map(empId => {
                                        const matchedEmployee = employeeData.creators.find(emp => empId === emp._id);
                                        return matchedEmployee ? `${matchedEmployee.employeeCode} - ${matchedEmployee.firstName}` : '';
                                    }).join(", ")}</td>
                                    <td>{plant.viewers.map(empId => {
                                        const matchedEmployee = employeeData.viewers.find(emp => empId === emp._id);
                                        return matchedEmployee ? `${matchedEmployee.employeeCode} - ${matchedEmployee.firstName}` : '';
                                    }).join(", ")}</td>

                                </tr>
                            ))}

                        </tbody>
                    </table>

                </Paper>






            </form>


        </div>
    )
}

export default CompanyDetails