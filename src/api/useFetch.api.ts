import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import apiClient from "./http.api.ts";
import {loginApi} from "./endpoints.ts";
import {clearAuth, selectAuth} from "../stores/slices/authSlice.ts";
import {RootState} from "../stores/store.ts";
import {PATHS} from "../routes/routePaths.ts";
import {Store} from "react-notifications-component";
import {alertOption} from "../constant/alertOptions.ts";

interface ErrorMessage {
  statusCode: number;
  message: string;
}

type ApiResponse<T> = {
  data: T | ErrorMessage;
  status: number;
};

const useFetch = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => selectAuth(state));
  const { notifications } = alertOption();

  function isErrorMessage(data: any): data is ErrorMessage {
    return data && typeof data === 'object' && 'statusCode' in data && 'message' in data;
  }


  const request = async <T>(url: string, method = 'GET', body = {}) => {
    const token = auth.token;
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      let response: ApiResponse<T>;
      switch (method) {
        case 'GET':
          response = await apiClient.get<T>(url, { headers })
          break
        case 'POST':
          response = await apiClient.post<T>(url, JSON.stringify(body), { headers })
          break
        case 'PUT':
          response = await apiClient.put<T>(url, JSON.stringify(body), { headers })
          break
        case 'DELETE':
          response = await apiClient.delete<T>(url, { headers })
          break
        default:
          response = await apiClient.get<T>(url, { headers })
      }

      if (isErrorMessage(response.data)) {
        if (response.data.statusCode === 401) {
          if (url === loginApi) {
            return {data: null, status: response.data.statusCode}
          }
          dispatch(clearAuth())
          navigate(PATHS.auth.signIn)
        }
        if (response.data.statusCode === 500) {
          Store.addNotification(notifications.error);
        }
        return { data: null, status: response.data.statusCode }
      }
      return  { data: response.data, status: response.status, errorMessage: null }
    } catch (err) {
      console.error('API error:', err)
      Store.addNotification(notifications.error);
      return { data: null, status: 500 }
    }
  }
  return { request }
}

export default useFetch
