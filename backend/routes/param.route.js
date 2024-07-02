import express from 'express';
import { Swap, getAllowance, getApprove } from '../controllers/param.controller.js';

const router = express.Router();

router.post('/',Swap);

export default router;