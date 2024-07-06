import axios from "axios";
import { FetchQuoteResponse, FetchTokensResponse, Token } from "../types";

const baseAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchTokens = async (): Promise<FetchTokensResponse> => {
  const response = await baseAPI.get(`/tokens`);
  return response.data;
};

export const fetchSupportedChains = async (): Promise<
  { chainId: number; name: string }[]
> => {
  const response = await baseAPI.get(`/supportedChains`);
  return response.data?.supportedChains;
};

export const fetchQuote = async (
  src: Token | null,
  dest: Token | null,
  amount: number
): Promise<
  FetchQuoteResponse | { success: boolean; errorMsg: string; errorCode: number }
> => {
  const response = await baseAPI.post(`/quotes`, {
    srcChainId: src?.chainId,
    srcQuoteTokenAddress: src?.address,
    srcQuoteTokenAmount: amount,
    dstChainId: dest?.chainId,
    dstQuoteTokenAddress: dest?.address,
    slippage: 1,
    affiliate: "0x018b1751a6f4ec773faf8e1a24ed0c3b271e538c",
    commissionRate: 0,
  });
  return response.data;
};

export const fetchTransactionParams = async (params: any): Promise<any> => {
  const response = await baseAPI.post(`/params`, { params });
  return response.data;
};
