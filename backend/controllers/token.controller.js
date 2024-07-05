import * as xyFinanceService from "../services/xyFinance.service.js";

export const getTokens = async (req, res) => {
  try {
    const chainId = req.query.chainId;
    const tokens = await xyFinanceService.getRecommendedTokens(chainId);
    res.json(tokens);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error fetching tokens" });
  }
};
