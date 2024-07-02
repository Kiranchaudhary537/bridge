import * as xyFinanceService from '../services/xyFinance.service.js';

export const getSupportedChains = async (req, res) => {
  try {
    const quote = await xyFinanceService.getSupportedChains();
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quote' });
  }
};