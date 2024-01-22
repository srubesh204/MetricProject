import React, { useContext, useEffect, useState, useRef } from 'react'
import { HistoryCardContent } from './InsHistoryCard'
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
                        <td style={{ width: "9%", border: "0.5px solid black" }}>
                            {selectedRow[0]?.itemType === 'variable' ? row.calcalibrationData && row.calcalibrationData[0]?.calOBError : row.calcalibrationData && row.calcalibrationData[0]?.calMinPS + "/" + row.calcalibrationData && row.calcalibrationData[0]?.calMaxPS}
                        </td>
                        <td style={{ width: "9%", border: "0.5px solid black" }}>{selectedRow && selectedRow[0]?.itemCalibrationSource || '-'}</td>
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
                    <td style={{display : "flex" , flexDirection : "row", width : "20%", fontWeight: "bold"}}>Format No : &nbsp;&nbsp;&nbsp;{formatNoData?.fHistoryCard?.frNo || '-'} &nbsp;&nbsp;&nbsp;</td>
                    <td style={{fontWeight: "bold"}}>Rev No & Date :</td>
            </tr>
        )
    }


    console.log(selectedRow[0]?.itemType)


    return (


        
            <div style={{ display: 'none', width: "100%", height: "100%" }}>
                <div style={{width: "100%", height: "100%", border: "1px solid"}} ref={componentRef} >
                    
                        
                            <h3 style={{ padding: "10px", textAlign: "center" }}>METRIC</h3>
                            <h3 style={{ paddingBottom: "5px", textAlign: "center" }}>INSTRUMENTS/GAUGE HISTORY CARD</h3>
                        
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                        <tr style={{ width: "100" }}>
                            <td style={{ width: "30%", padding: "5px", border: "1px solid black", margin: 0 }}>
                                <tr style={{fontWeight: "bold"}}>Gauge Number :    &nbsp;&nbsp;&nbsp;{selectedRow[0]?.itemIMTENo || '-'}</tr>
                                <tr style={{fontWeight: "bold"}}>Gauge Serial No :    &nbsp;&nbsp;&nbsp;{selectedRow[0]?.itemMFRNo || '-'}</tr>
                                <tr style={{fontWeight: "bold"}}>Calibration Source :    &nbsp;&nbsp;&nbsp;{selectedRow[0]?.itemCalibrationSource || '-'}</tr>
                            </td>
                            <td style={{ width: "40%", padding: "5px", border: "1px solid black", margin: 0 }}>
                                <tr style={{fontWeight: "bold"}}>Instrument / Gauge Name :    &nbsp;&nbsp;&nbsp;{selectedRow[0]?.itemAddMasterName || '-'}</tr>
                                <tr style={{fontWeight: "bold"}}>Range / Size :    &nbsp;&nbsp;&nbsp;{selectedRow[0]?.itemRangeSize || '-'} {selectedRow[0]?.itemRangeSizeUnit}</tr>
                                <tr style={{fontWeight: "bold"}}>Frequency of Calibration :    &nbsp;&nbsp;&nbsp;{selectedRow[0]?.itemCalFreInMonths}</tr>
                                <tr style={{fontWeight: "bold"}}>Department :    &nbsp;&nbsp;&nbsp;{selectedRow[0]?.itemDepartment || '-'}</tr>
                            </td>
                            <td style={{ width: "30%", border: "1px solid black", padding: "0px"}}>
                                <h6 className='text-center m-0'>Permissible Size</h6>
                                <table style={{ width: "100%", margin: 0, borderCollapse: "collapse" }}>
                                   
                                    <tr>
                                        <td style={{ width: "33%", border: "1px solid black" ,fontWeight: "bold"}}>Parameter0</td>
                                        <td style={{ width: "33%", border: "1px solid black" ,fontWeight: "bold"}}>Min / Max0</td>
                                        <td style={{ width: "34%", border: "1px solid black" ,fontWeight: "bold"}}>Wear Limit0</td>
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
                        <table  style={{ width: "100%", borderCollapse: "collapse" }}>
                         <thead>
                            <tr style={{ textAlign: "center", fontSize: "9px" }}>
                                <td style={{ width: "5%", border: "1px solid black", margin: 0, fontWeight: "bold" }}>
                                    Sl No
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0, fontWeight: "bold" }}>
                                    Calibration Date
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0, fontWeight: "bold" }}>
                                    Calibration Status
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0, fontWeight: "bold" }}>
                                    Next Calibration
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0, fontWeight: "bold" }}>
                                    Certificate Status
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0, fontWeight: "bold" }}>
                                    Certificate No
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0, fontWeight: "bold" }}>
                                    {selectedRow[0]?.itemType === 'variable' ? 'Observed Error' : 'Observed Size'}
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0, fontWeight: "bold" }}>
                                    Calibration At
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0, fontWeight: "bold" }}>
                                    Calibrated By
                                </td>
                                <td style={{ width: "9%", border: "1px solid black", margin: 0, fontWeight: "bold" }}>
                                    Verified By
                                </td>
                                <td style={{ width: "14%", border: "1px solid black", margin: 0, fontWeight: "bold" }}>
                                    Remarks
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRows()}
                        </tbody>
                        </table>
                   
                    {Footer({ value: formatNoData })}





                </div>
                </div>
            // <Button onClick={handlePrint}>Print this out!</Button>





    )
}

export default HistoryCardPrint