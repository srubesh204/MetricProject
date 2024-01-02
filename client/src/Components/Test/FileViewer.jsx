import React, { useRef, useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const FileViewer = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [submittedData, setSubmittedData] = useState([]);
  const [apiData, setApiData] = useState([]); // New state for API data
  const tableRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const data = await response.json();
      // Update the state with the fetched data
      setApiData(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once on component mount

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const isFieldsEnabled = selectedOption === 'yes';

  const handleSubmit = () => {
    const newData = { selectedOption, name, age, email, address };
    setSubmittedData((prevData) => [...prevData, newData]);

    // Clear the form fields after submission
    setSelectedOption('');
    setName('');
    setAge('');
    setEmail('');
    setAddress('');
  };

  

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate the range of items to display based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = apiData.slice(startIndex, endIndex);

  return (
    <div>
      <h1>JSON to PDF converter</h1>

      <FormControl fullWidth>
        <InputLabel id="dropdown-label">Select an Option</InputLabel>
        <Select
          labelId="dropdown-label"
          id="dropdown"
          value={selectedOption}
          label="Select an Option"
          onChange={handleChange}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </Select>
      </FormControl>

      <React.Fragment>
        <TextField
          id="outlined-basic"
          label="Your Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={handleNameChange}
          disabled={!isFieldsEnabled}
        />

        <TextField
          id="outlined-basic"
          label="Your Age"
          variant="outlined"
          fullWidth
          margin="normal"
          value={age}
          onChange={handleAgeChange}
          disabled={!isFieldsEnabled}
        />

        <TextField
          id="outlined-basic"
          label="Your Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          disabled={!isFieldsEnabled}
        />

        <TextField
          id="outlined-basic"
          label="Your Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={handleAddressChange}
          disabled={!isFieldsEnabled}
        />
      </React.Fragment>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      {apiData.length > 0 && (
        <div>
          <TableContainer component={Paper} ref={tableRef}>
            <Table id="data-table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Post Id</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Body</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.postId}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.body}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <div>
            <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              Previous Page
            </Button>
            <span>{`Page ${currentPage}`}</span>
            <Button disabled={endIndex >= apiData.length} onClick={() => handlePageChange(currentPage + 1)}>
              Next Page
            </Button>
          </div>

          
        </div>
      )}
    </div>
  );
};

export default FileViewer;
