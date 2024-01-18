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
        <td style={{ borderBottom: '0.5px solid black', padding: '15px 8px', display: 'flex', flexDirection: 'column' }}>
          <td>Item Name: {row.itemItemMasterName},    IMTE No: {row.itemIMTENo}</td>
          <td>Range/Size: {row.itemRangeSize + ' ' + row.itemRangeSizeUnit},    L.C.: {row.itemLC + ' ' + row.itemLCUnit}</td>
          <td>Make: {row.itemMake},    Sr.No: {row.itemMFRNo}</td>
          <td>Cal. Frequency: {row.itemCalFreInMonths}</td>
        </td>
        <td style={{ width: '30%', border: '0.5px solid black', padding: '15px 8px', textAlign: 'center' }}>{row.dcItemRemarks}</td>
      </tr>
    ));
  };

  const Footer = (data) => {
    return (
      <tr className="footer">
        <td style={{ height: '80px', fontSize: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', border: '0.5px solid black' }}>
            <div style={{ width: '70%', display: 'flex', flexDirection: 'column', paddingLeft: '5px' }}>
              <div style={{ width: '100%', paddingBottom: '30px' }}>
                Name and Signature of the person to whom the goods were delivered for Transporting with the status of the person signing.
              </div>
              <div style={{ width: '100%' }}>Date: {data.value.fDc.date}</div>
            </div>
            <div style={{ borderLeft: '0.5px solid black', paddingLeft: '5px', display: 'flex', flexDirection: 'column'}}>
              <div style={{ margin: '5px', fontSize: 10, fontWeight: 600, padding: '0 130px 40px 0', width: '100%' }}>For {selectedRows.dcPartyName}</div>
              <div style={{ fontSize: 9, textAlign: 'center' }}>Authorized Signature</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', height: '10px' }}>
            <div style={{ position: 'absolute', fontSize: '8px' }}>Format Number: {data.value.fDc.frNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment No.: {data.value.fDc.amNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment Date.: {data.value.fDc.amDate}</div>
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
      <DialogContent style={{ display: 'none', width: "100%" }}>
        <div ref={componentRef}>
          <div style={{ textAlign: 'center', border: '0.5px solid black', display: 'flex', flexDirection: 'column' }}>
            <h3>{selectedRows.dcPartyName}</h3>
            <td>{selectedRows.dcPartyAddress}</td>
            <td>Phone and Address</td>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '60%', border: '0.5px solid black', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
              <td>To:</td>
              <td style={{ padding: '0px 30px' }}>{selectedRows.dcPartyAddress}</td>
            </div>
            <div style={{ width: '40%', border: '0.5px solid black', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
              <td>DC No: {selectedRows.dcNo}</td>
              <td>DC Date: {dayjs(selectedRows.dcDate).format('DD-MM-YYYY')}</td>
              <td>Narration: {selectedRows.dcReason}</td>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ width: '8%', border: '0.5px solid black', padding: '8px', textAlign: 'center' }}>Si No</th>
                <th style={{ width: '52%', border: '0.5px solid black', padding: '8px', textAlign: 'center' }}>Item Description</th>
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