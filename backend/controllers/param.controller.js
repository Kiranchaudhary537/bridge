import * as xyFinanceService from '../services/xyFinance.service.js';

// Get allowance transaction
export const getAllowance = async (req, res) => {
  try {
    const { chainId, owner, spender, tokenAddress } = req.body;

    if (!chainId || !owner || !spender || !tokenAddress) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const data = await xyFinanceService.getAllowanceTx({ chainId, owner, spender, tokenAddress });

    if (!data.isSuccess) {
      return res.status(500).json({ error: 'Token spend not allowed by the address on behalf of the crypto holder' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching allowance transaction:', error.message);
    res.status(500).json({ error: 'Error fetching allowance transaction' });
  }
};

// Get approve transaction
export const getApprove = async (req, res) => {
  try {
    const { chainId, owner, spender, tokenAddress, amount } = req.body;

    if (!chainId || !owner || !spender || !tokenAddress) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const data = await xyFinanceService.getApproveTx({ chainId, spender, tokenAddress, amount });
    res.json(data);
  } catch (error) {
    console.error('Error fetching approve transaction:', error.message);
    res.status(500).json({ error: 'Error fetching approve transaction' });
  }
};

// Perform a swap
export const Swap = async (req, res) => {
  try {
    const { params } = req.body;

    if (!params) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const data = await xyFinanceService.getSwapTx(params);
    res.json(data);
  } catch (error) {
    console.error('Error performing swap:', error.message);
    res.status(500).json({ error: 'Error performing swap' });
  }
};
