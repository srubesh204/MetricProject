import React, { Fragment, useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEmployee } from '../../App';
import { Box, Checkbox, Chip, CircularProgress, FormControl, InputLabel, ListItemText, ListSubheader, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import axios from 'axios'
import dayjs from 'dayjs';


const MailWithAtt = ({ mailOpen, setMailOpen, selectedRows, setSnackBarOpen, setErrorHandler }) => {

    const { loggedEmp } = useEmployee()
    console.log(selectedRows)
    const [mailContent, setMailContent] = useState([])
    const getMailList = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/mailConfig/getMailConfigById/mailData`
            );
            console.log(response.data.result)
            setMailContent(response.data.result)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMailList();
        getVendorsByType();
        empFetch();
    }, []);

    console.log(mailContent)
    const [vendors, setVendors] = useState([])
    const getVendorsByType = async () => {
        try {
            const getAllVendorWithTypes = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendorWithTypes`
            );
            console.log(getAllVendorWithTypes)


            const allPlantVendors = getAllVendorWithTypes.data.result.allVendors.filter(ven => loggedEmp.plantDetails.find(plant => ven.vendorPlant.includes(plant.plantName)))

            console.log(allPlantVendors)
            // const contactDetails = [...new Set(getAllVendorWithTypes.data.result.allVendors.flatMap(item => item.vendorContacts.map(contact => contact.mailId)))];

            setVendors(allPlantVendors)


        } catch (err) {
            console.log(err);
        }
    };

    const [activeEmps, setActiveEmps] = useState({
        allEmps: [],
        admins: [],
        plantAdmins: [],
        creators: [],
        viewers: [],
        plantEmployees: []
    })
    const [bccMails, setBccMails] = useState([])
    const [mailIds, setMailIds] = useState([])

    const empFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/employee/getAllActiveEmployees`
            );
            const admins = response.data.result.filter(emp => emp === "admin")
            const plantAdmins = response.data.result.filter(emp => emp === "plantAdmin")
            const creators = response.data.result.filter(emp => emp === "creator")
            const viewers = response.data.result.filter(emp => emp === "viewer")


            const plantemps = response.data.result.filter(emp => emp.plantDetails.find(empPlant => loggedEmp.plantDetails.map(plant => plant.plantName).includes(empPlant.plantName)))
            const adminsList = plantemps.filter(emp => emp.empRole === "admin" || emp.empRole === "plantAdmin")
            const uniqueList = [...new Set(adminsList)]

            setMailDetails(prev => ({ ...prev, bcc: [...new Set(uniqueList.map(mail => mail.mailId))] }))
            setBccMails(uniqueList)
            console.log(uniqueList)
            setActiveEmps((prev) => ({ ...prev, allEmps: response.data.result, admins: admins, plantAdmins: plantAdmins, creators: creators, viewers: viewers }))
            if (selectedRows.length > 0) {
                const plants = selectedRows.map(item => item.itemPlant)


                const empEmails = response.data.result.filter(emp => emp.plantDetails.find(plant => plants.find(itemPlant => plant.plantName == itemPlant)))
                const uniqueEmails = [...new Set(empEmails)]
                setMailIds(empEmails)
                console.log(uniqueEmails)
            }

        } catch (err) {
            console.log(err);
        }
    };






    console.log(vendors)





    useEffect(() => {

        setMailDetails(prev => ({ ...prev, to: loggedEmp.mailId, bcc: bccMails.map(emp => emp.mailId), employee: { ...loggedEmp } }))


        if (selectedRows.length > 0) {
            const plants = selectedRows.map(item => item.itemPlant)
            console.log(plants)

            const empEmails = activeEmps.allEmps.filter(emp => emp.plantDetails.find(plant => plants.find(itemPlant => plant.plantName == itemPlant)))
            const uniqueEmails = [...new Set(empEmails)]
            setMailIds(empEmails)
            console.log(uniqueEmails)
        }
    }, [selectedRows])

    const initialMailDetails = {
        to: "",
        subject: "",
        mailBody: "",
        departmentCc: [],
        vendorCc: [],
        bcc: [],
        selectedItems: [],
        employee: {}
    }


    const [mailDetails, setMailDetails] = useState({
        to: "",
        subject: "",
        mailBody: "",
        departmentCc: [],
        vendorCc: [],
        bcc: [],
        selectedItems: [],
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

    const [loading, setLoading] = useState(false);
    const [attachments, setAttachments] = useState([])

    const handleFileChange = (e) => {
        const { files } = e.target
        setAttachments(files)
    }

    console.log(mailDetails)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const sendData = new FormData();
            sendData.append("to", mailDetails.to)
            sendData.append("subject", mailDetails.subject)
            sendData.append("mailBody", mailDetails.mailBody)
            sendData.append("departmentCc", mailDetails.departmentCc)
            sendData.append("vendorCc", mailDetails.vendorCc)
            sendData.append("bcc", mailDetails.bcc)
            
            sendData.append("employee", JSON.stringify(mailDetails.employee))
            sendData.append("fileUrls", JSON.stringify(selectedRows))
            for (let i = 0; i < attachments.length; i++) {
                sendData.append('files', attachments[i]);
            }
            setLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_PORT}/mail/MailWithAttachment`, sendData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setSnackBarOpen(true)
            setMailDetails(initialMailDetails)
            setMailOpen(false)
            setErrorHandler({ status: "1", message: "Mail sent successfully", code: "success" })
        } catch (err) {
            console.error(err)
            setSnackBarOpen(true)
            setErrorHandler({ status: 0, message: "Error sending mail", code: "error" })
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
                Send Mail with Attachments
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
                            {mailContent && mailContent.mailSubjects && mailContent.mailSubjects.map((item, index) => (
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
                            {mailContent && mailContent.mailSubjects && mailContent.mailBodies.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-md-6">
                        <FormControl size='small' component="div" fullWidth disabled={mailIds.length === 0}>
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
                                        {selected.map((value, index) => (
                                            <Chip key={index} size='small' label={value} />
                                        ))}
                                    </Box>
                                )}
                                fullWidth
                            >
                                {mailIds.length > 0 && mailIds.map((mail, index) => (
                                    <MenuItem sx={{ padding: "0 0 0 0" }} key={index} value={mail.mailId}>
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
                                        {selected.map((value, index) => {
                                            console.log(selected)
                                            return (
                                                <Chip key={index} size='small' label={value} />
                                            )
                                        })}
                                    </Box>
                                )}
                                fullWidth
                            >

                                {vendors.length > 0 && vendors.map((venMail, index) => (
                                    [

                                        <ListSubheader sx={{ margin: 0, lineHeight: 1 }}>{venMail.aliasName}</ListSubheader>,
                                        venMail.vendorContacts.map((contact, inx) => (
                                            <MenuItem sx={{ padding: "0 0 0 2rem" }} key={inx} value={contact.mailId}>
                                                <Checkbox size='small' checked={mailDetails.vendorCc.indexOf(contact.mailId) > -1} />
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
                                        {selected.map((value, index) => (
                                            <Chip key={index} size='small' label={value} />
                                        ))}
                                    </Box>
                                )}
                                fullWidth
                            >
                                {bccMails && bccMails.map((mail, index) => (
                                    <MenuItem sx={{ padding: "0 0 0 0" }} key={index} value={mail.mailId}>
                                        <Checkbox checked={mailDetails.bcc.indexOf(mail.mailId) > -1} />
                                        <ListItemText primary={mail.firstName + " - " + mail.mailId} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <input className='inputTxt' type='file' multiple onChange={(e) => handleFileChange(e)} />
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

export default MailWithAtt