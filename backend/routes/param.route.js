import express from "express";
import {
  Swap,
  getAllowance,
  getApprove,
} from "../controllers/param.controller.js";

const router = express.Router();

// POST /params/swap
router.post("/", Swap);

// POST /params/allowance
router.post("/allowance", getAllowance);

// POST /params/approve
router.post("/approve", getApprove);

export default router;
