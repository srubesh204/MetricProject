import { Container, Grid, Paper, TextField } from '@mui/material'
import React from 'react'

const ItemAdd = () => {
    return (
        <div sx={{ backgroundColor: "#f5f5f5" }}>
            <Container maxWidth='xl' sx={{ p: 3, m: 2 }}>
                
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <TextField size='small' variant='outlined' label="Item Master" fullWidth />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField size='small' variant='outlined' label="Item Master" fullWidth />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField size='small' variant='outlined' label="Item Master" fullWidth />
                    </Grid>
                    <Grid item >
                        <Paper elevation={3} sx={{ height: "120px", width: "120px" }}></Paper>
                    </Grid>

                </Grid>
            </Container>
        </div>
    )
}

export default ItemAdd