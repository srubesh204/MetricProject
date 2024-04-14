import React, { useEffect, useState } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, Chip } from '@mui/material';
import { Add, Close, CloudUpload, Delete, Done, Edit, PlayArrow, Receipt } from '@mui/icons-material';
import styled from '@emotion/styled';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Card from '@mui/material/Card';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackUp = () => {
    const [isEditable, setIsEditable] = useState(false)
    const [backUpPath, setBackUpPath] = useState("")
    const [errorHandler, setErrorHandler] = useState({})
    const [mailSnackBar, setMailSnackBar] = useState(false)
    const [loaderStatus, setLoaderStatus] = useState(false)


    const handleSnackClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }

        setMailSnackBar(false);
    }


    const backUpFetch = async () => {
        setLoaderStatus(true)
        try {
            const res = await axios.get(`${process.env.REACT_APP_PORT}/backup/getBackUpById/backId`)
            setBackUpPath(res.data.result.path)
            setLoaderStatus(false)
        } catch (err) {
            console.log(err)
            setLoaderStatus(false)
        }
    };
    useEffect(() => {
        backUpFetch();
    }, []);

    console.log(backUpPath)
    const updateBackUp = async () => {
        setLoaderStatus(true)
        try {
            const updateData = await axios.put(`${process.env.REACT_APP_PORT}/backup/updateBackUp/backId`, { path: backUpPath })
            backUpFetch();
            setIsEditable(false)
            setLoaderStatus(false)
            setMailSnackBar(true)
            setErrorHandler({ status: 1, message: "Path saved successfully", code: "success" })
        } catch (err) {
            console.log(err)
            setLoaderStatus(false)
            setMailSnackBar(true)
            setErrorHandler({ status: 0, message: "Error updating data", code: "success" })
        }
    }


    const startBackup = async () => {
        setLoaderStatus(true)
        try {
            const res = await axios.post(`${process.env.REACT_APP_PORT}/backup/backUpDb`, { backUpPath })
            console.log("success")
            setLoaderStatus(false)
            setMailSnackBar(true)
            setErrorHandler({ status: 1, message: "Data backuped successfully", code: "success" })
        } catch (err) {
            console.log(err)
            setLoaderStatus(false)
        }
    };

    const restoreBackUp = async () => {
        setLoaderStatus(true)
        try {
            const res = await axios.post(`${process.env.REACT_APP_PORT}/backup/restoreDB`, { backUpPath })
            console.log("success")
            setLoaderStatus(false)
            setMailSnackBar(true)
            setErrorHandler({ status: 1, message: "Data restored successfully", code: "success" })
            window.location.reload()
        } catch (err) {
            console.log(err)
            setLoaderStatus(false)
        }
    };

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loaderStatus}
                onClick={() => setLoaderStatus(false)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

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

                            <div className='backupHead'>
                                Database Backup
                                <span onClick={() => setIsEditable(!isEditable)}><Edit /></span>
                            </div>


                            <div className='row g-2 mb-2 '>
                                <div className='col'>
                                    <TextField label="Data Base Path"
                                        id="dbPathId"
                                        value={backUpPath}
                                        disabled={!isEditable}
                                        onChange={(e) => setBackUpPath(e.target.value)}
                                        placeholder='C:/ProgramFiles/Program/.....'
                                        size="small"
                                        fullWidth
                                        name="dbPath" />
                                </div>

                            </div>




                            <div className=' col d-flex justify-content-end buttonDiv'>
                                <div className='me-2 restore'>
                                    <Button size='small' value={backUpPath}  variant='contained' onClick={() => restoreBackUp()}>Restore</Button>
                                </div>
                                <div className='me-2 '>
                                    <Button size='small' value={backUpPath} disabled={!isEditable} variant='contained' onClick={() => updateBackUp()}>Save Path</Button>
                                </div>
                                {backUpPath && <div>
                                    <Button size='small' color='success' variant='contained' onClick={() => startBackup()}>Start Backup<PlayArrow /></Button>
                                </div>}
                            </div>
                        </Paper>



                    </form>
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={mailSnackBar} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert variant="filled" onClose={handleSnackClose} severity={errorHandler.code} fullWidth>
                            {errorHandler.message}
                        </Alert>
                    </Snackbar>
                </Container>
            </LocalizationProvider>


        </div>
    )
}

export default BackUp