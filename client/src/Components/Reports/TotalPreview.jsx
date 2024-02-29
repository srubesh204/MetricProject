import React, { useContext, useRef, useEffect } from 'react';
import { TotalListContent } from './TotalList';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';

const TotalPreview = () => {
const totalPreviewData = useContext(TotalListContent)
const { totalPreviewOpen, setTotalPreviewOpen, filteredItemListData, formatNoData, itemList, partDataList, companyList, plantList } = totalPreviewData
const componentRef = useRef();




  // const data = [
  //   {
  //     "_id": "65dc847be3f05fde0943d173",
  //     "itemMasterRef": "2D Height Gauge",
  //     "selectedItemMaster": [],
  //     "itemAddMasterName": "2D Height Gauge",
  //     "itemPlant": "Vallam",
  //     "itemIMTENo": "I-DH-600-01",
  //     "itemType": "variable",
  //     "itemRangeSize": "0-600",
  //     "itemRangeSizeUnit": "mm",
  //     "itemLC": "0.0001",
  //     "itemLCUnit": "mm",
  //     "itemMake": "Tesa",
  //     "itemStatus": "active",
  //     "itemReceiptDate": "2023-12-31",
  //     "itemDepartment": "QUALITY-BJ",
  //     "itemCurrentLocation": "STANDARDS ROOM",
  //     "itemLocation": "department",
  //     "itemPlaceOfUsage": "STANDARDS ROOM",
  //     "itemCalFreInMonths": "12",
  //     "itemCalFrequencyType": "months",
  //     "itemCalAlertDays": "7",
  //     "itemCalibrationSource": "outsource",
  //     "itemCalibrationDoneAt": "Site",
  //     "itemItemMasterIMTENo": [],
  //     "itemSupplier": [],
  //     "itemOEM": [],
  //     "itemPrevCalData": "available",
  //     "itemCalDate": "2023-05-03",
  //     "itemDueDate": "2024-05-02",
  //     "itemPartName": [],
  //     "acceptanceCriteria": [
  //       {
  //         "acParameter": "Instrumental Error",
  //         "acNominalSize": "600",
  //         "acNominalSizeUnit": "mm",
  //         "acMinPS": "",
  //         "acMaxPS": "",
  //         "acWearLimitPS": "",
  //         "acMinOB": "",
  //         "acMaxOB": "",
  //         "acAverageOB": "",
  //         "acOBError": "",
  //         "acMinPSError": "-0.002",
  //         "acMaxPSError": "0.003",
  //         "_id": "65dc84ede3f05fde0943f194"
  //       }
  //     ],
  //     "createdAt": "2024-02-26",
  //     "updatedAt": "2024-02-26",
  //     "itemId": 24039,
  //     "__v": 0,
  //     "itemCreatedBy": "65d0873676ec9e675fa05ad7",
  //     "itemImage": "",
  //     "itemLastModifiedBy": "65d0873676ec9e675fa05ad7"
  //   },
  //   {
  //     "_id": "65dda5aa1659469d970afe05",
  //     "selectedItemMaster": [],
  //     "isItemMaster": "1",
  //     "itemAddMasterName": "2D Height Gauge",
  //     "itemPlant": "Vallam",
  //     "itemIMTENo": "P-01",
  //     "itemSAPNo": "12",
  //     "itemImage": "",
  //     "itemType": "variable",
  //     "itemRangeSize": "12.5",
  //     "itemRangeSizeUnit": "mm",
  //     "itemMFRNo": "12",
  //     "itemLC": "63",
  //     "itemLCUnit": "kW",
  //     "itemMake": "Baker",
  //     "itemModelNo": "12",
  //     "itemStatus": "spare",
  //     "itemReceiptDate": "2024-02-27",
  //     "itemDepartment": "QUALITY-BJ",
  //     "itemCurrentLocation": "QUALITY-BJ",
  //     "itemLocation": "department",
  //     "itemArea": "N/A",
  //     "itemPlaceOfUsage": "STUF SHAFT-M/C",
  //     "itemCalFreInMonths": "12",
  //     "itemCalFrequencyType": "months",
  //     "itemCalAlertDays": "7",
  //     "itemCalibrationSource": "outsource",
  //     "itemCalibrationDoneAt": "Lab",
  //     "itemItemMasterName": "",
  //     "itemItemMasterIMTENo": [],
  //     "itemSupplier": [
  //       "Hitech India Equipments Pvt Ltd"
  //     ],
  //     "itemOEM": [],
  //     "itemUncertainity": "",
  //     "itemUncertainityUnit": "",
  //     "itemPrevCalData": "",
  //     "itemCalDate": "2024-02-27",
  //     "itemDueDate": "2025-02-26",
  //     "itemCalibratedAt": "",
  //     "itemCertificateName": "",
  //     "itemCertificateNo": "",
  //     "itemPartName": [],
  //     "itemOBType": "average",
  //     "acceptanceCriteria": [
  //       {
  //         "_id": "65dda5aa1659469d970afe06"
  //       }
  //     ],
  //     "itemCreatedBy": "65b47ef683e35ae7d593f376",
  //     "calibrationCost": "",
  //     "gaugeUsage": "",
  //     "lifealertDays": "",
  //     "purchaseRefNo": "",
  //     "purchaseDate": "",
  //     "purchaseCost": "",
  //     "specialRemark": "",
  //     "drawingIssueNo": "",
  //     "drawingNo": "",
  //     "rdName": "",
  //     "msaName": "",
  //     "otherFile": "",
  //     "plantAccess": [
  //       "Vallam"
  //     ],
  //     "createdAt": "2024-02-27",
  //     "updatedAt": "2024-02-27",
  //     "itemId": 24756,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "65dc847be3f05fde0943d16f",
  //     "itemMasterRef": "2D Height Gauge",
  //     "selectedItemMaster": [],
  //     "isItemMaster": "1",
  //     "itemAddMasterName": "2D Height Gauge",
  //     "itemPlant": "Vallam",
  //     "itemIMTENo": "UM-700-YE-112",
  //     "itemType": "variable",
  //     "itemRangeSize": "0-700",
  //     "itemRangeSizeUnit": "mm",
  //     "itemMake": "Electronica",
  //     "itemStatus": "active",
  //     "itemReceiptDate": "2023-12-31",
  //     "itemDepartment": "QUALITY-BJ",
  //     "itemCurrentLocation": "STANDARDS ROOM",
  //     "itemLocation": "department",
  //     "itemPlaceOfUsage": "STANDARDS ROOM",
  //     "itemCalFreInMonths": "12",
  //     "itemCalFrequencyType": "months",
  //     "itemCalAlertDays": "7",
  //     "itemCalibrationSource": "outsource",
  //     "itemCalibrationDoneAt": "Site",
  //     "itemItemMasterIMTENo": [],
  //     "itemSupplier": [
  //       "Electronica Mechatronic Systems (I) Pvt. Ltd."
  //     ],
  //     "itemOEM": [],
  //     "itemPrevCalData": "available",
  //     "itemCalDate": "2024-01-09",
  //     "itemDueDate": "2025-01-08",
  //     "itemCalibratedAt": "Electronica Mechatronic Systems (I) Pvt. Ltd.",
  //     "itemPartName": [],
  //     "acceptanceCriteria": [],
  //     "createdAt": "2024-02-26",
  //     "updatedAt": "2024-02-26",
  //     "itemId": 24036,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "65dd882c9fe4ecdb0083a89d",
  //     "selectedItemMaster": [],
  //     "isItemMaster": "1",
  //     "itemAddMasterName": "2D Height Gauge",
  //     "itemPlant": "Vallam",
  //     "itemIMTENo": "hh-01",
  //     "itemSAPNo": "101",
  //     "itemImage": "",
  //     "itemType": "variable",
  //     "itemRangeSize": "12.5",
  //     "itemRangeSizeUnit": "Nm",
  //     "itemMFRNo": "12",
  //     "itemLC": "56",
  //     "itemLCUnit": "kg",
  //     "itemMake": "mitutoyo",
  //     "itemModelNo": "23",
  //     "itemStatus": "active",
  //     "itemReceiptDate": "2024-02-27",
  //     "itemDepartment": "QUALITY-BJ",
  //     "itemCurrentLocation": "QUALITY-BJ",
  //     "itemLocation": "department",
  //     "itemArea": "N/A",
  //     "itemPlaceOfUsage": "ASSEMBLY-CVJ",
  //     "itemCalFreInMonths": "12",
  //     "itemCalFrequencyType": "months",
  //     "itemCalAlertDays": "7",
  //     "itemCalibrationSource": "outsource",
  //     "itemCalibrationDoneAt": "Lab",
  //     "itemItemMasterName": "",
  //     "itemItemMasterIMTENo": [],
  //     "itemSupplier": [
  //       "Hitech India Equipments Pvt Ltd"
  //     ],
  //     "itemOEM": [],
  //     "itemUncertainity": "",
  //     "itemUncertainityUnit": "",
  //     "itemPrevCalData": "",
  //     "itemCalDate": "2024-02-27",
  //     "itemDueDate": "2025-02-26",
  //     "itemCalibratedAt": "",
  //     "itemCertificateName": "",
  //     "itemCertificateNo": "12",
  //     "itemPartName": [],
  //     "itemOBType": "average",
  //     "acceptanceCriteria": [
  //       {
  //         "acParameter": "Instrumental Error",
  //         "acNominalSize": "3695",
  //         "acNominalSizeUnit": "g",
  //         "acOBError": "369",
  //         "acMinPSError": "11.2",
  //         "acMaxPSError": "13.6",
  //         "_id": "65dd882c9fe4ecdb0083a89e"
  //       }
  //     ],
  //     "itemCreatedBy": "65b47ef683e35ae7d593f376",
  //     "calibrationCost": "",
  //     "gaugeUsage": "",
  //     "lifealertDays": "",
  //     "purchaseRefNo": "",
  //     "purchaseDate": "",
  //     "purchaseCost": "",
  //     "specialRemark": "",
  //     "drawingIssueNo": "",
  //     "drawingNo": "",
  //     "rdName": "",
  //     "msaName": "",
  //     "otherFile": "",
  //     "plantAccess": [
  //       "Vallam"
  //     ],
  //     "createdAt": "2024-02-27",
  //     "updatedAt": "2024-02-27",
  //     "itemId": 24754,
  //     "__v": 0,
  //     "itemLastModifiedBy": "65b47ef683e35ae7d593f376",
  //     "itemMasterRef": "173",
  //     "itemMasterUncertainty": "",
  //     "itemMasterUncertaintyUnit": "",
  //     "itemSOPNo": "",
  //     "itemStandardRef": "",
  //     "dcCreatedOn": "",
  //     "dcId": "",
  //     "dcNo": "",
  //     "dcStatus": "0",
  //     "itemLastLocation": "QUALITY-BJ",
  //     "grnCreatedOn": "2024-02-27",
  //     "grnId": "65ddce6bab3472ac481f6e03",
  //     "grnNo": "SAF-GRN2024-05",
  //     "grnStatus": "1",
  //     "itemLastCalDate": "2024-02-27",
  //     "itemLastCertificateNo": "",
  //     "itemLastDueDate": "2025-02-26",
  //     "itemLastPlace": "department",
  //     "itemLastStatus": "active",
  //     "lastDcCreatedOn": "",
  //     "lastDcId": "",
  //     "lastDcNo": "",
  //     "lastDcStatus": "0"
  //   },
  //   {
  //     "_id": "65dc847be3f05fde0943d18e",
  //     "itemMasterRef": "Air Gauge",
  //     "selectedItemMaster": [],
  //     "itemAddMasterName": "Air Gauge",
  //     "itemPlant": "Vallam",
  //     "itemIMTENo": "1-AG-G-01",
  //     "itemType": "variable",
  //     "itemMFRNo": "VIPPGS1118",
  //     "itemLC": "0.001",
  //     "itemLCUnit": "mm",
  //     "itemStatus": "active",
  //     "itemReceiptDate": "2023-12-31",
  //     "itemDepartment": "QUALITY-BJ",
  //     "itemCurrentLocation": "QUALITY-BJ",
  //     "itemLocation": "department",
  //     "itemPlaceOfUsage": "STANDARDS ROOM",
  //     "itemCalFreInMonths": "4",
  //     "itemCalFrequencyType": "months",
  //     "itemCalAlertDays": "7",
  //     "itemCalibrationSource": "outsource",
  //     "itemCalibrationDoneAt": "Site",
  //     "itemItemMasterIMTENo": [],
  //     "itemSupplier": [],
  //     "itemOEM": [],
  //     "itemPrevCalData": "available",
  //     "itemCalDate": "2024-02-28",
  //     "itemDueDate": "2024-06-27",
  //     "itemPartName": [],
  //     "acceptanceCriteria": [],
  //     "createdAt": "2024-02-26",
  //     "updatedAt": "2024-02-26",
  //     "itemId": 24060,
  //     "__v": 0,
  //     "itemLastLocation": "Tmc",
  //     "dcCreatedOn": "",
  //     "dcId": "",
  //     "dcNo": "",
  //     "dcStatus": "0",
  //     "grnCreatedOn": "2024-02-28",
  //     "grnId": "65debe10528671241ce12eee",
  //     "grnNo": "SAF-GRN2024-08",
  //     "grnStatus": "1",
  //     "itemCertificateNo": "3",
  //     "itemLastCalDate": "2024-02-26",
  //     "itemLastDueDate": "2024-06-25",
  //     "itemLastPlace": "supplier",
  //     "itemLastStatus": "active",
  //     "lastDcCreatedOn": "2024-02-28",
  //     "lastDcId": "65debc36528671241ce12bc0",
  //     "lastDcNo": "SAF-DC2024-10",
  //     "lastDcStatus": "1",
  //     "itemLastCertificateNo": "1256"
  //   },
  //   {
  //     "_id": "65dc847be3f05fde0943d18f",
  //     "itemMasterRef": "Air Gauge",
  //     "selectedItemMaster": [],
  //     "itemAddMasterName": "Air Gauge",
  //     "itemPlant": "Vallam",
  //     "itemIMTENo": "1-AG-G-02",
  //     "itemType": "variable",
  //     "itemMFRNo": "VIPPGS2730",
  //     "itemLC": "0.001",
  //     "itemLCUnit": "mm",
  //     "itemStatus": "active",
  //     "itemReceiptDate": "2023-12-31",
  //     "itemDepartment": "QUALITY-BJ",
  //     "itemCurrentLocation": "STANDARDS ROOM",
  //     "itemLocation": "department",
  //     "itemPlaceOfUsage": "STANDARDS ROOM",
  //     "itemCalFreInMonths": "4",
  //     "itemCalFrequencyType": "months",
  //     "itemCalAlertDays": "7",
  //     "itemCalibrationSource": "outsource",
  //     "itemCalibrationDoneAt": "Site",
  //     "itemItemMasterIMTENo": [],
  //     "itemSupplier": [],
  //     "itemOEM": [],
  //     "itemPrevCalData": "available",
  //     "itemCalDate": "2023-11-07",
  //     "itemDueDate": "2024-03-07",
  //     "itemPartName": [],
  //     "acceptanceCriteria": [],
  //     "createdAt": "2024-02-26",
  //     "updatedAt": "2024-02-26",
  //     "itemId": 24068,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "65dc847be3f05fde0943d190",
  //     "itemMasterRef": "Air Gauge",
  //     "selectedItemMaster": [],
  //     "itemAddMasterName": "Air Gauge",
  //     "itemPlant": "Vallam",
  //     "itemIMTENo": "1-AG-G-03",
  //     "itemType": "variable",
  //     "itemMFRNo": "VIPPGS2993",
  //     "itemLC": "0.001",
  //     "itemLCUnit": "mm",
  //     "itemStatus": "active",
  //     "itemReceiptDate": "2023-12-31",
  //     "itemDepartment": "QUALITY-BJ",
  //     "itemCurrentLocation": "STANDARDS ROOM",
  //     "itemLocation": "department",
  //     "itemPlaceOfUsage": "STANDARDS ROOM",
  //     "itemCalFreInMonths": "4",
  //     "itemCalFrequencyType": "months",
  //     "itemCalAlertDays": "7",
  //     "itemCalibrationSource": "outsource",
  //     "itemCalibrationDoneAt": "Site",
  //     "itemItemMasterIMTENo": [],
  //     "itemSupplier": [],
  //     "itemOEM": [],
  //     "itemPrevCalData": "available",
  //     "itemCalDate": "2023-11-07",
  //     "itemDueDate": "2024-03-07",
  //     "itemPartName": [],
  //     "acceptanceCriteria": [],
  //     "createdAt": "2024-02-26",
  //     "updatedAt": "2024-02-26",
  //     "itemId": 24069,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "65dc847be3f05fde0943d191",
  //     "itemMasterRef": "Air Gauge",
  //     "selectedItemMaster": [],
  //     "itemAddMasterName": "Air Gauge",
  //     "itemPlant": "Vallam",
  //     "itemIMTENo": "1-AG-G-04",
  //     "itemType": "variable",
  //     "itemMFRNo": "VIPPGS1999",
  //     "itemLC": "0.001",
  //     "itemLCUnit": "mm",
  //     "itemStatus": "active",
  //     "itemReceiptDate": "2023-12-31",
  //     "itemDepartment": "QUALITY-BJ",
  //     "itemCurrentLocation": "STANDARDS ROOM",
  //     "itemLocation": "department",
  //     "itemPlaceOfUsage": "STANDARDS ROOM",
  //     "itemCalFreInMonths": "4",
  //     "itemCalFrequencyType": "months",
  //     "itemCalAlertDays": "7",
  //     "itemCalibrationSource": "outsource",
  //     "itemCalibrationDoneAt": "Site",
  //     "itemItemMasterIMTENo": [],
  //     "itemSupplier": [],
  //     "itemOEM": [],
  //     "itemPrevCalData": "available",
  //     "itemCalDate": "2023-11-07",
  //     "itemDueDate": "2024-03-07",
  //     "itemPartName": [],
  //     "acceptanceCriteria": [],
  //     "createdAt": "2024-02-26",
  //     "updatedAt": "2024-02-26",
  //     "itemId": 24059,
  //     "__v": 0
  //   },
  //   {
  //     "_id": "65ddc743ab3472ac481f68d4",
  //     "selectedItemMaster": [],
  //     "isItemMaster": "1",
  //     "itemAddMasterName": "Air Gauge",
  //     "itemPlant": "Vallam",
  //     "itemIMTENo": "II-01",
  //     "itemSAPNo": "12",
  //     "itemImage": "",
  //     "itemType": "variable",
  //     "itemRangeSize": "12.5",
  //     "itemRangeSizeUnit": "kW",
  //     "itemMFRNo": "",
  //     "itemLC": "56",
  //     "itemLCUnit": "mm",
  //     "itemMake": "Baker",
  //     "itemModelNo": "12",
  //     "itemStatus": "spare",
  //     "itemReceiptDate": "2024-02-27",
  //     "itemDepartment": "QUALITY-BJ",
  //     "itemCurrentLocation": "Aludyne",
  //     "itemLocation": "customer",
  //     "itemArea": "N/A",
  //     "itemPlaceOfUsage": "NON AUTO FI",
  //     "itemCalFreInMonths": "4",
  //     "itemCalFrequencyType": "months",
  //     "itemCalAlertDays": "3",
  //     "itemCalibrationSource": "outsource",
  //     "itemCalibrationDoneAt": "Lab",
  //     "itemItemMasterName": "",
  //     "itemItemMasterIMTENo": [],
  //     "itemSupplier": [
  //       "Precise Testing & Calibration"
  //     ],
  //     "itemOEM": [],
  //     "itemUncertainityUnit": "",
  //     "itemPrevCalData": "",
  //     "itemCalDate": "2024-02-27",
  //     "itemDueDate": "2024-06-26",
  //     "itemCalibratedAt": "",
  //     "itemCertificateName": "",
  //     "itemCertificateNo": "",
  //     "itemPartName": [],
  //     "itemOBType": "average",
  //     "acceptanceCriteria": [
  //       {
  //         "_id": "65ddc743ab3472ac481f68d5"
  //       }
  //     ],
  //     "itemCreatedBy": "65b47ef683e35ae7d593f376",
  //     "calibrationCost": "",
  //     "gaugeUsage": "",
  //     "lifealertDays": "",
  //     "purchaseRefNo": "",
  //     "purchaseDate": "",
  //     "purchaseCost": "",
  //     "specialRemark": "",
  //     "drawingIssueNo": "",
  //     "drawingNo": "",
  //     "rdName": "",
  //     "msaName": "",
  //     "otherFile": "",
  //     "itemSOPNo": "",
  //     "itemStandardRef": "",
  //     "plantAccess": [
  //       "Vallam"
  //     ],
  //     "createdAt": "2024-02-27",
  //     "updatedAt": "2024-02-27",
  //     "itemId": 24758,
  //     "__v": 0,
  //     "dcCreatedOn": "2024-02-28",
  //     "dcId": "65debd95528671241ce12dd5",
  //     "dcNo": "SAF-DC2024-12",
  //     "dcStatus": "1",
  //     "itemLastLocation": "QUALITY-BJ"
  //   },
  //   {
  //     "_id": "65dc87a0faeb7570f79a883d",
  //     "selectedItemMaster": [],
  //     "isItemMaster": "1",
  //     "itemAddMasterName": "Air Gauge",
  //     "itemPlant": "Vallam",
  //     "itemIMTENo": "KK-01",
  //     "itemSAPNo": "101",
  //     "itemImage": "",
  //     "itemType": "variable",
  //     "itemRangeSize": "12.5",
  //     "itemRangeSizeUnit": "mm",
  //     "itemMFRNo": "12",
  //     "itemLC": "56",
  //     "itemLCUnit": "kW",
  //     "itemMake": "",
  //     "itemModelNo": "25",
  //     "itemStatus": "active",
  //     "itemReceiptDate": "2024-02-26",
  //     "itemDepartment": "QUALITY-BJ",
  //     "itemCurrentLocation": "QUALITY-BJ",
  //     "itemLocation": "department",
  //     "itemArea": "N/A",
  //     "itemPlaceOfUsage": "OUTER RACE-M/C",
  //     "itemCalFreInMonths": "4",
  //     "itemCalFrequencyType": "months",
  //     "itemCalAlertDays": "3",
  //     "itemCalibrationSource": "inhouse",
  //     "itemCalibrationDoneAt": "Lab",
  //     "itemItemMasterName": "",
  //     "itemItemMasterIMTENo": [
  //       "UM-700-YE-112"
  //     ],
  //     "itemSupplier": [],
  //     "itemOEM": [],
  //     "itemUncertainity": "",
  //     "itemUncertainityUnit": "",
  //     "itemPrevCalData": "",
  //     "itemCalDate": "2024-02-26",
  //     "itemDueDate": "2024-06-25",
  //     "itemCalibratedAt": "inhouse",
  //     "itemCertificateName": "",
  //     "itemCertificateNo": "SAF-CAL2024-03",
  //     "itemPartName": [],
  //     "itemOBType": "average",
  //     "acceptanceCriteria": [
  //       {
  //         "acParameter": "Go",
  //         "acNominalSize": "12",
  //         "acNominalSizeUnit": "kg/cm²",
  //         "acOBError": "32",
  //         "acMinPSError": "52",
  //         "acMaxPSError": "63",
  //         "_id": "65dc87a0faeb7570f79a883e"
  //       }
  //     ],
  //     "itemCreatedBy": "65b47ef683e35ae7d593f376",
  //     "calibrationCost": "",
  //     "gaugeUsage": "",
  //     "lifealertDays": "",
  //     "purchaseRefNo": "",
  //     "purchaseDate": "",
  //     "purchaseCost": "",
  //     "specialRemark": "",
  //     "drawingIssueNo": "",
  //     "drawingNo": "",
  //     "rdName": "",
  //     "msaName": "",
  //     "otherFile": "",
  //     "createdAt": "2024-02-26",
  //     "updatedAt": "2024-02-26",
  //     "itemId": 24752,
  //     "__v": 0,
  //     "itemLastCalDate": "2024-02-26",
  //     "itemLastCertificateNo": "SAF-CAL2024-03",
  //     "itemLastDueDate": "2024-06-25",
  //     "itemLastStatus": "active"
  //   }
  // ]


  useEffect(() => {
    console.log('Format No Data:', formatNoData.fTotalList?.frNo);
}, [formatNoData]);



const handlePrint = useReactToPrint({
  content: () => componentRef.current,

    page: {
      size: 'landscape',
      margin: '1cm'
    },
    landscapeOrientation: {
      '@media print': {
        '@page': {
          size: 'landscape',
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
    },
 
       onAfterPrint: () => setTotalPreviewOpen(false)
    });

    if (totalPreviewOpen) {
      handlePrint();
  }

    const styles={
      page: {
        size: 'landscape',
        margin: '1cm'
        
      },
      landscapeOrientation: {
        '@media print': {
          '@page': {
            size: 'landscape',
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
      },

    } 
  //   const pageFooter = (data) => {
  //     return (
  //         <tr className="footer">
  //             {/* <div style={{ position: 'absolute', fontSize: '8px' }}>Format Number: {formatNoData && formatNoData.fTotalList?.frNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment No.: {formatNoData && formatNoData.fTotalList?.amNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Amendment Date.: {formatNoData && formatNoData.fTotalList?.amDate}</div> */}
  //             <div style={{ position: 'absolute', fontSize: '8px' }}>Format Number: {formatNoData && formatNoData.fTotalList?.frNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Rev. No.: {formatNoData && formatNoData.fTotalList?.amNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Rev. Date.: {formatNoData && formatNoData.fTotalList?.amDate}</div>
  //         </tr>
  //     );
  // };


  return (
    <div style={{ display: 'none',fontSize: "10px",...styles.page, ...styles.landscapeOrientation }}>
     <div ref={componentRef}>

    
      <div style={styles.pageHeader} >
        <h6 className="text-center text-decoration-underline">Master List of Gauges / Instruments List</h6>
      
      </div>
      
      <table className="table table-sm table-borderless m-0 p-0">
          <tbody>
            <tr>
              <td >
                <table className="table table-borderless table-sm" style={{ height: '50%', }} >
                  <tbody>
                    <tr>
                      <td className="text-start">{companyList.companyName}</td>
                    </tr>
                    <tr>
                    <td className="text-start">{companyList.companyAddress}</td>
                      {/* <td className="text-">{plantList[0]?.plantName}- {plantList[0]?.plantAddress} </td> */}
                      {/* <td className="text-start"></td> */}
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
                <table style={{ width: '100%', height: '100%', margin: 0, padding: 0 }} className="table table-sm table-bordered text-center">
                  <tbody>
                    <tr style={{ margin: 0, padding: 0 }}>
                      <th style={{ width: '2%', }} >Sr No</th>
                      <th style={{ width: '12%', }}>IMTE No</th>
                      <th style={{ width: '15%', }}>Description</th>
                      <th style={{ width: '5%', }}>Range/Size</th>
                      <th style={{ width: '5%', }}>ItemLC</th>
                      <th style={{ width: '5%', }}>Make</th>
                      <th style={{ width: '9%', }}>Cal Date</th>
                      <th style={{ width: '9%', }}>Due Date</th>
                      <th style={{ width: '5%', }}>Frequency</th>
                      <th style={{ width: '8%', }}>Current location</th>
                      <th style={{ width: '10%', }}>Callibration Source</th>
                      <th style={{ width: '5%', }}>itemMFRNo</th>
                      <th style={{ width: '10%', }}>Part No</th>

                    </tr>
                    {filteredItemListData.map((item, index) => (
                    <tr style={{ margin: 0, padding: 0 }} key={index}>
                      <td style={{ width: '2%', }} >{index + 1}</td>
                      <td style={{ width: '12%', }} >{item.itemIMTENo}</td>
                      <td style={{ width: '15%', }} >{item.itemAddMasterName}</td>
                      <td style={{ width: '5%', }} >{item.itemRangeSize}</td>
                      <td style={{ width: '5%', }} >{item.itemLC}</td>
                      <td style={{ width: '5%', }} >{item.itemMake}</td>
                      <td style={{ width: '9%', }}>{item.itemCalDate}</td>
                      <td style={{ width: '9%', }}>{item.itemDueDate}</td>
                      <td style={{ width: '5%', }}>{item.itemCalFreInMonths+" "+ item.itemCalFrequencyType}</td>
                      <td style={{ width: '8%', }}>{item.itemCurrentLocation}</td>
                      <td style={{ width: '10%', }}>{item.itemCalibrationSource}</td>
                      <td style={{ width: '5%', }}>{item.itemMFRNo}</td>
                      <td style={{ width: '10%', }}>{item.itemPartName}</td>

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

        <div style={{ fontSize: 'xx-small', margin: 0, padding: 0 }}   >{formatNoData.fTotalList ? ("Format Number : " +formatNoData.fTotalList.frNo +" " + " Rev.No : " + formatNoData.fTotalList.amNo +" " + " Rev.Date : " + formatNoData.fTotalList.amDate) : ""}</div>
      </div>
      </div>





    </div>






  )
}

export default TotalPreview