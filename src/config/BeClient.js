import axios from "axios";
import store from "../store";
import {notificationActions} from "../store/NotificationSlice";

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
      return response.data;
    },

    function (error) {
      if(['/login', 'sign-up'].includes(window.location.pathname)) {
        return Promise.reject(error);
      }
      console.log({error})
      if (error.code === 'ERR_NETWORK') {
        store.dispatch(notificationActions.add({message: error.message}));
      } else {
        store.dispatch(notificationActions.add(error.response?.data));
      }
      return Promise.reject(error);
    }
  )
  return axiosInstance;

}

const beClient = createBeClientInstance(process.env.REACT_APP_SERVER_URL);

export {beClient};