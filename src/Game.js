import React, { useState } from 'react';
import { StyleSheet , View } from 'react-native';

import GameStats from './GameStats';
import CardsContainer from './CardsContainer';
import Timer from './Timer';
import CustomAlert from './CustomAlert';

const gameEventsInitial = require('./../data/gameEvents.json').sort(() => Math.random() - 0.5);

export default function Game(props) {
    const maxLevel = 20;
    const statsCount = 4;

    const [gameEvents, setGameEvents] = useState(Array.from(gameEventsInitial));
    const [statsLevel, setStatsLevel] = useState({ last: Array(statsCount).fill(0), current: Array(statsCount).fill(maxLevel/2) });
    const [alertData, setAlertData] = useState(null);

    const cardsCount = gameEvents.length;

    const removeCard = () => {
        gameEvents.splice(gameEvents.length - 1, 1);
        setGameEvents(Array.from(gameEvents));
    };
    
    const updateStatsLevel = effect => setStatsLevel({ last: Array.from(statsLevel.current), current: statsLevel.current.map((level, index) => level + effect[index]) });
    
    const passedTime = Math.round(365 / gameEventsInitial.length * (gameEventsInitial.length - gameEvents.length)); // for the timer

    return (
        <View style={styles.game}>
            <GameStats statsCount={statsCount} maxLevel={maxLevel} statsCurrLevel={statsLevel.current} statsLastLevel={statsLevel.last} setAlertData={setAlertData}/>
            <CardsContainer updateStatsLevel={updateStatsLevel} removeCard={removeCard} gameEvents={gameEvents} cardsCount={cardsCount}/>
            
            <Timer passed={passedTime}/>

            { alertData ? <CustomAlert data={alertData} setAlertData={setAlertData}/> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    game: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
    },
});