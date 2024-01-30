import React, { useContext, useEffect, useState, useRef } from 'react'
import { Close, TextDecreaseOutlined } from '@mui/icons-material';
import dayjs from 'dayjs';
import { CalData } from './CalList'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useReactToPrint } from 'react-to-print';

const HisCalPrint = () => {

    const calData = useContext(CalData)
    const { selectedRows, formatNoData, filteredCalData, calibrationData, printState, setPrintState, filterAddress, filterCompany } = calData


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
                    height: 250px; /* Set the height based on your footer height */
                }
            `,
        onAfterPrint: () => setPrintState(false)
    });


    useEffect(() => {
        if (printState) {
            console.log("Working");
            handlePrint();
        }
    }, [printState, handlePrint]);

    console.log(printState)
    console.log(selectedRows)
    console.log(filterAddress)
    console.log(selectedRows && selectedRows.calcalibrationData)
    console.log(filteredCalData)
    console.log(filterCompany[0]?.companyName)
    console.log(formatNoData)

    return (
        <div style={{ display: 'none' }}>
            <div ref={componentRef} style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            
                {/* <PDFViewer width="100%" height="100%">
                <Document >
                    <Page size="A4" style={{ fontSize: "10px", padding: "10px 15px" }}> */}
                <table style={{width: "100%",}}>
                    <tbody style={{width: "100%"}}>
                        <h3 style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}>Calibration Certificate</h3>
                        <tr style={{ width: "100%", height: "95%", fontSize: "80%", textAlign: "center" }}>

                            <tr style={{ width: "100%", border: "0.1px solid black", textAlign: "center", height: "70%" }}>

                                <tr style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "50%", height: "100%" }}>
                                        <div style={{ textAlign: "center", width: "100%", display: "flex", flexDirection: "row" }}>
                                            <div style={{ fontWeight: "bold", width: "40%", border: "0.1px solid black" }}>Certificate No.</div>
                                            <div style={{ width: "60%", border: "0.1px solid black" }}>{selectedRows.calCertificateNo}</div>
                                        </div>
                                        <td style={{ textAlign: "center", border: "0.1px solid black", fontWeight: "bold" }}>CUSTOMER DETAILS</td>
                                    </tr>
                                    <tr style={{ textAlign: "center", width: "50%", border: "0.1px solid black" }}>
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", fontWeight: "bold" }}>
                                            DEVICE UNDER CALIBRATION DETAILS
                                        </div>
                                    </tr>
                                </tr>
                                <tr style={{ display: "flex", flexDirection: "row", width: "100%", height: "50%", margin: 0 }}>
                                    <tr style={{ textAlign: "center", width: "20%", margin: 0 }}>
                                        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                            <div style={{ fontWeight: "bold", border: "0.1px solid black", height: "20%" }}>Name</div>
                                            <div style={{ flex: 1, fontWeight: "bold", border: "0.1px solid black", height: "80%" }}>Address</div>
                                        </div>
                                    </tr>
                                    <tr style={{ textAlign: "center", width: "30%", margin: 0 }}>
                                        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                            <div style={{ border: "0.1px solid black", height: "20%" }}>{filterCompany[0]?.companyName}</div>
                                            <div style={{ flex: 1, border: "0.1px solid black", height: "80%" }}>{filterAddress[0]?.plantName}<br />{filterAddress[0]?.plantAddress}</div>
                                        </div>
                                    </tr>
                                    <tr style={{ textAlign: "center", width: "20%", margin: 0 }}>
                                        <div style={{ display: "flex", flexDirection: "column", height: "100%", fontWeight: "bold" }}>
                                            <div style={{ border: "0.1px solid black", height: "20%" }}>Description</div>
                                            <div style={{ border: "0.1px solid black", height: "20%" }}>Make</div>
                                            <div style={{ border: "0.1px solid black", height: "20%" }}>SIZE</div>
                                            <div style={{ border: "0.1px solid black", height: "20%" }}>Gauge No</div>
                                            <div style={{ border: "0.1px solid black", height: "20%" }}>Gauge Serial No</div>
                                        </div>
                                    </tr>
                                    <tr style={{ textAlign: "center", width: "30%", margin: 0 }}>
                                        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                            <div style={{ border: "0.1px solid black", height: "20%" }}>{selectedRows.calItemName}</div>
                                            <div style={{ border: "0.1px solid black", height: "20%" }}>{selectedRows.calItemMake}</div>
                                            <div style={{ border: "0.1px solid black", height: "20%" }}>{selectedRows.calRangeSize}</div>
                                            <div style={{ border: "0.1px solid black", height: "20%" }}>{selectedRows.calItemMFRNo}</div>
                                            <div style={{ border: "0.1px solid black", height: "20%" }}>{selectedRows.calIMTENo}</div>
                                        </div>
                                    </tr>
                                </tr>




                                <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <td style={{ width: "25%", border: "0.1px solid black", fontWeight: "bold" }}>Issue Date</td>
                                    <td style={{ width: "25%", border: "0.1px solid black" }}>{selectedRows.calItemEntryDate}</td>
                                    <td style={{ width: "25%", border: "0.1px solid black", fontWeight: "bold" }}>Calibrated on</td>
                                    <td style={{ width: "25%", border: "0.1px solid black" }}>{selectedRows.calItemCalDate}</td>
                                </tr>
                                <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <td style={{ width: "25%", border: "0.1px solid black", fontWeight: "bold" }}>Received Condition</td>
                                    <td style={{ width: "25%", border: "0.1px solid black" }}>Satisfactory</td>
                                    <td style={{ width: "25%", border: "0.1px solid black", fontWeight: "bold" }}>Next Due</td>
                                    <td style={{ width: "25%", border: "0.1px solid black" }}>{selectedRows.calItemDueDate}</td>
                                </tr>

                                {/* Table header */}
                                <tr>

                                    {/* <tr>Issue Date</tr> */}

                                </tr>

                                <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <td style={{ width: "30%", border: "0.1px solid black", fontWeight: "bold", width: "40%" }}>ENVIRONMENTAL CONDITION</td>
                                    <td style={{ width: "17%", border: "0.1px solid black", fontWeight: "bold" }}>Temperature</td>
                                    <td style={{ width: "18%", border: "0.1px solid black" }}>{selectedRows.calItemTemperature}</td>
                                    <td style={{ width: "17%", border: "0.1px solid black", fontWeight: "bold" }}>Humidity</td>
                                    <td style={{ width: "18%", border: "0.1px solid black" }}>{selectedRows.calItemHumidity}</td>
                                </tr>
                                {/* <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    </tr> */}
                                <tr style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                    <td style={{ width: "25%", border: "0.1px solid black", fontWeight: "bold" }}>Drawing No. :</td>
                                    <td style={{ width: "25%", border: "0.1px solid black" }}>-</td>
                                    <td style={{ width: "25%", border: "0.1px solid black", fontWeight: "bold" }}>Standard Ref :</td>
                                    <td style={{ width: "25%", border: "0.1px solid black" }}>{selectedRows.calStandardRef || '-'}</td>
                                </tr>
                                <tr style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                    <td style={{ width: "25%", border: "0.1px solid black", fontWeight: "bold" }}>Cal Procedure No</td>
                                    <td style={{ width: "25%", border: "0.1px solid black" }}>{selectedRows.calItemSOPNo || '-'}</td>
                                    <td style={{ width: "25%", border: "0.1px solid black", fontWeight: "bold" }}>Uncertainty :</td>
                                    <td style={{ width: "25%", border: "0.1px solid black" }}>{selectedRows.calItemUncertainity}</td>
                                </tr>
                                <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <td style={{ width: "100%", border: "0.1px solid black", fontWeight: "bold" }}>MASTER USED FOR CALIBRATION</td>
                                </tr>
                                <tr style={{ textAlign: "center", display: "flex", flexDirection: "row", fontWeight: "bold" }}>
                                    <td style={{ width: "10%", border: "0.1px solid black" }}>SI. No.</td>
                                    <td style={{ width: "25%", border: "0.1px solid black" }}>Name of the Master Used</td>
                                    <td style={{ width: "25%", border: "0.1px solid black" }}>Id No</td>
                                    <td style={{ width: "25%", border: "0.1px solid black" }}>Calibration Report No</td>
                                    <td style={{ width: "20%", border: "0.1px solid black" }}>Valid Upto</td>
                                    <td style={{ width: "20%", border: "0.1px solid black" }}>Traceability</td>
                                </tr>
                                {selectedRows && selectedRows.calMasterUsed && selectedRows.calMasterUsed.map(cal => (
                                    <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <td style={{ width: "10%", border: "0.1px solid black" }}>1</td>
                                        <td style={{ width: "25%", border: "0.1px solid black" }}>{cal.itemAddMasterName}</td>
                                        <td style={{ width: "25%", border: "0.1px solid black" }}>{cal.itemIMTENo}</td>
                                        <td style={{ width: "25%", border: "0.1px solid black" }}>{cal.itemCertificateNo}</td>
                                        <td style={{ width: "20%", border: "0.1px solid black" }}>{dayjs(cal.itemDueDate).format("DD-MM-YYYY")}</td>
                                        <td style={{ width: "20%", border: "0.1px solid black" }}>{cal.itemCalibratedAt}</td>
                                    </tr>
                                ))}


                                <tr style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <td style={{ width: "100%", border: "0.1px solid black", fontWeight: "bold" }}>CALIBRATION RESULTS</td>
                                </tr>
                                <tr style={{ textAlign: "center", display: "flex", flexDirection: "row", fontWeight: "bold", width: "100%" }}>
                                    <td style={{ width: "16%", border: "0.1px solid black" }}>Parameter </td>
                                    <td style={{ width: "14%", border: "0.1px solid black" }}>Nominal Size</td>
                                    <td colSpan="2" style={{ width: "28%", border: "0.1px solid black" }}>Permissible Size</td>
                                    {/* <td style={{ width: "14%", border: "0.1px solid black" }}>Permissible Size Max</td> */}
                                    <td colSpan="2" style={{ width: "28%", border: "0.1px solid black" }}>Observed Size</td>
                                    
                                    <td style={{ width: "14%", border: "0.1px solid black" }}>Cal status</td>
                                </tr>

                                {selectedRows && selectedRows.calcalibrationData && selectedRows.calcalibrationData.map((item, index) => (
                                    <tr key={index} style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                        <td style={{ width: "16%", border: "0.1px solid black" }}>{item.calParameter || '-'}</td>
                                        <td style={{ width: "14%", border: "0.1px solid black" }}>{item.calNominalSize || '-'}</td>
                                        <td colSpan="2" style={{ width: "28%", border: "0.1px solid black" }}>{item.calMinPS + " / " +item.calMaxPS}</td>
                                        
                                        {selectedRows.calOBType === "average" ? 
                                        <td colSpan="2" style={{ width: "28%", border: "0.1px solid black" }}>{item.calAverageOB || '-'} </td>
                                        :
                                        <td colSpan="2" style={{ width: "28%", border: "0.1px solid black" }}>{item.calMinOB + " / " + item.calMaxOB} </td>}
                                        
                                        
                                        <td style={{ width: "14%", border: "0.1px solid black" }}>{item.rowStatus || '-'}</td>
                                    </tr>
                                ))}
                            </tr>
                            <tr>
                                <td style={{ padding: "10px 20px" }}>GAUGE IS ACCEPTABLE</td>
                            </tr>
                            {/* Your footer */}
                            <div className="footer">
                                <tr>
                                    <td style={{ fontWeight: "bold", textAlign: "left" }}>Remarks :</td>
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
                                <div style={{ display: 'flex', flexDirection: 'row', height: '10px' }}>
                                    <div style={{ position: 'absolute', fontSize: '8px' }}>Format Number: {formatNoData && formatNoData.fCalDueDate?.frNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment No.: {formatNoData && formatNoData.fCalDueDate?.amNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment Date.: {formatNoData && formatNoData.fCalDueDate?.amDate}</div>
                                </div>
                            </div>
                            {/* const Footer = (data) => {
                                <tr className="footer">
                                    <td>
                                        <tr>
                                            <td style={{ fontWeight: "bold", textAlign: "left" }}>Remarks :</td>
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
                                        <div style={{ display: 'flex', flexDirection: 'row', height: '10px' }}>
                                            <div style={{ position: 'absolute', fontSize: '8px' }}>Format Number: {data.value.fCalDueDate.frNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment No.: {data.value.fCalDueDate.amNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment Date.: {data.value.fCalDueDate.amDate}</div>
                                        </div>
                                    </td>
                                </tr>
                                );
  }; */}

                        </tr>

                    </tbody>
                </table>
                {/* </Page>
                </Document>
            </PDFViewer> */}
            </div></div>

    )
}

export default HisCalPrint




