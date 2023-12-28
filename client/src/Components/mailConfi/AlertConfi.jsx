import React from 'react'
import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete } from '@mui/material'
import { Add, Close, CloudUpload, Delete, Done, Edit, Receipt } from '@mui/icons-material';

const AlertConfi = () => {
    return (
        <div>

            <Container maxWidth="lg" sx={{ mt: 4 }}>

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
                        <div className='row mt-3'>

                            <div className='col d-flex'>
                                <div className='me-2 '>
                                    <Button size='small' sx={{ minWidth: "130px" }} variant='contained'>Manual</Button>
                                </div>
                                <div className='me-2 '>
                                    <Button size='small' sx={{ minWidth: "130px" }} variant='contained'>Auto</Button>
                                </div>
                            </div>


                        </div>
                    </Paper>

                </form>
            </Container>

        </div>
    )
}

export default AlertConfi