import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { TextField, MenuItem, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export const Department = () => {


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
    departmentStatus: ""
  }
  const [departmentData, setDepartmentData] = useState({
    department: "",
    departmentStatus: ""
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
  //
  //Submit Department
  const DepartmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT}/department/createDepartment`, departmentData
      );
      console.log(response.data.message)
      depFetchData();
      setDepartmentData(emptyDepartmentData);
      setSnackBarOpen(true)
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      console.log("Department create Successfully");
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
        "http://localhost:3001/department/updateDepartment/" + depStateId, departmentData
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
        "http://localhost:3001/department/deleteDepartment/" + depStateId, departmentData
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

  const handleDepRowClick = (item) => {
    setDepartmentData(item);
    setDepStateId(item._id);
  };


  const initialAreaData = {
    area: "N/A",
    areaStatus: ""
  }
  const [areaData, setArea] = useState({
    area: "N/A",
    areaStatus: ""
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


  const AreaSubmit = async (e) => {
    e.preventDefault();
    try {
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
        "http://localhost:3001/area/updateArea/" + areaStateId, areaData
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
  const deleteArea = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/area/deleteArea/" + areaStateId, areaData
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


  const handleAreaRowClick = async (item) => {
    setArea(item)
    setareaStateId(item._id)
  }
















  const initialPlaceOfUsageData = {
    placeOfUsage: "",
    placeOfUsageStatus: ""

  }


  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [depStateId, setDepStateId] = useState(null)
  const [areaStateId, setareaStateId] = useState(null)
  const [placeOfUsageId, setPlaceOfUsageId] = useState(null)




  const [departmentList, setDepartmentList] = useState([]);













  const handleDepChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData((prev) => ({ ...prev, [name]: value }))
  };

  const handleAreaChange = (e) => {
    const { name, value } = e.target;
    setArea((prev) => ({ ...prev, [name]: value }))
  };

  const handlePouChange = (e) => {
    const { name, value } = e.target;
    setPlaceOfUsageData((prev) => ({ ...prev, [name]: value }))
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
    placeOfUsage: "N/A",
    placeOfUsageStatus: ""

  });
  const [placeOfUsageList, setPlaceOfUsageList] = useState([]);


  const updatePof = async (item) => {
    setPlaceOfUsageData(item)
    setPlaceOfUsageId(item._id)
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


  

  const placeOfUsageSubmit = async (e) => {
    e.preventDefault();
    try {
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
        "http://localhost:3001/placeOfUsage/updatePlaceOfUsage/" + placeOfUsageId, placeOfUsageDatas
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

  console.log(placeOfUsageId)



  const deletePlaceOfUsage = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/PlaceOfUsage/deletePlaceOfUsage/" + placeOfUsageId, placeOfUsageDatas
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
        <div className="row">
          <Box sx={{ flexGrow: 1, m: 2 }}>





            <div className="row">



              <Paper
                sx={{
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  m: 2

                }}
                className='col row'
              >
                <Typography variant="h5" className="text-center">Department</Typography>
                <div className="row g-2" >

                  <div className="col-md-8 d-felx ">

                    <TextField label="Department"
                      id="departmentId"
                      defaultValue=""
                      fullWidth
                      size="small"
                      onChange={handleDepChange}
                      onKeyDown={handleKeyDown}
                      value={departmentData.department}
                      name="department" ></TextField>

                  </div>
                  <div className="col d-felx mb-2">

                    <TextField label="Status"
                      id="departmentStatusId"
                      select
                      defaultValue="Active"
                      fullWidth
                      size="small"
                      onChange={handleDepChange}

                      value={departmentData.departmentStatus}
                      name="departmentStatus" >

                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="InActive">InActive</MenuItem>
                    </TextField>

                  </div>
                </div>

                <div className="row g-2 mb-2">
                  <div className="col-md-6 d-flex">
                    <div className="me-3">
                      <lable className="uplable">
                        <input type="file" className="downlable" />
                        Upload
                      </lable>
                    </div>
                    <div>
                      <lable
                        className="uplable"

                      >
                        <input type="file" className="downlable" cusor="pointer" />
                        Download
                      </lable>
                    </div>
                  </div>


                  {depStateId ? <Dialog
                    open={depOpenModal}
                    onClose={() => setDepOpenModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {" Department Update Confirmation?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you Sure to Update the Department
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
                        {"Create Confirmation?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you Sure to Add the Department
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

                    {depStateId ? (<div>
                      <button
                        type="button"
                        style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                        className="btn text-end me-3 hover"
                        onClick={() => setDepOpenModal(true)}
                      //   disabled={!depStateId}
                      >
                        Modify
                      </button >
                      <button type="button" onMouseEnter={(e) => { e.target.style.background = 'red' }} onMouseOut={(e) => { e.target.style.background = '#e6e6e6' }}
                        style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                        className="btn text-end me-3"
                        onClick={() => { setDepStateId(null); setDepartmentData(emptyDepartmentData) }}
                      >Cancel</button>
                    </div>) : <button
                      type="button"
                      style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                      className="btn text-end hover"
                      onClick={() => setDepOpenModal(true)}

                    >
                      <i className="bi bi-plus"></i>Add Department
                    </button>}




                  </div>



                </div>
                <div className="row g-2">
                  <div className="table-responsive col">
                    <table className="table table-bordered text-center">
                      <tbody>
                        <tr>
                          <th>Si.No</th>
                          <th>Department </th>
                          <th>Delete</th>
                        </tr>
                        {departmentList.map((item, index) => (
                          <tr key={item._id} onClick={() => handleDepRowClick(item)} className={item._id === depStateId ? "table-active" : ""}>
                            <td >{index + 1}</td>
                            <td>{item.department}</td>

                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => setDeleteDepModal(true)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}


                      </tbody>
                    </table>
                  </div>
                  <Dialog
                    open={deleteDepModal}
                    onClose={() => setDeleteDepModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {" DepartMent Delete Confirmation?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you Sure to Delete the DepartMent
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
              {/*<Paper sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    mb:1

                  }}
                    className="col row g-2 me-3 "
                  >
                    <div className="col ">
                      <TextField label="Department"
                        id="departmentId"
                        defaultValue=""
                        fullWidth
                        size="small"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={departmentData.department}
                        name="department" >

                      </TextField>
                    </div>
                    

                    <div className="table-responsive ">
                      <table className="table table-bordered text-center ">
                        <tbody>
                          <tr>
                            <th>Si.No</th>
                            <th>Department </th>
                            <th>Delete</th>
                          </tr>
                          {departmentList.map((item, index) => (
                            <tr key={item._id} onClick={() => handleDepRowClick(item)} className={item._id === depStateId ? "table-active" : ""}>
                              <td >{index + 1}</td>
                              <td>{item.department}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger"
                                  onClick={() => deleteDepartment(item._id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}


                        </tbody>
                      </table>
                    </div>
                    
                    <div className="row mt-4">
                      <div className="col d-flex">
                        <div className="me-3">
                          <lable className="uplable">
                            <input type="file" className="downlable" />
                            Upload
                          </lable>
                        </div>
                        <div>
                          <lable
                            className="uplable"

                          >
                            <input type="file" className="downlable" />
                            Download
                          </lable>
                        </div>
                      </div>

                      <div className="text-end col">

                        {depStateId ? (<div>
                          <button
                            type="button"
                            style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                            className="btn text-end me-3 hover"
                            onClick={() => updateDepartment(depStateId)}
                          //   disabled={!depStateId}
                          >
                            Modify
                          </button >
                          <button type="button" onMouseEnter={(e) => { e.target.style.background = 'red' }} onMouseOut={(e) => { e.target.style.background = '#e6e6e6' }}
                            style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                            className="btn text-end me-3"
                            onClick={() => { setDepStateId(null); setDepartmentData(emptyDepartmentData) }}
                          >Cancel</button>
                        </div>) : <button
                          type="button"
                          style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                          className="btn text-end hover"
                          onClick={DepartmentSubmit}

                        >
                          <i className="bi bi-plus"></i>Add Department
                        </button>}




                      </div>


                    </div>
                  </Paper>/*}











                  {/* <Grid item xs={4}>
                    <TextField label="Area"
                      id="area"
                      defaultValue=""
                      fullWidth
                      size="small"
                      placeholder="name@example.com"
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      value={departmentData.area}
                       name="area" ></TextField>
                    </Grid>*/}

              {/* <Grid item xs={4}>
                    <TextField label="Place Of Usage"
                      id="placeOfUsage"
                      defaultValue=""
                      fullWidth
                      size="small"
                      placeholder="name@example.com"
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      value={departmentData.placeOfUsage}
                       name="placeOfUsage" ></TextField>
                  </Grid>*/}
              <Paper
                sx={{
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  my: 2

                }}
                className='col row g-2 me-3'
              >
                <Typography variant="h5" className="text-center">Area</Typography>
                <div >
                  <div className="row g-2">
                    <div className="col-md-8 d-felx mb-2">


                      <TextField label="Area"
                        id="areaId"
                        defaultValue=""
                        fullWidth
                        size="small"
                        onChange={handleAreaChange}
                        onKeyDown={handleAreaKeyDown}
                        value={areaData.area}
                        name="area" ></TextField>
                    </div>
                    <div className="col d-flex mb-2">

                      <TextField label="Status"
                        id="areaStatusID"
                        select
                        defaultValue="Active"
                        fullWidth
                        size="small"
                        onChange={handleAreaChange}

                        value={areaData.areaStatus}
                        name="areaStatus" >

                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="InActive">InActive</MenuItem>
                      </TextField>

                    </div>
                  </div>



                  {/* <TextField label="Area"
                            id="area"
                            defaultValue=""
                            fullWidth
                            size="small"
                            onChange={handleAreaChange}
                            onKeyDown={handleKeyDown}
                            value={areaData.area}
                            name="area" ></TextField>
                        </Grid>*/}


                  <div className="row g-2 mb-2">
                    <div className="col-md-6 d-flex">
                      <div className="me-3">
                        <lable className="uplable">
                          <input type="file" className="downlable" />
                          Upload
                        </lable>
                      </div>
                      <div>
                        <lable
                          className="uplable"

                        >
                          <input type="file" className="downlable" cusor="pointer" />
                          Download
                        </lable>
                      </div>
                    </div>


                    {areaStateId ? <Dialog
                      open={areaOpenModal}
                      onClose={() => setAreaOpenModal(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {" Area Update Confirmation?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you Sure to Update the Area
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
                          {" Area Create Confirmation?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you Sure to Add the Area
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

                      {areaStateId ? (<div>
                        <button
                          type="button"
                          style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                          className="btn text-end me-3 hover"
                          onClick={() => setAreaOpenModal(true)}
                        //   disabled={!depStateId}
                        >
                          Modify
                        </button >
                        <button type="button" onMouseEnter={(e) => { e.target.style.background = 'red' }} onMouseOut={(e) => { e.target.style.background = '#e6e6e6' }}
                          style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                          className="btn text-end me-3"
                          onClick={() => { setareaStateId(null); setArea(initialAreaData) }}
                        >Cancel</button>
                      </div>) : <button
                        type="button"
                        style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                        className="btn text-end hover"
                        onClick={() => setAreaOpenModal(true)}

                      >
                        <i className="bi bi-plus"></i>Add Area
                      </button>}




                    </div>
                  </div>
                  <div className="row g-2">
                  <div className="table-responsive col">
                    <table className="table table-bordered text-center">
                      <tbody>
                        <tr>
                          <th>Si.No</th>
                          <th>Area </th>

                          <th>Delete</th>
                        </tr>
                        {areaList.map((item, index) => (
                          <tr key={item._id} onClick={() => handleAreaRowClick(item)} className={item._id === areaStateId ? "table-active" : ""}>
                            <td >{index + 1}</td>
                            <td>{item.area}</td>

                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => setDeleteAreaModal(true)}

                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}


                      </tbody>
                    </table>

                    <Dialog
                      open={deleteAreaModal}
                      onClose={() => setDeleteAreaModal(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {" Area Delete Confirmation?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you Sure to Delete the Area
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




                </div>
              </Paper>

              <Paper
                sx={{
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  my: 2

                }}
                className='col row g-2 me-3'
              >
                <Typography variant="h5" className="text-center">Place Of Usage</Typography>
                <div className="row g-2" >

                  <div className="col-md-8 d-felx ">

                    <TextField label="Place Of Usage"
                      id="placeOfUsageId"
                      defaultValue=""
                      fullWidth
                      size="small"
                      onChange={handlePouChange}
                      onKeyDown={handlePlaceOfKeyDown}
                      value={placeOfUsageDatas.placeOfUsage}
                      name="placeOfUsage" ></TextField>

                  </div>
                  <div className="col d-flex mb-2">

                    <TextField label="Status"
                      id="placeOfUsageStatusId"
                      select
                      defaultValue="Active"
                      fullWidth
                      size="small"
                      onChange={handlePouChange}
                      onKeyDown={handlePlaceOfKeyDown}

                      value={placeOfUsageDatas.placeOfUsageStatus}
                      name="placeOfUsageStatus" >

                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="InActive">InActive</MenuItem>
                    </TextField>

                  </div>
                </div>



                <div className="row g-2 ">
                  <div className="col d-flex">

                    <div className="me-3">
                      <lable className="uplable">
                        <input type="file" className="downlable" />
                        Upload
                      </lable>
                    </div>
                    <div>
                      <lable
                        className="uplable"

                      >
                        <input type="file" className="downlable" cusor="pointer" />
                        Download
                      </lable>
                    </div>
                  </div>
                  {placeOfUsageId ? <Dialog
                    open={pouOpenModal}
                    onClose={() => setPouOpenModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {" Place Of Usage Update Confirmation?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you Sure to Update the Place Of Usage
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
                        {" Place OF Usage Create Confirmation?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you Sure to Add the Place Of Usage
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setPouOpenModal(false)}>Cancel</Button>
                        <Button onClick={(e) => { placeOfUsageSubmit(e); setPouOpenModal(false); }} autoFocus>
                          Add
                        </Button>
                      </DialogActions>
                    </Dialog>}





                  <div className="col-md text-end">

                    {placeOfUsageId ? (<div>
                      <button
                        type="button"
                        style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                        className="btn text-end me-3 hover"
                        onClick={() => setPouOpenModal(true)}
                      //   disabled={!depStateId}
                      >
                        Modify
                      </button >
                      <button type="button" onMouseEnter={(e) => { e.target.style.background = 'red' }} onMouseOut={(e) => { e.target.style.background = '#e6e6e6' }}
                        style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                        className="btn text-end me-3"
                        onClick={() => { setPlaceOfUsageId(null); setPlaceOfUsageData(initialPlaceOfUsageData) }}
                      >Cancel</button>
                    </div>) : <button
                      type="button"
                      style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                      className="btn text-end hover"
                      onClick={() => setPouOpenModal(true)}

                    >
                      <i className="bi bi-plus"></i>Add Place Of Usage
                    </button>}




                  </div>



                </div>
                <div className="row g-2">
                  <div className="table-responsive col">
                    <table className="table table-bordered text-center">
                      <tbody>
                        <tr>
                          <th>Si.No</th>
                          <th>PlaceOfUsage</th>
                          <th>Delete</th>
                        </tr>
                        {placeOfUsageList.map((item, index) => (
                          <tr key={item._id} onClick={() => updatePof(item)} className={item._id === placeOfUsageId ? "table-active" : ""}>
                            <td >{index + 1}</td>
                            <td>{item.placeOfUsage}</td>

                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => setDeletePouModal(true)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}


                      </tbody>
                    </table>
                  </div>

                  <Dialog
                    open={deletePouModal}
                    onClose={() => setDeletePouModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {" Place Of Usage Delete Confirmation?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you Sure to Delete the Place Of usage
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


              </Paper>
            </div>












            {/*<h4 className="text-center mb-3">Department List</h4>*/}
            {/* <div className="table-responsive">
                  <table className="table table-bordered text-center table-hover">
                    <tbody>
                      <tr className="text-center">
                        <th>S.No</th>
                        <th>Department</th>
                        <th>Area</th>
                        <th>Place Of Usage</th>

                        <th>Delete</th>
                      </tr>
                      {departmentList.map((item, index) => (
                        <tr key={item._id} onClick={() => handleDepRowClick(item)} className={item._id === depStateId ? "table-active" : ""}>
                          <td >{index + 1}</td>
                          <td>{item.department}</td>
                          <td>{item.area}</td>
                          <td>{item.placeOfUsage}</td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteDepartment(item._id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>*/}
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

export const Designation = () => {


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





  const [designationData, setDesignationData] = useState({
    designation: "",
    designationStatus: ""
  });
  const initialDesignationData = {
    designation: "",
    designationStatus: ""
  }




  const handleDesRowClick = (item) => {
    setDesignationData(item);
    setDesStateId(item._id);
  };


  const [designationList, setDesignationList] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDesignationData((prev) => ({ ...prev, [name]: value }));

  };

  //get Departments

  //
  //Submit Department


  //


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

  //Submit Designation
  const DesignationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/designation/createDesignation",
        designationData
      );
      desFetchData();
      setSnackBarOpen(true)
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      console.log("designation Created Successfully")
      setDesignationData({
        designation: "",
        designationStatus: ""
      });
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
        "http://localhost:3001/designation/updateDesignation/" + desStateId, designationData
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
        "http://localhost:3001/designation/deleteDesignation/" + desStateId, designationData
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
      setDesignationData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


    }
  };


  //

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
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                m:2,
                
              }}
            >
              <div className="row g-2">
                <div className="col-md-8 d-felx ">
                  <TextField label="Designation"
                    id="designation"
                    defaultValue=""
                    fullWidth
                    size="small"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={designationData.designation}
                    name="designation" ></TextField>
                </div>
                <div className="col d-flex mb-2">

                  <TextField label="Status"
                    id="designationStatusId"
                    select
                    defaultValue="Active"
                    fullWidth
                    size="small"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}

                    value={designationData.designationStatus}
                    name="designationStatus" >

                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="InActive">InActive</MenuItem>
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
                  <div className="me-3">
                    <lable className="uplable">
                      <input type="file" className="downlable" />
                      Upload
                    </lable>
                  </div>
                  <div>
                    <lable
                      className="uplable"

                    >
                      <input type="file" className="downlable" />
                      Download
                    </lable>
                  </div>
                </div>


                {desStateId ? <Dialog
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"ItemMaster Update Confirmation?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you Sure to Update the ItemMaster
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
                    {" Designation Create Confirmation?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you Sure to Add the Designation
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
                    <button
                      type="button"
                      className="btn text-end me-3 hover"
                      onClick={() => setOpenModal(true)}
                      style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                    >
                      Modify
                    </button>
                    <button type="button" onMouseEnter={(e) => { e.target.style.background = 'red' }} onMouseOut={(e) => { e.target.style.background = '#e6e6e6' }}
                      style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                      className="btn text-end me-3"
                      onClick={() => { setDesStateId(null); setDesignationData(initialDesignationData) }}
                    >Cancel</button>
                  </div>) : <button
                    type="button"
                    className="btn text-end hover"
                    onClick={() => setOpenModal(true)}
                    style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                  >
                    <i className="bi bi-plus"></i>Add Designation</button>
                  }
                </div>
              </div>

            </Paper>
          </Grid>


          <Grid item xs={6} >
            <Paper
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                m:2

              }}
            >
              <h4 className="mb-3 text-center">Designation List</h4>
              <div className="table-responsive">
                <table className="table table-bordered text-center table-hover">
                  <tbody>
                    <tr className="text-center">
                      <th>S.No</th>
                      <th width="50%">Designation</th>
                      <th>Delete</th>
                    </tr>
                    {designationList.map((item, index) => (
                      <tr key={item._id} onClick={() => handleDesRowClick(item)} className={item._id === desStateId ? "table-active" : ""}>
                        <td>{index + 1}</td>
                        <td>{item.designation}</td>
                        <td>
                          <button type="button" className="btn btn-sm btn-danger" onClick={() => setDeleteModal(true)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Dialog
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {" Place Of Usage Delete Confirmation?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you Sure to Delete the Place Of usage
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
