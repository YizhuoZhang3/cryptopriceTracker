import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function LoginScreen(props) {
  return (
    <SafeAreaProvider style={styles.container}>
      <View></View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default LoginScreen;