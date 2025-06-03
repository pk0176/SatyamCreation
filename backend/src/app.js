import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import heroBannerRouter from "./routes/heroBanner.routes.js";

app.use("/v1/api/product", productRouter);
app.use("/v1/api/category", categoryRouter);
app.use("/v1/api/banner", heroBannerRouter);

export default app;
