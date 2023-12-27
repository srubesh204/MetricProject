import React from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, Chip } from '@mui/material';


const MailConfi = () => {
    return (
        <div>


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
                        <TextField label="Pass Word"
                            id="passWordId"
                            defaultValue=""
                            size="small"
                            sx={{ width: "100%" }}
                            name="passWord" />

                    </div>
                    <div className='col'>
                        <TextField label="Part Number"
                            id="partNumberId"
                            defaultValue=""
                            size="small"
                            sx={{ width: "100%" }}
                            name="partNumber" />

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
                <div className='row g-2'>
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
                </Paper>


        </div>
    )
}

export default MailConfi