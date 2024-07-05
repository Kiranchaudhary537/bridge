import express from 'express';
import { getSupportedChains } from '../controllers/chain.controller.js';

const router = express.Router();

router.post('/', getSupportedChains);

export default router;