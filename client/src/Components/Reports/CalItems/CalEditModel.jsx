import React, { createContext, useEffect, useState, useContext } from 'react'
import { Alert, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, MenuItem, Paper, Snackbar, Switch, TextField, styled } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalData } from './CalList'
import { Add, Close, CloudUpload, Delete, Done, ErrorOutline } from '@mui/icons-material';


dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const CalEditModel = () => {


    const calData = useContext(CalData)
    const [lastResultData, setLastResultData] = useState([])
    const { calEditOpen, setCalEditOpen, selectedCalRow, itemMasters, activeEmps, calListFetchData, employeeRole } = calData
    const [calibrationDatas, setCalibrationDatas] = useState([])

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });





    const [selectedExtraMaster, setSelectedExtraMaster] = useState([])


    const [initialCalData, setInitialCalData] = useState({
        ItemCalId: "",
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
        calReportAvailable: "no",
        calReportName: "",
        calCertificateNo: calibrationDatas.length + 1,
        calItemCalDate: dayjs().format('YYYY-MM-DD'),
        calItemDueDate: "",
        calItemEntryDate: dayjs().format('YYYY-MM-DD'),
        calCalibratedBy: "",
        calApprovedBy: "",
        calBeforeData: "no",
        calStatus: "status",
        calSource: "",
        calPlant: "",
        calDepartment: [],
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
        calPlant: "",
        calDepartment: ""
    })

    const [calibrationData, setCalibrationData] = useState({
        ItemCalId: "",
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
        calReportAvailable: "no",
        calReportName: "",
        calCertificateNo: calibrationDatas.length + 1,
        calItemCalDate: dayjs().format('YYYY-MM-DD'),
        calItemDueDate: "",
        calItemEntryDate: dayjs().format('YYYY-MM-DD'),
        calCalibratedBy: "",
        calApprovedBy: "",
        calBeforeData: "no",
        calStatus: "status",
        calSource: "",
        calPlant: "",
        calDepartment: [],
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
        calPlant: "",
        calDepartment: ""
    })

    console.log(selectedCalRow)
    useEffect(() => {


        setCalibrationData((prev) => (
            {
                ...prev,
                ItemCalId: selectedCalRow.ItemCalId,
                calIMTENo: selectedCalRow.calIMTENo,
                calItemName: selectedCalRow.calItemName,
                calItemType: selectedCalRow.calItemType,
                calRangeSize: selectedCalRow.calRangeSize,
                calItemMFRNo: selectedCalRow.calItemMFRNo,
                calLC: selectedCalRow.calLC,
                calItemMake: selectedCalRow.calItemMake,
                calItemTemperature: selectedCalRow.calItemTemperature,
                calItemHumidity: selectedCalRow.calItemHumidity,
                calItemUncertainity: selectedCalRow.calItemUncertainity,
                calItemSOPNo: selectedCalRow.calItemSOPNo,
                calStandardRef: selectedCalRow.calStandardRef,
                calOBType: selectedCalRow.calOBType,
                calCertificateNo: selectedCalRow.calCertificateNo,
                calItemCalDate: selectedCalRow.calItemCalDate,
                calItemDueDate: selectedCalRow.calItemDueDate,
                calItemEntryDate: selectedCalRow.calItemEntryDate,
                calCalibratedBy: selectedCalRow.calCalibratedBy,
                calApprovedBy: selectedCalRow.calApprovedBy,
                calBeforeData: selectedCalRow.calBeforeData,
                calStatus: selectedCalRow.calStatus,
                calReportAvailable: selectedCalRow.calReportAvailable,
                calPlant: selectedCalRow.calPlant,
                calDepartment: selectedCalRow.calDepartment,
                calReportName: selectedCalRow.calReportName,
                calItemFreInMonths: selectedCalRow.calItemFreInMonths,
                calcalibrationData:
                    selectedCalRow.calcalibrationData.map((item) => (
                        {
                            calParameter: item.calParameter,
                            calNominalSize: item.calNominalSize,
                            calNominalSizeUnit: item.calNominalSizeUnit,
                            calMinPS: item.calMinPS,
                            calMaxPS: item.calMaxPS,
                            calWearLimitPS: item.calWearLimitPS,
                            calBeforeCalibration: item.calBeforeCalibration,
                            calMinOB: item.calMinOB,
                            calMaxOB: item.calMaxOB,
                            calAverageOB: item.calAverageOB,
                            calOBError: item.calOBError,
                            calMinPSError: item.calMinPSError,
                            calMaxPSError: item.calMaxPSError,
                            rowStatus: item.rowStatus

                        }
                    )),

                calMasterUsed: selectedCalRow.calMasterUsed
            }

        ))
    }, [selectedCalRow])


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

    const [filterAdmins, setFilterAdmins] = useState([])
    const getEmployeeByName = (empId) => {
        const plants = employeeRole.loggedEmp.plantDetails.map(plant => plant.plantName)
        console.log(plants)
        const filter = activeEmps.filter(emp => emp.plantDetails.some(plant => plants.includes(plant.plantName)))
        console.log(filter)
        const selectedEmp = filter.filter((emp) => emp.empRole === "plantAdmin" || emp.empRole === "admin");
        console.log(selectedEmp)
        setFilterAdmins(selectedEmp)
    }
    useEffect(() => {
        getEmployeeByName(calibrationData.calCalibratedBy)
    }, [calibrationData.calCalibratedBy])

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
        if (name === "calReportAvailable") {
            setCalibrationData((prev) => ({ ...prev, calReportAvailable: checked ? "yes" : "no" }))
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

    const [loading, setLoading] = useState(false)

    const updateItemCal = async () => {
        setLoading(true)
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/itemCal/updateItemCal/${selectedCalRow._id}`, calibrationData
            );
            setAlertMessage(response.data.message)
            setSnackBarOpen(true)
            calListFetchData();
            setCalibrationData(initialCalData)
            setTimeout(() => setCalEditOpen(false), 500)
            console.log("closed")

        } catch (err) {
            console.log(err);
        }finally{
            setLoading(false)
        }
    };


    const handleCalReportUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log("working");
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('calCertificateNo', calibrationData.calCertificateNo); // Assuming calibrationData is defined

            console.log("FormData content:", formData); // Optional: Log the FormData content to verify

            try {
                axios.post(`${process.env.REACT_APP_PORT}/upload/calReportUpload`, formData)
                    .then(response => {
                        //setCertMessage("Calibration Report Uploaded Successfully");
                        console.log("Certificate Uploaded Successfully");
                        setCalibrationData((prev) => ({ ...prev, calReportName: response.data.name }));
                    })
                    .catch(error => {
                        //setCertMessage("Error Uploading Calibration Report");
                        console.log(error);
                    });
            } catch (error) {
                console.error('Error uploading the file:', error);
            }
        }
    };








    return (
        <Dialog fullWidth={true} keepMounted maxWidth="xl" open={calEditOpen} sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setCalEditOpen(false)
                }
            }}>
            <DialogTitle align='center'>Calibration Edit</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setCalEditOpen(false)}
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
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        size='small'
                                        label="Item Name"
                                        value={calibrationData.calItemName}
                                        fullWidth

                                        variant="outlined"
                                    >

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
                                        InputProps={{
                                            readOnly: true,
                                        }}

                                        variant="outlined"

                                    >

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
                                    variant="outlined"
                                    disabled
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
                                    {filterAdmins.map((emp, index) => (
                                        <MenuItem key={index} value={emp._id}>{emp.firstName ? emp.firstName : "" + " " + emp.lastName ? emp.lastName : ""}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                    </Paper>

                    <Paper elevation={12} sx={{ p: 2 }} className='col-md-12 mb-2'>
                        <div className="d-flex justify-content-between mb-2">
                            <div> <FormControlLabel control={<Switch name='calReportAvailable' checked={calibrationData.calReportAvailable === "yes"} onChange={handleCalData} color='success' />} label="Report Upload" />
                                <FormControlLabel control={<Switch name='lastResult' onChange={handleCalData} />} label="Last Result" />
                                <FormControlLabel control={<Switch name='beforeCalSwitch' onChange={handleCalData} />} label="Before Calibration" /></div>
                            <div><h5 className='text-center'>Calibration Data</h5></div>
                            <div><TextField select inputProps={{ sx: { color: calibrationData.calStatus === "status" ? "" : calibrationData.calStatus === "accepted" ? "green" : "red", width: "100px" } }} name='calStatus' onChange={handleCalData} InputLabelProps={{ shrink: true }} label="Cal Status" size="small" value={calibrationData.calStatus}>
                                <MenuItem value="status">Status</MenuItem>
                                <MenuItem value="accepted">Accepted</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                            </TextField></div>

                        </div>

                        {calibrationData.calReportAvailable === "yes" && <div>


                            {calibrationData.calReportName === "" ?
                                <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                                    Upload Report
                                    <VisuallyHiddenInput type="file" onChange={handleCalReportUpload} />
                                </Button>
                                : <Chip
                                    className='mt-2'
                                    icon={<Done />}
                                    size='large'
                                    color="success"
                                    label={calibrationData.calReportName}
                                    onClick={() => {
                                        const fileUrl = `${process.env.REACT_APP_PORT}/calCertificates/${calibrationData.calReportName}`;
                                        window.open(fileUrl, '_blank'); // Opens the file in a new tab/window
                                    }}
                                    onDelete={() => setCalibrationData((prev) => ({ ...prev, calReportName: "" }))}
                                    deleteIcon={<Delete color='error' />}
                                ></Chip>}
                        </div>}

                        {calibrationData.calReportAvailable === "no" && <div className="row">
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
                                                    color = "green"
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
                                                        minColor = "green";

                                                    } else {
                                                        minColor = "red"

                                                    }


                                                    if (parseFloat(item.calMaxOB) >= parseFloat(item.calMinPS) && parseFloat(item.calMaxOB) <= parseFloat(item.calMaxPS)) {
                                                        maxColor = "green"

                                                    } else {
                                                        maxColor = "red"

                                                    }

                                                    if (parseFloat(item.calAverageOB) >= parseFloat(item.calMinPS) && parseFloat(item.calAverageOB) <= parseFloat(item.calMaxPS)) {
                                                        averageColor = "green";

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

                                                        {calibrationData.calBeforeData === "yes" && <td><input className='form-control form-control-sm' value={item.calBeforeCalibration} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} name='calBeforeCalibration' /></td>}
                                                        {calibrationData.calOBType === "average" &&
                                                            <td><input className='form-control form-control-sm' name='calAverageOB' style={{ color: averageColor, fontWeight: "bold" }} value={item.calAverageOB} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                                                        }
                                                        {calibrationData.calOBType === "minmax" &&
                                                            <React.Fragment>
                                                                <td>
                                                                    <input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} name="calMinOB" value={item.calMinOB} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} />
                                                                </td>
                                                                <td>
                                                                    <input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} name="calMaxOB" value={item.calMaxOB} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
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
                                                    averageColor = "green";
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
                                                        <td><input className='form-control form-control-sm' name='calAverageOB' style={{ color: averageColor, fontWeight: "bold" }} value={item.calAverageOB} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
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
                                                    averageColor = "green";

                                                } else {
                                                    averageColor = "red"

                                                }

                                                let minColor = "";

                                                if (parseFloat(item.calMinOB) >= parseFloat(item.calMinPS) && parseFloat(item.calMinOB) <= parseFloat(item.calMaxPS)) {
                                                    minColor = "green";

                                                } else {
                                                    minColor = "red"

                                                }

                                                let maxColor = "";
                                                if (parseFloat(item.calMaxOB) >= parseFloat(item.calMinPS) && parseFloat(item.calMaxOB) <= parseFloat(item.calMaxPS)) {
                                                    maxColor = "green"

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

                                                        {calibrationData.calBeforeData === "yes" && <td><input className='form-control form-control-sm' value={item.calBeforeCalibration} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} name='calBeforeCalibration' /></td>}
                                                        {calibrationData.calOBType === "average" &&
                                                            <td><input className='form-control form-control-sm' name='calAverageOB' value={item.calAverageOB} style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                                                        }
                                                        {calibrationData.calOBType === "minmax" &&
                                                            <React.Fragment>
                                                                <td><input className='form-control form-control-sm' value={item.calMinOB} style={{ color: minColor, fontWeight: "bold" }} name="calMinOB" onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} />
                                                                </td> <td><input className='form-control form-control-sm' value={item.calMaxOB} style={{ color: maxColor, fontWeight: "bold" }} name="calMaxOB" onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
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
                        </div>}



                    </Paper>
                    {calibrationData.calReportAvailable === "no" && <Paper elevation={12} sx={{ p: 2 }} className='col-md-12'>
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
                                        <td>{item.itemCertificateNo}</td>
                                        <td>{item.itemCalDate}</td>
                                        <td>{item.itemDueDate}</td>
                                        <td>{item.itemCalibratedAt}</td>
                                        <td width="5%"><Delete color='error' onClick={(index) => deleteAC(index)} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Paper>}

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
                            <Button onClick={() => { updateItemCal(); setConfirmSubmit(false) }} autoFocus>
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
            <DialogActions className='d-flex justify-content-end'>
                <div>
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setCalEditOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { setConfirmSubmit(true) }}>{loading ? <CircularProgress
                        sx={{
                            color: "inherit",
                        }}
                        variant="indeterminate"
                        size={20}
                    />: "Submit"}</Button>
                </div>
            </DialogActions>


        </Dialog>
    )
}

export default CalEditModel