import styled from '@emotion/styled';
import { CloudUpload, Edit } from '@mui/icons-material';
import { Button, ButtonGroup } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import dayjs from 'dayjs';

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

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

  const [itemList, setItemList] = useState([]);

  const itemFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/test/getAllTest`
      );

      setItemList(response.data.result);


    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    itemFetch();
  }, []);


  const [file, setFile] = useState(null);
  const [itemAddExcelStatus, setItemAddExcelStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleItemAddExcel = (e) => {
    const selectedFile = e.target.files[0];

    setFile(selectedFile);
  };
  console.log(file)


  const handleItemAddUpload = async () => {
    try {
      if (!file) {
        setItemAddExcelStatus('No file selected');
        return;
      }

      setIsLoading(true); // Set loading state to true

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${process.env.REACT_APP_PORT}/test/uploadItemAddInExcel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });
      console.log("Uploaded Successfully")
      itemFetch();
      setItemAddExcelStatus(response.data.message || 'Excel file uploaded successfully');
    } catch (error) {
      // Handle error as before
    } finally {
      setIsLoading(false); // Set loading state to false, whether upload is successful or not
      setUploadProgress(0); // Reset the progress after upload completion
    }
  };

  const columns = [
  
    { field: 'id', headerName: 'Si. No', width: 60, renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, headerAlign: "center", align: "center" },
    { field: 'itemIMTENo', headerName: 'IMTE No', width: 100, headerAlign: "center", align: "center" },
    { field: 'itemAddMasterName', headerName: 'Description', width: 120, headerAlign: "center", align: "center" },
    {
      field: 'Range/Size',
      headerName: 'Range/Size',
      headerAlign: "center", align: "center",
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 130,
      valueGetter: (params) =>
        `${params.row.itemRangeSize || ''} ${params.row.itemLCUnit || ''}`,
    },
    { field: 'itemMake', headerName: 'Make', width: 90, headerAlign: "center", align: "center", },
    { field: 'itemCalDate', headerName: 'Cal Date', width: 100, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemCalDate).format('DD-MM-YYYY') },
    { field: 'itemDueDate', headerName: 'Due Date', width: 110, headerAlign: "center", align: "center", valueGetter: (params) => dayjs(params.row.itemDueDate).format('DD-MM-YYYY') },
    { field: 'itemLC', headerName: 'ItemLC', width: 60, headerAlign: "center", align: "center", valueGetter: (params) => params.row.itemLC || "-" },
    { field: 'itemCalFreInMonths', headerName: 'Frequency', type: "number", width: 100, headerAlign: "center", align: "center" },
    { field: 'itemCalibratedAt', headerName: 'Cal Done At ', width: 100, headerAlign: "center", align: "center" },
    { field: 'itemStatus', headerName: 'Status ', width: 80, headerAlign: "center", align: "center", },
    { field: 'itemDepartment', headerName: 'Current location', width: 120, headerAlign: "center", align: "center", },
    { field: 'itemCalibrationSource', headerName: 'Cal Source', width: 120, headerAlign: "center", align: "center", },
    // { field: 'itemCalibrationSource', headerName: 'Cal Source', renderCell: (params) => params.row.itemSupplier.toString(), width: 110, headerAlign: "center", align: "center", },
    {
      field: 'itemType',
      headerName: 'Type',
      width: 180,
      headerAlign: "center", align: "center",
      renderCell: (params) => {
        const itemType = params.row.itemType.toString();
        return itemType.charAt(0).toUpperCase() + itemType.slice(1).toLowerCase();
      },
    }

  ];




  return (
    <div className='text-center p-3 h-50'>
      {isLoading && <div>Loading... {uploadProgress}%</div>}

      <ButtonGroup className='me-3'>
        <Button component="label" size='small' variant="contained" >
          Upload
          <VisuallyHiddenInput type="file" onChange={handleItemAddExcel} />
        </Button>
        <Button size='small' onClick={handleItemAddUpload}><CloudUpload /></Button>
      </ButtonGroup>

      {itemAddExcelStatus && <p style={{ color: 'green' }}>{itemAddExcelStatus}</p>}



      <DataGrid

        rows={itemList}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        sx={{
          ".MuiTablePagination-displayedRows": {

            "marginTop": "1em",
            "marginBottom": "1em"
          }
        }}
        // onRowSelectionModelChange={(newRowSelectionModel, event) => {
        //   setItemListSelectedRowIds(newRowSelectionModel);


        // }}

        slots={{
          toolbar: GridToolbar,
        }}

        density="compact"
        //disableColumnMenu={true}

        checkboxSelection
        // onRowClick={handleRowClick}
        disableRowSelectionOnClick
        pageSizeOptions={[15]}
      />
    </div>
  )
}

export default RubeshTest