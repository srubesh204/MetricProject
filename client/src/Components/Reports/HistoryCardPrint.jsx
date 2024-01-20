import React, { useContext, useEffect, useState, useRef } from 'react'
import { HistoryCardContent } from './InsHistoryCard'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import dayjs from 'dayjs';



const HistoryCardPrint = () => {

    const { selectedInstrumentName, selectedIMTENo, selectedRow } = useContext(HistoryCardContent)

    const historyCardPrintData = useContext(HistoryCardContent)
    const { historyCardPrintOpen, setHistoryCardPrintOpen, selectedRows, formatNoData, selectedIMTEs, printState, setPrintState } = historyCardPrintData

    const selectedRowsArray = Array.isArray(selectedRows) ? selectedRows : [selectedRows];

    useEffect(() => {
        console.log('Format No Data:', formatNoData.fHistoryCard?.frNo);
    }, [formatNoData]);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: `
                @page {
                    size: landscape;
                }
                body {
                    margin: "5px";
                    height: "100%";
                    border: "1px solid black";
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    font-size: 12px;
                }
                .footer {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 30px; /* Set the height based on your footer height */
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

    const renderTableRows = () => {
        if (!selectedIMTEs || selectedIMTEs.length === 0) {
            // Handle the case where selectedIMTEs is undefined or empty
            return (
                <td>
                    <td>No data available</td>
                </td>
            );
        }
        return selectedIMTEs.map((row, index) => {
            console.log(selectedIMTEs)
            return (
                
                    <tr key={index} style={{ textAlign: "center", borderCollapse: "collapse", fontSize: "9px" }}>
                        <td style={{ width: "5%", border: "0.5px solid black" }}>{index + 1}</td>
                        <td style={{ width: "9%", border: "0.5px solid black" }}>{row.calItemCalDate || '-'}</td>
                        <td style={{ width: "9%", border: "0.5px solid black" }}>{row.calStatus || '-'}</td>
                        <td style={{ width: "9%", border: "0.5px solid black" }}>{row.calItemDueDate || '-'}</td>
                        <td style={{ width: "9%", border: "0.5px solid black" }}>--</td>
                        <td style={{ width: "9%", border: "0.5px solid black" }}>{row.calCertificateNo || '-'}</td>
                        {/* <td style={{ width: "9%", border: "0.5px solid black" }}>
                            {selectedRow[0]?.itemType === 'variable' ? row.calcalibrationData[0]?.calOBError : row.calcalibrationData[0]?.calMinPS + "/" + row.calcalibrationData[0]?.calMaxPS}
                        </td>
                        <td style={{ width: "9%", border: "0.5px solid black" }}>{selectedRow[0]?.itemCalibrationSource || '-'}</td> */}
                        <td style={{ width: "9%", border: "0.5px solid black" }}>{row.calCalibratedBy || '-'}</td>
                        <td style={{ width: "9%", border: "0.5px solid black" }}>{row.calApprovedBy || '-'}</td>
                        <td style={{ width: "14%", border: "0.5px solid black" }}>--</td>
                    </tr>
                
            )
        });
    };

    const Footer = (data) => {
        return (
            <tr className='footer' style={{display : "flex" , flexDirection : "row", fontSize : "6px"}}>
                    <td style={{display : "flex" , flexDirection : "row", width : "20%"}}><th>Format No : &nbsp;&nbsp;&nbsp;</th>{formatNoData?.fHistoryCard?.frNo || '-'} &nbsp;&nbsp;&nbsp;</td>
                    <td><th>Rev No & Date :</th></td>
            </tr>
        )
    }


    console.log(selectedRow[0]?.itemType)


    return (


        
            <DialogContent style={{ display: 'block', width: "100%", height: "100%" }}>
                <div style={{width: "100%", height: "100%", border: "1px solid"}} ref={componentRef} >
                    
                        
                            <h3 style={{ padding: "10px", textAlign: "center" }}>METRIC</h3>
                            <h3 style={{ paddingBottom: "5px", textAlign: "center" }}>INSTRUMENTS/GAUGE HISTORY CARD</h3>
                        
                    <table style={{ width: "100%" }}>
                    <tbody>
                        <tr style={{ width: "100" }}>
                            <td style={{ width: "30%", padding: "5px", border: "1px solid black", margin: 0 }}>
                                <tr><th>Gauge Number :    &nbsp;&nbsp;&nbsp;</th>{selectedRow[0]?.itemIMTENo || '-'}</tr>
                                <tr><th>Gauge Serial No :    &nbsp;&nbsp;&nbsp;</th>{selectedRow[0]?.itemMFRNo || '-'}</tr>
                                <tr><th>Calibration Source :    &nbsp;&nbsp;&nbsp;</th>{selectedRow[0]?.itemCalibrationSource || '-'}</tr>
                            </td>
                            <td style={{ width: "40%", padding: "5px", border: "1px solid black", margin: 0 }}>
                                <tr><th>Instrument / Gauge Name :    &nbsp;&nbsp;&nbsp;</th>{selectedRow[0]?.itemAddMasterName || '-'}</tr>
                                <tr><th>Range / Size :    &nbsp;&nbsp;&nbsp;</th>{selectedRow[0]?.itemRangeSize || '-'} {selectedRow[0]?.itemRangeSizeUnit}</tr>
                                <tr><th>Frequency of Calibration :    &nbsp;&nbsp;&nbsp;</th>{selectedRow[0]?.itemCalFreInMonths}</tr>
                                <tr><th>Department :    &nbsp;&nbsp;&nbsp;</th>{selectedRow[0]?.itemDepartment || '-'}</tr>
                            </td>
                            <td style={{ width: "30%", border: "1px solid black", padding: "0px"}}>
                                <h6 className='text-center m-0'>Permissible Size</h6>
                                <table style={{ width: "100%", margin: 0, borderCollapse: "collapse" }}>
                                   
                                    <tr>
                                        <td style={{ width: "33%", border: "1px solid black" }}><th>Parameter</th></td>
                                        <td style={{ width: "33%", border: "1px solid black" }}><th>Min / Max</th></td>
                                        <td style={{ width: "34%", border: "1px solid black" }}><th>Wear Limit</th></td>
                                    </tr>
                                    {selectedRow.length > 0 &&
                                        selectedRow[0].acceptanceCriteria.map((item, index) => (
                                            <tr key={index}>
                                                <td style={{ width: "33%", border: "1px solid black" }}>{item.acParameter || '-'}</td>
                                                <td style={{ width: "33%", border: "1px solid black" }}>{item.acMinPS || '-'}/{item.acMaxPS || '-'}</td>
                                                <td style={{ width: "34%", border: "1px solid black" }}>{item.acWearLimitPS || '-'}</td>
                                            </tr>
                                        ))}
                                </table>
                            </td>

                        </tr>
                        </tbody>
                        </table>
                        <table  style={{ width: "100%" }}>
                         <thead>
                            <tr style={{ textAlign: "center", fontSize: "9px" }}>
                                <td style={{ width: "5%", border: "1px solid black", margin: 0 }}>
                                    <th>Sl No</th>
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0 }}>
                                    <th>Calibration Date</th>
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0 }}>
                                    <th>Calibration Status</th>
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0 }}>
                                    <th>Next Calibration</th>
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0 }}>
                                    <th>Certificate Status</th>
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0 }}>
                                    <th>Certificate No</th>
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0 }}>
                                    <th>{selectedRow[0]?.itemType === 'variable' ? 'Observed Error' : 'Observed Size'}</th>
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0 }}>
                                    <th>Calibration At</th>
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0 }}>
                                    <th>Calibrated By</th>
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0 }}>
                                    <th>Verified By</th>
                                </td>
                                <td style={{ width: "14%", border: "1px solid black", margin: 0 }}>
                                    <th>Remarks</th>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRows()}
                        </tbody>
                        </table>
                   
                    {Footer({ value: formatNoData })}





                </div></DialogContent>
            // <Button onClick={handlePrint}>Print this out!</Button>





    )
}

export default HistoryCardPrint