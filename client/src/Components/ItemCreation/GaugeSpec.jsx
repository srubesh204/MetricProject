import React, { useEffect, useState, useContext } from 'react'
import { ItemAddContent } from './ItemAdd';
import { Add, Close, CloudUpload, Delete, Done } from '@mui/icons-material';
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, Chip, DialogContentText, Radio, RadioGroup, FormControl, Select, DialogTitle, OutlinedInput, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, Slide } from '@mui/material';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const GaugeSpec = () => {

    const gaugeSpec = useContext(ItemAddContent)
    const { gaugeSecOpen, setGaugeSpecOpen } = gaugeSpec



    return (
        <Dialog fullScreen keepMounted maxWidth="xl" TransitionComponent={Transition} open={gaugeSecOpen} sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setGaugeSpecOpen(false)
                }
            }}>
            <DialogTitle align='center' >Gauge Spec</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setGaugeSpecOpen(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <Close />
            </IconButton>





            <DialogContent sx={{ width: "100%" }}>
                <div>
                    

                </div>
            </DialogContent>
            <DialogActions className='d-flex justify-content-between'>
                
                {/* <div>
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setGaugeSpecOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success'  >Submit</Button>
                </div> */}
            </DialogActions>

        </Dialog>
    )
}

export default GaugeSpec