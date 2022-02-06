import React, {useRef, useMemo, useState, useEffect} from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView  } from 'react-native';
import { getMarketData } from '../Services/service';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({navigation}) {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  
  // get crypto datda from api
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      
      if(marketData){
        AsyncStorage.setItem('somekey', JSON.stringify(marketData))
        .then(json => console.log('store data in local storage success!'))
        .catch(error => console.log('error!'));
      }
      setData(marketData);
    }
    fetchMarketData();
  }, [])

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  }

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            symbol={item.symbol}
            currentPrice={item.price_usd}
            priceChangePercentage24hr={item.percent_change_24h}
            onPress={(item) => navigation.navigate('Chart')}
          />
        )}
        ListHeaderComponent={<ListHeader />}
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