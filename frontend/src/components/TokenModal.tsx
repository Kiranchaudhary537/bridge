import React, { useState } from "react";
import { Token } from "../types";

interface TokenModalProps {
  tokens: Token[] | null;
  onSelect: (token: Token) => void;
  onClose: () => void;
}

const TokenModal: React.FC<TokenModalProps> = ({ tokens, onSelect, onClose }) => {
  const [search, setSearch] = useState("");

  // Filter tokens based on search input
  const filteredTokens = tokens?.filter(
    (token) =>
      token.name.toLowerCase().includes(search.toLowerCase()) ||
      token.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white h-[90%] rounded-lg p-6 w-full max-w-lg shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">Select a Token</h2>
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <div className="overflow-y-auto">
          {filteredTokens?.map((token, index) => (
            <div
              key={index}
              onClick={() => onSelect(token)}
              className="cursor-pointer border p-4 flex items-center rounded-lg mb-2 shadow-sm hover:bg-gray-100"
            >
              <img
                src={token.logoURI}
                alt={token.name}
                className="w-10 h-10 mr-4"
              />
              <div>
                <p className="font-bold">{token.name}</p>
                <p>{token.symbol}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TokenModal;
