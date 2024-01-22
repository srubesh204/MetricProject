import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { HomeContent } from '../Home';
import { TextField } from '@mui/material';


const HomeMail = () => {

    const mailDatas = useContext(HomeContent)
    const { mailOpen, setMailOpen, selectedRows } = mailDatas

    return (
        <Dialog
            open={mailOpen}
            onClose={() => setMailOpen(false)}
            maxWidth="md"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Send Mail
            </DialogTitle>
            <DialogContent>
                <div className='row'>
                    <div className="col-6">


                        <TextField

                            autoFocus
                            required
                            margin="dense"
                            id="toId"
                            name="to"
                            label="To"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </div>
                    <div className="col-6 ">
                        <TextField

                        
                            required
                            margin="dense"
                            id="subjectId"
                            name="subject"
                            label="Subject"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </div>
                    <div >
                        <TextField

                            multiline
                            maxRows={4}
                            required
                            margin="dense"
                            id="mailBodyId"
                            name="mailBody"
                            label="Body"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </div>
                    <div className="col-6">
                        <TextField
                            margin="dense"
                            id="ccId"
                            name="cc"
                            label="Cc"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </div>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => setMailOpen(false)}>Cancel</Button>
                <Button onClick={() => setMailOpen(false)} autoFocus>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default HomeMail