import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import SwaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import e from "express";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

dotenv.config();
const app = express();
app.use(express.json());

const httpServer = createServer(app);

app.get("/", (req, res) => {
  res.send("<h1>Trading API</h1><a></a href='/api-docs'>Documentation</a>");
});

const swaggerDocument = YAML.load(_dirname + "./docs/swagger.yaml");
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

app.use("/auth", authRouter);

app.use(cors());
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
