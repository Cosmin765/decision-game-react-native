import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import GameStats from './src/GameStats';
import CardsContainer from './src/CardsContainer';
import Timer from './src/Timer';

import CustomAlert from './src/CustomAlert';

const gameEventsInitial = require('./data/gameEvents.json').sort(() => Math.random() - 0.5);

export default function App() {
  const maxLevel = 20;
  const statsCount = 4;

  const [gameEvents, setGameEvents] = useState(Array.from(gameEventsInitial));
  const [statsLevel, setStatsLevel] = useState({
    last: Array(statsCount).fill(0),
    current: Array(statsCount).fill(maxLevel/2),
  });
  const [alertData, setAlertData] = useState(null);

  const cardsCount = gameEvents.length;

  const removeCard = () => {
    gameEvents.splice(gameEvents.length - 1, 1);
    setGameEvents(Array.from(gameEvents));
  };
  
  const updateStatsLevel = effect => setStatsLevel({
    last: Array.from(statsLevel.current),
    current: statsLevel.current.map((level, index) => level + effect[index]),
  });
  
  const fireAlert = data => setAlertData(data);
  const disableAlert = () => setAlertData(null);
  
  const passedTime = Math.round(366 / gameEventsInitial.length * (gameEventsInitial.length - gameEvents.length)); // for the timer

  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>

      <GameStats statsCount={statsCount} maxLevel={maxLevel} statsCurrLevel={statsLevel.current} statsLastLevel={statsLevel.last} fireAlert={fireAlert}/>
      <CardsContainer updateStatsLevel={updateStatsLevel} removeCard={removeCard} gameEvents={gameEvents} cardsCount={cardsCount}/>
      
      <Timer passed={passedTime}/>

      { alertData ? <CustomAlert data={alertData} disableAlert={disableAlert}/> : null }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
  },
});
