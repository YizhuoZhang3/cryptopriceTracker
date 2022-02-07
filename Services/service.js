import axios from 'axios';
import moment from 'moment';

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

export const getRealTime = async () => {
  try {
    const response = await axios.get("https://api.coinlore.net/api/tickers/");
    const data = response.data;
    const time = data.info.time;
    return time;
  } catch (error) {
    console.log(error.message);
  }
}