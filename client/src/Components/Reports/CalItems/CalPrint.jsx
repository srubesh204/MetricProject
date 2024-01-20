import React, { useContext, useEffect, useState, useRef } from 'react'
import { Close, TextDecreaseOutlined } from '@mui/icons-material';
import dayjs from 'dayjs';
import { CalData } from './CalList'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useReactToPrint } from 'react-to-print';

const CalPrint = () => {

    const calData = useContext(CalData)
    const { calPrintOpen, setCalPrintOpen, selectedRows, formatNoData, filteredCalData, calibrationData, printState, setPrintState, filterAddress } = calData


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
                    border: 0.05px solid black;
                    padding: 4px 0px;
                }
                .footer {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 200px; /* Set the height based on your footer height */
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
    console.log(selectedRows)
    console.log(filterAddress)

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
            <DialogContent style={{ display: 'none', width: "100%" }}>
                <div ref={componentRef}>
                    {/* <PDFViewer width="100%" height="100%">
                <Document >
                    <Page size="A4" style={{ fontSize: "10px", padding: "10px 15px" }}> */}
                    {/* <div className="row">
                        <div className="col-6" style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                            <div style={{ display: "flex", flexDirection: "column" }}></div>
                            <p style={{ textAlign: "center", border: "0.05px solid black", width: "50%" }}>Certificate No.</p>
                            <p style={{ textAlign: "center", border: "0.05px solid black", width: "50%" }}>{selectedRows.calCertificateNo}</p>
                        </div>
                        <div>
                            <p style={{ textAlign: "center", border: "0.05px solid black" }}>CUSTOMER DETAILS</p>
                        </div>

                    </div> */}
                    <table>
                        <tbody style={{ width: "100%", fontSize: "80%" }}>
                            <h3 style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}>Calibration Certificate</h3>
                            <tr style={{ width: "100%", height: "95%", width: "60%" }}>

                                <tr style={{ width: "100%", border: "0.05px solid black", textAlign: "center", height: "70%" }}>

                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                        <tr style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "50%", height: "100%" }}>
                                            <div style={{ textAlign: "center", width: "100%", display: "flex", flexDirection: "row", height: "50%" }}>
                                                <div style={{ fontWeight: "bold", width: "40%", border: "0.05px solid black" }}>Certificate No.</div>
                                                <div style={{ width: "60%", border: "0.05px solid black" }}>{selectedRows.calCertificateNo}</div>
                                            </div>
                                            <td style={{ textAlign: "center", border: "0.05px solid black", fontWeight: "bold", height: "50%" }}>CUSTOMER DETAILS</td>
                                        </tr>
                                        <tr style={{ textAlign: "center", width: "50%", border: "0.05px solid black" }}>
                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", fontWeight: "bold" }}>
                                                DEVICE UNDER CALIBRATION DETAILS
                                            </div>
                                        </tr>
                                    </tr>
                                    <tr style={{ display: "flex", flexDirection: "row", width: "100%", height: "50%", margin: 0 }}>
                                        <tr style={{ textAlign: "center", width: "20%", margin: 0 }}>
                                            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                                <div style={{ padding: "5px", fontWeight: "bold", border: "0.05px solid black", height: "20%" }}>Name</div>
                                                <div style={{ padding: "5px", flex: 1, fontWeight: "bold", border: "0.05px solid black", height: "80%" }}>Address</div>
                                            </div>
                                        </tr>
                                        <tr style={{ textAlign: "center", width: "30%", margin: 0 }}>
                                            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                                <div style={{ padding: "5px", border: "0.05px solid black", height: "20%" }}>{filterAddress[0]?.plantName}</div>
                                                <div style={{ padding: "5px", flex: 1, border: "0.05px solid black", height: "80%" }}>{filterAddress[0]?.plantName}<br/>{filterAddress[0]?.plantAddress}</div>
                                            </div>
                                        </tr>
                                        <tr style={{ textAlign: "center", width: "20%", margin: 0 }}>
                                            <div style={{ display: "flex", flexDirection: "column", height: "100%", fontWeight: "bold" }}>
                                                <div style={{ padding: "5px", border: "0.05px solid black", height: "20%" }}>Description</div>
                                                <div style={{ padding: "5px", border: "0.05px solid black", height: "20%" }}>Make</div>
                                                <div style={{ padding: "5px", border: "0.05px solid black", height: "20%" }}>SIZE</div>
                                                <div style={{ padding: "5px", border: "0.05px solid black", height: "20%" }}>Gauge No</div>
                                                <div style={{ padding: "5px", border: "0.05px solid black", height: "20%" }}>Gauge Serial No</div>
                                            </div>
                                        </tr>
                                        <tr style={{ textAlign: "center", width: "30%", margin: 0 }}>
                                            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                                <div style={{ padding: "5px", border: "0.05px solid black", height: "20%" }}>{selectedRows.calItemName}</div>
                                                <div style={{ padding: "5px", border: "0.05px solid black", height: "20%" }}>{selectedRows.calItemMake}</div>
                                                <div style={{ padding: "5px", border: "0.05px solid black", height: "20%" }}>{selectedRows.calRangeSize}</div>
                                                <div style={{ padding: "5px", border: "0.05px solid black", height: "20%" }}>{selectedRows.calItemMFRNo}</div>
                                                <div style={{ padding: "5px", border: "0.05px solid black", height: "20%" }}>{selectedRows.calIMTENo}</div>
                                            </div>
                                        </tr>
                                    </tr>




                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td style={{ width: "25%", border: "0.05px solid black", fontWeight: "bold" }}>Issue Date</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}>{selectedRows.calItemEntryDate}</td>
                                        <td style={{ width: "25%", border: "0.05px solid black", fontWeight: "bold" }}>Calibrated on</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}>{selectedRows.calItemCalDate}</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td style={{ width: "25%", border: "0.05px solid black", fontWeight: "bold" }}>Received Condition</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}>Satisfactory</td>
                                        <td style={{ width: "25%", border: "0.05px solid black", fontWeight: "bold" }}>Next Due</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}>{selectedRows.calItemDueDate}</td>
                                    </tr>

                                    {/* Table header */}
                                    <tr>

                                        {/* <tr>Issue Date</tr> */}

                                    </tr>

                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td style={{ padding: "5px", width: "100%", border: "0.05px solid black", fontWeight: "bold", width: "40%" }}>ENVIRONMENTAL CONDITION</td>
                                        <td style={{ width: "15%", border: "0.05px solid black", fontWeight: "bold" }}>Temperature</td>
                                        <td style={{ width: "15%", border: "0.05px solid black" }}>{selectedRows.calItemTemperature}</td>
                                        <td style={{ width: "15%", border: "0.05px solid black", fontWeight: "bold" }}>Humidity</td>
                                        <td style={{ width: "15%", border: "0.05px solid black" }}>{selectedRows.calItemHumidity}</td>
                                    </tr>
                                    {/* <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    </tr> */}
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                                <td style={{ width: "25%", border: "0.05px solid black", fontWeight: "bold" }}>Drawing No. :</td>
                                                <td style={{ width: "25%", border: "0.05px solid black" }}>123</td>
                                                <td style={{ width: "25%", border: "0.05px solid black", fontWeight: "bold" }}>Standard Ref :</td>
                                                <td style={{ width: "25%", border: "0.05px solid black" }}>0000</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                                <td style={{ width: "25%", border: "0.05px solid black", fontWeight: "bold" }}>Cal Procedure No</td>
                                                <td style={{ width: "25%", border: "0.05px solid black" }}>0000</td>
                                                <td style={{ width: "25%", border: "0.05px solid black", fontWeight: "bold" }}>Uncertainty :</td>
                                                <td style={{ width: "25%", border: "0.05px solid black" }}>{selectedRows.calItemUncertainity}</td>
                                        </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td style={{ padding: "5px", width: "100%", border: "0.05px solid black", fontWeight: "bold" }}>MASTER USED FOR CALIBRATION</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row", fontWeight: "bold" }}>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}>SI. No.</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}>Name of the Master Used</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}>Id No</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}>Calibration Report No</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}> Valid Upto</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}> Traceability</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}>1</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}> Outside Micrometer</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}>ODM/A/001</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}> Tii221217-5-9</td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}>17-Dec-23 </td>
                                        <td style={{ width: "25%", border: "0.05px solid black" }}>Tii Techno Testing Serv</td>
                                    </tr>

                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td style={{ padding: "5px", width: "100%", border: "0.05px solid black", fontWeight: "bold" }}>CALIBRATION RESULTS</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row", fontWeight: "bold" }}>
                                        <td style={{ width: "16%", border: "0.05px solid black" }}>Parameter </td>
                                        <td style={{ width: "14%", border: "0.05px solid black" }}>Nominal Size</td>
                                        <td style={{ width: "14%", border: "0.05px solid black" }}>Permissible Size Min</td>
                                        <td style={{ width: "14%", border: "0.05px solid black" }}>Permissible Size Max</td>
                                        <td style={{ width: "14%", border: "0.05px solid black" }}>Observed Size Min</td>
                                        <td style={{ width: "14%", border: "0.05px solid black" }}>Observed Size Max</td>
                                        <td style={{ width: "14%", border: "0.05px solid black" }}>Cal status</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td style={{ width: "16%", border: "0.05px solid black" }}>GO</td>
                                        <td style={{ width: "14%", border: "0.05px solid black" }}>20.5000</td>
                                        <td style={{ width: "14%", border: "0.05px solid black" }}>20.5255</td>
                                        <td style={{ width: "14%", border: "0.05px solid black" }}>20.5465</td>
                                        <td style={{ width: "14%", border: "0.05px solid black" }}>20.5280 </td>
                                        <td style={{ width: "14%", border: "0.05px solid black" }}>20.5290</td>
                                        <td style={{ width: "14%", border: "0.05px solid black" }}> ACCEPTED</td>
                                    </tr>
                                </tr>
                                <tr>
                                    <td style={{ padding: "10px 20px" }}>GAUGE IS ACCEPTABLE</td>
                                </tr>
                                {/* Your footer */}
                                <div className="footer">
                                    <tr style={{ fontWeight: "bold" }}>
                                        <td>Remarks :</td>
                                    </tr>
                                    <tr>
                                        <td style={{ paddingLeft: "50px" }}>This Certificate is Digitally Signed and does not require any seal or signature</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td style={{ textAlign: 'center', padding: '30px 10px', width: '100%', fontWeight: "bold" }}>----End of the Certificate----</td>
                                    </tr>
                                    <tr style={{ width: '100%', display: 'flex', flexDirection: 'row', fontWeight: "bold" }}>
                                        <td style={{ width: '40%', textAlign: 'center', padding: '30px 10px' }}>Calibrated by</td>
                                        <td style={{ width: '40%' }}></td>
                                        <td style={{ width: '40%', textAlign: 'center', padding: '30px 10px' }}>Authorised by</td>
                                    </tr>
                                </div>

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