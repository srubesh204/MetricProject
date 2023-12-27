import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, Chip } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { OnSiteListContent } from './OnSiteList';
import styled from '@emotion/styled';
import { Add, Close, Delete, CloudUpload, Edit, Done } from '@mui/icons-material';
import { useParams } from 'react-router-dom';


const GrnEdit = () => {
    const grnDatas = useContext(OnSiteListContent)
    const { onSiteEditOpen, setOnSiteEditOpen, selectedRows, grnListFetchData } = grnDatas

    const { id } = useParams()
    console.log(id)

    console.log(selectedRows)
    const initialOnSiteEditData = {
        osGrnPartyRefNo: "",
        osGrnPartyId: "",
        osGrnPartyRefDate: dayjs().format("YYYY-MM-DD"),
        osGrnPartyName: "",
        osGrnPartyCode: "",
        osGrnPartyAddress: "",
        osGrnNo: "",
        osGrnDate: dayjs().format("YYYY-MM-DD"),
        osGrnCommonRemarks: "",
        osGrnDueDate: "",
        osGrnCalDate: "",
        osGrnCertificateStatus: "",
        osGrnCertificateNo: "",
        osGrnUncertainity: "",
        osGrnPartyItems: []

    }


    const [onSiteEditData, setOnSiteEditData] = useState({
        osGrnPartyRefNo: "",
        osGrnPartyId: "",
        osGrnPartyRefDate: dayjs().format("YYYY-MM-DD"),
        osGrnPartyName: "",
        osGrnPartyCode: "",
        osGrnPartyAddress: "",
        osGrnNo: "",
        osGrnDate: dayjs().format("YYYY-MM-DD"),
        osGrnCommonRemarks: "",
        osGrnDueDate: "",
        osGrnCalDate: "",
        osGrnCertificateStatus: "",
        osGrnCertificateNo: "",
        osGrnUncertainity: "",
        osGrnPartyItems: []
    })

    const [itemAddOSiteDetails, setItemAddOnsiteDetails] = useState({
        onSiteList: "",
        grnImteNo: ""
    })
    const settingGrnData = () => {
        if (selectedRows.length !== 0) { // Check if selectedRows is defined
            setOnSiteEditData((prev) => ({
                ...prev,
                osGrnPartyId: selectedRows.osGrnPartyId,
                osGrnPartyRefNo: selectedRows.osGrnPartyRefNo,
                osGrnPartyRefDate: selectedRows.osGrnPartyRefDate,
                osGrnPartyName: selectedRows.osGrnPartyName,
                osGrnPartyCode: selectedRows.osGrnPartyCode,
                osGrnPartyAddress: selectedRows.osGrnPartyAddress,
                osGrnNo: selectedRows.osGrnNo,
                osGrnDate: selectedRows.osGrnDate,
                osGrnCommonRemarks: selectedRows.osGrnCommonRemarks,
                osGrnCalDate: selectedRows.osGrnCalDate,
                osGrnDueDate: selectedRows.osGrnDueDate,
                osGrnCertificateStatus: selectedRows.osGrnCertificateStatus,
                osGrnCertificateNo: selectedRows.osGrnCertificateNo,
                osGrnUncertainity: selectedRows.osGrnUncertainity,
                osGrnPartyItems: selectedRows.osGrnPartyItems,
            }));
        }
    };

    useEffect(() => {
        settingGrnData();
    }, [selectedRows]);




    const [allItemImtes, setAllItemImtes] = useState([])
    const [selectedGrnItem, setSelectedGrnItem] = useState({
        osGrnItemId: "",
        osGrnItemMasterRef: "",
        osGrnItemAddMasterName: "",
        osGrnItemIMTENo: "",
        osGrnItemType: "",
        osGrnItemRangeSize: "",
        osGrnItemRangeSizeUnit: "",
        osGrnItemMFRNo: "",
        osGrnItemLC: "",
        osGrnItemLCUnit: "",
        osGrnItemMake: "",
        osGrnItemModelNo: "",
        osGrnItemStatus: "",
        osGrnItemReceiptDate: "",
        osGrnItemDepartment: "",
        osGrnItemArea: "",
        osGrnItemPlaceOfUsage: "",
        osGrnItemCalFreInMonths: "",
        osGrnItemCalAlertDays: "",
        osGrnItemCalibrationSource: "",
        osGrnItemCalibrationDoneAt: "",
        osGrnItemCalibratedAt: "",
        osGrnItemOBType: "",
        osGrnAcCriteria: [
            {
                osGrnAcParameter: "",
                osGrnAcNominalSize: "",
                osGrnAcNominalSizeUnit: "",
                osGrnAcMinPS: "",
                osGrnAcMaxPS: "",
                osGrnAcWearLimitPS: "",
                osGrnAcMinOB: "",
                osGrnAcMaxOB: "",
                osGrnAcAverageOB: "",
                osGrnAcOBError: "",
                osGrnAcMinPSError: "",
                osGrnAcMaxPSError: "",
                rowStatus: ""
            },
        ],
        osGrnItemUncertainity: "",
        osGrnItemCalDate: dayjs().format("YYYY-MM-DD"),
        osGrnItemDueDate: "",
        osGrnItemCertificateStatus: "",
        osGrnItemCertificateNo: "",
        osGrnItemCertificate: "",
        osGrnUncertainity: "",
        osGrnItemCalStatus: "",

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












    const setPartyData = async (id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getVendorById/${id}`
            );
            console.log(response)
            setOnSiteEditData((prev) => ({
                ...prev,
                osGrnPartyName: response.data.result.fullName,
                osGrnPartyAddress: response.data.result.address,
                osGrnPartyCode: response.data.result.vendorCode

            }))

        } catch (err) {
            console.log(err);
        }
    };


    const [itemMasterDistNames, setItemMasterDistNames] = useState([])
    const getDistinctItemName = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllDistinctItemName`
            );
            console.log(response.data)
            setItemMasterDistNames(response.data.result);
            nonSelectedItems()

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



    const getItemByName = async (value) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByName`, { itemItemMasterName: value }
            );

            console.log(response.data)
            const dcFilter = response.data.result.filter((item) => item.dcStatus === "1")
            const remainingIMTE = dcFilter.filter(item =>
                !onSiteEditData.osGrnPartyItems.some(grn => grn.grnItemId === item._id)
            );
            setAllItemImtes(remainingIMTE)

            console.log()

        } catch (err) {
            console.log(err);
        }
    };


    const OnSiteGrnAdd = () => {
        if (setSelectedGrnItem.length !== 0) {
            setOnSiteEditData((prev) => ({ ...prev, osGrnPartyItems: [...prev.osGrnPartyItems, selectedGrnItem] }))
        }
        setItemAddOnsiteDetails([])
        nonSelectedItems();

    }
    useEffect(() => {

        setSelectedGrnItem([])
        nonSelectedItems();
        setItemAddOnsiteDetails({
            onSiteList: "",
            grnImteNo: ""
        })
    }, [onSiteEditData.osGrnPartyItems])


    const [editableSelectedGrn, setEditableSelectedGrn] = useState()
    const [tempItem, setTempItem] = useState([])
    console.log(tempItem)
    console.log(selectedGrnItem)
    const handleOnSiteGrnItemAdd = (e) => {
        const { name, value } = e.target;
        setItemAddOnsiteDetails((prev) => ({ ...prev, [name]: value }))
        if (name === "onSiteList") {
            getItemByName(value)

        }

        if (name === "osGrnItemStatus") {

            const fetchedData = allItemImtes.filter((item) => item._id === selectedGrnItem.osGrnItemId)
            console.log(fetchedData)
            if (value === "Calibrated") {
                setSelectedGrnItem(
                    {
                        [name]: value,
                        osGrnItemId: fetchedData[0]._id,
                        osGrnItemIMTENo: fetchedData[0].itemIMTENo,
                        osGrnItemAddMasterName: fetchedData[0].itemAddMasterName,
                        osGrnItemType: fetchedData[0].itemType,
                        osGrnItemRangeSize: fetchedData[0].itemRangeSize,
                        osGrnItemItemMFRNo: fetchedData[0].itemMFRNo,
                        osGrnItemLC: fetchedData[0].itemLC,
                        osGrnItemMake: fetchedData[0].itemMake,
                        osGrnItemCalFreInMonths: fetchedData[0].itemCalFreInMonths,
                        osGrnItemUncertainity: fetchedData[0].uncertainty,
                        osGrnItemCalibratedAt: fetchedData[0].itemCalibratedAt,
                        osGrnItemSOPNo: fetchedData[0].SOPNo,
                        osGrnStandardRef: fetchedData[0].standardRef,
                        osGrnItemOBType: fetchedData[0].itemOBType,


                        osGrnAcCriteria:

                            fetchedData[0].acceptanceCriteria.map((item) => (
                                {
                                    osGrnAcParameter: item.acParameter,
                                    osGrnAcNominalSize: item.acNominalSize,
                                    osGrnAcNominalSizeUnit: item.acNominalSizeUnit,
                                    osGrnAcMinPS: item.acMinPS,
                                    osGrnAcMaxPS: item.acMaxPS,
                                    osGrnAcWearLimitPS: item.acWearLimitPS,

                                    osGrnAcMinOB: item.acMinOB,
                                    osGrnAcMaxOB: item.acMaxOB,
                                    osGrnAcAverageOB: item.acAverageOB,
                                    osGrnAcOBError: item.acOBError,
                                    osGrnAcMinPSError: item.acMinPSError,
                                    osGrnAcMaxPSError: item.acMaxPSError,
                                    rowStatus: ""

                                }
                            )),
                        osGrnItemCalDate: dayjs().format("YYYY-MM-DD"),
                        osGrnItemDueDate: "",
                        osGrnItemCertificateStatus: "",
                        osGrnItemCertificateNo: "",
                        osGrnItemCertificate: "",
                        osGrnUncertainity: "",
                        osGrnItemCalStatus: ""


                    }

                )
            } else {
                setSelectedGrnItem({
                    [name]: value,
                    osGrnItemId: fetchedData[0]._id,
                    osGrnItemIMTENo: fetchedData[0].itemIMTENo,
                    osGrnItemAddMasterName: fetchedData[0].itemAddMasterName,
                    osGrnItemType: fetchedData[0].itemType,
                    osGrnItemRangeSize: fetchedData[0].itemRangeSize,
                    osGrnItemItemMFRNo: fetchedData[0].itemMFRNo,
                    osGrnItemLC: fetchedData[0].itemLC,
                    osGrnItemMake: fetchedData[0].itemMake,
                    osGrnItemCalFreInMonths: fetchedData[0].itemCalFreInMonths,
                    osGrnItemUncertainity: fetchedData[0].uncertainty,
                    osGrnItemCalibratedAt: fetchedData[0].itemCalibratedAt,
                    osGrnItemSOPNo: fetchedData[0].SOPNo,
                    osGrnStandardRef: fetchedData[0].standardRef,
                    osGrnItemOBType: fetchedData[0].itemOBType,
                    osGrnAcCriteria:
                        fetchedData[0].acceptanceCriteria.map((item) => (
                            {
                                osGrnAcParameter: item.acParameter,
                                osGrnAcNominalSize: item.acNominalSize,
                                osGrnAcNominalSizeUnit: item.acNominalSizeUnit,
                                osGrnAcMinPS: item.acMinPS,
                                osGrnAcMaxPS: item.acMaxPS,
                                osGrnAcWearLimitPS: item.acWearLimitPS,

                                osGrnAcMinOB: item.acMinOB,
                                osGrnAcMaxOB: item.acMaxOB,
                                osGrnAcAverageOB: item.acAverageOB,
                                osGrnAcOBError: item.acOBError,
                                osGrnAcMinPSError: item.acMinPSError,
                                osGrnAcMaxPSError: item.acMaxPSError,
                                rowStatus: ""

                            }
                        )),
                    osGrnItemCalDate: dayjs().format("YYYY-MM-DD"),
                    osGrnItemDueDate: "",
                    osGrnItemCertificateStatus: "",
                    osGrnItemCertificateNo: "",
                    osGrnItemCertificate: "",
                    osGrnUncertainity: "",
                    osGrnItemCalStatus: ""


                })


            }



        } else {
            setSelectedGrnItem((prev) => ({ ...prev, [name]: value }))
        }


    }
    console.log(selectedGrnItem)

    useEffect(() => {
        if (selectedGrnItem && selectedGrnItem.osGrnAcCriteria && selectedGrnItem.osGrnAcCriteria.length !== 0) {
            const ifRejected = selectedGrnItem.osGrnAcCriteria.some((item) => item.rowStatus === "notOk")
            const isEmpty = selectedGrnItem.osGrnAcCriteria.some((item) => item.rowStatus === "")

            if (ifRejected) {
                setSelectedGrnItem((prev) => ({ ...prev, osGrnItemCalStatus: "rejected" }))
            } else if (isEmpty) {
                setSelectedGrnItem((prev) => ({ ...prev, osGrnItemCalStatus: "status" }))
            } else {
                setSelectedGrnItem((prev) => ({ ...prev, osGrnItemCalStatus: "accepted" }))
            }
        }
    }, [selectedGrnItem.osGrnAcCriteria])

    const calculateResultDate = (itemCalDate, itemCalFreInMonths) => {
        const parsedDate = dayjs(itemCalDate);
        if (parsedDate.isValid() && !isNaN(parseInt(itemCalFreInMonths))) {
            const calculatedDate = parsedDate.add(parseInt(itemCalFreInMonths, 10), 'month').subtract(1, 'day');
            console.log(calculatedDate)
            setSelectedGrnItem((prev) => ({
                ...prev,
                osGrnItemDueDate: calculatedDate.format('YYYY-MM-DD'),
            }));
        }
    };
    useEffect(() => {
        calculateResultDate(selectedGrnItem.osGrnItemCalDate, selectedGrnItem.osGrnItemCalFreInMonths);
    }, [selectedGrnItem.osGrnItemCalDate, selectedGrnItem.osGrnItemCalFreInMonths]);





    const onsiteEditItem = () => {
        if (setSelectedGrnItem.length !== 0) {
            const updatedItems = [...onSiteEditData.osGrnPartyItems];
            updatedItems[editIndex] = selectedGrnItem;
            setOnSiteEditData({ ...onSiteEditData, osGrnPartyItems: updatedItems });
            setSelectedGrnItem([]); // Clear the edited item after update
            setEditIndex(null)
            setEditGrnId(null)
        }
    }
    const onsiteEditCancel = () => {
        setSelectedGrnItem([]); // Clear the edited item after update
        setEditIndex(null)
        setEditGrnId(null)
    }









    const [onSiteList, setOnSiteList] = useState({})
    const grnFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/onsiteItemGRN/getAllOnsiteItemGRN`
            );
            setOnSiteList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        grnFetchData();
    }, []);



    const handleOnSiteChange = (e) => {
        const { name, value, checked } = e.target;
        setOnSiteEditData((prev) => ({ ...prev, [name]: value }));


    }


    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [errorhandler, setErrorHandler] = useState({})

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    {/*} const submitOnSiteForm = async () => {
        try {
            const response = await axios.post(

                `${process.env.REACT_APP_PORT}/onsiteItemGRN/createOnsiteItemGRN`, onSiteEditData
            );
            console.log(response.data)
            setAlertMessage(response.data.message)
            setSnackBarOpen(true)
            setTimeout(() => setOnSiteEditOpen(false), 3000)
            grnListFetchData()
            setOnSiteEditData(initialOnSiteEditData)
        } catch (err) {
            console.log(err);
        }
    };*/}


    const updateEditData = async () => {
        try {
            const response = await axios.put(

                `${process.env.REACT_APP_PORT}/onsiteItemGRN/updateOnsiteItemGRN/${selectedRows._id}`, onSiteEditData
            );
            console.log(response.data)
            setAlertMessage(response.data.message)
            setSnackBarOpen(true)
            grnListFetchData()
            setOnSiteEditData(initialOnSiteEditData)

            setTimeout(() => setOnSiteEditOpen(false), 3000)
        } catch (err) {
            console.log(err);
        }
    };






    const nonSelectedItems = () => {
        const remainingMasters = allItemImtes.filter(item =>
            !onSiteEditData.osGrnPartyItems.some(grn => grn.grnItemId === item._id)
        );
        setAllItemImtes(remainingMasters)
    }
    useEffect(() => {
        nonSelectedItems()
    }, [onSiteEditData.osGrnPartyItems])

    const deleteOnSite = (index) => {
        setOnSiteEditData((prev) => {
            const AC = [...prev.osGrnPartyItems]
            AC.splice(index, 1);
            return {
                ...prev, osGrnPartyItems: AC,

            };
        })
        nonSelectedItems();
    };





    const changeOnSiteValue = (index, name, value) => {
        setSelectedGrnItem((prev) => {
            const updateAC = [...prev.osGrnAcCriteria]
            updateAC[index] = {
                ...updateAC[index], [name]: value,
            };
            return {
                ...prev, osGrnAcCriteria: updateAC,
            };
        })


        if (selectedGrnItem.osGrnItemType === "attribute") {
            if (name === "osGrnAcAverageOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.osGrnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""
                            if (item.osGrnAcWearLimitPS !== "") {

                                if (item.osGrnAcWearLimitPS <= item.osGrnAcMinPS) {
                                    const isAverageInRange = parseFloat(item.osGrnAcAverageOB) >= parseFloat(item.osGrnAcWearLimitPS) &&
                                        parseFloat(item.osGrnAcAverageOB) <= parseFloat(item.osGrnAcMaxPS);

                                    if (item.osGrnAcAverageOB === "") {
                                        status = ""
                                    } else {
                                        if (isAverageInRange) {
                                            status = "ok"
                                        } else {
                                            status = "notOk"
                                        }
                                    }
                                }

                                if (item.osGrnAcWearLimitPS >= item.osGrnAcMaxPS) {
                                    const isAverageInRange = parseFloat(item.osGrnAcAverageOB) <= parseFloat(item.osGrnAcWearLimitPS) &&
                                        parseFloat(item.osGrnAcAverageOB) >= parseFloat(item.osGrnAcMinPS);

                                    if (item.osGrnAcAverageOB === "") {
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
                                const isAverageInRange = parseFloat(item.osGrnAcAverageOB) >= parseFloat(item.osGrnAcMinPS) &&
                                    parseFloat(item.osGrnAcAverageOB) <= parseFloat(item.osGrnAcMaxPS);

                                if (item.osGrnAcAverageOB === "") {
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
                        osGrnAcCriteria: updatedData,
                    };
                });
            }

            if (name === "osGrnAcMinOB" || name === "osGrnAcMaxOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.osGrnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""
                            if (item.osGrnAcWearLimitPS !== "") {

                                if (item.osGrnAcWearLimitPS <= item.osGrnAcMinPS) {


                                    const isMinInRange = parseFloat(item.osGrnAcMinOB) >= parseFloat(item.osGrnAcWearLimitPS) &&
                                        parseFloat(item.osGrnAcMinOB) <= parseFloat(item.osGrnAcMaxPS);
                                    const isMaxInRange = parseFloat(item.osGrnAcMaxOB) >= parseFloat(item.osGrnAcWearLimitPS) &&
                                        parseFloat(item.osGrnAcMaxOB) <= parseFloat(item.osGrnAcMaxPS);



                                    if (isMinInRange && isMaxInRange) {
                                        status = "ok"
                                    } else {
                                        status = "notOk"
                                    }

                                }

                                if (item.osGrnAcWearLimitPS >= item.osGrnAcMaxPS) {
                                    const isMinInRange = parseFloat(item.osGrnAcMinOB) <= parseFloat(item.osGrnAcWearLimitPS) &&
                                        parseFloat(item.osGrnAcMinOB) >= parseFloat(item.osGrnAcMinPS);
                                    const isMaxInRange = parseFloat(item.osGrnAcMaxOB) <= parseFloat(item.osGrnAcWearLimitPS) &&
                                        parseFloat(item.osGrnAcMaxOB) >= parseFloat(item.osGrnAcMinPS);



                                    if (isMinInRange && isMaxInRange) {
                                        status = "ok"
                                    } else {
                                        status = "notOk"
                                    }

                                }
                                const isMinInRange = parseFloat(item.osGrnAcMinOB) >= parseFloat(item.osGrnAcMinPS) &&
                                    parseFloat(item.osGrnAcMinOB) <= parseFloat(item.osGrnAcMaxPS);
                                const isMaxInRange = parseFloat(item.osGrnAcMaxOB) >= parseFloat(item.osGrnAcMinPS) &&
                                    parseFloat(item.osGrnAcMaxOB) <= parseFloat(item.osGrnAcMaxPS);

                                return {
                                    ...item,
                                    rowStatus: status,
                                };

                            } else {
                                const isMinInRange = parseFloat(item.osGrnAcMinOB) >= parseFloat(item.osGrnAcMinPS) &&
                                    parseFloat(item.osGrnAcMinOB) <= parseFloat(item.osGrnAcMaxPS);
                                const isMaxInRange = parseFloat(item.osGrnAcMaxOB) >= parseFloat(item.osGrnAcMinPS) &&
                                    parseFloat(item.osGrnAcMaxOB) <= parseFloat(item.osGrnAcMaxPS);




                                if (item.osGrnAcMaxOB === "" && item.osGrnAcMinOB === "") {
                                    status = "";
                                } else if (item.osGrnAcMaxOB === "") {
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
                        osGrnAcCriteria: updatedData,
                    };
                });
            }
        }




        if (selectedGrnItem.osGrnItemType === "variable") {

            if (name === "osGrnAcAverageOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.osGrnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""

                            const isAverageInRange = parseFloat(item.osGrnAcAverageOB) >= parseFloat(item.osGrnAcMinPSError) &&
                                parseFloat(item.osGrnAcAverageOB) <= parseFloat(item.osGrnAcMaxPSError);

                            if (item.osGrnAcAverageOB === "") {
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
                        osGrnAcCriteria: updatedData,
                    };
                })
            }

        }


        if (selectedGrnItem.osGrnItemType === "referenceStandard") {
            if (name === "osGrnAcAverageOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.osGrnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""

                            const isAverageInRange = parseFloat(item.osGrnAcAverageOB) >= parseFloat(item.osGrnAcMinPS) &&
                                parseFloat(item.osGrnAcAverageOB) <= parseFloat(item.osGrnAcMaxPS);

                            if (item.osGrnAcAverageOB === "") {
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
                        osGrnAcCriteria: updatedData,
                    };
                })
            }

            if (name === "osGrnAcMinOB" || name === "osGrnAcMaxOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.osGrnAcCriteria.map((item, idx) => {
                        if (idx === index) {

                            const isMinInRange = parseFloat(item.osGrnAcMinOB) >= parseFloat(item.osGrnAcMinPS) &&
                                parseFloat(item.osGrnAcMinOB) <= parseFloat(item.osGrnAcMaxPS);
                            const isMaxInRange = parseFloat(item.osGrnAcMaxOB) >= parseFloat(item.osGrnAcMinPS) &&
                                parseFloat(item.osGrnAcMaxOB) <= parseFloat(item.osGrnAcMaxPS);


                            let status = ""

                            if (item.osGrnAcMaxOB === "" && item.osGrnAcMinOB === "") {
                                status = "";
                            } else if (item.osGrnAcMaxOB === "") {
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
                        osGrnAcCriteria: updatedData,
                    };
                });
            }

        }








    };
    ///


    const [editGrnId, setEditGrnId] = useState(null)
    const [editIndex, setEditIndex] = useState(null)
    console.log(editableSelectedGrn, editGrnId)
    const handleGrnItemEdit = (item, index) => {
        setSelectedGrnItem((prev) => ({
            ...prev,
            osGrnItemStatus: item.osGrnItemStatus,
            osGrnItemId: item.osGrnItemId,
            osGrnItemAddMasterName: item.osGrnItemAddMasterName,
            osGrnItemIMTENo: item.osGrnItemIMTENo,
            osGrnItemType: item.osGrnItemType,
            osGrnItemRangeSize: item.osGrnItemRangeSize,
            osGrnItemRangeSizeUnit: item.osGrnItemRangeSizeUnit,
            osGrnItemMFRNo: item.osGrnItemMFRNo,
            osGrnItemLC: item.osGrnItemLC,
            osGrnItemLCUnit: item.osGrnItemLCUnit,
            osGrnItemMake: item.osGrnItemMake,
            osGrnItemModelNo: item.osGrnItemModelNo,

            osGrnItemDepartment: item.osGrnItemDepartment,
            osGrnItemArea: item.osGrnItemArea,
            osGrnItemPlaceOfUsage: item.osGrnItemPlaceOfUsage,
            osGrnItemCalFreInMonths: item.osGrnItemCalFreInMonths,
            osGrnItemCalAlertDays: item.osGrnItemCalAlertDays,
            osGrnItemCalibrationSource: item.osGrnItemCalibrationSource,
            osGrnItemCalibrationDoneAt: item.osGrnItemCalibrationDoneAt,
            osGrnItemCalibratedAt: item.osGrnItemCalibratedAt,
            osGrnItemOBType: item.osGrnItemOBType,
            osGrnAcCriteria: item.osGrnAcCriteria.map((item) => (
                {
                    osGrnAcParameter: item.osGrnAcParameter,
                    osGrnAcNominalSize: item.osGrnAcNominalSize,
                    osGrnAcNominalSizeUnit: item.osGrnAcNominalSizeUnit,
                    osGrnAcMinPS: item.osGrnAcMinPS,
                    osGrnAcMaxPS: item.osGrnAcMaxPS,
                    osGrnAcWearLimitPS: item.osGrnAcWearLimitPS,
                    osGrnAcBeforeCalibration: item.osGrnAcBeforeCalibration,
                    osGrnAcMinOB: item.osGrnAcMinOB,
                    osGrnAcMaxOB: item.osGrnAcMaxOB,
                    osGrnAcAverageOB: item.osGrnAcAverageOB,
                    osGrnAcOBError: item.osGrnAcOBError,
                    osGrnAcMinPSError: item.osGrnAcMinPSError,
                    osGrnAcMaxPSError: item.osGrnAcMaxPSError,
                    rowStatus: item.rowStatus
                }
            )),
            osGrnItemUncertainity: item.osGrnItemUncertainity,
            osGrnItemCalDate: item.osGrnItemCalDate,
            osGrnItemDueDate: item.osGrnItemDueDate,
            osGrnItemCertificateStatus: item.osGrnItemCertificateStatus,
            osGrnItemCertificateNo: item.osGrnItemCertificateNo,
            osGrnItemCertificate: item.osGrnItemCertificate,
            osGrnUncertainity: item.osGrnUncertainity,
            osGrnItemCalStatus: item.osGrnItemCalStatus
        }))
        setSelectedGrnItem({ ...item })
        setEditGrnId(item.osGrnItemId)
        setEditIndex(index)
        console.log(item)
    }




















    return (

        <Dialog fullWidth={true} keepMounted maxWidth="xl" open={onSiteEditOpen} onc sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setOnSiteEditOpen(false)
                }
            }}>
            <DialogTitle align='center' >OnSiteGRN Edit</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setOnSiteEditOpen(false)}
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
                                        <div className='row g-2 mb-2'>
                                            <div className=" col-6">

                                                <TextField label="Party Ref No"
                                                    id="osGrnPartyRefNoId"
                                                    defaultValue=""
                                                    size="small"
                                                    value={onSiteEditData.osGrnPartyRefNo}
                                                    onChange={handleOnSiteChange}
                                                    fullWidth
                                                    name="osGrnPartyRefNo" />
                                            </div>
                                            <div className="col-6">

                                                <DatePicker

                                                    fullWidth
                                                    id="osGrnPartyRefDateId"
                                                    name="osGrnPartyRefDate"
                                                    value={dayjs(onSiteEditData.osGrnPartyRefDate)}
                                                    onChange={(newValue) =>
                                                        setOnSiteEditData((prev) => ({ ...prev, osGrnPartyRefDate: newValue.format("YYYY-MM-DD") }))
                                                    }
                                                    label="Party Ref Date"
                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    format="DD-MM-YYYY" />



                                            </div>





                                            <div className=" col-6 ">

                                                <TextField label="Party Name"
                                                    id="osGrnPartyNameId"
                                                    select
                                                    // value={onSiteEditData.osGrnPartyName}
                                                    // onChange={handleOnSiteChange}
                                                    onChange={(e) => setPartyData(e.target.value)}
                                                    size="small"
                                                    fullWidth
                                                    name="osGrnPartyName" >
                                                    {vendorDataList.map((item, index) => (
                                                        <MenuItem key={index} value={item._id}>{item.fullName}</MenuItem>
                                                    ))}

                                                </TextField>
                                            </div>
                                            <div className="col-6">

                                                <TextField label="Party code"
                                                    id="osGrnPartyCodeId"
                                                    defaultValue=""
                                                    value={onSiteEditData.osGrnPartyCode}
                                                    //  onChange={handleOnSiteChange}
                                                    // sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth
                                                    name="osGrnPartyCode" />

                                            </div>


                                        </div>



                                        <div className="col-12">

                                            <TextField label="PartyAddress"
                                                id="osGrnPartyAddressId"
                                                defaultValue=""
                                                value={onSiteEditData.osGrnPartyAddress}
                                                onChange={handleOnSiteChange}
                                                size="small"
                                                sx={{ width: "100%" }}
                                                name="osGrnPartyAddress" />

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

                                        <div className='col row g-2 d-flex mb-2'>
                                            <div className="col-6">

                                                <TextField
                                                    label="GRN NO"
                                                    id="osGrnNoId"
                                                    defaultValue=""
                                                    size="small"
                                                    value={onSiteEditData.osGrnNo}
                                                    onChange={handleOnSiteChange}
                                                    fullWidth
                                                    name="osGrnNo"
                                                />
                                            </div>
                                            <div className="col-6">



                                                <DatePicker

                                                    fullWidth
                                                    id="osGrnDateId"
                                                    name="osGrnDate"
                                                    label="GRN Date"
                                                    value={dayjs(onSiteEditData.osGrnDate)}
                                                    onChange={(newValue) =>
                                                        setOnSiteEditData((prev) => ({ ...prev, osGrnDate: newValue.format("YYYY-MM-DD") }))
                                                    }
                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    format="DD-MM-YYYY" />



                                            </div>
                                            <div className='col-md-12'>
                                                <TextField label="Common Remarks"
                                                    id="osGrnCommonRemarksId"
                                                    defaultValue=""
                                                    value={onSiteEditData.osGrnCommonRemarks}
                                                    onChange={handleOnSiteChange}
                                                    fullWidth
                                                    size="small"
                                                    name="osGrnCommonRemarks"
                                                >
                                                </TextField>
                                            </div>


                                        </div>



                                    </Paper>
                                </div>
                            </div>

                            {editGrnId ?
                                <Paper sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mb: 1,

                                }}
                                    elevation={12}
                                >


                                    <div className="row g-2 mt-1 mb-2">
                                        <div className="col-md-2">
                                            <TextField size='small' fullWidth variant='outlined' defaultValue="" inputProps={{ readOnly: true }} id="osGrnItemStatusId" value={selectedGrnItem.osGrnItemIMTENo} label="IMTE No" name='osGrnItemStatus' >

                                            </TextField>
                                        </div>
                                        <div className="col-md-2">
                                            <TextField size='small' fullWidth variant='outlined' defaultValue="" id="osGrnItemStatusId" value={selectedGrnItem.osGrnItemStatus} onChange={handleOnSiteGrnItemAdd} select label="Grn Item Status" name='osGrnItemStatus' >
                                                <MenuItem value="select">Select</MenuItem>
                                                <MenuItem value="Calibrated">Calibrated</MenuItem>
                                                <MenuItem value="Serviced">Serviced</MenuItem>
                                                <MenuItem value="Not Servicable">Not Servicable</MenuItem>
                                                <MenuItem value="Not Calibrated">Not Calibrated</MenuItem>
                                                <MenuItem value="Other Reason">Other Reason</MenuItem>
                                            </TextField>
                                        </div>
                                        {selectedGrnItem.osGrnItemStatus === "Calibrated" &&
                                            <React.Fragment>
                                                <div className="col">
                                                    <DatePicker
                                                        fullWidth
                                                        id="osGrnItemCalDateId"
                                                        name="osGrnItemCalDate"
                                                        label="Cal Date"

                                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                        format="DD-MM-YYYY"
                                                        value={dayjs(selectedGrnItem.osGrnItemCalDate)}
                                                        onChange={(newValue) => setSelectedGrnItem((prev) => ({ ...prev, osGrnItemCalDate: newValue.format('YYYY-MM-DD') }))}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <DatePicker
                                                        fullWidth
                                                        id="osGrnItemDueDateId"
                                                        name="osGrnItemDueDate"
                                                        label="Next Cal Date"
                                                        // sx={{ width: "100%" }}
                                                        value={dayjs(selectedGrnItem.osGrnItemDueDate)}
                                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                        format="DD-MM-YYYY"
                                                        onChange={(newValue) => setSelectedGrnItem((prev) => ({ ...prev, osGrnItemDueDate: newValue.format('YYYY-MM-DD') }))}
                                                    />
                                                </div>
                                                <div className='col'>
                                                    <TextField size='small' fullWidth variant='outlined' id="osGrnItemCertificateStatusId" value={selectedGrnItem.osGrnItemCertificateStatus} onChange={handleOnSiteGrnItemAdd} select label="Certificate Status" name='osGrnItemCertificateStatus'>
                                                        <MenuItem value="received">Received</MenuItem>
                                                        <MenuItem value="notReceived">Not Received</MenuItem>
                                                    </TextField>
                                                </div>


                                            </React.Fragment>}

                                        <div className={selectedGrnItem.osGrnItemStatus === "Calibrated" ? "col-md-3 d-flex justify-content-end" : "col-md-7 d-flex justify-content-end"}>

                                            <Button startIcon={<Add />} className='me-2' color='warning' onClick={() => onsiteEditItem()} sx={{ minWidth: "130px" }} variant='contained'>Update Item</Button>
                                            <Button color='error' onClick={() => onsiteEditCancel()} sx={{ minWidth: "130px" }} variant='contained'>Cancel</Button>
                                        </div>



                                    </div>
                                    {selectedGrnItem.osGrnItemStatus === "Calibrated" &&
                                        <React.Fragment>

                                            {selectedGrnItem.osGrnItemCertificateStatus === "received" ?
                                                <div className="row g-2 ">
                                                    <div className="col-md-3">

                                                        <TextField label="Certificate No"
                                                            value={selectedGrnItem.osGrnItemCertificateNo}
                                                            id="osGrnItemCertificateNoId"

                                                            size="small"
                                                            fullWidth
                                                            onChange={handleOnSiteGrnItemAdd}
                                                            name="osGrnItemCertificateNo" />

                                                    </div>
                                                    <div className='col-md-3'>
                                                        <TextField fullWidth label="Uncertainity" id='osGrnUncertainityId' value={selectedGrnItem.osGrnUncertainity} variant='outlined' size='small' onChange={handleOnSiteGrnItemAdd} name='osGrnUncertainity' />

                                                    </div>

                                                    {/* <div className='col-md-3' >
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
                                                            deleteIcon={<Delete color='error' />}
                                                        ></Chip> : <Button helperText="Hello" component="label" fullWidth variant="contained" startIcon={<CloudUpload />} >
                                                            Upload Certificate
                                                            <VisuallyHiddenInput type="file" onChange={handleGrnCertificate} />
                                                        </Button>}
                                                        </div>*/}
                                                </div>
                                                : ""}








                                            <div className='row mt-3'>
                                                <div className="col-md">
                                                    <h5>Calibration Data</h5>
                                                    <table className='table table-sm table-bordered table-responsive text-center align-middle'>

                                                        {selectedGrnItem.osGrnItemType === "attribute" &&

                                                            <tbody >
                                                                <tr>

                                                                    <th width="20%" rowSpan={2}>Parameter</th>
                                                                    <th width="10%" rowSpan={2}>Range/Size</th>
                                                                    <th width="10%" rowSpan={2}>Unit</th>
                                                                    <th colSpan={3} width="30%">Permissible Size</th>


                                                                    <th width="20%" colSpan={selectedGrnItem.osGrnItemOBType === "average" ? 1 : 2}>Observed Size</th>
                                                                    <th width="10%" rowSpan={2}>Status</th>
                                                                </tr>
                                                                <tr>
                                                                    <th width="6%">Min</th>
                                                                    <th width="6%">Max</th>
                                                                    <th width="10%">Wear Limit</th>
                                                                    {selectedGrnItem.osGrnItemOBType === "average" ?
                                                                        <React.Fragment>
                                                                            <th>Average</th>
                                                                        </React.Fragment> :
                                                                        <React.Fragment>
                                                                            <th>Min</th>
                                                                            <th>Max</th>
                                                                        </React.Fragment>}

                                                                </tr>
                                                                {/* {selectedGrnItem.grnAcCriteria.map((item)=> ()} */}
                                                                {selectedGrnItem.osGrnAcCriteria.map((item, index) => {
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
                                                                    if (item.osGrnAcWearLimitPS !== "") {

                                                                        if (item.osGrnAcWearLimitPS < item.osGrnAcMinPS) {
                                                                            size = "OD"
                                                                        } else {
                                                                            size = "ID"
                                                                        }

                                                                        if (size === "OD") {
                                                                            //min OD condition
                                                                            if (item.osGrnAcMinOB >= item.osGrnAcWearLimitPS && item.osGrnAcMinOB < item.osGrnAcMinPS) {
                                                                                minColor = "orange"
                                                                            }
                                                                            else if (item.osGrnAcMinOB >= item.osGrnAcMinPS && item.osGrnAcMinOB <= item.osGrnAcMaxPS) {
                                                                                minColor = "green"
                                                                            } else {
                                                                                minColor = "red"
                                                                            }

                                                                            if (item.osGrnAcMaxOB >= item.osGrnAcWearLimitPS && item.osGrnAcMaxOB < item.osGrnAcMinPS) {
                                                                                maxColor = "orange"
                                                                            }
                                                                            else if (item.osGrnAcMaxOB >= item.osGrnAcMinPS && item.osGrnAcMaxOB <= item.osGrnAcMaxPS) {
                                                                                maxColor = "green"
                                                                            } else {
                                                                                maxColor = "red"
                                                                            }

                                                                            if (item.osGrnAcAverageOB >= item.osGrnAcWearLimitPS && item.osGrnAcAverageOB < item.osGrnAcMinPS) {
                                                                                averageColor = "orange"
                                                                            }
                                                                            else if (item.osGrnAcAverageOB >= item.osGrnAcMinPS && item.osGrnAcAverageOB <= item.osGrnAcMaxPS) {
                                                                                averageColor = "green"
                                                                            } else {
                                                                                averageColor = "red"
                                                                            }


                                                                        }

                                                                        if (size === "ID") {
                                                                            //min Id condition
                                                                            if (item.osGrnAcMinOB <= item.osGrnAcWearLimitPS && item.osGrnAcMinOB > item.osGrnAcMaxPS) {
                                                                                minColor = "orange"
                                                                            }
                                                                            else if (item.osGrnAcMinOB >= item.osGrnAcMinPS && item.osGrnAcMinOB <= item.osGrnAcMaxPS) {
                                                                                minColor = "green"
                                                                            } else {
                                                                                minColor = "red"
                                                                            }
                                                                            //max ID condition
                                                                            if (item.osGrnAcMaxOB <= item.osGrnAcWearLimitPS && item.osGrnAcMaxOB > item.osGrnAcMaxPS) {
                                                                                maxColor = "orange"
                                                                            }
                                                                            else if (item.osGrnAcMaxOB >= item.osGrnAcMinPS && item.osGrnAcMaxOB <= item.osGrnAcMaxPS) {
                                                                                maxColor = "green"
                                                                            } else {
                                                                                maxColor = "red"
                                                                            }

                                                                            if (item.osGrnAcAverageOB <= item.osGrnAcWearLimitPS && item.osGrnAcAverageOB > item.osGrnAcMaxPS) {
                                                                                averageColor = "orange"
                                                                            }
                                                                            else if (item.osGrnAcAverageOB >= item.osGrnAcMinPS && item.osGrnAcAverageOB <= item.osGrnAcMaxPS) {
                                                                                averageColor = "green"
                                                                            } else {
                                                                                averageColor = "red"
                                                                            }
                                                                        }

                                                                        //   handleStatus(index, minColor, maxColor);



                                                                    } else {


                                                                        if (parseFloat(item.osGrnAcMinOB) >= parseFloat(item.osGrnAcMinPS) && parseFloat(item.osGrnAcMinOB) <= parseFloat(item.osGrnAcMaxPS)) {
                                                                            minColor = "#4cbb17";

                                                                        } else {
                                                                            minColor = "red"

                                                                        }


                                                                        if (parseFloat(item.osGrnAcMaxOB) >= parseFloat(item.osGrnAcMinPS) && parseFloat(item.osGrnAcMaxOB) <= parseFloat(item.osGrnAcMaxPS)) {
                                                                            maxColor = "#4cbb17"

                                                                        } else {
                                                                            maxColor = "red"

                                                                        }

                                                                        if (parseFloat(item.osGrnAcAverageOB) >= parseFloat(item.osGrnAcMinPS) && parseFloat(item.osGrnAcAverageOB) <= parseFloat(item.osGrnAcMaxPS)) {
                                                                            averageColor = "#4cbb17";

                                                                        } else {
                                                                            averageColor = "red"

                                                                        }
                                                                    }

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{item.osGrnAcParameter}</td>
                                                                            <td>{item.osGrnAcNominalSize}</td>
                                                                            <td>{item.osGrnAcNominalSizeUnit}</td>
                                                                            <td>{item.osGrnAcMinPS}</td>
                                                                            <td>{item.osGrnAcMaxPS}</td>
                                                                            <td>{item.osGrnAcWearLimitPS}</td>

                                                                            {selectedGrnItem.grnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} name='osGrnAcBeforeCalibration' /></td>}
                                                                            {selectedGrnItem.osGrnItemOBType === "average" &&
                                                                                <td><input className='form-control form-control-sm' name='osGrnAcAverageOB' style={{ color: averageColor, fontWeight: "bold" }} value={item.osGrnAcAverageOB} onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} /></td>
                                                                            }
                                                                            {selectedGrnItem.osGrnItemOBType === "minmax" &&
                                                                                <React.Fragment>
                                                                                    <td>
                                                                                        <input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} value={item.osGrnAcMinOB} name="osGrnAcMinOB" onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} />
                                                                                    </td>
                                                                                    <td>
                                                                                        <input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} value={item.osGrnAcMaxOB} name="osGrnAcMaxOB" onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} /></td>
                                                                                </React.Fragment>}


                                                                            <td width="15%">
                                                                                <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)}>
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


                                                        {selectedGrnItem.osGrnItemType === "variable" &&

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
                                                                {selectedGrnItem.osGrnAcCriteria.map((item, index) => {

                                                                    let averageColor = "";
                                                                    if (parseFloat(item.osGrnAcAverageOB) >= parseFloat(item.osGrnAcMinPSError) && parseFloat(item.osGrnAcAverageOB) <= parseFloat(item.osGrnAcMaxPSError)) {
                                                                        averageColor = "#4cbb17";
                                                                    } else {
                                                                        averageColor = "red"
                                                                    }

                                                                    return (
                                                                        <tr key={index}>

                                                                            <td>{item.osGrnAcParameter}</td>
                                                                            <td>{item.osGrnAcNominalSize}</td>
                                                                            <td>{item.osGrnAcNominalSizeUnit}</td>
                                                                            <td>{item.osGrnAcMinPSError}</td>
                                                                            <td>{item.osGrnAcMaxPSError}</td>
                                                                            <td><input className='form-control form-control-sm' name='osGrnAcAverageOB' value={item.osGrnAcAverageOB} style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} /></td>
                                                                            <td width="15%">
                                                                                <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)}>
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

                                                        {selectedGrnItem.osGrnItemType === "referenceStandard" &&
                                                            <tbody>
                                                                <tr>

                                                                    <th width="20%" rowSpan={2}>Parameter</th>
                                                                    <th width="10%" rowSpan={2}>Range/Size</th>
                                                                    <th width="10%" rowSpan={2}>Unit</th>
                                                                    <th colSpan={2}>Permissible Size</th>
                                                                    {selectedGrnItem.grnBeforeData === "yes" && <th width="10%" rowSpan={2}>Before Calibration</th>}
                                                                    <th width="20%" colSpan={selectedGrnItem.osGrnItemOBType === "average" ? 1 : 2}>Observed Size</th>
                                                                    <th width="10%" rowSpan={2}>Status</th>
                                                                </tr>
                                                                <tr>
                                                                    <th width="6%">Min</th>
                                                                    <th width="6%">Max</th>

                                                                    {selectedGrnItem.osGrnItemOBType === "average" ?
                                                                        <React.Fragment>
                                                                            <th>Average</th>
                                                                        </React.Fragment> :
                                                                        <React.Fragment>
                                                                            <th>Min</th>
                                                                            <th>Max</th>
                                                                        </React.Fragment>}

                                                                </tr>
                                                                {/* {selectedGrnItem.grnselectedGrnItem.map((item)=> ()} */}
                                                                {selectedGrnItem.osGrnAcCriteria.map((item, index) => {
                                                                    let averageColor = "";

                                                                    if (parseFloat(item.osGrnAcAverageOB) >= parseFloat(item.osGrnAcMinPS) && parseFloat(item.osGrnAcAverageOB) <= parseFloat(item.osGrnAcMaxPS)) {
                                                                        averageColor = "#4cbb17";

                                                                    } else {
                                                                        averageColor = "red"

                                                                    }

                                                                    let minColor = "";

                                                                    if (parseFloat(item.osGrnAcMinOB) >= parseFloat(item.osGrnAcMinPS) && parseFloat(item.osGrnAcMinOB) <= parseFloat(item.osGrnAcMaxPS)) {
                                                                        minColor = "#4cbb17";

                                                                    } else {
                                                                        minColor = "red"

                                                                    }

                                                                    let maxColor = "";
                                                                    if (parseFloat(item.osGrnAcMaxOB) >= parseFloat(item.osGrnAcMinPS) && parseFloat(item.osGrnAcMaxOB) <= parseFloat(item.osGrnAcMaxPS)) {
                                                                        maxColor = "#4cbb17"

                                                                    } else {
                                                                        maxColor = "red"

                                                                    }


                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{item.osGrnAcParameter}</td>
                                                                            <td>{item.osGrnAcNominalSize}</td>
                                                                            <td>{item.osGrnAcNominalSizeUnit}</td>
                                                                            <td>{item.osGrnAcMinPS}</td>
                                                                            <td>{item.osGrnAcMaxPS}</td>

                                                                            {selectedGrnItem.grnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} name='osGrnAcBeforeCalibration' /></td>}
                                                                            {selectedGrnItem.osGrnItemOBType === "average" &&
                                                                                <td><input className='form-control form-control-sm' name='osGrnAcAverageOB' value={item.osGrnAcAverageOB} style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} /></td>
                                                                            }
                                                                            {selectedGrnItem.osGrnItemOBType === "minmax" &&
                                                                                <React.Fragment>
                                                                                    <td><input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} value={item.osGrnAcMinOB} name="osGrnAcMinOB" onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} />
                                                                                    </td> <td><input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} value={item.osGrnAcMaxOB} name="osGrnAcMaxOB" onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} /></td>
                                                                                </React.Fragment>}


                                                                            <td width="15%">
                                                                                <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)}>
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
                                                <div className=' col d-flex justify-content-end '>


                                                    <div className='col-4 me-2'>
                                                        <TextField size='small' inputProps={{ sx: { color: selectedGrnItem.osGrnItemCalStatus === "status" ? "" : selectedGrnItem.osGrnItemCalStatus === "accepted" ? "green" : "red" } }} fullWidth variant='outlined' id="osGrnItemCalStatusId" select label="Calibration Status" name='osGrnItemCalStatus' value={selectedGrnItem.osGrnItemCalStatus}>
                                                            <MenuItem value="status">Status</MenuItem>
                                                            <MenuItem value="accepted">Accepted</MenuItem>
                                                            <MenuItem value="rejected">Rejected</MenuItem>


                                                        </TextField>
                                                    </div>






                                                </div>


                                            </div>
                                        </React.Fragment>}

                                </Paper>


                                : <Paper
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
                                                <TextField size='small' fullWidth variant='outlined' defaultValue="" id="grnListId" value={itemAddOSiteDetails.onSiteList} onChange={handleOnSiteGrnItemAdd} select label="Item List" name='onSiteList'>
                                                    {itemMasterDistNames.map((item, index) => (
                                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                                    ))}
                                                </TextField>
                                            </div>
                                            <div className='col me-2 '>
                                                <TextField label="Imte No"
                                                    id="osGrnItemIdId"
                                                    select
                                                    defaultValue=""
                                                    fullWidth
                                                    size="small"
                                                    disabled={itemAddOSiteDetails.onSiteList === ""}
                                                    onChange={handleOnSiteGrnItemAdd}
                                                    value={selectedGrnItem.osGrnItemId}
                                                    name="osGrnItemId" >
                                                    {allItemImtes.length === 0 ?
                                                        <MenuItem disabled><em>No IMTE Available</em></MenuItem> :
                                                        allItemImtes.map((item, index) => (
                                                            <MenuItem key={index} value={item._id}>{item.itemIMTENo}</MenuItem>
                                                        ))}
                                                </TextField>
                                            </div>
                                            <div className='col me-2 '>
                                                <TextField size='small' fullWidth variant='outlined' disabled={selectedGrnItem.osGrnItemId === "" || selectedGrnItem.osGrnItemId === undefined} onChange={handleOnSiteGrnItemAdd} value={selectedGrnItem.osGrnItemStatus} defaultValue="" id="osGrnItemStatusId" select label="Grn Item Status" name='osGrnItemStatus' >
                                                    <MenuItem value="">Select</MenuItem>
                                                    <MenuItem value="Calibrated">Calibrated</MenuItem>
                                                    <MenuItem value="Serviced">Serviced</MenuItem>
                                                    <MenuItem value="Not Servicable">Not Servicable</MenuItem>
                                                    <MenuItem value="Not Calibrated">Not Calibrated</MenuItem>
                                                </TextField>
                                            </div>

                                        </div>
                                        <div className=' col d-flex justify-content-end'>
                                            <div className='me-2 '>
                                                <Button disabled={selectedGrnItem.osGrnItemStatus === "" || selectedGrnItem.osGrnItemStatus === undefined} startIcon={<Add />} onClick={() => OnSiteGrnAdd()} size='small' sx={{ minWidth: "130px" }} variant='contained'>Add Item</Button>
                                            </div>

                                        </div>



                                    </div>
                                    {selectedGrnItem.osGrnItemStatus === "Calibrated" ?
                                        <React.Fragment>

                                            <div className='row g-2 '>
                                                <div className="col-md-2">
                                                    <DatePicker
                                                        fullWidth
                                                        id="osGrnItemCalDateId"
                                                        name="osGrnItemCalDate"
                                                        label="Cal Date"

                                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                        format="DD-MM-YYYY"
                                                        value={dayjs(selectedGrnItem.osGrnItemCalDate)}
                                                        onChange={(newValue) => setSelectedGrnItem((prev) => ({ ...prev, osGrnItemCalDate: newValue.format('YYYY-MM-DD') }))}
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <DatePicker
                                                        fullWidth
                                                        id="osGrnItemDueDateId"
                                                        name="osGrnItemDueDate"
                                                        label="Next Cal Date"
                                                        // sx={{ width: "100%" }}
                                                        value={dayjs(selectedGrnItem.osGrnItemDueDate)}
                                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                        format="DD-MM-YYYY"
                                                        onChange={(newValue) => setSelectedGrnItem((prev) => ({ ...prev, osGrnItemDueDate: newValue.format('YYYY-MM-DD') }))}
                                                    />
                                                </div>


                                                <div className='col-md-2'>
                                                    <TextField size='small' fullWidth variant='outlined' id="grnItemCertificateStatusId" select label="Certificate Status" onChange={handleOnSiteGrnItemAdd} name='osGrnItemCertificateStatus'>
                                                        <MenuItem value="received">Received</MenuItem>
                                                        <MenuItem value="notReceived">Not Received</MenuItem>
                                                    </TextField>
                                                </div>
                                                {selectedGrnItem.osGrnItemCertificateStatus === "received" ? <React.Fragment>
                                                    <div className="col-md-2">
                                                        <TextField label="Certificate No"
                                                            id="osGrnItemCertificateNoId"
                                                            defaultValue=""
                                                            size="small"
                                                            fullWidth
                                                            onChange={handleOnSiteGrnItemAdd}
                                                            name="osGrnItemCertificateNo" />
                                                    </div>
                                                    <div className='col-md-2'>
                                                        <TextField fullWidth label="Uncertainity" id='osGrnUncertainityId' value={selectedGrnItem.osGrnUncertainity} variant='outlined' size='small' onChange={handleOnSiteGrnItemAdd} name='osGrnUncertainity' />
                                                    </div>
                                                    <div className='col-md-2' >
                                                        <Button helperText="Hello" component="label" fullWidth variant="contained" startIcon={<CloudUpload />} >
                                                            Upload Certificate
                                                           {/*<VisuallyHiddenInput type="file" onChange={handleGrnCertificate} />*/}
                                                        </Button>
                                                    </div>
                                                </React.Fragment> : ""}
                                            </div>


                                            <div className='row g-2'>
                                                <h5 className='text-center'>Calibration Data</h5>
                                                <table className='table table-sm table-bordered table-responsive text-center align-middle'>


                                                    {selectedGrnItem.osGrnItemType === "attribute" &&

                                                        <tbody >
                                                            <tr>

                                                                <th width="20%" rowSpan={2}>Parameter</th>
                                                                <th width="10%" rowSpan={2}>Range/Size</th>
                                                                <th width="10%" rowSpan={2}>Unit</th>
                                                                <th colSpan={3} width="30%">Permissible Size</th>


                                                                <th width="20%" colSpan={selectedGrnItem.osGrnItemOBType === "average" ? 1 : 2}>Observed Size</th>
                                                                <th width="10%" rowSpan={2}>Status</th>
                                                            </tr>
                                                            <tr>
                                                                <th width="6%">Min</th>
                                                                <th width="6%">Max</th>
                                                                <th width="10%">Wear Limit</th>
                                                                {selectedGrnItem.osGrnItemOBType === "average" ?
                                                                    <React.Fragment>
                                                                        <th>Average</th>
                                                                    </React.Fragment> :
                                                                    <React.Fragment>
                                                                        <th>Min</th>
                                                                        <th>Max</th>
                                                                    </React.Fragment>}

                                                            </tr>
                                                            {/* {selectedGrnItem.grnAcCriteria.map((item)=> ()} */}
                                                            {selectedGrnItem.osGrnAcCriteria.map((item, index) => {
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
                                                                if (item.osGrnAcWearLimitPS !== "") {

                                                                    if (item.osGrnAcWearLimitPS < item.osGrnAcMinPS) {
                                                                        size = "OD"
                                                                    } else {
                                                                        size = "ID"
                                                                    }

                                                                    if (size === "OD") {
                                                                        //min OD condition
                                                                        if (item.osGrnAcMinOB >= item.osGrnAcWearLimitPS && item.osGrnAcMinOB < item.osGrnAcMinPS) {
                                                                            minColor = "orange"
                                                                        }
                                                                        else if (item.osGrnAcMinOB >= item.osGrnAcMinPS && item.osGrnAcMinOB <= item.osGrnAcMaxPS) {
                                                                            minColor = "green"
                                                                        } else {
                                                                            minColor = "red"
                                                                        }

                                                                        if (item.osGrnAcMaxOB >= item.osGrnAcWearLimitPS && item.osGrnAcMaxOB < item.osGrnAcMinPS) {
                                                                            maxColor = "orange"
                                                                        }
                                                                        else if (item.osGrnAcMaxOB >= item.osGrnAcMinPS && item.osGrnAcMaxOB <= item.osGrnAcMaxPS) {
                                                                            maxColor = "green"
                                                                        } else {
                                                                            maxColor = "red"
                                                                        }

                                                                        if (item.osGrnAcAverageOB >= item.osGrnAcWearLimitPS && item.osGrnAcAverageOB < item.osGrnAcMinPS) {
                                                                            averageColor = "orange"
                                                                        }
                                                                        else if (item.osGrnAcAverageOB >= item.osGrnAcMinPS && item.osGrnAcAverageOB <= item.osGrnAcMaxPS) {
                                                                            averageColor = "green"
                                                                        } else {
                                                                            averageColor = "red"
                                                                        }


                                                                    }

                                                                    if (size === "ID") {
                                                                        //min Id condition
                                                                        if (item.osGrnAcMinOB <= item.osGrnAcWearLimitPS && item.osGrnAcMinOB > item.osGrnAcMaxPS) {
                                                                            minColor = "orange"
                                                                        }
                                                                        else if (item.osGrnAcMinOB >= item.osGrnAcMinPS && item.osGrnAcMinOB <= item.osGrnAcMaxPS) {
                                                                            minColor = "green"
                                                                        } else {
                                                                            minColor = "red"
                                                                        }
                                                                        //max ID condition
                                                                        if (item.osGrnAcMaxOB <= item.osGrnAcWearLimitPS && item.osGrnAcMaxOB > item.osGrnAcMaxPS) {
                                                                            maxColor = "orange"
                                                                        }
                                                                        else if (item.osGrnAcMaxOB >= item.osGrnAcMinPS && item.osGrnAcMaxOB <= item.osGrnAcMaxPS) {
                                                                            maxColor = "green"
                                                                        } else {
                                                                            maxColor = "red"
                                                                        }

                                                                        if (item.osGrnAcAverageOB <= item.osGrnAcWearLimitPS && item.osGrnAcAverageOB > item.osGrnAcMaxPS) {
                                                                            averageColor = "orange"
                                                                        }
                                                                        else if (item.osGrnAcAverageOB >= item.osGrnAcMinPS && item.osGrnAcAverageOB <= item.osGrnAcMaxPS) {
                                                                            averageColor = "green"
                                                                        } else {
                                                                            averageColor = "red"
                                                                        }
                                                                    }

                                                                    //   handleStatus(index, minColor, maxColor);



                                                                } else {


                                                                    if (parseFloat(item.osGrnAcMinOB) >= parseFloat(item.osGrnAcMinPS) && parseFloat(item.osGrnAcMinOB) <= parseFloat(item.osGrnAcMaxPS)) {
                                                                        minColor = "#4cbb17";

                                                                    } else {
                                                                        minColor = "red"

                                                                    }


                                                                    if (parseFloat(item.osGrnAcMaxOB) >= parseFloat(item.osGrnAcMinPS) && parseFloat(item.osGrnAcMaxOB) <= parseFloat(item.osGrnAcMaxPS)) {
                                                                        maxColor = "#4cbb17"

                                                                    } else {
                                                                        maxColor = "red"

                                                                    }

                                                                    if (parseFloat(item.osGrnAcAverageOB) >= parseFloat(item.osGrnAcMinPS) && parseFloat(item.osGrnAcAverageOB) <= parseFloat(item.osGrnAcMaxPS)) {
                                                                        averageColor = "#4cbb17";

                                                                    } else {
                                                                        averageColor = "red"

                                                                    }
                                                                }





                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{item.osGrnAcParameter}</td>
                                                                        <td>{item.osGrnAcNominalSize}</td>
                                                                        <td>{item.osGrnAcNominalSizeUnit}</td>
                                                                        <td>{item.osGrnAcMinPS}</td>
                                                                        <td>{item.osGrnAcMaxPS}</td>
                                                                        <td>{item.osGrnAcWearLimitPS}</td>

                                                                        {selectedGrnItem.osGrnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} name='grnBeforegrnibration' /></td>}
                                                                        {selectedGrnItem.osGrnItemOBType === "average" &&
                                                                            <td><input className='form-control form-control-sm' name='osGrnAcAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} /></td>
                                                                        }
                                                                        {selectedGrnItem.osGrnItemOBType === "minmax" &&
                                                                            <React.Fragment>
                                                                                <td>
                                                                                    <input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} name="osGrnAcMinOB" onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} />
                                                                                </td>
                                                                                <td>
                                                                                    <input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} name="osGrnAcMaxOB" onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} /></td>
                                                                            </React.Fragment>}


                                                                        <td width="15%">
                                                                            <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)}>
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

                                                    {selectedGrnItem.osGrnItemType === "variable" &&

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
                                                            {selectedGrnItem.osGrnAcCriteria.map((item, index) => {

                                                                let averageColor = "";
                                                                if (parseFloat(item.osGrnAcAverageOB) >= parseFloat(item.osGrnAcMinPSError) && parseFloat(item.osGrnAcAverageOB) <= parseFloat(item.osGrnAcMaxPSError)) {
                                                                    averageColor = "#4cbb17";
                                                                } else {
                                                                    averageColor = "red"
                                                                }

                                                                return (
                                                                    <tr key={index}>

                                                                        <td>{item.osGrnAcParameter}</td>
                                                                        <td>{item.osGrnAcNominalSize}</td>
                                                                        <td>{item.osGrnAcNominalSizeUnit}</td>
                                                                        <td>{item.osGrnAcMinPSError}</td>
                                                                        <td>{item.osGrnAcMaxPSError}</td>
                                                                        <td><input className='form-control form-control-sm' name='osGrnAcAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} /></td>
                                                                        <td width="15%">
                                                                            <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)}>
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
                                                    {selectedGrnItem.osGrnItemType === "referenceStandard" &&
                                                        <tbody>
                                                            <tr>

                                                                <th width="20%" rowSpan={2}>Parameter</th>
                                                                <th width="10%" rowSpan={2}>Range/Size</th>
                                                                <th width="10%" rowSpan={2}>Unit</th>
                                                                <th colSpan={2}>Permissible Size</th>
                                                                {selectedGrnItem.osGrnBeforeData === "yes" && <th width="10%" rowSpan={2}>Before Calibration</th>}
                                                                <th width="20%" colSpan={selectedGrnItem.osGrnItemOBType === "average" ? 1 : 2}>Observed Size</th>
                                                                <th width="10%" rowSpan={2}>Status</th>
                                                            </tr>
                                                            <tr>
                                                                <th width="6%">Min</th>
                                                                <th width="6%">Max</th>

                                                                {selectedGrnItem.osGrnItemOBType === "average" ?
                                                                    <React.Fragment>
                                                                        <th>Average</th>
                                                                    </React.Fragment> :
                                                                    <React.Fragment>
                                                                        <th>Min</th>
                                                                        <th>Max</th>
                                                                    </React.Fragment>}

                                                            </tr>
                                                            {/* {selectedGrnItem.grnselectedGrnItem.map((item)=> ()} */}
                                                            {selectedGrnItem.osGrnAcCriteria.map((item, index) => {
                                                                let averageColor = "";

                                                                if (parseFloat(item.osGrnAcAverageOB) >= parseFloat(item.osGrnAcMinPS) && parseFloat(item.osGrnAcAverageOB) <= parseFloat(item.osGrnAcMaxPS)) {
                                                                    averageColor = "#4cbb17";

                                                                } else {
                                                                    averageColor = "red"

                                                                }

                                                                let minColor = "";

                                                                if (parseFloat(item.osGrnAcMinOB) >= parseFloat(item.osGrnAcMinPS) && parseFloat(item.osGrnAcMinOB) <= parseFloat(item.osGrnAcMaxPS)) {
                                                                    minColor = "#4cbb17";

                                                                } else {
                                                                    minColor = "red"

                                                                }

                                                                let maxColor = "";
                                                                if (parseFloat(item.osGrnAcMaxOB) >= parseFloat(item.osGrnAcMinPS) && parseFloat(item.osGrnAcMaxOB) <= parseFloat(item.osGrnAcMaxPS)) {
                                                                    maxColor = "#4cbb17"

                                                                } else {
                                                                    maxColor = "red"

                                                                }


                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{item.osGrnAcParameter}</td>
                                                                        <td>{item.osGrnAcNominalSize}</td>
                                                                        <td>{item.osGrnAcNominalSizeUnit}</td>
                                                                        <td>{item.osGrnAcMinPS}</td>
                                                                        <td>{item.osGrnAcMaxPS}</td>

                                                                        {selectedGrnItem.osGrnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} name='grnBeforeCalibration' /></td>}
                                                                        {selectedGrnItem.osGrnItemOBType === "average" &&
                                                                            <td><input className='form-control form-control-sm' name='osGrnAcAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} /></td>
                                                                        }
                                                                        {selectedGrnItem.osGrnItemOBType === "minmax" &&
                                                                            <React.Fragment>
                                                                                <td><input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} name="osGrnAcMinOB" onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} />
                                                                                </td> <td><input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} name="osGrnAcMaxOB" onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)} /></td>
                                                                            </React.Fragment>}


                                                                        <td width="15%">
                                                                            <select className='form-select form-select-sm' name="rowStatus" value={item.rowStatus} onChange={(e) => changeOnSiteValue(index, e.target.name, e.target.value)}>
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
                                                <div className=' col d-flex justify-content-between'>
                                                    <div className='col-2 me-2 '>
                                                        <TextField size='small' inputProps={{ sx: { color: selectedGrnItem.osGrnItemCalStatus === "status" ? "" : selectedGrnItem.osGrnItemCalStatus === "accepted" ? "green" : "red" } }} fullWidth variant='outlined' id="osGrnItemCalStatusId" select label="Calibration Status" name='osGrnItemCalStatus' value={selectedGrnItem.osGrnItemCalStatus}>
                                                            <MenuItem value="status">Status</MenuItem>
                                                            <MenuItem value="accepted">Accepted</MenuItem>
                                                            <MenuItem value="rejected">Rejected</MenuItem>
                                                        </TextField>
                                                    </div>

                                                </div>



                                            </div>
                                        </React.Fragment> : ""}
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
                                    Are you sure to Update ?
                                </DialogTitle>

                                <DialogActions className='d-flex justify-content-center'>
                                    <Button onClick={() => setConfirmSubmit(false)}>Cancel</Button>
                                    <Button onClick={(e) => { updateEditData(e); setConfirmSubmit(false) }} autoFocus>
                                        Update
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

                            <Paper elevation={12} sx={{ p: 2 }} className='col-md-12'>
                                <table className='table table-bordered table-responsive text-center align-middle'>
                                    <tbody>
                                        <tr>
                                            <th>Si No</th>
                                            <th>IMTE No</th>
                                            <th>Master Name</th>
                                            <th>Range/Size</th>
                                            <th>Cal Certificate No</th>
                                            <th>Cal Due</th>
                                            <th>Next Due</th>
                                            <th>Calibrated At</th>
                                            <th>Remove</th>
                                            <th>Edit</th>
                                        </tr>
                                        {onSiteEditData.osGrnPartyItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.osGrnItemIMTENo}</td>
                                                <td>{item.osGrnItemAddMasterName}</td>
                                                <td>{item.osGrnItemRangeSize}</td>
                                                <td>{item.osGrnItemCertificateNo}</td>
                                                <td>{dayjs(item.osGrnItemCalDate).format("DD-MM-YYYY")}</td>
                                                <td>{item.osGrnItemDueDate}</td>
                                                <td>{item.osGrnItemCalibratedAt}</td>
                                                <td width="5%"><Delete color='error' onClick={() => deleteOnSite(index)} /></td>
                                                <th><Edit color='info' onClick={() => handleGrnItemEdit(item, index)} /></th>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </Paper>
                        </form>
                    </LocalizationProvider>

                </div>
            </DialogContent>
            <DialogActions className='d-flex justify-content-between'>
                <div>
                    <Button variant='contained' color='warning' className='me-3'>Print</Button>
                </div>
                <div>
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setOnSiteEditOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { setConfirmSubmit(true) }}>Submit</Button>
                </div>
            </DialogActions>

        </Dialog>
    )
}

export default GrnEdit