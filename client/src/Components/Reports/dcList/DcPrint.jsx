import React, { useContext, useRef } from 'react';
import { DcListContent } from './DcList';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';

const DcPrint = () => {
    const DcPrintData = useContext(DcListContent);
    const { dcPrintOpen, setDcPrintOpen, selectedRows, formatNoData, printState, setPrintState } = DcPrintData;

    const renderTableRows = () => {
        return selectedRows.dcPartyItems.map((row, index) => (
            <tr key={index.toString()}>
                <td style={{ width: '8%', border: '0.5px solid black', padding: '15px 0px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ width: '42%', border: '0.5px solid black', padding: '15px 8px' }}>
                    <p>Item Name: {row.itemItemMasterName},    IMTE No: {row.itemIMTENo},</p>
                    <p>Range/Size: {row.itemRangeSize + ' ' + row.itemRangeSizeUnit},    L.C.: {row.itemLC + ' ' + row.itemLCUnit}</p>
                    <p>Make: {row.itemMake},    Sr.No: {row.itemMFRNo}</p>
                    <p>Cal. Frequency: {row.itemCalFreInMonths}</p>
                </td>
                <td style={{ width: '40%', border: '0.5px solid black', padding: '15px 8px', textAlign: 'center' }}>{row.dcItemRemarks}</td>
            </tr>
        ));
    };

    const Footer = (data) => {
        return (
            <tr className="footer">
                {/* <td colSpan="3" style={{ height: '80px', fontSize: '12px', border: '1px solid black' }}> */}
                <div style={{ display: 'flex', flexDirection: 'row', border: '0.5px solid black' }}>
                    <div style={{ width: '70%', borderRight: '1px solid black' }}>
                        <div style={{ width: '70%' }}>Name and Signature of the person to whom the goods were delivered for Transporting with the status of the person signing.</div>
                        <div>Date: {data.value.fDc.date}</div>
                    </div>
                    <div>
                        <div style={{ margin: '5px', fontSize: 10, fontWeight: 600 }}>For {selectedRows.dcPartyName}</div>
                        <div style={{ fontSize: 9 }}>Authorized Signature</div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', height: '10px' }}>
                    <div style={{ position: 'absolute' }}>Format Number: {data.value.fDc.frNo}</div>
                    <div style={{ position: 'absolute' }}>Amendment No.: {data.value.fDc.amNo}</div>
                    <div style={{ position: 'absolute' }}>Amendment Date.: {data.value.fDc.amDate}</div>
                </div>
                {/* </td> */}
            </tr>
        );
    };

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: `
      @page {
        size: landscape;
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
        text-align: center;
      }
      .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px; /* Set the height based on your footer height */
        font-size: 8px;
        border: 1px solid black;
        page-break-after: always;
        z-index: 9;
      }
      @page :last {
        .footer {
          position: fixed;
          page-break-after: always;
        }
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
        <Dialog
            keepMounted
            fullScreen
            open={dcPrintOpen}
            onClose={(e, reason) => {
                console.log(reason);
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setDcPrintOpen(false);
                }
            }}
        >
            <DialogTitle align='center' sx={{ backgroundColor: '#323639', color: 'white', height: '40px' }}>DC Print Preview</DialogTitle>
            <IconButton
                aria-label='close'
                onClick={() => setDcPrintOpen(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'white',
                }}
            >
                <Close />
            </IconButton>
            <DialogContent>
                <div ref={componentRef}>
                    <div style={{ textAlign: 'center', border: '0.5px solid black' }}>
                        <h1>{selectedRows.dcPartyName}</h1>
                        <p>{selectedRows.dcPartyAddress}</p>
                        <p>Phone and Address</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '73%', paddingRight: '5px', border: '0.5px solid black' }}>
                            <p>To:</p>
                            <p>{selectedRows.dcPartyAddress}</p>
                        </div>
                        <div style={{ width: '27%', paddingLeft: '5px', border: '0.5px solid black' }}>
                            <p>DC No: {selectedRows.dcNo}</p>
                            <p>DC Date: {dayjs(selectedRows.dcDate).format('DD-MM-YYYY')}</p>
                            <p>Narration: {selectedRows.dcReason}</p>
                        </div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '8%', border: '0.5px solid black', padding: '8px 0px', textAlign: 'center' }}>Si No</th>
                                <th style={{ width: '42%', border: '0.5px solid black', padding: '8px', textAlign: 'center' }}>Item Description</th>
                                <th style={{ width: '40%', border: '0.5px solid black', padding: '8px', textAlign: 'center' }}>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>{renderTableRows()}</tbody>
                        <tfoot>{Footer({ value: formatNoData })}</tfoot>
                    </table>
                </div>
            </DialogContent>
            <Button onClick={handlePrint}>Print this out!</Button>
        </Dialog>
    );
};

export default DcPrint;
