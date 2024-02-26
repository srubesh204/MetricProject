import React, { useState } from 'react'
import { Alert, Button, Chip, CircularProgress,Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, MenuItem, Paper, Snackbar, Switch, TextField, responsiveFontSizes, styled } from '@mui/material';
import axios from 'axios'

const Permissions = () => {

    const initialData = {
        uncertaintyPage: "",
        gaugeSpacePage: "",
        stickerPrintPage: ""
    }

    const[premissionsData,setPermissionsData] = useState({
        uncertaintyPage: "",
        gaugeSpacePage: "",
        stickerPrintPage: ""

    })

    const handleCalData = (e) => {
        const { name, value, checked } = e.target;
        setPermissionsData((prev) => ({ ...prev, [name]: value }))
        console.log(name)
        if (name === "uncertaintyPage") {
            setPermissionsData((prev) => ({ ...prev, uncertaintyPage: checked ? "yes" : "no" }))
        }
        if (name === "gaugeSpacePage") {
            setPermissionsData((prev) => ({ ...prev, gaugeSpacePage: checked ? "yes" : "no" }))
        }
        if (name === "stickerPrintPage") {
            setPermissionsData((prev) => ({ ...prev, stickerPrintPage: checked ? "yes" : "no" }))
        }

    }
     const [mailSnackBar, setPlantSnackBar] = useState(false)
    const [errorHandler, setPlantError] = useState({})
    const updateCompanyDetails = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_PORT}/compDetails/updateCompDetails/companyData`, premissionsData
            );
            console.log(response.data)


            // companysFetchData();
            // setPlantSnackBar(true)
            setPlantError({ status: response.data.status, message: response.data.message, code: "success" })
            // setSelectedPlantId(null)
            setPermissionsData(initialData)
            console.log(response);
         
        } catch (err) {
            console.log(err);
            setPlantSnackBar(true)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' / ');

                console.log(errorMessages400);
                console.log(err)
                setPlantError({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500);
                console.log(err)
                setPlantError({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err)
                setPlantError({ status: 0, message: "An error occurred", code: "error" });
            }

        }
    };






    return (
        <div>


            <Container >
                <form>


                    {/* <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        mb: 1,

                    }}
                    elevation={12}
                > */}
                    <div className='row g-2 ml-2'>

                        <div>
                            <FormControlLabel control={<Switch  name='uncertaintyPage' checked={premissionsData.uncertaintyPage === "yes"}  onChange={handleCalData} />} label="Uncertainty" />
                        </div>

                        <div>
                            <FormControlLabel control={<Switch  name='gaugeSpacePage' checked={premissionsData.gaugeSpacePage === "yes"} onChange={handleCalData} />} label="Gauge Space" />
                        </div>
                        <div>
                            <FormControlLabel  control={<Switch  name='stickerPrintPage' checked={premissionsData.stickerPrintPage === "yes"} onChange={handleCalData} />} label="Sticker Print" />
                        </div>
                    </div>
                    {/* </Paper> */}
                </form>
                </Container>





        </div>
    )
}

export default Permissions