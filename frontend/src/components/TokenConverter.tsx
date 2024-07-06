import React, { useEffect, useState } from "react";
import TokenModal from "./TokenModal";
import {
  fetchSupportedChains,
  fetchQuote,
  fetchTokens,
} from "../services/ApiService";
import Quote from "./Quote";
import { FetchQuoteResponse, FetchTokensResponse, Token } from "../types";
import { mapTokenstoChains } from "../utils/mapTokenstoChains";

const TokenConverter: React.FC = () => {
  const [sourceToken, setSourceToken] = useState<Token | null>(null);
  const [destToken, setDestToken] = useState<Token | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSelectingSource, setIsSelectingSource] = useState(true);
  const [tokens, setTokens] = useState<Token[] | null>([]);
  const [amount, setAmount] = useState<string>("");
  const [buildTx, setBuildTx] = useState<any>(null);
  const [quotes, setQuotes] = useState<FetchQuoteResponse | null>(null);
  const [quoteStatus, setQuoteStatus] = useState<string>(
    "Please select a token and enter an amount."
  );

  const openModal = (isSource: boolean) => {
    setIsSelectingSource(isSource);
    setShowModal(true);
  };

  const selectToken = (token: Token) => {
    if (isSelectingSource) {
      setSourceToken(token);
    } else {
      setDestToken(token);
    }
    setShowModal(false);
  };

  const fetchData = async () => {
    try {
      const [tokensResponse, chainsResponse]: [
        FetchTokensResponse,
        { chainId: number; name: string }[]
      ] = await Promise.all([fetchTokens(), fetchSupportedChains()]);
      const mappedTokens = mapTokenstoChains(
        tokensResponse.recommendedTokens,
        chainsResponse
      );
      setTokens(mappedTokens);
      setSourceToken(mappedTokens[0]);
      setDestToken(mappedTokens[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setQuoteStatus("Failed to fetch tokens and chains.");
    }
  };

  const fetchQuoteData = async (amount: number) => {
    try {
      const response = await fetchQuote(sourceToken, destToken, amount);
      if ("success" in response && !response.success) {
        setQuoteStatus(response.errorMsg);
        return;
      }
      setQuotes(response as FetchQuoteResponse);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuoteStatus("Failed to fetch quote.");
    }
  };

  const handleSubmit = () => {
    console.log(amount)
    if (amount  && sourceToken && destToken) {
      setQuoteStatus("Loading...");
      setQuotes(null);
      const multiplier = Math.pow(10, sourceToken.decimals);
      const totalAmount = parseInt(amount) * multiplier;
      fetchQuoteData(totalAmount);
    } else {
      setQuotes(null);
      setQuoteStatus("Fill up source, destination, and amount input box");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full my-10 max-w-4xl">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Token Converter
          </h1>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-row space-x-6">
              <div className="flex flex-col w-1/2 space-y-4">
                <TokenSelector
                  token={sourceToken}
                  onClick={() => openModal(true)}
                />
                <TokenSelector
                  token={destToken}
                  onClick={() => openModal(false)}
                />
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="p-4 border rounded-lg shadow-sm"
                />
                <button
                  onClick={handleSubmit}
                  className="mt-6 w-full p-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                  Convert
                </button>
              </div>
              <Quote
                quotes={quotes}
                setBuildTx={setBuildTx}
                quoteStatus={quoteStatus}
              />
            </div>
          </div>
          {showModal && (
            <TokenModal
              tokens={tokens}
              onSelect={selectToken}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
      </div>
      <div className="bg-gray-800 text-white ">
        <TransactionResult buildTx={buildTx} quotes={quotes} />
      </div>
    </>
  );
};

const TokenSelector: React.FC<{ token: Token | null; onClick: () => void }> = ({
  token,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="cursor-pointer border p-4 flex items-center rounded-lg shadow-sm hover:bg-gray-50"
  >
    {token ? (
      <>
        <img src={token.logoURI} alt={token.name} className="w-10 h-10 mr-4" />
        <div>
          <p className="font-bold">{token.name}</p>
          <p>{token.symbol}</p>
        </div>
      </>
    ) : (
      <p>Select Token</p>
    )}
  </div>
);

const TransactionResult: React.FC<{
  buildTx: any;
  quotes: FetchQuoteResponse | null;
}> = ({ buildTx, quotes }) => (
  <>
    {buildTx == null ? (
      quotes && (
        <p className="w-[80%] border border-white mx-auto h-[60%]  text-white p-4 rounded-lg shadow-md overflow-auto">
          Transaction response will be display here ...
        </p>
      )
    ) : (
      <pre className="w-[80%] mx-auto h-[60%]text-white p-4 rounded-lg shadow-md overflow-auto">
        <h1>Transaction response:</h1>
        {buildTx}
      </pre>
    )}
  </>
);

export default TokenConverter;
