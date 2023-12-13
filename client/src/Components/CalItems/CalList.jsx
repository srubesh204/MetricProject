import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab, Link, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Container, Paper } from '@mui/material';
import { Edit } from '@mui/icons-material';

import CalAddModel from './CalAddModel'
import CalEditModel from './CalEditModel'
export const CalData = createContext(null);



const CalList = () => {

    const [itemMasterDataList, setItemMasterDataList] = useState([])
    const [itemMasters, setItemMasters] = useState([])

    const itemMasterFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`

            );
            const masterItems = response.data.result.filter((item) => item.isItemMaster === "1")
            setItemMasterDataList(response.data.result);
            setItemMasters(masterItems)
                console.log(response.data.result)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemMasterFetchData();
    }, []);


    const [activeEmps, setActiveEmps] = useState([])

    const empFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/employee/getAllActiveEmployees`
            );
            setActiveEmps(response.data.result)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(()=> {
        empFetch();
    },[])
    console.log(activeEmps)

    const [calAddOpen, setCalAddOpen] = useState(false)
    const [calEditOpen, setCalEditOpen] = useState(false)

    const [calDataList, setCalDataList] = useState([])
    const calFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByIMTESort`
            );
            // You can use a different logic for generating the id

            setCalDataList(response.data.result);


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        calFetchData();
    }, []);

    const [calListSelectedRowIds, setCalListSelectedRowIds] = useState([])
    const [calListDataList, setCalListDataList] = useState([])
    const calListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemCal/getAllItemCals`
            );

            setCalListDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        calListFetchData();
    }, []);

    const [selectedCalRow, setSelectedCalRow] = useState([])


    const setCalEditData = (params) => {
        setSelectedCalRow(params.row);
        setCalEditOpen(true)
    }
    console.log(selectedCalRow)

    const calListColumns = [
        { field: 'id', headerName: 'Entry. No', width: 100, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'editButton', headerName: 'Edit', width: 100, renderCell: (params) => <Edit onClick={()=>setCalEditData(params)} /> },
        { field: 'calItemEntryDate', headerName: 'Entry Date', width: 200, valueGetter: (params) => dayjs(params.row.calItemEntryDate).format('DD-MM-YYYY') },
        { field: 'calIMTENo', headerName: 'Item IMTENo', width: 200 },
        { field: 'calItemName', headerName: 'Item Description', width: 200 },
        { field: 'calRangeSize', headerName: 'Range/Size', width: 200 },
        { field: 'itemCalDate', headerName: 'Calibration On', width: 200, valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY') },
        { field: 'itemDueDate', headerName: 'Next Due On', width: 200, valueGetter: (params) => dayjs(params.row.itemDueDate).format('DD-MM-YYYY') },
        { field: 'calStatus', headerName: 'Cal status', width: 200 },

    ]




    return (
        <div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <form>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1
                        }}
                        elevation={12}
                    >
                        <div className='row g-2 '>
                            <h1 className='text-center '>Calibration Data List</h1>

                            <div className='col d-flex'>
                                <div className='col me-2'>
                                    <TextField label="Imte No"
                                        id="imteNoId" select defaultValue="all" fullWidth size="small" name="imteNo" >
                                        <MenuItem value="all">All</MenuItem>
                                        {calDataList.map((item) => (
                                            <MenuItem value={item._id}>{item.itemIMTENo}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className='col '>
                                    <TextField size='small' fullWidth variant='outlined' id="itemListId" select label="Item List" name='itemList'>
                                        <MenuItem value="all">All</MenuItem>
                                        {itemMasterDataList.map((item) => (
                                            <MenuItem value={item._id}>{item.itemDescription}</MenuItem>
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

                                    rows={calListDataList}
                                    columns={calListColumns}
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
                                        setCalListSelectedRowIds(newRowSelectionModel);


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
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' > Label Print</button>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Lable With BarCode Print</button>
                                </div>

                            </div>
                            <div className='col d-flex justify-content-end'>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Modify</button>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' onClick={()=> setCalAddOpen(true)}>Add</button>
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
                    <CalData.Provider
                        value={{ calAddOpen, setCalAddOpen, itemMasters, activeEmps, calListFetchData }}
                    >
                        <CalAddModel />
                    </CalData.Provider>

                    <CalData.Provider
                        value={{ calEditOpen, setCalEditOpen, selectedCalRow, itemMasters, activeEmps ,calListFetchData }}
                    >
                         {selectedCalRow.length !== 0 && <CalEditModel />}
                    </CalData.Provider>







                </form>

            </LocalizationProvider>
        </div>
    )
}

export default CalList