import React, { useState, useEffect } from 'react';
import axios from "axios";

const Department = () => {

    // Department Data
    const [departmentList, setDepartmentList] = useState([])

    const [departmentData, setDepartmentData] = useState({
        department: "",
        area: "",
        placeOfUsage: ""
    })
    //
    // Designation Data
    const [designationList, setDesignationList] = useState([])

    const [designationData, setDesignationData] = useState({
        designation: ""
    })
    //


    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setDepartmentData((prev) => ({ ...prev, [name]: value }));
    }

    const DepartmentSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8080/Department/createDepartment", departmentData);
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }
    const [stateList, setStateList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/stateAndCity/getAllStateAndCity");
                const filteredArray = [...new Set(response.data)]
                setStateList(filteredArray)
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    console.log(stateList)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/Department/getDepartment");
                setDepartmentList(response.data)
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [DepartmentSubmit]);
    console.log(departmentList)
    console.log(departmentData)

    const cardStyle = {

        padding: "5rem",
        margin: "20px",
        maxHeight: "100vh",
        maxWidth: "100vw"
    }
    const seperateCardStyle = {

        borderRadius: "10px",
        boxShadow: "0px 0px 20px 10px",
        padding: "2rem",
        margin: "2rem"
    }
    return (
        <div className='' style={cardStyle}>

            <form>
                <div className="row">
                    <div className="col" style={seperateCardStyle}>
                        <div className="row g-2">
                            <h1 className='text-center'>Departments</h1>
                            <div className="form-floating mb-3 col">
                                <input type="text" className="form-control" id="department" placeholder="name@example.com" onChange={handleChange} name='department' />
                                <label htmlFor="department">Department</label>
                            </div>
                            <div className="form-floating mb-3 col">
                                <input type="date" className="form-control" id="area" placeholder="name@example.com" onChange={handleChange} name='area' />
                                <label htmlFor="area">Area</label>
                            </div>
                            <div className="form-floating mb-3 col">
                                <input type="text" className="form-control" id="placeOfUsage" placeholder="name@example.com" onChange={handleChange} name='placeOfUsage' />
                                <label htmlFor="placeOfUsage">Place Of Usage</label>
                            </div>

                        </div>
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
                                            <td className='text-center'>{index + 1}</td>
                                            <td>{item.department}</td>
                                            <td>{item.area}</td>
                                            <td>{item.placeOfUsage}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <button className="btn btn-warning text-end" onClick={DepartmentSubmit}>Add</button>
                        </div>
                    </div>
                    {/* designation Column */}
                    <div className="col" style={seperateCardStyle}>
                        <h1 className='text-center mb-3'>
                            Designation
                        </h1>
                        <div className="row g-2" >
                            <div className="form-floating mb-3 col-9">
                                <input type="Designation" className="form-control" id="floatingInput" name='designation' placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Designation</label>
                            </div>
                            <div class="form-floating">
                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option selected>--Select--</option>
                                    {stateList.map((item)=>(
                                        <option>{item.state}</option>
                                    ))

                                    }
                                </select>
                                <label for="floatingSelect">Select State</label>
                            </div>
                            <div className="col-3 align-middle">
                                <button type="button" className='btn btn-primary'>Add Designation</button>
                            </div>


                        </div>
                        <div className="">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>SI.No</th>
                                        <th>Designation</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default Department