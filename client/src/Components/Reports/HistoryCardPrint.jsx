import React, { useContext, useEffect, useState, useRef } from 'react'
import { HistoryCardContent } from './InsHistoryCard'
import { useReactToPrint } from 'react-to-print';
import dayjs from 'dayjs';



const HistoryCardPrint = () => {

    const { selectedInstrumentName, selectedIMTENo, selectedRow } = useContext(HistoryCardContent)

    const historyCardPrintData = useContext(HistoryCardContent)
    const { historyCardPrintOpen, setHistoryCardPrintOpen, selectedRows, formatNoData, selectedIMTEs, printState, setPrintState, companyList, plantList, approvedByList } = historyCardPrintData

    useEffect(() => {
        console.log('Format No Data:', formatNoData.fHistoryCard?.frNo);
    }, [formatNoData]);

    console.log(companyList)

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
                    border: "0.5px solid black";
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
            const adminName = approvedByList.filter(emp => emp._id === row.itemCalApprovedBy)
            console.log(adminName)
            return (

                <tr key={index} style={{ textAlign: "center", borderCollapse: "collapse", fontSize: "9px" }}>
                    <td style={{ width: "5%", borderRight: "0.5px solid black", borderTop: "0.5px solid black" }}>{index + 1}</td>
                    <td style={{ width: "9%", borderRight: "0.5px solid black", borderTop: "0.5px solid black" }}>{dayjs(row.itemCalDate).format("DD-MM-YYYY") || '-'}</td>
                    <td style={{ width: "9%", borderRight: "0.5px solid black", borderTop: "0.5px solid black" }}>{row.itemCalStatus || '-'}</td>
                    <td style={{ width: "9%", borderRight: "0.5px solid black", borderTop: "0.5px solid black" }}>{dayjs(row.itemDueDate).format("DD-MM-YYYY") || '-'}</td>
                    {/* <td style={{ width: "9%", borderRight: "0.5px solid black", borderTop: "0.5px solid black" }}>--</td> */}
                    <td style={{ width: "9%", borderRight: "0.5px solid black", borderTop: "0.5px solid black" }}>{row.itemCertificateNo || '-'}</td>
                    <td style={{ width: "9%", borderRight: "0.5px solid black", borderTop: "0.5px solid black" }}>
                        {row.acceptanceCriteria.map(acc => <React.Fragment key={index}>
                            {acc}
                            {index !== row.acceptanceCriteria.length - 1 && <br />} {/* Add <br /> after each item except the last one */}
                        </React.Fragment>)}
                    </td>
                    <td style={{ width: "9%", borderRight: "0.5px solid black", borderTop: "0.5px solid black" }}>{row.itemCalibratedAt || '-'}</td>
                    {selectedRow.itemCalibrationSource !== "outsource" && selectedRow.itemCalibrationSource !== "" && (
                        <td style={{ width: "9%", borderRight: "0.5px solid black", borderTop: "0.5px solid black" }}>
                            {row.itemCalibratedBy ? row.itemCalibratedBy : '-'}
                        </td>
                    )}
                    {selectedRow.itemCalibrationSource !== "outsource" && selectedRow.itemCalibrationSource !== "" && (
                        <td style={{ width: "9%", borderRight: "0.5px solid black", borderTop: "0.5px solid black" }}>
                            {adminName.length > 0 ? adminName[0].firstName + " " + adminName[0].lastName : ""}
                        </td>
                    )}
                </tr>
            )
        });
    };
    const Footer = (data) => {
        return (
            <tr className="footer">
                <td style={{ height: '80px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', height: '10px' }}>
                        <div style={{ position: 'absolute', fontSize: '8px' }}>Format Number: {formatNoData && formatNoData.fHistoryCard?.frNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Rev. No.: {formatNoData && formatNoData.fHistoryCard?.amNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Rev. Date.: {formatNoData && formatNoData.fHistoryCard?.amDate}</div>
                    </div>
                </td>
            </tr>
        );
    };
    console.log(selectedRow?.itemType)
    return (
        <div style={{ display: 'none', width: "100%", height: "100%" }}>
            <div style={{ width: "100%", height: "100%" }} ref={componentRef} >
                <div style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}>INSTRUMENTS/GAUGE HISTORY CARD</div>
                <div className='d-flex justify-content-between'>

                    <div style={{ textAlign: 'left', borderBottom: '0.5px solid black', display: 'flex', flexDirection: 'column' }}>
                        <td style={{ padding: "2px", textAlign: "left" }}>{companyList?.companyName}</td>
                        {/* <td>{selectedRows.dcPartyAddress}</td> */}
                        <td style={{ padding: "2px", textAlign: "left" }}>{plantList[0]?.plantName}</td>
                        <td style={{ padding: "2px", textAlign: "left" }}>{plantList[0]?.plantAddress}</td>
                    </div>
                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                        <td style={{ padding: "2px", textAlign: "right" }}><img src={`${process.env.REACT_APP_PORT}/logo/${companyList?.companyLogo}`} width="70px" height="70px" /></td>
                    </div>
                </div>

                <div style={{ border: "1px solid black" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                            <tr style={{ width: "100", fontSize: "12px" }}>
                                <td style={{ width: "30%", padding: "5px", margin: 0, borderRight: "0.5px solid black" }}>
                                    <tr style={{ fontWeight: "" }}>Gauge Number :    &nbsp;&nbsp;&nbsp;{selectedRow?.itemIMTENo || '-'}</tr>
                                    <tr style={{ fontWeight: "" }}>Gauge Serial No :    &nbsp;&nbsp;&nbsp;{selectedRow?.itemMFRNo || '-'}</tr>
                                    <tr style={{ fontWeight: "" }}>Calibration Source :    &nbsp;&nbsp;&nbsp;{selectedRow?.itemCalibrationSource || '-'}</tr>
                                </td>
                                <td style={{ width: "40%", padding: "5px", margin: 0, borderRight: "0.5px solid black" }}>
                                    <tr style={{ fontWeight: "" }}>Instrument / Gauge Name :    &nbsp;&nbsp;&nbsp;{selectedRow?.itemAddMasterName || '-'}</tr>
                                    <tr style={{ fontWeight: "" }}>Range / Size :    &nbsp;&nbsp;&nbsp;{selectedRow?.itemRangeSize || '-'} {selectedRow?.itemRangeSizeUnit}, {selectedRow?.itemType === "variable" && (<span>LeastCount: &nbsp;{selectedRow?.itemLC || "-"} {selectedRow?.itemLCUnit}</span>)}</tr>
                                    <tr style={{ fontWeight: "" }}>Frequency of Calibration :    &nbsp;&nbsp;&nbsp; {selectedRow?.itemCalFreInMonths || '-'} {selectedRow?.itemCalFrequencyType}  </tr>
                                    {/* <tr style={{ fontWeight: "bold" }}>Department :    &nbsp;&nbsp;&nbsp;{selectedRow?.itemDepartment || '-'}</tr> */}
                                </td>
                                <td style={{ width: "30%", padding: "0px", textAlign: "center" }}>
                                    {selectedRow && selectedRow.itemType === "variable" && <td colSpan="2" style={{ fontWeight: "bold", fontSize: "12px", paddingLeft: "7rem" }}>Permissible Error ({selectedRow && selectedRow.acceptanceCriteria && selectedRow.acceptanceCriteria.length > 0 && selectedRow.acceptanceCriteria[0].acNominalSizeUnit})</td>}
                                    {selectedRow && selectedRow.itemType === "attribute" && <td style={{ fontWeight: "bold", fontSize: "12px", textAlign: "center", paddingLeft: "7rem" }}>Permissible Size ({selectedRow && selectedRow.acceptanceCriteria && selectedRow.acceptanceCriteria.length > 0 && selectedRow.acceptanceCriteria[0].acNominalSizeUnit})</td>}
                                    {selectedRow && selectedRow.itemType === "referenceStandard" && <td style={{ fontWeight: "bold", fontSize: "12px", textAlign: "center", paddingLeft: "7rem" }}>Permissible Size ({selectedRow && selectedRow.acceptanceCriteria && selectedRow.acceptanceCriteria.length > 0 && selectedRow.acceptanceCriteria[0].acNominalSizeUnit})</td>}

                                    {selectedRow && selectedRow.itemType === "attribute" && <table style={{ width: "100%", margin: 0, borderCollapse: "collapse" }}>

                                        <tr style={{ borderTop: "0.5px solid black" }}>
                                            <td style={{ width: "33%", borderRight: "0.5px solid black", fontWeight: "bold" }}>Parameter</td>
                                            <td style={{ width: "33%", borderRight: "0.5px solid black", fontWeight: "bold" }}>Min / Max</td>
                                            <td style={{ width: "34%", fontWeight: "bold" }}>Wear Limit</td>
                                        </tr>
                                        {selectedRow &&
                                            selectedRow.acceptanceCriteria.map((item, index) => (
                                                <tr key={index} style={{ borderTop: "0.5px solid black" }}>
                                                    <td style={{ width: "33%", borderRight: "0.5px solid black" }}>{item.acParameter || '-'}</td>
                                                    <td style={{ width: "33%", borderRight: "0.5px solid black" }}>{item.acMinPS || '-'}/{item.acMaxPS || '-'}</td>
                                                    <td style={{ width: "34%" }}>{item.acWearLimitPS || '-'}</td>
                                                </tr>
                                            ))}
                                    </table>}
                                    {selectedRow && selectedRow.itemType === "variable" && <table style={{ width: "100%", margin: 0, borderCollapse: "collapse" }}>

                                        <tr style={{ borderTop: "0.5px solid black" }}>
                                            <td style={{ width: "33%", borderRight: "0.5px solid black", fontWeight: "bold" }}>Parameter</td>
                                            <td style={{ width: "33%", borderRight: "0.5px solid black", fontWeight: "bold" }}>Min / Max </td>
                                            {/* <td style={{ width: "34%", fontWeight: "bold" }}>Wear Limit</td> */}
                                        </tr>
                                        {selectedRow &&
                                            selectedRow.acceptanceCriteria.map((item, index) => (
                                                <tr key={index} style={{ borderTop: "0.5px solid black" }}>
                                                    <td style={{ width: "33%", borderRight: "0.5px solid black" }}>{item.acParameter || '-'}</td>
                                                    <td style={{ width: "33%", borderRight: "0.5px solid black" }}>{item.acMinPSError || '-'}/{item.acMaxPSError || '-'}</td>
                                                    {/* <td style={{ width: "34%" }}>{item.acWearLimitPS || '-'}</td> */}
                                                </tr>
                                            ))}
                                    </table>}
                                    {selectedRow && selectedRow.itemType === "referenceStandard" && <table style={{ width: "100%", margin: 0, borderCollapse: "collapse" }}>

                                        <tr style={{ borderTop: "0.5px solid black" }}>
                                            <td style={{ width: "33%", borderRight: "0.5px solid black", fontWeight: "bold" }}>Parameter</td>
                                            <td style={{ width: "33%", borderRight: "0.5px solid black", fontWeight: "bold" }}>Min / Max</td>
                                            {/* <td style={{ width: "34%", fontWeight: "bold" }}>Wear Limit</td> */}
                                        </tr>
                                        {selectedRow &&
                                            selectedRow.acceptanceCriteria.map((item, index) => (
                                                <tr key={index} style={{ borderTop: "0.5px solid black" }}>
                                                    <td style={{ width: "33%", borderRight: "0.5px solid black" }}>{item.acParameter || '-'}</td>
                                                    <td style={{ width: "33%", borderRight: "0.5px solid black" }}>{item.acMinPS || '-'}/{item.acMaxPS || '-'}</td>
                                                    {/* <td style={{ width: "34%" }}>{item.acWearLimitPS || '-'}</td> */}
                                                </tr>
                                            ))}
                                    </table>}



                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table style={{ width: "100%", borderCollapse: "collapse", borderTop: "0.5px solid black", margin: 0 }}>
                        <thead>
                            <tr style={{ textAlign: "center", fontSize: "9px" }}>
                                <td style={{ width: "5%", borderRight: "0.5px solid black", margin: 0, fontWeight: "bold" }}>
                                    Sl No
                                </td>
                                <td style={{ width: "9%", borderRight: "0.5px solid black", margin: 0, fontWeight: "bold" }}>
                                    Calibration Date
                                </td>
                                <td style={{ width: "9%", borderRight: "0.5px solid black", margin: 0, fontWeight: "bold" }}>
                                    Calibration Status
                                </td>
                                <td style={{ width: "9%", borderRight: "0.5px solid black", margin: 0, fontWeight: "bold" }}>
                                    Next Calibration
                                </td>
                                {/* <td style={{ width: "9%", borderRight: "0.5px solid black", margin: 0, fontWeight: "bold" }}>
                                    Certificate Status
                                </td> */}
                                <td style={{ width: "9%", borderRight: "0.5px solid black", margin: 0, fontWeight: "bold" }}>
                                    Certificate No
                                </td>
                                <td style={{ width: "9%", borderRight: "0.5px solid black", margin: 0, fontWeight: "bold" }}>
                                    {selectedRow?.itemType === 'variable' ? 'Observed Error' : 'Observed Size'}
                                </td>
                                <td style={{ width: "9%", borderRight: "0.5px solid black", margin: 0, fontWeight: "bold" }}>
                                    Calibration At
                                </td>

                                {selectedRow?.itemCalibrationSource !== "outsource" && selectedRow?.itemCalibrationSource !== "" && (
                                    <td style={{ width: "9%", borderRight: "0.5px solid black", margin: 0, fontWeight: "bold" }}>
                                        Calibrated By
                                    </td>
                                )}

                                {selectedRow?.itemCalibrationSource !== "outsource" && selectedRow?.itemCalibrationSource !== "" && (
                                    <td style={{ width: "9%", borderRight: "0.5px solid black", margin: 0, fontWeight: "bold" }}>
                                        Approved By
                                    </td>
                                )}

                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRows()}
                        </tbody>
                    </table>

                    {Footer({ value: formatNoData })}





                </div>
            </div>
        </div>
        // <Button onClick={handlePrint}>Print this out!</Button>





    )
}

export default HistoryCardPrint