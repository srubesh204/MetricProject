import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { HomeContent } from '../Home';
import { Box, Checkbox, Chip, CircularProgress, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';

import axios from 'axios'



const HomeMail = () => {

    const mailDatas = useContext(HomeContent)
    const { mailOpen, setMailOpen, selectedRows, mailIds, setErrorHandler, setSnackBarOpen, vendors } = mailDatas

    console.log(selectedRows)

    useEffect(() => {
        const data = selectedRows.map((item, index) => ({
            itemId: item._id,
            itemIMTENo: item.itemIMTENo,
            itemAddMasterName: item.itemAddMasterName,
            itemRangeSize: item.itemRangeSize,
            itemRangeSizeUnit: item.itemRangeSizeUnit,
            itemCalDate: item.itemCalDate,
            itemDueDate: item.itemDueDate,
            itemCurrentLocation: item.itemCurrentLocation,
            itemLastLocation: item.itemLastLocation,
            itemCalibrationSource: item.itemCalibrationSource,
            itemSupplier: item.itemSupplier
        }))
        setMailDetails(prev => ({ ...prev, selectedItems: data }))
    }, [selectedRows])

    const initialMailDetails = {
        to: "",
        subject: "",
        mailBody: "",
        cc1: [],
        cc2: []

    }


    const [mailDetails, setMailDetails] = useState({
        to: "",
        subject: "",
        mailBody: "",
        cc: [],
        selectedItems: selectedRows.map((item, index) => ({
            itemId: item._id,
            itemIMTENo: item.itemIMTENo,
            itemAddMasterName: item.itemAddMasterName,
            itemRangeSize: item.itemRangeSize,
            itemRangeSizeUnit: item.itemRangeSizeUnit,
            itemCalDate: item.itemCalDate,
            itemDueDate: item.itemDueDate,
            itemCurrentLocation: item.itemCurrentLocation,
            itemLastLocation: item.itemLastLocation,
            itemCalibrationSource: item.itemCalibrationSource,
            itemSupplier: item.itemSupplier
        }))
    })

    const handleMailChange = (e) => {
        const { name, value } = e.target;
        if (name === "cc") {
            setMailDetails((prev) => ({ ...prev, [name]: typeof value === 'string' ? value.split(',') : value }));
        } else {
            setMailDetails((prev) => ({ ...prev, [name]: value }));
        }

    }

    console.log(mailDetails)
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_PORT}/mail/sendMail`, mailDetails)
            console.log(response)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
            //setMailDetails(initialMailDetails)
            setSnackBarOpen(true)
            setErrorHandler({ status: "1", message: "Mail sent successfully", code: "success" })
            //setMailOpen(false)
        }

    }
    console.log(vendors)

    return (
        <Dialog
            open={mailOpen}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setMailOpen(false)
                }
            }}
            maxWidth="md"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Send Mail
            </DialogTitle>
            <DialogContent >
                <form className='row g-2 my-2' onSubmit={handleSubmit}>
                    <div className="col-6">


                        <TextField
                            size='small'
                            autoFocus
                            required

                            id="toId"
                            name="to"
                            label="To"
                            type="email"
                            fullWidth
                            onChange={handleMailChange}
                        //variant="standard"
                        />
                    </div>
                    <div className="col-6 ">
                        <TextField
                            size='small'
                            required

                            id="subjectId"
                            name="subject"
                            label="Subject"
                            type="text"
                            fullWidth
                            onChange={handleMailChange}
                        //variant="standard"
                        />
                    </div>
                    <div >
                        <TextField
                            size='small'
                            multiline
                            maxRows={10}
                            rows={4}
                            onChange={handleMailChange}

                            id="mailBodyId"
                            name="mailBody"
                            label="Body"
                            type="text"
                            fullWidth
                        //variant="standard"
                        />
                    </div>
                    <div className="col-12 ">
                        <FormControl size='small' component="div" fullWidth>
                            <InputLabel id="ccId">CC.</InputLabel>
                            <Select
                                labelId="ccId"
                                multiple
                                name="cc1"  // Use a different name for the first Select
                                value={mailDetails.cc2}
                                onChange={handleMailChange}
                                input={<OutlinedInput fullWidth label="CC." />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                fullWidth
                            >
                                {vendors.vendorContacts.map((venMail, index) => (
                                    <MenuItem key={index} value={venMail.mailId}>
                                        <Checkbox checked={mailDetails.cc2.indexOf(venMail.mailId) > -1} />
                                        <ListItemText primary={venMail.firstName + " - " + venMail.mailId} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size='small' component="div" fullWidth>
                            <InputLabel id="ccId">CC.</InputLabel>
                            <Select
                                labelId="ccId"
                                multiple
                                name="cc2"  // Use a different name for the second Select
                                value={mailDetails.cc1}
                                onChange={handleMailChange}
                                input={<OutlinedInput fullWidth label="CC." />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                fullWidth
                            >
                                {mailIds.map((mail, index) => (
                                    <MenuItem key={index} value={mail.mailId}>
                                        <Checkbox checked={mailDetails.cc1.indexOf(mail.mailId) > -1} />
                                        <ListItemText primary={mail.firstName + " - " + mail.mailId} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                </form>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => setMailOpen(false)}>Cancel</Button>
                <Button
                    size="small"
                    onClick={handleSubmit}
                    endIcon={loading ?
                        <CircularProgress

                            sx={{
                                color: "inherit",
                            }}
                            variant="indeterminate"
                            size={20}


                        />
                        : <Send />
                    }
                    variant="contained"
                    disabled={loading}
                >
                    <span>Send</span>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default HomeMail