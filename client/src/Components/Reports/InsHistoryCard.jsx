import React from "react";
import { Container, TextField, MenuItem, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, } from "@mui/material";
import { AdapterDayjs, } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import { DisabledByDefault, PrintRounded } from '@mui/icons-material';
import HistoryCardPrint from './HistoryCardPrint';
export const HistoryCardContent = createContext(null);


function InsHistoryCard() {
    const [itemList, setItemList] = useState([]);
    const [itemCalList, setItemCalList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filteredIMTEs, setFilteredIMTEs] = useState([]);
    const [distItemName, setDistItemNames] = useState([]);
    const [calDetails, setCalDetails] = useState([]);
    const [selectedIMTEs, setSelectedIMTEs] = useState([])
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [selectedRow, setSelectedRow] = useState([]);


    const [historyCardPrintOpen, setHistoryCardPrintOpen] = useState(false);
    const [formatNoData, setFormatNoData] = useState([])
    const formatFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/formatNo/getFormatNoById/1`
            );
            const format = response.data.result
            console.log(format)
            setFormatNoData(format)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        formatFetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`);
                setItemList(response.data.result);
                setFilteredData(response.data.result);

                const uniqueInstrumentNames = Array.from(new Set(response.data.result.map(item => item.itemAddMasterName)));
                setDistItemNames(uniqueInstrumentNames);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    useEffect(() => {
        const calData = async () => {
            try {
                const itemCals = await axios.get(`${process.env.REACT_APP_PORT}/itemCal/getAllItemCals`);
                console.log(itemCals.data.result)
                setItemCalList(itemCals.data.result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        calData();
    }, []);
    console.log(itemCalList)
    console.log(selectedIMTEs)

    const handleCalDetails = (e) => {
        const { name, value } = e.target;


        if (name === "calInsName") {
            handleInsChange(value);
        }

        if (name === "calInsIMTENo") {
            handleInsIMTENoSelection(value);
        } else {
            resetFilteredData();
        }
        console.log(e, "1")
    };

    const handleInsChange = (value) => {
        const imte = itemList.filter((item) => item.itemAddMasterName === value);
        const distinctImte = imte.reduce((accumulator, currentObject) => {
            // Check if an object with the same id already exists in the accumulator
            const existingObject = accumulator.find(obj => obj.itemIMTENo === currentObject.itemIMTENo);

            // If not, add the current object to the accumulator
            if (!existingObject) {
                accumulator.push(currentObject);
            }

            return accumulator;
        }, []);
        setFilteredIMTEs(distinctImte);
    };
    console.log(itemCalList[0]?.calcalibrationData)

    const handleInsIMTENoSelection = (value) => {
        console.log(value)
        const selectedImtes = itemCalList.filter(cal => cal.calIMTENo === value)
        setSelectedIMTEs(selectedImtes)

        const selectedItemAdd = itemList.filter((item) => item.itemIMTENo === value)
        console.log(selectedItemAdd)
        setSelectedRow(selectedItemAdd)


    };
    console.log(selectedRow)
    console.log(selectedRow.acceptanceCriteria)

    const resetFilteredData = () => {
        setFilteredData(itemList);
    };

    const filterByDate = (items, fromDate, toDate) => {
        return items.filter((row) => {
            const calDate = dayjs(row.calItemCalDate);
            return (
                (!fromDate || calDate.isSameOrAfter(fromDate, 'day')) &&
                (!toDate || calDate.isSameOrBefore(toDate, 'day'))
            );
        });
    };

    const filteredSelectedIMTEs = filterByDate(selectedIMTEs, fromDate, toDate);



    const columns = [
        { field: 'id', headerName: 'SlNo', width: 50, align: "center", renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'calItemCalDate', headerName: 'Calibration Date', width: 150, align: "center", valueGetter: (params) => dayjs(params.row.calItemCalDate).format('DD-MM-YYYY') },
        { field: 'calStatus', headerName: 'Calibration Status', width: 150, align: "center", },
        { field: 'calItemDueDate', headerName: 'Next calibration Date', width: 150, align: "center", valueGetter: (params) => dayjs(params.row.calItemDueDate).format('DD-MM-YYYY') },
        { field: 'col5', headerName: 'Certificate Status', width: 150, align: "center", },
        { field: 'calCertificateNo', headerName: 'Certificate No', width: 150, align: "center", },
        ...(selectedRow[0]?.itemType === 'variable'
            ? [{
                field: 'calOBError',
                headerName: 'Observed Error',
                width: 150,
                align: 'center',
                renderCell: (params) => (
                  <div>
                    {params.row.calcalibrationData.map((cal, index) => (
                      <span key={index}>
                        {cal.calOBError}
                        {index < params.row.calcalibrationData.length - 1 && <br />} 
                      </span>
                    ))}
                  </div>
                ),
              }]
            : [{ field: 'observedSize', headerName: "Observed Size", width: 150, align: "center", 
            renderCell: (params) => (
              <div>
                {params.row.calcalibrationData.map((cal, index) => (
                  <span key={index}>
                    {"Min : " + cal.calMinPS}<br />
                    {"Max : " + cal.calMaxPS}
                    {index < params.row.calcalibrationData.length - 1 && <br />} 
                  </span>
                ))}
              </div>
            ),
        }]),
        { field: 'itemCalibrationSource', headerName: 'Calibrated At', width: 150, align: "center", renderCell: (params) => params.row.calSource || selectedRow[0]?.itemCalibrationSource },
    ];

    console.log(selectedRow[0])



    const handlePrintClick = () => {
        setHistoryCardPrintOpen(true);
    };



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
                                    <TextField label="Instrument Name" size="small" onChange={handleCalDetails} select name="calInsName" value={calDetails.calInsName} fullWidth >
                                        <MenuItem value="all">All</MenuItem >
                                        {distItemName.map((cal) => (
                                            <MenuItem value={cal}>{cal}</MenuItem >
                                        ))}

                                    </TextField>
                                </div>
                                <div className="col-2"><TextField
                                    label="IMTE No"
                                    size="small"
                                    select
                                    onChange={handleCalDetails}
                                    name="calInsIMTENo"
                                    value={calDetails.calInsIMTENo}
                                    fullWidth
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    {filteredIMTEs.map(cal => (
                                        <MenuItem key={cal.itemIMTENo} value={cal.itemIMTENo}>
                                            {cal.itemIMTENo}
                                        </MenuItem>
                                    ))}
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
                                        format="DD-MM-YYYY"
                                        value={fromDate}
                                        onChange={(date) => setFromDate(date)}
                                    />
                                </div>
                                <div className="col-2">
                                    <DatePicker
                                        fullWidth
                                        id="toDateId"
                                        name="toDate"
                                        sx={{ width: "100%" }}
                                        label="To Date"
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY"
                                        value={toDate}
                                        onChange={(date) => setToDate(date)}
                                    />
                                </div>

                                <div className="row">
                                    <div className=" col-md-3  g-2 mb-3 d-flex justify-content-start">
                                        <div ><Button>Excel</Button></div>
                                        {selectedRow[0]?.itemIMTENo && <div>
                                            <Button size="small" variant="contained" onClick={handlePrintClick} startIcon={<PrintRounded />}>
                                                Print
                                            </Button>
                                        </div>}


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
                        </Paper>
                        <div className="row">
                            <div className="col-8">
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 2
                                    }}
                                    elevation={12}>
                                    <div className="row g-2 mb-2">
                                        <div className="form-floating col-3">
                                            <TextField label="Serial No."
                                                value={selectedRow[0]?.itemMFRNo} size="small" name="itemMFRNo" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="form-floating col-3">
                                            <TextField label="Model No."
                                                value={selectedRow[0]?.itemModelNo} size="small" name="itemModelNo" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="form-floating col-3">
                                            <TextField
                                                label="Range / Size"
                                                value={`${selectedRow[0]?.itemRangeSize || ''} ${selectedRow[0]?.itemRangeSizeUnit || ''}`}
                                                size="small"
                                                name="itemRangeSize"
                                                InputProps={{ readOnly: true }}
                                                InputLabelProps={{ shrink: true }}
                                            ></TextField>
                                        </div>
                                        <div className="form-floating col-3">
                                            <TextField label="Calibration Source"
                                                value={selectedRow[0]?.itemCalibrationSource} size="small" name="itemCalibrationSource" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                    </div>
                                    <div className="row g-2 mb-2">
                                        <div className="form-floating col d-flex-md-5">
                                            <TextField label="Location"
                                                value={selectedRow[0]?.itemCurrentLocation} size="small" name="itemCurrentLocation" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="form-floating col d-flex-md-5">
                                            <TextField label="Frequency In Months"
                                                value={selectedRow[0]?.itemCalFreInMonths} size="small" name="itemCalFreInMonths" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="form-floating col d-flex-md-5">
                                            <TextField
                                                label="Make"
                                                value={selectedRow[0]?.itemMake}
                                                size="small"
                                                name="itemMake"
                                                InputProps={{ readOnly: true }}
                                                InputLabelProps={{ shrink: true }}
                                            ></TextField>
                                        </div>
                                    </div>
                                </Paper>
                            </div>
                            <div className="col-4">
                                <Paper
                                    sx={{
                                        p: 0.5,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 2
                                    }}
                                    elevation={12}>
                                    <div className="form-floating col d-flex-md-5">
                                        <h6 className="text-center">Permissible Size</h6>
                                        <table className="table table-sm table-bordered text-center align-middle p-0">
                                            <thead>
                                                <tr>
                                                    <th>Parameter</th>
                                                    <th>Min</th>
                                                    <th>Max</th>
                                                    <th>Wear Limit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedRow.length > 0 &&
                                                    selectedRow[0].acceptanceCriteria.map(item => (
                                                        <tr>
                                                            <td>{item.acParameter || '-'}</td>
                                                            <td>{item.acMinPS || '-'}</td>
                                                            <td>{item.acMaxPS || '-'}</td>
                                                            <td>{item.acWearLimitPS || '-'}</td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </Paper>
                            </div>
                        </div>
                        <Paper>

                            <DataGrid
                                rows={selectedIMTEs.filter((row) => {
                                    const calDate = dayjs(row.calItemCalDate);
                                    return (
                                        (!fromDate || calDate.isSameOrAfter(fromDate, 'day')) &&
                                        (!toDate || calDate.isSameOrBefore(toDate, 'day'))
                                    );
                                })}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                getRowId={(row) => row._id}
                                pageSizeOptions={[5, 10]}
                            />


                        </Paper>

                    </Container>
                </form>
            </LocalizationProvider>
            <HistoryCardContent.Provider
                value={{
                    historyCardPrintOpen,
                    setHistoryCardPrintOpen,
                    selectedRow,
                    selectedInstrumentName: calDetails.calInsName,
                    selectedIMTENo: calDetails.calInsIMTENo,
                    distItemName,
                    formatNoData,
                    selectedIMTEs: filteredSelectedIMTEs,
                }}
            >
                <HistoryCardPrint />
            </HistoryCardContent.Provider>
        </div>
    );
}

export default InsHistoryCard;