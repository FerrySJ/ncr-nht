import axios from "axios";
import join from "url-join";
import {
  apiUrl,
  NOT_CONNECT_NETWORK,
  NETWORK_CONNECTION_MESSAGE,
} from "../constance/contance";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async (config) => {
  const url = config.url || ""; // กำหนดค่าเริ่มต้นเป็น string ว่าง ๆ
  if (!isAbsoluteURLRegex.test(url)) {
    config.url = join(apiUrl, url);
  }
  config.timeout = 30000; // 30 Second
  // config.timeout = 10000; // 10 Second
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // debugger
    console.log(JSON.stringify(error, undefined, 2));
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE,
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;

// import axios from "axios";
// import join from "url-join";
// import {
//   apiUrl_TWN,
//   apiUrl,
//   NOT_CONNECT_NETWORK,
//   NETWORK_CONNECTION_MESSAGE,
// } from "../constance/contance";

// // =======================
// // httpClient → apiUrl
// // =======================
// const httpClient = axios.create({
//   baseURL: apiUrl,
//   timeout: 30000,
// });

// httpClient.interceptors.request.use((config) => {
//   if (!/^(?:\w+:)\/\//.test(config.url)) {
//     config.url = join(apiUrl, config.url);
//   }
//   return config;
// });

// httpClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (axios.isCancel(error)) return Promise.reject(error);
//     if (!error.response) {
//       return Promise.reject({
//         code: NOT_CONNECT_NETWORK,
//         message: NETWORK_CONNECTION_MESSAGE,
//       });
//     }
//     return Promise.reject(error);
//   }
// );

// // =======================
// // httpClient2 → apiUrl_TWN
// // =======================
// const httpClient2 = axios.create({
//   baseURL: apiUrl_TWN,
//   timeout: 30000,
// });

// httpClient2.interceptors.request.use((config) => {
//   if (!/^(?:\w+:)\/\//.test(config.url)) {
//     config.url = join(apiUrl_TWN, config.url);
//   }
//   return config;
// });

// httpClient2.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (axios.isCancel(error)) return Promise.reject(error);
//     if (!error.response) {
//       return Promise.reject({
//         code: NOT_CONNECT_NETWORK,
//         message: NETWORK_CONNECTION_MESSAGE,
//       });
//     }
//     return Promise.reject(error);
//   }
// );

// export { httpClient, httpClient2 };

