import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { FileCopy } from '@mui/icons-material';
import { IconButton } from "@mui/material";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, MenuItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Edit, FilterAlt, PrintRounded } from '@mui/icons-material';

export const MeasurementUncertaintyList = () => {

    const [deleteModalItem, setDeleteModalItem] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    }
    const [uncertaintyList, setUncertaintyList] = useState([])
    const uncFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/measurementUncertainty/getAllMeasurementUncertainty`
            );
            setUncertaintyList(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        uncFetch()
    }, []);


    const uncertaintyListColumns = [
        {
            field: 'button',
            headerName: 'Edit',
            width: 60,
            headerAlign: "center", align: "center",
            renderCell: (params) => (
                <Button component={Link} to={`/measurementUncertaintyEdit/${params.id}`}>
                    <Edit color='success' />
                </Button>
            ),
        },

        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },
        { field: 'uncItemName', headerName: 'UncItemName', width: 130, headerAlign: "center", align: "center", },

        {
            field: 'uncRangeSize',
            headerName: 'UncRangeSize',
            width: 210,
            headerAlign: "center", align: "center",
        },
        {
            field: 'uncLC',
            headerName: 'UncLC',
            //   description: 'This column has a value getter and is not sortable.',
            width: 150,
            headerAlign: "center", align: "center",
        },
    ]
    const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])
    const [selectedItemList, setSelectedItemList] = useState([])

    const handleRowSelectionChange = (newSelection, e) => {
        const selectedRowsData = uncertaintyList.filter((row) => newSelection.includes(row._id));
        setSelectedItemList(selectedRowsData)
        setItemListSelectedRowIds(newSelection);
    };
    
    const [errorhandler, setErrorHandler] = useState({});
    const deleteItemData = async () => {

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/measurementUncertainty/deleteMeasurementUncertainty`, {
                data: {
                    uncertaintyIds: itemListSelectedRowIds
                }
            }
            );

            setSnackBarOpen(true)

            console.log(response.data)
            setErrorHandler({ status: response.data.status, message: response.data.results, code: "success" })
            console.log("Measurement Uncertainty delete Successfully");
            //setItemAddData(initialItemAddData)
            uncFetch()
        } catch (err) {

            setSnackBarOpen(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                console.log(errorData400)
                setErrorHandler({ status: 0, message: errorData400, code: "error" });
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
            console.log(err);
        }
    };








    return (
        <div>

            <div className='row'>
                <h6 className="text-center ">MeausrementUncertaintyList</h6>
                <div style={{ height: 300, width: '100%', marginTop: "0.5rem" }}>
                    <DataGrid disableDensitySelector
                        rows={uncertaintyList}
                        columns={uncertaintyListColumns}
                        getRowId={(row) => row._id}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
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
                                    {/* <GridToolbarQuickFilter /> */}
                                    {itemListSelectedRowIds.length !== 0 && <Button className='me-2' variant='contained' type='button' size='small' color='error' onClick={() => setDeleteModalItem(true)} > Delete </Button>}
                                </div>
                            ),
                        }}
                        disableColumnFilter
                        checkboxSelection
                        // onRowSelectionModelChange={(newRowSelectionModel, event) => {
                        //     setItemListSelectedRowIds(newRowSelectionModel);
                        //     console.log(event)

                        // }}
                        onRowSelectionModelChange={handleRowSelectionChange}

                        // onRowClick={updateVendor}

                        density="compact"
                        //disableColumnMenu={true}


                        pageSizeOptions={[10]}


                    />
                </div>
                </div>

                <Dialog
                    open={deleteModalItem}
                    onClose={() => setDeleteModalItem(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {" Uncertainty delete confirmation?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure to delete the uncertainty
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteModalItem(false)}>Cancel</Button>
                        <Button onClick={() => { deleteItemData(); setDeleteModalItem(false); }} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar variant="contained" anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert variant="filled" onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '100%' }}>
                        {errorhandler.message}
                    </Alert>
                </Snackbar>

         



        </div>
    )
}
