import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Container, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { TextField, MenuItem, FormControl } from '@mui/material';



export const UnitDataBase = ({ style }) => {

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
            setErrorHandler({ status: 0, message: response.data.message, code: "success" });
            console.log("Unit delete Successfully");
            setUnitStateId(null)
        } catch (err) {
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
            setUnitData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


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

        <div >

            <form>
                <Box sx={{ flexGrow: 1, m: 4 }}>
                    <Grid container spacing={2} >


                        <Grid item xs={5} >
                            <Paper sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 2
                            }} >
                                <h6 className='text-center'>Unit DataBase</h6>
                                <div className='row g-2 mb-2'>
                                    <div className="form-floating col-2">
                                    <TextField label="Si.No."
                                            id="unitSiId"
                                            defaultValue=""

                                            size="small"
                                            placeholder="unitSi"
                                            onChange={handleUnitDataBaseChange}
                                            //onKeyDown={handleKeyDown}
                                            disabled 
                                            value={uintDataList.length + 1}
                                            name="unitSi" ></TextField>
                                       
                                    </div>


                                    <div className="form-floating col">
                                <Grid container spacing={1} className="mb-2" >
                                    <Grid item xs={6}>
                                        <TextField label="Unit Name"
                                            id="unitNameId"
                                            defaultValue=""

                                            size="small"
                                            placeholder="unitName"
                                            onChange={handleUnitDataBaseChange}
                                            onKeyDown={handleKeyDown}
                                            value={unitData.unitName}
                                            name="unitName" ></TextField>
                                    </Grid>
                                </Grid>
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
                            </Paper>
                        </Grid>

                        <Grid item xs={5} >
                            <Paper sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 4
                            }} >
                                <div>
                                    <h6 className='text-center'>Unit List</h6>
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
                            </Paper>
                        </Grid>

                    </Grid>
                </Box>
            </form>


        </div>
    )
}

export const PartDataBase = ({ style }) => {


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
            setPartData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


        }
    };


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

        <div  >
            <form>
                <Box sx={{ flexGrow: 1, m: 4 }}>

                    <Grid container spacing={2} >


                        <Grid item xs={6} >
                            <Paper sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 4
                            }} >

                                <h6 className='text-center'>Part DataBase</h6>
                                <div>
                                    <div className="row g-2 mb-2">
                                        <div className="form-floating col">
                                        <TextField label="Si.No."
                                            id="partDbId"
                                            
                                            disabled 
                                            defaultValue=""
                                            placeholder="partDb"
                                            size="small"
                                           onChange={handlePartDataBaseChange}
                                            onKeyDown={handleKeyDown}
                                            value={partDataList.length + 1}
                                            name="partDb" ></TextField>
                                          
                                        </div>
                                        <div className="form-floating col-md-5">
                                        <TextField label="Part No"
                                            id="partNoId"
                                            defaultValue=""
                                         
                                            size="small"
                                            onChange={handlePartDataBaseChange}
                                            onKeyDown={handleKeyDown}
                                            value={partData.partNo}
                                            name="partNo" ></TextField>
                                           
                                        </div>
                                        <div className="form-floating col">
                                        <TextField label="Part Name"
                                            id="partNameId"
                                            defaultValue=""
                                         
                                            size="small"
                                            onChange={handlePartDataBaseChange}
                                            onKeyDown={handleKeyDown}
                                            value={partData.partName}
                                            name="partName" ></TextField>
                                           
                                           
                                        </div>
                                    </div>


                                    <div className="row mb-2 g-2">
                                        <div className="form-floating col"  >
                                        <TextField label="Customer"
                                            id="partNameId"
                                            defaultValue=""
                                            placeholder="customer"
                                            size="small"
                                            onChange={handlePartDataBaseChange}
                                            onKeyDown={handleKeyDown}
                                            value={partData.customer}
                                            name="customer" ></TextField>
                                           
                                           
                                        </div>
                                        <div className="form-floating col" >
                                        <TextField label="Operation No"
                                            id="operationNoId"
                                            defaultValue=""
                                            placeholder="operationNo" 
                                            size="small"
                                            onChange={handlePartDataBaseChange}
                                            onKeyDown={handleKeyDown}
                                            value={partData.operationNo}
                                            name="operationNo" ></TextField>
                                           
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
                            </Paper>
                        </Grid>



                        <Grid item xs={6} >
                            <Paper sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 4
                            }} >
                                <div>
                                    <h6 className='text-center'>Part List</h6>
                                    <div style={style} className='table-responsive'>
                                        <table className='table table-bordered text-center'>
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
                            </Paper>
                        </Grid>

                    </Grid>
                </Box>

            </form>
        </div>
    )
}


