import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Stat from './Stat';

import uuid from './uuid';
import statsImages from './../assets/statsImages';

import statsInfo from './../data/statsInfo.json';

const GameStats = props => {
    let count = 0; // used for assigning values to stats

    const stats = Array(2 * props.statsCount - 1).fill(0).map((_, i) => i % 2 === 0 ? 
        <Stat
            key={uuid()} info={statsInfo[count]} maxLevel={props.maxLevel} currLevel={props.statsCurrLevel[count]} 
            lastLevel={props.statsLastLevel[count]} source={statsImages[count++]} fireAlert={props.fireAlert}
        /> 
        : 
        <SizedBox key={uuid()}/>
    );

    return (
        <View style={styles.gameStats}>
            { stats }
        </View>
    );
};

const SizedBox = () => <View style={styles.sizedBox}></View>;

const styles = StyleSheet.create({
    gameStats: {
        flex: 1,
        backgroundColor: "rgb(50, 50, 50)",
        justifyContent: "center",
        alignItems: "center",

        display: "flex",
        flexDirection: "row",
    },
    sizedBox: {
        width: Dimensions.get("window").width / 50
    },
});

export default GameStats;