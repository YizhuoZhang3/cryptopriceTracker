import React from 'react';
import HomeScreen from './Components/HomeScreen';
import LoginScreen from './Components/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chart from './Components/Chart'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen name="Chart" component={Chart} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}