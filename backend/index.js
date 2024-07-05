// Suggested code may be subject to a license. Learn more: ~LicenseLog:2977037535.
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tokenRoutes from "./routes/token.route.js";
import quoteRoutes from "./routes/quote.route.js";
import paramRoutes from "./routes/param.route.js";
import supportedChainsRoutes from "./routes/chain.route.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/tokens", tokenRoutes);
app.use("/supportedChains", supportedChainsRoutes);
app.use("/quotes", quoteRoutes);
app.use("/params", paramRoutes);

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

export default app;
