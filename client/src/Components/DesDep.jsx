import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Box, Container, Grid, Paper } from "@mui/material";
import { TextField, MenuItem, FormControl } from '@mui/material';


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
    setDepartmentData((prev) => ({ ...prev, [name]: value }));

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
              }} >
                <Grid container spacing={1} >
                  <Grid item xs={4}>
                    <TextField label="Department"
                      id="departmentId"
                      defaultValue=""
                      fullWidth
                      size="small"
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      value={departmentData.department}
                      name="department" ></TextField>
                  </Grid>
                 
                  <div className="form-floating mb-3 col">
                    <input
                      type="text"
                      className="form-control"
                      id="area"
                      placeholder="name@example.com"
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      name="area"
                      value={departmentData.area}
                      required
                    />
                    <label for="area">Area</label>
                  </div>
                  <div className="form-floating mb-3 col">
                    <input
                      type="text"
                      className="form-control"
                      id="placeOfUsage"
                      placeholder="name@example.com"
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      name="placeOfUsage"
                      value={departmentData.placeOfUsage}
                      required
                    />
                    <label for="placeOfUsage">Place Of Usage</label>
                  </div>

                </Grid>

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
            </Grid>


            <Grid item xs={6} >
              <Paper sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                mb: 4
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






  const [desStateId, setDesStateId] = useState(null)





  const [designationData, setDesignationData] = useState({
    designation: "",
  });
  const initialDesignationData = {
    designation: "",
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
  const updateDesignation = async (id) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/designation/updateDesignation/" + id, designationData
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




  const deleteDesignation = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/designation/deleteDesignation/" + id
      );
      desFetchData();
      setSnackBarOpen(true)
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      setDesignationData({
        designation: ""
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
        <Box sx={{ flexGrow: 1, m: 2 }}>
          <Grid container spacing={2} >


            <Grid item xs={6} >
              <Paper
                sx={{
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  mb: 4
                }}
              >

                <div className="form-floating mb-3">
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

                    {desStateId ? (<div>
                      <button
                        type="button"
                        className="btn text-end me-3 hover"
                        onClick={() => updateDesignation(desStateId)}
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
                      onClick={DesignationSubmit}
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
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteDesignation(item._id)}>
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
