import React, { useState, useEffect } from 'react';
import axios from "axios";

const Department = () => {

    const [departmentData, setDepartmentData] = useState({
        department: "",
        area: "",
        placeOfUsage: ""
    })
    const [departmentList, setDepartmentList] = useState([])

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setDepartmentData((prev) => ({ ...prev, [name]: value }));
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
    return (
        <div className='container'>
            <h1 className='text-center'>Departments</h1>
            <form>
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
                <div>
                    <table className='table table-bordered'>
                        <tbody>
                            <tr>
                                <td>S.No</td>
                                <td>Department</td>
                                <td>Area</td>
                                <td>Place Of Usage</td>
                            </tr>
                            {departmentList.map((item,index) => (
                                <tr>
                                    <td>{index +1}</td>
                                    <td>{item.department}</td>
                                    <td>{item.area}</td>
                                    <td>{item.placeOfUsage}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <button class="btn btn-warning text-end" onClick={DepartmentSubmit}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default Department