import * as xyFinanceService from "../services/xyFinance.service.js";


export const getAllowance = async (req, res) => {
  const { chainId, owner, spender, tokenAddress, amount } = req.body;

  if (!chainId || !owner || !spender || !tokenAddress) {
    return res.status(400).json({ error: "Missing required parameters" });
  }
  // debugger;
  try {
    const data = await xyFinanceService.getAllowanceTx({
      chainId,
      owner,
      spender,
      tokenAddress,
    });
    if (data.isSuccess == false) {
      res.status(500).json({
        error:
          "Token spend allowed by an address on behalf of the crypto holder ",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

export const getApprove = async (req, res) => {
  const { chainId, owner, spender, tokenAddress, amount } = req.body;
  if (!chainId || !owner || !spender || !tokenAddress) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const data = await xyFinanceService.getApproveTx({
      chainId,
      spender,
      tokenAddress,
      amount,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const Swap = async (req, res) => {
  // const {
  //   srcChainId,
  //   fromTokenAddress,
  //   amount,
  //   destChainId,
  //   toTokenAddress,
  //   receiveAddress,
  //   slippage,
  //   referrer,
  // } = req.body;

  // if (
  //   !srcChainId ||
  //   !fromTokenAddress ||
  //   !amount ||
  //   !destChainId ||
  //   !toTokenAddress ||
  //   !receiveAddress
  // ) {
  //   return res.status(400).json({ error: "Missing required parameters" });
  // }

  try {
    console.dir(req.body.params);
    const data = await xyFinanceService.getSwapTx(req.body.params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
