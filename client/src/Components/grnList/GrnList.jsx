import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab, Link, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Container, Paper } from '@mui/material';

const GrnList = () => {

    const [vendorDcList, setVendorDcList] = useState([])
    const FetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDcList(response.data.result);
            //setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        FetchData();
    }, []);

    const [grnListSelectedRowIds, setGrnListSelectedRowIds] = useState([])
    //
    const Columns = [
        { field: 'id', headerName: 'Si. No', width: 150, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'dcNo', headerName: 'Dc No', width: 200 },
        { field: 'dcDate', headerName: 'Dc Date', width: 200 },
        { field: 'fullName', headerName: 'Full Name', width: 400, },
    ]


    const [grnDataListSelectedRowIds, setgrnDataListSelectedRowIds] = useState([])
    const [grnListDataList, setGrnListDataList] = useState([])
    const grnListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
            );

            setGrnListDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        grnListFetchData();
    }, []);



    const grnColumns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'itemIMTENo', headerName: 'Item IMTENo', width: 100 },
        { field: 'itemAddMasterName', headerName: 'Item Description', width: 100 },
        { field: 'itemRangeSize', headerName: 'Range/Size', width: 100 },
        { field: 'dcRef', headerName: 'Dc Ref', width: 100 },

    ]



    const [filteredData, setFilteredData] = useState([])
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (value === "all") {
            setFilteredData(vendorDcList)
        } else {
            if (value === "oem") {
                const vendorType = vendorDcList.filter((item) => (item.oem === "1"))
                setFilteredData(vendorType)
            }
            if (value === "customer") {
                const vendorType = vendorDcList.filter((item) => (item.customer === "1"))
                setFilteredData(vendorType)
            }
            if (value === "supplier") {
                const vendorType = vendorDcList.filter((item) => (item.supplier === "1"))
                setFilteredData(vendorType)
            }
            if (value === "subContractor") {
                const vendorType = vendorDcList.filter((item) => (item.subContractor === "1"))
                setFilteredData(vendorType)
            }



        }


    };





    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>




                    <div className='row mb-2'>

                        <h1 className='text-center '>GRN List</h1>
                        <div className='col'>
                            <div className='col-12'>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 1
                                    }}
                                    elevation={12}
                                >
                                    <div className='row mb-2'>
                                        <div className='col'>
                                            <TextField fullWidth label="VendorStatus" className="col" select size="small" id="vendorStatusId" onChange={handleFilterChange} name="vendorStatus" defaultValue="" >
                                                <MenuItem value="all">All</MenuItem>
                                                <MenuItem value="oem">OEM</MenuItem>
                                                <MenuItem value="customer">Customer</MenuItem>
                                                <MenuItem value="supplier">Supplier</MenuItem>
                                                <MenuItem value="subContractor">SubContractor</MenuItem>
                                            </TextField>

                                        </div>
                                        <div className='col'>
                                            <TextField fullWidth label="Party Name" className="col" select size="small" id="partyNameId" name="partyName" defaultValue="" >

                                                <MenuItem value="all">All</MenuItem>
                                                {vendorDcList.map((item) => (
                                                    <MenuItem value={item._id}>{item.fullName}</MenuItem>
                                                ))}


                                            </TextField>

                                        </div>
                                    </div>
                                    <div className='row mb-2'>
                                        <div className="form-floating col">
                                            <DatePicker
                                                fullWidth
                                                id="fromDateId"
                                                name="fromDate"
                                                label="From Date"
                                                sx={{ width: "100%" }}
                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD-MM-YYYY" />
                                        </div>
                                        <div className="col">
                                            <DatePicker
                                                fullWidth
                                                id="toDateId"
                                                name="toDate"
                                                sx={{ width: "100%" }}
                                                label="To Date"
                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD-MM-YYYY" />
                                        </div>
                                    </div>
                                </Paper>
                            </div>
                            <div className='col-12 d-flex '>
                                <Paper
                                    sx={{
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 1
                                    }}
                                    elevation={12}
                                >



                                    <Box sx={{ height: 310, width: '100%', my: 2 }}>
                                        <DataGrid

                                            rows={vendorDcList}
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
                                                setGrnListSelectedRowIds(newRowSelectionModel);


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
                                </Paper>

                            </div>
                        </div>









                        <div className='col'>
                            <div className='col'>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 1
                                    }}
                                    elevation={12}
                                >
                                    <Box sx={{ height: 310, width: '100%', my: 2 }}>
                                        <DataGrid

                                            rows={grnListDataList}
                                            columns={grnColumns}
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
                                                setgrnDataListSelectedRowIds(newRowSelectionModel);


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
                                </Paper>

                            </div>
                            <div className='col'>
                                <Paper
                                    sx={{
                                        p: "35Px",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 1
                                    }}
                                    elevation={12}
                                >
                                    <div className='col d-flex '>
                                        <div className=' me-2'>
                                            <button type="button" className='btn btn-secondary' >Modify</button>
                                        </div>
                                        <div className=' me-2'>
                                            <button type="button" className='btn btn-secondary' >Add</button>
                                        </div>
                                        <div className=' me-2'>
                                            <button type="button" className='btn btn-secondary' >Delete</button>
                                        </div>
                                        <div className=' me-2'>
                                            <button type="button" className='btn btn-secondary' >Back</button>
                                        </div>
                                    </div>
                                </Paper>
                            </div>
                        </div>







                    </div>









                </form>

            </LocalizationProvider>

        </div>
    )
}

export default GrnList