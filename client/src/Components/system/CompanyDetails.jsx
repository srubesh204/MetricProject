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


    const companysFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/compDetails/getCompDetailsById/1`
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

    const updateCompanyDetails = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/compDetails/updateCompDetails/1`, companyData
            );
            console.log(response.data)


            companysFetchData();
            setPlantSnackBar(true)
            setPlantError({ status: response.data.status, message: response.data.message, code: "success" })
            setSelectedPlantId(null)
            setPlantData(initialPlantData)
            console.log(response);
            setIsEditable(false)
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
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500);
                console.log(err)
                setPlantError({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err)
                setPlantError({ status: 0, message: "An error occurred", code: "error" });
            }

        }
    };


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

    }
    const [plantData, setPlantData] = useState({
        plantName: "",
        plantAddress: "",
    })
    console.log(companyData, plantData)



    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage); // Append the selected image to the FormData
            try {
                const response = await axios.post(`${process.env.REACT_APP_PORT}/upload/compLogoUpload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    // Image uploaded successfully
                    setCompanyData((prev) => ({ ...prev, companyLogo: response.data.name }));
                    console.log('Logo Uploaded Successfully');
                } else {
                    console.log('Error Uploading Logo');
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
                `${process.env.REACT_APP_PORT}/compDetails/getCompDetailsById/1`
            );
            console.log(response.data)
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

                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(err)
                setPlantError({ status: 0, message: errorMessages500, code: "error" });
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
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500);
                console.log(err)
                setPlantError({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err)
                setPlantError({ status: 0, message: "An error occurred", code: "error" });
            }

        }
    };

    //     const plantDetailId = /* retrieve the plant detail ID from your data or state */;

    // fetch(`http://localhost:3001/compDetails/deletePlantDetail/${plantDetailId}`, {
    //   method: 'DELETE',
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('Delete successful:', data);
    //   })
    //   .catch(error => {
    //     console.error('Error deleting plant detail:', error);
    //   });

    const deletePlant = async () => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/compDetails/deletePlantDetails/${selectedPlantId}`, {

            }
            );
            console.log(response.data.result)
            plantFetch();
            setPlantSnackBar(true)
            setPlantError({ status: response.data.status, message: response.data.message, code: "success" })
            //setSelectedPlantId(null)
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

    //     const [errorhandler, setErrorHandler] = useState(false)
    //     const [snackBarOpen, setSnackBarOpen] = useState(false)
    //  const deletePlant = async (id) => {

    //         try {
    //              const response = await axios.delete(
    //      `${process.env.REACT_APP_PORT}/compDetails/deletePlantDetail`, 
    //         {
    //           data: {
    //             selectedPlantId: selectedRowIds
    //           }
    //     }
    //              );
    //              console.log(response.data)

    //              setSnackBarOpen(true)

    //           setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })

    //                       setPlantData(initialPlantData)
    //      plantFetch();
    //          } catch (err) {

    //              setSnackBarOpen(true)

    //            if (err.response && err.response.status === 400) {
    //                  // Handle validation errors
    //                  const errorData400 = err.response.data.errors;
    //                 const errorMessages400 = Object.values(errorData400).join(', ');
    //                  console.log(errorMessages400)
    //                  setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
    //              } else if (err.response && err.response.status === 500) {
    //                  // Handle other errors
    //                  const errorData500 = err.response.data.error;
    //                  const errorMessages500 = Object.values(errorData500).join(', ');
    //                  console.log(errorMessages500)
    //                  setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
    //              } else {
    //                  console.log(err.response.data.error)
    //                  setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
    //              }
    //              console.log(err);
    //          }
    //      };



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
    const [selectedRowIds, setSelectedRowIds] = useState([]);

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
                                    <div className="row g-2">
                                        <div className='col-md-12 text-end'>
                                            <Button onClick={() => setIsEditable(true)}><Edit color='success' /></Button>
                                        </div>
                                        {/* <div className='col-md-12'>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                disabled={!isEditable}
                                                value={companyData.userType}
                                                name="userType"
                                                onChange={handleCompanyChange}
                                            >
                                                <FormControlLabel value="single" checked={companyData.userType === "single"} disabled={!isEditable} control={<Radio />} label="SingleUser" />
                                                <FormControlLabel value="multi" checked={companyData.userType === "multi"} disabled={!isEditable} control={<Radio />} label="MultiUser" />
                                            </RadioGroup>
                                        </div> */}

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
                                        <div className='col-md-7'>
                                            <TextField label="Company Address"
                                                id="companyNameId"
                                                value={companyData.companyAddress}
                                                disabled={!isEditable}
                                                onChange={handleCompanyChange}
                                                size="small"
                                                fullWidth
                                                name="companyAddress" />


                                        </div>
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
                                    {!companyData.companyLogo && <div>
                                        <label htmlFor="fileInput" style={{ display: 'block', width: '100%', height: '150px', width: "150px", border: '2px dashed black', borderRadius: "10px", position: 'relative', cursor: 'pointer' }} className='text-center align-middle'>

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
                                                disabled={!isEditable}
                                            />
                                            Select here to Upload Image
                                            {/* Your other content or styling for the square box */}
                                        </label>
                                    </div>}

                                    {companyData.companyLogo && <div style={{ margin: 0 }}>
                                        <div className='d-flex justify-content-center' style={{ width: "100%", height: "100%" }}>
                                            <Badge invisible={!isEditable} type="button" badgeContent={"X"} onClick={() => isEditable && setCompanyData((prev) => ({ ...prev, companyLogo: "" }))} style={{ width: "100%", height: "150px%" }} color="error">
                                                <img disabled={!isEditable} src={`${process.env.REACT_APP_PORT}/logo/${companyData.companyLogo}`} alt={`${companyData.companyLogo} Image`} style={{ width: "100%", height: "100%", margin: "auto", display: "block", background: "inherit", backgroundSize: "cover" }}>
                                                </img>
                                            </Badge>
                                        </div>

                                    </div>}
                                </div>

                                {isEditable && <div className='text-end mt-2'>
                                    <Button size='small' className='me-2' variant='contained' disabled={!isEditable} color='warning' onClick={(e) => updateCompanyDetails(e)}>Update Company Details</Button>
                                    <Button size='small' variant='contained' disabled={!isEditable} color='error' onClick={() => setIsEditable(false)}>Cancel</Button>
                                </div>}

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
                                    <Button onClick={() => { deletePlant(); setPlantModels((prev) => ({ ...prev, deleteModel: false })) }} autoFocus>
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
                                <th>Delete</th>

                            </tr>
                            {plantDatas.map((plant, index) => (
                                <tr key={index} onClick={() => handlePlantClick(plant)}>
                                    <td>{index + 1}</td>
                                    <td>{plant.plantName}</td>
                                    <td>{plant.plantAddress}</td>
                                    <th style={{ width: "2%" }}><Button size='small' color="error" aria-label="add" onClick={() => setPlantModels((prev) => ({ ...prev, deleteModel: true }))}>
                                        <Delete />
                                    </Button></th>
                                    {/* <th style={{ width: "2%" }}><Button size='small' color="error" aria-label="add" onClick={() => deleteVendorRow(index)}>
                                        <Delete />
                                    </Button></th> */}



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