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
    <div
      ref={ref}
      style={{
        padding: '30px',
        border: '3px solid black',
        '@page': {
          margin: '30px', // Set margin for all sides
        },
      }}
    >
      <h2>Data from API</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {apiData.map((item) => (
            <tr key={item.id}>
              <td style={{ border: '0.5px solid black', padding: '5px' }}>
                {item.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default FileViewer;
