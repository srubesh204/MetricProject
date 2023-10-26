import React from 'react'

const ItemMaster = () => {



    const bodyItem = {
        borderRadius: "10px",

        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 25px 10px",
    }
    return (
        <div className='container'>
            <div style={bodyItem}>
            <form>
                <h1 className='text-center'>Item Master Database</h1>
                <div className='row mb-3 g-2'>
                    <div className="form-floating col">
                        <input type="text" className="form-control" id="autoItemCodeId" name="autoItemCode" placeholder="autoItemCode" />
                        <label htmlFor="autoItemCodeId">Auto Item code</label>
                    </div>
                    <div class="form-floating col">
                        <select className="form-select" id="itemTypeId" name="itemType" >
                            <option selected>Item Type</option>
                            <option value="1">Mr.</option>
                            <option value="2">Ms.</option>

                        </select>
                        <label htmlFor="itemTypeId">Item Type</label>
                    </div>
                    <div className="form-floating col">
                        <input type="text" className="form-control" id="itemDescriptionId" name="itemDescription" placeholder="itemDescription" />
                        <label htmlFor="itemDescriptionId">Item Description</label>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-7'>
                        <div className='row mb-2 g-2'>

                            <div className="form-floating col">
                                <input type="text" className="form-control" id="itemPrefixId" name="itemPrefix" placeholder="itemPrefix" />
                                <label htmlFor="itemPrefixId">Item Prefix</label>
                            </div>
                            <div className="form-floating col">
                                <input type="text" className="form-control" id="wiNoId" name="wiNo" placeholder="wiNo" />
                                <label htmlFor="wiNoId">WI No</label>
                            </div>

                        </div>
                        <div className='row mb-2 g-2'>

                            <div className="form-floating col">
                                <input type="number" className="form-control" id="itemFqInMonthsId" name="itemFqInMonths" placeholder="itemFqInMonths" />
                                <label htmlFor="itemFqInMonthsId">Item Fq In Months</label>
                            </div>
                            <div className="form-floating col ">
                                <input type="number" className="form-control" id="uncertaintyId" name="uncertainty" placeholder="uncertainty" />
                                <label htmlFor="uncertaintyId">Uncertainty</label>
                            </div>
                            <div className="input-group col">
                                <span className="input-group-text">Uncertainty</span>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="unitId" name="unit" placeholder="unit" />
                                    <label htmlFor="unitId">Unit</label>
                                </div>

                            </div>
                        </div>
                        <div className='row g-2 mb-2 '>

                            <div className="form-floating col">
                                <input type="number" className="form-control" id="calibrationAlertInDaysId" name="calibrationAlertInDays" placeholder="calibrationAlertInDays" />
                                <label htmlFor="calibrationAlertInDaysId">Calibration Alert In Days</label>
                            </div>
                            <div className="form-floating col">
                                <input type="text" className="form-control" id="standardRefId" name="standardRef" placeholder="standardRef" />
                                <label htmlFor="standardRefId">Standard Ref </label>
                            </div>

                        </div>
                    </div>
                    <div className='col-md-2'>
                        <div style={{ border: "1px solid", width: "50%", height: "70%", margin: 0, padding: 0 }}>
                            <image src="" />
                        </div>
                        <button className='btn btn-warning mt-3'>Upload Image</button>                    </div>
                    <div className='col-md-3 d-flex justify-content-end mb-2'>
                        <div className='col-12'>
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Si No</th>
                                        <th>Calibration Points</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col d-flex'>
                        <div className='me-2' >
                            <label className='upload'>
                                <input className="form-control download" type="file" id="upload" />Upload</label>
                        </div>
                        <div className='me-2'>
                            <label className='upload'>
                                <input className="form-control download" type="file" id="download" />Download </label>
                        </div>
                    </div>
                    <div className='col d-flex'>
                        <div className='me-2' >
                            <button type="button" className='btn btn-secondary' >Modify</button>
                        </div>
                        <div >
                            <button type="button" className='btn btn-warning'>+ Add Item Master</button>
                        </div>
                    </div>
                    <div className='col d-flex'>
                        <div className='me-2'>
                            <label className='itemupload'>
                                <input className="form-control itemdownload" type="file" id="workInstructionUpload " />Work Instruction Upload </label>
                        </div>
                    </div>
                </div>
                 <hr/>

                <div>
                    <h3 className='text-center'>Vendor List</h3>
                    <div className='row mb-2 g-2'>
                        <div class="form-floating  col-6">
                            <select className="form-select" id="itemTypeId" name="itemType" aria-label="Floating label select example">
                                <option selected>Item Type</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label htmlFor="itemTypeId">Item Type</label>
                        </div>
                        <div class="form-floating  col-6">
                            <select className="form-select" id="itemNameId" name="itemName" aria-label="Floating label select example">
                                <option selected>Item Name</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label htmlFor="itemNameId">Item Name</label>
                        </div>
                    </div>
                    <div>
                        <table className='table table-bordered text-center'>
                            <tbody>
                                <tr>
                                    <th>Si No</th>
                                    <th>Item Name</th>
                                    <th>Item Prefix</th>
                                    <th>Cal Fq</th>
                                    <th>Alert Days</th>
                                    <th>Item Type</th>
                                    <th>Status</th>
                                    <th>Deletet</th>

                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
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
        </div>
    )
}

export default ItemMaster