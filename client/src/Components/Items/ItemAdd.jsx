import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ItemAdd = () => {

    // Units Data
    const [units, setUnits] = useState([]);
    const UnitFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/unit/getAllUnits`
            );
            setUnits(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        UnitFetch()
    }, []);


    const [departments, setDepartments] = useState([])
    const DepartmentFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            setDepartments(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        DepartmentFetch()
    }, []);


    const [areas, setAreas] = useState([])
    const areaFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/area/getAllAreas`
            );
            setAreas(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        areaFetch()
    }, []);

    const [placeOfUsages, setPlaceOfUsages] = useState([])
    const placeOfUsageFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/placeOfUsage/getAllPlaceOfUsages`
            );
            setPlaceOfUsages(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        placeOfUsageFetch()
    }, []);

    console.log({ Department: departments, Area: areas, placeOfUsage: placeOfUsages })

    //item master list
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


    //






    const [itemAddData, setItemAddData] = useState({
        itemMasterName: "",
        itemIMTENo: "",
        itemImage: "",
        itemType: "",
        itemRangeSize: "",
        itemRangeSizeUnit: "",
        itemLC: "",
        itemLCUnit: "",
        itemMFRNo: "",
        itemMake: "",
        itemModelNo: "",
        itemStatus: "",
        itemReceiptDate: "",
        itemDepartment: "",
        itemArea: "",
        itemPlaceOfUsage: "",
        itemCalFreInMonths: "",
        itemCalAlertDays: "",
        itemCalDoneAt: "",
        itemCustomerSrc: "",
        itemMaster: "",
        itemMasterIMTENo: "",
        masterDueDate: "",
        itemSupplier: "",
        itemOEM: "",
        itemCalDate: "",
        itemDueDate: "",
        itemCalibratedAt: "",
        itemCertificateName: "",
        itemPartName: [],
        acceptanceCriteria: []




    })

    //upload Button
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleItemAddChange = (e) => {
        const { name, value } = e.target;
        setItemAddData((prev) => ({ ...prev, [name]: value }))
    }
    const itemMasterById = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemMaster/getItemMasterById/${itemAddData.itemMasterName}`
            );
            console.log(response.data)
            const { itemType, itemDescription, itemPrefix, itemFqInMonths, calAlertInDay, wiNo, uncertainity, standartRef, itemImageName, status, itemMasterImage, workInsName } = response.data.result
            setItemAddData((prev) => ({
                ...prev,
                itemType: itemType,
                itemImage: itemMasterImage

            }))

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        itemMasterById();
    }, [itemAddData.itemMasterName]);

    console.log(itemAddData)
    //

    return (
        <div style={{ margin: "2rem", backgroundColor: "#f5f5f5" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Paper className='row' elevation={12} sx={{ p: 2, mb: 2 }}>
                    <div className="col-lg-5 row g-1">

                        <div>
                            <TextField size='small' select variant='outlined' label="Item Master" name='itemMasterName' value={itemAddData.itemMasterName || ""} fullWidth onChange={(e) => { handleItemAddChange(e) }}>
                                <MenuItem value=""><em>Select</em></MenuItem>
                                {itemMasterDataList.map((item) => (
                                    <MenuItem value={item._id}>{item.itemDescription}</MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="col">
                            <TextField size='small' variant='outlined' label="Enter IMTE No." name='itemIMTENo' value={itemAddData.itemIMTENo} fullWidth onChange={handleItemAddChange} />
                        </div>
                        <div className="col">
                            <TextField select size='small' variant='outlined' label="Previous IMTE No." fullWidth >

                            </TextField>
                        </div>
                    </div>
                    <div className="col-lg-2 text-center align-middle">
                        <Typography variant='h5'  >Item Add</Typography>
                    </div>

                    <div className="col-lg-5 d-flex justify-content-end">
                        {itemAddData.itemImage && <Card elevation={12} sx={{ width: "130px", height: "130px" }}>

                            <img src={itemAddData.itemImage} style={{ width: "100%", height: "100%" }} />

                        </Card>}
                    </div>


                </Paper>
                <div className="row ">
                    <Paper className='col-lg me-2' elevation={12} sx={{ p: 2 }}>
                        <Typography variant='h6' className='text-center'>Item General Details</Typography>
                        <div className="row g-2 mb-2">
                            <div className="col-lg-4">
                                <TextField size='small' select variant='outlined' label="Item Type" name='itemType' fullWidth value={itemAddData.itemType || ""}>
                                    <MenuItem><em>Select Type</em></MenuItem>
                                    <MenuItem value="Attribute">Attribute</MenuItem>
                                    <MenuItem value="Variable">Variable</MenuItem>
                                    <MenuItem value="Reference Standard">Reference Standard</MenuItem>

                                </TextField>
                            </div>
                            <div className='col-lg-8 d-flex justify-content-between'>
                                <TextField size='small' variant='outlined' label="Range/Size" name='rangeSize' id='rangeSizeId' fullWidth />
                                <TextField select size="small" variant='outlined' label="Unit" name='rangeSizeUnit' id='rangeSizeUnitId' style={{ width: "40%" }} >
                                    <MenuItem value=''><em>None</em></MenuItem>
                                    {units.map((unit, index) => (
                                        <MenuItem key={index} value={unit.unitName}>{unit.unitName}</MenuItem>
                                    ))}
                                </TextField>




                            </div>
                        </div>
                        <div className="row g-2">
                            <div className="col-lg-4">
                                <TextField size='small' variant='outlined' label="MFR.Si.No." name='itemMfrNo' id='itemMfrNoId' onChange={handleItemAddChange} fullWidth />
                            </div>
                            <div className='col-lg-8 d-flex justify-content-between'>
                                <TextField size='small' variant='outlined' name='itemLeastCount' id="itemLeastCountId" label="Least Count" fullWidth />


                                <TextField select size='small' variant='outlined' label="Unit" style={{ width: "40%" }} >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {units.map((unit, index) => (
                                        <MenuItem key={index} value={unit.unitName}>{unit.unitName}</MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className="row g-1">
                                <div className="col-lg me-1">
                                    <TextField size='small' variant='outlined' label="Make" name='itemMake' id='itemMakeId' fullWidth />
                                </div>
                                <div className="col-lg">
                                    <TextField size='small' variant='outlined' label="Model No." name='itemModelNo' id='itemModelNoId' fullWidth />
                                </div>
                            </div>
                            <div className="row g-1">
                                <div className="col-lg me-1">
                                    <TextField size='small' variant='outlined' label="Item Status" name='itemStatus' id='itemStatusId' fullWidth />
                                </div>
                                <div className="col-lg">
                                    <TextField size='small' variant='outlined' label="Receipt Date" name='itemReceiptData' id='itemReceiptDateId' fullWidth />
                                </div>
                            </div>
                            <Typography variant='h6' className='text-center'>
                                Select Location
                            </Typography>
                            <div className="row g-1 mt-0 mb-2">
                                <div className="col me-1">
                                    <TextField value={itemAddData.itemDepartment} size='small' select fullWidth variant='outlined' label="Department" name='itemDepartment' id='itemDepartmentId'>
                                        {departments.map((item, index) => (
                                            <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col">
                                    <TextField size='small' value={itemAddData.itemArea} select fullWidth variant='outlined' label="Area" name='itemArea' id='itemAreaId'>
                                        {areas.map((item, index) => (
                                            <MenuItem key={index} value={item.areaName}>{item.areaName}</MenuItem>
                                        ))}
                                    </TextField> 
                                </div>
                                <div className='mt-2'>
                                    <TextField size='small' value={itemAddData.itemPlaceOfUsage} select fullWidth variant='outlined' label="Place" name='itemPlaceOfUsage' id='itemPlaceOfUsageId'>
                                        {placeOfUsages.map((item, index) => (
                                            <MenuItem key={index} value={item.placeOfUsage}>{item.placeOfUsageName}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                            </div>





                        </div>










                    </Paper>
                    <Paper className='col-lg me-2' elevation={12} sx={{ p: 2 }}>
                        <Typography variant='h6' className='text-center'>Calibration</Typography>
                        <div className="row g-2 mb-2">
                            <div className='col-lg-6'>
                                <TextField value={itemAddData.itemCalFreInMonths} size='small' fullWidth variant='outlined' label="Cal Frequency in months" id='itemCalFreInMonthsId' name='itemCalFreInMonths' type='number'>

                                </TextField>
                            </div>
                            <div className='col-lg-6'>
                                <TextField size='small' value={itemAddData.itemCalAlertDays} fullWidth variant='outlined' label="Cal Alert Days" id='itemCalAlertDaysId' name='itemCalAlertDays' type='number'>

                                </TextField>
                            </div>
                            <div className='col-lg-12'>
                                <TextField size='small' value={itemAddData.itemCalibrationSource} fullWidth variant='outlined' select label="Calibration Source" name='itemCalibrationSource' >
                                    <MenuItem value=""><em>--Select--</em></MenuItem>
                                    <MenuItem value="InHouse">InHouse</MenuItem>
                                    <MenuItem value="OutSource">OutSource</MenuItem>
                                    <MenuItem value="OEM">OEM</MenuItem>
                                </TextField>
                            </div>
                        </div>
                        {itemAddData.itemCalDoneAt === "" &&
                            <div className='row g-2'>
                                <div className="col-lg-6">
                                    <TextField size='small' select fullWidth variant='outlined' label="Select Master" name='itemMasterName' >
                                        <MenuItem value=""><em>--Select--</em></MenuItem>
                                        <MenuItem value="Master1">Master1</MenuItem>
                                        <MenuItem value="Master2">Master2</MenuItem>
                                        <MenuItem value="Master3">Master3</MenuItem>
                                    </TextField>
                                </div>

                                <RadioGroup
                                    className="col-lg-6 d-flex justify-content-center"
                                    row
                                    name='masterDoneAt'
                                    onChange={handleItemAddChange}
                                >
                                    <FormControlLabel value="Lab" control={<Radio />} label="Lab" />
                                    <FormControlLabel value="Site" control={<Radio />} label="Site" />
                                </RadioGroup>


                                <div className="col">
                                    <TextField size='small' fullWidth variant='outlined' select label="Master IMTE No" name='masterIMTENo' >
                                        <MenuItem value=""><em>--Select--</em></MenuItem>
                                        <MenuItem value="InHouse">InHouse</MenuItem>
                                        <MenuItem value="OutSource">OutSource</MenuItem>
                                        <MenuItem value="OEM">OEM</MenuItem>
                                    </TextField>
                                </div>
                                <div className="col">
                                    <DatePicker

                                        fullWidth
                                        id="masterDueDateId"
                                        name="masterDueDate"
                                        value={dayjs(itemAddData.masterDueDate)}
                                        onChange={(newValue) =>
                                            setItemAddData((prev) => ({ ...prev, masterDueDate: newValue.format("YYYY-MM-DD") }))
                                        }
                                        label="Master Due"

                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>

                            </div>}
                        {<div className='row'>
                            <div className="col"></div>


                        </div>}

                       <table className='table table-sm table-bordered text-center'>
                        <tbody>
                            <tr>
                            <th >Si No</th>
                            <th>Master Name</th>
                            <th>Due</th>
                            </tr>
                            <tr>

                            </tr>
                            
                        
                        </tbody>
                       </table>

                    </Paper>
                    <Paper className='col-lg' elevation={12} sx={{ p: 2, }}>
                        <Typography variant='h6' className='text-center'>Enter Previous Calibration Data</Typography>
                        <div className="row g-2">
                            <div className="col-lg-6">
                                <DatePicker
                                    disableFuture
                                    fullWidth
                                    id="dobId"
                                    name=""
                                    value={dayjs(itemAddData.itemCalDate)}
                                    onChange={(newValue) =>
                                        setItemAddData((prev) => ({ ...prev, itemCalDate: newValue.format("YYYY-MM-DD") }))
                                    }
                                    label="Calibration Date"

                                    slotProps={{ textField: { size: 'small' } }}
                                    format="DD-MM-YYYY" />
                            </div>
                            <div className="col-lg-6">
                                <DatePicker
                                    disableFuture
                                    fullWidth
                                    id="itemDueDateId"
                                    name="itemDueDate"
                                    value={dayjs(itemAddData.itemDueDate)}
                                    onChange={(newValue) =>
                                        setItemAddData((prev) => ({ ...prev, itemDueDate: newValue.format("YYYY-MM-DD") }))
                                    }
                                    label="Due Date"

                                    slotProps={{ textField: { size: 'small' } }}
                                    format="DD-MM-YYYY" />+                            </div>
                            <div className="col-lg-12">
                                <TextField size='small' fullWidth variant='outlined' label="Calibrated at" type='date' select name='itemMasterName'>
                                    <MenuItem>Lab</MenuItem>
                                    <MenuItem>Site</MenuItem>

                                </TextField>
                            </div>
                            <div className="col-lg-8">
                                <Button component="label" variant="contained" fullWidth >
                                    Certificate Upload
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </div>
                            <div className='col-lg-4'>
                                <Button
                                    fullWidth
                                    variant="outlined"


                                >Upload</Button>
                            </div>
                        </div>

                    </Paper>

                </div>







            </LocalizationProvider >

        </div >
    )
}

export default ItemAdd