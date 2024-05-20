import axios from "axios";

const helper = {
  baseUrl: function () {
    const URL = "http://localhost:3010";
    return URL;
  },

  postData: async function (url, data, config = {}) {
    const defaultConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: localStorage.getItem("oAuth"),
      },
    };

    const axiosConfig = { ...defaultConfig, ...config };

    try {
      const res = await axios.post(url, data, axiosConfig);
      return res;
    } catch (err) {
      return err.response || { status: false, message: err.message };
    }
  },

  putData: async function (url, data) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: localStorage.getItem("oAuth"),
      },
    };

    return await axios
      .put(url, data, axiosConfig)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  deleteData: async function (url, data) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        // "Access-Control-Allow-Origin": "*",
        Authorization: localStorage.getItem("oAuth"),
      },
    };

    return await axios
      .delete(url, data, axiosConfig)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

 
  getData: async function (url) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: localStorage.getItem("oAuth"),
      },
    };
    return await axios.get(url, axiosConfig).then((res) => {
      if (res) {
        return res;
      }
    });
  },
 
};

export default helper;