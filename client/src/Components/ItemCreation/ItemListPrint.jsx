import React, { useContext, useRef } from 'react';
import { ItemListContent } from './ItemList';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';
const ItemListPrint = () => {
    const itemListPrintData = useContext(ItemListContent);
    const { filteredItemListData, printState, setPrintState, formatNoData } = itemListPrintData;


    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: `
          @page {
            size: landscape;
            margin: 1cm;
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
          
    @media print {
      .print-page-break {
          page-break-before: always;
      }
  }
          .footer {
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 10px; /* Set the height based on your footer height */
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
    console.log(formatNoData)

    const renderTableRows = () => {
        return filteredItemListData.map((row, index) => (
            <tr key={index.toString()} className={index % 25 === 0 ? "print-page-break" : ""}>
                <td style={{ width: '5%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ width: '10%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>{row.itemIMTENo}</td>
                <td style={{ width: '13%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}> {row.itemAddMasterName}</td>
                <td style={{ width: '5%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}> {row.itemRangeSize !== '' ? row.itemRangeSize + ' ' + row.itemRangeSizeUnit : '-'}</td>
                <td style={{ width: '7%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>
                    {row.itemLC !== undefined ? `${row.itemLC} ${row.itemLCUnit}` : '-'}
                </td>
                <td style={{ width: '5%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}> {row.itemMake || '-'}</td>
                <td style={{ width: '6%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>{dayjs(row.itemCalDate).format('DD-MM-YYYY')} </td>
                <td style={{ width: '6%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>{dayjs(row.itemDueDate).format('DD-MM-YYYY')} </td>
                <td style={{ width: '7%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}> {row.itemCalFreInMonths !== '' ? row.itemCalFreInMonths + ' ' + row.itemCalFrequencyType : '-'}</td>
                <td style={{ width: '10%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>{row.itemDepartment || '-'}</td>
                <td style={{ width: '18%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}> {row.itemCalibrationSource === 'outsource' ? (row.itemCalibratedAt ? row.itemCalibratedAt : 'outsource') : row.itemCalibrationSource || '-'}</td>
            </tr>
        ));
    };

    const Footer = (data) => {
        return (
          <tr className="footer">
                <div style={{ position: 'absolute', fontSize: '8px' }}>Format Number: {formatNoData && formatNoData.fTotalList?.frNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment No.: {formatNoData && formatNoData.fTotalList?.amNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment Date.: {formatNoData && formatNoData.fTotalList?.amDate}</div>
          </tr>
        );
      };

    return (
        < React.Fragment>
        {filteredItemListData.length > 0 && (
            <div style={{ display: 'none', width: "100%" }}>
            <div ref={componentRef}>
            <h3 style={{ paddingBottom: "5px", textAlign: "center" }}>Item List</h3>
                <table className='table table-sm table-bordered text-center align-middle table-responsive w-100' style={{border: "1px solid black"}}>
                    <thead>
                        <tr>
                            <th style={{ width: '5%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>Si. No</th>
                            <th style={{ width: '9%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>IMTE No</th>
                            <th style={{ width: '10%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>Description</th>
                            <th style={{ width: '13%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>Range/Size</th>
                            <th style={{ width: '7%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>ItemLC</th>
                            <th style={{ width: '5%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>Make</th>
                            <th style={{ width: '7%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>Cal Date</th>
                            <th style={{ width: '7%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>Due Date</th>
                            <th style={{ width: '5%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>Frequency</th>
                            <th style={{ width: '8%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>Current location</th>
                            <th style={{ width: '18%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>Callbration Source</th>
                        </tr>
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                </table>
            <tfoot>{Footer()}</tfoot>
            </div>
            </div>
        )}
        {/* <Button onClick={handlePrint}>Print this out!</Button> */}
    </React.Fragment>
    )
}

export default ItemListPrint