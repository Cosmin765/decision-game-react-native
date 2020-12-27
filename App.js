import React from 'react';
import { StatusBar } from 'react-native';

import StartScreen from 'screens/StartScreen';
import Game from 'screens/Game';
import About from 'screens/About';
import LoseScreen from 'screens/LoseScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden={true}/>

      <Stack.Navigator>

        <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown: false}} />
        <Stack.Screen name="About" component={About} options={{headerShown: false}} />
        <Stack.Screen name="Game" component={Game} options={{headerShown: false}} />
        <Stack.Screen name="LoseScreen" component={LoseScreen} options={{headerShown: false}} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;