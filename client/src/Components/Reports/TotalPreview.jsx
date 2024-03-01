import React, { useContext, useRef, useEffect } from 'react';
import { TotalListContent } from './TotalList';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';
import './css/totalPreview.css'

const TotalPreview = () => {
  const totalPreviewData = useContext(TotalListContent)
  const { totalPreviewOpen, setTotalPreviewOpen, filteredItemListData, formatNoData, itemList, partDataList, companyList, plantList } = totalPreviewData
  const componentRef = useRef();




  

  useEffect(() => {
    console.log('Format No Data:', formatNoData.fTotalList?.frNo);
  }, [formatNoData]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,

    pageStyle:`
    @page {
      size: landscape;
      margin: 1cm;
    },
    landscapeOrientation: {
      '@media print': {
        '@page': {
          size: 'landscape',
          margin: '1cm',
          border: '1px solid black',
        },
      },
    },
    pageHeader: {
      height: '198px',
      position: 'fixed',
      top: '0mm',
      width: '100%',

    },
    pageHeaderSpace: {
      height: '198px',
    },
    pageFooter: {

      position: 'fixed',
      bottom: '0',
      width: '100%',

    },
    pageFooterSpace: {
      height: '115px',
    },
    page: {
      pageBreakAfter: 'always',
    },
    pageMargin: {
      margin: '1cm',
    },
    printMedia: {
      '@media print': {
        thead: {
          display: 'table-header-group',
        },
        tfoot: {
          display: 'table-footer-group',
        },
        body: {
          margin: '0',
        },
      },
    }`,

    onAfterPrint: () => setTotalPreviewOpen(false)
  });

  if (totalPreviewOpen) {
    handlePrint();
  }

  const styles = {
    page: {
      size: 'landscape',
      margin: '1cm',
      border: '1px solid black',
    },
    landscapeOrientation: {
      '@media print': {
        '@page': {
          size: 'landscape',
          margin: '1cm',
          border: '1px solid black',
         
        },
      },
    },
    pageHeader: {
      height: '100%',
      position: 'fixed',
      top: '0mm',
      width: '100%',
    },
    pageHeaderSpace: {
      height: '198px',
    },
    pageFooter: {

      position: 'fixed',
      bottom: '0',
      width: '100%',

    },
    pageFooterSpace: {
      height: '115px',
    },
    
    page: {
      pageBreakAfter: 'always',
      margin: '1cm'
    },
    pageMargin: {
      margin: '1cm',
    },
    printMedia: {
      '@media print': {
        thead: {
          display: 'table-header-group',
        },
        tfoot: {
          display: 'table-footer-group',
        },
        body: {
          margin: '0',
        },
      },
    },

  }
  

  return (
    <div style={{ display: 'none', fontSize: "10px"}} className='border border-secondary'>
      
       <div style={{ border: '0.5px solid black',borderBottom: '0.5px solid black' }}>
      <div ref={componentRef}>
        <div className='pageHeader' >
          {/* <h6 className="text-center text-decoration-underline">Master List of Gauges / Instruments List</h6> */}
          <div style={{ padding: "30px", textAlign: "center", textDecoration: "underline" }}> Master List of Gauges /Instruments</div>
        </div>
        <table className="table table-sm table-borderless m-0 p-0">
          <tbody>
            <tr>
              <td >
                {/* style={{ height: '100%', }} */}
                <table className="table table-borderless table-sm" style={{height: '100%'}} >
                  <tbody>
                    <tr>
                    {filteredItemListData.itemPlant || " " && <td className="text-start mb-5">{companyList.companyName}</td>}
                    </tr>
                    <tr>
                       {/* <td className="text-start">{companyList.companyAddress}  </td>   */}
                      <td className="text-">{filteredItemListData[0]?.itemPlant}  </td>
                       {/* {plantList[0]?.plantAddress} */}
                    </tr>
                  </tbody>
                </table>
              </td>
              <td width="20%" className="text-end">
                <img src={`${process.env.REACT_APP_PORT}/logo/${companyList.companyLogo}`} width="90px" height="90px" />
              </td>
            </tr>
            <tr style={{ padding: 0, margin: 0 }}>
              <td colSpan="2" style={{ padding: 0, margin: 0 }}>
                <table style={{ width: '100%', height: '100%', margin: 0, padding: 0, border: "1px solid black" }} className="table table-sm table-bordered text-center">
                  <tbody>
                    <tr style={{ margin: 0, padding: 0 }}>
                      <th style={{ width: '3%', border: '0.5px solid black', fontSize: '10px', }} >Sr No</th>
                      <th style={{ width: '10%', border: '0.5px solid black', fontSize: '10px', }}>IMTE No</th>
                      <th style={{ width: '10%', border: '0.5px solid black', fontSize: '10px', }}>Description</th>
                      <th style={{ width: '9%', border: '0.5px solid black', fontSize: '10px', }}>Range/Size</th>
                      <th style={{ width: '4%', border: '0.5px solid black', fontSize: '10px', }}>ItemLC</th>
                      <th style={{ width: '4%', border: '0.5px solid black', fontSize: '10px', }}>Make</th>
                      <th style={{ width: '5%', border: '0.5px solid black', fontSize: '10px', }}>Cal Date</th>
                      <th style={{ width: '5%', border: '0.5px solid black', fontSize: '10px', }}>Due Date</th>
                      <th style={{ width: '4%', border: '0.5px solid black', fontSize: '10px', }}>Frequency</th>
                      <th style={{ width: '15%', border: '0.5px solid black', fontSize: '10px', }}>Current location</th>
                      <th style={{ width: '4%', border: '0.5px solid black', fontSize: '10px', }}>Callibration Source</th>
                      <th style={{ width: '5%', border: '0.5px solid black', fontSize: '10px', }}>itemMFRNo</th>
                      <th style={{ width: '8%', border: '0.5px solid black', fontSize: '10px', }}>Part No</th>
                    </tr>
                    {filteredItemListData.map((item, index) => (
                      <tr style={{ margin: 0, padding: 0 }} key={index}>
                        <td style={{ width: '3%', border: '0.5px solid black', fontSize: '10px', }} >{index + 1}</td>
                        <td style={{ width: '10%', border: '0.5px solid black', fontSize: '10px', }} >{item.itemIMTENo}</td>
                        <td style={{ width: '10%', border: '0.5px solid black', fontSize: '10px', }} >{item.itemAddMasterName}</td>
                        <td style={{ width: '9%', border: '0.5px solid black', fontSize: '10px', }} >{item.itemRangeSize + " " + item.itemRangeSizeUnit}</td>
                        <td style={{ width: '4%', border: '0.5px solid black', fontSize: '10px', }} >{item.itemLC || " -"}</td>
                        <td style={{ width: '4%', border: '0.5px solid black', fontSize: '10px', }} >{item.itemMake || " -"}</td>
                        <td style={{ width: '7%', border: '0.5px solid black', fontSize: '10px', }}>{dayjs(item.itemCalDate).format("DD-MM-YYYY")}</td>
                        <td style={{ width: '7%', border: '0.5px solid black', fontSize: '10px', }}>{dayjs(item.itemDueDate).format("DD-MM-YYYY")}</td>
                        <td style={{ width: '4%', border: '0.5px solid black', fontSize: '10px', }}>{item.itemCalFreInMonths + " " + item.itemCalFrequencyType}</td>
                        <td style={{ width: '15%', border: '0.5px solid black', fontSize: '10px', }}>{item.itemCurrentLocation}</td>
                        <td style={{ width: '4%', border: '0.5px solid black', fontSize: '10px', }}>{item.itemCalibrationSource}</td>
                        <td style={{ width: '5%', border: '0.5px solid black', fontSize: '10px', }}>{item.itemMFRNo || " -"}</td>
                        <td style={{ width: '8%', border: '0.5px solid black', fontSize: '10px', }}>{item.itemPartName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={styles.pageFooter}>
          {/* <tfoot> {pageFooter({ value: formatNoData })}</tfoot> */}

          <div style={{ fontSize: 'xx-small', margin: 0, padding: 0 }}   >{formatNoData.fTotalList ? ("Format Number : " + formatNoData.fTotalList.frNo + " " + " Rev.No : " + formatNoData.fTotalList.amNo + " " + " Rev.Date : " + formatNoData.fTotalList.amDate) : ""}</div>
        </div>
      </div>




      </div>
    </div>






  )
}

export default TotalPreview