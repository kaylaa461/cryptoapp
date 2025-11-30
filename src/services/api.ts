import axios from "axios";

const API_URL = "https://api.coinlore.net/api/tickers/";

export async function getCryptoData() {
  const res = await axios.get(API_URL);
  return res.data.data;
}
