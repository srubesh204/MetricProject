import React, { useState } from 'react'
import { TextField, MenuItem, FormControl } from '@mui/material';
import { Container, Paper } from '@mui/material';


const Status = () => {
    const initialStatusData = {
        statusName: "",
        status: "Ative",
        statusColor: ""
    }

    const [statusData, setStatusDate] = useState({
        statusName: "",
        status: "Ative",
        statusColor: ""

    })
    const columns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, align: "center" }, 
        { field:  'statusName', headerName: ' Status Name', width: "90" }, 
        { field:  'status', headerName: ' Status', width: "90" }, 
    ]

    const handleStatusData = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === 'statusName'
            ? value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : value;
        setStatusDate((prev) => ({ ...prev, [name]: formattedValue }))
    };

    return (
        <div>
            <form>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        mb: 2
                    }}
                    elevation={12}
                >
                    <div className='row'>
                        <div className='col d-flex mb-2'>
                            <TextField label="Status Name"
                                id="statusNameId"
                                defaultValue=""
                                fullWidth
                                size="small"
                                onChange={handleStatusData}

                                name="statusName" >
                            </TextField>
                        </div>
                        <div className='col d-flex mb-2'>
                            <TextField label="Status"
                                id="statusId"
                                select
                                defaultValue="Active"
                                onChange={handleStatusData}
                                fullWidth
                                size="small"
                                name="status" >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="InActive">InActive</MenuItem>
                            </TextField>
                        </div>
                        <div className='col d-flex'>
                            <TextField label="Status Color"
                                id="statusColorId"
                                defaultValue=""
                                fullWidth
                                size="small"

                                name="statusColor" >
                            </TextField>

                        </div>
                        <div className='row '>
                            <div className="d-flex justify-content-end">
                                <div className='me-2'>
                                    <button type="button" className='btn btn-secondary'>Modify</button>
                                </div>
                                <div className='me-2'>
                                    <button type="button" className='btn btn-danger' >Cancel</button>
                                </div>
                                <div>
                                    <button type="button" className='btn btn-warning'>+ Add PartDataBase</button>
                                </div>
                            </div>

                        </div>


                    </div>
                    </Paper>

            </form>
        </div>
    )
}

export default Status