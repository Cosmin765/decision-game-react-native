import React, { useState, useRef } from 'react';
import { StyleSheet , SafeAreaView } from 'react-native';

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
        statsLevel: { last: Array(statsCount).fill(0), current: Array(statsCount).fill(maxLevel / 2) }
    });

    let { gameEvents, statsLevel } = state;
    
    const updateStatsLevel = effect => {
        
        if(gameEvents[0].length > 1) gameEvents.splice(0, 1, gameEvents[0].slice(1));
        else {
            gameEvents = gameEvents.slice(1);
        }

        setState({ gameEvents, statsLevel: { last: statsLevel.current, current: statsLevel.current.map((level, index) => level + effect[index]) } });
    };
    
    const passedTime = Math.round(365 / gameEventsInitial.length * (gameEventsInitial.length - gameEvents.length)); // for the timer
    
    const alertRef = useRef();

    const fireAlert = data => alertRef.current.fireAlert(data);
    
    const handleWin = () => setTimeout(() => replace(props.navigation, "WinScreen"), 1500);

    if(!gameEvents.length) handleWin();

    return (
        <SafeAreaView style={styles.main}>
            <GameStats statsCount={statsCount} maxLevel={maxLevel} statsLevel={statsLevel} fireAlert={fireAlert} navigation={props.navigation}/>
            <CardsContainer updateStatsLevel={updateStatsLevel} gameEvent={gameEvents[0]} illusion={gameEvents.length > 1 || (gameEvents.length && gameEvents[0].length > 1)}/>
            
            <Timer passed={passedTime}/>

            <CustomAlert ref={alertRef}/>
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