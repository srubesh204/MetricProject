import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, DialogContentText, FormControl, Select, DialogTitle, OutlinedInput, FormControlLabel, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, Chip } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GrnListContent } from './GrnList';
import { Add, Close, CloudUpload, Delete, Done, Edit, Receipt } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useEmployee } from '../../../App';
import styled from '@emotion/styled';
import ItemEdit from '../../ItemCreation/ItemEdit';


const GrnEdit = () => {
    const grnEditDatas = useContext(GrnListContent)
    const { grnEditOpen, setGrnEditOpen, selectedRows, grnListFetchData, itemPlantList, allowedPlants } = grnEditDatas
    const empRole = useEmployee()
    const { employee, loggedEmp } = empRole
    console.log(selectedRows)

    const { id } = useParams()

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

    const [units, setUnits] = useState([]);
    const UnitFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/unit/getAllUnits`
            );
            setUnits(response.data.result);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        UnitFetch()
    }, []);

    const [itemNameList, setItemNameList] = useState(itemPlantList)
    console.log(id)
    const [selectedExtraMaster, setSelectedExtraMaster] = useState([])
    const initialGrnEditData = {
        grnPartyRefNo: "",
        grnPartyId: "",
        grnPartyRefDate: "",
        grnPartyName: "",
        grnPartyCode: "",
        grnPartyAddress: "",
        grnNo: "",
        grnDate: "",
        grnCommonRemarks: "",


        grnPlant: "",
        grnDepartment: "",

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
        grnAssingStatus: "",
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
        grnAcCriteria: [],
        grnItemUncertainty: "",
        grnItemUncertaintyUnit: "",
        grnItemCalDate: dayjs().format("YYYY-MM-DD"),
        grnItemDueDate: "",
        grnItemCertificateStatus: "",
        grnItemCertificateNo: "",
        grnItemCertificate: "",

        grnItemCalStatus: "",


    }


    const [grnEditData, setGrnEditData] = useState({
        grnPartyRefNo: "",
        grnPartyId: "",
        grnPartyRefDate: "",
        grnPartyName: "",
        grnPartyCode: "",
        grnPartyAddress: "",
        grnNo: "",
        grnDate: "",
        grnCommonRemarks: "",
        grnCalDate: dayjs().format("YYYY-MM-DD"),
        grnDueDate: "",
        grnCertificateStatus: "",
        grnCertificateNo: "",

        grnPlant: "",
        grnDepartment: "",

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
        grnAssingStatus: "",
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
        grnAcCriteria: [],
        grnItemUncertainty: "",
        grnItemUncertaintyUnit: "",
        grnItemCalDate: dayjs().format("YYYY-MM-DD"),
        grnItemDueDate: "",
        grnItemCertificateStatus: "",
        grnItemCertificateNo: "",
        grnItemCertificate: "",

        grnItemCalStatus: "",
        grnItemSOPNo: "",
        grnItemStandardRef: "",

    })

    const [selectedPlantItems, setSelectedPlantItems] = useState([])
    console.log(selectedRows)
    const settingGrnData = () => {
        if (selectedRows) { // Check if selectedRows is defined
            setGrnEditData((prev) => ({
                ...prev,
                grnPartyId: selectedRows.grnPartyId,
                grnPartyRefNo: selectedRows.grnPartyRefNo,
                grnPartyRefDate: selectedRows.grnPartyRefDate,
                grnPartyName: selectedRows.grnPartyName,
                grnPartyCode: selectedRows.grnPartyCode,
                grnPartyAddress: selectedRows.grnPartyAddress,
                grnNo: selectedRows.grnNo,
                grnDate: selectedRows.grnDate,
                grnCommonRemarks: selectedRows.grnCommonRemarks,
                grnCalDate: selectedRows.grnCalDate,
                grnDueDate: selectedRows.grnDueDate,
                grnCertificateStatus: selectedRows.grnCertificateStatus,
                grnCertificateNo: selectedRows.grnCertificateNo,

                grnPlant: selectedRows.grnPlant,
                grnItemId: selectedRows.grnItemId,
                grnItemAddMasterName: selectedRows.grnItemAddMasterName,
                grnItemIMTENo: selectedRows.grnItemIMTENo,
                grnItemType: selectedRows.grnItemType,
                grnItemRangeSize: selectedRows.grnItemRangeSize,
                grnItemRangeSizeUnit: selectedRows.grnItemRangeSizeUnit,
                grnItemMFRNo: selectedRows.grnItemMFRNo,
                grnItemLC: selectedRows.grnItemLC,
                grnItemLCUnit: selectedRows.grnItemLCUnit,
                grnItemMake: selectedRows.grnItemMake,
                grnItemModelNo: selectedRows.grnItemModelNo,
                grnItemStatus: selectedRows.grnItemStatus,
                grnAssingStatus: selectedRows.grnAssingStatus,
                grnItemReceiptDate: selectedRows.grnItemReceiptDate,
                grnItemDepartment: selectedRows.grnItemDepartment,
                grnItemArea: selectedRows.grnItemArea,
                grnItemPlaceOfUsage: selectedRows.grnItemPlaceOfUsage,
                grnItemCalFreInMonths: selectedRows.grnItemCalFreInMonths,
                grnItemCalFrequencyType: selectedRows.grnItemCalFrequencyType,
                grnItemCalAlertDays: selectedRows.grnItemCalAlertDays,
                grnItemCalibrationSource: selectedRows.grnItemCalibrationSource,
                grnItemCalibrationDoneAt: selectedRows.grnItemCalibrationDoneAt,
                grnItemCalibratedAt: selectedRows.grnItemCalibratedAt,
                grnItemOBType: selectedRows.grnItemOBType,
                grnItemUncertainty: selectedRows.grnItemUncertainty,
                grnItemUncertaintyUnit: selectedRows.grnItemUncertaintyUnit,
                grnItemCalDate: selectedRows.grnItemCalDate,
                grnItemDueDate: selectedRows.grnItemDueDate,
                grnItemCertificateStatus: selectedRows.grnItemCertificateStatus,
                grnItemCertificateNo: selectedRows.grnItemCertificateNo,
                grnItemCertificate: selectedRows.grnItemCertificate,
                grnAcCriteria: selectedRows.grnAcCriteria,
                grnItemCalStatus: selectedRows.grnItemCalStatus,
                isOnSiteGRN: selectedRows.isOnSiteGRN,
                grnItemSOPNo: selectedRows.grnItemSOPNo,
                grnItemStandardRef: selectedRows.grnItemStandardRef,

            }));
            const plantItems = itemPlantList.filter(item => item.itemPlant === selectedRows.grnPlant)
            setSelectedPlantItems(plantItems)
            const distinctItemNames = [... new Set(plantItems.map(item => item.itemAddMasterName))]
            setItemNameList(distinctItemNames)
            console.log(distinctItemNames)
        }
    };

    useEffect(() => {
        settingGrnData();
    }, [selectedRows, itemPlantList]);


    console.log(grnEditData)






    const [itemAddDetails, setItemAddDetails] = useState({
        grnList: "",
        grnImteNo: ""
    })




    const [vendorDataList, setVendorDataList] = useState([])

    const vendorFetchData = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/vendor/getVendorByPlants`, { allowedPlants: allowedPlants }
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
        setGrnEditData((prev) => ({ ...prev, [name]: value }));
    }

    const setPartyData = async (id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getVendorById/${id}`
            );
            console.log(response)
            setGrnEditData((prev) => ({
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






    //











    const [confirmSubmit, setConfirmSubmit] = useState(false)


    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")





    console.log(grnEditData)
    const handleEditGrnItemChange = (e) => {
        const { name, value } = e.target;


        if (name === "grnItemStatus") {


            if (value === "Calibrated") {
                setGrnEditData((prev) => ({
                    ...prev,
                    [name]: value,
                    grnItemId: selectedRows.grnItemId,
                    grnItemAddMasterName: selectedRows.grnItemAddMasterName,
                    grnItemIMTENo: selectedRows.grnItemIMTENo,
                    grnItemType: selectedRows.grnItemType,
                    grnItemRangeSize: selectedRows.grnItemRangeSize,
                    grnItemRangeSizeUnit: selectedRows.grnItemRangeSizeUnit,
                    grnItemMFRNo: selectedRows.grnItemMFRNo,
                    grnItemLC: selectedRows.grnItemLC,
                    grnItemLCUnit: selectedRows.grnItemLCUnit,
                    grnItemMake: selectedRows.grnItemMake,
                    grnItemModelNo: selectedRows.grnItemModelNo,



                    grnItemCalFreInMonths: selectedRows.grnItemCalFreInMonths,
                    grnItemCalFrequencyType: selectedRows.grnItemCalFrequencyType,
                    grnItemCalAlertDays: selectedRows.grnItemCalAlertDays,
                    grnItemCalibrationSource: selectedRows.grnItemCalibrationSource,
                    grnItemCalibrationDoneAt: selectedRows.grnItemCalibrationDoneAt,
                    grnItemCalibratedAt: selectedRows.grnItemCalibratedAt,
                    grnAcCriteria: selectedRows.grnAcCriteria,
                    grnItemUncertainty: selectedRows.grnItemUncertainty,
                    grnItemUncertaintyUnit: selectedRows.grnItemUncertaintyUnit,
                    grnItemCalDate: selectedRows.grnItemCalDate,
                    grnItemDueDate: selectedRows.grnItemDueDate,
                    grnItemCertificateStatus: selectedRows.grnItemCertificateStatus,
                    grnItemCertificateNo: selectedRows.grnItemCertificateNo,
                    grnItemCertificate: selectedRows.grnItemCertificate,

                    grnItemCalStatus: selectedRows.grnItemCalStatus
                }))
            } else {

                console.log("else", selectedRows)
                setGrnEditData((prev) => ({
                    ...prev,
                    [name]: value,
                    grnItemId: selectedRows.grnItemId,
                    grnItemAddMasterName: selectedRows.grnItemAddMasterName,
                    grnItemIMTENo: selectedRows.grnItemIMTENo,
                    grnItemType: selectedRows.grnItemType,
                    grnItemRangeSize: selectedRows.grnItemRangeSize,
                    grnItemRangeSizeUnit: selectedRows.grnItemRangeSizeUnit,
                    grnItemMFRNo: selectedRows.grnItemMFRNo,
                    grnItemLC: selectedRows.grnItemLC,
                    grnItemLCUnit: selectedRows.grnItemLCUnit,
                    grnItemMake: selectedRows.grnItemMake,
                    grnItemModelNo: selectedRows.grnItemModelNo,



                    grnItemCalFreInMonths: selectedRows.grnItemCalFreInMonths,
                    grnItemCalFrequencyType: selectedRows.grnItemCalFrequencyType,
                    grnItemCalAlertDays: selectedRows.grnItemCalAlertDays,
                    grnItemCalibrationSource: selectedRows.grnItemCalibrationSource,
                    grnItemCalibrationDoneAt: selectedRows.grnItemCalibrationDoneAt,
                    grnItemCalibratedAt: selectedRows.grnItemCalibratedAt,
                    grnItemOBType: selectedRows.grnItemOBType,
                    grnAcCriteria: selectedRows.grnAcCriteria,
                    grnItemUncertainty: selectedRows.grnItemUncertainty,
                    grnItemUncertaintyUnit: selectedRows.grnItemUncertaintyUnit,
                    grnItemCalDate: selectedRows.grnItemCalDate,
                    grnItemDueDate: selectedRows.grnItemDueDate,
                    grnItemCertificateStatus: selectedRows.grnItemCertificateStatus,
                    grnItemCertificateNo: selectedRows.grnItemCertificateNo,
                    grnItemCertificate: selectedRows.grnItemCertificate,

                    grnItemCalStatus: selectedRows.grnItemCalStatus
                }))
            }





        } else {
            setGrnEditData((prev) => ({ ...prev, [name]: value }))
        }



    }

    useEffect(() => {
        calculateResultDate(grnEditData.grnItemCalDate, grnEditData.grnItemCalFreInMonths);
    }, [grnEditData.grnItemCalDate, grnEditData.grnItemCalFreInMonths]);

    const calculateResultDate = (itemCalDate, itemCalFreInMonths) => {
        const parsedDate = dayjs(itemCalDate);
        if (grnEditData.grnItemCalFrequencyType === "months") {
            if (parsedDate.isValid() && !isNaN(parseInt(itemCalFreInMonths))) {
                const calculatedDate = parsedDate.add(parseInt(itemCalFreInMonths, 10), 'month').subtract(1, 'day');
                console.log(calculatedDate)
                setGrnEditData((prev) => ({
                    ...prev,
                    grnItemDueDate: calculatedDate.format('YYYY-MM-DD'),
                }));
            }
        } else {
            if (grnEditData.grnItemCalFrequencyType === "days") {
                if (parsedDate.isValid() && !isNaN(parseInt(itemCalFreInMonths))) {
                    const calculatedDate = parsedDate.add(parseInt(itemCalFreInMonths, 10), 'day').subtract(1, 'day');
                    console.log(calculatedDate)
                    setGrnEditData((prev) => ({
                        ...prev,
                        grnItemDueDate: calculatedDate.format('YYYY-MM-DD'),
                    }));
                }

            }

        }
    };




    useEffect(() => {
        if (grnEditData.grnAcCriteria !== undefined) {
            const ifRejected = grnEditData.grnAcCriteria.some((item) => item.rowStatus === "notOk");
            const isEmpty = grnEditData.grnAcCriteria.some((item) => item.rowStatus === "");

            if (ifRejected) {
                setGrnEditData((prev) => ({ ...prev, grnItemCalStatus: "rejected" }));
            } else if (isEmpty) {
                setGrnEditData((prev) => ({ ...prev, grnItemCalStatus: "status" }));
            } else {
                setGrnEditData((prev) => ({ ...prev, grnItemCalStatus: "accepted" }));
            }
        }
    }, [grnEditData.grnAcCriteria]);

    console.log(grnEditData)









    const handleGrnCertificate = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {


            const formData = new FormData();
            if (grnEditData.grnItemCertificateNo) {
                formData.append("calCertificateNo", grnEditData.grnItemCertificateNo)
            }
            formData.append('file', selectedFile);
            try {
                axios.post(`${process.env.REACT_APP_PORT}/upload/itemCertificatesIH`, formData)
                    .then(response => {
                        // setCertMessage("Certificate Uploaded Successfully")
                        setGrnEditData((prev) => ({ ...prev, grnItemCertificate: response.data.name }));
                    })
                    .catch(error => {
                        // setCertMessage("Error Uploading Certificate")
                    });
            } catch (error) {
                console.error('Error uploading the file:', error);
            }

        }
    };

   


    const changeGrnData = (index, name, value) => {



        setGrnEditData((prev) => {
            const updateAC = [...prev.grnAcCriteria]
            updateAC[index] = {
                ...updateAC[index], [name]: value,
            };
            return {
                ...prev, grnAcCriteria: updateAC,
            };
        })


        //setting rowStatus for referenceStandard
        if (grnEditData.grnItemType === "referenceStandard") {
            if (name === "grnAverageOB") {
                setGrnEditData(prev => {
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
                setGrnEditData(prev => {
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
        if (grnEditData.grnItemType === "attribute") {
            if (name === "grnAverageOB") {
                setGrnEditData(prev => {
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
                setGrnEditData(prev => {
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

        if (grnEditData.grnItemType === "variable") {

            if (name === "grnOBError") {
                setGrnEditData(prev => {
                    const updatedData = prev.grnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""

                            const isAverageInRange = parseFloat(item.grnOBError) >= parseFloat(item.grnMinPSError) &&
                                parseFloat(item.grnOBError) <= parseFloat(item.grnMaxPSError);

                            if (item.grnOBError === "") {
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






    const updateGrnData = async () => {
        try {
            const response = await axios.put(

                `${process.env.REACT_APP_PORT}/itemGrn/updateItemGRN/${selectedRows._id}`, grnEditData
            );
            console.log(response.data)
            setAlertMessage(response.data.message)
            setSnackBarOpen(true)
            grnListFetchData()
            setGrnEditData(initialGrnEditData)

            setTimeout(() => setGrnEditOpen(false), 3000)
        } catch (err) {
            console.log(err);
        }
    };








    console.log(grnEditData)







    return (

        <Dialog fullScreen keepMounted maxWidth="xl" open={grnEditOpen} onc sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setGrnEditOpen(false)
                }
            }}>
            <DialogTitle align='center' >GRN Edit</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setGrnEditOpen(false)}
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
                                                    id="grnPartyRefNoId"
                                                    defaultValue=""
                                                    value={grnEditData.grnPartyRefNo}
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
                                                    value={dayjs(grnEditData.grnPartyRefDate)}
                                                    onChange={(newValue) =>
                                                        setGrnEditData((prev) => ({ ...prev, grnPartyRefDate: newValue.format("YYYY-MM-DD") }))
                                                    }
                                                    label="Party Ref Date"
                                                    //onChange={handleGrnChange}


                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    format="DD-MM-YYYY" />



                                            </div>





                                            <div className=" col-6 ">

                                                <TextField label="Party Name"
                                                    id="grnPartyNameId"
                                                    select
                                                    value={grnEditData.grnPartyId}
                                                    disabled
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
                                                    value={grnEditData.grnPartyCode}
                                                    disabled
                                                    fullWidth
                                                    name="grnPartyCode" />

                                            </div>


                                        </div>



                                        <div className="col-12">

                                            <TextField label="PartyAddress"
                                                id="grnPartyAddressId"

                                                disabled
                                                size="small"
                                                onChange={handleGrnChange}
                                                value={grnEditData.grnPartyAddress}
                                                sx={{ width: "100%" }}
                                                name="grnPartyAddress" />

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
                                                    id="grnNoId"
                                                    disabled
                                                    value={grnEditData.grnNo}
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

                                                    value={dayjs(grnEditData.grnPartyRefDate)}
                                                    onChange={(newValue) =>
                                                        setGrnEditData((prev) => ({ ...prev, grnDate: newValue.format("YYYY-MM-DD") }))
                                                    }
                                                    label="GRN Date"
                                                    //onChange={handleGrnChange}


                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    format="DD-MM-YYYY" />



                                            </div>
                                            <div className='col-md-12'>
                                                <TextField label="Common Remarks"
                                                    id="grnCommonRemarksId"

                                                    defaultValue=""
                                                    onChange={handleGrnChange}
                                                    value={grnEditData.grnCommonRemarks}
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
                                    <div className='col'>
                                        <TextField label="Plant Wise"
                                            id="grnPlantId"

                                            select
                                            value={grnEditData.grnPlant}
                                            disabled
                                            fullWidth
                                            onChange={handleEditGrnItemChange}
                                            size="small"
                                            name="grnPlant" >

                                            <MenuItem value="all">All</MenuItem>
                                            {loggedEmp.plantDetails.map((item, index) => (
                                                <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                            ))}
                                        </TextField>
                                    </div>

                                    <div className="col">

                                        <TextField label="Imte No"
                                            id="grnItemIdId"

                                            defaultValue=""
                                            fullWidth
                                            size="small"
                                            disabled={itemAddDetails.grnList === ""}
                                            onChange={handleEditGrnItemChange}
                                            value={grnEditData.grnItemIMTENo}
                                            name="grnItemId" >



                                        </TextField>
                                    </div>
                                    <div className='col'>
                                        <TextField label="Item Name"
                                            id="grnItemAddMasterNameId"
                                            value={grnEditData.grnItemAddMasterName}
                                            fullWidth
                                            className='me-2'
                                            size="small"
                                            name="grnItemAddMasterName"
                                            disabled
                                        >
                                        </TextField>

                                    </div>

                                    <div className="col">
                                        <TextField size='small' fullWidth variant='outlined' className='me-2' defaultValue="" id="grnItemStatusId" value={grnEditData.grnItemStatus} onChange={handleEditGrnItemChange} select label="Grn Item Status" name='grnItemStatus' >
                                            <MenuItem value="select">Select</MenuItem>
                                            <MenuItem value="Calibrated">Calibrated</MenuItem>
                                            <MenuItem value="Serviced">Serviced</MenuItem>
                                            <MenuItem value="Not Servicable">Not Servicable</MenuItem>
                                            <MenuItem value="Not Calibrated">Not Calibrated</MenuItem>
                                            <MenuItem value="Other Reason">Other Reason</MenuItem>
                                        </TextField>
                                    </div>
                                    <div className='col'>
                                        {grnEditData.grnItemStatus !== "Calibrated" && grnEditData.grnItemStatus !== "" && (
                                            <TextField
                                                size='small'
                                                fullWidth
                                                variant='outlined'
                                                defaultValue=""
                                                id="grnAssingStatusId"
                                                value={grnEditData.grnAssingStatus}
                                                onChange={handleEditGrnItemChange}
                                                select
                                                label="Changes Status"
                                                name='grnAssingStatus'
                                            >
                                                <MenuItem value="all">All</MenuItem>
                                                <MenuItem value="active">Active</MenuItem>
                                                <MenuItem value="spare">Spare</MenuItem>
                                                <MenuItem value="breakdown">Breakdown</MenuItem>
                                                <MenuItem value="missing">Missing</MenuItem>
                                                <MenuItem value="rejection">Rejection</MenuItem>
                                                <MenuItem value="scrap">Scrap</MenuItem>
                                            </TextField>
                                        )}

                                    </div>




                                </div>
                                {grnEditData.grnItemStatus === "Calibrated" ?
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
                                                    value={dayjs(grnEditData.grnItemCalDate)}
                                                    onChange={(newValue) => setGrnEditData((prev) => ({ ...prev, grnItemCalDate: newValue.format('YYYY-MM-DD') }))}
                                                />

                                            </div>
                                            <div className="col-md-2">

                                                <DatePicker
                                                    fullWidth
                                                    id="grnItemDueDateId"
                                                    name="grnItemDueDate"
                                                    label="Next Cal Date"
                                                    // sx={{ width: "100%" }}
                                                    value={dayjs(grnEditData.grnItemDueDate)}
                                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                    format="DD-MM-YYYY"
                                                    onChange={(newValue) => setGrnEditData((prev) => ({ ...prev, grnItemDueDate: newValue.format('YYYY-MM-DD') }))}
                                                />


                                            </div>
                                            <div className='col-md-2'>
                                                <TextField size='small' fullWidth variant='outlined' id="grnItemCertificateStatusId" value={grnEditData.grnItemCertificateStatus} onChange={handleEditGrnItemChange} select label="Certificate Status" name='grnItemCertificateStatus'>
                                                    <MenuItem value="received">Received</MenuItem>
                                                    <MenuItem value="notReceived">Not Received</MenuItem>

                                                </TextField>
                                            </div>

                                            {grnEditData.grnItemCertificateStatus === "received" ? <React.Fragment>
                                                <div className="col-md-2">

                                                    <TextField label="Certificate No"
                                                        value={grnEditData.grnItemCertificateNo}
                                                        id="grnItemCertificateNoId"
                                                        defaultValue=""
                                                        size="small"
                                                        fullWidth
                                                        onChange={handleEditGrnItemChange}
                                                        name="grnItemCertificateNo" />

                                                </div>
                                                <div className='col-md-2 d-flex'>
                                                    <TextField fullWidth label="Uncertainity" id='grnItemUncertaintyId' variant='outlined' size='small'  value={grnEditData.grnItemUncertainty} onChange={handleEditGrnItemChange} name='grnItemUncertainty' />
                                                    <TextField
                                                        select
                                                        size='small'
                                                        variant='outlined'
                                                        label="Unit"
                                                        name='grnItemUncertaintyUnit'
                                                        onChange={handleEditGrnItemChange}
                                                        style={{ width: "60%" }}
                                                        value={grnEditData.grnItemUncertaintyUnit}
                                                    >
                                                        <MenuItem value="">None</MenuItem>
                                                        {units.map((unit, index) => (
                                                            <MenuItem key={index} value={unit.unitName}>{unit.unitName}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                </div>

                                                <div className='col-md-2' >
                                                    {(grnEditData.grnItemCertificate !== "" && grnEditData.grnItemCertificate !== undefined) ?
                                                        <Chip
                                                            className='mt-2'
                                                            icon={<Done />}
                                                            size='large'
                                                            color="success"
                                                            label={grnEditData.grnItemCertificate}
                                                            onClick={() => {
                                                                const fileUrl = `${process.env.REACT_APP_PORT}/certificates/${grnEditData.grnItemCertificate}`;
                                                                window.open(fileUrl, '_blank'); // Opens the file in a new tab/window
                                                            }}
                                                            onDelete={() => setGrnEditData((prev) => ({ ...prev, grnItemCertificate: "" }))}
                                                            deleteIcon={<Delete color='error' />}
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
                                                    {grnEditData.grnItemType === "attribute" &&
                                                        <tbody >
                                                            <tr>
                                                                <th width="20%" rowSpan={2}>Parameter</th>
                                                                <th width="10%" rowSpan={2}>Range/Size</th>
                                                                <th width="10%" rowSpan={2}>Unit</th>
                                                                <th colSpan={3} width="30%">Permissible Size</th>
                                                                <th width="20%" colSpan={grnEditData.grnItemOBType === "average" ? 1 : 2}>Observed Size</th>
                                                                <th width="10%" rowSpan={2}>Status</th>
                                                            </tr>
                                                            <tr>
                                                                <th width="6%">Min</th>
                                                                <th width="6%">Max</th>
                                                                <th width="10%">Wear Limit</th>
                                                                {grnEditData.grnItemOBType === "average" ?
                                                                    <React.Fragment>
                                                                        <th>Average</th>
                                                                    </React.Fragment> :
                                                                    <React.Fragment>
                                                                        <th>Min</th>
                                                                        <th>Max</th>
                                                                    </React.Fragment>}

                                                            </tr>
                                                            {/* {grnEditData.grnAcCriteria.map((item)=> ()} */}
                                                            {grnEditData.grnAcCriteria.map((item, index) => {
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

                                                                        {grnEditData.grnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} name='grnBeforeCalibration' /></td>}
                                                                        {grnEditData.grnItemOBType === "average" &&
                                                                            <td><input className='form-control form-control-sm' name='grnAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
                                                                        }
                                                                        {grnEditData.grnItemOBType === "minmax" &&
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


                                                    {grnEditData.grnItemType === "variable" &&

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
                                                            {grnEditData.grnAcCriteria.map((item, index) => {

                                                                let averageColor = "";
                                                                if (parseFloat(item.grnOBError) >= parseFloat(item.grnMinPSError) && parseFloat(item.grnOBError) <= parseFloat(item.grnMaxPSError)) {
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
                                                                        <td><input className='form-control form-control-sm' name='grnOBError' value={item.grnOBError} style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
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

                                                    {grnEditData.grnItemType === "referenceStandard" &&
                                                        <tbody>
                                                            <tr>

                                                                <th width="20%" rowSpan={2}>Parameter</th>
                                                                <th width="10%" rowSpan={2}>Range/Size</th>
                                                                <th width="10%" rowSpan={2}>Unit</th>
                                                                <th colSpan={2}>Permissible Size</th>
                                                                {grnEditData.grnBeforeData === "yes" && <th width="10%" rowSpan={2}>Before Calibration</th>}
                                                                <th width="20%" colSpan={grnEditData.grnItemOBType === "average" ? 1 : 2}>Observed Size</th>
                                                                <th width="10%" rowSpan={2}>Status</th>
                                                            </tr>
                                                            <tr>
                                                                <th width="6%">Min</th>
                                                                <th width="6%">Max</th>

                                                                {grnEditData.grnItemOBType === "average" ?
                                                                    <React.Fragment>
                                                                        <th>Average</th>
                                                                    </React.Fragment> :
                                                                    <React.Fragment>
                                                                        <th>Min</th>
                                                                        <th>Max</th>
                                                                    </React.Fragment>}

                                                            </tr>
                                                            {/* {grnEditData.grnselectedGrnItem.map((item)=> ()} */}
                                                            {grnEditData.grnAcCriteria.map((item, index) => {
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

                                                                        {grnEditData.grnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} name='grnBeforeCalibration' /></td>}
                                                                        {grnEditData.grnItemOBType === "average" &&
                                                                            <td><input className='form-control form-control-sm' name='grnAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
                                                                        }
                                                                        {grnEditData.grnItemOBType === "minmax" &&
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
                                                    <TextField size='small' onChange={handleEditGrnItemChange} inputProps={{ sx: { color: grnEditData.grnItemCalStatus === "status" ? "" : grnEditData.grnItemCalStatus === "accepted" ? "green" : "red" } }} fullWidth variant='outlined' id="grnItemCalStatusId" select label="Calibration Status" name='grnItemCalStatus' value={grnEditData.grnItemCalStatus}>
                                                        <MenuItem value="status">Status</MenuItem>
                                                        <MenuItem value="accepted">Accepted</MenuItem>
                                                        <MenuItem value="rejected">Rejected</MenuItem>


                                                    </TextField>
                                                </div>






                                            </div>


                                        </div>
                                    </React.Fragment> : ""}
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
                                    Are you sure to Update ?
                                </DialogTitle>

                                <DialogActions className='d-flex justify-content-center'>
                                    <Button onClick={() => setConfirmSubmit(false)}>Cancel</Button>
                                    <Button onClick={(e) => { updateGrnData(e); setConfirmSubmit(false) }} autoFocus>
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




                        </form>
                    </LocalizationProvider>

                </div>
            </DialogContent >
            <DialogActions className='d-flex justify-content-between'>
                <div>

                </div>
                <div>
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setGrnEditOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { setConfirmSubmit(true) }}>Update</Button>
                </div>
            </DialogActions>

        </Dialog >
    )
}

export default GrnEdit