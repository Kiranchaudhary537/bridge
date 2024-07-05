import React, { useState, useEffect } from 'react';
// import { fetchQuotes } from '../services/apiService';

interface Quote {
    exchange: string;
    rate: number;
    gasFee: number;
    timeTaken: number;
}

interface QuoteListProps {
    fromCurrency: string;
    toCurrency: string;
    amount: number;
}

const QuoteList: React.FC<QuoteListProps> = ({ fromCurrency, toCurrency, amount }) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

    useEffect(() => {
        const getQuotes = async () => {
            //   const quoteData = await fetchQuotes(fromCurrency, toCurrency, amount);
            const quoteData = [
                {
                    exchange: 'Exchange 1',
                    rate: 100,
                    gasFee: 10,
                    timeTaken: 5
                },
                {
                    exchange: 'Exchange 2',
                    rate: 200,
                    gasFee: 20,
                    timeTaken: 10
                }
            ]
            setQuotes(quoteData);
            setSelectedQuote(getBestQuote(quoteData));
        };
        getQuotes();
    }, [fromCurrency, toCurrency, amount]);

    const getBestQuote = (quotes: Quote[]) => {
        return quotes.reduce((best, current) => {
            const bestTotal = best.rate - best.gasFee;
            const currentTotal = current.rate - current.gasFee;
            return currentTotal > bestTotal ? current : best;
        });
    };

    return (
        <div className="mt-4">
            {selectedQuote && (
                <div className="mt-4 p-4 border rounded bg-gray-50 text-center">
                    <p>
                        {amount} {fromCurrency} = {(selectedQuote.rate * amount).toFixed(4)} {toCurrency} (via {selectedQuote.exchange})
                    </p>
                    <p className="text-sm text-gray-500">Gas Fee: {selectedQuote.gasFee}</p>
                    <p className="text-sm text-gray-500">Time Taken: {selectedQuote.timeTaken} mins</p>
                </div>
            )}
            <h2 className="text-xl font-bold mb-4 text-center">Quotes</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4">Exchange</th>
                        <th className="py-2 px-4">Quote</th>
                        <th className="py-2 px-4">Gas Fee</th>
                        <th className="py-2 px-4">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.map((quote) => (
                        <tr
                            key={quote.exchange}
                            className={`border-t ${quote === selectedQuote ? 'bg-blue-100' : 'bg-white'} cursor-pointer`}
                            onClick={() => setSelectedQuote(quote)}
                        >
                            <td className="py-2 px-4 font-bold">{quote.exchange}</td>
                            <td className="py-2 px-4">{(quote.rate * amount).toFixed(4)} {toCurrency}</td>
                            <td className="py-2 px-4">{quote.gasFee}</td>
                            <td className="py-2 px-4">{quote.timeTaken} mins</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default QuoteList;
