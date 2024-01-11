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
                            {/* <View style={{ display: "flex", flexDirection: "row", width: "50%", height: "5%", textAlign: "center" }}>
                                <View style={{ border: "0.5px solid black", width: "50%", height: "5%", display: "flex", flexDirection: "column" }}>
                                    <View style={{ border: "0.5px solid black", width: "50%", height: "5%" }}>
                                        <View style={{ border: "0.5px solid black", width: "30%", height: "2%" }}>
                                            <Text>Certificate No.</Text>
                                        </View>
                                        <View style={{ border: "0.5px solid black", width: "70%", height: "2%" }}>
                                            <Text>Metric/18/2023</Text>
                                        </View>
                                    </View>
                                    <View style={{ border: "0.5px solid black", width: "50%", height: "2%" }}>
                                        <Text>CUSTOMER DETAILS</Text>
                                    </View>
                                </View>
                            </View> */}
                            <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <View style={{ border: "0.5px solid black", width: "50%", height: "8%", display: "flex", flexDirection: "row" }}>

                                    <Text>Certificate No.</Text>
                                </View>



                                <View style={{ border: "0.5px solid black", width: "50%", height: "8%", textAlign: "center" }}>
                                    <Text>DEVICE UNDER CALIBRATION DETAILS</Text>
                                </View>



                            </View>

                            <View style={styles.table}>
                                {/* Table header */}
                                <View style={styles.tableRow}>

                                    <View style={{ width: "100%", border: "0.5px solid black", textAlign: "center", height: "100%" }}>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <View style={{ width: "15%", border: "0.5px solid black", textAlign: "center", height: "50%" }}>
                                                <View style={{ border: "0.5px solid black", width: "100%", height: "20%" }}>
                                                    <Text>Name</Text>
                                                </View>
                                                <View>
                                                    <Text>METRIC</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: "35%", border: "0.5px solid black", textAlign: "center", height: "50%" }}>
                                                <View style={{ border: "0.5px solid black", width: "100%", height: "20%" }}>
                                                    <Text>Address</Text>
                                                </View>
                                                <View>
                                                    <Text>Avadi, Chennai.</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: "20%" }}>
                                                <Text style={styles.tableCell}>Description</Text>
                                                <Text style={styles.tableCell}>Make</Text>
                                                <Text style={styles.tableCell}>SIZE</Text>
                                                <Text style={styles.tableCell}>Gauge No</Text>
                                                <Text style={styles.tableCell}>Gauge Serial No</Text>
                                            </View>
                                            <View style={{ width: "30%" }}>
                                                <Text style={styles.tableCell}>Description</Text>
                                                <Text style={styles.tableCell}>Make</Text>
                                                <Text style={styles.tableCell}>SIZE</Text>
                                                <Text style={styles.tableCell}>Gauge No</Text>
                                                <Text style={styles.tableCell}>Gauge Serial No</Text>
                                            </View>
                                        </View>
                                        <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                            <Text style={[styles.tableCell,{width:"50%"}]}>Issue Date</Text>
                                            <Text style={styles.tableCell}>7-Sep-23</Text>
                                            <Text style={[styles.tableCell,{color: "red"}]}>Calibrated on</Text>
                                            <Text style={styles.tableCell}>7-Sep-23</Text>
                                        </View>
                                        <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.tableCell}>Received Condition of DUC</Text>
                                            <Text style={styles.tableCell}>Satisfactory</Text>
                                            <Text style={styles.tableCell}>Next Due</Text>
                                            <Text style={styles.tableCell}>7-sep-23</Text>
                                        </View>
                                    </View>
                                    <View>Issue Date</View>
                                </View>

                                <View style={{ border: "1px solid black" }}>
                                    <Text style={{ padding: "5px", textAlign: "center" }}>ENVIRONMENTAL CONDITION</Text>
                                </View>
                                <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}>Temperature</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}>0 ± 2°C</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}>Humidity</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}> 50 ± 10%</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}>Drawing No. :</Text>
                                </View>
                                <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}>Calibration Procedure No</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}>0 ± 2°C</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}>Standard Ref :</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}> 50 ± 10%</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}>Uncertainty :</Text>
                                </View>
                                <View style={{ border: "1px solid black" }}>
                                    <Text style={{ padding: "5px", textAlign: "center", }}>MASTER USED FOR CALIBRATION</Text>
                                </View>
                                <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "10%" }}>SI. No.</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}>Name of the Master Used</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "15%" }}>Id No</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}>Calibration Report No</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "15%" }}> Valid Upto</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}> Traceability</Text>
                                </View>
                                <View style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "10%" }}>1</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}>0 ± 2°C</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "15%" }}>Standard Ref :</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}> 50 ± 10%</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "15%" }}>Uncertainty :</Text>
                                    <Text style={{ border: "0.5px solid black", textAlign: "center", width: "20%" }}> Traceability</Text>
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