import React, { useState, useEffect } from 'react';
import QuoteList from './QuoteList';
import { fetchTokens } from '../services/ApiService';

const CurrencyConverter: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('ETH');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedChain, setSelectedChain] = useState('');

  const handleConvert = async () => {
    // const rate = await fetchConversionRate(fromCurrency, toCurrency);
    setConvertedAmount(amount * 5);
  };



  useEffect(() => {
    const getTokens = async () => {
      const tokenData = await fetchTokens();
      // console.log(tokenData.tokens)
      setTokens(tokenData.tokens);
    };
    getTokens();
  }, []);

  const handleTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedToken(e.target.value);
  };

  const handleChainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChain(e.target.value);
  };

  const handleSubmit = async () => {
    // Call the quote API and handle response
  };
  useEffect(() => {
    handleConvert();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="min-h-screen  border min-w-screen flex justify-center items-center">
        <div className="bg-gray-100 border rounded-lg flex  shadow items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Crypto Converter</h2>
        <div className="mb-4">
          <label className="block text-gray-700">From:</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="LTC">Litecoin (LTC)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">To:</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="ETH">Ethereum (ETH)</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="LTC">Litecoin (LTC)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount:</label>
          <input
            type="number"
            className="w-full mt-1 p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleConvert}
        >
          Convert
        </button>
        {convertedAmount !== null && (
          <div className="mt-4 p-2 border rounded bg-gray-50 text-center">
            <p>
              {amount} {fromCurrency} = {convertedAmount.toFixed(4)} {toCurrency}
            </p>
          </div>
        )}
      </div>
      <div className="p-6 w-full max-w-md">
        <QuoteList fromCurrency={fromCurrency} toCurrency={toCurrency} amount={amount} />
      </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
