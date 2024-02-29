import React from 'react'
import { Card, CardContent, CardActions, Button, Container, Switch,Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import { Add, Close, CloudUpload, Delete, Done, Edit, Receipt } from '@mui/icons-material';

const AlertConfig = () => {
    return (
        <div>

            <Container maxWidth="lg" sx={{ mt: 4 }}>

                <form>
                   
                        <div className='row g-2'>

                          
                                <div>
                                    <FormControlLabel control={<Switch name='manual'/>} label="Manual" />
                                </div>
                                <div>
                                    <FormControlLabel control={<Switch name='auto'  />} label="Auto" />
                                </div>
                               
                       


                        </div>
                    
                </form>
            </Container>

        </div>
    )
}

export default AlertConfig