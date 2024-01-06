import React, { useContext, useEffect, useState } from 'react'
import { HistoryCardContent } from './InsHistoryCard'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { PDFViewer, Document, Font, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs';



const HistoryCardPrint = () => {

    const { selectedInstrumentName, selectedIMTENo, selectedRow } = useContext(HistoryCardContent)

    const historyCardPrintData = useContext(HistoryCardContent)
    const { historyCardPrintOpen, setHistoryCardPrintOpen, selectedRows, formatNoData } = historyCardPrintData
    const selectedRowsArray = Array.isArray(selectedRows) ? selectedRows : [selectedRows];


    // Check if selectedRowsArray[0] is defined before destructuring
    const { itemMFRNo: serialNo, itemRangeSize: rangeSize, itemMake: make } = selectedRowsArray[0] || {};

    console.log("serialNo:", serialNo);
    console.log("rangeSize:", rangeSize);
    console.log("make:", make);

    Font.register({
        family: 'Open Sans',
        fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
            { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
        ]
    })

    const styles = StyleSheet.create({
        table: {
            display: "table",
            borderStyle: "solid",
            borderWidth: 0.5,
            borderRightWidth: 0,
            borderLeftWidth: 0
        },
        tableRow: {
            margin: "auto",
            flexDirection: "row",
            width: "100%"
        },
        tableCell: {
            width: '100%',
            border: "0.5px solid black",
            padding: 8,
            textAlign: 'center',
        },
        inLineTableCell: {
            width: '100%',
            marginLeft: "5px",
            padding: 2.5,

        },
        footer: {
            position: 'absolute',
            bottom: "20px",
            height: "80px",
            left: "15px",
            right: "15px",
            fontSize: "8px",
            borderStyle: "solid",
            borderWidth: 1,

        },
    });

    const renderTableRows = () => {
        return selectedRowsArray.map((row, index) => {
            console.log(`Row ${index + 1}:`, row); // Log the details of each row
            const { itemRangeSize, itemLC, itemMake, dcItemRemarks } = row || {};
            return (
                <View style={styles.tableRow} key={index.toString()}>
                    <Text style={styles.inLineTableCell}>
                        Range/Size: {itemRangeSize} {row?.itemRangeSizeUnit}, L.C.: {itemLC} {row?.itemLCUnit}, Make: {itemMake}
                    </Text>
                    <Text style={styles.inLineTableCell}>
                        Sr.No: {row?.itemMFRNo}, Cal. Frequency: {row?.itemCalFreInMonths}
                    </Text>
                    <Text style={{ width: "40%", border: "0.5px solid black", padding: "15px 0px", textAlign: "center" }}>
                        {dcItemRemarks}
                    </Text>
                </View>
            );
        });
    };
    


    const Footer = ((data) => {
        console.log(data)
        return (
            <View style={styles.footer} >
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: "70%", borderRight: "1px solid black" }}>
                        <Text style={{ margin: "5px" }}>Name and Signature of the person to whom the goods were delivered for {'\n'} Transporting with status of the person signing.</Text>
                        <Text style={{ margin: "45px 0px 5px 0px", fontSize: 10 }}> <Text style={{ fontWeight: 800 }}>Date</Text> : </Text>
                        <Text style={{ position: "absolute", margin: "80px 0px 5px 0px", fontSize: 6 }}> <Text style={{ fontWeight: 800 }}>Format Number : </Text>{data.value.fDc.frNo}</Text>
                        <Text style={{ position: "absolute", margin: "80px 0px 5px 100px", fontSize: 6 }}> <Text style={{ fontWeight: 800 }}>Ammendment No.</Text> : {data.value.fDc.amNo}</Text>
                        <Text style={{ position: "absolute", margin: "80px 0px 5px 200px", fontSize: 6 }}> <Text style={{ fontWeight: 800 }}>Ammendment Date.</Text> : {data.value.fDc.amDate}</Text>
                    </View>
                    <View >
                        <Text style={{ margin: "5px", fontFamily: 'Open Sans', fontSize: 10, fontWeight: 600 }}>For {selectedRows.dcPartyName}</Text>
                        <Text style={{ margin: "45px 0px 5px 45px", fontSize: 9 }}>Authorised Signature</Text>
                    </View>
                </View>


            </View >)
    })


    return (


        <Dialog keepMounted fullScreen open={historyCardPrintOpen} sx={{ height: '100vh', width: '100vw' }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setHistoryCardPrintOpen(false)
                }
            }}>
            <DialogTitle align='center' sx={{ backgroundColor: "#323639", color: "white", height: "40px" }}>History Card Preview</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setHistoryCardPrintOpen(false)}

                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: "white"
                }}
            >
                <Close />
            </IconButton>
            <PDFViewer width="100%" height="100%">
                <Document title={selectedRow.dcNo || "DC Details"}>
                    <Page size="A4" style={{ fontSize: "8px", padding: "10px 15px" }}>
                        <View style={{ border: "1px solid black", width: "100%", height: "95%" }}>
                            <View style={{ border: "1px solid black", width: "100%", height: "7%" }}>
                                <Text style={{ padding: "10px", textAlign: "center" }}>METRIC</Text>
                                <Text style={{ paddingBottom: "10px", textAlign: "center" }}>INSTRUMENTS/GAUGE HISTORY CARD</Text>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", padding: 0 }}>
                                <View style={{ width: "30%", padding: "10px", border: "1px solid black", margin: 0 }}>
                                    <Text style={{ padding: "3px 0px" }}>Gauge Number :</Text>
                                    <Text style={{ padding: "3px 0px" }}>Gauge Serial No :</Text>
                                    <Text style={{ padding: "3px 0px" }}>Calibration Source :</Text>
                                </View>
                                <View style={{ width: "40%", padding: "10px", border: "1px solid black", margin: 0 }}>
                                    <Text style={{ padding: "3px 0px" }}>Instrument / Gauge Name :</Text><Text>{selectedRow.itemAddMasterName}</Text>
                                    <Text style={{ padding: "3px 0px" }}>Range / Size :</Text><Text>{selectedRow.itemRangeSize}</Text>
                                    <Text style={{ padding: "3px 0px" }}>Frequency of Calibration :</Text><Text>{selectedRow.itemCalFreInMonths}</Text>
                                    <Text style={{ padding: "3px 0px" }}>Department :</Text>
                                </View>
                                <View style={{ width: "30%", padding: "10px", border: "1px solid black", margin: 0 }}>
                                    <Text style={{ padding: "3px 0px" }}>Permissible Size :</Text>
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", padding: 0 }}>
                                <View style={{ width: "5%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text >Sl No</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text >Calibration</Text>
                                    <Text >Date</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text >Calibration</Text>
                                    <Text >Status</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text >Next</Text>
                                    <Text >Calibration</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text >Certificate</Text>
                                    <Text >Status</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text >Certificate</Text>
                                    <Text >No</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text >Observed</Text>
                                    <Text >Error</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text >Calibration</Text>
                                    <Text >At</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text >Calibrated</Text>
                                    <Text >By</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text >Verified</Text>
                                    <Text >By</Text>
                                </View>
                                <View style={{ width: "10%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text >Remarks</Text>
                                </View>
                            </View>
                            <view>
                                {renderTableRows()}
                            </view>
                            <Text>Format No</Text>

                            <Text>{selectedRow.itemMFRNo}</Text>
                            <Text>{selectedRow.itemModelNo}</Text>
                            
                            <Text>Acceptance{selectedRow.acceptanceCriteria.acMinPS}</Text>
                            
                        </View>
                    </Page>

                </Document>
            </PDFViewer>
        </Dialog>





    )
}

export default HistoryCardPrint