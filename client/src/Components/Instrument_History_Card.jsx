import React from "react";
import { Container, TextField, MenuItem, Paper, Button } from "@mui/material";
import { AdapterDayjs, } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from "react";
import axios from 'axios';


const rows = [
    { id: 1, col1: 'Hello', col2: 'World', col3: 'Everyone', col4: 'Everyone', col5: 'Everyone', col6: 'Everyone', col7: 'Everyone', col8: 'Everyone' },
    // Add more rows as needed
  ];
  
  const columns = [
    { field: 'col1', headerName: 'SlNo', width: 150 },
    { field: 'col2', headerName: 'Calibration Date', width: 150 },
    { field: 'col3', headerName: 'Calibration Status', width: 150 },
    { field: 'col4', headerName: 'Next calibration Date', width: 150 },
    { field: 'col5', headerName: 'Certificate Status', width: 150 },
    { field: 'col6', headerName: 'Certificate No', width: 150 },
    { field: 'col7', headerName: 'Observed Size 1', width: 150 },
    { field: 'col8', headerName: 'Calibrated At', width: 150 },
    
    // Add more columns as needed
  ];

  
function Instrument_History_Card() {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_PORT}/itemCal/getAllItemCals`
          );
          console.log(response.data); // Handle the response data as needed
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // Call the function to fetch data when the component mounts
    }, []);
    
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>

                    <Container maxWidth sx={{ mb: 2, mt: 2 }}>
                        <h1 className="text-center">Instrument History Card</h1>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1
                            }}
                            elevation={12}
                        >
                            <div container spacing={2} className="row g-2">
                                <div className="col-3">
                                    <TextField label="Instrument Name" size="small" className="form-select" select name="instrumentName" defaultValue="" fullWidth >
                                        <MenuItem value="">Instrument Name</MenuItem >
                                        <MenuItem value="1">1</MenuItem >
                                        <MenuItem value="2">2</MenuItem >
                                        <MenuItem value="3">3</MenuItem >
                                        <MenuItem value="4">4</MenuItem >
                                    </TextField>
                                </div>
                                <div className="col-2">
                                    <TextField label="IMTE No" size="small" className="form-select" select name="imteNo" defaultValue="" fullWidth >
                                        <MenuItem value="">IMTE No</MenuItem >
                                        <MenuItem value="1">1</MenuItem >
                                        <MenuItem value="2">2</MenuItem >
                                        <MenuItem value="3">3</MenuItem >
                                        <MenuItem value="4">4</MenuItem >
                                    </TextField>
                                </div>

                                <div className="col-2 offset-3">
                                    <DatePicker
                                        fullWidth
                                        id="fromDateId"
                                        name="fromDate"
                                        label="From Date"
                                        sx={{ width: "100%" }}
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>
                                <div className="col-2">
                                    <DatePicker
                                        fullWidth
                                        id="toDateId"
                                        name="toDate"
                                        sx={{ width: "100%" }}
                                        label="To Date"
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>

                                <div className="row">
                                    <div className=" col-md-3  g-2 mb-3 d-flex justify-content-start">
                                        <div ><Button>Report</Button></div>
                                        <div ><Button>Excel</Button></div>
                                        <div ><Button>Close</Button></div>
                                    </div>
                                    <div className="col"></div>
                                    <div className="col-md-8  g-2 d-flex justify-content-between">
                                        <div ><Button>View Certificates</Button></div>
                                        <div ><Button>View Instructions</Button></div>
                                        <div ><Button>View Drawing</Button></div>
                                        <div ><Button>View R&R</Button></div>
                                        <div ><Button>View Attachment</Button></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <table className="table table-bordered text-center align-middle">
                                        <thead>
                                            <tr>
                                                <th>Serial No</th>
                                                <th>Model No</th>
                                                <th>Range / Size</th>
                                                <th>Calibration Source</th>
                                                <th>Premissible Size</th>
                                                <th>Location</th>
                                                <th>Frequency In Months</th>
                                                <th>Make</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Paper>
                        <Paper>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                        </Paper>
                    </Container>
                </form>
            </LocalizationProvider>
        </div>);
}

export default Instrument_History_Card;