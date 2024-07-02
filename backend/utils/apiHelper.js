import axios from 'axios';
import { XY_FINANCE_API_BASE_URL } from '../constants/config.js';

export const xyFinanceApi = axios.create({
  baseURL: XY_FINANCE_API_BASE_URL,
});