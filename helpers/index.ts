import axios from 'axios';

export const BASE_URL_API = 'https://jigoindia.in/api';
export const IMAGE_URL = 'https://jigoindia.in/';

export const instance = axios.create({
  baseURL: BASE_URL_API,
});
