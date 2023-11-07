import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
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

    placeOfUsage: "N/A"
  }


  const [departmentData, setDepartmentData] = useState({
    department: "",

  });

  const initialAreaData = {
    area: "N/A",
  }
  const [areaData, setArea] = useState({
    area: "N/A"
  });
  const [areaList, setAreaList] = useState([]);

  const areaFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/area/getAllAreas`
      );
      setAreaList(response.data.result);
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
      alert(err);
    }
  };

  const updateArea = async (id) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/area/updateArea/" + id, areaData
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
  const deleteArea = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/area/deleteArea/" + id
      );
      areaFetchData();
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

  const initialPalceOfUsageData = {
    placeOfUsage: "",
    placeOfUsageStatus: ""
  }
  const [placeOfUsageData, setPlaceOfUsage] = useState({
    placeOfUsage: "",
    placeOfUsageStatus: ""
  });
  const [placeOfUsageList, setPlaceOfUsageList] = useState([]);


  const placeOfUsageFetchData = async () => {
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
    placeOfUsageFetchData();
  }, []);

  const PalceOfUsageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT}/area/createArea`, areaData
      );
      console.log(response.data.message)
      placeOfUsageFetchData();
      setPlaceOfUsageList(initialPalceOfUsageData);
      setSnackBarOpen(true)
      setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
      console.log("PlaceOfUsage create Successfully");
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


  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [depStateId, setDepStateId] = useState(null)
  const [areaStateId, setareaStateId] = useState(null)




  const [departmentList, setDepartmentList] = useState([]);





  const handleDepRowClick = (item) => {
    setDepartmentData(item);
    setDepStateId(item._id);
  };



  console.log(depStateId)



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "department") {
      setDepartmentData((prev) => ({ ...prev, [name]: value }))
    }
    if (name === "area") {
      setArea((prev) => ({ ...prev, [name]: value }))
    }
    if (name === "pacleOfUsage") {
      setPlaceOfUsage((prev) => ({ ...prev, [name]: value }))
    }





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
                      onChange={handleChange}
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
                      onChange={handleChange}

                      value={departmentData.departmentStatus}
                      name="departmentStatus" >

                      <MenuItem>Active</MenuItem>
                      <MenuItem>InActive</MenuItem>
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

                  <div className="col-md text-end">

                    {depStateId ? (<div>
                      <button
                        type="button"
                        style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                        className="btn text-end me-3 hover"
                        onClick={() => updateDepartment(areaStateId)}
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

                  <div className="col d-felx mb-2">

                    <Grid item xs={4}>
                      <TextField label="Area"
                        id="areaId"
                        defaultValue=""
                        fullWidth
                        size="small"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={areaData.area}
                        name="area" ></TextField>
                    </Grid>



                    {/* <TextField label="Area"
                            id="area"
                            defaultValue=""
                            fullWidth
                            size="small"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            value={areaData.area}
                            name="area" ></TextField>
                        </Grid>*/}
                  </div>
                  <div className="table-responsive">
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
                                onClick={() => deleteArea(item._id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}


                      </tbody>
                    </table>
                  </div>


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

                  <div className="text-end col  ">

                    {areaStateId ? (<div>
                      <button
                        type="button"
                        style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                        className="btn text-end me-3 hover"
                        onClick={() => updateArea(areaStateId)}
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
                      onClick={AreaSubmit}

                    >
                      <i className="bi bi-plus"></i>Add Department
                    </button>}




                  </div>




                </div>
              </Paper>

              <Paper sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',

              }}
                className="col row g-2 mb-2"
              >

                <div className="row mb-2 g-2">
                  <div className="col-md-8">
                    <TextField label="Place Of Usage"
                      id="PlaceOfUsageId"
                      defaultValue=""

                      fullWidth
                      size="small"
                      placeholder="name@example.com"
                      onKeyDown={handleKeyDown}

                      name="placeOfUage" ></TextField>
                  </div>

                  <div className="col-md-4">
                    <TextField label="Status"
                      id="placeOfUsageStatusId"
                      select

                      defaultValue="Active"
                      fullWidth
                      size="small"
                      onChange={handleChange}

                      value={placeOfUsageData.placeOfUsageStatus}
                      name="placeOfUsageStatus" >

                      <MenuItem>Active</MenuItem>
                      <MenuItem>InActive</MenuItem>
                    </TextField>

                  </div>


                </div>



                <div className="row g-2">
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
                  

                </div>

               
                <div className="table-responsive">
                  <table className="table table-bordered text-center">
                    <tbody>
                      <tr>
                        <th>Si.No</th>
                        <th>Department </th>
                        <th>Delete</th>
                      </tr>
                      {areaList.map((item, index) => (
                        <tr key={item._area} onClick={() => handleDepRowClick(item)} className={item._area === areaStateId ? "table-active" : ""}>
                          <td >{index + 1}</td>
                          <td>{item.area}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteArea(item._id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}


                    </tbody>
                  </table>
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

        <Grid container spacing={2} >


          <Grid item xs={6} >
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                mb: 2
              }}
            >
              <Grid container spacing={1} className="mb-2" >
                <Grid item xs={12}>
                  <TextField label="Designation"
                    id="designation"
                    defaultValue=""
                    fullWidth
                    size="small"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={designationData.designation}
                    name="designation" ></TextField>
                </Grid>
              </Grid>
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

      </form>


    </div>
  );
};
