import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ListHeader ({data}) {
  const [userName, setUserName] = useState('');
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setUserName(value)
      }
    } catch (error) {
      console.error(error)
    }
  };

  // get user informtion from local storage
  useEffect(() => {
    getUser();
  }, [])

  return(
    <>
      <View style={styles.titleWrapper}>
          <Text style={styles.welcomeTitle}>Welcome {userName}!</Text>
          <View style={styles.subTitle}>
            <Text style={styles.largeTitle}>Markets</Text>
          </View>
        </View>
      <View style={styles.divider} />
    </>
  )
}

const styles = StyleSheet.create({
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  smallTitle:{
    fontSize: 20,
    color: '#0782F9',
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
});

export default ListHeader;