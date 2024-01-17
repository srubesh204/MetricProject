import React, { useContext, useRef } from 'react';
import { ItemListContent } from './ItemList';
import { Button, Dialog, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';

const ItemListPrint = () => {
    const itemListPrintData = useContext(ItemListContent);
    const { filteredItemListData, printState, setPrintState } = itemListPrintData;

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: `
          @page {
            size: landscape;
            margin: 1cm;
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
        return filteredItemListData.map((row, index) => (
            <tr key={index.toString()}>
                <td style={{ width: '5%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ width: '10%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>{row.itemIMTENo}</td>
                <td style={{ width: '8%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}> {row.itemAddMasterName}</td>
                <td style={{ width: '5%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}> {row.itemRangeSize !== '' ? row.itemRangeSize + ' ' + row.itemRangeSizeUnit : '-'}</td>
                <td style={{ width: '5%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}> {row.itemMake || '-'}</td>
                <td style={{ width: '8%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>{dayjs(row.itemCalDate).format('DD-MM-YYYY')} </td>
                <td style={{ width: '8%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>{dayjs(row.itemDueDate).format('DD-MM-YYYY')} </td>
                <td style={{ width: '7%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}> {row.itemLC !== '' ? row.itemLC + ' ' + row.itemLCUnit : '-'}</td>
                <td style={{ width: '7%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}> {row.itemCalFreInMonths || '-'}</td>
                <td style={{ width: '9%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>{row.itemCalibrationDoneAt || '-'}</td>
                <td style={{ width: '7%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}> {row.itemStatus || '-'}</td>
                <td style={{ width: '10%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>{row.itemDepartment || '-'}</td>
                <td style={{ width: '7%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}> {row.itemCalibrationSource === 'outsource' ? (row.itemCalibratedAt ? row.itemCalibratedAt : 'outsource') : row.itemCalibrationSource || '-'}</td>
                <td style={{ width: '6%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}> {row.itemMFRNo || '-'}</td>
            </tr>
        ));
    };

    return (
        < React.Fragment>
            {filteredItemListData.length > 0 && (
                <div style={{ display: 'none' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }} ref={componentRef}>
                        <thead>
                            <tr>
                                <th style={{ width: '5%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>Si. No</th>
                                <th style={{ width: '10%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>IMTE No</th>
                                <th style={{ width: '8%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>Description</th>
                                <th style={{ width: '5%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>Range/Size</th>
                                <th style={{ width: '5%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>Make</th>
                                <th style={{ width: '8%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>Cal Date</th>
                                <th style={{ width: '8%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>Due Date</th>
                                <th style={{ width: '7%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>ItemLC</th>
                                <th style={{ width: '7%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>Frequency</th>
                                <th style={{ width: '9%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>Cal Done At</th>
                                <th style={{ width: '7%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>Status</th>
                                <th style={{ width: '10%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>Current location</th>
                                <th style={{ width: '7%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>Cal Source</th>
                                <th style={{ width: '6%', border: '0.5px solid black', padding: '4px 0px', textAlign: 'center' }}>Type</th>
                            </tr>
                        </thead>
                        <tbody>{renderTableRows()}</tbody>
                    </table>
                </div>
            )}
            {/* <Button onClick={handlePrint}>Print this out!</Button> */}
        </React.Fragment>
    );
};

export default ItemListPrint;
