import React, { useState } from 'react'
import { FormControlLabel, FormGroup, Paper, Checkbox, TextField, MenuItem, Tabs, Tab } from '@mui/material'
import axios from 'axios'


const Permissions = () => {

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div >

            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab value={0} label="Extra Permissions" />
                <Tab value={1} label="Item Master Permission" />
            </Tabs>
            {tabValue === "extraPermission"}

        </div>
    )
}

export default Permissions