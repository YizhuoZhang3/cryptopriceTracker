import React, { useEffect, useState } from 'react'
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import { View, Text, StyleSheet } from 'react-native'

const Chart = ({route})=> {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
  const contentInset = { top: 20, bottom: 20 }
  const [selectedCurrency, setSelectedCurrency] = useState({});

  useEffect(() => {
    const {currency} = route.params;
    setSelectedCurrency(currency);
  },[])

  console.log('this is selected curr: ', selectedCurrency);

  const priceChangeColor = selectedCurrency.percent_change_24h > 0 ? '#34C759' : '#FF3B30';

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
      <View style={{ height: 200, flexDirection: 'row' }}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
              fill: 'grey',
              fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}ºC`}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={contentInset}
        >
            <Grid />
        </LineChart>
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
  }

})

export default Chart;