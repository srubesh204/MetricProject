import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios';
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
                <Paper className='col me-2' elevation={12} sx={{ p: 2 }}>
                    <Typography variant='h6' className='text-center'>Item General Details</Typography>
                    <div className="row g-2">
                        <div className="col">
                            <TextField size='small' variant='outlined' label="Item Type" fullWidth />
                        </div>
                        <div className='col d-flex justify-content-between'>
                            <TextField size='small' variant='outlined' label="Range/Size" name='rangeSize' id='rangeSizeId' fullWidth />
                            <TextField
                                id="outlined-select-currency"
                                select
                                size='small'
                                label="Unit"
                                name='rangeSizeUnit'
                            ><MenuItem></MenuItem>
                                
                            </TextField>

                        </div>

                        <div className='col d-flex justify-content-between'>
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
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Twenty</MenuItem>
                                    <MenuItem value={21}>Twenty one</MenuItem>
                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                </Select>
                            </FormControl>

                        </div>








                    </div>
                </Paper>
                <Paper className='col' elevation={12} sx={{ p: 2 }}>
                    <Typography variant='h6'>Item General Details</Typography>
                </Paper>

            </div>









        </div>
    )
}

export default ItemAdd