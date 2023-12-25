import React from "react";
import { Container, TextField, MenuItem, Paper, Button } from "@mui/material";
import { AdapterDayjs, } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DataGrid } from '@mui/x-data-grid';

const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    // Add more rows as needed
  ];
  
  const columns = [
    { field: 'col1', headerName: 'SlNo', width: 150 },
    { field: 'col2', headerName: 'Calibration Date', width: 150 },
    // Add more columns as needed
  ];
  
function Instrument_History_Card() {
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

                                <div className="col-1 offset-5">
                                    <DatePicker
                                        fullWidth
                                        id="fromDateId"
                                        name="fromDate"
                                        label="From Date"
                                        sx={{ width: "100%" }}
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" />
                                </div>
                                <div className="col-1">
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
                                    <div className=" col-md-3 row g-2 mb-3">
                                        <div className="col"><Button>Report</Button></div>
                                        <div className="col"><Button>Excel</Button></div>
                                        <div className="col"><Button>Close</Button></div>
                                    </div>
                                    <div className="col"></div>
                                    <div className="col-md-8 row g-2 d-flex justify-content-end">
                                        <div className="col"><Button>View Certificates</Button></div>
                                        <div className="col"><Button>View Instructions</Button></div>
                                        <div className="col"><Button>View Drawing</Button></div>
                                        <div className="col"><Button>View R&R</Button></div>
                                        <div className="col"><Button>View Attachment</Button></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <table className="table">
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