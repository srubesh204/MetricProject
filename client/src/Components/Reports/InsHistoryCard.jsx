import React from "react";
import { Container, TextField, MenuItem, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, } from "@mui/material";
import { AdapterDayjs, } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import { DisabledByDefault, FileOpen, Pages, PrintRounded } from '@mui/icons-material';
import { useEmployee } from "../../App";
import { ArrowBack, Error, HomeMax, House, Mail, MailLock, } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import HistoryCardPrint from './HistoryCardPrint';
import { Link } from "react-router-dom";
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
    const [printState, setPrintState] = useState(false)

    const empRole = useEmployee()
    const { employee, loggedEmp } = empRole


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

    const [itemFilters, setItemFilters] = useState({
        itemPlant: "All",
        itemDepartment: "All",
        itemName: "All",
        itemIMTENo: "All"
    })


    const handleFilters = (e) => {
        const {name, value} = e.target;
        setItemFilters(prev => ({...prev, [name]: value}))
    }


   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_PORT}/itemHistory/getAllItemHistory`);
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



   


    

    console.log(itemCalList)
    console.log(selectedIMTEs)
    
  
   

    console.log(selectedRow)
    console.log(selectedRow.acceptanceCriteria)

   

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



    const grnColumns = [
        { field: 'id', headerName: 'Si.No', width: 50, align: "center", renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        { field: 'certificateView', headerName: 'Certificate', width: 100, align: "center", renderCell: (params) => <IconButton size="small" component={Link} target="_blank" to={`${process.env.REACT_APP_PORT}/grnCertificates/${params.row.grnItemCertificate}`} ><FileOpen /></IconButton> },
        { field: 'grnItemCalDate', headerName: 'Calibration Date', width: 150, align: "center", valueGetter: (params) => dayjs(params.row.grnItemCalDate).format('DD-MM-YYYY') },
        { field: 'grnItemCalStatus', headerName: 'Calibration Status', width: 150, align: "center", },
        { field: 'grnItemDueDate', headerName: 'Next calibration Date', width: 150, align: "center", valueGetter: (params) => dayjs(params.row.grnItemDueDate).format('DD-MM-YYYY') },
        { field: 'grnItemCertificateStatus', headerName: 'Certificate Status', width: 150, align: "center", },
        { field: 'grnItemCertificateNo', headerName: 'Certificate No', width: 150, align: "center", },
        ...(selectedRow[0]?.itemType === 'variable'
            ? [{
                field: 'calOBError',
                headerName: 'Observed Error',
                width: 150,
                align: 'center',
                renderCell: (params) => (
                    <div>
                        {params.row.grnAcCriteria.map((grn, index) => (
                            <span key={index}>
                                {grn.grnAcOBError}
                                {index < params.row.grnAcCriteria.length - 1 && <br />}
                            </span>
                        ))}
                    </div>
                ),
            }]
            : [{
                field: 'observedSize', headerName: "Observed Size", width: 150, align: "center",
                renderCell: (params) => (
                    <div>
                        {params.row.grnAcCriteria.map((grn, index) => (
                            <span key={index}>
                                {"Min : " + grn.grnAcMinPSError}<br />
                                {"Max : " + grn.grnAcMaxPSError}
                                {index < params.row.grnAcCriteria.length - 1 && <br />}
                            </span>
                        ))}
                    </div>
                ),
            }]),
        { field: 'itemCalibrationSource', headerName: 'Calibrated At', width: 150, align: "center" },
    ];

    const calColumn = [
        { field: 'id', headerName: 'Si.No', width: 50, align: "center", renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
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
            : [{
                field: 'observedSize', headerName: "Observed Size", width: 150, align: "center",
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

    const [departments, setDepartments] = useState([])
    const DepartmentFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            const defaultDepartment = response.data.result.filter((dep) => dep.defaultdep === "yes")
            setDepartments(defaultDepartment);

            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        DepartmentFetch()
    }, []);



  
   
    



    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>

                    <Container maxWidth sx={{ mb: 2, mt: 2 }}>

                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1
                            }}
                            elevation={12}
                        >
                            <div className="row mb-2">
                                <div className="col-md-7 ">
                                    <div className="row g-2">

                                        <TextField label="Plant Wise"
                                            className="me-2 col"
                                            id="hisPlantId"
                                            select
                                            value={itemFilters.itemPlant}
                                            fullWidth
                                            onChange={handleFilters}
                                            size="small"
                                            name="itemPlant" >
                                            <MenuItem value="All">All</MenuItem>
                                            {loggedEmp.plantDetails.map((item, index) => (
                                                <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                            ))}
                                        </TextField>

                                        <TextField label="Default Location "
                                            id="hisDepartmentId"
                                            className="me-2 col"
                                            select
                                            value={itemFilters.itemDepartment}
                                            fullWidth
                                            onChange={handleFilters}
                                            size="small"
                                            name="itemDepartment" >
                                            <MenuItem value="All">All</MenuItem>
                                            {departments.map((item, index) => (
                                                <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
                                            ))}


                                        </TextField>





                                        <TextField className="me-2 col" label="Instrument Name" size="small" onChange={handleFilters} select name="itemName" value={itemFilters.itemName} fullWidth >
                                            <MenuItem value="All">All</MenuItem >
                                            {distItemName.map((cal) => (
                                                <MenuItem value={cal}>{cal}</MenuItem >
                                            ))}

                                        </TextField>

                                        <TextField
                                            label="IMTE No"
                                            size="small"
                                            select
                                            onChange={handleFilters}
                                            name="calInsIMTENo"
                                            value={itemFilters.itemIMTENo}
                                            fullWidth
                                            className="col"
                                        >
                                            <MenuItem value="All">All</MenuItem>
                                            {filteredIMTEs.map(cal => (
                                                <MenuItem key={cal.itemIMTENo} value={cal.itemIMTENo}>
                                                    {cal.itemIMTENo}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>


                                </div>
                                <div className="col"></div>

                                <div className="col-md-3">
                                    <div className="row g-2">

                                        <DatePicker

                                            id="fromDateId"
                                            name="fromDate"
                                            label="From Date"
                                            className="col me-2"
                                            fullWidth
                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY"
                                            value={fromDate}
                                            onChange={(date) => setFromDate(date)}
                                        />

                                        <DatePicker

                                            id="toDateId"
                                            name="toDate"
                                            className="col"
                                            fullWidth
                                            label="To Date"
                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY"
                                            value={toDate}
                                            onChange={(date) => setToDate(date)}
                                        />

                                    </div>
                                </div>
                            </div>


                            <div className="row g-2">
                                <div className=" col d-flex justify-content-start">
                                    <div className="me-2"><Button variant="contained" size="small"  >Excel</Button></div>
                                    {selectedRow[0]?.itemIMTENo && <div>
                                        <div><Button size="small" variant="contained" onClick={() => setPrintState(true)} startIcon={<PrintRounded />}>
                                            Print
                                        </Button></div>
                                    </div>}


                                </div>

                                <div className="col d-flex justify-content-end">

                                    {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                                        <Viewer fileUrl={pdfUrl} onNumPagesChange={onNumPagesChange} />
                                    </Worker> */}
                                    <div className="me-2"><Button variant="contained" color="info" size="small">View Instructions</Button></div>
                                    <div className="me-2"><Button variant="contained" color="info" size="small">View Drawing</Button></div>
                                    <div className="me-2"><Button variant="contained" color="info" size="small">View R&R</Button></div>
                                    <div ><Button variant="contained" color="info" size="small">View MSA</Button></div>
                                </div>
                            </div>

                        </Paper>
                        <div className="row g-2 mb-2">
                            <div className="col-8">
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',

                                    }}
                                    elevation={12}>
                                    <div className="row g-2 mb-2">
                                        <div className="col-md-3">
                                            <TextField label="Serial No."
                                                value={selectedRow[0]?.itemMFRNo} size="small" name="itemMFRNo" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="col-md-3">
                                            <TextField label="Model No."
                                                value={selectedRow[0]?.itemModelNo} size="small" name="itemModelNo" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="col-md-3">
                                            <TextField
                                                label="Range / Size"
                                                value={`${selectedRow[0]?.itemRangeSize || ''} ${selectedRow[0]?.itemRangeSizeUnit || ''}`}
                                                size="small"
                                                name="itemRangeSize"
                                                InputProps={{ readOnly: true }}
                                                InputLabelProps={{ shrink: true }}
                                            ></TextField>
                                        </div>
                                        <div className="col-md-3">
                                            <TextField label="Calibration Source"
                                                value={selectedRow[0]?.itemCalibrationSource} size="small" name="itemCalibrationSource" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                    </div>
                                    <div className="row g-2 ">
                                        <div className="col-md-3">
                                            <TextField label="Location"
                                                value={selectedRow[0]?.itemCurrentLocation} size="small" name="itemCurrentLocation" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="col-md-3">
                                            <TextField label="Frequency In Months"
                                                value={selectedRow[0]?.itemCalFreInMonths} size="small" name="itemCalFreInMonths" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="col-md-3">
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
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',

                                    }}
                                    elevation={12}>
                                    <div className="col ">
                                        <table className="table table-sm table-bordered text-center align-middle" style={{ fontSize: "small" }}>
                                            <thead>
                                                <tr >
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
                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1


                            }}
                            elevation={12}>
                            <div className="mb-2" style={{ height: 350, width: '100%' }}>
                                <DataGrid
                                    rows={selectedIMTEs}
                                    columns={selectedRow.length > 0 ? selectedRow[0].itemCalibrationSource === "outsource" ? grnColumns : calColumn : []}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    getRowId={
                                        selectedRow.length > 0 && selectedRow[0].itemCalibrationSource === "outsource"
                                            ? (row) => row.grnItemId
                                            : (row) => row._id
                                    }
                                    sx={{
                                        ".MuiTablePagination-displayedRows": {

                                            "marginTop": "1em",
                                            "marginBottom": "1em"
                                        },

                                    }}
                                    slots={{
                                        toolbar: GridToolbar,
                                    }}
                                    disableRowSelectionOnClick
                                    density="compact"
                                />
                            </div>
                            <div className='row'>
                                <div className='col d-flex justify-content-end'>
                                    <div className='me-2'>
                                        <Button component={Link} to={`/home`} variant="contained" size='small' color="warning">
                                            <ArrowBackIcon /> Dash board
                                        </Button>
                                    </div>
                                    <div >
                                        <Button component={Link} to="/" size='small' variant='contained' startIcon={<ArrowBack />} endIcon={<House />} color='secondary'>Home</Button>
                                    </div>
                                </div>


                            </div>


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
                    printState, setPrintState,
                }}
            >
                <HistoryCardPrint />
            </HistoryCardContent.Provider>
        </div>
    );
}

export default InsHistoryCard;