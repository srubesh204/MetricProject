import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, Fab, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, Chip } from '@mui/material';
import { Add, Close, Delete, CloudUpload, Edit, Done } from '@mui/icons-material';
import { Remove, HighlightOffRounded } from '@mui/icons-material';

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
        outMailServer: "",



    }
    const [isEditable, setIsEditable] = useState(false)
    const [mailData, setMailData] = useState({
        mailId: "",
        mailPassword: "",
        portNumber: "",
        inMailServer: "",
        outMailServer: "",
        mailSubjects: [],
        mailBodies: [],


    })
    console.log(mailData)

    const [mailDetails, setMailDetails] = useState({
        mailContent: "",
        mailSubject: ""
    })




    const mailFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/mailConfig/getMailConfigById/1`
            );
            const mail = response.data.result
            console.log(mail)
            setMailData((prev) => ({
                ...prev,
                mailId: mail.mailId,
                mailPassword: mail.mailPassword,
                portNumber: mail.portNumber,
                inMailServer: mail.inMailServer,
                outMailServer: mail.outMailServer,
                mailSubjects: mail.mailSubjects,
                mailBodies: mail.mailBodies

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
    const handleMailChanges = (e) => {
        const { name, value } = e.target;
        setMailDetails((prev) => ({ ...prev, [name]: value }));


    }

    const updateMailData = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/mailConfig/updateMailConfig/1`, mailData

            );
            console.log(response.data)
            mailFetchData();
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


    // const addMailDataRow = () => {
    //     setMailData((prevMailData) => ({
    //         ...prevMailData,
    //         mailSubjects: [...prevMailData.mailSubjects, { subject: "" }]
    //     }))
    // }

    const addSubjectDataRow = () => {
        if (mailDetails.length !== 0) {
            setMailData((prev) => ({ ...prev, mailSubjects: [...prev.mailSubjects, mailDetails.mailSubject] }))
        }
    }


    const addBodyRow = () => {
        if (mailDetails.length !== 0) {
            setMailData((prev) => ({ ...prev, mailBodies: [...prev.mailBodies, mailDetails.mailContent] }))
        }
    }

    const deleteMailRow = (index) => {
        setMailData((prev) => {
            const AC = [...prev.mailSubjects]
            AC.splice(index, 1);
            return {
                ...prev, mailSubjects: AC,
            };
        })
    };





    const deleteMailContentRow = (index) => {
        setMailData((prev) => {
            const AC = [...prev.mailBodies]
            AC.splice(index, 1);
            return {
                ...prev, mailBodies: AC,
            };
        })
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
                        <div className='row g-2 mb-2'>
                            <h6 className='text-center mb-2'>Mail Details</h6>

                            <div className='row'>
                                <div className='col d-flex justify-content-end'>
                                    <Button onClick={() => setIsEditable(true)}><Edit color='success' /></Button>
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
                                    fullWidth
                                    name="outMailServer" />

                            </div>

                            {isEditable && <div className=' col d-flex justify-content-end '>
                                <div className='me-2'>
                                    <Button size='small' sx={{ minWidth: "130px" }} variant='contained' onClick={() => setOpenModal(true)}>Modify</Button>
                                </div>
                                <div className='me-2'>
                                    <Button size='small' color='error' sx={{ minWidth: "130px" }} variant='contained' onClick={() => setIsEditable(false)}>Cancel</Button>
                                </div>


                            </div>}



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
                        <div className="row g-2 mb-2">
                            <div className='col mb-2'>
                                {/* <TextField label="Subject"
                                    id="mailSubjectId"
                                    maxRows={10}
                                    rows={4}
                                    size="small"
                                    // disabled={!isEditable}
                                    onChange={handleMailChanges}
                                    value={mailDetails.mailSubject}
                                    sx={{ width: "100%", height: "100%" }}
                                    name="mailSubject" /> */}


                                <TextField
                                    size='small'
                                    multiline
                                    //maxRows={10}
                                    rows={2}
                                    onChange={handleMailChanges}
                                    value={mailDetails.mailSubject}

                                    id="mailSubjectId"
                                    name="mailSubject"
                                    label="Subject"
                                    type="text"
                                    fullWidth
                                //variant="standard"
                                />
                                <div className='text-end mt-2' >
                                    <Button size='small' color='warning' disabled={!isEditable} onClick={() => addSubjectDataRow(true)} variant='contained'>Add </Button>
                                </div>
                            </div>
                            <div className='col'>
                                <TextField label="Mail content"
                                    id="mailContentId"
                                    multiline
                                    rows={2}
                                    size="small"
                                    // disabled={!isEditable}
                                    onChange={handleMailChanges}
                                    value={mailDetails.mailContent}
                                    fullWidth
                                    name="mailContent" />
                                <div className='text-end mt-2'>
                                    <Button size='small' color='warning' onClick={() => addBodyRow(true)} variant='contained'>Add </Button>
                                </div>
                            </div>




                        </div>

                        {/* <div className='row mb-2'>
                            <div className='col'>
                                <TextField label="Mail content"
                                    id="mailContentId"
                                    size="small"
                                    // disabled={!isEditable}
                                    onChange={handleMailChanges}
                                    value={mailDetails.mailContent}
                                    sx={{ width: "100%" }}
                                    name="mailContent" />
                            </div>
                            <div className='col d-flex justify-content-end'>

                                <Button size='small' color='warning' sx={{ minWidth: "130px" }} onClick={() => addBodyRow(true)} variant='contained'>Add </Button>
                            </div>
                        </div> */}


                        <div className='row' >

                            <div className='col-4'>
                                <table className='table table-sm table-bordered table-responsive  align-middle'>
                                    <tbody>
                                        <tr style={{ fontSize: "14px" }}>
                                            <th>Sr.No</th>
                                            <th width={"25%"}>Subject</th>
                                            <th>Delete</th>

                                            {/* <th width={"10%"}> <Fab size='small' color="primary" aria-label="add" onClick={() => addVendorDataRow()}>
                                            <Add />
                                        </Fab></th> */}
                                        </tr>


                                        {mailData.mailSubjects ? mailData.mailSubjects.map((item, index) => (
                                            <tr key={index} style={{fontSize: "12px",textAlign:"left"}}>
                                                <td  style={{ width: "2%" }}>{index + 1}</td>
                                                <td>{item}</td>
                                                
                                                <th style={{ width: "2%" }}><Button size='small' color="error" aria-label="add" onClick={() => deleteMailRow(index)}>
                                                    <Delete />
                                                </Button></td>

                                            </tr>
                                        )) : <tr></tr>}
                                    </tbody>
                                </table>

                            </div>
                            <div className='col'>
                                <table className='table table-sm table-bordered table-responsive  align-middle'>
                                    <tbody>
                                        <tr style={{ fontSize: "14px" }} >
                                            <th>Sr.No</th>
                                            <th width={"25%"}>Content</th>
                                            <th>Delete</th>


                                        </tr>
                                        {mailData.mailBodies ? mailData.mailBodies.map((item, index) => (
                                            <tr  key={index} style={{fontSize: "12px",textAlign:"left"}}>
                                                <td style={{ width: "2%" }}>{index + 1}</td>
                                                <td >{item}</td>

                                                <td style={{ width: "2%" }}><Button size='small' color="error" aria-label="add" onClick={() => deleteMailContentRow(index)}>
                                                    <Delete />
                                                </Button></td>


                                            </tr>
                                        )) : <tr></tr>}


                                    </tbody>
                                </table>

                            </div>


                        </div>
                    </Paper>







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





                </form>
            </Container>


        </div>
    )
}

export default MailConfig