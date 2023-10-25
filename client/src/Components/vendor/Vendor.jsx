import React from 'react'

const Vendor = () => {
    return (
        <div>
            <form>
                <div className='row g-2'>
                    <div className='col'>
                        <h1 className='text-center'>Vendor DataBase</h1>
                    </div>
                    <div className='col'>
                        <div class="form-check form-check-inline ">
                            <input className="form-check-input" type="checkbox" value="" id="OEMId" name="OEM" />
                            <label className="form-check-label" htmlFor="OEMId">OEM</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" value="" id="customerId" name="customer" />
                            <label className="form-check-label" htmlFor="customerId">Customer</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" value="" id="supplierId" name="supplier" />
                            <label className="form-check-label" htmlFor="supplierId">Supplier</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" value="" id="subContractorId" name="subContractor" />
                            <label className="form-check-label" htmlFor="subContractorId">SubContractor</label>
                        </div>
                    </div>
                </div>
                <div className='row mb-3 g-2'>
                    <div className="form-floating col-3">
                        <input type="text" className="form-control" id="vendorCodeId" name="vendorCode" placeholder="vendorCode" />
                        <label htmlFor="vendorCodeId">Vendor Code</label>
                    </div>
                    <div className="form-floating  col-3">
                        <input type="text" className="form-control" id="aliasNameId" name="aliasName" placeholder="aliasName" />
                        <label htmlFor="aliasNameId">Alias Name</label>
                    </div>
                    <div className="form-floating  col-3">
                        <input type="text" className="form-control" id="fullNameId" name="fullName" placeholder="fullName" />
                        <label htmlFor="fullNameId">full Name</label>
                    </div>
                    <div className="form-floating  col-3">
                        <input type="date" className="form-control" id="dateOfRegId" name="dateOfReg" placeholder="dateOfReg" />
                        <label htmlFor="dateOfRegId">Data Of Reg</label>
                    </div>
                </div>
                <div className="row g-2">
                    <div className='col'>
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="addressId" name="address" placeholder="address" />
                            <label htmlFor="addressId">Address</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="stateId" name="state" placeholder="state" />
                            <label htmlFor="stateId">State</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="stateId" name="state" placeholder="state" />
                            <label htmlFor="stateId">City</label>
                        </div>
                    </div>
                    <div className='col'>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Contact Number</th>
                                    <th>Mail Id</th>
                                    <th>Status</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='row' >
                        <div className='col d-flex'>
                            <div className='me-2 col-2' >
                                <label className='upload'>
                                    <input className="form-control download" type="file" id="uploadExcel" />Upload Excel</label>
                            </div>
                            <div className='me-2' col-2>
                                <label className='upload'>
                                    <input className="form-control download" type="file" id="downloadExcel" />Download Excel </label>
                            </div>
                            {/* <div className='col d-flex justify-content-center mb-2'>*/}
                            <div className='me-2 col-2' >
                                <button type="button" className='btn btn-secondary' >Modify</button>
                            </div>
                            <div className='col-2'>
                                <button type="button" className='btn btn-warning'>+ Add Employee</button>
                            </div>
                            <div className="form-floating col-2">
                                <input type="date" className="form-control" id="certificateId" name="certificate" placeholder="certificate" />
                                <label htmlFor="certificateId">Certificate</label>
                            </div>
                            <div className='me-2 col-2' >
                                <label className='upload'>
                                    <input className="form-control download" type="file" id="certificateUplod" />Certificate Uplod</label>
                            </div>
                            {/*</div>*/}

                        </div>
                    </div>
                    <div>
                        <h3 className='text-center'>Vendor List</h3>
                        <div>
                        <div class="form-floating  col-1">
                            <select className="form-select" id="vendorTypeId" name="vendorType" aria-label="Floating label select example">
                                <option selected>Vendor Type</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label htmlFor="vendorTypeId">Vendor Type</label>
                        </div>
                        </div>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>vendor Code</th>
                                    <th>Vendor Name</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Type Of Supplier</th>
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
                </div>



            </form>
        </div>
    )
}

export default Vendor