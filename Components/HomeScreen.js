import React, {useRef, useMemo, useState, useEffect} from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView  } from 'react-native';
import { getMarketData } from '../Services/service';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from "react-native-elements";

function HomeScreen({navigation}) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [search, setSearch] = useState('');
  
  // get crypto datda from api
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      
      if(marketData){
        AsyncStorage.setItem('marketData', JSON.stringify(marketData))
        .then(json => console.log('store data in local storage success!'))
        .catch(error => console.log('error!'));
      }
      setFilteredData(marketData);
      setData(marketData);
    }
    fetchMarketData();
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter(item => parseFloat(item.percent_change_24h) >= parseFloat(text));
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(data);
      setSearch(text);
    }
  };


  return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Type perentage here..."
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          showCancel
          darkTheme
        />
        <FlatList
        keyExtractor={(item) => item.id}
        data={filteredData}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            symbol={item.symbol}
            currentPrice={item.price_usd}
            priceChangePercentage24hr={item.percent_change_24h}
            onPress={() => navigation.navigate('Chart', {currency: item})}
          />
        )}
        ListHeaderComponent={<ListHeader/>}
      />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});

export default HomeScreen;