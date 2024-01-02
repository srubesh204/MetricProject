import React, { useState } from 'react'
import styled from '@emotion/styled';
import { CloudDownload, CloudUpload } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import axios from 'axios';




const RubeshTest = () => {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        setFile(selectedFile);
    };

    const [isLoading, setIsLoading] = useState(false)

    const handleUpload = async () => {
        try {
          if (!file) {
            setUploadStatus('No file selected');
            return;
          }
    
          const formData = new FormData();
          formData.append('file', file);
          setIsLoading(true)
          const response = await axios.post(`${process.env.REACT_APP_PORT}/test/uploadTestData`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
          setUploadStatus(response.data.message || 'Excel file uploaded successfully');
        } catch (error) {
          if (error.response) {
            setUploadStatus(`Error: ${error.response.data.error || 'Something went wrong'}`);
          } else if (error.request) {
            setUploadStatus('Network error. Please try again.');
          } else {
            setUploadStatus('Error uploading the file.');
          }
          console.error('Error uploading Excel file:', error);
        }finally{
          setIsLoading(false)
        }
      };


    return (
        <div>

            <h1 className='text-center'>
                Excel Upload and download

            </h1>
            <div className='w-100 d-flex justify-content-center p-5'>
                <div>
                    <ButtonGroup className='me-3'>
                    <Button loadin component="label"  variant="contained" >
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
                    </Button>
                    <Button onClick={handleUpload}><CloudUpload /></Button>
                    </ButtonGroup>

                    <ButtonGroup>
                    <Button component="label" variant="contained" color='secondary'>
                        Download File
                        <VisuallyHiddenInput type="file" />
                    </Button>
                    <Button color='secondary'><CloudDownload /></Button>
                    </ButtonGroup>
                    {uploadStatus && <p>{uploadStatus}</p>} 
                </div>
            </div>
        </div>
    )
}

export default RubeshTest