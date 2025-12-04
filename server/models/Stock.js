import monoose from "mongoose";

const StockSchema = new monoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  companyName: { type: String, required: true },
  iconUrl: { type: String, required: true },
  lastDayTradePrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  dayTimeSeries: { type: [Object], default: [] },
  tenMinTimeSeries: { type: [Object], default: [] }
});

const Stock = monoose.model("Stock", StockSchema);

export default Stock;
