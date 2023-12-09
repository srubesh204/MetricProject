import React, { createContext, useEffect, useState, useContext } from 'react'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, MenuItem, Paper, Snackbar, Switch, TextField } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { HomeContent } from '../Home';
import { Add, Close, Delete } from '@mui/icons-material';

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const CalDialog = () => {


    const calData = useContext(HomeContent)
    const { calOpen, setCalOpen, selectedRows, itemMasters, activeEmps } = calData
    const [calibrationDatas, setCalibrationDatas] = useState([])

    const getAllCalibrationData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemCal/getAllItemCals`
            );
            console.log(response.data.result)
            setCalibrationDatas(response.data.result)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getAllCalibrationData();
    }, [])

    
    const [selectedExtraMaster, setSelectedExtraMaster] = useState([])
    console.log(selectedExtraMaster)

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
        calCertificateNo: calibrationDatas.length + 1,
        calItemCalDate: dayjs().format('YYYY-MM-DD'),
        calItemDueDate: "",
        calItemEntryDate: dayjs().format('YYYY-MM-DD'),
        calCalibratedBy: "",
        calApprovedBy: "",
        calBeforeData: "no",
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
            calStatus: ""
        }],
        calMasterUsed: []
    })


    const setCalData = () => {
        if (selectedRows.length === 1) {


            setCalibrationData((prev) => (
                {
                    ...prev,
                    calItemId: selectedRows[0]._id,
                    calIMTENo: selectedRows[0].itemIMTENo,
                    calItemName: selectedRows[0].itemAddMasterName,
                    calItemType: selectedRows[0].itemType,
                    calRangeSize: selectedRows[0].itemRangeSize,
                    calItemMFRNo: selectedRows[0].itemMFRNo,
                    calLC: selectedRows[0].itemLC,
                    calItemMake: selectedRows[0].itemMake,
                    calItemFreInMonths: selectedRows[0].itemCalFreInMonths,
                    calItemUncertainity: selectedRows[0].selectedItemMaster[0].uncertainty,
                    calItemSOPNo: selectedRows[0].selectedItemMaster[0].SOPNo,
                    calStandardRef: selectedRows[0].selectedItemMaster[0].standardRef,
                    calOBType: selectedRows[0].itemOBType,

                    // calCalibratedBy: selectedRows[0],
                    // calApprovedBy: selectedRows[0],
                    calcalibrationData:

                        selectedRows[0].acceptanceCriteria.map((item) => (
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
                                calStatus: ""
                            }
                        )),

                    calMasterUsed: selectedRows[0].itemItemMasterIMTENo
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

        if (name === "calAverageOB") {
            const initialStatuses = calibrationData.calcalibrationData.map(item => {
                const isAverageInRange =
                    parseFloat(value) >= parseFloat(item.calMinPS) &&
                    parseFloat(value) <= parseFloat(item.calMaxPS);

                return isAverageInRange ? "accepted" : "rejected";
            });
            console.log(initialStatuses)
            setCalibrationData((prev) => {
                const updateAC = [...prev.calcalibrationData]
                updateAC[index] = {
                    ...updateAC[index], calStatus: initialStatuses[index],
                };
                return {
                    ...prev, calcalibrationData: updateAC,
                };
            })
        }


    };

    // useEffect(() => {
    //     calibrationData.calcalibrationData.forEach((item, index) => {
    //         if (item.calAverageOB !== undefined) {
    //             const isAverageInRange =
    //                 parseFloat(item.calAverageOB) >= parseFloat(item.calMinPS) &&
    //                 parseFloat(item.calAverageOB) <= parseFloat(item.calMaxPS);
    
    //             const status = isAverageInRange ? "accepted" : "rejected";
    
    //             changecalDataValue(index, "calStatus", status);
    //         }
    //     });
    // }, [calibrationData.calcalibrationData]);




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
    const getEmployeeByName = (empId) => {
        const selectedEmp = activeEmps.filter((emp) => emp._id === empId);
        setSelectedEmp(selectedEmp)
    }
    useEffect(() => {
        getEmployeeByName(calibrationData.calCalibratedBy)
    }, [calibrationData.calCalibratedBy])

    const handleCalData = (e) => {
        const { name, value, checked } = e.target;
        setCalibrationData((prev) => ({ ...prev, [name]: value }))
        if (name === "beforeCalSwitch") {
            setCalibrationData((prev) => ({ ...prev, calBeforeData: checked ? "yes" : "no" }))
        }

    }


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
            setTimeout(() => setCalOpen(false), 3000)
        } catch (err) {
            console.log(err);
        }
    };

    const [obStatus, setObStatus] = useState([]);

    // const obStatusChange = (index, name, value) => {
    //     const initialStatuses = calibrationData.calcalibrationData.map(item => {
    //         const isAverageInRange =
    //             parseFloat(item.calAverageOB) >= parseFloat(item.calMinPS) &&
    //             parseFloat(item.calAverageOB) <= parseFloat(item.calMaxPS);

    //         return isAverageInRange ? "accepted" : "rejected";
    //     });
    //     console.log(initialStatuses)

    //     setCalibrationData((prev) => {
    //         const updateAC = [...prev.calcalibrationData]
    //         updateAC[index] = {
    //             ...updateAC[index], [name]: initialStatuses[index],
    //         };
    //         return {
    //             ...prev, calcalibrationData: updateAC,
    //         };
    //     })
    // }



    useEffect(() => {


    }, [calibrationData.calcalibrationData]);



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
                onClick={() => setCalOpen(false)}
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
                                <DatePicker format="DD-MM-YYYY" slotProps={{ textField: { size: 'small' } }} value={dayjs(calibrationData.calItemCalDate)} onChange={(newValue) => setCalibrationData((prev) => ({ ...prev, calItemCalDate: newValue.format('YYYY-MM-DD') }))} />
                            </div>
                            <div className="col-md-6">
                                <DatePicker format="DD-MM-YYYY" slotProps={{ textField: { size: 'small' } }} value={dayjs(calibrationData.calItemDueDate)} onChange={(newValue) => setCalibrationData((prev) => ({ ...prev, calItemDueDate: newValue.format('YYYY-MM-DD') }))} />
                            </div>
                            <div className="col-md-6">
                                <DatePicker format="DD-MM-YYYY" slotProps={{ textField: { size: 'small' } }} value={dayjs(calibrationData.calItemEntryDate)} onChange={(newValue) => setCalibrationData((prev) => ({ ...prev, calItemEntryDate: newValue.format('YYYY-MM-DD') }))} />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    id="calCalibratedById"
                                    size='small'
                                    label="Calibrated By"
                                    value={calibrationData.calCalibratedBy}
                                    name='calCalibratedBy'
                                    fullWidth
                                    select
                                    variant="outlined"
                                    onChange={handleCalData}
                                >
                                    {activeEmps.map((emp, index) => (
                                        <MenuItem key={index} value={emp._id}>{emp.firstName + " " + emp.lastName}</MenuItem>
                                    ))}
                                </TextField>


                            </div>
                            <div className="col-md-6">
                                <TextField
                                    InputProps={{
                                        disabled: selectedEmp.length === 0,
                                    }}
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
                                        <MenuItem key={index} value={emp._id}>{emp.firstName + " " + emp.lastName}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                    </Paper>

                    <Paper elevation={12} sx={{ p: 2 }} className='col-md-12 mb-2'>
                        <div className="d-flex justify-content-between mb-2">
                            <div> <Button size='small' variant='outlined' color='success' className='me-3'>Last Result</Button>
                                <FormControlLabel control={<Switch name='beforeCalSwitch' onChange={handleCalData} />} label="Before Calibration" /></div>
                            <div><h5 className='text-center'>Calibration Data</h5></div>
                            <div><TextField inputProps={{ sx: { color: "green" } }} InputLabelProps={{ shrink: true }} color='success' label="Cal Status" size="small" value="Ok"></TextField></div>

                        </div>


                        <table className='table table-bordered table-responsive text-center align-middle'>
                            {calibrationData.calItemType === "attribute" &&
                                <tbody>
                                    <tr>

                                        <th rowSpan={2}>Parameter</th>
                                        <th rowSpan={2}>Range/Size</th>
                                        <th rowSpan={2}>Unit</th>
                                        <th colSpan={3}>Permissible Size</th>
                                        {calibrationData.calBeforeData === "yes" && <th width="10%" rowSpan={2}>Before Calibration</th>}
                                        <th width="20%" colSpan={calibrationData.calOBType === "average" ? 1 : 2}>Observed Size</th>
                                        <th rowSpan={2}>Status</th>
                                    </tr>
                                    <tr>
                                        <th width="6%">Min</th>
                                        <th width="6%">Max</th>
                                        <th width="8%">Wear Limit</th>
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
                                    {calibrationData.calcalibrationData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.calParameter}</td>
                                            <td>{item.calNominalSize}</td>
                                            <td>{item.calNominalSizeUnit}</td>
                                            <td>{item.calMinPS}</td>
                                            <td>{item.calMaxPS}</td>
                                            <td>{item.calWearLimitPS}</td>
                                            {calibrationData.calBeforeData === "yes" && <td><input className='form-control form-control-sm' name="calBeforeCalibration" onChange={(e, index) => changecalDataValue(index, e.target.name, e.target.value)} /></td>}
                                            {calibrationData.calOBType === "average" &&
                                                <td><input name='calAverageOB' onChange={(e, index) => changecalDataValue(index, e.target.name, e.target.value)} className='form-control form-control-sm' /></td>
                                            }
                                            {calibrationData.calOBType === "minmax" &&
                                                <React.Fragment>
                                                    <td><input className='form-control form-control-sm' onChange={(e, index) => changecalDataValue(index, e.target.name, e.target.value)} />
                                                    </td> <td><input className='form-control form-control-sm' onChange={(e, index) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                                                </React.Fragment>}


                                            <td width="15%">
                                                <select className='form-select form-select-sm' name="" onChange={(e, index) => changecalDataValue(index, e.target.name, e.target.value)}>
                                                    <option>Status</option>
                                                    <option value="accepted" color='success'>Accepted</option>
                                                    <option value="rejected">Rejected</option>
                                                    <option value="conditionallyAccepted">Conditionally Accepted</option>
                                                </select>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>}
                            {calibrationData.calItemType === "variable" &&

                                <tbody>
                                    <tr>
                                        <th>Parameter</th>
                                        <th>Range/Size</th>
                                        <th>Unit</th>
                                        <th>Permissible Error</th>

                                        <th>Observed Size/ Observer Error</th>
                                        <th>Unit</th>
                                        <th>Status</th>
                                    </tr>
                                    {calibrationData.calcalibrationData.map((item, index) => (
                                        <tr>





                                            <td><input type="text" className='form-control form-control-sm' id="acMaxPSId" name="acMaxPS" placeholder='max' value={item.acMaxPS} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>


                                            <td><input type="text" className="form-control form-control-sm" id="acWearLimitPSId" name="acWearLimitPS" placeholder='wearLimit' value={item.acWearLimitPS} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>

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
                                    ))}

                                </tbody>
                            }
                            {calibrationData.calItemType === "referenceStandard" &&
                                <tbody>
                                    <tr>

                                        <th rowSpan={2}>Parameter</th>
                                        <th rowSpan={2}>Range/Size</th>
                                        <th rowSpan={2}>Unit</th>
                                        <th colSpan={2}>Permissible Size</th>
                                        {calibrationData.calBeforeData === "yes" && <th width="10%" rowSpan={2}>Before Calibration</th>}
                                        <th width="20%" colSpan={calibrationData.calOBType === "average" ? 1 : 2}>Observed Size</th>
                                        <th rowSpan={2}>Status</th>
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
                                            let color = "";
                                            if(item.calStatus === "accepted"){
                                                color = "#4cbb17"
                                            }else if(item.calStatus === "rejected"){
                                                color="red"
                                            }else if(item.calStatus === "conditionallyAccepted"){
                                                color="orange"
                                            }else{
                                                color=""
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
                                                    <td><input className='form-control form-control-sm' name='calAverageOB' style={{color: color, fontWeight: "bold"}} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                                                }
                                                {calibrationData.calOBType === "minmax" &&
                                                    <React.Fragment>
                                                        <td><input className='form-control form-control-sm' name="calMinOB"  onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} />
                                                        </td> <td><input className='form-control form-control-sm' name="calMaxOB" onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)} /></td>
                                                    </React.Fragment>}


                                                <td width="15%">
                                                    <select className='form-select form-select-sm' name="calStatus" value={item.calStatus} onChange={(e) => changecalDataValue(index, e.target.name, e.target.value)}>
                                                        <option value="">Status</option>
                                                        <option value="accepted">Accepted</option>
                                                        <option value="rejected">Rejected</option>
                                                        <option value="conditionallyAccepted">Conditionally Accepted</option>
                                                    </select>
                                                </td>
                                            </tr>

                                        )
                                    })}

                                </tbody>}
                        </table>



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
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setCalOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { setConfirmSubmit(true) }}>Submit</Button>
                </div>
            </DialogActions>


        </Dialog>
    )
}

export default CalDialog