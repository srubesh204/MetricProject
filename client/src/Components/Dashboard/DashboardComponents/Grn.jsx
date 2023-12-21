import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, Chip } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { HomeContent } from '../Home';
import { useNavigate } from 'react-router-dom';
import { Add, Close, CloudUpload, Delete, Done } from '@mui/icons-material';
import styled from '@emotion/styled';

const Grn = () => {
    const grnDatas = useContext(HomeContent)
    const { grnOpen, setGrnOpen, selectedRows } = grnDatas

    const [grnImtes, setGrnImtes] = useState(selectedRows)

    useEffect(() => {
        setGrnImtes(selectedRows)
    }, [selectedRows])


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


    useEffect(() => {

    }, [])




    const initialGrnData = {
        grnPartyRefNo: "",
        grnPartyId: "",
        grnPartyRefDate: dayjs().format("YYYY-MM-DD"),
        grnPartyName: "",
        grnPartyCode: "",
        grnPartyAddress: "",
        grnNo: "",
        grnDate: dayjs().format("YYYY-MM-DD"),
        grncCommonRemarks: "",
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
        grnPartyItems: []

    })
    console.log(grnData)



    const [itemAddDetails, setItemAddDetails] = useState({
        grnList: "",
        grnImteNo: ""
    })


    const navigate = useNavigate();

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
                grnPartyCode: response.data.result.vendorCode,
                grnPartyId: response.data.result._id
            }))

        } catch (err) {
            console.log(err);
        }
    };




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
                `${process.env.REACT_APP_PORT}/itemAdd/getDistinctItemName`
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
    const [itemImtes, setItemImtes] = useState([])

    const initialGrnItem = {
        grnItemId: "",
        grnItemMasterRef: "",
        grnItemAddMasterName: "",
        grnItemType: "",
        grnItemIMTENo: "",
        grnItemRangeSize: "",
        grnItemRangeSizeUnit: "",
        grnItemMFRNo: "",
        grnItemLC: "",
        grnItemLCUnit: "",
        grnItemMake: "",
        grnItemModelNo: "",

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
        grnItemStatus: "",
        grnAcCriteria: [
            {
                grnParameter: "",
                grnNominalSize: "",
                grnNominalSizeUnit: "",
                grnMinPS: "",
                grnMaxPS: "",
                grnWearLimitPS: "",
                grnBeforegrnibration: "",
                grnMinOB: "",
                grnMaxOB: "",
                grnAverageOB: "",
                grnOBError: "",
                grnMinPSError: "",
                grnMaxPSError: "",
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
        grnItemCalStatus: "",
    }


    const [selectedGrnItem, setSelectedGrnItem] = useState({
        grnItemId: "",
        grnItemMasterRef: "",
        grnItemAddMasterName: "",
        grnItemType: "",
        grnItemIMTENo: "",
        grnItemRangeSize: "",
        grnItemRangeSizeUnit: "",
        grnItemMFRNo: "",
        grnItemLC: "",
        grnItemLCUnit: "",
        grnItemMake: "",
        grnItemModelNo: "",

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
        grnItemStatus: "",
        grnAcCriteria: [
            {
                grnParameter: "",
                grnNominalSize: "",
                grnNominalSizeUnit: "",
                grnMinPS: "",
                grnMaxPS: "",
                grnWearLimitPS: "",
                grnBeforegrnibration: "",
                grnMinOB: "",
                grnMaxOB: "",
                grnAverageOB: "",
                grnOBError: "",
                grnMinPSError: "",
                grnMaxPSError: "",
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
        grnItemCalStatus: "",
    })
    //
    // useEffect(() => {
    //     const filteredImtes = selectedRows.filter((imtes) => !grnData.grnPartyItems.some(grnImte => imtes._id === grnImte._id))
    //     setItemImtes(filteredImtes)
    // }, [])




    const handleGrnItemChange = (e) => {
        const { name, value } = e.target;


        if (name === "grnItemStatus") {
            const fetchedData = selectedRows.filter((item) => item._id === selectedGrnItem.grnItemId)
            console.log(fetchedData)
            setSelectedGrnItem((prev) => ({ ...prev, [name]: value }))
            if (value === "Calibrated") {
                setSelectedGrnItem({
                    [name]: value,
                    grnItemId: fetchedData[0]._id,
                    grnItemAddMasterName: fetchedData[0].itemAddMasterName,
                    grnItemIMTENo: fetchedData[0].itemIMTENo,
                    grnItemType: fetchedData[0].itemType,
                    grnItemRangeSize: fetchedData[0].itemRangeSize,
                    grnItemRangeSizeUnit: fetchedData[0].itemRangeSizeUnit,
                    grnItemMFRNo: fetchedData[0].itemMFRNo,
                    grnItemLC: fetchedData[0].itemLC,
                    grnItemLCUnit: fetchedData[0].itemLCUnit,
                    grnItemMake: fetchedData[0].itemMake,
                    grnItemModelNo: fetchedData[0].itemModelNo,

                    grnItemDepartment: fetchedData[0].itemDepartment,
                    grnItemArea: fetchedData[0].itemArea,
                    grnItemPlaceOfUsage: fetchedData[0].itemPlaceOfUsage,
                    grnItemCalFreInMonths: fetchedData[0].itemCalFreInMonths,
                    grnItemCalAlertDays: fetchedData[0].itemCalAlertDays,
                    grnItemCalibrationSource: fetchedData[0].itemCalibrationSource,
                    grnItemCalibrationDoneAt: fetchedData[0].itemCalibrationDoneAt,
                    grnItemCalibratedAt: fetchedData[0].itemCalibratedAt,
                    grnItemOBType: fetchedData[0].itemOBType,
                    grnAcCriteria: fetchedData[0].acceptanceCriteria.map((item) => (
                        {
                            grnParameter: item.acParameter,
                            grnNominalSize: item.acNominalSize,
                            grnNominalSizeUnit: item.acNominalSizeUnit,
                            grnMinPS: item.acMinPS,
                            grnMaxPS: item.acMaxPS,
                            grnWearLimitPS: item.acWearLimitPS,
                            grnBeforegrnibration: "",
                            grnMinOB: item.acMinOB,
                            grnMaxOB: item.acMaxOB,
                            grnAverageOB: item.acAverageOB,
                            grnOBError: item.acOBError,
                            grnMinPSError: item.acMinPSError,
                            grnMaxPSError: item.acMaxPSError,
                            rowStatus: ""
                        }
                    )),
                    grnItemUncertainity: fetchedData[0].itemUncertainity,
                    grnItemCalDate: dayjs().format("YYYY-MM-DD"),
                    grnItemDueDate: "",
                    grnItemCertificateStatus: "",
                    grnItemCertificateNo: "",
                    grnItemCertificate: "",
                    grnUncertainity: "",
                    grnItemCalStatus: ""
                })
            } else {
                setSelectedGrnItem({
                    [name]: value,
                    grnItemId: fetchedData[0]._id,
                    grnItemAddMasterName: fetchedData[0].itemAddMasterName,
                    grnItemIMTENo: fetchedData[0].itemIMTENo,
                    grnItemType: fetchedData[0].itemType,
                    grnItemRangeSize: fetchedData[0].itemRangeSize,
                    grnItemRangeSizeUnit: fetchedData[0].itemRangeSizeUnit,
                    grnItemMFRNo: fetchedData[0].itemMFRNo,
                    grnItemLC: fetchedData[0].itemLC,
                    grnItemLCUnit: fetchedData[0].itemLCUnit,
                    grnItemMake: fetchedData[0].itemMake,
                    grnItemModelNo: fetchedData[0].itemModelNo,

                    grnItemDepartment: fetchedData[0].itemDepartment,
                    grnItemArea: fetchedData[0].itemArea,
                    grnItemPlaceOfUsage: fetchedData[0].itemPlaceOfUsage,
                    grnItemCalFreInMonths: fetchedData[0].itemCalFreInMonths,
                    grnItemCalAlertDays: fetchedData[0].itemCalAlertDays,
                    grnItemCalibrationSource: fetchedData[0].itemCalibrationSource,
                    grnItemCalibrationDoneAt: fetchedData[0].itemCalibrationDoneAt,
                    grnItemCalibratedAt: "",
                    grnItemOBType: fetchedData[0].itemOBType,
                    grnAcCriteria: fetchedData[0].acceptanceCriteria.map((item) => (
                        {
                            grnParameter: item.acParameter,
                            grnNominalSize: item.acNominalSize,
                            grnNominalSizeUnit: item.acNominalSizeUnit,
                            grnMinPS: item.acMinPS,
                            grnMaxPS: item.acMaxPS,
                            grnWearLimitPS: item.acWearLimitPS,
                            grnBeforegrnibration: "",
                            grnMinOB: item.acMinOB,
                            grnMaxOB: item.acMaxOB,
                            grnAverageOB: item.acAverageOB,
                            grnOBError: item.acOBError,
                            grnMinPSError: item.acMinPSError,
                            grnMaxPSError: item.acMaxPSError,
                            rowStatus: ""
                        }
                    )),
                    grnItemUncertainity: fetchedData[0].itemUncertainity,
                    grnItemCalDate: "",
                    grnItemDueDate: "",
                    grnItemCertificateStatus: "",
                    grnItemCertificateNo: "",
                    grnItemCertificate: "",
                    grnUncertainity: "",
                    grnItemCalStatus: ""
                })
            }

        } else {
            setSelectedGrnItem((prev) => ({ ...prev, [name]: value }))
        }



    }
    console.log(selectedGrnItem)
    console.log(grnData)




    const changeGrnData = (index, name, value) => {



        setSelectedGrnItem((prev) => {
            const updateAC = [...prev.grnAcCriteria]
            updateAC[index] = {
                ...updateAC[index], [name]: value,
            };
            return {
                ...prev, grnAcCriteria: updateAC,
            };
        })


        //setting rowStatus for referenceStandard
        if (selectedGrnItem.grnItemType === "referenceStandard") {
            if (name === "grnAverageOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.grnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""

                            const isAverageInRange = parseFloat(item.grnAverageOB) >= parseFloat(item.grnMinPS) &&
                                parseFloat(item.grnAverageOB) <= parseFloat(item.grnMaxPS);

                            if (item.grnAverageOB === "") {
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
                        grnAcCriteria: updatedData,
                    };
                })
            }

            if (name === "grnMinOB" || name === "grnMaxOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.grnAcCriteria.map((item, idx) => {
                        if (idx === index) {

                            const isMinInRange = parseFloat(item.grnMinOB) >= parseFloat(item.grnMinPS) &&
                                parseFloat(item.grnMinOB) <= parseFloat(item.grnMaxPS);
                            const isMaxInRange = parseFloat(item.grnMaxOB) >= parseFloat(item.grnMinPS) &&
                                parseFloat(item.grnMaxOB) <= parseFloat(item.grnMaxPS);


                            let status = ""

                            if (item.grnMaxOB === "" && item.grnMinOB === "") {
                                status = "";
                            } else if (item.grnMaxOB === "") {
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
                        grnAcCriteria: updatedData,
                    };
                });
            }

        }


        //rowStatus for varialble

        // attribute rowstatus  
        if (selectedGrnItem.grnItemType === "attribute") {
            if (name === "grnAverageOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.grnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""
                            if (item.grnWearLimitPS !== "") {

                                if (item.grnWearLimitPS <= item.grnMinPS) {
                                    const isAverageInRange = parseFloat(item.grnAverageOB) >= parseFloat(item.grnWearLimitPS) &&
                                        parseFloat(item.grnAverageOB) <= parseFloat(item.grnMaxPS);

                                    if (item.grnAverageOB === "") {
                                        status = ""
                                    } else {
                                        if (isAverageInRange) {
                                            status = "ok"
                                        } else {
                                            status = "notOk"
                                        }
                                    }
                                }

                                if (item.grnWearLimitPS >= item.grnMaxPS) {
                                    const isAverageInRange = parseFloat(item.grnAverageOB) <= parseFloat(item.grnWearLimitPS) &&
                                        parseFloat(item.grnAverageOB) >= parseFloat(item.grnMinPS);

                                    if (item.grnAverageOB === "") {
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
                                const isAverageInRange = parseFloat(item.grnAverageOB) >= parseFloat(item.grnMinPS) &&
                                    parseFloat(item.grnAverageOB) <= parseFloat(item.grnMaxPS);

                                if (item.grnAverageOB === "") {
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
                        grnAcCriteria: updatedData,
                    };
                });
            }

            if (name === "grnMinOB" || name === "grnMaxOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.grnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""
                            if (item.grnWearLimitPS !== "") {

                                if (item.grnWearLimitPS <= item.grnMinPS) {


                                    const isMinInRange = parseFloat(item.grnMinOB) >= parseFloat(item.grnWearLimitPS) &&
                                        parseFloat(item.grnMinOB) <= parseFloat(item.grnMaxPS);
                                    const isMaxInRange = parseFloat(item.grnMaxOB) >= parseFloat(item.grnWearLimitPS) &&
                                        parseFloat(item.grnMaxOB) <= parseFloat(item.grnMaxPS);



                                    if (isMinInRange && isMaxInRange) {
                                        status = "ok"
                                    } else {
                                        status = "notOk"
                                    }

                                }

                                if (item.grnWearLimitPS >= item.grnMaxPS) {
                                    const isMinInRange = parseFloat(item.grnMinOB) <= parseFloat(item.grnWearLimitPS) &&
                                        parseFloat(item.grnMinOB) >= parseFloat(item.grnMinPS);
                                    const isMaxInRange = parseFloat(item.grnMaxOB) <= parseFloat(item.grnWearLimitPS) &&
                                        parseFloat(item.grnMaxOB) >= parseFloat(item.grnMinPS);



                                    if (isMinInRange && isMaxInRange) {
                                        status = "ok"
                                    } else {
                                        status = "notOk"
                                    }

                                }
                                const isMinInRange = parseFloat(item.grnMinOB) >= parseFloat(item.grnMinPS) &&
                                    parseFloat(item.grnMinOB) <= parseFloat(item.grnMaxPS);
                                const isMaxInRange = parseFloat(item.grnMaxOB) >= parseFloat(item.grnMinPS) &&
                                    parseFloat(item.grnMaxOB) <= parseFloat(item.grnMaxPS);

                                return {
                                    ...item,
                                    rowStatus: status,
                                };

                            } else {
                                const isMinInRange = parseFloat(item.grnMinOB) >= parseFloat(item.grnMinPS) &&
                                    parseFloat(item.grnMinOB) <= parseFloat(item.grnMaxPS);
                                const isMaxInRange = parseFloat(item.grnMaxOB) >= parseFloat(item.grnMinPS) &&
                                    parseFloat(item.grnMaxOB) <= parseFloat(item.grnMaxPS);




                                if (item.grnMaxOB === "" && item.grnMinOB === "") {
                                    status = "";
                                } else if (item.grnMaxOB === "") {
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
                        grnAcCriteria: updatedData,
                    };
                });
            }
        }

        if (selectedGrnItem.grnItemType === "variable") {

            if (name === "grnAverageOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.grnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""

                            const isAverageInRange = parseFloat(item.grnAverageOB) >= parseFloat(item.grnMinPSError) &&
                                parseFloat(item.grnAverageOB) <= parseFloat(item.grnMaxPSError);

                            if (item.grnAverageOB === "") {
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
                        grnAcCriteria: updatedData,
                    };
                })
            }

        }

    };

    const deleteGrnPartyItems = (index) => {
        setGrnData((prev) => {
            const AC = [...prev.grnPartyItems]
            AC.splice(index, 1);
            return {
                ...prev, grnPartyItems: AC,
            };
        })
        nonSelectedItems();
    };



    useEffect(() => {
        if (selectedGrnItem.length !== 0) {
            const ifRejected = selectedGrnItem.grnAcCriteria.some((item) => item.rowStatus === "notOk")
            const isEmpty = selectedGrnItem.grnAcCriteria.some((item) => item.rowStatus === "")

            if (ifRejected) {
                setSelectedGrnItem((prev) => ({ ...prev, grnItemCalStatus: "rejected" }))
            } else if (isEmpty) {
                setSelectedGrnItem((prev) => ({ ...prev, grnItemCalStatus: "status" }))
            } else {
                setSelectedGrnItem((prev) => ({ ...prev, grnItemCalStatus: "accepted" }))
            }
        }


    }, [selectedGrnItem.grnAcCriteria])



    useEffect(() => {
        calculateResultDate(selectedGrnItem.grnItemCalDate, selectedGrnItem.grnItemCalFreInMonths);
    }, [selectedGrnItem.grnItemCalDate, selectedGrnItem.grnItemCalFreInMonths]);



    const calculateResultDate = (itemCalDate, itemCalFreInMonths) => {
        const parsedDate = dayjs(itemCalDate);
        if (parsedDate.isValid() && !isNaN(parseInt(itemCalFreInMonths))) {
            const calculatedDate = parsedDate.add(parseInt(itemCalFreInMonths, 10), 'month').subtract(1, 'day');
            console.log(calculatedDate)
            setSelectedGrnItem((prev) => ({
                ...prev,
                grnItemDueDate: calculatedDate.format('YYYY-MM-DD'),
            }));
        }
    };



    const grnItemAdd = () => {
        if (setSelectedGrnItem.length !== 0) {
            setGrnData((prev) => ({ ...prev, grnPartyItems: [...prev.grnPartyItems, selectedGrnItem] }))
            nonSelectedItems();
            setSelectedGrnItem([]);
        }

    }



    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [errorhandler, setErrorHandler] = useState({})

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const submitGrnForm = async () => {
        try {
            const response = await axios.post(

                `${process.env.REACT_APP_PORT}/itemGRN/createItemGRN`, grnData
            );
            setAlertMessage(response.data.message)
            setSnackBarOpen(true)
            setTimeout(() => setGrnOpen(false), 1000)
        } catch (err) {
            console.log(err);
        }
    };




    const nonSelectedItems = () => {

        const remainingMasters = selectedRows.filter(item =>
            !grnData.grnPartyItems.some(grn => grn.grnItemId === item._id)
        );
        setGrnImtes(remainingMasters)


    }


    useEffect(() => {
        nonSelectedItems()
    }, [grnData.grnPartyItems])

    const [certMessage, setCertMessage] = useState(null)

    const handleGrnCertificate = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log("working")
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                axios.post(`${process.env.REACT_APP_PORT}/upload/grnItemCertificateUp`, formData)
                    .then(response => {
                        setCertMessage("Certificate Uploaded Successfully")
                        console.log("Certificate Uploaded Successfully")
                        setSelectedGrnItem((prev) => ({ ...prev, grnItemCertificate: selectedFile.name }));
                    })
                    .catch(error => {
                        setCertMessage("Error Uploading Certificate")
                        console.log("Error")
                    });
            } catch (error) {
                console.error('Error uploading the file:', error);
            }

        }
    };






    return (

        <Dialog fullScreen keepMounted open={grnOpen} sx={{ color: "#f1f4f4" }}
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


                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
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
                                                    sx={{ width: "101%" }}
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
                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
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
                                <div className='row g-2'>
                                    <div className="col-md-6 d-flex justify-content-between">


                                        <TextField label="Imte No"
                                            id="grnItemId"
                                            select
                                            defaultValue="all"
                                            fullWidth
                                            size="small"
                                            className='me-2'
                                            // disabled={itemAddDetails.itemListNames === ""}
                                            onChange={handleGrnItemChange}
                                            value={selectedGrnItem.grnItemId}
                                            name="grnItemId" >
                                            {grnImtes.map((item, index) => (
                                                <MenuItem key={index} value={item._id}>{item.itemIMTENo}</MenuItem>
                                            ))}

                                        </TextField>

                                        <TextField size='small' fullWidth variant='outlined' defaultValue="" id="grnItemStatusId" value={selectedGrnItem.grnItemStatus} onChange={handleGrnItemChange} select label="Grn Item Status" name='grnItemStatus' >
                                            <MenuItem value="">Select</MenuItem>
                                            <MenuItem value="Calibrated">Calibrated</MenuItem>
                                            <MenuItem value="Serviced">Serviced</MenuItem>
                                            <MenuItem value="Not Servicable">Not Servicable</MenuItem>
                                            <MenuItem value="Not Calibrated">Not Calibrated</MenuItem>
                                            <MenuItem value="Other Reason">Other Reason</MenuItem>
                                        </TextField>

                                    </div>


                                    <div className="col-md-6 d-flex justify-content-end">


                                        <Button disabled={selectedGrnItem.grnItemStatus === "" || selectedGrnItem.grnItemStatus === undefined} startIcon={<Add />} color='warning' onClick={() => grnItemAdd()} sx={{ minWidth: "130px" }} variant='contained'>Add Item</Button>

                                    </div>

                                </div>
                                {selectedGrnItem.grnItemStatus === "Calibrated" ?
                                    <React.Fragment>
                                        <div className="row g-2 mt-1">
                                            <div className="col-md-2">

                                                <DatePicker
                                                    fullWidth
                                                    id="grnItemCalDateId"
                                                    name="grnItemCalDate"
                                                    label="Cal Date"

                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    format="DD-MM-YYYY"
                                                    value={dayjs(selectedGrnItem.grnItemCalDate)}
                                                    onChange={(newValue) => setSelectedGrnItem((prev) => ({ ...prev, grnItemCalDate: newValue.format('YYYY-MM-DD') }))}
                                                />

                                            </div>
                                            <div className="col-md-2">

                                                <DatePicker
                                                    fullWidth
                                                    id="grnItemDueDateId"
                                                    name="grnItemDueDate"
                                                    label="Next Cal Date"
                                                    // sx={{ width: "100%" }}
                                                    value={dayjs(selectedGrnItem.grnItemDueDate)}
                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    format="DD-MM-YYYY"
                                                    onChange={(newValue) => setSelectedGrnItem((prev) => ({ ...prev, grnItemDueDate: newValue.format('YYYY-MM-DD') }))}
                                                />


                                            </div>
                                            <div className='col-md-2'>
                                                <TextField size='small' fullWidth variant='outlined' id="grnItemCertificateStatusId" onChange={handleGrnItemChange} select label="Certificate Status" name='grnItemCertificateStatus'>
                                                    <MenuItem value="received">Received</MenuItem>
                                                    <MenuItem value="notReceived">Not Received</MenuItem>

                                                </TextField>
                                            </div>

                                            {selectedGrnItem.grnItemCertificateStatus === "received" ? <React.Fragment>
                                                <div className="col-md-2">

                                                    <TextField label="Certificate No"

                                                        id="grnItemCertificateNoId"
                                                        defaultValue=""
                                                        size="small"
                                                        fullWidth
                                                        onChange={handleGrnItemChange}
                                                        name="grnItemCertificateNo" />

                                                </div>
                                                <div className='col-md-2'>
                                                    <TextField fullWidth label="Uncertainity" id='grnUncertainityId' variant='outlined' size='small' onChange={handleGrnItemChange} name='grnUncertainity' />

                                                </div>

                                                <div className='col-md-2 d-flex justify-content-center ' >


                                                    {(selectedGrnItem.grnItemCertificate !== "" && selectedGrnItem.grnItemCertificate !== undefined) ?
                                                        <Chip
                                                            className='mt-2'
                                                            icon={<Done />}
                                                            size='large'
                                                            color="success"
                                                            label={selectedGrnItem.grnItemCertificate}
                                                            onClick={() => {
                                                                const fileUrl = `${process.env.REACT_APP_PORT}/grnCertificates/${selectedGrnItem.grnItemCertificate}`;
                                                                window.open(fileUrl, '_blank'); // Opens the file in a new tab/window
                                                            }}
                                                            onDelete={() => setSelectedGrnItem((prev) => ({ ...prev, grnItemCertificate: "" }))}
                                                            deleteIcon={<Delete color='error'/>}
                                                        ></Chip> : <Button helperText="Hello" component="label" fullWidth variant="contained" startIcon={<CloudUpload />} >
                                                            Upload Certificate
                                                            <VisuallyHiddenInput type="file" onChange={handleGrnCertificate} />
                                                        </Button>}

                                                </div>
                                            </React.Fragment> : ""}


                                        </div>




                                        <div className='row mt-3'>
                                            <div className="col-md">
                                                <h5>Calibration Data</h5>
                                                <table className='table table-sm table-bordered table-responsive text-center align-middle'>

                                                    {selectedGrnItem.grnItemType === "attribute" &&

                                                        <tbody >
                                                            <tr>

                                                                <th width="20%" rowSpan={2}>Parameter</th>
                                                                <th width="10%" rowSpan={2}>Range/Size</th>
                                                                <th width="10%" rowSpan={2}>Unit</th>
                                                                <th colSpan={3} width="30%">Permissible Size</th>


                                                                <th width="20%" colSpan={selectedGrnItem.grnItemOBType === "average" ? 1 : 2}>Observed Size</th>
                                                                <th width="10%" rowSpan={2}>Status</th>
                                                            </tr>
                                                            <tr>
                                                                <th width="6%">Min</th>
                                                                <th width="6%">Max</th>
                                                                <th width="10%">Wear Limit</th>
                                                                {selectedGrnItem.grnItemOBType === "average" ?
                                                                    <React.Fragment>
                                                                        <th>Average</th>
                                                                    </React.Fragment> :
                                                                    <React.Fragment>
                                                                        <th>Min</th>
                                                                        <th>Max</th>
                                                                    </React.Fragment>}

                                                            </tr>
                                                            {/* {selectedGrnItem.grnAcCriteria.map((item)=> ()} */}
                                                            {selectedGrnItem.grnAcCriteria.map((item, index) => {
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
                                                                if (item.grnWearLimitPS !== "") {

                                                                    if (item.grnWearLimitPS < item.grnMinPS) {
                                                                        size = "OD"
                                                                    } else {
                                                                        size = "ID"
                                                                    }

                                                                    if (size === "OD") {
                                                                        //min OD condition
                                                                        if (item.grnMinOB >= item.grnWearLimitPS && item.grnMinOB < item.grnMinPS) {
                                                                            minColor = "orange"
                                                                        }
                                                                        else if (item.grnMinOB >= item.grnMinPS && item.grnMinOB <= item.grnMaxPS) {
                                                                            minColor = "green"
                                                                        } else {
                                                                            minColor = "red"
                                                                        }

                                                                        if (item.grnMaxOB >= item.grnWearLimitPS && item.grnMaxOB < item.grnMinPS) {
                                                                            maxColor = "orange"
                                                                        }
                                                                        else if (item.grnMaxOB >= item.grnMinPS && item.grnMaxOB <= item.grnMaxPS) {
                                                                            maxColor = "green"
                                                                        } else {
                                                                            maxColor = "red"
                                                                        }

                                                                        if (item.grnAverageOB >= item.grnWearLimitPS && item.grnAverageOB < item.grnMinPS) {
                                                                            averageColor = "orange"
                                                                        }
                                                                        else if (item.grnAverageOB >= item.grnMinPS && item.grnAverageOB <= item.grnMaxPS) {
                                                                            averageColor = "green"
                                                                        } else {
                                                                            averageColor = "red"
                                                                        }


                                                                    }

                                                                    if (size === "ID") {
                                                                        //min Id condition
                                                                        if (item.grnMinOB <= item.grnWearLimitPS && item.grnMinOB > item.grnMaxPS) {
                                                                            minColor = "orange"
                                                                        }
                                                                        else if (item.grnMinOB >= item.grnMinPS && item.grnMinOB <= item.grnMaxPS) {
                                                                            minColor = "green"
                                                                        } else {
                                                                            minColor = "red"
                                                                        }
                                                                        //max ID condition
                                                                        if (item.grnMaxOB <= item.grnWearLimitPS && item.grnMaxOB > item.grnMaxPS) {
                                                                            maxColor = "orange"
                                                                        }
                                                                        else if (item.grnMaxOB >= item.grnMinPS && item.grnMaxOB <= item.grnMaxPS) {
                                                                            maxColor = "green"
                                                                        } else {
                                                                            maxColor = "red"
                                                                        }

                                                                        if (item.grnAverageOB <= item.grnWearLimitPS && item.grnAverageOB > item.grnMaxPS) {
                                                                            averageColor = "orange"
                                                                        }
                                                                        else if (item.grnAverageOB >= item.grnMinPS && item.grnAverageOB <= item.grnMaxPS) {
                                                                            averageColor = "green"
                                                                        } else {
                                                                            averageColor = "red"
                                                                        }
                                                                    }

                                                                    //   handleStatus(index, minColor, maxColor);



                                                                } else {


                                                                    if (parseFloat(item.grnMinOB) >= parseFloat(item.grnMinPS) && parseFloat(item.grnMinOB) <= parseFloat(item.grnMaxPS)) {
                                                                        minColor = "#4cbb17";

                                                                    } else {
                                                                        minColor = "red"

                                                                    }


                                                                    if (parseFloat(item.grnMaxOB) >= parseFloat(item.grnMinPS) && parseFloat(item.grnMaxOB) <= parseFloat(item.grnMaxPS)) {
                                                                        maxColor = "#4cbb17"

                                                                    } else {
                                                                        maxColor = "red"

                                                                    }

                                                                    if (parseFloat(item.grnAverageOB) >= parseFloat(item.grnMinPS) && parseFloat(item.grnAverageOB) <= parseFloat(item.grnMaxPS)) {
                                                                        averageColor = "#4cbb17";

                                                                    } else {
                                                                        averageColor = "red"

                                                                    }
                                                                }

                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{item.grnParameter}</td>
                                                                        <td>{item.grnNominalSize}</td>
                                                                        <td>{item.grnNominalSizeUnit}</td>
                                                                        <td>{item.grnMinPS}</td>
                                                                        <td>{item.grnMaxPS}</td>
                                                                        <td>{item.grnWearLimitPS}</td>

                                                                        {selectedGrnItem.grnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} name='grnBeforegrnibration' /></td>}
                                                                        {selectedGrnItem.grnItemOBType === "average" &&
                                                                            <td><input className='form-control form-control-sm' name='grnAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
                                                                        }
                                                                        {selectedGrnItem.grnItemOBType === "minmax" &&
                                                                            <React.Fragment>
                                                                                <td>
                                                                                    <input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} name="grnMinOB" onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} />
                                                                                </td>
                                                                                <td>
                                                                                    <input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} name="grnMaxOB" onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
                                                                            </React.Fragment>}


                                                                        <td width="15%">
                                                                            <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)}>
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


                                                    {selectedGrnItem.grnItemType === "variable" &&

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
                                                            {selectedGrnItem.grnAcCriteria.map((item, index) => {

                                                                let averageColor = "";
                                                                if (parseFloat(item.grnAverageOB) >= parseFloat(item.grnMinPSError) && parseFloat(item.grnAverageOB) <= parseFloat(item.grnMaxPSError)) {
                                                                    averageColor = "#4cbb17";
                                                                } else {
                                                                    averageColor = "red"
                                                                }

                                                                return (
                                                                    <tr key={index}>

                                                                        <td>{item.grnParameter}</td>
                                                                        <td>{item.grnNominalSize}</td>
                                                                        <td>{item.grnNominalSizeUnit}</td>
                                                                        <td>{item.grnMinPSError}</td>
                                                                        <td>{item.grnMaxPSError}</td>
                                                                        <td><input className='form-control form-control-sm' name='grnAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
                                                                        <td width="15%">
                                                                            <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)}>
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

                                                    {selectedGrnItem.grnItemType === "referenceStandard" &&
                                                        <tbody>
                                                            <tr>

                                                                <th width="20%" rowSpan={2}>Parameter</th>
                                                                <th width="10%" rowSpan={2}>Range/Size</th>
                                                                <th width="10%" rowSpan={2}>Unit</th>
                                                                <th colSpan={2}>Permissible Size</th>
                                                                {selectedGrnItem.grnBeforeData === "yes" && <th width="10%" rowSpan={2}>Before Calibration</th>}
                                                                <th width="20%" colSpan={selectedGrnItem.grnItemOBType === "average" ? 1 : 2}>Observed Size</th>
                                                                <th width="10%" rowSpan={2}>Status</th>
                                                            </tr>
                                                            <tr>
                                                                <th width="6%">Min</th>
                                                                <th width="6%">Max</th>

                                                                {selectedGrnItem.grnItemOBType === "average" ?
                                                                    <React.Fragment>
                                                                        <th>Average</th>
                                                                    </React.Fragment> :
                                                                    <React.Fragment>
                                                                        <th>Min</th>
                                                                        <th>Max</th>
                                                                    </React.Fragment>}

                                                            </tr>
                                                            {/* {selectedGrnItem.grnselectedGrnItem.map((item)=> ()} */}
                                                            {selectedGrnItem.grnAcCriteria.map((item, index) => {
                                                                let averageColor = "";

                                                                if (parseFloat(item.grnAverageOB) >= parseFloat(item.grnMinPS) && parseFloat(item.grnAverageOB) <= parseFloat(item.grnMaxPS)) {
                                                                    averageColor = "#4cbb17";

                                                                } else {
                                                                    averageColor = "red"

                                                                }

                                                                let minColor = "";

                                                                if (parseFloat(item.grnMinOB) >= parseFloat(item.grnMinPS) && parseFloat(item.grnMinOB) <= parseFloat(item.grnMaxPS)) {
                                                                    minColor = "#4cbb17";

                                                                } else {
                                                                    minColor = "red"

                                                                }

                                                                let maxColor = "";
                                                                if (parseFloat(item.grnMaxOB) >= parseFloat(item.grnMinPS) && parseFloat(item.grnMaxOB) <= parseFloat(item.grnMaxPS)) {
                                                                    maxColor = "#4cbb17"

                                                                } else {
                                                                    maxColor = "red"

                                                                }


                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{item.grnParameter}</td>
                                                                        <td>{item.grnNominalSize}</td>
                                                                        <td>{item.grnNominalSizeUnit}</td>
                                                                        <td>{item.grnMinPS}</td>
                                                                        <td>{item.grnMaxPS}</td>

                                                                        {selectedGrnItem.grnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} name='grnBeforeCalibration' /></td>}
                                                                        {selectedGrnItem.grnItemOBType === "average" &&
                                                                            <td><input className='form-control form-control-sm' name='grnAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
                                                                        }
                                                                        {selectedGrnItem.grnItemOBType === "minmax" &&
                                                                            <React.Fragment>
                                                                                <td><input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} name="grnMinOB" onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} />
                                                                                </td> <td><input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} name="grnMaxOB" onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
                                                                            </React.Fragment>}


                                                                        <td width="15%">
                                                                            <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)}>
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

                                        </div>




                                        <div className='row'>
                                            <div className=' col d-flex justify-content-between '>


                                                <div className='col-4 me-2'>
                                                    <TextField size='small' inputProps={{ sx: { color: selectedGrnItem.grnItemCalStatus === "status" ? "" : selectedGrnItem.grnItemCalStatus === "accepted" ? "green" : "red" } }} fullWidth variant='outlined' id="grnItemCalStatusId" select label="Calibration Status" name='grnItemCalStatus' value={selectedGrnItem.grnItemCalStatus}>
                                                        <MenuItem value="status">Status</MenuItem>
                                                        <MenuItem value="accepted">Accepted</MenuItem>
                                                        <MenuItem value="rejected">Rejected</MenuItem>


                                                    </TextField>
                                                </div>






                                            </div>


                                        </div>
                                    </React.Fragment> : ""}
                            </Paper>

                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 1,

                            }}
                                elevation={12}>
                                <h5>GRN Items</h5>
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
                                            <th>Remarks</th>
                                            <th>Remove</th>
                                        </tr>

                                        {grnData.grnPartyItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.grnItemIMTENo}</td>
                                                <td>{item.grnItemAddMasterName}</td>
                                                <td>{item.grnItemRangeSize}</td>
                                                <td>{item.grnItemCertificateNo}</td>
                                                <td>{item.grnItemCalDate}</td>
                                                <td>{item.grnItemDueDate}</td>
                                                <td>{item.grnItemCalibratedAt}</td>
                                                <td>{item.grnItemStatus}</td>
                                                <td width="5%"><Delete onClick={() => deleteGrnPartyItems(index)} color='error' /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Paper>





                        </form>
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
                                <Button onClick={(e) => { submitGrnForm(e); setConfirmSubmit(false) }} autoFocus>
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
                    </LocalizationProvider>

                </div>
            </DialogContent>
            <DialogActions className='d-flex justify-content-between'>
                <div>
                    <Button variant='contained' color='warning' className='me-3'>Print</Button>
                </div>
                <div>
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setGrnOpen(false); setSelectedGrnItem([]); setGrnData(initialGrnData) }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { setConfirmSubmit(true) }}>Submit</Button>
                </div>
            </DialogActions>

        </Dialog>
    )
}

export default Grn