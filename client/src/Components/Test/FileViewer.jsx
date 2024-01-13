import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const FileViewer = () => {
  const componentRef = useRef();
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print this out!</button>
      <ComponentToPrint ref={componentRef} apiData={apiData} />
    </div>
  );
};

const ComponentToPrint = React.forwardRef(({ apiData }, ref) => {
  return (
    <div ref={ref}>
      <h2>Data from API</h2>
      <table>
        <tbody>
          
        {apiData.map((item) => (
          <tr>
          <td style={{border: "0.5px solid black", }}>
          <li key={item.id}>{item.name}</li>
          </td></tr>
        ))}
          
        </tbody>
      </table>
      <ul>
      </ul>
    </div>
  );
});

export default FileViewer;
