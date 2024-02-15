import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Container, Grid, Paper, TextField, Typography, CardMedia, InputLabel, Input, FormControl, FormHelperText, FormGroup, FormLabel, MenuItem, Select, Menu, FormControlLabel, Radio, RadioGroup, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, OutlinedInput, Box, Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Checkbox, ListItemText, Autocomplete, styled } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Calculate, Delete } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEmployee } from '../../App';
import dayjs from 'dayjs';
const MeasurementUncertainty = () => {

    const empRole = useEmployee();
    const { loggedEmp, allowedPlants } = empRole



    const CustomisedButton = styled(Button)({
        fontSize: '0.8rem',
        padding: '6px 14px',
    });


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [materialCte, setMaterialCte] = useState([]);
    const [typeBEval, setTypeBEval] = useState([])
    const [clccfData, setClccfData] = useState([])

    const materialCteAndTypeBEvalFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/unc/getMaterialCteAndTypeB`
            );
            console.log(response.data)
            setMaterialCte(response.data.uncMaterialCteResult)
            setTypeBEval(response.data.uncTypeBResult)
            setClccfData(response.data.uncClccfResult)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        materialCteAndTypeBEvalFetch()
    }, []);



    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    }

    const initialMasterDetails = {
        masterIMTENo: "",
        masterName: "",
        rangeSize: "",
        lC: "",
        uncertainty: "",
        accuracy: "",
        material_name: "",
        material_cte: "",
        material_id: ""
    }

    const [masterDetails, setMasterDetails] = useState({
        masterIMTENo: "",
        rangeSize: "",
        lC: "",
        uncertainty: "",
        accuracy: "",
        material_name: "",
        material_cte: "",
        material_id: ""
    })

    const [openModalUNC, setOpenModalUNC] = useState(false);
    const initialUncertainty = {
        uncItemName: "",
        uncRangeSize: "",
        uncLC: "",
        uncMaterial: "",
        uncDate: dayjs().format('YYYY-MM-DD'),
        uncMasterDetails: [],
        uncStartTemp: "",
        uncEndTemp: "",
        uncMeanTemp: "",
        uncRefTemp: "",
        uncTEMaster: "",
        uncTEDUC: "",
        uncR1: "",
        uncR2: "",
        uncR3: "",
        uncR4: "",
        uncR5: "",
        uncR6: "",
        uncR7: "",
        uncR8: "",
        uncR9: "",
        uncR10: "",
        uncStdDeviation: "",
        uncN: "",
        combinedUnc: "",
        uncCoverageFactor: "",
        uncDegOfFreedom: "",
        uncUncertainity: ""

    }
    const [uncertainityData, setUncertainityData] = useState({
        uncItemName: "",
        uncRangeSize: "",
        uncRangeSizeUnit: "-",
        uncLC: "",
        uncMaterial: "",
        uncDate: dayjs().format('YYYY-MM-DD'),
        uncMasterDetails: [],
        uncStartTemp: "",
        uncEndTemp: "",
        uncMeanTemp: "",
        uncRefTemp: "20",
        uncTEMaster: "",
        uncTEDUC: "",
        uncTI: "",
        uncR1: "",
        uncR2: "",
        uncR3: "",
        uncR4: "",
        uncR5: "",
        uncR6: "",
        uncR7: "",
        uncR8: "",
        uncR9: "",
        uncR10: "",
        uncStdDeviation: "",
        uncN: "",
        combinedUnc: "",
        uncCoverageFactor: "",
        uncDegOfFreedom: "",
        uncUncertainity: "",
        uncTypeBResult: []
    })


    console.log(uncertainityData)

    const [selectedValues, setSelectedValues] = useState([]);

    const [typeBEvalData, setTypeBEvalData] = useState([])

    const handleTypeB = (e) => {
        const { value } = e.target;
        setSelectedValues(typeof value === 'string' ? value.split(',') : value);
    };

    const addTypeB = () => {
        const modifiedData = selectedValues.map(item => {
            let estimatesXi = "";
            let factor = "";
            let stdUnc = 0;
            let sensitivityCoefficient = 1;
            let uncContribution = 0;
            let degOfFreedom = 0;
            // Apply conditions based on item.id
            switch (item.uncertainity_typeb_eval_id) {
                case "1":
                    estimatesXi = uncertainityData.uncMasterDetails.length > 0 ? Number(uncertainityData.uncMasterDetails[0].uncertainty).toFixed(4) : "";
                    factor = Number(item.factor);
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc) {
                        sensitivityCoefficient = Number(item.sensitivity_coefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "2":
                    estimatesXi = uncertainityData.uncMasterDetails.length > 1 ? Number(uncertainityData.uncMasterDetails[1].uncertainty).toFixed(4) : "";
                    factor = Number(item.factor);
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc) {
                        sensitivityCoefficient = Number(item.sensitivity_coefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "3":
                    estimatesXi = uncertainityData.uncMasterDetails.length > 2 ? Number(uncertainityData.uncMasterDetails[2].uncertainty).toFixed(4) : "";
                    factor = Number(item.factor);
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc) {
                        sensitivityCoefficient = Number(item.sensitivity_coefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "4":
                    estimatesXi = uncertainityData.uncMasterDetails.length > 0 ? Number(uncertainityData.uncMasterDetails[0].accuracy).toFixed(4) : "";
                    factor = Number(item.factor);
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc) {
                        sensitivityCoefficient = Number(item.sensitivity_coefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "5":
                    estimatesXi = uncertainityData.uncMasterDetails.length > 1 ? Number(uncertainityData.uncMasterDetails[1].accuracy).toFixed(4) : "";
                    factor = Number(item.factor);
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc) {
                        sensitivityCoefficient = Number(item.sensitivity_coefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "6":
                    estimatesXi = uncertainityData.uncMasterDetails.length > 2 ? Number(uncertainityData.uncMasterDetails[1].accuracy).toFixed(4) : "";
                    factor = Number(item.factor);
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc) {
                        sensitivityCoefficient = Number(item.sensitivity_coefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "7":
                    estimatesXi = uncertainityData.uncMasterDetails.length > 0 ? (Number(uncertainityData.uncMasterDetails[0].lC) / 2).toFixed(4) : "";
                    factor = Number(item.factor);
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc) {
                        sensitivityCoefficient = Number(item.sensitivity_coefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "8":
                    estimatesXi = uncertainityData.uncMasterDetails.length > 1 ? (Number(uncertainityData.uncMasterDetails[1].lC) / 2).toFixed(4) : "";
                    factor = Number(item.factor);
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc) {
                        sensitivityCoefficient = Number(item.sensitivity_coefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "9":
                    estimatesXi = uncertainityData.uncMasterDetails.length > 2 ? (Number(uncertainityData.uncMasterDetails[2].lC) / 2).toFixed(4) : "";
                    factor = Number(item.factor);
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc) {
                        sensitivityCoefficient = Number(item.sensitivity_coefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "10":
                    estimatesXi = uncertainityData.uncLC ? (Number(uncertainityData.uncLC) / 2).toFixed(4) : "";
                    factor = Number(item.factor);
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc) {
                        sensitivityCoefficient = Number(item.sensitivity_coefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "13":
                    const diffTemp = Math.abs(parseFloat(uncertainityData.uncRefTemp) - parseFloat(uncertainityData.uncMeanTemp)).toFixed(4)
                    factor = Number(item.factor);
                    estimatesXi = diffTemp ? diffTemp : "";
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc && uncertainityData.uncRangeSize) {
                        sensitivityCoefficient = (parseFloat(uncertainityData.uncRangeSize) / 1000 * (parseFloat(uncertainityData.uncTEDUC) + parseFloat(uncertainityData.uncTEMaster)) / 2).toFixed(4)

                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "14":
                    const twentyPerdiffTemp = (Math.abs(parseFloat(uncertainityData.uncRefTemp) - parseFloat(uncertainityData.uncMeanTemp)) * 0.2).toFixed(4)
                    factor = Number(item.factor);
                    estimatesXi = twentyPerdiffTemp ? twentyPerdiffTemp : "";
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }

                    }
                    if (stdUnc && uncertainityData.uncRangeSize) {
                        sensitivityCoefficient = (parseFloat(uncertainityData.uncRangeSize) / 1000 * (parseFloat(uncertainityData.uncTEDUC) + parseFloat(uncertainityData.uncTEMaster)) / 2).toFixed(4)
                        console.log(sensitivityCoefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "15":
                    const tenPerTCMaster = (parseFloat(uncertainityData.uncTEMaster) * 0.1).toFixed(4)
                    factor = Number(item.factor);
                    estimatesXi = tenPerTCMaster ? tenPerTCMaster : "";
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc && uncertainityData.uncRangeSize) {
                        sensitivityCoefficient = (parseFloat(uncertainityData.uncRangeSize) / 1000 * (parseFloat(uncertainityData.uncMeanTemp) - parseFloat(uncertainityData.uncRefTemp))).toFixed(4)
                        console.log(sensitivityCoefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "16":
                    const tenPerTCDUC = (parseFloat(uncertainityData.uncTEDUC) * 0.1).toFixed(4)
                    factor = Number(item.factor);
                    estimatesXi = tenPerTCDUC ? tenPerTCDUC : "";
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc && uncertainityData.uncRangeSize) {
                        sensitivityCoefficient = (parseFloat(uncertainityData.uncRangeSize) / 1000 * (parseFloat(uncertainityData.uncMeanTemp) - parseFloat(uncertainityData.uncRefTemp))).toFixed(4)
                        console.log(sensitivityCoefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "17":
                    factor = Number(item.factor);
                    estimatesXi = uncertainityData.uncTI ? uncertainityData.uncTI : "";
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc && uncertainityData.uncRangeSize) {
                        sensitivityCoefficient = (parseFloat(uncertainityData.uncRangeSize) / 1000 * (parseFloat(uncertainityData.uncTEDUC) + parseFloat(uncertainityData.uncTEMaster)) / 2).toFixed(4)
                        console.log(sensitivityCoefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    break;
                case "18":
                    factor = uncertainityData.uncN ? Number(uncertainityData.uncN) : ""
                    estimatesXi = uncertainityData.uncStdDeviation ? Number(uncertainityData.uncStdDeviation).toFixed(4) : "";
                    if (estimatesXi) {
                        if (item.factor_root === "sqrt") {
                            stdUnc = (estimatesXi / Math.sqrt(factor)).toFixed(4)
                        } else {
                            stdUnc = (estimatesXi / factor).toFixed(4)
                        }
                    }
                    if (stdUnc) {
                        sensitivityCoefficient = Number(item.sensitivity_coefficient)
                        uncContribution = (stdUnc * sensitivityCoefficient).toFixed(4)
                    }
                    if (uncertainityData.uncN) {
                        degOfFreedom = uncertainityData.uncN - 1
                    }
                    break;
                default:
                    // Default case: Set default values
                    estimatesXi = "";
                    factor = Number(item.factor);
                    stdUnc = 0
                    uncContribution = 0
            }

            return {
                typeBId: item.uncertainity_typeb_eval_id,
                srcOfUNCXi: item.uncertainity_component,
                estimatesXi: estimatesXi,
                probabilityDistribution: item.probability_distribution,
                type: item.type_of_distribution,
                factor: factor === 3 || item.factor === "n" ? `√${factor}` : factor,
                stdUnc: stdUnc ? stdUnc : "",
                sensitivityCoefficient: sensitivityCoefficient ? sensitivityCoefficient : item.sensitivity_coefficient,
                uncContribution: uncContribution ? uncContribution : "",
                degOfFreedom: degOfFreedom ? degOfFreedom : "∞",
            };
        });

        console.log(modifiedData);
        setTypeBEvalData(prev => ([...prev, ...modifiedData]));
        setSelectedValues([]);
    }



    console.log(typeBEvalData)


    console.log(masterDetails)
    const handlePlantChange = (e) => {
        const { name, value } = e.target;
        setMasterDetails((prev) => ({ ...prev, [name]: value }));
        if (name === "masterIMTENo") {
            console.log(value)
            const filterList = itemNameList.filter(item => item.itemIMTENo === value)
            setSelectedRow(filterList)
            setMasterDetails(prev => ({
                ...prev,
                masterIMTENo: filterList[0].itemIMTENo,
                masterName: filterList[0].itemAddMasterName,
                rangeSize: filterList[0].itemRangeSize,
                lC: filterList[0].itemLC,
            }))

        }
        if (name === "material_id") {
            console.log(value)
            const materialData = materialCte.filter(item => item.cte_id === value)
            console.log(materialData)
            setMasterDetails(prev => ({
                ...prev,
                material_name: materialData[0].material_name,
                material_cte: materialData[0].material_cte
            }))
        }
    };

    console.log(masterDetails)

    const addUncertainty = () => {

        setUncertainityData((prev) => ({ ...prev, uncMasterDetails: [...prev.uncMasterDetails, masterDetails] }))
        setMasterDetails(initialMasterDetails)
    }
    const deleteRow = (index) => {
        setUncertainityData((prev) => {
            const AC = [...prev.uncMasterDetails]
            AC.splice(index, 1);
            return {
                ...prev, uncMasterDetails: AC,
            };
        })
    };

    const deleteTypeBEval = (index) => {
        setTypeBEvalData((prev) => {
            const updatedData = [...prev]; // Create a copy of the previous state array
            updatedData.splice(index, 1); // Remove the element at the specified index
            return updatedData; // Return the updated array
        });
    };

    // const [uncertaintyList, setUncertaintyList] = useState([])
    // const uncFetch = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${process.env.REACT_APP_PORT}/measurementUncertainty/getAllMeasurementUncertainty`
    //         );
    //         setUncertaintyList(response.data.result);
    //         console.log(response.data)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // useEffect(() => {
    //     uncFetch()
    // }, []);





    const handleUncertaintyChange = (e) => {
        const { name, value } = e.target;
        setUncertainityData((prev) => ({ ...prev, [name]: value }));

        if (name === "uncMaterial") {
            setUncertainityData(prev => ({ ...prev, uncTEDUC: value }))
        }
    }
    const [selectedRow, setSelectedRow] = useState([]);
    const [itemNameList, setItemNameList] = useState([])
    const itemNameFetch = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/itemAdd/getItemByPlant`, { allowedPlants: allowedPlants }
            );
            const notAttribute = response.data.result.filter(item => item.itemType !== "attribute")
            setItemNameList(notAttribute);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        itemNameFetch()
    }, []);

    const [errors, setErrors] = useState({})
    const validateFunction = () => {
        let tempErrors = {};
        tempErrors.uncItemName = uncertainityData.uncItemName ? "" : "uncItemName  is Required"
        tempErrors.uncRangeSize = uncertainityData.uncRangeSize ? "" : "uncRangeSize is Required"
        setErrors({ ...tempErrors })
        return Object.values(tempErrors).every(x => x === "")
    }
    console.log(errors)
    const [errorhandler, setErrorHandler] = useState({})
    console.log(errorhandler)
    const uncertaintySubmit = async (e) => {
        e.preventDefault();
        try {

            setUncertainityData(prev => ({...prev, uncTypeBResult : typeBEvalData}))
            if (validateFunction() && uncertainityData.uncTypeBResult.length > 0) {
                const response = await axios.post(
                    `${process.env.REACT_APP_PORT}/measurementUncertainty/createMeasurementUncertainty`, uncertainityData
                );
                console.log(response.data.message)

                setSnackBarOpen(true)
                // uncFetch();
                setUncertainityData(initialUncertainty);
                console.log("uncertainty Create successfully");
                setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })

            } else {
                setErrorHandler({ status: 0, message: "Fill the required fields", code: "error" })
            }
        } catch (err) {
            setSnackBarOpen(true)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                console.log(err);
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(', ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                console.log(err);
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err);
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }


            console.log(err);

        }
    };

    useEffect(() => {
        if (uncertainityData.uncMasterDetails.length > 0) {
            setUncertainityData(prev => ({ ...prev, uncTEMaster: uncertainityData.uncMasterDetails[0].material_cte }))
        }

    }, [uncertainityData.uncMasterDetails])

    useEffect(() => {
        if (uncertainityData.uncStartTemp && uncertainityData.uncEndTemp) {
            const mean = ((Number(uncertainityData.uncStartTemp) + Number(uncertainityData.uncEndTemp)) / 2).toFixed(2)
            setUncertainityData(prev => ({ ...prev, uncMeanTemp: mean }))
        }
    }, [uncertainityData.uncStartTemp, uncertainityData.uncEndTemp])



    useEffect(() => {

        const excelData = [
            parseFloat(uncertainityData.uncR1),
            parseFloat(uncertainityData.uncR2),
            parseFloat(uncertainityData.uncR3),
            parseFloat(uncertainityData.uncR4),
            parseFloat(uncertainityData.uncR5),
            parseFloat(uncertainityData.uncR6),
            parseFloat(uncertainityData.uncR7),
            parseFloat(uncertainityData.uncR8),
            parseFloat(uncertainityData.uncR9),
            parseFloat(uncertainityData.uncR10),
        ];


        const numericValues = excelData.filter(value => typeof value === 'number' && !isNaN(value));

        if (numericValues.length < 3) {
            console.log('At least three numeric values are required for standard deviation calculation.');
        }

        const mean = numericValues.reduce((sum, value) => sum + value, 0) / numericValues.length;
        const squaredDifferences = numericValues.map(value => (value - mean) ** 2);
        const variance = squaredDifferences.reduce((sum, value) => sum + value, 0) / (numericValues.length - 1);
        const standardDeviation = Math.sqrt(variance).toFixed(4);

        setUncertainityData(prev => ({ ...prev, uncN: numericValues.length, uncStdDeviation: standardDeviation }))

    }, [
        uncertainityData.uncR1,
        uncertainityData.uncR2,
        uncertainityData.uncR3,
        uncertainityData.uncR4,
        uncertainityData.uncR5,
        uncertainityData.uncR6,
        uncertainityData.uncR7,
        uncertainityData.uncR8,
        uncertainityData.uncR9,
        uncertainityData.uncR10,])

    const handleUncertaintyCalculate = () => {
        let definedValue = 0;
        let lastDOF = 0;
        let lastUncComb = 0;
        let degOfFreedom = 0;
        let uncCoverageFactor = 0;

        if (typeBEvalData.length > 0) {
            const calculate = typeBEvalData.map(item => {
                const sqrtFun = item.uncContribution * item.uncContribution
                definedValue += sqrtFun
                if (item.typeBId === "18") {
                    lastDOF = item.degOfFreedom
                    lastUncComb = item.uncContribution
                }
            })

            definedValue = Math.sqrt(definedValue).toFixed(4)

        }
        console.log(Math.pow(definedValue, 4) * lastDOF)
        degOfFreedom = ((Math.pow(definedValue, 4) * lastDOF) / (Math.pow(lastUncComb, 4))).toFixed(1)

        if (degOfFreedom >= 10 && degOfFreedom <= 20) {
            uncCoverageFactor = 2.28
        }
        if (degOfFreedom > 20 && degOfFreedom <= 30) {
            uncCoverageFactor = 2.13
        }
        if (degOfFreedom > 30) {
            uncCoverageFactor = 2.00
        }

        console.log(degOfFreedom)
        setUncertainityData(prev => ({ ...prev, combinedUnc: definedValue + " " + uncertainityData.uncRangeSizeUnit, uncDegOfFreedom: degOfFreedom, uncCoverageFactor: uncCoverageFactor, uncUncertainity: (definedValue * uncCoverageFactor).toFixed(4) + " " + uncertainityData.uncRangeSizeUnit }))

        // const coverageFactorValue = clccfData.find(item => item.degrees_freedom === degreesFreedom)
    }



    return (
        <div style={{ fontSize: "smaller", padding: "10px" }}>
            <form>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Paper
                        sx={{
                            p: 1,
                            mb: 1
                        }}
                        elevation={12}
                    >
                        <div className='row g-2'>
                            <h6 className="col-12 text-center">DUC Details</h6>
                            <div className="col">
                                <TextField size='small' fullWidth variant='outlined' onChange={handleUncertaintyChange} value={uncertainityData.uncItemName} label="DUC Name" name='uncItemName' id='uncItemNameId'>
                                    {itemNameList.map((item, index) => (
                                        <MenuItem key={index} value={item.itemAddMasterName}>{item.itemAddMasterName}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col d-flex ">

                                <TextField size='small' fullWidth variant='outlined' label="Range/Size(L)" onChange={handleUncertaintyChange} value={uncertainityData.uncRangeSize} name='uncRangeSize' id='uncRangeSizeId'>
                                </TextField>
                                <TextField select style={{ width: "50%" }} size='small' fullWidth variant='outlined' label="Unit" onChange={handleUncertaintyChange} value={uncertainityData.uncRangeSizeUnit} name='uncRangeSizeUnit' id='uncRangeSizeUnitId'>
                                    <MenuItem value="-">Select</MenuItem>
                                    <MenuItem value="mm">mm</MenuItem>
                                    <MenuItem value="min">min</MenuItem>
                                </TextField>

                            </div>
                            <div className="col">

                                <TextField size='small' fullWidth variant='outlined' label={`Least Count (${uncertainityData.uncRangeSizeUnit})`} onChange={handleUncertaintyChange} value={uncertainityData.uncLC} name='uncLC' id='uncLCId'>
                                </TextField>
                            </div>
                            <div className="col">
                                <TextField size='small' select fullWidth variant='outlined' label="Material " value={uncertainityData.uncMaterial} name='uncMaterial' onChange={handleUncertaintyChange} id='uncMaterialId'>
                                    {materialCte.map((item, index) => (
                                        <MenuItem key={index} value={item.material_cte}>{item.material_name}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col">
                                <DatePicker
                                    fullWidth
                                    id="uncDateId"
                                    name="uncDate"
                                    value={dayjs(uncertainityData.uncDate)}
                                    onChange={(newValue) =>
                                        setUncertainityData((prev) => ({ ...prev, uncDate: newValue.format("YYYY-MM-DD") }))
                                    }
                                    label="Date"
                                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                    format="DD-MM-YYYY" />
                            </div>
                        </div>

                        <div className='row g-2 mt-1'>
                            <h6 className="text-center">Master Details</h6>

                            <div className="col">
                                <TextField size='small' select fullWidth onChange={handlePlantChange} variant='outlined' value={masterDetails.masterIMTENo} label="Master IMTENo" name='masterIMTENo' id='masterIMTENoId'>
                                    {itemNameList.map((item, index) => (
                                        <MenuItem key={index} value={item.itemIMTENo}>{item.itemAddMasterName + " - " + item.itemIMTENo}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col">
                                <TextField
                                    label="Range / Size"
                                    value={masterDetails.rangeSize}
                                    size="small"
                                    name="itemRangeSize"
                                    fullWidth
                                    InputProps={{ readOnly: true }}

                                ></TextField>
                            </div>
                            <div className="col">
                                <TextField label={`L.C.in (${uncertainityData.uncRangeSizeUnit})`}
                                    value={masterDetails.lC} fullWidth size="small" name="lC" InputProps={{ readOnly: true }} ></TextField>
                            </div>
                            <div className="col">
                                <TextField size='small' fullWidth variant='outlined' label={`Uncertainty in (${uncertainityData.uncRangeSizeUnit})`} onChange={handlePlantChange} value={masterDetails.uncertainty} name='uncertainty' id='uncertaintyId'>
                                </TextField>
                            </div>
                            <div className="col">
                                <TextField size='small' fullWidth variant='outlined' label={`Accuracy in (${uncertainityData.uncRangeSizeUnit})`} onChange={handlePlantChange} value={masterDetails.accuracy} name='accuracy' id='accuracyId'>
                                </TextField>
                            </div>
                            <div className="col">
                                <TextField size='small' select fullWidth variant='outlined' label="Material" onChange={handlePlantChange} value={masterDetails.material_id} name='material_id' id='material_idId'>
                                    {materialCte.map((item, index) => (
                                        <MenuItem key={index} value={item.cte_id}>{item.material_name}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-md-1">
                                <CustomisedButton variant='contained' fullWidth color='warning' onClick={() => addUncertainty()} >Add Row</CustomisedButton>
                            </div>


                            <div className='col-12'>
                                <table className='col table table-sm table-bordered table-responsive text-center align-middle'>
                                    <tbody>
                                        <tr>
                                            <th>Sr.No.</th>
                                            <th>Master Name</th>
                                            <th>Range/Size</th>
                                            <th>L.C.</th>
                                            <th>Uncertainty</th>
                                            <th>Accuracy</th>
                                            <th>Material</th>
                                            <th>Delete</th>
                                        </tr>
                                        {uncertainityData.uncMasterDetails.map((item, index) => (
                                            <tr key={index} >
                                                <td>{index + 1}</td>
                                                <td>{item.masterName + " - " + item.masterIMTENo}</td>
                                                <td>{item.rangeSize}</td>
                                                <td>{item.lC}</td>
                                                <td>{item.uncertainty}</td>
                                                <td>{item.accuracy}</td>
                                                <td>{item.material_name + " - " + item.material_cte}</td>
                                                <td style={{ width: "1%" }}><Button size='small' color="error" aria-label="add" onClick={() => deleteRow(index)}>
                                                    <Delete />
                                                </Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </Paper>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,

                        }}
                        elevation={12}
                    >
                        <div className='row g-2'>
                            <h6 className="text-center ">Environmental Parameteres</h6>

                            <table className='table table-sm table-bordered table-responsive'>
                                <tbody>
                                    <tr>
                                        <th>Start Temp T1 <code style={{ fontSize: "15px" }}>(°C)</code></th>
                                        <th>End Temp T2 <code style={{ fontSize: "15px" }}>(°C)</code></th>
                                        <th>Mean Temp <code style={{ fontSize: "15px" }}>(TA=(T1+T2)/2)</code></th>
                                        <th>Ref. Temp <code style={{ fontSize: "15px" }}>(TR)</code></th>
                                        <th>Thermal Expansion of master <code style={{ fontSize: "15px" }}>(mm/m°C)(αM)</code></th>
                                        <th>Thermal Expansion of DUC <code style={{ fontSize: "15px" }}>(mm/m°C)(αD)</code></th>
                                        <th>Uncertainty of Temperature Indicator <code style={{ fontSize: "15px" }}>(°C) UT (±)</code></th>
                                    </tr>
                                    <tr>
                                        <td className="col">
                                            <input className='form-control form-control-sm' value={uncertainityData.uncStartTemp} onChange={handleUncertaintyChange} name='uncStartTemp' id='uncStartTempId' />

                                        </td>
                                        <td className="col">
                                            <input className='form-control form-control-sm' value={uncertainityData.uncEndTemp} onChange={handleUncertaintyChange} name='uncEndTemp' id='uncEndTempId' />

                                        </td>
                                        <td className="col">
                                            <input disabled className='form-control form-control-sm' value={uncertainityData.uncMeanTemp} onChange={handleUncertaintyChange} name='uncMeanTemp' id='uncMeanTempId' />

                                        </td>
                                        <td className="col">
                                            <input className='form-control form-control-sm' value={uncertainityData.uncRefTemp} onChange={handleUncertaintyChange} name='uncRefTemp' id='uncRefTempId' />

                                        </td>
                                        <td className="col">
                                            <input disabled className='form-control form-control-sm' value={uncertainityData.uncTEMaster} onChange={handleUncertaintyChange} name='uncTEMaster' id='uncTEMasterId' />

                                        </td>
                                        <td className="col">
                                            <input
                                                className='form-control form-control-sm'
                                                value={uncertainityData.uncTEDUC}
                                                onChange={handleUncertaintyChange}
                                                name='uncTEDUC'
                                                id='uncTEDUCId'
                                                disabled
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className='form-control form-control-sm'
                                                value={uncertainityData.uncTI}
                                                onChange={handleUncertaintyChange}
                                                name='uncTI'
                                                id='uncTIId'
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,

                        }}
                        elevation={12}
                    >
                        <div className='row g-2'>
                            <h6 className="text-center ">Repeaterbility in ({uncertainityData.uncRangeSizeUnit})</h6>
                            <div className='col'>
                                <table className='table text-center table-sm table-bordered table-responsive align-middle'>
                                    <tbody>
                                        <tr>
                                            <th>R1</th>
                                            <th>R2</th>
                                            <th>R3</th>
                                            <th>R4</th>
                                            <th>R5</th>
                                            <th>R6</th>
                                            <th>R7</th>
                                            <th>R8</th>
                                            <th>R9</th>
                                            <th>R10</th>
                                            <th>Standard Deviation</th>
                                            <th>n</th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input className='form-control form-control-sm' type='number' value={uncertainityData.uncR1} onChange={handleUncertaintyChange} name="uncR1" id='uncR1Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' type='number' value={uncertainityData.uncR2} onChange={handleUncertaintyChange} name="uncR2" id='uncR2Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' type='number' value={uncertainityData.uncR3} onChange={handleUncertaintyChange} name="uncR3" id='uncR3Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' type='number' value={uncertainityData.uncR4} onChange={handleUncertaintyChange} name="uncR4" id='uncR4Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' type='number' value={uncertainityData.uncR5} onChange={handleUncertaintyChange} name="uncR5" id='uncR5Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' type='number' value={uncertainityData.uncR6} onChange={handleUncertaintyChange} name="uncR6" id='uncR6Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' type='number' value={uncertainityData.uncR7} onChange={handleUncertaintyChange} name="uncR7" id='uncR7Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' type='number' value={uncertainityData.uncR8} onChange={handleUncertaintyChange} name="uncR8" id='uncR8Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' type='number' value={uncertainityData.uncR9} onChange={handleUncertaintyChange} name="uncR9" id='uncR9Id' />
                                            </td>
                                            <td>
                                                <input className='form-control form-control-sm' type='number' value={uncertainityData.uncR10} onChange={handleUncertaintyChange} name="uncR10" id='uncR10Id' />
                                            </td>
                                            <td>
                                                <input disabled className='form-control form-control-sm' value={uncertainityData.uncStdDeviation} onChange={handleUncertaintyChange} name="uncStdDeviation" id='uncStdDeviationId' />
                                            </td>
                                            <td>
                                                <input disabled className='form-control form-control-sm' type='number' value={uncertainityData.uncN} onChange={handleUncertaintyChange} name="uncN" id='uncNId' />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='row g-2 mt-1'>
                            <div className='col'>
                                <FormControl size='small' component="div" fullWidth>
                                    <InputLabel id="uncertaintySelectionId" >Select Source of Uncertainities</InputLabel>
                                    <Select

                                        labelId="uncertaintySelectionId"
                                        name="uncertaintySelection"
                                        multiple
                                        onChange={handleTypeB}
                                        value={selectedValues}
                                        input={<OutlinedInput fullWidth label="Select Source of Uncertainities" />}
                                        MenuProps={MenuProps}
                                        renderValue={(selected) => ""}
                                        fullWidth
                                    >
                                        {uncertainityData.uncRangeSizeUnit === "min" ?
                                            
                                                typeBEval.filter(item => !["13","14","15","16","17"].includes(item.uncertainity_typeb_eval_id)).map((unc, index) => (
                                                    <MenuItem key={index} value={unc} disabled={typeBEvalData.find(value => value.typeBId === unc.uncertainity_typeb_eval_id)}>
                                                        <Checkbox checked={selectedValues.find(value => value.uncertainity_typeb_eval_id === unc.uncertainity_typeb_eval_id)} />
                                                        <ListItemText primary={unc.uncertainity_component} />
                                                    </MenuItem>
                                                ))
                                            
                                            :
                                            
                                                typeBEval.map((unc, index) => (
                                                    <MenuItem key={index} value={unc} disabled={typeBEvalData.find(value => value.typeBId === unc.uncertainity_typeb_eval_id)}>
                                                        <Checkbox checked={selectedValues.find(value => value.uncertainity_typeb_eval_id === unc.uncertainity_typeb_eval_id)} />
                                                        <ListItemText primary={unc.uncertainity_component} />
                                                    </MenuItem>
                                                ))
                                            
                                        }



                                    </Select>
                                </FormControl>

                            </div>
                            <div className='col-4'>
                                <CustomisedButton onClick={addTypeB} variant='contained' size='small' color='warning'>Add</CustomisedButton>
                            </div>

                        </div>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,
                            // padding: "30Px"

                        }}
                        elevation={12}
                    >
                        <div className='row g-2'>
                            <table className='table table-sm table table-bordered table-responsive text-center align-middle border border-black'  >
                                <tbody>
                                    <tr>
                                        <th colSpan={2}>Source of uncertainty Xi</th>
                                        <th>Estimates <br/><code style={{ fontSize: "15px" }}>(Xi)</code> </th>
                                        <th>Probability Distribution  </th>
                                        <th width="6%">Type</th>
                                        <th>Factor <br/><code style={{ fontSize: "15px" }}>(x)</code></th>
                                        <th>Standard Uncertainty <br /><code style={{ fontSize: "15px" }}>u = (Xi / x)</code></th>
                                        <th>Sensitivity Coefficient <br /><code style={{ fontSize: "15px" }}>(y)</code></th>
                                        <th>Uncertainty contribution <br/><code style={{ fontSize: "15px" }}>ui = (x * y)</code></th>
                                        <th>Degree of freedom <br/><code style={{ fontSize: "15px" }}>vi = (n - 1)</code></th>
                                        <th>Remove</th>
                                    </tr>
                                    {typeBEvalData.map((item, index) => (
                                        <tr key={index}>
                                            <td>U{index + 1}</td>
                                            <td>{item.srcOfUNCXi}</td>
                                            <td>{item.estimatesXi}</td>
                                            <td>{item.probabilityDistribution}</td>
                                            <td>{item.type}</td>
                                            <td>{item.factor}</td>
                                            <td>{item.stdUnc}</td>
                                            <td>{item.sensitivityCoefficient}</td>
                                            <td>{item.uncContribution}</td>
                                            <td>{item.degOfFreedom}</td>
                                            <td>
                                                <Button size='small' color="error" aria-label="add" onClick={() => deleteTypeBEval(index)}>
                                                    <Delete />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='text-end'>
                                <CustomisedButton type='button' startIcon={<Calculate />} onClick={handleUncertaintyCalculate} size='small' color='success' variant='contained' >Calculate </CustomisedButton>
                            </div>
                        </div>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 1,
                        }}
                        elevation={12}
                    >
                        <div className='row g-2'>
                            <table class='table table-borderless align-middle'>
                                <tbody>
                                    <tr>
                                        <th width="10%">Combined Uncertainty(Uc)</th>
                                        <td><input readOnly type="text" className='form-control form-control-sm' value={uncertainityData.combinedUnc} /></td>
                                        <th width="10%" >Coverage Factor(k)</th>
                                        <td><input readOnly type="text" className='form-control form-control-sm' value={uncertainityData.uncCoverageFactor} /></td>
                                        <th width="10%" >Degree of Freedom(veff)</th>
                                        <td><input readOnly type="text" className='form-control form-control-sm' value={uncertainityData.uncDegOfFreedom} /></td>
                                        <th width="10%" >Expanded Uncertainty(U) ±</th>
                                        <td><input readOnly type="text" className='form-control form-control-sm' value={uncertainityData.uncUncertainity} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Paper>
                   
                    <div className='row'>
                        <div className='d-flex justify-content-end' >
                            <div className='me-2'>
                                <CustomisedButton variant='contained' size="small" color='success' onClick={() => setOpenModalUNC(true)}>+ Add Uncertainty</CustomisedButton>
                            </div>
                            <div className='' >
                                <CustomisedButton variant='contained' type='button' size='small' color='error' >List</CustomisedButton>
                            </div>

                        </div>

                        <Dialog
                            open={openModalUNC}
                            onClose={() => setOpenModalUNC(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Uncertainty create confirmation?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure to add the Uncertainty
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <CustomisedButton onClick={() => setOpenModalUNC(false)}>Cancel</CustomisedButton>
                                <CustomisedButton onClick={(e) => { uncertaintySubmit(e); setOpenModalUNC(false); }} autoFocus>
                                    Add
                                </CustomisedButton>
                            </DialogActions>
                        </Dialog>






                        <Snackbar variant="contained" anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                            <Alert variant="filled" onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '25%' }}>
                                {errorhandler.message}
                            </Alert>
                        </Snackbar>


                    </div>

                </LocalizationProvider>
            </form>

        </div>
    )
}
export default MeasurementUncertainty