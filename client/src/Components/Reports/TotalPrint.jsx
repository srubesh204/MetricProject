import React, { useContext, useEffect, useState } from 'react'
import { TotalListContent } from './TotalList';
import { PDFViewer, Document, Font, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Close, ViewInArTwoTone } from '@mui/icons-material';
import dayjs from 'dayjs';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
const TotalPrint = () => {

    const totalPrintData = useContext(TotalListContent)
    const { totalPrintOpen, setTotalPrintOpen, selectedRows, filteredItemListData, formatNoData, itemList } = totalPrintData


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
            width: "100%",

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
        customRow: {

            border: "0.5px solid black",
            padding: "2px 0px",
            textAlign: "center"
        }
    });


    const renderTableRows = () => {

        return filteredItemListData.map((row, index) => (
            <View style={{
                margin: "auto",
                flexDirection: "row",
                width: "100%", padding: "0px"
            }} key={index.toString()}>

                <Text style={{ width: "8%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>{index + 1}</Text>
                <Text style={{ width: "10%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>{row.itemIMTENo}</Text>
                <Text style={{ width: "17%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}> {row.itemAddMasterName}</Text>
                <Text style={{ width: "14%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}> {row.itemRangeSize !== "" ? row.itemRangeSize + " " + row.itemRangeSizeUnit : "-"}</Text>
                <Text style={{ width: "10%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}> {row.itemLC !== "" ? row.itemLC + " " + row.itemLCUnit : "-"}</Text>
                <Text style={{ width: "14%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}> {row.itemMake}</Text>
                <Text style={{ width: "13%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}> {row.itemMFRNo}</Text>
                <Text style={{ width: "10%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}> {row.itemCalFreInMonths}</Text>
                <Text style={{ width: "13%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>{row.itemCalibrationDoneAt || "-"} </Text>
                <Text style={{ width: "16%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}> {row.itemCalibrationSource === "outsource" ? (row.itemCalibratedAt ? row.itemCalibratedAt : "outsource") : row.itemCalibrationSource} </Text>
                <Text style={{ width: "13%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>{dayjs(row.itemCalDate).format('DD-MM-YYYY')} </Text>
                <Text style={{ width: "12%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>{dayjs(row.itemDueDate).format('DD-MM-YYYY')} </Text>
                <Text style={{ width: "14%", border: "0.5px solid black", padding: "4px 0px", textAlign: "center" }}>{row.itemDepartment} </Text>









            </View>
        ));


    };
    return (
        <Dialog keepMounted fullScreen open={totalPrintOpen} sx={{ height: '100vh', width: '100vw' }}
            onClose={(e, reason) => {
                console.log(reason)
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setTotalPrintOpen(false)
                }
            }}>
            <DialogTitle align='center' sx={{ backgroundColor: "#323639", color: "white", height: "40px" }}>Master List Of Gauges</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => setTotalPrintOpen(false)}

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
                <Document>
                    <Page size="A4" orientation='landscape' style={{ fontSize: "8px", padding: "10px 15px" }}>
                        {/* <Text style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}>Master List Of Gauges</Text>*/}
                        <View style={{ border: "1px solid black", width: "100%", height: "95%" }}>
                            <View style={{ display: "flex", flexDirection: "row", padding: 0, borderBottom: "1px solid black" }}>
                                <Text style={{ width: "100%" ,padding: "20px", textAlign: "center", fontSize: "12px"  }}>Master List of Gauges & Instruments</Text>
                            </View>
                            <View style={styles.table}>
                                {/* Table header */}
                                <View style={styles.tableRow}>
                                    <Text style={{ width: "8%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>Sr.No </Text>
                                    <Text style={{ width: "10%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>IMTE No </Text>
                                    <Text style={{ width: "17%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>Item Description </Text>
                                    <Text style={{ width: "14%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>Range/Size</Text>
                                    <Text style={{ width: "10%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>L.C </Text>
                                    <Text style={{ width: "14%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>Make</Text>
                                    <Text style={{ width: "13%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>Mfr.Sr.No. </Text>
                                    <Text style={{ width: "10%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>Calib. Freq. </Text>
                                    <Text style={{ width: "13%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>Used in Part No</Text>
                                    <Text style={{ width: "16%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>Calibration Source</Text>
                                    <Text style={{ width: "13%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>Calibration Date</Text>
                                    <Text style={{ width: "12%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>Duedate</Text>
                                    <Text style={{ width: "14%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>Current           Location</Text>



                                    {/* <View>
                                        <View style={{ width: "13%", border: "0.5px solid black", padding: 8, textAlign: "center" }}>
                                            <Text>Source Of Calibration</Text>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View >
                                                <Text>INHOUSE</Text>
                                            </View>
                                            <View>
                                                <Text>EXTERNAL</Text>
                                            </View>
                                        </View>
            </View>*/}
                                </View>
                                {/* Table rows */}
                                {renderTableRows()}

                            </View>


                        </View>



                    </Page>
                </Document>
            </PDFViewer>
        </Dialog>
    )
}

export default TotalPrint