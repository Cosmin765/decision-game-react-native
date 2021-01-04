import React, { useState, useRef } from 'react';
import { StyleSheet , SafeAreaView, TouchableOpacity, Text, CameraRoll } from 'react-native';

import GameStats from 'components/GameStats';
import CardsContainer from 'components/CardsContainer';
import Timer from 'components/Timer';
import CustomAlert from 'components/CustomAlert';

import { replace } from 'src/navigation';

const Game = props => {
    const maxLevel = 20;
    const statsCount = 4;

    const gameEventsInitial = useRef(require('root/data/gameEvents.json').sort(() => Math.random() - 0.5)).current;

    const [state, setState] = useState({
        gameEvents: Array.from(gameEventsInitial),
        statsLevel: { last: Array(statsCount).fill(0), current: Array(statsCount).fill(maxLevel/2) }
    });

    let { gameEvents, statsLevel } = state;
    
    const updateStatsLevel = effect => {
        
        if(gameEvents[0].length > 1) gameEvents.splice(0, 1, gameEvents[0].slice(1));
        else {
            if(gameEvents.length === 1) return handleWin();
            
            gameEvents = gameEvents.slice(1);
        }

        setState({ gameEvents, statsLevel: { last: statsLevel.current, current: statsLevel.current.map((level, index) => level + effect[index]) } });
    };
    
    const passedTime = Math.round(365 / gameEventsInitial.length * (gameEventsInitial.length - gameEvents.length)); // for the timer

    const alertRef = useRef();

    const fireAlert = data => alertRef.current.fireAlert(data);

    const handleWin = () => setTimeout(() => replace(props.navigation, "WinScreen"), 400);

    return (
        <SafeAreaView style={styles.main}>
            <GameStats statsCount={statsCount} maxLevel={maxLevel} statsLevel={statsLevel} fireAlert={fireAlert} navigation={props.navigation}/>
            <CardsContainer updateStatsLevel={updateStatsLevel} gameEvent={gameEvents[0]}/>
            
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