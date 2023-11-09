import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";

const Devi = () => {
    const UserCredential = {
        Username: "Test",
        Password: "Test@123"
    }

    const [inputData, setInputData] = useState({})

    const userPwd = (e) => {
        const { name, value } = e.target;
        setInputData((prev) => ({ ...prev, [name]: value }))
    }

    const LoginCheck = () => {
        UserCredential.Username !== inputData.user || UserCredential.Password !== inputData.passWord ? alert("Login Failed") : alert("Login Successfull")
    }

    console.log(inputData)
    //


    
    const [employeeList, setEmployeeList] = useState([]);
    const empFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/employee/getAllEmployees`
            );
            const employeesWithId = response.data.result.map((employee, index) => ({
                ...employee,
                id: index + 1, // You can use a different logic for generating the id
            }));
            setEmployeeList(employeesWithId);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        empFetch();
    }, []);

    const columns = [
        { field: 'id', headerName: 'Si No', width: 70 },
       
        { field: 'employeeCode', headerName: 'Emp.Code', width: 70 },
        { field: 'firstName', headerName: 'emp.Name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        { field: 'dob', headerName: 'DOB', width: 90, },
        { field: 'address', headerName: 'Address', width: 90, },
        { field: 'city', headerName: 'City', width: 90, },
        { field: 'state', headerName: 'State', width: 90, },
        { field: 'contactNumber', headerName: 'Contact Number', type: "number", width: 90, },
        { field: 'designation', headerName: 'Designation', width: 90, },
        { field: 'department', headerName: 'Department', width: 90, },

    ];

    





    return (
        <div >
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={employeeList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>





        </div>
    )
}

export default Devi