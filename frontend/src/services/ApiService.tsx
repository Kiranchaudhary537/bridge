import axios from 'axios';

const API_URL = 'http://localhost:3000/';
const baseAPI = axios.create({
  baseURL: API_URL,
});

export const fetchTokens = async () => {
  const response = await baseAPI.get(`/tokens`);
  // console.log(response.data)
  console.dir(response.data)
  // const response={
  //   data:{
  //     tokens:[
  //       {
  //         symbol: 'BTC',
  //         name: 'Bitcoin'
  //       },
  //       {
  //         symbol: 'ETH',
  //         name: 'Ethereum'
  //       }
  //     ]
  //   }
  // }
  return response.data;
};

export const fetchQuote = async (token: string, chain: string) => {
  const response = await baseAPI.post(`/quotes`, { token, chain });
  return response.data;
};

export const fetchTransactionParams = async (token: string, chain: string) => {
  const response = await baseAPI.post(`/params`, { token, chain });
  return response.data;
};
