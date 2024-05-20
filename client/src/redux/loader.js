import { createSlice } from "@reduxjs/toolkit";
import Helper from "../Helper/axiosHelper";

const baseUrl = Helper.baseUrl();

const initialState = {
  loader: false,
  
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const { setLoader } = counterSlice.actions;

export default counterSlice.reducer;

export const signIn =
  (data, callback = () => {}) =>
  async (dispatch) => {
    try {
      var result = await Helper.postData(baseUrl + "signIn", data)
        .then((response) => {
          if (response.data) {
            return response.data;
          } else {
            return {
              status: false,
              code: 401,
              message:
                response.response.data.message + " Please login and proceed",
            };
          }
        })
        .catch((err) => err);
      callback(result);
    } catch (err) {}
  };

  export const forgotPassWord =
  (data, callback = () => {}) =>
  async (dispatch) => {
    try {
      var result = await Helper.postData(baseUrl + "forgot_password", data)
        .then((response) => {
          if (response.data) {
            return response.data;
          } else {
            return {
              status: false,
              code: 401,
              message:
                response.response.data.message + " Please login and proceed",
            };
          }
        })
        .catch((err) => err);
      callback(result);
    } catch (err) {}
  };

  export const verifyForgotPassword =
  (data, callback = () => {}) =>
  async (dispatch) => {
    try {
      var result = await Helper.postData(baseUrl + "verify_forgot_password", data)
        .then((response) => {
          if (response.data) {
            return response.data;
          } else {
            return {
              status: false,
              code: 401,
              message:
                response.response.data.message + " Please login and proceed",
            };
          }
        })
        .catch((err) => err);
      callback(result);
    } catch (err) {}
  };

  export const accVerify =
  (data, callback = () => {}) =>
  async (dispatch) => {
    try {
      var result = await Helper.getData(baseUrl + `verify_account/${data}`)
        .then((response) => {
          if (response.data) {
            return response.data;
          } else {
            return {
              status: false,
              code: 401,
              message:
                response.response.data.message + " Please login and proceed",
            };
          }
        })
        .catch((err) => err);
      callback(result);
    } catch (err) {}
  };