import React, { useState } from 'react'
import styled from '@emotion/styled';
import { CloudDownload, CloudUpload } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import axios from 'axios';
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';



const RubeshTest = () => {

  const MyDocument = () => (
    <Document>
      <Page size="A4">
        <Text>Sample PDF Content</Text>
        {/* You can add more components and text here */}
      </Page>
    </Document>
  );

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <PDFViewer width="100%" height="100%">
        <MyDocument />
      </PDFViewer>
    </div>
  );
}

export default RubeshTest