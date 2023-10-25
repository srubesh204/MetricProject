import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Employee = () => {

    const [employeeList, setEmployeeList] = useState([]);
    const [empDataId, setEmpDataId] = useState(null)
    const empFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/employee/getAllEmployee`
            );
            setEmployeeList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        empFetch();
    }, []);

    const [employeeData, setEmployeeData] = useState({
        employeeCode: "",
        title: "",
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        contactNumber: "",
        designation: "",
        department: "",
        mailId: "",
        doj: "",
        employmentStatus: "",
        reportTo: ""
    });

    const handleSetEmp = (emp) => {
        setEmployeeData(emp)
        setEmpDataId(emp._id)
    }
    console.log(empDataId)
    //State and City
    const [AllStates, setAllStates] = useState([]);
    const [StateName, setStateName] = useState(null)

    const StateData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/general/getAllStateAndCity`
            );
            setAllStates(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        StateData();
    }, []);
    console.log(AllStates)

    const [cityByState, setCityByState] = useState([])
    const cityFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/general/getCityByStateName/${employeeData.state}`
            );
            setCityByState(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {

        cityFetch();

    }, [employeeData.state]);
    console.log(StateName)
    console.log(cityByState)
    //



    //Department and Designation 
    const [departmentList, setDepartmentList] = useState([]);
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
    console.log(departmentList)


    const [designationList, setDesignationList] = useState([]);
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
    console.log(departmentList)

    const bodyStyle = {
        borderRadius: "10px",

        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 25px 10px",
    };


    //

    // Employee Datas







    console.log(StateName)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prev) => ({ ...prev, [name]: value }));
        if (name === "state") {
            setStateName(value);
        }
    };

    const EmployeeSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${process.env.REACT_APP_PORT}/employee/createEmployee`, employeeData
            );
            empFetch();
            console.log("Employee Created Successfully")
        } catch (err) {
            console.log(err);
            alert(err);
        }
    };


    console.log(employeeData)
    console.log(employeeList)
    return (
        <div className='container'>
            <form >
                <h1 className='text-center'>Employee Database</h1>
                <div className='row mb-2 g-2'>
                    <div className="form-floating  col-2">
                        <input onChange={handleChange} value={employeeData.employeeCode} type="text" className="form-control" id="employeeCodeId" name="employeeCode" placeholder="employeeCode" />
                        <label htmlFor="employeeCodeId">Emp.code</label>
                    </div>
                    <div class="form-floating  col-1">
                        <select onChange={handleChange} value={employeeData.title} className="form-select" id="titleId" name="title" >
                            <option selected>Title</option>
                            <option value="1">Mr.</option>
                            <option value="2">Ms.</option>

                        </select>
                        <label htmlFor="titleId">Title</label>
                    </div>
                    <div className="form-floating  col">
                        <input onChange={handleChange} value={employeeData.firstName} type="text" className="form-control" id="firstNameId" name="firstName" placeholder="firstName" />
                        <label htmlFor="firstNameId">First Name</label>
                    </div>
                    <div className="form-floating  col">
                        <input onChange={handleChange} value={employeeData.lastName} type="text" className="form-control" id="lastNameId" name="lastName" placeholder="lastName" />
                        <label htmlFor="lastNameId">Last Name</label>
                    </div>
                    <div className="form-floating  col-2">
                        <input onChange={handleChange} value={employeeData.dob} type="date" className="form-control" id="dobId" name="dob" placeholder="dob" />
                        <label htmlFor="dobId">Date Of Birth</label>
                    </div>


                </div>
                <div className='row g-2 mb-2'>
                    <div className="form-floating col-4">
                        <input onChange={handleChange} value={employeeData.address} type="text" className="form-control" id="addressId" placeholder="naddress" name='address' />
                        <label htmlFor="addressId">Address</label>
                    </div>
                    <div className="form-floating col-2">
                        <input onChange={handleChange} value={employeeData.contactNumber} type="number" className="form-control" id="contactNumberId" placeholder="contactNumber" name='contactNumber' />
                        <label htmlFor="contactNumberId">Contact Number</label>
                    </div>
                    <div className="form-floating col-6">
                        <input onChange={handleChange} value={employeeData.mailId} type="text" className="form-control" id="mailid" placeholder="name@example.com" name='mailId' />
                        <label htmlFor="mailId">Mail Id</label>
                    </div>
                </div>
                <div className='row g-2 mb-2'>
                    <div class="form-floating md-3 col-4">
                        <select onChange={handleChange} value={employeeData.state} className="form-select" id="stateId" name="state" >
                            <option selected>Select State</option>
                            {AllStates.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                        <label htmlFor="stateId">State</label>
                    </div>

                    <div class="form-floating col-2">
                        <select onChange={handleChange} value={employeeData.designation} className="form-select" id="designationId" name="designation" >
                            <option selected>Designation</option>
                            {designationList.map((item) => (
                                <option key={item._id} value={item.designation}>{item.designation}</option>
                            ))}
                        </select>
                        <label htmlFor="designationId">Designation</label>
                    </div>
                    <div className="form-floating col-3">
                        <input onChange={handleChange} value={employeeData.doj} type="date" className="form-control" id="dojId" name="doj" placeholder="doj" />
                        <label htmlFor="dojId">Date Of joining</label>
                    </div>
                    <div class="form-floating col-3">
                        <select onChange={handleChange} value={employeeData.employmentStatus} className="form-select" id="employmentStatusId" name="employmentStatus" >
                            <option selected>Select Status</option>
                            <option value="1">Active</option>
                            <option value="2">InActive</option>
                            <option value="3">Relieved</option>
                        </select>
                        <label htmlFor="employmentStatusId">Employment Status</label>
                    </div>

                </div>
                <div className='row g-2 mb-2'>
                    <div class="form-floating col-4">
                        <select onChange={handleChange} value={employeeData.city} className="form-select" id="cityId" name="city" >
                            <option selected>City</option>
                            {cityByState.map((item, index) => (
                                <option key={item._id} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                        <label htmlFor="cityId">City</label>
                    </div>
                    <div class="form-floating md-3 col-2">
                        <select onChange={handleChange} value={employeeData.department} className="form-select" id="departmentId" name="department" >
                            <option selected>Select department</option>
                            {departmentList.map((item) => (
                                <option key={item._id} value={item.department}>{item.department}</option>
                            ))

                            }
                        </select>
                        <label htmlFor="departmentId">Department</label>
                    </div>
                    <div class="form-floating md-3 col-6">
                        <select onChange={handleChange} value={employeeData.reportTo} className="form-select" id="reportToId" name="reportTo" >
                            <option selected>Department</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="reportToId">Report To</label>
                    </div>
                </div>
                
                    <div className="col d-flex ">
                        <div className='me-2' >
                            <label className='uplable'>
                                <input className="form-control downlable" type="file" id="uploadExcel" />Upload
                            </label>
                        </div>
                        <div >
                            <label className='uplable'>
                                <input className="form-control downlable" type="file" id="uploadExcel" />Download
                            </label>
                        </div>
                        <div className="form-floating  col">
                            <input type="text" className="form-control" id="firstNameId" name="firstName" placeholder="firstName" />
                            <label htmlFor="firstNameId">First Name</label>
                        </div>
                        <div className="form-floating  col">
                            <input type="text" className="form-control" id="lastNameId" name="lastName" placeholder="lastName" />
                            <label htmlFor="lastNameId">Last Name</label>
                        </div>
                        <div className="form-floating  col-2">
                            <input type="date" className="form-control" id="dateOfBirthId" name="dateOfBirth" placeholder="dateOfBirth" />
                            <label htmlFor="dateOfBirthId">Date Of Birth</label>
                        </div>


                    </div>
                    <div className='row g-2 mb-2'>
                        <div className="form-floating col-4">
                            <input type="text" className="form-control" id="addressId" placeholder="address" name='address' />
                            <label htmlFor="addressId">Address</label>
                        </div>
                        <div className="form-floating col-2">
                            <input type="number" className="form-control" id="contactNumberId" placeholder="contactNumber" name='contactNumber' />
                            <label htmlFor="contactNumberId">Contact Number</label>
                        </div>
                        <div className="form-floating col-6">
                            <input type="text" className="form-control" id="mailid" placeholder="name@example.com" name='mailId' />
                            <label htmlFor="mailId">Mail Id</label>
                        </div>
                    </div>
                    <div className='row g-2 mb-2'>
                        <div class="form-floating col-4">
                            <select className="form-select" id="CityId" name="City" aria-label="Floating label select example">
                                <option selected>City</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label htmlFor="CityId">City</label>
                        </div>
                        <div class="form-floating col-2">
                            <select className="form-select" id="designationId" name="designation" aria-label="Floating label select example">
                                <option selected>Designation</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label htmlFor="designationId">Designation</label>
                        </div>
                        <div className="form-floating col-3">
                            <input type="date" className="form-control" id="dateOfJoiningId" name="dateOfJoining" placeholder="dateOfJoining" />
                            <label htmlFor="dateOfJoiningId">Date Of joining</label>
                        </div>
                        <div class="form-floating col-3">
                            <select className="form-select" id="employmentStatusId" name="employmentStatus" aria-label="Floating label select example">
                                <option selected>Employment Status</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label htmlFor="employmentStatusId">Employment Status</label>
                            <div>
                                <button onClick={EmployeeSubmit} type="button" className='btn btn-warning'>+ Add Employee</button>
                            </div>

                        </div>
                    </div>
                    <div className='row g-2 mb-2'>
                        <div class="form-floating md-3 col-4">
                            <select className="form-select" id="stateId" name="state" aria-label="Floating label select example">
                                <option selected>State</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label htmlFor="stateId">State</label>
                        </div>
                        <div class="form-floating md-3 col-2">
                            <select className="form-select" id="departmentId" name="department" aria-label="Floating label select example">
                                <option selected>Select department</option>
                                {departmentList.map((item) => (
                                    <option>{item.department}</option>
                                ))

                                }
                            </select>
                            <label htmlFor="departmentId">Department</label>
                        </div>
                        <div class="form-floating md-3 col-5">
                            <select className="form-select" id="reportToId" name="reportTo" aria-label="Floating label select example">
                                <option selected>Report To</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label htmlFor="reportToId">Report To</label>
                        </div>
                    </div>
                    <div className="row g-2" >
                        <div className="col d-flex ">
                            <div className='me-2' >
                                <label className='uplable'>
                                    <input className="form-control downlable" type="file" id="uploadExcel" />Upload
                                </label>
                            </div>
                            <div >
                                <label className='uplable'>
                                    <input className="form-control downlable" type="file" id="uploadExcel" />Download
                                </label>
                            </div>
                        </div>

                        <div className='col d-flex justify-content-end'>
                            <div className='me-2' >
                                <button type="button" className='btn btn-secondary' >Modify</button>
                            </div>

                            <div>
                                <button type="button" className='btn btn-warning'>+ Add Employee</button>
                            </div>

                        </div>




                    </div>
                    <h3 className='text-center'>Employee List</h3>
                    <div className='row g-2'>
                        <div class="form-floating md-3 col">
                            <select className="form-select" id="EmploymentStatusToId" name="EmploymentStatusTo" aria-label="Floating label select example">
                                <option selected>Employment Status To</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label htmlFor="EmploymentStatusToId">Employment Status To</label>
                        </div>
                        <div class="form-floating md-3 col">
                            <select className="form-select" id="DepartmentId" name="Department" aria-label="Floating label select example">
                                <option selected>Department</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label htmlFor="DepartmentId">Department</label>
                        </div>
                        <div class="form-floating md-3 col">
                            <select className="form-select" id="reportToId" name="reportTo" aria-label="Floating label select example">
                                <option selected>Report To</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label htmlFor="reportToId">Report To</label>
                        </div>
                    </div>
                    <div>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Emp.Code</th>
                                    <th>Emp.Name</th>
                                    <th>Contact Number</th>
                                    <th>Mail Id</th>
                                    <th>Designation</th>
                                    <th>Department</th>
                                    <th>Report To</th>
                                    <th>Delete</th>

                                </tr>
                                {
                                    <tr>

                                        <td><button className='btn btn-danger '><i class="bi bi-trash-fill"></i></button></td>
                                    </tr>
                                }

                            </tbody>


                        </table>
                    </div>










            </form>
        </div>

        
    )
}

export default Employee