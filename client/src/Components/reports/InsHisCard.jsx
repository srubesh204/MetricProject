import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab, Link } from '@mui/material';
import { Container, Paper } from '@mui/material';

const InsHisCard = () => {


    const [itemMasterDataList, setItemMasterDataList] = useState([])

    const itemMasterFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemMaster/getAllItemMasters`

            );

            console.log(response.data)
            setItemMasterDataList(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemMasterFetchData();
    }, []);

    const [itemMasterDataPrefix, setItemMasterDataPrefix] = useState([])
    const itemMasterFetchDataItem = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemMaster/getAllItemMasters`

            );

            console.log(response.data)
            setItemMasterDataPrefix(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemMasterFetchDataItem();
    }, []);






    return (
        <div>

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
                    <h6 className='text-center mb-2'>Instrument History Card</h6>
                    <div className='row'>
                        <div className=' col-5 mb-2'>
                            <TextField fullWidth label="Instrument History Card" className="form-select" select size="small" id="instrumentHistoryCardId" name="instrumentHistoryCard" defaultValue="" >

                                <MenuItem value="all">All</MenuItem >
                                {itemMasterDataList.map((item) => (
                                    <MenuItem value={item._id}>{item.itemDescription}</MenuItem>
                                ))}
                            </TextField>

                        </div>
                        <div className=" col d-flex justify-content-end ">
                            <div className='mb-2'>
                                <TextField label="From"
                                    id="fromId"
                                    defaultValue=""
                                    size="small"
                                    sx={{ width: "100%" }}
                                    name="from" />
                            </div>
                            <div className='mb-2'>
                                <TextField label="To"
                                    id="toId"
                                    defaultValue=""
                                    size="small"
                                    sx={{ width: "90%" }}
                                    name="to" />
                            </div>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col d-flex'>
                            <div className=' col-5 mb-2 me-1'>
                                <TextField fullWidth label="Imte No" className="form-select" select size="small" id="imteNoId" name="imteNo" defaultValue="" >

                                    <MenuItem value="all">All</MenuItem >
                                    {itemMasterDataPrefix.map((item) => (
                                        <MenuItem value={item._id}>{item.itemPrefix}</MenuItem>
                                    ))}

                                </TextField>

                            </div>
                            <div className='me-2 '>
                                <button type="button" className='btn btn-secondary' >Load Chast</button>
                            </div>
                            <div className='me-2 '>
                                <button type="button" className='btn btn-secondary' >Report</button>
                            </div>
                            <div className='me-2 '>
                                <button type="button" className='btn btn-secondary' >Excel</button>
                            </div>
                            <div className='me-2 '>
                                <button type="button" className='btn btn-secondary' >close</button>
                            </div>
                        </div>


                    </div>
                    <div className='row'>
                        <div className='col d-flex'>
                            <div className='me-2 '>
                                <button type="button" className='btn btn-secondary' >View Certificate</button>
                            </div>
                            <div className='me-2 '>
                                <button type="button" className='btn btn-secondary' >View Work Instruction</button>
                            </div>
                            <div className='me-2 '>
                                <button type="button" className='btn btn-secondary' >View Drawing</button>
                            </div>
                            <div className='me-2 '>
                                <button type="button" className='btn btn-secondary' >View R&R</button>
                            </div>
                            <div className='me-2 '>
                                <button type="button" className='btn btn-secondary' >View Attachment</button>
                            </div>
                        </div>

                    </div>




                </div>
            </Paper>


            <div className='row mb-2'>
                <div className='col d-flex'>
                    <div className='me-2'>
                        <TextField label="Serial No"
                            id="serialNoId"
                            defaultValue=""
                            size="small"
                            name="serialNo" />
                    </div>
                    <div className='me-2'>
                        <TextField label="Model No"
                            id="modelNoId"
                            defaultValue=""
                            size="small"
                            name="modelNo" />
                    </div>
                    <div className='me-2'>
                        <TextField label="Range Size"
                            id="rangeSizeId"
                            defaultValue=""
                            size="small"
                            name="rangeSize" />
                    </div>
                    <div className='me-2'>
                        <TextField label="Calibration Source"
                            id="calibrationSourceId"
                            defaultValue=""
                            size="small"
                            name="calibrationSource" />
                    </div>
                    <div className='me-2'>
                        <TextField label="Permissible Size"
                            id="permissibleSizeId"
                            defaultValue=""
                            size="small"
                            name="permissibleSize" />
                    </div>

                </div>




            </div>
            <div className='row g-2'>
                <div className='col d-flex'>
                    <div className='me-2'>
                        <TextField label="Location"
                            id="locationId"
                            defaultValue=""
                            size="small"
                            name="location" />
                    </div>
                    <div className='me-2'>
                        <TextField label="Model No"
                            id="modelNoId"
                            defaultValue=""
                            size="small"
                            name="frequencyInMonths" />
                    </div>
                    <div className='me-2'>
                        <TextField label="Make"
                            id="makeId"
                            defaultValue=""
                            size="small"
                            name="make" />
                    </div>
                   
                    

                </div>




            </div>





        </div>
    )
}

export default InsHisCard