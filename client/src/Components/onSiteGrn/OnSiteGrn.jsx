import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Add, Close, Delete } from '@mui/icons-material';

const OnSiteGrn = () => {

    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [errorhandler, setErrorHandler] = useState({})

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")





    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>
                    <Container maxWidth="lg" sx={{ mb: 2 }}>

                        <div className='row'>
                        <h3 className='text-center mb-2'>OnSite GRN</h3>

                            <div className='col'>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 1,

                                    }}
                                    elevation={12}
                                >
                                    <div className='col d-flex mb-2'>
                                        <div className=" col-6 me-2">

                                            <TextField label="Party Ref No"
                                                id="grnPartyRefNoId"
                                                defaultValue=""

                                                //  sx={{ width: "100%" }}
                                                size="small"
                                                fullWidth

                                                name="grnPartyRefNo" />
                                        </div>
                                        <div className="col-6">

                                            <DatePicker

                                                fullWidth
                                                id="grnPartyRefDateId"
                                                name="grnPartyRefDate"


                                                label="Party Ref Date"
                                                //onChange={handleGrnChange}


                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD-MM-YYYY" />



                                        </div>


                                    </div>
                                    <div className='row'>
                                        <div className='col d-flex mb-2'>
                                            <div className=" col-6 me-2">

                                                <TextField label="Party Name"
                                                    id="grnPartyNameId"
                                                    select
                                                    //  value={grnData.grnPartyName}

                                                    //   onChange={(e) => setPartyData(e.target.value)}

                                                    //  sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth>

                                                   
                                                </TextField>
                                            </div>
                                            <div className="col-6">

                                                <TextField label="Party code"
                                                    id="grnPartyCodeId"
                                                    defaultValue=""

                                                    // sx={{ width: "100%" }}
                                                    size="small"


                                                    fullWidth
                                                    name="grnPartyCode" />

                                            </div>


                                        </div>

                                    </div>
                                    <div className='row '>
                                        <div className="col-12">

                                            <TextField label="PartyAddress"
                                                id="grnPartyAddressId"
                                                defaultValue=""
                                                size="small"


                                                sx={{ width: "101%" }}
                                                name="grnPartyAddress" />

                                        </div>
                                    </div>
                                </Paper>

                            </div>

                            <div className='col'>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 1,

                                    }}
                                    elevation={12}
                                >

                                    <div className='col d-flex mb-2'>
                                        <div className=" col-6 me-2">

                                            <TextField
                                                label="GRN NO"
                                                id="grnNoId"
                                                defaultValue=""

                                                size="small"
                                               // onChange={handleGrnChange}
                                                fullWidth
                                                name="grnNo"
                                            />
                                        </div>
                                        <div className="col-6">



                                            <DatePicker

                                                fullWidth
                                                id="grnDateId"
                                                name="grnDate"
                                                
                                                label="GRN Date"
                                                //onChange={handleGrnChange}


                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD-MM-YYYY" />



                                        </div>


                                    </div>
                                    <div className='row '>
                                        <div className='mb-5'>
                                            <TextField label="Common Remarks"
                                                id="grnCommonRemarksId"

                                                defaultValue=""
                                               
                                                fullWidth
                                                size="small"
                                                name="grnCommonRemarks"
                                            >
                                            </TextField>
                                        </div>
                                    </div>
                                </Paper>
                            </div>
                        </div>
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
                                <div className='col d-flex'>
                                    <div className='col me-2'>
                                        <TextField size='small' fullWidth variant='outlined' defaultValue="all" id="grnListId" select label="Item List" name='grnList'>
                                            <MenuItem value="all">All</MenuItem>
                                           

                                        </TextField>
                                    </div>
                                    <div className='col'>
                                        <TextField label="Imte No"
                                            id="grnImteNoId"
                                            select
                                            defaultValue="all"
                                            fullWidth
                                            size="small"
                                            // disabled={itemAddDetails.itemListNames === ""}
                                            
                                            name="grnImteNo" >
                                            <MenuItem value="all">All</MenuItem>
                                            

                                        </TextField>
                                    </div>
                                </div>
                                <div className=' col d-flex justify-content-end'>
                                    <div className='me-2 '>
                                        <Button startIcon={<Add />}  size='small' sx={{ minWidth: "130px" }} variant='contained'>Add Item</Button>
                                    </div>

                                </div>

                            </div>

                            <div className='row g-2 '>
                                <div className='col d-flex'>
                                    <div className="col-2 me-2">

                                        <DatePicker
                                            fullWidth
                                            id="calDateId"
                                            name="calDate"
                                            label="Cal Date"
                                            //sx={{ width: "100%" }}
                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY" />

                                    </div>
                                    <div className="col-2 me-2">

                                        <DatePicker
                                            fullWidth
                                            id="nextCalDateId"
                                            name="nextCalDate"
                                            label="Next Cal Date"
                                            // sx={{ width: "100%" }}
                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY" />

                                    </div>
                                    <div className='col me-2'>
                                        <TextField size='small' fullWidth variant='outlined' id="certificateStatusId" select label="Certificate Status" name='certificateStatus'>
                                            <MenuItem value="received">Received</MenuItem>
                                            <MenuItem value="notreceived">Not Received</MenuItem>

                                        </TextField>
                                    </div>
                                    <div className="col me-2">

                                        <TextField label="CertificateNo"
                                            id="certificateNoId"
                                            defaultValue=""
                                            size="small"
                                            sx={{ width: "101%" }}
                                            name="certificateNo" />

                                    </div>
                                    <div className='col me-2'>
                                        <TextField fullWidth label="Uncertainity" variant='outlined' size='small' name='itemUncertainity' />

                                    </div>

                                    <div className='me-2' >
                                        <label className='itemlistloade'>
                                            <input className="form-control itemlistdownload" type="file" id="upload" />Upload Certificate</label>
                                    </div>
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
                            <div className='row'>
                                <h6 className='text-center'>Calibration Data</h6>
                                <table className='table table-sm table-bordered table-responsive text-center align-middle'>
                                    <tbody>
                                        <tr>
                                            <th>Parameter</th>
                                            <th>Range/Size</th>
                                            <th>Unit</th>
                                            <th>Min</th>
                                            <th>Max</th>
                                            <th>Wear Limit</th>
                                            <th>Observed Size/Observed Error</th>
                                            <th>Unit</th>
                                            <th>Status</th>
                                        </tr>
                                        <tr>
                                            <td><input type="text" className='form-control form-control-sm' id="parameterId" name="parameter" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="rangeSizeId" name="rangeSize" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="unitId" name="unit" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="minId" name="min" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="maxId" name="max" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="wearLimitId" name="wearLimit" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="observedSizeId" name="observedSize" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="unitId" name="unit" /></td>
                                            <td><input type="text" className='form-control form-control-sm' id="statusId" name="status" /></td>

                                        </tr>
                                    </tbody>

                                </table>

                            </div>

                            <Dialog
                                open={confirmSubmit}
                                onClose={(e, reason) => {
                                    console.log(reason)
                                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                                        setConfirmSubmit(false)
                                    }
                                }}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Are you sure to submit ?
                                </DialogTitle>

                                <DialogActions className='d-flex justify-content-center'>
                                    <Button >Cancel</Button>
                                    <Button  autoFocus>
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={3000}
                                onClose={() => setTimeout(() => {
                                    setSnackBarOpen(false)
                                }, 3000)}>
                                <Alert onClose={() => setSnackBarOpen(false)} variant='filled' severity="success" sx={{ width: '100%' }}>
                                    {alertMessage}
                                </Alert>
                            </Snackbar>


                            <div className='row'>
                                <div className=' col d-flex '>


                                    <div className='col-4 me-2'>
                                        <TextField size='small' fullWidth variant='outlined' id="calibrationStatus" select label="Calibration Status" name='calibrationStatus'>
                                            <MenuItem value="Active">Active</MenuItem>
                                            <MenuItem value="InActive">InActive</MenuItem>

                                        </TextField>
                                    </div>

                                </div>


                            </div>
                        </Paper>




                    </Container>
                </form>
            </LocalizationProvider>

        </div>
    )
}

export default OnSiteGrn