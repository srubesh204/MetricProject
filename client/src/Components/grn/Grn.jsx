import { DomainVerificationOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab, Link } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container, Paper, Box } from '@mui/material';

const Grn = () => {


    const [itemAddList, setItemAddList] = useState([]);

    const itemAddFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByIMTESort`
            );
            // You can use a different logic for generating the id

            setItemAddList(response.data.result);


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemAddFetch();
    }, []);









    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <div className='row'>
                    <h1 className='text-center mb-2'>GRN</h1>
                    <div className='col'>
                        <Paper
                            sx={{
                                p: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1,

                            }}
                            elevation={12}
                        >
                            <div className='col d-flex mb-2'>
                                <div className=" col-6 me-2">

                                    <TextField label="Party Ref No"
                                        id="partyRefNoId"
                                        defaultValue=""
                                        //  sx={{ width: "100%" }}
                                        size="small"
                                        fullWidth
                                        name="partyRefNo" />
                                </div>
                                <div className="col-6">

                                    <DatePicker
                                        fullWidth
                                        id="partyRefDateId"
                                        name="partyRefDate"
                                        label="Party Ref Date"
                                        sx={{ width: "100%" }}
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />

                                </div>


                            </div>
                            <div className='row'>
                                <div className='col d-flex mb-2'>
                                    <div className=" col-6 me-2">

                                        <TextField label="Party Name"
                                            id="partyNameId"
                                            defaultValue=""
                                            //  sx={{ width: "100%" }}
                                            size="small"
                                            fullWidth
                                            name="partyName" />
                                    </div>
                                    <div className="col-6">

                                        <TextField label="Party code"
                                            id="partyCodeId"
                                            defaultValue=""
                                            // sx={{ width: "100%" }}
                                            size="small"
                                            fullWidth
                                            name="partyCode" />

                                    </div>


                                </div>

                            </div>
                            <div className='row '>
                                <div className="col-12">

                                    <TextField label="PartyAddress"
                                        id="partyAddressId"
                                        defaultValue=""
                                        size="small"
                                        sx={{ width: "101%" }}
                                        name="Party Address" />

                                </div>
                            </div>
                        </Paper>

                    </div>

                    <div className='col'>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1,

                            }}
                            elevation={12}
                        >

                            <div className='col d-flex mb-5'>
                                <div className=" col-6 me-2">

                                    <TextField label="GRN NO"
                                        id="grnNoId"
                                        defaultValue=""
                                        //  sx={{ width: "100%" }}
                                        size="small"
                                        fullWidth
                                        name="grnNo" />
                                </div>
                                <div className="col-6">

                                    <DatePicker
                                        fullWidth
                                        id="grnDateId"
                                        name="grnDate"
                                        label="GRN Date"
                                        sx={{ width: "100%" }}
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />

                                </div>


                            </div>
                            <div className='row '>
                                <div className='mb-5'>
                                    <TextField label="Common Remarks"
                                        id="commonRemarksId"

                                        defaultValue=""
                                        fullWidth
                                        size="small"
                                        name="commonRemarks"
                                    >
                                    </TextField>
                                </div>
                            </div>
                        </Paper>
                    </div>
                </div>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        mb: 1,

                    }}
                    elevation={12}
                >
                    <div className='row g-2'>
                        <div className='col d-flex'>
                            <div className='col me-2'>
                                <TextField size='small' fullWidth variant='outlined' id="itemListId" select label="Item List" name='itemList'>
                                    <MenuItem value="InHouse">InHouse</MenuItem>
                                    <MenuItem value="OutSource">OutSource</MenuItem>
                                    <MenuItem value="OEM">OEM</MenuItem>
                                </TextField>
                            </div>
                            <div className='col'>
                                <TextField label="Imte No"
                                    id="imteNoId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    size="small"
                                    name="imteNo" >
                                    <MenuItem value="all">All</MenuItem>
                                    {itemAddList.map((item, index) => (
                                        <MenuItem key={index} value={item.itemIMTENo}>{item.itemIMTENo}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                        <div className=' col d-flex justify-content-end'>
                            <div className='me-2 '>
                                <button type="button" className='btn btn-secondary' >Add Item</button>
                            </div>

                        </div>

                    </div>
               
                <div className='row g-2'>
                    <div className='col d-flex'>
                        <div className="me-2">

                            <DatePicker
                                fullWidth
                                id="calDateId"
                                name="calDate"
                                label="Cal Date"
                                sx={{ width: "100%" }}
                                slotProps={{ textField: { size: 'small' } }}
                                format="DD-MM-YYYY" />

                        </div>
                        <div className="me-2">

                            <DatePicker
                                fullWidth
                                id="nextCalDateId"
                                name="nextCalDate"
                                label="Next Cal Date"
                                sx={{ width: "100%" }}
                                slotProps={{ textField: { size: 'small' } }}
                                format="DD-MM-YYYY" />

                        </div>
                        <div className='col me-2'>
                            <TextField size='small' fullWidth variant='outlined' id="itemListId" select label="Item List" name='itemList'>
                                <MenuItem value="InHouse">InHouse</MenuItem>
                                <MenuItem value="OutSource">OutSource</MenuItem>
                                <MenuItem value="OEM">OEM</MenuItem>
                            </TextField>
                        </div>
                        <div className="col me-2">

                            <TextField label="CertificateNo"
                                id="certificateNoId"
                                defaultValue=""
                                size="small"
                                sx={{ width: "101%" }}
                                name="certificateNo" />

                        </div>
                        <div className='me-2' >
                            <label className='itemlistloade'>
                                <input className="form-control itemlistdownload" type="file" id="upload" />Upload Certificate</label>
                        </div>
                    </div>

                </div>
                </Paper>





            </LocalizationProvider>

        </div>
    )
}

export default Grn