export interface Token {
  symbol: string;
  name: string;
  logoURI: string;
  decimals: number;
  address: string;
  chainId: number;
}

export interface FetchTokensResponse {
  recommendedTokens: Token[];
}

export interface FetchQuoteResponse {
  routes: QuoteRoute[];
}

export type QuoteRoute = Record<string, any>;
