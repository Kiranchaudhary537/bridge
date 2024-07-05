import React, { useState, useEffect } from 'react';
import { fetchTokens } from '../services/ApiService';

const TokenSelector: React.FC = () => {
  const [tokens, setTokens] = useState([{ symbol: 'BTC', name: 'Bitcoin' }]);
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedChain, setSelectedChain] = useState('');

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

  return (
    <div>
      <select value={selectedToken} onChange={handleTokenChange}>
        {tokens.map((token) => (
          <option key={token.symbol} value={token.symbol}>
            {token.name}
          </option>
        ))}
      </select>
      <select value={selectedChain} onChange={handleChainChange}>
        {/* Populate with chain options */}
      </select>
      <button onClick={handleSubmit}>Get Quote</button>
    </div>
  );
};

export default TokenSelector;
