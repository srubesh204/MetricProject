import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
const MeasurementUncertainty = () => {


    const [uncertainityData, setUncertainityData] = useState({
        instrumentSelect: "",
        cte: "",
        range: "",
        resolution: "",
        calibrationDate: "",
        R1: "",
        R2: "",
        R3: "",
        R4: "",
        R5: "",
        R6: "",
        R7: "",
        R8: "",
        R9: "",
        R10: "",
        stdDeviation: "",
        begTemp: "",
        endTemp: "",
        mean: "",
        TAD: "",
        TD: "",
        TR: 20,
        UT: 0.20,
        ET: 0.30,
        masterDetails: []
    
      })



    const [selectedRow, setSelectedRow] = useState([]);

    const [itemNameList, setItemNameList] = useState([])
    const itemNameFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
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

    const handleFilters = (e) => {
        const { name, value } = e.target
        if (name === "itemName") {
            console.log(value)
            const filterList = itemNameList.filter(item => item.itemAddMasterName === value)
            setSelectedRow(filterList)

        }



    }

    // const addBodyRow = () => {
    //     if (mailDetails.length !== 0) {
    //         setMailData((prev) => ({ ...prev, mailBodies: [...prev.mailBodies, mailDetails.mailContent] }))
    //         setMailDetails((prev) => ({...prev, mailContent:""}))
    //     }
    // }
    return (
        <div>


            <Container >
                <form>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1,

                            }}
                            elevation={12}
                        >
                            <div className='row g-2 '>
                                <h6 className="text-center ">DUC Details</h6>
                                <div className="col d-flex ">
                                    <TextField size='small' select fullWidth onChange={handleFilters} variant='outlined' label="itemName" name='itemName' id='itemNameId'>
                                        {itemNameList.map((item, index) => (
                                            <MenuItem key={index} value={item.itemAddMasterName}>{item.itemAddMasterName}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col">
                                    <TextField
                                        label="Range/Size(L.in mm) "
                                        value={`${selectedRow[0]?.itemRangeSize || ''} ${selectedRow[0]?.itemRangeSizeUnit || ''}`}
                                        size="small"
                                        fullWidth
                                        name="itemRangeSize"
                                        InputProps={{ readOnly: true }}
                                        InputLabelProps={{ shrink: true }}
                                    ></TextField>
                                </div>
                                <div className="col">
                                    {/* <TextField size='small' fullWidth variant='outlined' label="Least Count" name='rangeSize' id='rangeSizeId'>
                                </TextField> */}
                                    <TextField label="L.C.in (mm)"
                                        value={selectedRow[0]?.itemLC} fullWidth size="small" name="itemLC" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                </div>
                                <div className="col">
                                    <TextField size='small' select fullWidth variant='outlined' label="Material " name='material' id='materialId'>
                                        <MenuItem value="steel">Steel</MenuItem>
                                        <MenuItem value="carbide">Carbide</MenuItem>
                                        <MenuItem value="granite">Granite</MenuItem>
                                        <MenuItem value="glass">Glass</MenuItem>
                                    </TextField>
                                </div>
                                <div className="col">
                                    <DatePicker
                                        fullWidth
                                        id="dateId"
                                        name="date"
                                        label="Date"
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>
                            </div>
                        </Paper>
                        <div className='row g-2'>
                            <Paper
                                sx={{
                                    p: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mb: 1,

                                }}
                                elevation={12}
                            >
                                <h6 className="text-center ">Master Details</h6>
                                <div className='col d-flex mb-2'>
                                    <div className="col d-flex me-2">
                                        <TextField size='small' select fullWidth onChange={handleFilters} variant='outlined' label="MasterName" name='itemName' id='itemNameId'>
                                            {itemNameList.map((item, index) => (
                                                <MenuItem key={index} value={item.itemAddMasterName}>{item.itemAddMasterName}</MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div className="col me-2">
                                        <TextField
                                            label="Range/Size(L.in mm) "
                                            value={`${selectedRow[0]?.itemRangeSize || ''} ${selectedRow[0]?.itemRangeSizeUnit || ''}`}
                                            size="small"
                                            fullWidth
                                            name="itemRangeSize"
                                            InputProps={{ readOnly: true }}
                                            InputLabelProps={{ shrink: true }}
                                        ></TextField>
                                    </div>
                                    <div className="col me-2">
                                        {/* <TextField size='small' fullWidth variant='outlined' label="Least Count" name='rangeSize' id='rangeSizeId'>
                                </TextField> */}
                                        <TextField label="L.C.in (mm)"
                                            value={selectedRow[0]?.itemLC} fullWidth size="small" name="itemLC" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                    </div>
                                    <div className="col me-2">
                                        <TextField size='small' fullWidth variant='outlined' label="Uncertainty in(mm)" name='uncertainty' id='uncertaintyId'>
                                        </TextField>
                                    </div>
                                    <div className="col me-2">
                                        <TextField size='small' fullWidth variant='outlined' label="Accuracy in (mm)" name='accuracy' id='accuracyId'>
                                        </TextField>
                                    </div>
                                    <div className="col me-2">
                                        <TextField size='small' select fullWidth variant='outlined' label="Material " name='material' id='materialId'>
                                            <MenuItem value="steel">Steel</MenuItem>
                                            <MenuItem value="carbide">Carbide</MenuItem>
                                            <MenuItem value="granite">Granite</MenuItem>
                                            <MenuItem value="glass">Glass</MenuItem>
                                        </TextField>
                                    </div>
                                    <div>
                                        <Button size='small' color='warning' variant='contained'>Add </Button>
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
                                <div className='col'>
                                    <table className='table table-sm table-bordered table-responsive  align-middle'>
                                        <tbody>
                                            <tr >
                                                <th>Master Name</th>
                                                <th>Range/Size</th>
                                                <th>L.C.</th>
                                                <th>Uncertainty</th>
                                                <th>Accuracy</th>
                                                <th>Material</th>
                                            </tr>
                                            <tr >
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
                        </div>
                        <div className=' row g-2'>
                            <Paper
                                sx={{
                                    p: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mb: 1,

                                }}
                                elevation={12}
                            >
                                <h6 className="text-center ">Environmental Parameteres</h6>
                                <div className='col d-flex'>
                                    <div className="col me-2">
                                        <TextField size='small' fullWidth variant='outlined' label="Start Temp T1(°C)" name='startTemp' id='startTempId'>
                                        </TextField>
                                    </div>
                                    <div className="col me-2">
                                        <TextField size='small' fullWidth variant='outlined' label="End Temp T2(°C)" name='endTemp' id='endTempId'>
                                        </TextField>
                                    </div>
                                    <div className="col me-2">
                                        <TextField size='small' fullWidth variant='outlined' label="Mean Temp(T3=(T1+T2)/2)" name='meanTemp' id='meanTempId'>
                                        </TextField>
                                    </div>
                                    <div className="col me-2">
                                        <TextField size='small' fullWidth variant='outlined' label="Ref. Temp (T)" name='refTemp' id='refTempId'>
                                        </TextField>
                                    </div>
                                    <div className="col me-2">
                                        <TextField size='small' fullWidth variant='outlined' label="Thermal Expansion of master(um/m°C)(α1)" name='refTemp' id='refTempId'>
                                        </TextField>
                                    </div>
                                    <div className="col me-2">
                                        <TextField size='small' fullWidth variant='outlined' label="Thermal Expansion of DUC(um/m°C)(α2)" name='refTemp' id='refTempId'>
                                        </TextField>
                                    </div>
                                </div>
                            </Paper>
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
                                <h6 className="text-center ">Repeaterbility in(mm)</h6>
                                <div className='col'>
                                    <table className='table table-sm table-bordered table-responsive  align-middle'>
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
                                                    <input className='form-control form-control-sm' name="R1" />
                                                </td>
                                                <td>
                                                    <input className='form-control form-control-sm' name="R2" />
                                                </td>
                                                <td>
                                                    <input className='form-control form-control-sm' name="R3" />
                                                </td>
                                                <td>
                                                    <input className='form-control form-control-sm' name="R4" />
                                                </td>
                                                <td>
                                                    <input className='form-control form-control-sm' name="R5" />
                                                </td>
                                                <td>
                                                    <input className='form-control form-control-sm' name="StandardDeviation" />
                                                </td>
                                                <td>
                                                    <input className='form-control form-control-sm' name="n" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h6 className="text-left ">Sensitivity Coefficient: L*(α1+ α2)/2</h6>
                                    <h6 className="text-left ">Sensitivity Coefficient: L*(T2-T1)</h6>
                                </div>
                                <div className='d-flex justify-content-end' >
                                    <Button type='button' size='small' color='error' > CalCulate </Button>
                                </div>
                            </div>
                        </Paper>
                        <Paper
                            sx={{
                                p: 3,
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
                                            <th style={{ width: "25%" }}>Source of uncertainty Xi</th>
                                            <th>Estimates Xi </th>
                                            <th>Probability Distribution  </th>
                                            <th>Type A or Type B</th>
                                            <th>Factor (b)</th>
                                            <th>Standard Uncertainty c= (a/b)</th>
                                            <th>Sensitivity Coefficient(d)</th>
                                            <th>Uncertainty contribution ui (y) m</th>
                                            <th>Degree of freedom vi</th>
                                        </tr>
                                        <tr>
                                            <th>U1</th>
                                            <td><input type="text" className='form-control form-control-sm' id="frNoId" name="frNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amNoId" name="amNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                        </tr>
                                        <tr>
                                            <th>U2</th>
                                            <td><input type="text" className='form-control form-control-sm' id="frNoId" name="frNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amNoId" name="amNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                        </tr>
                                        <tr>
                                            <th>U2</th>
                                            <td><input type="text" className='form-control form-control-sm' id="frNoId" name="frNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amNoId" name="amNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                        </tr>
                                        <tr>
                                            <th>U4</th>
                                            <td><input type="text" className='form-control form-control-sm' id="frNoId" name="frNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amNoId" name="amNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                        </tr>
                                        <tr>
                                            <th>U5</th>
                                            <td><input type="text" className='form-control form-control-sm' id="frNoId" name="frNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amNoId" name="amNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                        </tr>
                                        <tr>
                                            <th>U6</th>
                                            <td><input type="text" className='form-control form-control-sm' id="amNoId" name="amNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                        </tr>
                                        <tr>
                                            <th>U7</th>
                                            <td><input type="text" className='form-control form-control-sm' id="amNoId" name="amNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                        </tr>
                                        <tr>
                                            <th>U8</th>
                                            <td><input type="text" className='form-control form-control-sm' id="amNoId" name="amNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Paper>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1,
                                // padding: "30Px"

                            }}
                            elevation={12}
                        >
                            <div className='row'>
                                <table class='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th width="15%">Combined(Uc)</th>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <th width="20%" >Coverge Factor (k)</th>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <th width="25%" >Degree of Freedom (veff)</th>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                            <th width="15%" >Expanded(U): ±</th>
                                            <td><input type="text" className='form-control form-control-sm' id="amDateId" name="amDate" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Paper>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1,
                                // padding: "30Px"

                            }}
                            elevation={12}
                        >
                            <div className='row'>
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
                        </Paper>
                        <div className='row'>
                            <table class='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Degree of Freedom (v)</th>
                                        <th>Fraction p in %</th>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </LocalizationProvider>
                </form>
            </Container>
        </div>
    )
}
export default MeasurementUncertainty