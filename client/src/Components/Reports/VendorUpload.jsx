import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { FileCopy } from '@mui/icons-material';
import { IconButton } from "@mui/material";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { TextField, MenuItem, Button } from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';

const VendorUpload = () => {

    const [vendorDataList, setVendorDataList] = useState([])
    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data.result);
            setFilteredData(response.data.result)

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);

    const vendorListColumns = [

        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },
        { field: 'vendorCode', headerName: 'VendorCode', width: 130, headerAlign: "center", align: "center", },

        {
            field: 'fullName',
            headerName: 'Full Name',
            width: 210,
            headerAlign: "center", align: "center",
        },
        {
            field: 'certificateValidity',
            headerName: 'CertificateValidity',
            //   description: 'This column has a value getter and is not sortable.',
            width: 150,
            headerAlign: "center", align: "center", renderCell : (params) => params.row.certificateValidity ? dayjs(params.row.certificateValidity).format("DD-MM-YYYY") : "",
        },
        {
            field: 'Vendor Certificate View', headerName: 'Vendor Certificate View', width: 180, align: "center", renderCell: (params) =>
                <IconButton size="small" component={Link} target="_blank" to={`${process.env.REACT_APP_PORT}/vendorCertificates/${params.row.certificate}`} ><FileOpenIcon /></IconButton>
        },


        // {
        //     field: 'state',
        //     headerName: 'State',
        //     // description: 'This column has a value getter and is not sortable.',
        //     width: 100,
        //     headerAlign: "center", align: "center",
        // },
        // {
        //     field: 'vendorStatus',
        //     headerName: 'Status',
        //     // description: 'This column has a value getter and is not sortable.',
        //     width: 100,
        //     headerAlign: "center", align: "center",

        // },
        // {
        //     field: 'vendorType',
        //     headerName: 'Vendor Type',
        //     headerAlign: "center",
        //     align: "center",

        //     width: 300,

        //     renderHeader: (params) => {
        //         params.colDef.headerAlign = "center"
        //         return params.colDef.headerName;
        //     },
        //     renderCell: (params) => {
        //         const { row } = params;

        //         const types = [];
        //         if (row.oem === "1") types.push('OEM');
        //         if (row.customer === "1") types.push('Customer');
        //         if (row.supplier === "1") types.push('Supplier');
        //         if (row.subContractor === "1") types.push('Sub Contractor');

        //         return types.join(' | ');
        //     },
        // },
    ];

    // const handleVendor = async (params) => {
    //     console.log(params)
    //     setDepartmentData(params.row)
    //     setDepStateId(params.id)
    //   }
    const [filteredData, setFilteredData] = useState([])

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === "vendorType") {
            if (value === "all") {
                setFilteredData(vendorDataList)
            } else {
                const vendorType = vendorDataList.filter((item) => (item[value] === "1"))
                setFilteredData(vendorType)
            }
        }
    }


    return (
        <div style={{ fontSize: "smaller", padding: "3px", margin: "5px", my: "5px" }}>


            <Paper sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                mb: 1,

            }} elevation={12}
            >
                <div className='row g-2'>

                    <div className='col-4 me-2'>
                        <TextField label="Vendor Type"
                            id="vendorTypeId"
                            select
                            defaultValue=""
                          onChange={handleFilterChange}
                            size="small"
                            sx={{ width: "101%" }}

                            name="vendorType" >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="oem">OEM</MenuItem>
                            <MenuItem value="customer">Customer</MenuItem>
                            <MenuItem value="supplier">Supplier</MenuItem>
                            <MenuItem value="subContractor">SubContractor</MenuItem>

                        </TextField>

                    </div>

                    <div style={{ height: 480, width: '100%', marginTop: "0.5rem" }}>
                        <DataGrid disableDensitySelector
                            rows={filteredData}
                            columns={vendorListColumns}
                            getRowId={(row) => row._id}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
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
                                        <GridToolbarQuickFilter />
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


                            pageSizeOptions={[10]}


                        />
                    </div>

                </div>
            </Paper>



        </div>
    )
}

export default VendorUpload