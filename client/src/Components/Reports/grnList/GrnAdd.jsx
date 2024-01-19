import React, { createContext, useEffect, useState, useContext } from 'react'
import { Container, Box, Alert, Button, Dialog, DialogActions, DialogContent, InputLabel, Chip, DialogContentText, Radio, RadioGroup, FormControl, Select, DialogTitle, OutlinedInput, IconButton, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Switch, TextField, Slide } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GrnListContent } from './GrnList';
import { useEmployee } from '../../../App';
import styled from '@emotion/styled';

import { Add, Close, CloudUpload, Delete, Done, OtherHouses } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const GrnAdd = () => {
    const grnAddDatas = useContext(GrnListContent)
    const { grnOpen, setGrnOpen, selectedRows, grnListFetchData, itemPlantList,dcStatus } = grnAddDatas
    const employeeRole = useEmployee()
    const { loggedEmp } = employeeRole

    // const [grnImtes, setGrnImtes] = useState(selectedRows)



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
        grnPartyItems: []

    }


    const [grnAddData, setGrnAddData] = useState({
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
        setGrnAddData((prev) => ({ ...prev, [name]: value }));
    }

    const setPartyData = async (id) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getVendorById/${id}`
            );
            console.log(response)
            setGrnAddData((prev) => ({
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






    // const [grnList, setGrnList] = useState({})
    // const grnFetchData = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${process.env.REACT_APP_PORT}/itemGRN/getAllItemGRN`
    //         );
    //         setGrnList(response.data.result);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // useEffect(() => {
    //     grnFetchData();
    // }, []);



    // const [itemAddList, setItemAddList] = useState([]);



    // const itemAddFetch = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByIMTESort`
    //         );
    //         // You can use a different logic for generating the id

    //         setItemAddList(response.data.result);


    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // useEffect(() => {
    //     itemAddFetch();
    // }, []);


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

    const [allItemImtes, setAllItemImtes] = useState([])

    const [selectedGrnItem, setSelectedGrnItem] = useState({
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
        grnItemCalStatus: "",

    })










    //
    const getItemByName = async (value) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemAddByName`, { itemItemMasterName: value }
            );
            console.log(response.data)
            const dcFilter = response.data.result.filter((item) => item.dcStatus === "1")
            const remainingIMTE = dcFilter.filter(item =>
                !grnAddData.grnPartyItems.some(grn => grn.grnItemId === item._id)
            );
            setAllItemImtes(remainingIMTE)

            console.log()

        } catch (err) {
            console.log(err);
        }
    };









    const [itemNameList, setItemNameList] = useState(itemPlantList)
    const handleGrnItemAdd = (e) => {
        const { name, value } = e.target;
        setItemAddDetails((prev) => ({ ...prev, [name]: value }))
       
        if (name === "itemPlant") {
            // Set the selected itemPlant in state
            setItemAddDetails((prev) => ({ ...prev, grnPlant: value }));
            const plantItems = itemPlantList.filter(item => item.itemPlant === value)
            
            const distinctItemNames = [... new Set(plantItems.map(item => item.itemAddMasterName))]
            setItemNameList(distinctItemNames)
            console.log(distinctItemNames)
            console.log(plantItems)
        }

        if (name === "grnList") {
            getItemByName(value)

        }

        if (name === "grnItemStatus") {

            const fetchedData = allItemImtes.filter((item) => item._id === selectedGrnItem.grnItemId)
            if (value === "Calibrated") {
                setSelectedGrnItem(
                    {
                        [name]: value,
                        grnItemId: fetchedData[0]._id,
                        grnItemIMTENo: fetchedData[0].itemIMTENo,
                        grnItemAddMasterName: fetchedData[0].itemAddMasterName,
                        grnItemType: fetchedData[0].itemType,
                        grnItemRangeSize: fetchedData[0].itemRangeSize,
                        grnItemItemMFRNo: fetchedData[0].itemMFRNo,
                        grnItemLC: fetchedData[0].itemLC,
                        grnItemMake: fetchedData[0].itemMake,

                        grnItemCalFreInMonths: fetchedData[0].itemCalFreInMonths,
                        grnItemUncertainity: fetchedData[0].uncertainty,
                        grnItemCalibratedAt: fetchedData[0].itemCalibratedAt,
                        grnItemSOPNo: fetchedData[0].SOPNo,
                        grnStandardRef: fetchedData[0].standardRef,
                        grnItemOBType: fetchedData[0].itemOBType,


                        grnAcCriteria:

                            fetchedData[0].acceptanceCriteria.map((item) => (
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
                        grnItemCalDate: dayjs().format("YYYY-MM-DD"),
                        grnItemDueDate: "",
                        grnItemCertificateStatus: "",
                        grnItemCertificateNo: "",
                        grnItemCertificate: "",
                        grnUncertainity: "",
                        grnItemCalStatus: ""


                    }

                )
            } else {
                setSelectedGrnItem({
                    [name]: value,
                    grnItemId: fetchedData[0]._id,
                    grnItemIMTENo: fetchedData[0].itemIMTENo,
                    grnItemAddMasterName: fetchedData[0].itemAddMasterName,
                    grnItemType: fetchedData[0].itemType,
                    grnItemRangeSize: fetchedData[0].itemRangeSize,
                    grnItemItemMFRNo: fetchedData[0].itemMFRNo,
                    grnItemLC: fetchedData[0].itemLC,
                    grnItemMake: fetchedData[0].itemMake,
                    grnItemCalFreInMonths: fetchedData[0].itemCalFreInMonths,
                    grnItemUncertainity: fetchedData[0].uncertainty,
                    grnItemCalibratedAt: fetchedData[0].itemCalibratedAt,
                    grnItemSOPNo: fetchedData[0].SOPNo,
                    grnStandardRef: fetchedData[0].standardRef,
                    grnItemOBType: fetchedData[0].itemOBType,


                    grnAcCriteria:

                        fetchedData[0].acceptanceCriteria.map((item) => (
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
                    grnItemCalDate: dayjs().format("YYYY-MM-DD"),
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




    const grnItemAdd = () => {
        if (setSelectedGrnItem.length !== 0) {
            setGrnAddData((prev) => ({ ...prev, grnPartyItems: [...prev.grnPartyItems, selectedGrnItem] }))
            nonSelectedItems();
            setSelectedGrnItem([]);
        }

    }
    useEffect(() => {
        setSelectedGrnItem([])
        nonSelectedItems();
        setItemAddDetails({
            grnList: "",
            grnImteNo: ""
        })
    }, [grnAddData.grnPartyItems])



    //nonSelecte 
    const nonSelectedItems = () => {
        const remainingMasters = allItemImtes.filter(item =>
            !grnAddData.grnPartyItems.some(grn => grn.grnItemId === item._id)
        );
        setAllItemImtes(remainingMasters)
    }
    useEffect(() => {
        nonSelectedItems()
    }, [grnAddData.grnPartyItems])

    //row delete

    const deleteAC = (index) => {
        setGrnAddData((prev) => {
            const AC = [...prev.grnPartyItems]
            AC.splice(index, 1);
            return {
                ...prev, grnPartyItems: AC,

            };
        })
        nonSelectedItems();
    };

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





    const [addConfirmSubmit, setAddConfirmSubmit] = useState(false)
    const [errorhandler, setErrorHandler] = useState({})

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState({
        message: "",
        type: ""
    })
    const [errors, setErrors] = useState({})
    const validateFunction = () => {
        let tempErrors = {};
        tempErrors.grnPartyRefNo = grnAddData.grnPartyRefNo ? "" : "GRN Party Name is Required"
        tempErrors.grnPartyName = grnAddData.grnPartyName ? "" : "GRN Party Name is Required"
        tempErrors.grnPartyCode = grnAddData.grnPartyCode ? "" : "GRN Party Code is Required"
        tempErrors.grnPartyAddress = grnAddData.grnPartyAddress ? "" : "GRN Party Address is Required"
        tempErrors.grnNo = grnAddData.grnNo ? "" : "GRN Number is Required"
        tempErrors.grnPartyItems = grnAddData.grnPartyItems.length !== 0 ? "" : "GRN Item Required"

        setErrors({ ...tempErrors })

        return Object.values(tempErrors).every(x => x === "")
    }

    const submitGrnForm = async () => {
        try {
            if (validateFunction()) {
                const response = await axios.post(

                    `${process.env.REACT_APP_PORT}/itemGRN/createItemGRN`, grnAddData
                );
                console.log(response.data)
                setAlertMessage({ message: response.data.message, type: "success" })
                setSnackBarOpen(true)

                grnListFetchData()
                setGrnAddData(initialGrnData)
                setTimeout(() => setGrnOpen(false), 1000)
            } else {
                setAlertMessage({ message: "Fill the required fields to submit", type: "error" })
                setSnackBarOpen(true)
            }
        } catch (err) {
            console.log(err);
        }
    };

    const changeACValue = (index, name, value) => {

        setSelectedGrnItem((prev) => {
            const updateAC = [...prev.grnAcCriteria]
            updateAC[index] = {
                ...updateAC[index], [name]: value,
            };
            return {
                ...prev, grnAcCriteria: updateAC,
            };
        })


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


        //
        if (selectedGrnItem.grnItemType === "variable") {

            if (name === "grnAcAverageOB") {
                setSelectedGrnItem(prev => {
                    const updatedData = prev.grnAcCriteria.map((item, idx) => {
                        if (idx === index) {
                            let status = ""

                            const isAverageInRange = parseFloat(item.grnAcAverageOB) >= parseFloat(item.grnAcMinPSError) &&
                                parseFloat(item.grnAcAverageOB) <= parseFloat(item.grnAcMaxPSError);

                            if (item.grAcAverageOB === "") {
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







    };

    const [certMessage, setCertMessage] = useState(null)

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
                        setCertMessage("Certificate Uploaded Successfully")
                        console.log("Certificate Uploaded Successfully")
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

        <Dialog fullScreen keepMounted maxWidth="xl" TransitionComponent={Transition} open={grnOpen} sx={{ color: "#f1f4f4" }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setGrnOpen(false)
                }
            }}>
            <DialogTitle align='center' >GRN Add</DialogTitle>
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





            <DialogContent sx={{ width: "100%" }}>
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

                                                {/* <TextField label="Party Ref No"
                                                    id="grnPartyRefNoId"
                                                    defaultValue=""
                                                    value={grnAddData.grnPartyRefNo}
                                                    {...(errors.grnPartyRefNo !== "" && { helperText: errors.grnPartyRefNo, error: true })}
                                                    //  sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth
                                                    onChange={handleGrnChange}
                                    name="grnPartyRefNo" />*/}

                                                <TextField
                                                    label="Party Ref No"
                                                    id="grnPartyRefNoId"
                                                    defaultValue=""
                                                    value={grnAddData.grnPartyRefNo}
                                                    {...(errors.grnPartyRefNo !== "" && { helperText: errors.grnPartyRefNo, error: true })}
                                                    size="small"
                                                    fullWidth
                                                    onChange={handleGrnChange}
                                                    name="grnPartyRefNo"
                                                    onBlur={() => {
                                                        if (grnAddData.grnPartyRefNo !== '') {
                                                            // Set errors to an empty string if the value is provided
                                                            // This prevents the error message from displaying when the field has content
                                                            setErrors((prevErrors) => ({
                                                                ...prevErrors,
                                                                grnPartyRefNo: '',
                                                            }));
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="col-6">

                                                <DatePicker

                                                    fullWidth
                                                    id="grnPartyRefDateId"
                                                    name="grnPartyRefDate"
                                                    value={dayjs(grnAddData.grnPartyRefDate)}
                                                    onChange={(newValue) =>
                                                        setGrnAddData((prev) => ({ ...prev, grnPartyRefDate: newValue.format("YYYY-MM-DD") }))
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
                                                    //  value={grnAddData.grnPartyName}

                                                    onChange={(e) => setPartyData(e.target.value)}

                                                    //  sx={{ width: "100%" }}
                                                    size="small"
                                                    fullWidth
                                                    {...(errors.grnPartyName !== "" && { helperText: errors.grnPartyName, error: true })}
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
                                                    value={grnAddData.grnPartyCode}
                                                    {...(errors.grnPartyCode !== "" && { helperText: errors.grnPartyCode, error: true })}

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
                                                value={grnAddData.grnPartyAddress}
                                                sx={{ width: "100%" }}
                                                {...(errors.grnPartyAddress !== "" && { helperText: errors.grnPartyAddress, error: true })}
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
                                                    value={grnAddData.grnNo}
                                                    size="small"
                                                    {...(errors.grnPartyCode !== "" && { helperText: errors.grnPartyCode, error: true })}
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
                                                    value={dayjs(grnAddData.grnPartyRefDate)}
                                                    onChange={(newValue) =>
                                                        setGrnAddData((prev) => ({ ...prev, grnDate: newValue.format("YYYY-MM-DD") }))
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
                                                    value={grnAddData.grnCommonRemarks}
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


                                    <div className='col'>
                                        <TextField label="Plant Wise"
                                            id="itemPlantId"
                                            select
                                            defaultValue="all"

                                            fullWidth
                                            onChange={handleGrnItemAdd}
                                            size="small"
                                            name="itemPlant" >
                                            <MenuItem value="all">All</MenuItem>
                                            {loggedEmp.plantDetails.map((item, index) => (
                                                <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div className='col '>
                                        <TextField size='small' fullWidth variant='outlined' defaultValue="" value={itemAddDetails.grnList} id="grnListId" onChange={handleGrnItemAdd} {...(errors.grnPartyItems !== "" && { helperText: errors.grnPartyItems, error: true })} select label="Item List" name='grnList'>

                                            {itemNameList.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))}

                                        </TextField>
                                    </div>
                                    <div className='col'>
                                        <TextField label="Imte No"
                                            id="grnItemIdId"
                                            select
                                           
                                            fullWidth
                                            size="small"
                                            disabled={itemAddDetails.grnList === ""}
                                            onChange={handleGrnItemAdd}
                                            value={selectedGrnItem.grnItemId}
                                            name="grnItemId" >

                                            {allItemImtes.length === 0 ?
                                                <MenuItem disabled><em>No IMTE Available</em></MenuItem> :
                                                allItemImtes.map((item, index) => (
                                                    <MenuItem key={index} value={item._id}>{item.itemIMTENo}</MenuItem>
                                                ))}

                                        </TextField>
                                    </div>
                                    <div className='col '>
                                        <TextField size='small' fullWidth variant='outlined' disabled={selectedGrnItem.grnItemId === ""} defaultValue="" id="grnItemStatusId" value={selectedGrnItem.grnItemStatus} onChange={handleGrnItemAdd} select label="Grn Item Status" name='grnItemStatus' >
                                            <MenuItem value="">Select</MenuItem>
                                            <MenuItem value="Calibrated">Calibrated</MenuItem>
                                            <MenuItem value="Serviced">Serviced</MenuItem>
                                            <MenuItem value="Not Servicable">Not Servicable</MenuItem>
                                            <MenuItem value="Not Calibrated">Not Calibrated</MenuItem>
                                        </TextField>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">


                                        <Button disabled={selectedGrnItem.grnItemStatus === "" || selectedGrnItem.grnItemStatus === undefined} startIcon={<Add />} color='warning' onClick={() => grnItemAdd()} sx={{ minWidth: "130px" }} variant='contained'>Add Item</Button>

                                    </div>





                                </div>
                                {selectedGrnItem.grnItemStatus === "Calibrated" ?
                                    <React.Fragment>
                                        <div className='row g-2 '>
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
                                                <TextField size='small' fullWidth variant='outlined' id="grnItemCertificateStatusId" onChange={handleGrnItemAdd} select label="Certificate Status" name='grnItemCertificateStatus'>
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
                                                        onChange={handleGrnItemAdd}
                                                        name="grnItemCertificateNo" />

                                                </div>
                                                <div className='col-md-2'>
                                                    <TextField fullWidth label="Uncertainity" id='grnUncertainityId' variant='outlined' size='small' onChange={handleGrnItemAdd} name='grnUncertainity' />

                                                </div>
                                                <div className='col-md-2' >
                                                    <Button helperText="Hello" component="label" fullWidth variant="contained" startIcon={<CloudUpload />} >
                                                        Upload Certificate
                                                        <VisuallyHiddenInput type="file" onChange={handleGrnCertificate} />
                                                    </Button>
                                                    <div className='d-flex justify-content-center '>
                                                        {(selectedGrnItem.grnItemCertificate !== "" && selectedGrnItem.grnItemCertificate !== undefined) &&
                                                            <Chip
                                                                className='mt-2'
                                                                icon={<Done />}
                                                                color="success"
                                                                label={selectedGrnItem.grnItemCertificate}
                                                                onClick={() => {
                                                                    const fileUrl = `${process.env.REACT_APP_PORT}/grnCertificates/${selectedGrnItem.grnItemCertificate}`;
                                                                    window.open(fileUrl, '_blank'); // Opens the file in a new tab/window
                                                                }}
                                                                onDelete={() => setSelectedGrnItem((prev) => ({ ...prev, grnItemCertificate: "" }))}
                                                            />}
                                                    </div>
                                                </div>
                                            </React.Fragment> : ""}
                                        </div>


                                        <div className='row'>
                                            <h5 className='text-center'>Calibration Data</h5>
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

                                                                    {selectedGrnItem.grnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeACValue(index, e.target.name, e.target.value)} name='grnBeforegrnibration' /></td>}
                                                                    {selectedGrnItem.grnItemOBType === "average" &&
                                                                        <td><input className='form-control form-control-sm' name='grnAcAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                                    }
                                                                    {selectedGrnItem.grnItemOBType === "minmax" &&
                                                                        <React.Fragment>
                                                                            <td>
                                                                                <input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} name="grnAcMinOB" onChange={(e) => changeACValue(index, e.target.name, e.target.value)} />
                                                                            </td>
                                                                            <td>
                                                                                <input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} name="grnAcMaxOB" onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
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
                                                                    <td><input className='form-control form-control-sm' name='grnAcAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
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

                                                                    {selectedGrnItem.grnBeforeData === "yes" && <td><input className='form-control form-control-sm' onChange={(e) => changeACValue(index, e.target.name, e.target.value)} name='grnBeforeCalibration' /></td>}
                                                                    {selectedGrnItem.grnItemOBType === "average" &&
                                                                        <td><input className='form-control form-control-sm' name='grnAcAverageOB' style={{ color: averageColor, fontWeight: "bold" }} onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
                                                                    }
                                                                    {selectedGrnItem.grnItemOBType === "minmax" &&
                                                                        <React.Fragment>
                                                                            <td><input className='form-control form-control-sm' style={{ color: minColor, fontWeight: "bold" }} name="grnAcMinOB" onChange={(e) => changeACValue(index, e.target.name, e.target.value)} />
                                                                            </td> <td><input className='form-control form-control-sm' style={{ color: maxColor, fontWeight: "bold" }} name="grnAcMaxOB" onChange={(e) => changeACValue(index, e.target.name, e.target.value)} /></td>
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

                                            <div className='col-3 '>
                                                <TextField size='small' inputProps={{ sx: { color: selectedGrnItem.grnItemCalStatus === "status" ? "" : selectedGrnItem.grnItemCalStatus === "accepted" ? "green" : "red" } }} fullWidth variant='outlined' id="grnItemCalStatusId" select label="Calibration Status" name='grnItemCalStatus' value={selectedGrnItem.grnItemCalStatus}>
                                                    <MenuItem value="status">Status</MenuItem>
                                                    <MenuItem value="accepted">Accepted</MenuItem>
                                                    <MenuItem value="rejected">Rejected</MenuItem>
                                                </TextField>
                                            </div>





                                        </div>



                                    </React.Fragment> : ""}
                                <Dialog
                                    open={addConfirmSubmit}
                                    onClose={(e, reason) => {
                                        console.log(reason)
                                        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                                            setAddConfirmSubmit(false)
                                        }
                                    }}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        Are you sure to submit ?
                                    </DialogTitle>

                                    <DialogActions className='d-flex justify-content-center'>
                                        <Button onClick={() => setAddConfirmSubmit(false)} >Cancel</Button>
                                        <Button onClick={(e) => { submitGrnForm(e); setAddConfirmSubmit(false) }} autoFocus>
                                            Submit
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={3000}
                                    onClose={() => setTimeout(() => {
                                        setSnackBarOpen(false)
                                    }, 3000)}>
                                    <Alert onClose={() => setSnackBarOpen(false)} variant='filled' severity={alertMessage.type} sx={{ width: '100%' }}>
                                        {alertMessage.message}
                                    </Alert>
                                </Snackbar>

                            </Paper>
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
                                        </tr>
                                        {grnAddData.grnPartyItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.grnItemIMTENo}</td>
                                                <td>{item.grnItemAddMasterName}</td>
                                                <td>{item.grnItemRangeSize}</td>
                                                <td>{item.grnItemCertificateNo}</td>
                                                <td>{dayjs(item.grnItemCalDate).format("DD-MM-YYYY")}</td>
                                                <td>{dayjs(item.grnItemDueDate).format("DD-MM-YYYY")}</td>
                                                <td>{item.grnItemCalibratedAt}</td>
                                                <td width="5%"><Delete color='error' onClick={() => deleteAC(index)} /></td>
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
                    <Button variant='contained' color='error' className='me-3' onClick={() => { setGrnOpen(false) }}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => { setAddConfirmSubmit(true) }}>Submit</Button>
                </div>
            </DialogActions>

        </Dialog>
    )
}

export default GrnAdd