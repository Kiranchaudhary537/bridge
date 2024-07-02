import express from 'express';
import { getTokens } from '../controllers/token.controller.js';

const router = express.Router();

router.get('/', getTokens);

export default router;