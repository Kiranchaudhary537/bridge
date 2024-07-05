import { xyFinanceApi } from '../utils/apiHelper.js';

export const getRecommendedTokens = async (chainId) => {
  const response = await xyFinanceApi.get('/recommendedTokens', {
    params: { chainId },
  });
  return response.data;
};

export const getSupportedChains = async () => {
  const response = await xyFinanceApi.get('/supportedChains');
  return response.data;
};

export const getQuote = async (params) => {
  const response = await xyFinanceApi.get('/quote', { params });
  return response.data;
};

export const getAllowanceTx = async (params) => {
  const response = await xyFinanceApi.get('/allowance', { params });
  console.log(response.data)
  return response.data;
};
export const getApproveTx = async (params) => {
  const response = await xyFinanceApi.get('/approve', { params });
  return response.data;
};
export const getSwapTx = async (params) => {
  const response = await xyFinanceApi.get('/buildTx', { params });
  return response.data;
};

export const getStatus = async (params) => {
  const response = await xyFinanceApi.get('/buildTx', { params });
  return response.data;
};