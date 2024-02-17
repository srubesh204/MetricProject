import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { FileCopy } from '@mui/icons-material';
import { IconButton } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, MenuItem, Button } from '@mui/material';
import { useEmployee } from '../../App';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import Snackbar from '@mui/material/Snackbar';
import { Edit, FilterAlt, PrintRounded } from '@mui/icons-material';

export const MeasurementUncertaintyList = () => {

    const empRole = useEmployee()
    const { loggedEmp } = empRole

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
            setFilteredData(response.data.result)
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        uncFetch()
    }, []);

const[uncPlantName,setPlantName] = useState({
    uncPlant:""
})


    const uncertaintyListColumns = [
        { field: 'uncertaintyId', headerName: 'UNC ID', width: 100, renderCell: (params) => (params.uncId), headerAlign: "center", align: "center", },
        { field: 'uncItemName', headerName: 'ItemName', width: 200, headerAlign: "center", align: "center", },
        { field: 'uncDate', headerName: 'UNC Date', width: 200, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.uncDate).format('DD-MM-YYYY') },
        { field: 'printButton', headerName: 'Print', headerAlign: "center", align: "center", width: 100, renderCell: (params) => <Button component={Link} to={`${process.env.REACT_APP_PORT}/uncertaintyCertificates/UNC${dayjs().year() + "-" + params.row.uncertaintyId}.pdf`} target='_blank'><PrintRounded color='success' /></Button> }


        // {
        //     field: 'uncRangeSize',
        //     headerName: 'UncRangeSize',
        //     width: 210,
        //     headerAlign: "center", align: "center",
        // },
        // {
        //     field: 'uncLC',
        //     headerName: 'UncLC',
        //     //   description: 'This column has a value getter and is not sortable.',
        //     width: 150,
        //     headerAlign: "center", align: "center",
        // },
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
    const [filteredData, setFilteredData] = useState([])
    const oneMonthBefore = dayjs().subtract(dayjs().date() - 1, 'day')
    const [dateData, setDateData] = useState({
        fromDate: oneMonthBefore.format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD')
    })

    useEffect(() => {
        const filteredItems = uncertaintyList.filter((item) => dayjs(item.uncDate).isSameOrAfter(dateData.fromDate) && dayjs(item.uncDate).isSameOrBefore(dateData.toDate))
        console.log(filteredItems)
        setFilteredData(filteredItems)
    }, [dateData.fromDate, dateData.toDate])


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
      
            if (value === "all") {
                setFilteredData(uncertaintyList)
            } else {
                if (name === "uncPlant") {
                    const uncPlant = uncertaintyList.filter((item) => (item.uncPlant === value));
                    setFilteredData(uncPlant);
                }

                // const uncPlant = uncertaintyList.filter((item) =>  (item.uncPlant === value))
                // setFilteredData(uncPlant)
            }
            
        
        setDateData((prev) => ({ ...prev, [name]: value }));


    }


    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>
                    <Paper
                        sx={{
                            p: 2,
                            mb: 1
                        }}
                        elevation={12}
                    >
                        <div className='row g-2 mb-2'>
                            <h6 className="text-center ">MeausrementUncertaintyList</h6>
                            {/* <div className='col'>
                                <TextField label="Plant Wise"
                                    id="uncPlantId"
                                    select
                                    defaultValue="all"
                                   
                                    fullWidth
                                    onChange={handleFilterChange}
                                    size="small"
                                    name="uncPlant" >
                                    <MenuItem value="all">All</MenuItem>
                                    {loggedEmp.plantDetails.map((item, index) => (
                                        <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                    ))}
                                </TextField>

                            </div> */}


                            <div className='col-3'>
                                <DatePicker
                                    fullWidth
                                    id="fromDateId"
                                    name="fromDate"
                                    size="small"
                                    label="From Date"
                                    sx={{ width: "100%" }}
                                    slotProps={{ textField: { size: 'small' } }}
                                    format="DD-MM-YYYY"
                                value={dayjs(dateData.fromDate)}
                                onChange={(newValue) =>
                                    setDateData((prev) => ({ ...prev, fromDate: dayjs(newValue).format('YYYY-MM-DD') }))}
                                />

                            </div>
                            <div className='col-3'>
                                <DatePicker
                                    fullWidth
                                    id="toDateId"
                                    name="toDate"
                                    label="To Date"
                                    sx={{ width: "100%" }}
                                    slotProps={{ textField: { size: 'small' } }}
                                    format="DD-MM-YYYY"
                                 value={dayjs(dateData.toDate)}
                                onChange={(newValue) =>
                                    setDateData((prev) => ({ ...prev, toDate: dayjs(newValue).format('YYYY-MM-DD') }))} 

                                />

                            </div>


                            <div style={{ height: 450, width: '100%', marginTop: "0.5rem" }}>
                                <DataGrid disableDensitySelector
                                    rows={filteredData}
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
                            <div className='d-flex justify-content-end'>
                                <Button component={Link} variant='contained' to={`/measurementUncertainty/`} >
                                    Uncertainty ADD
                                </Button>
                            </div>

                        </div>
                    </Paper>

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



                </form>
            </LocalizationProvider>
        </div>
    )
}
