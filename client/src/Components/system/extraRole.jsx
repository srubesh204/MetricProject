import React, { useState } from 'react'
import { FormControlLabel, FormGroup, Paper, Checkbox, TextField, MenuItem, Tabs, Tab } from '@mui/material'
import axios from 'axios'


const ExtraRole = () => {

    const initialRoleData = {

    }

    const [roleData, setRoleData] = useState({
        roleName: "",
        roleStatus: "",
        depdes: [],
        areaPof: [],
        unitPart: [],
        employees: [],
        vendor: [],
        itemMaster: [],
        itemEntry: [],
        cal: [],
        dc: [],
        grn: [],
        onsiteGrn: []
    })
    console.log(roleData)

    const handleRoleData = (e, pageName) => {
        const { name, value, checked } = e.target;
        if (name === "roleName" || name === "roleStatus") {
            setRoleData((prev) => ({ ...prev, [name]: value }))
        }


        const updatedEmployees = [...roleData.employees];

        if (pageName === "Department") {
            if (checked && !updatedEmployees.includes(value)) {
                updatedEmployees.push(value);
            } else {
                // If the checkbox is unchecked, remove the value from the array
                const index = updatedEmployees.indexOf(value);
                if (index !== -1) {
                    updatedEmployees.splice(index, 1);
                }
            }
            setRoleData((prev) => ({ ...prev, employees: updatedEmployees }));
        }



    }

    return (
        <div >

            <Paper sx={{
                p: 2,
                m: 2
            }} className='row g-2' elevation={12}>
                <div className="col">
                    <TextField label="Role Name" name='roleName' value={roleData.roleName} onChange={handleRoleData} type='text' size='small' fullWidth />
                </div>


                <div className="col">
                    <TextField label="Role Status" size='small' name='roleStatus' value={roleData.roleStatus} select onChange={handleRoleData} fullWidth>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">InActive</MenuItem>
                    </TextField>
                </div>


            </Paper>

            <div className="row g-3 ">
                <div className="col">
                    <Paper sx={{
                        p: 2,
                        marginLeft: "1rem"
                    }}
                        elevation={12}>
                        <h5 className='text-center'>Department and Designation</h5>
                        <div className='d-flex justify-content-center'>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value="departmentAdd" name='departmentAdd' onChange={(e) => handleRoleData(e, "Department")} />} label="Department Add" />
                                <FormControlLabel control={<Checkbox value="departmentView" name='departmentView' onChange={(e) => handleRoleData(e, "Department")} />} label="Department View" />
                                <FormControlLabel control={<Checkbox value="designationAdd" name='designationAdd' onChange={(e) => handleRoleData(e, "Department")} />} label="Designation Add" />
                                <FormControlLabel control={<Checkbox value="designationView" name='designationView' onChange={(e) => handleRoleData(e, "Department")} />} label="Designation View" />
                            </FormGroup>
                        </div>


                    </Paper>
                </div>
                <div className="col">
                    <Paper sx={{
                        p: 2,


                    }}
                        elevation={12}>
                        <h5 className='text-center'>Unit and Part</h5>
                        <div className='d-flex justify-content-center'>
                            <FormGroup >
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Unit Add" />
                                <FormControlLabel control={<Checkbox />} label="Unit View" />
                                <FormControlLabel control={<Checkbox />} label="Part Add" />
                                <FormControlLabel control={<Checkbox />} label="Part View" />
                            </FormGroup>
                        </div>
                    </Paper>
                </div>
                <div className="col">
                    <Paper sx={{
                        p: 2,
                        marginRight: "1rem"

                    }}
                        elevation={12}>
                        <h5 className='text-center'>Employee</h5>
                        <div className='d-flex justify-content-center'>
                            <FormGroup >
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Employee Add" />
                                <FormControlLabel control={<Checkbox />} label="Employee View" />

                            </FormGroup>
                        </div>
                    </Paper>
                </div>

            </div>
            <div className="row">

                <div className="col">
                    <Paper sx={{
                        p: 2,
                        m: 2,

                    }}
                        elevation={12}>
                        <h5 className='text-center'>Vendor</h5>
                        <div className='d-flex justify-content-center'>
                            <FormGroup >
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Vendor Add" />
                                <FormControlLabel control={<Checkbox />} label="Vendor View" />

                            </FormGroup>
                        </div>
                    </Paper>
                </div>
                <div className="col">
                    <Paper sx={{
                        p: 2,
                        m: 2,

                    }}
                        elevation={12}>
                        <h5 className='text-center'>Item Master</h5>
                        <div className='d-flex justify-content-center'>
                            <FormGroup >
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Item Master Add" />
                                <FormControlLabel control={<Checkbox />} label="Item Master View" />

                            </FormGroup>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default ExtraRole