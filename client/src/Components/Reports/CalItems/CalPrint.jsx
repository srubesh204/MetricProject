import React, { useContext, useEffect, useState } from 'react'

import { PDFViewer, Document, Font, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Close, TextDecreaseOutlined } from '@mui/icons-material';
import dayjs from 'dayjs';
import { CalData } from './CalList'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';

const CalPrint = () => {

    const calData = useContext(CalData)
    const { calPrintOpen, setCalPrintOpen, selectedRows, formatNoData, filteredCalData } = calData

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
            height: "48%"
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
            bottom: "20px",
            height: "80px",
            left: "15px",
            right: "15px",
            fontSize: "8px",
            borderStyle: "solid",
            borderWidth: 1,

        },
    });







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

                            <View style={styles.table}>
                                {/* Table header */}
                                <View style={styles.tableRow}>

                                    <View style={{ width: "100%", border: "0.5px solid black", textAlign: "center", height: "100%" }}>

                                        <View style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                            <View style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "100%" }}>
                                                <View style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                                    <Text style={[styles.tableCell, { width: "40%" }]}>Certificate No.</Text>
                                                    <Text style={[styles.tableCell, { width: "60%" }]}>Metric/18/2023</Text>
                                                </View>
                                                <Text style={styles.tableCell}>CUSTOMER DETAILS</Text>
                                            </View>
                                            <View style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%" }}>
                                                <Text style={[styles.tableCell, { paddingTop: "15px" }]}>DEVICE UNDER CALIBRATION DETAILS</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", width: "100%", height: "50%" }}>
                                            <View style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "20%" }}>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>Name</Text>
                                                <Text style={[styles.tableCell, { height: "80%" }]}>Address</Text>
                                            </View>
                                            <View style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "30%" }}>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>METRIC</Text>
                                                <Text style={[styles.tableCell, { height: "80%" }]}>Avadi, Chennai.</Text>
                                            </View>
                                            <View style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "20%" }}>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>Description</Text>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>Make</Text>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>SIZE</Text>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>Gauge No</Text>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>Gauge Serial No</Text>
                                            </View>
                                            <View style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "30%" }}>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>Description</Text>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>Make</Text>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>SIZE</Text>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>Gauge No</Text>
                                                <Text style={[styles.tableCell, { height: "20%" }]}>Gauge Serial No</Text>
                                            </View>
                                        </View>
                                        <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                            <Text style={[styles.tableCell, { width: "50%" }]}>Issue Date</Text>
                                            <Text style={[styles.tableCell, { width: "50%" }]}>7-Sep-23</Text>
                                            <Text style={[styles.tableCell, { width: "40%" }]}>Calibrated on</Text>
                                            <Text style={[styles.tableCell, { width: "60%" }]}>7-Sep-23</Text>
                                        </View>
                                        <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                            <Text style={[styles.tableCell, { width: "50%" }]}>Received Condition of DUC</Text>
                                            <Text style={[styles.tableCell, { width: "50%" }]}>Satisfactory</Text>
                                            <Text style={[styles.tableCell, { width: "40%" }]}>Next Due</Text>
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
                                    <Text style={[styles.tableCell, { width: "15%" }]}>0 ± 2°C</Text>
                                    <Text style={[styles.tableCell, { width: "15%" }]}>Humidity</Text>
                                    <Text style={[styles.tableCell, { width: "15%" }]}> 20 ± 10%</Text>
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
                            </View>


                        </View>


                    </Page>
                </Document>
            </PDFViewer>
        </Dialog>
    )
}

export default CalPrint