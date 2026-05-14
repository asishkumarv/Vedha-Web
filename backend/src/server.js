import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import siteContentRouter from "./routes/siteContent.js";
import healingPagesRouter from "./routes/healingPages.js";
import subscriptionsRouter from "./routes/subscriptions.js";
import newsletterRouter from "./routes/newsletter.js";
import mediaAssetsRouter from "./routes/mediaAssets.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  })
);
app.use(express.json({ limit: "50mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "vedha-backend" });
});

app.use("/api/auth", authRouter);
app.use("/api/site-content", siteContentRouter);
app.use("/api/healing-pages", healingPagesRouter);
app.use("/api/subscriptions", subscriptionsRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/media-assets", mediaAssetsRouter);

app.use((error, _req, res, _next) => {
  console.error(error);
  const status = error.code === "23505" ? 409 : 500;
  res.status(status).json({
    message: status === 409 ? "This record already exists" : "Server error",
  });
});

app.listen(port, () => {
  console.log(`Vedha backend running on port ${port}`);
});
