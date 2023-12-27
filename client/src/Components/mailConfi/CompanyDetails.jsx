import React from 'react'
import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import { Add, Close, CloudUpload, Delete, Done, Edit, Receipt } from '@mui/icons-material';

const CompanyDetails = () => {
    return (
        <div>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <form>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,

                        }}
                        elevation={12}
                    >

                        <div className='row mt-3'>
                            <div className='col'>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="singleUser" control={<Radio />} label="SingleUser" />
                                    <FormControlLabel value="multiUser" control={<Radio />} label="MultiUser" />

                                </RadioGroup>
                            </div>


                        </div>
                        <div className='row g-2'>
                            {/* <div className='col'>
                            <TextField label="Plant 1 Address"
                                id="plantAddressId"
                                defaultValue=""
                                size="small"
                                sx={{ width: "100%" }}
                                name="plantAddress" />


    </div>*/}                 <h6 className='text-center mb-2'>Company Name</h6>
                            <table className='table table-sm table table-bordered table-responsive text-center align-middle' >
                                <tbody>
                                    <tr>
                                        <th>Si No</th>
                                        <th> Plant Address</th>
                                        <th style={{ width: "2%" }}><Button size='small' color="primary" aria-label="add" >
                                            <Add /> Add
                                        </Button></th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><input type="text" className='form-control form-control-sm' id="plantNumberId" name="plantNumber" /></td>

                                        <td style={{ width: "2%" }}><Button size='small' color="success" aria-label="add" >
                                            <Edit />
                                        </Button></td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>

                        <div className='row'>
                            <div className='col-4'>
                                <Button helperText="Hello" component="label" fullWidth variant="contained" startIcon={<CloudUpload />} >
                                    Upload ComPany Logo
                                </Button>
                            </div>

                            <div className='col-4'>
                                <Button helperText="Hello" component="label" fullWidth variant="contained" startIcon={<CloudUpload />} >
                                    Company Image
                                </Button>
                            </div>


                        </div>
                    </Paper>






                </form>
            </Container>

        </div>
    )
}

export default CompanyDetails