import React from 'react'
import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import { Add, Close, CloudUpload, Delete, Done, Edit, Receipt } from '@mui/icons-material';

const AlertConfi = () => {
    return (
        <div>

            <div className='row mt-3'>

                <div className='col'>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="manual" control={<Radio />} label="Manual" />
                        <FormControlLabel value="auto" control={<Radio />} label="Auto" />

                    </RadioGroup>
                </div>


            </div>



        </div>
    )
}

export default AlertConfi