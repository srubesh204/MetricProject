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
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios'



const HomeMail = () => {

    const mailDatas = useContext(HomeContent)
    const { mailOpen, setMailOpen, selectedRows, mailIds } = mailDatas

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }


    const [mailDetails, setMailDetails] = useState({
        to: "",
        subject: "",
        mailBody: "",
        cc: [],

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
            <DialogContent>
                <form className='row g-2' onSubmit={handleSubmit}>
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
                                name="cc"
                                value={mailDetails.cc}
                                onChange={handleMailChange}
                                input={<OutlinedInput fullWidth label="CC." />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                //renderValue={(selected) => selected.map(item => mailIds.find(emp => emp.mailId === item).mailId).join(", ")} MenuProps={MenuProps}


                                fullWidth
                            >
                                {mailIds.map((mail, index) => (
                                    <MenuItem key={index} value={mail.mailId}>
                                        <Checkbox checked={mailDetails.cc.indexOf(mail.mailId) > -1} />
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
                    endIcon={loading ? <CircularProgress /> : <Send />}
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