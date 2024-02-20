import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, MenuItem, Button } from '@mui/material';
import { useEmployee } from '../../App';
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';

const PlantActual = () => {

    const empRole = useEmployee()
    const { loggedEmp, allowedPlants ,employeeRole} = empRole
    const [filteredData, setFilteredData] = useState([])
    const [itemDataList, setItemDataList] = useState([])

    const itemFetchData = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`,{ allowedPlants: allowedPlants }
            );
            console.log(response.data.result)
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


   
    // const itemFetch = async () => {
    //     try {
    //         const response = await axios.post(
    //             `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`,{ allowedPlants: allowedPlants }
    //         );
    //         console.log(response.data.result)
    //         const departmentItems = response.data.result.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => plant.departments.includes(item.itemDepartment)))
    //         console.log(departmentItems)
    //         const filterNames = [ "itemDepartment", "itemPlant"]
    //         let updatedFilterNames = {};
    //         filterNames.forEach((element, index) => {
    //             const data = departmentItems.map(item => item[element]);
    //             filterNames[index] = [...new Set(data)];
    //             // Update the object with a dynamic key based on the 'element'
    //             updatedFilterNames[element] = filterNames[index];
    //         });
    //         console.log(updatedFilterNames)
    //         // Update state outside the loop with the updated object
    //         setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
    //         setItemDataList(departmentItems);
    //         setFilteredData(departmentItems);

         

    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // useEffect(() => {
    //     itemFetch();
    // }, []);

    const [FilterNameList, setFilterNameList] = useState({
        itemDepartment: [],
        itemPlant: [],
      
    })

    const itemListColumns = [
        { field: 'id', headerName: 'Sr. No', width: 100, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },
        { field: 'itemAddMasterName', headerName: 'Item Description', width: 200, headerAlign: "left", align: "left", },
        {
            field: 'itemIMTENo',
            headerName: 'Item IMTENo',
            width: 210,
            headerAlign: "left", align: "left",
        },
        {
            field: 'itemDueDate',
            headerName: 'Plan',
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
    const [departments, setDepartments] = useState([])
    const DepartmentFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            const defaultDepartment = response.data.result.filter((dep) => dep.defaultdep === "yes")
            setDepartments(defaultDepartment);

            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        DepartmentFetch()
    }, []);
    const [plantDepartments, setPlantDepartments] = useState([]);
    const [selectedPlantDatas, setSelectedPlantDatas] = useState([])
    const handleFilterChangeItemList = (e) => {
        const { name, value } = e.target;
        console.log(e);
        if (value === "all") {
            setFilteredData(itemDataList)
        }else{
        if (name === "itemPlant") {
            const dep = loggedEmp.plantDetails.filter(plant => plant.plantName === value);
            const plantDatas = itemDataList.filter(item => item.itemPlant === value)
            console.log(itemDataList)
            setSelectedPlantDatas(plantDatas)
            console.log(plantDatas)
            const nameList = [...new Set(plantDatas.map(item => item.itemDepartment))]
            console.log(dep)
            setPlantDepartments(dep[0].departments)
            // const itemPlant = itemDataList.filter((item) => (item.itemPlant === value))
             setFilteredData(plantDatas);
        }
        if (name === "itemDepartment") {
            const filterList = selectedPlantDatas.filter(item => item.itemDepartment === value)
            // const itemDepartment = itemDataList.filter((item) => (item.itemDepartment === value))
            setFilteredData(filterList);
        }
        setDateData((prev) => ({ ...prev, [name]: value }));
    }
    };
    



    // const [plantDatas, setPlantDatas] = useState([])
    // const [departmentDatas, setDepartmentDatas] = useState([])
    // const handleFilterChangeItemList = (e) => {

    //     const { name, value } = e.target;
    //     console.log(e);
    //     if (name === "itemPlant") {
    //         const itemPlant = itemDataList.filter((item) => (item.itemPlant === value))
    //         if (value === "all") {
    //             setFilteredData(itemDataList)
    //             const filterNames = [ "itemAddMasterName", "itemDepartment", "itemCalibrationSource", "itemCurrentLocation"]
    //             let updatedFilterNames = {};
    //             filterNames.forEach((element, index) => {
    //                 const data = itemDataList.map(item => item[element]);
    //                 filterNames[index] = [...new Set(data)];
    //                 // Update the object with a dynamic key based on the 'element'
    //                 updatedFilterNames[element] = filterNames[index];
    //             });
    //             console.log(updatedFilterNames)
    //             // Update state outside the loop with the updated object
    //             setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
    //         } else {
    //             setFilteredData(itemPlant)
    //             const filterNames = [ "itemAddMasterName", "itemDepartment", "itemCalibrationSource", "itemCurrentLocation"]
    //             let updatedFilterNames = {};

    //             filterNames.forEach((element, index) => {
    //                 const data = itemPlant.map(item => item[element]);
    //                 filterNames[index] = [...new Set(data)];
    //                 // Update the object with a dynamic key based on the 'element'
    //                 updatedFilterNames[element] = filterNames[index];
    //             });
    //             console.log(updatedFilterNames)
    //             // Update state outside the loop with the updated object
    //             setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
               
    //             setPlantDatas(itemPlant)
    //         }
    //     }
    //     if (name === "currentLocation") {
    //         const currentLocation = plantDatas.filter((item) => (item.itemDepartment === value))
    //         if (value === "all") {
    //             setFilteredData(plantDatas)
    //             const filterNames = ["itemAddMasterName", "itemCalibrationSource", "itemCurrentLocation"]
    //             let updatedFilterNames = {};
    //             filterNames.forEach((element, index) => {
    //                 const data = plantDatas.map(item => item[element]);
    //                 filterNames[index] = [...new Set(data)];
    //                 // Update the object with a dynamic key based on the 'element'
    //                 updatedFilterNames[element] = filterNames[index];
    //             });
    //             console.log(updatedFilterNames)
    //             // Update state outside the loop with the updated object
    //             setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
    //             setFilteredData(plantDatas)
               
    //         } else {
    //             setFilteredData(currentLocation)
    //             const filterNames = ["itemAddMasterName", "itemCalibrationSource", "itemCurrentLocation"]
    //             let updatedFilterNames = {};
    //             filterNames.forEach((element, index) => {
    //                 const data = currentLocation.map(item => item[element]);
    //                 filterNames[index] = [...new Set(data)];
    //                 // Update the object with a dynamic key based on the 'element'
    //                 updatedFilterNames[element] = filterNames[index];
    //             });
    //             console.log(updatedFilterNames)
    //             // Update state outside the loop with the updated object
    //             setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
    //             setFilteredData(currentLocation)
               
    //             setDepartmentDatas(currentLocation)
    //         }
    //     }
    // };





    const oneMonthBefore = dayjs().subtract(dayjs().date() - 1, 'day')
    const [dateData, setDateData] = useState({
        fromDate: oneMonthBefore.format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD')
    })
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
                            <div className='col'>
                                <TextField label="Plant Wise"
                                    id="itemPlantId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    onChange={handleFilterChangeItemList}
                                    size="small"
                                    name="itemPlant" >

                                    <MenuItem value="all">All</MenuItem>
                                    {loggedEmp.plantDetails.map((item, index) => (
                                        <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className='col '>
                                <TextField label="Primary Location "
                                    id="itemDepartmentId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    onChange={handleFilterChangeItemList}
                                    size="small"
                                    name="itemDepartment" >
                                    <MenuItem value="all">All</MenuItem>
                                    {plantDepartments.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className='col'>
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
                            <div className='col'>
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