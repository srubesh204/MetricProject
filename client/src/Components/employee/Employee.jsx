import React from 'react'

const Employee = () => {
    const uploadCss = {
        uploadButton:{
            display: "block",
           
            backgroundColor: "slateblue",
            borderRadius: "5px",
            fontSize: "1em",
            linHeight: "2.42em",
            textAlign: "center"
        },
        inUploadButton : {
            border: "0",
            clip:"rect(1px, 1px, 1px, 1px)",
            
            overflow: "hidden",
            padding: "0",
            position: "absolute",
            width: "1px",
        }
        

        }
        
       

        
    
    
    return (
        <div>
            <form action="">
                <h1 className='text-center'>Employee Database</h1>
                <div className='row g-2'>
                    <div className="form-floating mb-3 col">
                        <input type="text" className="form-control" id="empCodeId" name="empCode" placeholder="empCode"  />
                        <label htmlFor="empCodeId">Emp.code</label>
                    </div>
                    <div class="form-floating md-3 col">
                        <select className="form-select" id="titleId" name="title" aria-label="Floating label select example">
                            <option selected>Title</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="titleId">Title</label>
                    </div>
                    <div className="form-floating mb-3 col">
                        <input type="text" className="form-control" id="firstNameId" name="firstName" placeholder="firstName"  />
                        <label htmlFor="firstNameId">First Name</label>
                    </div>
                    <div className="form-floating mb-3 col">
                        <input type="text" className="form-control" id="lastNameId" name="lastName" placeholder="lastName"  />
                        <label htmlFor="lastNameId">Last Name</label>
                    </div>
                    <div className="form-floating mb-3 col">
                        <input type="date" className="form-control" id="dateOfBirthId" name="dateOfBirth" placeholder="dateOfBirth"  />
                        <label htmlFor="dateOfBirthId">Date Of Birth</label>
                    </div>


                </div>
                <div className='row g-2'>
                    <div className="form-floating mb-3 col">
                        <input type="text" className="form-control" id="addressId" placeholder="naddress" name='address' />
                        <label htmlFor="addressId">Address</label>
                    </div>
                    <div className="form-floating mb-3 col">
                        <input type="number" className="form-control" id="contactNumberId" placeholder="contactNumber" name='contactNumber' />
                        <label htmlFor="contactNumberId">Contact Number</label>
                    </div>
                    <div className="form-floating mb-3 col">
                        <input type="text" className="form-control" id="mailid" placeholder="name@example.com" name='mailId' />
                        <label htmlFor="mailId">Mail Id</label>
                    </div>
                </div>
                <div className='row g-2'>
                    <div class="form-floating md-3 col">
                        <select className="form-select" id="CityId" name="City" aria-label="Floating label select example">
                            <option selected>City</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="CityId">City</label>
                    </div>
                    <div class="form-floating md-3 col">
                        <select className="form-select" id="designationId"  name="designation" aria-label="Floating label select example">
                            <option selected>Designation</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="designationId">Designation</label>
                    </div>
                    <div className="form-floating mb-3 col">
                        <input type="date" className="form-control" id="dateOfJoiningId" name="dateOfJoining" placeholder="dateOfJoining"  />
                        <label htmlFor="dateOfJoiningId">Date Of joining</label>
                    </div>
                    <div class="form-floating md-3 col">
                        <select className="form-select" id="employmentStatusId" name="employmentStatus" aria-label="Floating label select example">
                            <option selected>Employment Status</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="employmentStatusId">Employment Status</label>
                    </div>

                </div>
                <div className='row g-2 mb-3'>
                    <div class="form-floating md-3 col">
                        <select className="form-select" id="stateId" name="state" aria-label="Floating label select example">
                            <option selected>State</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="stateId">State</label>
                    </div>
                    <div class="form-floating md-3 col">
                        <select className="form-select" id="departmentId" name="department" aria-label="Floating label select example">
                            <option selected>Department</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label htmlFor="departmentId">Department</label>
                    </div>
                    <div class="form-floating md-3 col">
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
                    <div className="col mb-2">
                        <button type="button" className='btn btn-success'>ADD</button>
                    </div>
                    <div className="col">
                        <label style={uploadCss.uploadButton}>
                            <input style={uploadCss.inUploadButton} className="form-control" type="file" id="uploadExcel" />Upload
                        </label>
                    </div>
                    <div className="col">
                        <label style={uploadCss.uploadButton}>
                        <input className="form-control" type="file" id="uploadExcel" style={uploadCss.inUploadButton} />Download
                        </label>
                    </div>
                    <div className="col mb-2">
                        <button type="button" className='btn btn-warning'>Modify</button>
                    </div>
                    <div className="col mb-2">
                        <button type="button" className='btn btn-danger'>Delete</button>
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

                            </tr>
                        </tbody>

                        
                    </table>
                </div>

                
               
                    
                





            </form>


        </div>
    )
}

export default Employee