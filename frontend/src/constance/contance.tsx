// App_Init
export const APP_INIT = "APP_INIT";
export const APP_TITLE = "Developed by";

// ========== Server NHT  (New Server) ================
// export const apiUrl = "http://10.120.139.25:4009/api/"; //TWN
export const apiUrl = "http://localhost:1001"; 

// export const apiUrl_TWN = "http://10.120.10.140:3990/"; //GET DATA FROM TWN


export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";


export const server = {
  URL_REGIST: `user/regist`,
  LOGIN_URL: `user/login`,
  LOGIN_EMP: `user/elogin`,
  URL_PASSWORD: `user/password`,
  URL_USER: `user/all`,
  URL_EDITUSER: `user/level`,
  URL_DELETEUSER: `user/delete`,
  USER_QUERY: `user/level_query`,


  MASTER_NG_CATAGORIES: `api_master/master_catagories`,
  MASTER_PROCESS: `api_master/master_process`,
  MASTER_PARTS: `api_master/master_part`,
};

export const key = {
  LOGIN_PASSED: "LOGIN_PASSED",
  USER_LV: "USER_LV",
  USER_NAME: "USER_NAME",
  USER_EMP: "USER_EMP",
  TIME_LOGIN: "TIME_LOGIN",
  EDITTED_USER: "USER_EMP",
};

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";
