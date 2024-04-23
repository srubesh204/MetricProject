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
import Autocomplete from '@mui/material/Autocomplete';
import jsPDF from "jspdf";
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

    const [approvedByList, setApprovedByList] = useState([])

    const adminAndPlantAdmin = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/employee/getPlantAdminAndAdminByPlant`, {allowedPlants: allowedPlants}
            );
            setApprovedByList(response.data.result)
            console.log(response.data.result)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        adminAndPlantAdmin();
    }, []);


    const formatFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/formatNo/getFormatNoById/formatNo`
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
                `${process.env.REACT_APP_PORT}/compDetails/getCompDetailsById/companyData`
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
            const response = await axios.post(`${process.env.REACT_APP_PORT}/itemMaster/getMasterByPlant`, { allowedPlants: allowedPlants });
            console.log(response.data.result)
            setMasters(response.data.result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        masterFetch()
    }, [])




    const [itemList, setItemList] = useState([]);
    const [selectedPlantDatas, setSelectedPlantDatas] = useState([])

    const [itemListDistNames, setItemListDistNames] = useState([])
    const [itemIMTEs, setItemIMTEs] = useState([{ itemIMTENo: "Select" }])
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




    const generatePDF = () => {
        const doc = new jsPDF({
          orientation: "l",
          unit: "pt",
          format: [842, 595],
        });
        let dataToExport = filteredData.length> 0 ? filteredData : []
    
      const tableData = dataToExport.map((item, index) => {
        const paidAmount = item.paymentDetails
          ? `INR ${item.paymentDetails.paidAmount}`
          : "";
        const paymentDetails = item.paymentDetails
          ? `Total MRP: INR ${item.paymentDetails.totalMrp}\nCoupon Discount: INR ${item.paymentDetails.couponDiscount}\nTotal Discount: INR ${item.paymentDetails.totalDiscount}\nPaid Amount: INR ${item.paymentDetails.paidAmount}`
          : "";
            return [
              index + 1,
              item.billingDetails.name,
              item.billingDetails.email,
              item.items.courses.map((v) => `• ${v.title}`).join("\n"),
              paidAmount,
              paymentDetails,
              new Date(item.createdAt).toLocaleDateString(),
              item.status,
            ];
          });
    
        doc.autoTable({
          head: [
            [
              "S.No",
              "Name",
              "Email",
              "Title",
              "Paid Amount",
              "Payment Details",
              "Last Date",
              "Status",
            ],
          ],
          body: tableData,
          columnStyles: {
            0: { cellWidth: 35 },
            1: { cellWidth: 100 },
            2: { cellWidth: 125 },
            3: { cellWidth: 140 },
            4: { cellWidth: 80 },
            5: { cellWidth: 150 },
            6: { cellWidth: 80 },
            7: { cellWidth: 60 },
          },
          styles: {
            overflow: "linebreak",
            columnStyles: { 5: { lineHeight: 1.5 } }, // Handle line breaks
          },
        });
    
        doc.save("course_purchase_list.pdf");
      };






    // const sortedFilterNameList = itemListDistNames.itemName.sort();

    const handleFilters = (e) => {
        const { name, value } = e.target;
        console.log(name, value)

        if (name === "itemPlant") {

            const dep = loggedEmp.plantDetails.filter(plant => plant.plantName === value);
            if (value === "Select") {
                setSelectedPlantDatas([])

            } else {
                setSelectedPlantDatas(dep.length > 0 ? dep[0].departments : [])
            }
            setSelectedRow([])
            setFilteredData([])

            setItemFilters(prev => ({ ...prev, itemDepartment: "Select", itemName: "Select", itemIMTENo: "Select" }))
        }
        if (name === "itemDepartment") {
            console.log(value)
            const itemDepWise = async () => {

                try {
                    const response = await axios.post(
                        `${process.env.REACT_APP_PORT}/itemAdd/getItemByDepartment`, { itemPlant: itemFilters.itemPlant, itemDepartment: value }
                    );
                    setItemListDistNames(response.data.result)
                    setSelectedRow([])
                    setFilteredData([])
                    console.log(response.data.result)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            itemDepWise()
            setItemFilters(prev => ({ ...prev, itemName: "Select", itemIMTENo: "Select" }))
        }
        if (name === "itemName") {
            const itemNameWise = async () => {
                try {
                    const response = await axios.post(
                        `${process.env.REACT_APP_PORT}/itemAdd/getItemByItemAddMasterName`,
                        {
                            itemPlant: itemFilters.itemPlant,
                            itemDepartment: itemFilters.itemDepartment,
                            itemName: value
                        }
                    );
                    setItemIMTEs(response.data.result.map(item => item.itemIMTENo))
                    setItemFilters(prev => ({ ...prev, itemIMTENo: "Select" }))
                    setSelectedRow([])
                    setFilteredData([])
                    console.log(response.data.result)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            itemNameWise()


        } if (name === "itemIMTENo") {

            const itemIMTEWise = async () => {

                try {
                    const encodedValue = encodeURIComponent(value);
                    const imteNo = await axios.get(
                        `${process.env.REACT_APP_PORT}/itemAdd/getItemByIMTENO/${encodedValue}`
                    );
                    if (imteNo.data.result) {
                        setSelectedRow(imteNo.data.result)
                        const data = itemHistoryData.filter(item => item.itemIMTENo === imteNo.data.result.itemIMTENo)
                        console.log(data)
                        setFilteredData(data)
                        const master = masters.filter(mas => mas.itemDescription === imteNo.data.result.itemAddMasterName)
                        setSelectedMasterData(master[0])
                    }
                    console.log(imteNo.data.result)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            itemIMTEWise()


        }
        setItemFilters(prev => ({ ...prev, [name]: value }))
    }

    // const searchFilter = () => {
    //     if (itemFilters.itemPlant && itemFilters.itemDepartment && itemFilters.itemName && itemFilters.itemIMTENo) {
    //         const filteredItems = itemList.filter((item) => (
    //             item.itemPlant === itemFilters.itemPlant &&
    //             item.itemDepartment === itemFilters.itemDepartment &&
    //             item.itemName === itemFilters.itemName &&
    //             item.itemIMTENo === itemFilters.itemIMTENo
    //         ));

    //         console.log(filteredItems);
    //         setFilteredData(filteredItems);
    //     }
    // };


    // console.log(selectedMasterData)
    //console.log(selectedRow)

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

    //console.log(itemCalList)
    //console.log(selectedIMTEs)

    //console.log(selectedRow)

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

    // console.log(selectedRow)

    const historyColumns = [
        { field: 'id', headerName: 'Sr.No', width: 50, align: "center", renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        {
            field: 'certificateView',
            headerName: 'Certificate',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                params.row.itemCalibrationSource === 'inhouse' && params.row.itemCertificateNo ? (
                    <IconButton size="small" component={Link} target="_blank" to={`${process.env.REACT_APP_PORT}/calCertificates/${params.row.itemCertificateNo}.pdf`}>
                        <FileCopy />
                    </IconButton>
                ) : (
                    params.row.itemCertificateName ? (
                        <IconButton size="small" component={Link} target="_blank" to={`${process.env.REACT_APP_PORT}/itemCertificates/${params.row.itemCertificateName}`}>
                            <FileOpen />
                        </IconButton>
                    ) : (
                        // Render something else when there is no file uploaded
                        <span></span>
                    )
                )
            ),
        },


        { field: 'itemCalDate', headerName: 'Calibration Date', width: 150, align: "center", headerAlign: 'center', valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY') },
        { field: 'itemDueDate', headerName: 'Calibration Due', width: 150, align: "center", headerAlign: 'center', valueGetter: (params) => dayjs(params.row.itemDueDate).format('DD-MM-YYYY') },
        { field: 'itemCalStatus', headerName: 'Calibration Status', width: 150, align: "center", },

        { field: 'itemCertificateNo', headerName: 'Certificate No', width: 180, align: "center", headerAlign: 'center',},
        {
            field: 'observedSize', headerName: "Observed Size", width: 200, align: "center", headerAlign: 'center',
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
        ...(selectedRow?.itemCalibrationSource !== 'outsource' ? [{
            field: 'itemCalibratedBy',
            headerName: 'Calibrated By',
            width: 150,
            align: "center",
            renderCell: (params) => (
                params.row.itemCalibratedBy ? params.row.itemCalibratedBy : ""
            )
        },
        {
            field: 'itemCalApprovedBy',
            headerName: 'Approved By',
            width: 150,
            align: "center",
            renderCell: (params) => {
                const adminName = approvedByList.filter(emp => emp._id === params.row.itemCalApprovedBy)
                console.log(adminName)
                return(
                 adminName.length > 0 ? adminName[0].firstName + " " + adminName[0].lastName : ""
            )}
        }] : []),

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
                                <div className="col-md-8">
                                    <div className="row g-2">
                                        <div className="col">
                                            <TextField label="Plant Wise"

                                                id="itemPlantId"
                                                select
                                                value={itemFilters.itemPlant}
                                                fullWidth
                                                //disabled={loggedEmp.plantDetails.length === 1} _
                                                onChange={handleFilters}
                                                size="small"
                                                name="itemPlant" >
                                                <MenuItem value="Select">Select</MenuItem>
                                                {loggedEmp.plantDetails.map((item, index) => (
                                                    <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                                ))}
                                            </TextField>
                                        </div>

                                        <div className="col">
                                            <TextField label="Primary Location"
                                                id="itemDepartmentId"

                                                select
                                                value={itemFilters.itemDepartment}
                                                fullWidth
                                                //disabled={loggedEmp.plantDetails.length === 1 && loggedEmp.plantDetails[0].departments.length === 1}
                                                onChange={handleFilters}
                                                size="small"
                                                name="itemDepartment">
                                                <MenuItem value="Select">Select</MenuItem>
                                                {selectedPlantDatas.map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                ))}
                                            </TextField>
                                        </div>

                                        <div className="col">
                                            <TextField label="Instrument Name" size="small" onChange={handleFilters} id="itemNameId" select name="itemName" value={itemFilters.itemName} fullWidth >
                                                <MenuItem value="Select">Select</MenuItem >
                                                {itemListDistNames.map((item) => (
                                                    <MenuItem value={item.itemAddMasterName}>{item.itemAddMasterName}</MenuItem >
                                                ))}

                                            </TextField>
                                        </div>


                                        {/* <TextField
                                            label="IMTE No"
                                            size="small"
                                            select
                                            id="itemIMTENoId"
                                            onChange={handleFilters}
                                            name="itemIMTENo"
                                            value={itemFilters.itemIMTENo}
                                            fullWidth
                                            className=" me-2"
                                        >
                                            <MenuItem value="Select">Select</MenuItem>
                                            {itemIMTEs.map((item, index) => (
                                                <MenuItem key={index} value={item.itemIMTENo}>
                                                    {item.itemIMTENo}
                                                </MenuItem>
                                            ))}
                                        </TextField> */}

                                        {/* <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            className=" mt-2 "
                                            options={itemIMTEs}
                                            size='small'
                                            fullWidth
                                            value={itemFilters.itemIMTENo}
                                            onInputChange={(e, newValue) => MainFilter(newValue, "itemIMTENo")}
                                            name="itemIMTENo"
                                            getOptionLabel={(item) => item.itemIMTENo}
                                            renderInput={(params) => <TextField {...params} label="IMTE No" />}
                                        /> */}
                                        <div className="col">
                                            <Autocomplete
                                                disablePortal
                                                id="itemIMTENo"
                                                options={itemIMTEs}
                                                size='small'
                                                fullWidth
                                                value={itemFilters.itemIMTENo}
                                                onInputChange={(e, newValue) => handleFilters({ target: { name: "itemIMTENo", value: newValue } })}
                                                name="itemIMTENo"
                                                renderInput={(params) => <TextField {...params} label="IMTE No" />}
                                            />
                                        </div>

                                        {/* <Button type="button" className="col" onClick={() => searchFilter()} >search</Button> */}
                                    </div>
                                </div>
                                <div className="col">

                                </div>
                                <div className="col-md-3">
                                    <div className="row g-2">
                                        <div className="col">
                                            <DatePicker
                                                id="fromDateId"
                                                name="fromDate"
                                                label="From Date"
                                                className="col me-2"
                                                fullWidth
                                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                format="DD-MM-YYYY"
                                                value={fromDate}
                                                onChange={(date) => setFromDate(date)}
                                            />
                                        </div>
                                        <div className="col">
                                            <DatePicker
                                                id="toDateId"
                                                name="toDate"
                                                className="col"
                                                fullWidth
                                                label="To Date"
                                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                format="DD-MM-YYYY"
                                                value={toDate}
                                                onChange={(date) => setToDate(date)}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="row g-2">
                                <div className=" col d-flex justify-content-start">
                                    {selectedRow?.itemIMTENo && <div>
                                        <div><Button size="small" variant="contained" onClick={() => setPrintState(true)} startIcon={<PrintRounded />}>
                                            Print
                                        </Button></div>
                                    </div>}
                                </div>
                                <div className="col d-flex justify-content-end">
                                    <div className="me-2"><Button component={Link} to={`${process.env.REACT_APP_PORT}/additionalCertificates/${selectedRow ? selectedRow?.rdName : ""}`} target="_blank" variant="contained" color="info" size="small">R&R</Button></div>
                                    <div className="me-2">
                                        <Button component={Link} to={`${process.env.REACT_APP_PORT}/additionalCertificates/${selectedRow ? selectedRow?.msaName : ""}`} target="_blank" variant="contained" color="info" size="small">MSA</Button>
                                    </div>
                                    <div className="me-2">
                                        <Button component={Link} to={`${process.env.REACT_APP_PORT}/additionalCertificates/${selectedRow ? selectedRow?.otherFile : ""}`} target="_blank" variant="contained" color="info" size="small">Drawing</Button>
                                    </div>
                                    <div className="me-2"><Button component={Link} to={`${process.env.REACT_APP_PORT}/workInstructions/${selectedMasterData ? selectedMasterData.workInsName : ""}`} target="_blank" variant="contained" color="info" size="small">View Instructions</Button></div>
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
                                                value={selectedRow?.itemMFRNo || "-"} size="small" name="itemMFRNo" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="col-md-3">
                                            <TextField label="Model No."
                                                value={selectedRow?.itemModelNo || "-"} size="small" name="itemModelNo" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="col-md-3">
                                            <TextField
                                                label="Range / Size"
                                                value={`${selectedRow?.itemRangeSize || '-'} ${selectedRow?.itemRangeSizeUnit || ''}`}
                                                size="small"
                                                name="itemRangeSize"
                                                InputProps={{ readOnly: true }}
                                                InputLabelProps={{ shrink: true }}
                                            ></TextField>
                                        </div>
                                        {selectedRow[0]?.itemType === "variable" && <div className="col-md-3">
                                            <TextField
                                                label="Least count"
                                                value={selectedRow?.itemLC || "-"}
                                                size="small"
                                                name="itemLC"
                                                InputProps={{ readOnly: true }}
                                                InputLabelProps={{ shrink: true }}
                                            ></TextField>
                                        </div>}

                                    </div>
                                    <div className="row g-2 ">
                                        <div className="col-md-3">
                                            <TextField label="Calibration Source"
                                                value={selectedRow?.itemCalibrationSource || "-"} size="small" name="itemCalibrationSource" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="col-md-3">
                                            <TextField label="Location"
                                                value={selectedRow?.itemCurrentLocation || "-"} size="small" name="itemCurrentLocation" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="col-md-3">
                                            <TextField label="Cal Frequency"
                                                    value={`${selectedRow?.itemCalFreInMonths || '-'} ${selectedRow?.itemCalFrequencyType || ''}`} size="small" name="itemCalFreInMonths" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }}></TextField>
                                        </div>
                                        <div className="col-md-3">
                                            <TextField
                                                label="Make"
                                                value={selectedRow?.itemMake || "-"}
                                                size="small"
                                                name="itemMake"
                                                InputProps={{ readOnly: true }}
                                                InputLabelProps={{ shrink: true }}
                                            ></TextField>
                                        </div>
                                    </div>
                                </Paper>
                            </div>
                            <div className="col-4 " style={{ maxHeight: "170px", overflow: "auto", height: "60%", minHeight: "170px" }}>
                                {selectedRow && selectedRow.acceptanceCriteria && selectedRow.acceptanceCriteria.length > 0 && <Paper
                                    sx={{
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',

                                    }}
                                    elevation={12}>
                                    <div className="col ">
                                        {selectedRow && selectedRow.itemType === "variable" && <table className="table table-sm table-bordered text-center align-middle" style={{ fontSize: "small" }}>
                                            <thead>
                                                <tr >
                                                    <th>Parameter</th>
                                                    <th>Min</th>
                                                    <th>Max</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    selectedRow && selectedRow.acceptanceCriteria.map(item => (
                                                        <tr>
                                                            <td>{item.acParameter || '-'}</td>
                                                            <td>{item.acMinPSError || '-'}</td>
                                                            <td>{item.acMaxPSError || '-'}</td>

                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>}
                                        {selectedRow && selectedRow.itemType === "attribute" && <table className="table table-sm table-bordered text-center align-middle" style={{ fontSize: "small" }}>
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
                                                    selectedRow && selectedRow?.acceptanceCriteria.map(item => (
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
                                        {selectedRow && selectedRow.itemType === "referenceStandard" && <table className="table table-sm table-bordered text-center align-middle" style={{ fontSize: "small" }}>
                                            <thead>                                                         
                                                <tr >
                                                    <th>Parameter</th>
                                                    <th>Min</th>
                                                    <th>Max</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    selectedRow && selectedRow.acceptanceCriteria.map(item => (
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
                                </Paper>}
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
                                    disableColumnFilter
                                    disableDensitySelector
                                    density="compact"
                                />
                            </div>
                            <div className='row'>
                                <div className='col'>
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
                    approvedByList,
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