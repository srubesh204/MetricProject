import React, { useContext, useEffect, useState } from 'react'

import { PDFViewer, Document, Font, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Close, TextDecreaseOutlined } from '@mui/icons-material';
import dayjs from 'dayjs';
import { CalData } from './CalList'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';

const CalPrint = () => {

    const calData = useContext(CalData)
    const { calPrintOpen, setCalPrintOpen, selectedRows, formatNoData, filteredCalData ,calibrationData} = calData

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
            flexDirection: "row",
            width: "100%",
            height: "50%"
        },
        tableCell: {
            width: '100%',
            border: "0.5px solid black",
            padding: 4,
            textAlign: 'center',
        },
        inLineTableCell: {
            width: '100%',
            marginLeft: "5px",

        },
        footer: {
            position: 'absolute',
            bottom: "10px",
            height: "100px",
            left: "15px",
            right: "15px",
            fontSize: "8px",
            borderStyle: "solid",
            borderWidth: 1,

        },
    }); console.log(filteredCalData)







    return (
        <Dialog keepMounted fullScreen open={calPrintOpen} sx={{ height: '100vh', width: '100vw' }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setCalPrintOpen(false)
                }
            }}>
            <DialogTitle align='center' sx={{ backgroundColor: "#323639", color: "white", height: "40px" }}>DC Print Preview</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setCalPrintOpen(false)}

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
                <Document >
                    <Page size="A4" style={{ fontSize: "10px", padding: "10px 15px" }}>
                        <Text style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}>Calibration Certificate</Text>
                        <View style={{ border: "0.5px solid black", width: "100%", height: "95%" }}>

                            <View>
                                {/* Table header */}
                                <View style={styles.tableRow}>

                                    <View style={{ width: "100%", border: "0.5px solid black", textAlign: "center", height: "100%" }}>

                                        <View style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                            <View style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "100%" }}>
                                                <View style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                                    <Text style={[styles.tableCell, { width: "40%", fontFamily: 'Open Sans', fontSize: 10, fontWeight: 1000 }]}>Certificate No.</Text>
                                                    <Text style={[styles.tableCell, { width: "60%" }]}>{selectedRows.calCertificateNo}</Text>
                                                </View>
                                                <Text style={[styles.tableCell, {fontFamily: 'Open Sans', fontSize: 10, fontWeight: 1000}]}>CUSTOMER DETAILS</Text>
                                            </View>
                                            <View style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                                <Text style={[styles.tableCell, { paddingTop: "15px", fontFamily: 'Open Sans', fontSize: 10, fontWeight: 1000  }]}>DEVICE UNDER CALIBRATION DETAILS</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", width: "100%", height: "50%" }}>
                                            <View style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "20%" }}>
                                                <Text style={[styles.tableCell, { height: "20%", fontFamily: 'Open Sans', fontSize: 10, fontWeight: 1000 }]}>Name</Text>
                                                <Text style={[styles.tableCell, { height: "80%", fontFamily: 'Open Sans', fontSize: 10, fontWeight: 1000 }]}>Address</Text>
                                            </View>
                                            <View style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "30%" }}>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>METRIC</Text>
                                                <Text style={[styles.tableCell, { height: "80%" }]}>Avadi, Chennai.</Text>
                                            </View>
                                            <View style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "20%" }}>
                                                <Text style={[styles.tableCell, { height: "20%", fontFamily: 'Open Sans', fontSize: 10, fontWeight: 1000 }]}>Description</Text>
                                                <Text style={[styles.tableCell, { height: "20%", fontFamily: 'Open Sans', fontSize: 10, fontWeight: 1000 }]}>Make</Text>
                                                <Text style={[styles.tableCell, { height: "20%", fontFamily: 'Open Sans', fontSize: 10, fontWeight: 1000 }]}>SIZE</Text>
                                                <Text style={[styles.tableCell, { height: "20%", fontFamily: 'Open Sans', fontSize: 10, fontWeight: 1000 }]}>Gauge No</Text>
                                                <Text style={[styles.tableCell, { height: "20%", fontFamily: 'Open Sans', fontSize: 10, fontWeight: 1000 }]}>Gauge Serial No</Text>
                                            </View>
                                            <View style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "30%" }}>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>{selectedRows.calItemName}</Text>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>{selectedRows.calItemMake}</Text>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>{selectedRows.calRangeSize}</Text>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>{selectedRows.calItemMFRNo}</Text>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>{selectedRows.calIMTENo}</Text>
                                            </View>
                                        </View>
                                        <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                            <Text style={[styles.tableCell, { width: "50%" }]}>Issue Date</Text>
                                            <Text style={[styles.tableCell, { width: "50%" }]}>{selectedRows.calItemEntryDate}</Text>
                                            <Text style={[styles.tableCell, { width: "40%" }]}>Calibrated on</Text>
                                            <Text style={[styles.tableCell, { width: "60%" }]}>{selectedRows.calItemCalDate}</Text>
                                        </View>
                                        <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                            <Text style={[styles.tableCell, { width: "50%" }]}>Received Condition of DUC</Text>
                                            <Text style={[styles.tableCell, { width: "50%" }]}>Satisfactory</Text>
                                            <Text style={[styles.tableCell, { width: "40%" }]}>{selectedRows.calItemDueDate}</Text>
                                            <Text style={[styles.tableCell, { width: "60%" }]}>7-sep-23</Text>
                                        </View>
                                    </View>
                                    {/* <View>Issue Date</View> */}

                                </View>

                                <View style={{ border: "1px solid black" }}>
                                    <Text style={{ padding: "5px", textAlign: "center" }}>ENVIRONMENTAL CONDITION</Text>
                                </View>
                                <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <Text style={[styles.tableCell, { width: "25%" }]}>Temperature</Text>
                                    <Text style={[styles.tableCell, { width: "15%" }]}>{selectedRows.calItemTemperature}</Text>
                                    <Text style={[styles.tableCell, { width: "15%" }]}>Humidity</Text>
                                    <Text style={[styles.tableCell, { width: "15%" }]}>{selectedRows.calItemHumidity}</Text>
                                    <Text style={[styles.tableCell, { width: "30%" }]}>Drawing No. :</Text>
                                </View>
                                <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <Text style={[styles.tableCell, { width: "25%" }]}>Calibration Procedure No</Text>
                                    <Text style={[styles.tableCell, { width: "15%" }]}>0 ± 2°C</Text>
                                    <Text style={[styles.tableCell, { width: "15%" }]}>Standard Ref :</Text>
                                    <Text style={[styles.tableCell, { width: "15%" }]}> 50 ± 10%</Text>
                                    <Text style={[styles.tableCell, { width: "30%" }]}>Uncertainty :</Text>
                                </View>
                                <View style={{ border: "1px solid black" }}>
                                    <Text style={{ padding: "5px", textAlign: "center" }}>MASTER USED FOR CALIBRATION</Text>
                                </View>
                                <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <Text style={[styles.tableCell, { width: "7%" }]}>SI. No.</Text>
                                    <Text style={[styles.tableCell, { width: "26%" }]}>Name of the Master Used</Text>
                                    <Text style={[styles.tableCell, { width: "12%" }]}>Id No</Text>
                                    <Text style={[styles.tableCell, { width: "20%" }]}>Calibration Report No</Text>
                                    <Text style={[styles.tableCell, { width: "15%" }]}> Valid Upto</Text>
                                    <Text style={[styles.tableCell, { width: "20%" }]}> Traceability</Text>
                                </View>
                                <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <Text style={[styles.tableCell, { width: "7%" }]}>1</Text>
                                    <Text style={[styles.tableCell, { width: "26%" }]}> Outside Micrometer</Text>
                                    <Text style={[styles.tableCell, { width: "12%" }]}>ODM/A/001</Text>
                                    <Text style={[styles.tableCell, { width: "20%" }]}> Tii221217-5-9</Text>
                                    <Text style={[styles.tableCell, { width: "15%" }]}>17-Dec-23 </Text>
                                    <Text style={[styles.tableCell, { width: "20%" }]}>Tii Techno Testing Serv</Text>
                                </View>

                                <View>
                                    <Text style={{ padding: "5px", textAlign: "center" }}>CALIBRATION RESULTS</Text>
                                </View>
                                <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>Parameter </Text>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>Nominal Size</Text>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>Permissible Size Min</Text>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>Permissible Size Max</Text>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>Observed Size Min</Text>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>Observed Size Max</Text>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>Cal status</Text>
                                </View>
                                <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>GO</Text>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>20.5000</Text>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>20.5255</Text>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>20.5465</Text>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>20.5280 </Text>
                                    <Text style={[styles.tableCell, { width: "14%" }]}>20.5290</Text>
                                    <Text style={[styles.tableCell, { width: "14%" }]}> ACCEPTED</Text>
                                </View>
                                <View>
                                    <Text style={{padding: "20px 20px"}}>GAUGE IS ACCEPTABLE</Text>
                                </View>
                            </View>
                            <View Style={styles.footer}>
                                <View><Text style={{ padding: "10px 20px"}}>Remarks :</Text></View>
                                <View><Text style={{padding: "20px 20px"}}>This Certificate is Digitally Signed and does not require any seal or signature</Text></View>
                                <View><Text style={{textAlign: "center", padding: "30px 10px"}}>----End of the Certificate----</Text></View>
                                <View style={{width: "100%", display: "flex", flexDirection: "row", }}>
                                <Text style={{width: "40%", textAlign: "center", padding: "30px 10px"}}>Calibrated by</Text><Text style={{width: "40%"}}></Text><Text style={{width: "40%", textAlign: "center", padding: "30px 10px"}}>Authorised by</Text>
                                </View>
                                
                            </View>

                        </View>


                    </Page>
                </Document>
            </PDFViewer>
        </Dialog>
    )
}

export default CalPrint