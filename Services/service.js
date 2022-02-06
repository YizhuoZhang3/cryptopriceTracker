import axios from 'axios';
import moment from 'moment';

// const formatSparkline = (numbers) => {
//   const sevenDaysAgo = moment().subtract(7, 'days').unix();
//   let formattedSparkline = numbers.map((item, index) => {
//     return {
//       x: sevenDaysAgo + (index + 1) * 3600,
//       y: item,
//     }
//   })

//   return formattedSparkline;
// }

// const formatMarketData = (data) => {
//   let formattedData = [];

//   data.forEach(item => {
//     const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)
//     const formattedItem = {
//       ...item,
//       sparkline_in_7d: {
//         price: formattedSparkline
//       }
//     }
//     formattedData.push(formattedItem);
//   });
//   return formattedData;
// }

export const getMarketData = async () => {
  try {
    const response = await axios.get("https://api.coinlore.net/api/tickers/");
    const data = response.data;
    console.log(data)
    const get50data = data.data.slice(0, 50)
    return get50data;
  } catch (error) {
    console.log(error.message);
  }
}