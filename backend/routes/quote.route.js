import express from 'express';
import { getQuote } from '../controllers/quote.controller.js';

const router = express.Router();

router.post('/', getQuote);

export default router;