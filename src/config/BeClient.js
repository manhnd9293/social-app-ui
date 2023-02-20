import axios from "axios";

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
      /*  if (!response) {
            console.log(error);
            return;
        }

        if (response.status === '403') {
            console.log('fail to load data');
        }
*/
      return Promise.reject(error);
    }
  )
  return axiosInstance;

}

const beClient = createBeClientInstance(process.env.REACT_APP_SERVER_URL);

export {beClient};