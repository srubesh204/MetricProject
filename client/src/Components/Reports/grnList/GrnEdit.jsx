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


const GrnEdit = () => {
    const grnEditDatas = useContext(GrnListContent)
    const { grnEditOpen, setGrnEditOpen, selectedRows, grnListFetchData, itemPlantList } = grnEditDatas
    const empRole = useEmployee()
    const { employee, loggedEmp } = empRole

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
        grnCalDate: dayjs().format("YYYY-MM-DD"),
        grnDueDate: "",
        grnCertificateStatus: "",
        grnCertificateNo: "",
        grnUncertainity: "",
        grnPlant: "",
        grnDepartment: "",
        grnPartyItems: []

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
        grnUncertainity: "",
        grnPlant: "",
        grnDepartment: "",
        grnPartyItems: []
    })

    const [selectedPlantItems, setSelectedPlantItems] = useState([])
    console.log(selectedRows)
    const settingGrnData = () => {
        if (selectedRows.length !== 0) { // Check if selectedRows is defined
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
                grnUncertainity: selectedRows.grnUncertainity,
                grnPartyItems: selectedRows.grnPartyItems,
              grnPlant: selectedRows.grnPlant
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
    }, [selectedRows]);



    const addDcValue = () => {
        if (selectedExtraMaster.length !== 0) {
            setGrnEditData((prev) => ({
                ...prev,
                dcPartyItems: [...prev.dcPartyItems, selectedExtraMaster]
            }))
            setSelectedExtraMaster([])
        }
    }

    const deleteGrnPartyItems = (index) => {
        setGrnEditData((prev) => {
            const AC = [...prev.grnPartyItems]
            AC.splice(index, 1);
            return {
                ...prev, grnPartyItems: AC,
            };
        })

    };





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
    const [itemImtes, setItemImtes] = useState([])
    const [selectedGrnItem, setSelectedGrnItem] = useState({
        grnItemStatus: "",
        grnItemId: "",
        grnItemIMTENo: "",
        grnItemAddMasterName: "",
        grnItemType: "",
        grnItemRangeSize: "",
        grnItemItemMFRNo: "",
        grnItemLC: "",
        grnItemMake: "",
        grnItemCalFreInMonths: "",
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
                grnAcBeforeCalibration: "",
                grnAcMinOB: "",
                grnAcMaxOB: "",
                grnAcAverageOB: "",
                grnAcOBError: "",
                grnAcMinPSError: "",
                grnAcMaxPSError: "",
                rowStatus: ""
            }
        ],
        grnItemCalDate: "",
        grnItemDueDate: "",
        grnItemCertificateStatus: "",
        grnItemCertificateNo: "",
        grnItemCertificate: "",
        grnUncertainity: "",
        grnItemCalStatus: ""
    })

    console.log(selectedGrnItem)
    //
    const getItemByName = async (value) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByName`, { itemItemMasterName: value }
            );
            console.log(response.data)
            setAllItemImtes(response.data.result)
            // const filteredImtes = response.data.result.filter((imtes) => !grnEditData.grnPartyItems.some(grnImte => imtes._id === grnImte._id))
            const dcStatus = response.data.result.filter((item) => item.dcStatus === "1" && (item.grnStatus === "0" || item.grnStatus === "" || item.grnStatus === undefined))
            setItemImtes(dcStatus)

        } catch (err) {
            console.log(err);
        }
    };

    const nonSelectedItems = () => {

        const remainingMasters = itemImtes.filter(item =>
            !grnEditData.grnPartyItems.some(grn => grn.grnItemId === item._id)
        );
        setItemImtes(remainingMasters)
    }
    useEffect(() => {
        nonSelectedItems()
    }, [grnEditData.grnPartyItems])





    const grnItemAdd = () => {
        if (setSelectedGrnItem.length !== 0) {
            setGrnEditData((prev) => ({ ...prev, grnPartyItems: [...prev.grnPartyItems, selectedGrnItem] }))
        }
    }
    useEffect(() => {
        setSelectedGrnItem([])
        setItemAddDetails({
            grnList: "",
            grnImteNo: ""
        })
    }, [grnEditData.grnPartyItems])


    const [confirmSubmit, setConfirmSubmit] = useState(false)
    const [errorhandler, setErrorHandler] = useState({})

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const handleGrnItemChange = (e) => {
        const { name, value } = e.target;
        // if (name === "grnPlant") {
        //     // Set the selected itemPlant in state
        //     setGrnEditData((prev) => ({ ...prev, grnPlant: value }));
        //     const plantItems = itemPlantList.filter(item => item.itemPlant === value)

        //     const distinctItemNames = [... new Set(plantItems.map(item => item.itemAddMasterName))]
        //     setItemNameList(distinctItemNames)
        //     console.log(distinctItemNames)
        //     console.log(plantItems)
        // }
        setItemAddDetails((prev) => ({ ...prev, [name]: value }))
        if (name === "grnList") {
            getItemByName(value)

        }

        if (name === "grnItemStatus") {
            const fetchedData = allItemImtes.filter((item) => item._id === selectedGrnItem.grnItemId)
            console.log(fetchedData)

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
                            grnAcParameter: item.acParameter,
                            grnAcNominalSize: item.acNominalSize,
                            grnAcNominalSizeUnit: item.acNominalSizeUnit,
                            grnAcMinPS: item.acMinPS,
                            grnAcMaxPS: item.acMaxPS,
                            grnAcWearLimitPS: item.acWearLimitPS,
                            grnAcBeforeCalibration: "",
                            grnAcMinOB: item.acMinOB,
                            grnAcMaxOB: item.acMaxOB,
                            grnAcAverageOB: item.acAverageOB,
                            grnAcOBError: item.acOBError,
                            grnAcMinPSError: item.acMinPSError,
                            grnAcMaxPSError: item.acMaxPSError,
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
                            grnAcParameter: item.acParameter,
                            grnAcNominalSize: item.acNominalSize,
                            grnAcNominalSizeUnit: item.acNominalSizeUnit,
                            grnAcMinPS: item.acMinPS,
                            grnAcMaxPS: item.acMaxPS,
                            grnAcWearLimitPS: item.acWearLimitPS,
                            grnAcBeforegrnibration: "",
                            grnAcMinOB: item.acMinOB,
                            grnAcMaxOB: item.acMaxOB,
                            grnAcAverageOB: item.acAverageOB,
                            grnAcOBError: item.acOBError,
                            grnAcMinPSError: item.acMinPSError,
                            grnAcMaxPSError: item.acMaxPSError,
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

    const [editableSelectedGrn, setEditableSelectedGrn] = useState()
    {/* const [tempItem, setTempItem] = useState([])
console.log(tempItem)*/}
    console.log(selectedGrnItem)
    const handleEditGrnItemChange = (e) => {
        const { name, value } = e.target;


        if (name === "grnItemStatus") {

            let itemData = { data: [] }; // Assuming itemData is an object with a 'data' property

            const getItemById = async (dataObj) => {
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_PORT}/itemAdd/getItemAddById/${editGrnId}`
                    );
                    dataObj.data = response.data.result; // Update the 'data' property
                    console.log(dataObj.data); // Inside the function, it will reflect the changes
                } catch (err) {
                    console.log(err);
                }
            };

            getItemById(itemData)
                .then(() => {
                    if (value === "Calibrated") {

                        console.log("calibration")


                        setSelectedGrnItem((prev) => ({
                            ...prev,
                            [name]: value,
                            grnItemId: itemData.data._id,
                            grnItemAddMasterName: itemData.data.itemAddMasterName,
                            grnItemIMTENo: itemData.data.itemIMTENo,
                            grnItemType: itemData.data.itemType,
                            grnItemRangeSize: itemData.data.itemRangeSize,
                            grnItemRangeSizeUnit: itemData.data.itemRangeSizeUnit,
                            grnItemMFRNo: itemData.data.itemMFRNo,
                            grnItemLC: itemData.data.itemLC,
                            grnItemLCUnit: itemData.data.itemLCUnit,
                            grnItemMake: itemData.data.itemMake,
                            grnItemModelNo: itemData.data.itemModelNo,

                            grnItemDepartment: itemData.data.itemDepartment,
                            grnItemArea: itemData.data.itemArea,
                            grnItemPlaceOfUsage: itemData.data.itemPlaceOfUsage,
                            grnItemCalFreInMonths: itemData.data.itemCalFreInMonths,
                            grnItemCalAlertDays: itemData.data.itemCalAlertDays,
                            grnItemCalibrationSource: itemData.data.itemCalibrationSource,
                            grnItemCalibrationDoneAt: itemData.data.itemCalibrationDoneAt,
                            grnItemCalibratedAt: itemData.data.itemCalibratedAt,
                            grnItemOBType: itemData.data.itemOBType,
                            grnAcCriteria: itemData.data.acceptanceCriteria.map((item) => (
                                {
                                    grnAcParameter: item.acParameter,
                                    grnAcNominalSize: item.acNominalSize,
                                    grnAcNominalSizeUnit: item.acNominalSizeUnit,
                                    grnAcMinPS: item.acMinPS,
                                    grnAcMaxPS: item.acMaxPS,
                                    grnAcWearLimitPS: item.acWearLimitPS,
                                    grnAcBeforeCalibration: "",
                                    grnAcMinOB: "",
                                    grnAcMaxOB: "",
                                    grnAcAverageOB: "",
                                    grnAcOBError: "",
                                    grnAcMinPSError: item.acMinPSError,
                                    grnAcMaxPSError: item.acMaxPSError,
                                    rowStatus: ""
                                }
                            )),
                            grnItemUncertainity: itemData.data.itemUncertainity,
                            grnItemCalDate: dayjs().format("YYYY-MM-DD"),
                            grnItemDueDate: "",
                            grnItemCertificateStatus: "",
                            grnItemCertificateNo: "",
                            grnItemCertificate: "",
                            grnUncertainity: "",
                            grnItemCalStatus: ""
                        }))
                    } else {

                        console.log("else", itemData)
                        setSelectedGrnItem((prev) => ({
                            ...prev,
                            [name]: value,
                            grnItemId: itemData.data._id,
                            grnItemAddMasterName: itemData.data.itemAddMasterName,
                            grnItemIMTENo: itemData.data.itemIMTENo,
                            grnItemType: itemData.data.itemType,
                            grnItemRangeSize: itemData.data.itemRangeSize,
                            grnItemRangeSizeUnit: itemData.data.itemRangeSizeUnit,
                            grnItemMFRNo: itemData.data.itemMFRNo,
                            grnItemLC: itemData.data.itemLC,
                            grnItemLCUnit: itemData.data.itemLCUnit,
                            grnItemMake: itemData.data.itemMake,
                            grnItemModelNo: itemData.data.itemModelNo,

                            grnItemDepartment: itemData.data.itemDepartment,
                            grnItemArea: itemData.data.itemArea,
                            grnItemPlaceOfUsage: itemData.data.itemPlaceOfUsage,
                            grnItemCalFreInMonths: itemData.data.itemCalFreInMonths,
                            grnItemCalAlertDays: itemData.data.itemCalAlertDays,
                            grnItemCalibrationSource: itemData.data.itemCalibrationSource,
                            grnItemCalibrationDoneAt: itemData.data.itemCalibrationDoneAt,
                            grnItemCalibratedAt: "",
                            grnItemOBType: itemData.data.itemOBType,
                            grnAcCriteria: itemData.data.acceptanceCriteria.map((item) => (
                                {
                                    grnAcParameter: item.acParameter,
                                    grnAcNominalSize: item.acNominalSize,
                                    grnAcNominalSizeUnit: item.acNominalSizeUnit,
                                    grnAcMinPS: item.acMinPS,
                                    grnAcMaxPS: item.acMaxPS,
                                    grnAcWearLimitPS: item.acWearLimitPS,
                                    grnAcBeforeCalibration: "",
                                    grnAcMinOB: item.acMinOB,
                                    grnAcMaxOB: item.acMaxOB,
                                    grnAcAverageOB: item.acAverageOB,
                                    grnAcOBError: item.acOBError,
                                    grnAcMinPSError: item.acMinPSError,
                                    grnAcMaxPSError: item.acMaxPSError,
                                    rowStatus: ""
                                }
                            )),
                            grnItemUncertainity: itemData.data.itemUncertainity,
                            grnItemCalDate: "",
                            grnItemDueDate: "",
                            grnItemCertificateStatus: "",
                            grnItemCertificateNo: "",
                            grnItemCertificate: "",
                            grnUncertainity: "",
                            grnItemCalStatus: ""
                        }))
                    }
                });




        } else {
            setSelectedGrnItem((prev) => ({ ...prev, [name]: value }))
        }



    }

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


    useEffect(() => {
        calculateResultDate(selectedGrnItem.grnItemCalDate, selectedGrnItem.grnItemCalFreInMonths);
    }, [selectedGrnItem.grnItemCalDate, selectedGrnItem.grnItemCalFreInMonths]);

    useEffect(() => {
        if (selectedGrnItem.grnAcCriteria !== undefined) {
            const ifRejected = selectedGrnItem.grnAcCriteria.some((item) => item.rowStatus === "notOk");
            const isEmpty = selectedGrnItem.grnAcCriteria.some((item) => item.rowStatus === "");

            if (ifRejected) {
                setSelectedGrnItem((prev) => ({ ...prev, grnItemCalStatus: "rejected" }));
            } else if (isEmpty) {
                setSelectedGrnItem((prev) => ({ ...prev, grnItemCalStatus: "status" }));
            } else {
                setSelectedGrnItem((prev) => ({ ...prev, grnItemCalStatus: "accepted" }));
            }
        }
    }, [selectedGrnItem.grnAcCriteria]);

    console.log(selectedGrnItem)

    const grnEditItem = () => {
        if (setSelectedGrnItem.length !== 0) {
            const updatedItems = [...grnEditData.grnPartyItems];
            updatedItems[editIndex] = selectedGrnItem;
            setGrnEditData({ ...grnEditData, grnPartyItems: updatedItems });
            setSelectedGrnItem([]); // Clear the edited item after update
            setEditIndex(null)
            setEditGrnId(null)
        }
    }
    const grnEditCancel = () => {
        setSelectedGrnItem([]); // Clear the edited item after update
        setEditIndex(null)
        setEditGrnId(null)
    }






    const handleGrnCertificate = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log("working")
            setSelectedGrnItem((prev) => ({ ...prev, grnItemCertificate: selectedFile.name }));
            const fileURL = URL.createObjectURL(selectedFile);


            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                axios.post(`${process.env.REACT_APP_PORT}/upload/grnItemCertificateUp`, formData)
                    .then(response => {
                        // setCertMessage("Certificate Uploaded Successfully")
                        console.log("Certificate Uploaded Successfully")
                    })
                    .catch(error => {
                        // setCertMessage("Error Uploading Certificate")
                        console.log("Error")
                    });
            } catch (error) {
                console.error('Error uploading the file:', error);
            }

        }
    };


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
            if (name === "grnAcAverageOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.grnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""

                            const isAverageInRange = parseFloat(item.grnAcAverageOB) >= parseFloat(item.grnAcMinPS) &&
                                parseFloat(item.grnAcAverageOB) <= parseFloat(item.grnAcMaxPS);

                            if (item.grnAcAverageOB === "") {
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

            if (name === "grnAcMinOB" || name === "grnAcMaxOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.grnAcCriteria.map((item, idx) => {
                        if (idx === index) {

                            const isMinInRange = parseFloat(item.grnAcMinOB) >= parseFloat(item.grnAcMinPS) &&
                                parseFloat(item.grnAcMinOB) <= parseFloat(item.grnAcMaxPS);
                            const isMaxInRange = parseFloat(item.grnAcMaxOB) >= parseFloat(item.grnAcMinPS) &&
                                parseFloat(item.grnAcMaxOB) <= parseFloat(item.grnAcMaxPS);


                            let status = ""

                            if (item.grnAcMaxOB === "" && item.grnAcMinOB === "") {
                                status = "";
                            } else if (item.grnAcMaxOB === "") {
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
            if (name === "grnAcAverageOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.grnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""
                            if (item.grnAcWearLimitPS !== "") {

                                if (item.grnAcWearLimitPS <= item.grnAcMinPS) {
                                    const isAverageInRange = parseFloat(item.grnAcAverageOB) >= parseFloat(item.grnAcWearLimitPS) &&
                                        parseFloat(item.grnAcAverageOB) <= parseFloat(item.grnAcMaxPS);

                                    if (item.grnAcAverageOB === "") {
                                        status = ""
                                    } else {
                                        if (isAverageInRange) {
                                            status = "ok"
                                        } else {
                                            status = "notOk"
                                        }
                                    }
                                }

                                if (item.grnAcWearLimitPS >= item.grnAcMaxPS) {
                                    const isAverageInRange = parseFloat(item.grnAcAverageOB) <= parseFloat(item.grnAcWearLimitPS) &&
                                        parseFloat(item.grnAcAverageOB) >= parseFloat(item.grnAcMinPS);

                                    if (item.grnAcAverageOB === "") {
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
                                const isAverageInRange = parseFloat(item.grnAcAverageOB) >= parseFloat(item.grnAcMinPS) &&
                                    parseFloat(item.grnAcAverageOB) <= parseFloat(item.grnAcMaxPS);

                                if (item.grnAcAverageOB === "") {
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

            if (name === "grnAcMinOB" || name === "grnAcMaxOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.grnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""
                            if (item.grnAcWearLimitPS !== "") {

                                if (item.grnAcWearLimitPS <= item.grnAcMinPS) {


                                    const isMinInRange = parseFloat(item.grnAcMinOB) >= parseFloat(item.grnAcWearLimitPS) &&
                                        parseFloat(item.grnAcMinOB) <= parseFloat(item.grnAcMaxPS);
                                    const isMaxInRange = parseFloat(item.grnAcMaxOB) >= parseFloat(item.grnAcWearLimitPS) &&
                                        parseFloat(item.grnAcMaxOB) <= parseFloat(item.grnAcMaxPS);



                                    if (isMinInRange && isMaxInRange) {
                                        status = "ok"
                                    } else {
                                        status = "notOk"
                                    }

                                }

                                if (item.grnAcWearLimitPS >= item.grnAcMaxPS) {
                                    const isMinInRange = parseFloat(item.grnAcMinOB) <= parseFloat(item.grnAcWearLimitPS) &&
                                        parseFloat(item.grnAcMinOB) >= parseFloat(item.grnAcMinPS);
                                    const isMaxInRange = parseFloat(item.grnAcMaxOB) <= parseFloat(item.grnAcWearLimitPS) &&
                                        parseFloat(item.grnAcMaxOB) >= parseFloat(item.grnAcMinPS);



                                    if (isMinInRange && isMaxInRange) {
                                        status = "ok"
                                    } else {
                                        status = "notOk"
                                    }

                                }
                                const isMinInRange = parseFloat(item.grnAcMinOB) >= parseFloat(item.grnAcMinPS) &&
                                    parseFloat(item.grnAcMinOB) <= parseFloat(item.grnAcMaxPS);
                                const isMaxInRange = parseFloat(item.grnAcMaxOB) >= parseFloat(item.grnAcMinPS) &&
                                    parseFloat(item.grnAcMaxOB) <= parseFloat(item.grnAcMaxPS);

                                return {
                                    ...item,
                                    rowStatus: status,
                                };

                            } else {
                                const isMinInRange = parseFloat(item.grnAcMinOB) >= parseFloat(item.grnAcMinPS) &&
                                    parseFloat(item.grnAcMinOB) <= parseFloat(item.grnAcMaxPS);
                                const isMaxInRange = parseFloat(item.grnAcMaxOB) >= parseFloat(item.grnAcMinPS) &&
                                    parseFloat(item.grnAcMaxOB) <= parseFloat(item.grnAcMaxPS);




                                if (item.grnAcMaxOB === "" && item.grnAcMinOB === "") {
                                    status = "";
                                } else if (item.grnAcMaxOB === "") {
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

            if (name === "grnAcAverageOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.grnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""

                            const isAverageInRange = parseFloat(item.grnAcAverageOB) >= parseFloat(item.grnAcMinPSError) &&
                                parseFloat(item.grnAcAverageOB) <= parseFloat(item.grnAcMaxPSError);

                            if (item.grnAcAverageOB === "") {
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

    const [editGrnId, setEditGrnId] = useState(null)
    const [editIndex, setEditIndex] = useState(null)
    console.log(editableSelectedGrn, editGrnId)
    const handleGrnItemEdit = (item, index) => {
        setSelectedGrnItem((prev) => ({
            ...prev,
            grnItemStatus: item.grnItemStatus,
            grnItemId: item.grnItemId,
            grnItemAddMasterName: item.grnItemAddMasterName,
            grnItemIMTENo: item.grnItemIMTENo,
            grnItemType: item.grnItemType,
            grnItemRangeSize: item.grnItemRangeSize,
            grnItemRangeSizeUnit: item.grnItemRangeSizeUnit,
            grnItemMFRNo: item.grnItemMFRNo,
            grnItemLC: item.grnItemLC,
            grnItemLCUnit: item.grnItemLCUnit,
            grnItemMake: item.grnItemMake,
            grnItemModelNo: item.grnItemModelNo,

            grnItemDepartment: item.grnItemDepartment,
            grnItemArea: item.grnItemArea,
            grnItemPlaceOfUsage: item.grnItemPlaceOfUsage,
            grnItemCalFreInMonths: item.grnItemCalFreInMonths,
            grnItemCalAlertDays: item.grnItemCalAlertDays,
            grnItemCalibrationSource: item.grnItemCalibrationSource,
            grnItemCalibrationDoneAt: item.grnItemCalibrationDoneAt,
            grnItemCalibratedAt: item.grnItemCalibratedAt,
            grnItemOBType: item.grnItemOBType,
            grnAcCriteria: item.grnAcCriteria.map((item) => (
                {
                    grnAcParameter: item.grnAcParameter,
                    grnAcNominalSize: item.grnAcNominalSize,
                    grnAcNominalSizeUnit: item.grnAcNominalSizeUnit,
                    grnAcMinPS: item.grnAcMinPS,
                    grnAcMaxPS: item.grnAcMaxPS,
                    grnAcWearLimitPS: item.grnAcWearLimitPS,
                    grnAcBeforeCalibration: item.grnAcBeforeCalibration,
                    grnAcMinOB: item.grnAcMinOB,
                    grnAcMaxOB: item.grnAcMaxOB,
                    grnAcAverageOB: item.grnAcAverageOB,
                    grnAcOBError: item.grnAcOBError,
                    grnAcMinPSError: item.grnAcMinPSError,
                    grnAcMaxPSError: item.grnAcMaxPSError,
                    rowStatus: item.rowStatus
                }
            )),
            grnItemUncertainity: item.grnItemUncertainity,
            grnItemCalDate: item.grnItemCalDate,
            grnItemDueDate: item.grnItemDueDate,
            grnItemCertificateStatus: item.grnItemCertificateStatus,
            grnItemCertificateNo: item.grnItemCertificateNo,
            grnItemCertificate: item.grnItemCertificate,
            grnUncertainity: item.grnUncertainity,
            grnItemCalStatus: item.grnItemCalStatus
        }))
        setSelectedGrnItem({ ...item })
        setEditGrnId(item.grnItemId)
        setEditIndex(index)
        console.log(item)
    }











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

                                                    fullWidth
                                                    name="grnPartyCode" />

                                            </div>


                                        </div>



                                        <div className="col-12">

                                            <TextField label="PartyAddress"
                                                id="grnPartyAddressId"
                                                defaultValue=""
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
                                                    defaultValue=""
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
                                            <TextField size='small' fullWidth variant='outlined' defaultValue="" inputProps={{ readOnly: true }} id="grnItemStatusId" value={selectedGrnItem.grnItemIMTENo} label="IMTE No" name='grnItemStatus' >

                                            </TextField>
                                        </div>
                                        <div className="col-md-2">
                                            <TextField size='small' fullWidth variant='outlined' defaultValue="" id="grnItemStatusId" value={selectedGrnItem.grnItemStatus} onChange={handleEditGrnItemChange} select label="Grn Item Status" name='grnItemStatus' >
                                                <MenuItem value="select">Select</MenuItem>
                                                <MenuItem value="Calibrated">Calibrated</MenuItem>
                                                <MenuItem value="Serviced">Serviced</MenuItem>
                                                <MenuItem value="Not Servicable">Not Servicable</MenuItem>
                                                <MenuItem value="Not Calibrated">Not Calibrated</MenuItem>
                                                <MenuItem value="Other Reason">Other Reason</MenuItem>
                                            </TextField>
                                        </div>
                                        {selectedGrnItem.grnItemStatus === "Calibrated" &&
                                            <React.Fragment>
                                                <div className="col">
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
                                                <div className="col">
                                                    <DatePicker
                                                        fullWidth
                                                        id="grnItemDueDateId"
                                                        name="grnItemDueDate"
                                                        label="Next Cal Date"
                                                        value={dayjs(selectedGrnItem.grnItemDueDate)}
                                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                        format="DD-MM-YYYY"
                                                        onChange={(newValue) => setSelectedGrnItem((prev) => ({ ...prev, grnItemDueDate: newValue.format('YYYY-MM-DD') }))}
                                                    />
                                                </div>
                                                <div className='col'>
                                                    <TextField size='small' fullWidth variant='outlined' id="grnItemCertificateStatusId" value={selectedGrnItem.grnItemCertificateStatus} onChange={handleEditGrnItemChange} select label="Certificate Status" name='grnItemCertificateStatus'>
                                                        <MenuItem value="received">Received</MenuItem>
                                                        <MenuItem value="notReceived">Not Received</MenuItem>
                                                    </TextField>
                                                </div>


                                            </React.Fragment>}

                                        <div className={selectedGrnItem.grnItemStatus === "Calibrated" ? "col-md-3 d-flex justify-content-end" : "col-md-7 d-flex justify-content-end"}>

                                            <Button startIcon={<Add />} className='me-2' color='warning' onClick={() => grnEditItem()} sx={{ minWidth: "130px" }} variant='contained'>Update Item</Button>
                                            <Button color='error' onClick={() => grnEditCancel()} sx={{ minWidth: "130px" }} variant='contained'>Cancel</Button>
                                        </div>



                                    </div>
                                    {selectedGrnItem.grnItemStatus === "Calibrated" &&
                                        <React.Fragment>

                                            {selectedGrnItem.grnItemCertificateStatus === "received" ?
                                                <div className="row g-2 ">
                                                    <div className="col-md-3">

                                                        <TextField label="Certificate No"
                                                            value={selectedGrnItem.grnItemCertificateNo}
                                                            id="grnItemCertificateNoId"

                                                            size="small"
                                                            fullWidth
                                                            onChange={handleEditGrnItemChange}
                                                            name="grnItemCertificateNo" />

                                                    </div>
                                                    <div className='col-md-3'>
                                                        <TextField fullWidth label="Uncertainity" id='grnUncertainityId' value={selectedGrnItem.grnUncertainity} variant='outlined' size='small' onChange={handleEditGrnItemChange} name='grnUncertainity' />

                                                    </div>

                                                    <div className='col-md-3' >
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
                                                    </div>
                                                </div>
                                                : ""}








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
                                                                    if (item.grnAcWearLimitPS !== "") {

                                                                        if (item.grnAcWearLimitPS < item.grnAcMinPS) {
                                                                            size = "OD"
                                                                        } else {
                                                                            size = "ID"
                                                                        }

                                                                        if (size === "OD") {
                                                                            //min OD condition
                                                                            if (item.grnAcMinOB >= item.grnAcWearLimitPS && item.grnAcMinOB < item.grnAcMinPS) {
                                                                                minColor = "orange"
                                                                            }
                                                                            else if (item.grnAcMinOB >= item.grnAcMinPS && item.grnAcMinOB <= item.grnAcMaxPS) {
                                                                                minColor = "green"
                                                                            } else {
                                                                                minColor = "red"
                                                                            }

                                                                            if (item.grnAcMaxOB >= item.grnAcWearLimitPS && item.grnAcMaxOB < item.grnAcMinPS) {
                                                                                maxColor = "orange"
                                                                            }
                                                                            else if (item.grnAcMaxOB >= item.grnAcMinPS && item.grnAcMaxOB <= item.grnAcMaxPS) {
                                                                                maxColor = "green"
                                                                            } else {
                                                                                maxColor = "red"
                                                                            }

                                                                            if (item.grnAcAverageOB >= item.grnAcWearLimitPS && item.grnAcAverageOB < item.grnAcMinPS) {
                                                                                averageColor = "orange"
                                                                            }
                                                                            else if (item.grnAcAverageOB >= item.grnAcMinPS && item.grnAcAverageOB <= item.grnAcMaxPS) {
                                                                                averageColor = "green"
                                                                            } else {
                                                                                averageColor = "red"
                                                                            }


                                                                        }

                                                                        if (size === "ID") {
                                                                            //min Id condition
                                                                            if (item.grnAcMinOB <= item.grnAcWearLimitPS && item.grnAcMinOB > item.grnAcMaxPS) {
                                                                                minColor = "orange"
                                                                            }
                                                                            else if (item.grnAcMinOB >= item.grnAcMinPS && item.grnAcMinOB <= item.grnAcMaxPS) {
                                                                                minColor = "green"
                                                                            } else {
                                                                                minColor = "red"
                                                                            }
                                                                            //max ID condition
                                                                            if (item.grnAcMaxOB <= item.grnAcWearLimitPS && item.grnAcMaxOB > item.grnAcMaxPS) {
                                                                                maxColor = "orange"
                                                                            }
                                                                            else if (item.grnAcMaxOB >= item.grnAcMinPS && item.grnAcMaxOB <= item.grnAcMaxPS) {
                                                                                maxColor = "green"
                                                                            } else {
                                                                                maxColor = "red"
                                                                            }

                                                                            if (item.grnAcAverageOB <= item.grnAcWearLimitPS && item.grnAcAverageOB > item.grnAcMaxPS) {
                                                                                averageColor = "orange"
                                                                            }
                                                                            else if (item.grnAcAverageOB >= item.grnAcMinPS && item.grnAcAverageOB <= item.grnAcMaxPS) {
                                                                                averageColor = "green"
                                                                            } else {
                                                                                averageColor = "red"
                                                                            }
                                                                        }

                                                                        //   handleStatus(index, minColor, maxColor);



                                                                    } else {


                                                                        if (parseFloat(item.grnAcMinOB) >= parseFloat(item.grnAcMinPS) && parseFloat(item.grnAcMinOB) <= parseFloat(item.grnAcMaxPS)) {
                                                                            minColor = "#4cbb17";

                                                                        } else {
                                                                            minColor = "red"

                                                                        }


                                                                        if (parseFloat(item.grnAcMaxOB) >= parseFloat(item.grnAcMinPS) && parseFloat(item.grnAcMaxOB) <= parseFloat(item.grnAcMaxPS)) {
                                                                            maxColor = "#4cbb17"

                                                                        } else {
                                                                            maxColor = "red"

                                                                        }

                                                                        if (parseFloat(item.grnAcAverageOB) >= parseFloat(item.grnAcMinPS) && parseFloat(item.grnAcAverageOB) <= parseFloat(item.grnAcMaxPS)) {
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

                                                                            {selectedGrnItem.grnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} name='grnAcBeforeCalibration' /></td>}
                                                                            {selectedGrnItem.grnItemOBType === "average" &&
                                                                                <td><input className='form-control form-control-sm' name='grnAcAverageOB' style={{ color: averageColor, fontWeight: "bold" }} value={item.grnAcAverageOB} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
                                                                            }
                                                                            {selectedGrnItem.grnItemOBType === "minmax" &&
                                                                                <React.Fragment>
                                                                                    <td>
                                                                                        <input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} value={item.grnAcMinOB} name="grnAcMinOB" onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} />
                                                                                    </td>
                                                                                    <td>
                                                                                        <input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} value={item.grnAcMaxOB} name="grnAcMaxOB" onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
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
                                                                    if (parseFloat(item.grnAcAverageOB) >= parseFloat(item.grnAcMinPSError) && parseFloat(item.grnAcAverageOB) <= parseFloat(item.grnAcMaxPSError)) {
                                                                        averageColor = "#4cbb17";
                                                                    } else {
                                                                        averageColor = "red"
                                                                    }

                                                                    return (
                                                                        <tr key={index}>

                                                                            <td>{item.grnAcParameter}</td>
                                                                            <td>{item.grnAcNominalSize}</td>
                                                                            <td>{item.grnAcNominalSizeUnit}</td>
                                                                            <td>{item.grnAcMinPSError}</td>
                                                                            <td>{item.grnAcMaxPSError}</td>
                                                                            <td><input className='form-control form-control-sm' name='grnAcAverageOB' value={item.grnAcAverageOB} style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
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

                                                                    if (parseFloat(item.grnAcAverageOB) >= parseFloat(item.grnAcMinPS) && parseFloat(item.grnAcAverageOB) <= parseFloat(item.grnAcMaxPS)) {
                                                                        averageColor = "#4cbb17";

                                                                    } else {
                                                                        averageColor = "red"

                                                                    }

                                                                    let minColor = "";

                                                                    if (parseFloat(item.grnAcMinOB) >= parseFloat(item.grnAcMinPS) && parseFloat(item.grnAcMinOB) <= parseFloat(item.grnAcMaxPS)) {
                                                                        minColor = "#4cbb17";

                                                                    } else {
                                                                        minColor = "red"

                                                                    }

                                                                    let maxColor = "";
                                                                    if (parseFloat(item.grnAcMaxOB) >= parseFloat(item.grnAcMinPS) && parseFloat(item.grnAcMaxOB) <= parseFloat(item.grnAcMaxPS)) {
                                                                        maxColor = "#4cbb17"

                                                                    } else {
                                                                        maxColor = "red"

                                                                    }


                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{item.grnAcParameter}</td>
                                                                            <td>{item.grnAcNominalSize}</td>
                                                                            <td>{item.grnAcNominalSizeUnit}</td>
                                                                            <td>{item.grnAcMinPS}</td>
                                                                            <td>{item.grnAcMaxPS}</td>

                                                                            {selectedGrnItem.grnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} name='grnAcBeforeCalibration' /></td>}
                                                                            {selectedGrnItem.grnItemOBType === "average" &&
                                                                                <td><input className='form-control form-control-sm' name='grnAcAverageOB' value={item.grnAcAverageOB} style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
                                                                            }
                                                                            {selectedGrnItem.grnItemOBType === "minmax" &&
                                                                                <React.Fragment>
                                                                                    <td><input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} value={item.grnAcMinOB} name="grnAcMinOB" onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} />
                                                                                    </td> <td><input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} value={item.grnAcMaxOB} name="grnAcMaxOB" onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
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
                                                <div className=' col d-flex justify-content-end '>


                                                    <div className='col-4 me-2'>
                                                        <TextField size='small' inputProps={{ sx: { color: selectedGrnItem.grnItemCalStatus === "status" ? "" : selectedGrnItem.grnItemCalStatus === "accepted" ? "green" : "red" } }} fullWidth variant='outlined' id="grnItemCalStatusId" select label="Calibration Status" name='grnItemCalStatus' value={selectedGrnItem.grnItemCalStatus}>
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
                                    <div className='row g-2'>
                                        <div className='col'>
                                            <TextField label="Plant Wise"
                                                id="grnPlantId"
                                               
                                                select
                                                value={grnEditData.grnPlant}
                                              disabled
                                                fullWidth
                                                onChange={handleGrnItemChange}
                                                size="small"
                                                name="grnPlant" >

                                                <MenuItem value="all">All</MenuItem>
                                                {loggedEmp.plantDetails.map((item, index) => (
                                                    <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div className="col">
                                            <TextField size='small' fullWidth variant='outlined' value={itemAddDetails.grnList} id="grnListId" onChange={handleGrnItemChange} select label="Item List" name='grnList'>

                                                {itemNameList.map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                ))}

                                            </TextField>
                                        </div>
                                        <div className="col">

                                            <TextField label="Imte No"
                                                id="grnItemIdId"
                                                select
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                disabled={itemAddDetails.grnList === ""}
                                                onChange={handleGrnItemChange}
                                                value={selectedGrnItem.grnItemId}
                                                name="grnItemId" >

                                                {allItemImtes.map((item, index) => (
                                                    <MenuItem key={index} value={item._id}>{item.itemIMTENo}</MenuItem>
                                                ))}

                                            </TextField>
                                        </div>

                                        <div className="col">
                                            <TextField size='small' fullWidth variant='outlined' defaultValue="" id="grnItemStatusId" value={selectedGrnItem.grnItemStatus} onChange={handleGrnItemChange} select label="Grn Item Status" name='grnItemStatus' >
                                                <MenuItem value="select">Select</MenuItem>
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

                                                    <div className='col-md-2' >
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
                                                                    if (item.grnAcWearLimitPS !== "") {

                                                                        if (item.grnAcWearLimitPS < item.grnAcMinPS) {
                                                                            size = "OD"
                                                                        } else {
                                                                            size = "ID"
                                                                        }

                                                                        if (size === "OD") {
                                                                            //min OD condition
                                                                            if (item.grnAcMinOB >= item.grnAcWearLimitPS && item.grnAcMinOB < item.grnAcMinPS) {
                                                                                minColor = "orange"
                                                                            }
                                                                            else if (item.grnAcMinOB >= item.grnAcMinPS && item.grnAcMinOB <= item.grnAcMaxPS) {
                                                                                minColor = "green"
                                                                            } else {
                                                                                minColor = "red"
                                                                            }

                                                                            if (item.grnAcMaxOB >= item.grnAcWearLimitPS && item.grnAcMaxOB < item.grnAcMinPS) {
                                                                                maxColor = "orange"
                                                                            }
                                                                            else if (item.grnAcMaxOB >= item.grnAcMinPS && item.grnAcMaxOB <= item.grnAcMaxPS) {
                                                                                maxColor = "green"
                                                                            } else {
                                                                                maxColor = "red"
                                                                            }

                                                                            if (item.grnAcAverageOB >= item.grnAcWearLimitPS && item.grnAcAverageOB < item.grnAcMinPS) {
                                                                                averageColor = "orange"
                                                                            }
                                                                            else if (item.grnAcAverageOB >= item.grnAcMinPS && item.grnAcAverageOB <= item.grnAcMaxPS) {
                                                                                averageColor = "green"
                                                                            } else {
                                                                                averageColor = "red"
                                                                            }


                                                                        }

                                                                        if (size === "ID") {
                                                                            //min Id condition
                                                                            if (item.grnAcMinOB <= item.grnAcWearLimitPS && item.grnAcMinOB > item.grnAcMaxPS) {
                                                                                minColor = "orange"
                                                                            }
                                                                            else if (item.grnAcMinOB >= item.grnAcMinPS && item.grnAcMinOB <= item.grnAcMaxPS) {
                                                                                minColor = "green"
                                                                            } else {
                                                                                minColor = "red"
                                                                            }
                                                                            //max ID condition
                                                                            if (item.grnAcMaxOB <= item.grnAcWearLimitPS && item.grnAcMaxOB > item.grnAcMaxPS) {
                                                                                maxColor = "orange"
                                                                            }
                                                                            else if (item.grnAcMaxOB >= item.grnAcMinPS && item.grnAcMaxOB <= item.grnAcMaxPS) {
                                                                                maxColor = "green"
                                                                            } else {
                                                                                maxColor = "red"
                                                                            }

                                                                            if (item.grnAcAverageOB <= item.grnAcWearLimitPS && item.grnAcAverageOB > item.grnAcMaxPS) {
                                                                                averageColor = "orange"
                                                                            }
                                                                            else if (item.grnAcAverageOB >= item.grnAcMinPS && item.grnAcAverageOB <= item.grnAcMaxPS) {
                                                                                averageColor = "green"
                                                                            } else {
                                                                                averageColor = "red"
                                                                            }
                                                                        }

                                                                        //   handleStatus(index, minColor, maxColor);



                                                                    } else {


                                                                        if (parseFloat(item.grnAcMinOB) >= parseFloat(item.grnAcMinPS) && parseFloat(item.grnAcMinOB) <= parseFloat(item.grnAcMaxPS)) {
                                                                            minColor = "#4cbb17";

                                                                        } else {
                                                                            minColor = "red"

                                                                        }


                                                                        if (parseFloat(item.grnAcMaxOB) >= parseFloat(item.grnAcMinPS) && parseFloat(item.grnAcMaxOB) <= parseFloat(item.grnAcMaxPS)) {
                                                                            maxColor = "#4cbb17"

                                                                        } else {
                                                                            maxColor = "red"

                                                                        }

                                                                        if (parseFloat(item.grnAcAverageOB) >= parseFloat(item.grnAcMinPS) && parseFloat(item.grnAcAverageOB) <= parseFloat(item.grnAcMaxPS)) {
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

                                                                            {selectedGrnItem.grnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} name='grnAcBeforeCalibration' /></td>}
                                                                            {selectedGrnItem.grnItemOBType === "average" &&
                                                                                <td><input className='form-control form-control-sm' name='grnAcAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
                                                                            }
                                                                            {selectedGrnItem.grnItemOBType === "minmax" &&
                                                                                <React.Fragment>
                                                                                    <td>
                                                                                        <input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} name="grnAcMinOB" onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} />
                                                                                    </td>
                                                                                    <td>
                                                                                        <input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} name="grnAcMaxOB" onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
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
                                                                    if (parseFloat(item.grnAcAverageOB) >= parseFloat(item.grnAcMinPSError) && parseFloat(item.grnAcAverageOB) <= parseFloat(item.grnAcMaxPSError)) {
                                                                        averageColor = "#4cbb17";
                                                                    } else {
                                                                        averageColor = "red"
                                                                    }

                                                                    return (
                                                                        <tr key={index}>

                                                                            <td>{item.grnAcParameter}</td>
                                                                            <td>{item.grnAcNominalSize}</td>
                                                                            <td>{item.grnAcNominalSizeUnit}</td>
                                                                            <td>{item.grnAcMinPSError}</td>
                                                                            <td>{item.grnAcMaxPSError}</td>
                                                                            <td><input className='form-control form-control-sm' name='grnAcAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
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

                                                                    if (parseFloat(item.grnAcAverageOB) >= parseFloat(item.grnAcMinPS) && parseFloat(item.grnAcAverageOB) <= parseFloat(item.grnAcMaxPS)) {
                                                                        averageColor = "#4cbb17";

                                                                    } else {
                                                                        averageColor = "red"

                                                                    }

                                                                    let minColor = "";

                                                                    if (parseFloat(item.grnAcMinOB) >= parseFloat(item.grnAcMinPS) && parseFloat(item.grnAcMinOB) <= parseFloat(item.grnAcMaxPS)) {
                                                                        minColor = "#4cbb17";

                                                                    } else {
                                                                        minColor = "red"

                                                                    }

                                                                    let maxColor = "";
                                                                    if (parseFloat(item.grnAcMaxOB) >= parseFloat(item.grnAcMinPS) && parseFloat(item.grnAcMaxOB) <= parseFloat(item.grnAcMaxPS)) {
                                                                        maxColor = "#4cbb17"

                                                                    } else {
                                                                        maxColor = "red"

                                                                    }


                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{item.grnAcParameter}</td>
                                                                            <td>{item.grnAcNominalSize}</td>
                                                                            <td>{item.grnAcNominalSizeUnit}</td>
                                                                            <td>{item.grnAcMinPS}</td>
                                                                            <td>{item.grnAcMaxPS}</td>

                                                                            {selectedGrnItem.grnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} name='grnAcBeforeCalibration' /></td>}
                                                                            {selectedGrnItem.grnItemOBType === "average" &&
                                                                                <td><input className='form-control form-control-sm' name='grnAcAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
                                                                            }
                                                                            {selectedGrnItem.grnItemOBType === "minmax" &&
                                                                                <React.Fragment>
                                                                                    <td><input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} name="grnAcMinOB" onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} />
                                                                                    </td> <td><input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} name="grnAcMaxOB" onChange={(e) => changeGrnData(index, e.target.name, e.target.value)} /></td>
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
                                </Paper>}

                            <Paper elevation={12} sx={{ p: 2 }} style={{ pointerEvents: editGrnId ? 'none' : 'auto' }} className='col-md-12'>
                                <table className='table table-bordered table-responsive text-center align-middle' >
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
                                            <th>Edit</th>
                                        </tr>

                                        {grnEditData.grnPartyItems.map((item, index) => (
                                            <tr key={index} className={editGrnId === item.grnItemId ? "table-active" : ""}>
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
                                                <th><Edit color='info' onClick={() => handleGrnItemEdit(item, index)} /></th>
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
                    <Button variant='contained' color='warning' className='me-3'>Print</Button>
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