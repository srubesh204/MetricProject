import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Autocomplete,
  Box,
  ButtonGroup,
  Checkbox,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Alert,
  Snackbar,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Typography
} from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CloudDownload, CloudUpload, Delete, Check, Clear } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import styled from "@emotion/styled";
import { Link } from 'react-router-dom';



export const Department = () => {


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

  const [depFile, setDepFile] = useState(null);
  const [areaFile, setAreaFile] = useState(null);
  const [pouFile, setPouFile] = useState(null);
  const [depExcelStatus, setDepExcelStatus] = useState('');
  const [areaExcelStatus, setAreaExcelStatus] = useState('');
  const [pouExcelStatus, setPouExcelStatus] = useState('');

  const handleExcel = (e, name) => {
    if (name === "dep") {
      const selectedFile = e.target.files[0];
      console.log(selectedFile)
      setDepFile(selectedFile);
    }
    if (name === "area") {
      const selectedFile = e.target.files[0];
      console.log(selectedFile)
      setAreaFile(selectedFile);
    }
    if (name === "pou") {
      const selectedFile = e.target.files[0];
      console.log(selectedFile)
      setPouFile(selectedFile);
    }

  };

  const handleUpload = async (e, name) => {

    try {
      if (name === "dep") {
        if (!depFile) {
          setDepExcelStatus('No file selected');
          return;
        }

        const formData = new FormData();
        formData.append('file', depFile);

        const response = await axios.post(`${process.env.REACT_APP_PORT}/department/uploadDepartmentInExcel`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setDepExcelStatus(response.data.message || 'Excel file uploaded successfully');
        depFetchData();

      }
      if (name === "area") {
        if (!areaFile) {
          setAreaExcelStatus('No file selected');
          return;
        }

        const formData = new FormData();
        formData.append('file', areaFile);

        const response = await axios.post(`${process.env.REACT_APP_PORT}/area/uploadAreaInExcel`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setAreaExcelStatus(response.data.message || 'Excel file uploaded successfully');
        areaFetchData();

      }
      if (name === "pou") {
        if (!pouFile) {
          setPouExcelStatus('No file selected');
          return;
        }

        const formData = new FormData();
        formData.append('file', pouFile);

        const response = await axios.post(`${process.env.REACT_APP_PORT}/placeOfUsage/uploadPlaceOfUsageInExcel`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setPouExcelStatus(response.data.message || 'Excel file uploaded successfully');
        placeOfUsageData();

      }

    } catch (error) {
      if (name === "dep") {
        if (error.response) {
          setDepExcelStatus(`Error: ${error.response.data.error || 'Something went wrong'}`);
        } else if (error.request) {
          setDepExcelStatus('Network error. Please try again.');
        } else {
          setDepExcelStatus('Error uploading the file.');
        }
        console.error('Error uploading Excel file:', error);
        setTimeout()
      }

      if (name === "area") {
        if (error.response) {
          setAreaExcelStatus(`Error: ${error.response.data.error || 'Something went wrong'}`);
        } else if (error.request) {
          setAreaExcelStatus('Network error. Please try again.');
        } else {
          setAreaExcelStatus('Error uploading the file.');
        }
        console.error('Error uploading Excel file:', error);
        setTimeout()
      }

      if (name === "pou") {
        if (error.response) {
          setPouExcelStatus(`Error: ${error.response.data.error || 'Something went wrong'}`);
        } else if (error.request) {
          setPouExcelStatus('Network error. Please try again.');
        } else {
          setPouExcelStatus('Error uploading the file.');
        }
        console.error('Error uploading Excel file:', error);
        setTimeout()
      }
    }
  };


  useEffect(() => {
    if (depExcelStatus) {
      const timeoutId = setTimeout(() => {
        setDepExcelStatus('');
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [depExcelStatus]);

  useEffect(() => {
    if (areaExcelStatus) {
      const timeoutId = setTimeout(() => {
        setAreaExcelStatus('');
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [areaExcelStatus]);

  useEffect(() => {
    if (pouExcelStatus) {
      const timeoutId = setTimeout(() => {
        setPouExcelStatus('');
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [pouExcelStatus]);



  const { id } = useParams()
  console.log(id)


  const [depOpenModal, setDepOpenModal] = useState(false);
  const [areaOpenModal, setAreaOpenModal] = useState(false);
  const [pouOpenModal, setPouOpenModal] = useState(false);
  const [deleteDepModal, setDeleteDepModal] = useState(false);
  const [deleteAreaModal, setDeleteAreaModal] = useState(false);
  const [deletePouModal, setDeletePouModal] = useState(false);

  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  }
  const [errorhandler, setErrorHandler] = useState({})
  console.log(errorhandler)



  const emptyDepartmentData = {
    department: "",
    departmentStatus: "active",
    defaultdep: "no"
  }
  const [departmentData, setDepartmentData] = useState({
    department: "",
    departmentStatus: "active",
    defaultdep: "no"
  });
  console.log(departmentData)

  //get Departments
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



  const columns = [

    { field: 'id', headerName: 'Si.No', width: 90, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center" },

    { field: 'department', headerName: 'Department', headerAlign: "center", align: "center", width: "200" },
    { field: 'departmentStatus', headerName: 'Status', headerAlign: "center", align: "center", width: "200" },
    {
      field: 'defaultdep', headerName: 'Default', width: "300", headerAlign: "center", align: "center",
      renderCell: (params) => params.row.defaultdep === "yes" ? <Check color="success" /> : <Clear color="error" />
    },
    // {
    //   field: 'delete',
    //   headerName: 'Delete',
    //   width: 80, headerAlign: "center",
    //   sortable: false,
    //   renderHeader: () => (
    //     <IconButton color='error' aria-label="Delete" onClick={() => setDeleteDepModal(true)}>
    //       <Delete />
    //     </IconButton>
    //   ),
    // },
  ];

  const [selectedRowIds, setSelectedRowIds] = useState([]);




  // Validate function
  const [errors, setErrors] = useState({
    department: "",
    area: "",
    placeOfUsage: "",
  });

  const departmentValidateFunction = () => {
    let departtempErrors = { ...errors };
    departtempErrors.department = departmentData.department ? "" : "Department is Required";

    setErrors({ ...departtempErrors });

    return departtempErrors.department === "";
  };

  const areaValidateFunction = () => {
    let areatempErrors = { ...errors };
    areatempErrors.area = areaData.area ? "" : "Area is Required";

    setErrors({ ...areatempErrors });

    return areatempErrors.area === "";
  };

  const placeOfUsageValidateFunction = () => {
    let tempErrors = { ...errors };
    tempErrors.placeOfUsage = placeOfUsageDatas.placeOfUsage ? "" : "Place Of Usage is Required";

    setErrors({ ...tempErrors });

    return tempErrors.placeOfUsage === "";
  };

  console.log(errors);




  //
  //Submit Department
  const DepartmentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (departmentValidateFunction()) {
        const response = await axios.post(
          `${process.env.REACT_APP_PORT}/department/createDepartment`, departmentData
        );
        console.log(response.data.message)
        depFetchData();
        setDepartmentData(emptyDepartmentData);
        setSnackBarOpen(true)
        setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
        console.log("Department create Successfully");
      } else {
        setErrorHandler({ status: 0, message: "Fill the required fields", code: "error" })
      }
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

  const updateDepartment = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_PORT}/department/updateDepartment/${depStateId}`, departmentData

      );
      depFetchData();
      setDepartmentData(emptyDepartmentData);
      setDepStateId(null)
      setSnackBarOpen(true)
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      console.log("Department Updated Successfully");
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

  const deleteDepartment = async () => {
    try {
      const response = await axios.delete(

        `${process.env.REACT_APP_PORT}/department/deleteDepartment`, {
        data: {
          departmentIds: selectedRowIds
        }
      }

      );
      depFetchData();

      setSnackBarOpen(true)
      setDepartmentData(emptyDepartmentData);
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      console.log("Department Deleted Successfully");
      setDepStateId(null)
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
        const errorMessages500 = Object.values(errorData500).join(', ');
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



  const handleDepRowClick = async (params) => {
    console.log(params)
    setDepartmentData(params.row)
    setDepStateId(params.id)
  }


  const initialAreaData = {
    area: "",
    areaStatus: "active"
  }
  const [areaData, setArea] = useState({
    area: "",
    areaStatus: "active"
  });
  const [areaList, setAreaList] = useState([]);




  const areaFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/area/getAllAreas`
      );
      setAreaList(response.data.result);
      //console.log(response.data.result)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    areaFetchData();
  }, []);

  const [areaSelectedRowIds, setAreaSelectedRowIds] = useState([]);


  const areaColumns = [
    { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center", },

    { field: 'area', headerName: 'Area', width: "90", headerAlign: "center", align: "center", },
    { field: 'areaStatus', headerName: ' Area Status', width: "90", headerAlign: "center", align: "center", },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 80,
      headerAlign: "center",
      sortable: false,
      renderHeader: () => (
        <IconButton color='error' aria-label="Delete" onClick={() => setDeleteAreaModal(true)}>
          <Delete />
        </IconButton>
      ),
    },


  ];




  const AreaSubmit = async (e) => {
    e.preventDefault();
    try {
      if (areaValidateFunction()) {

      }
      const response = await axios.post(
        `${process.env.REACT_APP_PORT}/area/createArea`, areaData
      );
      console.log(response.data.message)
      areaFetchData();
      setArea(initialAreaData);
      setSnackBarOpen(true)
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      console.log("Area create Successfully");
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
        const errorMessages500 = Object.values(errorData500).join(', ');
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

  const updateArea = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_PORT}/area/updateArea/${areaStateId}`, areaData

      );
      areaFetchData();
      setArea(initialAreaData);
      setareaStateId(null)
      setSnackBarOpen(true)
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      console.log("Area Updated Successfully");
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
  const deleteArea = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_PORT}/area/deleteArea`, {
        data: {
          areaIds: areaSelectedRowIds
        }
      }


      );
      areaFetchData();
      setareaStateId(null)
      setSnackBarOpen(true)
      setArea(initialAreaData);
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      console.log("Area Deleted Successfully");
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
        const errorMessages500 = Object.values(errorData500).join(', ');
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


  const handleAreaRowClick = async (params) => {
    console.log(params)
    setArea(params.row)
    setareaStateId(params.id)
  }

















  const initialPlaceOfUsageData = {
    placeOfUsage: "",
    placeOfUsageStatus: "active"

  }


  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [depStateId, setDepStateId] = useState(null)
  const [areaStateId, setareaStateId] = useState(null)
  const [placeOfUsageId, setPlaceOfUsageId] = useState(null)




  const [departmentList, setDepartmentList] = useState([]);











  const capitalizeAfterSpaceOrPeriod = (value) => {
    return value.toLowerCase().replace(/(?:^|\s|\.|\/)([a-z])/g, (match) => match.toUpperCase());
  };

  const handleDepChange = (e) => {
    const { name, value, checked } = e.target;
    const formattedValue = name === 'department'
      ? capitalizeAfterSpaceOrPeriod(value)
      : value;


    if (name === "defaultdep") {
      console.log(checked)
      setDepartmentData((prev) => ({
        ...prev,
        [name]: checked ? "yes" : "no"
      }));
    } else {
      setDepartmentData((prev) => ({ ...prev, [name]: formattedValue }))
    }



  };

  const handleAreaChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'area'
      ? value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : value;
    setArea((prev) => ({ ...prev, [name]: formattedValue }))
  };

  const handlePouChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'placeOfUsage'
      ? value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : value;
    setPlaceOfUsageData((prev) => ({ ...prev, [name]: formattedValue }))
  };


  const handleKeyDown = (event) => {
    const { name, value } = event.target
    console.log(name)
    if (event.key === 'Tab') {
      // Prevent default Tab behavior

      const formattedValue = value.toLowerCase().
        split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      console.log(formattedValue)
      // Format the input value (capitalization)
      // Update the state to show the formatted value
      setDepartmentData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


    }
  };
  const handleAreaKeyDown = (event) => {
    const { name, value } = event.target
    console.log(name)
    if (event.key === 'Tab') {
      // Prevent default Tab behavior

      const formattedValue = value.toLowerCase().
        split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      console.log(formattedValue)
      // Format the input value (capitalization)
      // Update the state to show the formatted value
      setArea((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


    }
  };





  //placeOfusage


  const [placeOfUsageDatas, setPlaceOfUsageData] = useState({
    placeOfUsage: "",
    placeOfUsageStatus: "active"

  });
  const [placeOfUsageList, setPlaceOfUsageList] = useState([]);



  const updatePof = async (params) => {
    console.log(params)
    setPlaceOfUsageData(params.row)
    setPlaceOfUsageId(params.id)
  }




  const placeOfUsageData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/placeOfUsage/getAllPlaceOfUsages`
      );
      setPlaceOfUsageList(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    placeOfUsageData();
  }, []);

  const [placeOfUsageselectedRowIds, setPlaceOfUsageSelectedRowIds] = useState([]);


  const placeOfUsageColumns = [
    { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center" },

    { field: 'placeOfUsage', headerName: 'Place Of Usage', width: "70", headerAlign: "center", align: "center", },
    { field: 'placeOfUsageStatus', headerName: ' Place Of Usage Status', width: "100", headerAlign: "center", align: "center", },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 90,
      headerAlign: "center",
      sortable: false,
      renderHeader: () => (
        <IconButton color='error' aria-label="Delete" onClick={() => setDeletePouModal(true)}>
          <Delete />
        </IconButton>
      ),
    },


  ];





  const placeOfUsageSubmit = async (e) => {
    e.preventDefault();
    try {
      if (placeOfUsageValidateFunction()) {

      }
      const response = await axios.post(
        `${process.env.REACT_APP_PORT}/placeOfUsage/createPlaceOfUsage`, placeOfUsageDatas
      );
      console.log(response.data.message)
      placeOfUsageData();
      setPlaceOfUsageData(initialPlaceOfUsageData);
      setSnackBarOpen(true)
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      console.log("placeOfUsage create Successfully");
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
        const errorMessages500 = Object.values(errorData500).join(', ');
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

  const updatePlaceofUsagedata = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_PORT}/placeOfUsage/updatePlaceOfUsage/${placeOfUsageId}`, placeOfUsageDatas

      );
      placeOfUsageData();
      setPlaceOfUsageData(initialPlaceOfUsageData);

      setPlaceOfUsageId(null)
      setSnackBarOpen(true)
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      console.log(" PlaceOfUsage Updated Successfully");
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

  console.log(placeOfUsageId)



  const deletePlaceOfUsage = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_PORT}/PlaceOfUsage/deletePlaceOfUsage`, {
        data: {
          placeOfUsageIds: placeOfUsageselectedRowIds
        }
      }

      );
      placeOfUsageData();
      setPlaceOfUsageId(null)
      setSnackBarOpen(true)
      setPlaceOfUsageData(initialPlaceOfUsageData);
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      console.log("PlaceOfUsage Deleted Successfully");
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
        const errorMessages500 = Object.values(errorData500).join(', ');
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
  const handlePlaceOfKeyDown = (event) => {
    const { name, value } = event.target
    console.log(name)
    if (event.key === 'Tab') {
      // Prevent default Tab behavior

      const formattedValue = value.toLowerCase().
        split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      console.log(formattedValue)
      // Format the input value (capitalization)
      // Update the state to show the formatted value
      setPlaceOfUsageData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


    }
  };





  // const uploadLable = {
  //   display: "block",
  //   width: "70px",
  //   maxWidth: "300px",
  //   backgroundColor: "slateblue",
  //   borderRadius: "5px",
  //   fontSize: "1em",
  //   lineHeight: "2.42em",
  //   textAlign: "center",
  // };
  // const downLable = {
  //   border: "0",
  //   clip: "rect(1px, 1px, 1px, 1px)",
  //   height: "1px",
  //   margin: "-1px",
  //   overflow: "hidden",
  //   padding: "0",
  //   position: "absolute",
  //   width: "1px",
  // };

  return (
    <div >

      <form>
        <div className="container row">
          <Box sx={{ flexGrow: 1, m: 2 }}>





            <div className="row">



              <Paper
                sx={{
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  m: 2,


                }}
                elevation={12}
                className='col row'
              >
                <Typography variant="h5" component="h5" className="text-center">Department</Typography>
                <div className="row g-2" >

                  <div className="col-md-5">



                    <Autocomplete label="Department"
                      disablePortal
                      size="small"
                      getOptionDisabled={option => true}
                      options={departmentList.map((dep) => ({ label: dep.department }))}
                      fullWidth
                      clearOnBlur={false}
                      value={departmentData.department}
                      renderInput={(params) =>
                        <TextField  {...(errors.department !== "" && { helperText: errors.department, error: true })} onKeyDown={handleKeyDown} onChange={handleDepChange}
                          name="department" {...params} label="Department" />} />

                  </div>
                  <div className="col-md-4">

                    <TextField label="Status"
                      id="departmentStatusId"
                      select
                      defaultValue="active"
                      fullWidth
                      size="small"
                      onChange={handleDepChange}

                      value={departmentData.departmentStatus}
                      name="departmentStatus" >

                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inActive">inActive</MenuItem>
                    </TextField>

                  </div>
                  <div className="col-md-3">
                    <FormControlLabel control={<Checkbox size="small" name="defaultdep" checked={departmentData.defaultdep === "yes"} onChange={handleDepChange} />} label="Default" />
                  </div>

                </div>

                <div className="row g-2">
                  <div className="col d-flex">
                    <div className="d-flex justify-content-center">
                      <ButtonGroup className="me-2" size="small">
                        <Button component="label" size="small" variant="contained" >
                          Upload
                          <VisuallyHiddenInput type="file" onChange={(e) => handleExcel(e, "dep")} />
                        </Button>
                        <Button size="small" onClick={(e) => handleUpload(e, "dep")}><CloudUpload /></Button>
                      </ButtonGroup>

                      {/* <ButtonGroup size="small">
                        <Button component="label" size="small" variant="contained" color='secondary'>
                          Download
                          <VisuallyHiddenInput type="file" />
                        </Button>
                        <Button color='secondary' size="small"   ><CloudDownload /></Button>
                      </ButtonGroup> */}
                    </div>

                  </div>


                  {depStateId ? <Dialog
                    open={depOpenModal}
                    onClose={() => setDepOpenModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {" Department update confirmation?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure to update the Department
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setDepOpenModal(false)}>Cancel</Button>
                      <Button onClick={(e) => { updateDepartment(); setDepOpenModal(false); }} autoFocus>
                        Update
                      </Button>
                    </DialogActions>
                  </Dialog> :
                    <Dialog
                      open={depOpenModal}
                      onClose={() => setDepOpenModal(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {" Department create confirmation?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure to add the Department
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setDepOpenModal(false)}>Cancel</Button>
                        <Button onClick={(e) => { DepartmentSubmit(e); setDepOpenModal(false); }} autoFocus>
                          Add
                        </Button>
                      </DialogActions>
                    </Dialog>}







                  <div className="col-md text-end">

                    {depStateId ? (<div className="d-flex justify-content-end">
                      <Button className="me-1"
                        type="button"
                        variant="contained" size="small"
                        color='warning'


                        onClick={() => setDepOpenModal(true)}

                      >
                        Modify
                      </Button >
                      <Button type="button" variant="contained" size="small" color='error' onMouseEnter={(e) => { e.target.style.background = 'red' }} onMouseOut={(e) => { e.target.style.background = '#e6e6e6' }}
                        // style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                        // className="btn text-end"
                        onClick={() => { setDepStateId(null); setDepartmentData(emptyDepartmentData) }}
                      >Cancel</Button>
                    </div>) : <div >
                      <Button variant="contained" type="button"
                        size="small"

                        color='success'

                        className="btn text-end hover" onClick={() => setDepOpenModal(true)}
                      >+ Add Department</Button>
                    </div>}


                  </div>

                  {depExcelStatus && <p style={{ color: 'green' }}>{depExcelStatus}</p>}



                </div>

                <div className="row g-2">




                  <div style={{ height: 480, width: '100%' }}>
                    <DataGrid
                      rows={departmentList}
                      columns={columns}
                      disableDensitySelector
                      disableColumnSelector
                      getRowId={(row) => row._id}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                        },
                      }}
                      sx={{
                        ".MuiTablePagination-displayedRows": {

                          "marginTop": "1em",
                          "marginBottom": "1em",



                        }
                      }}
                      slots={{
                        toolbar: () => (
                          <div className='d-flex justify-content-between align-items-center'>
                            <GridToolbar />
                            <div>
                              {selectedRowIds.length !== 0 && <Button variant='contained' size="small" type='button' color='error' onClick={() => setDeleteDepModal(true)}>Delete </Button>}
                            </div>

                          </div>
                        ),
                      }}
                      onRowSelectionModelChange={(newRowSelectionModel, event) => {
                        setSelectedRowIds(newRowSelectionModel);
                        console.log(event)

                      }}
                      onRowClick={handleDepRowClick}

                      density="compact"

                      checkboxSelection
                      pageSizeOptions={[5]}


                    >

                    </DataGrid>




                  </div>

                  <Dialog
                    open={deleteDepModal}
                    onClose={() => setDeleteDepModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {" Department delete confirmation?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure to delete the Department
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setDeleteDepModal(false)}>Cancel</Button>
                      <Button onClick={(e) => { deleteDepartment(e); setDeleteDepModal(false); }} autoFocus>
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>



                </div>








              </Paper>

              {/* <Paper
                sx={{
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  my: 2

                }}
                elevation={12}
                className='col row g-2 me-3'
              >
                <Typography variant="h5" className="text-center mb-2">Area</Typography>
                <div >
                  <div className="row g-2">
                    <div className="col-md-8 d-flex ">

                      <Autocomplete label="Area"
                        disablePortal
                        size="small"
                        getOptionDisabled={option => true}
                        options={areaList.map((area) => ({ label: area.area }))}
                        fullWidth
                        clearOnBlur={false}
                        value={areaData.area}
                        renderInput={(params) =>
                          <TextField  {...(errors.area !== "" && { helperText: errors.area, error: true })} onKeyDown={handleAreaKeyDown} onChange={handleAreaChange}
                            name="area" {...params} label="Area" />} />
                    </div>

                    <div className="col d-flex mb-3">

                      <TextField label="Status"
                        id="areaStatusID"
                        select
                        defaultValue="active"
                        fullWidth
                        size="small"
                        onChange={handleAreaChange}

                        value={areaData.areaStatus}
                        name="areaStatus" >

                        <MenuItem value="active">active</MenuItem>
                        <MenuItem value="inActive">inActive</MenuItem>
                      </TextField>

                    </div>
                  </div>






                  <div className="row g-2 mb-3">
                    <div className="col d-flex">
                      <div className="d-flex justify-content-center">
                        <ButtonGroup size="small"  className="me-2">
                          <Button component="label" size="small" variant="contained" >
                            Upload
                            <VisuallyHiddenInput type="file" onChange={(e) => handleExcel(e, "area")} />
                          </Button>
                          <Button size="small" onClick={(e) => handleUpload(e, "area")}><CloudUpload /></Button>
                        </ButtonGroup>

                        <ButtonGroup size="small">
                          <Button component="label"  variant="contained" color='secondary'>
                            Download
                            <VisuallyHiddenInput type="file" />
                          </Button>
                          <Button size="small" color='secondary'><CloudDownload /></Button>
                        </ButtonGroup>
                      </div>

                    </div>


                    {areaStateId ? <Dialog
                      open={areaOpenModal}
                      onClose={() => setAreaOpenModal(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {" Area update confirmation?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure to update the Area
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setAreaOpenModal(false)}>Cancel</Button>
                        <Button onClick={(e) => { updateArea(e); setAreaOpenModal(false); }} autoFocus>
                          Update
                        </Button>
                      </DialogActions>
                    </Dialog> :
                      <Dialog
                        open={areaOpenModal}
                        onClose={() => setAreaOpenModal(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {" Area create confirmation?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure to add the Area
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setAreaOpenModal(false)}>Cancel</Button>
                          <Button onClick={(e) => { AreaSubmit(e); setAreaOpenModal(false); }} autoFocus>
                            Add
                          </Button>
                        </DialogActions>
                      </Dialog>}









                    <div className="col-md text-end">

                      {areaStateId ? (<div className="d-flex justify-content-end">
                        <Button className="me-1"
                          type="button"
                          color='warning'
                          variant='contained' size="small"
                          
                          onClick={() => setAreaOpenModal(true)}
                       
                        >
                          Modify
                        </Button >
                        <Button type="button"  variant='contained' size="small" color='error' onMouseEnter={(e) => { e.target.style.background = 'red' }} onMouseOut={(e) => { e.target.style.background = '#e6e6e6' }}
                         
                          onClick={() => { setareaStateId(null); setArea(initialAreaData) }}
                        >Cancel</Button>
                      </div>) : <div>
                        <Button variant='contained' size="small" color='success'  onClick={() => setAreaOpenModal(true)}>+ Add Area</Button>
                      </div>}

                    </div>
                      {areaExcelStatus && <p style={{color:'green'}}>{areaExcelStatus}</p>}
                  </div>
                  <div className="row ">

                    <div style={{ height: 480, width: '100%' }}>
                      <DataGrid
                        className="MuiDataGrid-root"
                        rows={areaList}
                        columns={areaColumns}
                        disableDensitySelector
                        disableColumnSelector
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
                        slots={{
                          toolbar: GridToolbar,
                        }}
                        onRowSelectionModelChange={(newRowSelectionModel, event) => {
                          setAreaSelectedRowIds(newRowSelectionModel);
                          console.log(event)

                        }}
                        onRowClick={handleAreaRowClick}

                        density="compact"

                        checkboxSelection
                        pageSizeOptions={[5]}

                      >

                      </DataGrid>




                    </div>











                    <Dialog
                      open={deleteAreaModal}
                      onClose={() => setDeleteAreaModal(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {" Area delete confirmation?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure to delete the Area
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setDeleteAreaModal(false)}>Cancel</Button>
                        <Button onClick={(e) => { deleteArea(e); setDeleteAreaModal(false); }} autoFocus>
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>





                  </div>




                </div>
              </Paper> */}

              {/* <Paper
                sx={{
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  my: 2

                }}
                elevation={12}
                className='col row g-2 me-3'
              >
                <Typography variant="h5" className="text-center">Place Of Usage</Typography>
                <div className="row g-2" >

                  <div className="col-md-8 d-felx ">

                  
                    <Autocomplete label="Place Of Usage"
                      disablePortal
                      size="small"
                      getOptionDisabled={option => true}
                      options={placeOfUsageList.map((place) => ({ label: place.placeOfUsage }))}
                      fullWidth
                      clearOnBlur={false}
                      value={placeOfUsageDatas.placeOfUsage}
                      renderInput={(params) =>
                        <TextField   {...(errors.placeOfUsage !== "" && { helperText: errors.placeOfUsage, error: true })} onKeyDown={handlePlaceOfKeyDown} onChange={handlePouChange}
                          name="placeOfUsage" {...params} label="Place Of Usage" />} />

                  </div>
                  <div className="col d-flex ">

                    <TextField label="Status"
                      id="placeOfUsageStatusId"
                      select

                      fullWidth
                      size="small"
                      onChange={handlePouChange}
                      onKeyDown={handlePlaceOfKeyDown}

                      value={placeOfUsageDatas.placeOfUsageStatus}
                      name="placeOfUsageStatus" >

                      <MenuItem value="active">active</MenuItem>
                      <MenuItem value="inActive">inActive</MenuItem>
                    </TextField>

                  </div>
                </div>



                <div className="row g-2 ">
                  <div className="col d-flex">
                    <div className="d-flex justify-content-center">
                      <ButtonGroup className='me-2'size="small" >
                        <Button component="label" variant="contained" size="small" >
                          Upload
                          <VisuallyHiddenInput type="file" onChange={(e) => handleExcel(e, "pou")} />
                        </Button>
                        <Button size="small" onClick={(e) => handleUpload(e, "pou")}><CloudUpload /></Button>
                      </ButtonGroup>

                      <ButtonGroup size="small">
                        <Button component="label" size="small" variant="contained" color='secondary'>
                          Download
                          <VisuallyHiddenInput type="file" />
                        </Button>
                        <Button size="small" color='secondary'><CloudDownload /></Button>
                      </ButtonGroup>
                    </div>

                  </div>


                  {placeOfUsageId ? <Dialog
                    open={pouOpenModal}
                    onClose={() => setPouOpenModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {" Place of usage update confirmation?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure to update the Place of usage
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setPouOpenModal(false)}>Cancel</Button>
                      <Button onClick={(e) => { updatePlaceofUsagedata(e); setPouOpenModal(false); }} autoFocus>
                        Update
                      </Button>
                    </DialogActions>
                  </Dialog> :
                    <Dialog
                      open={pouOpenModal}
                      onClose={() => setPouOpenModal(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {" Place of usage create confirmation?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure to add the Place of usage
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setPouOpenModal(false)}>Cancel</Button>
                        <Button onClick={(e) => { placeOfUsageSubmit(e); setPouOpenModal(false); }} autoFocus>
                          Add
                        </Button>
                      </DialogActions>
                    </Dialog>}





                  <div className="col-md p-0 d-flex justify-content-end">

                    {placeOfUsageId ? (<div className="d-flex justify-content-end">
                      <Button className="me-1"
                        type="button"
                        variant='contained' size="small"
                        color='warning'
                       
                        onClick={() => setPouOpenModal(true)}
                      //   disabled={!depStateId}
                      >
                        Modify
                      </Button >
                      <Button type="button" variant='contained' size="small" color='error' onMouseEnter={(e) => { e.target.style.background = 'red' }} onMouseOut={(e) => { e.target.style.background = '#e6e6e6' }}
                       
                        onClick={() => { setPlaceOfUsageId(null); setPlaceOfUsageData(initialPlaceOfUsageData) }}
                      >Cancel</Button>
                    </div>) : <div>
                      <Button variant='contained' size="small" color='success' onClick={() => setPouOpenModal(true)}>+ Add Place</Button>
                    </div>}




                  </div>

                  {pouExcelStatus && <p style={{color:'green'}}>{pouExcelStatus}</p>}


                </div>
                <div className="row g-2">


                  <div style={{ height: 480, width: '100%' }}>
                    <DataGrid
                      rows={placeOfUsageList}
                      columns={placeOfUsageColumns}
                      disableDensitySelector
                      disableColumnSelector
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
                      slots={{
                        toolbar: GridToolbar,
                      }}
                      onRowSelectionModelChange={(newRowSelectionModel, event) => {
                        setPlaceOfUsageSelectedRowIds(newRowSelectionModel);
                        console.log(event)

                      }}
                      onRowClick={updatePof}

                      density="compact"

                      checkboxSelection
                      pageSizeOptions={[5]}


                    >

                    </DataGrid>




                  </div>








                  <Dialog
                    open={deletePouModal}
                    onClose={() => setDeletePouModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Place of usage delete confirmation?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure to delete the Place of usage
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setDeletePouModal(false)}>Cancel</Button>
                      <Button onClick={(e) => { deletePlaceOfUsage(e); setDeletePouModal(false); }} autoFocus>
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>

                </div>


              </Paper> */}
            </div>














            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
              <Alert variant="filled" onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '100%' }}>
                {errorhandler.message}
              </Alert>
            </Snackbar>

          </Box>
        </div>
      </form>

    </div>
  );
};


// Designation

export const Designation = () => {

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
  const [desExcelStatus, setDesExcelStatus] = useState('');

  const handleDesExcel = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile)
    setFile(selectedFile);
  };

  const handleDesUpload = async () => {
    try {
      if (!file) {
        setDesExcelStatus('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${process.env.REACT_APP_PORT}/designation/uploadDesignationsInExcel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setDesExcelStatus(response.data.message || 'Excel file uploaded successfully');
      desFetchData()
    } catch (error) {
      if (error.response) {
        setDesExcelStatus(`Error: ${error.response.data.error || 'Something went wrong'}`);
      } else if (error.request) {
        setDesExcelStatus('Network error. Please try again.');
      } else {
        setDesExcelStatus('Error uploading the file.');
      }
      console.error('Error uploading Excel file:', error);
      setTimeout();
    }
  };



  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  }
  const [errorhandler, setErrorHandler] = useState({})
  console.log(errorhandler)






  const [desStateId, setDesStateId] = useState(null)



  const initialDesignationData = {
    designation: "",
    designationStatus: "active"
  }

  const [designationData, setDesignationData] = useState({
    designation: "",
    designationStatus: "active"
  });


  console.log(designationData)

  const handleDesRowClick = (params) => {
    console.log(params)
    setDesignationData(params.row)
    setDesStateId(params.id)
  }



  const [designationList, setDesignationList] = useState([]);
  console.log(designationData)

  const capitalizeAfterSpaceOrPeriod = (value) => {
    return value.toLowerCase().replace(/(?:^|\s|\.|\/)([a-z])/g, (match) => match.toUpperCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'designation'
      ? capitalizeAfterSpaceOrPeriod(value)
      : value;
    setDesignationData((prev) => ({ ...prev, [name]: formattedValue }))
  };





  const desFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/designation/getAllDesignations`
      );
      setDesignationList(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  //get Designations
  useEffect(() => {
    desFetchData();
  }, []);

  const [designationselectedRowIds, setDesignationSelectedRowIds] = useState([]);


  const designationColumns = [
    { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center" },

    { field: 'designation', headerName: 'Designation', width: "200", headerAlign: "center", align: "center", },
    { field: 'designationStatus', headerName: 'Designation Status', width: "150", headerAlign: "center", align: "center", },
    {/*{
      field: 'delete',
      headerName: 'Delete',
      width: 80,
      sortable: false,
      renderHeader: () => (
        <IconButton color='error' aria-label="Delete" onClick={() => setDeleteModal(true)}>
          <Delete />
        </IconButton>
      ),
    },*/}


  ];



  //validate function 
  const [errors, setErrors] = useState({})

  const validateFunction = () => {
    let tempErrors = {};
    tempErrors.designation = designationData.designation ? "" : "Designation is Required"

    setErrors({ ...tempErrors })

    return Object.values(tempErrors).every(x => x === "")
  }
  console.log(errors)




  //Submit Designation
  const DesignationSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateFunction()) {
        const response = await axios.post(
          `${process.env.REACT_APP_PORT}/designation/createDesignation`,
          designationData
        );
        desFetchData();
        setSnackBarOpen(true)
        setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
        console.log("designation Created Successfully")
        setDesignationData(initialDesignationData);
      }

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
        const errorMessages500 = Object.values(errorData500).join(', ');
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
  //
  const updateDesignation = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_PORT}/designation/updateDesignation/${desStateId}`, designationData
      );
      desFetchData();
      setSnackBarOpen(true)
      setDesStateId(null)
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })

      setDesignationData({
        designation: "",
        designationStatus: ""
      });
      console.log("Designation Updated Successfully");
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


  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);




  const deleteDesignation = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_PORT}/designation/deleteDesignation`, {
        data: {
          designationIds: designationselectedRowIds
        }
      }

      );
      desFetchData();
      setSnackBarOpen(true)
      setDesStateId(null)
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      setDesignationData({
        designation: "",
        designationStatus: ""
      });
      console.log("Designation Deleted Successfully");
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
        const errorMessages500 = Object.values(errorData500).join(', ');
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

  {/*const handleKeyDown = (event) => {
    const { name, value } = event.target;
    console.log(name);
    if (event.key === 'Tab') {
        // Prevent default Tab behavior
        event.preventDefault();

        const formattedValue = value.toLowerCase()
            .split(/[.\s/&]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        console.log(formattedValue);
        // Update the state to show the formatted value
        setDesignationData(prev => ({ ...prev, [name]: formattedValue }));
    }
};*/}
  const handleKeyDown = (event) => {
    const { name, value } = event.target;
    console.log(name);
    if (event.key === 'Tab') {
      event.preventDefault();

      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

      console.log(formattedValue);
      setDesignationData(prev => ({ ...prev, [name]: formattedValue }));
    }
  };



  useEffect(() => {
    if (desExcelStatus) {
      const timeoutId = setTimeout(() => {
        setDesExcelStatus('');
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [desExcelStatus]);


  console.log(designationList);

  const body = {
    padding: "1rem",
    paddingTop: "10px",

    marginTop: "4rem"
  };

  const bodyCards = {
    borderRadius: "10px",

    padding: "2rem",
    margin: "1rem",
    boxShadow: "0px 0px 25px 10px",
  };
  const uploadLable = {
    display: "block",
    width: "70px",
    maxWidth: "300px",
    backgroundColor: "slateblue",
    borderRadius: "5px",
    fontSize: "1em",
    lineHeight: "2.42em",
    textAlign: "center",
  };
  const downLable = {
    border: "0",
    clip: "rect(1px, 1px, 1px, 1px)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
  };

  return (
    <div >
      <form>

        <Grid container spacing={2} >


          <Grid item xs={6} >
            <Paper
              sx={{
                py: 2,
                px: 1,
                display: 'flex',
                flexDirection: 'column',
                my: 2,
                mx: 0.5,

              }}
              elevation={12}
            >
              <div className="row g-2">
                <div className="col-md-8 d-felx ">
                  <Autocomplete label="Designation"
                    disablePortal
                    size="small"
                    getOptionDisabled={option => true}
                    options={designationList.map((des) => ({ label: des.designation }))}
                    fullWidth
                    clearOnBlur={false}
                    value={designationData.designation}
                    renderInput={(params) =>
                      <TextField {...(errors.designation !== "" && { helperText: errors.designation, error: true })} onChange={handleChange} value={designationData.designation}
                        name="designation" {...params} label="Designation" />} />
                </div>
                <div className="col d-flex mb-2">

                  <TextField label="Status"
                    id="designationStatusId"
                    select

                    fullWidth
                    size="small"
                    onChange={handleChange}

                    value={designationData.designationStatus}
                    name="designationStatus" >

                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inActive">InActive</MenuItem>
                  </TextField>



                </div>
              </div>





              {/* <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="designation"
                    placeholder="designation"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="designation"
                    value={designationData.designation}
                  />
                  <label for="designation">Designation</label>
              </div>*/}

              <div className="row mb-1">
                <div className="col d-flex">
                  <div className="d-flex justify-content-center">
                    <ButtonGroup className='me-2' size="small">
                      <Button size="small" component="label" variant="contained" fullWidth>
                        Upload
                        <VisuallyHiddenInput type="file" onChange={handleDesExcel} />
                      </Button>
                      <Button size="small" onClick={handleDesUpload}><CloudUpload /></Button>
                    </ButtonGroup>

                    {/* <ButtonGroup size="small">
                      <Button size="small" component="label" variant="contained" color='secondary' fullWidth>
                        Download
                        <VisuallyHiddenInput type="file" />
                      </Button>
                      <Button size="small" color='secondary'><CloudDownload /></Button>
                    </ButtonGroup> */}
                  </div>

                </div>


                {desStateId ? <Dialog
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Designation update confirmation?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure to update the Designation
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                    <Button onClick={() => { updateDesignation(); setOpenModal(false); }} autoFocus>
                      Update
                    </Button>
                  </DialogActions>
                </Dialog> : <Dialog
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {" Designation create confirmation?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure to add the Designation
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                    <Button onClick={(e) => { DesignationSubmit(e); setOpenModal(false); }} autoFocus>
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>}

                <div className="text-end col">

                  {desStateId ? (<div>
                    <Button className="me-1"
                      component={Link}
                      type="button"
                      variant="contained"
                      color='warning'
                      size="small"

                      onClick={() => setOpenModal(true)}

                    >
                      Modify
                    </Button>
                    <Button component={Link} size="small" variant="contained" type="button" color='error' onMouseEnter={(e) => { e.target.style.background = 'red' }} onMouseOut={(e) => { e.target.style.background = '#e6e6e6' }}
                      // style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                      // className="btn text-end me-3"
                      onClick={() => { setDesStateId(null); setDesignationData(initialDesignationData) }}
                    >Cancel</Button>
                  </div>) : <Button variant="contained" type="button" size="small" color='success'
                    onClick={() => setOpenModal(true)}  ><i className="bi bi-plus"></i>Add Designation</Button>}
                </div>

              </div>
              {desExcelStatus && <p style={{ color: 'green' }}>{desExcelStatus}</p>}

            </Paper>
          </Grid>


          <Grid item xs={6} >
            <Paper
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                m: 2

              }}
              elevation={12}
            >



              <h4 className=" text-center">Designation List</h4>
              <div className="row mb-2">
                {/* <div className="col d-flex justify-content-end">
                  {designationselectedRowIds.length !== 0 && <Button variant='contained' type='button' color='error' onClick={() => setDeleteModal(true)}>Delete </Button>}
                </div> */}
              </div>

              <div style={{ height: 500, width: '100%' }}>
                <DataGrid disableDensitySelector
                  rows={designationList}
                  columns={designationColumns}
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
                    setDesignationSelectedRowIds(newRowSelectionModel);
                    console.log(event)

                  }}
                  onRowClick={handleDesRowClick}
                  disableRowSelectionOnClick
                  getRowClassName={(params) => params.id === desStateId ? { backgroundColor: "green" } : {}}
                  density="compact"

                  checkboxSelection
                  slots={{
                    toolbar: () => (
                      <div className='d-flex justify-content-between align-items-center'>
                        <GridToolbar />
                        <div>
                          {designationselectedRowIds.length !== 0 && <Button variant='contained' size="small" type='button' color='error' onClick={() => setDeleteModal(true)}>Delete </Button>}
                        </div>

                      </div>
                    ),
                  }}
                  pageSizeOptions={[5]}


                >

                </DataGrid>




              </div>










              <Dialog
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Designation delete confirmation?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure to delete the Designation
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
                  <Button onClick={(e) => { deleteDesignation(e); setDeleteModal(false); }} autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>



              <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert variant="filled" onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '100%' }}>
                  {errorhandler.message}
                </Alert>
              </Snackbar>
            </Paper>
          </Grid>

        </Grid>

      </form>


    </div>
  );
};
