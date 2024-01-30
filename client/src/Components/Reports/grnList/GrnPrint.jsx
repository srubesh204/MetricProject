import React, { useContext, useEffect, useState, useRef } from 'react'
import { GrnListContent } from './GrnList';
import { Close } from '@mui/icons-material';
import dayjs from 'dayjs';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useReactToPrint } from 'react-to-print';


const GrnPrint = () => {

    const GrnPrintData = useContext(GrnListContent)
    const { grnPrintOpen, setGrnPrintOpen, selectedRows, formatNoData, printState, setPrintState,companyList ,plantList} = GrnPrintData

    const renderTableRows = () => {
        return  (
            <tr style={{ width: "100%" }}>
                <td style={{ width: "8%", padding: "15px 0px", textAlign: "center", borderRight: "0.5px solid black" }}>1</td>
                <td style={{ width: '52%', padding: '15px 8px', textAlign: 'center', borderRight: "0.5px solid black" }}>
                    <div>
                        <div style={{ textAlign: "left" }}>Item Name: {selectedRows.grnItemAddMasterName}, IMTE No: {selectedRows.grnItemIMTENo}</div>
                        <div style={{ textAlign: "left" }}>Range/Size: {selectedRows.grnItemRangeSize}</div>
                    </div>
                </td>
                <td style={{ width: "40%", padding: "15px 0px", textAlign: "center" }}>{selectedRows.grnItemStatus}</td>
            </tr>
        ); 
    };

    const Footer = (data) => {
        return (
            <tr className="footer">
                <td style={{ height: '80px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', border: "0.5px solid black" }}>
                        <div style={{ width: '70%', display: 'flex', flexDirection: 'column', paddingLeft: '5px', borderRight: "0.5px solid black" }}>
                            <div style={{ width: '100%', paddingBottom: '30px' }}>
                                Name and Signature of the person to whom the goods were delivered for Transporting with the status of the person signing.
                            </div>
                            <div style={{ width: '100%' }}>Date: {data.value.fGrn.date}</div>
                        </div>
                        <div style={{ borderLeft: '', paddingLeft: '5px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ margin: '5px', fontSize: 10, fontWeight: 600, padding: '0 130px 40px 0', width: '110%' }}>For  {companyList[0]?.companyName}</div>
                            <div style={{ fontSize: 9, textAlign: 'center', paddingLeft: '30px' }}>Authorized Signature</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', height: '10px' }}>
                        <div style={{ position: 'absolute', fontSize: '8px' }}>Format Number: {data.value.fGrn.frNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment No.: {data.value.fGrn.amNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment Date.: {data.value.fGrn.amDate}</div>
                    </div>
                </td>
            </tr>
        );
    };

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
                    border: ;
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

    useEffect(() => {
        if (printState) {
          console.log("Working");
          handlePrint();
        }
      }, [printState, handlePrint]);
      
      console.log(printState)

    return (
            <div style={{ display: 'none', width: "100%" }}>
                <div ref={componentRef}>
                    <div style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}>GRN</div>
                    <div style={{ border: "0.5px solid black", width: "100%", height: "95%" }}>
                        <h1 style={{ textAlign: "center", padding: "2px 0px 0px 0px", fontSize: "14px" }}>{companyList[0]?.companyName}</h1>
                        <div style={{ textAlign: "center", padding: "0px 0px 2px 0px", fontSize: "11px" }}>{plantList[0]?.plantName}</div>
                        <div style={{ textAlign: "center", padding: "0px 0px 2px 0px", fontSize: "11px" }}>{plantList[0]?.plantAddress}</div>
                        <div style={{ textAlign: "center", padding: "0px 0px 2px 0px", fontSize: "10px", borderBottom: "0.5px solid black" }}></div>
                        <div style={{ display: "flex", flexDirection: "row", padding: 0, borderBottom: "0.5px solid black" }}>
                            <div style={{ width: "60%", padding: "5px 0px 5px 5px", borderRight: "0.5px solid black", margin: 0 }}>
                                <div>To:</div>
                                <div>&nbsp;&nbsp;{selectedRows.grnPartyName}</div>
                                <div>&nbsp;&nbsp;&nbsp;{selectedRows.grnPartyAddress}</div>
                            </div>
                            <div style={{ width: "40%" }}>
                                <div style={{ width: "100%", padding: "5px 0px 5px 5px", margin: 0, borderBottom: "0.5px solid black" }}>
                                    <div >GRN No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {selectedRows.grnNo}</div>
                                    <div >GRN Date&nbsp;&nbsp;: {dayjs(selectedRows.grnDate).format('DD-MM-YYYY')}</div>
                                </div>
                                <div style={{ padding: "5px 0px 5px 5px" }}>
                                    <div >Party Dc No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {selectedRows.dcNo}</div>
                                    <div >Party Dc Date&nbsp;&nbsp;: {dayjs(selectedRows.dcDate).format('DD-MM-YYYY')}</div>

                                </div>
                            </div>


                        </div>
                        <table style={{ width: '100%' }}>
                            <thead style={{ borderBottom: "0.5px solid black" }}>
                                <tr>
                                    <th style={{ width: '8%', padding: '8px', textAlign: 'center', borderRight: "0.5px solid black" }}>Si No</th>
                                    <th style={{ width: '52%', padding: '8px', textAlign: 'center', borderRight: "0.5px solid black" }}>Item Description</th>
                                    <th style={{ width: '40%', padding: '8px', textAlign: 'center' }}>Remarks</th>
                                </tr>
                            </thead>

                            {renderTableRows()}
                            {Footer({ value: formatNoData })}
                        </table>
                    </div>
                </div></div>

    )
}

export default GrnPrint