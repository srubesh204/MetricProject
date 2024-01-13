import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab, Link, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Container, Paper } from '@mui/material';
import { Edit, EditRounded, PrintRounded } from '@mui/icons-material';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import CalPrint from './CalPrint'
import CalAddModel from './CalAddModel'
import CalEditModel from './CalEditModel'

import { useEmployee } from '../../../App';
export const CalData = createContext(null);
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)


const CalList = () => {
    const employeeRole = useEmployee()
    const [itemMasterDataList, setItemMasterDataList] = useState([])
    const [itemMasters, setItemMasters] = useState([])
    const [IMTENos, setIMTENos] = useState([])

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

            const selectedEmps = response.data.result.filter((emp) => emp.plant.find(plant => {
                console.log(plant) 
                return (employeeRole.loggedEmp.plant.includes(plant))
            }));
            
            const filter = selectedEmps.filter(emp => emp.empRole === "plantAdmin")
            
           
            setActiveEmps(filter)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        empFetch();
    }, [])
    console.log(activeEmps)
    const [selectedRows, setSelectedRows] = useState([]);
    console.log(selectedRows)

    const [calAddOpen, setCalAddOpen] = useState(false)
    const [calEditOpen, setCalEditOpen] = useState(false)
    const [calPrintOpen, setCalPrintOpen] = useState(false);

    const [calDataList, setCalDataList] = useState([])
    const calFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemCal/getAllDistinctCalNames`
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
    const [filteredCalData, setFilteredCalData] = useState([])
    const oneMonthBefore = dayjs().subtract(dayjs().date() - 1, 'day')
    const [dateData, setDateData] = useState({
        fromDate: oneMonthBefore.format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD')
    })
    const calListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemCal/getAllItemCals`
            );

            setCalListDataList(response.data.result);
            setFilteredCalData(response.data.result)
            const filteredItems = response.data.result.filter((item) => dayjs(item.calItemCalDate).isSameOrAfter(dateData.fromDate) && dayjs(item.calItemCalDate).isSameOrBefore(dateData.toDate))
            setFilteredCalData(filteredItems);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        calListFetchData();

    }, []);

    const [selectedCalRow, setSelectedCalRow] = useState([])
    console.log(filteredCalData)

    const setCalEditData = (params) => {
        setSelectedCalRow(params.row);
        setCalEditOpen(true)
    }
    console.log(selectedCalRow)

    const calListColumns = [
        { field: 'id', headerName: 'Entry. No', width: 100, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },
        ...(employeeRole && employeeRole.employee !== "viewer" ? [{ field: 'editButton', headerAlign: "center", align: "center", headerName: 'Edit', width: 100, renderCell: (params) => <EditRounded color='warning' onClick={() => setCalEditData(params)} /> }] : []),
        { field: 'calItemEntryDate', headerName: 'Entry Date', width: 200, valueGetter: (params) => dayjs(params.row.calItemEntryDate).format('DD-MM-YYYY'), headerAlign: "center", align: "center", },
        { field: 'calIMTENo', headerName: 'Item IMTENo', width: 200, headerAlign: "center", align: "center", },
        { field: 'calItemName', headerName: 'Item Description', width: 200, headerAlign: "center", align: "center", },
        { field: 'calRangeSize', headerName: 'Range/Size', width: 200, headerAlign: "center", align: "center", },
        { field: 'calItemCalDate', headerName: 'Calibration On', width: 200, valueGetter: (params) => dayjs(params.row.calItemCalDate).format('DD-MM-YYYY'), headerAlign: "center", align: "center", },
        { field: 'itemDueDate', headerName: 'Next Due On', width: 200, valueGetter: (params) => dayjs(params.row.itemDueDate).format('DD-MM-YYYY'), headerAlign: "center", align: "center", },
        { field: 'calStatus', headerName: 'Cal status', width: 200, headerAlign: "center", align: "center", },
        
        { field: 'printButton', headerName: 'Print', headerAlign: "center", align: "center", width: 100, renderCell: (params) => <Button onClick={() => { setSelectedRows(params.row); setCalPrintOpen(true) }}><PrintRounded color='success' /></Button> }
        
    

    ]



    const handleFilter = (e) => {
        const { name, value } = e.target;
        if (value === "all") {
            setFilteredCalData(calListDataList)
        } else {
            if (name === "itemName") {
                const selectedItem = calListDataList.filter((item) => item.calItemName === value)

                const uniqueNames = [...new Set(selectedItem.map(item => item.calIMTENo))];
                console.log(uniqueNames)
                setIMTENos(uniqueNames)
            }

            if (name === "itemIMTENo") {
                const selectedItem = calListDataList.filter((item) => item.calIMTENo === value)
                setFilteredCalData(selectedItem)
            }

            setDateData((prev) => ({ ...prev, [name]: value }))
        }


    }

    const dateFilter = () => {
        const filteredItems = calListDataList.filter((item) => dayjs(item.calItemCalDate).isSameOrAfter(dateData.fromDate) && dayjs(item.calItemCalDate).isSameOrBefore(dateData.toDate))
        setFilteredCalData(filteredItems)
    }
    useEffect(() => {
        dateFilter();
    }, [dateData.fromDate, dateData.toDate])


    const deleteCal = async () => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/itemCal/deleteItemCal`, { data: { itemCalIds: calListSelectedRowIds } }
            );
            calListFetchData()
            console.log("Cal Items Deleted Successfully")
        } catch (err) {
            console.log(err);
        }
    };


    console.log(calListSelectedRowIds)


    return (
        <div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <form>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            m: 2,

                        }}
                        elevation={12}
                    >
                        <div className='row g-2 '>


                            <div className='col d-flex'>
                                <div className='col me-2'>
                                    <TextField label="Item Description"
                                        id="imteNoId" select defaultValue="all" fullWidth size="small" name="itemName" onChange={handleFilter}>
                                        <MenuItem value="all">All</MenuItem>
                                        {calDataList.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className='col '>
                                    <TextField size='small' fullWidth defaultValue="all" variant='outlined' id="itemListId" select label="Item IMTE No" onChange={handleFilter} name='itemIMTENo'>
                                        <MenuItem value="all">All</MenuItem>
                                        {IMTENos.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
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
                                        format="DD-MM-YYYY"
                                        value={dayjs(dateData.fromDate)}
                                        onChange={(newValue) =>
                                            setDateData((prev) => ({ ...prev, fromDate: dayjs(newValue).format('YYYY-MM-DD') }))}
                                    />


                                </div>
                                <div className="col-3">

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
                            </div>

                        </div>

                        <div className='row'>
                            <Box sx={{ height: "75vh", width: '100%', my: 2 }}>
                                <DataGrid disableDensitySelector

                                    rows={filteredCalData}
                                    columns={calListColumns}
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
                                    onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                        setCalListSelectedRowIds(newRowSelectionModel);


                                    }}

                                    slots={{
                                        toolbar: GridToolbar,
                                    }}

                                    density="compact"
                                    //disableColumnMenu={true}

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
                                    <Button  onClick={() => { setSelectedRows(); setCalPrintOpen(true) }} ><PrintRounded color='success' /></Button>
                                </div> 
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' > Label Print</button>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Lable With BarCode Print</button>
                                </div>

                            </div>
                            {employeeRole && employeeRole.employee !== "viewer" &&
                                <div className='col d-flex justify-content-end'>

                                    <div className='me-2 '>
                                        <button type="button" className='btn btn-success' onClick={() => setCalAddOpen(true)}>Add</button>
                                    </div>
                                    {calListSelectedRowIds.length !== 0 && <div className='me-2 '>
                                        <button type="button" className='btn btn-danger' onClick={() => deleteCal()}>Delete</button>
                                    </div>}


                                </div>}
                        </div>
                    </Paper>
                    {employeeRole && employeeRole.employee !== "viewer" &&
                        <CalData.Provider
                            value={{ employeeRole, calAddOpen, setCalAddOpen, itemMasters, activeEmps, calListFetchData }}
                        >
                            <CalAddModel />
                        </CalData.Provider>}

                    {employeeRole && employeeRole.employee !== "viewer" &&
                        <CalData.Provider
                            value={{ employeeRole, calEditOpen, setCalEditOpen, selectedCalRow, itemMasters, activeEmps, calListFetchData }}
                        >
                            {selectedCalRow.length !== 0 && <CalEditModel />}
                        </CalData.Provider>}
                    <CalData.Provider
                        value={{ calPrintOpen, setCalPrintOpen, selectedRows,filteredCalData }}
                    >
                         {selectedRows && <CalPrint />}
                    </CalData.Provider>







                </form>

            </LocalizationProvider>
        </div>
    )
}

export default CalList