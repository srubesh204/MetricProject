import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Vendor = () => {
    const [vendorStateId, setVendorStateId] = useState("")
    const initialvendorData = {

        vendorCode: "",
        aliasName: "",
        fullName: "",
        dateOfReg: "",
        address: "",
        state: "",
        city: "",
        ome: "",
        customer: "",
        supplier: "",
        subContractor: "",
        vendorContacts: [{ name: "", contactNumber: "", mailId: "", vcStatus: "" }],
        certificate: "",
        certificateValidity: "",
        vendorStatus: "",
    }

    const [vendorData, setVendorData] = useState({
        vendorCode: "",
        aliasName: "",
        fullName: "",
        dateOfReg: "",
        address: "",
        state: "",
        city: "",
        ome: "",
        customer: "",
        supplier: "",
        subContractor: "",
        vendorContacts: [{ name: "", contactNumber: "", mailId: "", vcStatus: "" }],
        certificate: "",
        certificateValidity: "",
        vendorStatus: "",


    })
    console.log(vendorData)

    const [vendorDataList, setVendorDataList] = useState([])
    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);
    console.log(vendorDataList)

    const handleVendorDataBaseChange = (e) => {
        const { name, value } = e.target;
        setVendorData((prev) => ({ ...prev, [name]: value }));

    };



    const bodyTxt = {
        borderRadius: "10px",

        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 25px 10px",
    }
    return (
        <div className='container'>
            <div style={bodyTxt}>
                <form>
                    <div className='row g-2'>
                        <div className='col'>
                            <h1 className='text-center'>Vendor DataBase</h1>
                        </div>
                        <div className='col  d-flex justify-content-end '>
                            <div class="form-check form-check-inline ">
                                <input className="form-check-input" type="checkbox" value={vendorData.ome} onChange={handleVendorDataBaseChange} id="OEMId" name="OEM" />
                                <label className="form-check-label" htmlFor="OEMId">OEM</label>
                            </div>
                            <div class="form-check form-check-inline ">
                                <input className="form-check-input" type="checkbox" value={vendorData.customer} onChange={handleVendorDataBaseChange} id="customerId" name="customer" />
                                <label className="form-check-label" htmlFor="customerId">Customer</label>
                            </div>
                            <div class="form-check form-check-inline ">
                                <input className="form-check-input" type="checkbox" value={vendorData.supplier} onChange={handleVendorDataBaseChange} id="supplierId" name="supplier" />
                                <label className="form-check-label" htmlFor="supplierId">Supplier</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value={vendorData.subContractor} onChange={handleVendorDataBaseChange} id="subContractorId" name="subContractor" />
                                <label className="form-check-label" htmlFor="subContractorId">SubContractor</label>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-2 g-2'>
                        <div className="form-floating col-3">
                            <input type="text" className="form-control" id="vendorCodeId" name="vendorCode" placeholder="vendorCode" value={vendorData.vendorCode} onChange={handleVendorDataBaseChange} />
                            <label htmlFor="vendorCodeId">Vendor Code</label>
                        </div>
                        <div className="form-floating  col">
                            <input type="text" className="form-control" id="aliasNameId" name="aliasName" placeholder="aliasName" value={vendorData.aliasName} onChange={handleVendorDataBaseChange} />
                            <label htmlFor="aliasNameId">Alias Name</label>
                        </div>
                        <div className="form-floating  col">
                            <input type="text" className="form-control" id="fullNameId" name="fullName" placeholder="fullName" value={vendorData.fullName} onChange={handleVendorDataBaseChange} />
                            <label htmlFor="fullNameId">full Name</label>
                        </div>
                        <div className="form-floating  col">
                            <input type="date" className="form-control" id="dateOfRegId" name="dateOfReg" placeholder="dateOfReg" value={vendorData.dateOfReg} onChange={handleVendorDataBaseChange} />
                            <label htmlFor="dateOfRegId">Data Of Reg</label>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className='col  '>
                            <div class="form-floating mb-2">
                                <textarea className="form-control" id="addressId" placeholder="address" name="address" value={vendorData.address} style={{height: "50px"}} onChange={handleVendorDataBaseChange}></textarea>
                                <label htmlFor="addressId">Address</label>
                            </div>
                            <div className='row g-2'>

                                <div className="form-floating mb-2 col">
                                    <input type="text" className="form-control" id="stateId" name="state" placeholder="state" value={vendorData.state} onChange={handleVendorDataBaseChange} />
                                    <label htmlFor="stateId">State</label>
                                </div>
                                <div className="form-floating mb-2 col">
                                    <input type="text" className="form-control" id="cityId" name="city" placeholder="city" value={vendorData.city} onChange={handleVendorDataBaseChange} />
                                    <label htmlFor="cityId">City</label>
                                </div>
                                <div className="form-floating mb-2 col">
                                    <input type="text" className="form-control" id="StatusId" name="Status" placeholder="Status" value={vendorData.vendorStatus} onChange={handleVendorDataBaseChange} />
                                    <label htmlFor="StatusId">Status</label>
                                </div>

                            </div>
                            <div className=" row g-2">
                                
                                <div className="form-floating me-4 mb-4 col-6">
                                    <input type="date" className="form-control" id="certificateValidityId" name="certificateValidity" placeholder="certificateValidity" value={vendorData.certificateValidity} onChange={handleVendorDataBaseChange} />
                                    <label htmlFor="certificateValidityId">Certificate Validity</label>
                                </div>


                                <div className='me-2 col'>
                                    <label className='certificateuplod'>
                                        <input className="form-control certificatedownlod" type="file" id="certificateUpload" />Certificate Upload </label>
                                </div>

                            </div>

                        </div>
                        <div className='col'>
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <td>Si.No</td>
                                        <th>Name</th>
                                        <th>Contact Number</th>
                                        <th>Mail Id</th>
                                        <th>Status</th>
                                    </tr>
                                    {vendorData.vendorContacts.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.contactNumber}</td>
                                            <td>{item.mailId}</td>
                                            <td>{item.vcStatus}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </div>
                        <div className='row' >
                            <div className='col  d-flex justify-content-end mb-2'>
                                <div className='col  d-flex'>
                                    <div className='me-2' >
                                        <label className='upload'>
                                            <input className="form-control download" type="file" id="upload" />Upload</label>
                                    </div>
                                    <div className='me-2'>
                                        <label className='upload'>
                                            <input className="form-control download" type="file" id="download" />Download </label>
                                    </div>
                                </div>
                                <div className='col d-flex justify-content-end mb-2'>
                                    <div className='me-2' >
                                        <button type="button" className='btn btn-secondary' >Modify</button>
                                    </div>
                                    <div >
                                        <button type="button" className='btn btn-warning'>+ Add Vendor</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='mb-5'>
                            <h3 className='text-center'>Vendor List</h3>
                            <div className='row mb-2  g-2'>
                                <div class="form-floating-sm  col-2">
                                    <select className="form-select form-select-sm" id="vendorTypeId" name="vendorType" aria-label="Floating label select example">
                                        <option selected>Vendor Type</option>
                                        <option value="1">OME</option>
                                        <option value="2">Customer</option>
                                        <option value="3">Supplier</option>
                                        <option value="4">SubContractor</option>
                                    </select>

                                </div>
                            </div>
                            <table className='table table-bordered text-center'>
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
                                    {vendorDataList.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.vendorCode}</td>
                                            <td>{item.aliasName}</td>
                                            <td>{item.city}</td>
                                            <td>{item.state}</td>
                                            <td>{item.vendorStatus}</td>
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

export default Vendor