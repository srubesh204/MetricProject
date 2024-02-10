import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { FileCopy } from '@mui/icons-material';
import { IconButton } from "@mui/material";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { TextField, MenuItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Edit, FilterAlt, PrintRounded } from '@mui/icons-material';

export const MeasurementUncertaintyList = () => {


    const [uncertaintyList, setUncertaintyList] = useState([])
    const uncFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/measurementUncertainty/getAllMeasurementUncertainty`
            );
            setUncertaintyList(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        uncFetch()
    }, []);


    const uncertaintyListColumns = [
        {
            field: 'button',
            headerName: 'Edit',
            width: 60,
            headerAlign: "center", align: "center",
            renderCell: (params) => (
                <Button component={Link} to={`/measurementUncertaintyEdit/${params.id}`}>
                    <Edit color='success' />
                </Button>
            ),
        },

        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },
        { field: 'uncItemName', headerName: 'UncItemName', width: 130, headerAlign: "center", align: "center", },

        {
            field: 'uncRangeSize',
            headerName: 'UncRangeSize',
            width: 210,
            headerAlign: "center", align: "center",
        },
        {
            field: 'uncLC',
            headerName: 'UncLC',
            //   description: 'This column has a value getter and is not sortable.',
            width: 150,
            headerAlign: "center", align: "center",
        },
    ]







    return (
        <div>

            <div className='row'>
                <h6 className="text-center ">MeausrementUncertaintyList</h6>
                <div style={{ height: 300, width: '100%', marginTop: "0.5rem" }}>
                    <DataGrid disableDensitySelector
                        rows={uncertaintyList}
                        columns={uncertaintyListColumns}
                        getRowId={(row) => row._id}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        sx={{
                            ".MuiTablePagination-displayedRows": {

                                "marginTop": "1em",
                                "marginBottom": "1em"
                            }
                        }}

                        slots={{
                            toolbar: () => (
                                <div className='d-flex justify-content-between align-items-center'>
                                    <GridToolbar />
                                    {/* <GridToolbarQuickFilter /> */}
                                </div>
                            ),
                        }}

                        onRowSelectionModelChange={(newRowSelectionModel, event) => {
                            // setSelectedRowIds(newRowSelectionModel);
                            console.log(event)

                        }}

                        // onRowClick={updateVendor}

                        density="compact"
                        //disableColumnMenu={true}


                        pageSizeOptions={[5]}


                    />
                </div>

            </div>



        </div>
    )
}
