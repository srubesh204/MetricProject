import React from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, Chip } from '@mui/material';
import { Add, Close, Delete, CloudUpload, Edit, Done } from '@mui/icons-material';


const MailConfi = () => {
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
                        <div className='row g-2'>
                            <h6 className='text-center mb-2'>Mail Configuration</h6>
                            <div className='col'>
                                <TextField label="Mail Id"
                                    id="mailIdId"
                                    defaultValue=""
                                    size="small"
                                    sx={{ width: "100%" }}
                                    name="mailId" />

                            </div>
                            <div className='col'>
                                <TextField label="PassWord"
                                    id="passWordId"
                                    defaultValue=""
                                    size="small"
                                    sx={{ width: "100%" }}
                                    name="passWord" />

                            </div>
                            <div className='col'>
                                <TextField label="Part Number"
                                    id="portNumberId"
                                    defaultValue=""
                                    size="small"
                                    sx={{ width: "100%" }}
                                    name="portNumber" />

                            </div>

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
                        <div className='row g-2 mb-2'>
                            <div className='col'>
                                <TextField label="Incoming Mail Server"
                                    id="incomingMailServerId"
                                    defaultValue=""
                                    size="small"
                                    sx={{ width: "100%" }}
                                    name="incomingMailServer" />

                            </div>
                            <div className='col'>
                                <TextField label="outGoing Mail Server"
                                    id="outGoingMailServerId"
                                    defaultValue=""
                                    size="small"
                                    sx={{ width: "100%" }}
                                    name="outGoingMailServer" />

                            </div>


                        </div>
                  

                        <div className=' col d-flex justify-content-end'>
                            <div className='me-2 '>
                                <Button size='small' sx={{ minWidth: "130px" }} variant='contained'>Modify</Button>
                            </div>
                            <div className='me-2 '>
                                <Button size='small' color='success' sx={{ minWidth: "130px" }} variant='contained'>Save</Button>
                            </div>
                            <div className='me-2 '>
                                <Button size='small' color='error' sx={{ minWidth: "130px" }} variant='contained'>Cencel</Button>
                            </div>


                        </div>
                        </Paper>

                </form>
            </Container>


        </div>
    )
}

export default MailConfi