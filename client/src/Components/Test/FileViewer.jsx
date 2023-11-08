import { Link } from '@mui/material';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const FileViewer = () => {
    const [vendorDataList, setVendorDataList] = useState([])
    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data.result);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);
    console.log(vendorDataList)
    const [selectedRowIds, setSelectedRowIds] = useState([]);

    const handleDelete = async () => {
        try {
          const response = await axios.delete("http://localhost:3001/vendor/deleteVendor", {
            data: { vendorIds: selectedRowIds },
          });
          console.log(response)
    
          if (response.status === 202) {
            console.log('Vendors deleted successfully', response.data.results);
            // Perform any necessary UI updates after successful deletion
            vendorFetchData();
          } else {
            console.error('Error deleting vendors:', response.data);
            // Handle the error or show an error message
          }
        } catch (error) {
          console.error('API request error:', error);
          // Handle any network or request errors
        }
      };

    const columns = [

        { field: 'vendorCode', headerName: 'VendorCode', width: 130 },
        { field: 'aliasName', headerName: 'Alias Name', width: 130 },
        {
          field: 'fullName',
          headerName: 'Full Name',
          width: 90,
        },
        {
          field: 'address',
          headerName: 'Address',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
        },
      ];
      
      console.log(selectedRowIds)


    return (
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={vendorDataList}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowSelectionModelChange={(newRowSelectionModel) => {
            setSelectedRowIds(newRowSelectionModel);
          }}
          
        checkboxSelection
        

      />
      <button className='btn btn-danger' type='button' onClick={()=> handleDelete()}>Delete</button>
    </div>
    );
};

export default FileViewer;
