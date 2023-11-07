import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Box, Container, Grid, Paper } from "@mui/material";
import { TextField, MenuItem, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export const Department = () => {


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
    area: "N/A",
    placeOfUsage: "N/A"
  }

  const [departmentData, setDepartmentData] = useState({
    department: "",
    area: "N/A",
    placeOfUsage: "N/A",
  });
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [depStateId, setDepStateId] = useState(null)




  const [departmentList, setDepartmentList] = useState([]);





  const handleDepRowClick = (item) => {
    setDepartmentData(item);
    setDepStateId(item._id);
  };



  console.log(depStateId)



  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value.toLowerCase().
      split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setDepartmentData((prev) => ({ ...prev, [name]: formattedValue }));

  };

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
        const errorMessages500 = Object.values(errorData500).join(', ');
        console.log(errorMessages500)
        setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
      } else {
        console.log(err);
        console.log(err.response.data.error)
        setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
      }

      console.log(err);
      alert(err);
    }
  };

  const updateDepartment = async (id) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/department/updateDepartment/" + id, departmentData
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

  const deleteDepartment = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/department/deleteDepartment/" + id
      );
      depFetchData();
      setSnackBarOpen(true)
      setDepartmentData(emptyDepartmentData);
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      console.log("Department Deleted Successfully");
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
      setDepartmentData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


    }
  };







  console.log(departmentList);




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
        <Box sx={{ flexGrow: 1, m: 2 }}>
          <Grid container spacing={2} >


            <Grid item xs={6} >
              <Paper sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                mb: 4
              }}>

                <div className="row g-2 mb-2">
                  <Grid item xs={4}>
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
                  </Grid>

                </div>
                <div className="table-responsive">
                  <table className="table table-bordered text-center">
                    <tbody>
                      <tr>
                        <th>Si.No</th>
                        <th>Department </th>
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
                <div className="row">
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
              </Paper>



              <Grid item xs={4}>
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
              </Grid>

              <Grid item xs={4}>
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
              </Grid>




              <div className="row mb-2">
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

            </Grid>


            <Grid item xs={6} >
              <Paper sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                mb: 2
              }}>

                <h4 className="text-center mb-3">Department List</h4>
                <div className="table-responsive">
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
                </div>
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                  <Alert variant="filled" onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '100%' }}>
                    {errorhandler.message}
                  </Alert>
                </Snackbar>
              </Paper>
            </Grid>









          </Grid>
        </Box>
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


  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)



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
    if (name === "designation") {
      const formattedValue = value.toLowerCase().
        split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setDesignationData((prev) => ({ ...prev, [name]: formattedValue }));

    }else{
      setDesignationData((prev) => ({ ...prev, [name]: value }));

    }
    
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
        designation: ""
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
        designation: ""
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




  const deleteDesignation = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/designation/deleteDesignation/" + desStateId
      );
      desFetchData();
      setSnackBarOpen(true)
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      setDesignationData({
        designation: ""
      });
      console.log("Designation Deleted Successfully");
      setDesStateId(null)
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

        <Grid container spacing={2} sx={{ p: 2 }} >


          <Grid item xs={6} >
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',

              }}
            >
              <div className="row g-2 mb-2">
                <div className="col-md-9">
                  <TextField label="Designation"

                    id="designation"
                    defaultValue=""
                    fullWidth
                    size="small"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={designationData.designation}
                    name="designation" >

                  </TextField>
                </div>

                <div className="col-md-3 col-xs-">
                  <TextField
                    label="Status"
                    select
                    id="designationStatusId"
                    // defaultValue="Active"
                    fullWidth
                    size="small"
                    onChange={handleChange}
                    value={designationData.designationStatus}
                    name="designationStatus" >

                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="InActive">InActive</MenuItem>

                  </TextField>
                </div>

              </div>


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

                <div className="text-end col">

                  {desStateId ? (<div>
                    <button
                      type="button"
                      className="btn text-end me-3 hover"
                      onClick={() => setModalOpen(true)}
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

                    style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                    onClick={() => setModalOpen(true)}
                  >
                    <i className="bi bi-plus"></i>Add Designation</button>
                  }
                </div>
                {desStateId ?
                  <Dialog
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Update Confirmation?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you Sure to Update the Designation
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                      <Button onClick={() => { updateDesignation(); setModalOpen(false); }} autoFocus>
                        Update
                      </Button>
                    </DialogActions>
                  </Dialog>
                  :
                  <Dialog
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Create Confirmation?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you Sure to Create the Designation
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                      <Button onClick={(e) => { DesignationSubmit(e); setModalOpen(false); }} autoFocus>
                        Add
                      </Button>
                    </DialogActions>
                  </Dialog>}
              </div>

            </Paper>
          </Grid>


          <Grid item xs={6} >
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',

              }}
            >
              <h5 className="mb-2 text-center">Designation List</h5>
              <div className="table-responsive">
                <table className="table table-bordered text-center table-hover">
                  <tbody>
                    <tr className="text-center">
                      <th>S.No</th>
                      <th width="50%">Designation</th>
                      <th width="10%">Status</th>
                      <th>Delete</th>
                    </tr>
                    {designationList.map((item, index) => (
                      <tr key={item._id} onClick={() => handleDesRowClick(item)} className={item._id === desStateId ? "table-active" : ""}>
                        <td>{index + 1}</td>
                        <td>{item.designation}</td>
                        <td>{item.designationStatus}</td>
                        <td>
                          <button type="button" className="btn btn-sm btn-danger" onClick={() => setDeleteModal(true)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Dialog
                  open={deleteModal}
                  onClose={() => setDeleteModal(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete Confirmation?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you Sure to Delete the {designationData.designation}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
                    <Button onClick={(e) => { deleteDesignation(e); setDeleteModal(false); }} autoFocus>
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

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
