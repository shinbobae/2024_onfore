import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAdminUserStore } from '../store/user/user.ts';
import { ResultResponse } from './type.ts';
import { AuthRefreshResponse } from './auth/type.ts';
import handleResponse from './handleResponse.ts';
const API_URL = import.meta.env.VITE_API_HOST;
const REST_URL = API_URL;

const ApiCommon: AxiosInstance = axios.create({
  baseURL: REST_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

let isRefreshing = false; // 토큰 중복 발급 방지
let failedApis: any[] = []; // 재발급 전 요청 저장

// 갱신 후 대기 요청 처리
const processFailedApis = (error: AxiosError | null, token: string | null = null) => {
  failedApis.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedApis = [];
};

ApiCommon.interceptors.request.use(
  function (config) {
    const accessToken = useAdminUserStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
    return config;
  },
  function (error) {
    console.log('api interceptor error', error);
    return Promise.reject(error);
  },
);

ApiCommon.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: any) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }; // 무한루프 방지 _retry
    if (error.response?.data.code === 'EXPIRED_ACCESS_TOKEN' && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedApis.push({ resolve, reject });
        })
          .then(() => {
            return ApiCommon(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      isRefreshing = true;

      try {
        const refreshToken = useAdminUserStore.getState().refreshToken || '';
        const response: ResultResponse<AuthRefreshResponse> = await ApiCommon.post('admin/auth/refresh', {
          refresh_token: refreshToken,
        });
        if (response.code === 'OK') {
          isRefreshing = false;
          processFailedApis(null);
          useAdminUserStore.setState(() => ({
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            loginAt: new Date(),
          }));
          return ApiCommon(originalRequest);
        } else {
          await handleResponse(response);
        }
      } catch (refreshError: any) {
        isRefreshing = false;
        processFailedApis(refreshError as AxiosError);
        const rfError = refreshError.response as ResultResponse<any>;
        if (rfError) {
          await handleResponse(rfError.data);
        }
        return Promise.reject(refreshError);
      }
    }
    await handleResponse(error.response.data);
    return Promise.reject(error);
  },
);

export default ApiCommon;
