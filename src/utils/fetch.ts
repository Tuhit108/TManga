import axios, {AxiosRequestConfig} from 'axios';
import {Core} from "@/global";
import Global from "@/utils/Global";


export const Fetch = axios.create({
  baseURL: Core.baseUrl,
  headers: {
    Authorization: 'Bearer ' + Global.accessToken,
    'Content-Type': 'multipart/form-data',
  }});
