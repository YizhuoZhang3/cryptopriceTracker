import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import callAPI from "../Services/callAPI";
import Plotly from 'react-native-plotly';

const Chart = ({route})=> {
  const fakedata = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
  const contentInset = { top: 20, bottom: 20 }
  const [selectedCurrency, setSelectedCurrency] = useState({});

  useEffect(() => {
    const {currency} = route.params;
    setSelectedCurrency(currency);
  },[])

  console.log('this is selected curr: ', selectedCurrency);
  const priceChangeColor = selectedCurrency.percent_change_24h > 0 ? '#34C759' : '#FF3B30';

  //get real time data for selected currency
  const [data, setData] = useState({
    index: [],
    price: [],
    volumes: [],
  });

  console.log(data)

  useEffect(() => {
    fetchData();
  }, []);
  console.log("this is currency name: ", selectedCurrency.nameid)
  const fetchData = async () => {
    let result = await callAPI(`https://api.coingecko.com/api/v3/coins/${selectedCurrency.nameid}/market_chart?vs_currency=usd&days=1&interval=1m`);
    for (const item of result.prices) {
        data.index.push(item[0]);
        data.price.push(item[1]);
    }
    for (const item of result.total_volumes) data.volumes.push(item[1]);
    setData(data)
  };

  let trace_price = {
    name: "Price ($)",
    x: data.index.map((t) => new Date(t)),
    y: data.price,
    xaxis: "x",
    yaxis: "y1",
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "blue", size: 3 },
  };
  let trace_volumes = {
    name: "Volumne ($B)",
    x: data.index.map((t) => new Date(t)),
    y: data.volumes,
    xaxis: "x",
    yaxis: "y2",
    type: "bar",
    barmode: "relative",
    marker: {
      color: "rgb(49,130,189)",
      opacity: 0.7,
    },
  };
  const chartdata = [trace_price, trace_volumes]
  const layout = { 
    title: 'My cool chart!',
    autosize: true,
			height: "100%",
			margin: {
				l: 50,
				r: 20,
				t: 35,
				pad: 3,
			},
			showlegend: false,
			xaxis: {
				domain: [1, 1],
				anchor: "y2",
			},
			yaxis: {
				domain: [0.1, 1],
				anchor: "x",
			},
			yaxis2: {
				showticklabels: false,
				domain: [0, 0.1],
				anchor: "x",
			},
			grid: {
				roworder: "bottom to top",
			},
  };
  const config = { responsive: true };

  const updateChart = (data) => {
		let trace_price = {
			x: [data.index.map((t) => new Date(t))],
			y: [data.price],
		};
		let trace_volumes = {
			x: [data.index.map((t) => new Date(t))],
			y: [data.volumes],
		};

		Plotly.update("chart", trace_price, {}, 0);
		Plotly.update("chart", trace_volumes, {}, 1);
	};

  useEffect(() => {
		fetchData().then((chartData) => {
			initChart(chartData);
			setLatestPrice(parseFloat(chartData.price[chartData.price.length - 1]).toFixed(2));
		});
		const timerID = setInterval(() => {
			fetchData().then((chartData) => {
				updateChart(chartData);
				setLatestPrice(parseFloat(chartData.price[chartData.price.length - 1]).toFixed(2));
			});
		}, 1000 * 60);
		return () => {
			clearInterval(timerID);
		};
	}, []);

  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.titlesWrapper}>
          <Text style={styles.subtitle}>$ {selectedCurrency.price_usd}</Text>
          <Text style={[styles.price, {color: priceChangeColor}]}>{selectedCurrency.percent_change_24h}%</Text>
        </View>
        <View style={styles.subtitlesWrapper}>
          <Text style={styles.title}>{selectedCurrency.name}</Text>
          <Text style={styles.period}>Last 24hrs</Text>
        </View>
      </View>

      <View style={styles.chartRow}>
        <Plotly
          data={chartdata}
          layout={layout}
          config={config}
        />
      </View>
  </View>
  )
}
const styles = StyleSheet.create({
  wrapper:{
    margin: 10,
  },
  titlesWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle:{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price:{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitlesWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title:{
    fontSize: 20,
  },
  period:{
    fontSize: 20,
    color: 'grey'
  },
  chartWrapper:{
    marginTop: -25,
  },
  chartRow: {
    flex: 1,
    width: '100%',
  },
})

export default Chart;