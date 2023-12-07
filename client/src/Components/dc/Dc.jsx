import React, { useEffect, useState } from 'react'
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab, Link } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container, Paper, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'

const Dc = () => {




    const Columns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },

        { field: 'itemIMTENo', headerName: 'itemIMTE No', width: 70 },
        { field: 'itemAddMasterName', headerName: 'Item Name', width: 150 },
        {
            field: 'Range/Size',
            headerName: 'Range/Size',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            valueGetter: (params) =>
                `${params.row.itemRangeSize || ''} ${params.row.itemLCUnit || ''}`,
        },
        { field: 'itemMake', headerName: 'Make', width: 90 },
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'itemCalFreInMonths', headerName: 'Frequency', type: "number", width: 100 },
        { field: 'reMarks', headerName: 'Remarks', width: 100 },
    ]


    const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])
    const [dcDataList, setDcDataList] = useState([])
    const dcFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
            );

            setDcDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        dcFetchData();
    }, []);


    const [vendorDataList, setVendorDataList] = useState([])

    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data.result);
            //setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);

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
    const [vendorDcDataList, setVendorDcDataList] = useState([])
    const dcDataFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDcDataList(response.data.result);
            //setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        dcDataFetchData();
    }, []);

    const [itemMasterDataList, setItemMasterDataList] = useState([])

    const itemMasterFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemMaster/getAllItemMasters`

            );

            console.log(response.data)
            setItemMasterDataList(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemMasterFetchData();
    }, []);

    const [itemAddList, setItemAddList] = useState([]);

    const itemAddFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByIMTESort`
            );
            // You can use a different logic for generating the id

            setItemAddList(response.data.result);


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemAddFetch();
    }, []);



    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>
                    <Container maxWidth="lg" sx={{ mb: 2 }}>
                        <div className='row'>
                            <h1 className='text-center mb-2'>DC</h1>

                            <div className='col'>
                                <Paper
                                    sx={{
                                        p: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 2
                                    }}
                                    elevation={12}
                                >
                                    <div className='col d-flex mb-2'>
                                        <div className=" col-6 me-2">

                                            <TextField label="Party Name"
                                                id="partyNameId"
                                                select
                                                defaultValue=""
                                                //  sx={{ width: "100%" }}
                                                size="small"
                                                fullWidth
                                                name="partyName" >
                                                {vendorDataList.map((item) => (
                                                    <MenuItem value={item._id}>{item.fullName}</MenuItem>
                                                ))}
                                            </TextField>

                                        </div>
                                        <div className="col-6">

                                            <TextField label="Party code"
                                                id="partyCodeId"
                                                defaultValue=""
                                                select
                                                // sx={{ width: "100%" }}
                                                size="small"
                                                fullWidth
                                                name="partyCode" >
                                                {vendorDcList.map((item) => (
                                                    <MenuItem value={item._id}>{item.vendorCode}</MenuItem>
                                                ))}
                                            </TextField>


                                        </div>


                                    </div>
                                    <div className='row '>
                                        <div className="col-12">

                                            <TextField label="PartyAddress"
                                                id="partyAddressId"
                                                select
                                                defaultValue=""
                                                size="small"
                                                sx={{ width: "101%" }}
                                                name="Party Address" >
                                                {vendorDcDataList.map((item) => (
                                                    <MenuItem value={item._id}>{item.address}</MenuItem>
                                                ))}
                                            </TextField>

                                        </div>
                                    </div>
                                </Paper>
                            </div>


                            <div className='col'>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 1,

                                    }}
                                    elevation={12}
                                >
                                    <div className='col d-flex mb-2'>
                                        <div className=" col-6 me-2">

                                            <TextField label="DC NO"
                                                id="dcNoId"
                                                defaultValue=""
                                                //  sx={{ width: "100%" }}
                                                size="small"
                                                fullWidth
                                                name="dcNo" />
                                        </div>
                                        <div className="col-6">

                                            <DatePicker
                                                fullWidth
                                                id="dcDateId"
                                                name="dcDate"
                                                label="DC Date"
                                                sx={{ width: "100%" }}
                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD-MM-YYYY" />

                                        </div>


                                    </div>
                                    <div className='mb-3'>
                                        <TextField label="Reasion"
                                            id="reasonId"
                                            select
                                            defaultValue=""
                                            fullWidth
                                            size="small"
                                            name="reason"
                                        >
                                            <MenuItem value="all">All</MenuItem>
                                            <MenuItem value="Service">Service</MenuItem>
                                            <MenuItem value="Calibration">Calibration</MenuItem>
                                            <MenuItem value="service & calibration">service & calibration</MenuItem>


                                        </TextField>
                                    </div>
                                    <div className='mb-5'>
                                        <TextField label="Common Remarks"
                                            id="commonRemarksId"

                                            defaultValue=""
                                            fullWidth
                                            size="small"
                                            name="commonRemarks"
                                        >
                                        </TextField>
                                    </div>

                                </Paper>
                            </div>

                        </div>

                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1,

                            }}
                            elevation={12}
                        >
                            <div className='row g-2'>
                                <div className='col d-flex'>
                                    <div className='col me-2'>
                                        <TextField size='small' fullWidth variant='outlined' id="itemListId" select label="Item List" name='itemList'>
                                        <MenuItem value="all">All</MenuItem>
                                            {itemMasterDataList.map((item) => (
                                        <MenuItem value={item._id}>{item.itemDescription}</MenuItem>
                                    ))}
                                        </TextField>
                                    </div>
                                    <div className='col'>
                                        <TextField label="Imte No"
                                            id="imteNoId"
                                            select
                                            defaultValue="all"
                                            fullWidth
                                            size="small"
                                            name="imteNo" >
                                            <MenuItem value="all">All</MenuItem>
                                            {itemAddList.map((item, index) => (
                                                <MenuItem key={index} value={item.itemIMTENo}>{item.itemIMTENo}</MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                                <div className=' col d-flex justify-content-end'>
                                    <div className='me-2 '>
                                        <button type="button" className='btn btn-secondary' >Add Item</button>
                                    </div>

                                </div>

                            </div>
                        </Paper>

                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1,

                            }}
                            elevation={12}
                        >
                            <div className='row'>
                                <Box sx={{ height: 350, width: '100%', my: 2 }}>
                                    <DataGrid

                                        rows={dcDataList}
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
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1,

                            }}
                            elevation={12}
                        >
                            <div className='row'>
                                <div className='col d-flex '>
                                    <div className='me-2 '>
                                        <button type="button" className='btn btn-secondary' >Print</button>
                                    </div>

                                </div>
                                <div className='col d-flex justify-content-end'>
                                    <div className='me-2 '>
                                        <button type="button" className='btn btn-secondary' >Save</button>
                                    </div>
                                    <div className='me-2 '>
                                        <button type="button" className='btn btn-secondary' >Close</button>
                                    </div>

                                </div>
                            </div>
                        </Paper>





                    </Container>
                </form>
            </LocalizationProvider>
        </div >
    )
}

export default Dc