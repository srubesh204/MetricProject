import React, { createContext, useEffect, useState, useContext } from 'react'
import { Alert, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, MenuItem, Paper, Snackbar, Switch, TextField, styled } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { HomeContent } from '../Home';
import { Add, Close, CloudUpload, Delete, Done, ErrorOutline } from '@mui/icons-material';
import { useEmployee } from '../../../App';
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const CalDialog = () => {


    const calData = useContext(HomeContent)
    const { loggedEmp } = useEmployee()
    const [lastResultData, setLastResultData] = useState([])
    const { calOpen, setCalOpen, selectedRows, itemMasters, activeEmps, masters, itemList, calLastNo } = calData
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


    const getAllCalibrationData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemCal/getAllItemCals`
            );
            console.log(response.data.result)
            try {
                const imteNoData = response.data.result.filter((item) => item.calIMTENo === selectedRows[0].itemIMTENo)
                console.log(imteNoData)
                setCalibrationDatas(response.data.result)
                const maxDateObject = imteNoData.reduce((prev, current) => {
                    const prevDate = dayjs(prev.calItemEntryDate);
                    const currentDate = dayjs(current.calItemEntryDate);
                    return currentDate.isAfter(prevDate) ? current : prev;
                });
                setLastResultData(maxDateObject)
            } catch {
                setLastResultData("")
            }
            const lastOneResult = Math.max(...response.data.result.map((item) => item.calCertificateNo))
            console.log(lastOneResult)

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getAllCalibrationData();
    }, [selectedRows])






    const [selectedExtraMaster, setSelectedExtraMaster] = useState([])


    console.log(selectedRows[0])

    const [initialCalData, setInitialCalData] = useState({
        ItemCalId: "",
        calIMTENo: "",
        calItemName: "",
        calItemType: "",
        calRangeSize: "",
        calItemMFRNo: "",
        calLC: "",
        calItemMake: "",
        calItemTemperature: "20±2°c",
        calItemHumidity: "30+75%",
        calItemUncertainity: "",
        calItemSOPNo: "",
        calStandardRef: "",
        calReportAvailable: "no",
        calReportName: "",
        calOBType: "",
        calCertificateNo: calibrationDatas.length + 1,
        calItemCalDate: dayjs().format('YYYY-MM-DD'),
        calItemDueDate: "",
        calItemEntryDate: dayjs().format('YYYY-MM-DD'),
        calCalibratedBy: loggedEmp.firstName + " " + loggedEmp.lastName,
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
        ItemCalId: "",
        calIMTENo: "",
        calItemName: "",
        calItemType: "",
        calRangeSize: "",
        calItemMFRNo: "",
        calLC: "",
        calItemMake: "",
        calItemTemperature: "20±2°C",
        calItemHumidity: "30% to 75%",
        calItemUncertainity: "",
        calItemSOPNo: "",
        calStandardRef: "",
        calOBType: "",
        calReportAvailable: "no",
        calReportName: "",
        calCertificateNo: "",
        calItemCalDate: dayjs().format('YYYY-MM-DD'),
        calItemDueDate: "",
        calItemEntryDate: dayjs().format('YYYY-MM-DD'),
        calCalibratedBy: loggedEmp.firstName || "" + " " + loggedEmp.lastName || "",
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

    const settingCalData = () => {
        if (selectedRows.length > 0) {
            const departments = [...new Set(selectedRows.map(item => item.itemCurrentLocation))]
            setCalibrationData((prev) => (
                {
                    ...prev,
                    calPlant: selectedRows[0].itemPlant,
                    calDepartment: departments,
                    calCertificateNo: calLastNo,
                }

            ))
        }

    };
    useEffect(() => {
        settingCalData()
    }, [selectedRows])



    const [dcList, setDcList] = useState([])


    const dcFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemCal/getAllItemCals`
            );
            setDcList(response.data.result);
            console.log(response.data.result)

            const dcNumbers = response.data.result.map(item => (item.calId)).filter(Boolean).sort();
            if (dcNumbers.length > 0) {
                const lastNumber = dcNumbers[dcNumbers.length - 1] + 1
                console.log(lastNumber)

                setCalibrationData(prev => ({ ...prev, calCertificateNo: "Cal " + dayjs().year() + "-" + lastNumber }))
            } else {
                setCalibrationData(prev => ({ ...prev, calCertificateNo: "Cal " + dayjs().year() + "-" + 1 }))
            }


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        dcFetchData();


    }, []);



    useEffect(() => {
        console.log("cal")
        if (selectedRows.length > 0 && selectedRows[0].itemItemMasterIMTENo.length > 0) {
            const masterData = itemList.filter(item => selectedRows[0].itemItemMasterIMTENo.map(mas => mas).includes(item.itemIMTENo))
            console.log(masterData)
            setCalibrationData(prev => ({ ...prev, calMasterUsed: masterData }))
        }

    }, [selectedRows])






    const [refMaster, setRefMaster] = useState({})
    const setCalData = () => {

        console.log("hi")
        if (selectedRows.length === 1) {
            const filter = masters.filter(mas => mas.itemDescription === selectedRows[0].itemAddMasterName)

            console.log(filter)
            setRefMaster(filter.length > 0 ? filter[0] : [])

            setCalibrationData((prev) => (
                {
                    ...prev,
                    ItemCalId: selectedRows[0]._id,
                    calIMTENo: selectedRows[0].itemIMTENo,
                    calItemName: selectedRows[0].itemAddMasterName,
                    calItemType: selectedRows[0].itemType,
                    calRangeSize: selectedRows[0].itemRangeSize,
                    calItemMFRNo: selectedRows[0].itemMFRNo,
                    calLC: selectedRows[0].itemLC,
                    calItemMake: selectedRows[0].itemMake,
                    calItemFreInMonths: selectedRows[0].itemCalFreInMonths,
                    calItemUncertainity: filter.length > 0 && filter[0] ? filter[0].uncertainty : "",
                    calItemSOPNo: filter.length > 0 && filter[0].SOPNo ? filter[0].SOPNo : "",
                    calStandardRef: filter.length > 0 && filter[0].standardRef ? filter[0].standardRef : "",
                    calOBType: selectedRows[0].itemOBType,
                    // calCertificateNo: selectedRows[0].itemCertificateNo,

                    // calCalibratedBy: selectedRows[0],
                    // calApprovedBy: selectedRows[0],
                    calcalibrationData:

                        selectedRows.length > 0 && selectedRows[0].acceptanceCriteria.map((item) => (
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

                }

            ))
        }

    };

    useEffect(() => {
        setCalData();
    }, [selectedRows])

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
                console.log("calAverage")
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
                    console.log("Im MIN/MAX")
                    const updatedData = prev.calcalibrationData.map((item, idx) => {
                        if (idx === index) {

                            let status = ""
                            if (item.calWearLimitPS !== "" && item.calWearLimitPS !== "-") {

                                if (item.calWearLimitPS <= item.calMinPS) {

                                    console.log("work")
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
                                console.log(status)
                                return {
                                    ...item,
                                    rowStatus: status,
                                };

                            } else {
                                console.log("no Wearlimit")
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

            if (name === "calOBError") {
                setCalibrationData(prev => {
                    const updatedData = prev.calcalibrationData.map((item, idx) => {
                        if (idx === index) {
                            let status = ""

                            const isAverageInRange = parseFloat(item.calOBError) >= parseFloat(item.calMinPSError) &&
                                parseFloat(item.calOBError) <= parseFloat(item.calMaxPSError);

                            if (item.calOBError === "") {
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
        const ifRejected = calibrationData.calcalibrationData.length > 0 && calibrationData.calcalibrationData.some((item) => item.rowStatus === "notOk")
        const isEmpty = calibrationData.calcalibrationData.length > 0 && calibrationData.calcalibrationData.some((item) => item.rowStatus === "")
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

    const [selectedEmp, setSelectedEmp] = useState([])

    useEffect(() => {

        if (selectedRows.length > 0) {
            console.log("working")
            console.log(selectedRows[0].itemPlant)
            const plantEmps = activeEmps.filter(emp => emp.plantDetails.some(plant => plant.plantName === selectedRows[0].itemPlant))
            console.log(plantEmps)
            const admins = plantEmps.filter(emp => emp.empRole === "plantAdmin" || emp.empRole === "admin")
            console.log(admins)
            setSelectedEmp(admins)
        }

    }, [selectedRows])

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




    //validate function 
    const [errors, setErrors] = useState({})

    const validateFunction = () => {
        let tempErrors = {};
        tempErrors.calItemTemperature = calibrationData.calItemTemperature ? "" : "* Required"
        tempErrors.calItemHumidity = calibrationData.calItemHumidity ? "" : "Humidity is Required"
        // tempErrors.calCertificateNo = calibrationData.calCertificateNo ? "" : "Certificate No. is Required"
        tempErrors.calCalibratedBy = calibrationData.calCalibratedBy ? "" : "Calibrated By is Required"
        tempErrors.calApprovedBy = calibrationData.calApprovedBy ? "" : "Approved By is Required"

        setErrors({ ...tempErrors })

        return Object.values(tempErrors).every(x => x === "")
    }
    console.log(errors)
    const [errorhandler, setErrorHandler] = useState({})
    console.log(errorhandler)

    const [loading, setLoading] = useState(false)

    const submitCalForm = async () => {
        setLoading(true)
        try {
            if (validateFunction()) {
                const response = await axios.post(
                    `${process.env.REACT_APP_PORT}/itemCal/createItemCal`, calibrationData
                );
                setAlertMessage(response.data.message)
                setSnackBarOpen(true)
                setCalibrationData(initialCalData);
                setTimeout(() => { setCalOpen(false); window.location.reload() }, 500)
            }
        } catch (err) {
            setSnackBarOpen(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                console.log(err);
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(', ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                console.log(err);
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err);
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }

            console.log(err);

        }finally{
            setLoading(false)
        }
    };
    const [certMessage, setCertMessage] = useState("")


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
                        setCertMessage("Calibration Report Uploaded Successfully");
                        console.log("Certificate Uploaded Successfully");
                        setCalibrationData((prev) => ({ ...prev, calReportName: response.data.name }));
                    })
                    .catch(error => {
                        setCertMessage("Error Uploading Calibration Report");
                        console.log(error);
                    });
            } catch (error) {
                console.error('Error uploading the file:', error);
            }
        }
    };








    return (
        <Dialog fullWidth={true} keepMounted maxWidth="xl" open={calOpen} sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setCalOpen(false)
                }
            }}>
            <DialogTitle align='center'>Calibration</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => { setCalOpen(false); window.location.reload() }}

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
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        name='calItemName'
                                        id="calItemNameId"
                                        size='small'
                                        label="Item Name"
                                        value={calibrationData.calItemName}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextField
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={calibrationData.calIMTENo}
                                        id="calIMTENoId"
                                        size='small'
                                        label="Item IMTE No"
                                        name='calIMTENo'
                                        fullWidth
                                        variant="outlined"
                                    />
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
                                <div className="col-md-6">
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
                                {calibrationData.calItemType === "variable" && <div className="col-md-3">
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
                                </div>}
                                <div className={calibrationData.calItemType !== "variable" ? "col-md-6" : "col-md-3"}>
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
                                        {...(errors.calItemTemperature !== "" && { helperText: errors.calItemTemperature, error: true })}
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
                                        {...(errors.calItemHumidity !== "" && { helperText: errors.calItemHumidity, error: true })}
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
                                    // {...(errors.calCertificateNo !== "" && { helperText: errors.calCertificateNo, error: true })}
                                    id="calCertificateNoId"
                                    size='small'
                                    label="Certificate No."
                                    disabled
                                    value={calibrationData.calCertificateNo}
                                    name='calCertificateNo'
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>
                            <div className="col-md-6">
                                <DatePicker format="DD-MM-YYYY" slotProps={{ textField: { size: 'small' } }} value={dayjs(calibrationData.calItemCalDate)} label="Cal Date" onChange={(newValue) => setCalibrationData((prev) => ({ ...prev, calItemCalDate: newValue.format('YYYY-MM-DD') }))} />
                            </div>
                            <div className="col-md-6">
                                <DatePicker format="DD-MM-YYYY" slotProps={{ textField: { size: 'small' } }} value={dayjs(calibrationData.calItemDueDate)} label="Due Date" onChange={(newValue) => setCalibrationData((prev) => ({ ...prev, calItemDueDate: newValue.format('YYYY-MM-DD') }))} />
                            </div>
                            <div className="col-md-6">
                                <DatePicker format="DD-MM-YYYY" slotProps={{ textField: { size: 'small' } }} value={dayjs(calibrationData.calItemEntryDate)} label="Cal Entry Date" onChange={(newValue) => setCalibrationData((prev) => ({ ...prev, calItemEntryDate: newValue.format('YYYY-MM-DD') }))} />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    {...(errors.calCalibratedBy !== "" && { helperText: errors.calCalibratedBy, error: true })}
                                    id="calCalibratedById"
                                    size='small'
                                    label="Calibrated By"
                                    value={calibrationData.calCalibratedBy}
                                    name='calCalibratedBy'
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleCalData}
                                    disabled
                                >

                                </TextField>


                            </div>
                            <div className="col-md-6">
                                <TextField
                                    {...(errors.calApprovedBy !== "" && { helperText: errors.calApprovedBy, error: true })}

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
                                    {selectedEmp.map((emp, index) => (
                                        <MenuItem key={index} value={emp._id}>{(emp.firstName || "") + " " + (emp.lastName || "")}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                    </Paper>

                    <Paper elevation={12} sx={{ p: 2 }} className='col-md-12 mb-2'>
                        <div className="d-flex justify-content-between mb-2">

                            <div> <FormControlLabel control={<Switch name='calReportAvailable' checked={calibrationData.calReportAvailable === "yes"} onChange={handleCalData} color='success' />} label="Report Upload" /></div>
                            {/* <div> <FormControlLabel control={<Switch name='lastResult' onChange={handleCalData} />} label="Last Result" />
                                <FormControlLabel control={<Switch name='beforeCalSwitch' onChange={handleCalData} />} label="Before Calibration" /></div> */}
                            <div><h5 className='text align-center'>Calibration Data</h5></div>
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
                                                <th colSpan={3} width="30%">Permissible Size ({(calibrationData && calibrationData.calcalibrationData.length > 0) ? calibrationData.calcalibrationData[0].calNominalSizeUnit : ""})</th>
                                                {calibrationData.calBeforeData === "yes" && <th width="5%" rowSpan={2}>Before Calibration</th>}
                                                <th width="20%" colSpan={calibrationData.calOBType === "average" ? 1 : 2}>Observed Size ({(calibrationData && calibrationData.calcalibrationData.length > 0) ? calibrationData.calcalibrationData[0].calNominalSizeUnit : ""})</th>
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
                                            {calibrationData && calibrationData.calcalibrationData.map((item, index) => {


                                                //color changer
                                                let minColor = "";
                                                let maxColor = "";
                                                let averageColor = "";
                                                let size = "";
                                                if (item.calWearLimitPS !== "" && item.calWearLimitPS !== "-") {

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
                                                <th colSpan={2}>Permissible Error ({(calibrationData && calibrationData.calcalibrationData.length > 0) ? calibrationData.calcalibrationData[0].calNominalSizeUnit : ""})</th>

                                                <th rowSpan={2}>Observer Error ({(calibrationData && calibrationData.calcalibrationData.length > 0) ? calibrationData.calcalibrationData[0].calNominalSizeUnit : ""})</th>

                                                <th rowSpan={2}>Status</th>
                                            </tr>
                                            <tr>
                                                <th>Min</th>
                                                <th>Max</th>
                                            </tr>
                                            {calibrationData.calcalibrationData.length > 0 && calibrationData.calcalibrationData.map((item, index) => {

                                                let averageColor = "";
                                                if (parseFloat(item.calOBError) >= parseFloat(item.calMinPSError) && parseFloat(item.calOBError) <= parseFloat(item.calMaxPSError)) {
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
                                                        <td><input className='form-control form-control-sm' name='calOBError' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
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

                                        </tbody>
                                    }
                                    {calibrationData.calItemType === "referenceStandard" &&
                                        <tbody>
                                            <tr>

                                                <th width="20%" rowSpan={2}>Parameter</th>
                                                <th width="10%" rowSpan={2}>Range/Size</th>
                                                <th width="5%" rowSpan={2}>Unit</th>
                                                <th colSpan={2}>Permissible Size ({(calibrationData && calibrationData.calcalibrationData.length > 0) ? calibrationData.calcalibrationData[0].calNominalSizeUnit : ""})</th>
                                                {calibrationData.calBeforeData === "yes" && <th width="10%" rowSpan={2}>Before Calibration</th>}
                                                <th width="20%" colSpan={calibrationData.calOBType === "average" ? 1 : 2}>Observed Size ({(calibrationData && calibrationData.calcalibrationData.length > 0) ? calibrationData.calcalibrationData[0].calNominalSizeUnit : ""})</th>
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

                                                            <td colSpan={2}>{item.calOBError}</td>


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
                                        <td>{dayjs(item.itemCalDate).format("DD-MM-YYYY")}</td>
                                        <td>{dayjs(item.itemDueDate).format("DD-MM-YYYY")}</td>
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
            <DialogActions className='d-flex justify-content-end'>
                
                <div >
                    <Button variant='contained' disabled={loading} color='error' className='me-3' onClick={() => { setCalOpen(false); window.location.reload() }}>Cancel</Button>
                    <Button variant='contained' disabled={loading} color='success' onClick={() => { setConfirmSubmit(true) }}>
                        
                        {loading ? <CircularProgress
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

export default CalDialog