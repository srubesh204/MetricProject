import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab, Link, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Container, Paper } from '@mui/material';
const DcList = () => {


    const [vendorDataList, setVendorDataList] = useState([])
    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data.result);
            // setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);
    const [vendorDataDcList, setVendorDataDcList] = useState([])
    const vendorFetDcchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataDcList(response.data.result);
            // setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetDcchData();
    }, []);


    const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])
    //
    const Columns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'dcNo', headerName: 'Dc No', width: 90 },
        { field: 'dcDate', headerName: 'Dc Date', width: 90 },
        { field: 'fullName', headerName: 'Full Name', width: 200, },
    ]


    const [dcListSelectedRowIds, setDcListSelectedRowIds] = useState([])
    const [dcListDataList, setDcListDataList] = useState([])
    const dcListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
            );

            setDcListDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        dcListFetchData();
    }, []);


    const dcListColumns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'itemIMTENo', headerName: 'Item IMTENo', width: 100 },
        { field: 'itemAddMasterName', headerName: 'Item Description', width: 150 },
        { field: 'reMarks', headerName: 'ReMarks', width: 100 },

    ]





    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>
                    <Container maxWidth="lg" sx={{ mb: 2 }}>




                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1
                            }}
                            elevation={12}
                        >
                            <div className='row '>
                                <h1 className='text-center '>DC List</h1>
                                <div className='col d-flex '>
                                    <div className='col me-2'>
                                        <TextField fullWidth label="VendorStatus" className="col" select size="small" id="vendorStatusId" name="vendorStatus" defaultValue="" >

                                            <MenuItem value="all">All</MenuItem>
                                            {vendorDataList.map((item) => (
                                                <MenuItem value={item._id}>{item.vendorStatus}</MenuItem>
                                            ))}


                                        </TextField>

                                    </div>
                                    <div className='col'>
                                        <TextField fullWidth label="Party Name" className="col" select size="small" id="partyNameId" name="partyName" defaultValue="" >

                                            <MenuItem value="all">All</MenuItem>
                                            {vendorDataDcList.map((item) => (
                                                <MenuItem value={item._id}>{item.fullName}</MenuItem>
                                            ))}


                                        </TextField>

                                    </div>
                                </div>
                                <div className=' col d-flex justify-content-end'>
                                    <div className="col-3 me-2">

                                        <DatePicker
                                            fullWidth
                                            id="fromDateId"
                                            name="fromDate"
                                            size="small"
                                            label="From Date"
                                            sx={{ width: "100%" }}
                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY" />

                                    </div>
                                    <div className="col-3">

                                        <DatePicker
                                            fullWidth
                                            id="toDateId"
                                            name="toDate"
                                            label="To Date"
                                            sx={{ width: "100%" }}
                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY" />

                                    </div>

                                </div>

                            </div>



                            <div className='row'>
                                <Box sx={{ height: 310, width: '100%', my: 2 }}>
                                    <DataGrid

                                        rows={vendorDataDcList}
                                        columns={Columns}
                                        getRowId={(row) => row._id}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        sx={{
                                            ".MuiTablePagination-displayedRows": {

                                                "margin-top": "1em",
                                                "margin-bottom": "1em"
                                            }
                                        }}
                                        onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                            setItemListSelectedRowIds(newRowSelectionModel);


                                        }}

                                        slots={{
                                            toolbar: GridToolbar,
                                        }}

                                        density="compact"
                                        //disableColumnMenu={true}
                                        //clipboardCopyCellDelimiter={true}
                                        checkboxSelection
                                        //onRowClick={handleRowClick}
                                        disableRowSelectionOnClick
                                        pageSizeOptions={[5]}
                                    />

                                </Box>

                            </div>
                        </Paper>
                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1
                            }}
                            elevation={12}
                        >

                            <div className='row'>
                                <Box sx={{ height: 310, width: '100%', my: 2 }}>
                                    <DataGrid

                                        rows={dcListDataList}
                                        columns={dcListColumns}
                                        getRowId={(row) => row._id}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        sx={{
                                            ".MuiTablePagination-displayedRows": {

                                                "margin-top": "1em",
                                                "margin-bottom": "1em"
                                            }
                                        }}
                                        onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                            setDcListSelectedRowIds(newRowSelectionModel);


                                        }}

                                        slots={{
                                            toolbar: GridToolbar,
                                        }}

                                        density="compact"
                                        //disableColumnMenu={true}
                                        //clipboardCopyCellDelimiter={true}
                                        checkboxSelection
                                        //onRowClick={handleRowClick}
                                        disableRowSelectionOnClick
                                        pageSizeOptions={[5]}
                                    />

                                </Box>

                            </div>
                            <div className='row'>
                                <div className='col d-flex '>
                                    <div className='me-2 '>
                                        <button type="button" className='btn btn-secondary' >Print</button>
                                    </div>

                                </div>
                                <div className='col d-flex justify-content-end'>
                                    <div className='me-2 '>
                                        <button type="button" className='btn btn-secondary' >Modify</button>
                                    </div>
                                    <div className='me-2 '>
                                        <button type="button" className='btn btn-secondary' >Add</button>
                                    </div>
                                    <div className='me-2 '>
                                        <button type="button" className='btn btn-secondary' >Delete</button>
                                    </div>
                                    <div className='me-2 '>
                                        <button type="button" className='btn btn-secondary' >Back</button>
                                    </div>

                                </div>
                            </div>
                        </Paper>

                    </Container>
                </form>

            </LocalizationProvider>

        </div>
    )
}

export default DcList