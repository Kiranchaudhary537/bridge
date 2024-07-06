import React from "react";
import { fetchTransactionParams } from "../services/ApiService";
import { FetchQuoteResponse } from "../types";

interface QuoteComponentProps {
  setBuildTx: any;
  quotes: FetchQuoteResponse | null;
  quoteStatus: string;
}

const Quote: React.FC<QuoteComponentProps> = ({ setBuildTx, quotes, quoteStatus }) => {
  const handleCardClick = async (route: any) => {
    const params = getParams(route);

    try {
      setBuildTx(null);
      const response = await fetchTransactionParams(params);
      setBuildTx(JSON.stringify(response, null, 2));
    } catch (error) {
      console.error("Error fetching and posting data:", error);
    }
  };

  return (
    <div className="flex flex-col w-1/2 space-y-4">
      <h2 className="text-xl font-bold">Quotes</h2>
      {!quotes && <h1>{quoteStatus}</h1>}
      {quotes?.routes?.map((route, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(route)}
          className="border p-4 rounded-lg shadow-sm hover:bg-gray-100"
        >
          <p className="font-bold">Provider: {route?.bridgeDescription?.provider}</p>
          <p>Estimated Gas: {route?.estimatedGas}</p>
          <p>Estimated Transfer Time: {route?.estimatedTransferTime} seconds</p>
          <p>Destination Swap Provider: {route?.dstSwapDescription?.provider}</p>
          <p>DEX Names: {route?.dstSwapDescription?.dexNames.join(", ")}</p>
          <p>
            Converted Amount:{" "}
            {route?.dstQuoteTokenAmount / Math.pow(10, 18)}
          </p>
        </div>
      ))}
    </div>
  );
};

const getParams = (route: any) => ({
  srcChainId: route.srcChainId,
  srcQuoteTokenAddress: route.srcQuoteTokenAddress,
  srcQuoteTokenAmount: route.srcQuoteTokenAmount,
  dstChainId: route.dstChainId,
  dstQuoteTokenAddress: route.dstQuoteTokenAddress,
  slippage: route.slippage,
  receiver: "0xb6EFA1C3679f1943f8aC4Fc9463Cc492435c6C92",
  bridgeProvider: route.bridgeDescription?.provider,
  srcBridgeTokenAddress: route.bridgeDescription?.srcBridgeTokenAddress,
  dstBridgeTokenAddress: route.bridgeDescription?.dstBridgeTokenAddress,
  affiliate: "0x90d67a9eaC7324A1a2942D6Dea9f6174Ad6048c9",
  commissionRate: 0,
  srcSwapProvider: route.srcSwapDescription?.provider,
  dstSwapProvider: route.dstSwapDescription?.provider,
});

export default Quote;
