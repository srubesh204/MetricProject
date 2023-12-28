import React from 'react'
import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import { Add, Close, CloudUpload, Delete, Done, Edit, Receipt } from '@mui/icons-material';

const FormatNumber = () => {
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

                        <div className='row'>

                            <h4 className='text-center mb-2'>Company Name</h4>

                            <table className='table table-sm table table-bordered table-responsive text-center align-middle' >
                                <tbody>
                                    <tr>
                                        <th>RePort Name</th>
                                        <th>Format No</th>
                                        <th>Amendment No</th>
                                        <th>Amendment Date</th>
                                    </tr>
                                    <tr>
                                        <th>Dc</th>
                                        <tr>
                                            <td><input type="text" className='form-control form-control-sm' id="formatNoId" name="formatNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amendmentNoId" name="amendmentNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amendmentDateId" name="amendmentDate" /></td>

                                        </tr>
                                    </tr>
                                    <tr>
                                        <th>GRN</th>
                                        <tr>
                                            <td><input type="text" className='form-control form-control-sm' id="formatNoId" name="formatNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amendmentNoId" name="amendmentNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amendmentDateId" name="amendmentDate" /></td>

                                        </tr>

                                    </tr>
                                    <tr>
                                        <th>Certificate</th>
                                        <tr>
                                            <td><input type="text" className='form-control form-control-sm' id="formatNoId" name="formatNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amendmentNoId" name="amendmentNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amendmentDateId" name="amendmentDate" /></td>

                                        </tr>
                                    </tr>
                                    <tr>
                                        <th>History Card</th>
                                        <tr>
                                            <td><input type="text" className='form-control form-control-sm' id="formatNoId" name="formatNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amendmentNoId" name="amendmentNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amendmentDateId" name="amendmentDate" /></td>

                                        </tr>

                                    </tr>
                                    <tr>
                                        <th>Total List</th>
                                        <tr>
                                            <td><input type="text" className='form-control form-control-sm' id="formatNoId" name="formatNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amendmentNoId" name="amendmentNo" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="amendmentDateId" name="amendmentDate" /></td>

                                        </tr>
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

                        }}
                        elevation={12}
                    >

                        <div className='row'>
                            <table className='table table-sm table table-bordered table-responsive align-middle' >
                                <tbody>

                                    <tr>
                                        <th>Certificate Prefix</th>
                                        <tr>
                                            <td><input type="text" className='form-control form-control-sm' id="certificatePrefixId" name="certificatePrefix" /></td>
                                        </tr>
                                    </tr>
                                    <tr>
                                        <th>Defined Temparature</th>
                                        <tr>
                                            <td><input type="text" className='form-control form-control-sm' id="definedTemparatureId" name="definedTemparature" /></td>
                                        </tr>
                                    </tr>
                                    <tr>
                                        <th>Defined Humidity</th>
                                        <tr>
                                            <td><input type="text" className='form-control form-control-sm' id="definedTemparatureId" name="definedTemparature" /></td>
                                        </tr>
                                    </tr>



                                </tbody>
                            </table>


                        </div>
                        </Paper>
                </form>
            </Container>

        </div>
    )
}

export default FormatNumber