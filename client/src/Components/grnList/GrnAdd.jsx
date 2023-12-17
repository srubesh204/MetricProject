import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, Radio, RadioGroup, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GrnListContent } from './GrnList';

import { Add, Close, Delete } from '@mui/icons-material';

const GrnAdd = () => {
    const grnDatas = useContext(GrnListContent)
    const { grnOpen, setGrnOpen, selectedRows, grnListFetchData } = grnDatas



    const initialGrnData = {
        grnPartyRefNo: "",
        grnPartyId: "",
        grnPartyRefDate: dayjs().format("YYYY-MM-DD"),
        grnPartyName: "",
        grnPartyCode: "",
        grnPartyAddress: "",
        grnNo: "",
        grnDate: dayjs().format("YYYY-MM-DD"),
        grnCommonRemarks: "",
        grnCalDate: dayjs().format("YYYY-MM-DD"),
        grnDueDate: "",
        grnCertificateStatus: "",
        grnCertificateNo: "",
        grnUncertainity: "",
        grnPartyItems: []

    }


    const [grnData, setGrnData] = useState({
        grnPartyRefNo: "",
        grnPartyId: "",
        grnPartyRefDate: dayjs().format("YYYY-MM-DD"),
        grnPartyName: "",
        grnPartyCode: "",
        grnPartyAddress: "",
        grnNo: "",
        grnDate: dayjs().format("YYYY-MM-DD"),
        grnCommonRemarks: "",

        grnPartyItems: [{
            grnItemId: "",
            grnItemMasterRef: "",
            grnItemAddMasterName: "",
            grnItemIMTENo: "",
            grnItemType: "",
            grnItemRangeSize: "",
            grnItemRangeSizeUnit: "",
            grnItemMFRNo: "",
            grnItemLC: "",
            grnItemLCUnit: "",
            grnItemMake: "",
            grnItemModelNo: "",
            grnItemStatus: "",
            grnItemReceiptDate: "",
            grnItemDepartment: "",
            grnItemArea: "",
            grnItemPlaceOfUsage: "",
            grnItemCalFreInMonths: "",
            grnItemCalAlertDays: "",
            grnItemCalibrationSource: "",
            grnItemCalibrationDoneAt: "",
            grnItemCalibratedAt: "",
            grnItemOBType: "",
            grnAcCriteria: [
                {
                    grnAcParameter: "",
                    grnAcNominalSize: "",
                    grnAcNominalSizeUnit: "",
                    grnAcMinPS: "",
                    grnAcMaxPS: "",
                    grnAcWearLimitPS: "",
                    grnAcMinOB: "",
                    grnAcMaxOB: "",
                    grnAcAverageOB: "",
                    grnAcOBError: "",
                    grnAcMinPSError: "",
                    grnAcMaxPSError: "",
                    rowStatus: ""
                },
            ],
            grnItemUncertainity: "",
            grnItemCalDate: dayjs().format("YYYY-MM-DD"),
            grnItemDueDate: "",
            grnItemCertificateStatus: "",
            grnItemCertificateNo: "",
            grnItemCertificate: "",
            grnUncertainity: "",
        }
        ]
    })



    const setCalData = () => {
        if (selectedRows.length === 1) {


            setGrnData((prev) => (
                {
                    ...prev,
                    grnItemId: selectedRows[0]._id,
                    grnItemIMTENo: selectedRows[0].itemIMTENo,
                    grnItemAddMasterName: selectedRows[0].itemAddMasterName,
                    grnItemType: selectedRows[0].itemType,
                    grnItemRangeSize: selectedRows[0].itemRangeSize,
                    grnItemMFRNo: selectedRows[0].itemMFRNo,
                    grnItemLC: selectedRows[0].itemLC,
                    grnItemMake: selectedRows[0].itemMake,
                    grnItemCalFreInMonths: selectedRows[0].itemCalFreInMonths,
                    grnItemUncertainity: selectedRows[0].selectedItemMaster[0].uncertainty,

                    grnItemOBType: selectedRows[0].itemOBType,

                    // calCalibratedBy: selectedRows[0],
                    // calApprovedBy: selectedRows[0],
                    grnAcCriteria:

                        selectedRows[0].acceptanceCriteria.map((item) => (
                            {
                                grnAcParameter: item.acParameter,
                                grnAcNominalSize: item.acNominalSize,
                                grnAcNominalSizeUnit: item.acNominalSizeUnit,
                                grnAcMinPS: item.acMinPS,
                                grnAcMaxPS: item.acMaxPS,
                                grnAcWearLimitPS: item.acWearLimitPS,

                                grnAcMinOB: item.acMinOB,
                                grnAcMaxOB: item.acMaxOB,
                                grnAcAverageOB: item.acAverageOB,
                                grnAcOBError: item.acOBError,
                                grnAcMinPSError: item.acMinPSError,
                                grnAcMaxPSError: item.acMaxPSError,
                                rowStatus: ""

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





    const [itemAddDetails, setItemAddDetails] = useState({
        grnList: "",
        grnImteNo: ""
    })







    const [vendorDataList, setVendorDataList] = useState([])

    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data.result);
            //setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);


    const handleGrnChange = (e) => {
        const { name, value, checked } = e.target;
        setGrnData((prev) => ({ ...prev, [name]: value }));
    }

    const setPartyData = async (id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getVendorById/${id}`
            );
            console.log(response)
            setGrnData((prev) => ({
                ...prev,
                grnPartyName: response.data.result.fullName,
                grnPartyAddress: response.data.result.address,
                grnPartyCode: response.data.result.vendorCode

            }))

        } catch (err) {
            console.log(err);
        }
    };


    // const setGrnPartyData = async (id) => {
    //     try {
    //         const response = await axios.get(
    //             `${process.env.REACT_APP_PORT}/itemAdd/getItemAddById/${id}`
    //         );
    //         console.log(response)
    //         setGrnData((prev) => ({
    //             ...prev,
    //             grnPartyItems:

    //             selectedGrnItem[0].acceptanceCriteria.map((item) => (
    //                 {
    //                     calParameter: item.acParameter,
    //                     calNominalSize: item.acNominalSize,
    //                     calNominalSizeUnit: item.acNominalSizeUnit,
    //                     calMinPS: item.acMinPS,
    //                     calMaxPS: item.acMaxPS,
    //                     calWearLimitPS: item.acWearLimitPS,
    //                     calBeforeCalibration: "",
    //                     calMinOB:"",
    //                     calMaxOB: "",
    //                     calAverageOB: "",
    //                     calOBError: item.acOBError,
    //                     calMinPSError: item.acMinPSError,
    //                     calMaxPSError: item.acMaxPSError,
    //                     rowStatus: ""

    //                 }
    //             )),

    //         }))

    //     } catch (err) {
    //         console.log(err);
    //     }
    // };




    const [grnList, setGrnList] = useState({})
    const grnFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemGRN/getAllItemGRN`
            );
            setGrnList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        grnFetchData();
    }, []);



    const [itemAddList, setItemAddList] = useState([]);

    const itemAddFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByIMTESort`
            );
            // You can use a different logic for generating the id

            setItemAddList(response.data.result);


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemAddFetch();
    }, []);


    const [itemMasterDistNames, setItemMasterDistNames] = useState([])
    const getDistinctItemName = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllDistinctItemName`
            );
            console.log(response.data)
            setItemMasterDistNames(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getDistinctItemName();
    }, []);
    // 

    const [imteList, setImteList] = useState([])
    const getImteList = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByIMTESort`
            );
            console.log(response.data)
            setImteList(response.data.result)


        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getImteList();
    }, []);

    const [allItemImtes, setAllItemImtes] = useState([])

    const [selectedGrnItem, setSelectedGrnItem] = useState([])
    //
    const getItemByName = async (value) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByName`, { itemItemMasterName: value }
            );
            console.log(response.data)
            setAllItemImtes(response.data.result)

            console.log()

        } catch (err) {
            console.log(err);
        }
    };



    const [calibrationDatas, setCalibrationDatas] = useState([])
    const getAllCalibrationData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemGRN/getAllItemGRN`
            );
            console.log(response.data.result)
            try {
                const imteNoData = response.data.result.filter((item) => item.grnItemIMTENo === selectedRows[0].itemIMTENo)
                console.log(imteNoData)
                setCalibrationDatas(response.data.result)
                const maxDateObject = imteNoData.reduce((prev, current) => {



                });

            } catch {

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






    const handleGrnItemAdd = (e) => {
        const { name, value } = e.target;
        if (name === "grnList") {
            getItemByName(value)
            setItemAddDetails((prev) => ({ ...prev, [name]: value }))
        }
        if (name === "grnImteNo") {
            setItemAddDetails((prev) => ({ ...prev, [name]: value }))





            const getItemByName = async (value) => {
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_PORT}/itemAdd/getItemAddById/${value}`
                    );
                    console.log(response.data)
                    setSelectedGrnItem(response.data.result)

                } catch (err) {
                    console.log(err);
                }
            };
            getItemByName(value);
        }


    }
    console.log(selectedGrnItem)

    const grnItemAdd = () => {
        if (setSelectedGrnItem.length !== 0) {
            setGrnData((prev) => (
                {
                    ...prev, grnPartyItems: selectedGrnItem



                }

            ))
        }
    }

    console.log(grnData)
    useEffect(() => {
        setSelectedGrnItem([])
        setItemAddDetails({
            grnList: "",
            grnImteNo: ""
        })
    }, [grnData.grnPartyItems])





    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [errorhandler, setErrorHandler] = useState({})

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const submitCalForm = async () => {
        try {
            const response = await axios.post(

                `${process.env.REACT_APP_PORT}/itemGRN/createItemGRN`, grnData
            );
            console.log(response.data)
            setAlertMessage(response.data.message)
            setSnackBarOpen(true)
            setTimeout(() => setGrnOpen(false), 3000)
            grnListFetchData()
            setGrnData(initialGrnData)
        } catch (err) {
            console.log(err);
        }
    };

    const changeACValue = (index, name, value) => {

        setGrnData((prev) => {
            const updateAC = [...prev.grnPartyItems.acceptanceCriteria]
            updateAC[index] = {
                ...updateAC[index], [name]: value,
            };
            return {
                ...prev.grnPartyItems, acceptanceCriteria: updateAC,
            };
        })

        if (grnData.grnPartyItems === "attribute") {
            if (name === "acAverageOB") {
                setGrnData(prev => {
                    const updatedData = prev.acceptanceCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""
                            if (item.acWearLimitPS !== "") {

                                if (item.acWearLimitPS <= item.acMinPS) {
                                    const isAverageInRange = parseFloat(item.acAverageOB) >= parseFloat(item.acWearLimitPS) &&
                                        parseFloat(item.acAverageOB) <= parseFloat(item.acMaxPS);

                                    if (item.acAverageOB === "") {
                                        status = ""
                                    } else {
                                        if (isAverageInRange) {
                                            status = "ok"
                                        } else {
                                            status = "notOk"
                                        }
                                    }
                                }

                                if (item.acWearLimitPS >= item.acMaxPS) {
                                    const isAverageInRange = parseFloat(item.acAverageOB) <= parseFloat(item.acWearLimitPS) &&
                                        parseFloat(item.acAverageOB) >= parseFloat(item.acMinPS);

                                    if (item.acAverageOB === "") {
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
                                const isAverageInRange = parseFloat(item.acAverageOB) >= parseFloat(item.acMinPS) &&
                                    parseFloat(item.acAverageOB) <= parseFloat(item.acMaxPS);

                                if (item.acAverageOB === "") {
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
                        acceptanceCriteria: updatedData,
                    };
                });
            }

            if (name === "acMinOB" || name === "acMaxOB") {
                setGrnData(prev => {
                    const updatedData = prev.acceptanceCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""
                            if (item.acWearLimitPS !== "") {

                                if (item.acWearLimitPS <= item.acMinPS) {


                                    const isMinInRange = parseFloat(item.acMinOB) >= parseFloat(item.acWearLimitPS) &&
                                        parseFloat(item.acMinOB) <= parseFloat(item.acMaxPS);
                                    const isMaxInRange = parseFloat(item.acMaxOB) >= parseFloat(item.acWearLimitPS) &&
                                        parseFloat(item.acMaxOB) <= parseFloat(item.acMinPS);



                                    if (isMinInRange && isMaxInRange) {
                                        status = "ok"
                                    } else {
                                        status = "notOk"
                                    }

                                }

                                if (item.acWearLimitPS >= item.acMaxPS) {
                                    const isMinInRange = parseFloat(item.acMinOB) <= parseFloat(item.acWearLimitPS) &&
                                        parseFloat(item.acMinOB) >= parseFloat(item.acMinPS);
                                    const isMaxInRange = parseFloat(item.acMaxOB) <= parseFloat(item.acWearLimitPS) &&
                                        parseFloat(item.acMaxOB) >= parseFloat(item.acMinPS);



                                    if (isMinInRange && isMaxInRange) {
                                        status = "ok"
                                    } else {
                                        status = "notOk"
                                    }

                                }
                                const isMinInRange = parseFloat(item.acMinOB) >= parseFloat(item.acMinPS) &&
                                    parseFloat(item.acMinOB) <= parseFloat(item.acMaxPS);
                                const isMaxInRange = parseFloat(item.acMaxOB) >= parseFloat(item.acMinPS) &&
                                    parseFloat(item.acMaxOB) <= parseFloat(item.acMaxPS);

                                return {
                                    ...item,
                                    rowStatus: status,
                                };

                            } else {
                                const isMinInRange = parseFloat(item.acMinOB) >= parseFloat(item.acMinPS) &&
                                    parseFloat(item.acMinOB) <= parseFloat(item.acMaxPS);
                                const isMaxInRange = parseFloat(item.acMaxOB) >= parseFloat(item.acMinPS) &&
                                    parseFloat(item.acMaxOB) <= parseFloat(item.acMaxPS);




                                if (item.acMaxOB === "" && item.acMinOB === "") {
                                    status = "";
                                } else if (item.acMaxOB === "") {
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
                        acceptanceCriteria: updatedData,
                    };
                });
            }
        }







        // if (grnData.grnPartyItems.itemType === "referenceStandard") {
        //     if (name === "acAverageOB") {
        //         setGrnData(prev => {
        //             const updatedData = prev.grnDate.map((item, idx) => {
        //                 if (idx === index) {
        //                     let status = ""

        //                     const isAverageInRange = parseFloat(item.acAverageOB) >= parseFloat(item.acMinPS) &&
        //                         parseFloat(item.acAverageOB) <= parseFloat(item.acMaxPS);

        //                     if (item.acAverageOB === "") {
        //                         status = ""
        //                     } else {
        //                         if (isAverageInRange) {
        //                             status = "ok"
        //                         } else {
        //                             status = "notOk"
        //                         }
        //                     }

        //                     return {
        //                         ...item,
        //                         rowStatus: status,
        //                     };
        //                 }
        //                 return item;
        //             });
        //             return {
        //                 ...prev,
        //                 grnPartyItems: updatedData,
        //             };
        //         })
        //     }

        //     if (name === "acMinOB" || name === "acMaxOB") {
        //         setGrnData(prev => {
        //             const updatedData = prev.acceptanceCriteria.map((item, idx) => {
        //                 if (idx === index) {

        //                     const isMinInRange = parseFloat(item.acMinOB) >= parseFloat(item.acMinPS) &&
        //                         parseFloat(item.acMinOB) <= parseFloat(item.acMaxPS);
        //                     const isMaxInRange = parseFloat(item.acMaxOB) >= parseFloat(item.acMinPS) &&
        //                         parseFloat(item.acMaxOB) <= parseFloat(item.acMaxPS);


        //                     let status = ""

        //                     if (item.acMaxOB === "" && item.acMinOB === "") {
        //                         status = "";
        //                     } else if (item.acMaxOB === "") {
        //                         status = (isMinInRange) ? "ok" : "notOk";
        //                     } else {
        //                         status = (isMinInRange && isMaxInRange) ? "ok" : "notOk";
        //                     }

        //                     return {
        //                         ...item,
        //                         rowStatus: status,
        //                     };
        //                 }
        //                 return item;
        //             });
        //             return {
        //                 ...prev,
        //                 acceptanceCriteria: updatedData,
        //             };
        //         });
        //     }

        // }




        // //


        if (grnData.grnPartyItems && grnData.grnPartyItems.itemType === "variable") {

            if (name === "acAverageOB") {
                setGrnData(prev => {
                    const updatedData = prev.acceptanceCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""

                            const isAverageInRange = parseFloat(item.acAverageOB) >= parseFloat(item.acMinPSError) &&
                                parseFloat(item.acAverageOB) <= parseFloat(item.acMaxPSError);

                            if (item.acAverageOB === "") {
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
                        acceptanceCriteria: updatedData,
                    };
                })
            }

        }






    };





















    return (

        <Dialog fullWidth={true} keepMounted maxWidth="xl" open={grnOpen} sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setGrnOpen(false)
                }
            }}>
            <DialogTitle align='center' >GRN</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setGrnOpen(false)}
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
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <form>
                            <Container maxWidth="lg" sx={{ mb: 2 }}>

                                <div className='row'>

                                    <div className='col'>
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                mb: 1,

                                            }}
                                            elevation={12}
                                        >
                                            <div className='col d-flex mb-2'>
                                                <div className=" col-6 me-2">

                                                    <TextField label="Party Ref No"
                                                        id="grnPartyRefNoId"
                                                        defaultValue=""
                                                        value={grnData.grnPartyRefNo}
                                                        //  sx={{ width: "100%" }}
                                                        size="small"
                                                        fullWidth
                                                        onChange={handleGrnChange}
                                                        name="grnPartyRefNo" />
                                                </div>
                                                <div className="col-6">

                                                    <DatePicker

                                                        fullWidth
                                                        id="grnPartyRefDateId"
                                                        name="grnPartyRefDate"
                                                        value={dayjs(grnData.grnPartyRefDate)}
                                                        onChange={(newValue) =>
                                                            setGrnData((prev) => ({ ...prev, grnPartyRefDate: newValue.format("YYYY-MM-DD") }))
                                                        }
                                                        label="Party Ref Date"
                                                        //onChange={handleGrnChange}


                                                        slotProps={{ textField: { size: 'small' } }}
                                                        format="DD-MM-YYYY" />



                                                </div>


                                            </div>
                                            <div className='row'>
                                                <div className='col d-flex mb-2'>
                                                    <div className=" col-6 me-2">

                                                        <TextField label="Party Name"
                                                            id="grnPartyNameId"
                                                            select
                                                            //  value={grnData.grnPartyName}

                                                            onChange={(e) => setPartyData(e.target.value)}

                                                            //  sx={{ width: "100%" }}
                                                            size="small"
                                                            fullWidth

                                                            name="grnPartyName" >
                                                            {vendorDataList.map((item, index) => (
                                                                <MenuItem key={index} value={item._id}>{item.fullName}</MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </div>
                                                    <div className="col-6">

                                                        <TextField label="Party code"
                                                            id="grnPartyCodeId"
                                                            defaultValue=""
                                                            onChange={handleGrnChange}
                                                            // sx={{ width: "100%" }}
                                                            size="small"
                                                            value={grnData.grnPartyCode}

                                                            fullWidth
                                                            name="grnPartyCode" />

                                                    </div>


                                                </div>

                                            </div>
                                            <div className='row '>
                                                <div className="col-12">

                                                    <TextField label="PartyAddress"
                                                        id="grnPartyAddressId"
                                                        defaultValue=""
                                                        size="small"
                                                        onChange={handleGrnChange}
                                                        value={grnData.grnPartyAddress}
                                                        sx={{ width: "100%" }}
                                                        name="grnPartyAddress" />

                                                </div>
                                            </div>
                                        </Paper>

                                    </div>

                                    <div className='col'>
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                mb: 1,

                                            }}
                                            elevation={12}
                                        >

                                            <div className='col d-flex mb-2'>
                                                <div className=" col-6 me-2">

                                                    <TextField
                                                        label="GRN NO"
                                                        id="grnNoId"
                                                        defaultValue=""
                                                        value={grnData.grnNo}
                                                        size="small"
                                                        onChange={handleGrnChange}
                                                        fullWidth
                                                        name="grnNo"
                                                    />
                                                </div>
                                                <div className="col-6">



                                                    <DatePicker

                                                        fullWidth
                                                        id="grnDateId"
                                                        name="grnDate"
                                                        value={dayjs(grnData.grnPartyRefDate)}
                                                        onChange={(newValue) =>
                                                            setGrnData((prev) => ({ ...prev, grnDate: newValue.format("YYYY-MM-DD") }))
                                                        }
                                                        label="GRN Date"
                                                        //onChange={handleGrnChange}


                                                        slotProps={{ textField: { size: 'small' } }}
                                                        format="DD-MM-YYYY" />



                                                </div>


                                            </div>
                                            <div className='row '>
                                                <div className='mb-5'>
                                                    <TextField label="Common Remarks"
                                                        id="grnCommonRemarksId"

                                                        defaultValue=""
                                                        onChange={handleGrnChange}
                                                        value={grnData.grnCommonRemarks}
                                                        fullWidth
                                                        size="small"
                                                        name="grnCommonRemarks"
                                                    >
                                                    </TextField>
                                                </div>
                                            </div>
                                        </Paper>
                                    </div>
                                </div>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 1,

                                    }}
                                    elevation={12}
                                >
                                    <div className='row g-2 mb-2'>
                                        <div className='col d-flex'>
                                            <div className='col me-2'>
                                                <TextField size='small' fullWidth variant='outlined' defaultValue="" value={itemAddDetails.grnList} id="grnListId" onChange={handleGrnItemAdd} select label="Item List" name='grnList'>

                                                    {itemMasterDistNames.map((item, index) => (
                                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                                    ))}

                                                </TextField>
                                            </div>
                                            <div className='col'>
                                                <TextField label="Imte No"
                                                    id="grnImteNoId"
                                                    select
                                                    defaultValue=""
                                                    fullWidth
                                                    size="small"
                                                    disabled={itemAddDetails.grnList === ""}
                                                    onChange={handleGrnItemAdd}
                                                    value={itemAddDetails.grnImteNo}
                                                    name="grnImteNo" >

                                                    {allItemImtes.map((item, index) => (
                                                        <MenuItem key={index} value={item._id}>{item.itemIMTENo}</MenuItem>
                                                    ))}

                                                </TextField>
                                            </div>
                                            
                                        </div>
                                        <div className=' col d-flex justify-content-end'>
                                            

                                        </div>


                                    </div>

                                    <div className='row g-2 '>
                                        <div className='col d-flex'>
                                           
                                            <div className="col-2 me-2">

                                                <DatePicker
                                                    fullWidth
                                                    id="grnDueDateId"
                                                    name="grnDueDate"
                                                    // onChange={handleGrnChange}
                                                    value={dayjs(grnData.grnItemDueDate)}
                                                    label="Next Cal Date"
                                                    // sx={{ width: "100%" }}
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    onChange={(newValue) =>
                                                        setGrnData((prev) => ({ ...prev, grnItemDueDate: newValue.format("YYYY-MM-DD") }))
                                                    }
                                                    format="DD-MM-YYYY"

                                                />

                                            </div>
                                            <div className='col me-2'>
                                                <TextField
                                                    size='small'
                                                    fullWidth
                                                    variant='outlined'
                                                    id="grnCertificateStatusId"
                                                    onChange={handleGrnChange}
                                                    value={grnData.grnCertificateStatus}
                                                    select
                                                    label="Certificate Status"
                                                    name='grnCertificateStatus'
                                                >
                                                    <MenuItem value="received" disabled={grnData.certificate === "true"}>Received</MenuItem>
                                                    <MenuItem value="notreceived" disabled={grnData.certificate === "false"}>Not Received</MenuItem>
                                                </TextField>
                                            </div>
                                            <div className="col me-2">

                                                <TextField label="CertificateNo"
                                                    id="grnCertificateNoId"
                                                    value={grnData.grnCertificateNo}
                                                    onChange={handleGrnChange}
                                                    disabled={grnData.grnCertificateStatus === "" ? false : true}
                                                    defaultValue=""
                                                    size="small"
                                                    sx={{ width: "101%" }}
                                                    name="grnCertificateNo" />


                                            </div>
                                            <div className='col me-2'>
                                                <TextField fullWidth label="Uncertainity" variant='outlined' id="grnUncertainityId" value={grnData.grnUncertainity} onChange={handleGrnChange} size='small' name='grnUncertainity' />

                                            </div>

                                            <div className='me-2' >
                                                <label className='itemlistloade'>
                                                    <input className="form-control itemlistdownload" type="file" id="upload" />Upload Certificate</label>
                                            </div>
                                        </div>

                                    </div>


                                    <div className='row'>
                                        <h6 className='text-center'>Calibration Data</h6>

                                        <div className=' col d-flex justify-content-end'>
                                            <div className=' col-2 me-2 '>
                                                <TextField size='small' fullWidth variant='outlined' id="certificateStatusId" select label="Certificate Status" onChange={handleGrnChange} name='certificateStatus'>
                                                    <MenuItem value="received">Received</MenuItem>
                                                    <MenuItem value="notreceived">Not Received</MenuItem>

                                                </TextField>
                                            </div>

                                        </div>




                                        <table className='table table-sm table-bordered table-responsive text-center align-middle'>
                                            {grnData.grnPartyItems.grnItemType === "attribute" &&

                                                <tbody >
                                                    <tr>

                                                        <th width="20%" rowSpan={2}>Parameter</th>
                                                        <th width="10%" rowSpan={2}>Range/Size</th>
                                                        <th width="10%" rowSpan={2}>Unit</th>
                                                        <th colSpan={3} width="30%">Permissible Size</th>


                                                        <th width="20%" colSpan={grnData.grnPartyItems.grnItemOBType === "average" ? 1 : 2}>Observed Size</th>
                                                        <th width="10%" rowSpan={2}>Status</th>
                                                    </tr>
                                                    <tr>
                                                        <th width="6%">Min</th>
                                                        <th width="6%">Max</th>
                                                        <th width="10%">Wear Limit</th>
                                                        {grnData.grnPartyItems.grnItemOBType === "average" ?
                                                            <React.Fragment>
                                                                <th>Average</th>
                                                            </React.Fragment> :
                                                            <React.Fragment>
                                                                <th>Min</th>
                                                                <th>Max</th>
                                                            </React.Fragment>}

                                                    </tr>
                                                    {/* {calibrationData.calcalibrationData.map((item)=> ()} */}
                                                    {grnData.grnPartyItems.grnAcCriteria.map((item, index) => {
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
                                                        if (item.acWearLimitPS !== "") {

                                                            if (item.acWearLimitPS < item.acMinPS) {
                                                                size = "OD"
                                                            } else {
                                                                size = "ID"
                                                            }

                                                            if (size === "OD") {
                                                                //min OD condition
                                                                if (item.acMinOB >= item.acWearLimitPS && item.acMinOB < item.acMinPS) {
                                                                    minColor = "orange"
                                                                }
                                                                else if (item.acMinOB >= item.acMinPS && item.acMinOB <= item.acMaxPS) {
                                                                    minColor = "green"
                                                                } else {
                                                                    minColor = "red"
                                                                }

                                                                if (item.acMaxOB >= item.acWearLimitPS && item.acMaxOB < item.acMinPS) {
                                                                    maxColor = "orange"
                                                                }
                                                                else if (item.acMaxOB >= item.acMinPS && item.acMaxOB <= item.acMaxPS) {
                                                                    maxColor = "green"
                                                                } else {
                                                                    maxColor = "red"
                                                                }

                                                                if (item.acAverageOB >= item.acWearLimitPS && item.acAverageOB < item.acMinPS) {
                                                                    averageColor = "orange"
                                                                }
                                                                else if (item.acAverageOB >= item.acMinPS && item.acAverageOB <= item.acMaxPS) {
                                                                    averageColor = "green"
                                                                } else {
                                                                    averageColor = "red"
                                                                }


                                                            }

                                                            if (size === "ID") {
                                                                //min Id condition
                                                                if (item.acMinOB <= item.acWearLimitPS && item.acMinOB > item.acMaxPS) {
                                                                    minColor = "orange"
                                                                }
                                                                else if (item.acMinOB >= item.acMinPS && item.acMinOB <= item.acMaxPS) {
                                                                    minColor = "green"
                                                                } else {
                                                                    minColor = "red"
                                                                }
                                                                //max ID condition
                                                                if (item.acMaxOB <= item.acWearLimitPS && item.acMaxOB > item.acMaxPS) {
                                                                    maxColor = "orange"
                                                                }
                                                                else if (item.acMaxOB >= item.acMinPS && item.acMaxOB <= item.acMaxPS) {
                                                                    maxColor = "green"
                                                                } else {
                                                                    maxColor = "red"
                                                                }

                                                                if (item.acAverageOB <= item.acWearLimitPS && item.acAverageOB > item.acMaxPS) {
                                                                    averageColor = "orange"
                                                                }
                                                                else if (item.acAverageOB >= item.acMinPS && item.acAverageOB <= item.acMaxPS) {
                                                                    averageColor = "green"
                                                                } else {
                                                                    averageColor = "red"
                                                                }
                                                            }

                                                            //   handleStatus(index, minColor, maxColor);



                                                        } else {


                                                            if (parseFloat(item.acMinOB) >= parseFloat(item.acMinPS) && parseFloat(item.acMinOB) <= parseFloat(item.acMaxPS)) {
                                                                minColor = "#4cbb17";

                                                            } else {
                                                                minColor = "red"

                                                            }


                                                            if (parseFloat(item.acMaxOB) >= parseFloat(item.acMinPS) && parseFloat(item.acMaxOB) <= parseFloat(item.acMaxPS)) {
                                                                maxColor = "#4cbb17"

                                                            } else {
                                                                maxColor = "red"

                                                            }

                                                            if (parseFloat(item.acAverageOB) >= parseFloat(item.acMinPS) && parseFloat(item.acAverageOB) <= parseFloat(item.acMaxPS)) {
                                                                averageColor = "#4cbb17";

                                                            } else {
                                                                averageColor = "red"

                                                            }
                                                        }





                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.grnAcParameter}</td>
                                                                <td>{item.grnAcNominalSize}</td>
                                                                <td>{item.grnAcNominalSizeUnit}</td>
                                                                <td>{item.grnAcMinPS}</td>
                                                                <td>{item.grnAcMaxPS}</td>
                                                                <td>{item.grnAcWearLimitPS}</td>

                                                                {grnData.calBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeACValue(index, e.target.name, e.target.value)} name='calBeforeCalibration' /></td>}
                                                                {grnData.grnPartyItems.grnItemOBType === "average" &&
                                                                    <td><input className='form-control form-control-sm' name='acAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                                }
                                                                {grnData.grnPartyItems.grnItemOBType === "minmax" &&
                                                                    <React.Fragment>
                                                                        <td>
                                                                            <input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} name="acMinOB" onChange={(e) => changeACValue(index, e.target.name, e.target.value)} />
                                                                        </td>
                                                                        <td>
                                                                            <input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} name="acMaxOB" onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                                    </React.Fragment>}


                                                                <td width="15%">
                                                                    <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changeACValue(index, e.target.name, e.target.value)}>
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
                                        <Alert onClose={() => setSnackBarOpen(false)} variant='filled' severity="success" sx={{ width: '100%' }}>
                                            {alertMessage}
                                        </Alert>
                                    </Snackbar>


                                    <div className='row'>



                                    </div>
                                </Paper>

                                <Paper elevation={12} sx={{ p: 2 }} className='col-md-12'>
                                    <div className="row mb-2">

                                        <div className='col-md'> <h5 className='text-start'>Master Used</h5></div>
                                        <div className=' col d-flex justify-content-end'>
                                            <div className='me-2 '>
                                                <Button startIcon={<Add />} onClick={() => grnItemAdd()} size='small' sx={{ minWidth: "130px" }} variant='contained'>Add Item</Button>
                                            </div>

                                        </div>

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

                                            {grnData.grnPartyItems.map((item, index) => {
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.grnItemIMTENo}</td>
                                                    <td>{item.grnItemAddMasterName}</td>
                                                    <td>{item.grnItemRangeSize}</td>

                                                    <td>{item.grnItemCalDate}</td>
                                                    <td>{item.grnItemDueDate}</td>
                                                    <td>{item.grnItemCalibratedAt}</td>
                                                    <td width="5%"><Delete color='error' /></td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </Paper>




                            </Container>
                        </form>
                    </LocalizationProvider>

                </div>
            </DialogContent>
            <DialogActions className='d-flex justify-content-between'>
                <div>
                    <Button variant='contained' color='warning' className='me-3'>Upload Report</Button>
                </div>
                <div>
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setGrnOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { setConfirmSubmit(true) }}>Submit</Button>
                </div>
            </DialogActions>

        </Dialog>
    )
}

export default GrnAdd