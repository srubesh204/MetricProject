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

    pageStyle: `
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


  return (
    <div style={{ display: 'none', fontSize: "10px" }} className='border border-secondary'>
      <div style={{ border: '0.5px solid black', borderBottom: '0.5px solid black' }}>
        <div ref={componentRef}>
          <div className='pageHeader'>
            <table className='table table-borderless text-center align-middle'> 
              <tbody>
                <tr>
                  <td width="20%" style={{fontSize: "12px", textAlign: "start"}}>{companyList.companyName}<br />{filteredItemListData[0]?.itemPlant}
                  </td>
                  <td className='text-center' style={{textDecoration: "underline"}}>Master List of Gauges /Instruments</td>
                  <td width="10%" className='text-end'> 
                    <img src={`${process.env.REACT_APP_PORT}/logo/${companyList.companyLogo}`} width="90px" height="90px" />
                  </td>
                </tr>   
              </tbody>
            </table>
          </div>
          <table className="table table-sm table-borderless m-0 p-0 align-middle text-center">
            <thead>
              <tr>
                <td> 
                  <div class="pageHeaderSpace"></div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr style={{ margin: 0, padding: 0 }}>
                <th style={{ width: '3%', border: '0.5px solid black', fontSize: '10px', }} >SrNo</th>
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
                  <td style={{ width: '10%', border: '0.5px solid black', fontSize: '10px', }} >{item.itemIMTENo ? item.itemIMTENo : "-"}</td>
                  <td style={{ width: '10%', border: '0.5px solid black', fontSize: '10px', }} >{item.itemAddMasterName ? item.itemAddMasterName : "-"}</td>
                  <td style={{ width: '9%', border: '0.5px solid black', fontSize: '10px', }} >{(item.itemRangeSize ? item.itemRangeSize : "-") + " " + (item.itemRangeSizeUnit ? item.itemRangeSizeUnit : "")}</td>
                  <td style={{ width: '4%', border: '0.5px solid black', fontSize: '10px', }} >{item.itemLC ? item.itemLC : "-"}</td>
                  <td style={{ width: '4%', border: '0.5px solid black', fontSize: '10px', }} >{item.itemMake ? item.itemMake : "-"}</td>
                  <td style={{ width: '7%', border: '0.5px solid black', fontSize: '10px', }}>{item.itemCalDate ? dayjs(item.itemCalDate).format("DD-MM-YYYY") : "-"}</td>
                  <td style={{ width: '7%', border: '0.5px solid black', fontSize: '10px', }}>{item.itemDueDate ? dayjs(item.itemDueDate).format("DD-MM-YYYY") : "-"}</td>
                  <td style={{ width: '4%', border: '0.5px solid black', fontSize: '10px', }}>{(item.itemCalFreInMonths ? item.itemCalFreInMonths : "-") + " " + (item.itemCalFreInMonths ? item.itemCalFreInMonths : "")}</td>
                  <td style={{ width: '15%', border: '0.5px solid black', fontSize: '10px', }}>{item.itemCurrentLocation ? item.itemCurrentLocation : "-"}</td>
                  <td style={{ width: '4%', border: '0.5px solid black', fontSize: '10px', }}>{item.itemCalibrationSource ? item.itemCalibrationSource : "-"}</td>
                  <td style={{ width: '5%', border: '0.5px solid black', fontSize: '10px', }}>{item.itemMFRNo ? item.itemMFRNo : "-"}</td>
                  <td style={{ width: '8%', border: '0.5px solid black', fontSize: '10px', }}>{item.itemPartName ? item.itemPartName : "-"}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <div class="pageFooterSpace"></div>
                </td>
              </tr>
            </tfoot> 
          </table>
          <div class="pageFooter" style={{fontSize: "8px"}}> 
            {formatNoData.fTotalList ? ("Format Number : " + formatNoData.fTotalList.frNo + " " + " Rev.No : " + formatNoData.fTotalList.amNo + " " + " Rev.Date : " + formatNoData.fTotalList.amDate) : ""}
          </div>
        </div>

      </div>
    </div>




  )
}

export default TotalPreview