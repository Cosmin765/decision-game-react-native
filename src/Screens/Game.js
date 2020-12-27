import React, { useState, useRef } from 'react';
import { StyleSheet , SafeAreaView, TouchableOpacity, Text } from 'react-native';

import GameStats from 'components/GameStats';
import CardsContainer from 'components/CardsContainer';
import Timer from 'components/Timer';
import CustomAlert from 'components/CustomAlert';

const gameEventsInitial = require('root/data/gameEvents.json').sort(() => Math.random() - 0.5);

import { replace } from 'src/navigation';

const Game = props => {
    const maxLevel = 20;
    const statsCount = 4;

    const [gameEvents, setGameEvents] = useState(Array.from(gameEventsInitial));
    const [statsLevel, setStatsLevel] = useState({ last: Array(statsCount).fill(0), current: Array(statsCount).fill(maxLevel/2) });

    const removeCard = () => {
        gameEvents.splice(gameEvents.length - 1, 1);
        setGameEvents(Array.from(gameEvents));
    };
    
    const updateStatsLevel = effect => setStatsLevel({ last: Array.from(statsLevel.current), current: statsLevel.current.map((level, index) => level + effect[index]) });
    
    const passedTime = Math.round(365 / gameEventsInitial.length * (gameEventsInitial.length - gameEvents.length)); // for the timer

    const alertRef = useRef();

    const fireAlert = data => alertRef.current.fireAlert(data);

    return (
        <SafeAreaView style={styles.main}>
            <GameStats statsCount={statsCount} maxLevel={maxLevel} statsCurrLevel={statsLevel.current} statsLastLevel={statsLevel.last} fireAlert={fireAlert}/>
            <CardsContainer updateStatsLevel={updateStatsLevel} removeCard={removeCard} gameEvents={gameEvents} cardsCount={gameEvents.length}/>
            
            <Timer passed={passedTime}/>

            <CustomAlert ref={alertRef}/>

            {/* TODO: delete this */}
            <TouchableOpacity onPress={() => replace(props.navigation, "LoseScreen")} style={{backgroundColor: "red", borderRadius: 10, padding: 10, position: "absolute", bottom: 0, left: 0}}>
                <Text style={{color: "#fff", fontSize: 30}}>Lose</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
    },
});

export default Game;