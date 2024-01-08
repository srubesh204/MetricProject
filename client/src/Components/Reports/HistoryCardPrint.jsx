import React, { useContext, useEffect, useState } from 'react'
import { HistoryCardContent } from './InsHistoryCard'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { PDFViewer, Document, Font, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs';



const HistoryCardPrint = () => {

    const { selectedInstrumentName, selectedIMTENo, selectedRow } = useContext(HistoryCardContent)

    const historyCardPrintData = useContext(HistoryCardContent)
    const { historyCardPrintOpen, setHistoryCardPrintOpen, selectedRows, formatNoData, selectedIMTEs } = historyCardPrintData

    const selectedRowsArray = Array.isArray(selectedRows) ? selectedRows : [selectedRows];

    useEffect(() => {
        console.log('Format No Data:', formatNoData.fHistoryCard?.frNo);
    }, [formatNoData]);

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
            bottom: "10px",
            height: "20px",
            left: "15px",
            right: "15px",
            fontSize: "8px",
            borderStyle: "solid",
            borderWidth: 1,

        },
    });

    const renderTableRows = () => {
        return selectedIMTEs.map((row, index) => (

            <View style={styles.tableRow} key={index}>
                <Text style={{ width: "5%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>{index + 1}</Text>
                <Text style={{ width: "9%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>{row.calItemCalDate}</Text>
                <Text style={{ width: "9%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>{row.calStatus}</Text>
                <Text style={{ width: "9%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>{row.calItemDueDate}</Text>
                <Text style={{ width: "9%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>--</Text>
                <Text style={{ width: "9%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>{row.calCertificateNo}</Text>
                <Text style={{ width: "9%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>--</Text>
                <Text style={{ width: "9%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>{row.itemCalibratedAt}</Text>
                <Text style={{ width: "9%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>--</Text>
                <Text style={{ width: "9%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>--</Text>
                <Text style={{ width: "14%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>--</Text>
            </View>
        ));
    };



    const Footer = ((data) => {
        console.log(data)
        return (
            <View style={styles.footer} >
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: "70%", borderRight: "1px solid black" }}>
                        <Text style={{ margin: "5px" }}>Name and Signature of the person to whom the goods were delivered for {'\n'} Transporting with status of the person signing.</Text>
                        <Text style={{ margin: "45px 0px 5px 0px", fontSize: 10 }}> <Text style={{ fontWeight: 800 }}>Date</Text> : </Text>
                        <Text style={{ position: "absolute", margin: "80px 0px 5px 0px", fontSize: 6 }}> <Text style={{ fontWeight: 800 }}>Format Number : </Text>{data.value.fHistoryCard.frNo}</Text>
                        <Text style={{ position: "absolute", margin: "80px 0px 5px 100px", fontSize: 6 }}> <Text style={{ fontWeight: 800 }}>Ammendment No.</Text> : {data.value.fHistoryCard.amNo}</Text>
                        <Text style={{ position: "absolute", margin: "80px 0px 5px 200px", fontSize: 6 }}> <Text style={{ fontWeight: 800 }}>Ammendment Date.</Text> : {data.value.fHistoryCard.amDate}</Text>
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
                                    <Text style={{ padding: "3px 0px" }}>Gauge Number :    {selectedRow.itemIMTENo}</Text>
                                    <Text style={{ padding: "3px 0px" }}>Gauge Serial No :    {selectedRow.itemMFRNo}</Text>
                                    <Text style={{ padding: "3px 0px" }}>Calibration Source :    {selectedRow.itemCalibrationSource}</Text>
                                </View>
                                <View style={{ width: "40%", padding: "10px", border: "1px solid black", margin: 0 }}>
                                    <Text style={{ padding: "3px 0px" }}>Instrument / Gauge Name :    {selectedRow.itemAddMasterName}</Text>
                                    <Text style={{ padding: "3px 0px" }}>Range / Size :    {selectedRow.itemRangeSize}</Text>
                                    <Text style={{ padding: "3px 0px" }}>Frequency of Calibration :    {selectedRow.itemCalFreInMonths}</Text>
                                    <Text style={{ padding: "3px 0px" }}>Department :    {selectedRow.itemDepartment}</Text>
                                </View>
                                <View style={{ width: "30%", padding: "10px", border: "1px solid black", margin: 0 }}>
                                    <Text style={{ padding: "3px 0px" }}>Permissible Size :</Text>
                                    <View style={{ display: "flex", flexDirection: "row", padding: 3 }}>
                                        <Text style={{ width: "30%", textAlign: "center" }}>Min</Text>
                                        <Text style={{ width: "30%", textAlign: "center" }}>Max</Text>
                                        <Text style={{ width: "40%", textAlign: "center" }}>Wear Limit</Text>
                                    </View>
                                    {
                                        selectedRow.acceptanceCriteria.map(item => (
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ width: "30%", textAlign: "center" }}>{item.acMinPS}</Text>
                                                <Text style={{ width: "30%", textAlign: "center" }}>{item.acMaxPS}</Text>
                                                <Text style={{ width: "40%", textAlign: "center" }}>{item.acWearLimitPS}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", padding: 0 }}>
                                <View style={{ width: "5%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text>Sl No</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text>Calibration</Text>
                                    <Text>Date</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text>Calibration</Text>
                                    <Text>Status</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text>Next</Text>
                                    <Text>Calibration</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text>Certificate</Text>
                                    <Text>Status</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text>Certificate</Text>
                                    <Text>No</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text>Observed</Text>
                                    <Text>Error</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text>Calibration</Text>
                                    <Text>At</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text>Calibrated</Text>
                                    <Text>By</Text>
                                </View>
                                <View style={{ width: "9%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text>Verified</Text>
                                    <Text>By</Text>
                                </View>
                                <View style={{ width: "14%", padding: "10px 1px", border: "1px solid black", margin: 0, textAlign: "center" }}>
                                    <Text>Remarks</Text>
                                </View>
                            </View>
                            <View>
                                {renderTableRows()}
                            </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", padding: 0 }}>
                        <Text style={{ width: "20%" }}>Format No : {formatNoData?.fHistoryCard?.frNo || '-'}</Text><Text style={{ width: "20%" }}>Rev No & Date :</Text>
                        </View>
                    </Page>

                </Document>
            </PDFViewer>
        </Dialog>





    )
}

export default HistoryCardPrint