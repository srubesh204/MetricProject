import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText } from '@mui/material'
import React from 'react'

const ItemAdd = () => {
    return (
        <div style={{ margin: "2rem", backgroundColor: "#f5f5f5" }}>
            <Paper className='row' elevation={12} sx={{ p: 2, mb: 2 }}>
                <div className="col-md-5 row g-1">

                    <div>
                        <TextField size='small' variant='outlined' label="Item Master" fullWidth />
                    </div>
                    <div className="col">
                        <TextField size='small' variant='outlined' label="Item Master" fullWidth />
                    </div>
                    <div className="col">
                        <TextField size='small' variant='outlined' label="Item Master" fullWidth />
                    </div>
                </div>
                <div className="col-md-2 text-center align-middle">
                    <Typography variant='h5'  >Item Add</Typography>
                </div>
                <div className="col-md-5 d-flex justify-content-center">
                    <Card sx={{ width: "50%", height: "100px" }}>
                        <CardContent>

                        </CardContent>
                    </Card>
                </div>


            </Paper>
            <div className="row ">
                <Paper className='col me-2' elevation={12} sx={{ p: 2 }}>
                    <Typography variant='h6' className='text-center'>Item General Details</Typography>
                    <div className="row g-2">
                        <div className="col">
                            <TextField size='small' variant='outlined' label="Item Type" fullWidth />
                        </div>
                        <div className="input-group col ">
                            <div >
                                <TextField size='small' variant='outlined' label="Range/Size" fullWidth />
                            </div>

                            <div class="form--group width--auto form--group--flushed">
                                <input class="form--input" type="text" />
                                    <button class="form--action">Go</button>
                            </div>
                        </div>
                        <div className="col">
                            <TextField size='small' variant='outlined' label="Least Count" fullWidth />
                        </div>
                    </div>
                </Paper>
                <Paper className='col' elevation={12} sx={{ p: 2 }}>
                    <Typography variant='h6'>Item General Details</Typography>
                </Paper>

            </div>









        </div>
    )
}

export default ItemAdd