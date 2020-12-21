import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import StartScreen from './src/StartScreen';
import Game from './src/Game';
import About from './src/About';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true}/>

      <Stack.Navigator>

        <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}} />
        <Stack.Screen name="About" component={About} options={{headerShown: false}} />
        <Stack.Screen name="Game" component={Game} options={{headerShown: false}} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}