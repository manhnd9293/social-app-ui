import axios from "axios";
import store from "../store";
import {NotiActionType} from "../store/notification/NotificationReducer";

function createBeClientInstance(beUrl) {
  let axiosInstance = axios.create({
    baseURL: beUrl
  });

  axiosInstance.interceptors.request.use(
    function (config) {
      const accessToken = localStorage.getItem("accessToken");
      config.headers['x-access-token'] = `${accessToken}` ;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  )
  axiosInstance.interceptors.response.use(
    function (response) {
      console.log({response});

      return response.data;
    },

    function (error) {
      console.log('Error happen');
      console.log(error.response);
      store.dispatch({type: NotiActionType.Add, payload: error.response?.data})
      return Promise.reject(error);
    }
  )
  return axiosInstance;

}

const beClient = createBeClientInstance(process.env.REACT_APP_SERVER_URL);

export {beClient};