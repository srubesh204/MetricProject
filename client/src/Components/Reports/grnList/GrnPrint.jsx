import React, { useContext, useEffect, useState } from 'react'
import { GrnListContent } from './GrnList';
import { PDFViewer, Document, Font, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Close } from '@mui/icons-material';
import dayjs from 'dayjs';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';


const GrnPrint = () => {

    const GrnPrintData = useContext(GrnListContent)
    const { grnPrintOpen, setGrnPrintOpen, selectedRows, formatNoData } = GrnPrintData


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

        return selectedRows.grnPartyItems.map((row, index) => (
            <View style={styles.tableRow} key={index.toString()}>
                <Text style={{
                    width: "8%",
                    height: "100%",
                    border: "0.5px solid black",
                    padding: "15px 0px",
                    textAlign: "center"

                }}>{index + 1}</Text>
                <View style={{ margin: "auto", width: "100%", }}>
                    <View style={styles.tableRow}>
                        <Text style={styles.inLineTableCell}>Item Name &nbsp;: {row.grnItemAddMasterName}, IMTE No : {row.grnItemIMTENo}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.inLineTableCell}>Range/Size : {row.grnItemRangeSize}</Text>
                    </View>
                </View>

                <Text style={{ width: "40%", border: "0.5px solid black", padding: "15px 0px", textAlign: "center" }}>{row.grnItemStatus}</Text>
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
                        <Text style={{ position: "absolute", margin: "80px 0px 5px 0px", fontSize: 6 }}> <Text style={{ fontWeight: 800 }}>Format Number . </Text>{data.value.fGrn.frNo}</Text>
                        <Text style={{ position: "absolute", margin: "80px 0px 5px 100px", fontSize: 6 }}> <Text style={{ fontWeight: 800 }}>Ammendment No.</Text> : {data.value.fGrn.amNo}</Text>
                        <Text style={{ position: "absolute", margin: "80px 0px 5px 200px", fontSize: 6 }}> <Text style={{ fontWeight: 800 }}>Ammendment Date.</Text> : {data.value.fGrn.amDate}</Text>
                    </View>
                    <View >
                        <Text style={{ margin: "5px", fontFamily: 'Open Sans', fontSize: 8, fontWeight: 600 }}>For {selectedRows.grnPartyName}</Text>
                        <Text style={{ margin: "45px 0px 5px 45px", fontSize: 9 }}>Authorised Signature</Text>
                    </View>
                </View>


            </View >)
    })






    return (
        <Dialog keepMounted fullScreen open={grnPrintOpen} sx={{ height: '100vh', width: '100vw' }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setGrnPrintOpen(false)
                }
            }}>
            <DialogTitle align='center' sx={{ backgroundColor: "#323639", color: "white", height: "40px" }}>GRN Print Preview</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setGrnPrintOpen(false)}

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
                <Document title={selectedRows.grnNo || "Grn Details"}>
                    <Page size="A4" style={{ fontSize: "10px", padding: "10px 15px" }}>
                        <Text style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}>GRN</Text>
                        <View style={{ border: "1px solid black", width: "100%", height: "95%" }}>
                            <Text style={{ textAlign: "center", padding: "5px 0px 5px 0px", fontSize: "14px" }}>{selectedRows.grnPartyName}</Text>
                            <Text style={{ textAlign: "center", padding: "0px 0px 5px 0px", fontSize: "10px" }}>{selectedRows.grnPartyAddress}</Text>
                            <Text style={{ textAlign: "center", padding: "0px 0px 5px 0px", fontSize: "10px", borderBottom: "1px solid black" }}>Phone and Address</Text>
                            <View style={{ display: "flex", flexDirection: "row", padding: 0, borderBottom: "1px solid black" }}>
                                <View style={{ width: "73%", padding: "5px 0px 5px 5px", borderRight: "1px solid black", margin: 0 }}>
                                    <Text>To:</Text>
                                    <Text>&nbsp;&nbsp;&nbsp;{selectedRows.grnPartyAddress}</Text>
                                </View>
                                <View style={{ width: "27%" }}>
                                    <View style={{ width: "100%", padding: "5px 0px 5px 5px", margin: 0, borderBottom: "1px solid black" }}>
                                        <Text >GRN No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {selectedRows.grnNo}</Text>
                                        <Text >GRN Date&nbsp;&nbsp;: {dayjs(selectedRows.grnDate).format('DD-MM-YYYY')}</Text>
                                    </View>
                                    <View style={{ padding: "5px 0px 5px 5px" }}>
                                        <Text >Party Dc No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {selectedRows.dcNo}</Text>
                                        <Text >Party Dc Date&nbsp;&nbsp;: {dayjs(selectedRows.dcDate).format('DD-MM-YYYY')}</Text>

                                    </View>
                                </View>


                            </View>
                            <View style={styles.table}>
                                {/* Table header */}
                                <View style={styles.tableRow}>
                                    <Text style={{ width: "8%", border: "0.5px solid black", padding: "8px 0px", textAlign: "center" }}>Si No</Text>
                                    <Text style={styles.tableCell}>Item Description</Text>
                                    <Text style={{ width: "40%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>Remarks</Text>

                                </View>
                                {/* Table rows */}
                                {renderTableRows()}
                            </View>


                        </View>
                        <Footer value={formatNoData} />



                    </Page>
                </Document>
            </PDFViewer>
        </Dialog>
    )
}

export default GrnPrint