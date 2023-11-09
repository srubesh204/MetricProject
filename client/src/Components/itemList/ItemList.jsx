import React, { useEffect, useState } from 'react'
import { TextField, MenuItem } from '@mui/material';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';


const ItemList = () => {

    const [itemList, setItemList] = useState([]);

    const itemFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
            );
            // You can use a different logic for generating the id

            setItemList(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemFetch();
    }, []);

    console.log(itemList)





    const columns = [
        { field: 'id', headerName: 'Si No', },
        { field: 'itemIMTENo', headerName: 'ItemIMTENo', },
        { field: 'itemDescription', headerName: 'item Description', },
        { field: 'itemRangeSize', headerName: 'Item Range Size', },
        { field: 'itemMake', headerName: 'Item Make', },
        { field: 'itemCalDate', headerName: 'Item Cal Date', },
        { field: 'itemDueDate', headerName: 'Item Due Date', },
        { field: 'itemLC', headerName: 'itemLC', },
        { field: 'itemCalFreInMonths', headerName: 'Item Cal Fre In Months', type: "number", },
        { field: 'itemCalibrationSrc', headerName: 'Item Calibration Src', },
        { field: 'itemSupplier', headerName: 'Item Supplier', },
        { field: 'itemType', headerName: 'Item Type', },
    ];

    return (
        <div style={{ margin: "2rem" }}>
            <form>

                <Paper sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    mb: 1,

                }} >
                    <div className='row g-2  '>
                        <Typography variant="h5" className="text-center mb-2">Item List</Typography>

                        <div className="col d-flex mb-2 ">

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
                        <div className="col d-flex  mb-2">

                            <TextField label="Item Type"
                                id="itemTypeId"
                                select
                                defaultValue="Active"
                                fullWidth
                                size="small"
                                name="itemType" >
                                <MenuItem value="all">All</MenuItem >
                                <MenuItem value="Attribute">Attribute</MenuItem >
                                <MenuItem value="Variable">Variable</MenuItem >
                                <MenuItem value="Reference Standard">Reference Standard</MenuItem>
                            </TextField>

                        </div>
                        <div className="col d-flex  mb-2">

                            <TextField label="Current Location"
                                id="currentLocationId"
                                select
                                defaultValue="Active"
                                fullWidth
                                size="small"
                                name="currentLocation" >
                                <MenuItem value="all">All</MenuItem >
                                <MenuItem value="Attribute">Attribute</MenuItem >
                                <MenuItem value="Variable">Variable</MenuItem >
                                <MenuItem value="Reference Standard">Reference Standard</MenuItem>
                            </TextField>

                        </div>
                        <div className="col d-flex  mb-2">

                            <TextField label="Customer Wise"
                                id="customerWiseId"
                                select
                                defaultValue="Active"
                                fullWidth
                                size="small"
                                name="customerWise" >
                                <MenuItem value="all">All</MenuItem >
                                <MenuItem value="Attribute">Attribute</MenuItem >
                                <MenuItem value="Variable">Variable</MenuItem >
                                <MenuItem value="Reference Standard">Reference Standard</MenuItem>
                            </TextField>

                        </div>
                        <div className="col d-flex  mb-2">

                            <TextField label="Supperlier Wise"
                                id="supperlierWiseId"
                                select
                                defaultValue="Active"
                                fullWidth
                                size="small"
                                name="supperlierWise" >
                                <MenuItem value="all">All</MenuItem >
                                <MenuItem value="Attribute">Attribute</MenuItem >
                                <MenuItem value="Variable">Variable</MenuItem >
                                <MenuItem value="Reference Standard">Reference Standard</MenuItem>
                            </TextField>

                        </div>
                        <div className="col d-flex  mb-2">

                            <TextField label="Due In Days"
                                id="dueInDaysId"
                                select
                                defaultValue="Active"
                                fullWidth
                                size="small"
                                name="dueInDays" >
                                <MenuItem value="all">All</MenuItem >
                                <MenuItem value="Attribute">Attribute</MenuItem >
                                <MenuItem value="Variable">Variable</MenuItem >
                                <MenuItem value="Reference Standard">Reference Standard</MenuItem>
                            </TextField>

                        </div>
                        <div className="col d-flex  mb-2">

                            <TextField label="Part Name"
                                id="partNameId"
                                select
                                defaultValue="Active"
                                fullWidth
                                size="small"
                                name="partName" >
                                <MenuItem value="all">All</MenuItem >
                                <MenuItem value="Attribute">Attribute</MenuItem >
                                <MenuItem value="Variable">Variable</MenuItem >
                                <MenuItem value="Reference Standard">Reference Standard</MenuItem>
                            </TextField>

                        </div>
                        <div className="col d-flex  mr-1 ">

                            <TextField label="Plant Wise"
                                id="plantWiseId"
                                select
                                defaultValue="Active"
                                fullWidth
                                size="small"
                                name="plantWise" >
                                <MenuItem value="all">All</MenuItem >
                                <MenuItem value="Attribute">Attribute</MenuItem >
                                <MenuItem value="Variable">Variable</MenuItem >
                                <MenuItem value="Reference Standard">Reference Standard</MenuItem>
                            </TextField>

                        </div>


                    </div>
                    <div className='row'>
                        <div className='col mb-2'>
                            <div class="form-check ">
                                <input className="form-check-input" type="checkbox" id="selectAllId" name="selectAll" />
                                <label className="form-check-label" htmlFor="selectAllId">Select All</label>
                            </div>

                        </div>

                        <div className="col d-flex justify-content-end g-2 mb-2">
                            <div className='col-4 me-2'>
                                <TextField label="item History"
                                    id="itemHistoryId"
                                    select
                                    defaultValue="Active"
                                    fullWidth
                                    size="small"
                                    name="itemHistory" >
                                    <MenuItem value="all">All</MenuItem >
                                    <MenuItem value="Attribute">Attribute</MenuItem >
                                    <MenuItem value="Variable">Variable</MenuItem >
                                    <MenuItem value="Reference Standard">Reference Standard</MenuItem>
                                </TextField>
                            </div>
                            <div className='col-4 me-2'>
                                <TextField label="Status"
                                    id="statusId"
                                    select
                                    defaultValue="Active"
                                    fullWidth
                                    size="small"
                                    name="status" >

                                    <MenuItem value="Active">Active</MenuItem >
                                    <MenuItem value="InActive">InActive</MenuItem >

                                </TextField>
                            </div>

                        </div>
                        <div>
                            <div className='mb-2' style={{ height: 400, width: '100%' }}>
                                <DataGrid

                                    rows={itemList}
                                    columns={columns}
                                    getRowId={(row) => row._id}
                                    initialState={{

                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                    checkboxSelection
                                />
                            </div>

                        </div>
                        <div className='row'>
                            <div className=' col d-flex '>
                                <div className='me-2' >
                                    <button type="button" className='btn btn' >History Card</button>
                                </div>
                                <div className='me-2' >
                                    <button type="button" className='btn btn-' >Change status</button>
                                </div>
                                <div className='me-2' >
                                    <button type="button" className='btn btn-' >Item Master</button>
                                </div>
                            </div>
                            <div className=' col d-flex justify-content-end'>
                                <div className='me-2'>
                                    <button type="button" className='btn btn-warning' >+ Add Vendor</button>
                                </div>
                                <div className='me-2'>
                                    <button type="button" className='btn btn-info' >Modify</button>
                                </div>
                                <div className='me-2'>
                                    <button type="button" className='btn btn-danger' >Delete</button>
                                </div>
                                <div className='me-2'>
                                    <button type="button" className='btn btn-secondary' >Back</button>
                                </div>


                            </div>

                        </div>
                        <div className='row'>
                            <div className='col d-flex '>
                                <div className='me-2' >
                                    <label className='itemlistloade'>
                                        <input className="form-control itemlistdownload" type="file" id="upload" />Upload</label>
                                </div>
                                <div className='me-2'>
                                    <label className='itemlistloade'>
                                        <input className="form-control itemlistdownload" type="file" id="download" />Download </label>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Print</button>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Sticker Print</button>
                                </div>
                                <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Sticker Print Barcode</button>
                                </div>
                                
                            </div>
                     
                               
                

                        </div>



                    </div>
                </Paper>


            </form>

        </div>
    )
}

export default ItemList