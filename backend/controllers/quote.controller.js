import * as xyFinanceService from '../services/xyFinance.service.js';

// Get quote based on parameters
export const getQuote = async (req, res) => {
  try {
    const {
      srcChainId,
      srcQuoteTokenAddress,
      srcQuoteTokenAmount,
      dstChainId,
      dstQuoteTokenAddress,
      slippage,
      affiliate,
      commissionRate,
    } = req.body;

    if (!srcChainId || !srcQuoteTokenAddress || !srcQuoteTokenAmount || !dstChainId || !dstQuoteTokenAddress) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const quoteParams = {
      srcChainId,
      srcQuoteTokenAddress,
      srcQuoteTokenAmount,
      dstChainId,
      dstQuoteTokenAddress,
      slippage,
      affiliate,
      commissionRate,
    };
    
    const quote = await xyFinanceService.getQuote(quoteParams);
    res.json(quote);
  } catch (error) {
    console.error('Error fetching quote:', error.message);
    res.status(500).json({ error: 'Error fetching quote' });
  }
};
