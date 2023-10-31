import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const UnitDataBase = ({ style }) => {

    const [unitStateId, setUnitStateId] = useState(null)
    const initialUnitData = {
        unitName: "",
    }

    const [errorHandler, setErrorHandler] = useState({})
    
    const [unitSnackBar, setUnitSnackBar] = useState(false)
    const handleSnackClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }

        setUnitSnackBar(false);
    }

    const [unitData, setUnitData] = useState({
        unitName: "",
    })
    console.log(unitData)


    const [uintDataList, setUnitDataList] = useState([])
    const unitFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/unit/getAllUnits`
            );
            setUnitDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        unitFetchData();
    }, []);
    console.log(uintDataList)


    const handleUnitDataBaseChange = (e) => {
        const { name, value } = e.target;
        setUnitData((prev) => ({ ...prev, [name]: value }));

    };
    const unitSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/unit/createUnit`, unitData
            );
            {/*console.log(response.data.message)*/ }
            console.log(response)
            setUnitSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            unitFetchData();
            setUnitData(initialUnitData);
        } catch (err) {
            setUnitSnackBar(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' | ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(' | ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }
        }
    };

    const updateUnitData = async (id) => {
        try {
            const response = await axios.put(
                "http://localhost:3001/unit/updateUnit/" + id, unitData
            );
            unitFetchData();
            setUnitData({
                unitName: ""
            });
            setUnitSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            console.log(response);
            setUnitStateId(null)
        } catch (err) {
            setUnitSnackBar(true)
            console.log(err)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' | ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join('');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }
        }
    };
    const deleteUnitData = async (id) => {
        try {
            const response = await axios.delete(
                "http://localhost:3001/unit/deleteUnit/" + id, unitData
            );
            unitFetchData();
            setUnitData({
                unitName: ""
            });
            setUnitSnackBar(true)
            setErrorHandler({ status: 0, message: response.data.message , code: "success" });
            console.log("Unit delete Successfully");
            setUnitStateId(null)
        } catch (err) {
            console.log(err);
        }
    };




    const updateUnit = async (item) => {
        setUnitData(item)
        setUnitStateId(item._id)
    }
    console.log(unitStateId)


    const bodycss = {
        borderRadius: "10px",

        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 10px 0px",
    }
    return (

        <div className='container'>
            <div style={bodycss} >
                <form>
                    <h1 className='text-center'>Unit DataBase</h1>
                    <div className='row g-2 mb-3'>
                        <div className="form-floating col-2">
                            <input type="text" className="form-control" id="unitSiId" name="unitSi" placeholder="unitSi" disabled value={uintDataList.length + 1} />
                            <label htmlFor="unitSiId">Si.No.</label>
                        </div>
                        <div className="form-floating col-10">
                            <input type="text" className="form-control" id="unitNameId" name="unitName" value={unitData.unitName} onChange={handleUnitDataBaseChange} placeholder="unitName" />
                            <label htmlFor="unitNameId">Unit Name</label>
                        </div>
                    </div>
                    <div className='col d-flex justify-content-end mb-2'>
                        {unitStateId ? <div className='d-flex justify-content-end'><div className='me-2' >
                            <button type="button" className='btn btn-secondary' onClick={() => updateUnitData(unitStateId)}>Modify</button>
                        </div>
                            <div className='me-2' >
                                <button type="button" className='btn btn-danger' onClick={() => { setUnitStateId(null); setUnitData(initialUnitData) }}>Cancel</button>
                            </div></div> : <div>
                            <button type="button" className='btn btn-warning ' onClick={unitSubmit}>+ Add UnitDataBase</button>
                        </div>}


                    </div>
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={unitSnackBar} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert variant="filled" onClose={handleSnackClose} severity={errorHandler.code} sx={{ width: '100%' }}>
                            {errorHandler.message}
                        </Alert>
                    </Snackbar>
                    <hr />

                    <div>
                        <h3 className='text-center'>Unit List</h3>
                        <div style={style} className='table-responsive'>
                            <table className='table table-bordered text-center'>
                                <tbody>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Unit Name</th>
                                        <th>Delete</th>
                                    </tr>
                                    {uintDataList.map((item, index) => (
                                        <tr onClick={() => updateUnit(item)}>
                                            <td>{index + 1}</td>
                                            <td>{item.unitName}</td>
                                            <td><button type='button' className='btn btn-danger' onClick={() => deleteUnitData(item._id)}><i class="bi bi-trash-fill"></i></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    )
}

const PartDataBase = ({ style }) => {


    const [errorHandler, setErrorHandler] = useState({})
    const [partStateId, setPartStateId] = useState("")
    const [partSnackBar, setPartSnackBar] = useState(false)
    const handleSnackClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }

        setPartSnackBar(false);
    }
    const initialPartData = {

        partNo: "",
        partName: "",
        customer: "",
        operationNo: ""
    }


    const [partData, setPartData] = useState({
        partNo: "",
        partName: "",
        customer: "",
        operationNo: ""
    })
    console.log(partData)


    const [partDataList, setPartDataList] = useState([])
    const partFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/part/getAllParts`
            );
            setPartDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        partFetchData();
    }, []);

    console.log(partDataList)




    const partSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/part/createPart`, partData
            );
            {/*console.log(response.data.message)*/ }
            console.log(response)
            setPartSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            partFetchData();
            setPartData(initialPartData);
        } catch (err) {
            setPartSnackBar(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' | ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(' | ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }

        }
    };
    const updatePartData = async (id) => {
        try {
            const response = await axios.put(
                "http://localhost:3001/part/updatePart/" + id, partData
            );
            partFetchData();
            setPartData({
                partNo: "",
                partName: "",
                customer: "",
                operationNo: ""
            });
            setPartSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            setPartStateId(null)
            console.log(response);
        } catch (err) {
            console.log(err);
            setPartSnackBar(true)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' / ');

                console.log(errorMessages400);
                console.log(err)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                // const errorData500 = err.response.data.error;
                // const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(err)
                setErrorHandler({ status: 0, message: err.response.data.error, code: "error" });
            } else {
                console.log(err)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }

        }
    };

    const deletePartData = async (id) => {
        try {
            const response = await axios.delete(
                "http://localhost:3001/part/deletePart/" + id, partData
            );
            partFetchData();
            setPartData({
                partNo: "",
                partName: "",
                customer: "",
                operationNo: ""
            });
            setPartStateId(null);
            setPartSnackBar(true);
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" });
            console.log("Part delete Successfully");
        } catch (err) {
            setPartSnackBar(true)
           
        }
    };
    console.log(errorHandler.message)





    const updatePart = async (item) => {
        setPartData(item)
        setPartStateId(item._id)
    }

    const handlePartDataBaseChange = (e) => {
        const { name, value } = e.target;
        setPartData((prev) => ({ ...prev, [name]: value }));

    };
    const bodyModel = {
        borderRadius: "10px",
        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 10px 0px",
    }




    return (

        <div className='container' >
            <div style={bodyModel}>
                <form>
                    <h1 className='text-center'>Part DataBase</h1>
                    <div>
                        <div className="row g-2 mb-2">
                            <div className="form-floating col-md-1">
                                <input type="text" className="form-control" id="partDbId" name="partDb" placeholder="partDb" disabled />
                                <label htmlFor="partDbId">Si.No.</label>
                            </div>
                            <div className="form-floating col-md-5">
                                <input type="text" className="form-control" id="partNoId" name="partNo" value={partData.partNo} onChange={handlePartDataBaseChange} placeholder="partNo" />
                                <label htmlFor="partNoId">Part No</label>
                            </div>
                            <div className="form-floating col">
                                <input type="text" className="form-control" id="partNameId" name="partName" value={partData.partName} onChange={handlePartDataBaseChange} placeholder="partName" />
                                <label htmlFor="partNameId">Part Name</label>
                            </div>
                        </div>


                        <div className="row mb-2 g-2">
                            <div className="form-floating col"  >
                                <input type="text" className="form-control" id="partNameId" name="customer" value={partData.customer} onChange={handlePartDataBaseChange} placeholder="customer" />
                                <label htmlFor="customerId">Customer</label>
                            </div>
                            <div className="form-floating col" >
                                <input type="text" className="form-control" id="operationNoId" name="operationNo" value={partData.operationNo} onChange={handlePartDataBaseChange} placeholder="operationNo" />
                                <label htmlFor="operationNoId">Operation No</label>
                            </div>

                        </div>

                    </div>
                    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={partSnackBar} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert variant="filled" onClose={handleSnackClose} severity={errorHandler.code} sx={{ width: '100%' }}>
                            {errorHandler.message}
                        </Alert>
                    </Snackbar>
                    {partStateId ?
                        <div className="d-flex justify-content-end">
                            <div className='me-2'>
                                <button type="button" className='btn btn-secondary' onClick={() => updatePartData(partStateId)}>Modify</button>
                            </div>
                            <div className='me-2'>
                                <button type="button" className='btn btn-danger' onClick={() => { setPartStateId(null); setPartData(initialPartData) }}>Cancel</button>
                            </div>
                        </div> : <div className='col d-flex justify-content-end mb-2' >
                            <div>
                                <button type="button" className='btn btn-warning' onClick={partSubmit}>+ Add PartDataBase</button>
                            </div>
                        </div>}



                    <hr />

                    <div>
                        <h3 className='text-center'>Part List</h3>
                        <div style={style} className='table-responsive'>
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Part No</th>
                                        <th>Part Name</th>
                                        <th>Customer</th>
                                        <th>Status</th>
                                        <th>Delete</th>
                                    </tr>
                                    {partDataList.map((item, index) => (
                                        <tr onClick={() => updatePart(item)} >
                                            <td>{index + 1}</td>
                                            <td>{item.partNo}</td>
                                            <td>{item.partName}</td>
                                            <td>{item.customer}</td>
                                            <td>{item.operationNo}</td>
                                            <td><button type="button" className='btn btn-danger' onClick={() => deletePartData(item._id)}><i class="bi bi-trash-fill"></i></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table></div>

                    </div>
                </form>
            </div>

        </div>
    )
}


const General = () => {

    const tableStyle = {
        maxHeight: "300px",
        cursor: "pointer",
    }
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };




    const handleDataReceived = (data) => {
        console.log('Data received from UnitDataBase:', data);
        // You can handle the received data here
    };
    handleDataReceived()
   


    return (
        <div style={{marginTop: "4rem"}}>
            <Box sx={{ width: '100%', bgcolor: 'inherit',  }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Unit" />
                    <Tab label="Part" />
                    {/* <Tab label="Item Three" /> */}
                </Tabs>
            </Box>
            <div >

                {value === 0 && <div ><UnitDataBase style={tableStyle} /></div>}
                {value === 1 && <div ><PartDataBase style={tableStyle} /></div>}
            </div>

        </div>



    )
}

export default General