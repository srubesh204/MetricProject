import React from 'react'
import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import { Add, Close, CloudUpload, Delete, Done, Edit, Receipt } from '@mui/icons-material';

const Version = () => {
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
                        <h5 className='text-center mb-2'>Software Information</h5>
                        <table className='table table-sm table table-bordered table-responsive align-middle' >
                            <tbody>

                                <tr>
                                    <th>Name</th>

                                    <tr>
                                        <td><input type="text" className='form-control form-control-sm' id="certificatePrefixId" name="certificatePrefix" /></td>

                                    </tr>
                                </tr>
                                <tr>
                                    <th>Version</th>
                                    <tr>
                                        <td><input type="text" className='form-control form-control-sm' id="definedTemparatureId" name="definedTemparature" /></td>
                                    </tr>
                                </tr>
                                <tr>
                                    <th>Released Date</th>
                                    <tr>
                                        <td><input type="text" className='form-control form-control-sm' id="definedTemparatureId" name="definedTemparature" /></td>
                                    </tr>
                                </tr>
                                <tr>
                                    <th>Current Released Version</th>
                                    <tr>
                                        <td><input type="text" className='form-control form-control-sm' id="definedTemparatureId" name="definedTemparature" /></td>
                                    </tr>
                                </tr>
                                <tr>
                                    <th>Change</th>
                                    <tr>
                                        <td><input type="text" className='form-control form-control-sm' id="definedTemparatureId" name="definedTemparature" /></td>
                                    </tr>
                                </tr>
                                <tr>
                                    <th>Added Features</th>
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

export default Version