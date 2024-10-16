import axios from 'axios'
import {API_INFO} from "../constant/constant.ts"

const  apiClient = axios.create({
  baseURL: API_INFO.URL,
})

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log("error = ", error)
//     const apiError: ApiErrorData = { status: error.response.status, message: error.response.data };
//     return Promise.reject(apiError)
//   },
// )

// export interface ApiErrorData {
//   status: number;
//   message: string;
// }

export default apiClient
