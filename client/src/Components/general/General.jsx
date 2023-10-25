import React, { useState } from 'react'

const UnitDataBase = () => {
    const [unitData, setUnitData] = useState({
        unitName: "",
    })
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
                            <input type="text" className="form-control" id="unitDbId" name="unitDb" placeholder="unitDb" />
                            <label htmlFor="unitDbId">Auto Sr.No.</label>
                        </div>
                        <div className="form-floating col-6 ">
                            <input type="text" className="form-control" id="unitNameId" name="unitName" value={unitData.unitName} placeholder="unitName" />
                            <label htmlFor="unitNameId">Unit Name</label>
                        </div>
                    </div>
                    <div className='col d-flex justify-content-end mb-2'>
                        <div className='me-2' >
                            <button type="button" className='btn btn-secondary'>Modify</button>
                        </div>
                        <div>
                            <button type="button" className='btn btn-warning'>+ Add UnitDataBase</button>
                        </div>
                    </div>
                    <hr />

                    <div>
                        <h3 className='text-center'>Unit List</h3>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Unit Name</th>
                                    <th>Delete</th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><button className='btn btn-danger '><i class="bi bi-trash-fill"></i></button></td>
                                </tr>
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
    const bodyModel={
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
                        <input type="text" className="form-control" id="partNoId" name="partNo" value={partData.partNo} placeholder="partNo" />
                        <label htmlFor="partNoId">Part No</label>
                    </div>
                    <div className="form-floating mb-2 g-2">
                        <input type="text" className="form-control" id="partNameId" name="partName" value={partData.partName} placeholder="partName" />
                        <label htmlFor="partNameId">Part Name</label>
                    </div>
                    <div className="form-floating mb-2 g-2">
                        <input type="text" className="form-control" id="partNameId" name="customer" value={partData.customer} placeholder="customer" />
                        <label htmlFor="customerId">Customer</label>
                    </div>
                    <div className="form-floating mb-2 g-2">
                        <input type="text" className="form-control" id="operationNoId" name="operationNo" value={partData.operationNo} placeholder="operationNo" />
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><button className='btn btn-danger '><i class="bi bi-trash-fill"></i></button></td>
                            </tr>
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