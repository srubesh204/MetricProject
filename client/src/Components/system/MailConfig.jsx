import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, Chip } from '@mui/material';
import { Add, Close, Delete, CloudUpload, Edit, Done } from '@mui/icons-material';
import axios from 'axios'


const MailConfig = () => {



    const [errorHandler, setErrorHandler] = useState({})

    const [mailSnackBar, setMailSnackBar] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const handleSnackClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }

        setMailSnackBar(false);
    }
    const initialMailData = {
        mailId: "",
        mailPassword: "",
        portNumber: "",
        inMailServer: "",
        outMailServer: ""

    }
    const [isEditable, setIsEditable] = useState(false)
    const [mailData, setMailData] = useState({
        mailId: "",
        mailPassword: "",
        portNumber: "",
        inMailServer: "",
        outMailServer: ""

    })
    console.log(mailData)

    // const[mailDetails,setMailDetails]= useState[]


   
    const mailFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/mailConfig/getMailConfigById/658bef57308988e77396ef64`
            );
            const mail = response.data.result
            console.log(mail)
            setMailData((prev) => ({
                ...prev,
                mailId: mail.mailId,
                mailPassword: mail.mailPassword,
                portNumber: mail.portNumber,
                inMailServer: mail.inMailServer,
                outMailServer: mail.outMailServer
            }));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        mailFetchData();
    }, []);



    const handleMailChange = (e) => {
        const { name, value } = e.target;
        setMailData((prev) => ({ ...prev, [name]: value }));


    }

    const updateMailData = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/mailConfig/updateMailConfig/658bef57308988e77396ef64`, mailData

            );
            console.log(response.data)
            mailFetchData();
            setMailData(initialMailData);
            setMailSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            setIsEditable(false)
            console.log(response);
        } catch (err) {
            console.log(err);
            setMailSnackBar(true)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' / ');

                console.log(errorMessages400);
                console.log(err)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                // const errorData500 = err.response.data.error;
                // const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(err)
                setErrorHandler({ status: 0, message: err.response.data.error, code: "error" });
            } else {
                console.log(err)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }

        }
    };









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
                            <h6 className='text-center mb-2'>Mail Details</h6>

                            <div className='row'>
                                <div className='col d-flex justify-content-end'>
                                    <Button onClick={()=> setIsEditable(true)}><Edit color='success' /></Button>
                                </div>
                            </div>

                            <div className='col'>
                                <TextField label="Mail Id"
                                    id="mailIdId"
                                   
                                    size="small"
                                    disabled={!isEditable}
                                    onChange={handleMailChange}
                                    value={mailData.mailId}
                                    sx={{ width: "100%" }}
                                    name="mailId" />

                            </div>
                            <div className='col'>
                                <TextField label="PassWord"
                                    id="mailPasswordId"
                                  
                                    disabled={!isEditable}
                                    size="small"
                                    onChange={handleMailChange}
                                    value={mailData.mailPassword}
                                    sx={{ width: "100%" }}
                                    name="mailPassword" />

                            </div>
                            <div className='col'>
                                <TextField label="Port Number"
                                    id="portNumberId"
                                    
                                    size="small"
                                    disabled={!isEditable}
                                    onChange={handleMailChange}
                                    value={mailData.portNumber}
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
                                    id="inMailServerId"
                                  
                                    size="small"
                                    disabled={!isEditable}
                                    onChange={handleMailChange}
                                    value={mailData.inMailServer}
                                    sx={{ width: "100%" }}
                                    name="inMailServer" />

                            </div>
                            <div className='col'>
                                <TextField label="outGoing Mail Server"
                                    id="outMailServerId"
                                    
                                    size="small"
                                    disabled={!isEditable}
                                    onChange={handleMailChange}
                                    value={mailData.outMailServer}
                                    sx={{ width: "100%" }}
                                    name="outMailServer" />

                            </div>


                        </div>


                        {isEditable && <div className=' col d-flex justify-content-end'>
                            <div className='me-2 '>
                                <Button size='small' sx={{ minWidth: "130px" }} variant='contained' onClick={() => setOpenModal(true)}>Modify</Button>
                            </div>
                            <div className='me-2 '>
                                <Button size='small' color='error' sx={{ minWidth: "130px" }} variant='contained' onClick={()=> setIsEditable(false)}>Cancel</Button>
                            </div>


                        </div>}

                        <Dialog
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Mail update confirmation?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure to update the Mail
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                                <Button onClick={() => { updateMailData(); setOpenModal(false); }} autoFocus>
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={mailSnackBar} autoHideDuration={6000} onClose={handleSnackClose}>
                            <Alert variant="filled" onClose={handleSnackClose} severity={errorHandler.code} sx={{ width: '100%' }}>
                                {errorHandler.message}
                            </Alert>
                        </Snackbar>



                    </Paper>

                </form>
            </Container>


        </div>
    )
}

export default MailConfig