import { Link } from '@mui/material';
import axios from 'axios';
import React, { useState, useRef } from 'react';

const FileViewer = () => {
    const [iframeURL, setIframeURL] = useState(null);
    const fileInputRef = useRef(null);
    const [uploadProgress, setUploadProgress] = useState(0)

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log(selectedFile)
            const fileURL = URL.createObjectURL(selectedFile);
            setIframeURL({fileURL: fileURL, fileName: selectedFile.name, file: selectedFile});
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            const fileURL = URL.createObjectURL(droppedFile);
            setIframeURL({fileURL: fileURL, fileName: droppedFile.name, file: droppedFile});
        }
    };
    console.log(iframeURL)
    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', iframeURL.file);

        try {
            axios.post("http://localhost:3001/upload/VendorCertificateUpload", formData, {
                onUploadProgress: (progressEvent) => {
                  const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  setUploadProgress(percentCompleted);
                }
              })
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.error(error);
                // handle error here
              });
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="file"
                    accept=".pdf" // Specify the accepted file types
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}

                />
                <button style={{ display: "none" }} onClick={() => fileInputRef.current.click()}>Select File</button>
            </div>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()} // Click the hidden file input
                style={{
                    width: '100%',
                    height: '100px',
                    border: '2px dashed #ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer', // Change cursor on hover to indicate clickability
                }}
            >
                {!iframeURL && 
                    <p>
                        Drag and drop a file here or click the area to select a file.
                    </p>
                }
            </div>

            {iframeURL && <div>
                        <Link target="_blank" href={`${process.env.REACT_APP_PORT}/vendorCertificates/${iframeURL.fileName}`} underline="hover">
                            {iframeURL.fileName}
                        </Link>
                    </div>}
            <button onClick={handleFileUpload} className='btn btn-warning mt-3 text-center'>
                    Upload
            </button>
        </div>
    );
};

export default FileViewer;
