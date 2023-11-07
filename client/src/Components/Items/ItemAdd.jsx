import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu } from '@mui/material'
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'

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






    const [itemAddData, setItemAddData] = useState({
        itemMasterType: "",
        itemIMTENo: "",
        itemImageName: "",
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

    //

    return (
        <div style={{ margin: "2rem", backgroundColor: "#f5f5f5" }}>
            <Paper className='row' elevation={12} sx={{ p: 2, mb: 2 }}>
                <div className="col-md-5 row g-1">

                    <div>
                        <TextField size='small' variant='outlined' label="Item Master" fullWidth />
                    </div>
                    <div className="col">
                        <TextField size='small' variant='outlined' label="Item Master" fullWidth />
                    </div>
                    <div className="col">
                        <TextField size='small' variant='outlined' label="Item Master" fullWidth />
                    </div>
                </div>
                <div className="col-md-2 text-center align-middle">
                    <Typography variant='h5'  >Item Add</Typography>
                </div>
                <div className="col-md-5 d-flex justify-content-center">
                    <Card sx={{ width: "50%", height: "100px" }}>
                        <CardContent>

                        </CardContent>
                    </Card>
                </div>


            </Paper>
            <div className="row ">
                <Paper className='col-md me-2' elevation={12} sx={{ p: 2 }}>
                    <Typography variant='h6' className='text-center'>Item General Details</Typography>
                    <div className="row g-2 mb-2">
                        <div className="col-md-4">
                            <TextField size='small' variant='outlined' label="Item Type" fullWidth />
                        </div>
                        <div className='col-md-8 d-flex justify-content-between'>
                            <TextField size='small' variant='outlined' label="Range/Size" name='rangeSize' id='rangeSizeId' fullWidth />
                            <FormControl size='small' sx={{ minWidth: 80 }}>
                                <InputLabel id="rangeSizeUnitId">Unit</InputLabel>
                                <Select
                                    labelId="rangeSizeUnitId"
                                    id="demo-simple-select-autowidth"
                                    // onChange={handleChange}
                                    autoWidth
                                    name='rangeSizeUnit'
                                    label="Unit"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {units.map((unit, index) => (
                                        <MenuItem key={index} value={unit.unitName}>{unit.unitName}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>

                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col-md-4">
                            <TextField size='small' variant='outlined' label="MFR.Si.No." fullWidth />
                        </div>
                        <div className='col-md-8 d-flex justify-content-between'>
                            <TextField size='small' variant='outlined' label="Least Count" fullWidth />
                            <FormControl size='small' sx={{ minWidth: 80 }}>
                                <InputLabel id="lcUnitId">Unit</InputLabel>
                                <Select
                                    labelId="lcUnitId"
                                    id="demo-simple-select-autowidth"
                                    // onChange={handleChange}
                                    autoWidth
                                    name='lcUnit'
                                    label="Unit"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {units.map((unit, index) => (
                                        <MenuItem key={index} value={unit.unitName}>{unit.unitName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </div>
                        <div className="row g-1">
                            <div className="col-md me-1">
                                <TextField size='small' variant='outlined' label="Make" fullWidth />
                            </div>
                            <div className="col-md">
                                <TextField size='small' variant='outlined' label="Model No." fullWidth />
                            </div>
                        </div>
                        <div className="row g-1">
                            <div className="col-md me-1">
                                <TextField size='small' variant='outlined' label="Item Status" fullWidth />
                            </div>
                            <div className="col-md">
                                <TextField size='small' variant='outlined' label="Receipt Date" fullWidth />
                            </div>
                        </div>
                        <Typography variant='h6' className='text-center'>
                            Select Location
                        </Typography>
                        <div className="row g-1 mt-0 mb-2">
                            <div className="col me-1">
                                <TextField size='small' select fullWidth variant='outlined' label="Department" name='itemDepartment'>
                                    {departments.map((item, index) => (
                                        <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col">
                                <TextField size='small' select fullWidth variant='outlined' label="Area" name='itemArea'>
                                    {areas.map((item, index) => (
                                        <MenuItem key={index} value={item.areaName}>{item.areaName}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className='mt-2'>
                                <TextField size='small' select fullWidth variant='outlined' label="Place" name='itemPlaceOfUsage'>
                                    {placeOfUsages.map((item, index) => (
                                        <MenuItem key={index} value={item.placeOfUsage}>{item.placeOfUsageName}</MenuItem>
                                    ))}
                                </TextField>
                            </div>

                        </div>





                    </div>










                </Paper>
                <Paper className='col-md me-2' elevation={12} sx={{ p: 2 }}>
                    <Typography variant='h6' className='text-center'>Calibration</Typography>
                    <div className="row g-2">
                        <div className='col-md-6'>
                            <TextField size='small' fullWidth variant='outlined' label="Cal Frequency in months" name='itemCalFreInMonths' type='number'>

                            </TextField>
                        </div>
                        <div className='col-md-6'>
                            <TextField size='small' fullWidth variant='outlined' label="Cal Alert Days" name='itemCalAlertDays' type='number'>

                            </TextField>
                        </div>
                        <div className='col-md-12'>
                            <TextField size='small' fullWidth variant='outlined' select label="Calibration Done At" value={itemAddData.itemCalDoneAt} defaultValue="" name='itemCalAlertDays' >
                                <MenuItem value=""><em>--Select--</em></MenuItem>
                                <MenuItem value="InHouse">InHouse</MenuItem>
                                <MenuItem value="OutSource">OutSource</MenuItem>
                                <MenuItem value="OEM">OEM</MenuItem>
                            </TextField>
                        </div>
                        {itemAddData.itemCalDoneAt === "" &&
                            <div className='row'>
                                <div className="col">
                                    <TextField size='small' fullWidth variant='outlined' select label="Select Master" name='itemMasterName' >
                                        <MenuItem value=""><em>--Select--</em></MenuItem>
                                        <MenuItem value="InHouse">InHouse</MenuItem>
                                        <MenuItem value="OutSource">OutSource</MenuItem>
                                        <MenuItem value="OEM">OEM</MenuItem>
                                    </TextField>
                                </div>
                                <div className="col">
                                    <TextField size='small' fullWidth variant='outlined' select label="Select Master" name='itemMasterName' >
                                        <MenuItem value=""><em>--Select--</em></MenuItem>
                                        <MenuItem value="InHouse">InHouse</MenuItem>
                                        <MenuItem value="OutSource">OutSource</MenuItem>
                                        <MenuItem value="OEM">OEM</MenuItem>
                                    </TextField>
                                </div>
                                <div className="col">
                                    <TextField size='small' fullWidth variant='outlined' select label="Master Due Date" name='itemMasterName'></TextField>
                                </div>

                            </div>}
                    </div>
                </Paper>
                <Paper className='col-md' elevation={12} sx={{ p: 2, }}>
                    <Typography variant='h6' className='text-center'>Enter Previous Calibration Data</Typography>
                    <div className="row g-2">
                        <div className="col-md-6">
                            <TextField size='small' fullWidth variant='outlined' label="Cal Date" type='date' name='itemMasterName'></TextField>
                        </div>
                        <div className="col-md-6">
                            <TextField size='small' fullWidth variant='outlined' label="Due Date" type='date' name='itemMasterName'></TextField>
                        </div>
                        <div className="col-md-12">
                            <TextField size='small' fullWidth variant='outlined' label="Calibrated at" type='date' select name='itemMasterName'>
                                <MenuItem>Lab</MenuItem>
                                <MenuItem>Site</MenuItem>
                               
                            </TextField>
                        </div>
                        <div className="col-md-8">
                            <Button component="label" variant="contained" fullWidth >
                                Certificate Upload
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </div>
                        <div className='col-md-4'>
                            <Button 
                                fullWidth
                                variant="outlined"
                                
                                
                            >Upload</Button>
                        </div>
                    </div>

                </Paper>

            </div>









        </div>
    )
}

export default ItemAdd