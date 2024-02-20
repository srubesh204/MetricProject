import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';

const PlantActual = () => {

    const [itemDataList, setItemDataList] = useState([])
    const itemFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
            );
            setItemDataList(response.data.result);
            setFilteredData(response.data.result)


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemFetchData();
    }, []);
    console.log(itemDataList)

    const itemListColumns = [
        { field: 'id', headerName: 'Sr. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },
        { field: 'itemAddMasterName', headerName: 'Item Description', width: 180, headerAlign: "center", align: "center", },
        {
            field: 'itemIMTENo',
            headerName: 'Item IMTENo',
            width: 210,
            headerAlign: "center", align: "center",
        },
        {
            field: 'itemDueDate',
            headerName: 'Plant',
            width: 150,
            headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemDueDate).format('DD-MM-YYYY')
        },
        {
            field: 'itemCalDate',
            headerName: 'Actual',
            width: 150,
            headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY')
        },

        // {
        //     field: 'Last cal Due Date',
        //     headerName: 'Last cal Due Date',
        //     width: 200,
        //     headerAlign: 'center',
        //     align: 'center',
        //     renderCell: (params) => {
        //         const currentDueDate = dayjs(params.row.itemDueDate).format('DD-MM-YYYY');
        //         const previousDueDate = dayjs(params.row.itemLastDueDate).format('DD-MM-YYYY')
        //         // Now you can use currentDueDate and previousDueDate for your comparison logic
        //         return (
        //             <div>
        //                 <div>{`Plan: ${currentDueDate}`}</div>
        //                 <div>{`Actual: ${previousDueDate}`}</div>
        //             </div>
        //         );
        //     },
        // },
    ]







    const [filteredData, setFilteredData] = useState([])
    const oneMonthBefore = dayjs().subtract(dayjs().date() - 1, 'day')
    const [dateData, setDateData] = useState({
        fromDate: oneMonthBefore.format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD')
    })
    // useEffect(() => {
    //     const filteredItems = itemDataList.filter((item) => dayjs(item.itemDueDate).isSameOrAfter(dateData.fromDate) && dayjs(item.uncDate).isSameOrBefore(dateData.toDate))
    //     console.log(filteredItems)
    //     setFilteredData(filteredItems)
    // }, [dateData.fromDate, dateData.toDate])

    useEffect(() => {

        const filteredItems = itemDataList.filter((item) => dayjs(item.itemDueDate).isBetween(dayjs(dateData.fromDate), dayjs(dateData.toDate), 'day', '[]'))
        console.log(filteredItems)
        setFilteredData(filteredItems)
    }, [dateData.fromDate, dateData.toDate])

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setDateData((prev) => ({ ...prev, [name]: value }));

    };


    return (
        <div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        mb: 1,

                    }} elevation={12}
                    >
                        <div className='row g-2 mt-2'>
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


                            <div style={{ height: 480, width: '100%', marginTop: "0.5rem" }}>
                                <DataGrid disableDensitySelector
                                    rows={filteredData}
                                    columns={itemListColumns}
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
                                                <GridToolbarQuickFilter />
                                            </div>
                                        ),
                                    }}
                                    disableColumnFilter
                                    onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                        console.log(event)
                                    }}
                                    density="compact"
                                    pageSizeOptions={[10]}
                                />
                            </div>
                        </div>
                    </Paper>

                </form>
            </LocalizationProvider>
        </div>
    )
}

export default PlantActual