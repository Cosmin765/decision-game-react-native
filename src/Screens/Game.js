import React, { useState, useRef } from 'react';
import { StyleSheet , SafeAreaView, TouchableOpacity, Text } from 'react-native';

import GameStats from 'components/GameStats';
import CardsContainer from 'components/CardsContainer';
import Timer from 'components/Timer';
import CustomAlert from 'components/CustomAlert';

import { replace } from 'src/navigation';

const Game = props => {
    const maxLevel = 20;
    const statsCount = 4;

    const [gameEventsInitial] = useState(require('root/data/gameEvents.json').sort(() => Math.random() - 0.5));
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

    const handleWin = () => {
        replace(props.navigation, "WinScreen");
    };

    if(!gameEvents.length) {
        // win
        handleWin();
    }

    return (
        <SafeAreaView style={styles.main}>
            <GameStats statsCount={statsCount} maxLevel={maxLevel} statsLevel={statsLevel} fireAlert={fireAlert} navigation={props.navigation}/>
            <CardsContainer updateStatsLevel={updateStatsLevel} removeCard={removeCard} gameEvents={gameEvents} cardsCount={gameEvents.length}/>
            
            <Timer passed={passedTime}/>

            <CustomAlert ref={alertRef}/>

            {/* TODO: delete this */}
            <TouchableOpacity onPress={() => setStatsLevel({last: Array.from(statsLevel.current), current: [1, 1, 0, 1]})} style={{backgroundColor: "red", borderRadius: 10, padding: 10, position: "absolute", bottom: 0, left: 0}}>
                <Text style={{color: "#fff", fontSize: 30}}>Lose</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleWin} style={{backgroundColor: "rgb(0, 255, 0)", borderRadius: 10, padding: 10, position: "absolute", bottom: 0, right: 0}}>
                <Text style={{color: "#000", fontSize: 30}}>Win</Text>
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