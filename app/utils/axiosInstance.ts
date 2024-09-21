import Axios, { InternalAxiosRequestConfig } from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pairwise.melodicdays.shop/';
// export const API_URL = 'http://localhost:7070'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers = config.headers || {};
  config.headers.Accept = 'application/json';
  const token = localStorage.getItem('auth');
  if (token) config.headers.auth = token;
  return config;
}

export const axiosInstance = Axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(authRequestInterceptor);
