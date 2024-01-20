import React, { useContext, useEffect, useState, useRef } from 'react'
import { Close, TextDecreaseOutlined } from '@mui/icons-material';
import dayjs from 'dayjs';
import { CalData } from './CalList'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useReactToPrint } from 'react-to-print';

const CalPrint = () => {

    const calData = useContext(CalData)
    const { calPrintOpen, setCalPrintOpen, selectedRows, formatNoData, filteredCalData, calibrationData, printState, setPrintState } = calData


    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: `
                @page {
                    size: A4;
                    margin: 1cm;
                }
                body {
                    margin: 0;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 0.5px solid black;
                    padding: 4px 0px;
                }
                .footer {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 120px; /* Set the height based on your footer height */
                    font-size: 6px;
                }
            `,
        onAfterPrint: () => setPrintState(false)
    });

    // Your conditional logic
    if (printState) {
        // Call the handlePrint function when needed
        handlePrint();
    }

    console.log(printState)

    return (
        <Dialog keepMounted fullScreen open={calPrintOpen} sx={{ height: '100vh', width: '100vw' }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setCalPrintOpen(false)
                }
            }}>
            <DialogTitle align='center' sx={{ backgroundColor: "#323639", color: "white", height: "40px" }}>Cal Print Preview</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setCalPrintOpen(false)}

                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: "white"
                }}
            >
                <Close />
            </IconButton>
            <DialogContent style={{ display: 'block', width: "100%" }}>
                <div ref={componentRef}>
                    {/* <PDFViewer width="100%" height="100%">
                <Document >
                    <Page size="A4" style={{ fontSize: "10px", padding: "10px 15px" }}> */}
                    {/* <div className="row">
                        <div className="col-6" style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                            <div style={{ display: "flex", flexDirection: "column" }}></div>
                            <p style={{ textAlign: "center", border: "0.5px solid black", width: "50%" }}>Certificate No.</p>
                            <p style={{ textAlign: "center", border: "0.5px solid black", width: "50%" }}>{selectedRows.calCertificateNo}</p>
                        </div>
                        <div>
                            <p style={{ textAlign: "center", border: "0.5px solid black" }}>CUSTOMER DETAILS</p>
                        </div>

                    </div> */}
                    <table>
                        <tbody>
                            <h3 style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}>Calibration Certificate</h3>
                            <tr style={{ border: "0.5px solid black", width: "100%", height: "95%" }}>

                                <tr style={{ width: "100%", border: "0.5px solid black", textAlign: "center", height: "100%" }}>

                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                        <tr style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "50%" }}>
                                            <tr style={{ textAlign: "center" }}>
                                                <td>Certificate No.</td>
                                                <td>{selectedRows.calCertificateNo}</td>
                                            </tr>
                                            <td style={{ textAlign: "center", border: "0.5px solid black" }}>CUSTOMER DETAILS</td>
                                        </tr>
                                        <td style={{ textAlign: "center", width: "50%", border: "0.5px solid black" }}>
                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                                                DEVICE UNDER CALIBRATION DETAILS
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ display: "flex", flexDirection: "row", width: "100%", height: "50%" }}>
                                        <td style={{ textAlign: "center", width: "20%" }}>
                                            <div style={{ display: "flex", flexDirection: "column", border: "0.5px solid black", height: "100%" }}>
                                                <div style={{ border: "0.5px solid black", padding: "5px" }}>Name</div>
                                                <div style={{ border: "0.5px solid black", padding: "5px", flex: 1 }}>Address</div>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: "center", width: "30%" }}>
                                            <div style={{ display: "flex", flexDirection: "column", border: "0.5px solid black", height: "100%" }}>
                                                <div style={{ border: "0.5px solid black", padding: "5px" }}>METRIC</div>
                                                <div style={{ border: "0.5px solid black", padding: "5px", flex: 1 }}>Avadi, Chennai.</div>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: "center", width: "20%" }}>
                                            <div style={{ display: "flex", flexDirection: "column", border: "0.5px solid black", height: "100%" }}>
                                                <div style={{ border: "0.5px solid black", padding: "5px" }}>Description</div>
                                                <div style={{ border: "0.5px solid black", padding: "5px" }}>Make</div>
                                                <div style={{ border: "0.5px solid black", padding: "5px" }}>SIZE</div>
                                                <div style={{ border: "0.5px solid black", padding: "5px" }}>Gauge No</div>
                                                <div style={{ border: "0.5px solid black", padding: "5px" }}>Gauge Serial No</div>
                                            </div>
                                        </td>


                                        <td style={{ textAlign: "center", width: "30%" }}>
                                            <div style={{ display: "flex", flexDirection: "column", border: "0.5px solid black" }}>
                                                <div style={{ border: "0.5px solid black", padding: "5px" }}>{selectedRows.calItemName}</div>
                                                <div style={{ border: "0.5px solid black", padding: "5px" }}>{selectedRows.calItemMake}</div>
                                                <div style={{ border: "0.5px solid black", padding: "5px" }}>{selectedRows.calRangeSize}</div>
                                                <div style={{ border: "0.5px solid black", padding: "5px" }}>{selectedRows.calItemMFRNo}</div>
                                                <div style={{ border: "0.5px solid black", padding: "5px" }}>{selectedRows.calIMTENo}</div>
                                            </div>
                                        </td>
                                    </tr>



                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td style={{ width: "25%", border: "0.5px solid black" }}>Issue Date</td>
                                        <td style={{ width: "25%", border: "0.5px solid black" }}>{selectedRows.calItemEntryDate}</td>
                                        <td style={{ width: "25%", border: "0.5px solid black" }}>Calibrated on</td>
                                        <td style={{ width: "25%", border: "0.5px solid black" }}>{selectedRows.calItemCalDate}</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td style={{ width: "25%", border: "0.5px solid black" }}>Received Condition</td>
                                        <td style={{ width: "25%", border: "0.5px solid black" }}>Satisfactory</td>
                                        <td style={{ width: "25%", border: "0.5px solid black" }}>{selectedRows.calItemDueDate}</td>
                                        <td style={{ width: "25%", border: "0.5px solid black" }}>7-sep-23</td>
                                    </tr>

                                </tr>
                                <tr>
                                    {/* Table header */}
                                    <tr>

                                        {/* <tr>Issue Date</tr> */}

                                    </tr>

                                    <tr style={{ border: "1px solid black" }}>
                                        <td style={{ padding: "5px", textAlign: "center" }}>ENVIRONMENTAL CONDITION</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td>Temperature</td>
                                        <td>{selectedRows.calItemTemperature}</td>
                                        <td>Humidity</td>
                                        <td>{selectedRows.calItemHumidity}</td>
                                        <td>Drawing No. :</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td>Calibration Procedure No</td>
                                        <td>0 ± 2°C</td>
                                        <td>Standard Ref :</td>
                                        <td> 50 ± 10%</td>
                                        <td>Uncertainty :</td>
                                    </tr>
                                    <tr style={{ border: "1px solid black" }}>
                                        <td style={{ padding: "5px", textAlign: "center" }}>MASTER USED FOR CALIBRATION</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td>SI. No.</td>
                                        <td>Name of the Master Used</td>
                                        <td>Id No</td>
                                        <td>Calibration Report No</td>
                                        <td> Valid Upto</td>
                                        <td> Traceability</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td>1</td>
                                        <td> Outside Micrometer</td>
                                        <td>ODM/A/001</td>
                                        <td> Tii221217-5-9</td>
                                        <td>17-Dec-23 </td>
                                        <td>Tii Techno Testing Serv</td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: "5px", textAlign: "center" }}>CALIBRATION RESULTS</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td>Parameter </td>
                                        <td>Nominal Size</td>
                                        <td>Permissible Size Min</td>
                                        <td>Permissible Size Max</td>
                                        <td>Observed Size Min</td>
                                        <td>Observed Size Max</td>
                                        <td>Cal status</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td>GO</td>
                                        <td>20.5000</td>
                                        <td>20.5255</td>
                                        <td>20.5465</td>
                                        <td>20.5280 </td>
                                        <td>20.5290</td>
                                        <td> ACCEPTED</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "20px 20px" }}>GAUGE IS ACCEPTABLE</td>
                                    </tr>
                                </tr>
                                <tr>
                                    <tr><td style={{ padding: "10px 20px" }}>Remarks :</td></tr>
                                    <tr><td style={{ padding: "20px 20px" }}>This Certificate is Digitally Signed and does not require any seal or signature</td></tr>
                                    <tr><td style={{ textAlign: "center", padding: "30px 10px" }}>----End of the Certificate----</td></tr>
                                    <tr style={{ width: "100%", display: "flex", flexDirection: "row", }}>
                                        <td style={{ width: "40%", textAlign: "center", padding: "30px 10px" }}>Calibrated by</td><td style={{ width: "40%" }}></td><td style={{ width: "40%", textAlign: "center", padding: "30px 10px" }}>Authorised by</td>
                                    </tr>

                                </tr>

                            </tr>

                        </tbody>
                    </table>
                    {/* </Page>
                </Document>
            </PDFViewer> */}
                </div></DialogContent>
            <Button onClick={handlePrint}>Print this out!</Button>
        </Dialog>

    )
}

export default CalPrint