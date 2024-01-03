import React, { useContext, useEffect, useState } from 'react'
import { DcListContent } from './DcList';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { PDFViewer, Document, Font, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import axios from 'axios';


const DcPrint = () => {

    const DcPrintData = useContext(DcListContent)
    const { dcPrintOpen, setDcPrintOpen, selectedRows, formatNoData } = DcPrintData









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
            border: "0.5px 0px 0.5px 0px solid black",

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
            border: "1px solid black"
        },
    });

    const data = [
        { id: 1, name: 'John Doe', age: 30, city: 'New York' },
        { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
        // Add more data as needed
    ];

    const renderTableRows = () => {

        return selectedRows.dcPartyItems.map((row, index) => (
            <View style={styles.tableRow} key={index.toString()}>
                <Text style={{
                    width: "8%",
                    height: "100%",
                    border: "0.5px solid black",
                    padding: "15px 0px",
                    textAlign: "center"

                }}>{index + 1}</Text>
                <View style={{ margin: "auto", width: "100%", border: "0.5px solid black" }}>
                    <View style={styles.tableRow}>
                        <Text style={styles.inLineTableCell}>Item Name &nbsp;: {row.itemItemMasterName}, IMTE No : {row.itemIMTENo}</Text>


                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.inLineTableCell}>Range/Size : {row.itemRangeSize}, L.C. : {row.itemLC}, Make : {row.itemMake}</Text>


                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.inLineTableCell}>Sr.No : {row.itemMFRNo}, Cal. Frequency : {row.itemCalFreInMonths}</Text>

                    </View>
                </View>

                <Text style={{ width: "40%", border: "0.5px solid black", padding: "15px 0px", textAlign: "center" }}>{row.dcItemRemarks}</Text>
            </View>
        ));


    };


    const Footer = ((data) => {
        console.log(data)
        return(
            <View style = { styles.footer } >
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: "70%", borderRight: "1px solid black" }}>
                        <Text style={{ margin: "5px" }}>Name and Signature of the person to whom the goods were delivered for {'\n'} Transporting with status of the person signing.</Text>
                        <Text style={{ margin: "45px 0px 5px 0px", fontSize: 10 }}> <Text style={{ fontWeight: 800 }}>Date</Text> : </Text>
                        <Text style={{ position: "absolute", margin: "80px 0px 5px 0px", fontSize: 6 }}> <Text style={{ fontWeight: 800 }}>Format Number : </Text>{data.value.fDc.frNo}</Text>
                        <Text style={{ position: "absolute", margin: "80px 0px 5px 100px", fontSize: 6 }}> <Text style={{ fontWeight: 800 }}>Ammendment No.</Text> : {data.value.fDc.amNo}</Text>
                        <Text style={{ position: "absolute", margin: "80px 0px 5px 200px", fontSize: 6 }}> <Text style={{ fontWeight: 800 }}>Ammendment Date.</Text> : {data.value.fDc.amDate}</Text>
                    </View>
                    <View >
                        <Text style={{ margin: "5px", fontFamily: 'Open Sans', fontSize: 10, fontWeight: 800 }}>For {selectedRows.dcPartyName}</Text>
                        <Text style={{ margin: "45px 0px 5px 45px", fontSize: 9 }}>Authorised Signature</Text>
                    </View>
                </View>
    
    
            </View >)
    })

      
    


return (

    <Dialog keepMounted fullScreen open={dcPrintOpen} sx={{ height: '100vh', width: '100vw' }}
        onClose={(e, reason) => {
            console.log(reason)
            if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                setDcPrintOpen(false)
            }
        }}>
        <DialogTitle align='center' sx={{ backgroundColor: "#323639", color: "white", height: "40px" }}>DC Print Preview</DialogTitle>
        <IconButton
            aria-label="close"
            onClick={() => setDcPrintOpen(false)}

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
                    <Text style={{ padding: "10px", textAlign: "center", textDecoration: "underline" }}>Delivery Challan</Text>
                    <View style={{ border: "1px solid black", width: "100%", height: "95%" }}>

                        <Text style={{ textAlign: "center", padding: "5px 0px 5px 0px", fontSize: "14px" }}>{selectedRows.dcPartyName}</Text>
                        <Text style={{ textAlign: "center", padding: "0px 0px 5px 0px", fontSize: "10px" }}>{selectedRows.dcPartyAddress}</Text>
                        <Text style={{ textAlign: "center", padding: "0px 0px 5px 0px", fontSize: "10px", borderBottom: "1px solid black" }}>Phone and Address</Text>
                        <View style={{ display: "flex", flexDirection: "row", padding: 0 }}>
                            <View style={{ width: "73%", padding: "5px 0px 5px 5px", borderRight: "1px solid black", margin: 0 }}>
                                <Text>To:</Text>
                                <Text>&nbsp;&nbsp;&nbsp;{selectedRows.dcPartyAddress}</Text>
                            </View>
                            <View style={{ width: "27%", padding: "5px 0px 5px 5px", margin: 0 }}>
                                <Text >DC No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {selectedRows.dcNo}</Text>
                                <Text >DC Date&nbsp;&nbsp;: {dayjs(selectedRows.dcDate).format('DD-MM-YYYY')}</Text>
                                <Text >Narration&nbsp;: {selectedRows.dcReason}</Text>
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

export default DcPrint