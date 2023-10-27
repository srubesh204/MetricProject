import React, { useState, useEffect } from "react";
import axios from "axios";


const Department = () => {
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
  const [desStateId, setDesStateId] = useState(null)



  const [departmentList, setDepartmentList] = useState([]);


  const [designationData, setDesignationData] = useState({
    designation: "",
  });
  const handleDepRowClick = (item) => {
    setDepartmentData(item);
    setDepStateId(item._id);
  };

  const handleDesRowClick = (item) => {
    setDesignationData(item);
    setDesStateId(item._id);
  };

  console.log(depStateId)
  const [designationList, setDesignationList] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData((prev) => ({ ...prev, [name]: value }));
    if (name === "designation") {
      setDesignationData((prev) => ({ ...prev, [name]: value }));
    }
  };

  //get Departments
  const depFetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/department/getAllDepartments`
      );
      setDepartmentList(response.data);
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
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const updateDepartment = async (id) => {
    try {
      await axios.put(
        "http://localhost:3001/department/updateDepartment/" + id, departmentData
      );
      depFetchData();
      setDepartmentData(emptyDepartmentData);
      setDepStateId(null)
      console.log("Department Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await axios.delete(
        "http://localhost:3001/department/deleteDepartment/" + id
      );
      depFetchData();
      setDepartmentData(emptyDepartmentData);
      console.log("Department Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

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
      await axios.post(
        "http://localhost:3001/designation/createDesignation",
        designationData
      );
      desFetchData();
      setDesignationData({
        designation: ""
      });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  //
  const updateDesignation = async (id) => {
    try {
      await axios.put(
        "http://localhost:3001/designation/updateDesignation/" + id, designationData
      );
      desFetchData();
      setDesignationData({
        designation: ""
      });
      console.log("Designation Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };




  const deleteDesignation = async (id) => {
    try {
      await axios.delete(
        "http://localhost:3001/designation/deleteDesignation/" + id
      );
      desFetchData();
      setDesignationData({
        designation: ""
      });
      console.log("Designation Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  //
  console.log(departmentList);
  console.log(designationList);

  const body = {
    padding: "1rem",
    paddingTop: "10px",
    margin: "2rem",
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
    <div style={body}>
      <form>
        <div className="row">
          <div className="col" style={bodyCards}>
            <h2 className="text-center">Departments</h2>
            <div className="row g-2">
              <div className="form-floating mb-3 col">
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  name="department"
                  value={departmentData.department}
                  required
                />
                <label for="department">Department</label>
              </div>
              <div className="form-floating mb-3 col">
                <input
                  type="text"
                  className="form-control"
                  id="area"
                  placeholder="name@example.com"
                  onChange={handleChange}
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
                  name="placeOfUsage"
                  value={departmentData.placeOfUsage}
                  required
                />
                <label for="placeOfUsage">Place Of Usage</label>
              </div>

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
                  <button type="button" onMouseEnter={(e) => {e.target.style.background = 'red'}} onMouseOut={(e) => {e.target.style.background = '#e6e6e6'}}
                    style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                    className="btn text-end me-3"
                    onClick={() => {setDepStateId(null); setDepartmentData(emptyDepartmentData) }}
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

            <hr />

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
                    <tr key={item._id} onClick={() => handleDepRowClick(item)} className="p-0">
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
          </div>
          <div className="col" style={bodyCards}>
            <h2 className="text-center">Designation</h2>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="designation"
                placeholder="designation"
                onChange={handleChange}
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
                <button
                  type="button"
                  className="btn text-end me-3 hover"
                  onClick={() => updateDesignation(desStateId)}
                  style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                >
                  Modify
                </button>
                <button
                  type="button"
                  className="btn text-end hover"
                  onClick={DesignationSubmit}
                  style={{ backgroundColor: "#e6e6e6", color: "black", fontWeight: "bolder" }}
                >
                  <i className="bi bi-plus"></i>Add Designation
                </button>
              </div>
            </div>
            <hr />
            <h4 className="mb-3">Designation List</h4>
            <div className="table-responsive">
              <table className="table table-bordered text-center table-hover">
                <tbody>
                  <tr className="text-center">
                    <th>S.No</th>
                    <th width="50%">Designation</th>
                    <th>Delete</th>
                  </tr>
                  {designationList.map((item, index) => (
                    <tr key={item._id} onClick={() => handleDesRowClick(item)}>
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

            <div></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Department;
