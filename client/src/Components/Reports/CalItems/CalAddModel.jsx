import React, { createContext, useEffect, useState, useContext } from 'react'
import { Alert, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, MenuItem, Paper, Snackbar, Switch, TextField } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalData } from './CalList'
import { Add, Close, Delete, ErrorOutline } from '@mui/icons-material';
import { useEmployee } from '../../../App';

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const CalAddModel = () => {


    const calData = useContext(CalData)
    const [lastResultData, setLastResultData] = useState([])
    const { calAddOpen, setCalAddOpen, itemMasters, activeEmps, calListFetchData } = calData

    const employeeRole = useEmployee()
    const [calibrationDatas, setCalibrationDatas] = useState([])

    const [selectedIMTE, setSelectedIMTE] = useState([]);
    const [distinctItemNames, setDistinctItemNames] = useState([])

    const getDistinctItemName = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllDistinctItemName`
            );
            console.log(response.data)
            setDistinctItemNames(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getDistinctItemName();
    }, []);




    const [selectedExtraMaster, setSelectedExtraMaster] = useState([])
    console.log(selectedIMTE[0])

    const [initialCalData, setInitialCalData] = useState({
        calItemId: "",
        calIMTENo: "",
        calItemName: "",
        calItemType: "",
        calRangeSize: "",
        calItemMFRNo: "",
        calLC: "",
        calItemMake: "",
        calItemTemperature: "",
        calItemHumidity: "",
        calItemUncertainity: "",
        calItemSOPNo: "",
        calStandardRef: "",
        calOBType: "",
        calCertificateNo: "",
        calItemCalDate: dayjs().format('YYYY-MM-DD'),
        calItemDueDate: "",
        calItemEntryDate: dayjs().format('YYYY-MM-DD'),
        calCalibratedBy: "",
        calApprovedBy: "",
        calBeforeData: "no",
        calStatus: "status",
        calcalibrationData: [{
            calParameter: "",
            calNominalSize: "",
            calNominalSizeUnit: "",
            calMinPS: "",
            calMaxPS: "",
            calWearLimitPS: "",
            calBeforeCalibration: "",
            calMinOB: "",
            calMaxOB: "",
            calAverageOB: "",
            calOBError: "",
            calMinPSError: "",
            calMaxPSError: "",
            rowStatus: ""
        }],
        calMasterUsed: [],
    })

    const [calibrationData, setCalibrationData] = useState({
        calItemId: "",
        calIMTENo: "",
        calItemName: "",
        calItemType: "",
        calRangeSize: "",
        calItemMFRNo: "",
        calLC: "",
        calItemMake: "",
        calItemTemperature: "",
        calItemHumidity: "",
        calItemUncertainity: "",
        calItemSOPNo: "",
        calStandardRef: "",
        calOBType: "",
        calCertificateNo: "",
        calItemCalDate: dayjs().format('YYYY-MM-DD'),
        calItemDueDate: "",
        calItemEntryDate: dayjs().format('YYYY-MM-DD'),
        calCalibratedBy: `${employeeRole.loggedEmp.firstName} ${employeeRole.loggedEmp.lastName}`,
        calCalibratedById: employeeRole.loggedEmp._id,
        calApprovedBy: "",
        calBeforeData: "no",
        calStatus: "status",
        calcalibrationData: [{
            calParameter: "",
            calNominalSize: "",
            calNominalSizeUnit: "",
            calMinPS: "",
            calMaxPS: "",
            calWearLimitPS: "",
            calBeforeCalibration: "",
            calMinOB: "",
            calMaxOB: "",
            calAverageOB: "",
            calOBError: "",
            calMinPSError: "",
            calMaxPSError: "",
            rowStatus: ""
        }],
        calMasterUsed: [],
    })


    const getAllCalibrationData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemCal/getAllItemCals`
            );
            console.log(response.data.result)
            const imteNoData = response.data.result.filter((item) => item.calIMTENo === calibrationData.calIMTENo)
            console.log(imteNoData)
            setCalibrationDatas(response.data.result)
            const maxDateObject = imteNoData.reduce((prev, current) => {
                const prevDate = dayjs(prev.calItemEntryDate);
                const currentDate = dayjs(current.calItemEntryDate);
                return currentDate.isAfter(prevDate) ? current : prev;
            });
            setLastResultData(maxDateObject)

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getAllCalibrationData();
    }, [calibrationData.calIMTENo])


    const [nonSelectedMaster, setNonSelectedMaster] = useState([])

    const nonSelectedMasterFun = () => {
        if (calibrationData.calMasterUsed !== 0) {
            const remainingMasters = itemMasters.filter(item =>
                !calibrationData.calMasterUsed.some(cal => cal._id === item._id)
            );

            console.log(remainingMasters)
            setNonSelectedMaster(remainingMasters)
        }

    }

    console.log(calibrationData)
    useEffect(() => {
        nonSelectedMasterFun()
    }, [calibrationData.calMasterUsed])

    console.log(calibrationData)

    // const [minColor, setMinColor] = useState("")
    // const [maxColor, setMaxColor] = useState("")



    const changecalDataValue = (index, name, value) => {



        setCalibrationData((prev) => {
            const updateAC = [...prev.calcalibrationData]
            updateAC[index] = {
                ...updateAC[index], [name]: value,
            };
            return {
                ...prev, calcalibrationData: updateAC,
            };
        })


        //setting rowStatus for referenceStandard
        if (calibrationData.calItemType === "referenceStandard") {
            if (name === "calAverageOB") {
                setCalibrationData(prev => {
                    const updatedData = prev.calcalibrationData.map((item, idx) => {
                        if (idx === index) {
                            let status = ""

                            const isAverageInRange = parseFloat(item.calAverageOB) >= parseFloat(item.calMinPS) &&
                                parseFloat(item.calAverageOB) <= parseFloat(item.calMaxPS);

                            if (item.calAverageOB === "") {
                                status = ""
                            } else {
                                if (isAverageInRange) {
                                    status = "ok"
                                } else {
                                    status = "notOk"
                                }
                            }

                            return {
                                ...item,
                                rowStatus: status,
                            };
                        }
                        return item;
                    });
                    return {
                        ...prev,
                        calcalibrationData: updatedData,
                    };
                })
            }

            if (name === "calMinOB" || name === "calMaxOB") {
                setCalibrationData(prev => {
                    const updatedData = prev.calcalibrationData.map((item, idx) => {
                        if (idx === index) {

                            const isMinInRange = parseFloat(item.calMinOB) >= parseFloat(item.calMinPS) &&
                                parseFloat(item.calMinOB) <= parseFloat(item.calMaxPS);
                            const isMaxInRange = parseFloat(item.calMaxOB) >= parseFloat(item.calMinPS) &&
                                parseFloat(item.calMaxOB) <= parseFloat(item.calMaxPS);


                            let status = ""

                            if (item.calMaxOB === "" && item.calMinOB === "") {
                                status = "";
                            } else if (item.calMaxOB === "") {
                                status = (isMinInRange) ? "ok" : "notOk";
                            } else {
                                status = (isMinInRange && isMaxInRange) ? "ok" : "notOk";
                            }

                            return {
                                ...item,
                                rowStatus: status,
                            };
                        }
                        return item;
                    });
                    return {
                        ...prev,
                        calcalibrationData: updatedData,
                    };
                });
            }

        }


        //rowStatus for varialble

        // attribute rowstatus  
        if (calibrationData.calItemType === "attribute") {
            if (name === "calAverageOB") {
                setCalibrationData(prev => {
                    const updatedData = prev.calcalibrationData.map((item, idx) => {
                        if (idx === index) {
                            let status = ""
                            if (item.calWearLimitPS !== "") {

                                if (item.calWearLimitPS <= item.calMinPS) {
                                    const isAverageInRange = parseFloat(item.calAverageOB) >= parseFloat(item.calWearLimitPS) &&
                                        parseFloat(item.calAverageOB) <= parseFloat(item.calMaxPS);

                                    if (item.calAverageOB === "") {
                                        status = ""
                                    } else {
                                        if (isAverageInRange) {
                                            status = "ok"
                                        } else {
                                            status = "notOk"
                                        }
                                    }
                                }

                                if (item.calWearLimitPS >= item.calMaxPS) {
                                    const isAverageInRange = parseFloat(item.calAverageOB) <= parseFloat(item.calWearLimitPS) &&
                                        parseFloat(item.calAverageOB) >= parseFloat(item.calMinPS);

                                    if (item.calAverageOB === "") {
                                        status = ""
                                    } else {
                                        if (isAverageInRange) {
                                            status = "ok"
                                        } else {
                                            status = "notOk"
                                        }
                                    }

                                }

                                return {
                                    ...item,
                                    rowStatus: status,
                                };

                            } else {
                                const isAverageInRange = parseFloat(item.calAverageOB) >= parseFloat(item.calMinPS) &&
                                    parseFloat(item.calAverageOB) <= parseFloat(item.calMaxPS);

                                if (item.calAverageOB === "") {
                                    status = ""
                                } else {
                                    if (isAverageInRange) {
                                        status = "ok"
                                    } else {
                                        status = "notOk"
                                    }
                                }

                                return {
                                    ...item,
                                    rowStatus: status,
                                };
                            }




                        }
                        return item;
                    });
                    return {
                        ...prev,
                        calcalibrationData: updatedData,
                    };
                });
            }

            if (name === "calMinOB" || name === "calMaxOB") {
                setCalibrationData(prev => {
                    const updatedData = prev.calcalibrationData.map((item, idx) => {
                        if (idx === index) {
                            let status = ""
                            if (item.calWearLimitPS !== "") {

                                if (item.calWearLimitPS <= item.calMinPS) {


                                    const isMinInRange = parseFloat(item.calMinOB) >= parseFloat(item.calWearLimitPS) &&
                                        parseFloat(item.calMinOB) <= parseFloat(item.calMaxPS);
                                    const isMaxInRange = parseFloat(item.calMaxOB) >= parseFloat(item.calWearLimitPS) &&
                                        parseFloat(item.calMaxOB) <= parseFloat(item.calMaxPS);



                                    if (isMinInRange && isMaxInRange) {
                                        status = "ok"
                                    } else {
                                        status = "notOk"
                                    }

                                }

                                if (item.calWearLimitPS >= item.calMaxPS) {
                                    const isMinInRange = parseFloat(item.calMinOB) <= parseFloat(item.calWearLimitPS) &&
                                        parseFloat(item.calMinOB) >= parseFloat(item.calMinPS);
                                    const isMaxInRange = parseFloat(item.calMaxOB) <= parseFloat(item.calWearLimitPS) &&
                                        parseFloat(item.calMaxOB) >= parseFloat(item.calMinPS);



                                    if (isMinInRange && isMaxInRange) {
                                        status = "ok"
                                    } else {
                                        status = "notOk"
                                    }

                                }
                                const isMinInRange = parseFloat(item.calMinOB) >= parseFloat(item.calMinPS) &&
                                    parseFloat(item.calMinOB) <= parseFloat(item.calMaxPS);
                                const isMaxInRange = parseFloat(item.calMaxOB) >= parseFloat(item.calMinPS) &&
                                    parseFloat(item.calMaxOB) <= parseFloat(item.calMaxPS);

                                return {
                                    ...item,
                                    rowStatus: status,
                                };

                            } else {
                                const isMinInRange = parseFloat(item.calMinOB) >= parseFloat(item.calMinPS) &&
                                    parseFloat(item.calMinOB) <= parseFloat(item.calMaxPS);
                                const isMaxInRange = parseFloat(item.calMaxOB) >= parseFloat(item.calMinPS) &&
                                    parseFloat(item.calMaxOB) <= parseFloat(item.calMaxPS);




                                if (item.calMaxOB === "" && item.calMinOB === "") {
                                    status = "";
                                } else if (item.calMaxOB === "") {
                                    status = (isMinInRange) ? "ok" : "notOk";
                                } else {
                                    status = (isMinInRange && isMaxInRange) ? "ok" : "notOk";
                                }
                                return {
                                    ...item,
                                    rowStatus: status,
                                };
                            }




                        }
                        return item;
                    });
                    return {
                        ...prev,
                        calcalibrationData: updatedData,
                    };
                });
            }
        }

        if (calibrationData.calItemType === "variable") {

            if (name === "calAverageOB") {
                setCalibrationData(prev => {
                    const updatedData = prev.calcalibrationData.map((item, idx) => {
                        if (idx === index) {
                            let status = ""

                            const isAverageInRange = parseFloat(item.calAverageOB) >= parseFloat(item.calMinPSError) &&
                                parseFloat(item.calAverageOB) <= parseFloat(item.calMaxPSError);

                            if (item.calAverageOB === "") {
                                status = ""
                            } else {
                                if (isAverageInRange) {
                                    status = "ok"
                                } else {
                                    status = "notOk"
                                }
                            }
                            return {
                                ...item,
                                rowStatus: status,
                            };
                        }
                        return item;
                    });
                    return {
                        ...prev,
                        calcalibrationData: updatedData,
                    };
                })
            }

        }

    };

    useEffect(() => {
        const ifRejected = calibrationData.calcalibrationData.some((item) => item.rowStatus === "notOk")
        const isEmpty = calibrationData.calcalibrationData.some((item) => item.rowStatus === "")
        if (ifRejected) {
            setCalibrationData((prev) => ({ ...prev, calStatus: "rejected" }))
        } else if (isEmpty) {
            setCalibrationData((prev) => ({ ...prev, calStatus: "status" }))
        } else {
            setCalibrationData((prev) => ({ ...prev, calStatus: "accepted" }))
        }

    }, [calibrationData.calcalibrationData])





    useEffect(() => {
        calculateResultDate(calibrationData.calItemCalDate, calibrationData.calItemFreInMonths);
    }, [calibrationData.calItemCalDate, calibrationData.calItemFreInMonths]);



    const calculateResultDate = (itemCalDate, itemCalFreInMonths) => {
        const parsedDate = dayjs(itemCalDate);
        if (parsedDate.isValid() && !isNaN(parseInt(itemCalFreInMonths))) {
            const calculatedDate = parsedDate.add(parseInt(itemCalFreInMonths, 10), 'month').subtract(1, 'day');
            setCalibrationData((prev) => ({
                ...prev,
                calItemDueDate: calculatedDate.format('YYYY-MM-DD'),
            }));
        }
    };

    
    

    const [lastResultShow, setLastResultShow] = useState(false)

    const handleCalData = (e) => {
        const { name, value, checked } = e.target;
        setCalibrationData((prev) => ({ ...prev, [name]: value }))
        console.log(name)
        if (name === "beforeCalSwitch") {
            setCalibrationData((prev) => ({ ...prev, calBeforeData: checked ? "yes" : "no" }))
        }
        if (name === "lastResult") {
            setLastResultShow(checked)
        }
        if (name === "calItemName") {
            setCalibrationData((prev) => ({ ...prev, [name]: value }))
            const itemMasterFetchData = async () => {
                try {
                    const response = await axios.post(
                        `${process.env.REACT_APP_PORT}/itemAdd/getitemAddMasterName`, { itemAddMasterName: value }

                    );
                    console.log(response.data.result)
                    const inhouseIMTEs = response.data.result.filter((item) => item.itemCalibrationSource === "inhouse")
                    setItemIMTEs(inhouseIMTEs);


                } catch (err) {
                    console.log(err);
                }
            };
            itemMasterFetchData();

        }
        if (name === "calIMTENo") {

            const selectedItem = itemIMTEs.filter((item) => item.itemIMTENo === value)
            setCalibrationData((prev) => (
                {
                    ...prev,
                    calItemId: selectedItem[0]._id,
                    calIMTENo: selectedItem[0].itemIMTENo,
                    calItemName: selectedItem[0].itemAddMasterName,
                    calItemType: selectedItem[0].itemType,
                    calRangeSize: selectedItem[0].itemRangeSize,
                    calItemMFRNo: selectedItem[0].itemMFRNo,
                    calLC: selectedItem[0].itemLC,
                    calItemMake: selectedItem[0].itemMake,
                    calItemFreInMonths: selectedItem[0].itemCalFreInMonths,
                    calItemUncertainity: selectedItem[0].selectedItemMaster[0].uncertainty,
                    calItemSOPNo: selectedItem[0].selectedItemMaster[0].SOPNo,
                    calStandardRef: selectedItem[0].selectedItemMaster[0].standardRef,
                    calOBType: selectedItem[0].itemOBType,

                    // calCalibratedBy: selectedItem[0],
                    // calApprovedBy: selectedItem[0],
                    calcalibrationData:

                        selectedItem[0].acceptanceCriteria.map((item) => (
                            {
                                calParameter: item.acParameter,
                                calNominalSize: item.acNominalSize,
                                calNominalSizeUnit: item.acNominalSizeUnit,
                                calMinPS: item.acMinPS,
                                calMaxPS: item.acMaxPS,
                                calWearLimitPS: item.acWearLimitPS,
                                calBeforeCalibration: "",
                                calMinOB: item.acMinOB,
                                calMaxOB: item.acMaxOB,
                                calAverageOB: item.acAverageOB,
                                calOBError: item.acOBError,
                                calMinPSError: item.acMinPSError,
                                calMaxPSError: item.acMaxPSError,
                                rowStatus: ""

                            }
                        )),

                    calMasterUsed: selectedItem[0].itemItemMasterIMTENo
                }

            ))
        }

    }
    console.log(lastResultShow)


    const addACValue = () => {
        if (selectedExtraMaster.length !== 0) {
            setCalibrationData((prev) => ({
                ...prev,
                calMasterUsed: [...prev.calMasterUsed, selectedExtraMaster]
            }))
            setSelectedExtraMaster([])
        }
    }


    const deleteAC = (index) => {
        setCalibrationData((prev) => {
            const AC = [...prev.calMasterUsed]
            AC.splice(index, 1);
            return {
                ...prev, calMasterUsed: AC,
            };
        })
    };
    const [confirmSubmit, setConfirmSubmit] = useState(false)

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const submitCalForm = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemCal/createItemCal`, calibrationData
            );
            setAlertMessage(response.data.message)
            setSnackBarOpen(true)
            calListFetchData();
            setCalibrationData(initialCalData)
            setTimeout(() => { setCalAddOpen(false) }, 2000)
        } catch (err) {
            console.log(err);
        }
    };

    const [obStatus, setObStatus] = useState([]);

    const [showLastResult, setShowLastResult] = useState(false)
    const [itemIMTEs, setItemIMTEs] = useState([])










    return (
        <Dialog fullWidth={true} keepMounted maxWidth="xl" open={calAddOpen} sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setCalAddOpen(false)
                }
            }}>
            <DialogTitle align='center'>Calibration</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setCalAddOpen(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <Close />
            </IconButton>

            <DialogContent >

                <div className="row my-2 ">
                    <Paper elevation={12} sx={{ p: 2 }} className='col-md-7 mb-2'>
                        <div className="row">
                            <div className="col-md-7 row g-2 ">
                                <div className="col-md-6">
                                    <TextField
                                        name='calItemName'
                                        id="calItemNameId"
                                        select
                                        size='small'
                                        label="Item Name"
                                        value={calibrationData.calItemName}
                                        fullWidth
                                        onChange={handleCalData}
                                        variant="outlined"
                                    >
                                        <MenuItem value=""><em>Select Item Name</em></MenuItem>
                                        {distinctItemNames.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        value={calibrationData.calIMTENo}
                                        id="calIMTENoId"
                                        size='small'
                                        label="Item IMTE No"
                                        name='calIMTENo'
                                        fullWidth
                                        select
                                        onChange={handleCalData}
                                        variant="outlined"

                                    >
                                        <MenuItem value=""><em>Select IMTE</em></MenuItem>
                                        {itemIMTEs.map((item, index) => (
                                            <MenuItem key={index} value={item.itemIMTENo}>{item.itemIMTENo}</MenuItem>
                                        ))}
                                    </TextField >
                                </div>


                                <div className="col-md-6">
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        name='calItemType'
                                        id="calItemTypeId"
                                        size='small'
                                        label="Item Type"
                                        value={calibrationData.calItemType}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={calibrationData.calRangeSize}
                                        id="calRangeSizeId"
                                        size='small'
                                        label="Range/Size"
                                        name='calRangeSize'
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={calibrationData.calLC}
                                        id="calLCId"
                                        size='small'
                                        label="Least Count"
                                        name='calLC'
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={calibrationData.calItemMFRNo}
                                        id="calItemMFRNoId"
                                        size='small'
                                        label="Item MFR No"
                                        name='calItemMFRNo'
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={calibrationData.calItemMake}
                                        id="calItemMakeId"
                                        size='small'
                                        label="Make"
                                        name='calItemMake'
                                        fullWidth
                                        variant="outlined"

                                    />
                                </div>
                            </div>

                            <div className="col row g-2 ">

                                <div className="col-md-6">
                                    <TextField
                                        id="calItemTemperatureId"
                                        size='small'
                                        label="Temperature"
                                        value={calibrationData.calItemTemperature}
                                        fullWidth

                                        name='calItemTemperature'
                                        variant="outlined"
                                        onChange={handleCalData}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        id="calItemHumidityId"
                                        size='small'
                                        label="Humidity"
                                        value={calibrationData.calItemHumidity}
                                        name='calItemHumidity'
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleCalData}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        id="calItemUncertainityId"
                                        size='small'
                                        label="Uncertainity"
                                        value={calibrationData.calItemUncertainity}
                                        name='calItemUncertainity'
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        id="calItemSOPNoId"
                                        size='small'
                                        label="SOP No."
                                        value={calibrationData.calItemSOPNo}
                                        name='calItemSOPNo'
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        id="calStandardRefId"
                                        size='small'
                                        label="Standard Ref"
                                        value={calibrationData.calStandardRef}
                                        name='calStandardRef'
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>

                            </div>
                        </div>
                    </Paper>

                    <Paper elevation={12} sx={{ p: 2 }} className='col ms-2 mb-2'>
                        <div className="row g-2 ">
                            <div className="col-md-6">
                                <TextField
                                    id="calCertificateNoId"
                                    size='small'
                                    label="Certificate No."
                                    value={calibrationData.calCertificateNo}
                                    name='calCertificateNo'
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>
                            <div className="col-md-6">
                                <DatePicker format="DD-MM-YYYY" slotProps={{ textField: { size: 'small', fullWidth: true } }} value={dayjs(calibrationData.calItemCalDate)} label="Cal Date" onChange={(newValue) => setCalibrationData((prev) => ({ ...prev, calItemCalDate: newValue.format('YYYY-MM-DD') }))} />
                            </div>
                            <div className="col-md-6">
                                <DatePicker format="DD-MM-YYYY" slotProps={{ textField: { size: 'small', fullWidth: true } }} value={dayjs(calibrationData.calItemDueDate)} label="Due Date" onChange={(newValue) => setCalibrationData((prev) => ({ ...prev, calItemDueDate: newValue.format('YYYY-MM-DD') }))} />
                            </div>
                            <div className="col-md-6">
                                <DatePicker format="DD-MM-YYYY" slotProps={{ textField: { size: 'small', fullWidth: true } }} value={dayjs(calibrationData.calItemEntryDate)} label="Cal Entry Date" onChange={(newValue) => setCalibrationData((prev) => ({ ...prev, calItemEntryDate: newValue.format('YYYY-MM-DD') }))} />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    id="calCalibratedById"
                                    size='small'
                                    label="Calibrated By"
                                    value={calibrationData.calCalibratedBy}
                                    name='calCalibratedBy'
                                    fullWidth
                                    disabled
                                    variant="outlined"
                                    onChange={handleCalData}
                                >
                                </TextField>


                            </div>
                            <div className="col-md-6">
                                <TextField
                                    id="calApprovedById"
                                    size='small'
                                    label="Approved By"
                                    select
                                    value={calibrationData.calApprovedBy}
                                    name='calApprovedBy'
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleCalData}
                                >
                                    {activeEmps.map((emp, index) => (
                                        <MenuItem key={index} value={emp._id}>{emp.firstName + " " + emp.lastName}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                    </Paper>

                    <Paper elevation={12} sx={{ p: 2 }} className='col-md-12 mb-2'>
                        <div className="d-flex justify-content-between mb-2">
                            <div> <FormControlLabel control={<Switch name='lastResult' onChange={handleCalData} />} label="Last Result" />
                                <FormControlLabel control={<Switch name='beforeCalSwitch' onChange={handleCalData} />} label="Before Calibration" /></div>
                            <div><h5 className='text-center'>Calibration Data</h5></div>
                            <div><TextField select inputProps={{ sx: { color: calibrationData.calStatus === "status" ? "" : calibrationData.calStatus === "accepted" ? "green" : "red", width: "100px" } }} name='calStatus' onChange={handleCalData} InputLabelProps={{ shrink: true }} label="Cal Status" size="small" value={calibrationData.calStatus}>
                                <MenuItem value="status">Status</MenuItem>
                                <MenuItem value="accepted">Accepted</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                            </TextField></div>

                        </div>

                        <div className="row">
                            <div className="col">
                                <table className=' table table-bordered table-responsive text-center align-middle'>
                                    {calibrationData.calItemType === "attribute" &&
                                        <tbody>
                                            <tr>

                                                <th width="20%" rowSpan={2}>Parameter</th>
                                                <th width="10%" rowSpan={2}>Range/Size</th>
                                                <th width="10%" rowSpan={2}>Unit</th>
                                                <th colSpan={3} width="30%">Permissible Size</th>
                                                {calibrationData.calBeforeData === "yes" && <th width="5%" rowSpan={2}>Before Calibration</th>}
                                                <th width="20%" colSpan={calibrationData.calOBType === "average" ? 1 : 2}>Observed Size</th>
                                                <th width="10%" rowSpan={2}>Status</th>
                                            </tr>
                                            <tr>
                                                <th width="6%">Min</th>
                                                <th width="6%">Max</th>
                                                <th width="10%">Wear Limit</th>
                                                {calibrationData.calOBType === "average" ?
                                                    <React.Fragment>
                                                        <th>Average</th>
                                                    </React.Fragment> :
                                                    <React.Fragment>
                                                        <th>Min</th>
                                                        <th>Max</th>
                                                    </React.Fragment>}

                                            </tr>
                                            {/* {calibrationData.calcalibrationData.map((item)=> ()} */}
                                            {calibrationData.calcalibrationData.map((item, index) => {
                                                let color = ""
                                                if (item.rowStatus === "ok") {
                                                    color = "#4cbb17"
                                                } else if (item.rowStatus === "notOk") {
                                                    color = "red"
                                                } else if (item.rowStatus === "conditionallyOk") {
                                                    color = "orange"
                                                } else {
                                                    color = ""
                                                }

                                                //color changer
                                                let minColor = "";
                                                let maxColor = "";
                                                let averageColor = "";
                                                let size = "";
                                                if (item.calWearLimitPS !== "") {

                                                    if (item.calWearLimitPS < item.calMinPS) {
                                                        size = "OD"
                                                    } else {
                                                        size = "ID"
                                                    }

                                                    if (size === "OD") {
                                                        //min OD condition
                                                        if (item.calMinOB >= item.calWearLimitPS && item.calMinOB < item.calMinPS) {
                                                            minColor = "orange"
                                                        }
                                                        else if (item.calMinOB >= item.calMinPS && item.calMinOB <= item.calMaxPS) {
                                                            minColor = "green"
                                                        } else {
                                                            minColor = "red"
                                                        }

                                                        if (item.calMaxOB >= item.calWearLimitPS && item.calMaxOB < item.calMinPS) {
                                                            maxColor = "orange"
                                                        }
                                                        else if (item.calMaxOB >= item.calMinPS && item.calMaxOB <= item.calMaxPS) {
                                                            maxColor = "green"
                                                        } else {
                                                            maxColor = "red"
                                                        }

                                                        if (item.calAverageOB >= item.calWearLimitPS && item.calAverageOB < item.calMinPS) {
                                                            averageColor = "orange"
                                                        }
                                                        else if (item.calAverageOB >= item.calMinPS && item.calAverageOB <= item.calMaxPS) {
                                                            averageColor = "green"
                                                        } else {
                                                            averageColor = "red"
                                                        }


                                                    }

                                                    if (size === "ID") {
                                                        //min Id condition
                                                        if (item.calMinOB <= item.calWearLimitPS && item.calMinOB > item.calMaxPS) {
                                                            minColor = "orange"
                                                        }
                                                        else if (item.calMinOB >= item.calMinPS && item.calMinOB <= item.calMaxPS) {
                                                            minColor = "green"
                                                        } else {
                                                            minColor = "red"
                                                        }
                                                        //max ID condition
                                                        if (item.calMaxOB <= item.calWearLimitPS && item.calMaxOB > item.calMaxPS) {
                                                            maxColor = "orange"
                                                        }
                                                        else if (item.calMaxOB >= item.calMinPS && item.calMaxOB <= item.calMaxPS) {
                                                            maxColor = "green"
                                                        } else {
                                                            maxColor = "red"
                                                        }

                                                        if (item.calAverageOB <= item.calWearLimitPS && item.calAverageOB > item.calMaxPS) {
                                                            averageColor = "orange"
                                                        }
                                                        else if (item.calAverageOB >= item.calMinPS && item.calAverageOB <= item.calMaxPS) {
                                                            averageColor = "green"
                                                        } else {
                                                            averageColor = "red"
                                                        }
                                                    }

                                                    //   handleStatus(index, minColor, maxColor);



                                                } else {


                                                    if (parseFloat(item.calMinOB) >= parseFloat(item.calMinPS) && parseFloat(item.calMinOB) <= parseFloat(item.calMaxPS)) {
                                                        minColor = "#4cbb17";

                                                    } else {
                                                        minColor = "red"

                                                    }


                                                    if (parseFloat(item.calMaxOB) >= parseFloat(item.calMinPS) && parseFloat(item.calMaxOB) <= parseFloat(item.calMaxPS)) {
                                                        maxColor = "#4cbb17"

                                                    } else {
                                                        maxColor = "red"

                                                    }

                                                    if (parseFloat(item.calAverageOB) >= parseFloat(item.calMinPS) && parseFloat(item.calAverageOB) <= parseFloat(item.calMaxPS)) {
                                                        averageColor = "#4cbb17";

                                                    } else {
                                                        averageColor = "red"

                                                    }
                                                }





                                                return (
                                                    <tr key={index}>
                                                        <td>{item.calParameter}</td>
                                                        <td>{item.calNominalSize}</td>
                                                        <td>{item.calNominalSizeUnit}</td>
                                                        <td>{item.calMinPS}</td>
                                                        <td>{item.calMaxPS}</td>
                                                        <td>{item.calWearLimitPS}</td>

                                                        {calibrationData.calBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} name='calBeforeCalibration' /></td>}
                                                        {calibrationData.calOBType === "average" &&
                                                            <td><input className='form-control form-control-sm' name='calAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                                                        }
                                                        {calibrationData.calOBType === "minmax" &&
                                                            <React.Fragment>
                                                                <td>
                                                                    <input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} name="calMinOB" onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} />
                                                                </td>
                                                                <td>
                                                                    <input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} name="calMaxOB" onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                                                            </React.Fragment>}


                                                        <td width="15%">
                                                            <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)}>
                                                                <option value="">Status</option>
                                                                <option value="ok">Ok</option>
                                                                <option value="notOk">Not Ok</option>
                                                                <option value="conditionallyOk">Conditionally Ok</option>
                                                            </select>
                                                        </td>
                                                    </tr>

                                                )
                                            })}

                                        </tbody>}
                                    {calibrationData.calItemType === "variable" &&

                                        <tbody>
                                            <tr>
                                                <th rowSpan={2}>Parameter</th>
                                                <th rowSpan={2}>Nominal Size</th>
                                                <th rowSpan={2}>Unit</th>
                                                <th colSpan={2}>Permissible Error</th>

                                                <th rowSpan={2}>Observer Error</th>

                                                <th rowSpan={2}>Status</th>
                                            </tr>
                                            <tr>
                                                <th>Min</th>
                                                <th>Max</th>
                                            </tr>
                                            {calibrationData.calcalibrationData.map((item, index) => {

                                                let averageColor = "";
                                                if (parseFloat(item.calAverageOB) >= parseFloat(item.calMinPSError) && parseFloat(item.calAverageOB) <= parseFloat(item.calMaxPSError)) {
                                                    averageColor = "#4cbb17";
                                                } else {
                                                    averageColor = "red"
                                                }

                                                return (
                                                    <tr key={index}>

                                                        <td>{item.calParameter}</td>
                                                        <td>{item.calNominalSize}</td>
                                                        <td>{item.calNominalSizeUnit}</td>
                                                        <td>{item.calMinPSError}</td>
                                                        <td>{item.calMaxPSError}</td>
                                                        <td><input className='form-control form-control-sm' name='calAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                                                        <td width="15%">
                                                            <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)}>
                                                                <option value="">Status</option>
                                                                <option value="ok">Ok</option>
                                                                <option value="notOk">Not Ok</option>
                                                                <option value="conditionallyOk">Conditionally Ok</option>
                                                            </select>
                                                        </td>


                                                        {/* {obCheckedValue === "minmax" &&
                  <React.Fragment>
                    <td><input type="text" className="form-control form-control-sm" id="acMinOBId" name="acMinOB" placeholder='min' value={item.acMinOB} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                    <td><input type="text" className='form-control form-control-sm' id="acMaxOBId" name="acMaxOB" placeholder='max' value={item.acMaxOB} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                  </React.Fragment>
                }
                {obCheckedValue === "average" &&
                  <React.Fragment>
                    <td colSpan={2}><input type="text" className="form-control form-control-sm" id="acAverageOBId" name="acAverageOB" placeholder='Average' value={item.acAverageOB} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                  </React.Fragment>
                } */}
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    }
                                    {calibrationData.calItemType === "referenceStandard" &&
                                        <tbody>
                                            <tr>

                                                <th width="20%" rowSpan={2}>Parameter</th>
                                                <th width="10%" rowSpan={2}>Range/Size</th>
                                                <th width="10%" rowSpan={2}>Unit</th>
                                                <th colSpan={2}>Permissible Size</th>
                                                {calibrationData.calBeforeData === "yes" && <th width="10%" rowSpan={2}>Before Calibration</th>}
                                                <th width="20%" colSpan={calibrationData.calOBType === "average" ? 1 : 2}>Observed Size</th>
                                                <th width="10%" rowSpan={2}>Status</th>
                                            </tr>
                                            <tr>
                                                <th width="6%">Min</th>
                                                <th width="6%">Max</th>

                                                {calibrationData.calOBType === "average" ?
                                                    <React.Fragment>
                                                        <th>Average</th>
                                                    </React.Fragment> :
                                                    <React.Fragment>
                                                        <th>Min</th>
                                                        <th>Max</th>
                                                    </React.Fragment>}

                                            </tr>
                                            {/* {calibrationData.calcalibrationData.map((item)=> ()} */}
                                            {calibrationData.calcalibrationData.map((item, index) => {
                                                let averageColor = "";

                                                if (parseFloat(item.calAverageOB) >= parseFloat(item.calMinPS) && parseFloat(item.calAverageOB) <= parseFloat(item.calMaxPS)) {
                                                    averageColor = "#4cbb17";

                                                } else {
                                                    averageColor = "red"

                                                }

                                                let minColor = "";

                                                if (parseFloat(item.calMinOB) >= parseFloat(item.calMinPS) && parseFloat(item.calMinOB) <= parseFloat(item.calMaxPS)) {
                                                    minColor = "#4cbb17";

                                                } else {
                                                    minColor = "red"

                                                }

                                                let maxColor = "";
                                                if (parseFloat(item.calMaxOB) >= parseFloat(item.calMinPS) && parseFloat(item.calMaxOB) <= parseFloat(item.calMaxPS)) {
                                                    maxColor = "#4cbb17"

                                                } else {
                                                    maxColor = "red"

                                                }


                                                return (
                                                    <tr key={index}>
                                                        <td>{item.calParameter}</td>
                                                        <td>{item.calNominalSize}</td>
                                                        <td>{item.calNominalSizeUnit}</td>
                                                        <td>{item.calMinPS}</td>
                                                        <td>{item.calMaxPS}</td>

                                                        {calibrationData.calBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} name='calBeforeCalibration' /></td>}
                                                        {calibrationData.calOBType === "average" &&
                                                            <td><input className='form-control form-control-sm' name='calAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                                                        }
                                                        {calibrationData.calOBType === "minmax" &&
                                                            <React.Fragment>
                                                                <td><input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} name="calMinOB" onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} />
                                                                </td> <td><input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} name="calMaxOB" onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                                                            </React.Fragment>}


                                                        <td width="15%">
                                                            <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)}>
                                                                <option value="">Status</option>
                                                                <option value="ok">Ok</option>
                                                                <option value="notOk">Not Ok</option>
                                                                <option value="conditionallyOk">Conditionally Ok</option>
                                                            </select>
                                                        </td>
                                                    </tr>

                                                )
                                            })}

                                        </tbody>}
                                </table>
                            </div>
                            {lastResultShow && (lastResultData.length !== 0 ?
                                <div className="col-md-3">
                                    <table className='table  table-bordered text-center align-middle'>
                                        {lastResultData.calItemType === "attribute" &&
                                            <tbody>
                                                <tr>
                                                    <th colSpan={4}>Previous Result</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2}>Permissible Size</th>
                                                    <th colSpan={2} >Observed Size</th>
                                                </tr>
                                                <tr>
                                                    <th>Min</th>
                                                    <th>Max</th>
                                                    {lastResultData.calOBType === "minmax" &&
                                                        <React.Fragment>
                                                            <th>Min</th>
                                                            <th>Max</th>
                                                        </React.Fragment>
                                                    }
                                                    {lastResultData.calOBType === "average" &&

                                                        <th colSpan={2}>Average</th>

                                                    }
                                                </tr>
                                                {lastResultData && lastResultData.calcalibrationData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.calMinPS}</td>
                                                        <td>{item.calMaxPS}</td>
                                                        {lastResultData.calOBType === "minmax" &&
                                                            <React.Fragment>
                                                                <td>{item.calMinOB}</td>
                                                                <td>{item.calMaxOB}</td>
                                                            </React.Fragment>
                                                        }
                                                        {lastResultData.calOBType === "average" &&

                                                            <td colSpan={2}>{item.calAverageOB}</td>


                                                        }
                                                    </tr>
                                                ))}
                                                <tr>

                                                </tr>
                                            </tbody>}

                                        {lastResultData.calItemType === "variable" &&
                                            <tbody>
                                                <tr>
                                                    <th colSpan={4}>Previous Result</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2}>Permissible Size</th>
                                                    <th colSpan={2} >Observed Size</th>
                                                </tr>
                                                <tr>
                                                    <th>Min</th>
                                                    <th>Max</th>
                                                    {lastResultData.calOBType === "minmax" &&
                                                        <React.Fragment>
                                                            <th>Min</th>
                                                            <th>Max</th>
                                                        </React.Fragment>
                                                    }
                                                    {lastResultData.calOBType === "average" &&

                                                        <th colSpan={2}>Average</th>

                                                    }
                                                </tr>
                                                {lastResultData && lastResultData.calcalibrationData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.calMinPSError}</td>
                                                        <td>{item.calMaxPSError}</td>
                                                        {lastResultData.calOBType === "minmax" &&
                                                            <React.Fragment>
                                                                <td>{item.calMinOB}</td>
                                                                <td>{item.calMaxOB}</td>
                                                            </React.Fragment>
                                                        }
                                                        {lastResultData.calOBType === "average" &&

                                                            <td colSpan={2}>{item.calAverageOB}</td>


                                                        }
                                                    </tr>
                                                ))}
                                                <tr>

                                                </tr>
                                            </tbody>}

                                        {lastResultData.calItemType === "referenceStandard" &&
                                            <tbody>
                                                <tr>
                                                    <th colSpan={4}>Previous Result</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2}>Permissible Size</th>
                                                    <th colSpan={2} >Observed Size</th>
                                                </tr>
                                                <tr>
                                                    <th>Min</th>
                                                    <th>Max</th>
                                                    {lastResultData.calOBType === "minmax" &&
                                                        <React.Fragment>
                                                            <th>Min</th>
                                                            <th>Max</th>
                                                        </React.Fragment>
                                                    }
                                                    {lastResultData.calOBType === "average" &&

                                                        <th colSpan={2}>Average</th>

                                                    }
                                                </tr>
                                                {lastResultData && lastResultData.calcalibrationData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.calMinPS}</td>
                                                        <td>{item.calMaxPS}</td>
                                                        {lastResultData.calOBType === "minmax" &&
                                                            <React.Fragment>
                                                                <td>{item.calMinOB}</td>
                                                                <td>{item.calMaxOB}</td>
                                                            </React.Fragment>
                                                        }
                                                        {lastResultData.calOBType === "average" &&

                                                            <td colSpan={2}>{item.calAverageOB}</td>


                                                        }
                                                    </tr>
                                                ))}
                                                <tr>

                                                </tr>
                                            </tbody>}
                                    </table>
                                </div> : <div><Chip icon={<ErrorOutline />} label="No previous calibration data available" color="error" /></div>)}
                        </div>



                    </Paper>
                    <Paper elevation={12} sx={{ p: 2 }} className='col-md-12'>
                        <div className="row mb-2">

                            <div className='col-md'> <h5 className='text-start'>Master Used</h5></div>
                            <div className='col-md-4 d-flex justify-content-center'>
                                <TextField className='me-2' select size='small' fullWidth label="Select Master" onChange={(e) => setSelectedExtraMaster(e.target.value)}>
                                    {nonSelectedMaster.length === 0 ? (
                                        <MenuItem value="" disabled>
                                            No Masters available
                                        </MenuItem>
                                    ) : (
                                        nonSelectedMaster.map((item, index) => (
                                            <MenuItem sx={{ color: item.itemDueDate < dayjs().format('YYYY-MM-DD') ? "red" : "" }} disabled={item.itemDueDate < dayjs().format('YYYY-MM-DD')} key={index} value={item}>
                                                {item.itemIMTENo} - {item.itemAddMasterName}
                                            </MenuItem>
                                        ))
                                    )}
                                </TextField>
                                <Button startIcon={<Add />} onClick={addACValue} size='small' sx={{ minWidth: "130px" }} variant='contained'>Add Master</Button></div>

                        </div>

                        <table className='table table-bordered table-responsive text-center align-middle'>
                            <tbody>
                                <tr>
                                    <th>Si No</th>
                                    <th>IMTE No</th>
                                    <th>Master Name</th>
                                    <th>Range/Size</th>
                                    <th>Cal Certificate No</th>
                                    <th>Cal Date</th>
                                    <th>Next Due</th>
                                    <th>Calibrated At</th>
                                    <th>Remove</th>
                                </tr>

                                {calibrationData.calMasterUsed.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.itemIMTENo}</td>
                                        <td>{item.itemAddMasterName}</td>
                                        <td>{item.itemRangeSize}</td>
                                        <td>{ }</td>
                                        <td>{item.itemCalDate}</td>
                                        <td>{item.itemDueDate}</td>
                                        <td>{item.itemCalibratedAt}</td>
                                        <td width="5%"><Delete color='error' onClick={(index) => deleteAC(index)} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Paper>

                    <Dialog
                        open={confirmSubmit}
                        onClose={(e, reason) => {
                            console.log(reason)
                            if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                                setConfirmSubmit(false)
                            }
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Are you sure to submit ?
                        </DialogTitle>

                        <DialogActions className='d-flex justify-content-center'>
                            <Button onClick={() => setConfirmSubmit(false)}>Cancel</Button>
                            <Button onClick={() => { submitCalForm(); setConfirmSubmit(false) }} autoFocus>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={3000}
                        onClose={() => setTimeout(() => {
                            setSnackBarOpen(false)
                        }, 3000)}>
                        <Alert onClose={() => setSnackBarOpen(false)} variant='filled' severity="success" sx={{ width: '25%' }}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                </div>
            </DialogContent>
            <DialogActions className='d-flex justify-content-between'>
                <div>
                    <Button variant='contained' color='warning' className='me-3'>Upload Report</Button>
                </div>
                <div>
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setCalAddOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { setConfirmSubmit(true) }}>Submit</Button>
                </div>
            </DialogActions>


        </Dialog>
    )
}

export default CalAddModel