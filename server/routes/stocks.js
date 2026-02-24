import express from "express";
import {
  registerStock,
  getAllStocks,
  getStockBySymbol
} from "../controller/stock/stock.js";
import {
  buyStock,
  sellStock,
  getAllHoldings
} from "../controller/stock/holding.js";
import { getOrders } from "../controller/stock/order.js";

const router = express.Router();
router.get("/stock", getStockBySymbol);
router.post("/register", registerStock);
router.get("", getAllStocks);
router.post("/buy", buyStock);
router.post("/sell", sellStock);
router.get("/order", getOrders);
router.get("/holding", getAllHoldings);

export default router;
