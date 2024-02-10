import React, { Fragment } from "react";
import { Container, TextField, MenuItem, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, } from "@mui/material";
import { AdapterDayjs, } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import { DisabledByDefault, FileCopy, FileOpen, Pages, PrintRounded } from '@mui/icons-material';
import { useEmployee } from "../../App";
import { ArrowBack, Error, HomeMax, House, Mail, MailLock, } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import HistoryCardPrint from './HistoryCardPrint';
import { Link } from "react-router-dom";
export const HistoryCardContent = createContext(null);


function InsHistoryCard() {

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
    const { loggedEmp, allowedPlants } = empRole




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
    const [companyList, setCompanyList] = useState([])

    const companyFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/compDetails/getAllCompDetails`
            );
            setCompanyList(response.data.result);
            //setFilterCompany(response.data.result);

            console.log(response.data.result);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        companyFetch();
    }, []);

    const [plantList, setPlantList] = useState([])

    const Fetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/compDetails/getAllPlantDetails`
            );
            setPlantList(response.data.result);
            //setFilterCompany(response.data.result);

            console.log(response.data.result);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        Fetch();
    }, []);


    const [masters, setMasters] = useState([])
    const masterFetch = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PORT}/itemMaster/getAllItemMasters`);
            console.log(response.data.result)
            setMasters(response.data.result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        masterFetch()
    }, [])



    const [plantDepartments, setPlantDepartments] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [selectedPlantDatas, setSelectedPlantDatas] = useState([])
    const [selectedDepartmentData, setSelectedDepartmentData] = useState([])
    const [itemListDistNames, setItemListDistNames] = useState([])
    const [itemIMTEs, setItemIMTEs] = useState([])
    const [selectedMasterData, setSelectedMasterData] = useState([])

    const itemFetch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`, { allowedPlants: allowedPlants }
              );
            console.log(response.data.result)
            setItemList(response.data.result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        itemFetch()
    }, [])


    console.log(itemList)
    const [itemFilters, setItemFilters] = useState({
        itemPlant: "Select",
        itemDepartment: "Select",
        itemName: "Select",
        itemIMTENo: "Select"
    })

    // const sortedFilterNameList = itemListDistNames.itemName.sort();
    
    const handleFilters = (e) => {
        const { name, value } = e.target;
        setItemFilters(prev => ({ ...prev, [name]: value }))



        if (name === "itemPlant") {

            const dep = loggedEmp.plantDetails.filter(plant => plant.plantName === value);
            const plantDatas = itemList.filter(item => item.itemPlant === value)
            console.log(itemList)
            setSelectedPlantDatas(plantDatas)
            console.log(plantDatas)
            const nameList = [...new Set(plantDatas.map(item => item.itemDepartment))]
            console.log(dep)
            setPlantDepartments(nameList)
            setItemFilters(prev => ({ ...prev, itemDepartment: "Select", itemName: "Select", itemIMTENo: "Select" }))
        }
        if (name === "itemDepartment") {
            const filterList = selectedPlantDatas.filter(item => item.itemDepartment === value)
            const nameList = [...new Set(filterList.map(item => item.itemAddMasterName))].sort()
            setItemListDistNames(nameList)

            setItemFilters(prev => ({ ...prev, itemName: "Select", itemIMTENo: "Select" }))
            setSelectedDepartmentData(filterList)
        }
        if (name === "itemName") {
            console.log(value)
            const filterList = selectedDepartmentData.filter(item => item.itemAddMasterName === value)
            setItemIMTEs(filterList)
            setItemFilters(prev => ({ ...prev, itemIMTENo: "Select" }))
        } if (name === "itemIMTENo") {
            const imteNo = selectedDepartmentData.filter(item => item.itemIMTENo === value)
            setSelectedRow(imteNo)
            const data = itemHistoryData.filter(item => item.itemIMTENo === value)
            console.log(data)
            setFilteredData(data)

            const master = masters.filter(mas => mas.itemDescription === imteNo[0].itemAddMasterName)
            setSelectedMasterData(master[0])
        }



    }

    console.log(selectedMasterData)
    console.log(selectedRow)

    const [itemHistoryData, setItemHistoryData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_PORT}/itemHistory/getAllItemHistory`);
                setItemHistoryData(response.data.result)
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

    console.log(selectedRow)

    const historyColumns = [
        { field: 'id', headerName: 'Si.No', width: 50, align: "center", renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        {
            field: 'certificateView', headerName: 'Certificate', width: 100, align: "center", renderCell: (params) =>
                params.row.itemCalibrationSource === "inhouse" ?
                    <IconButton size="small" component={Link} target="_blank" to={`${process.env.REACT_APP_PORT}/calCertificates/${params.row.itemCertificateNo}.pdf`} ><FileCopy /></IconButton> :
                    <IconButton size="small" component={Link} target="_blank" to={`${process.env.REACT_APP_PORT}/itemCertificates/${params.row.itemCertificateName}`} ><FileOpen /></IconButton>
        },
        { field: 'itemCalDate', headerName: 'Calibration Date', width: 150, align: "center", valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY') },
        { field: 'itemDueDate', headerName: 'Calibration Due', width: 150, align: "center", valueGetter: (params) => dayjs(params.row.itemDueDate).format('DD-MM-YYYY') },
        { field: 'itemCalStatus', headerName: 'Calibration Status', width: 150, align: "center", },
        // { field: 'itemCertStatus', headerName: 'Certificate Status', width: 150, align: "center"},
        { field: 'itemCertificateNo', headerName: 'Certificate No', width: 180, align: "center" },

        {
            field: 'observedSize', headerName: "Observed Size", width: 180, align: "center",
            renderCell: (params) => (

                <div>
                    {params.row.acceptanceCriteria.map((item, index) => (
                        <span key={index}>
                            {item}<br />
                        </span>
                    ))}
                </div>
            ),
        },
        { field: 'itemCalibratedAt', headerName: 'Calibrated At', width: 150, align: "center" },
        { field: 'itemCalibratedBy', headerName: 'Calibrated By', width: 150, align: "center" },
        { field: 'itemCalApprovedBy', headerName: 'Approved By', width: 150, align: "center" },

    ];




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
                                            id="itemPlantId"
                                            select
                                            value={itemFilters.itemPlant}
                                            fullWidth
                                            onChange={handleFilters}
                                            size="small"
                                            name="itemPlant" >
                                            <MenuItem value="Select">Select</MenuItem>
                                            {loggedEmp.plantDetails.map((item, index) => (
                                                <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                            ))}
                                        </TextField>

                                        <TextField label="Primary Location "
                                            id="itemDepartmentId"
                                            className="me-2 col"
                                            select
                                            value={itemFilters.itemDepartment}
                                            fullWidth
                                            onChange={handleFilters}
                                            size="small"
                                            name="itemDepartment" >
                                            <MenuItem value="Select">Select</MenuItem>
                                            {plantDepartments.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))}


                                        </TextField>





                                        <TextField className="me-2 col" label="Instrument Name" size="small" onChange={handleFilters} id="itemNameId" select name="itemName" value={itemFilters.itemName} fullWidth >
                                            <MenuItem value="Select">Select</MenuItem >
                                            {itemListDistNames.map((item) => (
                                                <MenuItem value={item}>{item}</MenuItem >
                                            ))}

                                        </TextField>

                                        <TextField
                                            label="IMTE No"
                                            size="small"
                                            select
                                            id="itemIMTENoId"
                                            onChange={handleFilters}
                                            name="itemIMTENo"
                                            value={itemFilters.itemIMTENo}
                                            fullWidth
                                            className="col"
                                        >
                                            <MenuItem value="Select">Select</MenuItem>
                                            {itemIMTEs.map((item, index) => (
                                                <MenuItem key={index} value={item.itemIMTENo}>
                                                    {item.itemIMTENo}
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

                                    {selectedRow[0]?.itemIMTENo && <div>
                                        <div><Button size="small" variant="contained" onClick={() => setPrintState(true)} startIcon={<PrintRounded />}>
                                            Print
                                        </Button></div>
                                    </div>}


                                </div>

                                <div className="col d-flex justify-content-end">
                                    <div className="me-2"><Button component={Link} to={`${process.env.REACT_APP_PORT}/additionalCertificates/${selectedRow.length > 0 ? selectedRow[0].rdName : ""}`} target="_blank" variant="contained" color="info" size="small">R&R</Button></div>
                                    <div className="me-2">
                                        <Button component={Link} to={`${process.env.REACT_APP_PORT}/additionalCertificates/${selectedRow.length > 0 ? selectedRow[0].msaName : ""}`} target="_blank" variant="contained" color="info" size="small">MSA</Button>
                                    </div>
                                    <div className="me-2">
                                        <Button component={Link} to={`${process.env.REACT_APP_PORT}/additionalCertificates/${selectedRow.length > 0 ? selectedRow[0].otherFile : ""}`} target="_blank" variant="contained" color="info" size="small">Drawing</Button>
                                    </div>
                                    <div className="me-2"><Button component={Link} to={`${process.env.REACT_APP_PORT}/workInstructions/${selectedMasterData.workInsName}`} target="_blank" variant="contained" color="info" size="small">View Instructions</Button></div>
                                    {/* <div className="me-2"><Button variant="contained" color="info" size="small">View Drawing</Button></div>
                                    <div className="me-2"><Button variant="contained" color="info" size="small">View R&R</Button></div>
                                    <div ><Button variant="contained" color="info" size="small">View MSA</Button></div> */}
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
                                        {selectedRow.length > 0 && selectedRow[0].itemType === "variable" && <table className="table table-sm table-bordered text-center align-middle" style={{ fontSize: "small" }}>
                                            <thead>
                                                <tr >
                                                    <th>Parameter</th>
                                                    <th>Min</th>
                                                    <th>Max</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    selectedRow.length > 0 && selectedRow[0].acceptanceCriteria.map(item => (
                                                        <tr>
                                                            <td>{item.acParameter || '-'}</td>
                                                            <td>{item.acMinPSError || '-'}</td>
                                                            <td>{item.acMaxPSError || '-'}</td>

                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>}
                                        {selectedRow.length > 0 && selectedRow[0].itemType === "attribute" && <table className="table table-sm table-bordered text-center align-middle" style={{ fontSize: "small" }}>
                                            <thead>
                                                <tr >
                                                    <th>Parameter</th>
                                                    <th>Min</th>
                                                    <th>Max</th>
                                                    <th>Wear Limit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    selectedRow.length > 0 && selectedRow[0].acceptanceCriteria.map(item => (
                                                        <tr>
                                                            <td>{item.acParameter || '-'}</td>
                                                            <td>{item.acMinPS || '-'}</td>
                                                            <td>{item.acMaxPS || '-'}</td>
                                                            <td>{item.acWearLimitPS || '-'}</td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>}
                                        {selectedRow.length > 0 && selectedRow[0].itemType === "referenceStandard" && <table className="table table-sm table-bordered text-center align-middle" style={{ fontSize: "small" }}>
                                            <thead>
                                                <tr >
                                                    <th>Parameter</th>
                                                    <th>Min</th>
                                                    <th>Max</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    selectedRow.length > 0 && selectedRow[0].acceptanceCriteria.map(item => (
                                                        <tr>
                                                            <td>{item.acParameter || '-'}</td>
                                                            <td>{item.acMinPS || '-'}</td>
                                                            <td>{item.acMaxPS || '-'}</td>

                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>}
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
                                    rows={filteredData}
                                    columns={historyColumns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    getRowId={(row) => row._id}
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
                                    {/* <div >
                                        <Button component={Link} to="/" size='small' variant='contained' startIcon={<ArrowBack />} endIcon={<House />} color='secondary'>Home</Button>
                                    </div> */}
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
                    companyList,
                    plantList,
                    formatNoData,
                    selectedIMTEs: filteredData,
                    printState, setPrintState,
                }}
            >
                <HistoryCardPrint />
            </HistoryCardContent.Provider>
        </div>
    );
}

export default InsHistoryCard;