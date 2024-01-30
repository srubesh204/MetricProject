import React, { useContext, useEffect, useRef } from 'react';
import { DcListContent } from './DcList';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';

const DcPrint = () => {
  const DcPrintData = useContext(DcListContent);
  const { dcPrintOpen, setDcPrintOpen, selectedRows, formatNoData, printState, setPrintState,companyList ,plantList} = DcPrintData;

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

  const renderTableRows = () => {
    return selectedRows.dcPartyItems.map((row, index) => (
      <tr key={index.toString()}>
        <td style={{ width: '8%', borderTop: '0.5px solid black', borderRight: '0.5px solid black', textAlign: 'center' }}>{index + 1}</td>
        <td style={{ borderTop: '0.5px solid black', borderRight: '0.5px solid black', display: 'flex', flexDirection: 'column' }}>
          <td>Item Name: {row.itemItemMasterName},    IMTE No: {row.itemIMTENo}</td>
          <td>Range/Size: {row.itemRangeSize + ' ' + row.itemRangeSizeUnit}, L.C.: {row.itemLC + ' ' + row.itemLCUnit}</td>
          <td>Make: {row.itemMake},    Sr.No: {row.itemMFRNo} ,Cal. Frequency: {row.itemCalFreInMonths} </td>
        </td>
        <td style={{ width: '30%', borderTop: '0.5px solid black', textAlign: 'center' }}>{row.dcItemRemarks}</td>
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
            <div style={{ borderLeft: '0.5px solid black', paddingLeft: '2px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ margin: '5px', fontSize: 9, fontWeight: 500, padding: '0 110px 40px 0', width: '110%' }}>For {companyList[0]?.companyName}</div>
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



 

  // Your conditional logic
 

  console.log(printState)

  return (
      <div style={{ display: 'none', width: "100%" }}>
        <div ref={componentRef}>
          <div style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}>Delivery Challan</div>
          <div style={{ border: '0.5px solid black' }}>
            <div style={{ textAlign: 'center', borderBottom: '0.5px solid black', display: 'flex', flexDirection: 'column' }}>
              <td style={{ padding: "2px", textAlign: "center" }}>{companyList[0]?.companyName}</td>
              {/* <td>{selectedRows.dcPartyAddress}</td> */}
              {/* <td>Phone and Address</td> */}
              <td style={{padding: "1px", textAlign: "center" }}>{plantList[0]?.plantName}</td>
                    <td style={{padding: "1px", textAlign: "center" }}>{plantList[0]?.plantAddress}</td>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '0.5px solid black' }}>
              <div style={{ width: '60%', display: 'flex', flexDirection: 'column', paddingLeft: '10px', borderRight: '0.5px solid black' }}>
                <td>To:</td>
                <td style={{ padding: '0px 30px' }}>{selectedRows.dcPartyName}</td>
                <td style={{ padding: '0px 30px' }}>{selectedRows.dcPartyAddress}</td>
              </div>
              <div style={{ width: '40%', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
                <td>DC No: {selectedRows.dcNo}</td>
                <td>DC Date: {dayjs(selectedRows.dcDate).format('DD-MM-YYYY')}</td>
                <td>Narration: {selectedRows.dcReason}</td>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ width: '8%', borderRight: '0.5px solid black', textAlign: 'center' }}>Si No</th>
                  <th style={{ width: '72%', borderRight: '0.5px solid black', textAlign: 'center' }}>Item Description</th>
                  <th style={{ width: '20%', textAlign: 'center' }}>Remarks</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
              <tfoot>{Footer({ value: formatNoData })}</tfoot>
            </table>
          </div>
        </div>
      </div>
  );
};

export default DcPrint;