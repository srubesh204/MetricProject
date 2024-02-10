import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Delete } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEmployee } from '../../App';
import dayjs from 'dayjs';
const MeasurementUncertainty = () => {

    const empRole = useEmployee();
    const {loggedEmp, allowedPlants} = empRole
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    }
    const [openModalUNC, setOpenModalUNC] = useState(false);
    const initialUncertainty = {
        uncItemName: "",
        uncRangeSize: "",
        uncLC: "",
        uncMaterial: "",
        uncDate: "",
        uncMasterDetails: [{
            masterName: "",
            rangeSize: "",
            lC: "",
            accuracy: "",
            material: ""
        }],
        uncStartTemp: "",
        uncEndTemp: "",
        uncMeanTemp: "",
        uncRefTemp: "",
        uncTEMaster: "",
        uncTEDUC: "",
        uncR1: "",
        uncR2: "",
        uncR3: "",
        uncR4: "",
        uncR5: "",
        uncStdDeviation: "",
        uncN: ""

    }
    const [uncertainityData, setUncertainityData] = useState({
        uncItemName: "",
        uncRangeSize: "",
        uncLC: "",
        uncMaterial: "",
        uncDate: "",
        uncMasterDetails: [],
        uncStartTemp: "",
        uncEndTemp: "",
        uncMeanTemp: "",
        uncRefTemp: "",
        uncTEMaster: "",
        uncTEDUC: "",
        uncR1: "",
        uncR2: "",
        uncR3: "",
        uncR4: "",
        uncR5: "",
        uncStdDeviation: "",
        uncN: "5"
    })

    const [masterDetails, setMasterDetails] = useState({
        masterIMTENo: "",
        rangeSize: "",
        lC: "",
        uncertainty: "",
        accuracy: "",
        material: ""
    })
    console.log(masterDetails)
    const handlePlantChange = (e) => {
        const { name, value } = e.target;
        setMasterDetails((prev) => ({ ...prev, [name]: value }));
    };
    const addUncertainty = () => {

        setUncertainityData((prev) => ({ ...prev, uncMasterDetails: [...prev.uncMasterDetails, masterDetails] }))
        setMasterDetails((prev) => ({ ...prev, masterIMTENo: "", rangeSize: "", lC: "", uncertainty: "", accuracy: "", material: "" }))
    }
    const deleteRow = (index) => {
        setUncertainityData((prev) => {
            const AC = [...prev.uncMasterDetails]
            AC.splice(index, 1);
            return {
                ...prev, uncMasterDetails: AC,
            };
        })
    };
    const [uncertaintyList, setUncertaintyList] = useState([])
    const uncFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/measurementUncertainty/getAllMeasurementUncertainty`
            );
            setUncertaintyList(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        uncFetch()
    }, []);


 const [selectedValues, setSelectedValues] = useState([]);
    const [uncertaintyData, setUncertaintyData] = useState([])
    const Fetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/unctypeb/getAllUncTypeB`
            );
            setUncertaintyData(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        Fetch()
    }, []);

    const handleUncertaintyChange = (e) => {
        const { name, value } = e.target;
        setUncertainityData((prev) => ({ ...prev, [name]: value }));
    }
    const [selectedRow, setSelectedRow] = useState([]);
    const [itemNameList, setItemNameList] = useState([])
    const itemNameFetch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`, { allowedPlants: allowedPlants }
              );
            setItemNameList(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemNameFetch()
    }, []);

    const [errors, setErrors] = useState({})
    const validateFunction = () => {
        let tempErrors = {};
        tempErrors.uncItemName = uncertainityData.uncItemName ? "" : "uncItemName  is Required"
        tempErrors.uncRangeSize = uncertainityData.uncRangeSize ? "" : "uncRangeSize is Required"
        setErrors({ ...tempErrors })
        return Object.values(tempErrors).every(x => x === "")
    }
    console.log(errors)
    const [errorhandler, setErrorHandler] = useState({})
    console.log(errorhandler)
    const uncertaintySubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateFunction()) {
                const response = await axios.post(
                    `${process.env.REACT_APP_PORT}/measurementUncertainty/createMeasurementUncertainty`, uncertainityData
                );
                console.log(response.data.message)

                setSnackBarOpen(true)
                uncFetch();
                setUncertainityData(initialUncertainty);
                console.log("uncertainty Create successfully");
                setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })

            } else {
                setErrorHandler({ status: 0, message: "Fill the required fields", code: "error" })
            }
        } catch (err) {
            setSnackBarOpen(true)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                console.log(err);
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(', ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                console.log(err);
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err);
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }


            console.log(err);

        }
    };

   



    const handleFilters = (e) => {
        const { name, value } = e.target
        if (name === "masterIMTENo") {
            console.log(value)
            const filterList = itemNameList.filter(item => item.itemIMTENo === value)
            setSelectedRow(filterList)
            setMasterDetails(prev => ({
                ...prev,
                masterIMTENo: filterList[0].itemIMTENo,
                rangeSize: filterList[0].itemRangeSize,
                lC: filterList[0].itemLC,

            }))
        }
    }

    return (
        <div style={{ fontSize: "smaller", padding: "3px", margin: "5px", my: "5px" }}>
            <form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,

                        }}
                        elevation={12}
                    >
                        <div className='row g-2 '>
                            <h6 className="text-center ">DUC Details</h6>
                            <div className="col d-flex ">
                                <TextField size='small' fullWidth variant='outlined' onChange={handleUncertaintyChange} value={uncertainityData.uncItemName} label="ItemName" name='uncItemName' id='uncItemNameId'>
                                    {/* {itemNameList.map((item, index) => (
                                        <MenuItem key={index} value={item.itemAddMasterName}>{item.itemAddMasterName}</MenuItem>
                                    ))} */}
                                </TextField>
                            </div>
                            <div className="col">
                                {/* <TextField
                                    label="Range/Size(L.in mm) "
                                    value={`${selectedRow[0]?.itemRangeSize || ''} ${selectedRow[0]?.itemRangeSizeUnit || ''}`}
                                    size="small"
                                    fullWidth
                                    name="itemRangeSize"
                                    InputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                ></TextField> */}
                                <TextField size='small' fullWidth variant='outlined' label="Range/Size(L.in mm)" onChange={handleUncertaintyChange} value={uncertainityData.uncRangeSize} name='uncRangeSize' id='uncRangeSizeId'>
                                </TextField>

                            </div>
                            <div className="col">
                                {/* <TextField size='small' fullWidth variant='outlined' label="Least Count" name='rangeSize' id='rangeSizeId'>
                                </TextField> */}
                                <TextField size='small' fullWidth variant='outlined' label="Least Count" onChange={handleUncertaintyChange} value={uncertainityData.uncLC} name='uncLC' id='uncLCId'>
                                </TextField>
                            </div>
                            <div className="col">
                                <TextField size='small' select fullWidth variant='outlined' label="Material " value={uncertainityData.uncMaterial} name='uncMaterial' onChange={handleUncertaintyChange} id='uncMaterialId'>
                                    <MenuItem value="steel">Steel</MenuItem>
                                    <MenuItem value="carbide">Carbide</MenuItem>
                                    <MenuItem value="granite">Granite</MenuItem>
                                    <MenuItem value="glass">Glass</MenuItem>
                                </TextField>
                            </div>
                            <div className="col">
                                <DatePicker
                                    fullWidth
                                    id="uncDateId"
                                    name="uncDate"
                                    value={dayjs(uncertainityData.uncDate)}
                                    onChange={(newValue) =>
                                        setUncertainityData((prev) => ({ ...prev, uncDate: newValue.format("YYYY-MM-DD") }))
                                    }
                                    label="Date"
                                    slotProps={{ textField: { size: 'small' } }}
                                    format="DD-MM-YYYY" />
                            </div>
                        </div>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,

                        }}
                        elevation={12}
                    >
                        <div className='row g-2'>
                            <h6 className="text-center ">Master Details</h6>
                            <div className='col d-flex mb-2'>
                                <div className="col d-flex me-2">
                                    <TextField size='small' select fullWidth onChange={handleFilters} variant='outlined' label="Master IMTENo" name='masterIMTENo' id='masterIMTENoId'>
                                        {itemNameList.map((item, index) => (
                                            <MenuItem key={index} value={item.itemIMTENo}>{item.itemIMTENo}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col me-2">
                                    {/* <TextField
                                        label="Range/Size(L.in mm) "
                                        // value={`${selectedRow[0]?.itemRangeSize || ''} ${selectedRow[0]?.itemRangeSizeUnit || ''}`}
                                        size="small"
                                        onChange={handlePlantChange}
                                        value={masterDetails.rangeSize}
                                        fullWidth
                                        name="rangeSize"
                                        InputProps={{ readOnly: true }}
                                        InputLabelProps={{ shrink: true }}
                                    ></TextField> */}
                                    {/*<TextField size='small' fullWidth variant='outlined' label="RangeSize in (mm)" onChange={handlePlantChange} value={masterDetails.rangeSize} name='rangeSize' id='rangeSizeId'>
                                    </TextField>*/}
                                    <TextField
                                        label="Range / Size"
                                        value={`${selectedRow[0]?.itemRangeSize || ''} ${selectedRow[0]?.itemRangeSizeUnit || ''}`}
                                        size="small"
                                        name="itemRangeSize"
                                        InputProps={{ readOnly: true }}
                                        InputLabelProps={{ shrink: true }}
                                    ></TextField>
                                </div>
                                <div className="col me-2">
                                    {/* <TextField size='small' fullWidth variant='outlined' label="Least Count" name='rangeSize' id='rangeSizeId'>
                                </TextField> */}
                                    <TextField label="L.C.in (mm)"
                                        value={`${selectedRow[0]?.itemLC || ''} `}fullWidth size="small" name="lC" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                </div>
                                <div className="col me-2">
                                    <TextField size='small' fullWidth variant='outlined' label="Uncertainty in(mm)" onChange={handlePlantChange} value={masterDetails.uncertainty} name='uncertainty' id='uncertaintyId'>
                                    </TextField>
                                </div>
                                <div className="col me-2">
                                    <TextField size='small' fullWidth variant='outlined' label="Accuracy in (mm)" onChange={handlePlantChange} value={masterDetails.accuracy} name='accuracy' id='accuracyId'>
                                    </TextField>
                                </div>
                                <div className="col me-2">
                                    <TextField size='small' select fullWidth variant='outlined' label="Material" onChange={handlePlantChange} value={masterDetails.material} name='material' id='materialId'>
                                        <MenuItem value="steel">Steel</MenuItem>
                                        <MenuItem value="carbide">Carbide</MenuItem>
                                        <MenuItem value="granite">Granite</MenuItem>
                                        <MenuItem value="glass">Glass</MenuItem>
                                    </TextField>
                                </div>
                                <div>
                                    {/* <Button size='small' color='warning' variant='contained' onClick={() => addUncertainty()}>Add </Button> */}
                                    <Button variant='contained' color='warning' onClick={() => addUncertainty()} >Add Row</Button>
                                </div>
                                {/* <table className='table table-sm table-bordered table-responsive text-center align-middle'>
                                        <tbody >
                                            <tr>
                                                <th width="15%">Master Name</th>
                                                <th width="15%" >Range/Size</th>
                                                <th width="15%">Least Count</th>
                                                <th width="15%" >Material</th>
                                                <th width="15%" >UNC</th>
                                                <th width="15%" >Accuracy</th>
                                                <th>Add</th>
                                            </tr>
                                            <tr >
                                                <td><input className='form-control form-control-sm' name='masterName' /></td>
                                                <td><input className='form-control form-control-sm' name='rangeSize' /></td>
                                                <td><input className='form-control form-control-sm' name='leastCount' /></td>
                                                <td><input className='form-control form-control-sm' name='material' /></td>
                                                <td><input className='form-control form-control-sm' name='unc' /></td>
                                                <td><input className='form-control form-control-sm' name='accuracy' /></td>
                                                <td><input className='form-control form-control-sm' name='accuracy' /></td>
                                            </tr>
                                        </tbody>
                                    </table> */}
                            </div>
                            <div className='row g-2'>
                                <table className='table table-sm table-bordered table-responsive  align-middle'>
                                    <tbody>
                                        <tr >
                                            <th>Master Name</th>
                                            <th>Range/Size</th>
                                            <th>  L.C.</th>
                                            <th>Uncertainty</th>
                                            <th>Accuracy</th>
                                            <th>Material</th>
                                            <th>Delete</th>
                                        </tr>
                                        {uncertainityData.uncMasterDetails.map((item, index) => (
                                            <tr key={index} >
                                                <td>{item.masterIMTENo}</td>
                                                <td>{item.rangeSize}</td>
                                                <td>{item.lC}</td>
                                                <td>{item.uncertainty}</td>
                                                <td>{item.accuracy}</td>
                                                <td>{item.material}</td>
                                                <td style={{ width: "1%" }}><Button size='small' color="error" aria-label="add" onClick={() => deleteRow(index)}>
                                                    <Delete />
                                                </Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,

                        }}
                        elevation={12}
                    >
                        <div className=' row g-2'>
                            <h6 className="text-center ">Environmental Parameteres</h6>
                            <div className='col d-flex'>
                                <div className="col me-2">
                                    <TextField size='small' fullWidth variant='outlined' label="Start Temp T1(°C)" value={uncertainityData.uncStartTemp} onChange={handleUncertaintyChange} name='uncStartTemp' id='uncStartTempId'>
                                    </TextField>
                                </div>
                                <div className="col me-2">
                                    <TextField size='small' fullWidth variant='outlined' label="End Temp T2(°C)" value={uncertainityData.uncEndTemp} onChange={handleUncertaintyChange} name='uncEndTemp' id='uncEndTempId'>
                                    </TextField>
                                </div>
                                <div className="col me-2">
                                    <TextField size='small' fullWidth variant='outlined' label="Mean Temp(T3=(T1+T2)/2)" value={uncertainityData.uncMeanTemp} onChange={handleUncertaintyChange} name='uncMeanTemp' id='uncMeanTempId'>
                                    </TextField>
                                </div>
                                <div className="col me-2">
                                    <TextField size='small' fullWidth variant='outlined' label="Ref. Temp (T)" value={uncertainityData.uncRefTemp} onChange={handleUncertaintyChange} name='uncRefTemp' id='uncRefTempId'>
                                    </TextField>
                                </div>
                                <div className="col me-2">
                                    <TextField size='small' fullWidth variant='outlined' label="Thermal Expansion of master(um/m°C)(α1)" value={uncertainityData.uncTEMaster} onChange={handleUncertaintyChange} name='uncTEMaster' id='uncTEMasterId'>
                                    </TextField>
                                </div>
                                <div className="col me-2">
                                    <TextField size='small' fullWidth variant='outlined' label="Thermal Expansion of DUC(um/m°C)(α2)" value={uncertainityData.uncTEDUC} onChange={handleUncertaintyChange} name='uncTEDUC' id='uncTEDUCId'>
                                    </TextField>
                                </div>
                            </div>
                        </div>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,

                        }}
                        elevation={12}
                    >
                        <div className='row g-2'>
                            <h6 className="text-center ">Repeaterbility in(mm)</h6>
                            <div className='col'>
                                <table className='table table-sm table-bordered table-responsive align-middle'>
                                    <tbody>
                                        <tr>
                                            <th>R1</th>
                                            <th>R2</th>
                                            <th>R3</th>
                                            <th>R4</th>
                                            <th>R5</th>
                                            <th>Standard Deviation</th>
                                            <th>n</th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input className='form-control form-control-sm' value={uncertainityData.uncR1} onChange={handleUncertaintyChange} name="uncR1" id='uncR1Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' value={uncertainityData.uncR2} onChange={handleUncertaintyChange} name="uncR2" id='uncR2Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' value={uncertainityData.uncR3} onChange={handleUncertaintyChange} name="uncR3" id='uncR3Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' value={uncertainityData.uncR4} onChange={handleUncertaintyChange} name="uncR4" id='uncR4Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' value={uncertainityData.uncR5} onChange={handleUncertaintyChange} name="uncR5" id='uncR5Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' value={uncertainityData.uncStdDeviation} onChange={handleUncertaintyChange} name="uncStdDeviation" id='uncStdDeviationId' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' disabled value={uncertainityData.uncN} onChange={handleUncertaintyChange} name="uncN" id='uncNId' />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h6 className="text-left ">Sensitivity Coefficient: L*(α1+ α2)/2</h6>
                                <h6 className="text-left ">Sensitivity Coefficient: L*(T2-T1)</h6>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-10'>
                                <FormControl size='small' component="div" fullWidth>
                                    <InputLabel id="uncertaintyId">Uncertainty</InputLabel>
                                    <Select
                                        labelId="uncertaintyId"
                                        name="uncertainty"
                                        multiple
                                        value={selectedValues}
                                        input={<OutlinedInput fullWidth label="Uncertainty" />}
                                        MenuProps={MenuProps}
                                        renderValue={(selected) => selected.join(', ')}
                                        fullWidth
                                    >
                                        {uncertaintyData.map((dep, index) => (
                                            <MenuItem key={index} value={dep.uncertainity_component}>
                                                <Checkbox checked={selectedValues.includes(dep.uncertainity_component)} />
                                                <ListItemText primary={dep.uncertainity_component} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className=' col d-flex justify-content-end' >
                                <Button type='button' size='small' color='error' variant='contained' > CalCulate </Button>
                            </div>
                        </div>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,
                            // padding: "30Px"

                        }}
                        elevation={12}
                    >
                        <div className='row g-2'>
                            <table className='table table-sm table table-bordered table-responsive text-center align-middle border border-black'  >
                                <tbody>
                                    <tr>
                                        <th colSpan={2}>Source of uncertainty Xi</th>
                                        <th>Estimates Xi </th>
                                        <th>Probability Distribution  </th>
                                        <th>Type A or Type B</th>
                                        <th>Factor (b)</th>
                                        <th>Standard Uncertainty c= (a/b)</th>
                                        <th>Sensitivity Coefficient(d)</th>
                                        <th>Uncertainty contribution ui (y) m</th>
                                        <th>Degree of freedom vi = (n-1)</th>
                                    </tr>
                                    <tr>
                                        <th>U1</th>
                                       
                                        <th class='text align-left'>Uncertainty due to repeatability</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>U2</th>
                                       
                                        <th>Uncertainty of master reported in Certificate</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>U3</th>
                                      
                                        <th>Accuracy of master reported in certificate</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>U4</th>
                                      
                                        <th>Uncertainty due to Least count</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>U5</th>
                                       
                                        <th>Uncertainty due to room temperature</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>U6</th>
                                     
                                        <th>Uncertainty due to temp difference between both DUC & Master</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>U7</th>
                                       
                                        <th>Uncertainty due to Temperature measurement</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>U8</th>
                                        <th>Uncertainty due to Thermal expansion</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,
                            // padding: "30Px"

                        }}
                        elevation={12}
                    >
                        <div className='row g-2'>
                            <table class='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th width="10%">Combined(Uc)</th>
                                        <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                        <th width="10%" >Coverge Factor (k)</th>
                                        <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                        <th width="10%" >Degree of Freedom (veff)</th>
                                        <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                        <th width="10%" >Expanded(U): ±</th>
                                        <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Paper>
                    {/* <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,
                            // padding: "30Px"

                        }}
                        elevation={12}
                    >
                        <div className='row g-2'>
                            <table class='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Material</th>
                                        <th>Thermal Coefficient (um/m°C)</th>
                                    </tr>
                                    <tr>
                                        <td>Steel</td>
                                        <td>11.5</td>
                                    </tr>
                                    <tr>
                                        <td>Ceramic</td>
                                        <td>10.5</td>
                                    </tr>
                                    <tr>
                                        <td>Carbide</td>
                                        <td>4.7</td>
                                    </tr>
                                    <tr>
                                        <td>Glass</td>
                                        <td>8.0</td>
                                    </tr>
                                    <tr>
                                        <td>Granite</td>
                                        <td>8.0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Paper> */}
                    {/* <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,
                            // padding: "30Px"

                        }}
                        elevation={12}
                    >
                        <div className='row g-2'>
                            <table class='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Degree of Freedom (v)</th>
                                        <th>Fraction p in %</th>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </Paper> */}
                    <div className='row'>
                        <div className='d-flex justify-content-end' >
                            <div className='me-2'>
                                <Button variant='contained' size="small" color='success' onClick={() => setOpenModalUNC(true)}>+ Add Uncertainty</Button>
                            </div>
                            <div className='' >
                                <Button variant='contained' type='button' size='small' color='error' >List</Button>
                            </div>

                        </div>

                        <Dialog
                            open={openModalUNC}
                            onClose={() => setOpenModalUNC(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"uncertainty create confirmation?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure to add the uncertainty
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenModalUNC(false)}>Cancel</Button>
                                <Button onClick={(e) => { uncertaintySubmit(e); setOpenModalUNC(false); }} autoFocus>
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>






                        <Snackbar variant="contained" anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                            <Alert variant="filled" onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '25%' }}>
                                {errorhandler.message}
                            </Alert>
                        </Snackbar>


                    </div>

                </LocalizationProvider>
            </form>

        </div>
    )
}
export default MeasurementUncertainty