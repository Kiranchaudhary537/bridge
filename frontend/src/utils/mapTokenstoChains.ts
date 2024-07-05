import { Token } from "../types";

export const mapTokenstoChains = (
    currencies: Token[],
    supportedChains: { chainId: number; name: string }[]
  ): Token[] => {
    const chainMap = supportedChains.reduce((acc, chain) => {
      acc[chain.chainId] = chain.name;
      return acc;
    }, {} as Record<number, string>);
  
    return currencies.map((currency) => ({
      ...currency,
      symbol: chainMap[currency.chainId] || currency.symbol,
    }));
  };
  