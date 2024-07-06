import { xyFinanceApi } from '../utils/apiHelper.js';

// Service to get recommended tokens
export const getRecommendedTokens = async (chainId) => {
  const response = await xyFinanceApi.get('/recommendedTokens', { params: { chainId } });
  return response.data;
};

// Service to get supported chains
export const getSupportedChains = async () => {
  const response = await xyFinanceApi.get('/supportedChains');
  return response.data;
};

// Service to get quote
export const getQuote = async (params) => {
  const response = await xyFinanceApi.get('/quote', { params });
  return response.data;
};

// Service to get allowance transaction
export const getAllowanceTx = async (params) => {
  const response = await xyFinanceApi.get('/allowance', { params });
  return response.data;
};

// Service to get approve transaction
export const getApproveTx = async (params) => {
  const response = await xyFinanceApi.get('/approve', { params });
  return response.data;
};

// Service to perform swap
export const getSwapTx = async (params) => {
  const response = await xyFinanceApi.get('/buildTx', { params });
  return response.data;
};
