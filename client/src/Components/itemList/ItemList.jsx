import React from 'react'
import { TextField, MenuItem } from '@mui/material';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

const ItemList = () => {
    return (
        <div>
            <form>
                <div className='row'>
                    <Typography variant="h5" className="text-center">Item List</Typography>
                    <div className="col d-flex mb-2">

                        <TextField label="Imte No"
                            id="imteNoId"
                            select
                            defaultValue="Active"
                            fullWidth
                            size="small"
                            name="imteNo" >

                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="InActive">InActive</MenuItem>
                        </TextField>

                    </div>
                    <div className="col d-flex mb-2">

                        <TextField label="Item Type"
                            id="itemTypeId"
                            select
                            defaultValue="Active"
                            fullWidth
                            size="small"
                            name="itemType" >

                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="InActive">InActive</MenuItem>
                        </TextField>

                    </div>

                </div>


            </form>

        </div>
    )
}

export default ItemList