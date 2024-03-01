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
    `,

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
            <table className='table table-sm table-borderless text-center align-middle mb-0 pb-0'>
              <tbody>
                <tr>
                  <td width="20%" style={{ fontSize: "12px", textAlign: "start" }}>{companyList.companyName}<br />{filteredItemListData[0]?.itemPlant}
                  </td>
                  <td className='text-center' style={{ textDecoration: "underline" }}>Master List of Gauges /Instruments</td>
                  <td width="10%" className='text-end'>
                    <img src={`${process.env.REACT_APP_PORT}/logo/${companyList.companyLogo}`} width="90px" height="90px" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <table className="table table-sm table-bordered border border-secondary m-0 p-0 align-middle text-center">
            <thead>
              <tr>
                <td>
                  <div class="pageHeaderSpace"></div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr style={{fontSize: '10px'}}>
                <th style={{ width: "3%" }}>SrNo</th>
                <th style={{ width: "3%" }} >IMTE No</th>
                <th>Description</th>
                <th style={{ width: "70px" }}>Range/Size</th>
                <th>LC</th>
                <th>Make</th>
                <th>MFRNo</th>
                <th style={{ width: "60px" }}>CalSource</th>
                <th style={{ width: "65px" }}>Cal Frequency</th>
                <th style={{ width: "10%" }}>Current Location</th>
               
               
                <th>Part No</th>
                <th style={{ width: "65px" }}>Cal Date</th>
                <th style={{ width: "65px" }}>Due Date</th>
              </tr>
              {filteredItemListData.map((item, index) => (
                <tr style={{ margin: 0, padding: 0, fontSize: '10px' }} key={index}>
                  <td style={{ width: "3%" }}>{index + 1}</td>
                  <td style={{ width: "3%" }}>{item.itemIMTENo ? item.itemIMTENo : "-"}</td>
                  <td>{item.itemAddMasterName ? item.itemAddMasterName : "-"}</td>
                  <td style={{ width: "70px" }}>{(item.itemRangeSize ? item.itemRangeSize : "-") + " " + (item.itemRangeSizeUnit ? item.itemRangeSizeUnit : "")}</td>
                  <td>{(item.itemLC ? item.itemLC : "-") + " " + (item.itemLCUnit ? item.itemLCUnit : "")}</td>


                  <td>{item.itemMake ? item.itemMake : "-"}</td>
                  <td>{item.itemMFRNo ? item.itemMFRNo : "-"}</td>
                  <td style={{ width: "60px" }}>{item.itemCalibrationSource ? item.itemCalibrationSource : "-"}</td>
                  <td style={{ width: "65px" }}>{(item.itemCalFreInMonths ? item.itemCalFreInMonths : "-") + " " + (item.itemCalFrequencyType ? item.itemCalFrequencyType : "")}</td>
                  <td style={{ width: "10%" }} >{item.itemCurrentLocation ? item.itemCurrentLocation : "-"}</td>
                  <td>{item.itemPartName ? item.itemPartName : "-"}</td>
                  <td style={{ width: "65px" }}>{item.itemCalDate ? dayjs(item.itemCalDate).format("DD-MM-YYYY") : "-"}</td>
                  <td style={{ width: "65px" }}>{item.itemDueDate ? dayjs(item.itemDueDate).format("DD-MM-YYYY") : "-"}</td>
                </tr>
              ))}
            </tbody>
            <tfoot style={{ border: "1px solid white" }}>
              <tr>
                <td>
                  <div class="pageFooterSpace"></div>
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="pageFooter" style={{ fontSize: "8px" }}>
            {formatNoData.fTotalList ? ("Format Number : " + formatNoData.fTotalList.frNo + " " + " Rev.No : " + formatNoData.fTotalList.amNo + " " + " Rev.Date : " + formatNoData.fTotalList.amDate) : ""}
          </div>
        </div>

      </div>
    </div>




  )
}

export default TotalPreview