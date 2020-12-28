import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Stat from './Stat';

import uuid from 'src/uuid';

import statsImages from 'root/assets/statsImages';
import statsInfo from 'root/data/statsInfo.json';

const GameStats = props => {
    let count = 0; // used for assigning values to stats

    const getStatsProps = () => ({
        maxLevel: props.maxLevel,
        fireAlert: props.fireAlert,
        navigation: props.navigation,
        info: statsInfo[count],
        currLevel: props.statsLevel.current[count],
        lastLevel: props.statsLevel.last[count],
        source: statsImages[count++],
    });

    const stats = Array(2 * props.statsCount - 1).fill(0).map((_, i) => i % 2 === 0 ? <Stat props={getStatsProps()} key={uuid()}/> : <SizedBox key={uuid()}/>);

    return (
        <View style={styles.main}>
            { stats }
        </View>
    );
};

const SizedBox = () => <View style={styles.sizedBox}></View>;

const styles = StyleSheet.create({
    main: {
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