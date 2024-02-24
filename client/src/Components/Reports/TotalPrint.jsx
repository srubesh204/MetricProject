import React, { useContext, useRef, useEffect } from 'react';
import { TotalListContent } from './TotalList';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';
const TotalPrint = () => {

    const totalPrintData = useContext(TotalListContent)
    const { totalPrintOpen, setTotalPrintOpen, filteredItemListData, formatNoData, itemList, partDataList, companyList, plantList } = totalPrintData
    const componentRef = useRef();

    useEffect(() => {
        console.log('Format No Data:', formatNoData.fTotalList?.frNo);
    }, [formatNoData]);

    console.log(formatNoData)
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
        onAfterPrint: () => setTotalPrintOpen(false)
    });

    // Your conditional logic
    if (totalPrintOpen) {
        // Call the handlePrint function when needed
        handlePrint();
    }
    console.log(companyList)
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
                <td style={{ width: '7%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>{row.itemCalFreInMonths !== '' ? row.itemCalFreInMonths + ' ' + row.itemCalFrequencyType : '-'}   </td>
                <td style={{ width: '10%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>{row.itemDepartment || '-'}</td>
                <td style={{ width: '18%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}> {row.itemCalibrationSource === 'outsource' ? (row.itemCalibratedAt ? row.itemCalibratedAt : 'outsource') : row.itemCalibrationSource || '-'}</td>
                <td style={{ width: '10%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>{row.itemPartName || '-'}</td>

            </tr>
        ));
    };

    const Footer = (data) => {
        return (
            <tr className="footer">
                {/* <div style={{ position: 'absolute', fontSize: '8px' }}>Format Number: {formatNoData && formatNoData.fTotalList?.frNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment No.: {formatNoData && formatNoData.fTotalList?.amNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment Date.: {formatNoData && formatNoData.fTotalList?.amDate}</div> */}
                <div style={{ position: 'absolute', fontSize: '8px' }}>Format Number: {formatNoData && formatNoData.fTotalList?.frNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Rev. No.: {formatNoData && formatNoData.fTotalList?.amNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Rev. Date.: {formatNoData && formatNoData.fTotalList?.amDate}</div>
            </tr>
        );
    };

    return (
        < React.Fragment>
            {filteredItemListData.length > 0 && (
                <div style={{ display: 'none', width: "100%" }}>
                    <div ref={componentRef}>
                        <div style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}> Master List of Gauges / Instruments List</div>
                        {/* <div style={{ border: '0.5px solid black' }}> */}
                        <div style={{ textAlign: 'center', borderBottom: '0.5px solid black', display: 'flex', flexDirection: 'column' }}>
                            <td style={{ padding: "0px", textAlign: "right" }}><img src={`${process.env.REACT_APP_PORT}/logo/${companyList[0].companyLogo}`} width="90px" height="90px" /></td>
                            <td style={{ padding: "0px", textAlign: "left" }}>{companyList[0]?.companyName}</td>
                            {/* <td>{selectedRows.dcPartyAddress}</td> */}
                            <td style={{ padding: "0px", textAlign: "left" }}>{plantList[0]?.plantName}</td>
                            <td style={{ padding: "0px", textAlign: "left" }}>{plantList[0]?.plantAddress}</td>
                        </div>
                        <table className='table table-sm table-bordered text-center align-middle table-responsive w-100' style={{ border: "1px solid black" }}>
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
                                    <th style={{ width: '18%', border: '0.5px solid black', fontSize: '10px', textAlign: 'center' }}>Part No</th>
                                </tr>
                            </thead>
                            <tbody>{renderTableRows()}</tbody>
                        </table>

                        <tfoot> {Footer({ value: formatNoData })}</tfoot>
                        {/* </div> */}
                    </div>
                </div>
            )}
            {/* <Button onClick={handlePrint}>Print this out!</Button> */}
        </React.Fragment>
    )
}

export default TotalPrint