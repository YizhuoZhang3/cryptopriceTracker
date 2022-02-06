import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const ListItem = ({ name, symbol, currentPrice, priceChangePercentage24hr, onPress }) => {
  const priceChangeColor = priceChangePercentage24hr > 0 ? '#34C759' : '#FF3B30';

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        
        {/* Left side */}
        <View style={styles.leftWrapper}>
          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>

        
        {/* Right side */}
        <View style={styles.rightWrapper}>
          <Text style={styles.title}>${currentPrice.toLocaleString('en-US', { currency: 'USD' })}</Text>
          <Text style={[styles.subtitle, {color: priceChangeColor}]}>{priceChangePercentage24hr}%</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: 'center',
  },
  image: {
    height: 48,
    width: 48,
  },
  titlesWrapper: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#A9ABB1",
  },
  rightWrapper: {
    alignItems: 'flex-end',
  },
})

export default ListItem;