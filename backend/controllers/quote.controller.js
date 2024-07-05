import * as xyFinanceService from "../services/xyFinance.service.js";

export const getQuote = async (req, res) => {
  try {
    const quoteParams = req.body;
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
    console.dir(req.body)
    if (
      !srcChainId ||
      !srcQuoteTokenAddress ||
      !srcQuoteTokenAmount||
      !dstChainId ||
      !dstQuoteTokenAddress
    ) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    const quote = await xyFinanceService.getQuote(quoteParams);
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quote" });
  }
};
