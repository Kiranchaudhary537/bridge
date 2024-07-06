import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tokenRoutes from './routes/token.route.js';
import quoteRoutes from './routes/quote.route.js';
import paramRoutes from './routes/param.route.js';
import supportedChainsRoutes from './routes/chain.route.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

// Routes
app.use('/tokens', tokenRoutes);
app.use('/supportedChains', supportedChainsRoutes);
app.use('/quotes', quoteRoutes);
app.use('/params', paramRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Backend working');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
