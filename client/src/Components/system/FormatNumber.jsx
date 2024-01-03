import React, { createContext, useEffect, useState, useContext } from 'react'
import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import { Add, Close, CloudUpload, Delete, Done, Edit, Receipt } from '@mui/icons-material';
import axios from 'axios'

const FormatNumber = () => {

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

    const initialFormatData = {
        fDc: {
            frNo: "",
            amNo: "",
            amDate: "",
        },
        fGrn: {
            frNo: "",
            amNo: "",
            amDate: "",
        },
        fCertificate: {
            frNo: "",
            amNo: "",
            amDate: "",
        },
        fHistoryCard: {
            frNo: "",
            amNo: "",
            amDate: "",
        },
        fTotalList: {
            frNo: "",
            amNo: "",
            amDate: "",
        },
        fCalDueDate: {
            frNo: "",
            amNo: "",
            amDate: "",
        },
        fCertificatePrefix: "",
        fDeTemperature: "",
        fDeHumidity: "",
    }
    const [isEditable, setIsEditable] = useState(false)
    const [formatData, setFormatData] = useState({
        fDc: {
            frNo: "",
            amNo: "",
            amDate: "",
        },
        fGrn: {
            frNo: "",
            amNo: "",
            amDate: "",
        },
        fCertificate: {
            frNo: "",
            amNo: "",
            amDate: "",
        },
        fHistoryCard: {
            frNo: "",
            amNo: "",
            amDate: "",
        },
        fTotalList: {
            frNo: "",
            amNo: "",
            amDate: "",
        },
        fCalDueDate: {
            frNo: "",
            amNo: "",
            amDate: "",
        },
        fCertificatePrefix: "",
        fDeTemperature: "",
        fDeHumidity: "",
    });

    const handleFormatChange = (e) => {
        const { name, value } = e.target;
        setFormatData((prev) => ({ ...prev, [name]: value }));


    }

    const handleInputChange = (e, sub) => {
        const { name, value } = e.target
        setFormatData((prev) => (
            {
                ...prev, [sub]: {
                    ...prev[sub], [name]: value
                }
            }
        ))
    };

    console.log(formatData)


    const formatFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/formatNo/getFormatNoById/6595064f151cbe07fdd7fab7`
            );
            const format = response.data.result
            console.log(format)
            setFormatData((prev) => ({
                ...prev,
                fDc: {
                    ...prev.fDc,
                    frNo: format.fDc.frNo,
                    amNo: format.fDc.amNo,
                    amDate: format.fDc.amDate,
                },
                fGrn: {
                    ...prev.fGrn,
                    frNo: format.fGrn.frNo,
                    amNo: format.fGrn.amNo,
                    amDate: format.fGrn.amDate,
                },
                fCertificate: {
                    ...prev.fCertificate,
                    frNo: format.fCertificate.frNo,
                    amNo: format.fCertificate.amNo,
                    amDate: format.fCertificate.amDate,
                },
                fHistoryCard: {
                    ...prev.fHistoryCard,
                    frNo: format.fHistoryCard.frNo,
                    amNo: format.fHistoryCard.amNo,
                    amDate: format.fHistoryCard.amDate,
                },
                fTotalList: {
                    ...prev.fTotalList,
                    frNo: format.fTotalList.frNo,
                    amNo: format.fTotalList.amNo,
                    amDate: format.fTotalList.amDate,
                },
                fCalDueDate: {
                    ...prev.fCalDueDate,
                    frNo: format.fCalDueDate.frNo,
                    amNo: formatData.fCalDueDate.amNo,
                    amDate: formatData.fCalDueDate.amDate,
                  
                },
                fCertificatePrefix: format.fCertificatePrefix,
                fDeTemperature: format.fDeTemperature,
                fDeHumidity: format.fDeHumidity,
            }));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        formatFetchData();
    }, []);


    const updateMailData = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/formatNo/updateFormatNo/6595064f151cbe07fdd7fab7`, formatData

            );
            console.log(response.data)
            formatFetchData()
            setFormatData(initialFormatData);
            setMailSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            setIsEditable(false)
            console.log(response);
        } catch (err) {
            console.log(err);
            setMailSnackBar(true)
            if (err.response && err.response.status === 400) {
                //  Handle validation errors
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



            <Container maxWidth="md" sx={{ mt: 4 }}>
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





                        <div className="col d-flex justify-content-end">
                            <Button onClick={() => setIsEditable(true)}><Edit color='success' /></Button>
                        </div>
                        <table className='table table-sm table table-bordered table-responsive text-center align-middle border border-black' disabled={!isEditable} >
                            <tbody>
                                <tr  >
                                    <th style={{ width: "25%" }}>Report Name</th>
                                    <th>Format No</th>
                                    <th>Amendment No</th>
                                    <th>Amendment Date</th>
                                </tr>

                                <tr>
                                    <th>DC</th>


                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="frNoId" name="frNo" value={formatData.fDc.frNo} onChange={(e) => handleInputChange(e, 'fDc')} /></td>
                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="amNoId" name="amNo" value={formatData.fDc.amNo} onChange={(e) => handleInputChange(e, 'fDc')} /></td>
                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="amDateId" name="amDate" value={formatData.fDc.amDate} onChange={(e) => handleInputChange(e, 'fDc')} /></td>


                                </tr>



                                <tr>
                                    <th>GRN</th>

                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="frNoId" value={formatData.fGrn.frNo} onChange={(e) => handleInputChange(e, 'fGrn')} name="frNo" /></td>
                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="amNoId" value={formatData.fGrn.amNo} onChange={(e) => handleInputChange(e, 'fGrn')} name="amNo" /></td>
                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="amDateId" value={formatData.fGrn.amDate} onChange={(e) => handleInputChange(e, 'fGrn')} name="amDate" /></td>



                                </tr>
                                <tr>
                                    <th>Certificate</th>

                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="frNoId" value={formatData.fCertificate.frNo} onChange={(e) => handleInputChange(e, 'fCertificate')} name="frNo" /></td>
                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="amNoId" value={formatData.fCertificate.amNo} onChange={(e) => handleInputChange(e, 'fCertificate')} name="amNo" /></td>
                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="amDateId" value={formatData.fCertificate.amDate} onChange={(e) => handleInputChange(e, 'fCertificate')} name="amDate" /></td>


                                </tr>
                                <tr>
                                    <th>History Card</th>

                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="frNoId" value={formatData.fHistoryCard.frNo} onChange={(e) => handleInputChange(e, 'fHistoryCard')} name="frNo" /></td>
                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="amNoId" value={formatData.fHistoryCard.amNo} onChange={(e) => handleInputChange(e, 'fHistoryCard')} name="amNo" /></td>
                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="amDateId" value={formatData.fHistoryCard.amDate} onChange={(e) => handleInputChange(e, 'fHistoryCard')} name="amDate" /></td>



                                </tr>
                                <tr>
                                    <th>Total List</th>

                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="frNoId" value={formatData.fTotalList.frNo} onChange={(e) => handleInputChange(e, 'fTotalList')} name="frNo" /></td>
                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="amNoId" value={formatData.fTotalList.amNo} onChange={(e) => handleInputChange(e, 'fTotalList')} name="amNo" /></td>
                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="amDateId" value={formatData.fTotalList.amDate} onChange={(e) => handleInputChange(e, 'fTotalList')} name="amDate" /></td>


                                </tr>
                                <tr>
                                    <th>Cal Due Report</th>

                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} value={formatData.fCalDueDate.frNo} id="frNoId" onChange={(e) => handleInputChange(e, 'fCalDueDate')} name="frNo" /></td>
                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} value={formatData.fCalDueDate.amNo} id="amNoId" onChange={(e) => handleInputChange(e, 'fCalDueDate')} name="amNo" /></td>
                                    <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} value={formatData.fCalDueDate.amDate} id="amDateId" onChange={(e) => handleInputChange(e, 'fCalDueDate')} name="amDate" /></td>


                                </tr>



                            </tbody>
                        </table>





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

                        <div className="row">

                            <div className="col-md">

                                <table className=' table table-sm table table-bordered table-responsive text-center align-middle border border-black' disabled={!isEditable} >
                                    <tbody>

                                        <tr>
                                            <th style={{ width: "50%" }}>Certificate Prefix</th>

                                            <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="fCertificatePrefixId" value={formatData.fCertificatePrefix} name="fCertificatePrefix" onChange={handleFormatChange} /></td>

                                        </tr>
                                        <tr>
                                            <th>Defined Temparature</th>

                                            <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="fDeTemperatureId" value={formatData.fDeTemperature} name="fDeTemperature" onChange={handleFormatChange} /></td>

                                        </tr>
                                        <tr>
                                            <th>Defined Humidity</th>

                                            <td><input type="text" className='form-control form-control-sm' disabled={!isEditable} id="fDeHumidityId" value={formatData.fDeHumidity} name="fDeHumidity" onChange={handleFormatChange} /></td>

                                        </tr>



                                    </tbody>
                                </table>


                            </div>
                            {isEditable && <div className='col-md d-flex justify-content-end'>
                                <div className='me-2 '>
                                    <Button size='small' variant='contained' onClick={() => setOpenModal(true)} >Modify</Button>
                                </div>
                                <div>
                                    <Button size='small' color='error' variant='contained' onClick={() => setIsEditable(false)} >Cancel</Button>
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
                                <Alert variant="filled" onClose={handleSnackClose} severity={errorHandler.code} sx={{ width: '25%' }}>
                                    {errorHandler.message}
                                </Alert>
                            </Snackbar>

                        </div>




                    </Paper>
                </form>
            </Container>

        </div>
    )
}

export default FormatNumber