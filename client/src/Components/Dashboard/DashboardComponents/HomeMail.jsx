import React, { Fragment, useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { HomeContent } from '../Home';
import { Box, Checkbox, Chip, CircularProgress, FormControl, InputLabel, ListItemText, ListSubheader, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import axios from 'axios'
import dayjs from 'dayjs';



const HomeMail = () => {

    const mailDatas = useContext(HomeContent)
    const { mailOpen, setMailOpen, selectedRows, mailIds, setErrorHandler, setSnackBarOpen, vendors, mailList, bccMails, emp } = mailDatas


    console.log(vendors)
    const bccMailsOnly = bccMails ? bccMails.map(emp => emp.mailId) : []
    console.log(bccMailsOnly)




    useEffect(() => {
        setMailDetails(prev => ({ ...prev, to: emp.mailId, bcc: bccMailsOnly, employee: { ...emp } }))
        const data = selectedRows.map((item, index) => ({
            itemId: item._id,
            itemPlant: item.itemPlant,
            itemIMTENo: item.itemIMTENo,
            itemAddMasterName: item.itemAddMasterName,
            itemRangeSize: item.itemRangeSize,
            itemRangeSizeUnit: item.itemRangeSizeUnit,
            itemCalDate: dayjs(item.itemCalDate).format("DD-MM-YYYY"),
            itemDueDate: dayjs(item.itemDueDate).format("DD-MM-YYYY"),
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
        departmentCc: [],
        vendorCc: [],
        employee: {}

    }


    const [mailDetails, setMailDetails] = useState({
        to: "",
        subject: "",
        mailBody: "",
        departmentCc: [],
        vendorCc: [],
        bcc: [],
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
        })),
        employee: {}
    })

    const handleMailChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)

        if (name === "vendorCc") {
            console.log(value)
        }
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
                            value={mailDetails.to}
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
                            select
                            fullWidth
                            onChange={handleMailChange}

                        //variant="standard"
                        >
                            {mailList.length > 0 && mailList[0].mailSubjects.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>


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
                            select
                            type="text"
                            fullWidth
                        //variant="standard"
                        >
                            {mailList.length > 0 && mailList[0].mailBodies.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-md-6">
                        <FormControl size='small' component="div" fullWidth>
                            <InputLabel id="departmentCcId">Department CC.</InputLabel>
                            <Select
                                labelId="departmentCcId"
                                multiple
                                name="departmentCc"  // Use a different name for the first Select
                                value={mailDetails.departmentCc}
                                onChange={handleMailChange}
                                input={<OutlinedInput fullWidth label="Department CC." />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} size='small' label={value} />
                                        ))}
                                    </Box>
                                )}
                                fullWidth
                            >
                                {mailIds.length > 0 && mailIds.map((mail, index) => (
                                    <MenuItem key={index} value={mail.mailId}>
                                        <Checkbox checked={mailDetails.departmentCc.indexOf(mail.mailId) > -1} />
                                        <ListItemText primary={mail.firstName + " - " + mail.mailId} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='col-md-6'>
                        <FormControl size='small' component="div" fullWidth>
                            <InputLabel id="vendorCcId">Vendor CC.</InputLabel>
                            <Select
                                labelId="vendorCcId"
                                multiple
                                name="vendorCc"  // Use a different name for the second Select
                                value={mailDetails.vendorCc}
                                onChange={handleMailChange}
                                input={<OutlinedInput fullWidth label="Vendor CC." />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => {
                                            console.log(selected)
                                            return (
                                                <Chip key={value} size='small' label={value} />
                                            )
                                        })}
                                    </Box>
                                )}
                                fullWidth
                            >

                                {vendors.length > 0 && vendors.map((venMail, index) => (
                                    [

                                        <ListSubheader>{venMail.aliasName}</ListSubheader>,
                                        venMail.vendorContacts.map((contact, inx) => (
                                            <MenuItem key={inx} value={contact.mailId}>
                                                <Checkbox checked={mailDetails.vendorCc.indexOf(contact.mailId) > -1} />
                                                <ListItemText size="small" primary={contact.name + " - " + contact.mailId} />
                                            </MenuItem>
                                        ))


                                    ])
                                )}
                            </Select>
                        </FormControl>

                    </div>
                    <div className="col">
                        <FormControl size='small' component="div" fullWidth>
                            <InputLabel id="bccId">BCC</InputLabel>
                            <Select
                                labelId="bccId"
                                multiple
                                name="bcc"  // Use a different name for the second Select
                                value={mailDetails.bcc}
                                onChange={handleMailChange}
                                input={<OutlinedInput fullWidth label="BCC" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} size='small' label={value} />
                                        ))}
                                    </Box>
                                )}
                                fullWidth
                            >
                                {bccMails && bccMails.map((mail, index) => (
                                    <MenuItem key={index} value={mail.mailId}>
                                        <Checkbox checked={mailDetails.bcc.indexOf(mail.mailId) > -1} />
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