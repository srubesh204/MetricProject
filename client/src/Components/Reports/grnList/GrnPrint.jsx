import React, { useContext, useEffect, useState } from 'react'
import { GrnListContent } from './GrnList';
import { PDFViewer, Document, Font, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Close } from '@mui/icons-material';
import dayjs from 'dayjs';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';


const GrnPrint = () => {

    const GrnPrintData = useContext(GrnListContent)
    const { grnPrintOpen, setGrnPrintOpen, selectedRows, formatNoData } = GrnPrintData







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
                            <View style={{ display: "flex", flexDirection: "row", padding: 0,borderBottom: "1px solid black" }}>
                                <View style={{ width: "73%", padding: "5px 0px 5px 5px", borderRight: "1px solid black", margin: 0 }}>
                                    <Text>To:</Text>
                                    <Text>&nbsp;&nbsp;&nbsp;{selectedRows.grnPartyAddress}</Text>
                                </View>
                                <View style={{width: "27%"}}>
                                    <View style={{ width: "100%", padding: "5px 0px 5px 5px", margin: 0,borderBottom: "1px solid black" }}>
                                        <Text >Inward No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {selectedRows.grnNo}</Text>
                                        <Text >Inward Date&nbsp;&nbsp;: {dayjs(selectedRows.grnDate).format('DD-MM-YYYY')}</Text>
                                    </View>
                                    <View style={{ padding: "5px 0px 5px 5px" }}>
                                        <Text >Party Dc No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {selectedRows.dcNo}</Text>
                                        <Text >Party Dc Date&nbsp;&nbsp;: {dayjs(selectedRows.dcDate).format('DD-MM-YYYY')}</Text>

                                    </View>
                                </View>


                            </View>


                        </View>



                    </Page>
                </Document>
            </PDFViewer>
        </Dialog>
    )
}

export default GrnPrint