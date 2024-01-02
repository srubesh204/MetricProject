import React, { useState } from 'react'
import { FormControlLabel, FormGroup, Paper, Checkbox, TextField, MenuItem, Tabs, Tab } from '@mui/material'
import axios from 'axios'
import MasterPermission from './MasterPermission';
import ExtraRole from './ExtraRole';

 

const Permissions = () => {

    const [tabValue, setTabValue] = useState("masterPermission");

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div >

            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab value="masterPermission" label="Master Permission" />
                <Tab value="extraPermission" label="Extra Permissions" />
            </Tabs>
            {tabValue === "masterPermission" &&
                <MasterPermission />
            }
            {tabValue === "extraPermission" &&
                <ExtraRole />
            }

        </div>
    )
}

export default Permissions