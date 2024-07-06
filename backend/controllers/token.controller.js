import * as xyFinanceService from '../services/xyFinance.service.js';

// Get tokens based on chainId
export const getTokens = async (req, res) => {
  try {
    const { chainId } = req.query;
    const tokens = await xyFinanceService.getRecommendedTokens(chainId);
    res.json(tokens);
  } catch (error) {
    console.error('Error fetching tokens:', error.message);
    res.status(500).json({ error: 'Error fetching tokens' });
  }
};
