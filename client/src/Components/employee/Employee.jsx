import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Employee = () => {
   
    

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


    //

    // Employee Datas

    const [employeeList, setEmployeeList] = useState([]);
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

    const [empDataId, setEmpDataId] = useState(null)







    return (
        <div className='container'>
            <form >
                <h1 className='text-center'>Employee Database</h1>
                <div className='row mb-2 g-2'>
                    <div className="form-floating  col-2">
                        <input type="text" className="form-control" id="empCodeId" name="empCode" placeholder="empCode" />
                        <label htmlFor="empCodeId">Emp.code</label>
                    </div>
                    <div class="form-floating  col-1">
                        <select className="form-select" id="titleId" name="title" aria-label="Floating label select example">
                            <option selected>Title</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="titleId">Title</label>
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
                        <input type="text" className="form-control" id="addressId" placeholder="naddress" name='address' />
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
                            <option selected>Department</option>
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
                                <input  className="form-control downlable" type="file" id="uploadExcel" />Upload
                            </label>
                        </div>
                        <div >
                            <label className='uplable'>
                                <input className="form-control downlable" type="file" id="uploadExcel"  />Download
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