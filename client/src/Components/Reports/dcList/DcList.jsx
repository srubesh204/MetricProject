import React, { useState, useEffect, useRef, createContext } from 'react'
import axios from 'axios'
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Container, Paper } from '@mui/material';
import { Edit, FilterAlt, Pages, PictureAsPdf, Print, PrintRounded } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import dayjs from 'dayjs';
import { Add, Remove, HighlightOffRounded } from '@mui/icons-material';
import { ArrowBack, Error, HomeMax, House, Mail, MailLock, } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DcEdit from './DcEdit';
import DcAdd from './DcAdd';
import { useEmployee } from '../../../App';
import DcPrint from './DcPrint';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';

export const DcListContent = createContext(null);

const DcList = () => {

    const empRole = useEmployee()
    const { loggedEmp, allowedPlants } = empRole


    const [printState, setPrintState] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const [dcEditOpen, setDcEditOpen] = useState(false);
    const [dcOpen, setDcOpen] = useState(false);

    const [defaultDeps, setDefaultDeps] = useState([])

    const itemMasterFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            console.log(response.data)
            const defaultData = response.data.result.filter(deps => deps.defaultdep === "yes")
            setDefaultDeps(defaultData.map(dep => dep.department))
            console.log(defaultData)

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemMasterFetchData();
    }, []);
    console.log(defaultDeps)

    const [itemPlantList, setItemPlantList] = useState([])
    const ItemFetch = async (deps) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`, { allowedPlants: allowedPlants }
              );
            console.log(response.data.result)
           
            
            console.log(deps)
            if (deps.length > 0) {
                const departmentItems = response.data.result.filter(item => deps.includes(item.itemCurrentLocation))
                console.log(departmentItems)
                setItemPlantList(departmentItems);
                setItemDepartment(departmentItems);
            }

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        ItemFetch(defaultDeps)
    }, [defaultDeps]);

    //
    const [dcPrintOpen, setDcPrintOpen] = useState(false);

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

    const [lastNo, setLastNo] = useState("1")

    const [dcDataDcList, setDcDataDcList] = useState([])
    const dcListFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/itemDc/getAllItemDc`

            );
            const plantDc = response.data.result.filter(dc => (loggedEmp.plantDetails.map(plant => plant.plantName).includes(dc.dcPlant)))
            const dcNos = response.data.result.map(dc => dc.dcId).filter(Boolean).sort()
            setLastNo((dayjs().year() + "-" + ((dcNos[dcNos.length - 1]) + 1)))
            console.log(dcNos[dcNos.length - 1])
            setDcDataDcList(plantDc);
            setFilteredData(plantDc);


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        dcListFetchData();
    }, []);


    const [dcStateId, setDcStateId] = useState(null)
    const initialDcData = {
        dcPartyId: "",
        dcPartyType: "",
        dcPartyName: "",
        dcPartyCode: "",
        dcPartyAddress: "",
        dcNo: "",
        dcDate: "",
        dcReason: "",
        dcCommonRemarks: "",
        dcPartyItems: [],
        dcPlant: "",
        dcDepartment: ""


    }

    const [dcData, setDcData] = useState({
        dcPartyId: "",
        dcPartyType: "",
        dcPartyName: "",
        dcPartyCode: "",
        dcPartyAddress: "",
        dcNo: "",
        dcDate: "",
        dcReason: "",
        dcCommonRemarks: "",
        dcPartyItems: [],
        dcPlant: "",
        dcDepartment: ""

    })
    console.log(dcData)





    const [vendorDataList, setVendorDataList] = useState([])
    const [vendorFullList, setVendorFullList] = useState([])
    const [vendorTypeList, setVendorTypeList] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const FetchData = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/vendor/getVendorByPlants`, { allowedPlants: allowedPlants }
              );
            console.log(response.data)

            setVendorFullList(response.data.result);
            setVendorTypeList(response.data.result)
            setVendorDataList(response.data.result);

            // setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        FetchData();
    }, []);
    const [itemDepartment, setItemDepartment] = useState([])

    const [departments, setDepartments] = useState([])
    const DepartmentFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/department/getAllDepartments`
            );
            const defaultDepartment = response.data.result.filter((dep) => dep.defaultdep === "yes")
            setDepartments(defaultDepartment);

            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        DepartmentFetch()
    }, []);



    const oneMonthBefore = dayjs().subtract(dayjs().date() - 1, 'day')
    const [dateData, setDateData] = useState({
        fromDate: oneMonthBefore.format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD')
    })




    const [dcListDataList, setDcListDataList] = useState([])




    useEffect(() => {
        const filteredItems = dcDataDcList.filter((item) => dayjs(item.dcDate).isSameOrAfter(dateData.fromDate) && dayjs(item.dcDate).isSameOrBefore(dateData.toDate))
        console.log(filteredItems)
        setFilteredData(filteredItems)
    }, [dateData.fromDate, dateData.toDate])




    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }
    {/*const [selectedRowView, setSelectedRowView] = useState(null);
    const handleViewClick = (params) => {
        setSelectedRowView(params); // Set the selected row data
        setDcListDataList(params.dcPartyItems)

    };*/}
    const [selectedRowView, setSelectedRowView] = useState(null);
    // const [dcListDataList, setDcListDataList] = useState([]);

    const handleViewClick = (params) => {
        setSelectedRowView(params); // Set the selected row data
    };

    useEffect(() => {
        if (selectedRowView) {
            // Assuming params.dcPartyItems is an array
            setDcListDataList(selectedRowView.dcPartyItems || []);
        }
    }, [selectedRowView]);



    // const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])
    //
    const Columns = [

        { field: 'id', headerName: 'Si. No', headerAlign: "center", align: "center", width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1 },
        // ...(empRole && empRole.employee !== 'viewer'
        //     ? [{ field: 'editButton', headerAlign: "center", align: "center", headerName: 'Edit', width: 100, renderCell: (params) => <Button onClick={() => { setSelectedRows(params.row); setDcEditOpen(true) }}><Edit color='success' /></Button> }] : []),
        {
            field: 'viewButton',
            headerAlign: "center",
            align: "center",
            headerName: 'View',
            width: 100,

            renderCell: (params) => (


                <RemoveRedEyeIcon color="primary"
                    onClick={() => handleViewClick(params.row)} />

            ),
        },
        { field: 'dcNo', headerName: 'Dc No', headerAlign: "center", align: "center", width: 100 },
        { field: 'dcDate', headerName: 'Dc Date', headerAlign: "center", align: "center", width: 200, renderCell : (params) => dayjs(params.row.dcDate).format("DD-MM-YYYY") },
        { field: 'dcPartyName', headerName: 'Dc PartyName', headerAlign: "center", align: "center", width: 300 },
        { field: 'printButton', headerName: 'Print', headerAlign: "center", align: "center", width: 100, renderCell: (params) => <Button component={Link} to={`${process.env.REACT_APP_PORT}/dcCertificate/${params.row.dcNo}.pdf`} target='_blank'><PrintRounded color='success' /></Button> }
    ]


    const [dcListSelectedRowIds, setDcListSelectedRowIds] = useState([])



    const [printModel, setPrintModel] = useState(false)



    const [deleteModalItem, setDeleteModalItem] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [errorhandler, setErrorHandler] = useState({});
    const [itemListSelectedRowIds, setItemListSelectedRowIds] = useState([])

    const deleteDcData = async (id) => {

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_PORT}/itemDc/deleteItemDc`, {
                data: {
                    itemDcIds: itemListSelectedRowIds
                }
            }
            );

            setDcData(initialDcData)
            setSnackBarOpen(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            ItemFetch()

            dcListFetchData()
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
                console.log(err.response)
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500);
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }
            console.log(err);
        }
    };




    const handleRowClick = async (params) => {
        console.log(params)
        setDcData(params.row)
        setDcStateId(params.id)
    }


    const [companyList, setCompanyList] = useState([])

    const companyFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/compDetails/getAllCompDetails`
            );
            setCompanyList(response.data.result);
            //setFilterCompany(response.data.result);

            console.log(response.data.result);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        companyFetch();
    }, []);
    const [plantList, setPlantList] = useState([])

    const Fetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/compDetails/getAllPlantDetails`
            );
            setPlantList(response.data.result);
            //setFilterCompany(response.data.result);

            console.log(response.data.result);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        Fetch();
    }, []);



    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === "vendorType") {
            if (value === "all") {
                setVendorTypeList(vendorFullList)
            } else {
                const vendorType = vendorDataList.filter((item) => (item[value] === "1"))
                setVendorTypeList(vendorType)
            }
        }
        if (name === "partyName") {
            const partyName = dcDataDcList.filter((item) => (item.dcPartyName === value))
            setFilteredData(partyName)
            console.log(value)
        }
        if (name === "dcPlant") {
            const dcPlant = dcDataDcList.filter((item) => (item.dcPlant === value))
            setFilteredData(dcPlant);
        }
        if (name === "dcDepartment") {
            // const itemDepartment = dcDataDcList.filter((item) => (item.itemDepartment && item.itemDepartment.includes(value)));
            const dcDepartment = dcDataDcList.filter((dc) => (dc.dcDepartment.includes(value)))

            setFilteredData(dcDepartment);
        }
        setDateData((prev) => ({ ...prev, [name]: value }))




    };
    console.log(dcDataDcList)

    {/* const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (value === "all") {
            setFilteredData(dcDataDcList)
        } else {
            if (name === "dcPartyType") {
                const dcPartyType = dcDataDcList.filter((item) => (item.dcPartyType === value))
                console.log(value)
                setFilteredData(dcPartyType)
            }
            if (name === "partyName") {
                const partyName = dcDataDcList.filter((item) => (item.dcPartyName === value))
                console.log(value)
                setFilteredData(partyName)

            }

            setDateData((prev) => ({ ...prev, [name]: value }))


        }


    }*/}

    {/*  const handleFilterChange = (e) => {
        const { name, value } = e.target;

        if (value === "all") {
            setFilteredData(vendorDataList)
        } else {
            if (value === "oem") {
                const vendorType = vendorDataList.filter((item) => (item.oem === "1"))
                setFilteredData(vendorType)
            }
            if (value === "customer") {
                const vendorType = vendorDataList.filter((item) => (item.customer === "1"))
                setFilteredData(vendorType)
            }
            if (value === "supplier") {
                const vendorType = vendorDataList.filter((item) => (item.supplier === "1"))
                setFilteredData(vendorType)
            }
            if (value === "subContractor") {
                const vendorType = vendorDataList.filter((item) => (item.subContractor === "1"))
                setFilteredData(vendorType)
            }
            if (name === "partyName") {
                const partyName = vendorDataList.filter((item) => (item.dcPartyName === value))
                console.log(value)
                setFilteredData(partyName)

            }
        }
        setDateData((prev) => ({ ...prev, [name]: value }))


    };*/}









    const dcListColumns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },
        { field: 'itemIMTENo', headerName: 'Item IMTENo', width: 150, headerAlign: "center", align: "center", },
        { field: 'itemAddMasterName', headerName: 'Item Description', headerAlign: "center", align: "center", width: 150 },
        { field: 'itemRangeSize', headerName: 'Range/Size', headerAlign: "center", align: "center", width: 100 },
        { field: 'dcItemRemarks', headerName: 'Remarks', headerAlign: "center", align: "center", width: 200 },
    ]
    console.log(dcDataDcList)


    const sampleData = {
        title: 'Printable Document',
        content: 'This is some sample content to be printed.',
        // Add more data here if needed
    };

    
    

    
   


    console.log(selectedRows)

 

    return (
        <div className='px-5 pt-3'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>





                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1
                        }}
                        elevation={12}
                    >
                        <div className='row '>

                            <div className='col d-flex '>
                                <div className='col me-2'>
                                    <TextField label="Vendor Type"
                                        id="vendorTypeId"
                                        select
                                        defaultValue=""
                                        onChange={handleFilterChange}
                                        size="small"
                                        sx={{ width: "101%" }}

                                        name="vendorType" >
                                        <MenuItem value=""><em>--Select--</em></MenuItem>
                                        <MenuItem value="oem">OEM</MenuItem>
                                        <MenuItem value="customer">Customer</MenuItem>
                                        <MenuItem value="supplier">Supplier</MenuItem>
                                        <MenuItem value="subContractor">SubContractor</MenuItem>

                                    </TextField>

                                </div>
                                <div className='col me-2'>
                                    <TextField fullWidth label="Party Name" className="col" select size="small" onChange={handleFilterChange} id="partyNameId" name="partyName" defaultValue="" >

                                        <MenuItem value="all">All</MenuItem>
                                        {vendorTypeList.map((item, index) => (
                                            <MenuItem key={index} value={item.fullName}>{item.fullName}</MenuItem>
                                        ))}


                                    </TextField>

                                </div>
                                <div className='col me-2'>

                                    <TextField label="Plant Wise"
                                        id="dcPlantId"
                                        select
                                        defaultValue="all"
                                        // value={filterAllNames.plantWise}
                                        fullWidth

                                        onChange={handleFilterChange}
                                        size="small"
                                        name="dcPlant" >

                                        <MenuItem value="all">All</MenuItem>
                                        {loggedEmp.plantDetails.map((item, index) => (
                                            <MenuItem key={index} value={item.plantName}>{item.plantName}</MenuItem>
                                        ))}


                                    </TextField>

                                </div>
                                <div className='col '>

                                    <TextField label="Primary Location "
                                        id="dcDepartmentId"
                                        select
                                        defaultValue="all"
                                        // value={filterAllNames.currentLocation}
                                        fullWidth
                                        onChange={handleFilterChange}
                                        size="small"
                                        name="dcDepartment" >
                                        <MenuItem value="all">All</MenuItem>
                                        {departments.map((item, index) => (
                                            <MenuItem key={index} value={item.department}>{item.department}</MenuItem>
                                        ))}


                                    </TextField>

                                </div>
                            </div>
                            <div className=' col d-flex justify-content-end'>
                                <div className="col-3 me-2">

                                    <DatePicker
                                        fullWidth
                                        id="fromDateId"
                                        name="fromDate"
                                        size="small"
                                        label="From Date"
                                        sx={{ width: "100%" }}
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY"
                                        value={dayjs(dateData.fromDate)}
                                        onChange={(newValue) =>
                                            setDateData((prev) => ({ ...prev, fromDate: dayjs(newValue).format('YYYY-MM-DD') }))}
                                    />

                                </div>
                                <div className="col-3">

                                    <DatePicker
                                        fullWidth
                                        id="toDateId"
                                        name="toDate"
                                        label="To Date"
                                        sx={{ width: "100%" }}
                                        slotProps={{ textField: { size: 'small' } }}
                                        format="DD-MM-YYYY" value={dayjs(dateData.toDate)}
                                        onChange={(newValue) =>
                                            setDateData((prev) => ({ ...prev, toDate: dayjs(newValue).format('YYYY-MM-DD') }))} />

                                </div>

                            </div>

                        </div>



                        <div className='row'>
                            <Box sx={{ height: 310, width: '100%', my: 2 }}>
                                <DataGrid disableDensitySelector

                                    rows={filteredData}
                                    columns={Columns}
                                    getRowId={(row) => row._id}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    sx={{
                                        ".MuiTablePagination-displayedRows": {

                                            "marginTop": "1em",
                                            "marginBottom": "1em"
                                        }
                                    }}
                                    onRowSelectionModelChange={(newRowSelectionModel) => {
                                        setItemListSelectedRowIds(newRowSelectionModel);
                                    }}
                                    disableRowSelectionOnClick
                                    slots={{
                                        toolbar: () => (
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <GridToolbar />
                                                <div className='mt-2'>
                                                    {itemListSelectedRowIds.length !== 0 && <Button variant='contained' type='button' size='small' color='error' onClick={() => setDeleteModalItem(true)}> Delete </Button>}
                                                </div>

                                            </div>
                                        ),
                                    }}

                                    density="compact"
                                    disableColumnMenu={true}

                                    checkboxSelection

                                    onRowClick={handleRowClick}


                                />

                            </Box>

                        </div>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1
                        }}
                        elevation={12}
                    >

                        <div className='row'>
                            <Box sx={{ height: 310, width: '100%', my: 2 }}>
                                <DataGrid disableDensitySelector
                                    rows={dcListDataList}
                                    columns={dcListColumns}
                                    getRowId={(row) => row._id}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    sx={{
                                        ".MuiTablePagination-displayedRows": {

                                            "marginTop": "1em",
                                            "marginBottom": "1em"
                                        }
                                    }}
                                    onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                        setDcListSelectedRowIds(newRowSelectionModel);


                                    }}

                                    slots={{
                                        toolbar: GridToolbar,
                                    }}

                                    density="compact"
                                    //disableColumnMenu={true}

                                    // checkboxSelection
                                    //onRowClick={handleRowClick}
                                    disableRowSelectionOnClick
                                    pageSizeOptions={[5]}
                                />

                            </Box>

                        </div>
                        <div className='row'>
                            <div className='col d-flex '>
                                {/* <div className='me-2 '>
                                    <button type="button" className='btn btn-secondary' >Print</button>
                                </div> */}
                                <div className='row'>
                                    <div className='col d-flex justify-content-end'>
                                        <div className='me-2'>
                                            <Button component={Link} to={`/home`} variant="contained" size='small' color="warning">
                                                <ArrowBackIcon /> Dash board
                                            </Button>
                                        </div>
                                        {/* <div >
                                            <Button component={Link} to="/" size='small' variant='contained' startIcon={<ArrowBack />} endIcon={<House />} color='secondary'>Home</Button>
                                        </div> */}
                                    </div>


                                </div>


                            </div>
                            <div className='col d-flex justify-content-end'>
                           

                                {/* Hidden section to render PrintContent */}


                                {empRole.employee !== "viewer" && <React.Fragment>
                                    {/* <div className='me-2 '>
                                        <Button component={Link} onClick={() => { setDcOpen(true) }} type='button' variant="contained" color="warning">
                                            <AddIcon /> New Dc
                                        </Button>
                                    </div> */}
                                </React.Fragment>
                                }

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
                                        <Button onClick={() => { deleteDcData(); setDeleteModalItem(false); }} autoFocus>
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>


                                <Dialog
                                    open={printModel}
                                    onClose={() => setPrintModel(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {" ItemAdd delete confirmation?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DcPrint data={{ selectedRows }} />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setPrintModel(false)}>Cancel</Button>
                                        <Button onClick={() => { deleteDcData(); setDeleteModalItem(false); }} autoFocus>
                                            Print
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                            </div>

                            <DcListContent.Provider
                                value={{ dcEditOpen, setDcEditOpen, selectedRows, dcListFetchData, printState, setPrintState, itemPlantList, dcDataDcList, ItemFetch, allowedPlants }}
                            >
                                <DcEdit />
                            </DcListContent.Provider>
                            <DcListContent.Provider
                                value={{ dcOpen, setDcOpen, selectedRows, dcListFetchData, printState, setPrintState, itemPlantList, dcDataDcList, ItemFetch, lastNo }}
                            >
                                <DcAdd />
                            </DcListContent.Provider>



                        </div>
                    </Paper>
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity={errorhandler.code} variant='filled' sx={{ width: '100%' }}>
                            {errorhandler.message}
                        </Alert>
                    </Snackbar>


                </form>

            </LocalizationProvider>
        </div>


    )
}

export default DcList