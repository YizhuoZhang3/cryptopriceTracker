import React, {useRef, useMemo, useState, useEffect} from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView  } from 'react-native';
import {BottomSheetModal,BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { getMarketData } from '../Services/service';
import ListItem from './ListItem';
import Chart from './Chart';
import ListHeader from './ListHeader';

function HomeScreen() {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  
  // get crypto datda from api
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
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
    <BottomSheetModalProvider>
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
            onPress={() => openModal(item)}
          />
        )}
        ListHeaderComponent={<ListHeader />}
      />
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        { selectedCoinData ? (
          <Chart
            currentPrice={selectedCoinData.current_price}
            logoUrl={selectedCoinData.image}
            name={selectedCoinData.name}
            symbol={selectedCoinData.symbol}
            priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
            sparkline={selectedCoinData?.sparkline_in_7d.price}
          />
        ) : null}
      </BottomSheetModal>
    </BottomSheetModalProvider>
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