import React, { useEffect, useState } from "react";
import TokenModal from "./TokenModal";
import { fetchSupportedChains, fetchQuote, fetchTokens } from "../services/ApiService";
import Quote from "./Quote";
import { FetchQuoteResponse, FetchTokensResponse, Token } from "../types";
import { mapTokenstoChains } from "../utils/mapTokenstoChains";

const TokenConverter: React.FC = () => {
  const [sourceToken, setSourceToken] = useState<Token|null>(null);
  const [destToken, setDestToken] = useState<Token|null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSelectingSource, setIsSelectingSource] = useState(true);
  const [tokens, setCurrencies] = useState<Token[] | null>([]);
  const [amount, setAmount] = useState<string>("");
  const [buildTx, setBuildTx] = useState<any>();
  const [quotes, setQuotes] = useState<FetchQuoteResponse|null>(null);
  const [quoteStatus, setQuoteStatus] = useState<string>(
    "Please select a token and enter an amount."
  );
  const openModal = (isSource: boolean) => {
    setIsSelectingSource(isSource);
    setShowModal(true);
  };

  const selectToken = (token: any) => {
    if (isSelectingSource) {
      setSourceToken(token);
    } else {
      setDestToken(token);
    }
    setShowModal(false);
  };

  const fetchData = async () => {
    const [tokensResponse, chainsResponse]: [FetchTokensResponse, { chainId: number; name: string }[]] = await Promise.all([
      fetchTokens(),
      fetchSupportedChains(),
    ]);
    const mappedCurrencies = mapTokenstoChains(tokensResponse.recommendedTokens, chainsResponse);
    setCurrencies(mappedCurrencies);
    setSourceToken(mappedCurrencies[0]);
    setDestToken(mappedCurrencies[1]);
  };

  const fetchQuoteData = async (amount: number) => {
    const response: FetchQuoteResponse | { success: boolean, errorMsg: string, errorCode: number }= await fetchQuote(sourceToken, destToken, amount);

    if ('success' in response && !response.success) {
      setQuoteStatus(response.errorMsg);
      return;
    }
    
    setQuotes(response as FetchQuoteResponse);
  };

  const handleSubmit = () => {
    if (amount && sourceToken && destToken) {
      setQuoteStatus("Loading...");
      setQuotes(null);
      const padd = parseInt(
        "1".toString().padEnd(sourceToken.decimals, "0")
      );
      const total_amount = parseInt(amount) * padd;
      fetchQuoteData(total_amount);
    } else {
      setQuoteStatus("Fill up source, destination and amount input box");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 ">
        <div className="bg-white p-6 rounded-lg shadow-md w-full my-10 max-w-4xl">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Token Converter
          </h1>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-row space-x-6">
              <div className="flex flex-col w-1/2 space-y-4">
                <div
                  onClick={() => openModal(true)}
                  className="cursor-pointer border p-4 flex items-center rounded-lg shadow-sm hover:bg-gray-50"
                >
                  <img
                    src={sourceToken?.logoURI}
                    alt={sourceToken?.name}
                    className="w-10 h-10 mr-4"
                  />
                  <div>
                    <p className="font-bold">{sourceToken?.name}</p>
                    <p >{sourceToken?.symbol}</p>
                  </div>
                </div>
                <div
                  onClick={() => openModal(false)}
                  className="cursor-pointer border p-4 flex items-center rounded-lg shadow-sm hover:bg-gray-50"
                >
                  <img
                    src={destToken?.logoURI}
                    alt={destToken?.name}
                    className="w-10 h-10 mr-4"
                  />
                  <div>
                    <p className="font-bold">{destToken?.name}</p>
                    <p >{destToken?.symbol}</p>
                  </div>
                </div>
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
                  disabled={!sourceToken || !destToken || !amount}
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
      {buildTx==null? quotes && <p className="w-[80%] mx-auto h-[60%] bg-gray-800 text-white p-4 rounded-lg shadow-md overflow-auto">...</p> : (
        <pre className="w-[80%] mx-auto h-[60%] bg-gray-800 text-white p-4 rounded-lg shadow-md overflow-auto">
          <h1>Transaction response:</h1>
          {buildTx}
        </pre>
      )}
    </>
  );
};

export default TokenConverter;
