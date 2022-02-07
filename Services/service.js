import axios from 'axios';

export const getMarketData = async () => {
  try {
    const response = await axios.get("https://api.coinlore.net/api/tickers/");
    const data = response.data;
    const get50data = data.data.slice(0, 50);
    return get50data;
  } catch (error) {
    console.log(error.message);
  }
}


