import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UnitDataBase = () => {

const [ unitStateId , setUnitStateId] =useState("")
    const initialUnitData ={
       
        unitName: "",
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
            setUnitDataList(response.data);
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
          {/*console.log(response.data.message)*/}
          console.log(response)
            unitFetchData();
          setUnitData(initialUnitData);
        } catch (err) {
          console.log(err);
          alert(err);
        }
      };

      const updateUnitData = async (id) => {
        try {
          await axios.put(
            "http://localhost:3001/unit/updateUnit/" + id, unitData
          );
          unitFetchData();
          setUnitData({
            unitName: ""
          });
          console.log("Unit Updated Successfully");
        } catch (err) {
          console.log(err);
        }
      };
      const deleteUnitData = async (id) => {
        try {
          await axios.delete(
            "http://localhost:3001/unit/deleteUnit/" + id, unitData
          );
          unitFetchData();
          setUnitData({
            unitName: ""
          });
          console.log("Unit delete Successfully");
        } catch (err) {
          console.log(err);
        }
      };
    



      const updateUnit = async (item) =>{
        setUnitData(item)
        setUnitStateId(item._id)
      }
      console.log(unitStateId)


    const bodycss = {
        borderRadius: "10px",

        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 25px 10px",
    }
    return (

        <div className='container'>
            <div style={bodycss} >
                <form>
                    <h1 className='text-center'>Unit DataBase</h1>
                    <div className='row g-2 mb-3'>
                        <div className="form-floating col-6 ">
                            <input type="text" className="form-control" id="unitSiId" name="unitSi" placeholder="unitSi" disabled value={uintDataList.length+1}/>
                            <label htmlFor="unitSiId">Auto Sr.No.</label>
                        </div>
                        <div className="form-floating col-6 ">
                            <input type="text" className="form-control" id="unitNameId" name="unitName" value={unitData.unitName} onChange={handleUnitDataBaseChange} placeholder="unitName" />
                            <label htmlFor="unitNameId">Unit Name</label>
                        </div>
                    </div>
                    <div className='col d-flex justify-content-end mb-2'>
                        <div className='me-2' >
                            <button type="button" className='btn btn-secondary' onClick={()=> updateUnitData(unitStateId)}>Modify</button>
                        </div>
                        <div>
                            <button type="button" className='btn btn-warning '  onClick={unitSubmit}>+ Add UnitDataBase</button>
                        </div>
                    </div>
                    <hr />

                    <div>
                        <h3 className='text-center'>Unit List</h3>
                        <table className='table table-bordered text-center'>
                            <tbody>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Unit Name</th>
                                    <th>Delete</th>
                                </tr>
                                {uintDataList.map((item, index) => (
                                    <tr onClick={()=> updateUnit(item)}>
                                        <td>{index+1}</td>
                                        <td>{item.unitName}</td>
                                        <td><button type='button' className='btn btn-danger' onClick={()=> deleteUnitData(item._id)}><i class="bi bi-trash-fill"></i></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </form>
            </div>
        </div>
    )
}

const PartDataBase = () => {
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
            setPartDataList(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        partFetchData();
    }, []);

    console.log(partDataList)


    const handlePartDataBaseChange = (e) => {
        const { name, value } = e.target;
        setPartData((prev) => ({ ...prev, [name]: value }));

    };
    const bodyModel = {
        borderRadius: "10px",
        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 25px 10px",
    }
    return (

        <div className='container'>
            <div style={bodyModel}>
                <form>
                    <h1 className='text-center'>Part DataBase</h1>
                    <div>
                        <div className="form-floating  mb-2 g-2">
                            <input type="text" className="form-control" id="partDbId" name="partDb" placeholder="partDb" />
                            <label htmlFor="partDbId">Auto Sr.No.</label>
                        </div>
                        <div className="form-floating mb-2 g-2">
                            <input type="text" className="form-control" id="partNoId" name="partNo" value={partData.partNo} onChange={handlePartDataBaseChange} placeholder="partNo" />
                            <label htmlFor="partNoId">Part No</label>
                        </div>
                        <div className="form-floating mb-2 g-2">
                            <input type="text" className="form-control" id="partNameId" name="partName" value={partData.partName} onChange={handlePartDataBaseChange} placeholder="partName" />
                            <label htmlFor="partNameId">Part Name</label>
                        </div>
                        <div className="form-floating mb-2 g-2">
                            <input type="text" className="form-control" id="partNameId" name="customer" value={partData.customer} onChange={handlePartDataBaseChange} placeholder="customer" />
                            <label htmlFor="customerId">Customer</label>
                        </div>
                        <div className="form-floating mb-2 g-2">
                            <input type="text" className="form-control" id="operationNoId" name="operationNo" value={partData.operationNo} onChange={handlePartDataBaseChange} placeholder="operationNo" />
                            <label htmlFor="operationNoId">Operation No</label>
                        </div>

                    </div>
                    <div className='col d-flex justify-content-end mb-2' >
                        <div className='me-2'>
                            <button type="button" className='btn btn-secondary'>Modify</button>
                        </div>
                        <div>
                            <button type="button" className='btn btn-warning'>+ Add PartDataBase</button>
                        </div>
                    </div>

                    <hr />

                    <div>
                        <h3 className='text-center'>Part List</h3>
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
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.partNo}</td>
                                        <td>{item.partName}</td>
                                        <td>{item.customer}</td>
                                        <td>{item.operationNo}</td>
                                        <td><button className='btn btn-danger'><i class="bi bi-trash-fill"></i></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    )
}


const General = () => {
    return (
        <div>
            <div className="row">
                <div className='col'><UnitDataBase /></div>
                <div className='col'><PartDataBase /></div>
            </div>

        </div>



    )
}

export default General