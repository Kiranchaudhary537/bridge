import * as xyFinanceService from "../services/xyFinance.service.js";

export const getQuote = async (req, res) => {
  try {
    const quoteParams = req.body;
    const {
      srcChainId,
      fromTokenAddress,
      amount,
      destChainId,
      toTokenAddress,
    } = req.body;

    if (
      !srcChainId ||
      !fromTokenAddress ||
      !amount ||
      !destChainId ||
      !toTokenAddress
    ) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    const quote = await xyFinanceService.getQuote(quoteParams);
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quote" });
  }
};
