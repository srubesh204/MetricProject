import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { AddToPhotos, CloudUpload, DeleteOutlined, Delete, DomainVerification } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { TextField, MenuItem, FormControl, Fab, Link, Typography, Badge, LinearProgress } from '@mui/material';
import { Box, Grid, Paper, Container } from '@mui/material';

import { Add, Remove } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';





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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (value === "all") {
            setFilteredData(itemMasterDataList)
        } else {
            if (name === "itemTypeSort") {
                const itemType = itemMasterDataList.filter((item) => (item.itemType === value))
                setFilteredData(itemType)
            }
            if (name === "itemDescriptionSort") {
                const itemDescription = itemMasterDataList.filter((item) => (item.itemDescription === value))
                setFilteredData(itemDescription)
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
        calAlertInDay: "",
        wiNo: "",
        uncertainty: "",
        uncertaintyUnit: "",
        standardRef: "",
        
        itemImageName: "",
        workInsName: "",
        status: "",
        calibrationPoints: [],


    }

    const [itemMasterData, setItemMasterData] = useState({
        itemType: "",
        itemDescription: "",
        itemPrefix: "",
        itemFqInMonths: "",
        calAlertInDay: "",
        wiNo: "",
        uncertainty: "",
        uncertaintyUnit: "",
        standardRef: "",
        itemImageName: "",
        
        workInsName: "",
        status: "",
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
        setItemMasterData((prevItemMasterData) => {
            const updateCP = [...prevItemMasterData.calibrationPoints]
            updateCP[index] = {
                ...updateCP[index], [name]: value,
            };
            return {
                ...prevItemMasterData, calibrationPoints: updateCP,
            };
        })
    };

    const [itemMasterDataList, setItemMasterDataList] = useState([])
    const itemMasterFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemMaster/getAllItemMasters`
            );
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

    const [itemMasteSelectedRowIds, setItemMasteSelectedRowIds] = useState([]);
    const itemMasterColumns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id)+1},

        { field: 'itemType', headerName: 'Item Type', width: 70 },
        { field: 'itemDescription', headerName: 'Item Description', width: 150 },
        { field: 'itemPrefix', headerName: 'Item Prefix', width: 150 },
        { field: 'itemFqInMonths', headerName: 'Item Fq In Months', width: 90, },
        { field: 'calAlertInDay', headerName: 'Cal Alert In Day', width: 90, },
        { field: 'wiNo', headerName: 'Wi No', width: 90, },
        { field: 'uncertainty', headerName: 'Uncertainty', width: 100, },
        { field: 'standardRef', headerName: 'Standard Ref', type: "number", width: 120, },
        { field: 'status', headerName: 'Status', width: 100, },
        
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







    const itemMasterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemMaster/createItemMaster`, itemMasterData
            );
            {/*console.log(response.data.message)*/ }
            console.log(response)
            itemMasterFetchData();
            setSnackBarOpen(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            setItemMasterData(initialItemMasterData);
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
                "http://localhost:3001/itemMaster/updateItemMaster/" + itemMasterStateId, itemMasterData
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
                "http://localhost:3001/ItemMaster/deleteItemMaster/", {
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
        setItemMasterData(params.row)
        setItemMasterStateId(params.id)
    }




    const handleItemMasterBaseChange = (e) => {
        const { name, value } = e.target;
        setItemMasterData((prev) => ({ ...prev, [name]: value }));

    };

    //image upload 
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();

            reader.onload = (event) => {
                console.log(event.target.result)
                setItemMasterData((prev) => ({ ...prev, itemMasterImage: event.target.result }));
            };

            reader.readAsDataURL(selectedImage);
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
   

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        if (selectedFile) {
            console.log("working")
            setItemMasterData((prev) => ({ ...prev, workInsName: selectedFile.name }));
            const fileURL = URL.createObjectURL(selectedFile);
            setIframeURL({ fileURL: fileURL, fileName: selectedFile.name, file: selectedFile });
        }
    };


    //Work Instruction Upload
    const handleWorkInstructionUpload = async () => {
        const formData = new FormData();
        formData.append('file', iframeURL.file);

        try {
            axios.post(`${process.env.REACT_APP_PORT}/upload/workInstructions`, formData)
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




    //


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

                            }}>
                            <div className='row mb-2 g-2'>

                                <div className='col' >
                                    <TextField fullWidth label="Item Type" value={itemMasterData.itemType} onChange={handleItemMasterBaseChange} className="form-select" select size="small" id="itemTypeId" name="itemType" defaultValue="" >

                                        <MenuItem value="all">All</MenuItem >
                                        <MenuItem value="Attribute">Attribute</MenuItem >
                                        <MenuItem value="Variable">Variable</MenuItem >
                                        <MenuItem value="Reference Standard">Reference Standard</MenuItem>

                                    </TextField>

                                </div>
                                <div className="col">

                                    <TextField label="Item Description "
                                        id="itemDescriptionId"
                                        defaultValue=""
                                        sx={{ width: "100%" }}
                                        size="small"
                                        fullWidth
                                        onKeyDown={handleKeyDown}
                                        value={itemMasterData.itemDescription}
                                        onChange={handleItemMasterBaseChange}
                                        name="itemDescription" />
                                </div>

                                <div className="form-floating col">
                                    <TextField label="Item Prefix "
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

                                    }}>
                                    <div className='row mb-2 g-2'>
                                        <div className="form-floating col-md-6">

                                            <TextField label="Wi No "
                                                id="wiNoId"
                                                defaultValue=""
                                                sx={{ width: "100%" }}
                                                size="small"
                                                fullWidth
                                                value={itemMasterData.wiNo}
                                                onChange={handleItemMasterBaseChange}
                                                name="wiNo" />
                                        </div>
                                        <div className="col">
                                            <TextField label="Item Fq In Months "
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
                                        <div className="input-group col">
                                            <div className="form-floating">

                                                <TextField label="Uncertainty "
                                                    id="uncertaintyId"
                                                    defaultValue=""
                                                    sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth
                                                    type='number'
                                                    value={itemMasterData.uncertainty}
                                                    onChange={handleItemMasterBaseChange}
                                                    name="uncertainty" />

                                            </div>
                                            <div className='col' >

                                                <TextField fullWidth label="Unit" value={itemMasterData.uncertaintyUnit} onChange={handleItemMasterBaseChange} className="form-select" select size="small" id="uncertaintyUnitId" name="uncertaintyUnit" defaultValue="" >
                                                    {unitDataList.map((item, index) => (
                                                        <MenuItem key={index} value={item.unitName}>{item.unitName}</MenuItem>
                                                    ))}


                                                    {/*<MenuItem value="Unit">Unit</MenuItem >
                                                    <MenuItem value="Unit Name">Unit Name</MenuItem>*/}

                                                </TextField>

                                            </div>

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

                                            <TextField fullWidth label="Status" value={itemMasterData.status} onChange={handleItemMasterBaseChange} className="form-select" select size="small" id="statusId" name="status" defaultValue="" >


                                                <MenuItem value="Active">Active</MenuItem >
                                                <MenuItem value="InActive">InActive</MenuItem >


                                            </TextField>
                                        </div>

                                    </div>
                                    <div className="">
                                        <div className="d-flex">
                                        <Button fullWidth color='secondary' component="label" variant="contained" startIcon={<UploadFileIcon />} size="small">
                                            Work Instruction Upload
                                            <VisuallyHiddenInput type="file" onChange={handleFileSelect}/>
                                        </Button>
                                        <Button className='ms-2' variant='contained' onClick={handleWorkInstructionUpload}>Upload</Button>
                                        </div>
                                        
                                        {itemMasterData.workInsName && 
                                            <div className='d-flex justify-content-center mt-2 '>
                                            <Link target="_blank" underline="hover" href={`${process.env.REACT_APP_PORT}/workInstructions/${itemMasterData.workInsName}`} className='me-2'>{itemMasterData.workInsName}</Link>
                                            <Button size='small' variant='outlined' color='error' onClick={()=> {setIframeURL(null); setItemMasterData((prev)=> ({...prev, workInsName: ""}))} } endIcon={<Delete />}>Remove</Button>



                                        </div>
                                        
                                        }
                                        


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
                                {/* {image &&  <div style={{ width: "100%", height: "100%", margin: "0 0px 0 0", padding: 0 }}>
                                <img src={image} width="200px" height="200px" alt="Uploaded" style={{ maxWidth: '100%' }} />
                                </div>} */}
                                {itemMasterData.itemMasterImage && <div style={{ margin: 0  }}>
                                    <div className='d-flex justify-content-center' style={{ width: "100%", height: "100%" }}>
                                    <Badge type="button" badgeContent={"X"} onClick={() => setItemMasterData((prev) => ({ ...prev, itemMasterImage: "" }))}  style={{ width: "100%", height: "100%" }} color="error"><img src={itemMasterData.itemMasterImage} style={{ width: "100%", height: "100%", margin: "auto", display: "block", background: "inherit" }}></img></Badge>
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

                                        }}>
                                        <div style={{ maxHeight: "215px", overflow: "auto", height: "100%" }}>
                                            <table className='table table-bordered text-center align-middle'>
                                                <tbody>
                                                    <tr>
                                                        <th>Si No</th>
                                                        <th>Calibration Points </th>
                                                        <th><Fab size='small' color="primary" aria-label="add" onClick={() => addCalibrationPointRow()}>
                                                            <Add />
                                                        </Fab></th>
                                                    </tr>
                                                    {itemMasterData.calibrationPoints ? itemMasterData.calibrationPoints.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td><input type='text' className='form-control' name='calibrationPoint' value={item.calibrationPoint} onChange={(e) => changeCalibrationPointRow(index, e.target.name, e.target.value)} /></td>
                                                            <td><Fab size='small' color="error" aria-label="add" onClick={() => deleteCalibrationPointRow(index)}>
                                                                <Remove />
                                                            </Fab></td>
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

                            }}>
                            <div className='row'>

                                <div className="col-md-7">
                                    <div>
                                        <Stack direction="row"
                                            justifyContent="flex-start"
                                            alignItems="flex-start"
                                            spacing={2} >
                                            <Button component="label" variant="contained" startIcon={<CloudUpload />} size="small" font>
                                                Upload file
                                                <VisuallyHiddenInput type="file" />
                                            </Button>
                                            <Button component="label" variant="contained" startIcon={<FileDownloadIcon />} size="small">
                                                Download file
                                                <VisuallyHiddenInput type="file" />
                                            </Button>
                                        </Stack>
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
                                                <button type="button" className='btn btn-secondary' onClick={() => setOpenModal(true)} >Modify</button>
                                            </div>
                                            <div className='me-2' >
                                                <button type="button" className='btn btn-danger' onClick={() => { setItemMasterStateId(null); setItemMasterData(initialItemMasterData) }}>Cancel</button>
                                            </div>
                                        </div> : <div className='col d-flex justify-content-end '>
                                            <div >
                                                <button type="button" className='btn btn-warning' onClick={() => setOpenModal(true)}>+ Add Item Master</button>
                                            </div>
                                        </div>
                                    }
                                </div>.

                            </div>
                        </Paper>






                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 4

                            }}>
                            <div>
                                <h3 className='text-center'>Item List</h3>
                                <div className='row mb-2 g-2'>

                                    <div class="col-3 ">
                                        <TextField fullWidth label="Item Type Sort" onChange={handleFilterChange} className="form-select" select size="small" id="itemTypeSortId" name="itemTypeSort" defaultValue="" >

                                            <MenuItem value="all">All</MenuItem >
                                            <MenuItem value="Attribute">Attribute</MenuItem >
                                            <MenuItem value="Variable">Variable</MenuItem >
                                            <MenuItem value="Reference Standard">Reference Standard</MenuItem >

                                        </TextField>

                                    </div>
                                    <div class=" col-3">
                                        <TextField fullWidth label="Item Description Sort" onChange={handleFilterChange} className="form-select" select size="small" id="itemDescriptionSortId" name="itemDescriptionSort" defaultValue="" >

                                            <MenuItem value="all">All</MenuItem >
                                            {itemMasterDataList.map((item) => (
                                                <MenuItem value={item.itemDescription}>{item.itemDescription}</MenuItem>
                                            ))}

                                        </TextField>
                                    </div>
                                    <div className='col d-flex justify-content-end'>
                                        <div >
                                            {itemMasteSelectedRowIds.length !== 0 && <Button variant='contained' type='button' color='error' onClick={() => setDeleteModal(true)}>Delete </Button>}
                                        </div>
                                    </div>


                                </div>
                                <div>


                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                            rows={filteredData}
                                            columns={itemMasterColumns}
                                            getRowId={(row) => row._id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { page: 0, pageSize: 5 },
                                                },
                                            }}
                                            pageSizeOptions={[5, 10]}
                                            onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                                setItemMasteSelectedRowIds(newRowSelectionModel);
                                                console.log(event)

                                            }}
                                            onRowClick={updateItemMaster}
                                            checkboxSelection


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


                                                    <td><button type='button' className='btn btn-danger' onClick={() => setDeleteModal(true)} ><i class="bi bi-trash-fill"></i></button></td>
                                                </tr>
                                            )) : <tr>
                                                <td colSpan={8}>No Data Available</td></tr>}

                                        </tbody>
                                    </table>*/}
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