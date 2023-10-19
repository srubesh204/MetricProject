import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../styles/employee.css'


const Department = () => {

    const [departmentData, setDepartmentData] = useState({
        department: "",
        area: "",
        placeOfUsage: ""
    })
    const [departmentList, setDepartmentList] = useState([]);

    const [designationData, setDesignationData] = useState({
        designation: ""
    });

    const [designationList, setDesignationList] = useState([])


    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setDepartmentData((prev) => ({ ...prev, [name]: value }));
        if (name === "designation") {
            setDesignationData((prev) => ({ ...prev, [name]: value }));
        }
    }

    const DepartmentSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3001/department/createDepartment", departmentData);
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/department/getAllDepartments");
                setDepartmentList(response.data)
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [DepartmentSubmit]);
    console.log(departmentList)
    console.log(departmentData)

    const body = {
        padding: "3rem",
        margin: "4rem"
    }

    const bodyCards = {
        borderRadius: "10px",

        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 25px 10px"
    }
    const uploadLable = {
        display: "block",
        width: "70px",
        maxWidth: "300px",
        backgroundColor: "slateblue",
        borderRadius: "5px",
        fontSize: "1em",
        lineHeight: "2.42em",
        textAlign: "center"
    }
    const downLable = {
        border: "0",
        clip: "rect(1px, 1px, 1px, 1px)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        width: "1px"
    }


    return (
        <div style={body}>

            <form>
                <div className="row">
                    <div className='col' style={bodyCards}>
                        <h1 className='text-center'>Departments</h1>
                        <div className="row g-2">
                            <div className="form-floating mb-3 col">
                                <input type="text" className="form-control" id="department" placeholder="name@example.com" onChange={handleChange} name='department' />
                                <label for="department">Department</label>
                            </div>
                            <div className="form-floating mb-3 col">
                                <input type="text" className="form-control" id="area" placeholder="name@example.com" onChange={handleChange} name='area' />
                                <label for="area">Area</label>
                            </div>
                            <div className="form-floating mb-3 col">
                                <input type="text" className="form-control" id="placeOfUsage" placeholder="name@example.com" onChange={handleChange} name='placeOfUsage' />
                                <label for="placeOfUsage">Place Of Usage</label>
                            </div>
                        </div>
                        <div className='row' >
                            <div className="col d-flex">
                            <div className='me-3'>
                                <lable className="uplable" >
                                    <input type='file' className='downlable' />Upload
                                </lable>
                            </div>
                            <div>
                                <lable className="uplable" style={{ backgroundColor: "yellow" }} >
                                    <input type='file' className='downlable' />Download
                                </lable>
                            </div>
                            </div>

                            
                            <div className='text-end col'>
                                <button class="btn btn-warning text-end" onClick={DepartmentSubmit}><i class="bi bi-plus"></i>Add Department</button>
                            </div>

                        </div>

                        <hr />
                        <h4 className='text-center mb-3'>Department List</h4>
                        <div>
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr className='text-center'>
                                        <th>S.No</th>
                                        <th>Department</th>
                                        <th>Area</th>
                                        <th>Place Of Usage</th>
                                    </tr>
                                    {departmentList.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.department}</td>
                                            <td>{item.area}</td>
                                            <td>{item.placeOfUsage}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>


                        </div>
                    </div>
                    <div className="col" style={bodyCards}>
                        <h1 className='text-center'>
                            Designation
                        </h1>
                        <div className="row g-2">

                            <div className="form-floating mb-3 col-8">
                                <input type="text" className="form-control" id="designation" placeholder="designation" onChange={handleChange} name='designation' />
                                <label for="designation">Designation</label>
                            </div>
                            <div className='col-4'>
                                <button className='btn btn-warning'>Add Designation</button>
                            </div>

                        </div>
                        <hr />
                        <h4 className='text-center mb-3'>Designation List</h4>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr className='text-center'>
                                    <th>S.No</th>
                                    <th>Designation</th>

                                </tr>
                                {designationList.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.designation}</td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <div>
                            <button></button>
                        </div>
                    </div>
                </div>


            </form>
        </div>
    )
}

export default Department