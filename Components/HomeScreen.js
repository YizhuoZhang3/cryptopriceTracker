import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
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

  useEffect(() => {
    getUser();
  }, [])

  return (
    <SafeAreaProvider style={styles.container}>
      <Text>Welcome {userName}!</Text>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default HomeScreen;