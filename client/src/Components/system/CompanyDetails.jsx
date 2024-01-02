import React, { createContext, useEffect, useState, useContext } from 'react'
import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, Fab, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import { Add, Close, CloudUpload, Delete, Done, Edit, Receipt, Remove } from '@mui/icons-material';
import axios from 'axios'

const CompanyDetails = () => {


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
    const initialMailData = {
        userType: "",
        companyName: "",
        companyPlants: [],
        companyLogo: "",
        companyImage: ""
    }
    const [isEditable, setIsEditable] = useState(false)
    const [companyData, setCompanyData] = useState({
        userType: "",
        companyName: "",
        companyPlants: [],
        companyLogo: "",
        companyImage: ""

    })
    console.log(companyData)

    const mailFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/compDetails/getCompDetailsById/658c12ca19f2c8564204a6af`
            );
            const details = response.data.result
            console.log(details)
            setCompanyData((prev) => ({
                ...prev,
                userType: details.mailId,
                companyName: details.companyName,
                companyPlants: details.companyPlants,
                companyLogo: details.companyLogo,
                companyImage: details.companyImage
            }));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        mailFetchData();
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
            companyFetchData();
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



    const handleCompanyChange = (e) => {
        const { name, value } = e.target;
        setCompanyData((prev) => ({ ...prev, [name]: value }));


    }

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
                                    name="row-radio-buttons-group"

                                >
                                    <FormControlLabel value="singleUser" disabled={!isEditable} control={<Radio />} label="SingleUser" />
                                    <FormControlLabel value="multiUser" disabled={!isEditable} control={<Radio />} label="MultiUser" />

                                </RadioGroup>
                            </div>
                            <div className=' col d-flex justify-content-end'>
                                <div className='me-2 '>
                                    <Button onClick={() => setIsEditable(true)}><Edit color='success' /></Button>
                                </div>



                            </div>


                        </div>
                        <div className='row g-2'>
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
                            <table className='table  table-sm table table-bordered table-responsive text-center align-middle' disabled={!isEditable} >
                                <tbody>
                                    <tr>
                                        <th>Si No</th>
                                        <th> Plant Address</th>
                                        <th width={"10%"}> <Fab size='small' color="primary" aria-label="add" disabled={!isEditable} onClick={() => addPlantDataRow()}>
                                            <Add />
                                        </Fab></th>
                                    </tr>

                                    {companyData.companyPlants.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><input type='text' className='form-control form-control-sm' name='companyPlants' disabled={!isEditable} value={item.companyPlants} onChange={(e) => changeCompanyRow(index, e.target.name, e.target.value)} /></td>
                                            {/* Other table cells */}
                                            <td style={{ width: "2%" }}>
                                                <Button size='small' color="success" disabled={!isEditable} aria-label="add" onClick={() => deletePlantRow(index)} >
                                                    <Remove sx={{ m: 0, p: 0 }} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                        </div>

                        <div className='row'>
                            <div className='col-4'>
                                <Button helperText="Hello" component="label" fullWidth variant="contained" startIcon={<CloudUpload />} >
                                    Upload ComPany Logo
                                </Button>
                            </div>

                            <div className='col-4'>
                                <Button helperText="Hello" component="label" fullWidth variant="contained" startIcon={<CloudUpload />} >
                                    Company Image
                                </Button>
                            </div>
                            {isEditable &&     <div className=' col d-flex justify-content-end'>
                                <div className='me-2 '>
                                    <Button size='small' sx={{ minWidth: "130px" }} variant='contained' onClick={() => setOpenModal(true)}>Modify</Button>
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






                </form>
            </Container>

        </div>
    )
}

export default CompanyDetails