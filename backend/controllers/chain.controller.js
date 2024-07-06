import * as xyFinanceService from '../services/xyFinance.service.js';

// Get supported chains
export const getSupportedChains = async (req, res) => {
  try {
    const chains = await xyFinanceService.getSupportedChains();
    res.json(chains);
  } catch (error) {
    console.error('Error fetching supported chains:', error.message);
    res.status(500).json({ error: 'Error fetching supported chains' });
  }
};
