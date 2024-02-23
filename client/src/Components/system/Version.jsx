import React, { useState, useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import axios from 'axios';

const Version = () => {
  const [versionDatas, setVersionDatas] = useState([]);

  const versionFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PORT}/version/getAllVersion`
      );
      setVersionDatas(response.data.result);
      console.log(response.data.result);
    } catch (err) {
      console.error(err);
    }
  };

  const [versionData, setVersionData] = useState({
    versionNo: "",
    versionRelDate: "",
    lastVersion: "",
    versionChange: "",
    additionFeatures: "",

  })
  const handleInputChange = (e, sub) => {
    const { name, value } = e.target
    setVersionDatas((prev) => (
      {
        ...prev, [sub]: {
          ...prev[sub], [name]: value
        }
      }
    ))
  };




  useEffect(() => {
    versionFetch();
  }, []);

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <form>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              mb: 1,
            }}
            elevation={12}
          >
            <div className='row'>
              <h5 className='text-center mb-2'>Software Information</h5>
              <table className='table table-sm table table-bordered table-responsive align-middle' >
                <tbody>

                  <tr>
                    <th>Name</th>
                      <td>
                        CMS Desk
                        {/* <input type="text" className='form-control form-control-sm' id="certificatePrefixId" name="certificatePrefix" value="CalSoft" /> */}
                      </td>
                  </tr>
                  <tr>
                    <th>Version</th>
                  
                      <td>
                        {versionDatas?.[0]?.versionNo}
                        {/* <input type="text" className='form-control form-control-sm' id="versionNoId" name="versionNo" onChange={handleInputChange} value={versionDatas?.[0]?.versionNo} /> */}
                      </td>
                  
                  </tr>
                  <tr>
                    <th>Released Date</th>
                  
                      <td>
                        {versionDatas?.[0]?.versionRelDate}
                        {/* <input type="text" className='form-control form-control-sm' id="versionRelDateId" name="versionRelDate" onChange={handleInputChange} value={versionDatas?.[0]?.versionRelDate} /> */}
                      </td>
                  
                  </tr>
                  <tr>
                    <th>Current Released Version</th>
                 
                      <td>
                        {versionDatas?.[0]?.lastVersion}
                        {/* <input type="text" className='form-control form-control-sm' id="lastVersionId" name="lastVersion" onChange={handleInputChange} value={versionDatas?.[0]?.lastVersion} /> */}
                      </td>
                 
                  </tr>
                  <tr>
                    <th>Developed By</th>
               
                      <td>
                        {versionDatas?.[0]?.versionChange}
                        {/* <input type="text" className='form-control form-control-sm' id="versionChangeId" name="versionChange" onChange={handleInputChange} value={versionDatas?.[0]?.versionChange} /> */}
                      </td>
                 
                  </tr>
                  {/* <tr>
                                    <th>Added Features</th>
                                    <tr>
                                        <td><input type="text" className='form-control form-control-sm' id="additionFeaturesId" name="additionFeatures" onChange={handleInputChange} value={versionDatas?.[0]?.additionFeatures} /></td>
                                    </tr>
                                </tr> */}




                </tbody>
              </table>
            </div>
          </Paper>
        </form>
      </Container>
    </div>
  );
}

export default Version;
