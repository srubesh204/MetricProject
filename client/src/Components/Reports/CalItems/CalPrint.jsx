import React, { useContext, useEffect, useState } from 'react'

import { PDFViewer, Document, Font, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Close, TextDecreaseOutlined } from '@mui/icons-material';
import dayjs from 'dayjs';
import { CalData } from './CalList'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';

const CalPrint = () => {

    const calData = useContext(CalData)
    const { calPrintOpen, setCalPrintOpen, selectedRows, formatNoData } = calData

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
            padding: 8,
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

    const renderTableRows = () => {

        return selectedRows.calMasterUsed.map((row, index) => (
            <View style={styles.tableRow} key={index.toString()}>

                <View style={{ marginBottom: "5px", width: "100%", border: "0.5px solid black" }}>
                    <View style={styles.tableRow}>
                        <Text style={{ width: "100%", textDecoration: "underline" }} >Description</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text >Make </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text >Size</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text >Gauge No </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text >Gauge Serial No </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text >Calibration Date</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text >Next Due Date</Text>
                    </View>

                </View>


                <View style={{ marginBottom: "5px", width: "100%", border: "0.5px solid black" }}>
                    <View style={styles.tableRow}>
                        <Text style={styles.inLineTableCell}>{row.itemAddMasterName}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.inLineTableCell}>{row.itemMake}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.inLineTableCell}>{row.itemRangeSize}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.inLineTableCell}>{row.itemIMTENo}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.inLineTableCell}>{row.itemMFRNo}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.inLineTableCell}>{row.itemCalDate}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.inLineTableCell}>{row.itemDueDate}</Text>
                    </View>
                </View>


            </View>
            
        ));


    };





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
                <Document title={selectedRows.dcNo || "DC Details"}>
                    <Page size="A4" style={{ fontSize: "10px", padding: "10px 15px" }}>
                        <Text style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}>Calibration Certificate</Text>
                        <View style={{ border: "1px solid black", width: "100%", height: "95%" }}>
                            <View style={{ border: "1px solid black", width: "100%", height: "5%" }}>
                                <Text style={{ padding: "10px", textDecoration: "underline" }}>Customer Details</Text>
                            </View>

                            <View style={styles.table}>
                                {/* Table header */}
                                <View style={styles.tableRow}>

                                    <Text style={{ width: "30%", border: "0.5px solid black", textAlign: "center", height: "50%" }}>Name</Text>
                                    <Text style={{ width: "30%", border: "0.5px solid black", textAlign: "center", height: "50%" }}>Metric</Text>
                                    <View style={{ border: "1px solid black", width: "90%", height: "50%" }}>

                                        {renderTableRows()}

                                    </View>
                                </View>
                                {/* Table rows */}
                                <View >
                                    <Text style={{ padding: "10px", textAlign: "center", }}>Environmental Condition</Text>
                                    <View style={{ border: "1px solid black", width: "100%", height: "50%" }}>
                                        <Text style={{ padding: "10px", textDecoration: "underline" }}>Customer Details</Text>
                                    </View>

                                </View>

                            </View>

                            {/* <View  style={styles.tableRow}>
                        <View style={{ border: "1px solid black", width: "50%", height: "50%" }}>
                            <View style={{ border: "1px solid black" }}>
                                <Text > &nbsp;&nbsp;Certificate No  &nbsp;&nbsp;: {selectedRows.calCertificateNo}</Text>
                            </View>
                        <Text style={{ padding: "10px", border: "1px solid black"}}>CUSTOMER DETAILS 1</Text>
                        <Text style={{ padding: "10px", border: "1px solid black"}}>CUSTOMER DETAILS 1</Text>
                        <Text style={{ padding: "10px", border: "1px solid black"}}>CUSTOMER DETAILS 1</Text>
                        <Text style={{ padding: "10px", border: "1px solid black"}}>CUSTOMER DETAILS 1</Text>
                        <Text style={{ padding: "10px", border: "1px solid black"}}>CUSTOMER DETAILS 1</Text>
                        </View>
                        <View style={{ border: "1px solid black", width: "50%", height: "30%" }}>
                        <Text style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}>CUSTOMER DETAILS 2</Text>
                        </View>
            </View>*/}

                        </View>


                    </Page>
                </Document>
            </PDFViewer>
        </Dialog>
    )
}

export default CalPrint