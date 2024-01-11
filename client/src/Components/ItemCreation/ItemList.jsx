import React, { createContext, useEffect, useState } from 'react'
import { TextField, MenuItem, Button, ButtonGroup } from '@mui/material';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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
import { useEmployee } from '../../App';
import styled from "@emotion/styled";
import { CloudDownload, CloudUpload, Delete } from '@mui/icons-material';
import ItemListPrint from './ItemListPrint';
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
export const ItemListContent = createContext(null);

const ItemList = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [itemListPrintOpen, setItemListPrintOpen] = useState(false);

    const employeeRole = useEmployee()


    console.log(dayjs("2023-11-17").isSameOrBefore("2023-11-21"))
    const [itemList, setItemList] = useState([]);



    const [today, setToday] = useState(dayjs().format('YYYY-MM-DD'))
    console.log(today)


    const initialItemStatusData = {
        itemMasterRef: "",
        itemIMTENo: "",
        itemImage: "",
        itemType: "",
        itemRangeSize: "",
        itemRangeSizeUnit: "",
        itemMFRNo: "",
        itemLC: "",
        itemLCUnit: "",
        itemMake: "",
        itemModelNo: "",
        itemStatus: "Active",
        itemReceiptDate: "",
        itemDepartment: "",
        itemArea: "N/A",
        itemPlaceOfUsage: "N/A",
        itemCalFreInMonths: "",
        itemCalAlertDays: "",
        itemCalibrationSource: "",
        itemItemMasterName: "",
        itemItemMasterIMTENo: "",

        itemSupplier: [],
        itemOEM: [],
        itemCalDate: "",
        itemDueDate: "",
        itemCalibratedAt: "",
        itemCertificateName: "",
        itemPartName: [],
        acceptanceCriteria: [{
            acParameter: "",
            acRangeSize: "",
            acRangeSizeUnit: "",
            acMin: "",
            acMax: "",
            acPsMin: "",
            acPsMax: "",
            acPsWearLimit: "",
            acAccuracy: "",
            acAccuracyUnit: "",
            acObservedSize: "",
        }]


    }

    const [itemStatusStateId, setItemStatusStateId] = useState(null)
    const [itemStatusData, setItemStatusData] = useState({
        itemMasterRef: "",
        itemAddMasterName: "",
        itemIMTENo: "",
        itemImage: "",
        itemType: "",
        itemRangeSize: "",
        itemRangeSizeUnit: "",
        itemMFRNo: "",
        itemLC: "",
        itemLCUnit: "",
        itemMake: "",
        itemModelNo: "",
        itemStatus: "Active",
        itemReceiptDate: dayjs().format("YYYY-MM-DD"),
        itemDepartment: "",
        itemArea: "N/A",
        itemPlaceOfUsage: "N/A",
        itemCalFreInMonths: "",
        itemCalAlertDays: "",
        itemCalibrationSource: "",
        itemCalibrationDoneAt: "",
        itemItemMasterName: "",
        itemItemMasterIMTENo: [],
        itemSupplier: [],
        itemOEM: [],
        itemCalDate: dayjs().format("YYYY-MM-DD"),
        itemDueDate: "",
        itemCalibratedAt: "",
        itemCertificateName: "",
        itemPartName: [],
        acceptanceCriteria: [
            {
                acAccuracyUnit: "",
                acRangeSizeUnit: "",
                acParameter: "",
                acRangeSize: "",
                acMin: "",
                acMax: "",
                acPsMin: "",
                acPsMax: "",
                acPsWearLimit: "",
                acAccuracy: "",
                acObservedSize: ""
            }
        ]
    })




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
        console.log(selectedFile)
        setFile(selectedFile);
    };

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
            });

            setItemAddExcelStatus(response.data.message || 'Excel file uploaded successfully');
        } catch (error) {
            if (error.response) {
                setItemAddExcelStatus(`Error: ${error.response.data.error || 'Something went wrong'}`);
            } else if (error.request) {
                setItemAddExcelStatus('Network error. Please try again.');
            } else {
                setItemAddExcelStatus('Error uploading the file.');
            }
            console.error('Error uploading Excel file:', error);
        }
    };




  useEffect(() => {
    if (itemAddExcelStatus) {
      const timeoutId = setTimeout(() => {
        setItemAddExcelStatus('');
      }, 3000);

      return () => clearTimeout(timeoutId); 
    }
  }, [itemAddExcelStatus]);



    const [openModalStatus, setOpenModalStatus] = useState(false);
    const [itemStatusDataList, setItemStatusDataList] = useState([])
    const itemStatusFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setItemStatusDataList(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemStatusFetchData();
    }, []);
    console.log(itemStatusDataList)

    const updateItemStatus = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}itemAdd/updateItemAdd/${statusInfo._id}`, statusInfo
            );
            setSnackBarOpen(true)
            itemAddFetch();

            setItemStatusStateId(null)
            setItemStatusData(initialItemStatusData);
            console.log("Updated Successfully");
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            setTimeout(() => {
                window.location.reload();
            }, 2000);

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
    //

    const [FilterNameList, setFilterNameList] = useState({
        itemIMTENo: [],
        itemType: [],
        itemDepartment: [],
        itemPlant: [],
        itemCalibrationSource: []
    })

    const itemFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemAdd/getAllItemAdds`
            );
            // You can use a different logic for generating the id

            const filterNames = ["itemIMTENo", "itemType", "itemDepartment", "itemPlant", "itemCalibrationSource"]

            let updatedFilterNames = {};

            filterNames.forEach((element, index) => {
                const data = response.data.result.map(item => item[element]);
                filterNames[index] = [...new Set(data)];

                // Update the object with a dynamic key based on the 'element'
                updatedFilterNames[element] = filterNames[index];
                console.log(updatedFilterNames)
            });

            // Update state outside the loop with the updated object
            setFilterNameList(prev => ({ ...prev, ...updatedFilterNames }));

            console.log(partDataList)



            setItemList(response.data.result);
            setFilteredItemListData(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemFetch();
    }, []);





    console.log(FilterNameList)



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
        { field: 'itemIMTENo', headerName: 'IMTE No', width: 100, headerAlign: "center", align: "center" },
        { field: 'itemAddMasterName', headerName: 'Description', width: 120, headerAlign: "center", align: "center" },
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
        { field: 'itemMake', headerName: 'Make', width: 90, headerAlign: "center", align: "center", },
        { field: 'itemCalDate', headerName: 'Cal Date', width: 100, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY') },
        { field: 'itemDueDate', headerName: 'Due Date', width: 110, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemDueDate).format('DD-MM-YYYY') },
        { field: 'itemLC', headerName: 'ItemLC', width: 60, headerAlign: "center", align: "center", valueGetter: (params) => params.row.itemLC || "-" },
        { field: 'itemCalFreInMonths', headerName: 'Frequency', type: "number", width: 100, headerAlign: "center", align: "center" },
        { field: 'itemCalibrationSource', headerName: 'Cal Done At ', width: 100, headerAlign: "center", align: "center" },
        { field: 'itemStatus', headerName: 'Status ', width: 80, headerAlign: "center", align: "center", },
        { field: 'itemDepartment', headerName: 'Current location', width: 120, headerAlign: "center", align: "center", },
        { field: 'itemSupplier', headerName: 'Cal Source', renderCell: (params) => params.row.itemSupplier.toString(), width: 110, headerAlign: "center", align: "center", },
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

    const [filteredItemListData, setFilteredItemListData] = useState([])

    const handleFilterChangeItemList = (e) => {
        const { name, value } = e.target;
        console.log(e)
        if (value === "all") {
            setFilteredItemListData(itemList)
        } else {
            if (name === "imteNo") {
                const imteNo = itemList.filter((item) => (item.itemIMTENo === value))
                setFilteredItemListData(imteNo)

            }
            if (name === "itemType") {
                const itemType = itemList.filter((item) => (item.itemType === value))
                console.log(itemType)
                setFilteredItemListData(itemType)


            }
            if (name === "currentLocation") {
                const currentLocation = itemList.filter((item) => (item.itemDepartment === value))
                setFilteredItemListData(currentLocation)
            }
            if (name === "customerWise") {
                const customerWise = itemList.filter((item) => item.itemCustomer.includes(value))
                setFilteredItemListData(customerWise)
            }
            if (name === "supplierWise") {

                const supperlierWise = itemList.filter((item) => item.itemSupplier.includes(value))
                console.log(supperlierWise)
                setFilteredItemListData(supperlierWise)
            }
            if (name === "partName") {
                const partName = itemList.filter((item) => (item.itemPartName === value))
                setFilteredItemListData(partName)
            }

            if (name === "status") {
                const partName = itemList.filter((item) => (item.itemStatus === value))
                setFilteredItemListData(partName)
            }
            if (name === "plantWise") {
                const plantWise = itemList.filter((item) => (item.itemPlant === value))
                setFilteredItemListData(plantWise)
                // setFilterAllNames(prev => ({
                //     ...prev,
                //     imteNo: "all",
                //     itemType: "all",
                //     currentLocation: "all",
                //     customerWise: "all",
                //     supplierWise: "all",
                //     partName: "all",
                //     status: "all",
                //     plantWise: value,
                // }))
            }
            if (name === "calibrationSource") {

                const calibrationSource = itemList.filter((item) => (item.itemCalibrationSource === value))
                setFilteredItemListData(calibrationSource)
                // setFilterAllNames(prev => ({
                //     ...prev,
                //     imteNo: "all",
                //     itemType: "all",
                //     currentLocation: "all",
                //     customerWise: "all",
                //     supplierWise: "all",
                //     partName: "all",
                //     status: "all",
                //     plantWise: "all",
                //     calibrationSource: value,
                // }))
            }


        }


    };




    const dueDatePicker = (newValue, name) => {
        let startDate = "";
        let endDate = "";
        let startDueDate = "";
        let endDueDate = "";


        if (name === "dueStartDate") {
            startDate = newValue.format("YYYY-MM-DD");
        }
        if (name === "dueEndDate") {
            endDate = newValue.format("YYYY-MM-DD");
        }

        const filteredData = itemList.filter((item) => {
            console.log(item.itemDueDate);

            // Assuming item.itemDueDate is a valid date
            const itemDueDate = new Date(item.itemDueDate);

            return (
                (startDate === "" || itemDueDate >= new Date(startDate)) &&
                (endDate === "" || itemDueDate <= new Date(endDate))
            );
        });

        console.log(filteredData);
    };


    const [supplierList, setSupplierList] = useState([])

    const [customerList, setCustomerList] = useState([])

    const vendorFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            console.log(response.data)
            const customersList = response.data.result.filter((item) => item.customer === "1")
            const suppliersList = response.data.result.filter((item) => item.supplier === "1")
            setSupplierList(suppliersList);
            setCustomerList(customersList);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetch();
    }, []);

    const [departmentList, setDepartmentList] = useState([]);

    const depFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            setDepartmentList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        depFetchData();
    }, []);

    const [partCutomerNames, setPartCutomerNames] = useState([])
    const [partDataList, setPartDataList] = useState([])

    const partFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/part/getAllParts`
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

            const partCustomers = partDataList.filter(part => itemList.some(item => item.itemPartName.includes(part._id)))
            console.log(partCustomers)
            setPartCutomerNames(partCustomers)

        }
    }, [partDataList, itemList])



    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [errorhandler, setErrorHandler] = useState({});

    console.log(itemListSelectedRowIds)


    {/*const deleteItemData = async () => {
    try {
        const response = await axios.delete(
            "http://localhost:3001/itemAdd/deleteItemAdd/", {
            data: {
                itemAddIds: itemListSelectedRowIds
            }
        }


        );
       
        setSnackBarOpen(true)
        setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
        console.log("ItemAdd delete Successfully");
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
};*/}



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


            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            console.log("ItemAdd delete Successfully");
            //setItemAddData(initialItemAddData)
            itemFetch()
        } catch (err) {

            setSnackBarOpen(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(', ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
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
        // console.log(sevenDaysAgo.format("YYYY-MM-DD"))

        if (value === "all") {
            setFilteredItemListData(itemList)
        } else {


            if (value === "Past") {
                const pastData = itemList.filter((item) => dayjs(item.itemDueDate).isBefore(currentDate.format("YYYY-MM-DD")))
                setFilteredItemListData(pastData)
                console.log("past")
            }
            if (value === "Today") {
                const CurrentDue = itemList.filter((item) => dayjs(item.itemDueDate).isSame(currentDate.format("YYYY-MM-DD")))
                console.log(dayjs().isSame(currentDate))
                setFilteredItemListData(CurrentDue)
            }
            if (value === "7") {

                const filteredDataLast7Days = itemList.filter((item) => {
                    console.log(item.itemDueDate)
                    return (dayjs(item.itemDueDate).isSameOrBefore(sevenDaysAgo) && dayjs(item.itemDueDate).isSameOrAfter(currentDate.format("YYYY-MM-DD")))
                })
                console.log(dayjs("2023-11-11").isBefore(sevenDaysAgo))
                console.log(filteredDataLast7Days)
                setFilteredItemListData(filteredDataLast7Days)
            }
            if (value === "15") {

                const fifteenDaysFilter = itemList.filter((item) => {
                    console.log(item.itemDueDate)
                    return (dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), fifteenDaysAgo))
                })
                setFilteredItemListData(fifteenDaysFilter)
            }
            if (value === "30") {

                const thirtyDaysFilter = itemList.filter((item) => {
                    console.log(item.itemDueDate)
                    return (dayjs(item.itemDueDate).isBetween(currentDate.format("YYYY-MM-DD"), thirtyDaysAgo))
                })
                setFilteredItemListData(thirtyDaysFilter)
            }

            if (value === ">30") {

                const thirtyDaysFilter = itemList.filter((item) => {
                    console.log(item.itemDueDate)
                    return (dayjs(item.itemDueDate).isAfter(thirtyDaysAgo))
                })
                setFilteredItemListData(thirtyDaysFilter)
            }

            if (value === "Date") {
                setFilteredItemListData(itemList)
            }

        }



    }
    const [itemId, setItemId] = useState("")
    const [statusInfo, setStatusInfo] = useState([])

    {/* const handleRowClick = async (params) => {
        console.log(params)

        setItemId(params.id)
        setStatusInfo(params.row)


    }
console.log(statusInfo)*/}


    const handleRowClick = async (params) => {
        if (itemListSelectedRowIds.length > 0) {

            setShowDialog(true);
        } else {

            setItemId(params.id);
            setStatusInfo(params.row);
            setItemListSelectedRowIds([params.id]);
        }
    };

    const handleConfirmDialogClose = () => {
        setShowDialog(false);
    };
    const handleSelectionModelChange = (newSelection) => {
        setItemListSelectedRowIds(newSelection);
    };







    const handleCloseDialog = () => {
        setOpenModalStatus(false);
    };
    const handleSave = () => {
        if (itemListSelectedRowIds) {

            console.log('Save logic:', itemListSelectedRowIds);
            setOpenModalStatus(false); // Close dialog after saving
        }
    };








    return (
        <div style={{ margin: "2rem" }}>
            <form>
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
                                <div className='col-2'>
                                    <div className='me-2'>
                                        <Button component={Link} to={`/home`} variant="contained" size='small' color="warning">
                                            <ArrowBackIcon /> Dashboard
                                        </Button>

                                    </div>
                                </div>
                                <div className='col-8'>
                                    {dueDate === "Date" && <div className='col d-flex justify-content-end mb-2 g-2'>
                                        <div className="me-2 col-2 ">
                                            <DatePicker

                                                fullWidth
                                                id="startDateId"
                                                name="dueStartDate"
                                                onChange={(newValue) => dueDatePicker(newValue, "dueStartDate")}
                                                label="Start Date"

                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD-MM-YYYY" />
                                        </div>
                                        <div className="me-2 col-2">
                                            <DatePicker

                                                fullWidth
                                                id="endDateId"
                                                name="dueEndDate"
                                                onChange={(newValue) => dueDatePicker(newValue, "dueEndDate")}
                                                label="End Date "

                                                slotProps={{ textField: { size: 'small' } }}
                                                format="DD-MM-YYYY" />
                                        </div>

                                        <div>
                                            <Button variant='contained' startIcon={<FilterAlt />} size='small' color='warning'>Filter</Button>
                                        </div>
                                    </div>}
                                </div>
                                <div className='col-2'>
                                    <div className=' col d-flex justify-content-end'>
                                        {employeeRole.employee !== "viewer" && <React.Fragment> <div className='me-2'>

                                            <Button component={Link} to={`/itemAdd`} variant="contained" size='small' color="warning">
                                                <AddIcon /> Add Item
                                            </Button>

                                        </div>

                                            {/* <div className='me-2'>
                                            {itemListSelectedRowIds.length !== 0 && <Button variant='contained' type='button' color='error' onClick={() => setDeleteModalItem(true)}><DeleteIcon /> Delete </Button>}
                                        </div> */}
                                        </React.Fragment>
                                        }




                                    </div> </div> </div>
                            <Typography variant="h5" className="text-center mb-2">Item List</Typography>

                            <div className="col d-flex mb-2 ">

                                <TextField label="Imte No"
                                    id="imteNoId"
                                    required
                                    select
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
                            <div className="col d-flex  mb-2">

                                <TextField label="Item Type"
                                    id="itemTypeId"
                                    select
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
                            <div className="col d-flex  mb-2">

                                <TextField label="Department  Wise "
                                    id="currentLocationId"
                                    select
                                    defaultValue="all"
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
                            <div className="col d-flex  mb-2">

                                <TextField label="Customer Wise"
                                    id="customerWiseId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}
                                    name="customerWise" >
                                    <MenuItem value="all">All</MenuItem>
                                    {partCutomerNames.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item.customer}</MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label="Calibration source"
                                    id="calibrationSourceId"
                                    select
                                    defaultValue={"all"}
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

                            </div>
                            <div className="col d-flex  mb-2">

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

                            </div>
                            <div className="col d-flex  mb-2">

                                <TextField label=" Part No & Part Name"
                                    id="partNameId"
                                    select
                                    defaultValue="all"
                                    fullWidth
                                    size="small"
                                    onChange={handleFilterChangeItemList}

                                    name="partName" >
                                    <MenuItem value="all">All</MenuItem>
                                    {partDataList.map((item, index) => (
                                        <MenuItem key={index} value={item.partName}>{[item.partNo, item.partName].join(', ')}</MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className="col d-flex  mr-1 ">

                                <TextField label="Plant Wise"
                                    id="plantWiseId"
                                    select
                                    //  value={filterAllNames.plantWise}
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


                        </div>
                        <div className='row g-2'>


                            <div className="col d-flex g-2 mb-2">

                                <div className='col-3'>
                                    <TextField label="Status"
                                        id="statusId"
                                        select
                                        defaultValue="Active"
                                        fullWidth
                                        size="small"
                                        name="status"
                                        onChange={handleFilterChangeItemList}>

                                        <MenuItem value="all">All</MenuItem>
                                        <MenuItem value="Active">Active</MenuItem>
                                        <MenuItem value="InActive">InActive</MenuItem>
                                        <MenuItem value="Spare">Spare</MenuItem>
                                        <MenuItem value="Breakdown">Breakdown</MenuItem>
                                        <MenuItem value="Missing">Missing</MenuItem>
                                        <MenuItem value="Rejection">Rejection</MenuItem>

                                    </TextField>
                                </div>
                                <div className="col-1 offset-7">
                                    {itemListSelectedRowIds.length !== 0 && <Button variant='contained' type='button' size='small' color='error' onClick={() => setDeleteModalItem(true)}><DeleteIcon /> Delete </Button>}
                                </div>
                                <div className="col-1">
                                    <div>
                                        <Button color="secondary" variant='contained' startIcon={<PrintRounded />} size='small' onClick={() => { setSelectedRows(); setItemListPrintOpen(true) }}> Print</Button>

                                    </div>
                                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                                        <Alert onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '25%' }}>
                                            {errorhandler.message}
                                        </Alert>
                                    </Snackbar>

                                </div>

                            </div>


                        </div>
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
                                    onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                        setItemListSelectedRowIds(newRowSelectionModel);


                                    }}

                                    slots={{
                                        toolbar: GridToolbar,
                                    }}

                                    density="compact"
                                    //disableColumnMenu={true}

                                    checkboxSelection
                                    onRowClick={handleRowClick}
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
                                        Are you sure to delete the ItemAdd
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
                                <div className='me-2' >
                                    <button type="button" className='btn btn-sm' >History Card</button>
                                </div>
                                {employeeRole && employeeRole.employee !== "viewer" &&
                                    <div className='me-2' >
                                        {itemListSelectedRowIds.length !== 0 && <button type="button" className='btn btn-warning btn-sm' onClick={() => setOpenModalStatus(true)} >Change status</button>} </div>}

                                <Dialog
                                    open={openModalStatus}
                                    onClose={() => setOpenModalStatus(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    maxWidth="lg-12"

                                >
                                    <DialogContent>


                                        <DialogContentText id="alert-dialog-description ">
                                            <div className='row mb-2'>
                                                <TextField
                                                    id="itemIMTENoId"
                                                    label="ItemIMTE"
                                                    name="itemIMTENo"
                                                    size='small'
                                                    value={statusInfo.itemIMTENo}

                                                    disabled

                                                />
                                            </div>
                                            <div className='row mb-2' >
                                                <TextField
                                                    id="itemMasterId"
                                                    size='small'
                                                    name='itemMaster'
                                                    label="Item Master"

                                                    disabled
                                                    value={statusInfo.itemAddMasterName}

                                                />
                                            </div>
                                            <div className='row mb-2'>
                                                <TextField size='small' select variant='outlined' className='mb-2' onChange={(e) => setStatusInfo((prev) => ({ ...prev, itemStatus: e.target.value }))} value={statusInfo.itemStatus} label="Item Status" name='itemStatus' id='itemStatusId'  >
                                                    <MenuItem value="Active">Active</MenuItem>
                                                    <MenuItem value="InActive">InActive</MenuItem>
                                                    <MenuItem value="Spare">Spare</MenuItem>
                                                    <MenuItem value="Breakdown">Breakdown</MenuItem>
                                                    <MenuItem value="Missing">Missing</MenuItem>
                                                    <MenuItem value="Rejection">Rejection</MenuItem>

                                                </TextField>



                                            </div>
                                        </DialogContentText>



                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenModalStatus(false)}>Cancel</Button>
                                        <Button onClick={() => { updateItemStatus(); setOpenModalStatus(false); }} autoFocus>
                                            Save
                                        </Button>
                                    </DialogActions>
                                </Dialog>





                                {employeeRole.employee !== "viewer" && <div className='me-2' >
                                    <Button component={RouterLink} to={`/itemMaster`} size='small' variant="contained" color="secondary">
                                        Item Master
                                    </Button>

                                </div>}

                                <div className="d-flex justify-content-center">
                                    <ButtonGroup className='me-3'>
                                        <Button component="label" size='small' variant="contained" >
                                            Upload
                                            <VisuallyHiddenInput type="file" onChange={handleItemAddExcel} />
                                        </Button>
                                        <Button size='small' onClick={handleItemAddUpload}><CloudUpload /></Button>
                                    </ButtonGroup>

                                    <ButtonGroup>
                                        <Button component="label" size='small' variant="contained" color='secondary'>
                                            Download
                                            <VisuallyHiddenInput type="file" />
                                        </Button>
                                        <Button size='small' color='secondary'><CloudDownload /></Button>
                                    </ButtonGroup>
                                </div>


                                <div className='me-2 col-1 px-1'>
                                    <button type="button" className='btn btn-secondary btn-sm' >Sticker Print</button>
                                </div>
                                <div className='me-2 col-2'>
                                    <button type="button" className='btn btn-secondary btn-sm' >Sticker Print Barcode</button>
                                </div>


                                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                                    <Alert onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '25%' }}>
                                        {errorhandler.message}
                                    </Alert>
                                </Snackbar>


                            </div>
                                {itemAddExcelStatus && <p style={{color:'green'}}>{itemAddExcelStatus}</p>}

                        </div>




                    </Paper>

                </LocalizationProvider>
            </form>
            <ItemListContent.Provider
                value={{ itemListPrintOpen, setItemListPrintOpen, selectedRows, filteredItemListData }}
            >

                <ItemListPrint />
            </ItemListContent.Provider>

        </div>
    )
}

export default ItemList