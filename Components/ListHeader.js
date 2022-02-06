import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle}>Markets</Text>
      </View>
    <View style={styles.divider} />
  </>
)

const styles = StyleSheet.create({
  container: {}
});

export default ListHeader;