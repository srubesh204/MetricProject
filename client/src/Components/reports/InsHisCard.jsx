import React from 'react'
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab, Link } from '@mui/material';

const InsHisCard = () => {
    return (
        <div>
            <div className='row'>
                <TextField fullWidth label="Instrument History Card" className="form-select" select size="small" id="instrumentHistoryCardId" name="instrumentHistoryCard" defaultValue="" >

                    <MenuItem value="all">All</MenuItem >
                    <MenuItem value="Attribute">Attribute</MenuItem >
                    <MenuItem value="Variable">Variable</MenuItem >
                    <MenuItem value="Reference Standard">Reference Standard</MenuItem>

                </TextField>

            </div>
            <div className='row'>
                <TextField fullWidth label="Imte No" className="form-select" select size="small" id="imteNoId" name="imteNo" defaultValue="" >

                    <MenuItem value="all">All</MenuItem >
                    <MenuItem value="Attribute">Attribute</MenuItem >
                    <MenuItem value="Variable">Variable</MenuItem >
                    <MenuItem value="Reference Standard">Reference Standard</MenuItem>

                </TextField>

            </div>
        </div>
    )
}

export default InsHisCard