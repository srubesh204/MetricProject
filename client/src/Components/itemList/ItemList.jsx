import React, { useEffect, useState } from 'react'
import { TextField, MenuItem } from '@mui/material';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ItemList = () => {


    const [itemList, setItemList] = useState([]);

    const itemFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
            );
            // You can use a different logic for generating the id

            setItemList(response.data.result);
            setFilteredItemListData(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemFetch();
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





    const columns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id) + 1 },
        { field: 'itemIMTENo', headerName: 'ItemIMTE No',width: 80 },
        { field: 'itemMasterName', headerName: 'item Description',width: 90 },
        { field: 'itemRangeSize', headerName: 'Item Range Size',width: 100 },
        { field: 'itemMake', headerName: 'Item Make',width: 110 },
        { field: 'itemCalDate', headerName: 'Item Cal Date',width: 130 },
        { field: 'itemDueDate', headerName: 'Item Due Date',width: 140 },
        { field: 'itemLC', headerName: 'itemLC',width: 120 },
        { field: 'itemCalFreInMonths', headerName: 'Item Cal Fre In Months', type: "number",width: 170 },
        { field: 'itemCalibrationSrc', headerName: 'Item Calibration Src',width: 190 },
        { field: 'itemSupplier', headerName: 'Item Supplier',width: 180 },
        { field: 'itemType', headerName: 'Item Type',width: 190 },
    ];

    const [filteredItemListData, setFilteredItemListData] = useState([])

    const handleFilterChangeItemList = (e) => {
        const { name, value } = e.target;
        console.log(e)
        if (value === "all") {
            setFilteredItemListData(itemList)
        } else {
            if (name === "imteNo") {
                const imteNo = itemList.filter((item) => (item.itemIMTENo === value))
                setFilteredItemListData(imteNo)

            }
            if (name === "itemType") {
                const itemType = itemList.filter((item) => (item.itemType === value))
                console.log(itemType)
                setFilteredItemListData(itemType)


            }
            if (name === "currentLocation") {
                const currentLocation = itemList.filter((item) => (item.itemLC === value))
                setFilteredItemListData(currentLocation)
            }
            if (name === "customerWise") {
                const customerWise = itemList.filter((item) => (item.customerWise === value))
                setFilteredItemListData(customerWise)
            }
            if (name === "supplierWise") {

                const supperlierWise = itemList.filter((item) => (item.itemSupplier === value))
                console.log(supperlierWise)
                setFilteredItemListData(supperlierWise)
            }
            if (name === "partName") {
                const partName = itemList.filter((item) => (item.itemPartName === value))
                setFilteredItemListData(partName)
            }


        }


    };


   {/* const dueDatePicker = (newValue, name) => {
        let startDate = "";
        let endDate = "";
        let startDueDate = "";
        let endDueDate = "";

        // console.log(newValue.format("YYYY-MM-DD"));

        if (name === "dueStartDate") {
            startDate = newValue.format("YYYY-MM-DD");
        }
        if (name === "dueEndDate") {
            endDate = newValue.format("YYYY-MM-DD");
        }

       
            const filteredData = itemList.filter((item) => {
                console.log(item.itemDueDate)
                return (
                    item.itemDueDate >= startDate && item.itemDueDate <= endDate)

            }

            );
            console.log(filteredData)
      


    };*/}
    const dueDatePicker = (newValue, name) => {
        let startDate = "";
        let endDate = "";
        let startDueDate = "";
        let endDueDate = "";

    
        if (name === "dueStartDate") {
            startDate = newValue.format("YYYY-MM-DD");
        }
        if (name === "dueEndDate") {
            endDate = newValue.format("YYYY-MM-DD");
        }
    
        const filteredData = itemList.filter((item) => {
            console.log(item.itemDueDate);
            
            // Assuming item.itemDueDate is a valid date
            const itemDueDate = new Date(item.itemDueDate);
    
            return (
                (startDate === "" || itemDueDate >= new Date(startDate)) &&
                (endDate === "" || itemDueDate <= new Date(endDate))
            );
        });
    
        console.log(filteredData);
    };


    const [supplierList, setSupplierList] = useState([])

    const [customerList, setCustomerList] = useState([])

    const vendorFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            console.log(response.data)
            const customersList = response.data.result.filter((item) => item.customer === "1")
            const suppliersList = response.data.result.filter((item) => item.supplier === "1")
            setSupplierList(suppliersList);
            setCustomerList(customersList);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetch();
    }, []);

    const [departmentList, setDepartmentList] = useState([]);

    const depFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            setDepartmentList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        depFetchData();
    }, []);


    const [partDataList, setPartDataList] = useState([])
    const partFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/part/getAllParts`
            );
            setPartDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        partFetchData();
    }, []);












    return (
        <div style={{ margin: "2rem" }}>
            <form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <Paper sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        mb: 1,

                    }} >
                        <div className='row g-2  '>
                            <Typography variant="h5" className="text-center mb-2">Item List</Typography>

                            <div className="col d-flex mb-2 ">

                                <TextField label="Imte No"
                                    id="imteNoId"
                                    select
                                    defaultValue="Active"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    name="imteNo" >

                                    {itemAddList.map((item, index) => (
                                        <MenuItem key={index} value={item.itemIMTENo}>{item.itemIMTENo}</MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="Item Type"
                                    id="itemTypeId"
                                    select
                                    defaultValue="Active"
                                    fullWidth
                                    onChange={handleFilterChangeItemList}
                                    size="small"
                                    name="itemType" >
                                    <MenuItem value="all">All</MenuItem >
                                    <MenuItem value="Attribute">Attribute</MenuItem >
                                    <MenuItem value="Variable">Variable</MenuItem >
                                    <MenuItem value="ReferenceStandard">Reference Standard</MenuItem >
                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="Current Location"
                                    id="currentLocationId"
                                    select
                                    defaultValue="Active"
                                    fullWidth
                                    onChange={handleFilterChangeItemList}
                                    size="small"
                                    name="currentLocation" >
                                    {departmentList.map((item, index) => (
                                        <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
                                    ))}

                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="Customer Wise"
                                    id="customerWiseId"
                                    select
                                    defaultValue="Active"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    name="customerWise" >
                                    {customerList.map((item, index) => (
                                        <MenuItem key={index} value={item.aliasName}>{item.aliasName}</MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="supplier Wise"
                                    id="supplierWiseId"
                                    select
                                    defaultValue="Active"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    name="supplierWise" >
                                    {supplierList.map((item, index) => (
                                        <MenuItem key={index} value={item.aliasName}>{item.aliasName}</MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="Due In Days"
                                    id="dueInDaysId"
                                    select
                                    defaultValue="Active"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    name="dueInDays" >
                                    <MenuItem value="Past">Past</MenuItem >
                                    <MenuItem value="Today">Today</MenuItem >
                                    <MenuItem value="7">7</MenuItem >
                                    <MenuItem value="15">15</MenuItem >
                                    <MenuItem value="30">30</MenuItem >
                                    <MenuItem value="30">30</MenuItem >
                                    <MenuItem value="Date">Date</MenuItem >

                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="Part Name"
                                    id="partNameId"
                                    select
                                    defaultValue="Active"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    name="partName" >
                                    {partDataList.map((item, index) => (
                                        <MenuItem key={index} value={item.partName}>{item.partName}</MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className="col d-flex  mr-1 ">

                                <TextField label="Plant Wise"
                                    id="plantWiseId"
                                    select
                                    defaultValue="Active"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    name="plantWise" >

                                    <MenuItem value="Reference Standard">Reference Standard</MenuItem>
                                </TextField>

                            </div>


                        </div>
                        <div className='row g-2'>


                            <div className="col d-flex  g-2 mb-2">
                                <div className='col-3 me-1'>
                                    <TextField label="item History"
                                        id="itemHistoryId"
                                        select
                                        defaultValue="Active"
                                        fullWidth
                                        size="small"
                                        name="itemHistory" >
                                        <MenuItem value="all">All</MenuItem >
                                        <MenuItem value="Attribute">Attribute</MenuItem >
                                        <MenuItem value="Variable">Variable</MenuItem >
                                        <MenuItem value="Reference Standard">Reference Standard</MenuItem>
                                    </TextField>
                                </div>
                                <div className='col-3'>
                                    <TextField label="Status"
                                        id="statusId"
                                        select
                                        defaultValue="Active"
                                        fullWidth
                                        size="small"
                                        name="status" >

                                        <MenuItem value="Active">Active</MenuItem >
                                        <MenuItem value="InActive">InActive</MenuItem >

                                    </TextField>
                                </div>

                            </div>


                            <div className='col d-flex justify-content-end  g-2'>
                                <div className="me-2 ">
                                    <DatePicker
                                        disableFuture
                                        fullWidth
                                        id="startDateId"
                                        name="dueStartDate"
                                        onChange={(newValue) => dueDatePicker(newValue, "dueStartDate")}
                                        label="Start Date"

                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>
                                <div className=" mb-2">
                                    <DatePicker
                                        disableFuture
                                        fullWidth
                                        id="endDateId"
                                        name="dueEndDate"
                                        onChange={(newValue) => dueDatePicker(newValue, "dueEndDate")}
                                        label="End Date "

                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='mb-2' style={{ height: 400, width: '100%' }}>
                                <DataGrid

                                    rows={filteredItemListData}
                                    columns={columns}
                                    getRowId={(row) => row._id}
                                    initialState={{

                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                    checkboxSelection
                                />
                            </div>

                        </div>
                        <div className='row'>
                            <div className=' col d-flex '>
                                <div className='me-2' >
                                    <button type="button" className='btn btn' >History Card</button>
                                </div>
                                <div className='me-2' >
                                    <button type="button" className='btn btn-' >Change status</button>
                                </div>
                                <div className='me-2' >
                                    <button type="button" className='btn btn-' >Item Master</button>
                                </div>
                            </div>
                            <div className=' col d-flex justify-content-end'>
                                <div className='me-2'>
                                    <button type="button" className='btn btn-warning' >+ Add Vendor</button>
                                </div>
                                <div className='me-2'>
                                    <button type="button" className='btn btn-info' >Modify</button>
                                </div>
                                <div className='me-2'>
                                    <button type="button" className='btn btn-danger' >Delete</button>
                                </div>
                                <div className='me-2'>
                                    <button type="button" className='btn btn-secondary' >Back</button>
                                </div>


                            </div>

                        </div>
                        <div className='row'>
                            <div className='col d-flex '>
                                <div className='me-2' >
                                    <label className='itemlistloade'>
                                        <input className="form-control itemlistdownload" type="file" id="upload" />Upload</label>
                                </div>
                                <div className='me-2'>
                                    <label className='itemlistloade'>
                                        <input className="form-control itemlistdownload" type="file" id="download" />Download </label>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Print</button>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Sticker Print</button>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Sticker Print Barcode</button>
                                </div>

                            </div>




                        </div>




                    </Paper>

                </LocalizationProvider>
            </form>

        </div>
    )
}

export default ItemList