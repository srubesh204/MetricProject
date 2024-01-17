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
                <td >{index + 1}</td>
                <td >{row.itemIMTENo}</td>
                <td > {row.itemAddMasterName}</td>
                <td > {row.itemRangeSize !== '' ? row.itemRangeSize + ' ' + row.itemRangeSizeUnit : '-'}</td>
                <td > {row.itemMake || '-'}</td>
                <td style={{width: "15%"}}>{dayjs(row.itemCalDate).format('DD-MM-YYYY')} </td>
                <td >{dayjs(row.itemDueDate).format('DD-MM-YYYY')} </td>
                <td > {row.itemLC !== '' ? row.itemLC + ' ' + row.itemLCUnit : '-'}</td>
                <td > {row.itemCalFreInMonths || '-'}</td>
                <td >{row.itemCalibrationDoneAt || '-'}</td>
                <td > {row.itemStatus || '-'}</td>
                <td >{row.itemDepartment || '-'}</td>
                <td > {row.itemCalibrationSource === 'outsource' ? (row.itemCalibratedAt ? row.itemCalibratedAt : 'outsource') : row.itemCalibrationSource || '-'}</td>
                <td > {row.itemMFRNo || '-'}</td>
            </tr>
        ));
    };

    return (
        <React.Fragment>
            {filteredItemListData.length > 0 && (
                <div style={{ display: 'none', width: "100%" }}>
                    <table className='table table-sm table-bordered text-center align-middle table-responsive w-100' ref={componentRef} style={{border: "1px solid black"}}>
                        <thead>
                            <tr>
                                <th >Si. No</th>
                                <th >IMTE No</th>
                                <th >Description</th>
                                <th >Range/Size</th>
                                <th >Make</th>
                                <th style={{width: "15%"}}>Cal Date</th>
                                <th >Due Date</th>
                                <th >ItemLC</th>
                                <th >Frequency</th>
                                <th >Cal Done At</th>
                                <th >Status</th>
                                <th >Current location</th>
                                <th >Cal Source</th>
                                <th >Type</th>
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
