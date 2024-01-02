import { Paper, TextField } from '@mui/material'
import React from 'react'

const MasterPermission = () => {
    return (
        <div className='row g-3'>
            <div className="col">
                <Paper sx={{
                    p: 2,
                    m: 2
                }} className='row g-2' elevation={12}>
                    <div className="row">
                        <div className="col">
                            <TextField select size='small' label="Select Plant" fullWidth></TextField>
                        </div>
                        <div className="col">
                            <TextField select size='small' label="Select Master" fullWidth></TextField>
                        </div>
                        <div className="col">
                            <TextField select size='small' label="Select Creator" fullWidth></TextField>
                        </div>
                    </div>


                </Paper>
            </div>
            <div className="col">
                <Paper sx={{
                    p: 2,
                    m: 2
                }} className='row g-2' elevation={12}>
                    <div className="row">
                        <div className="col">
                            <TextField select size='small' label="Select Plant" fullWidth></TextField>
                        </div>
                        <div className="col">
                            <TextField select size='small' label="Select Master" fullWidth></TextField>
                        </div>
                        <div className="col">
                            <TextField select size='small' label="Select Creator" fullWidth></TextField>
                        </div>
                    </div>


                </Paper>
            </div>
        </div>
    )
}

export default MasterPermission