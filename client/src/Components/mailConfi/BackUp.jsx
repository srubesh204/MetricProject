import React from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, Chip } from '@mui/material';
import { Add, Close, CloudUpload, Delete, Done, Edit, Receipt } from '@mui/icons-material';
import styled from '@emotion/styled';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Card from '@mui/material/Card';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const BackUp = () => {

    {/* const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });*/}
    return (
        <div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
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

                          
                            <div className=' col d-flex justify-content-end mb-2 mt-2'>
                                <div className=''>
                                    <Button helperText="Hello" component="label" fullWidth variant="contained" startIcon={<CloudUpload />} >
                                        Browse

                                    </Button>
                                </div>

                            </div>

                            <div className='row g-2 mb-2 '>
                                <div className='col'>
                                    <TextField label="Data Base Path"
                                        id="dbPathId"
                                        defaultValue=""
                                        size="small"
                                        sx={{ width: "100%" }}
                                        name="dbPath" />
                                </div>

                            </div>


                            <div className='row g-2  mb-2'>
                                <div className="col">
                                    <DatePicker
                                        fullWidth
                                        id="dateId"
                                        name="date"
                                        label="Date"

                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                        format="DD-MM-YYYY"

                                    />
                                </div>
                                <div className="col">
                                    <TextField label="Time"
                                        id="timeId"
                                        defaultValue=""
                                        size="small"
                                        sx={{ width: "100%" }}
                                        name="time" />
                                </div>

                            </div>
                            <div className='row mb-2 '>
                                <div>
                                    <TextField label="Start Backup"
                                        id="startBackupId"
                                        defaultValue=""
                                        size="small"
                                        sx={{ width: "100%" }}
                                        name="startBackup" />
                                </div>

                            </div>
                            <div className=' col d-flex justify-content-end'>
                                <div className='me-2 '>
                                    <Button size='small ' color='error' sx={{ minWidth: "130px" }} variant='contained'>Close</Button>
                                </div>
                            </div>
                        </Paper>



                    </form>
                </Container>
            </LocalizationProvider>


        </div>
    )
}

export default BackUp