import React, { createContext, useEffect, useState } from 'react'
import { TextField, MenuItem, Button, ButtonGroup, Backdrop, CircularProgress, LinearProgress } from '@mui/material';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
import axios from 'axios';
import { Edit, FilterAlt, PrintRounded } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { Add, ArrowBack, Error, HomeMax, House, Mail, MailLock, } from '@mui/icons-material';
import { useEmployee } from '../../App';
import styled from "@emotion/styled";
import { CloudDownload, CloudUpload, Delete, Send } from '@mui/icons-material';
import ItemListPrint from './ItemListPrint';
import ItemMail from './ItemMail';
import MailSender from '../mailComponent/MailSender';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
export const ItemListContent = createContext(null);

const ItemList = () => {


    const [StatusCheckMsg, setStatusCheckMsg] = useState("")



    const employeeRole = useEmployee()
    const { loggedEmp, allowedPlants } = employeeRole
    const [printState, setPrintState] = useState(false)
    const [loaded, setLoaded] = useState(false);


    const [itemList, setItemList] = useState([]);
    const [filteredItemListData, setFilteredItemListData] = useState([])



    const itemFetch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`, { allowedPlants: allowedPlants }
            );
            console.log(response.data.result)

            const departmentItems = response.data.result.filter(item => employeeRole.loggedEmp.plantDetails.some(plant => plant.departments.includes(item.itemDepartment)))
            console.log(departmentItems)

            const filterNames = ["itemIMTENo", "itemAddMasterName", "itemType", "itemDepartment", "itemPlant", "itemCalibrationSource", "itemCurrentLocation"]

            let updatedFilterNames = {};

            filterNames.forEach((element, index) => {
                const data = departmentItems.map(item => item[element]);
                filterNames[index] = [...new Set(data)];
                // Update the object with a dynamic key based on the 'element'
                updatedFilterNames[element] = filterNames[index];
            });
            console.log(updatedFilterNames)
            // Update state outside the loop with the updated object
            setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
            setItemList(departmentItems);
            setFilteredItemListData(departmentItems);

            setLoaded(true)

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemFetch();
    }, []);

    useEffect(() => {
        const partNos = [...new Set(departmentDatas.map(item => item.itemPartName))];
        const customerNames = [...new Set(departmentDatas.map(item => item.itemPartName))];

    })











    const [employeeList, setEmployeeList] = useState([]);
    const empFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/employee/getAllEmployees`
            );
            console.log(response.data.result)
            setEmployeeList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        empFetchData();
    }, []);

    const mailCheck = () => {
        const singlePlant = itemListSelectedRowIds.every((item, index, array) => item.itemPlant === array[0].itemPlant);

        if (singlePlant && itemListSelectedRowIds.length > 0) {
            setMailOpen(true)

        } else {
            setStatusCheckMsg("Select one plant only for sending mails")
        }


    }

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

    const [file, setFile] = useState(null);
    const [itemAddExcelStatus, setItemAddExcelStatus] = useState('');

    const handleItemAddExcel = (e) => {
        const selectedFile = e.target.files[0];

        setFile(selectedFile);
    };

    const [uploadProgress, setUploadProgress] = React.useState(0);

    const handleItemAddUpload = async () => {
        try {
            if (!file) {
                setItemAddExcelStatus('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${process.env.REACT_APP_PORT}/itemAdd/uploadItemAddInExcel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });

            setItemAddExcelStatus(response.data.message || 'Excel file uploaded successfully');
            itemFetch()
        } catch (error) {
            if (error.response) {
                setItemAddExcelStatus(`Error: ${error.response.data.error || 'Something went wrong'}`);
            } else if (error.request) {
                setItemAddExcelStatus('Network error. Please try again.');
            } else {
                setItemAddExcelStatus('Error uploading the file.');
            }
            console.log('Error uploading Excel file:', error);
        }
    };




    useEffect(() => {
        if (itemAddExcelStatus) {
            const timeoutId = setTimeout(() => {
                setItemAddExcelStatus('');
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [itemAddExcelStatus]);



    const [openModalStatus, setOpenModalStatus] = useState(false);

    const [statusInfo, setStatusInfo] = useState({

        itemStatus: "",
        itemStatusReason: ""
    })
    console.log(statusInfo)

    const updateItemStatus = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/itemAdd/updateItemStatus`, { itemIds: itemListSelectedRowIds, ...statusInfo }
            );
            setSnackBarOpen(true)
            itemFetch();
            console.log("Updated Successfully");
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            setStatusInfo({ itemStatus: "", itemStatusReason: "" })
            setOpenModalStatus(false);
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
                const errorMessages500 = Object.values(errorData500);
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err);
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }
            console.log(err);
        }
    };
    const [showDialog, setShowDialog] = useState(false);

    const oneMonthBefore = dayjs().subtract(dayjs().date() - 1, 'day');

    const [dateData, setDateData] = useState({
        fromDate: oneMonthBefore.format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD')
    })

    const [FilterNameList, setFilterNameList] = useState({
        itemIMTENo: [],
        itemType: [],
        itemDepartment: [],
        itemAddMasterName: [],
        itemPlant: [],
        itemCalibrationSource: [],
        itemCurrentLocation: []
    })
    const sortedFilterNameList = FilterNameList.itemAddMasterName.sort();



    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }



    const columns = [
        ...(employeeRole.employee !== 'viewer'
            ? [
                {
                    field: 'button',
                    headerName: 'Edit',
                    width: 60,
                    headerAlign: "center", align: "center",
                    renderCell: (params) => (
                        <Button component={Link} to={`/itemEdit/${params.id}`}>
                            <Edit color='success' />
                        </Button>
                    ),
                },
            ]
            : []),
        { field: 'id', headerName: 'Si. No', width: 60, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center" },
        { field: 'itemIMTENo', headerName: 'IMTE No', width: 180, headerAlign: "center", align: "left" },
        { field: 'itemAddMasterName', headerName: 'Description', width: 180, headerAlign: "center", align: "left" },
        {
            field: 'Range/Size',
            headerName: 'Range/Size',
            headerAlign: "center", align: "center",
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            valueGetter: (params) =>
                `${params.row.itemRangeSize || ''} ${params.row.itemLCUnit || ''}`,
        },
        { field: 'itemLC', headerName: 'ItemLC', width: 60, headerAlign: "center", align: "left", valueGetter: (params) => params.row.itemLC || "-" },
        { field: 'itemMake', headerName: 'Make', width: 90, headerAlign: "center", align: "center", },
        { field: 'itemCalDate', headerName: 'Cal Date', width: 100, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY') },
        { field: 'itemDueDate', headerName: 'Due Date', width: 110, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemDueDate).format('DD-MM-YYYY') },
        { field: 'itemCalFreInMonths', headerName: 'Frequency', type: "number", width: 80, headerAlign: "center", align: "center" },
        { field: 'itemCalibrationSource', headerName: 'Cal Source', width: 120, headerAlign: "center", align: "center", },
        { field: 'itemCalibratedAt', headerName: 'Cal Done At ', width: 100, headerAlign: "center", align: "center" },
        { field: 'itemCurrentLocation', headerName: 'Current Location', width: 120, headerAlign: "center", align: "center", },
        { field: 'itemPlant', headerName: 'Item Plant', width: 100, headerAlign: "center", align: "center", },
        { field: 'itemDepartment', headerName: 'Primary Location', width: 100, headerAlign: "center", align: "center", },
        { field: 'itemStatus', headerName: 'Status ', width: 70, headerAlign: "center", align: "center", },
        // { field: 'itemCalibrationSource', headerName: 'Cal Source', renderCell: (params) => params.row.itemSupplier.toString(), width: 110, headerAlign: "center", align: "center", },
        {
            field: 'itemType',
            headerName: 'Type',
            width: 180,
            headerAlign: "center", align: "center",
            renderCell: (params) => {
                const itemType = params.row.itemType.toString();
                return itemType.charAt(0).toUpperCase() + itemType.slice(1).toLowerCase();
            },
        }
    ];
    const [deleteModalItem, setDeleteModalItem] = useState(false);
    const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])

    const [filterAllNames, setFilterAllNames] = useState({
        plantWise: "all",
        imteNo: "all",
        itemType: "all",
        itemAddMasterName: "all",
        currentLocation: "all",
    })

    const [plantDatas, setPlantDatas] = useState([])
    const [departmentDatas, setDepartmentDatas] = useState([])
    const [itemTypeDatas, setItemTypeDatas] = useState([])
    const [itemMasteDatas, setItemMasterDatas] = useState([])

    const [customerParts, setCustomerParts] = useState([])
    const handleFilterChangeItemList = (e) => {

        const { name, value } = e.target;
        console.log(e);
        if (name === "plantWise") {
            const plantWise = itemList.filter((item) => (item.itemPlant === value))
            if (value === "all") {
                setFilteredItemListData(itemList)
                const filterNames = ["itemIMTENo", "itemType", "itemAddMasterName", "itemDepartment", "itemCalibrationSource", "itemCurrentLocation"]
                let updatedFilterNames = {};
                filterNames.forEach((element, index) => {
                    const data = itemList.map(item => item[element]);
                    filterNames[index] = [...new Set(data)];
                    // Update the object with a dynamic key based on the 'element'
                    updatedFilterNames[element] = filterNames[index];
                });
                console.log(updatedFilterNames)
                // Update state outside the loop with the updated object
                setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
            } else {
                setFilteredItemListData(plantWise)
                const filterNames = ["itemIMTENo", "itemType", "itemAddMasterName", "itemDepartment", "itemCalibrationSource", "itemCurrentLocation"]
                let updatedFilterNames = {};

                filterNames.forEach((element, index) => {
                    const data = plantWise.map(item => item[element]);
                    filterNames[index] = [...new Set(data)];
                    // Update the object with a dynamic key based on the 'element'
                    updatedFilterNames[element] = filterNames[index];
                });
                console.log(updatedFilterNames)
                // Update state outside the loop with the updated object
                setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: "all",
                    plantWise: value,
                    itemType: "all",
                    currentLocation: "all",
                    itemAddMasterName: "all"
                }))
                setPlantDatas(plantWise)
            }
        }
        if (name === "currentLocation") {
            const currentLocation = plantDatas.filter((item) => (item.itemDepartment === value))
            if (value === "all") {
                setFilteredItemListData(plantDatas)
                const filterNames = ["itemIMTENo", "itemType", "itemAddMasterName", "itemCalibrationSource", "itemCurrentLocation"]
                let updatedFilterNames = {};
                filterNames.forEach((element, index) => {
                    const data = plantDatas.map(item => item[element]);
                    filterNames[index] = [...new Set(data)];
                    // Update the object with a dynamic key based on the 'element'
                    updatedFilterNames[element] = filterNames[index];
                });
                console.log(updatedFilterNames)
                // Update state outside the loop with the updated object
                setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
                setFilteredItemListData(plantDatas)
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: "all",
                    itemType: "all",
                    currentLocation: value,
                    itemAddMasterName: "all"
                }))
            } else {
                setFilteredItemListData(currentLocation)
                const filterNames = ["itemIMTENo", "itemType", "itemAddMasterName", "itemCalibrationSource", "itemCurrentLocation"]
                let updatedFilterNames = {};
                filterNames.forEach((element, index) => {
                    const data = currentLocation.map(item => item[element]);
                    filterNames[index] = [...new Set(data)];
                    // Update the object with a dynamic key based on the 'element'
                    updatedFilterNames[element] = filterNames[index];
                });
                console.log(updatedFilterNames)
                // Update state outside the loop with the updated object
                setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
                setFilteredItemListData(currentLocation)
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: "all",
                    itemType: "all",
                    currentLocation: value,
                    itemAddMasterName: "all"
                }))
                setDepartmentDatas(currentLocation)
            }
        }
        if (name === "itemType") {
            const itemType = departmentDatas.filter((item) => (item.itemType === value))
            if (value === "all") {
                setFilteredItemListData(departmentDatas)
                const filterNames = ["itemIMTENo", "itemAddMasterName",]
                let updatedFilterNames = {};
                filterNames.forEach((element, index) => {
                    const data = departmentDatas.map(item => item[element]);
                    filterNames[index] = [...new Set(data)];
                    // Update the object with a dynamic key based on the 'element'
                    updatedFilterNames[element] = filterNames[index];
                });
                console.log(updatedFilterNames)
                // Update state outside the loop with the updated object
                setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
                setFilteredItemListData(departmentDatas)
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: "all",
                    itemType: value,
                    itemAddMasterName: "all"
                }))
                setItemTypeDatas(itemType)
            } else {
                setFilteredItemListData(itemType)
                const filterNames = ["itemIMTENo", "itemAddMasterName",]
                let updatedFilterNames = {};
                filterNames.forEach((element, index) => {
                    const data = itemType.map(item => item[element]);
                    filterNames[index] = [...new Set(data)];
                    // Update the object with a dynamic key based on the 'element'
                    updatedFilterNames[element] = filterNames[index];
                });
                console.log(updatedFilterNames)
                // Update state outside the loop with the updated object
                setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
                setFilteredItemListData(itemType)
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: "all",
                    itemType: value,
                    itemAddMasterName: "all"
                }))
                setItemTypeDatas(itemType)
            }
        }
        if (name === "itemAddMasterName") {
            const itemAddMasterName = itemTypeDatas.filter((item) => (item.itemAddMasterName === value))
            if (value === "all") {
                setFilteredItemListData(itemTypeDatas)
                const filterNames = ["itemIMTENo"]
                let updatedFilterNames = {};
                filterNames.forEach((element, index) => {
                    const data = itemTypeDatas.map(item => item[element]);
                    filterNames[index] = [...new Set(data)];
                    // Update the object with a dynamic key based on the 'element'
                    updatedFilterNames[element] = filterNames[index];

                });
                console.log(updatedFilterNames)
                // Update state outside the loop with the updated object
                setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
                setFilteredItemListData(itemTypeDatas)
                setFilterAllNames(prev => ({
                    ...prev,
                    itemAddMasterName: value,
                    imteNo: "all",
                }))
            } else {
                setFilteredItemListData(itemAddMasterName)
                const filterNames = ["itemIMTENo"]

                let updatedFilterNames = {};

                filterNames.forEach((element, index) => {
                    const data = itemAddMasterName.map(item => item[element]);
                    filterNames[index] = [...new Set(data)];
                    // Update the object with a dynamic key based on the 'element'
                    updatedFilterNames[element] = filterNames[index];
                });
                console.log(updatedFilterNames)
                // Update state outside the loop with the updated object
                setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));
                setFilteredItemListData(itemAddMasterName)
                setFilterAllNames(prev => ({
                    ...prev,
                    itemAddMasterName: value,
                    imteNo: "all",
                }))
                setItemMasterDatas(itemAddMasterName)
            }
        }
        if (name === "imteNo") {
            const imteNo = itemMasteDatas.filter((item) => (item.itemIMTENo === value))
            if (value === "all") {
                setFilteredItemListData(itemMasteDatas)
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: value,
                }))
            } else {
                setFilteredItemListData(imteNo)
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: value,
                }))
            }
        }
        if (name === "customerWise") {
            const customerData = partDataList.filter(part => part.customer === value)
            const customers = departmentDatas.filter(item => customerData.some(cus => item.itemPartName.includes(cus.partNo)))
            console.log(customers)
            setFilteredItemListData(customers)
            setCustomerParts(customerData)
            setFilterAllNames(prev => ({
                ...prev,
                imteNo: "all",
                itemType: "all",
                customerWise: value,
                supplierWise: "all",
                partName: "all",
                status: "all",
                calibrationSource: "all",
                itemCurrentLocation: "all"
            }))
        }
        if (name === "supplierWise") {

            const supperlierWise = departmentDatas.filter((item) => item.itemSupplier.includes(value))

            setFilteredItemListData(supperlierWise)

            setFilterAllNames(prev => ({
                ...prev,
                imteNo: "all",
                itemType: "all",
                currentLocation: "all",
                customerWise: "all",
                supplierWise: value,
                partName: "all",
                status: "all",
                plantWise: "all",
                calibrationSource: "all",
                itemCurrentLocation: "all"
            }))
        }
        if (name === "partName") {
            console.log(name, value)
            const filteredItems = departmentDatas.filter((item) => (item.itemPartName.includes(value)));


            setFilteredItemListData(filteredItems);
            console.log(filteredItems)
            setFilterAllNames((prev) => ({
                ...prev,
                imteNo: "all",
                itemType: "all",
                currentLocation: "all",
                customerWise: "all",
                supplierWise: "all",
                partName: value, // Update the partName value in the filterAllNames state
                status: "all", // Reset other filters if needed
                plantWise: "all",
                calibrationSource: "all",
                itemCurrentLocation: "all"
            }));
        }
        if (name === "status") {
            const status = departmentDatas.filter((item) => (item.itemStatus === value))
            if (value === "all") {
                setFilteredItemListData(departmentDatas)
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: "all",
                    itemType: "all",
                    customerWise: "all",
                    supplierWise: "all",
                    partName: "all",
                    status: value,
                    calibrationSource: "all",
                    itemCurrentLocation: "all"
                }))
            } else {
                setFilteredItemListData(status)
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: "all",
                    itemType: "all",
                    customerWise: "all",
                    supplierWise: "all",
                    partName: "all",
                    status: value,
                    calibrationSource: "all",
                    itemCurrentLocation: "all"
                }))
            }
        }
        if (name === "calibrationSource") {
            const calibrationSource = departmentDatas.filter((item) => (item.itemCalibrationSource === value))
            if (value === "all") {
                setFilteredItemListData(departmentDatas)
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: "all",
                    itemType: "all",
                    currentLocation: "all",
                    customerWise: "all",
                    supplierWise: "all",
                    partName: "all",
                    status: "all",
                    calibrationSource: value,
                    itemCurrentLocation: "all"
                }))

            } else {
                setFilteredItemListData(calibrationSource)
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: "all",
                    itemType: "all",
                    currentLocation: "all",
                    customerWise: "all",
                    supplierWise: "all",
                    partName: "all",
                    status: "all",
                    calibrationSource: value,
                    itemCurrentLocation: "all"
                }))
            }
        }
        if (name === "itemCurrentLocation") {
            const itemCurrentLocation = departmentDatas.filter((item) => (item.itemCurrentLocation === value))
            if (value === "all") {
                setFilteredItemListData(itemCurrentLocation)
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: "all",
                    itemType: "all",
                    customerWise: "all",
                    supplierWise: "all",
                    partName: "all",
                    status: "all",
                    calibrationSource: "all",
                    itemCurrentLocation: value
                }))

            } else {
                setFilterAllNames(prev => ({
                    ...prev,
                    imteNo: "all",
                    itemType: "all",
                    customerWise: "all",
                    supplierWise: "all",
                    partName: "all",
                    status: "all",
                    calibrationSource: "all",
                    itemCurrentLocation: value
                }))
            }
        }
    };
    const [filterDates, setFilterDates] = useState({
        startDate: "",
        endDate: ""
    })
    const dueDatePicker = (newValue, name) => {
        let startDate = "";
        let endDate = "";



        if (name === "dueStartDate") {
            setFilterDates(prev => ({ ...prev, startDate: newValue.format("YYYY-MM-DD") }));
        }
        if (name === "dueEndDate") {
            setFilterDates(prev => ({ ...prev, endDate: newValue.format("YYYY-MM-DD") }));
        }

        //     const filteredData = itemList.filter((item) => {


        //         // Assuming item.itemDueDate is a valid date
        //         const itemDueDate = new Date(item.itemDueDate);

        //         return (
        //             (startDate === "" || itemDueDate >= new Date(startDate)) &&
        //             (endDate === "" || itemDueDate <= new Date(endDate))
        //         );
        //     });


        // };


    };
    console.log(filterDates)


    useEffect(() => {
        console.log(itemList)
        const filteredItems = itemList.filter((item) => dayjs(item.itemDueDate).isSameOrAfter(dateData.fromDate) && dayjs(item.itemDueDate).isSameOrBefore(dateData.toDate))
        console.log(filteredItems)
        setFilteredItemListData(filteredItems)
    }, [dateData.fromDate, dateData.toDate])



    const [vendorList, setVendorList] = useState([])


    const vendorFetch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/vendor/getVendorByPlants`, { allowedPlants: allowedPlants }
            );
            setVendorList(response.data.result)

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetch();
    }, []);



    // useEffect(() => {
    //     if (FilterNameList && FilterNameList.length > 0) {
    //         const distinctNames = FilterNameList.map(item => item.itemAddMasterName);
    //         const sortedDistinctNames = [...new Set(distinctNames)].sort();
    //         setFilterNameList(sortedDistinctNames);
    //     }
    // }, [FilterNameList]);

    // console.log(FilterNameList)




    const [partCutomerNames, setPartCutomerNames] = useState([])

    const [partDataList, setPartDataList] = useState([])

    const partFetchData = async () => {
        try {

            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/part/getPartsByPlant`, { allowedPlants: allowedPlants }
            );

            setPartDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        partFetchData();
    }, []);
    useEffect(() => {
        if (partDataList.length !== 0) {

            const partCustomers = partDataList.filter(part => plantDatas.some(item => item.itemPartName.includes(part.partNo)))

            console.log(partCustomers)
            setPartCutomerNames(partCustomers)


        }
    }, [plantDatas])



    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [errorhandler, setErrorHandler] = useState({});


    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredData, setFilteredData] = useState(itemList);


    const dueDateYear = (newValue, name) => {
        if (name === 'dueStartDate') {
            setStartDate(newValue);
        }
        if (name === 'dueEndDate') {
            setEndDate(newValue);
        }
    };

    const handleDueChanges = () => {
        // Check if both start and end dates are selected
        if (startDate && endDate) {
            const filteredData = itemList.filter((item) => {
                const itemDueDate = new Date(item.itemDueDate);

                return (
                    itemDueDate >= new Date(startDate) &&
                    itemDueDate <= new Date(endDate)
                );
            });

            // Update the state with the filtered data
            setFilteredData(filteredData);
            console.log()
        } else {
            // Handle case where either start or end date is not selected

        }
    };
    console.log(filteredData);

    const deleteItemData = async () => {

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/itemAdd/deleteItemAdd`, {
                data: {
                    itemAddIds: itemListSelectedRowIds
                }
            }
            );

            setSnackBarOpen(true)

            console.log(response.data)
            setErrorHandler({ status: response.data.status, message: response.data.results, code: "success" })
            console.log("ItemAdd delete Successfully");
            //setItemAddData(initialItemAddData)
            itemFetch()
        } catch (err) {

            setSnackBarOpen(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                console.log(errorData400)
                setErrorHandler({ status: 0, message: errorData400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }
            console.log(err);
        }
    };

    const [dueDate, setDueDate] = useState("")

    const handleDueChange = (e) => {
        const { value } = e.target;
        setDueDate(value)
        const currentDate = dayjs();

        // Example: Filtering data for the last 7 days
        const sevenDaysAgo = currentDate.add(7, 'day');
        const fifteenDaysAgo = currentDate.add(15, 'day');
        const thirtyDaysAgo = currentDate.add(30, 'day');


        if (value === "all") {
            setFilteredItemListData(departmentDatas)
        } else {


            if (value === "Past") {
                const pastData = departmentDatas.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
                setFilteredItemListData(pastData)

            }
            if (value === "Today") {
                const CurrentDue = departmentDatas.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))

                setFilteredItemListData(CurrentDue)
            }
            if (value === "7") {

                const filteredDataLast7Days = departmentDatas.filter((item) => {
                    console.log(item.itemDueDate)
                    return (dayjs(item.itemDueDate).isSameOrBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isSameOrAfter(currentDate.format("YYYY-MM-DD")))
                })

                setFilteredItemListData(filteredDataLast7Days)
            }
            if (value === "15") {

                const fifteenDaysFilter = departmentDatas.filter((item) => {

                    return (dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
                })
                setFilteredItemListData(fifteenDaysFilter)
            }
            if (value === "30") {

                const thirtyDaysFilter = departmentDatas.filter((item) => {

                    return (dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
                })
                setFilteredItemListData(thirtyDaysFilter)
            }

            if (value === ">30") {

                const thirtyDaysFilter = departmentDatas.filter((item) => {

                    return (dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))
                })
                setFilteredItemListData(thirtyDaysFilter)
            }

            if (value === "Date") {
                setFilteredItemListData(departmentDatas)
            }

        }



    }




    const [mailIds, setMailIds] = useState([])
    const mailIdGather = () => {
        if (itemListSelectedRowIds.length > 0) {
            const deps = itemListSelectedRowIds.map(item => item.itemDepartment)
            console.log(deps)

            const empEmails = employeeList.filter(emp => emp.plantDetails.find(plant => deps.find(dep => plant.departments.includes(dep))))
            const uniqueEmails = [...new Set(empEmails)]
            setMailIds(empEmails)
            console.log(empEmails)
            console.log(uniqueEmails)
        }
    }

    useEffect(() => {
        setStatusCheckMsg("");


        mailIdGather()
    }, [itemListSelectedRowIds])

    const [selectedItemList, setSelectedItemList] = useState([])

    const handleRowSelectionChange = (newSelection, e) => {
        const selectedRowsData = filteredItemListData.filter((row) => newSelection.includes(row._id));
        setSelectedItemList(selectedRowsData)
        setItemListSelectedRowIds(newSelection);
    };


    console.log(itemListSelectedRowIds)






    const handleConfirmDialogClose = () => {
        setShowDialog(false);
    };

    const [formatNoData, setFormatNoData] = useState([])
    const formatFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/formatNo/getFormatNoById/1`
            );
            const format = response.data.result
            console.log(format)
            setFormatNoData(format)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        formatFetchData();
    }, []);

    const [mailOpen, setMailOpen] = useState(false)

    const itemListMailData = {
        mailOpen,
        setMailOpen,
        selectedRows: selectedItemList
    }


    return (
        <div style={{ margin: "2rem" }}>
            {loaded ? <form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <Paper sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        mb: 1,

                    }} elevation={12}
                    >
                        <div className='row g-2  '>
                            <div className='row d-flex'>
                                <div className='col d-flex'>
                                    <div className='me-2'>
                                        <Button component={Link} to={`/home`} variant="contained" size='small' color="warning">
                                            <ArrowBackIcon /> Dash board
                                        </Button>
                                    </div>
                                    <div >
                                        <Button component={Link} to="/" size='small' variant='contained' startIcon={<ArrowBack />} endIcon={<House />} color='secondary'>Home</Button>
                                    </div>
                                </div>
                                <div className='col d-flex justify-content-center'>
                                    <Typography variant="h5" className="text-center mb-2">Item List</Typography>
                                </div>

                                <div className=' col d-flex justify-content-end'>
                                    {employeeRole.employee !== "viewer" && (
                                        <React.Fragment>
                                            <div className='me-2'>
                                                <p style={{ color: '#3498db', fontSize: '18px', fontWeight: 'bold' }}>
                                                    Welcome {loggedEmp.firstName}
                                                </p>
                                            </div>

                                        </React.Fragment>
                                    )}
                                </div>  </div>
                            {/* <div className='col-7'> */}
                            {/* {dueDate === "Date" && <div className='col d-flex justify-content-end mb-2 g-2'> */}
                            {/* <div className="me-2 col-2 ">
                                            <DatePicker
                                                fullWidth
                                                id="startDateId"
                                                name="dueStartDate"
                                                onChange={(newValue) => dueDatePicker(newValue, 'dueStartDate')}
                                                label="Start Date"
                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD-MM-YYYY"
                                            />
                                        </div> */}
                            {/* <div className="me-2 col-2">
                                            <DatePicker
                                                fullWidth
                                                id="endDateId"
                                                name="dueEndDate"
                                                onChange={(newValue) => dueDatePicker(newValue, 'dueEndDate')}
                                                label="End Date "
                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD-MM-YYYY"
                                            />
                                        </div> */}

                            {/* <div>
                                            <Button
                                                variant='contained'
                                                onClick={() => DatefilterFunction()}
                                                startIcon={<FilterAlt />}
                                                size='small'
                                                color='warning'
                                            >
                                                Filter
                                            </Button>
                                        </div> */}
                            {/* </div>} */}
                            {/* </div> */}




                            <div className='row g-2'>
                                <div className="col  ">
                                    <TextField label="Plant Wise"
                                        id="plantWiseId"
                                        select
                                        defaultValue="all"
                                        // value={filterAllNames.plantWise}
                                        fullWidth
                                        size="small"
                                        onChange={handleFilterChangeItemList}
                                        name="plantWise" >
                                        <MenuItem value="all">All</MenuItem>
                                        {FilterNameList.itemPlant.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col  ">
                                    <TextField label="Primary Location "
                                        id="currentLocationId"
                                        select
                                        defaultValue="all"
                                        value={filterAllNames.currentLocation}
                                        fullWidth
                                        onChange={handleFilterChangeItemList}
                                        size="small"
                                        name="currentLocation" >
                                        <MenuItem value="all">All</MenuItem>
                                        {FilterNameList.itemDepartment.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}

                                    </TextField>
                                </div>
                                <div className="col ">
                                    <TextField label="Item Type"
                                        id="itemTypeId"
                                        select
                                        value={filterAllNames.itemType}
                                        defaultValue="all"
                                        fullWidth
                                        onChange={handleFilterChangeItemList}
                                        size="small"
                                        name="itemType" >
                                        <MenuItem value="all">All</MenuItem >
                                        <MenuItem value="attribute">Attribute</MenuItem >
                                        <MenuItem value="variable">Variable</MenuItem >
                                        <MenuItem value="referenceStandard">Reference Standard</MenuItem >
                                    </TextField>
                                </div>
                                <div className="col ">
                                    {/* <TextField label="Item Name"
                                        id="itemAddMasterNameId"
                                        // required
                                        select
                                        value={filterAllNames.itemAddMasterName}
                                        defaultValue="all"
                                        fullWidth
                                        size="small"
                                        onChange={handleFilterChangeItemList}
                                        name="itemAddMasterName" >
                                        <MenuItem value="all">All</MenuItem>
                                        {FilterNameList.itemAddMasterName.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </TextField> */}
                                    <TextField
                                        label="Item Name"
                                        id="itemAddMasterNameId"
                                        select
                                        value={filterAllNames.itemAddMasterName}
                                        defaultValue="all"
                                        fullWidth
                                        size="small"
                                        onChange={handleFilterChangeItemList}
                                        name="itemAddMasterName"
                                    >
                                        <MenuItem value="all">All</MenuItem>
                                        {sortedFilterNameList.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </div>
                                <div className="col ">
                                    <TextField label="Imte No"
                                        id="imteNoId"
                                        required
                                        select
                                        value={filterAllNames.imteNo}
                                        defaultValue="all"
                                        fullWidth
                                        size="small"
                                        onChange={handleFilterChangeItemList}
                                        name="imteNo" >
                                        <MenuItem value="all">All</MenuItem>
                                        {FilterNameList.itemIMTENo.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>




                            {/* <div className="col ">

                                    <TextField label="Calibration source"
                                        id="calibrationSourceId"
                                        select
                                        defaultValue={"all"}
                                        value={filterAllNames.calibrationSource}
                                        fullWidth
                                        size="small"
                                        // value={filterAllNames.calibrationSource}
                                        onChange={handleFilterChangeItemList}
                                        name="calibrationSource" >
                                        <MenuItem value="all">All</MenuItem>
                                        {FilterNameList.itemCalibrationSource.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </TextField>

                                </div> */}

                            {/* <div className="col">

                                <TextField label="Due In Days"
                                    id="dueInDaysId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    size="small"
                                    onChange={handleDueChange}
                                    name="dueInDays" >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="Past">Past</MenuItem >
                                    <MenuItem value="Today">Today</MenuItem >
                                    <MenuItem value="7">7</MenuItem >
                                    <MenuItem value="15">15</MenuItem >
                                    <MenuItem value="30">30</MenuItem >
                                    <MenuItem value=">30">{'>'}30</MenuItem >
                                    <MenuItem value="Date">Date</MenuItem >

                                </TextField>

                            </div> */}
                            {/* <div className="col ">

                                <TextField label="Customer Wise"
                                    id="customerWiseId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    // value={filterAllNames.customerWise}
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    name="customerWise" >
                                    <MenuItem value="all">All</MenuItem>
                                    {partCutomerNames.map((item, index) => (
                                        <MenuItem key={index} value={item.customer}>{item.customer}</MenuItem>
                                    ))}
                                </TextField>

                            </div> */}
                            {/* <div className="col ">

                                <TextField label=" Part No & Part Name"
                                    id="partNameId"
                                    select
                                    // value={filterAllNames.partName}
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    value={filterAllNames.partName}

                                    name="partName" >
                                    <MenuItem value="all">All</MenuItem>
                                    {customerParts.map((item, index) => (
                                        <MenuItem key={index} value={item.partNo}>{[item.partNo, item.partName].join(', ')}</MenuItem>
                                    ))}
                                </TextField>

                            </div> */}



                        </div>



                        {/* <div className="col d-flex g-2 mb-2"> */}

                        {/* <div className='col d-flex  me-2'>
                                    <TextField label="Status"
                                        id="statusId"
                                        select
                                        defaultValue="all"
                                        fullWidth
                                        size="small"
                                        name="status"
                                        onChange={handleFilterChangeItemList}>

                                        <MenuItem value="all">All</MenuItem>
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="spare">Spare</MenuItem>
                                        <MenuItem value="breakdown">Breakdown</MenuItem>
                                        <MenuItem value="missing">Missing</MenuItem>
                                        <MenuItem value="rejection">Rejection</MenuItem>

                                    </TextField>
                                </div> */}
                        {/* <div className="col d-flex ">

                                    <TextField label="Current Location "
                                        id="itemCurrentLocationId"
                                        select
                                        defaultValue="all"
                                        value={filterAllNames.itemCurrentLocation}
                                        fullWidth
                                        onChange={handleFilterChangeItemList}
                                        size="small"
                                        name="itemCurrentLocation" >
                                        <MenuItem value="all">All</MenuItem>
                                        {FilterNameList.itemCurrentLocation.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}

                                    </TextField>

                                </div> */}

                        {/* <div className="col-1 mb-2">
                                    <div className='mb-2'>
                                        <Button color="secondary" className='mb-2' variant='contained' startIcon={<PrintRounded />} size='small' onClick={() => setPrintState(true)}> Print</Button>

                                    </div>


                                </div> */}

                        {/* </div> */}



                        <div>
                            <Box sx={{ height: 490, width: '100%', my: 2 }}>
                                <DataGrid

                                    rows={filteredItemListData}
                                    columns={columns}
                                    getRowId={(row) => row._id}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 10 },
                                        },
                                    }}
                                    sx={{
                                        ".MuiTablePagination-displayedRows": {

                                            "marginTop": "1em",
                                            "marginBottom": "1em"
                                        }
                                    }}
                                    onRowSelectionModelChange={handleRowSelectionChange}


                                    slots={{
                                        toolbar: () => (
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <GridToolbar />
                                                <div className='d-flex justify-content-between align-items-end'>
                                                    {selectedItemList.length > 0 && <Button className='me-2' onClick={() => mailCheck()} variant='contained' size='small' endIcon={<Send />} color="primary">Send Mail</Button>}
                                                    {itemListSelectedRowIds.length !== 0 && <Button className='me-2' variant='contained' type='button' size='small' color='error' onClick={() => setDeleteModalItem(true)}> Delete </Button>}
                                                    <GridToolbarQuickFilter />
                                                </div>


                                            </div>
                                        ),
                                    }}
                                    density="compact"
                                    //disableColumnMenu={true}

                                    checkboxSelection

                                    disableRowSelectionOnClick
                                    pageSizeOptions={[5]}
                                />
                                <Dialog open={showDialog} onClose={handleConfirmDialogClose}>
                                    <DialogTitle>Multiple Row Selection Not Allowed</DialogTitle>
                                    <DialogContent>
                                        Selecting multiple rows is not allowed. Please deselect the extra rows.
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleConfirmDialogClose} color="primary">
                                            Okay
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                            </Box>
                            <Dialog
                                open={deleteModalItem}
                                onClose={() => setDeleteModalItem(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {" ItemAdd delete confirmation?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure to delete the Item
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setDeleteModalItem(false)}>Cancel</Button>
                                    <Button onClick={() => { deleteItemData(); setDeleteModalItem(false); }} autoFocus>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>


                        </div>
                        <div className='row'>
                            <div className=' col d-flex mb-2'>
                                <div className='' >
                                    {/* <button type="button" className='btn btn-sm' >History Card</button> */}
                                    {/* <Button component={RouterLink} to={`/InsHistoryCard`} size='small' variant="contained" color="secondary">
                                        History Card
                                    </Button> */}
                                </div>
                                {employeeRole && employeeRole.employee !== "viewer" &&
                                    <div className='me-2' >
                                        {itemListSelectedRowIds.length !== 0 && <button type="button" className='btn btn-warning btn-sm' onClick={() => setOpenModalStatus(true)} >Change status</button>} </div>}

                                <Dialog
                                    open={openModalStatus}
                                    onClose={() => setOpenModalStatus(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    maxWidth="sm"
                                    fullWidth
                                >
                                    <DialogTitle className='text-center'>Status Change</DialogTitle>
                                    <DialogContent>


                                        <DialogContentText id="alert-dialog-description ">

                                            <div className='row mb-2'>
                                                <TextField margin="dense" size='small' select variant='outlined' className='mb-2' onChange={(e) => setStatusInfo((prev) => ({ ...prev, itemStatus: e.target.value }))} value={statusInfo.itemStatus} label="Item Status" name='itemStatus' id='itemStatusId'  >
                                                    <MenuItem value="active">Active</MenuItem>
                                                    <MenuItem value="inactive">InActive</MenuItem>
                                                    <MenuItem value="spare">Spare</MenuItem>
                                                    <MenuItem value="breakdown">Breakdown</MenuItem>
                                                    <MenuItem value="missing">Missing</MenuItem>
                                                    <MenuItem value="rejection">Rejection</MenuItem>

                                                </TextField>

                                                <TextField margin="dense" size='small' multiline rows={2} variant='outlined' className='mb-2' onChange={(e) => setStatusInfo((prev) => ({ ...prev, itemStatusReason: e.target.value }))} value={statusInfo.itemStatusReason} label="Reason" name='itemStatusReason' id='itemStatusReasonId'  >


                                                </TextField>



                                            </div>
                                        </DialogContentText>



                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenModalStatus(false)}>Cancel</Button>
                                        <Button onClick={() => { updateItemStatus(); }} autoFocus>
                                            Change Status
                                        </Button>
                                    </DialogActions>
                                </Dialog>





                                {employeeRole.employee !== "viewer" && <div className='me-2' >
                                    <Button component={RouterLink} to={`/itemMaster`} size='small' variant="contained" color="secondary">
                                        Item Master
                                    </Button>

                                </div>}

                                <div className="d-flex justify-content-center">
                                    <div className='col'>
                                        <ButtonGroup className='me-2'>
                                            <Button component="label" size='small' variant="contained" >
                                                Upload
                                                <VisuallyHiddenInput type="file" onChange={handleItemAddExcel} />
                                            </Button>
                                            <Button size='small' onClick={handleItemAddUpload}><CloudUpload /></Button>
                                        </ButtonGroup>
                                    </div>
                                    <div className='me-2'>
                                        <Button color="secondary" className='mb-2' variant='contained' startIcon={<PrintRounded />} size='small' onClick={() => setPrintState(true)}> Print</Button>

                                    </div>


                                    {/* <ButtonGroup>
                                        <Button component="label" size='small' variant="contained" color='secondary'>
                                            Download
                                            <VisuallyHiddenInput type="file" />
                                        </Button>
                                        <Button size='small' color='secondary'><CloudDownload /></Button>
                                    </ButtonGroup> */}
                                </div>


                                {/* <div className='me-2 col-1 px-1'>
                                    <button type="button" className='btn btn-secondary btn-sm' >Sticker Print</button>
                                </div>
                                <div className='me-2 col-2'>
                                    <button type="button" className='btn btn-secondary btn-sm' >Sticker Print Barcode</button>
                                </div> */}
                                <div className='col d-flex justify-content-end'>

                                    <Button size='small' component={Link} to={`/itemAdd`} variant="contained" color="warning">
                                        <AddIcon /> Add Item
                                    </Button>

                                </div>


                                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                                    <Alert onClose={handleSnackClose} severity={errorhandler.code} variant='filled'>
                                        {errorhandler.message}
                                    </Alert>
                                </Snackbar>


                            </div>
                            {itemAddExcelStatus && <p style={{ color: 'green' }}>{itemAddExcelStatus}</p>}

                        </div>




                    </Paper>

                    <ItemListContent.Provider
                        value={{ filteredItemListData, printState, setPrintState, formatNoData }}
                    >

                        <ItemListPrint />
                    </ItemListContent.Provider>



                </LocalizationProvider>
                <MailSender {...itemListMailData} />

            </form>
                : <Backdrop

                    open={true}

                >
                    <CircularProgress color="success" />
                </Backdrop>}
        </div>
    )
}

export default ItemList