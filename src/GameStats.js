import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Stat from './Stat';

import uuid from './uuid';
import statsImages from './../assets/statsImages';
import statsTitle from './../data/statsTitle.json';
import statsDescription from './../data/statsDescription.json';

export default function GameStats(props) {
    let count = 0; // used for assigning values to stats

    const stats = Array.from(Array(2 * props.statsCount - 1).keys()).map(i => i % 2 === 0 ? 
        <Stat 
            key={uuid()} title={statsTitle[count]} description={statsDescription[count]} maxLevel={props.maxLevel} currLevel={props.statsCurrLevel[count]} 
            lastLevel={props.statsLastLevel[count]} source={statsImages[count++]} setAlertData={props.setAlertData}/> : <SizedBox key={uuid()}/>);

    return (
        <View style={styles.gameStats}>
            { stats }
        </View>
    );
}

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