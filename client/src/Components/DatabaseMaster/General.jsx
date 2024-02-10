import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Container, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { TextField, MenuItem, IconButton, FormControl, ButtonGroup, } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Autocomplete from '@mui/material/Autocomplete';
import { useEmployee } from '../../App';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { CloudDownload, CloudUpload, Delete } from '@mui/icons-material';



export const UnitDataBase = ({ style }) => {

    const [unitStateId, setUnitStateId] = useState(null)
    const initialUnitData = {
        unitName: "",
    }

    const [errorHandler, setErrorHandler] = useState({})

    const [unitSnackBar, setUnitSnackBar] = useState(false)
    const handleSnackClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }

        setUnitSnackBar(false);
    }

    const [unitData, setUnitData] = useState({
        unitName: "",
    })
    console.log(unitData)


    const [unitDataList, setUnitDataList] = useState([])
    const unitFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/unit/getAllUnits`
            );
            setUnitDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        unitFetchData();
    }, []);

    const [unitSelectedRowIds, setUnitSelectedRowIds] = useState([]);

    const unitColumns = [
        {/*{ field: 'id', headerName: 'Si. No', width: 100, renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id) + 1 }*/ },
        // {
        //     field: 'id',
        //     headerName: 'Si. No',
        //     width: 100,
        //     headerAlign: "center", align: "center",
        //     renderCell: (params) => {
        //         const rowIndex = params.api.getRowIndexRelativeToVisibleRows(params.id);
        //         return Number.isInteger(rowIndex) ? rowIndex + 1 : '';
        //     }
        // },
        { field: 'id', headerName: 'Si. No', width: 100, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },

        { field: 'unitName', headerName: 'UnitName', width: "150", headerAlign: "center", align: "center", },




    ];



    const handleUnitDataBaseChange = (e) => {
        const { name, value } = e.target;
        setUnitData((prev) => ({ ...prev, [name]: value }));

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
    const [generalExcelStatus, setGeneralExcelStatus] = useState('');

    const handleGeneralExcel = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        setFile(selectedFile);
    };

    const handleGeneralUpload = async () => {
        try {
            if (!file) {
                setGeneralExcelStatus('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${process.env.REACT_APP_PORT}/unit/uploadUnitInExcel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            unitFetchData();

            setGeneralExcelStatus(response.data.message || 'Excel file uploaded successfully');
        } catch (error) {
            if (error.response) {
                setGeneralExcelStatus(`Error: ${error.response.data.error || 'Something went wrong'}`);
            } else if (error.request) {
                setGeneralExcelStatus('Network error. Please try again.');
            } else {
                setGeneralExcelStatus('Error uploading the file.');
            }
            console.error('Error uploading Excel file:', error);
        }
    };


    useEffect(() => {
        if (generalExcelStatus) {
            const timeoutId = setTimeout(() => {
                setGeneralExcelStatus('');
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [generalExcelStatus]);


    //validate function 
    const [errors, setErrors] = useState({})

    const validateFunction = () => {
        let tempErrors = {};
        tempErrors.unitName = unitData.unitName ? "" : "Unit Name is Required"

        setErrors({ ...tempErrors })

        return Object.values(tempErrors).every(x => x === "")
    }
    console.log(errors)

    const unitSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateFunction()) {
                const response = await axios.post(
                    `${process.env.REACT_APP_PORT}/unit/createUnit`, unitData
                );
                {/*console.log(response.data.message)*/ }
                console.log(response)
                setUnitSnackBar(true)
                setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
                unitFetchData();
                setUnitData(initialUnitData);
            } else {
                setErrorHandler({ status: 0, message: "Fill the required fields", code: "error" })
            }
        } catch (err) {
            setUnitSnackBar(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' | ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(' | ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }
        }
    };

    const updateUnitData = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/unit/updateUnit/${unitStateId}`, unitData

            );
            unitFetchData();
            setUnitData({
                unitName: ""
            });
            setUnitSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            console.log(response);
            setUnitStateId(null)
        } catch (err) {
            setUnitSnackBar(true)
            console.log(err)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' | ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join('');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }
        }
    };
    const deleteUnitData = async () => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/unit/deleteUnit`, {

                data: {
                    unitIds: unitSelectedRowIds
                }
            }


            );
            unitFetchData();
            setUnitData({
                unitName: ""
            });
            setUnitSnackBar(true)
            setErrorHandler({ status: 0, message: response.data.message, code: "success" });
            console.log("Unit delete Successfully");
            setUnitStateId(null)
        } catch (err) {
            setUnitSnackBar(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' | ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(' | ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }
        }
    };








    const updateUnit = async (params) => {
        console.log(params)
        setUnitData(params.row)
        setUnitStateId(params.id)
    }

    console.log(unitStateId)


    const bodycss = {
        borderRadius: "10px",

        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 10px 0px",
    }

    const [openModal, setOpenModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    return (

        <div >

            <form>
                <Box sx={{ flexGrow: 1, m: 4 }}>
                    <Grid container spacing={2} >


                        <Grid item xs={6} >
                            <Paper sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                pb: 5
                            }}
                                elevation={12}
                            >
                                <h6 className='text-center'>Unit DataBase</h6>
                                <div className='row g-2 mb-2'>
                                    <div className="form-floating col-md-2">
                                        <TextField label="Si.No."
                                            id="unitSiId"
                                            defaultValue=""
                                            fullWidth
                                            size="small"
                                            placeholder="unitSi"
                                            onChange={handleUnitDataBaseChange}
                                            //onKeyDown={handleKeyDown}
                                            disabled
                                            value={unitDataList.length + 1}
                                            name="unitSi" ></TextField>

                                    </div>
                                    {unitStateId ? <Dialog
                                        open={openModal}
                                        onClose={() => setOpenModal(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Unit update confirmation?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to update the Unit
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                                            <Button onClick={() => { updateUnitData(); setOpenModal(false); }} autoFocus>
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
                                            {" Unit create confirmation?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to add the Unit
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                                            <Button onClick={(e) => { unitSubmit(e); setOpenModal(false); }} autoFocus>
                                                Add
                                            </Button>
                                        </DialogActions>
                                    </Dialog>}


                                    <div className="form-floating col-md-10">

                                        {/* <TextField label="Unit Name"
                                            {...(errors.unitName !== "" && { helperText: errors.unitName, error: true })}
                                            id="unitNameId"
                                            defaultValue=""
                                            fullWidth
                                            size="small"
                                            placeholder="unitName"
                                            onChange={handleUnitDataBaseChange}

                                            value={unitData.unitName}
                                    name="unitName" ></TextField>*/}
                                        <Autocomplete label="Unit Name"
                                            disablePortal
                                            size="small"
                                            getOptionDisabled={option => true}
                                            options={unitDataList.map((unit) => ({ label: unit.unitName }))}
                                            fullWidth
                                            clearOnBlur={false}
                                            value={unitData.unitName}
                                            renderInput={(params) =>
                                                <TextField     {...(errors.unitName !== "" && { helperText: errors.unitName, error: true })} onChange={handleUnitDataBaseChange}
                                                    name="unitName" {...params} label="Unit Name" />} />

                                    </div>
                                </div>


                                <div className="row g-2 ">
                                    <div className="col d-flex">
                                        <div className="d-flex justify-content-center">
                                            <ButtonGroup className='me-3' size="small">
                                                <Button component="label" variant="contained" size="small">
                                                    Upload
                                                    <VisuallyHiddenInput type="file" onChange={handleGeneralExcel} />
                                                </Button>
                                                <Button size="small" onClick={handleGeneralUpload}><CloudUpload /></Button>
                                            </ButtonGroup>

                                            {/* <ButtonGroup size="small">
                                                <Button size="small" component="label" variant="contained" color='secondary'>
                                                    Download
                                                    <VisuallyHiddenInput type="file" />
                                                </Button>
                                                <Button size="small" color='secondary'><CloudDownload /></Button>
                                            </ButtonGroup> */}
                                        </div>

                                    </div>
                                    <div className='col d-flex justify-content-end'>
                                        {unitStateId ? <div className='d-flex justify-content-end'><div className='me-2' >
                                            <Button type="button" color='warning' variant='contained' size="small" className='btn btn-secondary' onClick={() => setOpenModal(true)}>Modify</Button>
                                        </div>
                                            <div className='me-2' >
                                                <Button type="button" variant='contained' size="small" color='error' onClick={() => { setUnitStateId(null); setUnitData(initialUnitData) }}>Cancel</Button>
                                            </div></div> : <div className="ms-auto">
                                            <Button variant='contained' size="small" color='success' onClick={() => setOpenModal(true)}>+ Add Unit</Button>
                                        </div>}


                                    </div>

                                </div>
                                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={unitSnackBar} autoHideDuration={6000} onClose={handleSnackClose}>
                                    <Alert variant="filled" onClose={handleSnackClose} severity={errorHandler.code} sx={{ width: '100%' }}>
                                        {errorHandler.message}
                                    </Alert>
                                </Snackbar>
                                {generalExcelStatus && <p style={{ color: 'green' }}>{generalExcelStatus}</p>}
                            </Paper>
                        </Grid>

                        <Grid item xs={6} >
                            <Paper sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',

                            }}
                                elevation={12}
                            >
                                <div>
                                    <h6 className='text-center'>Unit List</h6>

                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid disableDensitySelector
                                            rows={unitDataList}
                                            columns={unitColumns}
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
                                                            {unitSelectedRowIds.length !== 0 && <Button variant='contained' size="small" type='button' color='error' onClick={() => setDeleteModal(true)}>Delete </Button>}
                                                        </div>

                                                    </div>
                                                ),
                                            }}


                                            onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                                setUnitSelectedRowIds(newRowSelectionModel);
                                                console.log(event)

                                            }}
                                            onRowClick={updateUnit}
                                            density="compact"

                                            checkboxSelection


                                        >

                                        </DataGrid>




                                    </div>



                                    {/* <div style={style} className='table-responsive'>
                                        <table className='table table-bordered text-center'>
                                            <tbody>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th>Unit Name</th>
                                                    <th>Delete</th>
                                                </tr>
                                                {unitDataList.map((item, index) => (
                                                    <tr onClick={() => updateUnit(item)}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.unitName}</td>
                                                        <td><button type='button' className='btn btn-danger' onClick={() => setDeleteModal(true)}><i className="bi bi-trash-fill"></i></button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>*/}
                                    <Dialog
                                        open={deleteModal}
                                        onClose={() => setDeleteModal(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {" Unit delete confirmation?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to delete the Unit
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
                                            <Button onClick={(e) => { deleteUnitData(e); setDeleteModal(false); }} autoFocus>
                                                Delete
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                </div>
                            </Paper>
                        </Grid>

                    </Grid>
                </Box>
            </form>


        </div>
    )
}

export const PartDataBase = ({ style }) => {


    const [customerList, setCustomerList] = useState([])
    const empRole = useEmployee()
    const { employee, loggedEmp, allowedPlants } = empRole
    console.log(allowedPlants)

    const vendorFetch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/vendor/getVendorByPlants`, {allowedPlants: allowedPlants}
            );
            console.log(response.data)

            
            const customersList = response.data.result.filter((item) => item.customer === "1")
            setCustomerList(customersList);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetch();
    }, []);




    const [errorHandler, setErrorHandler] = useState({})
    const [partStateId, setPartStateId] = useState("")
    const [partSnackBar, setPartSnackBar] = useState(false)
    const handleSnackClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }

        setPartSnackBar(false);
    }
    const initialPartData = {

        partNo: "",
        partName: "",
        customer: "",
        operationNo: "N/A",
        partStatus: "active",
        partPlant: ""
    }


    const [partData, setPartData] = useState({
        partNo: "",
        partName: "",
        customer: "",
        operationNo: "N/A",
        partStatus: "active",
        partPlant: ""
    })
    console.log(partData)



    const [lastNo, setLastNo] = useState("1")

    const [partDataList, setPartDataList] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const partFetchData = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/part/getPartsByPlant`, {allowedPlants: allowedPlants}
            );

            setPartDataList(response.data.result);
            setFilteredData(response.data.result)

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        partFetchData();
    }, []);











    const [partSelectedRowIds, setPartSelectedRowIds] = useState([]);
    const partColumns = [
        { field: 'id', headerName: 'Si. No', width: 100, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },

        { field: 'partNo', headerName: 'PartNo', width: "150", headerAlign: "center", align: "center" },
        { field: 'partName', headerName: 'partName', width: "190", headerAlign: "center", align: "center" },
        { field: 'customer', headerName: 'Customer', width: "200", headerAlign: "center", align: "center" },
        { field: 'operationNo', headerName: 'Operation No', width: "200", headerAlign: "center", align: "center" },
        { field: 'partStatus', headerName: 'Part Status', width: "200", headerAlign: "center", align: "center" },




    ];


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
    const [generalExcelStatus, setGeneralExcelStatus] = useState('');

    const handleGeneralExcel = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        setFile(selectedFile);
    };

    const handleGeneralUpload = async () => {
        try {
            if (!file) {
                setGeneralExcelStatus('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${process.env.REACT_APP_PORT}/part/uploadPartInExcel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            partFetchData();

            setGeneralExcelStatus(response.data.message || 'Excel file uploaded successfully');
        } catch (error) {
            if (error.response) {
                setGeneralExcelStatus(`Error: ${error.response.data.error || 'Something went wrong'}`);
            } else if (error.request) {
                setGeneralExcelStatus('Network error. Please try again.');
            } else {
                setGeneralExcelStatus('Error uploading the file.');
            }
            console.error('Error uploading Excel file:', error);
        }
    };

    useEffect(() => {
        if (generalExcelStatus) {
            const timeoutId = setTimeout(() => {
                setGeneralExcelStatus('');
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [generalExcelStatus]);




    //validate function 
    const [errors, setErrors] = useState({})

    const validateFunction = () => {
        let tempErrors = {};
        tempErrors.partNo = partData.partNo ? "" : "Part No is Required"
        tempErrors.partName = partData.partName ? "" : "Part Name is Required"
        tempErrors.partPlant = partData.customer ? "" : "Plant Required"
        tempErrors.customer = partData.customer ? "" : "Customer is Required"
        tempErrors.operationNo = partData.operationNo ? "" : "Operation No is Required"


        setErrors({ ...tempErrors })

        return Object.values(tempErrors).every(x => x === "")
    }
    console.log(errors)





    const partSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateFunction()) { }
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/part/createPart`, partData
            );
            {/*console.log(response.data.message)*/ }
            console.log(response)
            setPartSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            partFetchData();
            setPartData(initialPartData);
        } catch (err) {
            setPartSnackBar(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' | ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500);
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }

        }
    };
    const updatePartData = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/part/updatePart/${partStateId}`, partData

            );
            partFetchData();
            setPartData(initialPartData);
            setPartSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            setPartStateId(null)
            console.log(response);
        } catch (err) {
            console.log(err);
            setPartSnackBar(true)
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

    const deletePartData = async (id) => {
        try {
            const response = await axios.delete(
                ` ${process.env.REACT_APP_PORT}/part/deletePart`, {
                data: {
                    partIds: partSelectedRowIds
                }
            }


            );
            partFetchData();
            setPartData(initialPartData);
            setPartStateId(null);
            setPartSnackBar(true);
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" });
            console.log("Part delete Successfully");
        } catch (err) {
            console.log(err);
            setPartSnackBar(true)
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
    console.log(errorHandler.message)


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
            setPartData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


        }
    };


    const updatePart = async (params) => {
        console.log(params)
        setPartData(params.row)
        setPartStateId(params.id)
    }




    const handlePartDataBaseChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === 'partName'
            ? value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : value;
        setPartData((prev) => ({ ...prev, [name]: formattedValue }));

    };
    const bodyModel = {
        borderRadius: "10px",
        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 10px 0px",
    }

    const [openModal, setOpenModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [selectedPlantParts, setSelectedPlantParts] = useState([])
    useEffect(() => {
        const customerPlantFilter = customerList.filter(cus => cus.vendorPlant.includes(partData.partPlant))
        setSelectedPlantParts(customerPlantFilter)
    }, [partData.partPlant])

    useEffect(() => {
        const plantPartData = [...new Set(partDataList.map(part => part.partPlant))]
        console.log(plantPartData)
        const customers = [...new Set(partDataList.map(part => part.customer))]
        console.log(customers)
        setFilters(prev => ({ ...prev, plants: plantPartData, customers: customers }))
    }, [partDataList])

    const [filters, setFilters] = useState({
        plants: [],
        customers: []
    })
    console.log(filters)

    const onChangeFilter = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        if (value === "All") {
            setFilteredData(partDataList)
        } else {
            const data = partDataList.filter(part => part[name] === value)
            setFilteredData(data)
        }
    }

    return (

        <div  >
            <form>
                <Box sx={{ flexGrow: 1, m: 4 }}>

                    <Grid container spacing={2} >


                        <Grid item xs={12} >
                            <Paper sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',

                            }}
                                elevation={12}

                            >


                                <div>
                                    <div className="row g-2 mb-2">
                                        <div className="form-floating col-md-2">
                                            <TextField label="Si.No."
                                                id="partDbId"
                                                fullWidth
                                                disabled
                                                placeholder="partDb"
                                                size="small"
                                                onChange={handlePartDataBaseChange}
                                                value={partDataList.length + 1}
                                                name="partDb" ></TextField>

                                        </div>
                                        <div className="form-floating col d-flex-md-5">
                                            <TextField label="Part No"
                                                {...(errors.partNo !== "" && { helperText: errors.partNo, error: true })}
                                                id="partNoId"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={handlePartDataBaseChange}
                                                value={partData.partNo}
                                                name="partNo" />

                                        </div>
                                        <div className="form-floating col-md-6">
                                            <Autocomplete label="Part Name"
                                                disablePortal
                                                size="small"
                                                getOptionDisabled={option => true}
                                                options={partDataList.map((part) => ({ label: part.partName }))}
                                                fullWidth
                                                clearOnBlur={false}
                                                value={partData.partName}
                                                renderInput={(params) =>
                                                    <TextField    {...(errors.partName !== "" && { helperText: errors.partName, error: true })} onKeyDown={handleKeyDown} onChange={handlePartDataBaseChange}
                                                        name="partName" {...params} label="Part Name" />} />
                                        </div>
                                    </div>


                                    <div className="row mb-2 g-2">
                                        <div className="form-floating col-md-3">
                                            <TextField label="Plant"
                                                id="partPlantId"
                                                select
                                                defaultValue="all"
                                                value={partData.partPlant}
                                                fullWidth
                                                {...(errors.partName !== "" && { helperText: errors.partPlant, error: true })}
                                                onChange={handlePartDataBaseChange}
                                                size="small"
                                                name="partPlant" >

                                                <MenuItem value="all">All</MenuItem>
                                                {loggedEmp.plantDetails.map((item, index) => (
                                                    <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                                ))}
                                            </TextField>

                                        </div>

                                        <div className="form-floating col-md-3"  >
                                            <TextField label="Customer"
                                                {...(errors.customer !== "" && { helperText: errors.customer, error: true })}
                                                select
                                                id="customerId"
                                                disabled={partData.partPlant === ""}
                                                placeholder="customer"
                                                size="small"
                                                onChange={handlePartDataBaseChange}
                                               
                                                value={partData.customer}
                                                name="customer"
                                                fullWidth>
                                                {selectedPlantParts.map((item, index) => (
                                                    <MenuItem key={index} value={item.aliasName}>{item.aliasName}</MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div className="form-floating col-md-4" >
                                            <TextField label="Operation No"
                                                {...(errors.operationNo !== "" && { helperText: errors.operationNo, error: true })}
                                                id="operationNoId"
                                                defaultValue=""
                                                placeholder="operationNo"
                                                size="small"
                                                onChange={handlePartDataBaseChange}
                                               
                                                value={partData.operationNo}
                                                name="operationNo"
                                                fullWidth
                                            ></TextField>

                                        </div>
                                        <div className="form-floating col-md-2">
                                            <TextField label="Status"
                                                id="partStatusId"
                                                fullWidth
                                                select
                                                placeholder="partStatus"
                                                size="small"
                                                onChange={handlePartDataBaseChange}

                                                value={partData.partStatus}
                                                name="partStatus" >

                                                <MenuItem value="active">Active</MenuItem>
                                                <MenuItem value="inActive">InActive</MenuItem>
                                            </TextField>

                                        </div>

                                    </div>

                                </div>
                                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={partSnackBar} autoHideDuration={6000} onClose={handleSnackClose}>
                                    <Alert variant="filled" onClose={handleSnackClose} severity={errorHandler.code} sx={{ width: '100%' }}>
                                        {errorHandler.message}
                                    </Alert>
                                </Snackbar>


                                <div className="row g-2 ">
                                    <div className="col d-flex">
                                        <div className="d-flex justify-content-center">
                                            <ButtonGroup className='me-3' size="small">
                                                <Button component="label" variant="contained" size="small" >
                                                    Upload
                                                    <VisuallyHiddenInput type="file" onChange={handleGeneralExcel} />
                                                </Button>
                                                <Button size="small" onClick={handleGeneralUpload}><CloudUpload /></Button>
                                            </ButtonGroup>

                                            {/* <ButtonGroup size="small">
                                                <Button size="small" component="label" variant="contained" color='secondary'>
                                                    Download
                                                    <VisuallyHiddenInput type="file" />
                                                </Button>
                                                <Button size="small" color='secondary'><CloudDownload /></Button>
                                            </ButtonGroup> */}
                                        </div>
                                        <div className='col d-flex justify-content-end'>
                                            {partStateId ?
                                                <div className="d-flex justify-content-end">
                                                    <div className='me-2'>
                                                        <Button type="button" variant='contained' size="small" color='warning' onClick={() => setOpenModal(true)}>Modify</Button>
                                                    </div>
                                                    <div className='me-2'>
                                                        <Button type="button" variant='contained' color='error' size="small" className='btn btn-danger' onClick={() => { setPartStateId(null); setPartData(initialPartData) }}>Cancel</Button>
                                                    </div>
                                                </div> : <div className="ms-auto">
                                                    <Button variant='contained' size="small" color='success' onClick={() => setOpenModal(true)}>+ Add Part</Button>
                                                </div>}

                                        </div>
                                    </div>
                                </div>




                                {generalExcelStatus && <p style={{ color: 'green' }}>{generalExcelStatus}</p>}
                                {partStateId ? <Dialog
                                    open={openModal}
                                    onClose={() => setOpenModal(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {" Part update confirmation?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure to update the Part
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                                        <Button onClick={() => { updatePartData(); setOpenModal(false); }} autoFocus>
                                            Update
                                        </Button>
                                    </DialogActions>
                                </Dialog> :
                                    <Dialog
                                        open={openModal}
                                        onClose={() => setOpenModal(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {" Part create confirmation?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to add the Part
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                                            <Button onClick={(e) => { partSubmit(e); setOpenModal(false); }} autoFocus>
                                                Add
                                            </Button>
                                        </DialogActions>
                                    </Dialog>}



                            </Paper>
                        </Grid>

                        <Grid item xs={12} >
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                                elevation={12}
                            >
                                <div className='row'>
                                    <h5 className='text-center col-md-8'>Part List</h5>
                                    <div className='col d-flex justify-content-end'>


                                        <TextField id='plantFilterId' name='partPlant' className='me-2' onChange={onChangeFilter} size='small' label="Plant" fullWidth select>
                                            <MenuItem value="All">All</MenuItem>
                                            {filters.plants.map((plant, index) => (
                                                <MenuItem key={index} value={plant}>{plant}</MenuItem>
                                            ))}
                                        </TextField>


                                        <TextField id='customerFilterId' name='customer' onChange={onChangeFilter} size='small' label="Customer" fullWidth select>
                                            <MenuItem value="All">All</MenuItem>
                                            {filters.customers.map((cus, index) => (
                                                <MenuItem key={index} value={cus}>{cus}</MenuItem>
                                            ))}
                                        </TextField>

                                    </div>
                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid disableDensitySelector
                                            rows={filteredData}
                                            columns={partColumns}
                                            getRowId={(row) => row._id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 5 },
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
                                                        <div className='d-flex justify-content-end'>

                                                            <div>
                                                                {partSelectedRowIds.length !== 0 && <Button variant='contained' type='button' size='small' color='error' onClick={() => setDeleteModal(true)}>Delete </Button>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ),
                                            }}
                                            onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                                setPartSelectedRowIds(newRowSelectionModel);
                                                console.log(event)
                                            }}
                                            onRowClick={updatePart}
                                            density="compact"
                                            checkboxSelection
                                        >
                                        </DataGrid>




                                    </div>






                                    <Dialog
                                        open={deleteModal}
                                        onClose={() => setDeleteModal(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Part delete confirmation?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to delete the Part
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
                                            <Button onClick={() => { deletePartData(); setDeleteModal(false); }} autoFocus>
                                                Delete
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                </div>
                            </Paper>
                        </Grid>

                    </Grid>
                </Box>

            </form>
        </div>
    )
}


