import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import SwaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";
import connectDB from "./config/connect.js";
import authRouter from "./routes/auth.js";
import stockRouter from "./routes/stocks.js";
import authenticateSocketUser from "./middleware/socketAuth.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import {
  scheduleDayReset,
  generateRandomDataEvery5Second,
  update10MinCandles
} from "./services/cronJob.js";
import { Server } from "socket.io";
import socketHandshake from "./middleware/socketHandshake.js";
import Stock from "./models/Stock.js";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

dotenv.config();

scheduleDayReset();
generateRandomDataEvery5Second();
update10MinCandles();

const holidays = ["2024-05-18", "2024-05-31"];

const isTradingHour = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;
  const isTradingTime =
    (now.getHours() === 9 && now.getMinutes() >= 30) ||
    (now.getHours() > 9 && now.getHours() < 15) ||
    (now.getHours() === 15 && now.getMinutes() <= 30);
  const today = new Date().toISOString().slice(0, 10);
  const isTradingHour = isWeekday && isTradingTime && !holidays.includes(today);
  return isTradingHour;
};

const app = express();
app.use(express.json());

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: process.env.WEBSERVER_URI || "http://localhost:3001",
    method: ["GET", "POST"],
    allowedHeaders: ["access_token"],
    credentials: true
  }
});
io.use(socketHandshake);

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);
  socket.on("subscribeToStocks", async (stockSymbol) => {
    console.log(`Client ${socket.id} subscribed to stock: ${stockSymbol}`);
    const sendUpdates = async () => {
      try {
        const stock = await Stock.findOne({ symbol: stockSymbol });
        if (!stock) {
          console.log("stock not found: ", stockSymbol);
          return;
        } else {
          socket.emit(`${stockSymbol}`, stock);
        }
      } catch (error) {
        console.log("Error sending stock update: ", error);
      }
    };
    sendUpdates();
    const intervalId = setInterval(sendUpdates, 5000);

    if (!isTradingHour()) {
      clearInterval(intervalId);
    }
  });

  socket.on("subscribeToMultipleStocks", (stockSymbol) => {
    console.log(
      `Client ${socket.id} subscribed to multiple stocks: ${stockSymbol}`
    );
    const sendUpdates = async () => {
      try {
        for (const symbol of stockSymbol) {
          const stock = await Stock.findOne({ symbol: symbol });
          if (!stock) {
            console.log("stock not found: ", symbol);
            continue;
          } else {
            socket.emit(`${symbol}`, stock);
          }
        }
      } catch (error) {
        console.log("Error sending stock update: ", error);
      }
    };

    sendUpdates();
    const intervalId = setInterval(sendUpdates, 5000);
    if (!isTradingHour()) {
      clearInterval(intervalId);
    }
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected ");
  });
});

httpServer.listen(process.env.SOCKET_PORT || 4000, () => {
  console.log(
    "WebSocket server is listening on port ",
    httpServer.address().port
  );
});

app.get("/", (req, res) => {
  res.send("<h1>Trading API</h1><a href='/api-docs'>Documentation</a>");
});

const swaggerDocument = YAML.load(_dirname + "/docs/swagger.yaml");
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

app.use("/auth", authRouter);
app.use("/stocks", authenticateSocketUser, stockRouter);

app.use(cors());
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
