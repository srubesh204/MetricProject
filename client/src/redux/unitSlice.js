import { createSlice } from "@reduxjs/toolkit";
import Helper from "../Helper/axiosHelper";
import { setLoader } from "./loaderSlice";  

const baseUrl = Helper.baseUrl();

const initialState = {
    items: [],
    status: 'idle',
    error: null,

};

export const unitMasterSlice = createSlice({
    name: "unitMaster",
    initialState,
    reducers: {
       
        setItems: (state, action) => {
            state.items = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {  setItems, setError } = unitMasterSlice.actions;

export default unitMasterSlice.reducer;

// Async Thunks
export const getAllUnits = (callback = () => { }) => async (dispatch) => {
    dispatch(setLoader(true));
    try {
        const response = await Helper.getData(`${baseUrl}/unit/getAllUnits`);
        callback(response.data);
    } catch (err) {
        callback({ status: false, message: err.message });
    } finally {
        dispatch(setLoader(false));
    }
};
